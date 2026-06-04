import { TaxonomyService } from "@workspace/database"
import { validateAccess, PERMISSIONS, type SecurityContext } from "@workspace/permissions"

import { processBase64ImageUpload } from "@/lib/storage/upload-helpers"

type BaseUpdateInput = { nome?: string; ativo?: boolean }

export type UpdateConcursoInput = {
  nome?: string
  ano?: number
  cargo?: string
  ativo?: boolean
  imagemUrl?: string
}

function assertCanManageSubjects(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.MANAGE_SUBJECTS)
}

export async function updateDisciplinaUseCase(context: SecurityContext, id: string, data: BaseUpdateInput & { sigla?: string }) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateDisciplina(id, data)
}

export async function updateAssuntoUseCase(context: SecurityContext, id: string, data: BaseUpdateInput) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateAssunto(id, data)
}

export async function updateTopicoUseCase(context: SecurityContext, id: string, data: BaseUpdateInput) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateTopico(id, data)
}

export async function updateSubtopicoUseCase(context: SecurityContext, id: string, data: BaseUpdateInput) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateSubtopico(id, data)
}

export async function moveTaxonomyItemUseCase(context: SecurityContext, id: string, newParentId: string | null, nivel: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.moveItem(id, newParentId, nivel)
}

export async function getDisciplinasUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)
  return await TaxonomyService.getDisciplinas()
}

export async function createDisciplinaUseCase(context: SecurityContext, nome: string, sigla?: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createDisciplina({ nome, sigla: sigla ?? "" })
}

export async function deleteDisciplinaUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteDisciplina(id)
}

export async function createAssuntoUseCase(context: SecurityContext, disciplinaId: string, nome: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createAssunto({ disciplinaId, nome })
}

export async function deleteAssuntoUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteAssunto(id)
}

export async function createTopicoUseCase(context: SecurityContext, assuntoId: string, nome: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createTopico({ assuntoId, nome })
}

export async function deleteTopicoUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteTopico(id)
}

export async function createSubtopicoUseCase(context: SecurityContext, topicoId: string, nome: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createSubtopico({ topicoId, nome })
}

export async function deleteSubtopicoUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteSubtopico(id)
}

export async function getTiposQuestaoUseCase(context: SecurityContext) {
  assertCanManageSubjects(context)
  const tipos = await TaxonomyService.getTiposQuestao()
  return tipos.map((t) => ({
    id: t.id,
    rawId: t.id,
    title: t.nome,
    subtitle: t.slug,
    formato: t.formato,
    quantidadeAlternativas: t.quantidadeAlternativas,
    ativo: t.ativo,
    count: t._count?.questoes || 0,
  }))
}

export async function createTipoQuestaoUseCase(
  context: SecurityContext,
  nome: string,
  sigla: string,
  formato?: string,
  quantidadeAlternativas?: number
) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createTipoQuestao({ nome, slug: sigla, formato, quantidadeAlternativas })
}

export async function updateTipoQuestaoUseCase(
  context: SecurityContext,
  id: string,
  data: { nome?: string; sigla?: string; formato?: string; quantidadeAlternativas?: number; ativo?: boolean }
) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateTipoQuestao(id, {
    nome: data.nome,
    slug: data.sigla,
    formato: data.formato,
    quantidadeAlternativas: data.quantidadeAlternativas,
    ativo: data.ativo,
  })
}

export async function deleteTipoQuestaoUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteTipoQuestao(id)
}

export async function getNiveisEducacionaisUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)
  return await TaxonomyService.getNiveisEducacionais()
}

export async function createNivelEducacionalUseCase(context: SecurityContext, data: { nome: string; slug?: string; ordem?: number }) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createNivelEducacional(data)
}

export async function updateNivelEducacionalUseCase(context: SecurityContext, id: string, data: BaseUpdateInput & { ordem?: number }) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateNivelEducacional(id, data)
}

export async function deleteNivelEducacionalUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteNivelEducacional(id)
}

export async function getDificuldadesUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)
  return await TaxonomyService.getDificuldades()
}

export async function createDificuldadeUseCase(
  context: SecurityContext,
  data: { nome: string; slug?: string; peso?: number; ordem?: number; cor?: string }
) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createDificuldade(data)
}

export async function updateDificuldadeUseCase(
  context: SecurityContext,
  id: string,
  data: BaseUpdateInput & { peso?: number; ordem?: number; cor?: string }
) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateDificuldade(id, data)
}

export async function deleteDificuldadeUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteDificuldade(id)
}

export async function getBancasUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)
  return await TaxonomyService.getBancas()
}

export async function createBancaUseCase(context: SecurityContext, data: { nome: string; sigla?: string; cor?: string; ordem?: number }) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createBanca(data)
}

export async function updateBancaUseCase(
  context: SecurityContext,
  id: string,
  data: BaseUpdateInput & { sigla?: string; cor?: string; ordem?: number }
) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateBanca(id, data)
}

export async function deleteBancaUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteBanca(id)
}

export async function getCarreirasUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)
  return await TaxonomyService.getCarreiras()
}

export async function createCarreiraUseCase(context: SecurityContext, data: { nome: string; parentId?: string | null }) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createCarreira(data)
}

export async function updateCarreiraUseCase(context: SecurityContext, id: string, data: BaseUpdateInput) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateCarreira(id, data)
}

export async function deleteCarreiraUseCase(context: SecurityContext, id: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteCarreira(id)
}

export async function getConcursosUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)
  return await TaxonomyService.getConcursos()
}

export async function createConcursoVinculadoUseCase(context: SecurityContext, carreiraId: string, formData: FormData) {
  assertCanManageSubjects(context)

  const nome = (formData.get("nome") as string) || ""
  const cargo = (formData.get("cargo") as string) || undefined
  const anoStr = formData.get("ano") as string
  const ano = anoStr ? parseInt(anoStr) : new Date().getFullYear()
  const fileBase64 = formData.get("fileBase64") as string | null
  const fileType = (formData.get("fileType") as string) || "image/png"
  const uploadedUrl = await processBase64ImageUpload(fileBase64, fileType, "concursos")
  const imagemUrl = uploadedUrl || ((formData.get("imagemUrl") as string) || undefined)

  return await TaxonomyService.createConcursoVinculado(carreiraId || null, {
    nome,
    ano,
    imagemUrl,
    cargo: cargo || undefined,
  })
}

export async function createCargoVinculadoUseCase(context: SecurityContext, concursoId: string, nome: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.createCargoVinculado(concursoId, nome)
}

export async function updateCargoUseCase(context: SecurityContext, id: string, data: BaseUpdateInput) {
  assertCanManageSubjects(context)
  return await TaxonomyService.updateCargo(id, data)
}

export async function deleteCarreiraHierarchyItemUseCase(context: SecurityContext, id: string, nivel: string) {
  assertCanManageSubjects(context)
  return await TaxonomyService.deleteHierarchyItem(id, nivel)
}

export async function updateConcursoUseCase(context: SecurityContext, id: string, data: FormData | UpdateConcursoInput) {
  assertCanManageSubjects(context)

  if (data instanceof FormData) {
    const nome = data.get("nome") as string
    const ativo = data.get("ativo") === "true"
    const anoStr = data.get("ano") as string
    const ano = anoStr ? parseInt(anoStr) : undefined
    const fileBase64 = data.get("fileBase64") as string | null
    const fileType = (data.get("fileType") as string) || "image/png"
    const uploadedUrl = await processBase64ImageUpload(fileBase64, fileType, "concursos")
    const imagemUrl = uploadedUrl || ((data.get("imagemUrl") as string) || undefined)

    return await TaxonomyService.updateConcurso(id, { nome, ativo, imagemUrl, ano })
  }

  return await TaxonomyService.updateConcurso(id, data)
}
