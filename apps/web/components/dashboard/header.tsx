"use client"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "lucide-react"

import { useAuthSession } from "@/hooks/use-auth-session"

export function DashboardHeader() {
  const { user } = useAuthSession()
  
  const greeting = user?.role === 'ALUNO' ? 'Aluno' : 
                   user?.role === 'SUPER_ADMIN' ? 'Administrador' :
                   user?.role === 'ADMIN' ? 'Gerente' :
                   user?.role === 'PROFESSOR' ? 'Professor' : 'Usuário'

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">Olá, {greeting} 👋</h1>
        <p className="text-muted-foreground text-sm font-medium">Aqui está o seu desempenho geral</p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-card p-1 rounded-xl border border-border/50 shadow-sm">
          <div className="px-3 py-1.5 text-[11px] font-bold text-muted-foreground uppercase">Período</div>
          <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs font-semibold border border-border/40 flex items-center gap-2 px-3 bg-background/50">
            Últimos 30 dias
            <Calendar className="size-3.5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}
