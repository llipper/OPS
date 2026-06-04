import { prisma } from "@workspace/database"
import { validateAccess, PERMISSIONS } from "@workspace/permissions"
import type { SecurityContext } from "@workspace/permissions"

export class QuestionService {
  /**
   * REGISTRO DE RESPOSTA ELITE
   * Agora suporta múltiplas tentativas para a mesma questão.
   */
  static async submitAnswer(
    context: SecurityContext,
    data: {
      questionId: string
      alternativeId: string
      timeSeconds?: number
      cadernoId?: string
      simuladoTentativaId?: string
    }
  ) {
    const now = new Date()

    return await prisma.$transaction(async (tx) => {
      // 1. VALIDAÇÃO DE ACESSO
      // No novo schema simplificado, verificamos apenas se o usuário pode acessar o conteúdo
      validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)

      const question = await tx.questao.findUnique({
        where: { id: data.questionId },
        select: {
          id: true,
          status: true,
          resolucao: true,
          alternativas: {
            orderBy: { letra: "asc" },
            select: {
              id: true,
              letra: true,
              texto: true,
              isCorreta: true,
              explicacao: true,
              referencia: true,
              dica: true,
            },
          },
        }
      })

      if (!question) throw new Error("Questão não encontrada.")
      if (question.status !== "PUBLICADA") throw new Error("Questão indisponível.")
      
      const alternative = question.alternativas.find((item) => item.id === data.alternativeId)
      if (!alternative) throw new Error("Alternativa inválida.")

      const recentAnswer = await tx.respostaUsuario.findFirst({
        where: {
          usuarioId: context.userId,
          questaoId: data.questionId,
          respondidoEm: {
            gte: new Date(now.getTime() - 10_000),
          },
        },
        select: { id: true },
      })

      if (recentAnswer) {
        throw new Error("Aguarde alguns segundos antes de responder esta questão novamente.")
      }

      // 2. PERSISTÊNCIA DA RESPOSTA (Sempre cria uma nova tentativa)
      const answer = await tx.respostaUsuario.create({
        data: {
          usuarioId: context.userId,
          questaoId: data.questionId,
          alternativaId: data.alternativeId,
          isCorreta: alternative.isCorreta,
          tempoSeg: data.timeSeconds,
          cadernoId: data.cadernoId,
          simuladoTentativaId: data.simuladoTentativaId,
          respondidoEm: now,
        }
      })

      // 3. ATUALIZAÇÃO DAS ESTATÍSTICAS DA QUESTÃO (Cache de Performance)
      // Como agora temos múltiplas respostas, o incremento é simples
      await tx.questao.update({
        where: { id: data.questionId },
        data: {
          totalRespostas: { increment: 1 },
          totalCorretas: { increment: alternative.isCorreta ? 1 : 0 },
          totalTempoSeg: { increment: data.timeSeconds ?? 0 },
          totalComTempo: { increment: data.timeSeconds ? 1 : 0 },
        }
      })

      return {
        answerId: answer.id,
        isCorrect: alternative.isCorreta,
        correctAlternativeId:
          question.alternativas.find((item) => item.isCorreta)?.id ?? null,
        explanation: {
          resolution: question.resolucao,
          alternatives: question.alternativas.map((item) => ({
            id: item.id,
            letter: item.letra,
            text: item.texto,
            isCorrect: item.isCorreta,
            explanation: item.explicacao,
            reference: item.referencia,
            tip: item.dica,
          })),
        },
        message: alternative.isCorreta ? "Excelente! Continue assim." : "Não desanime. Analise o motivo do erro.",
      }
    })
  }

  /**
   * Salva o motivo do erro na ÚLTIMA resposta dada.
   */
  static async saveErrorReason(context: SecurityContext, questionId: string, reason: string) {
    validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)

    // Busca a resposta mais recente do usuário para esta questão
    const lastAnswer = await prisma.respostaUsuario.findFirst({
      where: { 
        usuarioId: context.userId, 
        questaoId: questionId 
      },
      orderBy: { respondidoEm: 'desc' }
    })

    if (!lastAnswer) throw new Error("Nenhuma resposta encontrada para esta questão.")

    return await prisma.respostaUsuario.update({
      where: { id: lastAnswer.id },
      data: { erroMotivo: reason }
    })
  }

  static async toggleFavorite(context: SecurityContext, questionId: string) {
    validateAccess(context, PERMISSIONS.VIEW_PRINCIPAL_MENU)

    const question = await prisma.questao.findFirst({
      where: {
        id: questionId,
        status: "PUBLICADA",
      },
      select: { id: true },
    })

    if (!question) throw new Error("Questão indisponível.")

    const existing = await prisma.favorito.findUnique({
      where: { 
        usuarioId_questaoId: { 
          usuarioId: context.userId, 
          questaoId: questionId 
        } 
      }
    })

    if (existing) {
      await prisma.favorito.delete({ where: { id: existing.id } })
      return { favorited: false }
    }

    await prisma.favorito.create({
      data: { 
        usuarioId: context.userId, 
        questaoId: questionId 
      }
    })

    return { favorited: true }
  }
}
