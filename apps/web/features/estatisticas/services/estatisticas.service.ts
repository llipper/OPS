import { prisma } from "@workspace/database"
import { DesempenhoData, FiltroPeriodo, TrendValue, TaxonomiaPerf } from "../types/estatisticas.types"

export class EstatisticasService {
  static async getDesempenho(userId: string, periodo: FiltroPeriodo): Promise<DesempenhoData> {
    const agora = new Date()
    let inicio = new Date(0)
    let inicioAnterior = new Date(0)
    let diasPeriodo = 30

    if (periodo === "7d") {
      inicio.setDate(agora.getDate() - 7)
      inicioAnterior.setDate(inicio.getDate() - 7)
      diasPeriodo = 7
    } else if (periodo === "30d") {
      inicio.setDate(agora.getDate() - 30)
      inicioAnterior.setDate(inicio.getDate() - 30)
      diasPeriodo = 30
    } else if (periodo === "90d") {
      inicio.setDate(agora.getDate() - 90)
      inicioAnterior.setDate(inicio.getDate() - 90)
      diasPeriodo = 90
    } else if (periodo === "ano") {
      inicio = new Date(agora.getFullYear(), 0, 1)
      inicioAnterior = new Date(agora.getFullYear() - 1, 0, 1)
      diasPeriodo = Math.floor((agora.getTime() - inicio.getTime()) / (1000 * 3600 * 24))
    }

    const [respostasAtual, respostasAnterior] = await Promise.all([
      prisma.respostaUsuario.findMany({
        where: { usuarioId: userId, respondidoEm: { gte: inicio, lte: agora } },
        select: {
          isCorreta: true,
          tempoSeg: true,
          respondidoEm: true,
          questao: {
            select: {
              disciplinaId: true,
              disciplina: { select: { nome: true } },
              assuntoId: true,
              assunto: { select: { nome: true } },
              dificuldade: { select: { nome: true } },
              banca: { select: { nome: true } }
            }
          }
        }
      }),
      periodo === "tudo" ? [] : prisma.respostaUsuario.findMany({
        where: { usuarioId: userId, respondidoEm: { gte: inicioAnterior, lt: inicio } },
        select: { isCorreta: true, tempoSeg: true }
      })
    ])

    // --- CÁLCULOS DO PERÍODO ANTERIOR (Para Tendência) ---
    const antTotal = respostasAnterior.length
    const antCorretas = respostasAnterior.filter(r => r.isCorreta).length
    const antErradas = antTotal - antCorretas
    const antTaxa = antTotal > 0 ? Math.round((antCorretas / antTotal) * 100) : 0
    const antComTempo = respostasAnterior.filter(r => r.tempoSeg != null)
    const antTempoMedio = antComTempo.length > 0 ? Math.round(antComTempo.reduce((acc, r) => acc + (r.tempoSeg || 0), 0) / antComTempo.length) : 0

    // --- CÁLCULOS DO PERÍODO ATUAL ---
    let totalResolucoes = 0
    let totalCorretas = 0
    let tempoGastoSegundos = 0
    let questoesComTempo = 0

    const discMap = new Map<string, { nome: string; total: number; corretas: number; filhos: Map<string, { nome: string; total: number; corretas: number }> }>()
    const bancaMap = new Map<string, { total: number; corretas: number }>()
    const dificuldadeMap = {
      facil: { total: 0, corretas: 0 },
      medio: { total: 0, corretas: 0 },
      dificil: { total: 0, corretas: 0 }
    }
    
    const diasEstudoSet = new Set<string>()
    const acertosPorDia = new Map<string, { total: number, corretas: number }>()

    for (const r of respostasAtual) {
      totalResolucoes++
      if (r.isCorreta) totalCorretas++
      if (r.tempoSeg != null) {
        tempoGastoSegundos += r.tempoSeg
        questoesComTempo++
      }
      
      const diaStr = r.respondidoEm.toLocaleDateString("pt-BR")
      diasEstudoSet.add(diaStr)
      const statsDia = acertosPorDia.get(diaStr) || { total: 0, corretas: 0 }
      statsDia.total++
      if (r.isCorreta) statsDia.corretas++
      acertosPorDia.set(diaStr, statsDia)

      const q = r.questao as any
      if (!q) continue

      // Dificuldade
      const dif = q.dificuldade?.nome?.toLowerCase() || ""
      if (dif.includes("fácil") || dif.includes("facil")) {
        dificuldadeMap.facil.total++
        if (r.isCorreta) dificuldadeMap.facil.corretas++
      } else if (dif.includes("médio") || dif.includes("medio")) {
        dificuldadeMap.medio.total++
        if (r.isCorreta) dificuldadeMap.medio.corretas++
      } else if (dif.includes("difícil") || dif.includes("dificil")) {
        dificuldadeMap.dificil.total++
        if (r.isCorreta) dificuldadeMap.dificil.corretas++
      }

      // Banca
      const bancaNome = q.banca?.nome || "Outras"
      const bStats = bancaMap.get(bancaNome) || { total: 0, corretas: 0 }
      bStats.total++
      if (r.isCorreta) bStats.corretas++
      bancaMap.set(bancaNome, bStats)

      // Disciplina e Assunto
      if (!q.disciplinaId) continue
      let d = discMap.get(q.disciplinaId)
      if (!d) {
        d = { nome: q.disciplina?.nome ?? "Desconhecida", total: 0, corretas: 0, filhos: new Map() }
        discMap.set(q.disciplinaId, d)
      }
      d.total++
      if (r.isCorreta) d.corretas++

      if (q.assuntoId) {
        let a = d.filhos.get(q.assuntoId)
        if (!a) {
          a = { nome: q.assunto?.nome ?? "Desconhecido", total: 0, corretas: 0 }
          d.filhos.set(q.assuntoId, a)
        }
        a.total++
        if (r.isCorreta) a.corretas++
      }
    }

    const totalErradas = totalResolucoes - totalCorretas
    const taxaAcerto = totalResolucoes > 0 ? Math.round((totalCorretas / totalResolucoes) * 100) : 0
    const tempoMedioSegundos = questoesComTempo > 0 ? Math.round(tempoGastoSegundos / questoesComTempo) : 0

    // Construção das tendências
    const calcTrend = (atual: number, ant: number, type: "percent" | "diff" | "time"): TrendValue<number> => {
      if (periodo === "tudo" || ant === 0) return { value: atual, trendStr: "", isPositive: null }
      const isPositive = atual >= ant
      if (type === "percent") {
        const diff = atual - ant
        return { value: atual, trendStr: `${diff >= 0 ? '▲' : '▼'} ${Math.abs(diff)}% em relação ao período anterior`, isPositive: diff >= 0 }
      }
      if (type === "time") {
        const diff = atual - ant
        return { value: atual, trendStr: `${diff <= 0 ? '▼' : '▲'} ${Math.abs(diff)}s em relação ao período anterior`, isPositive: diff <= 0 } // Menos tempo é positivo
      }
      const diff = atual - ant
      return { value: atual, trendStr: `${diff >= 0 ? '▲' : '▼'} ${Math.abs(diff)} em relação ao período anterior`, isPositive: diff >= 0 }
    }

    const overview = {
      totalResolucoes: calcTrend(totalResolucoes, antTotal, "diff"),
      totalCorretas: calcTrend(totalCorretas, antCorretas, "diff"),
      totalErradas: calcTrend(totalErradas, antErradas, "diff"),
      taxaAcerto: calcTrend(taxaAcerto, antTaxa, "percent"),
      tempoGastoSegundos,
      tempoMedioSegundos: calcTrend(tempoMedioSegundos, antTempoMedio, "time")
    }

    // Processar Dificuldade
    const totalDif = dificuldadeMap.facil.total + dificuldadeMap.medio.total + dificuldadeMap.dificil.total
    const dificuldade = {
      facil: { ...dificuldadeMap.facil, percent: totalDif > 0 ? Math.round((dificuldadeMap.facil.total / totalDif) * 100) : 0 },
      medio: { ...dificuldadeMap.medio, percent: totalDif > 0 ? Math.round((dificuldadeMap.medio.total / totalDif) * 100) : 0 },
      dificil: { ...dificuldadeMap.dificil, percent: totalDif > 0 ? Math.round((dificuldadeMap.dificil.total / totalDif) * 100) : 0 }
    }

    // Processar Disciplinas e Assuntos
    const todosAssuntos: TaxonomiaPerf[] = []
    const disciplinas: TaxonomiaPerf[] = Array.from(discMap.entries()).map(([discId, dStats]) => {
      const filhos = Array.from(dStats.filhos.entries()).map(([assuntoId, aStats]) => {
        const a = {
          id: assuntoId,
          nome: aStats.nome,
          parentNome: dStats.nome,
          total: aStats.total,
          corretas: aStats.corretas,
          taxaAcerto: aStats.total > 0 ? Math.round((aStats.corretas / aStats.total) * 100) : 0,
        }
        todosAssuntos.push(a)
        return a
      }).sort((a, b) => b.total - a.total)

      return {
        id: discId,
        nome: dStats.nome,
        total: dStats.total,
        corretas: dStats.corretas,
        taxaAcerto: dStats.total > 0 ? Math.round((dStats.corretas / dStats.total) * 100) : 0,
        filhos
      }
    }).sort((a, b) => b.total - a.total)

    // Top Assuntos Bons e Ruins (Mínimo de 5 questões para ter relevância estatística)
    const assuntosValidos = todosAssuntos.filter(a => a.total >= 5)
    // Se não tiver com 5, pega todos pra não deixar vazio
    const pool = assuntosValidos.length >= 6 ? assuntosValidos : todosAssuntos
    
    const topAssuntosBons = [...pool].sort((a, b) => b.taxaAcerto - a.taxaAcerto).slice(0, 5)
    const topAssuntosRuins = [...pool].sort((a, b) => a.taxaAcerto - b.taxaAcerto).slice(0, 5)

    // Resumo do período
    let melhorDiaStr = "-"
    let piorDiaStr = "-"
    let melhorTaxa = -1
    let piorTaxa = 101

    for (const [dia, stats] of acertosPorDia.entries()) {
      if (stats.total >= 3) { // mínimo 3 questões pra considerar no ranking do dia
        const t = Math.round((stats.corretas / stats.total) * 100)
        if (t > melhorTaxa) { melhorTaxa = t; melhorDiaStr = `${dia} (${t}%)` }
        if (t < piorTaxa) { piorTaxa = t; piorDiaStr = `${dia} (${t}%)` }
      }
    }

    // Preparar array de bancas ordenado por volume de questões
    const bancas: TaxonomiaPerf[] = Array.from(bancaMap.entries()).map(([nome, stats], idx) => ({
      id: `banca-${idx}`,
      nome,
      total: stats.total,
      corretas: stats.corretas,
      taxaAcerto: stats.total > 0 ? Math.round((stats.corretas / stats.total) * 100) : 0
    })).sort((a, b) => b.total - a.total)

    // Preparar array de evolução ordenado por data
    const evolution = Array.from(acertosPorDia.entries()).map(([dia, stats]) => {
      // dia = DD/MM/YYYY. Precisa ser ordenável
      const [d, m, y] = dia.split("/")
      return {
        dateStr: `${y}-${m}-${d}`, // para ordenar
        date: `${d}/${m}`, // label
        taxaAcerto: stats.total > 0 ? Math.round((stats.corretas / stats.total) * 100) : 0,
        questoesResolvidas: stats.total
      }
    }).sort((a, b) => a.dateStr.localeCompare(b.dateStr)).map(({ date, taxaAcerto, questoesResolvidas }) => ({ date, taxaAcerto, questoesResolvidas }))

    return { 
      overview, 
      disciplinas: disciplinas.map(d => ({ ...d, filhos: undefined })), // Remove filhos pra deixar leve
      dificuldade,
      evolution,
      bancas,
      topAssuntosBons,
      topAssuntosRuins,
      resumo: {
        diasEstudo: diasEstudoSet.size,
        mediaQuestoesDia: diasEstudoSet.size > 0 ? Math.round(totalResolucoes / diasEstudoSet.size) : 0,
        melhorDia: melhorDiaStr,
        piorDia: piorDiaStr
      }
    }
  }
}
