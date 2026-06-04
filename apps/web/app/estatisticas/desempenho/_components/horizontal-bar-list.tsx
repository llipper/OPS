import { Card, CardContent } from "@workspace/ui/components/card"
import { TaxonomiaPerf } from "@/features/estatisticas/types/estatisticas.types"

interface HorizontalBarListProps {
  title: string
  items: TaxonomiaPerf[]
  colorClass: string
  emptyMessage: string
  showSecondary?: boolean
}

export function HorizontalBarList({ title, items, colorClass, emptyMessage, showSecondary = false }: HorizontalBarListProps) {
  return (
    <Card className="border-border/40 bg-card shadow-sm rounded-[24px] h-full flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-[13px] mb-4 text-foreground/80">{title}</h3>
        
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-[13px] text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-3 flex-1">
            {items.map((item, idx) => (
              <div key={item.id || idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[13px]">
                  <span className="font-medium truncate pr-4" title={item.nome}>{item.nome}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    {showSecondary && item.parentNome && (
                      <span className="text-[11px] text-muted-foreground hidden sm:inline-block max-w-[120px] truncate" title={item.parentNome}>
                        {item.parentNome}
                      </span>
                    )}
                    <span className={`font-bold ${colorClass.replace('bg-', 'text-')}`}>{item.taxaAcerto}%</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${colorClass}`} 
                    style={{ width: `${item.taxaAcerto}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
