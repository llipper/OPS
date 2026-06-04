import { auth } from "@workspace/auth"
import { prisma, createAuditLog } from "@workspace/database"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { z } from "zod"
import { rateLimitOrThrow } from "@/lib/security/rate-limit"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1).max(200),
    newPassword: z
      .string()
      .min(8)
      .max(128)
      .regex(/[a-z]/, "A nova senha precisa conter letra minúscula.")
      .regex(/[A-Z]/, "A nova senha precisa conter letra maiúscula.")
      .regex(/[0-9]/, "A nova senha precisa conter número."),
    revokeOtherSessions: z.boolean().optional(),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "A nova senha precisa ser diferente da senha atual.",
  })

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  })
}

export async function POST(request: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return json(401, { message: "Sessão expirada. Faça login novamente." })
  }

  await rateLimitOrThrow({
    key: `change-password:${session.user.id}`,
    limit: 5,
    windowSeconds: 300,
  })

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return json(400, { message: "JSON inválido." })
  }

  const parsed = passwordSchema.safeParse(body)

  if (!parsed.success) {
    return json(400, {
      message: "Verifique os dados informados.",
      errors: parsed.error.flatten().fieldErrors,
    })
  }

  const user = await prisma.usuario.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      password: true,
      ativo: true,
    },
  })

  if (!user?.ativo || !user.password) {
    return json(403, { message: "Não foi possível alterar a senha." })
  }

  const matches = await bcrypt.compare(parsed.data.currentPassword, user.password)

  if (!matches) {
    return json(400, { message: "Senha atual inválida." })
  }

  const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 12)

  await prisma.$transaction(async (tx) => {
    await tx.usuario.update({
      where: { id: user.id },
      data: { password: hashedPassword },
      select: { id: true },
    })

    if (parsed.data.revokeOtherSessions) {
      await tx.sessao.deleteMany({
        where: { usuarioId: user.id },
      })
    }
  })

  await createAuditLog({
    usuarioId: user.id,
    acao: "PASSWORD_CHANGED",
    tabela: "usuarios",
    registroId: user.id,
    dadosDepois: {
      revokeOtherSessions: Boolean(parsed.data.revokeOtherSessions),
    },
  })

  return json(200, { message: "Senha alterada com sucesso." })
}
