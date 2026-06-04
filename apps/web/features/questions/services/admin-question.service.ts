import {
  prisma,
  OrigemQuestao,
  StatusQuestao,
  TipoCobranca,
  TaxonomyService,
  generateQuestionCode,
  type Prisma,
} from "@workspace/database"
import { validateAccess, PERMISSIONS, type SecurityContext } from "@workspace/permissions"

import { createQuestionSchema, type CreateQuestionPayload } from "../schemas/admin-question.schema"

function nullable(value?: string | null) {
  return value && value.trim().length > 0 ? value.trim() : null
}

const tipoCobrancaMap: Record<string, TipoCobranca> = {
  lei_seca: "LEI_SECA",
  doutrina: "DOUTRINA",
  jurisprudencia: "JURISPRUDENCIA",
  sumulas: "JURISPRUDENCIA",
}

async function resolveCargoId(tx: Prisma.TransactionClient, data: CreateQuestionPayload) {
  if (!data.cargo || !data.concursoId) return null

  const cargoNome = data.cargo.trim()
  if (!cargoNome) return null

  const existingCargo = await tx.cargo.findFirst({
    where: {
      nome: cargoNome,
      concursoId: data.concursoId,
    },
    select: { id: true },
  })

  if (existingCargo) return existingCargo.id

  const newCargo = await tx.cargo.create({
    data: {
      nome: cargoNome,
      concursoId: data.concursoId,
    },
    select: { id: true },
  })

  return newCargo.id
}

function mapQuestionData(data: CreateQuestionPayload, cargoId: string | null) {
  const mappedTipoCobranca = data.tipoCobranca ? tipoCobrancaMap[data.tipoCobranca] : null

  return {
    disciplinaId: data.disciplinaId,
    assuntoId: data.assuntoId ?? null,
    topicoId: data.topicoId ?? null,
    subtopicoId: data.subtopicoId ?? null,
    bancaId: data.bancaId ?? null,
    concursoId: data.concursoId ?? null,
    carreiraId: data.carreiraId ?? null,
    nivelEducacionalId: data.nivelId ?? null,
    dificuldadeId: data.dificuldadeId ?? null,
    tipoQuestaoId: data.tipoId ?? null,
    cargoId,
    ano: data.ano ?? null,
    isUnique: data.isInedita,
    enunciado: data.enunciado,
    textoApoio: nullable(data.textoApoio),
    resolucao: nullable(data.resolucao),
    videoUrl: nullable(data.videoUrl),
    visibility: data.visibilidade,
    status: data.status === "published" ? StatusQuestao.PUBLICADA : StatusQuestao.RASCUNHO,
    origem: data.isInedita ? OrigemQuestao.INEDITA : OrigemQuestao.BANCA,
    tipoCobranca: mappedTipoCobranca,
  }
}

function mapAlternatives(data: CreateQuestionPayload) {
  return data.alternativas.map((alt, idx) => ({
    letra: alt.letter,
    texto: alt.text,
    isCorreta: alt.isCorrect,
    explicacao: nullable(alt.explanation),
    referencia: nullable(alt.reference || data.referencia),
    dica: nullable(alt.tip || (idx === 0 ? data.objetivo : null) || data.dica),
    ordem: idx,
  }))
}

export async function createAdminQuestionUseCase(context: SecurityContext, payload: CreateQuestionPayload) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)
  const data = createQuestionSchema.parse(payload)

  return await prisma.$transaction(async (tx) => {
    const code = await generateQuestionCode(tx)
    const cargoId = await resolveCargoId(tx, data)

    return await tx.questao.create({
      data: {
        code,
        ...mapQuestionData(data, cargoId),
        autorId: context.userId,
        alternativas: {
          create: mapAlternatives(data),
        },
      },
      select: {
        id: true,
        code: true,
        status: true,
      },
    })
  })
}

export async function updateAdminQuestionUseCase(
  context: SecurityContext,
  id: string,
  payload: CreateQuestionPayload
) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)
  const data = createQuestionSchema.parse(payload)

  return await prisma.$transaction(async (tx) => {
    const cargoId = await resolveCargoId(tx, data)

    return await tx.questao.update({
      where: { id },
      data: {
        ...mapQuestionData(data, cargoId),
        alternativas: {
          deleteMany: {},
          create: mapAlternatives(data),
        },
      },
      select: {
        id: true,
        code: true,
        status: true,
      },
    })
  })
}

export async function getQuestionCreationOptionsUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)

  const [
    disciplinasRaw,
    bancasRaw,
    concursosRaw,
    carreirasRaw,
    escolaridadesRaw,
    dificuldadesRaw,
    tiposQuestaoRaw,
  ] = await Promise.all([
    TaxonomyService.getDisciplinas(),
    TaxonomyService.getBancas(),
    TaxonomyService.getConcursos(),
    TaxonomyService.getCarreiras(),
    TaxonomyService.getNiveisEducacionais(),
    TaxonomyService.getDificuldades(),
    TaxonomyService.getTiposQuestao(),
  ])

  const disciplinas = disciplinasRaw.map((d) => ({
    value: d.id,
    label: d.nome,
    assuntos: d.assuntos.map((a) => ({
      value: a.id,
      label: a.nome,
      topicos: a.topicos.map((t) => ({
        value: t.id,
        label: t.nome,
        subtopicos: t.subtopicos.map((s) => ({
          value: s.id,
          label: s.nome,
        })),
      })),
    })),
  }))

  const bancas = bancasRaw.map((b) => ({
    value: b.id,
    label: `${b.nome}${b.sigla ? ` (${b.sigla})` : ""}`,
  }))

  const concursos = concursosRaw.map((c) => ({
    id: c.id,
    value: c.id,
    name: c.nome,
    ano: c.ano || undefined,
    carreiraId: c.carreiraId || undefined,
    cargos: c.cargos.map((cargo) => ({
      value: cargo.id,
      label: cargo.nome,
    })),
  }))

  const carreiras = carreirasRaw.map((car) => ({
    value: car.id,
    label: car.nome,
    children: car.children.map((child) => ({
      value: child.id,
      label: child.nome,
      children: child.children.map((gChild) => ({
        value: gChild.id,
        label: gChild.nome,
      })),
    })),
  }))

  const escolaridades = escolaridadesRaw.map((e) => ({
    value: e.id,
    label: e.nome,
  }))

  const dificuldades = dificuldadesRaw.map((d) => ({
    value: d.id,
    label: d.nome,
    cor: d.cor || "#64748B",
  }))

  const origens = Object.values(OrigemQuestao).map((val) => ({
    value: val,
    label: val === "INEDITA" ? "Inédita (Professor)" : val === "BANCA" ? "Prova Anterior (Banca)" : "Adaptada",
  }))

  const tiposCobranca = Object.values(TipoCobranca).map((val) => ({
    value: val,
    label: val === "LEI_SECA" ? "Lei Seca" : val === "DOUTRINA" ? "Doutrina" : val === "JURISPRUDENCIA" ? "Jurisprudência" : "Interpretação",
  }))

  const exclusividades = [
    { value: "true", label: "Exclusiva (Elite OPS)" },
    { value: "false", label: "Comum" },
  ]

  const tiposQuestao = tiposQuestaoRaw.map((t) => ({
    value: t.slug,
    label: t.nome,
  }))

  return {
    disciplinas,
    bancas,
    concursos,
    carreiras,
    escolaridades,
    dificuldades,
    origens,
    tiposCobranca,
    exclusividades,
    tiposQuestao,
  }
}

export async function getAdminQuestionReviewListUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)

  return await prisma.questao.findMany({
    where: {
      status: {
        in: [StatusQuestao.RASCUNHO, StatusQuestao.EM_REVISAO, StatusQuestao.APROVADA],
      },
    },
    orderBy: { criadoEm: "desc" },
    take: 100,
    select: {
      id: true,
      code: true,
      status: true,
      ano: true,
      isUnique: true,
      enunciado: true,
      textoApoio: true,
      resolucao: true,
      criadoEm: true,
      disciplina: { select: { nome: true } },
      assunto: { select: { nome: true } },
      topico: { select: { nome: true } },
      subtopico: { select: { nome: true } },
      banca: { select: { sigla: true, nome: true } },
      concurso: { select: { nome: true, ano: true } },
      dificuldade: { select: { nome: true } },
      autor: { select: { nome: true } },
      alternativas: {
        orderBy: { ordem: "asc" },
        select: {
          id: true,
          letra: true,
          texto: true,
          isCorreta: true,
          explicacao: true,
        },
      },
    },
  })
}

export async function publishAdminQuestionUseCase(context: SecurityContext, id: string) {
  validateAccess(context, PERMISSIONS.REVIEW_QUESTIONS)

  const question = await prisma.questao.findUnique({
    where: { id },
    select: {
      id: true,
      enunciado: true,
      resolucao: true,
      alternativas: {
        select: {
          id: true,
          isCorreta: true,
        },
      },
    },
  })

  if (!question) {
    throw new Error("Questão não encontrada.")
  }

  const correctCount = question.alternativas.filter((alternative) => alternative.isCorreta).length

  if (!question.enunciado.trim()) {
    throw new Error("A questão não possui enunciado.")
  }

  if (question.alternativas.length < 2 || question.alternativas.length > 5) {
    throw new Error("A questão precisa ter entre 2 e 5 alternativas.")
  }

  if (correctCount !== 1) {
    throw new Error("A questão precisa ter exatamente uma alternativa correta.")
  }

  return await prisma.questao.update({
    where: { id },
    data: {
      status: StatusQuestao.PUBLICADA,
      revisorId: context.userId,
      revisadaEm: new Date(),
    },
    select: {
      id: true,
      code: true,
      status: true,
    },
  })
}
