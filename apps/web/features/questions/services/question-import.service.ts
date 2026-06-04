import { z } from "zod"
import { validateAccess, PERMISSIONS, type SecurityContext } from "@workspace/permissions"

import { createAdminQuestionUseCase } from "./admin-question.service"
import type { CreateQuestionPayload } from "../schemas/admin-question.schema"

const optionalUuid = z.string().uuid().optional().nullable().or(z.literal(""))

const importDefaultsSchema = z.object({
  disciplinaId: z.string().uuid("Selecione uma disciplina."),
  assuntoId: optionalUuid,
  topicoId: optionalUuid,
  subtopicoId: optionalUuid,
  bancaId: optionalUuid,
  concursoId: optionalUuid,
  carreiraId: optionalUuid,
  nivelId: optionalUuid,
  dificuldadeId: optionalUuid,
  tipoId: optionalUuid,
  expectedAlternatives: z.coerce.number().int().min(2).max(5).optional().nullable(),
  cargo: z.string().trim().optional(),
  year: z.string().trim().optional(),
  isUnique: z.enum(["sim", "nao"]),
  tipoCobranca: z.string().trim().optional(),
  visibilidade: z.enum(["publica", "privada", "restrita"]).default("privada"),
})

export const questionImportPayloadSchema = z.object({
  content: z.string().trim().min(20, "Cole o conteúdo das questões antes de analisar."),
  defaults: importDefaultsSchema,
})

export type QuestionImportPayload = z.infer<typeof questionImportPayloadSchema>

export type QuestionImportAnalysisItem = {
  index: number
  title: string
  alternatives: number
  correctLetter: string | null
  errors: string[]
  warnings: string[]
  infos: string[]
}

export type QuestionImportAnalysis = {
  total: number
  errors: number
  warnings: number
  infos: number
  items: QuestionImportAnalysisItem[]
}

type ParsedAlternative = {
  letter: string
  text: string
  explanation?: string
}

type ParsedQuestion = {
  index: number
  supportText?: string
  statement: string
  alternatives: ParsedAlternative[]
  correctLetter?: string
  resolution?: string
  objetivo?: string
  referencia?: string
  dica?: string
  videoUrl?: string
}

const LABEL_PATTERN =
  /(TEXTO DE APOIO|ENUNCIADO|GABARITO|RESOLUÇÃO|RESOLUCAO|OBJETIVO|REFERÊNCIA|REFERENCIA|DICA|VIDEOAULA|EXPLICAÇÃO [A-E]|EXPLICACAO [A-E])\s*:/gi

function normalizeLabel(label: string) {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
}

function extractFields(block: string) {
  const matches = Array.from(block.matchAll(LABEL_PATTERN))
  const fields = new Map<string, string>()

  for (let i = 0; i < matches.length; i += 1) {
    const current = matches[i]
    const next = matches[i + 1]
    if (!current || current.index === undefined) continue

    const key = normalizeLabel(current[1] ?? "")
    const start = current.index + current[0].length
    const end = next?.index ?? block.length
    fields.set(key, block.slice(start, end).trim())
  }

  return fields
}

function parseAlternatives(block: string) {
  return Array.from(block.matchAll(/^\s*([A-E])\)\s+(.+)$/gim)).map((match) => ({
    letter: (match[1] ?? "").toUpperCase(),
    text: (match[2] ?? "").trim(),
  }))
}

function stripAlternativesFromStatement(statement: string) {
  return statement
    .split("\n")
    .filter((line) => !/^\s*[A-E]\)\s+/.test(line))
    .join("\n")
    .trim()
}

function parseTextQuestions(content: string): ParsedQuestion[] {
  const normalized = content.replace(/\r\n/g, "\n")
  const blocks = normalized
    .split(/(?=QUEST(?:ÃO|AO)\s*\d+\s*:?\s*(?:\n|$))/gi)
    .map((block) => block.trim())
    .filter(Boolean)

  return blocks.map((block, index) => {
    const fields = extractFields(block)
    const alternatives = parseAlternatives(block).map((alternative) => {
      const explanation =
        fields.get(`EXPLICACAO ${alternative.letter}`) ??
        fields.get(`EXPLICAÇÃO ${alternative.letter}`) ??
        undefined

      return {
        ...alternative,
        explanation,
      }
    })

    return {
      index: index + 1,
      supportText: fields.get("TEXTO DE APOIO"),
      statement: stripAlternativesFromStatement(fields.get("ENUNCIADO") ?? ""),
      alternatives,
      correctLetter: fields.get("GABARITO")?.trim().slice(0, 1).toUpperCase(),
      resolution: fields.get("RESOLUCAO") ?? fields.get("RESOLUÇÃO"),
      objetivo: fields.get("OBJETIVO"),
      referencia: fields.get("REFERENCIA") ?? fields.get("REFERÊNCIA"),
      dica: fields.get("DICA"),
      videoUrl: fields.get("VIDEOAULA"),
    }
  })
}

function looksGeneric(text: string) {
  const normalized = text.toLowerCase()

  return [
    "considerando o texto apresentado",
    "à luz do entendimento técnico",
    "a alternativa não corresponde ao tratamento técnico adequado",
  ].some((fragment) => normalized.includes(fragment))
}

function analyzeParsedQuestion(question: ParsedQuestion, expectedAlternatives?: number | null): QuestionImportAnalysisItem {
  const errors: string[] = []
  const warnings: string[] = []
  const infos: string[] = []
  const correctLetter = question.correctLetter ?? null
  const correctAlternative = question.alternatives.find((alt) => alt.letter === correctLetter)

  if (!question.statement || question.statement.length < 20) {
    errors.push("Enunciado ausente ou curto demais.")
  }

  if (looksGeneric(question.statement)) {
    warnings.push("Enunciado parece genérico. Revise para evitar questão de template.")
  }

  if (question.alternatives.length < 2 || question.alternatives.length > 5) {
    errors.push("A questão precisa ter entre 2 e 5 alternativas.")
  }

  if (expectedAlternatives && question.alternatives.length !== expectedAlternatives) {
    errors.push(`O tipo selecionado exige ${expectedAlternatives} alternativa(s), mas a questão tem ${question.alternatives.length}.`)
  }

  if (!correctLetter) {
    errors.push("Gabarito não encontrado.")
  } else if (!correctAlternative) {
    errors.push(`Gabarito ${correctLetter} não corresponde a nenhuma alternativa.`)
  }

  if (!question.resolution || question.resolution.length < 30) {
    warnings.push("Resolução ausente ou curta. O revisor deve complementar antes de publicar.")
  }

  if (question.alternatives.some((alt) => alt.text.length < 8)) {
    warnings.push("Há alternativa muito curta.")
  }

  if (question.alternatives.some((alt) => looksGeneric(alt.text))) {
    warnings.push("Há alternativa com texto genérico.")
  }

  if (question.supportText) {
    infos.push("Texto de apoio detectado.")
  }

  return {
    index: question.index,
    title: question.statement.slice(0, 140),
    alternatives: question.alternatives.length,
    correctLetter,
    errors,
    warnings,
    infos,
  }
}

function buildPayload(question: ParsedQuestion, defaults: QuestionImportPayload["defaults"]): CreateQuestionPayload {
  return {
    disciplinaId: defaults.disciplinaId,
    assuntoId: defaults.assuntoId || null,
    topicoId: defaults.topicoId || null,
    subtopicoId: defaults.subtopicoId || null,
    bancaId: defaults.bancaId || null,
    concursoId: defaults.concursoId || null,
    carreiraId: defaults.carreiraId || null,
    nivelId: defaults.nivelId || null,
    dificuldadeId: defaults.dificuldadeId || null,
    tipoId: defaults.tipoId || null,
    cargo: defaults.cargo || undefined,
    ano: defaults.year ? Number(defaults.year) : null,
    isInedita: defaults.isUnique === "sim",
    enunciado: question.statement,
    textoApoio: question.supportText,
    resolucao: question.resolution,
    videoUrl: question.videoUrl || "",
    objetivo: question.objetivo,
    referencia: question.referencia,
    dica: question.dica,
    visibilidade: defaults.visibilidade,
    status: "draft",
    tipoCobranca: defaults.tipoCobranca,
    alternativas: question.alternatives.map((alternative) => ({
      letter: alternative.letter,
      text: alternative.text,
      isCorrect: alternative.letter === question.correctLetter,
      explanation: alternative.explanation,
      reference: question.referencia,
      tip: question.dica,
    })),
  }
}

export function analyzeQuestionImportUseCase(context: SecurityContext, payload: QuestionImportPayload) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)

  const parsedPayload = questionImportPayloadSchema.parse(payload)
  const questions = parseTextQuestions(parsedPayload.content)

  if (questions.length === 0) {
    throw new Error("Nenhuma questão encontrada. Use o marcador QUESTÃO 1:, QUESTÃO 2: etc.")
  }

  const items = questions.map((question) =>
    analyzeParsedQuestion(question, parsedPayload.defaults.expectedAlternatives)
  )

  return {
    total: items.length,
    errors: items.reduce((sum, item) => sum + item.errors.length, 0),
    warnings: items.reduce((sum, item) => sum + item.warnings.length, 0),
    infos: items.reduce((sum, item) => sum + item.infos.length, 0),
    items,
  } satisfies QuestionImportAnalysis
}

export async function importQuestionsUseCase(context: SecurityContext, payload: QuestionImportPayload) {
  validateAccess(context, PERMISSIONS.MANAGE_QUESTIONS)

  const parsedPayload = questionImportPayloadSchema.parse(payload)
  const questions = parseTextQuestions(parsedPayload.content)
  const analysis = analyzeQuestionImportUseCase(context, parsedPayload)

  if (analysis.errors > 0) {
    throw new Error("Corrija os erros do lote antes de importar.")
  }

  const created = []

  for (const question of questions) {
    created.push(await createAdminQuestionUseCase(context, buildPayload(question, parsedPayload.defaults)))
  }

  return {
    imported: created.length,
    questions: created,
  }
}
