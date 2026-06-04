import { PrismaClient, type Prisma } from "@prisma/client"

import { prisma } from "../index"

type QuestionCodeClient = PrismaClient | Prisma.TransactionClient

export async function generateQuestionCode(client: QuestionCodeClient = prisma): Promise<string> {
  const result = await client.$queryRaw<Array<{ nextval: bigint }>>`
    SELECT nextval('questao_seq')
  `

  const nextValue = result[0]?.nextval

  if (nextValue === undefined) {
    throw new Error("Não foi possível gerar o código sequencial da questão.")
  }

  return `QT-${String(Number(nextValue)).padStart(4, "0")}`
}
