"use client"

import { useState } from "react"
import { TaxonomiaPerf } from "@/features/estatisticas/types/estatisticas.types"
import { Card, CardContent } from "@workspace/ui/components/card"
import { ChevronRight, ChevronDown } from "lucide-react"

export function DesempenhoTaxonomia({ disciplinas }: { disciplinas: TaxonomiaPerf[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  if (disciplinas.length === 0) {
    return (
      <Card className="border-border/40 bg-card shadow-sm rounded-[24px]">
        <CardContent className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <p>Nenhuma questão resolvida neste período.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {disciplinas.map(disc => (
        <Card key={disc.id} className="border-border/40 bg-card shadow-sm rounded-[24px] overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggle(disc.id)}
          >
            <div className="flex items-center gap-3">
              {disc.filhos && disc.filhos.length > 0 ? (
                expanded[disc.id] ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />
              ) : (
                <div className="w-5 h-5" />
              )}
              <div>
                <h4 className="font-semibold">{disc.nome}</h4>
                <p className="text-xs text-muted-foreground">{disc.total} questões • {disc.taxaAcerto}% acerto</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-1/3">
              <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${disc.taxaAcerto >= 70 ? 'bg-emerald-500' : disc.taxaAcerto >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${disc.taxaAcerto}%` }}
                />
              </div>
              <span className="text-sm font-medium w-10 text-right">{disc.taxaAcerto}%</span>
            </div>
          </div>

          {expanded[disc.id] && disc.filhos && disc.filhos.length > 0 && (
            <div className="bg-muted/10 border-t p-4 pl-12 space-y-4">
              {disc.filhos.map(assunto => (
                <div key={assunto.id} className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">{assunto.nome}</h5>
                    <p className="text-xs text-muted-foreground/70">{assunto.total} questões</p>
                  </div>
                  <div className="flex items-center gap-4 w-1/3">
                    <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${assunto.taxaAcerto >= 70 ? 'bg-emerald-500/80' : assunto.taxaAcerto >= 50 ? 'bg-amber-500/80' : 'bg-rose-500/80'}`}
                        style={{ width: `${assunto.taxaAcerto}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium w-10 text-right text-muted-foreground">{assunto.taxaAcerto}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
