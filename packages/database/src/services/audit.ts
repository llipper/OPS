import { Prisma, prisma } from "../index"

type AuditInput = {
  usuarioId?: string | null
  acao: string
  tabela?: string | null
  registroId?: string | null
  dadosAntes?: unknown
  dadosDepois?: unknown
  ipAddress?: string | null
  userAgent?: string | null
}

export async function createAuditLog(input: AuditInput) {
  return await prisma.auditLog.create({
    data: {
      usuarioId: input.usuarioId ?? null,
      acao: input.acao,
      tabela: input.tabela ?? null,
      registroId: input.registroId ?? null,
      dadosAntes:
        input.dadosAntes === undefined
          ? undefined
          : (input.dadosAntes as Prisma.InputJsonValue),
      dadosDepois:
        input.dadosDepois === undefined
          ? undefined
          : (input.dadosDepois as Prisma.InputJsonValue),
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
    },
  })
}
