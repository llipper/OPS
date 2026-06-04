"use client"

import { Button } from "@workspace/ui/components/button"
import { 
    BookOpen, 
    Video, 
    FileText, 
    Target, 
    Flag, 
    Star, 
    CheckCircle2, 
    AlertCircle, 
    ZapOff,
    BookX,
    Ghost,
    Search,
    Brain,
    Dices
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface QuestionActionsProps {
    isSubmitted: boolean
    selectedOption: string | null
    isCorrect?: boolean
    isProfessor?: boolean
    showExplanation: boolean
    showStats: boolean
    onToggleExplanation: () => void
    onToggleStats: () => void
    onShowVideos: () => void
    onReportError: () => void
    onSubmit: () => void
    onToggleFavorite?: () => void
    onReasonSelect?: (reason: ErrorReasonValue) => void
}

type ErrorReasonValue =
    | "FALTA_CONTEUDO"
    | "ERRO_INTERPRETACAO"
    | "CONFUNDI_ASSUNTO"
    | "CHUTE"
    | "FALTA_ATENCAO"
    | "OUTRO"

const ERROR_REASONS = [
    { value: "FALTA_ATENCAO", label: "Falta de Atenção", icon: ZapOff, color: "text-amber-500" },
    { value: "FALTA_CONTEUDO", label: "Assunto Não Dominado", icon: BookX, color: "text-red-500" },
    { value: "CONFUNDI_ASSUNTO", label: "Pegadinha / Distração", icon: Ghost, color: "text-purple-500" },
    { value: "ERRO_INTERPRETACAO", label: "Interpretação de Texto", icon: Search, color: "text-blue-500" },
    { value: "OUTRO", label: "Esquecimento", icon: Brain, color: "text-pink-500" },
    { value: "CHUTE", label: "Chute", icon: Dices, color: "text-slate-500" }
] satisfies Array<{
    value: ErrorReasonValue
    label: string
    icon: typeof ZapOff
    color: string
}>

export function QuestionActions({ 
    isSubmitted, 
    selectedOption,
    isCorrect,
    isProfessor,
    showExplanation, 
    showStats, 
    onToggleExplanation, 
    onToggleStats,
    onShowVideos,
    onReportError,
    onSubmit,
    onToggleFavorite,
    onReasonSelect
}: QuestionActionsProps) {
    const [selectedReason, setSelectedReason] = useState<ErrorReasonValue | null>(null)

    return (
        <div className="flex flex-col gap-4 py-3">
            {/* Botão Responder e Mensagem de Texto Minimalista (Sem fundo) */}
            <div className="flex items-center gap-4">
                <Button
                    size="sm"
                    className={`w-full sm:w-auto font-semibold rounded-lg transition-all active:scale-[0.98] px-8 h-10 shadow-none border-none ${
                        isSubmitted 
                            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-70" 
                            : "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    }`}
                    onClick={onSubmit}
                    disabled={isSubmitted || !selectedOption}
                >
                    {isSubmitted ? "Respondido" : "Responder"}
                </Button>

                {isSubmitted && !isProfessor && (
                    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2 duration-500">
                        {isCorrect ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-[10px] font-black tracking-[0.2em] uppercase">
                                <CheckCircle2 className="w-3.5 h-3.5" /> 
                                CERTA
                            </div>
                        ) : (
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 dark:text-red-400 text-[10px] font-black tracking-[0.2em] uppercase">
                                    <AlertCircle className="w-3.5 h-3.5" /> 
                                    ERRADA
                                </div>
                                
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mr-1">
                                        {selectedReason ? "Motivo:" : "Por que errou?"}
                                    </span>
                                    
                                    <div className="flex items-center gap-1">
                                        {ERROR_REASONS.map((item) => {
                                            const isSelected = selectedReason === item.value
                                            return (
                                                <button
                                                    key={item.value}
                                                    onClick={() => {
                                                        const newReason = isSelected ? null : item.value
                                                        setSelectedReason(newReason)
                                                        if (newReason) {
                                                            onReasonSelect?.(newReason)
                                                            toast.success(`Erro: ${item.label}`)
                                                        }
                                                    }}
                                                    title={item.label}
                                                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all border ${
                                                        isSelected 
                                                            ? "bg-red-50 border-red-200 text-red-600 shadow-sm scale-110 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400" 
                                                            : "bg-muted/10 border-transparent text-muted-foreground hover:bg-red-50/50 hover:text-red-500 dark:hover:bg-red-950/20"
                                                    }`}
                                                >
                                                    <item.icon className="w-3.5 h-3.5" />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Barra de Ferramentas de Apoio */}
            <div className="flex items-center gap-2 py-3 border-t border-b overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`flex gap-2 text-muted-foreground hover:text-primary ${showExplanation ? "bg-primary/10 text-primary" : ""}`}
                        onClick={onToggleExplanation}
                        disabled={!isSubmitted}
                    >
                        <BookOpen className="w-4 h-4" />
                        Gabarito Comentado
                    </Button>
                    
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex gap-2 text-muted-foreground hover:text-primary"
                        onClick={onShowVideos}
                    >
                        <Video className="w-4 h-4" />
                        Aulas
                    </Button>
                    <Button variant="ghost" size="sm" className="flex gap-2 text-muted-foreground hover:text-primary">
                        <FileText className="w-4 h-4" />
                        Comentários
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`flex gap-2 text-muted-foreground hover:text-primary ${showStats ? "bg-primary/10 text-primary" : ""}`}
                        onClick={onToggleStats}
                        disabled={!isSubmitted}
                    >
                        <Target className="w-4 h-4" />
                        Estatísticas
                    </Button>
                </div>

                {/* Ícones de Utilidade no lado direito */}
                <div className="ml-auto flex items-center gap-1">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-9 h-9 p-0 text-muted-foreground hover:text-red-500 rounded-full transition-colors" 
                        title="Reportar erro"
                        onClick={onReportError}
                    >
                        <Flag className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-muted-foreground hover:text-amber-500 rounded-full transition-colors" title="Favoritar" onClick={onToggleFavorite}>
                        <Star className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
