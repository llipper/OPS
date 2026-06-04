"use client"

import { Flag, AlertTriangle } from "lucide-react"
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogFooter
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"
import { Label } from "@workspace/ui/components/label"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@workspace/ui/components/select"
import { toast } from "sonner"
import { reportQuestion } from "@/features/questions/actions/question.actions"
import { useState } from "react"

interface QuestionReportModalProps {
    questionId: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

const REPORT_REASONS = [
    { value: "Gabarito Incorreto", label: "Gabarito incorreto" },
    { value: "Erro no Enunciado", label: "Erro no enunciado/texto" },
    { value: "Questão Desatualizada", label: "Questão desatualizada" },
    { value: "Questão Repetida", label: "Questão repetida" },
    { value: "Outro Motivo", label: "Outro motivo" },
]

export function QuestionReportModal({ questionId, open, onOpenChange }: QuestionReportModalProps) {
    const [reason, setReason] = useState<string>("")
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (!reason) {
            toast.error("Por favor, selecione um motivo.")
            return
        }

        setIsSubmitting(true)
        try {
            await reportQuestion({
                questionId, 
                description,
                reason: reason
            })
            toast.success("Erro reportado com sucesso!")
            setDescription("")
            setReason("")
            onOpenChange(false)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Não foi possível enviar a denúncia.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-gradient-to-br from-red-600/10 via-background to-background p-6">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="flex items-center gap-3 text-xl font-bold tracking-tight">
                            <div className="p-2 bg-red-500/10 rounded-xl">
                                <Flag className="w-6 h-6 text-red-500" />
                            </div>
                            Reportar erro na questão
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                        <div className="space-y-2.5">
                            <Label htmlFor="report-reason" className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-2">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                Motivo do erro
                            </Label>
                            <Select value={reason} onValueChange={setReason}>
                                <SelectTrigger id="report-reason" className="w-full h-12 rounded-xl bg-muted/30 border-border/40 focus:ring-red-500/20 focus:border-red-500/50 transition-all">
                                    <SelectValue placeholder="Selecione o que está errado" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/40 shadow-xl">
                                    {REPORT_REASONS.map((r) => (
                                        <SelectItem key={r.value} value={r.value} className="py-2.5 rounded-lg">
                                            {r.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2.5">
                            <Label htmlFor="error-description" className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground/80">
                                Detalhes adicionais (opcional)
                            </Label>
                            <Textarea 
                                id="error-description"
                                placeholder="Descreva o problema com mais detalhes para nossa equipe..."
                                className="min-h-[140px] rounded-2xl resize-none bg-muted/30 border-border/40 focus:border-red-500/50 focus:ring-red-500/20 transition-all placeholder:text-muted-foreground/50"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-2xl border border-border/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            <p className="text-[12px] text-muted-foreground leading-relaxed italic">
                                Sua denúncia será analisada por nossa equipe pedagógica em até 48h. Obrigado por ajudar a manter a qualidade da plataforma!
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="mt-8 flex-row gap-3 sm:gap-3">
                        <Button 
                            variant="ghost" 
                            onClick={() => onOpenChange(false)} 
                            className="flex-1 h-12 rounded-2xl font-semibold hover:bg-muted/50 transition-colors"
                        >
                            Cancelar
                        </Button>
                        <Button 
                            className="flex-[2] h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            onClick={handleSubmit}
                            disabled={isSubmitting || !reason}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Enviando...
                                </span>
                            ) : "Enviar Denúncia"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
