"use client"

import { useMemo, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, ClipboardCheck, FileText, SearchCheck, Upload } from "lucide-react"
import { toast } from "sonner"

import { analyzeQuestionImport, importQuestions } from "@/actions/question-import-actions"
import { FilterSelect } from "@/components/questions/filter"
import { Alert, AlertDescription, AlertTitle } from "@workspace/ui/components/alert"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

type Option = {
  id: string
  nome: string
}

type ImportQuestionOptions = {
  disciplinas: Array<
    Option & {
      assuntos: Array<
        Option & {
          topicos: Array<
            Option & {
              subtopicos: Option[]
            }
          >
        }
      >
    }
  >
  bancas: Array<Option & { sigla: string }>
  concursos: Array<Option & { ano: number | null; carreiraId: string | null; cargos: Option[] }>
  carreiras: Array<Option & { parentId: string | null }>
  niveis: Option[]
  dificuldades: Array<Option & { slug: string }>
  tiposQuestao: Array<Option & { slug: string; formato: string; quantidadeAlternativas: number | null }>
}

type Analysis = Awaited<ReturnType<typeof analyzeQuestionImport>>

type QuestionTypeChoice = {
  label: string
  value: string
  tipoId: string
  expectedAlternatives: number
  kind: "alternativas" | "certo_errado"
}

function buildQuestionTypeChoices(types: ImportQuestionOptions["tiposQuestao"]) {
  return types
    .filter((type) => type.formato === "CERTO_ERRADO" || type.formato === "ALTERNATIVAS")
    .map((type) => ({
      label: type.nome,
      value: type.id,
      tipoId: type.id,
      expectedAlternatives: type.formato === "CERTO_ERRADO" ? 2 : type.quantidadeAlternativas ?? 5,
      kind: type.formato === "CERTO_ERRADO" ? "certo_errado" : "alternativas",
    }) satisfies QuestionTypeChoice)
}

function buildAlternativeLines(quantity: number) {
  const texts = [
    "A busca pessoal independe de elemento objetivo quando realizada em área de elevada criminalidade.",
    "A fundada suspeita exige elementos concretos e justificáveis, não bastando impressão subjetiva do agente público.",
    "A inviolabilidade domiciliar impede qualquer ingresso policial sem mandado, mesmo em flagrante delito.",
    "A prisão em flagrante exige ordem judicial prévia quando ocorrer em período noturno.",
    "A autoridade policial pode afastar direito fundamental por conveniência administrativa, sem controle posterior.",
  ]

  return texts
    .slice(0, quantity)
    .map((text, index) => `${String.fromCharCode(65 + index)}) ${text}`)
    .join("\n")
}

function buildExplanationLines(quantity: number) {
  const explanations = [
    "Errada. Local de maior criminalidade não substitui a exigência de fundada suspeita concreta.",
    "Errada. A Constituição admite ingresso domiciliar em flagrante delito, desastre, socorro ou por ordem judicial durante o dia.",
    "Errada. A prisão em flagrante não depende de ordem judicial prévia.",
    "Errada. A restrição a direito fundamental exige fundamento jurídico e controle de legalidade.",
  ]

  return Array.from({ length: quantity }, (_, index) => {
    const letter = String.fromCharCode(65 + index)
    if (letter === "B") return null

    const text = index === 0 ? explanations[0] : explanations[index - 1]
    return `EXPLICAÇÃO ${letter}:\n${text}`
  })
    .filter(Boolean)
    .join("\n\n")
}

function buildSample(choice: QuestionTypeChoice) {
  if (choice.kind === "certo_errado") {
    return `QUESTÃO 1:
TEXTO DE APOIO:
Durante uma abordagem policial em local público, a equipe identifica situação de fundada suspeita e precisa agir respeitando os direitos fundamentais.

ENUNCIADO:
Com base na Constituição Federal e na jurisprudência aplicável à atividade policial, julgue o item.

C) Certo
E) Errado

GABARITO: C

RESOLUÇÃO:
O item está certo porque a atuação policial deve estar amparada por elementos objetivos, compatíveis com o controle posterior de legalidade.

EXPLICAÇÃO E:
Errada. A abordagem não pode se basear apenas em impressão subjetiva.

OBJETIVO:
Avaliar os limites constitucionais da abordagem policial.

REFERÊNCIA:
Constituição Federal, art. 5º, XI e LXI.

DICA:
Fundada suspeita exige elemento objetivo.

QUESTÃO 2:
ENUNCIADO:
Considerando as garantias constitucionais aplicáveis à investigação criminal, julgue o item.

C) Certo
E) Errado

GABARITO: E

RESOLUÇÃO:
O item está errado porque a prisão em flagrante não depende de ordem judicial prévia.

EXPLICAÇÃO C:
Errada. A afirmação confunde prisão em flagrante com prisão preventiva.

OBJETIVO:
Distinguir prisão em flagrante de prisão cautelar decretada judicialmente.

REFERÊNCIA:
Constituição Federal, art. 5º, LXI.`
  }

  return `QUESTÃO 1:
TEXTO DE APOIO:
Durante uma abordagem policial em local público, a equipe identifica situação de fundada suspeita e precisa agir respeitando os direitos fundamentais.

ENUNCIADO:
Com base na Constituição Federal e na jurisprudência aplicável à atividade policial, assinale a alternativa correta.

${buildAlternativeLines(choice.expectedAlternatives)}

GABARITO: B

RESOLUÇÃO:
A alternativa B está correta porque a atuação policial deve estar amparada por elementos objetivos, compatíveis com o controle posterior de legalidade.

${buildExplanationLines(choice.expectedAlternatives)}

OBJETIVO:
Avaliar os limites constitucionais da abordagem policial.

REFERÊNCIA:
Constituição Federal, art. 5º, XI e LXI.

DICA:
Fundada suspeita exige elemento objetivo.

QUESTÃO 2:
ENUNCIADO:
No contexto de uma investigação criminal, a equipe policial avalia a legalidade de uma prisão em flagrante. Assinale a alternativa correta.

${buildAlternativeLines(choice.expectedAlternatives)}

GABARITO: B

RESOLUÇÃO:
A alternativa B está correta porque a atuação estatal deve ser fundamentada em elementos concretos e compatíveis com o controle de legalidade.

${buildExplanationLines(choice.expectedAlternatives)}

OBJETIVO:
Distinguir prisão em flagrante de prisão cautelar decretada judicialmente.

REFERÊNCIA:
Constituição Federal, art. 5º, LXI.`
}

export function ImportQuestionsForm({ options }: { options: ImportQuestionOptions }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()
  const questionTypeChoices = useMemo(() => buildQuestionTypeChoices(options.tiposQuestao), [options.tiposQuestao])
  const initialQuestionType = questionTypeChoices[0]
  const [content, setContent] = useState("")
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imported, setImported] = useState<number | null>(null)
  const [defaults, setDefaults] = useState({
    disciplinaId: "",
    assuntoId: "",
    topicoId: "",
    subtopicoId: "",
    bancaId: "",
    concursoId: "",
    carreiraId: "",
    nivelId: "",
    dificuldadeId: "",
    tipoId: initialQuestionType?.tipoId ?? "",
    type: initialQuestionType?.value ?? "",
    cargo: "",
    year: String(new Date().getFullYear()),
    isUnique: "sim" as "sim" | "nao",
    tipoCobranca: "lei_seca",
    visibilidade: "privada" as "publica" | "privada" | "restrita",
  })

  const selectedDisciplina = options.disciplinas.find((item) => item.id === defaults.disciplinaId)
  const selectedAssunto = selectedDisciplina?.assuntos.find((item) => item.id === defaults.assuntoId)
  const selectedTopico = selectedAssunto?.topicos.find((item) => item.id === defaults.topicoId)

  const assuntoOptions = selectedDisciplina?.assuntos.map((item) => ({ label: item.nome, value: item.id })) ?? []
  const topicoOptions = selectedAssunto?.topicos.map((item) => ({ label: item.nome, value: item.id })) ?? []
  const subtopicoOptions = selectedTopico?.subtopicos.map((item) => ({ label: item.nome, value: item.id })) ?? []

  const selectedConcurso = options.concursos.find((item) => item.id === defaults.concursoId)
  const cargoOptions = selectedConcurso?.cargos.map((item) => ({ label: item.nome, value: item.nome })) ?? []
  const selectedQuestionType = questionTypeChoices.find((item) => item.value === defaults.type) ?? questionTypeChoices[0]

  const canImport = Boolean(analysis && analysis.errors === 0 && content.trim())

  const payload = useMemo(
    () => ({
      content,
      defaults: {
        disciplinaId: defaults.disciplinaId,
        assuntoId: defaults.assuntoId,
        topicoId: defaults.topicoId,
        subtopicoId: defaults.subtopicoId,
        bancaId: defaults.bancaId,
        concursoId: defaults.concursoId,
        carreiraId: defaults.carreiraId,
        nivelId: defaults.nivelId,
        dificuldadeId: defaults.dificuldadeId,
        tipoId: defaults.tipoId,
        expectedAlternatives: selectedQuestionType?.expectedAlternatives ?? null,
        cargo: defaults.cargo,
        year: defaults.year,
        isUnique: defaults.isUnique,
        tipoCobranca: defaults.tipoCobranca,
        visibilidade: defaults.visibilidade,
      },
    }),
    [content, defaults, selectedQuestionType]
  )

  function changeDefault(field: keyof typeof defaults, value: string) {
    setDefaults((current) => {
      const next = { ...current, [field]: value }

      if (field === "type") {
        next.tipoId = questionTypeChoices.find((item) => item.value === value)?.tipoId ?? ""
      }

      if (field === "disciplinaId") {
        next.assuntoId = ""
        next.topicoId = ""
        next.subtopicoId = ""
      }

      if (field === "assuntoId") {
        next.topicoId = ""
        next.subtopicoId = ""
      }

      if (field === "topicoId") {
        next.subtopicoId = ""
      }

      if (field === "concursoId") {
        const concurso = options.concursos.find((item) => item.id === value)
        next.cargo = concurso?.cargos[0]?.nome ?? ""
        next.carreiraId = concurso?.carreiraId ?? current.carreiraId
        next.year = concurso?.ano ? String(concurso.ano) : current.year
      }

      return next
    })
    setAnalysis(null)
    setImported(null)
  }

  function runAnalysis() {
    setError(null)
    setImported(null)

    startTransition(async () => {
      try {
        const result = await analyzeQuestionImport(payload)
        setAnalysis(result)
        toast.success(`${result.total} questão(ões) analisada(s).`)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Não foi possível analisar o lote."
        setError(message)
        toast.error(message)
      }
    })
  }

  function runImport() {
    setError(null)

    startTransition(async () => {
      try {
        const result = await importQuestions(payload)
        setImported(result.imported)
        setContent("")
        setAnalysis(null)
        toast.success(`${result.imported} questão(ões) importada(s) como rascunho.`)
        router.push("/admin/questoes/revisar")
      } catch (err) {
        const message = err instanceof Error ? err.message : "Não foi possível importar o lote."
        setError(message)
        toast.error(message)
      }
    })
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return
    if (!file.name.toLowerCase().endsWith(".txt")) {
      setError("Nesta versão, envie arquivo .txt ou cole o texto diretamente.")
      return
    }
    if (file.size > 1_000_000) {
      setError("O arquivo deve ter no máximo 1MB.")
      return
    }

    setContent((await file.text()).trim())
    setAnalysis(null)
    setImported(null)
    setError(null)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Button asChild variant="ghost" size="sm" className="px-0">
            <Link href="/admin/questoes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para questões
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Importar questões</h1>
            <p className="text-sm text-muted-foreground">
              Analise lotes do professor antes de gravar no banco. Questões entram como rascunho para revisão editorial.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <input ref={fileInputRef} type="file" accept=".txt,text/plain" className="hidden" onChange={handleFileChange} />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Enviar .txt
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (selectedQuestionType) {
                setContent(buildSample(selectedQuestionType))
              }
              setAnalysis(null)
              setImported(null)
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            Usar exemplo
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Importação bloqueada</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {imported !== null && (
        <Alert>
          <ClipboardCheck className="h-4 w-4" />
          <AlertTitle>Lote importado</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
            <span>{imported} questão(ões) foram criadas como rascunho.</span>
            <Button asChild size="sm" variant="outline">
              <Link href="/admin/questoes/revisar">Ver rascunhos</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Classificação padrão do lote</CardTitle>
          <CardDescription>Esses metadados serão aplicados a todas as questões coladas abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <FilterSelect
            label="Disciplina"
            placeholder="Selecione"
            options={options.disciplinas.map((item) => ({ label: item.nome, value: item.id }))}
            isMulti={false}
            value={defaults.disciplinaId}
            onValueChange={(value) => changeDefault("disciplinaId", value)}
          />
          <FilterSelect
            label="Assunto"
            placeholder={defaults.disciplinaId ? "Selecione" : "Selecione disciplina"}
            options={assuntoOptions}
            disabled={!defaults.disciplinaId}
            isMulti={false}
            value={defaults.assuntoId}
            onValueChange={(value) => changeDefault("assuntoId", value)}
          />
          <FilterSelect
            label="Tópico"
            placeholder={defaults.assuntoId ? "Selecione" : "Selecione assunto"}
            options={topicoOptions}
            disabled={!defaults.assuntoId}
            isMulti={false}
            value={defaults.topicoId}
            onValueChange={(value) => changeDefault("topicoId", value)}
          />
          <FilterSelect
            label="Subtópico"
            placeholder={defaults.topicoId ? "Selecione" : "Selecione tópico"}
            options={subtopicoOptions}
            disabled={!defaults.topicoId}
            isMulti={false}
            value={defaults.subtopicoId}
            onValueChange={(value) => changeDefault("subtopicoId", value)}
          />
          <FilterSelect
            label="Banca"
            placeholder="Selecione"
            options={options.bancas.map((item) => ({ label: item.sigla || item.nome, value: item.id }))}
            isMulti={false}
            value={defaults.bancaId}
            onValueChange={(value) => changeDefault("bancaId", value)}
          />
          <FilterSelect
            label="Concurso"
            placeholder="Selecione"
            options={options.concursos.map((item) => ({
              label: item.ano ? `${item.nome} (${item.ano})` : item.nome,
              value: item.id,
            }))}
            isMulti={false}
            value={defaults.concursoId}
            onValueChange={(value) => changeDefault("concursoId", value)}
          />
          <FilterSelect
            label="Cargo"
            placeholder="Selecione ou digite"
            options={cargoOptions}
            isMulti={false}
            value={defaults.cargo}
            onValueChange={(value) => changeDefault("cargo", value)}
          />
          <FilterSelect
            label="Carreira/órgão"
            placeholder="Selecione"
            options={options.carreiras.map((item) => ({ label: item.nome, value: item.id }))}
            isMulti={false}
            value={defaults.carreiraId}
            onValueChange={(value) => changeDefault("carreiraId", value)}
          />
          <FilterSelect
            label="Escolaridade"
            placeholder="Selecione"
            options={options.niveis.map((item) => ({ label: item.nome, value: item.id }))}
            isMulti={false}
            value={defaults.nivelId}
            onValueChange={(value) => changeDefault("nivelId", value)}
          />
          <FilterSelect
            label="Dificuldade"
            placeholder="Selecione"
            options={options.dificuldades.map((item) => ({ label: item.nome, value: item.id }))}
            isMulti={false}
            value={defaults.dificuldadeId}
            onValueChange={(value) => changeDefault("dificuldadeId", value)}
          />
          <FilterSelect
            label="Tipo"
            placeholder="Selecione"
            options={questionTypeChoices.map((item) => ({ label: item.label, value: item.value }))}
            isMulti={false}
            value={defaults.type}
            onValueChange={(value) => changeDefault("type", value)}
          />
          <FilterSelect
            label="Cobrança"
            placeholder="Selecione"
            options={[
              { label: "Lei seca", value: "lei_seca" },
              { label: "Doutrina", value: "doutrina" },
              { label: "Jurisprudência", value: "jurisprudencia" },
              { label: "Súmulas", value: "sumulas" },
            ]}
            isMulti={false}
            value={defaults.tipoCobranca}
            onValueChange={(value) => changeDefault("tipoCobranca", value)}
          />
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Ano</Label>
            <input
              value={defaults.year}
              onChange={(event) => changeDefault("year", event.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none"
              inputMode="numeric"
            />
          </div>
          <FilterSelect
            label="Inédita?"
            placeholder="Selecione"
            options={[
              { label: "Sim", value: "sim" },
              { label: "Não", value: "nao" },
            ]}
            isMulti={false}
            value={defaults.isUnique}
            onValueChange={(value) => changeDefault("isUnique", value)}
          />
          <FilterSelect
            label="Visibilidade"
            placeholder="Selecione"
            options={[
              { label: "Privada", value: "privada" },
              { label: "Restrita", value: "restrita" },
              { label: "Pública", value: "publica" },
            ]}
            isMulti={false}
            value={defaults.visibilidade}
            onValueChange={(value) => changeDefault("visibilidade", value)}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Conteúdo do lote</CardTitle>
            <CardDescription>Use marcadores QUESTÃO, ENUNCIADO, alternativas, GABARITO e RESOLUÇÃO.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content}
              onChange={(event) => {
                setContent(event.target.value)
                setAnalysis(null)
                setImported(null)
              }}
              placeholder={selectedQuestionType ? buildSample(selectedQuestionType) : ""}
              className="min-h-[520px] resize-y font-mono text-xs leading-relaxed"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        <Card className="h-fit shadow-none">
          <CardHeader>
            <CardTitle>Checklist técnico</CardTitle>
            <CardDescription>O importador bloqueia erros estruturais antes de gravar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-lg border p-3">Cada questão precisa de enunciado, 2 a 5 alternativas e gabarito válido.</div>
            <div className="rounded-lg border p-3">Resolução curta ou ausente gera aviso, mas não bloqueia o rascunho.</div>
            <div className="rounded-lg border p-3">Objetivo, referência, dica e videoaula devem ficar dentro de cada questão quando forem diferentes.</div>
            <div className="rounded-lg border p-3">Textos genéricos são sinalizados para revisão antes da publicação.</div>
            <div className="rounded-lg border p-3">A taxonomia selecionada é aplicada a todo o lote.</div>
          </CardContent>
        </Card>
      </div>

      {analysis && (
        <Card className="shadow-none">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>Resultado da análise</CardTitle>
                <CardDescription>
                  {analysis.total} questão(ões), {analysis.errors} erro(s), {analysis.warnings} aviso(s).
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant={analysis.errors > 0 ? "destructive" : "secondary"}>{analysis.errors} erros</Badge>
                <Badge variant="outline">{analysis.warnings} avisos</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.items.map((item) => (
              <div key={item.index} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">Questão {item.index}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.title || "Sem enunciado"}</p>
                  </div>
                  <Badge variant={item.errors.length > 0 ? "destructive" : item.warnings.length > 0 ? "outline" : "secondary"}>
                    {item.errors.length > 0 ? "Erro" : item.warnings.length > 0 ? "Aviso" : "OK"}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>Alternativas: {item.alternatives}</span>
                  <span>Gabarito: {item.correctLetter ?? "-"}</span>
                </div>
                {[...item.errors, ...item.warnings, ...item.infos].map((message) => (
                  <p key={message} className="mt-2 text-xs text-muted-foreground">
                    {message}
                  </p>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="sticky bottom-0 z-20 -mx-6 border-t bg-background/95 px-6 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {content.trim().length > 0 ? `${content.trim().length.toLocaleString("pt-BR")} caracteres no lote` : "Nenhum conteúdo colado"}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={runAnalysis} disabled={isPending || content.trim().length === 0}>
              <SearchCheck className="mr-2 h-4 w-4" />
              {isPending ? "Analisando..." : "Analisar"}
            </Button>
            <Button onClick={runImport} disabled={isPending || !canImport}>
              {isPending ? "Importando..." : "Importar rascunhos"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
