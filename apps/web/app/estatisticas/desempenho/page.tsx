import { Suspense } from "react"
import { auth } from "@workspace/auth"
import { redirect } from "next/navigation"
import { FiltroPeriodo } from "@/features/estatisticas/types/estatisticas.types"
import { EstatisticasService } from "@/features/estatisticas/services/estatisticas.service"

// Componentes
import { DesempenhoFiltros } from "./_components/desempenho-filtros"

import { DonutChartCard } from "./_components/donut-chart-card"
import { HorizontalBarList } from "./_components/horizontal-bar-list"

// Re-usando os mesmos componentes base do dashboard para evitar duplicação severa, mas envelopando na nova grid
import { EvolutionChart } from "@/components/estatisticas/evolution-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { DesempenhoOverview } from "./_components/desempenho-overview"

export const metadata = {
  title: "Desempenho Ultimate | Ops",
}

interface PageProps {
  searchParams: Promise<{ period?: string }>
}

export default async function DesempenhoPage({ searchParams }: PageProps) {
  const session = await auth()
  const userId = session?.user?.id
  
  if (!userId) redirect("/sign-in")

  const { period } = await searchParams
  const p = period as string
  const periodoValido: FiltroPeriodo = ["7d", "30d", "90d", "ano", "tudo"].includes(p) ? (p as FiltroPeriodo) : "30d"

  const dados = await EstatisticasService.getDesempenho(userId, periodoValido)

  // Preparando os dados para os Donut Charts
  const chartCertasErradas = [
    { name: "Certas", value: dados.overview.totalCorretas.value, color: "#10b981" }, // Emerald 500
    { name: "Erradas", value: dados.overview.totalErradas.value, color: "#f43f5e" }, // Rose 500
  ]

  const chartDificuldade = [
    { name: "Fácil", value: dados.dificuldade.facil.total, color: "#10b981" },
    { name: "Médio", value: dados.dificuldade.medio.total, color: "#eab308" }, // Yellow 500
    { name: "Difícil", value: dados.dificuldade.dificil.total, color: "#f43f5e" },
  ]

  return (
    <main className="flex flex-1 flex-col p-4 md:p-8 space-y-6 w-full bg-background/50">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Desempenho</h2>
            <p className="text-muted-foreground mt-1">Acompanhe seu rendimento geral e por disciplinas, identificando pontos fortes e melhorias.</p>
          </div>
          <DesempenhoFiltros periodoSelecionado={periodoValido} />
        </div>

        {/* Linha 1: Métricas de Tendência */}
        <DesempenhoOverview data={dados.overview} />
        
        {/* Linha 2: Evolução e Disciplinas (2/3 e 1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="border-border/40 bg-card shadow-sm rounded-[24px] lg:col-span-8 flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-[13px] font-semibold text-foreground/80">Desempenho ao longo do tempo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-4 px-4 min-h-[300px]">
              {dados.evolution.length > 0 ? (
                <EvolutionChart data={dados.evolution} metric="taxaAcerto" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-[13px] text-muted-foreground">
                  Sem dados suficientes para exibir o gráfico
                </div>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-4 flex flex-col h-full">
            <HorizontalBarList 
              title="Desempenho por disciplina"
              items={dados.disciplinas.slice(0, 8)}
              colorClass="bg-emerald-500"
              emptyMessage="Nenhuma disciplina praticada no período"
            />
          </div>
        </div>

        {/* Linha 3: Roscas de Distribuição e Bancas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto">
          <DonutChartCard 
            title="Distribuição de acertos"
            data={chartCertasErradas}
            centerText1={dados.overview.totalResolucoes.value.toString()}
            centerText2="respondidas"
          />
          <DonutChartCard 
            title="Nível de dificuldade"
            data={chartDificuldade}
            centerText1={dados.overview.totalResolucoes.value.toString()}
            centerText2="respondidas"
          />

          <HorizontalBarList 
            title="Desempenho por banca"
            items={dados.bancas.slice(0, 5)}
            colorClass="bg-blue-500"
            emptyMessage="Nenhuma banca identificada"
          />
          
          <Card className="border-border/40 bg-card shadow-sm rounded-[24px]">
            <CardContent className="p-4 h-full flex flex-col justify-center">
              <h3 className="font-semibold text-[13px] mb-4 text-foreground/80">Resumo do período</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-muted-foreground">Total de questões</span>
                  <span className="font-bold">{dados.overview.totalResolucoes.value}</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-muted-foreground">Média de questões por dia</span>
                  <span className="font-bold">{dados.resumo.mediaQuestoesDia}</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-muted-foreground">Melhor desempenho diário</span>
                  <span className="font-bold">{dados.resumo.melhorDia}</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-muted-foreground">Pior desempenho diário</span>
                  <span className="font-bold text-rose-500">{dados.resumo.piorDia}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Linha 4: Raio-X Piores e Melhores Assuntos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HorizontalBarList 
            title="Assuntos com maior taxa de erro"
            items={dados.topAssuntosRuins}
            colorClass="bg-rose-500"
            emptyMessage="Não há erros suficientes para análise"
            showSecondary={true}
          />
          <HorizontalBarList 
            title="Assuntos com maior taxa de acerto"
            items={dados.topAssuntosBons}
            colorClass="bg-emerald-500"
            emptyMessage="Não há acertos suficientes para análise"
            showSecondary={true}
          />
        </div>

      </div>
    </main>
  )
}
