import { getTeacherNotebookBuilderOptions } from "@/actions/notebook-actions"
import { TeacherNotebookBuilder } from "@/components/admin/notebooks/teacher-notebook-builder"

export const metadata = {
  title: "Criar Caderno | Concurso Master Admin",
  description: "Construtor de cadernos com questões inéditas para revisão editorial.",
}

export default async function CriarCadernoPage() {
  const options = await getTeacherNotebookBuilderOptions()

  return <TeacherNotebookBuilder options={options} />
}
