// =============================================================================
// DASHBOARD — Tipos centralizados (feature/dashboard/types)
// =============================================================================

export interface DashboardStats {
  taxaAcerto: number
  taxaAcertoAnterior: number
  totalQuestoes: number
  totalQuestoesAnterior: number
  tempoMedioSeg: number
  tempoMedioSegAnterior: number
  sequenciaAtual: number
  maiorSequencia: number
}

export interface EvolutionPoint {
  date: string
  taxaAcerto: number
  questoesResolvidas: number
}

export interface SubjectPerf {
  name: string
  progress: number
  color: string
  disciplinaId: string
}

export interface BancaPerf {
  name: string
  acc: number
  char: string
  color: string
}

export interface TimeAnalysisItem {
  title: string
  desc: string
  perc: string
  rawPerc: number
}

export interface DiagnosticsData {
  strengths: Array<{ name: string; acc: string; disciplinaId: string }>
  weaknesses: Array<{ name: string; acc: string; disciplinaId: string }>
  errorReasons: Array<{ label: string; val: string; color: string }>
  totalErrors: number
}

export interface RevisionItem {
  name: string
  type: string
  color: string
  count: string
}

export interface FocusData {
  disciplinaNome: string
  quedaPerc: number
}

export interface DashboardData {
  stats: DashboardStats
  evolution: EvolutionPoint[]
  subjects: SubjectPerf[]
  diagnostics: DiagnosticsData
  bancas: BancaPerf[]
  timeAnalysis: TimeAnalysisItem[]
  revisions: RevisionItem[]
  focus: FocusData | null
}

export type DashboardPeriodo = "7d" | "30d" | "90d"
