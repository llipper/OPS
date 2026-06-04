import { useState, useMemo, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createAdminQuestion, updateAdminQuestion } from "@/actions/questions-actions"
import type { CreateQuestionPayload } from "@/features/questions/schemas/admin-question.schema"
import { Alternative, QuestionClassificationValues, QuestionTaxonomyOptions } from "../types"

export function useQuestionForm(taxonomy: QuestionTaxonomyOptions, initialData?: any) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const isEditing = Boolean(initialData?.id)
    const initialQuestionType = initialData?.tipoId
        ? taxonomy.tiposQuestao.find(t => t.id === initialData.tipoId)
        : taxonomy.tiposQuestao[0]
    const [isWizardMode, setIsWizardMode] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [formTaxonomy, setFormTaxonomy] = useState(taxonomy)

    // Estados do Formulário
    const [classification, setClassification] = useState<QuestionClassificationValues>({
        type: initialQuestionType?.slug || "",
        tipoId: initialData?.tipoId || initialQuestionType?.id || "",
        disciplinaId: initialData?.disciplinaId || "",
        assuntoId: initialData?.assuntoId || "",
        topicoId: initialData?.topicoId || "",
        subtopicoId: initialData?.subtopicoId || "",
        bancaId: initialData?.bancaId || "",
        concursoId: initialData?.concursoId || "",
        cargo: initialData?.cargo || "",
        carreiraId: initialData?.carreiraId || "",
        nivelId: initialData?.nivelId || "",
        dificuldadeId: initialData?.dificuldadeId || "",
        year: initialData?.ano ? String(initialData.ano) : String(new Date().getFullYear()),
        isUnique: initialData?.isInedita ? "sim" : "nao",
    })

    const [statement, setStatement] = useState({
        supportText: initialData?.textoApoio || "",
        commandText: initialData?.enunciado || ""
    })

    const [resolution, setResolution] = useState(initialData?.resolucao || "")
    const [materials, setMaterials] = useState<Record<string, string>>({
        videoUrl: initialData?.videoUrl || "",
        objetivo: initialData?.objetivo || "",
        referencia: initialData?.referencia || "",
        dica: initialData?.dica || "",
    })
    const [settings, setSettings] = useState({
        isPublic: initialData?.visibilidade === "publica",
        allowComments: true,
        reviewMode: false,
    })

    const [alternativas, setAlternativas] = useState<Alternative[]>(
        initialData?.alternativas?.map((alt: any, i: number) => ({
            id: String(i + 1),
            letter: alt.letter,
            text: alt.text,
            isCorrect: alt.isCorrect,
            explanation: alt.explanation || "",
            reference: alt.reference || "",
            tip: alt.tip || ""
        })) || [
            { id: "1", letter: "A", text: "", isCorrect: false, explanation: "", reference: "", tip: "" },
            { id: "2", letter: "B", text: "", isCorrect: false, explanation: "", reference: "", tip: "" },
            { id: "3", letter: "C", text: "", isCorrect: false, explanation: "", reference: "", tip: "" },
        ]
    )

    const totalSteps = 7

    const handleFieldChange = (field: keyof QuestionClassificationValues, value: string) => {
        setFormError(null)
        setClassification(prev => {
            const next = { ...prev, [field]: value }

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

            return next
        })
        if (field === 'type') handleTypeChange(value)
    }

    const handleTypeChange = (typeSlug: string) => {
        const typeConfig = formTaxonomy.tiposQuestao.find(t => t.slug === typeSlug)
        if (!typeConfig) return

        if (typeConfig.modelo?.toLowerCase() === "certo_errado") {
            setAlternativas([
                { id: "c", letter: "C", text: "Certo", isCorrect: false, explanation: "", reference: "", tip: "" },
                { id: "e", letter: "E", text: "Errado", isCorrect: false, explanation: "", reference: "", tip: "" },
            ])
        } else {
            const qty = typeConfig.quantidadeAlternativas || 5
            const newAlts = Array.from({ length: qty }, (_, i) => ({
                id: (i + 1).toString(),
                letter: String.fromCharCode(65 + i),
                text: "",
                isCorrect: false,
                explanation: "",
                reference: "",
                tip: ""
            }))
            setAlternativas(newAlts)
        }
    }

    const handleToggleCorrect = (id: string) => {
        setAlternativas(prev => prev.map(alt => ({
            ...alt,
            isCorrect: alt.id === id
        })))
    }

    const handleTextChange = (id: string, text: string) => {
        setAlternativas(prev => prev.map(alt => 
            alt.id === id ? { ...alt, text } : alt
        ))
    }

    const handleAlternativeDataChange = (id: string, value: string) => {
        setAlternativas(prev => prev.map(alt => 
            alt.id === id ? { ...alt, explanation: value } : alt
        ))
    }

    const handleRemoveAlternative = (id: string) => {
        const selectedType = formTaxonomy.tiposQuestao.find(t => t.slug === classification.type)
        const isAlternativesType = selectedType?.modelo?.toLowerCase() === "alternativas"

        if (isAlternativesType && alternativas.length <= 3) {
            return
        }
        setAlternativas(prev => {
            const filtered = prev.filter(alt => alt.id !== id)
            return filtered.map((alt, index) => ({
                ...alt,
                letter: String.fromCharCode(65 + index)
            }))
        })
    }

    const handleAddAlternative = () => {
        if (alternativas.length >= 5) return
        const nextLetter = String.fromCharCode(65 + alternativas.length)
        setAlternativas(prev => [
            ...prev,
            { id: Date.now().toString(), letter: nextLetter, text: "", isCorrect: false, explanation: "", reference: "", tip: "" }
        ])
    }

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

    const labels = useMemo(() => {
        const find = (items: { id: string; nome: string }[], id?: string) =>
            items.find((item) => item.id === id)?.nome ?? ""

        return {
            discipline: find(formTaxonomy.disciplinas, classification.disciplinaId),
            subject: find(formTaxonomy.assuntos, classification.assuntoId),
            topic: find(formTaxonomy.topicos, classification.topicoId),
            board: formTaxonomy.bancas.find((banca) => banca.id === classification.bancaId)?.sigla ?? "",
            institution: formTaxonomy.concursos.find((concurso) => concurso.id === classification.concursoId)?.nome ?? "",
            career: find(formTaxonomy.carreiras, classification.carreiraId),
            educationLevel: find(formTaxonomy.niveis, classification.nivelId),
            difficulty: formTaxonomy.dificuldades.find((difficulty) => difficulty.id === classification.dificuldadeId)?.slug ?? "medio",
        }
    }, [classification, formTaxonomy])

    const buildPayload = (status: "draft" | "published"): CreateQuestionPayload => ({
        disciplinaId: classification.disciplinaId,
        assuntoId: classification.assuntoId || null,
        topicoId: classification.topicoId || null,
        subtopicoId: classification.subtopicoId || null,
        bancaId: classification.bancaId || null,
        concursoId: classification.concursoId || null,
        cargo: classification.cargo || undefined,
        carreiraId: classification.carreiraId || null,
        nivelId: classification.nivelId || null,
        dificuldadeId: classification.dificuldadeId || null,
        tipoId: classification.tipoId || null,
        instituicao: labels.institution,
        ano: classification.year ? Number(classification.year) : null,
        isInedita: classification.isUnique === "sim",
        enunciado: statement.commandText,
        textoApoio: statement.supportText,
        resolucao: resolution,
        videoUrl: materials.videoUrl,
        objetivo: materials.objetivo,
        referencia: materials.referencia,
        dica: materials.dica,
        visibilidade: settings.isPublic ? "publica" : "privada",
        status,
        alternativas: alternativas.map(({ letter, text, isCorrect, explanation, reference, tip }) => ({
            letter,
            text,
            isCorrect,
            explanation,
            reference,
            tip,
        })),
    })

    const handleSubmit = (status: "draft" | "published") => {
        setFormError(null)

        startTransition(async () => {
            try {
                if (initialData?.id) {
                    await updateAdminQuestion(initialData.id, buildPayload(status))
                    toast.success(status === 'published' ? "Questão atualizada com sucesso!" : "Rascunho atualizado com sucesso!")
                    router.push("/admin/questoes")
                    router.refresh()
                } else {
                    await createAdminQuestion(buildPayload(status))
                    if (status === 'published') {
                        setShowSuccessModal(true)
                    } else {
                        toast.success("Rascunho salvo com sucesso!")
                        router.push("/admin/questoes")
                        router.refresh()
                    }
                }
            } catch (error) {
                const message = error instanceof Error
                    ? error.message
                    : "Não foi possível salvar a questão."
                setFormError(message)
            }
        })
    }

    const handleResetForm = (keepClassification: boolean) => {
        setStatement({ supportText: "", commandText: "" })
        setResolution("")
        setMaterials({ videoUrl: "", objetivo: "", referencia: "", dica: "" })

        const currentTypeSlug = keepClassification ? classification.type : formTaxonomy.tiposQuestao[0]?.slug || ""
        const typeConfig = formTaxonomy.tiposQuestao.find(t => t.slug === currentTypeSlug)
        
        if (typeConfig && typeConfig.modelo?.toLowerCase() === "certo_errado") {
            setAlternativas([
                { id: "c", letter: "C", text: "Certo", isCorrect: false, explanation: "", reference: "", tip: "" },
                { id: "e", letter: "E", text: "Errado", isCorrect: false, explanation: "", reference: "", tip: "" },
            ])
        } else {
            const qty = typeConfig?.quantidadeAlternativas || 5
            const newAlts = Array.from({ length: qty }, (_, i) => ({
                id: (i + 1).toString(),
                letter: String.fromCharCode(65 + i),
                text: "",
                isCorrect: false,
                explanation: "",
                reference: "",
                tip: ""
            }))
            setAlternativas(newAlts)
        }

        if (!keepClassification) {
            setClassification({
                type: formTaxonomy.tiposQuestao[0]?.slug || "",
                tipoId: formTaxonomy.tiposQuestao[0]?.id || "",
                disciplinaId: "",
                assuntoId: "",
                topicoId: "",
                subtopicoId: "",
                bancaId: "",
                concursoId: "",
                cargo: "",
                carreiraId: "",
                nivelId: "",
                dificuldadeId: "",
                year: String(new Date().getFullYear()),
                isUnique: "nao",
            })
        }
        
        setShowSuccessModal(false)
        setCurrentStep(1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        toast.success("Pronto! Vamos para a próxima.")
    }

    const getQuestionPreviewData = () => ({
        code: "PREVIEW-001",
        discipline: labels.discipline || "Disciplina não selecionada",
        subject: labels.subject,
        topic: labels.topic,
        board: labels.board,
        institution: labels.institution,
        career: labels.career,
        educationLevel: labels.educationLevel,
        year: classification.year,
        difficulty: labels.difficulty,
        supportText: statement.supportText,
        questionText: statement.commandText || "Enunciado não preenchido",
        resolution,
        objectives: materials.objetivo ? [materials.objetivo] : [],
        references: materials.referencia ? [materials.referencia] : [],
        videos: materials.videoUrl ? [{ title: "Videoaula", url: materials.videoUrl }] : [],
        alternatives: alternativas,
        isUnique: classification.isUnique === 'sim'
    })

    return {
        classification,
        setClassification,
        statement,
        setStatement,
        resolution,
        setResolution,
        materials,
        setMaterials,
        settings,
        setSettings,
        alternativas,
        setAlternativas,
        currentStep,
        setCurrentStep,
        isWizardMode,
        setIsWizardMode,
        isPreviewOpen,
        setIsPreviewOpen,
        formError,
        setFormError,
        showSuccessModal,
        setShowSuccessModal,
        isPending,
        isEditing,
        formTaxonomy,
        setFormTaxonomy,
        totalSteps,
        labels,
        handleFieldChange,
        handleToggleCorrect,
        handleTextChange,
        handleAlternativeDataChange,
        handleRemoveAlternative,
        handleAddAlternative,
        nextStep,
        prevStep,
        handleSubmit,
        handleResetForm,
        getQuestionPreviewData,
    }
}
