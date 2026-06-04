import { prisma } from "@workspace/database"
import { RankingData, RankingItem, RankingPeriodo } from "../types/ranking.types"

export class RankingService {
  static async getRanking(usuarioId: string, periodo: RankingPeriodo): Promise<RankingData> {
    
    const agora = new Date()
    let inicio: Date | undefined = undefined

    if (periodo === "7d") {
      inicio = new Date(agora)
      inicio.setDate(inicio.getDate() - 7)
    } else if (periodo === "30d") {
      inicio = new Date(agora)
      inicio.setDate(inicio.getDate() - 30)
    }

    // 1. Busca todos os alunos cadastrados e ativos no sistema
    const alunos = await prisma.usuario.findMany({
      where: {
        role: "ALUNO",
        ativo: true,
      },
      select: {
        id: true,
        nome: true,
        avatarUrl: true,
        perfil: {
          select: {
            visibilidade: true,
          },
        },
      },
    })

    // 2. Busca do banco todas as respostas no período para consolidar o ranking
    // Inclui também o próprio usuário logado caso ele não seja ALUNO (ex: administrador testando)
    const idsParaCarregarRespostas = Array.from(new Set([...alunos.map(a => a.id), usuarioId]))

    const respostas = await prisma.respostaUsuario.findMany({
      where: {
        usuarioId: { in: idsParaCarregarRespostas },
        respondidoEm: inicio ? { gte: inicio } : undefined,
      },
      select: {
        usuarioId: true,
        isCorreta: true,
      },
    })

    // 3. Agrupa e calcula as métricas por usuário em memória
    const userStatsMap = new Map<string, {
      nome: string
      avatarUrl: string | null
      totalQuestoes: number
      totalCorretas: number
      pontuacao: number
    }>()

    // Inicializa todos os alunos reais com estatísticas zeradas
    for (const aluno of alunos) {
      const isCurrentUser = aluno.id === usuarioId
      const isVisible = aluno.perfil?.visibilidade !== "PRIVADO"

      userStatsMap.set(aluno.id, {
        nome: isVisible || isCurrentUser ? aluno.nome || "Estudante" : "Aluno privado",
        avatarUrl: isVisible || isCurrentUser ? aluno.avatarUrl : null,
        totalQuestoes: 0,
        totalCorretas: 0,
        pontuacao: 0,
      })
    }

    // Garante que o próprio usuário logado apareça na listagem mesmo que não seja um ALUNO (ex: admin logado testando)
    if (!userStatsMap.has(usuarioId)) {
      const user = await prisma.usuario.findUnique({
        where: { id: usuarioId },
        select: { nome: true, avatarUrl: true },
      })
      if (user) {
        userStatsMap.set(usuarioId, {
          nome: user.nome || "Você",
          avatarUrl: user.avatarUrl,
          totalQuestoes: 0,
          totalCorretas: 0,
          pontuacao: 0,
        })
      }
    }

    // Processa respostas reais para incrementar a pontuação e métricas
    for (const r of respostas) {
      if (!r.usuarioId) continue
      const stats = userStatsMap.get(r.usuarioId)
      if (!stats) continue

      stats.totalQuestoes += 1
      if (r.isCorreta) {
        stats.totalCorretas += 1
        stats.pontuacao += 10 // +10 pontos por acerto
      } else {
        stats.pontuacao += 2 // +2 pontos por erro (esforço)
      }
    }

    // 4. Converte as estatísticas agregadas em array de competidores reais
    let rankingItems: RankingItem[] = Array.from(userStatsMap.entries()).map(([id, stats]) => {
      const taxaAcerto = stats.totalQuestoes > 0 
        ? Math.round((stats.totalCorretas / stats.totalQuestoes) * 100) 
        : 0

      return {
        usuarioId: id,
        nome: stats.nome,
        avatarUrl: stats.avatarUrl,
        posicao: 0,
        totalQuestoes: stats.totalQuestoes,
        totalCorretas: stats.totalCorretas,
        taxaAcerto,
        pontuacao: stats.pontuacao,
        isCurrentUser: id === usuarioId,
      }
    })

    // Ordena toda a listagem por pontuação decrescente; em caso de empate, por taxa de acerto e depois por nome (ordem alfabética)
    rankingItems.sort((a, b) => {
      if (b.pontuacao !== a.pontuacao) {
        return b.pontuacao - a.pontuacao
      }
      if (b.taxaAcerto !== a.taxaAcerto) {
        return b.taxaAcerto - a.taxaAcerto
      }
      return a.nome.localeCompare(b.nome)
    })

    // Atribui posições reais baseadas na ordenação
    rankingItems = rankingItems.map((item, idx) => ({
      ...item,
      posicao: idx + 1,
    }))

    // Encontra a posição e dados do usuário ativo
    const currentUserItem = rankingItems.find(item => item.isCurrentUser)
    const currentUserPosition = currentUserItem ? {
      posicao: currentUserItem.posicao,
      pontuacao: currentUserItem.pontuacao,
      taxaAcerto: currentUserItem.taxaAcerto,
      totalQuestoes: currentUserItem.totalQuestoes,
    } : null

    return {
      items: rankingItems,
      currentUserPosition,
    }
  }
}
