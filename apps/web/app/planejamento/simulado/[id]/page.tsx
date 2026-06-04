import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ClipboardList, Send } from "lucide-react"

import { prisma } from "@workspace/database"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Label } from "@workspace/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"

import { submitDiagnosticSimulation } from "../../actions"
import { getSecurityContext } from "@/lib/auth/get-security-context"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function DiagnosticSimulationPage({ params }: PageProps) {
  const { id } = await params
  const context = await getSecurityContext()

  const simulado = await prisma.simulado.findFirst({
    where: { id, criadoPorId: context.userId },
    select: {
      id: true,
      titulo: true,
      descricao: true,
      totalQuestoes: true,
      duracaoMinutos: true,
      itens: {
        orderBy: { ordem: "asc" },
        select: {
          id: true,
          ordem: true,
          questao: {
            select: {
              id: true,
              code: true,
              enunciado: true,
              ano: true,
              disciplina: { select: { nome: true } },
              assunto: { select: { nome: true } },
              topico: { select: { nome: true } },
              alternativas: {
                orderBy: { ordem: "asc" },
                select: {
                  id: true,
                  letra: true,
                  texto: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!simulado) notFound()

  return (
    <main className="flex flex-1 flex-col bg-background/50 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Button asChild variant="ghost" className="w-fit rounded-xl px-0">
              <Link href="/planejamento">
                <ArrowLeft className="size-4" />
                Voltar ao planejamento
              </Link>
            </Button>
            <div>
              <Badge variant="secondary" className="mb-2 rounded-xl">
                Simulado diagnostico
              </Badge>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {simulado.titulo}
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                {simulado.descricao}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            label="Questoes"
            value={String(simulado.totalQuestoes)}
            detail="Distribuidas pelo edital"
          />
          <SummaryCard
            label="Tempo sugerido"
            value={`${simulado.duracaoMinutos ?? 180} min`}
            detail="Modelo prova objetiva"
          />
          <SummaryCard
            label="Proximo passo"
            value="Responder"
            detail="Depois gerar diagnostico"
          />
        </section>

        <form action={submitDiagnosticSimulation.bind(null, simulado.id)}>
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <ClipboardList className="size-4" />
                Responda o simulado
              </CardTitle>
              <Button type="submit" className="rounded-xl">
                <Send className="size-4" />
                Finalizar e gerar diagnostico
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {simulado.itens.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-border/60 p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="rounded-xl">
                      {String(item.ordem).padStart(2, "0")}
                    </Badge>
                    <Badge variant="secondary" className="rounded-xl">
                      {item.questao.disciplina.nome}
                    </Badge>
                    {item.questao.assunto?.nome && (
                      <span className="text-xs text-muted-foreground">
                        {item.questao.assunto.nome}
                      </span>
                    )}
                    {item.questao.topico?.nome && (
                      <span className="text-xs text-muted-foreground">
                        / {item.questao.topico.nome}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-6">{item.questao.enunciado}</p>
                  <RadioGroup
                    name={`question-${item.questao.id}`}
                    className="mt-4 grid gap-2"
                    required
                  >
                    {item.questao.alternativas.map((alternativa) => (
                      <Label
                        key={alternativa.id}
                        htmlFor={`${item.questao.id}-${alternativa.id}`}
                        className="flex cursor-pointer gap-3 rounded-xl bg-muted/50 px-3 py-2 text-sm transition-colors hover:bg-muted"
                      >
                        <RadioGroupItem
                          id={`${item.questao.id}-${alternativa.id}`}
                          value={alternativa.id}
                        />
                        <span className="font-semibold">
                          {alternativa.letra}
                        </span>
                        <span className="flex-1">{alternativa.texto}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </article>
              ))}
              <div className="sticky bottom-4 flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-xl shadow-sm"
                >
                  <Send className="size-4" />
                  Finalizar e gerar diagnostico
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  )
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  )
}
