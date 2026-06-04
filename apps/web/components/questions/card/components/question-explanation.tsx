"use client"

import { useMemo } from "react"
import { sanitizeHtml } from "@/lib/sanitize-html"
import { Alternative } from "../types"

interface QuestionExplanationProps {
    resolution?: string | null
    objectives?: string[]
    references?: string[]
    alternatives?: Alternative[]
    author?: {
        id: string
        name: string
        avatarUrl?: string | null
    }
    show: boolean
}

export function QuestionExplanation({ resolution, objectives, references, alternatives, author, show }: QuestionExplanationProps) {
    const safeResolution = useMemo(() => sanitizeHtml(resolution), [resolution])

    const getInitials = (name?: string) => {
        if (!name) return "P"
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
    }

    // Checking if it is a Certo/Errado question
    const isCertoErrado = useMemo(() => {
        return alternatives?.length === 2 && 
            alternatives.some(a => a.letter === "C") && 
            alternatives.some(a => a.letter === "E")
    }, [alternatives])

    // Filter commented alternatives (only those that actually have detailed explanations)
    const commentedAlternatives = useMemo(() => {
        return alternatives?.filter(alt => alt.explanation && alt.explanation.trim() !== "") || []
    }, [alternatives])

    // Parsing objectives, tips and references
    const objectivesList = useMemo(() => {
        return objectives?.[0]?.split('\n').map(o => o.trim()).filter(Boolean) || []
    }, [objectives])

    const tipMacete = useMemo(() => {
        return objectives?.[1]?.trim() || ""
    }, [objectives])

    const referencesList = useMemo(() => {
        return references?.flatMap(ref => ref.split('\n')).map(r => r.trim()).filter(Boolean) || []
    }, [references])

    if (!show) return null

    return (
        <div className="mt-6 border-t border-border/40 pt-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Coluna da Esquerda: Professor/Autor */}
                <div className="w-full md:w-36 shrink-0 flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-border shadow-sm bg-background">
                        {author?.avatarUrl ? (
                            <img
                                src={author.avatarUrl}
                                alt={author.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xl font-bold">
                                {getInitials(author?.name)}
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-muted-foreground text-center uppercase block leading-tight px-2">
                        PROFESSOR {author?.name?.toUpperCase() || "FELIPE"}
                    </span>
                </div>

                {/* Coluna da Direita: Conteúdo do Gabarito */}
                <div className="flex-1 space-y-6">
                    
                    {/* Resolução Geral (se houver) */}
                    {safeResolution && (
                        <div className="space-y-1">
                            <h5 className="text-sm font-bold text-foreground">Resolução</h5>
                            <div 
                                className="text-sm text-foreground/80 leading-relaxed font-medium whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: safeResolution }}
                            />
                        </div>
                    )}

                    {/* Alternativas Comentadas (apenas as que possuem justificativa detalhada) */}
                    {commentedAlternatives.length > 0 && (
                        <div className="space-y-5">
                            {commentedAlternatives.map((alt) => {
                                const isCorrect = alt.isCorrect
                                
                                // Dynamic header label based on question type
                                const headerLabel = isCertoErrado
                                    ? `${alt.letter === "C" ? "Certo" : "Errado"} (${isCorrect ? "Gabarito" : "Incorreto"})`
                                    : `Alternativa ${alt.letter} (${isCorrect ? "Gabarito" : "Incorreta"})`

                                return (
                                    <div key={alt.letter} className="space-y-1">
                                        <h5 className="text-sm font-bold text-foreground">
                                            {headerLabel}
                                        </h5>
                                        
                                        {/* Render item text only for Multiple Choice to avoid redundant "Certo/Errado" line in C/E */}
                                        {!isCertoErrado && alt.text && (
                                            <div 
                                                className="text-xs text-muted-foreground italic opacity-70"
                                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(alt.text) }}
                                            />
                                        )}

                                        <div className="text-sm text-foreground/85 leading-relaxed font-medium pl-0 whitespace-pre-line">
                                            {alt.explanation ? (
                                                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(alt.explanation) }} />
                                            ) : null}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Objetivos */}
                    {objectivesList.length > 0 && (
                        <div className="space-y-2 pt-2">
                            <h5 className="text-sm font-bold text-foreground">Objetivos</h5>
                            <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1 font-medium">
                                {objectivesList.map((obj, i) => (
                                    <li key={i} className="leading-relaxed">
                                        {obj}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Dica / Macete */}
                    {tipMacete && (
                        <div className="space-y-1 pt-2">
                            <h5 className="text-sm font-bold text-foreground">Dica / Macete</h5>
                            <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                {tipMacete}
                            </p>
                        </div>
                    )}

                    {/* Referências */}
                    {referencesList.length > 0 && (
                        <div className="space-y-2 pt-2">
                            <h5 className="text-sm font-bold text-foreground">Referências</h5>
                            <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1 font-medium italic">
                                {referencesList.map((ref, i) => (
                                    <li key={i} className="leading-relaxed">
                                        {ref}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}
