import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import {
  ChevronRight,
  ShieldCheck,
  Activity,
  CheckSquare,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { RevisionItem } from "@/types/dashboard"

interface ActionsSectionProps {
  revisions: RevisionItem[]
}

// Próximas ações são geradas dinamicamente com base nas revisões pendentes
const NEXT_ACTION_ICONS: { icon: LucideIcon; color: string; bg: string }[] = [
  { icon: CheckSquare, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: CheckSquare, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: CheckSquare, color: "text-blue-500",    bg: "bg-blue-500/10" },
  { icon: CheckSquare, color: "text-blue-500",    bg: "bg-blue-500/10" },
]

export function ActionsSection({ revisions }: ActionsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recommended Revision */}
      <Card className="border-border/40 shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold uppercase tracking-tight">Revisão recomendada</CardTitle>
          <Button variant="link" className="text-xs font-bold text-primary p-0 h-auto">Ver todas</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {revisions.length > 0 ? (
            revisions.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-border/40 rounded-2xl bg-muted/5">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted/30 rounded-xl">
                    {i === 0 ? (
                      <ShieldCheck className="size-4 text-purple-500" />
                    ) : (
                      <Activity className="size-4 text-rose-500" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground tracking-tight">{item.name}</p>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${item.color}`}>
                      {item.type}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{item.count}</span>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              Nenhuma revisão pendente 🎉
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Actions — geradas a partir das revisões */}
      <Card className="border-border/40 shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="text-base font-bold uppercase tracking-tight">Próximas ações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {revisions.length > 0 ? (
            revisions.map((item, i) => {
              const actionConfig = NEXT_ACTION_ICONS[i % NEXT_ACTION_ICONS.length] ?? NEXT_ACTION_ICONS[0]!
              const { icon: Icon, color, bg } = actionConfig
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-border/40 rounded-2xl hover:bg-muted/10 transition-colors group cursor-pointer bg-muted/5"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-1.5 rounded border border-border/40 ${bg}`}>
                      <Icon className={`size-4 ${color}`} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        Revisar: {item.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                        {item.count}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
              )
            })
          ) : (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              Sem ações pendentes no momento
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
