import { Card } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Target } from "lucide-react"
import type { FocusData } from "@/types/dashboard"

interface DashboardFooterBannerProps {
  focus: FocusData | null
}

export function DashboardFooterBanner({ focus }: DashboardFooterBannerProps) {
  // Se não há dados de queda, exibe uma mensagem motivacional genérica
  const disciplinaNome = focus?.disciplinaNome ?? "Suas Revisões"
  const mensagem = focus
    ? `Seu desempenho nessa disciplina caiu ${focus.quedaPerc}% nos últimos 7 dias.`
    : "Continue praticando para manter sua sequência de estudos."

  return (
    <Card className="border border-border/40 bg-card p-4 flex items-center justify-between rounded-2xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-primary/10 rounded-full">
          <Target className="size-6 text-primary" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-foreground">
            Foco de hoje:{" "}
            <span className="text-primary font-black uppercase tracking-tighter italic">
              {disciplinaNome}
            </span>
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            {focus ? (
              <>
                {mensagem.split(`${focus.quedaPerc}%`)[0]}
                <span className="font-bold text-rose-500">{focus.quedaPerc}%</span>
                {mensagem.split(`${focus.quedaPerc}%`)[1]}
              </>
            ) : (
              mensagem
            )}
          </p>
        </div>
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-black uppercase text-xs tracking-widest rounded-xl h-12 shadow-lg shadow-primary/20">
        Estudar agora
      </Button>
    </Card>
  )
}
