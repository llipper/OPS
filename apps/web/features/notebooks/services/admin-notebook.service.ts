import {
  OrigemQuestao,
  StatusQuestao,
  VisibilidadeCaderno,
  generateQuestionCode,
  prisma,
  type Prisma,
} from "@workspace/database"
import { PERMISSIONS, validateAccess, type SecurityContext } from "@workspace/permissions"

import {
  createTeacherNotebookSchema,
  type CreateTeacherNotebookPayload,
} from "../schemas/admin-notebook.schema"

function nullable(value?: string | null) {
  return value && value.trim().length > 0 ? value.trim() : null
}

function mapAlternatives(question: CreateTeacherNotebookPayload["questions"][number]) {
  return question.alternativas.map((alternative, index) => ({
    letra: alternative.letter,
    texto: alternative.text,
    isCorreta: alternative.isCorrect,
    explicacao: nullable(alternative.explanation),
    ordem: index,
  }))
}

async function createNotebookQuestion(
  tx: Prisma.TransactionClient,
  context: SecurityContext,
  payload: CreateTeacherNotebookPayload,
  question: CreateTeacherNotebookPayload["questions"][number]
) {
  const code = await generateQuestionCode(tx)

  return await tx.questao.create({
    data: {
      code,
      autorId: context.userId,
      disciplinaId: payload.disciplinaId,
      assuntoId: question.assuntoId ?? null,
      topicoId: question.topicoId ?? null,
      subtopicoId: question.subtopicoId ?? null,
      bancaId: payload.bancaId ?? null,
      concursoId: payload.concursoId,
      carreiraId: payload.carreiraId ?? null,
      nivelEducacionalId: payload.nivelId ?? null,
      dificuldadeId: question.dificuldadeId ?? null,
      tipoQuestaoId: question.tipoId ?? null,
      ano: payload.ano ?? null,
      isUnique: true,
      origem: OrigemQuestao.INEDITA,
      status: StatusQuestao.RASCUNHO,
      visibility: "privada",
      textoApoio: nullable(question.textoApoio),
      enunciado: question.enunciado,
      resolucao: question.resolucao,
      alternativas: {
        create: mapAlternatives(question),
      },
    },
    select: {
      id: true,
      code: true,
    },
  })
}

export async function getTeacherNotebookBuilderOptionsUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)

  const [concursos, disciplinas, bancas, dificuldades, tiposQuestao] = await Promise.all([
    prisma.concurso.findMany({
      where: { ativo: true },
      orderBy: [{ ano: "desc" }, { nome: "asc" }],
      select: {
        id: true,
        nome: true,
        ano: true,
        carreiraId: true,
        nivelEducacionalId: true,
        cargos: {
          where: { ativo: true },
          orderBy: { nome: "asc" },
          select: { id: true, nome: true },
        },
      },
    }),
    prisma.disciplina.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: {
        id: true,
        nome: true,
        sigla: true,
        assuntos: {
          where: { ativo: true },
          orderBy: [{ ordem: "asc" }, { nome: "asc" }],
          select: {
            id: true,
            nome: true,
            topicos: {
              where: { ativo: true },
              orderBy: [{ ordem: "asc" }, { nome: "asc" }],
              select: {
                id: true,
                nome: true,
                subtopicos: {
                  where: { ativo: true },
                  orderBy: [{ ordem: "asc" }, { nome: "asc" }],
                  select: { id: true, nome: true },
                },
              },
            },
          },
        },
      },
    }),
    prisma.banca.findMany({
      where: { ativo: true },
      orderBy: [{ sigla: "asc" }, { nome: "asc" }],
      select: { id: true, nome: true, sigla: true },
    }),
    prisma.dificuldade.findMany({
      where: { ativo: true },
      orderBy: [{ ordem: "asc" }, { nome: "asc" }],
      select: { id: true, nome: true, slug: true },
    }),
    prisma.tipoQuestao.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, slug: true, formato: true, quantidadeAlternativas: true },
    }),
  ])

  return {
    concursos,
    disciplinas,
    bancas,
    dificuldades,
    tiposQuestao,
  }
}

export async function createTeacherNotebookUseCase(context: SecurityContext, payload: CreateTeacherNotebookPayload) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)
  const data = createTeacherNotebookSchema.parse(payload)

  return await prisma.$transaction(async (tx) => {
    const caderno = await tx.caderno.create({
      data: {
        criadoPorId: context.userId,
        titulo: data.titulo,
        descricao: nullable(data.descricao),
        visibilidade: VisibilidadeCaderno.PRIVADO,
        dificuldadeId: data.questions[0]?.dificuldadeId ?? null,
      },
      select: { id: true, titulo: true },
    })

    const createdQuestions = []

    for (const [index, question] of data.questions.entries()) {
      const createdQuestion = await createNotebookQuestion(tx, context, data, question)
      createdQuestions.push(createdQuestion)

      await tx.itemCaderno.create({
        data: {
          cadernoId: caderno.id,
          questaoId: createdQuestion.id,
          ordem: index,
        },
      })
    }

    return {
      ...caderno,
      questions: createdQuestions,
      totalQuestions: createdQuestions.length,
    }
  })
}

export async function getAdminNotebooksUseCase(context: SecurityContext) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)

  return await prisma.caderno.findMany({
    orderBy: { criadoEm: "desc" },
    take: 100,
    select: {
      id: true,
      titulo: true,
      descricao: true,
      visibilidade: true,
      criadoEm: true,
      criadoPor: { select: { nome: true } },
      itens: {
        orderBy: { ordem: "asc" },
        select: {
          questao: {
            select: {
              id: true,
              code: true,
              status: true,
              disciplina: { select: { nome: true } },
              assunto: { select: { nome: true } },
            },
          },
        },
      },
    },
  })
}

export async function publishAdminNotebookUseCase(context: SecurityContext, id: string) {
  validateAccess(context, PERMISSIONS.REVIEW_QUESTIONS)

  const notebook = await prisma.caderno.findUnique({
    where: { id },
    select: {
      id: true,
      itens: {
        select: {
          questao: {
            select: {
              status: true,
            },
          },
        },
      },
    },
  })

  if (!notebook) {
    throw new Error("Caderno não encontrado.")
  }

  if (notebook.itens.length === 0) {
    throw new Error("O caderno precisa ter pelo menos uma questão.")
  }

  const hasPendingQuestion = notebook.itens.some((item) => item.questao.status !== StatusQuestao.PUBLICADA)

  if (hasPendingQuestion) {
    throw new Error("Publique todas as questões do caderno antes de liberar aos alunos.")
  }

  return await prisma.caderno.update({
    where: { id },
    data: { visibilidade: VisibilidadeCaderno.PUBLICO },
    select: { id: true, titulo: true, visibilidade: true },
  })
}
