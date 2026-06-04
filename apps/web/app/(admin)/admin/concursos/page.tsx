import { 
  getConcursos, 
  createConcursoVinculado, 
  updateConcurso, 
  deleteCarreiraHierarchyItem 
} from "@/actions/taxonomy-actions"
import { ConcursosClient } from "./concursos-client"

export default async function ConcursosPage() {
  const concursos = await getConcursos()

  // Handler para criação
  async function handleCreate(data: any) {
    "use server"
    const formData = new FormData()
    formData.append("nome", data.nome)
    formData.append("cargo", data.cargo || "")
    formData.append("ano", String(data.ano || ""))
    
    // Na página de concursos solta, passamos null para carreiraId
    await createConcursoVinculado("", formData) 
  }

  async function handleUpdate(id: string, data: any) {
    "use server"
    await updateConcurso(id, data)
  }

  async function handleDelete(id: string) {
    "use server"
    await deleteCarreiraHierarchyItem(id, "concurso")
  }

  return (
    <ConcursosClient
      concursos={concursos}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  )
}
