"use server"

import { getSecurityContext } from "@/lib/auth/get-security-context"
import { rateLimitOrThrow } from "@/lib/security/rate-limit"
import { uploadFileToR2 } from "@/lib/storage"
import { z } from "zod"

const uploadSchema = z.object({
  folder: z.enum(["avatars"]),
})

export async function uploadToR2(formData: FormData) {
  try {
    const context = await getSecurityContext(false)
    const file = formData.get("file")
    const path = formData.get("path")

    if (!file || !(file instanceof File)) {
      return { success: false, message: "Arquivo inválido ou não fornecido" }
    }

    const parsed = uploadSchema.safeParse({
      folder: typeof path === "string" ? path : "avatars",
    })

    if (!parsed.success) {
      return { success: false, message: "Destino de upload não permitido." }
    }

    await rateLimitOrThrow({
      key: `upload:${context.userId}`,
      limit: 10,
      windowSeconds: 300,
    })

    const folder = parsed.data.folder
    const url = await uploadFileToR2(file, folder)

    return { success: true, url }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido no upload",
    }
  }
}
