"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { ChevronDown } from "lucide-react"
import { EvolutionChart } from "@/components/estatisticas/evolution-chart"
import type { EvolutionPoint, SubjectPerf } from "@/types/dashboard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

interface EvolutionSectionProps {
  evolutionData: EvolutionPoint[]
  subjectsData: SubjectPerf[]
}

export function EvolutionSection({ evolutionData, subjectsData }: EvolutionSectionProps) {
  const [metric, setMetric] = useState<"taxaAcerto" | "questoesResolvidas">("taxaAcerto")

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <Card className="lg:col-span-7 border-border/40 bg-card shadow-sm rounded-[24px]">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-sm font-semibold text-foreground">
            Evolução de desempenho
          </CardTitle>

          <Select 
            value={metric} 
            onValueChange={(value) => setMetric(value as "taxaAcerto" | "questoesResolvidas")}
          >
            <SelectTrigger className="w-auto min-w-[140px] bg-background/50 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="taxaAcerto">Taxa de acerto</SelectItem>
              <SelectItem value="questoesResolvidas">Questões resolvidas</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          {evolutionData.length > 0 ? (
            <EvolutionChart data={evolutionData} metric={metric} />
          ) : (
            <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
              Nenhum dado disponível para o período selecionado
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-5 border-border/40 bg-card shadow-sm rounded-[24px]">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-sm font-semibold text-foreground">
            Desempenho por disciplina
          </CardTitle>

          <Button
            variant="link"
            className="h-auto p-0 text-xs font-semibold text-primary"
          >
            Ver todas
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {subjectsData.length > 0 ? (
            subjectsData.map((item) => (
              <div key={item.disciplinaId} className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="text-foreground">{item.progress}%</span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-muted/40">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              Nenhuma estatística disponível
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}