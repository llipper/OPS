import { prisma } from "@workspace/database"

import { ImportQuestionsForm } from "@/components/admin/questions/import/import-questions-form"

export const metadata = {
  title: "Importar Questões | Concurso Master Admin",
  description: "Importação assistida de questões para revisão editorial.",
}

export default async function ImportarQuestoesPage() {
  const [
    disciplinas,
    bancas,
    concursos,
    carreiras,
    niveis,
    dificuldades,
    tiposQuestao,
  ] = await Promise.all([
    prisma.disciplina.findMany({
      where: { ativo: true },
      orderBy: { nome: "asc" },
      select: {
        id: true,
        nome: true,
        assuntos: {
          where: { ativo: true },
          orderBy: { nome: "asc" },
          select: {
            id: true,
            nome: true,
            topicos: {
              where: { ativo: true },
              orderBy: { nome: "asc" },
              select: {
                id: true,
                nome: true,
                subtopicos: {
                  where: { ativo: true },
                  orderBy: { nome: "asc" },
                  select: { id: true, nome: true },
                },
              },
            },
          },
        },
      },
    }),
    prisma.banca.findMany({
      where: { ativo: true },
      orderBy: [{ sigla: "asc" }, { nome: "asc" }],
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
      where: {
        ativo: true,
        formato: {
          in: ["ALTERNATIVAS", "CERTO_ERRADO"],
        },
      },
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

  return (
    <ImportQuestionsForm
      options={{
        disciplinas,
        bancas: bancas.map((banca) => ({
          ...banca,
          sigla: banca.sigla ?? "",
        })),
        concursos,
        carreiras,
        niveis,
        dificuldades,
        tiposQuestao,
      }}
    />
  )
}
