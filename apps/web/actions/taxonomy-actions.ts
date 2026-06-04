"use server"

import { auth } from "@workspace/auth"
import type { SecurityContext } from "@workspace/permissions"
import { revalidatePath } from "next/cache"

import {
  createAssuntoUseCase,
  createBancaUseCase,
  createCargoVinculadoUseCase,
  createCarreiraUseCase,
  createConcursoVinculadoUseCase,
  createDificuldadeUseCase,
  createDisciplinaUseCase,
  createNivelEducacionalUseCase,
  createSubtopicoUseCase,
  createTipoQuestaoUseCase,
  createTopicoUseCase,
  deleteAssuntoUseCase,
  deleteBancaUseCase,
  deleteCarreiraHierarchyItemUseCase,
  deleteCarreiraUseCase,
  deleteDificuldadeUseCase,
  deleteDisciplinaUseCase,
  deleteNivelEducacionalUseCase,
  deleteSubtopicoUseCase,
  deleteTipoQuestaoUseCase,
  deleteTopicoUseCase,
  getBancasUseCase,
  getCarreirasUseCase,
  getConcursosUseCase,
  getDificuldadesUseCase,
  getDisciplinasUseCase,
  getNiveisEducacionaisUseCase,
  getTiposQuestaoUseCase,
  moveTaxonomyItemUseCase,
  updateAssuntoUseCase,
  updateBancaUseCase,
  updateCargoUseCase,
  updateCarreiraUseCase,
  updateConcursoUseCase,
  updateDificuldadeUseCase,
  updateDisciplinaUseCase,
  updateNivelEducacionalUseCase,
  updateSubtopicoUseCase,
  updateTipoQuestaoUseCase,
  updateTopicoUseCase,
  type UpdateConcursoInput,
} from "@/features/taxonomy/services/taxonomy.service"

async function getSecurityContext(): Promise<SecurityContext> {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autorizado")

  return {
    userId: session.user.id,
    role: session.user.role,
  }
}

function revalidateDisciplinaRoutes() {
  revalidatePath("/admin/disciplinas")
}

function revalidateCarreiraRoutes() {
  revalidatePath("/admin/carreiras")
}

export async function updateDisciplina(id: string, data: { nome?: string; sigla?: string; ativo?: boolean }) {
  await updateDisciplinaUseCase(await getSecurityContext(), id, data)
  revalidateDisciplinaRoutes()
}

export async function updateAssunto(id: string, data: { nome?: string; ativo?: boolean }) {
  await updateAssuntoUseCase(await getSecurityContext(), id, data)
  revalidateDisciplinaRoutes()
}

export async function updateTopico(id: string, data: { nome?: string; ativo?: boolean }) {
  await updateTopicoUseCase(await getSecurityContext(), id, data)
  revalidateDisciplinaRoutes()
}

export async function updateSubtopico(id: string, data: { nome?: string; ativo?: boolean }) {
  await updateSubtopicoUseCase(await getSecurityContext(), id, data)
  revalidateDisciplinaRoutes()
}

export async function moveTaxonomyItem(id: string, newParentId: string | null, nivel: string) {
  await moveTaxonomyItemUseCase(await getSecurityContext(), id, newParentId, nivel)
  revalidateDisciplinaRoutes()
  revalidateCarreiraRoutes()
}

export async function getDisciplinasLista() {
  return await getDisciplinasUseCase(await getSecurityContext())
}

export async function createDisciplina(nome: string, sigla?: string) {
  await createDisciplinaUseCase(await getSecurityContext(), nome, sigla)
  revalidateDisciplinaRoutes()
}

export async function deleteDisciplina(id: string) {
  await deleteDisciplinaUseCase(await getSecurityContext(), id)
  revalidateDisciplinaRoutes()
}

export async function createAssunto(disciplinaId: string, nome: string) {
  await createAssuntoUseCase(await getSecurityContext(), disciplinaId, nome)
  revalidateDisciplinaRoutes()
}

export async function deleteAssunto(id: string) {
  await deleteAssuntoUseCase(await getSecurityContext(), id)
  revalidateDisciplinaRoutes()
}

export async function createTopico(assuntoId: string, nome: string) {
  await createTopicoUseCase(await getSecurityContext(), assuntoId, nome)
  revalidateDisciplinaRoutes()
}

export async function deleteTopico(id: string) {
  await deleteTopicoUseCase(await getSecurityContext(), id)
  revalidateDisciplinaRoutes()
}

export async function createSubtopico(topicoId: string, nome: string) {
  await createSubtopicoUseCase(await getSecurityContext(), topicoId, nome)
  revalidateDisciplinaRoutes()
}

export async function deleteSubtopico(id: string) {
  await deleteSubtopicoUseCase(await getSecurityContext(), id)
  revalidateDisciplinaRoutes()
}

export async function getTiposQuestao() {
  return await getTiposQuestaoUseCase(await getSecurityContext())
}

export async function createTipoQuestao(nome: string, sigla: string, formato?: string, quantidadeAlternativas?: number) {
  await createTipoQuestaoUseCase(await getSecurityContext(), nome, sigla, formato, quantidadeAlternativas)
  revalidatePath("/admin/tipos-questao")
}

export async function updateTipoQuestao(
  id: string,
  data: { nome?: string; sigla?: string; formato?: string; quantidadeAlternativas?: number; ativo?: boolean }
) {
  await updateTipoQuestaoUseCase(await getSecurityContext(), id, data)
  revalidatePath("/admin/tipos-questao")
}

export async function deleteTipoQuestao(id: string) {
  await deleteTipoQuestaoUseCase(await getSecurityContext(), id)
  revalidatePath("/admin/tipos-questao")
}

export async function getNiveisEducacionais() {
  return await getNiveisEducacionaisUseCase(await getSecurityContext())
}

export async function createNivelEducacional(data: { nome: string; slug?: string; ordem?: number }) {
  await createNivelEducacionalUseCase(await getSecurityContext(), data)
  revalidatePath("/admin/niveis-educacionais")
}

export async function updateNivelEducacional(id: string, data: { nome?: string; ativo?: boolean; ordem?: number }) {
  await updateNivelEducacionalUseCase(await getSecurityContext(), id, data)
  revalidatePath("/admin/niveis-educacionais")
}

export async function deleteNivelEducacional(id: string) {
  await deleteNivelEducacionalUseCase(await getSecurityContext(), id)
  revalidatePath("/admin/niveis-educacionais")
}

export async function getDificuldades() {
  return await getDificuldadesUseCase(await getSecurityContext())
}

export async function createDificuldade(data: { nome: string; slug?: string; peso?: number; ordem?: number; cor?: string }) {
  await createDificuldadeUseCase(await getSecurityContext(), data)
  revalidatePath("/admin/dificuldades")
}

export async function updateDificuldade(
  id: string,
  data: { nome?: string; peso?: number; ordem?: number; cor?: string; ativo?: boolean }
) {
  await updateDificuldadeUseCase(await getSecurityContext(), id, data)
  revalidatePath("/admin/dificuldades")
}

export async function deleteDificuldade(id: string) {
  await deleteDificuldadeUseCase(await getSecurityContext(), id)
  revalidatePath("/admin/dificuldades")
}

export async function getBancas() {
  return await getBancasUseCase(await getSecurityContext())
}

export async function createBanca(data: { nome: string; sigla?: string; cor?: string; ordem?: number }) {
  await createBancaUseCase(await getSecurityContext(), data)
  revalidatePath("/admin/bancas")
}

export async function updateBanca(id: string, data: { nome?: string; sigla?: string; ativo?: boolean; cor?: string; ordem?: number }) {
  await updateBancaUseCase(await getSecurityContext(), id, data)
  revalidatePath("/admin/bancas")
}

export async function deleteBanca(id: string) {
  await deleteBancaUseCase(await getSecurityContext(), id)
  revalidatePath("/admin/bancas")
}

export async function getCarreiras() {
  return await getCarreirasUseCase(await getSecurityContext())
}

export async function createCarreira(data: { nome: string; parentId?: string | null }) {
  await createCarreiraUseCase(await getSecurityContext(), data)
  revalidateCarreiraRoutes()
}

export async function updateCarreira(id: string, data: { nome?: string; ativo?: boolean }) {
  await updateCarreiraUseCase(await getSecurityContext(), id, data)
  revalidateCarreiraRoutes()
}

export async function deleteCarreira(id: string) {
  await deleteCarreiraUseCase(await getSecurityContext(), id)
  revalidateCarreiraRoutes()
}

export async function getConcursos() {
  return await getConcursosUseCase(await getSecurityContext())
}

export async function createConcursoVinculado(carreiraId: string, formData: FormData) {
  await createConcursoVinculadoUseCase(await getSecurityContext(), carreiraId, formData)
  revalidateCarreiraRoutes()
}

export async function createCargoVinculado(concursoId: string, nome: string) {
  await createCargoVinculadoUseCase(await getSecurityContext(), concursoId, nome)
  revalidateCarreiraRoutes()
}

export async function updateCargo(id: string, data: { nome?: string; ativo?: boolean }) {
  await updateCargoUseCase(await getSecurityContext(), id, data)
  revalidateCarreiraRoutes()
}

export async function deleteCarreiraHierarchyItem(id: string, nivel: string) {
  await deleteCarreiraHierarchyItemUseCase(await getSecurityContext(), id, nivel)
  revalidateCarreiraRoutes()
}

export async function updateConcurso(id: string, data: FormData | UpdateConcursoInput) {
  await updateConcursoUseCase(await getSecurityContext(), id, data)
  revalidateCarreiraRoutes()
}
