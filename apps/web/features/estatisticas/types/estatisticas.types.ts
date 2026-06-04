export interface TrendValue<T> {
  value: T
  trendStr: string
  isPositive: boolean | null
}

export interface OverviewStats {
  totalResolucoes: TrendValue<number>
  totalCorretas: TrendValue<number>
  totalErradas: TrendValue<number>
  taxaAcerto: TrendValue<number>
  tempoGastoSegundos: number
  tempoMedioSegundos: TrendValue<number>
}

export interface TaxonomiaPerf {
  id: string
  nome: string
  total: number
  corretas: number
  taxaAcerto: number
  filhos?: TaxonomiaPerf[]
  parentNome?: string // Para os "Top Assuntos" saberem de qual disciplina vieram
}

export interface DificuldadeStats {
  facil: { total: number; percent: number; corretas: number }
  medio: { total: number; percent: number; corretas: number }
  dificil: { total: number; percent: number; corretas: number }
}

export interface DesempenhoData {
  overview: OverviewStats
  disciplinas: TaxonomiaPerf[] // Apenas nível de disciplina
  dificuldade: DificuldadeStats
  evolution: { date: string; taxaAcerto: number; questoesResolvidas: number }[]
  bancas: TaxonomiaPerf[]
  topAssuntosBons: TaxonomiaPerf[]
  topAssuntosRuins: TaxonomiaPerf[]
  resumo: {
    diasEstudo: number
    mediaQuestoesDia: number
    melhorDia: string
    piorDia: string
  }
}

export type FiltroPeriodo = "7d" | "30d" | "90d" | "ano" | "tudo"
