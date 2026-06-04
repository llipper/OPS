import { useState } from "react"
import {
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { ItemHierarquico, TaxonLevel } from "../types"

interface UseTaxonomyDndProps {
    items: ItemHierarquico[]
    onMoveItem: (id: string, newParentId: string | null, nivel: TaxonLevel) => Promise<void>
}

export function useTaxonomyDnd({ items, onMoveItem }: UseTaxonomyDndProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const [activeDragId, setActiveDragId] = useState<string | null>(null)

    const handleDragStart = (event: any) => {
        setActiveDragId(event.active.id)
    }

    const handleDragEnd = async (event: any) => {
        const { active, over } = event
        setActiveDragId(null)
        if (!over || active.id === over.id) return

        const activeItem = items.find(i => i.id === active.id)
        const overItem = items.find(i => i.id === over.id)
        if (!activeItem || !overItem) return

        // Caso 1: Arrastou um item sobre outro do MESMO nível (ex: instituicao sobre instituicao)
        // Isso indica que o item deve se tornar "irmão" do item de destino (adotando o mesmo pai)
        if (activeItem.nivel === overItem.nivel) {
            const parentItem = items.find(i => i.id === overItem.parentId)
            const newParentRawId = parentItem ? parentItem.rawId : null

            if (activeItem.parentId !== overItem.parentId) {
                await onMoveItem(activeItem.rawId, newParentRawId, activeItem.nivel)
            }
            return
        }

        // Caso 2: Arrastou um item filho diretamente sobre um item pai compatível (ex: instituicao sobre carreira)
        const isCompatible = (parentNivel: string, childNivel: string) => {
            const rules: Record<string, string[]> = {
                orgao: ["concurso"],
                instituicao: ["orgao"],
                carreira: ["instituicao"],
                concurso: ["cargo"],
                disciplina: ["assunto"],
                assunto: ["topico"],
                topico: ["subtopico"],
            }
            return rules[parentNivel]?.includes(childNivel) || false
        }

        if (isCompatible(overItem.nivel, activeItem.nivel)) {
            await onMoveItem(activeItem.rawId, overItem.rawId, activeItem.nivel)
        }
    }

    return {
        sensors,
        activeDragId,
        handleDragStart,
        handleDragEnd,
    }
}
