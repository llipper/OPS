"use client"

import * as React from "react"
import { BookOpen } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { ItemHierarquico } from "../types"

interface QuestionsModalProps {
    item: ItemHierarquico | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function QuestionsModal({ item, open, onOpenChange }: QuestionsModalProps) {
    if (!item) return null

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-[500px]">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <AlertDialogTitle>Questões de {item.title}</AlertDialogTitle>
                            <AlertDialogDescription>
                                Gerencie as questões vinculadas a este {item.meta.toLowerCase()}.
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>
                
                <div className="py-6 border-y my-4 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                        <span className="text-sm font-medium">Total de Questões</span>
                        <span className="text-lg font-bold text-primary">{item.questionsCount ?? 0}</span>
                    </div>
                    
                    {/* Placeholder para lista de questões ou filtros rápidos */}
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Ações Disponíveis</p>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors cursor-pointer text-sm font-medium">
                                Visualizar Banco de Questões
                            </div>
                            <div className="p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors cursor-pointer text-sm font-medium">
                                Adicionar Questão Manualmente
                            </div>
                        </div>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Fechar</AlertDialogCancel>
                    <AlertDialogAction className="gap-2">
                        Gerenciar Questões
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
