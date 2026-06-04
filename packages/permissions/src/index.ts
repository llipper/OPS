/**
 * @workspace/permissions
 * Centraliza a inteligência de autorização e RBAC (Role-Based Access Control).
 */

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  PROFESSOR: "PROFESSOR",
  REVISOR: "REVISOR",
  ALUNO: "ALUNO",
  SUPORTE: "SUPORTE",
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const PERMISSIONS = {
  VIEW_ADMIN_MENU: "view:admin_menu",
  VIEW_PRINCIPAL_MENU: "view:principal_menu",

  // Gestão de Questões (Granular)
  MANAGE_QUESTIONS: "manage:questions",
  CREATE_QUESTIONS: "create:questions",
  EDIT_QUESTIONS: "edit:questions",
  REVIEW_QUESTIONS: "review:questions",
  DELETE_QUESTIONS: "delete:questions",

  // Outras Gestões
  VIEW_USERS: "view:users",
  MANAGE_SUBJECTS: "manage:subjects",
  MANAGE_COURSES: "manage:courses",
  MANAGE_USERS: "manage:users",

  VIEW_REPORTS: "view:reports",
  SYSTEM_CONFIG: "system:config",
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

// Matriz de Acesso (Configuração de Segurança)
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),

  ADMIN: [
    PERMISSIONS.VIEW_ADMIN_MENU,
    PERMISSIONS.VIEW_PRINCIPAL_MENU,
    PERMISSIONS.MANAGE_QUESTIONS,
    PERMISSIONS.CREATE_QUESTIONS,
    PERMISSIONS.EDIT_QUESTIONS,
    PERMISSIONS.REVIEW_QUESTIONS,
    PERMISSIONS.DELETE_QUESTIONS,
    PERMISSIONS.MANAGE_SUBJECTS,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_REPORTS,
  ],

  PROFESSOR: [
    PERMISSIONS.VIEW_ADMIN_MENU,
    PERMISSIONS.VIEW_PRINCIPAL_MENU,
    PERMISSIONS.MANAGE_QUESTIONS,
    PERMISSIONS.CREATE_QUESTIONS,
    PERMISSIONS.EDIT_QUESTIONS,
    PERMISSIONS.MANAGE_SUBJECTS,
    PERMISSIONS.MANAGE_COURSES,
  ],

  REVISOR: [
    PERMISSIONS.VIEW_ADMIN_MENU,
    PERMISSIONS.VIEW_PRINCIPAL_MENU,
    PERMISSIONS.MANAGE_QUESTIONS,
    PERMISSIONS.REVIEW_QUESTIONS,
    PERMISSIONS.EDIT_QUESTIONS,
  ],

  SUPORTE: [
    PERMISSIONS.VIEW_ADMIN_MENU,
    PERMISSIONS.VIEW_PRINCIPAL_MENU,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.REVIEW_QUESTIONS,
  ],

  ALUNO: [PERMISSIONS.VIEW_PRINCIPAL_MENU],
}

export interface SecurityContext {
  userId: string
  role: Role
}

export type RouteArea =
  | "public"
  | "auth-api"
  | "student"
  | "admin"
  | "staff"
  | "private"

/**
 * Verifica se um cargo possui uma permissão específica.
 */
export function hasPermission(
  role: Role | undefined | null,
  permission: Permission
): boolean {
  if (!role) return false
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

/**
 * Controla a visibilidade da seção Administrativa no Sidebar.
 */
export function canViewAdminSection(role: Role | undefined | null): boolean {
  if (!role) return false
  return hasPermission(role, PERMISSIONS.VIEW_ADMIN_MENU)
}

export function canAccessStudentArea(role: Role | undefined | null): boolean {
  return hasPermission(role, PERMISSIONS.VIEW_PRINCIPAL_MENU)
}

export function canAccessAdminArea(role: Role | undefined | null): boolean {
  return canViewAdminSection(role)
}

export function canAccessStaffArea(role: Role | undefined | null): boolean {
  return (
    hasPermission(role, PERMISSIONS.MANAGE_QUESTIONS) ||
    hasPermission(role, PERMISSIONS.REVIEW_QUESTIONS) ||
    hasPermission(role, PERMISSIONS.MANAGE_USERS) ||
    hasPermission(role, PERMISSIONS.VIEW_REPORTS)
  )
}

export function canManageUsers(role: Role | undefined | null): boolean {
  return hasPermission(role, PERMISSIONS.MANAGE_USERS)
}

export function canCreateQuestion(role: Role | undefined | null): boolean {
  return hasPermission(role, PERMISSIONS.CREATE_QUESTIONS)
}

export function canReviewQuestion(role: Role | undefined | null): boolean {
  return hasPermission(role, PERMISSIONS.REVIEW_QUESTIONS)
}

export function canDeleteQuestion(role: Role | undefined | null): boolean {
  return hasPermission(role, PERMISSIONS.DELETE_QUESTIONS)
}

const ADMIN_ROUTE_PERMISSIONS: Array<{
  prefix: string
  permissions: Permission[]
}> = [
  { prefix: "/admin/acesso", permissions: [PERMISSIONS.MANAGE_USERS] },
  { prefix: "/admin/dificuldades", permissions: [PERMISSIONS.SYSTEM_CONFIG] },
  { prefix: "/admin/niveis-educacionais", permissions: [PERMISSIONS.SYSTEM_CONFIG] },
  { prefix: "/admin/tipos-questao", permissions: [PERMISSIONS.MANAGE_SUBJECTS] },
  { prefix: "/admin/disciplinas", permissions: [PERMISSIONS.MANAGE_SUBJECTS] },
  { prefix: "/admin/bancas", permissions: [PERMISSIONS.MANAGE_SUBJECTS] },
  { prefix: "/admin/carreiras", permissions: [PERMISSIONS.MANAGE_SUBJECTS] },
  { prefix: "/admin/concursos", permissions: [PERMISSIONS.MANAGE_SUBJECTS] },
  { prefix: "/admin/study-blocks", permissions: [PERMISSIONS.MANAGE_COURSES] },
  { prefix: "/api/admin/study-blocks", permissions: [PERMISSIONS.MANAGE_COURSES] },
  { prefix: "/admin/cadernos/criar", permissions: [PERMISSIONS.CREATE_QUESTIONS] },
  { prefix: "/admin/cadernos", permissions: [PERMISSIONS.MANAGE_COURSES] },
  { prefix: "/admin/questoes/revisar", permissions: [PERMISSIONS.MANAGE_QUESTIONS, PERMISSIONS.REVIEW_QUESTIONS] },
  { prefix: "/admin/questoes/revisao", permissions: [PERMISSIONS.MANAGE_QUESTIONS, PERMISSIONS.REVIEW_QUESTIONS] },
  { prefix: "/admin/questoes/revisada", permissions: [PERMISSIONS.MANAGE_QUESTIONS, PERMISSIONS.REVIEW_QUESTIONS] },
  { prefix: "/admin/questoes/importar", permissions: [PERMISSIONS.CREATE_QUESTIONS] },
  { prefix: "/admin/questoes/criar", permissions: [PERMISSIONS.CREATE_QUESTIONS] },
  { prefix: "/admin/questoes/editar", permissions: [PERMISSIONS.EDIT_QUESTIONS] },
  { prefix: "/admin/questoes", permissions: [PERMISSIONS.MANAGE_QUESTIONS] },
  { prefix: "/api/admin", permissions: [PERMISSIONS.MANAGE_QUESTIONS] },
]

export function getRequiredAdminPermission(pathname: string): Permission {
  return getRequiredAdminPermissions(pathname)[0] ?? PERMISSIONS.VIEW_ADMIN_MENU
}

export function getRequiredAdminPermissions(pathname: string): Permission[] {
  const match = ADMIN_ROUTE_PERMISSIONS.find((route) =>
    pathname === route.prefix || pathname.startsWith(`${route.prefix}/`)
  )

  return match?.permissions ?? [PERMISSIONS.VIEW_ADMIN_MENU]
}

export function canAccessAdminRoute(
  role: Role | undefined | null,
  pathname: string
): boolean {
  return getRequiredAdminPermissions(pathname).every((permission) =>
    hasPermission(role, permission)
  )
}

export function getRouteArea(pathname: string): RouteArea {
  if (pathname.startsWith("/api/auth")) return "auth-api"
  if (
    [
      "/",
      "/login",
      "/signup",
      "/register",
      "/forgot-password",
      "/termos-de-uso",
      "/politica-de-privacidade",
    ].includes(pathname)
  ) {
    return "public"
  }
  if (
    pathname.startsWith("/api/aluno") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/questions") ||
    pathname.startsWith("/questoes") ||
    pathname.startsWith("/planejamento") ||
    pathname.startsWith("/privacidade")
  ) {
    return "student"
  }
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) return "admin"
  if (pathname.startsWith("/painel")) return "staff"
  return "private"
}

export function canAccessRoute(
  role: Role | undefined | null,
  pathname: string
): boolean {
  const area = getRouteArea(pathname)

  if (area === "public" || area === "auth-api") return true
  if (area === "student" || area === "private")
    return canAccessStudentArea(role)
  if (area === "admin") return canAccessAdminRoute(role, pathname)
  if (area === "staff") return canAccessStaffArea(role)

  return false
}

/**
 * Função principal de segurança (Backend).
 * DEVE ser usada em Server Actions e rotas de API.
 */
export function validateAccess(
  context: SecurityContext,
  permission: Permission
): true {
  if (!hasPermission(context.role, permission)) {
    console.error(
      `[SECURITY] Acesso negado: User ${context.userId} tentou ${permission} sem permissão.`
    )
    throw new Error("FORBIDDEN: Permissão insuficiente para esta ação.")
  }

  return true
}

/**
 * Assertion para Alunos
 */
export function assertCanAnswerQuestion(context: SecurityContext) {
  return validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)
}

/**
 * Assertion para Staff
 */
export function assertCanManageQuestion(context: SecurityContext) {
  return validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)
}

export function assertCanManageUsers(context: SecurityContext) {
  return validateAccess(context, PERMISSIONS.MANAGE_USERS)
}
