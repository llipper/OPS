import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"
import { randomUUID } from "crypto"

const accountId = process.env.R2_ACCOUNT_ID
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
const MAX_IMAGE_PIXELS = 16_000_000
const ALLOWED_FILE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
])
const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
const ALLOWED_UPLOAD_FOLDERS = new Set([
  "avatars",
  "concursos",
  "usuarios",
  "questoes",
  "cadernos",
])

export const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
})

function assertAllowedUpload(size: number, mimeType: string, allowedMimeTypes: Set<string>) {
  if (size > MAX_UPLOAD_BYTES) {
    throw new Error("Arquivo excede o limite de 5MB.")
  }

  if (!allowedMimeTypes.has(mimeType)) {
    throw new Error("Tipo de arquivo não permitido.")
  }
}

function detectMimeType(buffer: Buffer): string | null {
  if (buffer.length < 12) return null

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg"
  }

  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png"
  }

  if (
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp"
  }

  if (buffer.subarray(0, 5).toString("ascii") === "%PDF-") {
    return "application/pdf"
  }

  return null
}

async function normalizeImage(buffer: Buffer) {
  const detectedMimeType = detectMimeType(buffer)

  assertAllowedUpload(buffer.length, detectedMimeType ?? "", ALLOWED_IMAGE_MIME_TYPES)

  return await sharp(buffer, { limitInputPixels: MAX_IMAGE_PIXELS })
    .rotate()
    .resize(400, 400, {
      fit: "cover",
      position: "center",
    })
    .webp({ quality: 80 })
    .toBuffer()
}

async function putObjectToR2(input: {
  buffer: Buffer
  contentType: string
  folder: string
  extension: string
}) {
  if (!ALLOWED_UPLOAD_FOLDERS.has(input.folder)) {
    throw new Error("Destino de upload não permitido.")
  }

  const fileName = `${input.folder}/${randomUUID()}.${input.extension}`

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: input.buffer,
    ContentType: input.contentType,
  })

  await s3Client.send(command)

  const publicUrl = process.env.R2_PUBLIC_URL
  return `${publicUrl}/${fileName}`
}

export async function uploadFileToR2(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const detectedMimeType = detectMimeType(buffer)

  assertAllowedUpload(buffer.length, detectedMimeType ?? "", ALLOWED_FILE_MIME_TYPES)

  if (detectedMimeType?.startsWith("image/")) {
    return await uploadImageBufferToR2(buffer, folder)
  }

  if (detectedMimeType === "application/pdf") {
    return await putObjectToR2({
      buffer,
      contentType: detectedMimeType,
      folder,
      extension: "pdf",
    })
  }

  throw new Error("Tipo de arquivo não permitido.")
}

export async function uploadImageBufferToR2(
  buffer: Buffer,
  folder: string = "uploads"
): Promise<string> {
  const finalBuffer = await normalizeImage(buffer)

  return await putObjectToR2({
    buffer: finalBuffer,
    contentType: "image/webp",
    folder,
    extension: "webp",
  })
}
