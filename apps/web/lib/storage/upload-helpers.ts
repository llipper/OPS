import { uploadImageBufferToR2 } from "@/lib/storage"

export type UploadFolder = "concursos" | "usuarios"

const MAX_BASE64_IMAGE_CHARS = 7_000_000

/**
 * Processa uma imagem codificada em base64 e realiza o upload para o Cloudflare R2.
 */
export async function processBase64ImageUpload(
  fileBase64: string | null,
  _fileType: string,
  folder: UploadFolder
): Promise<string | undefined> {
  if (!fileBase64 || !fileBase64.startsWith("data:")) {
    return undefined
  }

  try {
    const base64Data = fileBase64.split(",")[1]
    if (!base64Data) {
      throw new Error("Imagem base64 inválida.")
    }

    if (base64Data.length > MAX_BASE64_IMAGE_CHARS) {
      throw new Error("Imagem excede o limite de 5MB.")
    }

    const buffer = Buffer.from(base64Data, "base64")

    const url = await uploadImageBufferToR2(buffer, folder)

    return url
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido"
    console.error(`[UPLOAD-HELPER] Erro no upload para o R2 no diretório ${folder}:`, message)
    throw new Error(`Falha no upload da imagem: ${message}`)
  }
}
