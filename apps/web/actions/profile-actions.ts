"use server"

import { auth } from "@workspace/auth"
import { prisma, createAuditLog } from "@workspace/database"
import { z } from "zod"
import { revalidatePath } from "next/cache"

function isAllowedAvatarUrl(value: string) {
  const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "")

  if (!publicUrl) return false

  try {
    const parsed = new URL(value)
    const allowed = new URL(publicUrl)
    const allowedPath = allowed.pathname.replace(/\/$/, "")

    return (
      parsed.protocol === "https:" &&
      parsed.origin === allowed.origin &&
      parsed.pathname.startsWith(`${allowedPath}/avatars/`)
    )
  } catch {
    return false
  }
}

const profileSchema = z.object({
  nome: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres").max(150),
  nomeExibicao: z.string().trim().max(100).optional().nullable(),
  bio: z.string().trim().max(2000, "A biografia deve ter no máximo 2000 caracteres").optional().nullable(),
  carreiraId: z.string().uuid().optional().nullable().or(z.literal("")),
  visibilidade: z.enum(["PRIVADO", "BASICO_PUBLICO", "COMPLETO_PUBLICO"]),
  instagram: z.string().trim().max(100).optional().nullable().or(z.literal("")),
  tiktok: z.string().trim().max(100).optional().nullable().or(z.literal("")),
  facebook: z.string().trim().max(100).optional().nullable().or(z.literal("")),
  linkedin: z.string().trim().max(100).optional().nullable().or(z.literal("")),
  avatarUrl: z
    .string()
    .trim()
    .url("URL da foto inválida.")
    .refine(isAllowedAvatarUrl, "A foto precisa ter sido enviada pela plataforma.")
    .optional()
    .nullable()
    .or(z.literal("")),
})

function emptyToNull(value?: string | null) {
  return value && value.trim().length > 0 ? value.trim() : null
}

export async function updateStudentProfile(values: z.infer<typeof profileSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Sessão expirada. Faça login novamente.",
    }
  }

  const parsed = profileSchema.safeParse(values)

  if (!parsed.success) {
    return {
      success: false,
      message: "Verifique os dados informados.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const data = parsed.data
  const userId = session.user.id

  try {
    // Busca informações atuais antes da alteração para log de auditoria
    const usuarioAtual = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { perfil: true },
    })

    if (!usuarioAtual) {
      return {
        success: false,
        message: "Usuário não encontrado.",
      }
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      // 1. Atualiza dados principais de Usuario (Nome e avatarUrl)
      const user = await tx.usuario.update({
        where: { id: userId },
        data: {
          nome: data.nome,
          avatarUrl: emptyToNull(data.avatarUrl),
        },
      })

      // 2. Faz o upsert na tabela Perfil (perfis)
      const perfil = await tx.perfil.upsert({
        where: { usuarioId: userId },
        create: {
          usuarioId: userId,
          nomeExibicao: emptyToNull(data.nomeExibicao),
          bio: emptyToNull(data.bio),
          visibilidade: data.visibilidade,
          carreiraId: emptyToNull(data.carreiraId),
          instagram: emptyToNull(data.instagram),
          tiktok: emptyToNull(data.tiktok),
          facebook: emptyToNull(data.facebook),
          linkedin: emptyToNull(data.linkedin),
        },
        update: {
          nomeExibicao: emptyToNull(data.nomeExibicao),
          bio: emptyToNull(data.bio),
          visibilidade: data.visibilidade,
          carreiraId: emptyToNull(data.carreiraId),
          instagram: emptyToNull(data.instagram),
          tiktok: emptyToNull(data.tiktok),
          facebook: emptyToNull(data.facebook),
          linkedin: emptyToNull(data.linkedin),
        },
      })

      return { user, perfil }
    })

    // 3. Registra auditoria
    await createAuditLog({
      usuarioId: userId,
      acao: "PROFILE_UPDATED",
      tabela: "perfis",
      registroId: userId,
      dadosAntes: {
        nome: usuarioAtual.nome,
        avatarUrl: usuarioAtual.avatarUrl,
        nomeExibicao: usuarioAtual.perfil?.nomeExibicao,
        visibilidade: usuarioAtual.perfil?.visibilidade,
        carreiraId: usuarioAtual.perfil?.carreiraId,
      },
      dadosDepois: {
        nome: updatedUser.user.nome,
        avatarUrl: updatedUser.user.avatarUrl,
        nomeExibicao: updatedUser.perfil.nomeExibicao,
        visibilidade: updatedUser.perfil.visibilidade,
        carreiraId: updatedUser.perfil.carreiraId,
      },
    })

    revalidatePath("/perfil")
    revalidatePath("/dashboard/perfil")
    revalidatePath("/rankings")
    revalidatePath("/dashboard")

    return {
      success: true,
      message: "Perfil atualizado com sucesso.",
    }
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error)
    return {
      success: false,
      message: error.message || "Erro inesperado ao salvar alterações.",
    }
  }
}

const avatarSchema = z.object({
  avatarUrl: z
    .string()
    .trim()
    .url("URL da foto inválida.")
    .refine(isAllowedAvatarUrl, "A foto precisa ter sido enviada pela plataforma."),
})

export async function updateStudentAvatar(values: z.infer<typeof avatarSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Sessão expirada. Faça login novamente.",
    }
  }

  const parsed = avatarSchema.safeParse(values)

  if (!parsed.success) {
    return {
      success: false,
      message: "URL da foto inválida.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const userId = session.user.id
  const avatarUrl = parsed.data.avatarUrl.trim()

  try {
    const usuarioAtual = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { avatarUrl: true },
    })

    const user = await prisma.usuario.update({
      where: { id: userId },
      data: { avatarUrl },
      select: { avatarUrl: true },
    })

    await createAuditLog({
      usuarioId: userId,
      acao: "PROFILE_AVATAR_UPDATED",
      tabela: "usuarios",
      registroId: userId,
      dadosAntes: {
        avatarUrl: usuarioAtual?.avatarUrl,
      },
      dadosDepois: {
        avatarUrl: user.avatarUrl,
      },
    })

    revalidatePath("/perfil")
    revalidatePath("/dashboard/perfil")
    revalidatePath("/rankings")
    revalidatePath("/dashboard")

    return {
      success: true,
      message: "Foto de perfil atualizada.",
      avatarUrl: user.avatarUrl,
    }
  } catch (error: any) {
    console.error("Erro ao atualizar foto de perfil:", error)
    return {
      success: false,
      message: error.message || "Erro inesperado ao salvar foto de perfil.",
    }
  }
}
const addressSchema = z.object({
  id: z.string().uuid().optional(),
  apelido: z.string().trim().max(50).optional(),
  cep: z.string().trim().min(8).max(9),
  logradouro: z.string().trim().min(2).max(200),
  numero: z.string().trim().min(1).max(20),
  complemento: z.string().trim().max(100).optional(),
  referencia: z.string().trim().max(200).optional(),
  bairro: z.string().trim().min(2).max(100),
  cidade: z.string().trim().min(2).max(100),
  estado: z.string().trim().length(2),
  principal: z.boolean().optional(),
})

export async function upsertStudentAddress(values: z.infer<typeof addressSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Sessão expirada. Faça login novamente.",
    }
  }

  const parsed = addressSchema.safeParse(values)

  if (!parsed.success) {
    return {
      success: false,
      message: "Verifique os dados do endereço.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const data = parsed.data
  const principal = Boolean(data.principal)

  if (principal) {
    await prisma.endereco.updateMany({
      where: { usuarioId: session.user.id },
      data: { principal: false },
    })
  }

  if (data.id) {
    await prisma.endereco.updateMany({
      where: {
        id: data.id,
        usuarioId: session.user.id,
      },
      data: {
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: emptyToNull(data.complemento),
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado.toUpperCase(),
        principal,
      },
    })
  } else {
    const hasAddress = await prisma.endereco.count({
      where: { usuarioId: session.user.id },
    })

    await prisma.endereco.create({
      data: {
        usuarioId: session.user.id,
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: emptyToNull(data.complemento),
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado.toUpperCase(),
        principal: principal || hasAddress === 0,
      },
    })
  }

  return {
    success: true,
    message: "Endereço salvo com sucesso.",
  }
}
