"use server"

import { signIn } from "@workspace/auth"
import { AuthError } from "next-auth"
import { z } from "zod"
import { headers } from "next/headers"
import { rateLimitOrThrow } from "@/lib/security/rate-limit"

const LoginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
})

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const validatedFields = LoginSchema.safeParse(
      Object.fromEntries(formData.entries()),
    )

    if (!validatedFields.success) {
      return validatedFields.error.flatten().fieldErrors.email?.[0] || 
             validatedFields.error.flatten().fieldErrors.password?.[0] ||
             "Dados inválidos."
    }

    const { email, password } = validatedFields.data
    const headerList = await headers()
    const ip =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerList.get("x-real-ip") ??
      "unknown"

    await rateLimitOrThrow({
      key: `login:${ip}:${email.toLowerCase()}`,
      limit: 5,
      windowSeconds: 300,
    })

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "E-mail ou senha incorretos."
        default:
          return "Ocorreu um erro na autenticação."
      }
    }
    throw error
  }
}
