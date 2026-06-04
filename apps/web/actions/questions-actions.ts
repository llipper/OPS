"use server"

import { auth } from "@workspace/auth"
import type { SecurityContext } from "@workspace/permissions"
import { revalidatePath } from "next/cache"

import {
  createAdminQuestionUseCase,
  getAdminQuestionReviewListUseCase,
  getQuestionCreationOptionsUseCase,
  publishAdminQuestionUseCase,
  updateAdminQuestionUseCase,
} from "@/features/questions/services/admin-question.service"
import type { CreateQuestionPayload } from "@/features/questions/schemas/admin-question.schema"

export type { CreateQuestionPayload } from "@/features/questions/schemas/admin-question.schema"

async function getSecurityContext(): Promise<SecurityContext> {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autorizado")

  return {
    userId: session.user.id,
    role: session.user.role,
  }
}

/**
 * Cria uma nova questão no painel administrativo.
 */
export async function createAdminQuestion(payload: CreateQuestionPayload) {
  const context = await getSecurityContext()
  const questao = await createAdminQuestionUseCase(context, payload)

  revalidatePath("/admin/questoes")
  revalidatePath("/admin/questoes/criar")

  return questao
}

/**
 * Atualiza uma questão existente.
 */
export async function updateAdminQuestion(id: string, payload: CreateQuestionPayload) {
  const context = await getSecurityContext()
  const questao = await updateAdminQuestionUseCase(context, id, payload)

  revalidatePath("/admin/questoes")
  revalidatePath(`/admin/questoes/editar/${id}`)
  revalidatePath("/admin/questoes/criar")

  return questao
}

/**
 * Busca todas as tabelas e dados auxiliares necessários para montar o form de criação de questões.
 */
export async function getQuestionCreationOptions() {
  const context = await getSecurityContext()
  return await getQuestionCreationOptionsUseCase(context)
}

/**
 * Lista questões em rascunho/revisão para validação editorial.
 */
export async function getAdminQuestionReviewList() {
  const context = await getSecurityContext()
  return await getAdminQuestionReviewListUseCase(context)
}

/**
 * Publica uma questão validada pelo revisor/admin.
 */
export async function publishAdminQuestion(id: string) {
  const context = await getSecurityContext()
  const questao = await publishAdminQuestionUseCase(context, id)

  revalidatePath("/admin/questoes")
  revalidatePath("/admin/questoes/revisao")
  revalidatePath("/admin/questoes/revisar")
  revalidatePath("/questions")

  return questao
}
