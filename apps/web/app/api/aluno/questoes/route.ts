import { NextResponse, type NextRequest } from "next/server"
import { getResolverQuestions, type ResolverSearchParams } from "@/lib/questions/resolver-query"
import { getSecurityContext } from "@/lib/auth/get-security-context"
import { z } from "zod"

const uuidSchema = z.string().uuid()
const allowedParams = new Set([
  "notebookId",
  "page",
  "disciplinaId",
  "assuntoId",
  "topicoId",
  "subtopicoId",
  "bancaId",
  "concursoId",
  "carreiraId",
  "cargo",
  "dificuldade",
  "ano",
  "questaoId",
])

const querySchema = z.object({
  notebookId: uuidSchema.optional(),
  page: z
    .string()
    .regex(/^[1-9]\d*$/)
    .optional(),
  disciplinaId: uuidSchema.optional(),
  assuntoId: uuidSchema.optional(),
  topicoId: uuidSchema.optional(),
  subtopicoId: uuidSchema.optional(),
  bancaId: uuidSchema.optional(),
  concursoId: uuidSchema.optional(),
  carreiraId: uuidSchema.optional(),
  cargo: z.string().trim().min(1).max(120).optional(),
  dificuldade: z.string().trim().regex(/^[a-z0-9_-]{1,40}$/).optional(),
  ano: z.string().regex(/^(19|20|21)\d{2}$/).optional(),
  questaoId: uuidSchema.optional(),
})

function parseResolverSearchParams(searchParams: URLSearchParams) {
  const rawParams: Record<string, string> = {}

  for (const [key, value] of searchParams.entries()) {
    if (!allowedParams.has(key)) {
      return null
    }

    rawParams[key] = value
  }

  const parsed = querySchema.safeParse(rawParams)
  return parsed.success ? (parsed.data as ResolverSearchParams) : null
}

export async function GET(request: NextRequest) {
  try {
    // Pass false to getSecurityContext to handle authorization exceptions gracefully in the API
    const context = await getSecurityContext(false)
    
    const { searchParams } = new URL(request.url)
    const params = parseResolverSearchParams(searchParams)

    if (!params) {
      return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 })
    }
    
    const data = await getResolverQuestions(params, context?.userId)
    
    return NextResponse.json(data)
  } catch (error: any) {
    if (error.message && error.message.includes("Não autorizado")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("Error fetching questions through API:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
