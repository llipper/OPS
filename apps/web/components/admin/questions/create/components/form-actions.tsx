"use client"

import { Eye } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useQuestionFormContext } from "../context/question-form-context"

export function FormActions() {
    const {
        setIsPreviewOpen,
        handleSubmit,
        isPending: isSubmitting,
        isEditing,
    } = useQuestionFormContext()

    return (
        <div className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur border-b">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-base font-semibold">{isEditing ? "Editar Questão" : "Criar Questão"}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleSubmit("draft")} disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : isEditing ? "Salvar Edição" : "Salvar Rascunho"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
                        <Eye className="mr-2 h-3.5 w-3.5" />
                        Pré-visualizar
                    </Button>
                    <Button size="sm" onClick={() => handleSubmit("published")} disabled={isSubmitting}>
                        {isSubmitting ? "Publicando..." : isEditing ? "Atualizar Agora" : "Publicar Agora"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
