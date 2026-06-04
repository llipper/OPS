import { getSession } from "@workspace/auth"
import { redirect } from "next/navigation"
import type { SecurityContext, Role } from "@workspace/permissions"

/**
 * Recupera o contexto de segurança do usuário logado.
 * Se não houver sessão, redireciona ou lança erro.
 */
export async function getSecurityContext(shouldRedirect = true): Promise<SecurityContext> {
  const session = await getSession()

  if (!session?.user) {
    if (shouldRedirect) redirect("/login")
    throw new Error("Não autorizado: Sessão não encontrada")
  }

  const user = session.user as any

  return {
    userId: user.id,
    role: user.role as Role,
  }
}

/**
 * Garante que o usuário tem uma role específica
 */
export async function assertRole(roles: Role[]) {
  const context = await getSecurityContext()
  if (!roles.includes(context.role)) {
    throw new Error(`Acesso negado: Perfil ${context.role} não autorizado`)
  }
  return context
}
