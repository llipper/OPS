"use server"

import { auth } from "@workspace/auth"
import type { SecurityContext } from "@workspace/permissions"
import { revalidatePath } from "next/cache"

import {
  analyzeQuestionImportUseCase,
  importQuestionsUseCase,
  type QuestionImportPayload,
} from "@/features/questions/services/question-import.service"

async function getSecurityContext(): Promise<SecurityContext> {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autorizado")

  return {
    userId: session.user.id,
    role: session.user.role,
  }
}

export async function analyzeQuestionImport(payload: QuestionImportPayload) {
  const context = await getSecurityContext()
  return analyzeQuestionImportUseCase(context, payload)
}

export async function importQuestions(payload: QuestionImportPayload) {
  const context = await getSecurityContext()
  const result = await importQuestionsUseCase(context, payload)

  revalidatePath("/admin/questoes")
  revalidatePath("/admin/questoes/importar")
  revalidatePath("/admin/questoes/revisar")

  return result
}
