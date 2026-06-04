"use client"

import * as React from "react"
import { DisciplinasList, CreateModal } from "@/components/admin/taxonomy"
import { ItemHierarquico } from "@/components/admin/taxonomy"
import { getTiposQuestao, createTipoQuestao, deleteTipoQuestao, updateTipoQuestao } from "@/actions/taxonomy-actions"

export default function TiposQuestaoPage() {
  const [items, setItems] = React.useState<ItemHierarquico[]>([])
  const [loading, setLoading] = React.useState(true)

  const loadData = React.useCallback(async () => {
    setLoading(true)
    const tipos = await getTiposQuestao()
    const formatted: ItemHierarquico[] = tipos.map((t: any) => {
      let formatInfo = "Alternativas (5 opções)"
      if (t.formato === "TEXTO") {
        formatInfo = "Texto (Discursiva)"
      } else if (t.formato === "CERTO_ERRADO") {
        formatInfo = "Certo ou Errado (2 opções)"
      } else if (t.formato === "ALTERNATIVAS") {
        formatInfo = `Alternativas (${t.quantidadeAlternativas || 5} opções)`
      }

      return {
        id: t.id,
        rawId: t.rawId,
        title: t.title,
        subtitle: `${t.subtitle.toUpperCase()} — ${formatInfo}`,
        meta: "TIPO",
        active: t.ativo,
        indent: 0,
        nivel: "tipoQuestao",
        sigla: t.subtitle,
        formato: t.formato,
        quantidadeAlternativas: t.quantidadeAlternativas,
        questionsCount: t.count,
        editHref: "#",
      }
    })
    setItems(formatted)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  async function handleCreate(data: { 
    nome: string; 
    sigla: string; 
    formato?: string; 
    quantidadeAlternativas?: number;
  }) {
    await createTipoQuestao(data.nome, data.sigla, data.formato, data.quantidadeAlternativas)
    loadData()
  }

  async function handleDelete(rawId: string) {
    await deleteTipoQuestao(rawId)
    loadData()
  }

  async function handleUpdate(id: string, data: any) {
    await updateTipoQuestao(id, {
      nome: data.nome,
      sigla: data.sigla,
      ativo: data.ativo,
      formato: data.formato,
      quantidadeAlternativas: data.quantidadeAlternativas
    })
    loadData()
  }

  return (
    <div className="p-6">
      <DisciplinasList
        items={items}
        title="Tipos de Questão"
        subtitle={loading ? "Carregando..." : "Modelos de Resposta"}
        createAction={
          <CreateModal 
            title="Novo Tipo" 
            label="Nome do Tipo" 
            placeholder="Ex: Discursiva" 
            showTipoQuestaoFields={true}
            onCreate={handleCreate} 
          />
        }
        onDelete={handleDelete}
        onUpdateItem={handleUpdate}
        onMoveItem={async () => {}}
        nivelMap={{}}
      />
    </div>
  )
}
