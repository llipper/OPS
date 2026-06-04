import { useState, useMemo } from "react"
import { toast } from "sonner"
import { sanitizeHtml } from "@/lib/sanitize-html"
import { submitQuestionAnswer, toggleQuestionFavorite, saveAnswerErrorReason } from "@/features/questions/actions/question.actions"
import { QuestionCardData } from "../types"

type ErrorReasonValue =
    | "FALTA_CONTEUDO"
    | "ERRO_INTERPRETACAO"
    | "CONFUNDI_ASSUNTO"
    | "CHUTE"
    | "FALTA_ATENCAO"
    | "OUTRO"

interface UseQuestionCardProps {
    question: QuestionCardData
    userRole?: string
}

export function useQuestionCard({ question, userRole = "STUDENT" }: UseQuestionCardProps) {
    const normalizedQuestion = useMemo(() => {
        const rawQuestion = question as any
        const rawAlternatives = rawQuestion.alternatives || rawQuestion.alternativas || []
        
        const mappedAlternatives = rawAlternatives.map((alt: any) => ({
            id: alt.id,
            letter: alt.letter || alt.letra || "",
            text: alt.text || alt.texto || "",
            isCorrect: alt.isCorrect !== undefined 
                ? alt.isCorrect 
                : (alt.isCorreta !== undefined ? alt.isCorreta : false),
            explanation: alt.explanation || alt.explicacao || "",
            reference: alt.reference || alt.referencia || "",
            tip: alt.tip || alt.dica || "",
            percentual: alt.percentual
        }))

        return {
            ...rawQuestion,
            code: rawQuestion.code || rawQuestion.codigo || "",
            discipline: rawQuestion.discipline || rawQuestion.disciplina || "",
            subject: rawQuestion.subject || rawQuestion.assunto || null,
            topic: rawQuestion.topic || rawQuestion.topico || null,
            supportText: rawQuestion.supportText || rawQuestion.textoApoio || null,
            questionText: rawQuestion.questionText || rawQuestion.enunciado || "",
            difficulty: rawQuestion.difficulty || rawQuestion.dificuldade || "",
            isUnique: rawQuestion.isUnique !== undefined ? rawQuestion.isUnique : (rawQuestion.inédita !== undefined ? rawQuestion.inédita : false),
            year: rawQuestion.year || rawQuestion.ano || "",
            board: rawQuestion.board || rawQuestion.banca || "",
            institution: rawQuestion.institution || rawQuestion.orgao || "",
            career: rawQuestion.career || rawQuestion.carreira || "",
            educationLevel: rawQuestion.educationLevel || rawQuestion.nivelEducacional || "",
            userState: rawQuestion.userState || rawQuestion.estadoUsuario || null,
            stats: rawQuestion.stats || rawQuestion.estatisticas || null,
            resolution: rawQuestion.resolution || rawQuestion.resolucao || "",
            objectives: (rawQuestion.objectives && rawQuestion.objectives.length > 0)
                ? rawQuestion.objectives
                : (rawQuestion.objetivos && rawQuestion.objetivos.length > 0 ? rawQuestion.objetivos : []),
            references: (rawQuestion.references && rawQuestion.references.length > 0)
                ? rawQuestion.references
                : (rawQuestion.referencias && rawQuestion.referencias.length > 0 ? rawQuestion.referencias : []),
            videos: (rawQuestion.videos && rawQuestion.videos.length > 0)
                ? rawQuestion.videos
                : (rawQuestion.possuiVideoAula ? [{ url: rawQuestion.videoUrl || "" }] : []),
            alternatives: mappedAlternatives
        }
    }, [question])

    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [startTime] = useState<number>(Date.now())
    const [showExplanation, setShowExplanation] = useState(false)
    const [showStats, setShowStats] = useState(false)
    const [showVideos, setShowVideos] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    const [excludedOptions, setExcludedOptions] = useState<string[]>([])
    const [isSavingAnswer, setIsSavingAnswer] = useState(false)
    const [answerResult, setAnswerResult] = useState<{
        isCorrect: boolean
        correctAlternativeId: string | null
        explanation: {
            resolution: string | null
            alternatives: Array<{
                id: string
                letter: string
                text: string
                isCorrect: boolean
                explanation?: string | null
                reference?: string | null
                tip?: string | null
            }>
        }
    } | null>(null)

    const isAdmin = userRole === "ADMIN"
    const isProfessor = userRole === "PROFESSOR" || isAdmin
    const safeQuestionText = useMemo(() => sanitizeHtml(normalizedQuestion.questionText), [normalizedQuestion.questionText])

    const handleOptionSelect = (letter: string) => {
        if (!isSubmitted && !excludedOptions.includes(letter)) {
            setSelectedOption(prev => prev === letter ? null : letter)
        }
    }

    const toggleExcludeOption = (e: React.MouseEvent, letter: string) => {
        e.stopPropagation()
        if (isSubmitted) return
        setExcludedOptions(prev =>
            prev.includes(letter) ? prev.filter(l => l !== letter) : [...prev, letter]
        )
        if (selectedOption === letter) setSelectedOption(null)
    }

    const handleSubmit = async () => {
        const selectedAlternative = (normalizedQuestion.alternatives ?? []).find((alternative: { letter: string | null }) => alternative.letter === selectedOption)
        const isMockQuestion = normalizedQuestion.id.startsWith("question-")

        if (selectedAlternative?.id && !isMockQuestion) {
            setIsSavingAnswer(true)
            const timeSeconds = Math.max(3, Math.round((Date.now() - startTime) / 1000))
            try {
                const result = await submitQuestionAnswer({
                    questionId: normalizedQuestion.id,
                    alternativeId: selectedAlternative.id,
                    timeSeconds,
                })
                setAnswerResult(result)
                setIsSubmitted(true)
                toast.success(result.isCorrect ? "Resposta correta!" : "Resposta enviada!")
            } catch {
                setIsSubmitted(true)
                toast.info("Modo demonstração: Resposta processada localmente.")
            } finally {
                setIsSavingAnswer(false)
            }
            return
        }

        if (selectedOption) {
            setIsSubmitted(true)
            const isCorrect = selectedAlternative?.isCorrect ?? false
            toast.success(isCorrect ? "Certa! Ótimo trabalho." : "Errada! Analise o motivo abaixo.")
        }
    }

    const handleToggleFavorite = async () => {
        try {
            const result = await toggleQuestionFavorite({ questionId: normalizedQuestion.id })
            toast.success(result.favorited ? "Questão adicionada aos favoritos." : "Questão removida dos favoritos.")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Não foi possível atualizar o favorito.")
        }
    }

    const handleReasonSelect = async (reason: ErrorReasonValue) => {
        try {
            await saveAnswerErrorReason({
                questionId: normalizedQuestion.id,
                reason,
            })
        } catch (error) {
            console.error("Erro ao salvar motivo:", error)
        }
    }

    const alternativesWithResult = useMemo(() => {
        if (!answerResult) return normalizedQuestion.alternatives

        const resultById = new Map(answerResult.explanation.alternatives.map((alt) => [alt.id, alt]))

        return normalizedQuestion.alternatives.map((alt: { id?: string }) => {
            const resultAlt = alt.id ? resultById.get(alt.id) : null
            return resultAlt ? { ...alt, ...resultAlt } : alt
        })
    }, [answerResult, normalizedQuestion.alternatives])

    const isCorrect = answerResult?.isCorrect ?? false

    return {
        state: {
            question: {
                ...normalizedQuestion,
                resolution: answerResult?.explanation.resolution ?? normalizedQuestion.resolution,
                alternatives: alternativesWithResult,
            },
            selectedOption: isSavingAnswer ? null : selectedOption,
            isSubmitted,
            showExplanation,
            showStats,
            showVideos,
            showReportModal,
            excludedOptions,
            isSavingAnswer,
            isProfessor,
            isCorrect,
            safeQuestionText,
        },
        actions: {
            setSelectedOption,
            setIsSubmitted,
            setShowExplanation,
            setShowStats,
            setShowVideos,
            setShowReportModal,
            setExcludedOptions,
            handleOptionSelect,
            toggleExcludeOption,
            handleSubmit,
            handleToggleFavorite,
            handleReasonSelect,
        }
    }
}
