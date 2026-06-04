"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export function DesempenhoFiltros({ periodoSelecionado }: { periodoSelecionado: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePeriodChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("period", val)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <Select value={periodoSelecionado} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Selecione o período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Últimos 7 dias</SelectItem>
          <SelectItem value="30d">Últimos 30 dias</SelectItem>
          <SelectItem value="90d">Últimos 90 dias</SelectItem>
          <SelectItem value="ano">Ano atual</SelectItem>
          <SelectItem value="tudo">Todo o período</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
