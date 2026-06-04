"use client"

import * as React from "react"
import { DisciplinasList, CreateModal } from "@/components/admin/taxonomy"
import { ItemHierarquico } from "@/components/admin/taxonomy"
import { getNiveisEducacionais, createNivelEducacional, deleteNivelEducacional, updateNivelEducacional } from "@/actions/taxonomy-actions"

export default function EducacionalPage() {
  const [items, setItems] = React.useState<ItemHierarquico[]>([])
  const [loading, setLoading] = React.useState(true)

  const loadData = React.useCallback(async () => {
    setLoading(true)
    const niveis = await getNiveisEducacionais()
    const formatted: ItemHierarquico[] = niveis.map((n: any) => ({
      id: n.id,
      rawId: n.id,
      title: n.nome,
      subtitle: n.descricao || undefined,
      meta: "EDUCACIONAL",
      active: n.ativo,
      indent: 0,
      nivel: "nivelEducacional",
      questionsCount: n._count?.questoes || 0,
      editHref: "#",
    }))
    setItems(formatted)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  async function handleCreate(data: { nome: string; sigla: string; ordem?: number }) {
    await createNivelEducacional({
      nome: data.nome,
      slug: data.sigla,
      ordem: data.ordem
    })
    loadData()
  }

  async function handleDelete(id: string) {
    await deleteNivelEducacional(id)
    loadData()
  }

  async function handleUpdate(id: string, data: any) {
    await updateNivelEducacional(id, {
        nome: data.nome,
        ativo: data.ativo
    })
    loadData()
  }

  return (
    <div className="p-6">
      <DisciplinasList
        items={items}
        title="Níveis de Escolaridade"
        subtitle={loading ? "Carregando..." : "Gestão de Escolaridade"}
        createAction={
          <CreateModal 
            title="Novo Nível" 
            label="Nome do Nível" 
            placeholder="Ex: Pós-Graduação" 
            showOrder={true}
            onCreate={handleCreate} 
          />
        }
        onDelete={handleDelete}
        onUpdateItem={handleUpdate}
        onMoveItem={async () => {}}
        nivelMap={{}} // Desativa a hierarquia
      />
    </div>
  )
}
