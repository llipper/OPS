import { 
  getCarreiras, 
  createCarreira, 
  updateCarreira, 
  deleteCarreira, 
  deleteCarreiraHierarchyItem,
  createConcursoVinculado, 
  updateConcurso, 
  createCargoVinculado,
  updateCargo,
  moveTaxonomyItem
} from "@/actions/taxonomy-actions"
import { CarreirasClient } from "./carreiras-client"
import { mapCarreirasToHierarchicalItems } from "@/components/admin/taxonomy/utils/mapping"

export default async function CarreirasPage() {
  const carreiras = await getCarreiras()
  const items = mapCarreirasToHierarchicalItems(carreiras)

  async function handleUpdate(id: string, data: any, nivel: string) {
    "use server"
    if (nivel === "concurso") {
      await updateConcurso(id, data)
    } else if (nivel === "cargo") {
      await updateCargo(id, data)
    } else {
      await updateCarreira(id, data)
    }
  }

  async function handleCreateRoot(nome: string) {
    "use server"
    await createCarreira({ nome })
  }

  async function handleCreateOrgao(parentId: string, nome: string) {
    "use server"
    await createCarreira({ nome, parentId })
  }

  async function handleMove(id: string, newParentId: string | null, nivel: any) {
    "use server"
    await moveTaxonomyItem(id, newParentId, nivel)
  }

  return (
    <CarreirasClient 
      items={items} 
      onDelete={deleteCarreiraHierarchyItem}
      onCreateRoot={handleCreateRoot}
      onCreateOrgao={handleCreateOrgao}
      onUpdateItem={handleUpdate}
      onMoveItem={handleMove}
      onCreateConcurso={createConcursoVinculado}
      onCreateCargo={createCargoVinculado}
    />
  )
}
