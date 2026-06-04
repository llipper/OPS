"use client"

import * as React from "react"
import { DisciplinasList, CreateModal } from "@/components/admin/taxonomy"
import { ItemHierarquico } from "@/components/admin/taxonomy"
import { createBanca, updateBanca, deleteBanca, getBancas } from "@/actions/taxonomy-actions"

type Banca = { 
  id: string; 
  nome: string; 
  sigla: string | null; 
  ativo: boolean;
  cor?: string | null;
  ordem?: number;
  _count?: { questoes: number }
}

interface Props {
  bancas: Banca[]
  onCreate: (data: { nome: string; sigla: string; cor?: string; ordem?: number }) => Promise<void>
  onUpdate: (id: string, data: { nome?: string; sigla?: string; ativo?: boolean; cor?: string; ordem?: number }) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function BancasClient({ bancas: initialBancas, onCreate, onUpdate, onDelete }: Props) {
  const [items, setItems] = React.useState<ItemHierarquico[]>([])
  const [loading, setLoading] = React.useState(false)

  const formatBancas = React.useCallback((dados: Banca[]): ItemHierarquico[] => {
    return dados.map((b) => ({
      id: b.id,
      rawId: b.id,
      title: b.nome,
      subtitle: b.sigla || undefined,
      meta: "BANCA",
      active: b.ativo,
      indent: 0,
      nivel: "banca",
      questionsCount: b._count?.questoes || 0,
      editHref: "#",
      sigla: b.sigla || ""
    }))
  }, [])

  React.useEffect(() => {
    setItems(formatBancas(initialBancas))
  }, [initialBancas, formatBancas])

  const handleUpdate = async (id: string, data: any) => {
    await onUpdate(id, {
      nome: data.nome,
      sigla: data.sigla,
      ativo: data.ativo
    })
    // O Next.js revalida via Server Actions, mas podemos atualizar o local se necessário
  }

  return (
    <div className="p-6">
      <DisciplinasList
        items={items}
        title="Bancas Examinadoras"
        subtitle="Gestão de Identidade das Bancas"
        createAction={
          <CreateModal 
            title="Nova Banca" 
            label="Nome da Banca" 
            placeholder="Ex: Fundação Getúlio Vargas" 
            showOrder={true}
            showColor={true}
            onCreate={onCreate} 
          />
        }
        onDelete={async (id) => await onDelete(id)}
        onUpdateItem={handleUpdate}
        onMoveItem={async () => {}}
        nivelMap={{}} // Sem hierarquia
      />
    </div>
  )
}
