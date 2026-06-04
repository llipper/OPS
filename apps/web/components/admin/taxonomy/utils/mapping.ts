import { ItemHierarquico, TaxonLevel } from "../types"

/**
 * Mapeia a estrutura de Carreiras (Carreira -> Filha -> Concurso -> Cargo) 
 * para o formato hierárquico usado pelo componente de lista.
 */
export function mapCarreirasToHierarchicalItems(carreiras: any[]): ItemHierarquico[] {
  const items: ItemHierarquico[] = []

  carreiras.forEach((carreira) => {
    items.push({
      id: `carreira-${carreira.id}`,
      rawId: carreira.id,
      title: carreira.nome,
      meta: "CARREIRA",
      active: carreira.ativo,
      indent: 0,
      nivel: "carreira",
      questionsCount: carreira._count?.questoes || 0,
      editHref: "#",
    })

    carreira.children?.forEach((instituicao: any) => {
      items.push({
        id: `instituicao-${instituicao.id}`,
        rawId: instituicao.id,
        title: instituicao.nome,
        active: instituicao.ativo,
        meta: "INSTITUIÇÃO",
        indent: 1,
        nivel: "instituicao",
        parentId: `carreira-${carreira.id}`,
        questionsCount: instituicao._count?.questoes || 0,
        editHref: "#",
      })

      instituicao.children?.forEach((orgao: any) => {
        items.push({
          id: `orgao-${orgao.id}`,
          rawId: orgao.id,
          title: orgao.nome,
          active: orgao.ativo,
          meta: "ÓRGÃO",
          indent: 2,
          nivel: "orgao",
          parentId: `instituicao-${instituicao.id}`,
          questionsCount: orgao._count?.questoes || 0,
          editHref: "#",
        })

        orgao.concursos?.forEach((concurso: any) => {
          items.push({
            id: `concurso-${concurso.id}`,
            rawId: concurso.id,
            title: concurso.nome,
            subtitle: concurso.cargos?.length ? `Cargos: ${concurso.cargos.map((c: any) => c.nome).join(", ")}` : undefined,
            active: concurso.ativo,
            meta: concurso.ano ? `CONCURSO ${concurso.ano}` : "CONCURSO",
            indent: 3,
            nivel: "concurso",
            parentId: `orgao-${orgao.id}`,
            questionsCount: concurso._count?.questoes || 0,
            imageUrl: concurso.imagemUrl,
            ano: concurso.ano,
            cargo: concurso.cargos?.[0]?.nome,
            editHref: "#",
          })

          concurso.cargos?.forEach((cargo: any) => {
            items.push({
              id: `cargo-${cargo.id}`,
              rawId: cargo.id,
              title: cargo.nome,
              active: cargo.ativo,
              meta: "CARGO",
              indent: 4,
              nivel: "cargo",
              parentId: `concurso-${concurso.id}`,
              editHref: "#",
            })
          })
        })
      })
    })
  })

  return items
}

/**
 * Mapeia a estrutura de Disciplinas (Disciplina -> Assunto -> Tópico -> Subtópico)
 */
export function mapDisciplinasToHierarchicalItems(disciplinas: any[]): ItemHierarquico[] {
  const items: ItemHierarquico[] = []

  disciplinas.forEach((disciplina) => {
    items.push({
      id: `disciplina-${disciplina.id}`,
      rawId: disciplina.id,
      title: disciplina.nome,
      subtitle: disciplina.descricao || undefined,
      meta: disciplina.sigla || "",
      active: disciplina.ativo,
      indent: 0,
      nivel: "disciplina",
      questionsCount: disciplina._count?.questoes || 0,
      editHref: `/admin/disciplinas/editar/${disciplina.id}`,
      sigla: disciplina.sigla || "",
    })

    disciplina.assuntos?.forEach((assunto: any) => {
      items.push({
        id: `assunto-${assunto.id}`,
        rawId: assunto.id,
        title: assunto.nome,
        active: assunto.ativo,
        meta: "Assunto",
        indent: 1,
        nivel: "assunto",
        parentId: `disciplina-${disciplina.id}`,
        questionsCount: assunto._count?.questoes || 0,
        editHref: `/admin/assuntos/editar/${assunto.id}`,
      })

      assunto.topicos?.forEach((topico: any) => {
        items.push({
          id: `topico-${topico.id}`,
          rawId: topico.id,
          title: topico.nome,
          active: topico.ativo,
          meta: "Tópico",
          indent: 2,
          nivel: "topico",
          parentId: `assunto-${assunto.id}`,
          questionsCount: topico._count?.questoes || 0,
          editHref: `/admin/assuntos/editar/${topico.id}`,
        })

        topico.subtopicos?.forEach((sub: any) => {
          items.push({
            id: `subtopico-${sub.id}`,
            rawId: sub.id,
            title: sub.nome,
            active: sub.ativo,
            meta: "Subtópico",
            indent: 3,
            nivel: "subtopico",
            parentId: `topico-${topico.id}`,
            questionsCount: sub._count?.questoes || 0,
            editHref: `/admin/assuntos/subtopicos/editar/${sub.id}`,
          })
        })
      })
    })
  })

  return items
}
