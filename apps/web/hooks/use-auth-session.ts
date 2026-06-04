"use client"

import { useEffect, useState, useCallback } from "react"
import type { Role } from "@workspace/permissions"

interface ClientSession {
  user: {
    id: string
    name: string
    email: string
    role: Role
    avatarUrl?: string | null
  } | null
  status: "loading" | "authenticated" | "unauthenticated"
}

export function useAuthSession() {
  const [session, setSession] = useState<ClientSession>({
    user: null,
    status: "loading",
  })

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session")
      const data = await res.json()

      if (data?.user) {
        setSession({ user: data.user, status: "authenticated" })
      } else {
        setSession({ user: null, status: "unauthenticated" })
      }
    } catch (error) {
      console.error("[useAuthSession] Erro ao buscar sessão:", error)
      setSession({ user: null, status: "unauthenticated" })
    }
  }, [])

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  return {
    ...session,
    update: fetchSession // Permite forçar o refresh manualmente
  }
}
