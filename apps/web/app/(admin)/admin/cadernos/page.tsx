import Link from "next/link"
import { BookOpen, Plus } from "lucide-react"

import { getAdminNotebooks, publishAdminNotebook } from "@/actions/notebook-actions"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"

export const metadata = {
  title: "Cadernos | Concurso Master Admin",
  description: "Listagem de cadernos criados por professores e equipe editorial.",
}

const STATUS_LABEL: Record<string, string> = {
  RASCUNHO: "Rascunho",
  EM_REVISAO: "Em revisão",
  APROVADA: "Aprovada",
  PUBLICADA: "Publicada",
}

export default async function AdminCadernosPage() {
  const notebooks = await getAdminNotebooks()

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Cadernos</h1>
          <p className="text-sm text-muted-foreground">
            Revise os cadernos montados por professores antes de disponibilizar aos alunos.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cadernos/criar">
            <Plus className="mr-2 h-4 w-4" />
            Criar caderno
          </Link>
        </Button>
      </div>

      {notebooks.length === 0 ? (
        <Card className="shadow-none">
          <CardContent className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-medium">Nenhum caderno criado ainda.</p>
              <p className="text-sm text-muted-foreground">Crie o primeiro caderno para iniciar o fluxo editorial.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin/cadernos/criar">Criar caderno</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {notebooks.map((notebook) => {
            const publishedCount = notebook.itens.filter((item) => item.questao.status === "PUBLICADA").length
            const needsReview = publishedCount < notebook.itens.length

            return (
              <Card key={notebook.id} className="shadow-none">
                <CardHeader className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-base">{notebook.titulo}</CardTitle>
                      <Badge variant={needsReview ? "secondary" : "outline"}>
                        {needsReview ? "Aguardando revisão" : "Pronto para publicar"}
                      </Badge>
                      <Badge variant="outline">{notebook.visibilidade === "PUBLICO" ? "Público" : "Privado"}</Badge>
                    </div>
                    {notebook.descricao && <p className="text-sm text-muted-foreground">{notebook.descricao}</p>}
                    <p className="text-xs text-muted-foreground">
                      {notebook.itens.length} questão(ões) · Autor: {notebook.criadoPor.nome}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin/questoes/revisar">Revisar questões</Link>
                    </Button>
                    <form
                      action={async () => {
                        "use server"
                        await publishAdminNotebook(notebook.id)
                      }}
                    >
                      <Button type="submit" size="sm" disabled={needsReview || notebook.visibilidade === "PUBLICO"}>
                        Publicar caderno
                      </Button>
                    </form>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {notebook.itens.slice(0, 5).map((item) => (
                    <div
                      key={item.questao.id}
                      className="flex flex-col gap-1 rounded-xl border bg-muted/20 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="font-medium">
                        {item.questao.code} · {item.questao.disciplina.nome}
                        {item.questao.assunto?.nome ? ` / ${item.questao.assunto.nome}` : ""}
                      </span>
                      <Badge variant="outline">{STATUS_LABEL[item.questao.status] ?? item.questao.status}</Badge>
                    </div>
                  ))}
                  {notebook.itens.length > 5 && (
                    <p className="text-xs text-muted-foreground">+ {notebook.itens.length - 5} questão(ões) neste caderno.</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
