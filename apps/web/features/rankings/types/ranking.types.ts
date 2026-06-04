export interface RankingItem {
  usuarioId: string
  nome: string
  avatarUrl: string | null
  posicao: number
  totalQuestoes: number
  totalCorretas: number
  taxaAcerto: number
  pontuacao: number
  isCurrentUser: boolean
}

export interface RankingData {
  items: RankingItem[]
  currentUserPosition: {
    posicao: number
    pontuacao: number
    taxaAcerto: number
    totalQuestoes: number
  } | null
}

export type RankingPeriodo = "7d" | "30d" | "tudo"
