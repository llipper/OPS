"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { useLayout } from "@/contexts/layout-context"
import { cn } from "@workspace/ui/lib/utils"

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { variant, side, collapsible, containerWidth, transition } = useLayout()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant={variant} side={side} collapsible={collapsible} />
      <SidebarInset>
        <SiteHeader />
        <div className={cn(
            "flex flex-1 flex-col transition-all duration-500",
            containerWidth === "focused" ? "max-w-5xl mx-auto w-full" : "w-full",
            transition === "smooth" ? "animate-in fade-in duration-700" : "",
            transition === "slow" ? "animate-in slide-in-from-bottom-4 duration-700" : ""
        )}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
