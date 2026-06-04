import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, CalendarDays, Clock, Target } from "lucide-react"

import { prisma } from "@workspace/database"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Progress } from "@workspace/ui/components/progress"

import { generateLessonPlan } from "../../actions"
import { getSecurityContext } from "@/lib/auth/get-security-context"

type PageProps = {
  params: Promise<{ id: string }>
}

function formatPercent(value: unknown) {
  return `${Math.round(Number(value) * 100)}%`
}

function priorityVariant(priority: string) {
  if (priority === "MAXIMA") return "destructive" as const
  if (priority === "ALTA") return "default" as const
  return "secondary" as const
}

export default async function DiagnosticResultPage({ params }: PageProps) {
  const { id } = await params
  const context = await getSecurityContext()

  const diagnostico = await prisma.diagnosticoPlanejamento.findFirst({
    where: { id, usuarioId: context.userId },
    select: {
      id: true,
      totalQuestoes: true,
      totalCorretas: true,
      taxaAcerto: true,
      nivelGeral: true,
      criadoEm: true,
      topicos: {
        orderBy: [{ prioridade: "desc" }, { pesoPlanejamento: "desc" }],
        select: {
          id: true,
          disciplinaNome: true,
          assuntoNome: true,
          topicoNome: true,
          totalQuestoes: true,
          totalCorretas: true,
          taxaAcerto: true,
          taxaIncidencia: true,
          pesoPlanejamento: true,
          nivel: true,
          prioridade: true,
        },
      },
    },
  })

  if (!diagnostico) notFound()

  return (
    <main className="flex flex-1 flex-col bg-background/50 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <section className="space-y-3">
          <Button asChild variant="ghost" className="w-fit rounded-xl px-0">
            <Link href="/planejamento">
              <ArrowLeft className="size-4" />
              Voltar ao planejamento
            </Link>
          </Button>
          <div>
            <Badge variant="secondary" className="mb-2 rounded-xl">
              Diagnostico gerado
            </Badge>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Resultado do simulado diagnostico
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Agora o plano de estudo deve priorizar os topicos com baixo
              desempenho e alta incidencia historica.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <SummaryCard
            label="Acertos"
            value={`${diagnostico.totalCorretas}/${diagnostico.totalQuestoes}`}
          />
          <SummaryCard
            label="Taxa de acerto"
            value={formatPercent(diagnostico.taxaAcerto)}
          />
          <SummaryCard label="Nivel geral" value={diagnostico.nivelGeral} />
          <SummaryCard
            label="Topicos avaliados"
            value={String(diagnostico.topicos.length)}
          />
        </section>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <BookOpen className="size-4" />
              Disponibilidade para o plano
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action={generateLessonPlan.bind(null, diagnostico.id)}
              className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
            >
              <div className="space-y-2">
                <Label htmlFor="horasPorDia" className="text-xs font-medium">
                  Horas por dia
                </Label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="horasPorDia"
                    name="horasPorDia"
                    type="number"
                    min="0.5"
                    max="12"
                    step="0.5"
                    defaultValue="2"
                    required
                    className="rounded-xl pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diasPorSemana" className="text-xs font-medium">
                  Dias por semana
                </Label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="diasPorSemana"
                    name="diasPorSemana"
                    type="number"
                    min="1"
                    max="7"
                    step="1"
                    defaultValue="5"
                    required
                    className="rounded-xl pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataInicio" className="text-xs font-medium">
                  Inicio
                </Label>
                <Input
                  id="dataInicio"
                  name="dataInicio"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl md:w-auto">
                <BookOpen className="size-4" />
                Gerar plano
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Target className="size-4" />
              Prioridade de estudo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {diagnostico.topicos.map((topico) => (
              <div
                key={topico.id}
                className="rounded-xl border border-border/60 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {topico.disciplinaNome} / {topico.assuntoNome}
                    </p>
                    <h2 className="mt-1 text-sm font-semibold">
                      {topico.topicoNome}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={priorityVariant(topico.prioridade)}
                      className="rounded-xl"
                    >
                      {topico.prioridade}
                    </Badge>
                    <Badge variant="outline" className="rounded-xl">
                      {topico.nivel}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <Metric
                    label="Desempenho"
                    value={formatPercent(topico.taxaAcerto)}
                    progress={Number(topico.taxaAcerto) * 100}
                  />
                  <Metric
                    label="Incidencia"
                    value={formatPercent(topico.taxaIncidencia)}
                    progress={Number(topico.taxaIncidencia) * 100}
                  />
                  <Metric
                    label="Peso no plano"
                    value={formatPercent(topico.pesoPlanejamento)}
                    progress={Number(topico.pesoPlanejamento) * 100}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  )
}

function Metric({
  label,
  value,
  progress,
}: {
  label: string
  value: string
  progress: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <Progress value={progress} />
    </div>
  )
}
