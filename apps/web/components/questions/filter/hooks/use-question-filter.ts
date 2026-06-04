import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { QuestionFilterOptions, ActiveFilter } from "../types"

interface UseQuestionFilterProps {
    options?: QuestionFilterOptions
    onFilter?: (params: URLSearchParams) => void
    onClear?: () => void
}

export function useQuestionFilter({ options, onFilter, onClear }: UseQuestionFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [isExpanded, setIsExpanded] = useState(true)
    const [selectedConcurso, setSelectedConcurso] = useState(searchParams.get("concursoId") || "all")

    // Estados locais para filtros selecionados
    const [selectedDisciplina, setSelectedDisciplina] = useState(searchParams.get("disciplinaId") || "")
    const [selectedAssunto, setSelectedAssunto] = useState(searchParams.get("assuntoId") || "")
    const [selectedTopico, setSelectedTopico] = useState(searchParams.get("topicoId") || "")
    const [selectedSubtopico, setSelectedSubtopico] = useState(searchParams.get("subtopicoId") || "")
    const [selectedBanca, setSelectedBanca] = useState(searchParams.get("bancaId") || "")
    const [selectedDificuldade, setSelectedDificuldade] = useState(searchParams.get("dificuldade") || "")
    const [selectedAno, setSelectedAno] = useState(searchParams.get("ano") || "")
    const [selectedCarreira, setSelectedCarreira] = useState(searchParams.get("carreiraId") || "")
    const [selectedSubcarreira, setSelectedSubcarreira] = useState("")
    const [selectedOrgao, setSelectedOrgao] = useState("")
    const [selectedCargo, setSelectedCargo] = useState(searchParams.get("cargo") || "")
    const [selectedQuestao, setSelectedQuestao] = useState(searchParams.get("questaoId") || "")

    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>(() => {
        const filters: ActiveFilter[] = []
        if (selectedDisciplina) {
            filters.push({ id: `disc-${selectedDisciplina}`, label: "Disciplina selecionada", category: "disciplina" })
        }
        return filters
    })

    // Pure options aggregation, zero mock imports or fallbacks!
    const resolvedOptions = useMemo(() => {
        return {
            concursos: options?.concursos ?? [],
            disciplinas: options?.disciplinas ?? [],
            assuntos: options?.assuntos ?? [],
            topicos: options?.topicos ?? [],
            subtopicos: options?.subtopicos ?? [],
            bancas: options?.bancas ?? [],
            carreiras: options?.carreiras ?? [],
            escolaridades: options?.escolaridades ?? [],
            anos: options?.anos ?? [],
            dificuldades: options?.dificuldades ?? [],
            cargos: options?.cargos ?? [],
            questoes: options?.questoes ?? []
        }
    }, [options])

    const handleFilter = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (selectedDisciplina) params.set("disciplinaId", selectedDisciplina)
        else params.delete("disciplinaId")

        if (selectedAssunto) params.set("assuntoId", selectedAssunto)
        else params.delete("assuntoId")

        if (selectedTopico) params.set("topicoId", selectedTopico)
        else params.delete("topicoId")

        if (selectedSubtopico) params.set("subtopicoId", selectedSubtopico)
        else params.delete("subtopicoId")

        if (selectedBanca) params.set("bancaId", selectedBanca)
        else params.delete("bancaId")

        if (selectedDificuldade) params.set("dificuldade", selectedDificuldade)
        else params.delete("dificuldade")

        if (selectedAno) params.set("ano", selectedAno)
        else params.delete("ano")

        if (selectedCarreira) params.set("carreiraId", selectedCarreira)
        else params.delete("carreiraId")

        if (selectedConcurso !== "all") params.set("concursoId", selectedConcurso)
        else params.delete("concursoId")

        if (selectedCargo) params.set("cargo", selectedCargo)
        else params.delete("cargo")

        if (selectedQuestao) params.set("questaoId", selectedQuestao)
        else params.delete("questaoId")

        params.delete("page")

        if (onFilter) {
            onFilter(params)
        } else {
            router.push(`?${params.toString()}`)
        }
    }

    const clearFilters = () => {
        setSelectedDisciplina("")
        setSelectedAssunto("")
        setSelectedTopico("")
        setSelectedSubtopico("")
        setSelectedBanca("")
        setSelectedDificuldade("")
        setSelectedAno("")
        setSelectedCarreira("")
        setSelectedSubcarreira("")
        setSelectedOrgao("")
        setSelectedCargo("")
        setSelectedQuestao("")
        setSelectedConcurso("all")
        setActiveFilters([])
        if (onClear) {
            onClear()
        } else {
            router.push("?")
        }
    }

    const removeFilter = (id: string) => {
        if (id.startsWith("concurso-")) setSelectedConcurso("all")
        setActiveFilters(prev => prev.filter(f => f.id !== id))
    }

    const handleConcursoSelect = (concursoId: string, concursoName: string) => {
        setSelectedConcurso(concursoId)
        setActiveFilters(prev => prev.filter(f => f.category !== "concurso"))
        if (concursoId !== "all") {
            setActiveFilters(prev => [
                ...prev,
                { id: `concurso-${concursoId}`, label: `Concurso: ${concursoName}`, category: "concurso" }
            ])
        }
    }

    return {
        state: {
            isExpanded,
            selectedConcurso,
            selectedDisciplina,
            selectedAssunto,
            selectedTopico,
            selectedSubtopico,
            selectedBanca,
            selectedDificuldade,
            selectedAno,
            selectedCarreira,
            selectedSubcarreira,
            selectedOrgao,
            selectedCargo,
            selectedQuestao,
            activeFilters,
            resolvedOptions
        },
        actions: {
            setIsExpanded,
            setSelectedConcurso,
            setSelectedDisciplina,
            setSelectedAssunto,
            setSelectedTopico,
            setSelectedSubtopico,
            setSelectedBanca,
            setSelectedDificuldade,
            setSelectedAno,
            setSelectedCarreira,
            setSelectedSubcarreira,
            setSelectedOrgao,
            setSelectedCargo,
            setSelectedQuestao,
            setActiveFilters,
            handleFilter,
            clearFilters,
            removeFilter,
            handleConcursoSelect
        }
    }
}
