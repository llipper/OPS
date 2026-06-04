"use client"

import { HeaderActions } from "@/components/header-actions"
import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { useLayout } from "@/contexts/layout-context"
import { cn } from "@workspace/ui/lib/utils"

export function SiteHeader() {
  const { side } = useLayout()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        
        <div className="flex items-center gap-2">
          {/* Lado Esquerdo: Trigger se a sidebar estiver na esquerda */}
          {side === "left" && (
            <>
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
            </>
          )}
          
          <h1 className="text-base font-bold">OPSConcurso.</h1>

          {/* Separador visual opcional se a sidebar estiver na direita */}
          {side === "right" && (
             <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
          )}
        </div>

        <div className="flex items-center gap-4">
          <HeaderActions />
          
          {/* Lado Direito: Trigger se a sidebar estiver na direita */}
          {side === "right" && (
            <>
              <Separator
                orientation="vertical"
                className="h-4"
              />
              <SidebarTrigger className="-mr-1 rotate-180" />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
