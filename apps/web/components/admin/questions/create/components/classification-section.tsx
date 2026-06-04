"use client"

import { FilterSelect } from "@/components/questions/filter"
import { Card, CardContent } from "@workspace/ui/components/card"
import { useQuestionFormContext } from "../context/question-form-context"
import { useTaxonomyCascade } from "../hooks/use-taxonomy-cascade"

export function ClassificationSection() {
    const {
        classification: values,
        formTaxonomy: loadedTaxonomy,
        handleFieldChange,
    } = useQuestionFormContext()

    const { localCarreiraRootId, setLocalCarreiraRootId } = useTaxonomyCascade()

    const hasDisciplina = Boolean(values.disciplinaId)
    const hasAssunto = Boolean(values.assuntoId)
    const hasTopico = Boolean(values.topicoId)
    const hasCarreiraRoot = Boolean(localCarreiraRootId)
    const hasOrgao = Boolean(values.carreiraId)

    const assuntoOptions = hasDisciplina
        ? loadedTaxonomy.assuntos
            .filter((assunto) => assunto.disciplinaId === values.disciplinaId)
            .map((assunto) => ({ label: assunto.nome, value: assunto.id }))
        : []

    const topicoOptions = hasAssunto
        ? loadedTaxonomy.topicos
            .filter((topico) => topico.assuntoId === values.assuntoId)
            .map((topico) => ({ label: topico.nome, value: topico.id }))
        : []

    const subtopicoOptions = hasTopico
        ? loadedTaxonomy.subtopicos
            .filter((subtopico) => subtopico.topicoId === values.topicoId)
            .map((subtopico) => ({ label: subtopico.nome, value: subtopico.id }))
        : []

    const typeOptions = loadedTaxonomy.tiposQuestao.length > 0
        ? loadedTaxonomy.tiposQuestao.map((type) => ({ label: type.nome, value: type.slug }))
        : []

    const carreiraParentMap = new Map<string, string | null>(
        loadedTaxonomy.carreiras.map((c) => [c.id, c.parentId])
    )

    const carreiraRootOptions = loadedTaxonomy.carreiras
        .filter((c) => c.parentId === null)
        .map((c) => ({ label: c.nome, value: c.id }))

    const orgaoOptions = loadedTaxonomy.carreiras
        .filter((c) => {
            if (!c.parentId) return false
            const grandparentId = carreiraParentMap.get(c.parentId)
            if (!grandparentId) return false
            const greatGrandparentId = carreiraParentMap.get(grandparentId)
            if (greatGrandparentId) return false
            return !localCarreiraRootId || grandparentId === localCarreiraRootId
        })
        .map((c) => ({ label: c.nome, value: c.id }))

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
                <div className="h-6 w-6 rounded-md border bg-muted flex items-center justify-center">
                    <span className="text-xs font-black">1</span>
                </div>
                <h2 className="text-xs font-black uppercase tracking-widest text-foreground/70">Classificação da Questão</h2>
            </div>
            <Card className="rounded-xl border shadow-none bg-muted/5">
                <CardContent className="p-6 space-y-8">

                    {/* Linha 1: DISCIPLINA | ASSUNTO | TOPICO | SUBTOPICO | TIPO DE COBRANÇA */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <FilterSelect
                            label="Disciplina"
                            placeholder="Pesquisar disciplina..."
                            options={loadedTaxonomy.disciplinas.map((d) => ({ label: d.nome, value: d.id }))}
                            isMulti={false}
                            value={values.disciplinaId}
                            onValueChange={(val) => handleFieldChange('disciplinaId', val)}
                        />
                        <FilterSelect
                            label="Assunto"
                            placeholder={hasDisciplina ? "Pesquisar assunto..." : "Selecione a disciplina"}
                            options={assuntoOptions}
                            isMulti={false}
                            value={values.assuntoId}
                            disabled={!hasDisciplina}
                            onValueChange={(val) => handleFieldChange('assuntoId', val)}
                        />
                        <FilterSelect
                            label="Tópico"
                            placeholder={hasAssunto ? "Pesquisar tópico..." : "Selecione o assunto"}
                            options={topicoOptions}
                            isMulti={false}
                            value={values.topicoId}
                            disabled={!hasAssunto}
                            onValueChange={(val) => handleFieldChange('topicoId', val)}
                        />
                        <FilterSelect
                            label="Subtópico"
                            placeholder={hasTopico ? "Pesquisar subtópico..." : "Selecione o tópico"}
                            options={subtopicoOptions}
                            isMulti={false}
                            value={values.subtopicoId}
                            disabled={!hasTopico}
                            onValueChange={(val) => handleFieldChange('subtopicoId', val)}
                        />
                        <FilterSelect
                            label="Tipo de Cobrança"
                            placeholder="Ex: Lei Seca"
                            options={[
                                { label: "Lei Seca", value: "lei_seca" },
                                { label: "Doutrina", value: "doutrina" },
                                { label: "Jurisprudência", value: "jurisprudencia" },
                                { label: "Súmulas", value: "sumulas" },
                            ]}
                            isMulti={false}
                            value={values.tipoCobranca}
                            onValueChange={(val) => handleFieldChange('tipoCobranca', val)}
                        />
                    </div>

                    {/* Linha 2: CARREIRA | ORGAO | CONCURSO | CARGO | ESCOLARIDADE */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <FilterSelect
                            label="Carreira"
                            placeholder="Pesquisar carreira..."
                            options={carreiraRootOptions}
                            isMulti={false}
                            value={localCarreiraRootId}
                            onValueChange={(val) => {
                                setLocalCarreiraRootId(val)
                                handleFieldChange('carreiraId', "")
                            }}
                        />
                        <FilterSelect
                            label="Órgão"
                            placeholder={hasCarreiraRoot ? "Ex: PC do Ceará" : "Selecione a carreira"}
                            options={orgaoOptions}
                            isMulti={false}
                            value={values.carreiraId}
                            disabled={!hasCarreiraRoot}
                            emptyText="Nenhum órgão vinculado"
                            onValueChange={(val) => {
                                handleFieldChange('carreiraId', val)
                                if (values.concursoId) {
                                    const conc = loadedTaxonomy.concursos.find(c => c.id === values.concursoId)
                                    if (conc && conc.carreiraId !== val) handleFieldChange('concursoId', "")
                                }
                            }}
                        />
                        <FilterSelect
                            label="Concurso"
                            placeholder="Pesquisar..."
                            options={loadedTaxonomy.concursos.map((c) => ({
                                label: c.ano ? `${c.nome.trim()} (${c.ano})` : c.nome.trim(),
                                value: c.id,
                            }))}
                            isMulti={false}
                            value={values.concursoId}
                            onValueChange={(val) => {
                                handleFieldChange('concursoId', val)
                                const selected = loadedTaxonomy.concursos.find(c => c.id === val)
                                if (selected) {
                                    if (selected.cargo) handleFieldChange('cargo', selected.cargo)
                                    if (selected.carreiraId) handleFieldChange('carreiraId', selected.carreiraId)
                                    if (selected.bancaId) handleFieldChange('bancaId', selected.bancaId)
                                    if (selected.ano) handleFieldChange('year', String(selected.ano))
                                }
                            }}
                        />
                        <FilterSelect
                            label="Cargo"
                            placeholder="Ex: Agente"
                            options={Array.from(new Set(loadedTaxonomy.concursos.map(c => c.cargo).filter(Boolean)))
                                .map(cargo => ({ label: cargo ?? "", value: cargo ?? "" }))}
                            isMulti={false}
                            value={values.cargo}
                            onValueChange={(val) => handleFieldChange('cargo', val)}
                        />
                        <FilterSelect
                            label="Escolaridade"
                            placeholder="Selecione nível"
                            options={loadedTaxonomy.niveis.map((n) => ({ label: n.nome, value: n.id }))}
                            isMulti={false}
                            value={values.nivelId}
                            onValueChange={(val) => handleFieldChange('nivelId', val)}
                        />
                    </div>

                    {/* Linha 3: BANCA | FONTE | QUESTAO INEDITA? | TIPO DE QUESTAO */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <FilterSelect
                            label="Banca"
                            placeholder="Ex: FGV, CESPE"
                            options={loadedTaxonomy.bancas.map((b) => ({ label: b.sigla, value: b.id }))}
                            isMulti={false}
                            value={values.bancaId}
                            onValueChange={(val) => {
                                handleFieldChange('bancaId', val)
                                if (values.concursoId) {
                                    const conc = loadedTaxonomy.concursos.find(c => c.id === values.concursoId)
                                    if (conc && conc.bancaId !== val) handleFieldChange('concursoId', "")
                                }
                            }}
                        />
                        <FilterSelect
                            label="Fonte (Ano)"
                            placeholder="Ano ou Origem"
                            options={Array.from({ length: new Date().getFullYear() - 2000 + 2 }, (_, i) => {
                                const year = (new Date().getFullYear() + 1 - i).toString()
                                return { label: year, value: year }
                            })}
                            isMulti={false}
                            value={values.year}
                            onValueChange={(val) => handleFieldChange('year', val)}
                        />
                        <FilterSelect
                            label="Questão Inédita?"
                            placeholder="Selecione"
                            options={[
                                { label: "Sim", value: "sim" },
                                { label: "Não", value: "nao" },
                            ]}
                            isMulti={false}
                            value={values.isUnique}
                            onValueChange={(val) => handleFieldChange('isUnique', val)}
                        />
                        <FilterSelect
                            label="Tipo de Questão"
                            placeholder="Formato"
                            options={typeOptions}
                            value={values.type}
                            onValueChange={(val) => handleFieldChange('type', val)}
                            isMulti={false}
                        />
                    </div>

                </CardContent>
            </Card>
        </section>
    )
}
