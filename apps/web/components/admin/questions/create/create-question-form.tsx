"use client"

import { useLayout } from "@/contexts/layout-context"
import { ChevronLeft, ChevronRight, LayoutList, ListOrdered, CheckCircle2, Plus } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@workspace/ui/components/dialog"
import { useRouter } from "next/navigation"

import { QuestionFormProvider, useQuestionFormContext } from "./context/question-form-context"
import { QuestionTaxonomyOptions } from "./types"

// Subcomponentes modularizados
import { FormActions } from "./components/form-actions"
import { ClassificationSection } from "./components/classification-section"
import { StatementSection } from "./components/statement-section"
import { AlternativesSection } from "./components/alternatives-section"
import { ResolutionSection } from "./components/resolution-section"
import { ExplanationsSection } from "./components/explanations-section"
import { MaterialsSection } from "./components/materials-section"
import { SettingsPanel } from "./components/settings-panel"
import { PreviewPanel } from "./components/preview-panel"
import { PreviewModal } from "./components/preview-modal"

function CreateQuestionFormInner() {
    const router = useRouter()
    const { containerWidth } = useLayout()
    const {
        classification,
        alternativas,
        currentStep,
        isWizardMode,
        setIsWizardMode,
        formError,
        showSuccessModal,
        setShowSuccessModal,
        isPending,
        isEditing,
        totalSteps,
        handleAddAlternative,
        nextStep,
        prevStep,
        handleSubmit,
        handleResetForm,
        formTaxonomy,
    } = useQuestionFormContext()

    const selectedType = formTaxonomy.tiposQuestao.find((type) => type.slug === classification.type)
    const isAlternativesType = selectedType?.modelo?.toLowerCase() === "alternativas"

    const renderStep = (stepNumber: number) => {
        switch (stepNumber) {
            case 1: return <ClassificationSection />
            case 2: return <StatementSection />
            case 3: return (
                <div className="space-y-4">
                    <AlternativesSection />
                    {isAlternativesType && alternativas.length < 5 && (
                        <div className="flex justify-center -mt-2">
                            <Button 
                                type="button"
                                variant="outline" 
                                size="sm" 
                                onClick={handleAddAlternative}
                                className="border-dashed"
                            >
                                <Plus className="mr-2 h-3 w-3" /> Adicionar Alternativa
                            </Button>
                        </div>
                    )}
                </div>
            )
            case 4: return <ResolutionSection />
            case 5: return <ExplanationsSection />
            case 6: return <MaterialsSection />
            case 7: return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <PreviewPanel />
                    </div>
                    <div>
                        <SettingsPanel />
                    </div>
                </div>
            )
            default: return null
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
            <FormActions />

            <div className={`pb-20 px-4 transition-all duration-300 ${containerWidth === "focused" ? "max-w-[1200px] mx-auto" : "w-full max-w-[1700px] mx-auto"}`}>
                {formError && (
                    <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                        {formError}
                    </div>
                )}

                {/* Seletor de Modo e Progresso */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-1">
                        <Button
                            variant={!isWizardMode ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setIsWizardMode(false)}
                        >
                            <LayoutList className="mr-2 h-3.5 w-3.5" /> Visão Geral
                        </Button>
                        <Button
                            variant={isWizardMode ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setIsWizardMode(true)}
                        >
                            <ListOrdered className="mr-2 h-3.5 w-3.5" /> Passo a Passo
                        </Button>
                    </div>

                    {isWizardMode && (
                        <div className="flex items-center gap-3 flex-1 max-w-md">
                            <Progress value={(currentStep / totalSteps) * 100} className="flex-1 h-1.5" />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                Etapa {currentStep} de {totalSteps}
                            </span>
                        </div>
                    )}
                </div>

                {/* Área de Conteúdo */}
                <div className="min-h-[400px]">
                    {!isWizardMode ? (
                        <div className="space-y-8">
                            {[1, 2, 3, 4, 5, 6, 7].map(step => (
                                <div key={step}>{renderStep(step)}</div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {renderStep(currentStep)}
                            
                            {/* Navegação do Wizard */}
                            <div className="flex items-center justify-between pt-6 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                                </Button>

                                {currentStep < totalSteps ? (
                                    <Button size="sm" onClick={nextStep}>
                                        Próxima Etapa <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        className="bg-emerald-600 hover:bg-emerald-700"
                                        disabled={isPending}
                                        onClick={() => handleSubmit("published")}
                                    >
                                        {isEditing ? "Finalizar Edição" : "Finalizar e Publicar"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <PreviewModal />

            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle2 className="w-5 h-5" />
                            Questão Publicada!
                        </DialogTitle>
                        <DialogDescription>
                            O que você deseja fazer agora?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3 py-4">
                        <Button 
                            variant="default" 
                            className="justify-start gap-3 h-12 bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => handleResetForm(true)}
                        >
                            <LayoutList className="w-4 h-4" />
                            Continuar nesta Classificação
                            <span className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded">Recomendado</span>
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            className="justify-start gap-3 h-12"
                            onClick={() => handleResetForm(false)}
                        >
                            <Plus className="w-4 h-4" />
                            Criar Nova (Limpar Tudo)
                        </Button>

                        <Button 
                            variant="ghost" 
                            className="justify-start gap-3 h-12 text-muted-foreground"
                            onClick={() => router.push("/admin/questoes")}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Sair e ir para Listagem
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export function CreateQuestionForm({ taxonomy, initialData }: { taxonomy: QuestionTaxonomyOptions; initialData?: any }) {
    return (
        <QuestionFormProvider taxonomy={taxonomy} initialData={initialData}>
            <CreateQuestionFormInner />
        </QuestionFormProvider>
    )
}
