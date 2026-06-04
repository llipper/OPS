"use client"

import * as React from "react"
import { Search, Plus, Check, X, Grip } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table"
import { Input } from "@workspace/ui/components/input"
import { Card, CardContent } from "@workspace/ui/components/card"
import { useLayout } from "@/contexts/layout-context"
import { cn } from "@workspace/ui/lib/utils"

import { ItemHierarquico, TaxonLevel } from "../types"
import { EditModal } from "./edit-modal"
import { QuestionsModal } from "./questions-modal"
import { SortableRow } from "./sortable-row"
import { useTaxonomyDnd } from "../hooks/use-taxonomy-dnd"
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

interface DisciplinasListProps {
    items: ItemHierarquico[]
    createAction: React.ReactNode
    onDelete: (id: string, nivel: string) => Promise<void>
    onCreateAssunto?: (disciplinaId: string, nome: string) => Promise<void>
    onCreateTopico?: (assuntoId: string, nome: string) => Promise<void>
    onCreateSubtopico?: (topicoId: string, nome: string) => Promise<void>
    onCreateChild?: (parentId: string, nome: string, nextNivel: TaxonLevel) => Promise<void>
    onUpdateItem: (id: string, data: { nome: string; sigla: string; ativo: boolean }, nivel: string) => Promise<void>
    onMoveItem: (id: string, newParentId: string | null, nivel: TaxonLevel) => Promise<void>
    onAddChildClick?: (item: ItemHierarquico, nextNivel: TaxonLevel) => boolean | void
    title?: string
    subtitle?: string
    nivelMap?: Record<string, TaxonLevel>
}

export function TaxonomyList({
    items,
    createAction,
    onDelete,
    onCreateAssunto,
    onCreateTopico,
    onCreateSubtopico,
    onCreateChild,
    onUpdateItem,
    onMoveItem,
    onAddChildClick,
    title = "Disciplinas",
    subtitle = "Gestão de Conteúdo",
    nivelMap = { disciplina: "assunto", assunto: "topico", topico: "subtopico" },
}: DisciplinasListProps) {
    const [search, setSearch] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState<"all" | "active" | "inactive">("all")
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set())
    const [deletingId, setDeletingId] = React.useState<string | null>(null)
    const [editingItem, setEditingItem] = React.useState<ItemHierarquico | null>(null)
    const [viewingQuestions, setViewingQuestions] = React.useState<ItemHierarquico | null>(null)
    
    const [inlineAdd, setInlineAdd] = React.useState<{ parentId: string; rawParentId: string; nivel: TaxonLevel; indent: number } | null>(null)
    const [inlineValue, setInlineValue] = React.useState("")
    const [inlineSaving, setInlineSaving] = React.useState(false)
    const inlineInputRef = React.useRef<HTMLInputElement>(null)

    // Contexto de Layout
    const { containerWidth } = useLayout()

    // Controla sensores e colisão DnD via hook isolado
    const {
        sensors,
        activeDragId,
        handleDragStart,
        handleDragEnd,
    } = useTaxonomyDnd({ items, onMoveItem })

    const toggleExpand = (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        setExpandedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const filteredItems = React.useMemo(() => {
        let result = items
        if (search.trim()) {
            const q = search.toLowerCase()
            const matchIds = new Set(items.filter(i => 
                i.title.toLowerCase().includes(q) || i.meta.toLowerCase().includes(q)
            ).map(i => i.id))
            
            const addAncestors = (id: string) => {
                const item = items.find(i => i.id === id)
                if (item?.parentId) {
                    matchIds.add(item.parentId)
                    addAncestors(item.parentId)
                }
            }
            Array.from(matchIds).forEach(addAncestors)
            result = result.filter(i => matchIds.has(i.id))
        }
        if (statusFilter !== "all") {
            result = result.filter(i => statusFilter === "active" ? i.active : !i.active)
        }
        return result
    }, [items, search, statusFilter])

    const isVisible = React.useCallback((item: ItemHierarquico): boolean => {
        if (search.trim()) return true;
        let parentId = item.parentId
        while (parentId) {
            if (!expandedIds.has(parentId)) return false
            parentId = filteredItems.find(i => i.id === parentId)?.parentId
        }
        return true
    }, [expandedIds, filteredItems, search])

    const visibleItems = React.useMemo(() => filteredItems.filter(isVisible), [filteredItems, isVisible])

    const handleOpenInlineAdd = (item: ItemHierarquico) => {
        const nextNivel = nivelMap[item.nivel]
        if (!nextNivel) return
        if (onAddChildClick) {
            const handled = onAddChildClick(item, nextNivel)
            if (handled === true) {
                setExpandedIds(prev => new Set([...prev, item.id]))
                return
            }
        }
        setExpandedIds(prev => new Set([...prev, item.id]))
        setInlineAdd({ parentId: item.id, rawParentId: item.rawId, nivel: nextNivel, indent: item.indent + 1 })
        setInlineValue("")
        setTimeout(() => inlineInputRef.current?.focus(), 50)
    }

    const handleInlineSave = async () => {
        if (!inlineAdd || !inlineValue.trim() || inlineSaving) return
        setInlineSaving(true)
        try {
            if (onCreateChild) {
                await onCreateChild(inlineAdd.rawParentId, inlineValue, inlineAdd.nivel)
            } else {
                if (inlineAdd.nivel === "assunto" && onCreateAssunto) await onCreateAssunto(inlineAdd.rawParentId, inlineValue)
                else if (inlineAdd.nivel === "topico" && onCreateTopico) await onCreateTopico(inlineAdd.rawParentId, inlineValue)
                else if (inlineAdd.nivel === "subtopico" && onCreateSubtopico) await onCreateSubtopico(inlineAdd.rawParentId, inlineValue)
            }
            setInlineAdd(null)
        } finally {
            setInlineSaving(false)
        }
    }

    return (
        <div className="flex-1 p-8 pt-6 bg-background">
            <div className={cn(
                "space-y-6",
                containerWidth === "focused" ? "max-w-7xl mx-auto" : "w-full"
            )}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">{subtitle}</p>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                </div>
                {createAction}
            </div>

            <Card className="bg-background">
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nome ou sigla..."
                                className="pl-10 h-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 rounded-md p-1">
                            {(["all", "active", "inactive"] as const).map((f) => (
                                <Button
                                    key={f}
                                    variant={statusFilter === f ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setStatusFilter(f)}
                                    className="text-xs h-8 px-3"
                                >
                                    {f === "all" ? "Todos" : f === "active" ? "Ativos" : "Inativos"}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-md bg-card overflow-hidden">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={visibleItems.map(i => i.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="text-xs font-bold uppercase tracking-wider">Nome</TableHead>
                                            <TableHead className="w-[160px] text-xs font-bold uppercase tracking-wider">Nível / Sigla</TableHead>
                                            <TableHead className="w-[120px] text-xs font-bold uppercase tracking-wider">Questões</TableHead>
                                            <TableHead className="w-[120px] text-xs font-bold uppercase tracking-wider">Status</TableHead>
                                            <TableHead className="text-right w-[120px]" />
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {visibleItems.map((item) => (
                                            <React.Fragment key={item.id}>
                                                <SortableRow
                                                    item={item}
                                                    items={items}
                                                    expandedIds={expandedIds}
                                                    toggleExpand={toggleExpand}
                                                    onOpenInlineAdd={handleOpenInlineAdd}
                                                    setEditingItem={setEditingItem}
                                                    setViewingQuestions={setViewingQuestions}
                                                    onDelete={onDelete}
                                                    deletingId={deletingId}
                                                    nivelMap={nivelMap}
                                                    isSearching={!!search.trim()}
                                                />

                                                {inlineAdd?.parentId === item.id && (
                                                    <TableRow className="bg-primary/5">
                                                        <TableCell className="py-2" style={{ paddingLeft: `calc(1rem + ${inlineAdd.indent * 2.5}rem)` }}>
                                                            <div className="flex items-center gap-2">
                                                                <X className="w-4 h-4 text-primary/40" />
                                                                <input
                                                                    ref={inlineInputRef}
                                                                    value={inlineValue}
                                                                    onChange={(e) => setInlineValue(e.target.value)}
                                                                    onKeyDown={(e) => e.key === "Enter" && handleInlineSave()}
                                                                    placeholder={`Novo ${inlineAdd.nivel}...`}
                                                                    className="bg-transparent border-b border-primary/30 outline-none text-sm w-full"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell colSpan={4}>
                                                            <div className="flex items-center gap-2">
                                                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleInlineSave} disabled={!inlineValue.trim()}>
                                                                    <Check className="w-3.5 h-3.5 text-primary" />
                                                                </Button>
                                                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setInlineAdd(null)}>
                                                                    <X className="w-3.5 h-3.5" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </SortableContext>
                            
                            <DragOverlay>
                                {activeDragId ? (
                                    <div className="bg-background border border-primary/20 rounded-md p-4 shadow-2xl opacity-80 scale-105">
                                        <div className="flex items-center gap-3">
                                            <Grip className="w-4 h-4 text-primary" />
                                            <span className="font-bold text-sm">
                                                {items.find(i => i.id === activeDragId)?.title}
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </div>
                </CardContent>
            </Card>

            {editingItem && (
                <EditModal 
                    item={{ 
                        id: editingItem.rawId, 
                        title: editingItem.title, 
                        sigla: editingItem.sigla || "", 
                        active: editingItem.active, 
                        nivel: editingItem.nivel, 
                        imageUrl: editingItem.imageUrl || undefined, 
                        ano: editingItem.ano, 
                        cargo: editingItem.cargo, 
                        cor: editingItem.cor,
                        formato: editingItem.formato,
                        quantidadeAlternativas: editingItem.quantidadeAlternativas
                    }} 
                    open={!!editingItem} 
                    onSave={onUpdateItem}
                    onOpenChange={(o) => !o && setEditingItem(null)}
                />
            )}
            
            <QuestionsModal 
                item={viewingQuestions} 
                open={!!viewingQuestions} 
                onOpenChange={(o) => !o && setViewingQuestions(null)} 
            />
            </div>
        </div>
    )
}
