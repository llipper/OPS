"use client"

import * as React from "react"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { useLayout } from "@/contexts/layout-context"
import { cn } from "@workspace/ui/lib/utils"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { side, variant, containerWidth } = useLayout()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* Ordem dinâmica baseada no lado da sidebar para seguir o padrão shadcn */}
      {side === "left" && <AppSidebar variant={variant} />}
      
      <SidebarInset>
        <SiteHeader />
        <main className={cn(
          "flex-1 overflow-x-hidden transition-all duration-300 ease-in-out",
          containerWidth === "focused" ? "max-w-7xl mx-auto w-full" : "w-full"
        )}>
          {children}
        </main>
      </SidebarInset>

      {side === "right" && <AppSidebar variant={variant} />}
    </SidebarProvider>
  )
}
