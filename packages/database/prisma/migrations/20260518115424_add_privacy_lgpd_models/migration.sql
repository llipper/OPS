-- CreateEnum
CREATE TYPE "TipoConsentimentoPrivacidade" AS ENUM ('TERMOS_USO', 'POLITICA_PRIVACIDADE', 'MARKETING', 'COOKIES_ANALITICOS');

-- CreateEnum
CREATE TYPE "StatusSolicitacaoPrivacidade" AS ENUM ('ABERTA', 'EM_ANALISE', 'CONCLUIDA', 'REJEITADA');

-- CreateEnum
CREATE TYPE "TipoSolicitacaoPrivacidade" AS ENUM ('ACESSO_DADOS', 'CORRECAO_DADOS', 'PORTABILIDADE', 'EXCLUSAO_DADOS', 'ANONIMIZACAO', 'REVOGACAO_CONSENTIMENTO', 'REVISAO_DECISAO_AUTOMATIZADA');

-- CreateTable
CREATE TABLE "consentimentos_privacidade" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" "TipoConsentimentoPrivacidade" NOT NULL,
    "versao" TEXT NOT NULL,
    "finalidade" TEXT NOT NULL,
    "aceito" BOOLEAN NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revogadoEm" TIMESTAMP(3),

    CONSTRAINT "consentimentos_privacidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacoes_privacidade" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" "TipoSolicitacaoPrivacidade" NOT NULL,
    "status" "StatusSolicitacaoPrivacidade" NOT NULL DEFAULT 'ABERTA',
    "descricao" TEXT,
    "resposta" TEXT,
    "arquivoUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "concluidoEm" TIMESTAMP(3),

    CONSTRAINT "solicitacoes_privacidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "consentimentos_privacidade_usuarioId_tipo_idx" ON "consentimentos_privacidade"("usuarioId", "tipo");

-- CreateIndex
CREATE INDEX "consentimentos_privacidade_tipo_versao_idx" ON "consentimentos_privacidade"("tipo", "versao");

-- CreateIndex
CREATE INDEX "solicitacoes_privacidade_usuarioId_criadoEm_idx" ON "solicitacoes_privacidade"("usuarioId", "criadoEm");

-- CreateIndex
CREATE INDEX "solicitacoes_privacidade_status_idx" ON "solicitacoes_privacidade"("status");

-- AddForeignKey
ALTER TABLE "consentimentos_privacidade" ADD CONSTRAINT "consentimentos_privacidade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacoes_privacidade" ADD CONSTRAINT "solicitacoes_privacidade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
