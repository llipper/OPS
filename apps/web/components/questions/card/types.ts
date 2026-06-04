export interface Alternative {
    id?: string
    letter: string
    text: string
    isCorrect?: boolean
    explanation?: string
    reference?: string
    tip?: string
}

export interface QuestionStatsData {
    totalAnswers: number
    correctRate: number
    averageTimeSeconds?: number
    mostSelectedWrongAlternative?: string
}

export interface QuestionCardData {
    id: string
    code: string
    discipline: string
    subject?: string | null
    topic?: string | null
    supportText?: string | null
    questionText: string
    alternatives: Alternative[]
    difficulty: string
    isUnique: boolean
    year?: string | number
    board?: string | null
    institution?: string | null
    career?: string | null
    educationLevel?: string | null
    resolution?: string | null
    objectives?: string[]
    references?: string[]
    stats?: QuestionStatsData
    commentsCount?: number
    videos?: { title: string; url: string }[]
    author: {
        id: string
        name: string
        avatarUrl?: string | null
    }
    userState?: {
        hasAnswered: boolean
        isCorrect: boolean | null
        lastAnsweredAt?: string | Date
    }
}
