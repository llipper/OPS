export interface Alternative {
    id: string
    letter: string
    text: string
    isCorrect: boolean
    explanation?: string
    reference?: string
    tip?: string
}

export interface QuestionTaxonomyOptions {
    disciplinas: { id: string; nome: string; code: string }[]
    assuntos: { id: string; nome: string; disciplinaId: string }[]
    topicos: { id: string; nome: string; assuntoId: string }[]
    subtopicos: { id: string; nome: string; topicoId: string }[]
    bancas: { id: string; nome: string; sigla: string }[]
    concursos: { id: string; nome: string; ano: number | null; cargo?: string | null; bancaId?: string | null; carreiraId?: string | null }[]
    carreiras: { id: string; nome: string; parentId: string | null }[]
    niveis: { id: string; nome: string }[]
    dificuldades: { id: string; nome: string; slug: string }[]
    tiposQuestao: { 
        id: string; 
        nome: string; 
        slug: string; 
        modelo: string | null; 
        quantidadeAlternativas: number | null 
    }[]
}

export interface QuestionClassificationValues {
    type: string
    tipoId: string
    disciplinaId: string
    assuntoId: string
    topicoId: string
    subtopicoId: string
    bancaId: string
    concursoId: string
    carreiraId: string
    nivelId: string
    dificuldadeId: string
    cargo: string
    year: string
    isUnique: string
    tempoEstimado?: string
    tipoCobranca?: string
}
