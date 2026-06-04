-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'PROFESSOR', 'REVISOR', 'ALUNO', 'SUPORTE');

-- CreateEnum
CREATE TYPE "OrigemQuestao" AS ENUM ('INEDITA', 'BANCA', 'ADAPTADA');

-- CreateEnum
CREATE TYPE "StatusQuestao" AS ENUM ('RASCUNHO', 'EM_REVISAO', 'APROVADA', 'PUBLICADA', 'REPROVADA', 'ARQUIVADA');

-- CreateEnum
CREATE TYPE "TipoCobranca" AS ENUM ('LEI_SECA', 'DOUTRINA', 'JURISPRUDENCIA', 'INTERPRETACAO');

-- CreateEnum
CREATE TYPE "VisibilidadeCaderno" AS ENUM ('PRIVADO', 'PUBLICO');

-- CreateEnum
CREATE TYPE "StatusSimulado" AS ENUM ('RASCUNHO', 'PUBLICADO', 'ENCERRADO', 'ARQUIVADO');

-- CreateEnum
CREATE TYPE "VisibilidadeSimulado" AS ENUM ('PRIVADO', 'PUBLICO');

-- CreateEnum
CREATE TYPE "StatusTentativa" AS ENUM ('EM_ANDAMENTO', 'CONCLUIDA', 'ABANDONADA', 'TEMPO_ESGOTADO');

-- CreateEnum
CREATE TYPE "StatusAssinatura" AS ENUM ('TRIAL', 'ATIVA', 'CANCELADA', 'EXPIRADA', 'INADIMPLENTE');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('PENDENTE', 'PROCESSANDO', 'PAGO', 'CANCELADO', 'REEMBOLSADO');

-- CreateEnum
CREATE TYPE "MetodoPagamento" AS ENUM ('CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX', 'BOLETO');

-- CreateEnum
CREATE TYPE "StatusPagamento" AS ENUM ('PENDENTE', 'APROVADO', 'RECUSADO', 'REEMBOLSADO', 'CANCELADO', 'ESTORNADO');

-- CreateEnum
CREATE TYPE "StatusTicket" AS ENUM ('ABERTO', 'EM_ATENDIMENTO', 'AGUARDANDO_USUARIO', 'RESOLVIDO', 'FECHADO');

-- CreateEnum
CREATE TYPE "CategoriaTicket" AS ENUM ('FINANCEIRO', 'TECNICO', 'CONTEUDO', 'CONTA', 'OUTRO');

-- CreateEnum
CREATE TYPE "TipoNotificacao" AS ENUM ('RANKING_POSICAO', 'REVISAO_PENDENTE', 'TICKET_RESPOSTA', 'ASSINATURA_VENCENDO', 'ASSINATURA_VENCIDA', 'QUESTAO_COMENTARIO', 'CONQUISTA', 'SISTEMA');

-- CreateEnum
CREATE TYPE "VisibilidadePerfil" AS ENUM ('PRIVADO', 'BASICO_PUBLICO', 'COMPLETO_PUBLICO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ALUNO',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "planoId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis" (
    "usuario_id" TEXT NOT NULL,
    "nomeExibicao" TEXT,
    "bio" TEXT,
    "carreiraId" TEXT,
    "visibilidade" "VisibilidadePerfil" NOT NULL DEFAULT 'PRIVADO',
    "instagram" TEXT,
    "tiktok" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perfis_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "seguidores" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "seguidorId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seguidores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" CHAR(2) NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT,
    "descricao" TEXT,
    "cor" TEXT,
    "iconUrl" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assuntos" (
    "id" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "assuntos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topicos" (
    "id" TEXT NOT NULL,
    "assuntoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "topicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subtopicos" (
    "id" TEXT NOT NULL,
    "topicoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "subtopicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_questao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "formato" TEXT NOT NULL DEFAULT 'ALTERNATIVAS',
    "quantidadeAlternativas" INTEGER DEFAULT 5,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipos_questao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bancas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "descricao" TEXT,
    "cor" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bancas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carreiras" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "iconUrl" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,

    CONSTRAINT "carreiras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "niveis_educacionais" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "niveis_educacionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dificuldades" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "peso" INTEGER NOT NULL DEFAULT 1,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "cor" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dificuldades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concursos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ano" INTEGER,
    "imagemUrl" TEXT,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "carreiraId" TEXT,
    "nivelEducacionalId" TEXT,

    CONSTRAINT "concursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cargos" (
    "id" TEXT NOT NULL,
    "concursoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cargos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questoes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "tipoQuestaoId" TEXT,
    "origem" "OrigemQuestao" NOT NULL DEFAULT 'BANCA',
    "status" "StatusQuestao" NOT NULL DEFAULT 'RASCUNHO',
    "ano" INTEGER,
    "isUnique" BOOLEAN NOT NULL DEFAULT false,
    "access" TEXT NOT NULL DEFAULT 'free',
    "visibility" TEXT NOT NULL DEFAULT 'publica',
    "tipoCobranca" "TipoCobranca" DEFAULT 'LEI_SECA',
    "autorId" TEXT NOT NULL,
    "revisorId" TEXT,
    "revisadaEm" TIMESTAMP(3),
    "motivoReprovacao" TEXT,
    "bancaId" TEXT,
    "concursoId" TEXT,
    "cargoId" TEXT,
    "carreiraId" TEXT,
    "nivelEducacionalId" TEXT,
    "dificuldadeId" TEXT,
    "disciplinaId" TEXT NOT NULL,
    "assuntoId" TEXT,
    "topicoId" TEXT,
    "subtopicoId" TEXT,
    "textoApoio" TEXT,
    "enunciado" TEXT NOT NULL,
    "resolucao" TEXT,
    "videoUrl" TEXT,
    "imagemUrl" TEXT,
    "totalRespostas" INTEGER NOT NULL DEFAULT 0,
    "totalCorretas" INTEGER NOT NULL DEFAULT 0,
    "totalTempoSeg" INTEGER NOT NULL DEFAULT 0,
    "totalComTempo" INTEGER NOT NULL DEFAULT 0,
    "taxaAcerto" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "tempoMedioSeg" INTEGER NOT NULL DEFAULT 0,
    "totalDenuncias" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alternativas" (
    "id" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "letra" CHAR(1) NOT NULL,
    "texto" TEXT NOT NULL,
    "isCorreta" BOOLEAN NOT NULL DEFAULT false,
    "explicacao" TEXT,
    "dica" TEXT,
    "referencia" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "totalEscolhas" INTEGER NOT NULL DEFAULT 0,
    "percentual" DECIMAL(5,2) NOT NULL DEFAULT 0,

    CONSTRAINT "alternativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "cor" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questoes_tags" (
    "questaoId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "questoes_tags_pkey" PRIMARY KEY ("questaoId","tagId")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "parentId" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editadoEm" TIMESTAMP(3),

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respostas_usuarios" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "alternativaId" TEXT NOT NULL,
    "isCorreta" BOOLEAN NOT NULL,
    "tempoSeg" INTEGER,
    "erroMotivo" TEXT,
    "respondidoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "simuladoTentativaId" TEXT,
    "cadernoId" TEXT,

    CONSTRAINT "respostas_usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estatisticas_usuarios" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "referencia" TIMESTAMP(3) NOT NULL,
    "totalQuestoes" INTEGER NOT NULL DEFAULT 0,
    "totalCorretas" INTEGER NOT NULL DEFAULT 0,
    "totalErradas" INTEGER NOT NULL DEFAULT 0,
    "taxaAcerto" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "tempoTotalSeg" INTEGER NOT NULL DEFAULT 0,
    "tempoMedioSeg" INTEGER NOT NULL DEFAULT 0,
    "sequenciaAtual" INTEGER NOT NULL DEFAULT 0,
    "maiorSequencia" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "estatisticas_usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rankings" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "carreiraId" TEXT,
    "periodo" TEXT NOT NULL,
    "referencia" TIMESTAMP(3) NOT NULL,
    "pontuacao" INTEGER NOT NULL DEFAULT 0,
    "totalQuestoes" INTEGER NOT NULL DEFAULT 0,
    "taxaAcerto" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "posicao" INTEGER,

    CONSTRAINT "rankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revisoes" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "fatorEase" DECIMAL(4,2) NOT NULL DEFAULT 2.5,
    "intervaloDias" INTEGER NOT NULL DEFAULT 1,
    "repeticoes" INTEGER NOT NULL DEFAULT 0,
    "qualidade" INTEGER,
    "ultimaRevisao" TIMESTAMP(3),
    "proximaRevisao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revisoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoritos" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "denuncias" (
    "id" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "descricao" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "resposta" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvidaEm" TIMESTAMP(3),

    CONSTRAINT "denuncias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cadernos" (
    "id" TEXT NOT NULL,
    "criadoPorId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "visibilidade" "VisibilidadeCaderno" NOT NULL DEFAULT 'PRIVADO',
    "dificuldadeId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cadernos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_caderno" (
    "id" TEXT NOT NULL,
    "cadernoId" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "itens_caderno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulados" (
    "id" TEXT NOT NULL,
    "criadoPorId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'simulado',
    "status" "StatusSimulado" NOT NULL DEFAULT 'RASCUNHO',
    "visibilidade" "VisibilidadeSimulado" NOT NULL DEFAULT 'PRIVADO',
    "duracaoMinutos" INTEGER,
    "totalQuestoes" INTEGER NOT NULL DEFAULT 0,
    "inicioEm" TIMESTAMP(3),
    "fimEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "simulados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_simulado" (
    "id" TEXT NOT NULL,
    "simuladoId" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "itens_simulado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tentativas_simulado" (
    "id" TEXT NOT NULL,
    "simuladoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "status" "StatusTentativa" NOT NULL DEFAULT 'EM_ANDAMENTO',
    "inicioEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fimEm" TIMESTAMP(3),
    "pontuacao" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "totalCorretas" INTEGER NOT NULL DEFAULT 0,
    "totalErradas" INTEGER NOT NULL DEFAULT 0,
    "totalBranco" INTEGER NOT NULL DEFAULT 0,
    "tempoGastoSeg" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tentativas_simulado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "duracaoDias" INTEGER NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "precoOriginal" DECIMAL(10,2),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plano_beneficios" (
    "id" TEXT NOT NULL,
    "planoId" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "plano_beneficios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assinaturas" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "planoId" TEXT NOT NULL,
    "status" "StatusAssinatura" NOT NULL DEFAULT 'TRIAL',
    "inicioEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiraEm" TIMESTAMP(3),
    "renovacaoAuto" BOOLEAN NOT NULL DEFAULT true,
    "canceladoEm" TIMESTAMP(3),
    "motivoCancelamento" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assinaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "enderecoId" TEXT,
    "status" "StatusPedido" NOT NULL DEFAULT 'PENDENTE',
    "descricao" TEXT NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido_itens" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "planoId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "pedido_itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "gatewayId" TEXT,
    "metodo" "MetodoPagamento" NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "status" "StatusPagamento" NOT NULL DEFAULT 'PENDENTE',
    "pixQrCode" TEXT,
    "pixChave" TEXT,
    "boletoUrl" TEXT,
    "boletoLinhaDigitavel" TEXT,
    "aprovadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "atendenteId" TEXT,
    "categoria" "CategoriaTicket" NOT NULL DEFAULT 'OUTRO',
    "status" "StatusTicket" NOT NULL DEFAULT 'ABERTO',
    "assunto" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL DEFAULT 'normal',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvidoEm" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_mensagens" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "interno" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_mensagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificacoes" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" "TipoNotificacao" NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "link" TEXT,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "lidaEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT,
    "acao" TEXT NOT NULL,
    "tabela" TEXT,
    "registroId" TEXT,
    "dadosAntes" JSONB,
    "dadosDepois" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuracoes" (
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'string',
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "configuracoes_pkey" PRIMARY KEY ("chave")
);

-- CreateTable
CREATE TABLE "sessoes" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recuperacao_senha" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recuperacao_senha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verifications" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "seguidores_usuarioId_seguidorId_key" ON "seguidores"("usuarioId", "seguidorId");

-- CreateIndex
CREATE INDEX "assuntos_disciplinaId_idx" ON "assuntos"("disciplinaId");

-- CreateIndex
CREATE INDEX "topicos_assuntoId_idx" ON "topicos"("assuntoId");

-- CreateIndex
CREATE INDEX "subtopicos_topicoId_idx" ON "subtopicos"("topicoId");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_questao_nome_key" ON "tipos_questao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_questao_slug_key" ON "tipos_questao"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "bancas_nome_key" ON "bancas"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "bancas_sigla_key" ON "bancas"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "bancas_slug_key" ON "bancas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "niveis_educacionais_nome_key" ON "niveis_educacionais"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "niveis_educacionais_slug_key" ON "niveis_educacionais"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "dificuldades_nome_key" ON "dificuldades"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "dificuldades_slug_key" ON "dificuldades"("slug");

-- CreateIndex
CREATE INDEX "cargos_concursoId_idx" ON "cargos"("concursoId");

-- CreateIndex
CREATE UNIQUE INDEX "questoes_code_key" ON "questoes"("code");

-- CreateIndex
CREATE INDEX "questoes_disciplinaId_idx" ON "questoes"("disciplinaId");

-- CreateIndex
CREATE INDEX "questoes_status_idx" ON "questoes"("status");

-- CreateIndex
CREATE INDEX "questoes_bancaId_idx" ON "questoes"("bancaId");

-- CreateIndex
CREATE INDEX "questoes_concursoId_idx" ON "questoes"("concursoId");

-- CreateIndex
CREATE INDEX "alternativas_questaoId_idx" ON "alternativas"("questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_nome_key" ON "tags"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "comentarios_questaoId_idx" ON "comentarios"("questaoId");

-- CreateIndex
CREATE INDEX "respostas_usuarios_usuarioId_idx" ON "respostas_usuarios"("usuarioId");

-- CreateIndex
CREATE INDEX "respostas_usuarios_questaoId_idx" ON "respostas_usuarios"("questaoId");

-- CreateIndex
CREATE INDEX "respostas_usuarios_usuarioId_questaoId_idx" ON "respostas_usuarios"("usuarioId", "questaoId");

-- CreateIndex
CREATE INDEX "estatisticas_usuarios_usuarioId_disciplinaId_idx" ON "estatisticas_usuarios"("usuarioId", "disciplinaId");

-- CreateIndex
CREATE UNIQUE INDEX "estatisticas_usuarios_usuarioId_disciplinaId_periodo_refere_key" ON "estatisticas_usuarios"("usuarioId", "disciplinaId", "periodo", "referencia");

-- CreateIndex
CREATE INDEX "rankings_periodo_referencia_idx" ON "rankings"("periodo", "referencia");

-- CreateIndex
CREATE UNIQUE INDEX "rankings_usuarioId_carreiraId_periodo_referencia_key" ON "rankings"("usuarioId", "carreiraId", "periodo", "referencia");

-- CreateIndex
CREATE INDEX "revisoes_usuarioId_proximaRevisao_idx" ON "revisoes"("usuarioId", "proximaRevisao");

-- CreateIndex
CREATE UNIQUE INDEX "revisoes_usuarioId_questaoId_key" ON "revisoes"("usuarioId", "questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "favoritos_usuarioId_questaoId_key" ON "favoritos"("usuarioId", "questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "denuncias_questaoId_usuarioId_key" ON "denuncias"("questaoId", "usuarioId");

-- CreateIndex
CREATE INDEX "cadernos_criadoPorId_idx" ON "cadernos"("criadoPorId");

-- CreateIndex
CREATE INDEX "itens_caderno_cadernoId_idx" ON "itens_caderno"("cadernoId");

-- CreateIndex
CREATE UNIQUE INDEX "itens_caderno_cadernoId_questaoId_key" ON "itens_caderno"("cadernoId", "questaoId");

-- CreateIndex
CREATE INDEX "simulados_criadoPorId_idx" ON "simulados"("criadoPorId");

-- CreateIndex
CREATE INDEX "simulados_status_idx" ON "simulados"("status");

-- CreateIndex
CREATE INDEX "itens_simulado_simuladoId_idx" ON "itens_simulado"("simuladoId");

-- CreateIndex
CREATE UNIQUE INDEX "itens_simulado_simuladoId_questaoId_key" ON "itens_simulado"("simuladoId", "questaoId");

-- CreateIndex
CREATE INDEX "tentativas_simulado_simuladoId_idx" ON "tentativas_simulado"("simuladoId");

-- CreateIndex
CREATE INDEX "tentativas_simulado_usuarioId_idx" ON "tentativas_simulado"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "planos_nome_key" ON "planos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "planos_slug_key" ON "planos"("slug");

-- CreateIndex
CREATE INDEX "assinaturas_usuarioId_idx" ON "assinaturas"("usuarioId");

-- CreateIndex
CREATE INDEX "assinaturas_status_idx" ON "assinaturas"("status");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_codigo_key" ON "pedidos"("codigo");

-- CreateIndex
CREATE INDEX "pedidos_usuarioId_idx" ON "pedidos"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "pagamentos_gatewayId_key" ON "pagamentos"("gatewayId");

-- CreateIndex
CREATE INDEX "pagamentos_pedidoId_idx" ON "pagamentos"("pedidoId");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_codigo_key" ON "tickets"("codigo");

-- CreateIndex
CREATE INDEX "tickets_usuarioId_idx" ON "tickets"("usuarioId");

-- CreateIndex
CREATE INDEX "tickets_status_idx" ON "tickets"("status");

-- CreateIndex
CREATE INDEX "ticket_mensagens_ticketId_idx" ON "ticket_mensagens"("ticketId");

-- CreateIndex
CREATE INDEX "notificacoes_usuarioId_lida_idx" ON "notificacoes"("usuarioId", "lida");

-- CreateIndex
CREATE INDEX "audit_logs_tabela_registroId_idx" ON "audit_logs"("tabela", "registroId");

-- CreateIndex
CREATE INDEX "audit_logs_usuarioId_idx" ON "audit_logs"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_refreshToken_key" ON "sessoes"("refreshToken");

-- CreateIndex
CREATE INDEX "sessoes_usuarioId_idx" ON "sessoes"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "recuperacao_senha_token_key" ON "recuperacao_senha"("token");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_identifier_value_key" ON "verifications"("identifier", "value");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis" ADD CONSTRAINT "perfis_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreiras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis" ADD CONSTRAINT "perfis_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguidorId_fkey" FOREIGN KEY ("seguidorId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assuntos" ADD CONSTRAINT "assuntos_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topicos" ADD CONSTRAINT "topicos_assuntoId_fkey" FOREIGN KEY ("assuntoId") REFERENCES "assuntos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtopicos" ADD CONSTRAINT "subtopicos_topicoId_fkey" FOREIGN KEY ("topicoId") REFERENCES "topicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carreiras" ADD CONSTRAINT "carreiras_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "carreiras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concursos" ADD CONSTRAINT "concursos_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreiras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concursos" ADD CONSTRAINT "concursos_nivelEducacionalId_fkey" FOREIGN KEY ("nivelEducacionalId") REFERENCES "niveis_educacionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cargos" ADD CONSTRAINT "cargos_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "concursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_revisorId_fkey" FOREIGN KEY ("revisorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_tipoQuestaoId_fkey" FOREIGN KEY ("tipoQuestaoId") REFERENCES "tipos_questao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_bancaId_fkey" FOREIGN KEY ("bancaId") REFERENCES "bancas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_concursoId_fkey" FOREIGN KEY ("concursoId") REFERENCES "concursos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreiras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_nivelEducacionalId_fkey" FOREIGN KEY ("nivelEducacionalId") REFERENCES "niveis_educacionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_dificuldadeId_fkey" FOREIGN KEY ("dificuldadeId") REFERENCES "dificuldades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_assuntoId_fkey" FOREIGN KEY ("assuntoId") REFERENCES "assuntos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_topicoId_fkey" FOREIGN KEY ("topicoId") REFERENCES "topicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_subtopicoId_fkey" FOREIGN KEY ("subtopicoId") REFERENCES "subtopicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alternativas" ADD CONSTRAINT "alternativas_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes_tags" ADD CONSTRAINT "questoes_tags_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes_tags" ADD CONSTRAINT "questoes_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comentarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_usuarios" ADD CONSTRAINT "respostas_usuarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_usuarios" ADD CONSTRAINT "respostas_usuarios_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_usuarios" ADD CONSTRAINT "respostas_usuarios_alternativaId_fkey" FOREIGN KEY ("alternativaId") REFERENCES "alternativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estatisticas_usuarios" ADD CONSTRAINT "estatisticas_usuarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estatisticas_usuarios" ADD CONSTRAINT "estatisticas_usuarios_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreiras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revisoes" ADD CONSTRAINT "revisoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revisoes" ADD CONSTRAINT "revisoes_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "denuncias" ADD CONSTRAINT "denuncias_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "denuncias" ADD CONSTRAINT "denuncias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cadernos" ADD CONSTRAINT "cadernos_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cadernos" ADD CONSTRAINT "cadernos_dificuldadeId_fkey" FOREIGN KEY ("dificuldadeId") REFERENCES "dificuldades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_caderno" ADD CONSTRAINT "itens_caderno_cadernoId_fkey" FOREIGN KEY ("cadernoId") REFERENCES "cadernos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_caderno" ADD CONSTRAINT "itens_caderno_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulados" ADD CONSTRAINT "simulados_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_simulado" ADD CONSTRAINT "itens_simulado_simuladoId_fkey" FOREIGN KEY ("simuladoId") REFERENCES "simulados"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_simulado" ADD CONSTRAINT "itens_simulado_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tentativas_simulado" ADD CONSTRAINT "tentativas_simulado_simuladoId_fkey" FOREIGN KEY ("simuladoId") REFERENCES "simulados"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tentativas_simulado" ADD CONSTRAINT "tentativas_simulado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plano_beneficios" ADD CONSTRAINT "plano_beneficios_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_atendenteId_fkey" FOREIGN KEY ("atendenteId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_mensagens" ADD CONSTRAINT "ticket_mensagens_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_mensagens" ADD CONSTRAINT "ticket_mensagens_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recuperacao_senha" ADD CONSTRAINT "recuperacao_senha_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
