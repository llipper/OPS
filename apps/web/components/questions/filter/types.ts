export type FilterOption = {
    label: string
    value: string
    disciplinaId?: string
    assuntoId?: string
    topicoId?: string
}

export type ActiveFilter = {
    id: string
    label: string
    category: string
}

export interface QuestionFilterOptions {
    disciplinas?: FilterOption[]
    assuntos?: FilterOption[]
    topicos?: FilterOption[]
    subtopicos?: FilterOption[]
    bancas?: FilterOption[]
    concursos?: {
        id: string
        name: string
        sigla?: string
        ano?: number | string
        status?: string
        logoUrl?: string
        icon?: "shield" | "scale" | "landmark" | "target"
        cargos?: string[]
        carreiraId?: string | null
    }[]
    cargos?: FilterOption[]
    carreiras?: { label: string; value: string; parentId: string | null }[]
    escolaridades?: FilterOption[]
    anos?: FilterOption[]
    dificuldades?: FilterOption[]
    questoes?: FilterOption[]
}
