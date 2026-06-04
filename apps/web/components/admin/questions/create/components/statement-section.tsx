"use client"

import { TiptapEditor } from "@/components/editor/tiptap-editor"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent } from "@workspace/ui/components/card"
import { useQuestionFormContext } from "../context/question-form-context"

export function StatementSection() {
    const { statement, setStatement } = useQuestionFormContext()

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
                <div className="h-6 w-6 rounded-md border bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">2</span>
                </div>
                <h2 className="text-sm font-medium text-muted-foreground">Enunciado e Textos</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                {/* Texto de Apoio */}
                <Card>
                    <CardContent className="p-2 space-y-1">
                        <Label className="text-[11px] font-bold text-muted-foreground ml-1">Texto de Apoio / Contexto (Opcional)</Label>
                        <TiptapEditor 
                            content={statement.supportText} 
                            onChange={(val) => setStatement(prev => ({ ...prev, supportText: val }))} 
                        />
                    </CardContent>
                </Card>

                {/* Enunciado da Questão */}
                <Card>
                    <CardContent className="p-2 space-y-1">
                        <Label className="text-[11px] font-bold text-muted-foreground ml-1">Enunciado da Questão / Comando</Label>
                        <TiptapEditor 
                            content={statement.commandText} 
                            onChange={(val) => setStatement(prev => ({ ...prev, commandText: val }))} 
                        />
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
