"use server"

import { auth } from "@workspace/auth"
import type { SecurityContext } from "@workspace/permissions"
import { revalidatePath } from "next/cache"

import type { CreateTeacherNotebookPayload } from "@/features/notebooks/schemas/admin-notebook.schema"
import {
  createTeacherNotebookUseCase,
  getAdminNotebooksUseCase,
  getTeacherNotebookBuilderOptionsUseCase,
  publishAdminNotebookUseCase,
} from "@/features/notebooks/services/admin-notebook.service"

async function getSecurityContext(): Promise<SecurityContext> {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autorizado")

  return {
    userId: session.user.id,
    role: session.user.role,
  }
}

export async function getTeacherNotebookBuilderOptions() {
  return await getTeacherNotebookBuilderOptionsUseCase(await getSecurityContext())
}

export async function createTeacherNotebook(payload: CreateTeacherNotebookPayload) {
  const result = await createTeacherNotebookUseCase(await getSecurityContext(), payload)

  revalidatePath("/admin/cadernos")
  revalidatePath("/admin/cadernos/criar")
  revalidatePath("/admin/questoes/revisar")

  return result
}

export async function getAdminNotebooks() {
  return await getAdminNotebooksUseCase(await getSecurityContext())
}

export async function publishAdminNotebook(id: string) {
  const result = await publishAdminNotebookUseCase(await getSecurityContext(), id)

  revalidatePath("/admin/cadernos")
  revalidatePath("/questions")

  return result
}
