"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { useQuestionCard } from "./hooks/use-question-card"
import { QuestionHeader } from "./components/question-header"
import { QuestionAlternatives } from "./components/question-alternatives"
import { QuestionActions } from "./components/question-actions"
import { QuestionExplanation } from "./components/question-explanation"
import { QuestionStats } from "./components/question-stats"
import { QuestionVideoModal } from "./components/modals/question-video-modal"
import { QuestionReportModal } from "./components/modals/question-report-modal"
import { QuestionCardData } from "./types"

export interface QuestionCardProps {
    question: QuestionCardData
    onDelete?: (id: string) => void
    onDuplicate?: (id: string) => void
    userRole?: string
    currentUserId?: string
}

export function QuestionCard({ question: rawQuestion, userRole = "STUDENT" }: QuestionCardProps) {
    const { state, actions } = useQuestionCard({ question: rawQuestion, userRole })
    const question = state.question

    return (
        <Card className="hover:shadow-lg transition-shadow border-border/50 overflow-hidden bg-background">
            <QuestionHeader
                code={question.code}
                discipline={question.discipline}
                subject={question.subject}
                topic={question.topic}
                supportText={question.supportText}
                difficulty={question.difficulty}
                isUnique={question.isUnique}
                year={question.year}
                board={question.board}
                institution={question.institution}
                career={question.career}
                educationLevel={question.educationLevel}
                userState={question.userState}
            />

            <CardContent className="pt-2 space-y-8">
                <div 
                    className="prose dark:prose-invert max-w-none text-base
 font-semibold leading-relaxed text-foreground/90 tracking-tight whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: state.safeQuestionText }}
                />

                <QuestionAlternatives
                    alternatives={question.alternatives}
                    selectedOption={state.selectedOption}
                    isSubmitted={state.isSubmitted}
                    isProfessor={state.isProfessor}
                    excludedOptions={state.excludedOptions}
                    onSelect={actions.handleOptionSelect}
                    onToggleExclude={actions.toggleExcludeOption}
                />

                <div className="space-y-8">
                    <QuestionActions
                        isSubmitted={state.isSubmitted}
                        selectedOption={state.selectedOption}
                        isCorrect={state.isCorrect}
                        isProfessor={state.isProfessor}
                        showExplanation={state.showExplanation}
                        showStats={state.showStats}
                        onToggleExplanation={() => {
                            actions.setShowExplanation(!state.showExplanation)
                            if (!state.showExplanation) actions.setShowStats(false)
                        }}
                        onToggleStats={() => {
                            actions.setShowStats(!state.showStats)
                            if (!state.showStats) actions.setShowExplanation(false)
                        }}
                        onShowVideos={() => actions.setShowVideos(true)}
                        onReportError={() => actions.setShowReportModal(true)}
                        onSubmit={actions.handleSubmit}
                        onToggleFavorite={actions.handleToggleFavorite}
                        onReasonSelect={actions.handleReasonSelect}
                    />

                    {(state.showStats || state.isProfessor) && question.stats && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <QuestionStats stats={question.stats} />
                        </div>
                    )}

                    <QuestionExplanation
                        resolution={question.resolution}
                        objectives={question.objectives}
                        references={question.references}
                        alternatives={question.alternatives}
                        author={question.author}
                        show={state.showExplanation}
                    />
                </div>
            </CardContent>

            <QuestionVideoModal
                videos={question.videos}
                open={state.showVideos}
                onOpenChange={actions.setShowVideos}
            />
            
            <QuestionReportModal
                questionId={question.id}
                open={state.showReportModal}
                onOpenChange={actions.setShowReportModal}
            />
        </Card>
    )
}
