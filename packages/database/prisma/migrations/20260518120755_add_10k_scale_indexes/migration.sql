-- CreateIndex
CREATE INDEX "assinaturas_usuarioId_status_idx" ON "assinaturas"("usuarioId", "status");

-- CreateIndex
CREATE INDEX "assinaturas_status_expiraEm_idx" ON "assinaturas"("status", "expiraEm");

-- CreateIndex
CREATE INDEX "assinaturas_expiraEm_idx" ON "assinaturas"("expiraEm");

-- CreateIndex
CREATE INDEX "audit_logs_usuarioId_criadoEm_idx" ON "audit_logs"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "audit_logs_acao_criadoEm_idx" ON "audit_logs"("acao", "criadoEm");

-- CreateIndex
CREATE INDEX "audit_logs_criadoEm_idx" ON "audit_logs"("criadoEm");

-- CreateIndex
CREATE INDEX "consentimentos_privacidade_usuarioId_criadoEm_idx" ON "consentimentos_privacidade"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "consentimentos_privacidade_revogadoEm_idx" ON "consentimentos_privacidade"("revogadoEm");

-- CreateIndex
CREATE INDEX "denuncias_status_criadoEm_idx" ON "denuncias"("status", "criadoEm");

-- CreateIndex
CREATE INDEX "denuncias_usuarioId_criadoEm_idx" ON "denuncias"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_simuladoId_idx" ON "diagnosticos_planejamento"("simuladoId");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_tentativaSimuladoId_idx" ON "diagnosticos_planejamento"("tentativaSimuladoId");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_nivelGeral_idx" ON "diagnosticos_planejamento"("nivelGeral");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_topicos_diagnosticoId_prioridade_idx" ON "diagnosticos_planejamento_topicos"("diagnosticoId", "prioridade");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_topicos_nivel_idx" ON "diagnosticos_planejamento_topicos"("nivel");

-- CreateIndex
CREATE INDEX "estatisticas_usuarios_usuarioId_periodo_referencia_idx" ON "estatisticas_usuarios"("usuarioId", "periodo", "referencia");

-- CreateIndex
CREATE INDEX "estatisticas_usuarios_disciplinaId_periodo_referencia_idx" ON "estatisticas_usuarios"("disciplinaId", "periodo", "referencia");

-- CreateIndex
CREATE INDEX "favoritos_usuarioId_criadoEm_idx" ON "favoritos"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "favoritos_questaoId_idx" ON "favoritos"("questaoId");

-- CreateIndex
CREATE INDEX "itens_simulado_questaoId_idx" ON "itens_simulado"("questaoId");

-- CreateIndex
CREATE INDEX "notificacoes_usuarioId_criadoEm_idx" ON "notificacoes"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "notificacoes_usuarioId_lida_criadoEm_idx" ON "notificacoes"("usuarioId", "lida", "criadoEm");

-- CreateIndex
CREATE INDEX "notificacoes_tipo_criadoEm_idx" ON "notificacoes"("tipo", "criadoEm");

-- CreateIndex
CREATE INDEX "pagamentos_usuarioId_criadoEm_idx" ON "pagamentos"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "pagamentos_status_criadoEm_idx" ON "pagamentos"("status", "criadoEm");

-- CreateIndex
CREATE INDEX "pagamentos_gateway_gatewayId_idx" ON "pagamentos"("gateway", "gatewayId");

-- CreateIndex
CREATE INDEX "pedidos_usuarioId_criadoEm_idx" ON "pedidos"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "pedidos_status_criadoEm_idx" ON "pedidos"("status", "criadoEm");

-- CreateIndex
CREATE INDEX "rankings_carreiraId_periodo_referencia_idx" ON "rankings"("carreiraId", "periodo", "referencia");

-- CreateIndex
CREATE INDEX "rankings_usuarioId_periodo_referencia_idx" ON "rankings"("usuarioId", "periodo", "referencia");

-- CreateIndex
CREATE INDEX "rankings_posicao_idx" ON "rankings"("posicao");

-- CreateIndex
CREATE INDEX "recuperacao_senha_usuarioId_idx" ON "recuperacao_senha"("usuarioId");

-- CreateIndex
CREATE INDEX "recuperacao_senha_expiraEm_idx" ON "recuperacao_senha"("expiraEm");

-- CreateIndex
CREATE INDEX "recuperacao_senha_usado_expiraEm_idx" ON "recuperacao_senha"("usado", "expiraEm");

-- CreateIndex
CREATE INDEX "revisoes_usuarioId_status_proximaRevisao_idx" ON "revisoes"("usuarioId", "status", "proximaRevisao");

-- CreateIndex
CREATE INDEX "revisoes_questaoId_idx" ON "revisoes"("questaoId");

-- CreateIndex
CREATE INDEX "sessoes_usuarioId_expiraEm_idx" ON "sessoes"("usuarioId", "expiraEm");

-- CreateIndex
CREATE INDEX "sessoes_expiraEm_idx" ON "sessoes"("expiraEm");

-- CreateIndex
CREATE INDEX "solicitacoes_privacidade_tipo_status_idx" ON "solicitacoes_privacidade"("tipo", "status");

-- CreateIndex
CREATE INDEX "solicitacoes_privacidade_status_criadoEm_idx" ON "solicitacoes_privacidade"("status", "criadoEm");

-- CreateIndex
CREATE INDEX "tentativas_simulado_usuarioId_inicioEm_idx" ON "tentativas_simulado"("usuarioId", "inicioEm");

-- CreateIndex
CREATE INDEX "tentativas_simulado_usuarioId_status_idx" ON "tentativas_simulado"("usuarioId", "status");

-- CreateIndex
CREATE INDEX "tentativas_simulado_simuladoId_status_idx" ON "tentativas_simulado"("simuladoId", "status");

-- CreateIndex
CREATE INDEX "tentativas_simulado_fimEm_idx" ON "tentativas_simulado"("fimEm");

-- CreateIndex
CREATE INDEX "ticket_mensagens_ticketId_criadoEm_idx" ON "ticket_mensagens"("ticketId", "criadoEm");

-- CreateIndex
CREATE INDEX "ticket_mensagens_usuarioId_criadoEm_idx" ON "ticket_mensagens"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "tickets_usuarioId_status_idx" ON "tickets"("usuarioId", "status");

-- CreateIndex
CREATE INDEX "tickets_status_criadoEm_idx" ON "tickets"("status", "criadoEm");

-- CreateIndex
CREATE INDEX "tickets_atendenteId_status_idx" ON "tickets"("atendenteId", "status");

-- CreateIndex
CREATE INDEX "verifications_expiresAt_idx" ON "verifications"("expiresAt");
