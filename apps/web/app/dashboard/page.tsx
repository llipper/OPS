import * as React from "react"
import { getDashboardData } from "@/features/dashboard/actions/dashboard.actions"

// Dashboard Components
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { EvolutionSection } from "@/components/dashboard/evolution-section"
import { DiagnosticsSection } from "@/components/dashboard/diagnostics-section"
import { TacticalSection } from "@/components/dashboard/tactical-section"
import { ActionsSection } from "@/components/dashboard/actions-section"
import { DashboardFooterBanner } from "@/components/dashboard/footer-banner"

export default async function Page() {
  // A action já cuida de autenticação internamente
  const data = await getDashboardData("30d")

  return (
    <main className="flex flex-1 flex-col p-4 md:p-8 space-y-8 w-full bg-background/50">
        <div className="mx-auto w-full max-w-[1600px] space-y-8">
          {/* Saudação e Seletor de Período */}
          <DashboardHeader />

          {/* Métricas Principais (4 Cards) */}
          <StatsGrid stats={data.stats} />

          {/* Gráfico de Evolução e Desempenho por Disciplina */}
          <EvolutionSection evolutionData={data.evolution} subjectsData={data.subjects} />

          {/* Pontos Fortes, Fracos e Análise de Erros */}
          <DiagnosticsSection diagnostics={data.diagnostics} />

          {/* Análise de Tempo e Desempenho por Banca */}
          <TacticalSection timeAnalysis={data.timeAnalysis} bancas={data.bancas} />

          {/* Revisão Recomendada e Próximas Ações */}
          <ActionsSection revisions={data.revisions} />

          {/* Banner de Foco do Dia */}
          <DashboardFooterBanner focus={data.focus} />
        </div>
    </main>
  )
}
