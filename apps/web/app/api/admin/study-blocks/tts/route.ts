import { auth } from "@workspace/auth"
import { PERMISSIONS, validateAccess } from "@workspace/permissions"
import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import { z } from "zod"

import { rateLimitOrThrow } from "@/lib/security/rate-limit"

export const runtime = "nodejs"

const ttsSchema = z.object({
  text: z.string().trim().min(1).max(2500),
})

async function authorize() {
  const session = await auth()

  if (!session?.user?.id) {
    return { ok: false, status: 401 as const, userId: null }
  }

  try {
    validateAccess(
      { userId: session.user.id, role: session.user.role },
      PERMISSIONS.MANAGE_COURSES
    )

    return { ok: true, status: 200 as const, userId: session.user.id }
  } catch {
    return { ok: false, status: 403 as const, userId: session.user.id }
  }
}

function getAudioCachePath(input: {
  modelId: string
  text: string
  voiceId: string
}) {
  const cacheRoot =
    process.env.STUDY_BLOCKS_TTS_CACHE_DIR ??
    path.join(process.cwd(), ".cache", "study-blocks-tts")
  const hash = createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex")

  return path.join(cacheRoot, `${hash}.mp3`)
}

function normalizeTtsText(text: string) {
  return text.replace(/\s+/g, " ").trim()
}

function audioResponse(audio: ArrayBuffer | Uint8Array, cacheStatus: "HIT" | "MISS") {
  const body =
    audio instanceof ArrayBuffer
      ? audio
      : (audio.buffer.slice(
          audio.byteOffset,
          audio.byteOffset + audio.byteLength
        ) as ArrayBuffer)

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Cache-Control": "private, max-age=31536000, immutable",
      "Content-Type": "audio/mpeg",
      "X-Study-Blocks-TTS-Cache": cacheStatus,
    },
  })
}

export async function POST(request: Request) {
  const authResult = await authorize()

  if (!authResult.ok) {
    return NextResponse.json(
      {
        error:
          authResult.status === 401
            ? "Não autenticado."
            : "Permissão insuficiente.",
      },
      { status: authResult.status }
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 })
  }

  const parsed = ttsSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 })
  }

  const text = normalizeTtsText(parsed.data.text)
  const voiceId = process.env.ELEVENLABS_VOICE_ID ?? "Wf2Tug32aPtcWix2oO5f"
  const modelId = process.env.ELEVENLABS_MODEL_ID ?? "eleven_flash_v2_5"
  const cachePath = getAudioCachePath({
    modelId,
    text,
    voiceId,
  })

  try {
    const cachedAudio = await readFile(cachePath)
    return audioResponse(cachedAudio, "HIT")
  } catch {
    // Cache miss: only now do we call ElevenLabs and spend credits.
  }

  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "ELEVENLABS_API_KEY não configurada." },
      { status: 501 }
    )
  }

  try {
    await rateLimitOrThrow({
      key: `study-blocks-tts:${authResult.userId}`,
      limit: 8,
      windowSeconds: 60,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Rate limit excedido." },
      { status: 429 }
    )
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.8,
          style: 0.15,
          use_speaker_boost: true,
        },
      }),
    }
  )

  if (!response.ok) {
    const message = await response.text()

    return NextResponse.json(
      {
        error: "Falha ao gerar narração na ElevenLabs.",
        detail: message.slice(0, 500),
      },
      { status: response.status }
    )
  }

  const contentType = response.headers.get("content-type") ?? ""

  if (!contentType.toLowerCase().includes("audio")) {
    const message = await response.text()

    return NextResponse.json(
      {
        error: "A ElevenLabs respondeu sem arquivo de áudio.",
        detail: message.slice(0, 500),
      },
      { status: 502 }
    )
  }

  const audio = await response.arrayBuffer()
  await mkdir(path.dirname(cachePath), { recursive: true })
  await writeFile(cachePath, Buffer.from(audio))

  return audioResponse(audio, "MISS")
}
