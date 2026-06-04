import { OverviewStats } from "@/features/estatisticas/types/estatisticas.types"
import { Target, Clock, CheckCircle2, XCircle } from "lucide-react"
import { MetricCardTrend } from "./metric-card-trend"

export function DesempenhoOverview({ data }: { data: OverviewStats }) {
  const formatTempo = (seg: number) => {
    if (!seg) return "0s"
    const m = Math.floor(seg / 60)
    const s = seg % 60
    return `${m}m ${s}s`
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCardTrend 
        title="Taxa de acerto"
        icon={Target}
        iconBgClass="bg-blue-500/10 dark:bg-blue-500/20"
        iconColorClass="text-blue-500"
        data={data.taxaAcerto}
        formatter={(val) => `${val}%`}
      />
      
      <MetricCardTrend 
        title="Tempo médio por questão"
        icon={Clock}
        iconBgClass="bg-rose-500/10 dark:bg-rose-500/20"
        iconColorClass="text-rose-500"
        data={data.tempoMedioSegundos}
        formatter={formatTempo}
      />

      <MetricCardTrend 
        title="Questões acertadas"
        icon={CheckCircle2}
        iconBgClass="bg-emerald-500/10 dark:bg-emerald-500/20"
        iconColorClass="text-emerald-500"
        data={data.totalCorretas}
      />

      <MetricCardTrend 
        title="Questões erradas"
        icon={XCircle}
        iconBgClass="bg-amber-500/10 dark:bg-amber-500/20"
        iconColorClass="text-amber-500"
        data={data.totalErradas}
      />
    </div>
  )
}
