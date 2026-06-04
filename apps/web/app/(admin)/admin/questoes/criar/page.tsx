import { CreateQuestionForm } from "@/components/admin/questions/create/create-question-form"
import { prisma } from "@workspace/database"

export const metadata = {
  title: "Criar Questão | Elite OPS Admin",
  description: "Criação avançada de questões com taxonomia e metadados dinâmicos."
}

export default async function CriarQuestaoPage() {
    const [
        disciplinasRaw,
        bancas,
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
        prisma.banca.findMany({
            where: { ativo: true },
            orderBy: { sigla: "asc" },
            select: { id: true, nome: true, sigla: true },
        }),
        prisma.carreira.findMany({
            where: { ativo: true },
            orderBy: { nome: "asc" },
            select: { id: true, nome: true, parentId: true },
        }),
        prisma.nivelEducacional.findMany({
            where: { ativo: true },
            orderBy: { nome: "asc" },
            select: { id: true, nome: true },
        }),
        prisma.dificuldade.findMany({
            where: { ativo: true },
            orderBy: { nome: "asc" },
            select: { id: true, nome: true, slug: true },
        }),
        prisma.tipoQuestao.findMany({
            where: { ativo: true },
            orderBy: { nome: "asc" },
            select: { 
                id: true, 
                nome: true, 
                slug: true, 
                formato: true,
                quantidadeAlternativas: true 
            },
        }),
    ])

    const disciplinas = disciplinasRaw.map(d => ({
        id: d.id,
        nome: d.nome,
        code: d.sigla || ""
    }))

    const tiposQuestao = tiposQuestaoRaw.map(t => ({
        id: t.id,
        nome: t.nome,
        slug: t.slug,
        modelo: t.formato.toLowerCase(),
        quantidadeAlternativas: t.quantidadeAlternativas ?? 5
    }))

    const carreirasMapped = carreiras.map(c => ({
        id: c.id,
        nome: c.nome,
        parentId: c.parentId ?? null,
    }))

    return (
        <CreateQuestionForm
            taxonomy={{
                disciplinas,
                assuntos: [],
                topicos: [],
                subtopicos: [],
                bancas: bancas.map((banca) => ({
                    ...banca,
                    sigla: banca.sigla ?? "",
                })),
                concursos: [],
                carreiras: carreirasMapped,
                niveis,
                dificuldades,
                tiposQuestao,
            }}
        />
    )
}
