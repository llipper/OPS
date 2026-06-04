"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
export { useSession, signIn, signOut } from "next-auth/react"

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider 
      refetchOnWindowFocus={true} 
      refetchInterval={0} // Desativar polling agressivo
      refetchWhenOffline={false}
    >
      {children}
    </NextAuthSessionProvider>
  )
}
