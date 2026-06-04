"use client"

import * as React from "react"
import { 
    Plus, Edit2, Trash2, ChevronRight, ChevronDown, 
    CornerDownRight, BookOpen, Grip 
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { TableRow, TableCell } from "@workspace/ui/components/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ItemHierarquico, TaxonLevel } from "../types"

const NIVEL_BADGE: Record<TaxonLevel, string> = {
    disciplina: "bg-blue-500/10 text-blue-600 font-mono",
    assunto: "bg-primary/10 text-primary",
    topico: "bg-amber-500/10 text-amber-600",
    subtopico: "bg-muted text-muted-foreground",
    carreira: "bg-purple-500/10 text-purple-600 font-mono",
    instituicao: "bg-cyan-500/10 text-cyan-600 font-mono",
    orgao: "bg-indigo-500/10 text-indigo-600",
    concurso: "bg-pink-500/10 text-pink-600",
    cargo: "bg-slate-500/10 text-slate-600",
    banca: "bg-emerald-500/10 text-emerald-600 font-mono",
    dificuldade: "bg-orange-500/10 text-orange-600 font-mono",
    nivelEducacional: "bg-sky-500/10 text-sky-600 font-mono",
    tipoQuestao: "bg-teal-500/10 text-teal-600 font-mono",
}

interface SortableRowProps {
    item: ItemHierarquico
    items: ItemHierarquico[]
    expandedIds: Set<string>
    toggleExpand: (id: string, e: React.MouseEvent) => void
    onOpenInlineAdd: (item: ItemHierarquico) => void
    setEditingItem: (item: ItemHierarquico) => void
    setViewingQuestions: (item: ItemHierarquico) => void
    onDelete: (id: string, nivel: string) => Promise<void>
    deletingId: string | null
    nivelMap: Record<string, TaxonLevel>
    isSearching?: boolean
}

export function SortableRow({
    item,
    items,
    expandedIds,
    toggleExpand,
    onOpenInlineAdd,
    setEditingItem,
    setViewingQuestions,
    onDelete,
    deletingId,
    nivelMap,
    isSearching,
}: SortableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isOver
    } = useSortable({ id: item.id })

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? "rgba(var(--primary), 0.05)" : undefined,
    }

    const hasChildren = items.some(i => i.parentId === item.id)
    const isExpanded = isSearching || expandedIds.has(item.id)
    const paddingLeft = `calc(0.5rem + ${item.indent * 2.5}rem)`

    return (
        <TableRow ref={setNodeRef} style={style} className={`group hover:bg-muted/30 ${isOver ? "ring-2 ring-primary/20 ring-inset" : ""}`}>
            <TableCell className="py-3" style={{ paddingLeft }}>
                <div className="flex items-center gap-3">
                    <div 
                        {...attributes} 
                        {...listeners} 
                        className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-muted-foreground transition-colors p-1"
                    >
                        <Grip className="w-4 h-4" />
                    </div>
                    <div className="w-5 flex items-center justify-center shrink-0">
                        {hasChildren ? (
                            <button onClick={(e) => toggleExpand(item.id, e)} className="text-muted-foreground">
                                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                        ) : item.indent > 0 ? (
                            <CornerDownRight className="w-4 h-4 text-muted-foreground/30" />
                        ) : null}
                    </div>
                    
                    {item.imageUrl && (
                        <div className="w-10 h-10 rounded-xl bg-muted border border-white/10 flex shrink-0 items-center justify-center overflow-hidden shadow-lg">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            {item.cor && (
                                <div 
                                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                                    style={{ backgroundColor: item.cor }}
                                    title={item.cor}
                                />
                            )}
                            <p className={`text-sm ${item.indent === 0 ? "font-bold" : "font-medium"}`}>
                                {item.title}
                            </p>
                        </div>
                        {item.subtitle && <p className="text-[11px] text-muted-foreground line-clamp-1">{item.subtitle}</p>}
                    </div>
                </div>
            </TableCell>

            <TableCell>
                <Badge variant="secondary" className={`text-[10px] font-bold ${NIVEL_BADGE[item.nivel]}`}>
                    {item.meta}
                </Badge>
            </TableCell>

            <TableCell>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-2 hover:bg-primary/10 hover:text-primary transition-colors px-2"
                    onClick={() => setViewingQuestions(item)}
                >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">{item.questionsCount ?? 0}</span>
                </Button>
            </TableCell>

            <TableCell>
                <Badge variant="outline" className={`text-[10px] rounded-full gap-1.5 ${item.active ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20" : ""}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                    {item.active ? "Ativo" : "Inativo"}
                </Badge>
            </TableCell>

            <TableCell className="text-right pr-4">
                <div className="flex items-center justify-end gap-1">
                    {nivelMap[item.nivel] && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => onOpenInlineAdd(item)}>
                            <Plus className="w-3.5 h-3.5" />
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingItem(item)}>
                        <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" disabled={deletingId === item.id}>
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Excluir {item.title}?</AlertDialogTitle>
                                <AlertDialogDescription>Esta ação removerá todos os itens vinculados e não pode ser desfeita.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete(item.rawId, item.nivel)} className="bg-destructive text-destructive-foreground">Excluir</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </TableCell>
        </TableRow>
    )
}
