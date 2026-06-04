"use server"

import { createAuditLog, prisma } from "@workspace/database"
import { auth } from "@workspace/auth"
import { validateAccess, PERMISSIONS } from "@workspace/permissions"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

async function getSecurityContext() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autorizado")
  return { userId: session.user.id, role: session.user.role }
}

export async function getUsuarios() {
  const ctx = await getSecurityContext()
  validateAccess(ctx, PERMISSIONS.MANAGE_USERS)

  const users = await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      ativo: true,
      avatarUrl: true,
      _count: {
        select: {
          questoesCriadas: true,
        },
      },
    },
    orderBy: {
      nome: "asc",
    },
  })

  return users
}

export async function createUsuario(data: {
  nome: string
  email: string
  password?: string
  role: "SUPER_ADMIN" | "ADMIN" | "PROFESSOR" | "REVISOR" | "ALUNO" | "SUPORTE"
  ativo?: boolean
}) {
  const ctx = await getSecurityContext()
  validateAccess(ctx, PERMISSIONS.MANAGE_USERS)

  // Segurança extra: Apenas SUPER_ADMIN pode criar contas SUPER_ADMIN ou ADMIN
  if (
    (data.role === "SUPER_ADMIN" || data.role === "ADMIN") &&
    ctx.role !== "SUPER_ADMIN"
  ) {
    throw new Error("Apenas o Super Admin pode criar administradores.")
  }

  // Verifica e-mail duplicado
  const existing = await prisma.usuario.findUnique({
    where: { email: data.email },
  })
  if (existing) {
    throw new Error("Este e-mail já está em uso por outro usuário.")
  }

  if (!data.password || data.password.trim().length < 8) {
    throw new Error("Informe uma senha temporária com pelo menos 8 caracteres.")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: data.role,
      ativo: data.ativo ?? true,
    },
  })

  await createAuditLog({
    usuarioId: ctx.userId,
    acao: "USER_CREATED",
    tabela: "usuarios",
    registroId: user.id,
    dadosDepois: {
      nome: user.nome,
      email: user.email,
      role: user.role,
      ativo: user.ativo,
    },
  })

  revalidatePath("/admin/acesso")
  return { id: user.id, nome: user.nome, email: user.email }
}

export async function updateUsuario(
  id: string,
  data: {
    nome?: string
    email?: string
    password?: string
    role?:
    | "SUPER_ADMIN"
    | "ADMIN"
    | "PROFESSOR"
    | "REVISOR"
    | "ALUNO"
    | "SUPORTE"
    ativo?: boolean
  }
) {
  const ctx = await getSecurityContext()
  validateAccess(ctx, PERMISSIONS.MANAGE_USERS)

  // Busca o usuário atual antes do update
  const targetUser = await prisma.usuario.findUnique({
    where: { id },
    select: { role: true, email: true },
  })

  if (!targetUser) {
    throw new Error("Usuário não encontrado.")
  }

  // Se o usuário alvo for SUPER_ADMIN ou ADMIN, apenas outro SUPER_ADMIN pode alterá-lo
  if (
    (targetUser.role === "SUPER_ADMIN" || targetUser.role === "ADMIN") &&
    ctx.role !== "SUPER_ADMIN"
  ) {
    throw new Error("Apenas o Super Admin pode gerenciar administradores.")
  }

  // Se o NOVO cargo for SUPER_ADMIN ou ADMIN, apenas SUPER_ADMIN pode definir
  if (
    data.role &&
    (data.role === "SUPER_ADMIN" || data.role === "ADMIN") &&
    ctx.role !== "SUPER_ADMIN"
  ) {
    throw new Error(
      "Apenas o Super Admin pode promover usuários a administradores."
    )
  }

  // Se for atualizar e-mail, checa duplicidade
  if (
    data.email &&
    data.email.toLowerCase() !== targetUser.email.toLowerCase()
  ) {
    const existing = await prisma.usuario.findUnique({
      where: { email: data.email.toLowerCase() },
    })
    if (existing) {
      throw new Error("Este e-mail já está em uso por outro usuário.")
    }
  }

  const updateData: any = {
    nome: data.nome,
    email: data.email ? data.email.toLowerCase() : undefined,
    role: data.role,
    ativo: data.ativo,
  }

  if (data.password && data.password.trim() !== "") {
    updateData.password = await bcrypt.hash(data.password, 10)
  }

  const user = await prisma.usuario.update({
    where: { id },
    data: updateData,
  })

  await createAuditLog({
    usuarioId: ctx.userId,
    acao: "USER_UPDATED",
    tabela: "usuarios",
    registroId: id,
    dadosAntes: {
      email: targetUser.email,
      role: targetUser.role,
    },
    dadosDepois: {
      nome: user.nome,
      email: user.email,
      role: user.role,
      ativo: user.ativo,
      senhaAlterada: Boolean(data.password && data.password.trim() !== ""),
    },
  })

  revalidatePath("/admin/acesso")
  return { id: user.id, nome: user.nome, email: user.email }
}

export async function deleteUsuario(id: string) {
  const ctx = await getSecurityContext()
  validateAccess(ctx, PERMISSIONS.MANAGE_USERS)

  // Busca o usuário atual antes do delete
  const targetUser = await prisma.usuario.findUnique({
    where: { id },
    select: { role: true },
  })

  if (!targetUser) {
    throw new Error("Usuário não encontrado.")
  }

  // Se o usuário alvo for SUPER_ADMIN ou ADMIN, apenas outro SUPER_ADMIN pode deletá-lo
  if (
    (targetUser.role === "SUPER_ADMIN" || targetUser.role === "ADMIN") &&
    ctx.role !== "SUPER_ADMIN"
  ) {
    throw new Error("Apenas o Super Admin pode excluir administradores.")
  }

  await prisma.usuario.delete({
    where: { id },
  })

  await createAuditLog({
    usuarioId: ctx.userId,
    acao: "USER_DELETED",
    tabela: "usuarios",
    registroId: id,
    dadosAntes: {
      role: targetUser.role,
    },
  })

  revalidatePath("/admin/acesso")
  return { success: true }
}
