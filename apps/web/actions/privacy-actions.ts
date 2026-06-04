"use server"

import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

import {
  createPrivacyRequest,
  getUserPrivacyExport,
  registerPrivacyConsent,
  revokePrivacyConsent,
  TipoConsentimentoPrivacidade,
  TipoSolicitacaoPrivacidade,
} from "@workspace/database"

import { getSecurityContext } from "@/lib/auth/get-security-context"
import { rateLimitOrThrow } from "@/lib/security/rate-limit"

async function getRequestMeta() {
  const headerList = await headers()

  return {
    ipAddress:
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerList.get("x-real-ip"),
    userAgent: headerList.get("user-agent"),
  }
}

export async function acceptRequiredPrivacyDocuments() {
  const context = await getSecurityContext()
  const meta = await getRequestMeta()

  await registerPrivacyConsent(
    context.userId,
    {
      tipo: TipoConsentimentoPrivacidade.TERMOS_USO,
      versao: "2026-05-18",
      finalidade: "Registro do aceite dos termos de uso da plataforma.",
      aceito: true,
    },
    meta
  )

  await registerPrivacyConsent(
    context.userId,
    {
      tipo: TipoConsentimentoPrivacidade.POLITICA_PRIVACIDADE,
      versao: "2026-05-18",
      finalidade:
        "Registro de ciência sobre o tratamento de dados pessoais na plataforma.",
      aceito: true,
    },
    meta
  )

  revalidatePath("/privacidade")
}

export async function requestPrivacyRight(formData: FormData) {
  const context = await getSecurityContext()
  const meta = await getRequestMeta()
  const tipo = formData.get("tipo")
  const descricao = formData.get("descricao")

  if (
    typeof tipo !== "string" ||
    !Object.values(TipoSolicitacaoPrivacidade).includes(
      tipo as TipoSolicitacaoPrivacidade
    )
  ) {
    throw new Error("Tipo de solicitação inválido.")
  }

  await rateLimitOrThrow({
    key: `privacy-request:${context.userId}`,
    limit: 3,
    windowSeconds: 3600,
  })

  await createPrivacyRequest(
    context.userId,
    {
      tipo: tipo as TipoSolicitacaoPrivacidade,
      descricao: typeof descricao === "string" ? descricao : null,
    },
    meta
  )

  revalidatePath("/privacidade")
}

export async function revokeMarketingConsent() {
  const context = await getSecurityContext()
  const meta = await getRequestMeta()

  await revokePrivacyConsent(
    context.userId,
    TipoConsentimentoPrivacidade.MARKETING,
    meta
  )

  revalidatePath("/privacidade")
}

export async function saveCookieConsent(input: {
  analytics: boolean
  marketing: boolean
}) {
  const meta = await getRequestMeta()

  try {
    const context = await getSecurityContext(false)

    await registerPrivacyConsent(
      context.userId,
      {
        tipo: TipoConsentimentoPrivacidade.COOKIES_ANALITICOS,
        versao: "2026-05-18",
        finalidade:
          "Permitir medição de audiência e melhoria de experiência com cookies analíticos.",
        aceito: input.analytics,
      },
      meta
    )

    await registerPrivacyConsent(
      context.userId,
      {
        tipo: TipoConsentimentoPrivacidade.MARKETING,
        versao: "2026-05-18",
        finalidade:
          "Permitir comunicações, campanhas e mensuração de marketing.",
        aceito: input.marketing,
      },
      meta
    )
  } catch {
    // Visitantes sem sessão mantêm a preferência apenas no navegador.
  }
}

export async function exportMyData() {
  const context = await getSecurityContext()

  await rateLimitOrThrow({
    key: `privacy-export:${context.userId}`,
    limit: 3,
    windowSeconds: 3600,
  })

  const data = await getUserPrivacyExport(context.userId)

  if (!data) throw new Error("Usuário não encontrado.")

  return data
}
