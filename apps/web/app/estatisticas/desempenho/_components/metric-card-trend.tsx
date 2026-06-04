import { Card, CardContent } from "@workspace/ui/components/card"
import { TrendValue } from "@/features/estatisticas/types/estatisticas.types"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  icon: LucideIcon
  iconColorClass: string
  iconBgClass: string
  data: TrendValue<number>
  formatter?: (val: number) => string
}

export function MetricCardTrend({ title, icon: Icon, iconColorClass, iconBgClass, data, formatter }: MetricCardProps) {
  const displayValue = formatter ? formatter(data.value) : data.value
  
  return (
    <Card className="border-zinc-800/40 bg-zinc-950/90 shadow-none rounded-[20px]">
      <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
        {/* Top: Icon + Title */}
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg flex items-center justify-center ${iconBgClass}`}>
            <Icon className={`h-4 w-4 ${iconColorClass}`} />
          </div>
          <span className="text-[12px] font-medium text-zinc-400 tracking-wide">{title}</span>
        </div>
        
        {/* Bottom: Big Value */}
        <div>
          <h2 className="text-[24px] font-bold text-zinc-50 tracking-tight leading-none">{displayValue}</h2>
        </div>
      </CardContent>
    </Card>
  )
}
