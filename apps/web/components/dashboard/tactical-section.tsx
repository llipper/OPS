import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Zap, Clock, Timer } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { TimeAnalysisItem, BancaPerf } from "@/types/dashboard"

interface TacticalSectionProps {
  timeAnalysis: TimeAnalysisItem[]
  bancas: BancaPerf[]
}

// Ícones e cores fixos para os 4 quadrantes de análise de tempo
const TIME_CONFIG: { icon: LucideIcon; color: string }[] = [
  { icon: Zap,   color: "text-emerald-500 bg-emerald-500/10" },
  { icon: Zap,   color: "text-rose-500 bg-rose-500/10" },
  { icon: Clock, color: "text-blue-500 bg-blue-500/10" },
  { icon: Timer, color: "text-orange-500 bg-orange-500/10" },
]

export function TacticalSection({ timeAnalysis, bancas }: TacticalSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Time Analysis */}
      <Card className="lg:col-span-5 border-border/40 shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="text-base font-bold uppercase tracking-tight">Análise de tempo</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {timeAnalysis.map((item, i) => {
            const config = TIME_CONFIG[i % TIME_CONFIG.length] ?? TIME_CONFIG[0]!
            const { icon: Icon, color } = config
            return (
              <div key={i} className="p-4 border border-border/40 rounded-2xl space-y-3 bg-muted/5">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${color}`}>
                    <Icon className="size-4" />
                  </div>
                  <p className="text-xs font-bold text-foreground tracking-tight">{item.title}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.desc}</p>
                  <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest">{item.perc}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Performance by Board */}
      <Card className="lg:col-span-7 border-border/40 shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold uppercase tracking-tight">Desempenho por banca</CardTitle>
          <Button variant="link" className="text-xs font-bold text-primary p-0 h-auto">Ver todas</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {bancas.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/40">
                    <th className="text-left pb-3 font-black">Banca</th>
                    <th className="text-left pb-3 font-black">Taxa de acerto</th>
                    <th className="text-left pb-3 font-black">Características</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {bancas.map((item, i) => (
                    <tr key={i} className="text-[11px] font-bold">
                      <td className="py-4 text-foreground tracking-tight">{item.name}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 text-foreground">{item.acc}%</span>
                          <div className="h-1.5 w-24 bg-muted/40 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${item.acc}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground/60 font-medium italic">{item.char}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                Nenhuma questão de banca respondida no período
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
