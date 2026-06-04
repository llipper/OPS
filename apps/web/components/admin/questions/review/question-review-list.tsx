"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookOpen, CheckCircle2, FileText, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { publishAdminQuestion } from "@/actions/questions-actions"
import { QuestionAlternatives } from "@/components/questions/card/components/question-alternatives"
import { QuestionExplanation } from "@/components/questions/card/components/question-explanation"
import { QuestionHeader } from "@/components/questions/card/components/question-header"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"

type ReviewQuestion = {
  id: string
  code: string
  status: string
  ano: number | null
  isUnique: boolean
  enunciado: string
  textoApoio: string | null
  resolucao: string | null
  criadoEm: Date
  disciplina: { nome: string }
  assunto: { nome: string } | null
  topico: { nome: string } | null
  subtopico: { nome: string } | null
  banca: { sigla: string | null; nome: string } | null
  concurso: { nome: string; ano: number | null } | null
  dificuldade: { nome: string } | null
  autor: { nome: string }
  alternativas: Array<{
    id: string
    letra: string
    texto: string
    isCorreta: boolean
    explicacao: string | null
  }>
}

const STATUS_LABEL: Record<string, string> = {
  RASCUNHO: "Rascunho",
  EM_REVISAO: "Em revisão",
  APROVADA: "Aprovada",
  PUBLICADA: "Publicada",
}

function stripAlternativesFromStatement(statement: string) {
  return statement
    .split("\n")
    .filter((line) => !/^\s*[A-E]\)\s+/.test(line))
    .join("\n")
    .trim()
}

export function QuestionReviewList({ questions }: { questions: ReviewQuestion[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handlePublish(id: string) {
    startTransition(async () => {
      try {
        await publishAdminQuestion(id)
        toast.success("Questão publicada.")
        router.refresh()
      } catch (error) {
        const message = error instanceof Error ? error.message : "Não foi possível publicar a questão."
        toast.error(message)
      }
    })
  }

  if (questions.length === 0) {
    return (
      <Card className="shadow-none">
        <CardContent className="flex min-h-56 flex-col items-center justify-center gap-3 text-center">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-medium">Nenhuma questão pendente</p>
            <p className="text-sm text-muted-foreground">As questões importadas como rascunho aparecerão aqui.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id} className="shadow-none">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{question.code}</Badge>
                  <Badge variant="outline">{STATUS_LABEL[question.status] ?? question.status}</Badge>
                  <Badge variant="outline">{question.isUnique ? "Inédita" : "Banca"}</Badge>
                  {question.ano && <Badge variant="outline">{question.ano}</Badge>}
                </div>
                <CardTitle className="text-base leading-relaxed">
                  {question.disciplina.nome}
                  {question.assunto?.nome ? ` / ${question.assunto.nome}` : ""}
                  {question.topico?.nome ? ` / ${question.topico.nome}` : ""}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {[
                    question.disciplina.nome,
                    question.assunto?.nome,
                    question.topico?.nome,
                    question.subtopico?.nome,
                  ]
                    .filter(Boolean)
                    .join(" / ")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline">
                  <Link href={`/admin/questoes/editar/${question.id}`}>Corrigir</Link>
                </Button>
                <Button onClick={() => handlePublish(question.id)} disabled={isPending}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Publicar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 text-xs text-muted-foreground md:grid-cols-4">
              <span>Banca: {question.banca?.sigla || question.banca?.nome || "-"}</span>
              <span>Concurso: {question.concurso?.nome || "-"}</span>
              <span>Dificuldade: {question.dificuldade?.nome || "-"}</span>
              <span>Autor: {question.autor.nome}</span>
            </div>

            <ReviewQuestionPreview question={question} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ReviewQuestionPreview({ question }: { question: ReviewQuestion }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [excludedOptions, setExcludedOptions] = useState<string[]>([])

  const alternatives = question.alternativas.map((alternative) => ({
    id: alternative.id,
    letter: alternative.letra,
    text: alternative.texto,
    isCorrect: alternative.isCorreta,
    explanation: alternative.explicacao ?? "",
  }))

  const selectedAlternative = alternatives.find((alternative) => alternative.letter === selectedOption)
  const isCorrect = Boolean(selectedAlternative?.isCorrect)
  const cleanStatement = stripAlternativesFromStatement(question.enunciado)

  function resetPreview() {
    setSelectedOption(null)
    setIsSubmitted(false)
    setShowExplanation(false)
    setExcludedOptions([])
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <QuestionHeader
        code={question.code}
        discipline={question.disciplina.nome}
        subject={question.assunto?.nome}
        topic={question.topico?.nome}
        supportText={question.textoApoio}
        difficulty={question.dificuldade?.nome ?? ""}
        isUnique={question.isUnique}
        year={question.ano ?? undefined}
        board={question.banca?.sigla || question.banca?.nome}
        institution={question.concurso?.nome}
      />

      <div className="space-y-6 p-6 pt-4">
        <div className="whitespace-pre-wrap text-base font-semibold leading-relaxed text-foreground/90">
          {cleanStatement}
        </div>

        <QuestionAlternatives
          alternatives={alternatives}
          selectedOption={selectedOption}
          isSubmitted={isSubmitted}
          isProfessor={false}
          excludedOptions={excludedOptions}
          hideExclude
          onSelect={(letter) => {
            if (!isSubmitted && !excludedOptions.includes(letter)) {
              setSelectedOption((current) => (current === letter ? null : letter))
            }
          }}
          onToggleExclude={(event, letter) => {
            event.stopPropagation()
            if (isSubmitted) return
            setExcludedOptions((current) =>
              current.includes(letter)
                ? current.filter((item) => item !== letter)
                : [...current, letter]
            )
            if (selectedOption === letter) {
              setSelectedOption(null)
            }
          }}
        />

        <div className="flex flex-wrap items-center gap-2 border-y py-3">
          <Button
            size="sm"
            disabled={!selectedOption || isSubmitted}
            onClick={() => {
              setIsSubmitted(true)
              setShowExplanation(true)
            }}
          >
            Responder preview
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!isSubmitted}
            onClick={() => setShowExplanation((current) => !current)}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Gabarito comentado
          </Button>
          <Button size="sm" variant="ghost" onClick={resetPreview}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Resetar
          </Button>

          {isSubmitted && (
            <Badge variant={isCorrect ? "secondary" : "destructive"} className="ml-auto">
              {isCorrect ? "Resposta correta" : "Resposta incorreta"}
            </Badge>
          )}
        </div>

        <QuestionExplanation
          resolution={question.resolucao}
          alternatives={alternatives}
          author={{ id: "review-author", name: question.autor.nome }}
          show={showExplanation}
        />
      </div>
    </div>
  )
}
