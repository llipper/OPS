import { notFound } from "next/navigation"

import { CreateQuestionForm } from "@/components/admin/questions/create/create-question-form"
import { prisma } from "@workspace/database"

export const metadata = {
  title: "Editar Questão | Concurso Master Admin",
  description: "Correção editorial de questão antes da publicação.",
}

async function getQuestionFormTaxonomy() {
  const [
    disciplinasRaw,
    assuntos,
    topicos,
    subtopicos,
    bancas,
    concursos,
    carreiras,
    niveis,
    dificuldades,
    tiposQuestaoRaw,
  ] = await Promise.all([
    prisma.disciplina.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, sigla: true },
    }),
    prisma.assunto.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, disciplinaId: true },
    }),
    prisma.topico.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, assuntoId: true },
    }),
    prisma.subtopico.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, topicoId: true },
    }),
    prisma.banca.findMany({
      where: { ativo: true },
      orderBy: { sigla: "asc" },
      select: { id: true, nome: true, sigla: true },
    }),
    prisma.concurso.findMany({
      where: { ativo: true },
      orderBy: [{ ano: "desc" }, { nome: "asc" }],
      select: {
        id: true,
        nome: true,
        ano: true,
        carreiraId: true,
        cargos: {
          where: { ativo: true },
          orderBy: { nome: "asc" },
          select: { id: true, nome: true },
        },
      },
    }),
    prisma.carreira.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: { id: true, nome: true, parentId: true },
    }),
    prisma.nivelEducacional.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
      select: { id: true, nome: true },
    }),
    prisma.dificuldade.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
      select: { id: true, nome: true, slug: true },
    }),
    prisma.tipoQuestao.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
      select: {
        id: true,
        nome: true,
        slug: true,
        formato: true,
        quantidadeAlternativas: true,
      },
    }),
  ])

  return {
    disciplinas: disciplinasRaw.map((disciplina) => ({
      id: disciplina.id,
      nome: disciplina.nome,
      code: disciplina.sigla || "",
    })),
    assuntos,
    topicos,
    subtopicos,
    bancas: bancas.map((banca) => ({ ...banca, sigla: banca.sigla ?? "" })),
    concursos: concursos.map((concurso) => ({
      id: concurso.id,
      nome: concurso.nome,
      ano: concurso.ano,
      cargo: concurso.cargos[0]?.nome ?? null,
      bancaId: null,
      carreiraId: concurso.carreiraId,
    })),
    carreiras,
    niveis,
    dificuldades,
    tiposQuestao: tiposQuestaoRaw.map((tipo) => ({
      id: tipo.id,
      nome: tipo.nome,
      slug: tipo.slug,
      modelo: tipo.formato.toLowerCase(),
      quantidadeAlternativas: tipo.quantidadeAlternativas ?? 5,
    })),
  }
}

export default async function EditarQuestaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [taxonomy, question] = await Promise.all([
    getQuestionFormTaxonomy(),
    prisma.questao.findUnique({
      where: { id },
      select: {
        id: true,
        tipoQuestaoId: true,
        disciplinaId: true,
        assuntoId: true,
        topicoId: true,
        subtopicoId: true,
        bancaId: true,
        concursoId: true,
        cargo: { select: { nome: true } },
        carreiraId: true,
        nivelEducacionalId: true,
        dificuldadeId: true,
        ano: true,
        isUnique: true,
        enunciado: true,
        textoApoio: true,
        resolucao: true,
        videoUrl: true,
        visibility: true,
        alternativas: {
          orderBy: { ordem: "asc" },
          select: {
            letra: true,
            texto: true,
            isCorreta: true,
            explicacao: true,
            referencia: true,
            dica: true,
          },
        },
      },
    }),
  ])

  if (!question) notFound()

  return (
    <div className="p-6">
      <CreateQuestionForm
        taxonomy={taxonomy}
        initialData={{
          id: question.id,
          tipoId: question.tipoQuestaoId,
          disciplinaId: question.disciplinaId,
          assuntoId: question.assuntoId,
          topicoId: question.topicoId,
          subtopicoId: question.subtopicoId,
          bancaId: question.bancaId,
          concursoId: question.concursoId,
          cargo: question.cargo?.nome ?? "",
          carreiraId: question.carreiraId,
          nivelId: question.nivelEducacionalId,
          dificuldadeId: question.dificuldadeId,
          ano: question.ano,
          isInedita: question.isUnique,
          enunciado: question.enunciado,
          textoApoio: question.textoApoio,
          resolucao: question.resolucao,
          videoUrl: question.videoUrl,
          visibilidade: question.visibility,
          alternativas: question.alternativas.map((alternative) => ({
            letter: alternative.letra,
            text: alternative.texto,
            isCorrect: alternative.isCorreta,
            explanation: alternative.explicacao,
            reference: alternative.referencia,
            tip: alternative.dica,
          })),
        }}
      />
    </div>
  )
}
