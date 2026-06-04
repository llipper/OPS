"use server"

import { getSecurityContext } from "@/lib/auth/get-security-context"
import { QuestionService } from "../services/question.service"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@workspace/database"
import { rateLimitOrThrow } from "@/lib/security/rate-limit"

const answerSchema = z.object({
  questionId: z.string().uuid(),
  alternativeId: z.string().uuid(),
  timeSeconds: z.number().int().min(3).max(3600).optional(),
})

const favoriteSchema = z.object({
  questionId: z.string().uuid(),
})

export async function submitQuestionAnswer(input: z.infer<typeof answerSchema>) {
  const context = await getSecurityContext()
  const data = answerSchema.parse(input)

  await rateLimitOrThrow({
    key: `question-answer:${context.userId}`,
    limit: 30,
    windowSeconds: 60,
  })

  const result = await QuestionService.submitAnswer(context, data)

  revalidatePath("/dashboard")
  revalidatePath("/questoes/historico")
  revalidatePath("/estatisticas")

  return result
}

export async function toggleQuestionFavorite(input: z.infer<typeof favoriteSchema>) {
  const context = await getSecurityContext()
  const data = favoriteSchema.parse(input)

  const result = await QuestionService.toggleFavorite(context, data.questionId)

  revalidatePath("/questoes/favoritas")
  return result
}

const errorReasonSchema = z.object({
  questionId: z.string().uuid(),
  reason: z.enum([
    "FALTA_CONTEUDO",
    "ERRO_INTERPRETACAO",
    "CONFUNDI_ASSUNTO",
    "CHUTE",
    "FALTA_ATENCAO",
    "OUTRO",
  ]),
})

export async function saveAnswerErrorReason(input: z.infer<typeof errorReasonSchema>) {
  const context = await getSecurityContext()
  const { questionId, reason } = errorReasonSchema.parse(input)

  await rateLimitOrThrow({
    key: `question-error-reason:${context.userId}`,
    limit: 20,
    windowSeconds: 300,
  })

  await QuestionService.saveErrorReason(context, questionId, reason)

  revalidatePath("/estatisticas")
  return { success: true }
}

const reportSchema = z.object({
  questionId: z.string().uuid(),
  reason: z.string().min(3),
  description: z.string().optional(),
})

export async function reportQuestion(input: z.infer<typeof reportSchema>) {
  const context = await getSecurityContext()
  const { questionId, reason, description } = reportSchema.parse(input)

  await rateLimitOrThrow({
    key: `question-report:${context.userId}`,
    limit: 5,
    windowSeconds: 300,
  })

  await prisma.denuncia.upsert({
    where: { questaoId_usuarioId: { questaoId: questionId, usuarioId: context.userId } },
    create: { 
      questaoId: questionId, 
      usuarioId: context.userId, 
      motivo: reason, 
      descricao: description 
    },
    update: { 
      motivo: reason, 
      descricao: description, 
      status: "pendente" 
    },
  })

  return { success: true }
}
