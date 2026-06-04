import { auth } from "@workspace/auth"
import { prisma } from "@workspace/database"
import { validateAccess, PERMISSIONS } from "@workspace/permissions"
import { NextResponse } from "next/server"
import { z } from "zod"

const uuidSchema = z.string().uuid()

const taxonomyQuerySchema = z.discriminatedUnion("resource", [
  z.object({
    resource: z.literal("assuntos"),
    disciplinaId: uuidSchema.optional(),
  }),
  z.object({
    resource: z.literal("topicos"),
    assuntoId: uuidSchema.optional(),
  }),
  z.object({
    resource: z.literal("subtopicos"),
    topicoId: uuidSchema.optional(),
  }),
  z.object({
    resource: z.literal("concursos"),
    carreiraId: uuidSchema.optional(),
  }),
])

async function authorize() {
  const session = await auth()
  if (!session?.user?.id) {
    return { ok: false, status: 401 as const }
  }

  try {
    validateAccess(
      { userId: session.user.id, role: session.user.role },
      PERMISSIONS.MANAGE_QUESTIONS
    )
    return { ok: true, status: 200 as const }
  } catch {
    return { ok: false, status: 403 as const }
  }
}

export async function GET(request: Request) {
  const authResult = await authorize()
  if (!authResult.ok) {
    return NextResponse.json(
      {
        error:
          authResult.status === 401
            ? "Não autenticado."
            : "Permissão insuficiente.",
      },
      { status: authResult.status }
    )
  }

  const { searchParams } = new URL(request.url)
  const parsedQuery = taxonomyQuerySchema.safeParse({
    resource: searchParams.get("resource"),
    disciplinaId: searchParams.get("disciplinaId") ?? undefined,
    assuntoId: searchParams.get("assuntoId") ?? undefined,
    topicoId: searchParams.get("topicoId") ?? undefined,
    carreiraId: searchParams.get("carreiraId") ?? undefined,
  })

  if (!parsedQuery.success) {
    return NextResponse.json({ error: "Parâmetros inválidos." }, { status: 400 })
  }

  const query = parsedQuery.data

  switch (query.resource) {
    case "assuntos": {
      const disciplinaId = query.disciplinaId
      if (!disciplinaId) return NextResponse.json([])

      const assuntos = await prisma.assunto.findMany({
        where: { ativo: true, disciplinaId },
        orderBy: { nome: "asc" },
        select: { id: true, nome: true, disciplinaId: true },
      })

      return NextResponse.json(assuntos)
    }

    case "topicos": {
      const assuntoId = query.assuntoId
      if (!assuntoId) return NextResponse.json([])

      const topicos = await prisma.topico.findMany({
        where: { ativo: true, assuntoId },
        orderBy: { nome: "asc" },
        select: { id: true, nome: true, assuntoId: true },
      })

      return NextResponse.json(topicos)
    }

    case "subtopicos": {
      const topicoId = query.topicoId
      if (!topicoId) return NextResponse.json([])

      const subtopicos = await prisma.subtopico.findMany({
        where: { ativo: true, topicoId },
        orderBy: { nome: "asc" },
        select: { id: true, nome: true, topicoId: true },
      })

      return NextResponse.json(subtopicos)
    }

    case "concursos": {
      const carreiraId = query.carreiraId

      const concursos = await prisma.concurso.findMany({
        where: {
          ativo: true,
          ...(carreiraId ? { carreiraId } : {}),
        },
        orderBy: [{ ano: "desc" }, { nome: "asc" }],
        take: 100,
        select: { 
          id: true, 
          nome: true, 
          ano: true, 
          carreiraId: true,
          cargos: {
            where: { ativo: true },
            select: { nome: true }
          }
        },
      })

      const mappedConcursos = concursos.map(c => ({
        id: c.id,
        nome: c.nome.trim(),
        ano: c.ano,
        carreiraId: c.carreiraId,
        cargo: c.cargos[0]?.nome || null
      }))

      return NextResponse.json(mappedConcursos)
    }

  }
}
