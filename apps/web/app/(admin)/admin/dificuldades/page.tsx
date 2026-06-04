"use client"

import * as React from "react"
import { DisciplinasList, CreateModal } from "@/components/admin/taxonomy"
import { ItemHierarquico } from "@/components/admin/taxonomy"
import { getDificuldades, createDificuldade, deleteDificuldade, updateDificuldade } from "@/actions/taxonomy-actions"

export default function DificuldadePage() {
  const [items, setItems] = React.useState<ItemHierarquico[]>([])
  const [loading, setLoading] = React.useState(true)

  const loadData = React.useCallback(async () => {
    setLoading(true)
    const dados = await getDificuldades()
    const formatted: ItemHierarquico[] = dados.map((n: any) => ({
      id: n.id,
      rawId: n.id,
      title: n.nome,
      subtitle: n.descricao || undefined,
      meta: "DIFICULDADE",
      active: n.ativo,
      indent: 0,
      nivel: "dificuldade",
      cor: n.cor,
      questionsCount: n._count?.questoes || 0,
      editHref: "#",
    }))
    setItems(formatted)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  async function handleCreate(data: { nome: string; sigla: string; peso?: number; ordem?: number; cor?: string }) {
    await createDificuldade({
      nome: data.nome,
      slug: data.sigla,
      peso: data.peso,
      ordem: data.ordem,
      cor: data.cor
    })
    loadData()
  }

  async function handleDelete(id: string) {
    await deleteDificuldade(id)
    loadData()
  }

  async function handleUpdate(id: string, data: any) {
    await updateDificuldade(id, {
        nome: data.nome,
        ativo: data.ativo,
        cor: data.cor
    })
    loadData()
  }

  return (
    <div className="p-6">
      <DisciplinasList
        items={items}
        title="Níveis de Dificuldade"
        subtitle={loading ? "Carregando..." : "Gestão de Complexidade"}
        createAction={
          <CreateModal 
            title="Nova Dificuldade" 
            label="Nome da Dificuldade" 
            placeholder="Ex: Expert" 
            showWeight={true}
            showOrder={true}
            showColor={true}
            onCreate={handleCreate} 
          />
        }
        onDelete={handleDelete}
        onUpdateItem={handleUpdate}
        onMoveItem={async () => {}}
        nivelMap={{}} // Desativa a hierarquia (não pode adicionar filhos)
      />
    </div>
  )
}
