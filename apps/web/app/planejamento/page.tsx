import Link from "next/link"
import {
  AlertTriangle,
  BarChart3,
  BookOpenCheck,
  CalendarSearch,
  ClipboardList,
  FileText,
  Target,
} from "lucide-react"

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
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import { Progress } from "@workspace/ui/components/progress"

import { generateDiagnosticSimulation } from "./actions"

type PageProps = {
  searchParams: Promise<{ concursoId?: string }>
}

async function getPlanningData(concursoId?: string) {
  const concursos = await prisma.concurso.findMany({
    where: { ativo: true },
    orderBy: [{ ano: "desc" }, { nome: "asc" }],
    select: {
      id: true,
      nome: true,
      ano: true,
      carreira: { select: { nome: true } },
      _count: {
        select: {
          editais: true,
          questoes: true,
          provaQuestoes: true,
        },
      },
    },
  })

  if (!concursoId) return { concursos, targetContest: null }

  const targetContest = await prisma.concurso.findFirst({
    where: { id: concursoId, ativo: true },
    select: {
      id: true,
      nome: true,
      ano: true,
      carreiraId: true,
      carreira: { select: { nome: true } },
      _count: {
        select: {
          questoes: true,
          provaQuestoes: true,
        },
      },
    },
  })

  if (!targetContest) return { concursos, targetContest: null }

  const carreiraId = targetContest.carreiraId
  const matrixWhere = carreiraId
    ? { carreiraId }
    : { concursoId: targetContest.id }

  const edital = await prisma.editalConcurso.findFirst({
    where: { concursoId: targetContest.id },
    orderBy: { ano: "desc" },
    include: {
      disciplinas: {
        orderBy: { ordem: "asc" },
        select: {
          id: true,
          nome: true,
          quantidadeQuestoes: true,
        },
      },
    },
  })

  const [
    analyzedContests,
    topicosIncidentes,
    coverageGroups,
    matrizCount,
    provaQuestoesCount,
  ] = await Promise.all([
    carreiraId
      ? prisma.concurso.count({ where: { carreiraId } })
      : Promise.resolve(1),
    prisma.matrizIncidenciaTopico.findMany({
      where: matrixWhere,
      orderBy: [{ pesoPlanejamento: "desc" }, { totalQuestoes: "desc" }],
      take: 12,
      select: {
        id: true,
        dominio: true,
        assuntoNome: true,
        topicoNome: true,
        totalQuestoes: true,
        taxaIncidencia: true,
        pesoPlanejamento: true,
        anosAnalisados: true,
      },
    }),
    prisma.provaConcursoQuestao.groupBy({
      by: ["statusCoberturaEdital"],
      where: { concursoId: targetContest.id },
      _count: true,
    }),
    prisma.matrizIncidenciaTopico.count({ where: matrixWhere }),
    prisma.provaConcursoQuestao.count({
      where: {
        concursoId: targetContest.id,
        questaoId: { not: null },
      },
    }),
  ])

  return {
    concursos,
    targetContest,
    analyzedContests,
    edital,
    topicosIncidentes,
    coverageGroups,
    matrizCount,
    provaQuestoesCount:
      provaQuestoesCount || targetContest._count.questoes,
  }
}

function percent(value: number, total: number) {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

function formatPercent(value: unknown) {
  return `${Math.round(Number(value) * 100)}%`
}

function coverageLabel(status: string) {
  if (status === "COBERTO") return "Coberto no edital"
  if (status === "NAO_COBERTO") return "Fora do edital"
  return "Revisar cobertura"
}

function contestTitle(concurso: { nome: string; ano: number | null }) {
  return [concurso.nome, concurso.ano].filter(Boolean).join(" ")
}

function contestLabel(concurso: {
  nome: string
  ano: number | null
  carreira: { nome: string } | null
}) {
  return [concurso.nome, concurso.ano, concurso.carreira?.nome]
    .filter(Boolean)
    .join(" · ")
}

export default async function PlanejamentoPage({ searchParams }: PageProps) {
  const { concursoId } = await searchParams
  const data = await getPlanningData(concursoId)

  return (
    <main className="flex flex-1 flex-col bg-background/50 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="w-fit rounded-xl">
              Inteligencia de edital e prova
            </Badge>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Planejamento de estudo
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                Escolha o concurso-alvo para gerar um simulado diagnostico com
                base no edital, nas provas importadas e na matriz historica.
              </p>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl md:w-auto"
          >
            <Link href="/questions">
              <Target className="size-4" />
              Estudar questoes
            </Link>
          </Button>
        </section>

        <ContestPicker
          concursos={data.concursos}
          selectedConcursoId={data.targetContest?.id}
        />

        {!data.targetContest ? (
          <EmptyPlanningState hasContests={data.concursos.length > 0} />
        ) : (
          <SelectedContestPlanning data={data} />
        )}
      </div>
    </main>
  )
}

function ContestPicker({
  concursos,
  selectedConcursoId,
}: {
  concursos: Array<{
    id: string
    nome: string
    ano: number | null
    carreira: { nome: string } | null
    _count: {
      editais: number
      questoes: number
      provaQuestoes: number
    }
  }>
  selectedConcursoId?: string
}) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <CalendarSearch className="size-4" />
          Concurso-alvo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form
          action="/planejamento"
          className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div className="space-y-2">
            <Label htmlFor="concursoId" className="text-xs font-medium">
              Selecione o concurso
            </Label>
            <NativeSelect
              id="concursoId"
              name="concursoId"
              defaultValue={selectedConcursoId ?? ""}
              required
              className="w-full"
            >
              <NativeSelectOption value="">
                Escolha um concurso importado
              </NativeSelectOption>
              {concursos.map((concurso) => (
                <NativeSelectOption key={concurso.id} value={concurso.id}>
                  {contestLabel(concurso)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <Button type="submit" className="w-full rounded-xl md:w-auto">
            Analisar concurso
          </Button>
        </form>

        {concursos.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {concursos.slice(0, 6).map((concurso) => (
              <Link
                key={concurso.id}
                href={`/planejamento?concursoId=${concurso.id}`}
                className="rounded-xl border border-border/60 p-4 transition-colors hover:bg-muted/50"
              >
                <p className="text-sm font-semibold">
                  {contestTitle(concurso)}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {concurso.carreira?.nome ?? "Sem carreira vinculada"}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <SmallStat
                    label="Editais"
                    value={String(concurso._count.editais)}
                  />
                  <SmallStat
                    label="Questoes"
                    value={String(
                      concurso._count.provaQuestoes || concurso._count.questoes
                    )}
                  />
                  <SmallStat label="Ano" value={String(concurso.ano ?? "-")} />
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function EmptyPlanningState({ hasContests }: { hasContests: boolean }) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="p-6 text-sm text-muted-foreground">
        {hasContests
          ? "Selecione um concurso para montar a analise de edital, prova, simulado diagnostico e plano de estudo."
          : "Nenhum concurso foi importado ainda. Importe concursos, editais e questoes para habilitar o planejamento."}
      </CardContent>
    </Card>
  )
}

function SelectedContestPlanning({
  data,
}: {
  data: Awaited<ReturnType<typeof getPlanningData>> & {
    targetContest: NonNullable<
      Awaited<ReturnType<typeof getPlanningData>>["targetContest"]
    >
  }
}) {
  const totalQuestoesEdital =
    data.edital?.disciplinas.reduce(
      (sum, disciplina) => sum + (disciplina.quantidadeQuestoes ?? 0),
      0
    ) ?? 0
  const totalCoverage = data.coverageGroups.reduce(
    (sum, group) => sum + group._count,
    0
  )
  const coveredCount =
    data.coverageGroups.find(
      (group) => group.statusCoberturaEdital === "COBERTO"
    )?._count ?? 0
  const canGenerateSimulation = data.provaQuestoesCount > 0

  return (
    <>
      <section className="grid gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            {contestTitle(data.targetContest)}
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            O simulado diagnostico usa ate 100 questoes do banco, distribuindo a
            selecao pelo peso do edital e pelas provas importadas do concurso.
          </p>
        </div>
        <form action={generateDiagnosticSimulation}>
          <input
            type="hidden"
            name="concursoId"
            value={data.targetContest.id}
          />
          <Button
            type="submit"
            size="lg"
            disabled={!canGenerateSimulation}
            className="w-full rounded-xl md:w-auto"
          >
            <Target className="size-4" />
            Gerar simulado diagnostico
          </Button>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ClipboardList}
          label="Concursos analisados"
          value={String(data.analyzedContests)}
          detail={data.targetContest.carreira?.nome ?? "Concurso selecionado"}
        />
        <MetricCard
          icon={BookOpenCheck}
          label="Questoes no banco"
          value={String(data.provaQuestoesCount)}
          detail="Com alternativas e gabarito"
        />
        <MetricCard
          icon={BarChart3}
          label="Topicos mapeados"
          value={String(data.matrizCount)}
          detail="Matriz de incidencia"
        />
        <MetricCard
          icon={FileText}
          label="Cobertura edital"
          value={`${percent(coveredCount, totalCoverage)}%`}
          detail={`${coveredCount}/${totalCoverage} ocorrencias cobertas`}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Peso do edital {data.edital?.ano ?? data.targetContest.ano ?? ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.edital?.disciplinas.length ? (
              data.edital.disciplinas.map((disciplina) => {
                const count = disciplina.quantidadeQuestoes ?? 0
                return (
                  <div key={disciplina.id} className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="min-w-0 truncate font-medium">
                        {disciplina.nome}
                      </span>
                      <span className="shrink-0 text-muted-foreground">
                        {count || "-"} questoes
                      </span>
                    </div>
                    <Progress value={percent(count, totalQuestoesEdital)} />
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-muted-foreground">
                Este concurso ainda nao tem edital estruturado no banco.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Edital versus prova
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.coverageGroups.length ? (
              data.coverageGroups.map((group) => (
                <div
                  key={group.statusCoberturaEdital}
                  className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-muted">
                      <AlertTriangle className="size-4 text-muted-foreground" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">
                        {coverageLabel(group.statusCoberturaEdital)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Comparacao com o conteudo programatico
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-xl">
                    {group._count}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Ainda nao ha ocorrencias de prova classificadas para este
                concurso.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Topicos que mais pesam no planejamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.topicosIncidentes.length ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {data.topicosIncidentes.map((topico) => (
                <div
                  key={topico.id}
                  className="rounded-xl border border-border/60 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 space-y-1">
                      <p className="truncate text-xs font-medium text-muted-foreground">
                        {topico.dominio} / {topico.assuntoNome}
                      </p>
                      <h2 className="text-sm font-semibold">
                        {topico.topicoNome}
                      </h2>
                    </div>
                    <Badge className="shrink-0 rounded-xl">
                      {formatPercent(topico.pesoPlanejamento)}
                    </Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <SmallStat
                      label="Questoes"
                      value={String(topico.totalQuestoes)}
                    />
                    <SmallStat
                      label="Anos"
                      value={topico.anosAnalisados.join(", ") || "-"}
                    />
                    <SmallStat
                      label="Incidencia"
                      value={formatPercent(topico.taxaIncidencia)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              A matriz de incidencia deste concurso ainda nao foi gerada.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  detail: string
}) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <p className="truncate text-xs text-muted-foreground">{detail}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 px-3 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  )
}
