"use server"

import { getSecurityContext } from "@/lib/auth/get-security-context"
import { RankingService } from "../services/ranking.service"
import type { RankingData, RankingPeriodo } from "../types/ranking.types"

export type { RankingData, RankingPeriodo } from "../types/ranking.types"

/**
 * Busca os dados de classificação de rankings do aluno autenticado no período correspondente.
 */
export async function getRankingData(
  periodo: RankingPeriodo = "30d"
): Promise<RankingData> {
  const context = await getSecurityContext()
  return RankingService.getRanking(context.userId, periodo)
}
