import { getBancas, createBanca, updateBanca, deleteBanca } from "@/actions/taxonomy-actions"
import { BancasClient } from "./bancas-client"

export default async function BancasPage() {
  const bancas = await getBancas()

  return (
    <BancasClient
      bancas={bancas}
      onCreate={createBanca}
      onUpdate={updateBanca}
      onDelete={deleteBanca}
    />
  )
}
