"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"
import { 
  History, 
  Target, 
  AlertCircle, 
  Clock, 
  Calendar,
  ChevronRight,
  Edit2,
  CheckCircle2,
  XCircle
} from "lucide-react"

export function ReviewPanel() {
  return (
    <div className="w-[400px] flex-shrink-0 border-l border-border bg-card h-full overflow-y-auto no-scrollbar z-50">
      <div className="p-6 space-y-6">
        
        {/* Meu Desempenho Nesta Questão */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Meu desempenho nesta questão</h4>
          <Card className="border-border/40 bg-card/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                  <XCircle className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Errada</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground/60">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">1m 45s</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground/60">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">15/05/2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classificação do Erro */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Classificação do Erro</h4>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10">
              <Edit2 className="w-3 h-3 mr-1.5" />
              Alterar
            </Button>
          </div>
          <Card className="border-border/40 bg-card/50 shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="px-3 py-1 w-fit rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-black uppercase tracking-widest">
                Interpretação
              </div>
              <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-medium">
                Você tem dificuldade em interpretar o comando ou as alternativas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Desempenho no Assunto */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Desempenho no assunto</h4>
            <Button variant="link" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest">Ver mais</Button>
          </div>
          <Card className="border-border/40 bg-card/50 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/20" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - 0.62)} className="text-orange-500" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-black tracking-tight">62%</span>
                    <span className="text-[6px] font-black uppercase text-muted-foreground/40">Acerto</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[11px] font-black uppercase tracking-tight">Art. 144 da CF - Polícia Federal</h5>
                  <p className="text-[10px] font-medium text-muted-foreground/40 leading-tight">Você acertou 8 de 13 questões sobre este assunto</p>
                </div>
              </div>
              <div className="space-y-1">
                 <Progress value={62} className="h-1.5 bg-muted/20" />
                 <div className="flex justify-between items-center text-[8px] font-black text-muted-foreground/40 uppercase">
                    <span>Início</span>
                    <span>Meta: 85%</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Histórico de Respostas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Histórico de respostas</h4>
            <Button variant="link" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest">Ver todas</Button>
          </div>
          <Card className="border-border/40 bg-card/50 shadow-sm">
            <CardContent className="p-0 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/10 bg-muted/5">
                    <th className="px-4 py-3 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest">Data</th>
                    <th className="px-4 py-3 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest">Resultado</th>
                    <th className="px-4 py-3 text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest text-right">Tempo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/5">
                  {[
                    { date: "15/05/2024", result: "Errada", time: "1m 45s", color: "text-red-500" },
                    { date: "02/05/2024", result: "Errada", time: "2m 10s", color: "text-red-500" },
                    { date: "18/04/2024", result: "Certa", time: "1m 20s", color: "text-emerald-500" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/5 transition-colors">
                      <td className="px-4 py-3 text-[10px] font-bold text-muted-foreground/60">{row.date}</td>
                      <td className="px-4 py-3">
                         <span className={`text-[9px] font-black uppercase tracking-widest ${row.color}`}>{row.result}</span>
                      </td>
                      <td className="px-4 py-3 text-[10px] font-bold text-muted-foreground/60 text-right">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Questões Relacionadas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Questões relacionadas</h4>
            <Button variant="link" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest">Ver todas</Button>
          </div>
          <div className="space-y-2">
            {[
              { title: "Art. 144 da CF (atribuições)", stats: "Acertou 2/3", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { title: "Art. 144 da CF (investigação)", stats: "Acertou 1/4", color: "text-red-500", bg: "bg-red-500/10" },
              { title: "Segurança Pública", stats: "Acertou 3/5", color: "text-emerald-500", bg: "bg-emerald-500/10" }
            ].map((q, i) => (
              <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl border border-border/40 bg-card/50 hover:bg-muted/5 transition-all text-left group">
                <span className="text-[10px] font-bold text-muted-foreground/80 group-hover:text-primary transition-colors">{q.title}</span>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${q.bg} ${q.color}`}>
                    {q.stats}
                  </span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground/20" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
