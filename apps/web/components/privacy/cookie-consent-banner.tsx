"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"

import { saveCookieConsent } from "@/actions/privacy-actions"

type CookieConsent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  version: string
  savedAt: string
}

const STORAGE_KEY = "concurso_master_cookie_consent"
const CONSENT_VERSION = "2026-05-18"

function getStoredConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookieConsent
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

function dispatchConsent(consent: CookieConsent) {
  window.dispatchEvent(
    new CustomEvent("concurso-master:cookie-consent", {
      detail: consent,
    })
  )
}

export function CookieConsentBanner() {
  const [mounted, setMounted] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [customizing, setCustomizing] = React.useState(false)
  const [analytics, setAnalytics] = React.useState(false)
  const [marketing, setMarketing] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const consent = getStoredConsent()

    if (consent) {
      dispatchConsent(consent)
      return
    }

    setVisible(true)
  }, [])

  async function persistConsent(
    next: Pick<CookieConsent, "analytics" | "marketing">
  ) {
    const consent: CookieConsent = {
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
      version: CONSENT_VERSION,
      savedAt: new Date().toISOString(),
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    dispatchConsent(consent)
    setVisible(false)
    await saveCookieConsent({
      analytics: consent.analytics,
      marketing: consent.marketing,
    })
  }

  if (!mounted || !visible) return null

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-background p-4 shadow-2xl">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Preferências de cookies</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Usamos cookies necessários para autenticação, segurança e
            funcionamento da plataforma. Cookies analíticos e de marketing só
            serão usados se você autorizar.
          </p>
          <Link
            href="/politica-de-privacidade"
            className="text-xs font-medium underline underline-offset-4"
          >
            Ver Política de Privacidade
          </Link>

          {customizing && (
            <div className="mt-3 grid gap-3 rounded-xl border p-3">
              <PreferenceRow
                checked
                disabled
                title="Necessários"
                description="Obrigatórios para login, segurança e execução do serviço."
              />
              <PreferenceRow
                checked={analytics}
                onCheckedChange={setAnalytics}
                title="Analíticos"
                description="Medição de uso e melhoria de experiência."
              />
              <PreferenceRow
                checked={marketing}
                onCheckedChange={setMarketing}
                title="Marketing"
                description="Campanhas, mensuração e comunicação promocional."
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          {customizing ? (
            <Button
              type="button"
              className="rounded-xl"
              onClick={() => persistConsent({ analytics, marketing })}
            >
              Salvar preferências
            </Button>
          ) : (
            <Button
              type="button"
              className="rounded-xl"
              onClick={() =>
                persistConsent({ analytics: true, marketing: true })
              }
            >
              Aceitar todos
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() =>
              customizing
                ? persistConsent({ analytics: false, marketing: false })
                : setCustomizing(true)
            }
          >
            {customizing ? "Somente necessários" : "Configurar"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  return (
    <label className="flex items-start gap-3">
      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onCheckedChange?.(value === true)}
      />
      <span className="space-y-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      </span>
    </label>
  )
}
