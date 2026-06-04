"use client"

import { useMemo, useState, useTransition, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { BarChart3, BookOpen, Check, ChevronsUpDown, FileText, Flag, MessageSquare, Plus, Save, Search, Star, Trash2, Video } from "lucide-react"

import { createTeacherNotebook } from "@/actions/notebook-actions"
import { QuestionHeader } from "@/components/questions/card/components/question-header"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

type BuilderOptions = Awaited<ReturnType<typeof import("@/actions/notebook-actions").getTeacherNotebookBuilderOptions>>

type AlternativeDraft = {
  letter: string
  text: string
  isCorrect: boolean
  explanation: string
}

type QuestionDraft = {
  assuntoId: string
  topicoId: string
  subtopicoId: string
  tipoId: string
  dificuldadeId: string
  textoApoio: string
  enunciado: string
  resolucao: string
  alternativas: AlternativeDraft[]
}

type ComboOption = {
  value: string
  label: string
  hint?: string | null
}

const NONE = "__none"
const LETTERS = ["A", "B", "C", "D", "E"]

function emptyAlternatives(total: number): AlternativeDraft[] {
  return LETTERS.slice(0, total).map((letter, index) => ({
    letter,
    text: "",
    isCorrect: index === 0,
    explanation: "",
  }))
}

function getTypeAlternativeCount(type?: BuilderOptions["tiposQuestao"][number]) {
  if (!type) return 5
  if (type.formato.toLowerCase().includes("certo")) return 2
  return Math.min(Math.max(type.quantidadeAlternativas ?? 5, 2), 5)
}

function createEmptyQuestion(options: BuilderOptions): QuestionDraft {
  const firstType = options.tiposQuestao[0]
  const firstDifficulty = options.dificuldades[0]

  return {
    assuntoId: "",
    topicoId: "",
    subtopicoId: "",
    tipoId: firstType?.id ?? "",
    dificuldadeId: firstDifficulty?.id ?? "",
    textoApoio: "",
    enunciado: "",
    resolucao: "",
    alternativas: emptyAlternatives(getTypeAlternativeCount(firstType)),
  }
}

function optionValue(value?: string | null) {
  return value && value.length > 0 ? value : NONE
}

function normalizeValue(value: string) {
  return value === NONE ? "" : value
}

export function TeacherNotebookBuilder({ options }: { options: BuilderOptions }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedConcursoId, setSelectedConcursoId] = useState(options.concursos[0]?.id ?? "")
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState(options.disciplinas[0]?.id ?? "")
  const [selectedBancaId, setSelectedBancaId] = useState("")
  const [questions, setQuestions] = useState<QuestionDraft[]>([createEmptyQuestion(options)])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFinishOpen, setIsFinishOpen] = useState(false)
  const [notebookTitle, setNotebookTitle] = useState("")
  const [notebookDescription, setNotebookDescription] = useState("")

  const selectedConcurso = options.concursos.find((item) => item.id === selectedConcursoId)
  const selectedDisciplina = options.disciplinas.find((item) => item.id === selectedDisciplinaId)
  const selectedBanca = options.bancas.find((item) => item.id === selectedBancaId)
  const currentQuestion = questions[currentIndex] ?? questions[0] ?? createEmptyQuestion(options)

  const assuntos = selectedDisciplina?.assuntos ?? []
  const selectedAssunto = assuntos.find((item) => item.id === currentQuestion.assuntoId)
  const topicos = selectedAssunto?.topicos ?? []
  const selectedTopico = topicos.find((item) => item.id === currentQuestion.topicoId)
  const subtopicos = selectedTopico?.subtopicos ?? []
  const selectedDifficulty = options.dificuldades.find((item) => item.id === currentQuestion.dificuldadeId)

  const concursoOptions = useMemo<ComboOption[]>(
    () =>
      options.concursos.map((concurso) => ({
        value: concurso.id,
        label: `${concurso.nome}${concurso.ano ? ` (${concurso.ano})` : ""}`,
        hint: concurso.cargos.map((cargo) => cargo.nome).join(", "),
      })),
    [options.concursos]
  )

  const disciplinaOptions = useMemo<ComboOption[]>(
    () => options.disciplinas.map((disciplina) => ({ value: disciplina.id, label: disciplina.nome, hint: disciplina.sigla })),
    [options.disciplinas]
  )

  const bancaOptions = useMemo<ComboOption[]>(
    () => [
      { value: NONE, label: "Sem banca definida" },
      ...options.bancas.map((banca) => ({ value: banca.id, label: banca.sigla || banca.nome, hint: banca.nome })),
    ],
    [options.bancas]
  )

  function updateCurrentQuestion(nextQuestion: Partial<QuestionDraft>) {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === currentIndex
          ? {
              ...question,
              ...nextQuestion,
            }
          : question
      )
    )
  }

  function updateAlternative(letter: string, patch: Partial<AlternativeDraft>) {
    updateCurrentQuestion({
      alternativas: currentQuestion.alternativas.map((alternative) =>
        alternative.letter === letter ? { ...alternative, ...patch } : alternative
      ),
    })
  }

  function handleTypeChange(typeId: string) {
    const selectedType = options.tiposQuestao.find((item) => item.id === typeId)
    const nextCount = getTypeAlternativeCount(selectedType)
    const currentAlternatives = currentQuestion.alternativas
    const nextAlternatives = emptyAlternatives(nextCount).map((alternative, index) => ({
      ...alternative,
      text: currentAlternatives[index]?.text ?? "",
      isCorrect: currentAlternatives[index]?.isCorrect ?? index === 0,
      explanation: currentAlternatives[index]?.explanation ?? "",
    }))

    if (nextAlternatives[0] && !nextAlternatives.some((alternative) => alternative.isCorrect)) {
      nextAlternatives[0].isCorrect = true
    }

    updateCurrentQuestion({ tipoId: typeId, alternativas: nextAlternatives })
  }

  function handleCorrectChange(letter: string) {
    updateCurrentQuestion({
      alternativas: currentQuestion.alternativas.map((alternative) => ({
        ...alternative,
        isCorrect: alternative.letter === letter,
        explanation: alternative.letter === letter ? "" : alternative.explanation,
      })),
    })
  }

  function handleNextQuestion() {
    const nextQuestion = {
      ...createEmptyQuestion(options),
      assuntoId: currentQuestion.assuntoId,
      topicoId: currentQuestion.topicoId,
      subtopicoId: currentQuestion.subtopicoId,
      tipoId: currentQuestion.tipoId,
      dificuldadeId: currentQuestion.dificuldadeId,
    }

    setQuestions((prev) => [...prev, nextQuestion])
    setCurrentIndex(questions.length)
    toast.success("Nova questão adicionada ao caderno.")
  }

  function handleRemoveQuestion() {
    if (questions.length === 1) {
      toast.error("O caderno precisa ter pelo menos uma questão.")
      return
    }

    setQuestions((prev) => prev.filter((_, index) => index !== currentIndex))
    setCurrentIndex((index) => Math.max(index - 1, 0))
  }

  function validateBeforeFinish() {
    if (!selectedConcursoId || !selectedDisciplinaId) return "Selecione concurso e disciplina."

    const invalidIndex = questions.findIndex((question) => {
      const hasCorrect = question.alternativas.filter((alternative) => alternative.isCorrect).length === 1
      const hasWrongExplanations = question.alternativas
        .filter((alternative) => !alternative.isCorrect)
        .every((alternative) => alternative.explanation.trim().length > 0)

      return (
        !question.enunciado.trim() ||
        !question.resolucao.trim() ||
        question.alternativas.some((alternative) => !alternative.text.trim()) ||
        !hasCorrect ||
        !hasWrongExplanations
      )
    })

    if (invalidIndex >= 0) {
      return `Revise a questão ${invalidIndex + 1}: enunciado, alternativas, gabarito, resolução e explicações das erradas são obrigatórios.`
    }

    return null
  }

  function openFinishDialog() {
    const error = validateBeforeFinish()
    if (error) {
      toast.error(error)
      return
    }

    setNotebookTitle(notebookTitle || `${selectedConcurso?.nome ?? "Concurso"} - ${selectedDisciplina?.nome ?? "Disciplina"}`)
    setIsFinishOpen(true)
  }

  function handleSaveNotebook() {
    if (!notebookTitle.trim()) {
      toast.error("Informe o nome do caderno.")
      return
    }

    startTransition(async () => {
      try {
        await createTeacherNotebook({
          titulo: notebookTitle,
          descricao: notebookDescription,
          concursoId: selectedConcursoId,
          disciplinaId: selectedDisciplinaId,
          bancaId: selectedBancaId || null,
          carreiraId: selectedConcurso?.carreiraId ?? null,
          nivelId: selectedConcurso?.nivelEducacionalId ?? null,
          ano: selectedConcurso?.ano ?? new Date().getFullYear(),
          questions: questions.map((question) => ({
            assuntoId: question.assuntoId || null,
            topicoId: question.topicoId || null,
            subtopicoId: question.subtopicoId || null,
            tipoId: question.tipoId || null,
            dificuldadeId: question.dificuldadeId || null,
            textoApoio: question.textoApoio,
            enunciado: question.enunciado,
            resolucao: question.resolucao,
            alternativas: question.alternativas,
          })),
        })

        toast.success("Caderno salvo como rascunho para revisão.")
        router.push("/admin/cadernos")
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Não foi possível salvar o caderno.")
      }
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Criar caderno do aluno</h1>
          <p className="text-sm text-muted-foreground">
            Monte questões inéditas diretamente no card que será revisado e publicado para o aluno.
          </p>
        </div>
        <Button onClick={openFinishDialog} disabled={isPending}>
          <Save className="mr-2 h-4 w-4" />
          Finalizar caderno
        </Button>
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Filtro base do professor</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Field label="Concurso">
            <SearchCombobox
              options={concursoOptions}
              value={selectedConcursoId}
              placeholder="Buscar concurso"
              onChange={setSelectedConcursoId}
            />
          </Field>

          <Field label="Disciplina">
            <SearchCombobox
              options={disciplinaOptions}
              value={selectedDisciplinaId}
              placeholder="Buscar disciplina"
              onChange={(value) => {
                setSelectedDisciplinaId(value)
                updateCurrentQuestion({ assuntoId: "", topicoId: "", subtopicoId: "" })
              }}
            />
          </Field>

          <Field label="Instituição/Banca">
            <SearchCombobox
              options={bancaOptions}
              value={selectedBancaId || NONE}
              placeholder="Buscar banca"
              onChange={(value) => setSelectedBancaId(normalizeValue(value))}
            />
          </Field>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="h-fit shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Questão {currentIndex + 1}</CardTitle>
              <p className="text-xs text-muted-foreground">{questions.length} questão(ões) no caderno</p>
            </div>
            <Button variant="outline" size="icon-sm" onClick={handleRemoveQuestion} aria-label="Remover questão">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Assunto">
              <Select
                value={optionValue(currentQuestion.assuntoId)}
                onValueChange={(value) =>
                  updateCurrentQuestion({ assuntoId: normalizeValue(value), topicoId: "", subtopicoId: "" })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assunto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Sem assunto</SelectItem>
                  {assuntos.map((assunto) => (
                    <SelectItem key={assunto.id} value={assunto.id}>
                      {assunto.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Tópico">
              <Select
                value={optionValue(currentQuestion.topicoId)}
                onValueChange={(value) => updateCurrentQuestion({ topicoId: normalizeValue(value), subtopicoId: "" })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tópico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Sem tópico</SelectItem>
                  {topicos.map((topico) => (
                    <SelectItem key={topico.id} value={topico.id}>
                      {topico.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Subtópico">
              <Select value={optionValue(currentQuestion.subtopicoId)} onValueChange={(value) => updateCurrentQuestion({ subtopicoId: normalizeValue(value) })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Subtópico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Sem subtópico</SelectItem>
                  {subtopicos.map((subtopico) => (
                    <SelectItem key={subtopico.id} value={subtopico.id}>
                      {subtopico.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Tipo">
              <Select value={optionValue(currentQuestion.tipoId)} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {options.tiposQuestao.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Dificuldade">
              <Select value={optionValue(currentQuestion.dificuldadeId)} onValueChange={(value) => updateCurrentQuestion({ dificuldadeId: normalizeValue(value) })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  {options.dificuldades.map((dificuldade) => (
                    <SelectItem key={dificuldade.id} value={dificuldade.id}>
                      {dificuldade.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <div className="flex flex-wrap gap-2 border-t pt-4">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  type="button"
                  variant={index === currentIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentIndex(index)}
                >
                  Q{index + 1}
                </Button>
              ))}
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={handleNextQuestion}>
              <Plus className="mr-2 h-4 w-4" />
              Próxima questão
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Preview editável do aluno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EditableQuestionPreview
              question={currentQuestion}
              discipline={selectedDisciplina?.nome ?? "Disciplina"}
              subject={selectedAssunto?.nome}
              topic={selectedTopico?.nome}
              difficulty={selectedDifficulty?.slug ?? selectedDifficulty?.nome ?? ""}
              year={selectedConcurso?.ano ?? undefined}
              board={selectedBanca?.sigla || selectedBanca?.nome}
              institution={selectedConcurso?.nome}
              onQuestionChange={updateCurrentQuestion}
              onAlternativeChange={updateAlternative}
              onCorrectChange={handleCorrectChange}
            />
          </CardContent>
        </Card>
      </div>

      <Dialog open={isFinishOpen} onOpenChange={setIsFinishOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Finalizar caderno</DialogTitle>
            <DialogDescription>
              O caderno será salvo como privado, e as questões entrarão como rascunho para revisão antes da publicação.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Field label="Nome do caderno">
              <Input value={notebookTitle} onChange={(event) => setNotebookTitle(event.target.value)} />
            </Field>
            <Field label="Detalhe opcional">
              <Textarea
                value={notebookDescription}
                onChange={(event) => setNotebookDescription(event.target.value)}
                placeholder="Ex: Caderno inicial de controle de constitucionalidade para PPCE 2026."
              />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFinishOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveNotebook} disabled={isPending}>
              Salvar caderno
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EditableQuestionPreview({
  question,
  discipline,
  subject,
  topic,
  difficulty,
  year,
  board,
  institution,
  onQuestionChange,
  onAlternativeChange,
  onCorrectChange,
}: {
  question: QuestionDraft
  discipline: string
  subject?: string
  topic?: string
  difficulty: string
  year?: number
  board?: string | null
  institution?: string
  onQuestionChange: (patch: Partial<QuestionDraft>) => void
  onAlternativeChange: (letter: string, patch: Partial<AlternativeDraft>) => void
  onCorrectChange: (letter: string) => void
}) {
  const correctAlternative = question.alternativas.find((alternative) => alternative.isCorrect)

  return (
    <div className="overflow-hidden rounded-2xl border bg-background">
      <QuestionHeader
        code="Q automático"
        discipline={discipline}
        subject={subject}
        topic={topic}
        supportText={null}
        difficulty={difficulty}
        isUnique
        year={year}
        board={board}
        institution={institution}
      />

      <div className="space-y-7 p-6">
        <EditablePlainTextarea
          value={question.textoApoio}
          onChange={(value) => onQuestionChange({ textoApoio: value })}
          placeholder="Texto de apoio opcional. Clique aqui para digitar quando a questão precisar."
          className="min-h-16 text-sm text-muted-foreground"
        />

        <EditablePlainTextarea
          value={question.enunciado}
          onChange={(value) => onQuestionChange({ enunciado: value })}
          placeholder="Clique aqui e digite o enunciado da questão como ele aparecerá para o aluno."
          className="min-h-12 text-base font-semibold text-foreground"
        />

        <div className="space-y-4">
          {question.alternativas.map((alternative) => (
            <div key={alternative.letter} className="group flex items-center gap-3">
              <button
                type="button"
                className="text-muted-foreground/60 transition hover:text-destructive"
                aria-label={`Limpar alternativa ${alternative.letter}`}
                onClick={() => onAlternativeChange(alternative.letter, { text: "", explanation: "" })}
              >
                ×
              </button>
              <div
                className={cn(
                  "flex min-h-14 flex-1 items-center gap-3 rounded-xl border px-4 transition",
                  alternative.isCorrect ? "border-primary/50 bg-primary/5" : "border-border/60 hover:border-primary/30"
                )}
              >
                <button
                  type="button"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold",
                    alternative.isCorrect
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40 text-muted-foreground"
                  )}
                  onClick={() => onCorrectChange(alternative.letter)}
                  aria-label={`Marcar alternativa ${alternative.letter} como gabarito`}
                >
                  {alternative.isCorrect ? <Check className="h-3.5 w-3.5" /> : alternative.letter}
                </button>
                <EditablePlainTextarea
                  value={alternative.text}
                  onChange={(value) => onAlternativeChange(alternative.letter, { text: value })}
                  placeholder={`Digite a alternativa ${alternative.letter}`}
                  className="min-h-9 flex-1 py-2 text-base font-semibold"
                />
              </div>
            </div>
          ))}
        </div>

        <Button type="button" disabled className="w-28">
          Responder
        </Button>
      </div>

      <div className="border-t px-6">
        <div className="flex flex-wrap items-center gap-5 py-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1 font-medium text-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            Gabarito Comentado
          </span>
          <span className="inline-flex items-center gap-2">
            <Video className="h-3.5 w-3.5" />
            Aulas
          </span>
          <span className="inline-flex items-center gap-2">
            <MessageSquare className="h-3.5 w-3.5" />
            Comentários
          </span>
          <span className="inline-flex items-center gap-2">
            <BarChart3 className="h-3.5 w-3.5" />
            Estatísticas
          </span>
          <span className="ml-auto inline-flex items-center gap-4">
            <Flag className="h-3.5 w-3.5" />
            <Star className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="border-t p-6">
        <div className="grid gap-6 md:grid-cols-[96px_minmax(0,1fr)]">
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border bg-muted">
              <FileText className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              Professor
              <br />
              Administrador
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-bold">Resolução</p>
              <EditablePlainTextarea
                value={question.resolucao}
                onChange={(value) => onQuestionChange({ resolucao: value })}
                placeholder="Clique aqui e explique por que o gabarito está correto."
                className="min-h-16 text-sm font-medium"
              />
            </div>

            {question.alternativas.map((alternative) => (
              <div key={alternative.letter} className="space-y-1.5">
                <p className="text-sm font-bold">
                  Alternativa {alternative.letter} {alternative.isCorrect ? "(Gabarito)" : "(Incorreta)"}
                </p>
                <p className="text-xs italic text-muted-foreground">{alternative.text || `Alternativa ${alternative.letter}`}</p>
                {alternative.isCorrect ? (
                  <p className="text-sm font-medium text-foreground/90">
                    Correta. A justificativa principal fica na resolução acima.
                  </p>
                ) : (
                  <EditablePlainTextarea
                    value={alternative.explanation}
                    onChange={(value) => onAlternativeChange(alternative.letter, { explanation: value })}
                    placeholder={`Clique aqui e explique por que a alternativa ${alternative.letter} está errada.`}
                    className="min-h-12 text-sm font-medium"
                  />
                )}
              </div>
            ))}

            {correctAlternative && (
              <p className="rounded-xl border bg-muted/20 p-3 text-xs text-muted-foreground">
                Gabarito selecionado: alternativa <strong className="text-foreground">{correctAlternative.letter}</strong>. Para alterar, clique no círculo da alternativa correta acima.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchCombobox({
  options,
  value,
  placeholder,
  onChange,
}: {
  options: ComboOption[]
  value: string
  placeholder: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.hint ?? ""}`}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{option.label}</p>
                    {option.hint && <p className="truncate text-xs text-muted-foreground">{option.hint}</p>}
                  </div>
                  <Check className={cn("h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function EditablePlainTextarea({
  value,
  placeholder,
  className,
  onChange,
}: {
  value: string
  placeholder: string
  className?: string
  onChange: (value: string) => void
}) {
  return (
    <Textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={cn(
        "resize-y border-0 bg-transparent px-0 shadow-none outline-none placeholder:text-muted-foreground/55 focus-visible:ring-0",
        className
      )}
    />
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}
