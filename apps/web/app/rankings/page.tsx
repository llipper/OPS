import { Suspense } from "react"
import { auth } from "@workspace/auth"
import { redirect } from "next/navigation"
import { getRankingData, RankingPeriodo } from "@/features/rankings/actions/ranking.actions"

// Componentes
import { RankingFiltros } from "./_components/ranking-filtros"
import { RankingList } from "./_components/ranking-list"

export const metadata = {
  title: "Classificação Geral | Ops",
  description: "Acompanhe sua posição no ranking geral de estudantes e compare seu rendimento.",
}

interface PageProps {
  searchParams: Promise<{ period?: string }>
}

export default async function RankingsPage({ searchParams }: PageProps) {
  const session = await auth()
  const userId = session?.user?.id
  
  if (!userId) redirect("/sign-in")

  const { period } = await searchParams
  const p = period as string
  const periodoValido: RankingPeriodo = ["7d", "30d", "tudo"].includes(p) 
    ? (p as RankingPeriodo) 
    : "30d"

  // Busca dos dados de ranking reais do backend
  const dados = await getRankingData(periodoValido)

  // Apenas competidores com pontuação maior que 0 sobem ao pódio
  const competidoresPodio = dados.items.filter((item) => item.pontuacao > 0)
  const top3 = competidoresPodio.slice(0, 3)

  // O restante dos participantes na lista (todos os que não estão no pódio)
  const restOfRanking = dados.items.filter((item) => !top3.some(p => p.usuarioId === item.usuarioId))

  // Encontrando o usuário ativo na listagem para destacar
  const currentUser = dados.items.find((item) => item.isCurrentUser) || null

  return (
    <main className="flex flex-1 flex-col p-4 md:p-8 space-y-6 w-full bg-background/50">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        
        {/* Bloco de Cabeçalho da Página (Padronizado com Desempenho) */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Classificação Geral</h2>
            <p className="text-muted-foreground mt-1">
              Acompanhe sua posição no ranking de estudantes da plataforma e compare seu rendimento.
            </p>
          </div>
          
          {/* Seletor de Período Dropdown (Consistente com Desempenho) */}
          <Suspense fallback={<div className="h-10 w-[180px] bg-background border border-border/40 rounded-lg animate-pulse" />}>
            <RankingFiltros periodoSelecionado={periodoValido} />
          </Suspense>
        </div>
 
        {/* Corpo do Ranking (Classificação Geral Minimalista) */}
        <Suspense fallback={
          <div className="space-y-6">
            <div className="h-96 bg-zinc-950 rounded-[24px] animate-pulse border border-zinc-850/20" />
          </div>
        }>
          <RankingList top3={top3} restOfRanking={restOfRanking} currentUser={currentUser} />
        </Suspense>

      </div>
    </main>
  )
}
