import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import {
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react"
import type { DiagnosticsData } from "@/types/dashboard"

interface DiagnosticsSectionProps {
  diagnostics: DiagnosticsData
}

import type { LucideIcon } from "lucide-react"

const STRENGTH_ICONS: LucideIcon[] = [LinkIcon, LinkIcon, CheckCircle2]
const WEAKNESS_ICONS: LucideIcon[] = [AlertCircle, AlertCircle, Activity]

export function DiagnosticsSection({ diagnostics }: DiagnosticsSectionProps) {
  const { strengths, weaknesses, errorReasons, totalErrors } = diagnostics

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Strengths */}
      <Card className="border-border/40 shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-bold uppercase tracking-tight">Pontos fortes</CardTitle>
          <Button variant="link" className="text-xs font-bold text-primary p-0 h-auto">Ver todos</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {strengths.length > 0 ? (
            strengths.map((item, i) => {
              const Icon: LucideIcon = STRENGTH_ICONS[i % STRENGTH_ICONS.length] ?? CheckCircle2
              return (
                <div key={item.disciplinaId} className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold tracking-tight">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                      {item.acc} de acerto
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-xs text-muted-foreground">Nenhuma disciplina disponível</p>
          )}
        </CardContent>
      </Card>

      {/* Weaknesses */}
      <Card className="border-border/40 shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-bold uppercase tracking-tight">Pontos fracos</CardTitle>
          <Button variant="link" className="text-xs font-bold text-primary p-0 h-auto">Ver todos</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {weaknesses.length > 0 ? (
            weaknesses.map((item, i) => {
              const Icon: LucideIcon = WEAKNESS_ICONS[i % WEAKNESS_ICONS.length] ?? AlertCircle
              return (
                <div key={item.disciplinaId} className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-rose-500/10 text-rose-500">
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold tracking-tight">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                      {item.acc} de acerto
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-xs text-muted-foreground">Nenhuma disciplina disponível</p>
          )}
        </CardContent>
      </Card>

      {/* Error Analysis */}
      <Card className="border-border/40 shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-bold uppercase tracking-tight">Análise de erros</CardTitle>
          <Button variant="link" className="text-xs font-bold text-primary p-0 h-auto">Ver todas</Button>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <div className="relative size-32 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-[10px] border-primary/10" />
            <div className="absolute inset-0 rounded-full border-[10px] border-rose-500 border-t-transparent border-l-transparent -rotate-45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-foreground tracking-tighter">{totalErrors}</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">erros</span>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            {errorReasons.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tight">
                <div className="flex items-center gap-2">
                  <div className={`size-1.5 rounded-full ${item.color}`} />
                  <span className="text-muted-foreground font-semibold">{item.label}</span>
                </div>
                <span className="text-foreground">{item.val}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
