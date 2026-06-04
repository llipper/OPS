import { 
    getDisciplinasLista, 
    deleteDisciplina, 
    deleteAssunto, 
    deleteTopico, 
    deleteSubtopico, 
    createAssunto, 
    createTopico, 
    createSubtopico,
    updateDisciplina,
    updateAssunto,
    updateTopico,
    updateSubtopico,
    createDisciplina,
    moveTaxonomyItem
} from "@/actions/taxonomy-actions"

import { DisciplinasList, CreateModal } from "@/components/admin/taxonomy"
import { mapDisciplinasToHierarchicalItems } from "@/components/admin/taxonomy/utils/mapping"

export default async function DisciplinasListaPage() {
  const disciplinas = await getDisciplinasLista()
  const items = mapDisciplinasToHierarchicalItems(disciplinas)

  // Handlers para Ações de Servidor
  async function handleDelete(id: string, nivel: string) {
    "use server"
    if (nivel === "disciplina") await deleteDisciplina(id)
    else if (nivel === "assunto") await deleteAssunto(id)
    else if (nivel === "topico") await deleteTopico(id)
    else await deleteSubtopico(id)
  }

  async function handleUpdate(id: string, data: any, nivel: string) {
    "use server"
    if (nivel === "disciplina") await updateDisciplina(id, data)
    else if (nivel === "assunto") await updateAssunto(id, data)
    else if (nivel === "topico") await updateTopico(id, data)
    else await updateSubtopico(id, data)
  }

  async function handleCreate(data: { nome: string; sigla: string }) {
    "use server"
    await createDisciplina(data.nome, data.sigla)
  }

  async function handleMove(id: string, newParentId: string | null, nivel: any) {
    "use server"
    await moveTaxonomyItem(id, newParentId, nivel)
  }

  return (
    <DisciplinasList
      items={items}
      createAction={<CreateModal key="create-modal" onCreate={handleCreate} />}
      onDelete={handleDelete}
      onUpdateItem={handleUpdate}
      onMoveItem={handleMove}
      onCreateAssunto={createAssunto}
      onCreateTopico={createTopico}
      onCreateSubtopico={createSubtopico}
    />
  )
}
