import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"

import { getAdminQuestionReviewList } from "@/actions/questions-actions"
import { QuestionReviewPageShell } from "@/components/admin/questions/review/question-review-page-shell"
import { QuestionReviewList } from "@/components/admin/questions/review/question-review-list"
import { Button } from "@workspace/ui/components/button"

export const metadata = {
  title: "Revisar Questões | Concurso Master Admin",
  description: "Validação editorial e publicação de questões importadas.",
}

export default async function RevisarQuestoesPage() {
  const questions = await getAdminQuestionReviewList()

  return (
    <QuestionReviewPageShell>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Button asChild variant="ghost" size="sm" className="px-0">
            <Link href="/admin/questoes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para questões
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Revisar questões</h1>
            <p className="text-sm text-muted-foreground">
              Valide, corrija e publique os rascunhos importados.
            </p>
          </div>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/questoes/importar">
            <Upload className="mr-2 h-4 w-4" />
            Importar novo lote
          </Link>
        </Button>
      </div>

      <QuestionReviewList questions={questions} />
    </QuestionReviewPageShell>
  )
}
