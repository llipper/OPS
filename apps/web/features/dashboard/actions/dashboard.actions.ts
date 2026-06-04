"use server"

import { getSecurityContext } from "@/lib/auth/get-security-context"
import { DashboardService } from "../services/dashboard.service"
import type { DashboardData, DashboardPeriodo } from "../types/dashboard.types"

export type { DashboardData, DashboardPeriodo } from "../types/dashboard.types"

/**
 * Busca todos os dados necessários para o dashboard do aluno autenticado.
 */
export async function getDashboardData(
  periodo: DashboardPeriodo = "30d"
): Promise<DashboardData> {
  const context = await getSecurityContext()
  return DashboardService.getData(context, periodo)
}
