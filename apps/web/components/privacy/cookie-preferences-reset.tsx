"use client"

import { Button } from "@workspace/ui/components/button"

const STORAGE_KEY = "concurso_master_cookie_consent"

export function CookiePreferencesReset() {
  return (
    <Button
      type="button"
      variant="outline"
      className="rounded-xl"
      onClick={() => {
        window.localStorage.removeItem(STORAGE_KEY)
        window.location.reload()
      }}
    >
      Reabrir preferências de cookies
    </Button>
  )
}
