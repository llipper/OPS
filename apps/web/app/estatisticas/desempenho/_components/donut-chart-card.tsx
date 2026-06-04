"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface DonutData {
  name: string
  value: number
  color: string
}

interface DonutChartCardProps {
  title: string
  data: DonutData[]
  centerText1: string
  centerText2: string
}

export function DonutChartCard({ title, data, centerText1, centerText2 }: DonutChartCardProps) {
  return (
    <Card className="border-border/40 bg-card shadow-sm rounded-[24px] h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <h3 className="font-semibold text-[13px] mb-4 text-foreground/80">{title}</h3>
        
        <div className="flex-1 flex items-center justify-between gap-4">
          <div className="relative w-[110px] h-[110px] shrink-0 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: 'var(--foreground)', fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold">{centerText1}</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{centerText2}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 min-w-[100px]">
            {data.map((item, idx) => {
              const total = data.reduce((acc, curr) => acc + curr.value, 0)
              const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
              
              return (
                <div key={idx} className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold mr-1">{item.value}</span>
                    <span className="text-muted-foreground/50 text-xs ml-1">({percent}%)</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
