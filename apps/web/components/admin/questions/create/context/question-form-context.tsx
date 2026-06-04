"use client"

import React, { createContext, useContext } from "react"
import { useQuestionForm } from "../hooks/use-question-form"
import { QuestionTaxonomyOptions } from "../types"

type QuestionFormContextProps = ReturnType<typeof useQuestionForm>

const QuestionFormContext = createContext<QuestionFormContextProps | undefined>(undefined)

export function QuestionFormProvider({
    children,
    taxonomy,
    initialData,
}: {
    children: React.ReactNode
    taxonomy: QuestionTaxonomyOptions
    initialData?: any
}) {
    const value = useQuestionForm(taxonomy, initialData)
    return (
        <QuestionFormContext.Provider value={value}>
            {children}
        </QuestionFormContext.Provider>
    )
}

export function useQuestionFormContext() {
    const context = useContext(QuestionFormContext)
    if (!context) {
        throw new Error("useQuestionFormContext deve ser utilizado dentro de um QuestionFormProvider")
    }
    return context
}
