"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import {
  createAuditLog,
  prisma,
  StatusQuestao,
  StatusSimulado,
  VisibilidadeSimulado,
} from "@workspace/database"

import { getSecurityContext } from "@/lib/auth/get-security-context"
import { rateLimitOrThrow } from "@/lib/security/rate-limit"

const TARGET_QUESTION_COUNT = 100

const lessonPlanInputSchema = z.object({
  horasPorDia: z.coerce.number().min(0.5).max(12),
  diasPorSemana: z.coerce.number().int().min(1).max(7),
  dataInicio: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || new Date().toISOString().slice(0, 10)),
})

function distribute(
  total: number,
  weights: Array<{ id: string; weight: number }>
) {
  const normalizedWeights = weights.map((item) => ({
    ...item,
    weight: item.weight > 0 ? item.weight : 1,
  }))
  const weightTotal = normalizedWeights.reduce(
    (sum, item) => sum + item.weight,
    0
  )
  const initial = normalizedWeights.map((item) => ({
    id: item.id,
    quota: Math.floor((item.weight / weightTotal) * total),
    remainder: (item.weight / weightTotal) * total,
  }))

  let used = initial.reduce((sum, item) => sum + item.quota, 0)
  const sorted = [...initial].sort(
    (a, b) => b.remainder - b.quota - (a.remainder - a.quota)
  )

  for (const item of sorted) {
    if (used >= total) break
    item.quota += 1
    used += 1
  }

  return new Map(sorted.map((item) => [item.id, item.quota]))
}

export async function generateDiagnosticSimulation(formData: FormData) {
  const context = await getSecurityContext()
  const concursoId = formData.get("concursoId")

  await rateLimitOrThrow({
    key: `diagnostic-generate:${context.userId}`,
    limit: 5,
    windowSeconds: 3600,
  })

  if (typeof concursoId !== "string" || !concursoId) {
    throw new Error("Selecione um concurso para gerar o simulado.")
  }

  const concurso = await prisma.concurso.findUnique({
    where: { id: concursoId },
    select: {
      id: true,
      nome: true,
      ano: true,
      carreiraId: true,
      carreira: { select: { nome: true } },
      editais: {
        orderBy: { ano: "desc" },
        take: 1,
        select: {
          id: true,
          ano: true,
          totalQuestoes: true,
        },
      },
    },
  })

  if (!concurso) throw new Error("Concurso nao encontrado.")

  const edital = await prisma.editalConcurso.findFirst({
    where: { concursoId: concurso.id },
    orderBy: { ano: "desc" },
    select: {
      id: true,
      ano: true,
      disciplinas: {
        orderBy: { ordem: "asc" },
        select: {
          id: true,
          quantidadeQuestoes: true,
        },
      },
    },
  })

  const selectedQuestionIds: string[] = []

  if (edital?.disciplinas.length) {
    const quotas = distribute(
      TARGET_QUESTION_COUNT,
      edital.disciplinas.map((disciplina) => ({
        id: disciplina.id,
        weight: disciplina.quantidadeQuestoes ?? 1,
      }))
    )

    for (const disciplina of edital.disciplinas) {
      const take = quotas.get(disciplina.id) ?? 0
      if (take <= 0) continue

      const ocorrencias = await prisma.provaConcursoQuestao.findMany({
        where: {
          concursoId: concurso.id,
          editalDisciplinaId: disciplina.id,
          questaoId: { not: null },
        },
        orderBy: [{ statusCoberturaEdital: "asc" }, { numero: "asc" }],
        take,
        select: { questaoId: true },
      })

      selectedQuestionIds.push(
        ...ocorrencias.flatMap((item) =>
          item.questaoId ? [item.questaoId] : []
        )
      )
    }
  }

  const fallbackNeeded = TARGET_QUESTION_COUNT - selectedQuestionIds.length

  if (fallbackNeeded > 0) {
    const fallback = await prisma.provaConcursoQuestao.findMany({
      where: {
        concursoId: concurso.id,
        questaoId: {
          not: null,
          notIn: selectedQuestionIds,
        },
      },
      orderBy: { numero: "asc" },
      take: fallbackNeeded,
      select: { questaoId: true },
    })

    selectedQuestionIds.push(
      ...fallback.flatMap((item) => (item.questaoId ? [item.questaoId] : []))
    )
  }

  const finalFallbackNeeded = TARGET_QUESTION_COUNT - selectedQuestionIds.length

  if (finalFallbackNeeded > 0) {
    const questions = await prisma.questao.findMany({
      where: {
        concursoId: concurso.id,
        id: { notIn: selectedQuestionIds },
        status: StatusQuestao.PUBLICADA,
      },
      orderBy: [{ ano: "desc" }, { criadoEm: "desc" }],
      take: finalFallbackNeeded,
      select: { id: true },
    })

    selectedQuestionIds.push(...questions.map((question) => question.id))
  }

  if (selectedQuestionIds.length === 0) {
    throw new Error("Esse concurso ainda nao tem questoes disponiveis.")
  }

  const contestLabel = [concurso.nome, concurso.ano].filter(Boolean).join(" ")

  const simulado = await prisma.simulado.create({
    data: {
      criadoPorId: context.userId,
      titulo: `Diagnostico ${contestLabel}`,
      descricao:
        "Simulado gerado pelo planejamento com base no edital, nas provas importadas e na matriz historica do concurso selecionado.",
      tipo: "diagnostico",
      status: StatusSimulado.PUBLICADO,
      visibilidade: VisibilidadeSimulado.PRIVADO,
      duracaoMinutos: 240,
      totalQuestoes: selectedQuestionIds.length,
      itens: {
        create: selectedQuestionIds.map((questaoId, index) => ({
          questaoId,
          ordem: index + 1,
        })),
      },
    },
    select: { id: true },
  })

  await createAuditLog({
    usuarioId: context.userId,
    acao: "DIAGNOSTIC_SIMULATION_CREATED",
    tabela: "simulados",
    registroId: simulado.id,
    dadosDepois: {
      concurso: concurso.nome,
      carreira: concurso.carreira?.nome,
      totalQuestoes: selectedQuestionIds.length,
    },
  })

  redirect(`/planejamento/simulado/${simulado.id}`)
}

function getDiagnosticLevel(rate: number) {
  if (rate >= 0.85) return "OTIMO" as const
  if (rate >= 0.7) return "BOM" as const
  if (rate >= 0.55) return "MEDIO" as const
  if (rate >= 0.4) return "FRACO" as const
  return "CRITICO" as const
}

function getPriority(rate: number, incidence: number) {
  if (rate < 0.55 && incidence >= 0.5) return "MAXIMA" as const
  if (rate < 0.7 && incidence >= 0.5) return "ALTA" as const
  if (rate < 0.55) return "MEDIA" as const
  return "BAIXA" as const
}

async function findTopicIncidence(input: {
  disciplinaNome: string
  assuntoNome: string
  topicoNome: string
  topicoId: string | null
}) {
  return await prisma.matrizIncidenciaTopico.findFirst({
    where: {
      OR: [
        ...(input.topicoId ? [{ topicoId: input.topicoId }] : []),
        {
          dominio: input.disciplinaNome,
          assuntoNome: input.assuntoNome,
          topicoNome: input.topicoNome,
        },
      ],
    },
    select: {
      taxaIncidencia: true,
      pesoPlanejamento: true,
    },
  })
}

export async function submitDiagnosticSimulation(
  simuladoId: string,
  formData: FormData
) {
  const context = await getSecurityContext()

  await rateLimitOrThrow({
    key: `diagnostic-submit:${context.userId}`,
    limit: 10,
    windowSeconds: 3600,
  })

  const simulado = await prisma.simulado.findFirst({
    where: { id: simuladoId, criadoPorId: context.userId },
    select: {
      id: true,
      itens: {
        orderBy: { ordem: "asc" },
        select: {
          questaoId: true,
          questao: {
            select: {
              disciplinaId: true,
              assuntoId: true,
              topicoId: true,
              carreiraId: true,
              concursoId: true,
              carreira: { select: { nome: true } },
              concurso: { select: { nome: true, ano: true } },
              disciplina: { select: { nome: true } },
              assunto: { select: { nome: true } },
              topico: { select: { nome: true } },
              alternativas: {
                select: {
                  id: true,
                  isCorreta: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!simulado) throw new Error("Simulado nao encontrado.")

  const tentativa = await prisma.tentativaSimulado.create({
    data: {
      simuladoId,
      usuarioId: context.userId,
      status: "CONCLUIDA",
      fimEm: new Date(),
    },
    select: { id: true },
  })

  let totalCorretas = 0
  const byTopic = new Map<
    string,
    {
      disciplinaId: string | null
      assuntoId: string | null
      topicoId: string | null
      disciplinaNome: string
      assuntoNome: string
      topicoNome: string
      total: number
      corretas: number
    }
  >()

  for (const item of simulado.itens) {
    const selectedAlternativeId = formData.get(`question-${item.questaoId}`)
    if (typeof selectedAlternativeId !== "string") continue

    const selected = item.questao.alternativas.find(
      (alternativa) => alternativa.id === selectedAlternativeId
    )
    if (!selected) continue

    const isCorrect = selected.isCorreta
    if (isCorrect) totalCorretas += 1

    await prisma.respostaUsuario.create({
      data: {
        usuarioId: context.userId,
        questaoId: item.questaoId,
        alternativaId: selectedAlternativeId,
        isCorreta: isCorrect,
        simuladoTentativaId: tentativa.id,
      },
    })

    const topicKey = [
      item.questao.disciplinaId,
      item.questao.assuntoId ?? "sem-assunto",
      item.questao.topicoId ?? "sem-topico",
    ].join(":")

    const current = byTopic.get(topicKey) ?? {
      disciplinaId: item.questao.disciplinaId,
      assuntoId: item.questao.assuntoId,
      topicoId: item.questao.topicoId,
      disciplinaNome: item.questao.disciplina.nome,
      assuntoNome: item.questao.assunto?.nome ?? "Sem assunto",
      topicoNome: item.questao.topico?.nome ?? "Sem topico",
      total: 0,
      corretas: 0,
    }

    current.total += 1
    current.corretas += isCorrect ? 1 : 0
    byTopic.set(topicKey, current)
  }

  const totalRespondidas = Array.from(byTopic.values()).reduce(
    (sum, item) => sum + item.total,
    0
  )
  const taxaAcerto = totalRespondidas > 0 ? totalCorretas / totalRespondidas : 0
  const firstQuestion = simulado.itens[0]?.questao
  const sourceContest = [firstQuestion?.concurso?.nome, firstQuestion?.concurso?.ano]
    .filter(Boolean)
    .join(" ")

  await prisma.tentativaSimulado.update({
    where: { id: tentativa.id },
    data: {
      pontuacao: taxaAcerto * 100,
      totalCorretas,
      totalErradas: totalRespondidas - totalCorretas,
    },
  })

  const diagnostico = await prisma.diagnosticoPlanejamento.create({
    data: {
      usuarioId: context.userId,
      carreiraId: firstQuestion?.carreiraId,
      concursoAlvoId: firstQuestion?.concursoId,
      simuladoId,
      tentativaSimuladoId: tentativa.id,
      totalQuestoes: totalRespondidas,
      totalCorretas,
      taxaAcerto,
      nivelGeral: getDiagnosticLevel(taxaAcerto),
      matrizFonte: sourceContest
        ? `Concurso selecionado: ${sourceContest}`
        : "Concurso selecionado",
      topicos: {
        create: await Promise.all(
          Array.from(byTopic.values()).map(async (item) => {
            const incidencia = await findTopicIncidence(item)
            const topicRate = item.total > 0 ? item.corretas / item.total : 0
            const incidenceRate = Number(incidencia?.taxaIncidencia ?? 0)

            return {
              disciplinaId: item.disciplinaId,
              assuntoId: item.assuntoId,
              topicoId: item.topicoId,
              disciplinaNome: item.disciplinaNome,
              assuntoNome: item.assuntoNome,
              topicoNome: item.topicoNome,
              totalQuestoes: item.total,
              totalCorretas: item.corretas,
              taxaAcerto: topicRate,
              taxaIncidencia: incidenceRate,
              pesoPlanejamento: Number(incidencia?.pesoPlanejamento ?? 0),
              nivel: getDiagnosticLevel(topicRate),
              prioridade: getPriority(topicRate, incidenceRate),
            }
          })
        ),
      },
    },
    select: { id: true },
  })

  await createAuditLog({
    usuarioId: context.userId,
    acao: "DIAGNOSTIC_SUBMITTED",
    tabela: "diagnosticos_planejamento",
    registroId: diagnostico.id,
    dadosDepois: {
      simuladoId,
      tentativaSimuladoId: tentativa.id,
      totalQuestoes: totalRespondidas,
      totalCorretas,
      taxaAcerto,
    },
  })

  redirect(`/planejamento/diagnostico/${diagnostico.id}`)
}

function getLessonCount(priority: string, level: string) {
  if (priority === "MAXIMA") return 3
  if (priority === "ALTA") return 2
  if (level === "CRITICO" || level === "FRACO") return 2
  return 1
}

function getQuestionTarget(priority: string) {
  if (priority === "MAXIMA") return 45
  if (priority === "ALTA") return 30
  if (priority === "MEDIA") return 20
  return 10
}

function getEstimatedMinutes(input: {
  priority: string
  level: string
  lessons: number
  questions: number
}) {
  const theoryMinutes = input.lessons * 50
  const questionMinutes = Math.ceil(input.questions * 2.5)
  const reviewMinutes =
    input.priority === "MAXIMA" || input.priority === "ALTA" ? 35 : 20
  const reinforcementMinutes =
    input.level === "CRITICO" || input.level === "FRACO" ? 35 : 15

  return theoryMinutes + questionMinutes + reviewMinutes + reinforcementMinutes
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function isStudyDay(date: Date, daysPerWeek: number) {
  const mondayBasedDay = (date.getDay() + 6) % 7
  return mondayBasedDay < daysPerWeek
}

function nextStudyDate(date: Date, daysPerWeek: number) {
  let current = new Date(date)

  while (!isStudyDay(current, daysPerWeek)) {
    current = addDays(current, 1)
  }

  return current
}

function getStudyAction(priority: string, level: string) {
  if (priority === "MAXIMA")
    return "Assistir aula completa, fazer resumo ativo e resolver bateria forte de questoes."
  if (priority === "ALTA")
    return "Assistir aula direcionada, revisar pontos de erro e resolver questoes comentadas."
  if (level === "CRITICO" || level === "FRACO")
    return "Estudar teoria essencial e resolver questoes de fixacao."
  return "Revisar por questoes e manter no ciclo de manutencao."
}

export async function generateLessonPlan(
  diagnosticoId: string,
  formData: FormData
) {
  const context = await getSecurityContext()

  await rateLimitOrThrow({
    key: `lesson-plan:${context.userId}`,
    limit: 10,
    windowSeconds: 3600,
  })

  const disponibilidade = lessonPlanInputSchema.parse({
    horasPorDia: formData.get("horasPorDia"),
    diasPorSemana: formData.get("diasPorSemana"),
    dataInicio: formData.get("dataInicio"),
  })
  const diagnostico = await prisma.diagnosticoPlanejamento.findFirst({
    where: { id: diagnosticoId, usuarioId: context.userId },
    select: {
      id: true,
      usuarioId: true,
      carreira: { select: { nome: true } },
      concursoAlvo: { select: { nome: true, ano: true } },
      nivelGeral: true,
      totalQuestoes: true,
      totalCorretas: true,
      taxaAcerto: true,
      topicos: {
        select: {
          id: true,
          disciplinaNome: true,
          assuntoNome: true,
          topicoNome: true,
          totalQuestoes: true,
          totalCorretas: true,
          taxaAcerto: true,
          taxaIncidencia: true,
          pesoPlanejamento: true,
          nivel: true,
          prioridade: true,
        },
      },
    },
  })

  if (!diagnostico) throw new Error("Diagnostico nao encontrado.")

  const enrichedTopics = await Promise.all(
    diagnostico.topicos.map(async (topico) => {
      const shouldEnrich =
        Number(topico.taxaIncidencia) === 0 &&
        Number(topico.pesoPlanejamento) === 0
      const incidencia = shouldEnrich
        ? await findTopicIncidence({
            disciplinaNome: topico.disciplinaNome,
            assuntoNome: topico.assuntoNome,
            topicoNome: topico.topicoNome,
            topicoId: null,
          })
        : null
      const incidenceRate = Number(
        incidencia?.taxaIncidencia ?? topico.taxaIncidencia
      )
      const planWeight = Number(
        incidencia?.pesoPlanejamento ?? topico.pesoPlanejamento
      )
      const hitRate = Number(topico.taxaAcerto)

      return {
        ...topico,
        incidenceRate,
        planWeight,
        priority:
          topico.prioridade === "BAIXA"
            ? getPriority(hitRate, incidenceRate)
            : topico.prioridade,
      }
    })
  )

  const priorityOrder: Record<string, number> = {
    MAXIMA: 4,
    ALTA: 3,
    MEDIA: 2,
    BAIXA: 1,
  }

  const lessons = enrichedTopics
    .sort((a, b) => {
      const priorityDiff =
        (priorityOrder[b.priority] ?? 0) - (priorityOrder[a.priority] ?? 0)
      if (priorityDiff !== 0) return priorityDiff
      return b.planWeight - a.planWeight
    })
    .map((topico, index) => ({
      ordem: index + 1,
      disciplina: topico.disciplinaNome,
      assunto: topico.assuntoNome,
      topico: topico.topicoNome,
      prioridade: topico.priority,
      nivel: topico.nivel,
      desempenho: Number(topico.taxaAcerto),
      incidencia: topico.incidenceRate,
      peso: topico.planWeight,
      aulas: getLessonCount(topico.priority, topico.nivel),
      questoes: getQuestionTarget(topico.priority),
      acao: getStudyAction(topico.priority, topico.nivel),
    }))

  const aulas = lessons.map((lesson) => {
    const tempoMinutos = getEstimatedMinutes({
      priority: lesson.prioridade,
      level: lesson.nivel,
      lessons: lesson.aulas,
      questions: lesson.questoes,
    })

    return {
      ...lesson,
      tempoMinutos,
    }
  })

  const dailyCapacityMinutes = Math.round(disponibilidade.horasPorDia * 60)
  const startDate = nextStudyDate(
    new Date(`${disponibilidade.dataInicio}T12:00:00`),
    disponibilidade.diasPorSemana
  )
  const schedule: Array<{
    dia: number
    semana: number
    data: string
    titulo: string
    foco: string
    disciplinas: string[]
    tempoMinutos: number
    tarefas: string[]
  }> = []
  let currentDate = startDate
  let currentDay:
    | {
        dia: number
        semana: number
        data: string
        titulo: string
        foco: string
        disciplinas: string[]
        tempoMinutos: number
        tarefas: string[]
      }
    | null = null
  let remainingMinutes = dailyCapacityMinutes

  for (const lesson of aulas) {
    const taskMinutes = lesson.tempoMinutos

    if (!currentDay || taskMinutes > remainingMinutes) {
      if (currentDay) {
        schedule.push(currentDay)
        currentDate = nextStudyDate(
          addDays(currentDate, 1),
          disponibilidade.diasPorSemana
        )
      }

      const dayNumber = schedule.length + 1
      currentDay = {
        dia: dayNumber,
        semana: Math.ceil(dayNumber / disponibilidade.diasPorSemana),
        data: toDateKey(currentDate),
        titulo: `Dia ${dayNumber}`,
        foco: lesson.topico,
        disciplinas: [lesson.disciplina],
        tempoMinutos: 0,
        tarefas: [],
      }
      remainingMinutes = dailyCapacityMinutes
    }

    currentDay.foco =
      currentDay.tarefas.length === 0 ? lesson.topico : "Ciclo de estudo"
    currentDay.tempoMinutos += taskMinutes
    currentDay.disciplinas = Array.from(
      new Set([...currentDay.disciplinas, lesson.disciplina])
    )
    currentDay.tarefas.push(
      `${lesson.disciplina}: ${lesson.topico} - ${lesson.aulas} aula(s), ${lesson.questoes} questoes e revisao dos erros`
    )
    remainingMinutes -= taskMinutes

    if (taskMinutes >= dailyCapacityMinutes) {
      schedule.push(currentDay)
      currentDay = null
      currentDate = nextStudyDate(
        addDays(currentDate, 1),
        disponibilidade.diasPorSemana
      )
      remainingMinutes = dailyCapacityMinutes
    }
  }

  if (currentDay) schedule.push(currentDay)

  const totalEstimatedMinutes = aulas.reduce(
    (sum, lesson) => sum + lesson.tempoMinutos,
    0
  )
  const finalDate = schedule.at(-1)?.data ?? toDateKey(startDate)

  const plan = {
    geradoEm: new Date().toISOString(),
    titulo: `Plano de estudo ${[
      diagnostico.concursoAlvo?.nome,
      diagnostico.concursoAlvo?.ano,
    ]
      .filter(Boolean)
      .join(" ") || diagnostico.carreira?.nome || "do concurso"}`,
    resumo: {
      nivelGeral: diagnostico.nivelGeral,
      totalQuestoes: diagnostico.totalQuestoes,
      totalCorretas: diagnostico.totalCorretas,
      taxaAcerto: Number(diagnostico.taxaAcerto),
      totalAulas: aulas.reduce((sum, lesson) => sum + lesson.aulas, 0),
      totalQuestoesRecomendadas: aulas.reduce(
        (sum, lesson) => sum + lesson.questoes,
        0
      ),
      horasEstimadas: Math.ceil(totalEstimatedMinutes / 60),
      totalDiasEstudo: schedule.length,
      totalSemanas: Math.max(
        1,
        Math.ceil(schedule.length / disponibilidade.diasPorSemana)
      ),
    },
    disponibilidade: {
      horasPorDia: disponibilidade.horasPorDia,
      diasPorSemana: disponibilidade.diasPorSemana,
      cargaSemanalHoras:
        disponibilidade.horasPorDia * disponibilidade.diasPorSemana,
      dataInicio: toDateKey(startDate),
      dataFinalPrevista: finalDate,
    },
    aulas,
    cronograma: schedule,
  }

  await prisma.diagnosticoPlanejamento.update({
    where: { id: diagnosticoId },
    data: { recomendacoes: plan },
  })

  await createAuditLog({
    usuarioId: context.userId,
    acao: "LESSON_PLAN_GENERATED",
    tabela: "diagnosticos_planejamento",
    registroId: diagnosticoId,
    dadosDepois: {
      totalAulas: plan.resumo.totalAulas,
      totalQuestoesRecomendadas: plan.resumo.totalQuestoesRecomendadas,
      totalDiasEstudo: plan.resumo.totalDiasEstudo,
      dataFinalPrevista: plan.disponibilidade.dataFinalPrevista,
    },
  })

  redirect(`/planejamento/plano/${diagnosticoId}`)
}
