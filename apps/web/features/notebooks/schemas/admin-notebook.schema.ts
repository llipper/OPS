import { z } from "zod"

const optionalUuid = z.string().uuid().optional().nullable()

const notebookAlternativeSchema = z.object({
  letter: z.string().min(1).max(1),
  text: z.string().trim().min(1, "Preencha o texto de todas as alternativas."),
  isCorrect: z.boolean(),
  explanation: z.string().trim().optional(),
})

const notebookQuestionSchema = z.object({
  assuntoId: optionalUuid,
  topicoId: optionalUuid,
  subtopicoId: optionalUuid,
  tipoId: optionalUuid,
  dificuldadeId: optionalUuid,
  textoApoio: z.string().trim().optional(),
  enunciado: z.string().trim().min(1, "Preencha o enunciado."),
  resolucao: z.string().trim().min(1, "Preencha a resolução do item correto."),
  alternativas: z.array(notebookAlternativeSchema).min(2).max(5),
})

export const createTeacherNotebookSchema = z
  .object({
    titulo: z.string().trim().min(3, "Informe um nome para o caderno."),
    descricao: z.string().trim().optional(),
    concursoId: z.string().uuid("Selecione um concurso."),
    disciplinaId: z.string().uuid("Selecione uma disciplina."),
    bancaId: optionalUuid,
    carreiraId: optionalUuid,
    nivelId: optionalUuid,
    ano: z.coerce.number().int().min(1900).max(2100).optional().nullable(),
    questions: z.array(notebookQuestionSchema).min(1, "Adicione pelo menos uma questão."),
  })
  .superRefine((data, ctx) => {
    data.questions.forEach((question, index) => {
      const correctCount = question.alternativas.filter((alt) => alt.isCorrect).length

      if (correctCount !== 1) {
        ctx.addIssue({
          code: "custom",
          message: "Cada questão precisa ter exatamente uma alternativa correta.",
          path: ["questions", index, "alternativas"],
        })
      }

      const wrongWithoutExplanation = question.alternativas.some((alt) => !alt.isCorrect && !alt.explanation?.trim())

      if (wrongWithoutExplanation) {
        ctx.addIssue({
          code: "custom",
          message: "Explique todas as alternativas erradas.",
          path: ["questions", index, "alternativas"],
        })
      }
    })
  })

export type CreateTeacherNotebookPayload = z.infer<typeof createTeacherNotebookSchema>
