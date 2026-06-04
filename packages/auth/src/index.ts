import NextAuth, { type DefaultSession } from "next-auth"
import type { NextAuthConfig, NextAuthResult } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@workspace/database"
import bcrypt from "bcryptjs"
import { Role } from "@workspace/permissions"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

type LoginBucket = {
  count: number
  resetAt: number
}

const loginBuckets = new Map<string, LoginBucket>()
let upstashLoginLimiter: Ratelimit | null = null
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET

function assertStrongAuthSecret(secret: string | undefined) {
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET precisa ter pelo menos 32 caracteres.")
  }
}

assertStrongAuthSecret(authSecret)

function hasUpstashEnv() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  )
}

function getUpstashLoginLimiter() {
  if (upstashLoginLimiter) return upstashLoginLimiter

  upstashLoginLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "5 m"),
    analytics: true,
    prefix: "concurso-master:auth-login",
  })

  return upstashLoginLimiter
}

async function assertLoginRateLimit(email: string) {
  const key = email.toLowerCase().trim()

  if (hasUpstashEnv()) {
    const result = await getUpstashLoginLimiter().limit(key)
    if (!result.success) {
      throw new Error("RATE_LIMITED")
    }
    return
  }

  const now = Date.now()
  const current = loginBuckets.get(key)

  if (!current || current.resetAt <= now) {
    loginBuckets.set(key, {
      count: 1,
      resetAt: now + 5 * 60 * 1000,
    })
    return
  }

  if (current.count >= 5) {
    throw new Error("RATE_LIMITED")
  }

  current.count += 1
}

/**
 * Extensão dos tipos do NextAuth
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
      avatarUrl?: string | null
    } & DefaultSession["user"]
  }

  interface User {
    id?: string
    role: Role
    avatarUrl?: string | null
  }
}

/**
 * Configuração principal do NextAuth
 */
export const authConfig = {
  secret: authSecret,

  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
    updateAge: 60 * 60,
  },
  trustHost: process.env.NODE_ENV !== "production" || process.env.AUTH_TRUST_HOST === "true",

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) {
          return null
        }

        await assertLoginRateLimit(email)

        const normalizedEmail = email.toLowerCase().trim()

        const user = await prisma.usuario.findUnique({
          where: {
            email: normalizedEmail,
          },
          select: {
            id: true,
            nome: true,
            email: true,
            password: true,
            role: true,
            ativo: true,
            avatarUrl: true,
          },
        })

        if (!user || !user.password || !user.ativo) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) return null

        return {
          id: user.id,
          name: user.nome,
          email: user.email,
          role: user.role as Role,
          image: user.avatarUrl,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authToken = token as typeof token & {
          id?: string
          role?: Role
          avatarUrl?: string | null
        }

        authToken.id = user.id
        authToken.role = user.role
        authToken.avatarUrl = user.image ?? null
      }
      return token
    },

    async session({ session, token }) {
      const authToken = token as typeof token & {
        id?: string
        role?: Role
        avatarUrl?: string | null
      }

      if (session.user) {
        const dbUser = authToken.id
          ? await prisma.usuario.findUnique({
              where: { id: authToken.id },
              select: {
                nome: true,
                email: true,
                role: true,
                avatarUrl: true,
              },
            })
          : null

        session.user.id = authToken.id ?? ""
        session.user.role = (dbUser?.role ?? authToken.role) as Role
        session.user.avatarUrl = dbUser?.avatarUrl ?? authToken.avatarUrl ?? null
        session.user.image = dbUser?.avatarUrl ?? authToken.avatarUrl ?? null

        if (dbUser?.nome) {
          session.user.name = dbUser.nome
        }

        if (dbUser?.email) {
          session.user.email = dbUser.email
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig

const nextAuth = NextAuth({
  ...authConfig,
  secret: authSecret,
})

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers
export const auth: NextAuthResult["auth"] = nextAuth.auth
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut

/**
 * Helper opcional para buscar sessão no servidor
 */
export async function getSession() {
  return await auth()
}
