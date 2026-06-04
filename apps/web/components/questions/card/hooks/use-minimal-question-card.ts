import { useState, useMemo, useCallback } from "react"
import { toast } from "sonner"
import { sanitizeHtml } from "@/lib/sanitize-html"
import { submitQuestionAnswer } from "@/features/questions/actions/question.actions"
import { Alternative } from "../types"

interface MinimalQuestion {
    id: string
    code: string
    discipline: string
    supportText?: string | null
    questionText: string
    alternatives: Alternative[]
    resolution?: string | null
}

export function useMinimalQuestionCard(question: MinimalQuestion) {
    const normalizedQuestion = useMemo(() => {
        const rawQuestion = question as any
        const rawAlternatives = rawQuestion.alternatives || rawQuestion.alternativas || []
        
        const mappedAlternatives: Alternative[] = rawAlternatives.map((alt: any) => ({
            id: alt.id,
            letter: alt.letter || alt.letra || "",
            text: alt.text || alt.texto || "",
            isCorrect: alt.isCorrect !== undefined 
                ? alt.isCorrect 
                : (alt.isCorreta !== undefined ? alt.isCorreta : false),
            explanation: alt.explanation || alt.explicacao || "",
            reference: alt.reference || alt.referencia || "",
            tip: alt.tip || alt.dica || ""
        }))

        return {
            ...rawQuestion,
            discipline: rawQuestion.discipline || rawQuestion.disciplina || "",
            supportText: rawQuestion.supportText || rawQuestion.textoApoio || null,
            questionText: rawQuestion.questionText || rawQuestion.enunciado || "",
            resolution: rawQuestion.resolution || rawQuestion.resolucao || "",
            alternatives: mappedAlternatives
        }
    }, [question])

    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [startTime] = useState<number>(Date.now())
    const [isSavingAnswer, setIsSavingAnswer] = useState(false)

    const supportHtml = useMemo(() => sanitizeHtml(normalizedQuestion.supportText), [normalizedQuestion.supportText])
    const questionHtml = useMemo(() => sanitizeHtml(normalizedQuestion.questionText), [normalizedQuestion.questionText])
    const resolutionHtml = useMemo(() => sanitizeHtml(normalizedQuestion.resolution), [normalizedQuestion.resolution])
    const correctAnswer = useMemo(
        () => (normalizedQuestion.alternatives ?? []).find((alternative: Alternative) => alternative.isCorrect),
        [normalizedQuestion.alternatives]
    )
    const isCorrect = selectedOption === correctAnswer?.letter

    const handleOptionSelect = useCallback((letter: string) => {
        if (!isSubmitted) {
            setSelectedOption(prev => prev === letter ? null : letter)
        }
    }, [isSubmitted])

    const toggleExcludeOption = useCallback((event: React.MouseEvent) => {
        event.stopPropagation()
    }, [])

    const handleSubmit = useCallback(async () => {
        const selectedAlternative = (normalizedQuestion.alternatives ?? []).find((alternative: Alternative) => alternative.letter === selectedOption)

        if (selectedAlternative?.id) {
            setIsSavingAnswer(true)
            const timeSeconds = Math.max(3, Math.round((Date.now() - startTime) / 1000))
            try {
                const result = await submitQuestionAnswer({
                    questionId: normalizedQuestion.id,
                    alternativeId: selectedAlternative.id,
                    timeSeconds,
                })
                setIsSubmitted(true)
                toast.success(result.isCorrect ? "Resposta correta!" : "Resposta enviada!")
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Não foi possível salvar sua resposta.")
            } finally {
                setIsSavingAnswer(false)
            }
            return
        }

        if (selectedOption) {
            setIsSubmitted(true)
            toast.success("Resposta enviada!")
        }
    }, [normalizedQuestion.alternatives, normalizedQuestion.id, selectedOption])

    return {
        state: {
            question: normalizedQuestion,
            selectedOption,
            isSubmitted,
            isSavingAnswer,
            supportHtml,
            questionHtml,
            resolutionHtml,
            isCorrect
        },
        actions: {
            handleOptionSelect,
            toggleExcludeOption,
            handleSubmit
        }
    }
}
