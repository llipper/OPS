"use client"

import { Button } from "@workspace/ui/components/button"
import { QuestionAlternatives } from "./components/question-alternatives"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { useMinimalQuestionCard } from "./hooks/use-minimal-question-card"
import { Alternative } from "./types"

interface MinimalQuestionCardProps {
    question: {
        id: string
        code: string
        discipline: string
        supportText?: string | null
        questionText: string
        alternatives: Alternative[]
        resolution?: string | null
        objectives?: string[]
        references?: string[]
    }
}

const excludedOptions: string[] = []

export function MinimalQuestionCard({ question: rawQuestion }: MinimalQuestionCardProps) {
    const { state, actions } = useMinimalQuestionCard(rawQuestion)
    const question = state.question

    return (
        <div className="space-y-4">
            {/* 1. DISCIPLINA */}
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 border-b border-border/40 pb-1 w-fit">
                {question.discipline}
            </div>

            {/* 2. TEXTO DE APOIO (SE TIVER) */}
            {state.supportHtml && (
                <div className="pt-2">
                    <div 
                        className="text-[13px] text-foreground/70 leading-relaxed font-medium prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: state.supportHtml }}
                    />
                </div>
            )}

            {/* 3. PERGUNTA (ENUNCIADO) */}
            <div 
                className="text-base font-bold leading-relaxed text-foreground/90 tracking-tight"
                dangerouslySetInnerHTML={{ __html: state.questionHtml }}
            />

            {/* 4. ALTERNATIVAS */}
            <QuestionAlternatives
                alternatives={question.alternatives}
                selectedOption={state.selectedOption}
                isSubmitted={state.isSubmitted}
                isProfessor={false}
                hideExclude={true}
                hideLetter={true}
                smallText={true}
                excludedOptions={excludedOptions}
                onSelect={actions.handleOptionSelect}
                onToggleExclude={actions.toggleExcludeOption}
            />

            {/* 5. RESPONDE (AÇÃO) */}
            <div className="flex items-center gap-3 pt-1">
                <Button
                    size="sm"
                    className={`h-8 px-6 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                        state.isSubmitted 
                            ? "bg-muted text-muted-foreground cursor-not-allowed" 
                            : "bg-primary text-primary-foreground hover:scale-[1.01] active:scale-[0.98]"
                    }`}
                    onClick={actions.handleSubmit}
                    disabled={state.isSubmitted || !state.selectedOption || state.isSavingAnswer}
                >
                    {state.isSubmitted ? "Respondido" : state.isSavingAnswer ? "Salvando" : "Responder"}
                </Button>

                {state.isSubmitted && (
                    <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${
                        state.isCorrect ? "text-green-600" : "text-red-600"
                    }`}>
                        {state.isCorrect ? (
                            <><CheckCircle2 className="w-3 h-3" /> Correto</>
                        ) : (
                            <><AlertCircle className="w-3 h-3" /> Incorreto</>
                        )}
                    </div>
                )}
            </div>

            {/* 6. COMENTARIO (GABARITO) */}
            {state.isSubmitted && state.resolutionHtml && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500 pt-4 border-t border-border/40">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">
                            Gabarito Comentado
                        </div>
                        <div 
                            className="prose dark:prose-invert max-w-none text-[13px] leading-snug text-foreground/70 font-medium w-full overflow-hidden break-words whitespace-pre-line [overflow-wrap:anywhere] [&_*]:max-w-full [&_*]:break-words [&_*]:whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: state.resolutionHtml }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
