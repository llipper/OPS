-- CreateIndex
CREATE INDEX "questoes_status_disciplinaId_idx" ON "questoes"("status", "disciplinaId");

-- CreateIndex
CREATE INDEX "questoes_status_bancaId_idx" ON "questoes"("status", "bancaId");

-- CreateIndex
CREATE INDEX "questoes_status_concursoId_idx" ON "questoes"("status", "concursoId");

-- CreateIndex
CREATE INDEX "questoes_disciplinaId_assuntoId_topicoId_subtopicoId_idx" ON "questoes"("disciplinaId", "assuntoId", "topicoId", "subtopicoId");

-- CreateIndex
CREATE INDEX "questoes_tipoCobranca_idx" ON "questoes"("tipoCobranca");

-- CreateIndex
CREATE INDEX "questoes_dificuldadeId_idx" ON "questoes"("dificuldadeId");

-- CreateIndex
CREATE INDEX "questoes_access_idx" ON "questoes"("access");

-- CreateIndex
CREATE INDEX "questoes_criadoEm_idx" ON "questoes"("criadoEm");

-- CreateIndex
CREATE INDEX "questoes_status_access_idx" ON "questoes"("status", "access");

-- CreateIndex
CREATE INDEX "questoes_status_origem_idx" ON "questoes"("status", "origem");

-- CreateIndex
CREATE INDEX "respostas_usuarios_usuarioId_respondidoEm_idx" ON "respostas_usuarios"("usuarioId", "respondidoEm");

-- CreateIndex
CREATE INDEX "respostas_usuarios_usuarioId_isCorreta_idx" ON "respostas_usuarios"("usuarioId", "isCorreta");

-- CreateIndex
CREATE INDEX "respostas_usuarios_questaoId_respondidoEm_idx" ON "respostas_usuarios"("questaoId", "respondidoEm");

-- CreateIndex
CREATE INDEX "respostas_usuarios_simuladoTentativaId_idx" ON "respostas_usuarios"("simuladoTentativaId");

-- CreateIndex
CREATE INDEX "respostas_usuarios_cadernoId_idx" ON "respostas_usuarios"("cadernoId");
