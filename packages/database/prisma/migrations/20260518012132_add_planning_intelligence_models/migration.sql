-- CreateEnum
CREATE TYPE "StatusCoberturaEdital" AS ENUM ('COBERTO', 'NAO_COBERTO', 'REVISAR');

-- CreateEnum
CREATE TYPE "NivelDiagnostico" AS ENUM ('OTIMO', 'BOM', 'MEDIO', 'FRACO', 'CRITICO');

-- CreateEnum
CREATE TYPE "PrioridadeEstudo" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'MAXIMA');

-- CreateTable
CREATE TABLE "editais_concurso" (
    "id" TEXT NOT NULL,
    "concursoId" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "fonteUrl" TEXT,
    "arquivoUrl" TEXT,
    "totalQuestoes" INTEGER,
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "editais_concurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editais_disciplinas" (
    "id" TEXT NOT NULL,
    "editalId" TEXT NOT NULL,
    "disciplinaId" TEXT,
    "nome" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "quantidadeQuestoes" INTEGER,
    "pesoPercentual" DECIMAL(6,3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "editais_disciplinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editais_assuntos" (
    "id" TEXT NOT NULL,
    "editalDisciplinaId" TEXT NOT NULL,
    "assuntoId" TEXT,
    "nome" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "editais_assuntos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editais_topicos" (
    "id" TEXT NOT NULL,
    "editalAssuntoId" TEXT NOT NULL,
    "topicoId" TEXT,
    "nome" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "editais_topicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provas_concurso_questoes" (
    "id" TEXT NOT NULL,
    "concursoId" TEXT NOT NULL,
    "questaoId" TEXT,
    "bancaId" TEXT,
    "editalDisciplinaId" TEXT,
    "disciplinaId" TEXT,
    "assuntoId" TEXT,
    "topicoId" TEXT,
    "identificadorExterno" TEXT,
    "ano" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "dominio" TEXT,
    "assuntoNome" TEXT,
    "topicoNome" TEXT,
    "statusCoberturaEdital" "StatusCoberturaEdital" NOT NULL DEFAULT 'REVISAR',
    "confiancaClassificacao" TEXT,
    "fonteArquivo" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subtopicoId" TEXT,

    CONSTRAINT "provas_concurso_questoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matrizes_incidencia_topicos" (
    "id" TEXT NOT NULL,
    "carreiraId" TEXT NOT NULL,
    "concursoId" TEXT,
    "editalDisciplinaId" TEXT,
    "disciplinaId" TEXT,
    "assuntoId" TEXT,
    "topicoId" TEXT,
    "dominio" TEXT NOT NULL,
    "assuntoNome" TEXT NOT NULL,
    "topicoNome" TEXT NOT NULL,
    "anosAnalisados" INTEGER[],
    "totalQuestoes" INTEGER NOT NULL DEFAULT 0,
    "concursosComCobranca" INTEGER NOT NULL DEFAULT 0,
    "taxaIncidencia" DECIMAL(6,3) NOT NULL DEFAULT 0,
    "pesoPlanejamento" DECIMAL(6,3) NOT NULL DEFAULT 0,
    "fonte" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matrizes_incidencia_topicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnosticos_planejamento" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "carreiraId" TEXT,
    "concursoAlvoId" TEXT,
    "simuladoId" TEXT,
    "tentativaSimuladoId" TEXT,
    "matrizFonte" TEXT,
    "totalQuestoes" INTEGER NOT NULL DEFAULT 0,
    "totalCorretas" INTEGER NOT NULL DEFAULT 0,
    "taxaAcerto" DECIMAL(6,3) NOT NULL DEFAULT 0,
    "nivelGeral" "NivelDiagnostico" NOT NULL DEFAULT 'MEDIO',
    "recomendacoes" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diagnosticos_planejamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnosticos_planejamento_topicos" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "disciplinaId" TEXT,
    "assuntoId" TEXT,
    "topicoId" TEXT,
    "disciplinaNome" TEXT NOT NULL,
    "assuntoNome" TEXT NOT NULL,
    "topicoNome" TEXT NOT NULL,
    "totalQuestoes" INTEGER NOT NULL DEFAULT 0,
    "totalCorretas" INTEGER NOT NULL DEFAULT 0,
    "taxaAcerto" DECIMAL(6,3) NOT NULL DEFAULT 0,
    "taxaIncidencia" DECIMAL(6,3) NOT NULL DEFAULT 0,
    "pesoPlanejamento" DECIMAL(6,3) NOT NULL DEFAULT 0,
    "nivel" "NivelDiagnostico" NOT NULL,
    "prioridade" "PrioridadeEstudo" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diagnosticos_planejamento_topicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "editais_concurso_ano_idx" ON "editais_concurso"("ano");

-- CreateIndex
CREATE UNIQUE INDEX "editais_concurso_concursoId_ano_key" ON "editais_concurso"("concursoId", "ano");

-- CreateIndex
CREATE INDEX "editais_disciplinas_disciplinaId_idx" ON "editais_disciplinas"("disciplinaId");

-- CreateIndex
CREATE UNIQUE INDEX "editais_disciplinas_editalId_nome_key" ON "editais_disciplinas"("editalId", "nome");

-- CreateIndex
CREATE INDEX "editais_assuntos_assuntoId_idx" ON "editais_assuntos"("assuntoId");

-- CreateIndex
CREATE UNIQUE INDEX "editais_assuntos_editalDisciplinaId_nome_key" ON "editais_assuntos"("editalDisciplinaId", "nome");

-- CreateIndex
CREATE INDEX "editais_topicos_topicoId_idx" ON "editais_topicos"("topicoId");

-- CreateIndex
CREATE UNIQUE INDEX "editais_topicos_editalAssuntoId_nome_key" ON "editais_topicos"("editalAssuntoId", "nome");

-- CreateIndex
CREATE INDEX "provas_concurso_questoes_ano_idx" ON "provas_concurso_questoes"("ano");

-- CreateIndex
CREATE INDEX "provas_concurso_questoes_questaoId_idx" ON "provas_concurso_questoes"("questaoId");

-- CreateIndex
CREATE INDEX "provas_concurso_questoes_disciplinaId_assuntoId_topicoId_idx" ON "provas_concurso_questoes"("disciplinaId", "assuntoId", "topicoId");

-- CreateIndex
CREATE UNIQUE INDEX "provas_concurso_questoes_concursoId_numero_key" ON "provas_concurso_questoes"("concursoId", "numero");

-- CreateIndex
CREATE INDEX "matrizes_incidencia_topicos_carreiraId_idx" ON "matrizes_incidencia_topicos"("carreiraId");

-- CreateIndex
CREATE INDEX "matrizes_incidencia_topicos_concursoId_idx" ON "matrizes_incidencia_topicos"("concursoId");

-- CreateIndex
CREATE INDEX "matrizes_incidencia_topicos_disciplinaId_assuntoId_topicoId_idx" ON "matrizes_incidencia_topicos"("disciplinaId", "assuntoId", "topicoId");

-- CreateIndex
CREATE INDEX "matrizes_incidencia_topicos_dominio_assuntoNome_topicoNome_idx" ON "matrizes_incidencia_topicos"("dominio", "assuntoNome", "topicoNome");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_usuarioId_criadoEm_idx" ON "diagnosticos_planejamento"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_carreiraId_idx" ON "diagnosticos_planejamento"("carreiraId");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_concursoAlvoId_idx" ON "diagnosticos_planejamento"("concursoAlvoId");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_topicos_diagnosticoId_idx" ON "diagnosticos_planejamento_topicos"("diagnosticoId");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_topicos_prioridade_idx" ON "diagnosticos_planejamento_topicos"("prioridade");

-- CreateIndex
CREATE INDEX "diagnosticos_planejamento_topicos_disciplinaId_assuntoId_to_idx" ON "diagnosticos_planejamento_topicos"("disciplinaId", "assuntoId", "topicoId");

-- AddForeignKey
ALTER TABLE "editais_concurso" ADD CONSTRAINT "editais_concurso_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editais_disciplinas" ADD CONSTRAINT "editais_disciplinas_editalId_fkey" FOREIGN KEY ("editalId") REFERENCES "editais_concurso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editais_disciplinas" ADD CONSTRAINT "editais_disciplinas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editais_assuntos" ADD CONSTRAINT "editais_assuntos_editalDisciplinaId_fkey" FOREIGN KEY ("editalDisciplinaId") REFERENCES "editais_disciplinas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editais_assuntos" ADD CONSTRAINT "editais_assuntos_assuntoId_fkey" FOREIGN KEY ("assuntoId") REFERENCES "assuntos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editais_topicos" ADD CONSTRAINT "editais_topicos_editalAssuntoId_fkey" FOREIGN KEY ("editalAssuntoId") REFERENCES "editais_assuntos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editais_topicos" ADD CONSTRAINT "editais_topicos_topicoId_fkey" FOREIGN KEY ("topicoId") REFERENCES "topicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_concurso_questoes" ADD CONSTRAINT "provas_concurso_questoes_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_concurso_questoes" ADD CONSTRAINT "provas_concurso_questoes_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_concurso_questoes" ADD CONSTRAINT "provas_concurso_questoes_bancaId_fkey" FOREIGN KEY ("bancaId") REFERENCES "bancas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_concurso_questoes" ADD CONSTRAINT "provas_concurso_questoes_editalDisciplinaId_fkey" FOREIGN KEY ("editalDisciplinaId") REFERENCES "editais_disciplinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_concurso_questoes" ADD CONSTRAINT "provas_concurso_questoes_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_concurso_questoes" ADD CONSTRAINT "provas_concurso_questoes_assuntoId_fkey" FOREIGN KEY ("assuntoId") REFERENCES "assuntos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_concurso_questoes" ADD CONSTRAINT "provas_concurso_questoes_topicoId_fkey" FOREIGN KEY ("topicoId") REFERENCES "topicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_concurso_questoes" ADD CONSTRAINT "provas_concurso_questoes_subtopicoId_fkey" FOREIGN KEY ("subtopicoId") REFERENCES "subtopicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matrizes_incidencia_topicos" ADD CONSTRAINT "matrizes_incidencia_topicos_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreiras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matrizes_incidencia_topicos" ADD CONSTRAINT "matrizes_incidencia_topicos_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "concursos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matrizes_incidencia_topicos" ADD CONSTRAINT "matrizes_incidencia_topicos_editalDisciplinaId_fkey" FOREIGN KEY ("editalDisciplinaId") REFERENCES "editais_disciplinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matrizes_incidencia_topicos" ADD CONSTRAINT "matrizes_incidencia_topicos_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matrizes_incidencia_topicos" ADD CONSTRAINT "matrizes_incidencia_topicos_assuntoId_fkey" FOREIGN KEY ("assuntoId") REFERENCES "assuntos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matrizes_incidencia_topicos" ADD CONSTRAINT "matrizes_incidencia_topicos_topicoId_fkey" FOREIGN KEY ("topicoId") REFERENCES "topicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento" ADD CONSTRAINT "diagnosticos_planejamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento" ADD CONSTRAINT "diagnosticos_planejamento_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreiras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento" ADD CONSTRAINT "diagnosticos_planejamento_concursoAlvoId_fkey" FOREIGN KEY ("concursoAlvoId") REFERENCES "concursos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento" ADD CONSTRAINT "diagnosticos_planejamento_simuladoId_fkey" FOREIGN KEY ("simuladoId") REFERENCES "simulados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento" ADD CONSTRAINT "diagnosticos_planejamento_tentativaSimuladoId_fkey" FOREIGN KEY ("tentativaSimuladoId") REFERENCES "tentativas_simulado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento_topicos" ADD CONSTRAINT "diagnosticos_planejamento_topicos_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_planejamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento_topicos" ADD CONSTRAINT "diagnosticos_planejamento_topicos_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento_topicos" ADD CONSTRAINT "diagnosticos_planejamento_topicos_assuntoId_fkey" FOREIGN KEY ("assuntoId") REFERENCES "assuntos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_planejamento_topicos" ADD CONSTRAINT "diagnosticos_planejamento_topicos_topicoId_fkey" FOREIGN KEY ("topicoId") REFERENCES "topicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
