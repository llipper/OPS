import { z } from "zod"

const optionalUuid = z.string().uuid().optional().nullable()

const alternativeSchema = z.object({
  letter: z.string().min(1).max(1),
  text: z.string().trim().min(1, "Preencha o texto de todas as alternativas."),
  isCorrect: z.boolean(),
  explanation: z.string().trim().optional(),
  reference: z.string().trim().optional(),
  tip: z.string().trim().optional(),
})

export const createQuestionSchema = z
  .object({
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
    instituicao: z.string().trim().optional(),
    cargo: z.string().trim().optional(),
    ano: z.coerce.number().int().min(1900).max(2100).optional().nullable(),
    isInedita: z.boolean(),
    enunciado: z.string().trim().min(1, "Preencha o enunciado da questão."),
    textoApoio: z.string().trim().optional(),
    resolucao: z.string().trim().optional(),
    videoUrl: z.string().trim().url("Informe uma URL válida para a videoaula.").optional().or(z.literal("")),
    objetivo: z.string().trim().optional(),
    referencia: z.string().trim().optional(),
    dica: z.string().trim().optional(),
    visibilidade: z.enum(["publica", "privada", "restrita"]),
    status: z.enum(["draft", "published"]),
    alternativas: z.array(alternativeSchema).min(2).max(5),
    tipoCobranca: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    const correctCount = data.alternativas.filter((alt) => alt.isCorrect).length

    if (correctCount !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Selecione exatamente uma alternativa correta.",
        path: ["alternativas"],
      })
    }
  })

export type CreateQuestionPayload = z.infer<typeof createQuestionSchema>
