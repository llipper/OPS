"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BarChart3, Database, Filter, ListChecks } from "lucide-react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination"
import { QuestionCard, QuestionCardData } from "@/components/questions/card"
import { QuestionFilter, QuestionFilterOptions, FilterOption } from "@/components/questions/filter"
import { useLayout } from "@/contexts/layout-context"
import { cn } from "@workspace/ui/lib/utils"
import type { ResolverStats } from "@/lib/questions/resolver-query"

type QuestionResolverClientProps = {
  initialQuestions: QuestionCardData[]
  initialCurrentPage: number
  initialTotalPages: number
  initialTotalCount: number
  initialStats: ResolverStats
  notebookId?: string
  notebookName?: string
  filterOptions: QuestionFilterOptions
}

type QuestionsResponse = {
  questions: QuestionCardData[]
  currentPage: number
  totalPages: number
  totalCount: number
  stats: ResolverStats
}



export function QuestionResolverClient({
  initialQuestions,
  initialCurrentPage,
  initialTotalPages,
  initialTotalCount,
  initialStats,
  notebookId,
  notebookName,
  filterOptions,
}: QuestionResolverClientProps) {
  const { containerWidth } = useLayout()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [questions, setQuestions] = React.useState(initialQuestions ?? [])
  const [currentPage, setCurrentPage] = React.useState(initialCurrentPage)
  const [totalPages, setTotalPages] = React.useState(initialTotalPages)
  const [totalCount, setTotalCount] = React.useState(initialTotalCount)
  const [stats, setStats] = React.useState(initialStats)
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)

  const createPageHref = React.useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    return `?${params.toString()}`
  }, [searchParams])

  const fetchQuestions = React.useCallback((params: URLSearchParams) => {
    setIsLoadingPage(true)
    
    fetch(`/api/aluno/questoes?${params.toString()}`, {
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) return null
        return (await response.json()) as QuestionsResponse
      })
      .then((data) => {
        if (!data) return
        const finalQuestions = data.questions ?? []
        setQuestions(finalQuestions)
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages ?? 1)
        setTotalCount(data.totalCount ?? finalQuestions.length)
        if (data.stats) setStats(data.stats)
        if (typeof window !== "undefined") {
          const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
          router.replace(newUrl, { scroll: false })
          
          // Rola suavemente de volta para o topo da página para iniciar da primeira questão
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      })
      .finally(() => setIsLoadingPage(false))
  }, [])

  const goToPage = React.useCallback((page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    const params = new URLSearchParams(window.location.search)
    params.set("page", page.toString())
    fetchQuestions(params)
  }, [currentPage, totalPages, fetchQuestions])

  const handleFilter = React.useCallback((params: URLSearchParams) => {
    fetchQuestions(params)
  }, [fetchQuestions])

  const handleClear = React.useCallback(() => {
    fetchQuestions(new URLSearchParams())
  }, [fetchQuestions])

  return (
    <div className={cn(
      "flex flex-1 flex-col gap-6 pt-6 w-full px-4 mx-auto transition-all duration-500",
      containerWidth === "focused" ? "max-w-5xl" : "max-w-7xl"
    )}>
      {notebookName ? (
        <div className="flex flex-col gap-1 px-4 py-6 bg-muted/10 rounded-2xl border border-border/40 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest">
            Caderno de Questões
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase">{notebookName}</h1>
          <p className="text-xs text-muted-foreground font-medium uppercase">{questions.length} questões disponíveis para resolução</p>
        </div>
      ) : null}

      {!notebookId && (
        <QuestionFilter 
          options={filterOptions} 
          onFilter={handleFilter}
          onClear={handleClear}
        />
      )}

      <QuestionResultStats
        stats={stats}
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoadingPage}
      />

      <div className={`grid gap-6 transition-opacity duration-200 min-h-[600px] ${isLoadingPage ? "opacity-60" : "opacity-100"}`}>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 bg-muted/10 px-6 py-16 text-center">
            <p className="text-sm font-semibold text-foreground">Nenhuma questão encontrada.</p>
            <p className="mt-1 text-sm text-muted-foreground">Assim que novas questões forem adicionadas, elas aparecerão aqui.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="py-10">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={createPageHref(currentPage - 1)}
                  text="Anterior"
                  onClick={(event) => {
                    event.preventDefault()
                    goToPage(currentPage - 1)
                  }}
                />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
              .map((page, index, pages) => {
                const prevPage = pages[index - 1]
                const showEllipsisBefore = index > 0 && prevPage !== undefined && page - prevPage > 1

                return (
                  <React.Fragment key={page}>
                    {showEllipsisBefore && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        href={createPageHref(page)}
                        isActive={currentPage === page}
                        onClick={(event) => {
                          event.preventDefault()
                          goToPage(page)
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                )
              })}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={createPageHref(currentPage + 1)}
                  text="Próxima"
                  onClick={(event) => {
                    event.preventDefault()
                    goToPage(currentPage + 1)
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}

      <div className="flex justify-center py-8">
        <p className="text-sm text-muted-foreground italic text-center">
          {notebookId && currentPage === totalPages ? "Fim do caderno de questões." : ""}
          {!notebookId && currentPage === totalPages ? "Você chegou ao fim da lista disponível. Use os filtros para encontrar mais questões." : ""}
          {currentPage < totalPages ? `Página ${currentPage} de ${totalPages}` : ""}
        </p>
      </div>
    </div>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

function QuestionResultStats({
  stats,
  totalCount,
  currentPage,
  totalPages,
  isLoading,
}: {
  stats: ResolverStats
  totalCount: number
  currentPage: number
  totalPages: number
  isLoading: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 text-sm text-muted-foreground transition-opacity",
        isLoading && "opacity-60"
      )}
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">Total de questões:</span>
        <span className="font-bold text-foreground text-base bg-muted/60 px-2 py-0.5 rounded-lg border border-border/40">
          {formatNumber(totalCount)}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium">
        {stats.activeFilterCount > 0 && (
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-primary border border-primary/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            {stats.activeFilterCount} {stats.activeFilterCount === 1 ? "filtro ativo" : "filtros ativos"}
          </div>
        )}
        <span>
          Página <span className="font-semibold text-foreground">{currentPage}</span> de{" "}
          <span className="font-semibold text-foreground">{Math.max(totalPages, 1)}</span>
        </span>
      </div>
    </div>
  )
}
