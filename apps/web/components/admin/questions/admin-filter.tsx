"use client"

import { useState } from "react"
import { Search, ChevronUp, ChevronDown, Filter as FilterIcon, X } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { FilterSelect } from "@/components/questions/filter"

interface FilterOption {
  label: string
  value: string
}

interface ConcursoOption {
  id: string
  name: string
  sigla?: string
  ano?: number | string
  status?: string
  logoUrl?: string
  icon?: "shield" | "scale" | "landmark" | "target"
  cargo?: string
  cargos?: { value: string; label: string }[]
  carreiraId?: string
  value?: string
}

interface DisciplinaOption {
  value: string
  label: string
  assuntos: {
    value: string
    label: string
    topicos: {
      value: string
      label: string
      subtopicos: {
        value: string
        label: string
      }[]
    }[]
  }[]
}

interface CarreiraOption {
  value: string
  label: string
  children: {
    value: string
    label: string
    children: {
      value: string
      label: string
    }[]
  }[]
}

interface AdminQuestionFilterProps {
  options: {
    disciplinas: DisciplinaOption[]
    bancas: FilterOption[]
    concursos: ConcursoOption[]
    carreiras: CarreiraOption[]
    escolaridades: FilterOption[]
    dificuldades: { value: string; label: string; cor?: string }[]
    origens: FilterOption[]
    tiposCobranca: FilterOption[]
    exclusividades: FilterOption[]
    tiposQuestao: FilterOption[]
  }
}

export function AdminQuestionFilter({ options }: AdminQuestionFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Selected state for cascading filters
  const [selectedConcurso, setSelectedConcurso] = useState("")
  const [selectedDisciplina, setSelectedDisciplina] = useState("")
  const [selectedAssunto, setSelectedAssunto] = useState("")
  const [selectedTopico, setSelectedTopico] = useState("")
  const [selectedSubtopico, setSelectedSubtopico] = useState("")

  const [selectedBanca, setSelectedBanca] = useState("")
  const [selectedCarreira, setSelectedCarreira] = useState("")
  const [selectedOrgao, setSelectedOrgao] = useState("")
  const [selectedCargo, setSelectedCargo] = useState("")
  const [selectedEscolaridade, setSelectedEscolaridade] = useState("")
  const [selectedDificuldade, setSelectedDificuldade] = useState("")

  // Dynamic metadata filters
  const [selectedOrigem, setSelectedOrigem] = useState("")
  const [selectedTipoCobranca, setSelectedTipoCobranca] = useState("")
  const [selectedIsUnique, setSelectedIsUnique] = useState("")
  const [selectedTipoQuestao, setSelectedTipoQuestao] = useState("")

  // 1. Cascading logic for subject tree
  const activeDisciplinaObj = options.disciplinas.find(d => d.value === selectedDisciplina)
  const assuntosList = activeDisciplinaObj?.assuntos.map(a => ({ value: a.value, label: a.label })) || []

  const activeAssuntoObj = activeDisciplinaObj?.assuntos.find(a => a.value === selectedAssunto)
  const topicosList = activeAssuntoObj?.topicos.map(t => ({ value: t.value, label: t.label })) || []

  const activeTopicoObj = activeAssuntoObj?.topicos.find(t => t.value === selectedTopico)
  const subtopicosList = activeTopicoObj?.subtopicos.map(s => ({ value: s.value, label: s.label })) || []

  // 2. Cascading logic for careers tree (Carreira -> Órgão -> Concurso -> Cargo)
  const activeCarreiraObj = options.carreiras.find(c => c.value === selectedCarreira)
  
  // Recursively gather all organ/child nodes under activeCarreiraObj (only leaf nodes to avoid duplicates)
  const orgaosList = (() => {
    if (!activeCarreiraObj) return []
    const list: { value: string; label: string; hasChildren: boolean }[] = []
    const traverse = (node: any) => {
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => {
          const hasChildren = child.children && child.children.length > 0
          list.push({ value: child.value, label: child.label, hasChildren })
          traverse(child)
        })
      }
    }
    traverse(activeCarreiraObj)
    const unique = Array.from(new Map(list.map(item => [item.value, item])).values())
    return unique
      .filter(item => !item.hasChildren) // Keep only leaf nodes (no sub-children) to prevent duplicate categories
      .map(item => ({ value: item.value, label: item.label }))
  })()

  // Concursos filtered by selectedCarreira / selectedOrgao
  const allowedCarreiraIds = [
    ...(selectedOrgao ? [selectedOrgao] : (selectedCarreira ? [selectedCarreira, ...orgaosList.map(o => o.value)] : []))
  ]
  
  const filteredConcursosList = allowedCarreiraIds.length > 0
    ? options.concursos.filter(c => c.carreiraId && allowedCarreiraIds.includes(c.carreiraId))
    : options.concursos

  // 3. Concursos & cargos hierarchy
  const activeConcursoObj = options.concursos.find(c => c.value === selectedConcurso)
  
  const cargosList = selectedConcurso
    ? activeConcursoObj?.cargos || []
    : filteredConcursosList.flatMap(c => c.cargos || [])

  const handleConcursoSelect = (concursoId: string) => {
    setSelectedConcurso(concursoId)
    setSelectedCargo("") // Reset cargo selection on change
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedConcurso("")
    setSelectedDisciplina("")
    setSelectedAssunto("")
    setSelectedTopico("")
    setSelectedSubtopico("")
    setSelectedBanca("")
    setSelectedCarreira("")
    setSelectedOrgao("")
    setSelectedCargo("")
    setSelectedEscolaridade("")
    setSelectedDificuldade("")
    setSelectedOrigem("")
    setSelectedTipoCobranca("")
    setSelectedIsUnique("")
    setSelectedTipoQuestao("")
  }

  return (
    <div className="w-full flex flex-col gap-6 mb-12 animate-in fade-in duration-700">
      
      {/* Seção Dashboard Principal */}
      <div className="bg-background/40 backdrop-blur-3xl border border-border/40 rounded-[2rem] shadow-sm overflow-hidden transition-all duration-500">
        
        {/* Cabeçalho do Dashboard / Barra de Controle */}
        <div className="px-6 py-4 border-b border-border/10 flex items-center justify-between bg-muted/5">
          <div className="flex items-center gap-3">
            <FilterIcon className="w-4 h-4 text-primary/60" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Painel de Filtros Administrativos</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-primary/5 text-[10px] font-bold text-primary transition-all group"
          >
            {isExpanded ? (
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

        {/* Dashboard Panels */}
        <div className={`p-6 space-y-6 transition-all duration-500 ${isExpanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0 py-0 pointer-events-none"}`}>
         

          {/* Hierarquia de Matéria (Cascateamento Real) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FilterSelect
              label="Disciplinas"
              placeholder="Todas as matérias"
              options={options.disciplinas.map(d => ({ value: d.value, label: d.label }))}
              value={selectedDisciplina}
              onValueChange={(val) => {
                setSelectedDisciplina(val)
                setSelectedAssunto("")
                setSelectedTopico("")
                setSelectedSubtopico("")
              }}
              isMulti={false}
            />
            <FilterSelect
              label="Assuntos"
              placeholder={selectedDisciplina ? "Selecione o assunto" : "Selecione Disciplina"}
              options={assuntosList}
              value={selectedAssunto}
              disabled={!selectedDisciplina}
              onValueChange={(val) => {
                setSelectedAssunto(val)
                setSelectedTopico("")
                setSelectedSubtopico("")
              }}
              isMulti={false}
            />
            <FilterSelect
              label="Tópicos"
              placeholder={selectedAssunto ? "Selecione o tópico" : "Selecione Assunto"}
              options={topicosList}
              value={selectedTopico}
              disabled={!selectedAssunto}
              onValueChange={(val) => {
                setSelectedTopico(val)
                setSelectedSubtopico("")
              }}
              isMulti={false}
            />
            <FilterSelect
              label="Subtópicos"
              placeholder={selectedTopico ? "Selecione o subtópico" : "Selecione Tópico"}
              options={subtopicosList}
              value={selectedSubtopico}
              disabled={!selectedTopico}
              onValueChange={setSelectedSubtopico}
              isMulti={false}
            />
          </div>

          {/* Grid secundário de filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            

            <FilterSelect
              label="Carreira"
              placeholder="Ex: Policial"
              options={options.carreiras.map(c => ({ value: c.value, label: c.label }))}
              value={selectedCarreira}
              onValueChange={(val) => {
                setSelectedCarreira(val)
                setSelectedOrgao("")
                setSelectedConcurso("")
                setSelectedCargo("")
              }}
              isMulti={false}
            />

            <FilterSelect
              label="Órgão / Estado"
              placeholder={selectedCarreira ? "Ex: PMCE" : "Selecione Carreira"}
              options={orgaosList}
              value={selectedOrgao}
              disabled={!selectedCarreira}
              onValueChange={(val) => {
                setSelectedOrgao(val)
                setSelectedConcurso("")
                setSelectedCargo("")
              }}
              isMulti={false}
            />

            <FilterSelect
              label="Concursos"
              placeholder={selectedOrgao ? "Selecione o Concurso" : "Selecione Órgão"}
              options={filteredConcursosList
                .filter((c): c is typeof c & { value: string } => Boolean(c.value))
                .map(c => ({ value: c.value, label: `${c.name}${c.sigla ? ` (${c.sigla})` : ""}` }))}
              value={selectedConcurso}
              disabled={!selectedOrgao && !selectedCarreira}
              onValueChange={handleConcursoSelect}
              isMulti={false}
            />

            {/* ROW 2 */}
            <FilterSelect
              label="Cargo"
              placeholder={
                selectedConcurso
                  ? "Selecione o Cargo"
                  : (selectedOrgao ? "Selecione Cargo do Órgão" : "Selecione Concurso")
              }
              options={cargosList}
              value={selectedCargo}
              disabled={cargosList.length === 0}
              onValueChange={setSelectedCargo}
              isMulti={false}
            />
            
            {/* ROW 1 */}
            <FilterSelect
              label="Bancas"
              placeholder="Selecione a Banca"
              options={options.bancas}
              value={selectedBanca}
              onValueChange={setSelectedBanca}
              isMulti={false}
            />

            <FilterSelect
              label="Escolaridade"
              placeholder="Selecione a Escolaridade"
              options={options.escolaridades}
              value={selectedEscolaridade}
              onValueChange={setSelectedEscolaridade}
              isMulti={false}
            />

            <FilterSelect
              label="Dificuldade"
              placeholder="Todas"
              options={options.dificuldades}
              value={selectedDificuldade}
              onValueChange={setSelectedDificuldade}
              isMulti={false}
            />

            {/* Spacer for row 2 column 4 */}
            

            {/* ROW 3 (Metadata Filters) */}
            <FilterSelect
              label="Origem da Questão"
              placeholder="Todas"
              options={options.origens}
              value={selectedOrigem}
              onValueChange={setSelectedOrigem}
              isMulti={false}
            />
            <FilterSelect
              label="Tipo de Cobrança"
              placeholder="Todas"
              options={options.tiposCobranca}
              value={selectedTipoCobranca}
              onValueChange={setSelectedTipoCobranca}
              isMulti={false}
            />
            <FilterSelect
              label="Exclusividade"
              placeholder="Todas"
              options={options.exclusividades}
              value={selectedIsUnique}
              onValueChange={setSelectedIsUnique}
              isMulti={false}
            />
            <FilterSelect
              label="Tipo de Questão"
              placeholder="Todos"
              options={options.tiposQuestao}
              value={selectedTipoQuestao}
              onValueChange={setSelectedTipoQuestao}
              isMulti={false}
            />

            {/* ROW 4 */}
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>
            <div className="hidden lg:block"></div>

            <div className="flex flex-col justify-end">
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 h-10 border border-dashed border-red-500/20 hover:border-red-500/40 text-xs font-bold text-red-500 rounded-2xl transition-all"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
