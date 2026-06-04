import { prisma } from "@workspace/database"
import type { Prisma } from "@workspace/database"

export const RESOLVER_PAGE_SIZE = 10
const NIL_UUID = "00000000-0000-0000-0000-000000000000"
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export type ResolverSearchParams = {
  notebookId?: string
  page?: string
  disciplinaId?: string
  assuntoId?: string
  topicoId?: string
  subtopicoId?: string
  bancaId?: string
  concursoId?: string
  carreiraId?: string
  cargo?: string
  dificuldade?: string
  ano?: string
  questaoId?: string
}

export type ResolverStats = {
  totalPublishedQuestions: number
  totalFilteredQuestions: number
  currentPageStart: number
  currentPageEnd: number
  pageSize: number
  activeFilterCount: number
}

function htmlToText(value?: string | null) {
  if (!value) return null

  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

function uniqueOptions<T>(
  items: T[],
  getValue: (item: T) => string | null | undefined,
  getLabel: (item: T) => string | null | undefined = getValue
) {
  const map = new Map<string, string>()

  for (const item of items) {
    const value = getValue(item)
    const label = getLabel(item)

    if (value && label && !map.has(value)) {
      map.set(value, label)
    }
  }

  return Array.from(map, ([value, label]) => ({ value, label }))
}

function getCurrentPage(page?: string) {
  return Math.max(1, Number(page) || 1)
}

function isUuid(value?: string) {
  return Boolean(value && UUID_PATTERN.test(value))
}

function hasInvalidUuid(params: ResolverSearchParams) {
  return [
    "notebookId",
    "disciplinaId",
    "assuntoId",
    "topicoId",
    "subtopicoId",
    "bancaId",
    "concursoId",
    "carreiraId",
    "questaoId",
  ].some((key) => {
    const value = params[key as keyof ResolverSearchParams]
    return Boolean(value && !isUuid(value))
  })
}

function getNoMatchWhere() {
  return { id: NIL_UUID } satisfies Prisma.QuestaoWhereInput
}

function getNotebookAccessWhere(notebookId: string, userId?: string) {
  return {
    cadernos: {
      some: {
        cadernoId: notebookId,
        caderno: {
          OR: [
            ...(userId ? [{ criadoPorId: userId }] : []),
            { visibilidade: "PUBLICO" as const },
          ],
        },
      },
    },
  } satisfies Prisma.QuestaoWhereInput
}

function buildWhereClause(
  params: ResolverSearchParams,
  userId?: string
): Prisma.QuestaoWhereInput {
  const { notebookId, disciplinaId, assuntoId, topicoId, subtopicoId, bancaId, concursoId, carreiraId, cargo, dificuldade, ano, questaoId } = params

  if (hasInvalidUuid(params)) {
    return getNoMatchWhere()
  }

  if (questaoId) {
    return {
      id: questaoId,
      ...(notebookId ? getNotebookAccessWhere(notebookId, userId) : { status: "PUBLICADA" }),
    }
  }

  return {
    ...(notebookId
      ? {
          cadernos: {
            some: {
              cadernoId: notebookId,
              caderno: {
                OR: [
                  ...(userId ? [{ criadoPorId: userId }] : []),
                  { visibilidade: "PUBLICO" },
                ],
              },
            },
          },
        }
      : {
          status: "PUBLICADA",
        }),
    ...(disciplinaId ? { disciplinaId } : {}),
    ...(assuntoId ? { assuntoId } : {}),
    ...(topicoId ? { topicoId } : {}),
    ...(subtopicoId ? { subtopicoId } : {}),
    ...(bancaId ? { bancaId } : {}),
    ...(concursoId ? { concursoId } : {}),
    ...(carreiraId ? { carreiraId } : {}),
    ...(cargo ? { cargo: { nome: { startsWith: cargo } } } : {}),
    ...(dificuldade ? { dificuldade: { slug: dificuldade } } : {}),
    ...(ano && /^(19|20|21)\d{2}$/.test(ano) ? { ano: Number(ano) } : {}),
  }
}

function getActiveFilterCount(params: ResolverSearchParams) {
  return [
    "notebookId",
    "disciplinaId",
    "assuntoId",
    "topicoId",
    "subtopicoId",
    "bancaId",
    "concursoId",
    "carreiraId",
    "cargo",
    "dificuldade",
    "ano",
    "questaoId",
  ].filter((key) => Boolean(params[key as keyof ResolverSearchParams])).length
}

const questionInclude = {
  disciplina: { select: { nome: true } },
  assunto: { select: { nome: true } },
  topico: { select: { nome: true } },
  banca: { select: { sigla: true, nome: true } },
  concurso: { select: { nome: true } },
  carreira: { select: { nome: true } },
  nivelEducacional: { select: { nome: true } },
  dificuldade: { select: { slug: true, nome: true } },
  alternativas: {
    orderBy: { letra: "asc" },
    select: {
      id: true,
      letra: true,
      texto: true,
      ordem: true,
    },
  },
  autor: { select: { id: true, nome: true, avatarUrl: true } },
} satisfies Prisma.QuestaoInclude

type ResolverQuestion = Prisma.QuestaoGetPayload<{ include: typeof questionInclude }>
type ResolverUserAnswer = {
  isCorreta: boolean
  respondidoEm: Date
}

function serializeQuestion(questao: ResolverQuestion, userAnswer?: ResolverUserAnswer) {
  const alternatives = questao.alternativas.map((alternativa) => ({
    id: alternativa.id,
    letter: alternativa.letra,
    text: htmlToText(alternativa.texto) ?? "",
  }))

  return {
    id: questao.id,
    code: questao.code,
    discipline: questao.disciplina?.nome ?? "Sem disciplina",
    subject: questao.assunto?.nome ?? null,
    topic: questao.topico?.nome ?? null,
    board: questao.banca?.sigla ?? questao.banca?.nome ?? null,
    institution: questao.concurso?.nome ?? null,
    career: questao.carreira?.nome ?? null,
    educationLevel: questao.nivelEducacional?.nome ?? null,
    year: questao.ano ?? undefined,
    questionText: htmlToText(questao.enunciado) ?? "Questão sem enunciado",
    supportText: htmlToText(questao.textoApoio),
    difficulty: questao.dificuldade?.slug ?? "medio",
    resolution: null,
    videoUrl: questao.videoUrl,
    imageUrl: questao.imagemUrl,
    videos: questao.videoUrl ? [{ title: "Videoaula", url: questao.videoUrl }] : [],
    userState: userAnswer
      ? {
          hasAnswered: true,
          isCorrect: userAnswer.isCorreta,
          lastAnsweredAt: userAnswer.respondidoEm.toISOString(),
        }
      : {
          hasAnswered: false,
          isCorrect: null,
        },
    objectives: [],
    references: [],
    alternatives,
    isUnique: questao.isUnique,
    stats: {
      totalAnswers: questao.totalRespostas,
      correctRate: Number(questao.taxaAcerto),
      averageTimeSeconds: questao.tempoMedioSeg,
    },
    author: {
      id: questao.autor?.id ?? "admin",
      name: questao.autor?.nome ?? "Administrador",
      avatarUrl: questao.autor?.avatarUrl ?? null,
    },
  }
}

export async function getResolverQuestions(params: ResolverSearchParams, userId?: string) {
  const currentPage = getCurrentPage(params.page)
  const whereClause = buildWhereClause(params, userId)
  const skip = (currentPage - 1) * RESOLVER_PAGE_SIZE

  const [questoes, totalCount, totalPublishedQuestions] = await Promise.all([
    prisma.questao.findMany({
      where: whereClause,
      orderBy: { criadoEm: "desc" },
      skip,
      take: RESOLVER_PAGE_SIZE,
      include: questionInclude,
    }),
    prisma.questao.count({
      where: whereClause,
    }),
    prisma.questao.count({
      where: { status: "PUBLICADA" },
    }),
  ])

  const latestAnswersByQuestion = new Map<string, ResolverUserAnswer>()

  if (userId && questoes.length > 0) {
    const answers = await prisma.respostaUsuario.findMany({
      where: {
        usuarioId: userId,
        questaoId: { in: questoes.map((questao) => questao.id) },
      },
      orderBy: { respondidoEm: "desc" },
      select: {
        questaoId: true,
        isCorreta: true,
        respondidoEm: true,
      },
    })

    for (const answer of answers) {
      if (!latestAnswersByQuestion.has(answer.questaoId)) {
        latestAnswersByQuestion.set(answer.questaoId, {
          isCorreta: answer.isCorreta,
          respondidoEm: answer.respondidoEm,
        })
      }
    }
  }

  return {
    currentPage,
    totalCount,
    totalPages: Math.ceil(totalCount / RESOLVER_PAGE_SIZE),
    stats: {
      totalPublishedQuestions,
      totalFilteredQuestions: totalCount,
      currentPageStart: totalCount === 0 ? 0 : skip + 1,
      currentPageEnd: Math.min(skip + questoes.length, totalCount),
      pageSize: RESOLVER_PAGE_SIZE,
      activeFilterCount: getActiveFilterCount(params),
    } satisfies ResolverStats,
    questions: questoes.map((questao) => serializeQuestion(questao, latestAnswersByQuestion.get(questao.id))),
  }
}

export async function getResolverPageData(params: ResolverSearchParams, userId?: string) {
  const [
    questionData,
    disciplinas,
    assuntos,
    topicos,
    subtopicos,
    bancas,
    concursos,
    carreiras,
    niveis,
    dificuldades,
    todasQuestoes,
    notebook,
  ] = await Promise.all([
    getResolverQuestions(params, userId),
    prisma.disciplina.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true },
    }),
    prisma.assunto.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, disciplinaId: true },
    }),
    prisma.topico.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, assuntoId: true },
    }),
    prisma.subtopico.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, topicoId: true },
    }),
    prisma.banca.findMany({
      where: { ativo: true },
      orderBy: { sigla: "asc" },
      select: { id: true, nome: true, sigla: true },
    }),
    prisma.concurso.findMany({
      where: { ativo: true },
      orderBy: [{ ano: "desc" }, { nome: "asc" }],
      select: { id: true, nome: true, ano: true, carreiraId: true, cargos: { select: { nome: true } } },
    }),
    prisma.carreira.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, parentId: true },
    }),
    prisma.nivelEducacional.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true },
    }),
    prisma.dificuldade.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, slug: true },
    }),
    prisma.questao.findMany({
      where: { status: "PUBLICADA" },
      select: { id: true, code: true, enunciado: true },
      orderBy: { code: "asc" }
    }),
    params.notebookId
      ? prisma.caderno.findFirst({
          where: {
            id: params.notebookId,
            OR: [
              ...(userId ? [{ criadoPorId: userId }] : []),
              { visibilidade: "PUBLICO" },
            ],
          },
        })
      : null,
  ])

  return {
    ...questionData,
    notebook,
    filterOptions: {
      disciplinas: disciplinas.map((disciplina) => ({
        label: disciplina.nome,
        value: disciplina.id,
      })),
      assuntos: assuntos.map((assunto) => ({
        label: assunto.nome,
        value: assunto.id,
        disciplinaId: assunto.disciplinaId,
      })),
      topicos: topicos.map((topico) => ({
        label: topico.nome,
        value: topico.id,
        assuntoId: topico.assuntoId,
      })),
      subtopicos: subtopicos.map((subtopico) => ({
        label: subtopico.nome,
        value: subtopico.id,
        topicoId: subtopico.topicoId,
      })),
      bancas: bancas.map((banca) => ({
        label: `${banca.sigla} - ${banca.nome}`,
        value: banca.id,
      })),
      concursos: concursos.map((concurso) => ({
        id: concurso.id,
        name: concurso.nome,
        ano: concurso.ano ?? undefined,
        icon: "landmark" as const,
        carreiraId: concurso.carreiraId,
        cargos: concurso.cargos.map((cargo) => cargo.nome),
      })),
      carreiras: carreiras.map((carreira) => ({
        label: carreira.nome,
        value: carreira.id,
        parentId: carreira.parentId,
      })),
      escolaridades: niveis.map((nivel) => ({
        label: nivel.nome,
        value: nivel.id,
      })),
      anos: uniqueOptions(concursos, (concurso) => concurso.ano?.toString()),
      dificuldades: dificuldades.map((dificuldade) => ({
        label: dificuldade.nome,
        value: dificuldade.slug,
      })),
      questoes: todasQuestoes.map((q) => ({
        label: `${q.code} - ${htmlToText(q.enunciado)?.slice(0, 60) || "Sem enunciado"}...`,
        value: q.id,
      })),
    },
  }
}
