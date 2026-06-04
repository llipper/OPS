import { useEffect, useState } from "react"
import { useQuestionFormContext } from "../context/question-form-context"

export function useTaxonomyCascade() {
    const {
        classification: values,
        formTaxonomy: loadedTaxonomy,
        setFormTaxonomy: setLoadedTaxonomy,
    } = useQuestionFormContext()

    const [localCarreiraRootId, setLocalCarreiraRootId] = useState("")

    // Sincroniza localCarreiraRootId se values.carreiraId (Órgão) for atualizado (ex: auto-preenchimento por concurso)
    useEffect(() => {
        if (!values.carreiraId) {
            setLocalCarreiraRootId("")
            return
        }
        const parentMap = new Map<string, string | null>(
            loadedTaxonomy.carreiras.map((c) => [c.id, c.parentId])
        )
        const parentId = parentMap.get(values.carreiraId)
        if (parentId) {
            const grandparentId = parentMap.get(parentId)
            if (grandparentId) {
                setLocalCarreiraRootId(grandparentId)
            } else {
                setLocalCarreiraRootId(parentId)
            }
        }
    }, [values.carreiraId, loadedTaxonomy.carreiras])

    useEffect(() => {
        if (!values.disciplinaId) return
        if (loadedTaxonomy.assuntos.some((assunto) => assunto.disciplinaId === values.disciplinaId)) return

        fetchTaxonomy("assuntos", { disciplinaId: values.disciplinaId })
            .then((assuntos) => setLoadedTaxonomy((current) => ({
                ...current,
                assuntos: mergeById(current.assuntos, assuntos)
            })))
            .catch(() => undefined)
    }, [loadedTaxonomy.assuntos, values.disciplinaId])

    useEffect(() => {
        if (!values.assuntoId) return
        if (loadedTaxonomy.topicos.some((topico) => topico.assuntoId === values.assuntoId)) return

        fetchTaxonomy("topicos", { assuntoId: values.assuntoId })
            .then((topicos) => setLoadedTaxonomy((current) => ({
                ...current,
                topicos: mergeById(current.topicos, topicos)
            })))
            .catch(() => undefined)
    }, [loadedTaxonomy.topicos, values.assuntoId])

    useEffect(() => {
        if (!values.topicoId) return
        if (loadedTaxonomy.subtopicos.some((subtopico) => subtopico.topicoId === values.topicoId)) return

        fetchTaxonomy("subtopicos", { topicoId: values.topicoId })
            .then((subtopicos) => setLoadedTaxonomy((current) => ({
                ...current,
                subtopicos: mergeById(current.subtopicos, subtopicos)
            })))
            .catch(() => undefined)
    }, [loadedTaxonomy.subtopicos, values.topicoId])

    useEffect(() => {
        fetchTaxonomy("concursos", {
            bancaId: values.bancaId,
            carreiraId: values.carreiraId,
        })
            .then((concursos) => {
                setLoadedTaxonomy((current) => ({
                    ...current,
                    concursos: mergeById(current.concursos, concursos),
                }))
            })
            .catch(() => undefined)
    }, [values.bancaId, values.carreiraId])

    return {
        localCarreiraRootId,
        setLocalCarreiraRootId,
    }
}

async function fetchTaxonomy(resource: string, params: Record<string, string | undefined>) {
    const searchParams = new URLSearchParams({ resource })

    Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.set(key, value)
    })

    const response = await fetch(`/api/admin/taxonomy?${searchParams.toString()}`)
    if (!response.ok) throw new Error("Não foi possível carregar a classificação.")

    return response.json()
}

function mergeById<T extends { id: string }>(current: T[], incoming: T[]) {
    const items = new Map(current.map((item) => [item.id, item]))

    incoming.forEach((item) => {
        items.set(item.id, item)
    })

    return Array.from(items.values())
}
