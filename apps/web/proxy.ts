import { auth } from "@workspace/auth"
import { canAccessRoute, getRequiredAdminPermission, getRouteArea } from "@workspace/permissions"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(self), geolocation=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-DNS-Prefetch-Control": "off",
}

// Domínios Vercel da aplicação (produção + previews)
const VERCEL_DOMAINS = [
  "https://ops-web-beta.vercel.app",
  "https://ops-web-llipper-devs-projects.vercel.app",
  "https://ops-web-git-main-llipper-devs-projects.vercel.app",
  "https://ops-7659aj8a2-llipper-devs-projects.vercel.app",
]

function getAllowedOrigins(): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const origins = new Set(VERCEL_DOMAINS)
  if (appUrl) origins.add(appUrl)
  return Array.from(origins).join(" ")
}

function createNonce() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return btoa(String.fromCharCode(...bytes))
}

function createContentSecurityPolicy(nonce: string) {
  const isDevelopment = process.env.NODE_ENV === "development"
  const allowedOrigins = getAllowedOrigins()

  const directives = [
    "default-src 'self'",
    isDevelopment
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    `connect-src 'self' ${allowedOrigins}`,
    "media-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    `form-action 'self' ${allowedOrigins}`,
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
  ]

  if (!isDevelopment) {
    directives.push("upgrade-insecure-requests")
  }

  return directives.join("; ")
}

function isApiRoute(pathname: string) {
  return pathname.startsWith("/api/")
}

function withSecurityHeaders(
  response: NextResponse,
  options?: { private?: boolean; nonce?: string }
) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }

  if (options?.nonce) {
    response.headers.set("Content-Security-Policy", createContentSecurityPolicy(options.nonce))
  }

  if (options?.private) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")
    response.headers.set("Surrogate-Control", "no-store")
  }

  return response
}

function unauthorized(pathname: string, nextUrl: URL, nonce: string) {
  if (isApiRoute(pathname)) {
    return withSecurityHeaders(
      NextResponse.json({ error: "Não autenticado." }, { status: 401 }),
      { private: true, nonce }
    )
  }

  return withSecurityHeaders(NextResponse.redirect(new URL("/login", nextUrl)), {
    private: true,
    nonce,
  })
}

function forbidden(pathname: string, nextUrl: URL, nonce: string) {
  if (isApiRoute(pathname)) {
    return withSecurityHeaders(
      NextResponse.json({ error: "Permissão insuficiente." }, { status: 403 }),
      { private: true, nonce }
    )
  }

  return withSecurityHeaders(NextResponse.redirect(new URL("/dashboard", nextUrl)), {
    private: true,
    nonce,
  })
}

export async function proxy(req: NextRequest) {
  const nonce = createNonce()
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set("Content-Security-Policy", createContentSecurityPolicy(nonce))

  const { nextUrl } = req
  const pathname = nextUrl.pathname
  const routeArea = getRouteArea(pathname)

  if (routeArea === "auth-api") {
    return withSecurityHeaders(
      NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      }),
      { private: true, nonce }
    )
  }

  const session = await auth()
  const isLoggedIn = !!session
  const userRole = session?.user?.role

  if (isLoggedIn && pathname === "/login") {
    return withSecurityHeaders(NextResponse.redirect(new URL("/dashboard", nextUrl)), {
      private: true,
      nonce,
    })
  }

  if (routeArea === "public") {
    return withSecurityHeaders(
      NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      }),
      { nonce }
    )
  }

  if (!isLoggedIn) {
    return unauthorized(pathname, nextUrl, nonce)
  }

  if (!canAccessRoute(userRole, pathname)) {
    const requiredPermission =
      routeArea === "admin" ? ` (${getRequiredAdminPermission(pathname)})` : ""
    console.warn(
      `[SECURITY] Acesso bloqueado em ${pathname} para role: ${userRole}${requiredPermission}`
    )
    return forbidden(pathname, nextUrl, nonce)
  }

  return withSecurityHeaders(
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    }),
    { private: true, nonce }
  )
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
