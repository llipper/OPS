import { Card, CardContent } from "@workspace/ui/components/card"
import {
  FileText,
  Clock,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import type { DashboardStats } from "@/types/dashboard"

interface StatsGridProps {
  stats: DashboardStats
}

function formatTempo(seg: number): string {
  if (seg === 0) return "—"
  const m = Math.floor(seg / 60)
  const s = seg % 60
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

export function StatsGrid({ stats }: StatsGridProps) {
  const variacaoAcerto = stats.taxaAcerto - stats.taxaAcertoAnterior
  const variacaoQuestoes = stats.totalQuestoes - stats.totalQuestoesAnterior
  const variacaoTempo = stats.tempoMedioSeg - stats.tempoMedioSegAnterior // negativo = mais rápido

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Taxa de Acerto */}
      <Card className="border-border/40 shadow-sm relative overflow-hidden bg-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase">Taxa de acerto</p>
              <h3 className="text-3xl font-bold tracking-tight">{stats.taxaAcerto}%</h3>
            </div>
            <div className="relative size-12">
              <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent -rotate-45" />
            </div>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-bold ${variacaoAcerto >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
            {variacaoAcerto >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(variacaoAcerto)}%{" "}
            <span className="text-muted-foreground/60 font-medium">desde o período anterior</span>
          </div>
        </CardContent>
      </Card>

      {/* Questões Resolvidas */}
      <Card className="border-border/40 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase">Questões resolvidas</p>
              <h3 className="text-3xl font-bold tracking-tight">
                {stats.totalQuestoes.toLocaleString("pt-BR")}
              </h3>
            </div>
            <div className="p-2.5 bg-muted/30 rounded-xl">
              <FileText className="size-6 text-muted-foreground/60" />
            </div>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-bold ${variacaoQuestoes >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
            {variacaoQuestoes >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(variacaoQuestoes)}{" "}
            <span className="text-muted-foreground/60 font-medium">questões</span>
          </div>
        </CardContent>
      </Card>

      {/* Tempo Médio */}
      <Card className="border-border/40 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase">Tempo médio</p>
              <h3 className="text-3xl font-bold tracking-tight">{formatTempo(stats.tempoMedioSeg)}</h3>
            </div>
            <div className="p-2.5 bg-muted/30 rounded-xl">
              <Clock className="size-6 text-muted-foreground/60" />
            </div>
          </div>
          {stats.tempoMedioSeg === 0 && stats.tempoMedioSegAnterior === 0 ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60">
              Sem registro de tempo
            </div>
          ) : variacaoTempo === 0 ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60">
              Igual ao período anterior
            </div>
          ) : (
            <div className={`flex items-center gap-1.5 text-xs font-bold ${variacaoTempo <= 0 ? "text-emerald-500" : "text-rose-500"}`}>
              {variacaoTempo <= 0 ? <ArrowDownRight className="size-3" /> : <ArrowUpRight className="size-3" />}
              {formatTempo(Math.abs(variacaoTempo))}{" "}
              <span className={`font-medium ${variacaoTempo <= 0 ? "text-emerald-500" : "text-muted-foreground/60"}`}>
                {variacaoTempo <= 0 ? "mais rápido" : "mais lento"}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sequência */}
      <Card className="border-border/40 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase">Sequência de estudo</p>
              <h3 className="text-3xl font-bold tracking-tight">{stats.sequenciaAtual} dias</h3>
            </div>
            <div className="p-2.5 bg-muted/30 rounded-xl">
              <Flame className="size-6 text-muted-foreground/60" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ArrowUpRight className="size-3 text-emerald-500" />
            Melhor sequência:{" "}
            <span className="font-bold text-foreground">{stats.maiorSequencia} dias</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
