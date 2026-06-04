import { prisma } from "@workspace/database"
import type { SecurityContext } from "@workspace/permissions"
import type {
  DashboardData,
  DashboardStats,
  EvolutionPoint,
  SubjectPerf,
  BancaPerf,
  TimeAnalysisItem,
  DiagnosticsData,
  RevisionItem,
  FocusData,
  DashboardPeriodo,
} from "../types/dashboard.types"

// ---------------------------------------------------------------------------
// Constantes de apresentação (cores — round-robin)
// ---------------------------------------------------------------------------
const DISCIPLINE_COLORS: string[] = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-teal-500",
]

const BANCA_COLORS: string[] = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-rose-500",
]

const MOTIVO_LABELS: Record<string, string> = {
  conhecimento: "Falta de conhecimento",
  interpretacao: "Interpretação",
  desatencao: "Desatenção",
  pegadinha: "Pegadinha da banca",
  FALTA_CONTEUDO: "Falta de conteúdo",
  ERRO_INTERPRETACAO: "Erro de interpretação",
  CONFUNDI_ASSUNTO: "Confundiu o assunto",
  CHUTE: "Chute",
  FALTA_ATENCAO: "Falta de atenção",
  OUTRO: "Outro motivo",
}

const MOTIVO_COLORS: Record<string, string> = {
  conhecimento: "bg-rose-500",
  interpretacao: "bg-orange-500",
  desatencao: "bg-blue-500",
  pegadinha: "bg-purple-500",
  FALTA_CONTEUDO: "bg-rose-500",
  ERRO_INTERPRETACAO: "bg-orange-500",
  CONFUNDI_ASSUNTO: "bg-purple-500",
  CHUTE: "bg-slate-500",
  FALTA_ATENCAO: "bg-blue-500",
  OUTRO: "bg-pink-500",
}

const PRIORIDADE_CONFIG = [
  { threshold: 5, label: "Crítico", color: "text-rose-500 bg-rose-500/10" },
  { threshold: 3, label: "Alta",    color: "text-orange-500 bg-orange-500/10" },
  { threshold: 1, label: "Média",   color: "text-amber-500 bg-amber-500/10" },
]

const THRESHOLD_RAPIDO_SEG = 60

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getPeriodoRange(periodo: DashboardPeriodo) {
  const agora = new Date()
  const dias = periodo === "7d" ? 7 : periodo === "90d" ? 90 : 30
  const inicio = new Date(agora)
  inicio.setDate(inicio.getDate() - dias)
  const inicioAnterior = new Date(inicio)
  inicioAnterior.setDate(inicioAnterior.getDate() - dias)
  return { inicio, inicioAnterior, agora }
}

function calcTaxaAcerto(corretas: number, total: number): number {
  return total > 0 ? Math.round((corretas / total) * 100) : 0
}

function calcTempoMedio(tempos: number[]): number {
  return tempos.length > 0
    ? Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length)
    : 0
}

// ---------------------------------------------------------------------------
// DashboardService
// ---------------------------------------------------------------------------
export class DashboardService {
  /**
   * Agrega todos os dados necessários para o dashboard do aluno.
   */
  static async getData(
    context: SecurityContext,
    periodo: DashboardPeriodo = "30d"
  ): Promise<DashboardData> {
    const { userId } = context
    const { inicio, inicioAnterior, agora } = getPeriodoRange(periodo)

    const [stats, evolution, subjects, diagnostics, bancas, timeAnalysis, revisions, focus] =
      await Promise.all([
        DashboardService.getStats(userId, inicio, inicioAnterior, agora),
        DashboardService.getEvolution(userId, inicio, agora),
        DashboardService.getSubjects(userId),
        DashboardService.getDiagnostics(userId, inicio, agora),
        DashboardService.getBancas(userId, inicio, agora),
        DashboardService.getTimeAnalysis(userId, inicio, agora),
        DashboardService.getRevisions(userId),
        DashboardService.getFocus(userId, agora),
      ])

    return { stats, evolution, subjects, diagnostics, bancas, timeAnalysis, revisions, focus }
  }

  // -------------------------------------------------------------------------
  // Stats principais
  // -------------------------------------------------------------------------
  private static async getStats(
    userId: string,
    inicio: Date,
    inicioAnterior: Date,
    agora: Date
  ): Promise<DashboardStats> {
    const [respostasAtual, respostasAnterior, respostasTodas] = await Promise.all([
      prisma.respostaUsuario.findMany({
        where: { usuarioId: userId, respondidoEm: { gte: inicio, lte: agora } },
        select: { isCorreta: true, tempoSeg: true },
      }),
      prisma.respostaUsuario.findMany({
        where: { usuarioId: userId, respondidoEm: { gte: inicioAnterior, lt: inicio } },
        select: { isCorreta: true, tempoSeg: true },
      }),
      prisma.respostaUsuario.findMany({
        where: { usuarioId: userId },
        select: { respondidoEm: true },
        orderBy: { respondidoEm: "desc" },
      }),
    ])

    const totalAtual = respostasAtual.length
    const corretasAtual = respostasAtual.filter((r) => r.isCorreta).length
    const totalAnterior = respostasAnterior.length
    const corretasAnterior = respostasAnterior.filter((r) => r.isCorreta).length

    const temposAtual = respostasAtual.flatMap((r) => (r.tempoSeg != null ? [r.tempoSeg] : []))
    const temposAnterior = respostasAnterior.flatMap((r) => (r.tempoSeg != null ? [r.tempoSeg] : []))

    // Calcula sequência de dias
    const diasRespondidos = new Set(
      respostasTodas.map((r) =>
        r.respondidoEm.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })
      )
    )

    let sequenciaAtual = 0
    let maiorSequencia = 0
    let tempSeq = 0
    const hojeDate = new Date()
    const hojeStr = hojeDate.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })
    
    // Verifica se hoje ou ontem tem resposta para manter a sequência "viva"
    hojeDate.setDate(hojeDate.getDate() - 1)
    const ontemStr = hojeDate.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })
    
    const isSequenciaViva = diasRespondidos.has(hojeStr) || diasRespondidos.has(ontemStr)

    // Calcula sequencia maxima
    if (diasRespondidos.size > 0) {
      const sortedDates = Array.from(diasRespondidos).sort((a, b) => {
        const [da, ma, ya] = a.split("/")
        const [db, mb, yb] = b.split("/")
        return new Date(`${ya}-${ma}-${da}`).getTime() - new Date(`${yb}-${mb}-${db}`).getTime()
      })

      for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
          tempSeq = 1
        } else {
          const prev = sortedDates[i - 1]!
          const curr = sortedDates[i]!
          const [d1, m1, y1] = prev.split("/")
          const [d2, m2, y2] = curr.split("/")
          const prevDate = new Date(`${y1}-${m1}-${d1}`)
          const currDate = new Date(`${y2}-${m2}-${d2}`)
          const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24))
          
          if (diffDays === 1) {
            tempSeq++
          } else {
            tempSeq = 1
          }
        }
        if (tempSeq > maiorSequencia) maiorSequencia = tempSeq
      }

      // Sequencia atual (contando regressivamente a partir do último dia respondido)
      if (isSequenciaViva) {
        sequenciaAtual = 1
        for (let i = sortedDates.length - 1; i > 0; i--) {
          const curr = sortedDates[i]!
          const prev = sortedDates[i - 1]!
          const [d1, m1, y1] = prev.split("/")
          const [d2, m2, y2] = curr.split("/")
          const prevDate = new Date(`${y1}-${m1}-${d1}`)
          const currDate = new Date(`${y2}-${m2}-${d2}`)
          const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24))
          
          if (diffDays === 1) {
            sequenciaAtual++
          } else {
            break
          }
        }
      }
    }

    return {
      taxaAcerto: calcTaxaAcerto(corretasAtual, totalAtual),
      taxaAcertoAnterior: calcTaxaAcerto(corretasAnterior, totalAnterior),
      totalQuestoes: totalAtual,
      totalQuestoesAnterior: totalAnterior,
      tempoMedioSeg: calcTempoMedio(temposAtual),
      tempoMedioSegAnterior: calcTempoMedio(temposAnterior),
      sequenciaAtual,
      maiorSequencia,
    }
  }

  // -------------------------------------------------------------------------
  // Evolução diária
  // -------------------------------------------------------------------------
  private static async getEvolution(
    userId: string,
    inicio: Date,
    agora: Date
  ): Promise<EvolutionPoint[]> {
    const respostas = await prisma.respostaUsuario.findMany({
      where: { usuarioId: userId, respondidoEm: { gte: inicio, lte: agora } },
      select: { isCorreta: true, respondidoEm: true },
    })

    const porDia = new Map<string, { total: number; corretas: number }>()
    
    // Preenche com 0 todos os dias do período para garantir que o gráfico tenha linha
    const numDias = Math.round((agora.getTime() - inicio.getTime()) / (1000 * 3600 * 24))
    for (let i = 0; i <= numDias; i++) {
      const dia = new Date(inicio)
      dia.setDate(dia.getDate() + i)
      const diaStr = dia.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
      porDia.set(diaStr, { total: 0, corretas: 0 })
    }

    for (const r of respostas) {
      const dia = r.respondidoEm.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
      const atual = porDia.get(dia) ?? { total: 0, corretas: 0 }
      atual.total += 1
      if (r.isCorreta) atual.corretas += 1
      porDia.set(dia, atual)
    }

    return Array.from(porDia.entries())
      .sort(([a], [b]) => {
        const pa = a.split("/").map(Number)
        const pb = b.split("/").map(Number)
        const ma = pa[1] ?? 0, da = pa[0] ?? 0
        const mb = pb[1] ?? 0, db = pb[0] ?? 0
        return ma !== mb ? ma - mb : da - db
      })
      .map(([label, { total, corretas }]) => ({
        date: label,
        taxaAcerto: calcTaxaAcerto(corretas, total),
        questoesResolvidas: total,
      }))
  }

  // -------------------------------------------------------------------------
  // Desempenho por disciplina
  // -------------------------------------------------------------------------
  private static async getSubjects(userId: string): Promise<SubjectPerf[]> {
    const respostas = await prisma.respostaUsuario.findMany({
      where: { usuarioId: userId },
      select: {
        isCorreta: true,
        questao: { select: { disciplinaId: true, disciplina: { select: { nome: true } } } },
      },
    })

    const discMap = new Map<string, { nome: string; total: number; corretas: number }>()
    for (const r of respostas) {
      const disc = (r.questao as any).disciplina
      if (!disc) continue
      const atual = discMap.get(r.questao.disciplinaId) ?? { nome: disc.nome, total: 0, corretas: 0 }
      atual.total += 1
      if (r.isCorreta) atual.corretas += 1
      discMap.set(r.questao.disciplinaId, atual)
    }

    const estatDisciplinas = Array.from(discMap.entries())
      .map(([id, stats]) => ({
        disciplinaId: id,
        nome: stats.nome,
        taxaAcerto: calcTaxaAcerto(stats.corretas, stats.total),
      }))
      .sort((a, b) => b.taxaAcerto - a.taxaAcerto)
      .slice(0, 8)

    return estatDisciplinas.map((e, i) => ({
      name: e.nome,
      progress: e.taxaAcerto,
      color: DISCIPLINE_COLORS[i % DISCIPLINE_COLORS.length] ?? "bg-slate-500",
      disciplinaId: e.disciplinaId,
    }))
  }

  // -------------------------------------------------------------------------
  // Pontos fortes, fracos e análise de erros
  // -------------------------------------------------------------------------
  private static async getDiagnostics(
    userId: string,
    inicio: Date,
    agora: Date
  ): Promise<DiagnosticsData> {
    const [respostasGerais, respostasErradas] = await Promise.all([
      prisma.respostaUsuario.findMany({
        where: { usuarioId: userId },
        select: {
          isCorreta: true,
          questao: { select: { disciplinaId: true, disciplina: { select: { nome: true } } } },
        },
      }),
      prisma.respostaUsuario.findMany({
        where: {
          usuarioId: userId,
          isCorreta: false,
          respondidoEm: { gte: inicio, lte: agora },
          erroMotivo: { not: null },
        },
        select: { erroMotivo: true },
      }),
    ])

    const discMap = new Map<string, { nome: string; total: number; corretas: number }>()
    for (const r of respostasGerais) {
      const disc = (r.questao as any).disciplina
      if (!disc) continue
      const atual = discMap.get(r.questao.disciplinaId) ?? { nome: disc.nome, total: 0, corretas: 0 }
      atual.total += 1
      if (r.isCorreta) atual.corretas += 1
      discMap.set(r.questao.disciplinaId, atual)
    }

    const todasEstat = Array.from(discMap.entries())
      .filter(([, stats]) => stats.total >= 3) // min 3 questões para ser relevante
      .map(([id, stats]) => ({
        disciplinaId: id,
        nome: stats.nome,
        taxaAcerto: calcTaxaAcerto(stats.corretas, stats.total),
      }))
      .sort((a, b) => b.taxaAcerto - a.taxaAcerto)

    const strengths = todasEstat.slice(0, 3).map((e) => ({
      name: e.nome,
      acc: `${e.taxaAcerto}%`,
      disciplinaId: e.disciplinaId,
    }))

    const weaknesses = [...todasEstat].reverse().slice(0, 3).map((e) => ({
      name: e.nome,
      acc: `${e.taxaAcerto}%`,
      disciplinaId: e.disciplinaId,
    }))

    // Contagem de motivos de erro
    const motivoCount = new Map<string, number>()
    for (const r of respostasErradas) {
      if (r.erroMotivo) {
        motivoCount.set(r.erroMotivo, (motivoCount.get(r.erroMotivo) ?? 0) + 1)
      }
    }

    const totalMotivoErros = Array.from(motivoCount.values()).reduce((a, b) => a + b, 0)
    const computed = Array.from(motivoCount.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([motivo, count]) => ({
        label: MOTIVO_LABELS[motivo] ?? motivo,
        val: totalMotivoErros > 0 ? `${Math.round((count / totalMotivoErros) * 100)}%` : "0%",
        color: MOTIVO_COLORS[motivo] ?? "bg-gray-500",
      }))

    const errorReasons =
      computed.length > 0
        ? computed
        : [
            { label: "Falta de conhecimento", val: "—", color: "bg-rose-500" },
            { label: "Interpretação",          val: "—", color: "bg-orange-500" },
            { label: "Desatenção",             val: "—", color: "bg-blue-500" },
            { label: "Pegadinha da banca",     val: "—", color: "bg-purple-500" },
          ]

    // Total de erros no período (sem filtro de erroMotivo)
    const totalErrors = await prisma.respostaUsuario.count({
      where: { usuarioId: userId, isCorreta: false, respondidoEm: { gte: inicio, lte: agora } },
    })

    return { strengths, weaknesses, errorReasons, totalErrors }
  }

  // -------------------------------------------------------------------------
  // Desempenho por banca
  // -------------------------------------------------------------------------
  private static async getBancas(
    userId: string,
    inicio: Date,
    agora: Date
  ): Promise<BancaPerf[]> {
    const respostas = await prisma.respostaUsuario.findMany({
      where: {
        usuarioId: userId,
        respondidoEm: { gte: inicio, lte: agora },
        questao: { bancaId: { not: null } },
      },
      select: {
        isCorreta: true,
        questao: {
          select: {
            bancaId: true,
            banca: { select: { id: true, nome: true, sigla: true } },
          },
        },
      },
    })

    const bancaMap = new Map<string, { nome: string; sigla: string | null; total: number; corretas: number }>()
    for (const r of respostas) {
      const banca = r.questao.banca
      if (!banca) continue
      const atual = bancaMap.get(banca.id) ?? { nome: banca.nome, sigla: banca.sigla, total: 0, corretas: 0 }
      atual.total += 1
      if (r.isCorreta) atual.corretas += 1
      bancaMap.set(banca.id, atual)
    }

    return Array.from(bancaMap.entries())
      .filter(([, { total }]) => total >= 3)
      .sort(([, a], [, b]) => b.total - a.total)
      .slice(0, 5)
      .map(([, { nome, sigla, total, corretas }], i) => ({
        name: sigla ?? nome,
        acc: calcTaxaAcerto(corretas, total),
        char: `${total} questões respondidas`,
        color: BANCA_COLORS[i % BANCA_COLORS.length] ?? "bg-slate-500",
      }))
  }

  // -------------------------------------------------------------------------
  // Análise de tempo (quadrantes)
  // -------------------------------------------------------------------------
  private static async getTimeAnalysis(
    userId: string,
    inicio: Date,
    agora: Date
  ): Promise<TimeAnalysisItem[]> {
    const respostas = await prisma.respostaUsuario.findMany({
      where: { usuarioId: userId, respondidoEm: { gte: inicio, lte: agora } },
      select: { isCorreta: true, tempoSeg: true },
    })

    let rapidoCorreto = 0, rapidoErrado = 0, lentoCorreto = 0, lentoErrado = 0

    for (const r of respostas) {
      if (r.tempoSeg == null) continue
      const rapido = r.tempoSeg < THRESHOLD_RAPIDO_SEG
      if (rapido && r.isCorreta) rapidoCorreto++
      else if (rapido && !r.isCorreta) rapidoErrado++
      else if (!rapido && r.isCorreta) lentoCorreto++
      else lentoErrado++
    }

    const total = rapidoCorreto + rapidoErrado + lentoCorreto + lentoErrado
    const pct = (n: number) =>
      total > 0 ? `${Math.round((n / total) * 100)}% das questões` : "Sem dados de tempo"

    return [
      { title: "Rápido + Certo",  desc: "Domínio",         perc: pct(rapidoCorreto), rawPerc: rapidoCorreto },
      { title: "Rápido + Errado", desc: "Provável chute",  perc: pct(rapidoErrado),  rawPerc: rapidoErrado },
      { title: "Lento + Certo",   desc: "Aprendizado",     perc: pct(lentoCorreto),  rawPerc: lentoCorreto },
      { title: "Lento + Errado",  desc: "Falta de domínio",perc: pct(lentoErrado),   rawPerc: lentoErrado },
    ]
  }

  // -------------------------------------------------------------------------
  // Revisões pendentes
  // -------------------------------------------------------------------------
  private static async getRevisions(userId: string): Promise<RevisionItem[]> {
    const revisoes = await prisma.revisao.findMany({
      where: { usuarioId: userId, status: "pendente" },
      include: {
        questao: {
          select: {
            enunciado: true,
            totalRespostas: true,
            totalCorretas: true,
          },
        },
      },
      orderBy: [{ repeticoes: "asc" }, { proximaRevisao: "asc" }],
      take: 4,
    })

    return revisoes.map((rev) => {
      const totalResp = rev.questao?.totalRespostas ?? 0
      const totalCert = rev.questao?.totalCorretas ?? 0
      const erros = totalResp - totalCert

      const prioridade = PRIORIDADE_CONFIG.find((p) => erros >= p.threshold) ?? {
        label: "Baixa",
        color: "text-blue-500 bg-blue-500/10",
      }

      const enunciado = rev.questao?.enunciado ?? "Questão"
      const titulo = enunciado.length > 55 ? enunciado.substring(0, 55) + "..." : enunciado

      return {
        name: titulo,
        type: prioridade.label,
        color: prioridade.color,
        count: erros > 0 ? `Errou ${erros}x` : "Pendente",
      }
    })
  }

  // -------------------------------------------------------------------------
  // Foco do dia — disciplina com maior queda nos últimos 7 dias
  // -------------------------------------------------------------------------
  private static async getFocus(userId: string, agora: Date): Promise<FocusData | null> {
    const sete = new Date(agora)
    sete.setDate(sete.getDate() - 7)
    const quatorze = new Date(sete)
    quatorze.setDate(quatorze.getDate() - 7)

    const [recentes, anteriores] = await Promise.all([
      prisma.respostaUsuario.findMany({
        where: { usuarioId: userId, respondidoEm: { gte: sete, lte: agora } },
        select: {
          isCorreta: true,
          questao: { select: { disciplinaId: true, disciplina: { select: { nome: true } } } },
        },
      }),
      prisma.respostaUsuario.findMany({
        where: { usuarioId: userId, respondidoEm: { gte: quatorze, lt: sete } },
        select: {
          isCorreta: true,
          questao: { select: { disciplinaId: true } },
        },
      }),
    ])

    // Agrupa por disciplina
    type DisciplinaMap = Map<string, { total: number; corretas: number; nome?: string }>

    const agrupa = (lista: typeof recentes | typeof anteriores): DisciplinaMap => {
      const map: DisciplinaMap = new Map()
      for (const r of lista) {
        const id = r.questao.disciplinaId
        const nome = "disciplina" in r.questao ? (r.questao as any).disciplina?.nome : undefined
        const atual = map.get(id) ?? { total: 0, corretas: 0, nome }
        atual.total++
        if (r.isCorreta) atual.corretas++
        map.set(id, atual)
      }
      return map
    }

    const recenteMap = agrupa(recentes)
    const anteriorMap = agrupa(anteriores)

    let maiorQueda = 0
    let foco: FocusData | null = null

    for (const [id, { total, corretas, nome }] of recenteMap.entries()) {
      if (total < 3) continue
      const taxaRecente = (corretas / total) * 100
      const ant = anteriorMap.get(id)
      if (!ant || ant.total < 3) continue
      const taxaAnterior = (ant.corretas / ant.total) * 100
      const queda = taxaAnterior - taxaRecente
      if (queda > maiorQueda) {
        maiorQueda = queda
        foco = { disciplinaNome: nome ?? "Disciplina", quedaPerc: Math.round(queda) }
      }
    }

    return foco
  }
}
