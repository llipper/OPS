import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, CalendarDays, ListChecks } from "lucide-react"

import { prisma } from "@workspace/database"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Progress } from "@workspace/ui/components/progress"
import { getSecurityContext } from "@/lib/auth/get-security-context"

type PageProps = {
  params: Promise<{ id: string }>
}

type LessonPlan = {
  titulo: string
  resumo: {
    nivelGeral: string
    taxaAcerto: number
    totalAulas: number
    totalQuestoesRecomendadas: number
    horasEstimadas?: number
    totalDiasEstudo?: number
    totalSemanas?: number
  }
  disponibilidade?: {
    horasPorDia: number
    diasPorSemana: number
    cargaSemanalHoras: number
    dataInicio: string
    dataFinalPrevista: string
  }
  aulas: Array<{
    ordem: number
    disciplina: string
    assunto: string
    topico: string
    prioridade: string
    nivel: string
    desempenho: number
    incidencia: number
    peso: number
    aulas: number
    questoes: number
    acao: string
    tempoMinutos?: number
  }>
  cronograma: Array<{
    dia: number
    semana?: number
    data?: string
    titulo: string
    foco: string
    disciplina?: string
    disciplinas?: string[]
    tempoMinutos?: number
    tarefas: string[]
  }>
}

function asLessonPlan(value: unknown): LessonPlan | null {
  if (!value || typeof value !== "object") return null
  const plan = value as Partial<LessonPlan>
  if (!Array.isArray(plan.aulas) || !Array.isArray(plan.cronograma)) return null
  return plan as LessonPlan
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

function priorityVariant(priority: string) {
  if (priority === "MAXIMA") return "destructive" as const
  if (priority === "ALTA") return "default" as const
  return "secondary" as const
}

function formatDate(value?: string) {
  if (!value) return "-"
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`))
}

function formatMinutes(value?: number) {
  if (!value) return "-"
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  if (hours === 0) return `${minutes}min`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}min`
}

export default async function LessonPlanPage({ params }: PageProps) {
  const { id } = await params
  const context = await getSecurityContext()

  const diagnostico = await prisma.diagnosticoPlanejamento.findFirst({
    where: { id, usuarioId: context.userId },
    select: {
      id: true,
      recomendacoes: true,
    },
  })

  const plan = asLessonPlan(diagnostico?.recomendacoes)

  if (!diagnostico || !plan) notFound()

  return (
    <main className="flex flex-1 flex-col bg-background/50 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-6">
        <section className="space-y-3">
          <Button asChild variant="ghost" className="w-fit rounded-xl px-0">
            <Link href={`/planejamento/diagnostico/${diagnostico.id}`}>
              <ArrowLeft className="size-4" />
              Voltar ao diagnostico
            </Link>
          </Button>
          <div>
            <Badge variant="secondary" className="mb-2 rounded-xl">
              Plano gerado
            </Badge>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {plan.titulo}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Sequencia de aulas e tarefas priorizada pelo desempenho no
              simulado e pela incidencia historica dos topicos.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <SummaryCard label="Nivel" value={plan.resumo.nivelGeral} />
          <SummaryCard
            label="Prazo previsto"
            value={formatDate(plan.disponibilidade?.dataFinalPrevista)}
          />
          <SummaryCard
            label="Dias de estudo"
            value={String(plan.resumo.totalDiasEstudo ?? plan.cronograma.length)}
          />
          <SummaryCard
            label="Horas estimadas"
            value={`${plan.resumo.horasEstimadas ?? "-"}h`}
          />
        </section>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="grid gap-4 p-5 md:grid-cols-4">
            <SmallStat
              label="Disponibilidade"
              value={`${plan.disponibilidade?.horasPorDia ?? "-"}h/dia`}
            />
            <SmallStat
              label="Frequencia"
              value={`${plan.disponibilidade?.diasPorSemana ?? "-"} dias/semana`}
            />
            <SmallStat
              label="Carga semanal"
              value={`${plan.disponibilidade?.cargaSemanalHoras ?? "-"}h`}
            />
            <SmallStat
              label="Periodo"
              value={`${formatDate(plan.disponibilidade?.dataInicio)} ate ${formatDate(plan.disponibilidade?.dataFinalPrevista)}`}
            />
          </CardContent>
        </Card>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <BookOpen className="size-4" />
                Aulas prioritarias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.aulas.map((lesson) => (
                <div
                  key={`${lesson.ordem}-${lesson.topico}`}
                  className="rounded-xl border border-border/60 p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {lesson.disciplina} / {lesson.assunto}
                      </p>
                      <h2 className="mt-1 text-sm font-semibold">
                        {lesson.ordem}. {lesson.topico}
                      </h2>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {lesson.acao}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={priorityVariant(lesson.prioridade)}
                        className="rounded-xl"
                      >
                        {lesson.prioridade}
                      </Badge>
                      <Badge variant="outline" className="rounded-xl">
                        {lesson.aulas} aula(s)
                      </Badge>
                      <Badge variant="outline" className="rounded-xl">
                        {lesson.questoes} questoes
                      </Badge>
                      <Badge variant="outline" className="rounded-xl">
                        {formatMinutes(lesson.tempoMinutos)}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <Metric
                      label="Desempenho"
                      value={formatPercent(lesson.desempenho)}
                      progress={lesson.desempenho * 100}
                    />
                    <Metric
                      label="Incidencia"
                      value={formatPercent(lesson.incidencia)}
                      progress={lesson.incidencia * 100}
                    />
                    <Metric
                      label="Peso"
                      value={formatPercent(lesson.peso)}
                      progress={lesson.peso * 100}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <CalendarDays className="size-4" />
                Cronograma de estudo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.cronograma.map((day) => (
                <div
                  key={`${day.dia}-${day.foco}`}
                  className="rounded-xl border border-border/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                      {day.dia}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {formatDate(day.data)} · Semana {day.semana ?? 1}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {day.foco} · {formatMinutes(day.tempoMinutos)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {day.tarefas.map((task) => (
                      <div key={task} className="flex gap-2 text-xs">
                        <ListChecks className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
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

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/50 px-4 py-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
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
