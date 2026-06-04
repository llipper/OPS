"use client"

import * as React from "react"
import { DisciplinasList, CreateModal } from "@/components/admin/taxonomy"
import { ItemHierarquico } from "@/components/admin/taxonomy"

type Concurso = { 
  id: string; 
  nome: string; 
  ano: number | null; 
  imagemUrl?: string | null;
  ativo: boolean;
  cargos: { nome: string }[];
  _count?: { questoes: number };
}

interface Props {
  concursos: Concurso[]
  onCreate: (data: { nome: string; ano?: number; cargo?: string }) => Promise<void>
  onUpdate: (id: string, data: any, nivel: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function ConcursosClient({ concursos: initialConcursos, onCreate, onUpdate, onDelete }: Props) {
  const [items, setItems] = React.useState<ItemHierarquico[]>([])

  const formatConcursos = React.useCallback((dados: Concurso[]): ItemHierarquico[] => {
    return dados.map((c) => ({
      id: c.id,
      rawId: c.id,
      title: c.nome,
      subtitle: c.cargos.map(cargo => cargo.nome).join(", ") || "Sem cargo definido",
      meta: c.ano ? String(c.ano) : "CONCURSO",
      imageUrl: c.imagemUrl || undefined,
      ano: c.ano || undefined,
      cargo: c.cargos?.[0]?.nome,
      active: c.ativo,
      indent: 0,
      nivel: "concurso",
      questionsCount: c._count?.questoes || 0,
      editHref: "#",
    }))
  }, [])

  React.useEffect(() => {
    setItems(formatConcursos(initialConcursos))
  }, [initialConcursos, formatConcursos])

  return (
    <div className="p-6">
      <DisciplinasList
        items={items}
        title="Gestão de Concursos"
        subtitle="Todos os certames do sistema"
        createAction={
          <CreateModal 
            title="Novo Concurso" 
            label="Nome do Concurso" 
            placeholder="Ex: Polícia Civil do Ceará" 
            showYear={true}
            showCargo={true}
            onCreate={onCreate} 
          />
        }
        onDelete={async (id) => await onDelete(id)}
        onUpdateItem={onUpdate}
        onMoveItem={async () => {}}
        nivelMap={{}} // Sem hierarquia nesta vista simplificada
      />
    </div>
  )
}
