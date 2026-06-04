"use client"

import { Search, Plus, BookOpen, Trash2, X, ChevronUp, ChevronDown, Filter as FilterIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { CareerCarousel } from "./components/career-carousel"
import { FilterSelect } from "./components/filter-select"
import { useQuestionFilter } from "./hooks/use-question-filter"
import { QuestionFilterOptions } from "./types"

export interface QuestionFilterProps {
    options?: QuestionFilterOptions
    onFilter?: (params: URLSearchParams) => void
    onClear?: () => void
}

const ALTERNATIVAS_OPTIONS = [
    { label: "4 Alternativas", value: "4" },
    { label: "5 Alternativas", value: "5" }
]

const PROFESSOR_INDICA_OPTIONS = [
    { label: "Indicação do Professor", value: "indica" },
    { label: "Sem Indicação", value: "sem_indica" }
]

export function QuestionFilter({ options, onFilter, onClear }: QuestionFilterProps) {
    const { state, actions } = useQuestionFilter({ options, onFilter, onClear })

    return (
        <div className="w-full flex flex-col gap-6 mb-12 animate-in fade-in duration-700">
            {/* Seção 1: Concursos */}
            <CareerCarousel 
                activeId={state.selectedConcurso} 
                concursos={state.resolvedOptions.concursos} 
                onSelect={actions.handleConcursoSelect} 
            />

            {/* Seção Dashboard Principal */}
            <div className="bg-card border border-border/40 rounded-2xl dynamic-shadow overflow-hidden transition-all duration-500 ease-in-out">

                {/* Cabeçalho do Dashboard / Barra de Controle */}
                <div className="px-6 py-4 border-b border-border/10 flex items-center justify-between bg-muted/5">
                    <div className="flex items-center gap-3">
                        <FilterIcon className="w-4 h-4 text-primary/60" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Painel de Filtros</h3>
                    </div>
                    <button
                        onClick={() => actions.setIsExpanded(!state.isExpanded)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-primary/5 text-[10px] font-bold text-primary transition-all group"
                    >
                        {state.isExpanded ? (
                            <>
                                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                                Recolher Filtros
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                                Expandir Filtros
                            </>
                        )}
                    </button>
                </div>

                <div className={`p-6 space-y-6 transition-all duration-500 ${state.isExpanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0 py-0 pointer-events-none"}`}>
                    {/* Linha de Busca e Consulta Direta */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Palavra-chave ou código..."
                                className="pl-11 bg-muted/20 border-none rounded-2xl h-10 text-sm focus-visible:ring-2 focus-visible:ring-primary/5"
                            />
                        </div>
                    </div>

                    {/* Hierarquia de Matéria */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <FilterSelect
                            label="Disciplinas"
                            placeholder="Todas as matérias"
                            options={state.resolvedOptions.disciplinas}
                            value={state.selectedDisciplina}
                            onValueChange={(val) => {
                                actions.setSelectedDisciplina(val)
                                actions.setSelectedAssunto("")
                                actions.setSelectedTopico("")
                                actions.setSelectedSubtopico("")
                            }}
                            isMulti={false}
                        />
                        <FilterSelect
                            label="Assuntos"
                            placeholder={state.selectedDisciplina ? "Selecione o assunto" : "Selecione Disciplina"}
                            options={state.resolvedOptions.assuntos.filter(a => a.disciplinaId === state.selectedDisciplina)}
                            value={state.selectedAssunto}
                            disabled={!state.selectedDisciplina}
                            onValueChange={(val) => {
                                actions.setSelectedAssunto(val)
                                actions.setSelectedTopico("")
                                actions.setSelectedSubtopico("")
                            }}
                            isMulti={false}
                        />
                        <FilterSelect
                            label="Tópicos"
                            placeholder={state.selectedAssunto ? "Selecione o tópico" : "Selecione Assunto"}
                            options={state.resolvedOptions.topicos.filter(t => t.assuntoId === state.selectedAssunto)}
                            value={state.selectedTopico}
                            disabled={!state.selectedAssunto}
                            onValueChange={(val) => {
                                actions.setSelectedTopico(val)
                                actions.setSelectedSubtopico("")
                            }}
                            isMulti={false}
                        />
                        <FilterSelect
                            label="Subtópicos"
                            placeholder={state.selectedTopico ? "Selecione o subtópico" : "Selecione Tópico"}
                            options={state.resolvedOptions.subtopicos.filter(s => s.topicoId === state.selectedTopico)}
                            value={state.selectedSubtopico}
                            disabled={!state.selectedTopico}
                            onValueChange={actions.setSelectedSubtopico}
                            isMulti={false}
                        />

                        {/* Filtros Secundários Integrados no mesmo Grid */}
                        <FilterSelect
                            label="Bancas"
                            placeholder="Selecione a Bancas"
                            options={state.resolvedOptions.bancas}
                            value={state.selectedBanca}
                            onValueChange={actions.setSelectedBanca}
                            isMulti={false}
                        />

                        {/* Hierarquia de Carreiras */}
                        <FilterSelect
                            label="Carreira"
                            placeholder="Ex: Policial"
                            options={state.resolvedOptions.carreiras.filter(c => !c.parentId)}
                            value={state.selectedCarreira}
                            isMulti={false}
                            onValueChange={(val) => {
                                actions.setSelectedCarreira(val)
                                actions.setSelectedSubcarreira("")
                                actions.setSelectedOrgao("")
                                actions.setSelectedCargo("")
                            }}
                        />
                        <FilterSelect
                            label="Subcarreira"
                            placeholder={state.selectedCarreira ? "Ex: Militar" : "Selecione Carreira"}
                            options={state.resolvedOptions.carreiras.filter(c => c.parentId === state.selectedCarreira)}
                            value={state.selectedSubcarreira}
                            disabled={!state.selectedCarreira}
                            isMulti={false}
                            onValueChange={(val) => {
                                actions.setSelectedSubcarreira(val)
                                actions.setSelectedOrgao("")
                                actions.setSelectedCargo("")
                            }}
                        />
                        <FilterSelect
                            label="Órgão / Estado"
                            placeholder={state.selectedSubcarreira ? "Ex: PMCE" : "Selecione Subcarreira"}
                            options={state.resolvedOptions.carreiras.filter(c => c.parentId === state.selectedSubcarreira)}
                            value={state.selectedOrgao}
                            disabled={!state.selectedSubcarreira}
                            isMulti={false}
                            onValueChange={(val) => {
                                actions.setSelectedOrgao(val)
                                actions.setSelectedConcurso("all")
                                actions.setSelectedCargo("")
                            }}
                        />

                        <FilterSelect
                            label="Concurso"
                            placeholder={state.selectedOrgao ? "Selecione o concurso" : "Selecione Órgão"}
                            options={state.resolvedOptions.concursos
                                .filter(c => c.carreiraId === state.selectedOrgao)
                                .map(c => ({
                                    label: c.ano ? `${c.name.trim()} (${c.ano})` : c.name.trim(),
                                    value: c.id
                                }))}
                            value={state.selectedConcurso === 'all' ? "" : state.selectedConcurso}
                            disabled={!state.selectedOrgao}
                            isMulti={false}
                            onValueChange={(val) => {
                                actions.setSelectedConcurso(val || "all")
                                actions.setSelectedCargo("")
                            }}
                        />

                        <FilterSelect
                            label="Cargo"
                            placeholder={state.selectedOrgao ? "Selecione o cargo" : "Selecione Órgão"}
                            options={Array.from(new Set(
                                state.resolvedOptions.concursos
                                    .filter(c => 
                                        (state.selectedConcurso !== 'all' ? c.id === state.selectedConcurso : true) &&
                                        c.carreiraId === state.selectedOrgao
                                    )
                                    .flatMap(c => c.cargos ?? [])
                                    .map(cargo => cargo.trim())
                                    .filter(Boolean)
                            )).map(cargo => ({ label: cargo as string, value: cargo as string }))}
                            value={state.selectedCargo}
                            disabled={!state.selectedOrgao}
                            isMulti={false}
                            onValueChange={actions.setSelectedCargo}
                        />
                        <FilterSelect
                            label="Escolaridade"
                            placeholder="Selecione a Escolaridade"
                            options={state.resolvedOptions.escolaridades}
                            isMulti={false}
                        />
                        <FilterSelect
                            label="Ano"
                            placeholder="Selecione o Ano"
                            options={state.resolvedOptions.anos}
                            value={state.selectedAno}
                            onValueChange={actions.setSelectedAno}
                            isMulti={false}
                        />
                        <FilterSelect label="Número de Alternativas" placeholder="4 ou 5" options={ALTERNATIVAS_OPTIONS} isMulti={false} />
                        <FilterSelect
                            label="Nível de Dificuldade"
                            placeholder="Todos"
                            options={state.resolvedOptions.dificuldades}
                            value={state.selectedDificuldade}
                            onValueChange={actions.setSelectedDificuldade}
                            isMulti={false}
                        />
                        <FilterSelect label="Professor Indica" placeholder="Dicas" options={PROFESSOR_INDICA_OPTIONS} isMulti={false} />
                    </div>

                    {/* Barra de Ações Inferior */}
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-border/10">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 border-r border-border/10 pr-6">
                                <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                                    <Plus className="w-4 h-4" />
                                    Criar Simulado
                                </button>
                                <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                                    <BookOpen className="w-4 h-4" />
                                    Meus Simulados
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-48">
                                    <FilterSelect
                                        label=""
                                        placeholder="Cadernos do Professor"
                                        options={options?.topicos ?? []}
                                    />
                                </div>
                                <div className="w-48">
                                    <FilterSelect
                                        label=""
                                        placeholder="Status"
                                        options={[
                                            { label: "Todas", value: "todas" },
                                            { label: "Resolvidas", value: "resolvidas" },
                                            { label: "Não Resolvidas", value: "nao_resolvidas" },
                                            { label: "Acertei", value: "acertei" },
                                            { label: "Errei", value: "errei" }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={actions.clearFilters}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Limpar Filtros
                            </button>
                            <Button
                                onClick={actions.handleFilter}
                                className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl px-10 h-10 font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex gap-2"
                            >
                                <Search className="w-4 h-4" />
                                Filtrar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Área de Filtros Selecionados */}
                {state.activeFilters.length > 0 && (
                    <div className={`flex flex-wrap gap-2 px-6 pb-6 animate-in slide-in-from-top-2 duration-500 ${!state.isExpanded ? "pt-4" : "pt-0 border-t-0"}`}>
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/20 self-center mr-2">Filtros Ativos:</span>
                        {state.activeFilters.map((filter) => (
                            <div
                                key={filter.id}
                                className="flex items-center gap-2 bg-primary/5 border border-primary/10 pl-3 pr-1.5 py-1.5 rounded-full group hover:border-primary/30 transition-all"
                            >
                                <span className="text-[10px] font-bold text-primary/80">{filter.label}</span>
                                <button
                                    onClick={() => actions.removeFilter(filter.id)}
                                    className="p-0.5 rounded-full hover:bg-primary/10 text-primary/40 hover:text-primary transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
