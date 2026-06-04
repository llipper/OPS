export type TaxonLevel =
    | "disciplina"
    | "assunto"
    | "topico"
    | "subtopico"
    | "carreira"
    | "instituicao"
    | "orgao"
    | "concurso"
    | "cargo"
    | "banca"
    | "dificuldade"
    | "nivelEducacional"
    | "tipoQuestao"

export type ItemHierarquico = {
    id: string
    rawId: string
    title: string
    subtitle?: string
    meta: string
    active: boolean
    indent: number
    editHref: string
    parentId?: string
    nivel: TaxonLevel
    questionsCount?: number
    imageUrl?: string | null
    ano?: number
    cargo?: string
    cor?: string | null
    sigla?: string
    formato?: string
    quantidadeAlternativas?: number
}
