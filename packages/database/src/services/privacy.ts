import {
  StatusSolicitacaoPrivacidade,
  TipoConsentimentoPrivacidade,
  TipoSolicitacaoPrivacidade,
} from "@prisma/client"

import { prisma } from "../index"
import { createAuditLog } from "./audit"

export const PRIVACY_POLICY_VERSION = "2026-05-18"
export const TERMS_VERSION = "2026-05-18"

type RequestMeta = {
  ipAddress?: string | null
  userAgent?: string | null
}

export async function registerPrivacyConsent(
  usuarioId: string,
  input: {
    tipo: TipoConsentimentoPrivacidade
    versao: string
    finalidade: string
    aceito: boolean
  },
  meta: RequestMeta = {}
) {
  const consent = await prisma.consentimentoPrivacidade.create({
    data: {
      usuarioId,
      tipo: input.tipo,
      versao: input.versao,
      finalidade: input.finalidade,
      aceito: input.aceito,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    },
  })

  await createAuditLog({
    usuarioId,
    acao: "PRIVACY_CONSENT_REGISTERED",
    tabela: "consentimentos_privacidade",
    registroId: consent.id,
    dadosDepois: {
      tipo: input.tipo,
      versao: input.versao,
      aceito: input.aceito,
    },
    ...meta,
  })

  return consent
}

export async function revokePrivacyConsent(
  usuarioId: string,
  tipo: TipoConsentimentoPrivacidade,
  meta: RequestMeta = {}
) {
  const consent = await prisma.consentimentoPrivacidade.findFirst({
    where: {
      usuarioId,
      tipo,
      aceito: true,
      revogadoEm: null,
    },
    orderBy: { criadoEm: "desc" },
  })

  if (!consent) return null

  const updated = await prisma.consentimentoPrivacidade.update({
    where: { id: consent.id },
    data: { revogadoEm: new Date() },
  })

  await createAuditLog({
    usuarioId,
    acao: "PRIVACY_CONSENT_REVOKED",
    tabela: "consentimentos_privacidade",
    registroId: updated.id,
    dadosAntes: { tipo, revogadoEm: null },
    dadosDepois: { tipo, revogadoEm: updated.revogadoEm },
    ...meta,
  })

  return updated
}

export async function createPrivacyRequest(
  usuarioId: string,
  input: {
    tipo: TipoSolicitacaoPrivacidade
    descricao?: string | null
  },
  meta: RequestMeta = {}
) {
  const request = await prisma.solicitacaoPrivacidade.create({
    data: {
      usuarioId,
      tipo: input.tipo,
      descricao: input.descricao,
      status: StatusSolicitacaoPrivacidade.ABERTA,
    },
  })

  await createAuditLog({
    usuarioId,
    acao: "PRIVACY_REQUEST_CREATED",
    tabela: "solicitacoes_privacidade",
    registroId: request.id,
    dadosDepois: {
      tipo: input.tipo,
      descricao: input.descricao,
    },
    ...meta,
  })

  return request
}

export async function getUserPrivacyExport(usuarioId: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: {
      id: true,
      nome: true,
      email: true,
      avatarUrl: true,
      role: true,
      ativo: true,
      criadoEm: true,
      atualizadoEm: true,
      perfil: true,
      enderecos: true,
      assinaturas: true,
      pedidos: {
        include: {
          itens: true,
          pagamentos: true,
        },
      },
      pagamentos: true,
      respostas: {
        select: {
          id: true,
          questaoId: true,
          alternativaId: true,
          isCorreta: true,
          tempoSeg: true,
          erroMotivo: true,
          respondidoEm: true,
          simuladoTentativaId: true,
          cadernoId: true,
        },
      },
      favoritos: true,
      revisoes: true,
      cadernosCriados: {
        include: { itens: true },
      },
      simuladosCriados: {
        include: { itens: true },
      },
      tentativas: true,
      estatisticas: true,
      rankings: true,
      diagnosticosPlanejamento: {
        include: { topicos: true },
      },
      notificacoes: true,
      ticketsCriados: {
        include: { mensagens: true },
      },
      consentimentos: true,
      solicitacoesPrivacidade: true,
    },
  })

  if (!usuario) return null

  const { pedidos, pagamentos, ...safeUser } = usuario

  return {
    geradoEm: new Date().toISOString(),
    formato: "application/json",
    aviso:
      "Exportacao de dados pessoais conforme solicitacao do titular. Segredos comerciais e dados de terceiros podem ser omitidos.",
    usuario: {
      ...safeUser,
      pedidos: pedidos.map((pedido) => ({
        ...pedido,
        pagamentos: pedido.pagamentos.map(maskPayment),
      })),
      pagamentos: pagamentos.map(maskPayment),
    },
  }
}

function maskPayment<
  T extends { pixQrCode?: string | null; pixChave?: string | null },
>(payment: T) {
  return {
    ...payment,
    pixQrCode: payment.pixQrCode ? "[omitido]" : null,
    pixChave: payment.pixChave ? "[omitido]" : null,
  }
}
