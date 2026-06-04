"use client"

import { useLayout } from "@/contexts/layout-context"
import { cn } from "@workspace/ui/lib/utils"

export function QuestionReviewPageShell({ children }: { children: React.ReactNode }) {
  const { containerWidth } = useLayout()

  return (
    <div className="flex-1 bg-background p-6">
      <div
        className={cn(
          "space-y-6 animate-in fade-in duration-500",
          containerWidth === "focused" ? "mx-auto max-w-7xl" : "w-full"
        )}
      >
        {children}
      </div>
    </div>
  )
}
