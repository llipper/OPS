import { getQuestionCreationOptions } from "@/actions/questions-actions"
import { AdminQuestionFilter } from "@/components/admin/questions/admin-filter"
import { Button } from "@workspace/ui/components/button"
import { ClipboardCheck, Upload } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Questões | Concurso Master Admin",
  description: "Gestão editorial do banco de questões.",
}

export default async function QuestoesPage() {
  const options = await getQuestionCreationOptions()

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Questões</h1>
          <p className="text-sm text-muted-foreground">
            Busque, filtre e organize o fluxo editorial do banco de questões.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/questoes/revisar">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Revisar rascunhos
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/questoes/importar">
              <Upload className="mr-2 h-4 w-4" />
              Importar questões
            </Link>
          </Button>
        </div>
      </div>
      <AdminQuestionFilter options={options} />
    </div>
  )
}
