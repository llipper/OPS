-- =============================================================================
-- LOTE 001 CORRIGIDO - Q100082 A Q100131
-- Disciplina: Direito Constitucional
-- Base: C:/projetos/ops/Json QUestoes/questoes.sql
-- Regra: manter IDs e relacionamentos originais; substituir conteúdo genérico por questões revisadas individualmente.
-- Fonte normativa principal: Constituição Federal compilada vigente em 2026 (Planalto).
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100082 (ID: 0de7b4ad-6a4f-4e64-8b95-2bfaa8c9e5fe)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '0de7b4ad-6a4f-4e64-8b95-2bfaa8c9e5fe',
  'Q100082',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '604e20e5-308f-44f6-bc1d-62d3ed9df757', -- assuntoId (Controle de Constitucionalidade)
  '7a8401ed-14e9-4dde-84a9-41c4f66cca96', -- topicoId (Controle Concentrado)
  '8a19b61c-ed21-490a-92cd-c543a554bd47', -- subtopicoId (ADC)
  'Uma lei federal que disciplina procedimento de identificação criminal passou a ser descumprida por juízos estaduais sob o fundamento de incompatibilidade com a Constituição. O Presidente da República pretende estabilizar a controvérsia constitucional diretamente no STF.',
  'Nessa situação, considerada a ação declaratória de constitucionalidade, assinale a alternativa correta.',
  'Gabarito: Letra A. A ADC pode ter por objeto lei ou ato normativo federal, exige controvérsia judicial relevante e produz decisão com eficácia contra todos e efeito vinculante em relação aos órgãos do Poder Judiciário e à administração pública. A resposta decorre de Art. 102, I, a, e § 2º; art. 103 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('4852579a-f41a-411e-bebe-5d94b660e155', '0de7b4ad-6a4f-4e64-8b95-2bfaa8c9e5fe', 'A', 'A ADC pode ter por objeto lei ou ato normativo federal, exige controvérsia judicial relevante e produz decisão com eficácia contra todos e efeito vinculante em relação aos órgãos do Poder Judiciário e à administração pública.', true, 'Correta. A ADC pode ter por objeto lei ou ato normativo federal, exige controvérsia judicial relevante e produz decisão com eficácia contra todos e efeito vinculante em relação aos órgãos do Poder Judiciário e à administração pública. Fundamento: Art. 102, I, a, e § 2º; art. 103 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, I, a, e § 2º; art. 103 da CF/88.', 0),
  ('37c94c4d-bd11-41a8-86cd-801b34a5b6b0', '0de7b4ad-6a4f-4e64-8b95-2bfaa8c9e5fe', 'B', 'A ADC não se presta ao controle abstrato de lei estadual ou municipal perante o STF.', false, 'Incorreta. A ADC não se presta ao controle abstrato de lei estadual ou municipal perante o STF. A assertiva contraria o fundamento constitucional aplicável ao tema ADC.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, I, a, e § 2º; art. 103 da CF/88.', 1),
  ('9f3846bd-df71-46ba-bd91-73d870b33498', '0de7b4ad-6a4f-4e64-8b95-2bfaa8c9e5fe', 'C', 'A ADC não serve para declarar a inconstitucionalidade por omissão legislativa.', false, 'Incorreta. A ADC não serve para declarar a inconstitucionalidade por omissão legislativa. A assertiva contraria o fundamento constitucional aplicável ao tema ADC.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, I, a, e § 2º; art. 103 da CF/88.', 2),
  ('49086ab4-8313-49e2-88d1-cdf6e70999dd', '0de7b4ad-6a4f-4e64-8b95-2bfaa8c9e5fe', 'D', 'A ADC dispensa demonstração de controvérsia judicial relevante quando proposta por legitimado universal.', false, 'Incorreta. A ADC dispensa demonstração de controvérsia judicial relevante quando proposta por legitimado universal. A assertiva contraria o fundamento constitucional aplicável ao tema ADC.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, I, a, e § 2º; art. 103 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100083 (ID: 163ab983-f0a4-45ba-a1f3-36f9892aebb7)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '163ab983-f0a4-45ba-a1f3-36f9892aebb7',
  'Q100083',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '604e20e5-308f-44f6-bc1d-62d3ed9df757', -- assuntoId (Controle de Constitucionalidade)
  '7a8401ed-14e9-4dde-84a9-41c4f66cca96', -- topicoId (Controle Concentrado)
  '5bdda82d-764d-48ac-8a2c-212ff5940acb', -- subtopicoId (ADI)
  'Uma assembleia legislativa aprovou lei estadual que restringe o acesso de defensores a presos durante investigação policial. Entidade legitimada pretende impugnar a norma diretamente no STF.',
  'Sobre o cabimento da ADI no controle concentrado federal, assinale a opção correta.',
  'Gabarito: Letra B. A ADI perante o STF é cabível contra lei ou ato normativo federal ou estadual incompatível com a Constituição Federal. A resposta decorre de Art. 102, I, a, e art. 103 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('fb4bfa1c-b1db-4758-878e-a5cd5d5829e7', '163ab983-f0a4-45ba-a1f3-36f9892aebb7', 'A', 'Lei municipal pode ser objeto direto de ADI no STF sempre que violar a Constituição Federal.', false, 'Incorreta. Lei municipal pode ser objeto direto de ADI no STF sempre que violar a Constituição Federal. A assertiva contraria o fundamento constitucional aplicável ao tema ADI.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, I, a, e art. 103 da CF/88.', 0),
  ('504508d4-30b5-4756-92df-3a97fd7174c7', '163ab983-f0a4-45ba-a1f3-36f9892aebb7', 'B', 'A ADI perante o STF é cabível contra lei ou ato normativo federal ou estadual incompatível com a Constituição Federal.', true, 'Correta. A ADI perante o STF é cabível contra lei ou ato normativo federal ou estadual incompatível com a Constituição Federal. Fundamento: Art. 102, I, a, e art. 103 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, I, a, e art. 103 da CF/88.', 1),
  ('bde1953a-5720-41dc-b4bb-741d7ad47483', '163ab983-f0a4-45ba-a1f3-36f9892aebb7', 'C', 'A ADI é cabível apenas depois de decisão judicial definitiva no caso concreto.', false, 'Incorreta. A ADI é cabível apenas depois de decisão judicial definitiva no caso concreto. A assertiva contraria o fundamento constitucional aplicável ao tema ADI.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, I, a, e art. 103 da CF/88.', 2),
  ('171ef683-d940-4132-837a-5fffe036c7e7', '163ab983-f0a4-45ba-a1f3-36f9892aebb7', 'D', 'A decisão em ADI produz efeitos apenas entre as partes do processo objetivo.', false, 'Incorreta. A decisão em ADI produz efeitos apenas entre as partes do processo objetivo. A assertiva contraria o fundamento constitucional aplicável ao tema ADI.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, I, a, e art. 103 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100084 (ID: 128274aa-5372-418a-a3df-6159a0abd811)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '128274aa-5372-418a-a3df-6159a0abd811',
  'Q100084',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '604e20e5-308f-44f6-bc1d-62d3ed9df757', -- assuntoId (Controle de Constitucionalidade)
  '7a8401ed-14e9-4dde-84a9-41c4f66cca96', -- topicoId (Controle Concentrado)
  'a3599ee6-b9ca-4597-916c-06db95b3e9de', -- subtopicoId (ADO)
  'O Congresso Nacional deixou de editar norma constitucionalmente exigida para tornar efetivo determinado comando constitucional. A omissão inviabiliza direito previsto na Constituição.',
  'Quanto à ação direta de inconstitucionalidade por omissão, assinale a alternativa correta.',
  'Gabarito: Letra C. Reconhecida a omissão de Poder competente, será dada ciência para adoção das providências necessárias; tratando-se de órgão administrativo, a providência deverá ocorrer em trinta dias. A resposta decorre de Art. 103, § 2º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('bc731d0b-1302-490b-bab8-fd1491baa4c3', '128274aa-5372-418a-a3df-6159a0abd811', 'A', 'A ADO substitui o legislador e permite ao STF editar norma geral e abstrata completa em qualquer hipótese.', false, 'Incorreta. A ADO substitui o legislador e permite ao STF editar norma geral e abstrata completa em qualquer hipótese. A assertiva contraria o fundamento constitucional aplicável ao tema ADO.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 103, § 2º, da CF/88.', 0),
  ('552bc7c6-8a7c-452f-99e6-c35b2e905ae5', '128274aa-5372-418a-a3df-6159a0abd811', 'B', 'A ADO somente é cabível contra omissão de juiz de primeiro grau em processo individual.', false, 'Incorreta. A ADO somente é cabível contra omissão de juiz de primeiro grau em processo individual. A assertiva contraria o fundamento constitucional aplicável ao tema ADO.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 103, § 2º, da CF/88.', 1),
  ('83a81e31-9e22-4ab3-b32e-76afd23d19a0', '128274aa-5372-418a-a3df-6159a0abd811', 'C', 'Reconhecida a omissão de Poder competente, será dada ciência para adoção das providências necessárias; tratando-se de órgão administrativo, a providência deverá ocorrer em trinta dias.', true, 'Correta. Reconhecida a omissão de Poder competente, será dada ciência para adoção das providências necessárias; tratando-se de órgão administrativo, a providência deverá ocorrer em trinta dias. Fundamento: Art. 103, § 2º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 103, § 2º, da CF/88.', 2),
  ('084294b0-d672-46be-a072-9761165b1cb5', '128274aa-5372-418a-a3df-6159a0abd811', 'D', 'A ADO tem por finalidade exclusiva retirar do ordenamento lei federal incompatível com a Constituição.', false, 'Incorreta. A ADO tem por finalidade exclusiva retirar do ordenamento lei federal incompatível com a Constituição. A assertiva contraria o fundamento constitucional aplicável ao tema ADO.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 103, § 2º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100085 (ID: 9355d38e-1784-4d55-9ffc-7c82b3993437)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '9355d38e-1784-4d55-9ffc-7c82b3993437',
  'Q100085',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '604e20e5-308f-44f6-bc1d-62d3ed9df757', -- assuntoId (Controle de Constitucionalidade)
  '7a8401ed-14e9-4dde-84a9-41c4f66cca96', -- topicoId (Controle Concentrado)
  'aaed6a27-a1e1-4d81-aff8-b683515f97cb', -- subtopicoId (ADPF)
  'Antes da Constituição de 1988, foi editado ato municipal que continua sendo aplicado por autoridades locais e restringe indevidamente manifestação em praça pública. Não há outro meio eficaz para sanar a lesão.',
  'À luz da arguição de descumprimento de preceito fundamental, assinale a opção correta.',
  'Gabarito: Letra D. A ADPF pode ser utilizada para evitar ou reparar lesão a preceito fundamental resultante de ato do Poder Público, inclusive em situações nas quais o controle concentrado comum não ofereça meio eficaz. A resposta decorre de Art. 102, § 1º, da CF/88 e Lei 9.882/1999.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('7282a8fe-4e08-402c-9e14-ea1658a85d3b', '9355d38e-1784-4d55-9ffc-7c82b3993437', 'A', 'A ADPF é cabível apenas contra lei federal posterior à Constituição de 1988.', false, 'Incorreta. A ADPF é cabível apenas contra lei federal posterior à Constituição de 1988. A assertiva contraria o fundamento constitucional aplicável ao tema ADPF.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, § 1º, da CF/88 e Lei 9.882/1999.', 0),
  ('ba781b03-84f8-455f-86ed-869a49750dac', '9355d38e-1784-4d55-9ffc-7c82b3993437', 'B', 'A ADPF substitui recurso ordinário em qualquer processo individual ainda pendente.', false, 'Incorreta. A ADPF substitui recurso ordinário em qualquer processo individual ainda pendente. A assertiva contraria o fundamento constitucional aplicável ao tema ADPF.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, § 1º, da CF/88 e Lei 9.882/1999.', 1),
  ('8f5b2c14-cd8b-4903-aa6b-88cf6430a096', '9355d38e-1784-4d55-9ffc-7c82b3993437', 'C', 'A ADPF exige sempre controvérsia judicial repetitiva e nunca pode ter caráter preventivo.', false, 'Incorreta. A ADPF exige sempre controvérsia judicial repetitiva e nunca pode ter caráter preventivo. A assertiva contraria o fundamento constitucional aplicável ao tema ADPF.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, § 1º, da CF/88 e Lei 9.882/1999.', 2),
  ('ef249b1f-fa15-4761-ae08-0e5341533eb0', '9355d38e-1784-4d55-9ffc-7c82b3993437', 'D', 'A ADPF pode ser utilizada para evitar ou reparar lesão a preceito fundamental resultante de ato do Poder Público, inclusive em situações nas quais o controle concentrado comum não ofereça meio eficaz.', true, 'Correta. A ADPF pode ser utilizada para evitar ou reparar lesão a preceito fundamental resultante de ato do Poder Público, inclusive em situações nas quais o controle concentrado comum não ofereça meio eficaz. Fundamento: Art. 102, § 1º, da CF/88 e Lei 9.882/1999.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 102, § 1º, da CF/88 e Lei 9.882/1999.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100086 (ID: f424cfa5-9dd9-45d1-a8dd-e3c327d8710f)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'f424cfa5-9dd9-45d1-a8dd-e3c327d8710f',
  'Q100086',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '604e20e5-308f-44f6-bc1d-62d3ed9df757', -- assuntoId (Controle de Constitucionalidade)
  '7a8401ed-14e9-4dde-84a9-41c4f66cca96', -- topicoId (Controle Concentrado)
  'ab4d35c0-5fdb-48e0-933c-97e9b5f2eef9', -- subtopicoId (Legitimados)
  'Uma confederação sindical nacional ajuíza ação direta contra lei estadual que não possui relação direta com sua finalidade institucional. O ponto controvertido é a pertinência temática.',
  'Sobre legitimidade ativa no controle concentrado, assinale a alternativa correta.',
  'Gabarito: Letra A. Alguns legitimados especiais, como confederação sindical e entidade de classe de âmbito nacional, devem demonstrar pertinência temática entre o objeto impugnado e suas finalidades institucionais. A resposta decorre de Art. 103 da CF/88 e jurisprudência do STF.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('7084e765-e8ef-4633-b8a9-13f76cdd46e9', 'f424cfa5-9dd9-45d1-a8dd-e3c327d8710f', 'A', 'Alguns legitimados especiais, como confederação sindical e entidade de classe de âmbito nacional, devem demonstrar pertinência temática entre o objeto impugnado e suas finalidades institucionais.', true, 'Correta. Alguns legitimados especiais, como confederação sindical e entidade de classe de âmbito nacional, devem demonstrar pertinência temática entre o objeto impugnado e suas finalidades institucionais. Fundamento: Art. 103 da CF/88 e jurisprudência do STF.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 103 da CF/88 e jurisprudência do STF.', 0),
  ('37de1fd9-4494-4bd2-844b-af9749105dda', 'f424cfa5-9dd9-45d1-a8dd-e3c327d8710f', 'B', 'Todos os legitimados do art. 103 da Constituição precisam demonstrar pertinência temática em qualquer ação abstrata.', false, 'Incorreta. Todos os legitimados do art. 103 da Constituição precisam demonstrar pertinência temática em qualquer ação abstrata. A assertiva contraria o fundamento constitucional aplicável ao tema Legitimados.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 103 da CF/88 e jurisprudência do STF.', 1),
  ('4e165884-9dcc-4fc9-8b6c-898b4b46aa3f', 'f424cfa5-9dd9-45d1-a8dd-e3c327d8710f', 'C', 'Partido político somente é legitimado se possuir maioria absoluta em uma das Casas do Congresso Nacional.', false, 'Incorreta. Partido político somente é legitimado se possuir maioria absoluta em uma das Casas do Congresso Nacional. A assertiva contraria o fundamento constitucional aplicável ao tema Legitimados.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 103 da CF/88 e jurisprudência do STF.', 2),
  ('428b852c-519d-406a-b992-9a1843897019', 'f424cfa5-9dd9-45d1-a8dd-e3c327d8710f', 'D', 'Governador de Estado não possui legitimidade para propor ação direta no STF.', false, 'Incorreta. Governador de Estado não possui legitimidade para propor ação direta no STF. A assertiva contraria o fundamento constitucional aplicável ao tema Legitimados.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 103 da CF/88 e jurisprudência do STF.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100087 (ID: ac864d04-fa1d-4142-aea3-b69001ffc39a)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'ac864d04-fa1d-4142-aea3-b69001ffc39a',
  'Q100087',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '604e20e5-308f-44f6-bc1d-62d3ed9df757', -- assuntoId (Controle de Constitucionalidade)
  '0ba40264-6b2e-4584-998f-b68e65876077', -- topicoId (Controle Difuso)
  'd01f6892-6adb-43db-a75e-0f883c9b2a66', -- subtopicoId (Caso concreto)
  'Em processo criminal, a defesa sustenta incidentalmente que a lei aplicada ao caso viola garantia constitucional. O juiz analisa a tese apenas para decidir a situação das partes.',
  'Essa hipótese corresponde, em regra, a qual forma de controle de constitucionalidade?',
  'Gabarito: Letra B. Controle difuso, incidental e concreto, pois a questão constitucional é apreciada como fundamento da decisão do caso submetido ao órgão jurisdicional. A resposta decorre de Sistema de controle difuso de constitucionalidade; art. 97 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('cef4730c-6433-4182-9c8e-98158633f257', 'ac864d04-fa1d-4142-aea3-b69001ffc39a', 'A', 'Controle concentrado principal, pois todo juiz exerce jurisdição constitucional com eficácia geral.', false, 'Incorreta. Controle concentrado principal, pois todo juiz exerce jurisdição constitucional com eficácia geral. A assertiva contraria o fundamento constitucional aplicável ao tema Caso concreto.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Sistema de controle difuso de constitucionalidade; art. 97 da CF/88.', 0),
  ('a51a238d-6ce0-4411-882a-997d24547f12', 'ac864d04-fa1d-4142-aea3-b69001ffc39a', 'B', 'Controle difuso, incidental e concreto, pois a questão constitucional é apreciada como fundamento da decisão do caso submetido ao órgão jurisdicional.', true, 'Correta. Controle difuso, incidental e concreto, pois a questão constitucional é apreciada como fundamento da decisão do caso submetido ao órgão jurisdicional. Fundamento: Sistema de controle difuso de constitucionalidade; art. 97 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Sistema de controle difuso de constitucionalidade; art. 97 da CF/88.', 1),
  ('591a25e2-8367-4195-9aac-b1d95722dd9c', 'ac864d04-fa1d-4142-aea3-b69001ffc39a', 'C', 'Ação declaratória de constitucionalidade, pois a defesa busca confirmar a validade da lei.', false, 'Incorreta. Ação declaratória de constitucionalidade, pois a defesa busca confirmar a validade da lei. A assertiva contraria o fundamento constitucional aplicável ao tema Caso concreto.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Sistema de controle difuso de constitucionalidade; art. 97 da CF/88.', 2),
  ('bb8f091d-fc2f-419e-bacb-4e6475d9dea0', 'ac864d04-fa1d-4142-aea3-b69001ffc39a', 'D', 'Controle preventivo legislativo, pois ocorre antes da vigência da norma.', false, 'Incorreta. Controle preventivo legislativo, pois ocorre antes da vigência da norma. A assertiva contraria o fundamento constitucional aplicável ao tema Caso concreto.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Sistema de controle difuso de constitucionalidade; art. 97 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100088 (ID: f8a41c89-685b-4fdb-aaf2-b569f598c5d8)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'f8a41c89-685b-4fdb-aaf2-b569f598c5d8',
  'Q100088',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '604e20e5-308f-44f6-bc1d-62d3ed9df757', -- assuntoId (Controle de Constitucionalidade)
  '0ba40264-6b2e-4584-998f-b68e65876077', -- topicoId (Controle Difuso)
  '5d4b3cda-06bc-4e58-acce-755b660723e6', -- subtopicoId (Efeitos da decisão)
  'Um tribunal reconhece, em controle difuso, a inconstitucionalidade de lei aplicada a caso concreto. Não houve decisão em ação abstrata pelo STF.',
  'Quanto aos efeitos típicos dessa decisão, assinale a alternativa correta.',
  'Gabarito: Letra C. No controle difuso, a decisão normalmente produz efeitos entre as partes; eventual ampliação política da suspensão da execução da lei envolve a competência do Senado prevista no art. 52, X, da Constituição. A resposta decorre de Art. 52, X, e art. 97 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('dfaffcb0-510e-4e89-8685-edcc4946c40a', 'f8a41c89-685b-4fdb-aaf2-b569f598c5d8', 'A', 'Toda decisão difusa de juiz singular retira automaticamente a lei do ordenamento com eficácia contra todos.', false, 'Incorreta. Toda decisão difusa de juiz singular retira automaticamente a lei do ordenamento com eficácia contra todos. A assertiva contraria o fundamento constitucional aplicável ao tema Efeitos da decisão.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 52, X, e art. 97 da CF/88.', 0),
  ('c46ef403-8933-4e5f-98d2-8b2ad1751ec5', 'f8a41c89-685b-4fdb-aaf2-b569f598c5d8', 'B', 'A decisão difusa nunca pode deixar de aplicar lei ao caso concreto.', false, 'Incorreta. A decisão difusa nunca pode deixar de aplicar lei ao caso concreto. A assertiva contraria o fundamento constitucional aplicável ao tema Efeitos da decisão.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 52, X, e art. 97 da CF/88.', 1),
  ('8f2eed96-2a2a-46e1-8485-85bd46f1f736', 'f8a41c89-685b-4fdb-aaf2-b569f598c5d8', 'C', 'No controle difuso, a decisão normalmente produz efeitos entre as partes; eventual ampliação política da suspensão da execução da lei envolve a competência do Senado prevista no art. 52, X, da Constituição.', true, 'Correta. No controle difuso, a decisão normalmente produz efeitos entre as partes; eventual ampliação política da suspensão da execução da lei envolve a competência do Senado prevista no art. 52, X, da Constituição. Fundamento: Art. 52, X, e art. 97 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 52, X, e art. 97 da CF/88.', 2),
  ('04f1bf4f-2f70-493d-a709-a520dcba8bb0', 'f8a41c89-685b-4fdb-aaf2-b569f598c5d8', 'D', 'O Senado deve declarar a constitucionalidade da lei para que a decisão judicial tenha validade.', false, 'Incorreta. O Senado deve declarar a constitucionalidade da lei para que a decisão judicial tenha validade. A assertiva contraria o fundamento constitucional aplicável ao tema Efeitos da decisão.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 52, X, e art. 97 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100089 (ID: 384cb97c-7897-4a31-8c1e-2a8b2c30394a)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '384cb97c-7897-4a31-8c1e-2a8b2c30394a',
  'Q100089',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '604e20e5-308f-44f6-bc1d-62d3ed9df757', -- assuntoId (Controle de Constitucionalidade)
  '0ba40264-6b2e-4584-998f-b68e65876077', -- topicoId (Controle Difuso)
  'e4a2473e-9f7d-428b-a20c-24a7baac64e3', -- subtopicoId (Reserva de plenário)
  'Uma turma de tribunal afasta a incidência de lei por reputá-la incompatível com a Constituição, sem submeter a questão ao plenário ou órgão especial.',
  'Com base na cláusula de reserva de plenário, assinale a opção correta.',
  'Gabarito: Letra D. Tribunais somente podem declarar a inconstitucionalidade de lei ou ato normativo pelo voto da maioria absoluta de seus membros ou dos membros do respectivo órgão especial. A resposta decorre de Art. 97 da CF/88 e Súmula Vinculante 10.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('777f2a22-0d1f-4e3d-9179-77f7e0a5d1cc', '384cb97c-7897-4a31-8c1e-2a8b2c30394a', 'A', 'Órgão fracionário pode declarar inconstitucionalidade por maioria simples se a causa for penal.', false, 'Incorreta. Órgão fracionário pode declarar inconstitucionalidade por maioria simples se a causa for penal. A assertiva contraria o fundamento constitucional aplicável ao tema Reserva de plenário.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 97 da CF/88 e Súmula Vinculante 10.', 0),
  ('447742e2-cccd-4558-b094-464d5916589d', '384cb97c-7897-4a31-8c1e-2a8b2c30394a', 'B', 'A reserva de plenário se aplica apenas ao Supremo Tribunal Federal.', false, 'Incorreta. A reserva de plenário se aplica apenas ao Supremo Tribunal Federal. A assertiva contraria o fundamento constitucional aplicável ao tema Reserva de plenário.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 97 da CF/88 e Súmula Vinculante 10.', 1),
  ('86252e92-cd8f-448a-abac-90ef9599c74c', '384cb97c-7897-4a31-8c1e-2a8b2c30394a', 'C', 'A reserva de plenário impede qualquer interpretação conforme a Constituição.', false, 'Incorreta. A reserva de plenário impede qualquer interpretação conforme a Constituição. A assertiva contraria o fundamento constitucional aplicável ao tema Reserva de plenário.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 97 da CF/88 e Súmula Vinculante 10.', 2),
  ('7e3a1f45-9098-4c7f-a48c-59d499d9da78', '384cb97c-7897-4a31-8c1e-2a8b2c30394a', 'D', 'Tribunais somente podem declarar a inconstitucionalidade de lei ou ato normativo pelo voto da maioria absoluta de seus membros ou dos membros do respectivo órgão especial.', true, 'Correta. Tribunais somente podem declarar a inconstitucionalidade de lei ou ato normativo pelo voto da maioria absoluta de seus membros ou dos membros do respectivo órgão especial. Fundamento: Art. 97 da CF/88 e Súmula Vinculante 10.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 97 da CF/88 e Súmula Vinculante 10.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100090 (ID: 3962b4cb-6092-4536-a8c7-12d2e52efe24)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '3962b4cb-6092-4536-a8c7-12d2e52efe24',
  'Q100090',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '1304f416-9da8-43e6-90a5-bfe99b652dcf', -- assuntoId (Defesa do Estado e das Instituições)
  '1ea682d0-4bed-4bbe-97cb-c3a5522c3535', -- topicoId (Estados de Exceção)
  'bd9742ba-68c9-4580-828b-caf7baac7379', -- subtopicoId (Estado de defesa)
  'Diante de grave instabilidade institucional localizada, o Presidente da República cogita decretar estado de defesa para preservar a ordem pública em área restrita.',
  'Sobre o estado de defesa, assinale a alternativa correta.',
  'Gabarito: Letra A. O estado de defesa é decretado pelo Presidente da República, ouvidos o Conselho da República e o Conselho de Defesa Nacional, para preservar ou restabelecer a ordem pública ou a paz social em locais restritos e determinados. A resposta decorre de Art. 136 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('82b62581-0e4f-4894-b8b9-2274a2af3f8a', '3962b4cb-6092-4536-a8c7-12d2e52efe24', 'A', 'O estado de defesa é decretado pelo Presidente da República, ouvidos o Conselho da República e o Conselho de Defesa Nacional, para preservar ou restabelecer a ordem pública ou a paz social em locais restritos e determinados.', true, 'Correta. O estado de defesa é decretado pelo Presidente da República, ouvidos o Conselho da República e o Conselho de Defesa Nacional, para preservar ou restabelecer a ordem pública ou a paz social em locais restritos e determinados. Fundamento: Art. 136 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 136 da CF/88.', 0),
  ('aeb31005-a29f-4ff8-9c86-f6551803850a', '3962b4cb-6092-4536-a8c7-12d2e52efe24', 'B', 'O estado de defesa depende de autorização prévia do Senado Federal por maioria de dois terços.', false, 'Incorreta. O estado de defesa depende de autorização prévia do Senado Federal por maioria de dois terços. A assertiva contraria o fundamento constitucional aplicável ao tema Estado de defesa.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 136 da CF/88.', 1),
  ('9bc844c0-5001-4ace-b393-9be999ec581e', '3962b4cb-6092-4536-a8c7-12d2e52efe24', 'C', 'O estado de defesa pode ser decretado por governador para suspender direitos políticos em todo o território estadual.', false, 'Incorreta. O estado de defesa pode ser decretado por governador para suspender direitos políticos em todo o território estadual. A assertiva contraria o fundamento constitucional aplicável ao tema Estado de defesa.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 136 da CF/88.', 2),
  ('48f05712-c874-4338-8fa5-033b868a019b', '3962b4cb-6092-4536-a8c7-12d2e52efe24', 'D', 'O estado de defesa autoriza a dissolução do Congresso Nacional enquanto durar a crise.', false, 'Incorreta. O estado de defesa autoriza a dissolução do Congresso Nacional enquanto durar a crise. A assertiva contraria o fundamento constitucional aplicável ao tema Estado de defesa.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 136 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100091 (ID: c71b6aca-fb50-4022-8bff-a9af3b311a15)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'c71b6aca-fb50-4022-8bff-a9af3b311a15',
  'Q100091',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '1304f416-9da8-43e6-90a5-bfe99b652dcf', -- assuntoId (Defesa do Estado e das Instituições)
  '1ea682d0-4bed-4bbe-97cb-c3a5522c3535', -- topicoId (Estados de Exceção)
  'feb6da13-7d4a-49d8-9d89-1f295833a9bb', -- subtopicoId (Estado de sítio)
  'Após comoção grave de repercussão nacional, o Presidente pretende instaurar estado de sítio. Antes do decreto, deve observar o procedimento constitucional.',
  'Assinale a alternativa correta sobre o estado de sítio.',
  'Gabarito: Letra B. O Presidente da República deve solicitar autorização ao Congresso Nacional, depois de ouvir o Conselho da República e o Conselho de Defesa Nacional. A resposta decorre de Arts. 137 a 139 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('f37fd2f8-82dd-4d31-9328-bb0def01bb48', 'c71b6aca-fb50-4022-8bff-a9af3b311a15', 'A', 'O Presidente pode decretar estado de sítio imediatamente e comunicar o Congresso apenas ao final da medida.', false, 'Incorreta. O Presidente pode decretar estado de sítio imediatamente e comunicar o Congresso apenas ao final da medida. A assertiva contraria o fundamento constitucional aplicável ao tema Estado de sítio.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Arts. 137 a 139 da CF/88.', 0),
  ('a9a988da-0986-4ff9-815b-5c6467d1abb0', 'c71b6aca-fb50-4022-8bff-a9af3b311a15', 'B', 'O Presidente da República deve solicitar autorização ao Congresso Nacional, depois de ouvir o Conselho da República e o Conselho de Defesa Nacional.', true, 'Correta. O Presidente da República deve solicitar autorização ao Congresso Nacional, depois de ouvir o Conselho da República e o Conselho de Defesa Nacional. Fundamento: Arts. 137 a 139 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Arts. 137 a 139 da CF/88.', 1),
  ('fa16049d-2d97-458d-9fa2-fcfdc621d318', 'c71b6aca-fb50-4022-8bff-a9af3b311a15', 'C', 'O estado de sítio é ato privativo do Supremo Tribunal Federal em crise institucional.', false, 'Incorreta. O estado de sítio é ato privativo do Supremo Tribunal Federal em crise institucional. A assertiva contraria o fundamento constitucional aplicável ao tema Estado de sítio.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Arts. 137 a 139 da CF/88.', 2),
  ('0da964b3-0458-4bb0-9fb1-b54d5dcb2cf7', 'c71b6aca-fb50-4022-8bff-a9af3b311a15', 'D', 'O estado de sítio tem duração ilimitada e não admite controle político pelo Congresso Nacional.', false, 'Incorreta. O estado de sítio tem duração ilimitada e não admite controle político pelo Congresso Nacional. A assertiva contraria o fundamento constitucional aplicável ao tema Estado de sítio.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Arts. 137 a 139 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100092 (ID: 18b170e2-2832-479b-9336-039c4993ff0c)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '18b170e2-2832-479b-9336-039c4993ff0c',
  'Q100092',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '1304f416-9da8-43e6-90a5-bfe99b652dcf', -- assuntoId (Defesa do Estado e das Instituições)
  'd16d5837-71c6-431f-8bc4-8d50d4785613', -- topicoId (Forças Armadas)
  'b4b86127-2320-4130-bacc-351bb74a5072', -- subtopicoId (Aeronáutica)
  'Em operação de defesa aeroespacial, autoridade administrativa afirma que a Aeronáutica é força auxiliar eventual dos Estados.',
  'Conforme a Constituição, assinale a opção correta.',
  'Gabarito: Letra C. A Aeronáutica integra as Forças Armadas, instituições nacionais permanentes e regulares, organizadas com base na hierarquia e na disciplina, sob autoridade suprema do Presidente da República. A resposta decorre de Art. 142 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('6c6c663a-7869-43e0-ac74-44c40328a8fd', '18b170e2-2832-479b-9336-039c4993ff0c', 'A', 'A Aeronáutica é órgão estadual de segurança pública subordinado aos governadores.', false, 'Incorreta. A Aeronáutica é órgão estadual de segurança pública subordinado aos governadores. A assertiva contraria o fundamento constitucional aplicável ao tema Aeronáutica.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 0),
  ('f8fc292e-c019-4c24-8e4e-38e1482a9fa5', '18b170e2-2832-479b-9336-039c4993ff0c', 'B', 'A Aeronáutica exerce ordinariamente polícia judiciária dos Estados.', false, 'Incorreta. A Aeronáutica exerce ordinariamente polícia judiciária dos Estados. A assertiva contraria o fundamento constitucional aplicável ao tema Aeronáutica.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 1),
  ('2ebcfccd-ba6c-4e2d-8641-cee91a83b1d3', '18b170e2-2832-479b-9336-039c4993ff0c', 'C', 'A Aeronáutica integra as Forças Armadas, instituições nacionais permanentes e regulares, organizadas com base na hierarquia e na disciplina, sob autoridade suprema do Presidente da República.', true, 'Correta. A Aeronáutica integra as Forças Armadas, instituições nacionais permanentes e regulares, organizadas com base na hierarquia e na disciplina, sob autoridade suprema do Presidente da República. Fundamento: Art. 142 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 2),
  ('f4fce1ce-84bd-48db-8f04-a7e6828d4575', '18b170e2-2832-479b-9336-039c4993ff0c', 'D', 'A Aeronáutica é entidade privada de apoio à aviação civil.', false, 'Incorreta. A Aeronáutica é entidade privada de apoio à aviação civil. A assertiva contraria o fundamento constitucional aplicável ao tema Aeronáutica.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100093 (ID: 5304cde3-fd41-4033-855f-bf54d7d3a5d4)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '5304cde3-fd41-4033-855f-bf54d7d3a5d4',
  'Q100093',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '1304f416-9da8-43e6-90a5-bfe99b652dcf', -- assuntoId (Defesa do Estado e das Instituições)
  'd16d5837-71c6-431f-8bc4-8d50d4785613', -- topicoId (Forças Armadas)
  'ed7fe5fb-e696-458f-be38-5a4100189276', -- subtopicoId (Exército)
  'Durante operação de garantia da lei e da ordem, discute-se a natureza constitucional do Exército.',
  'À luz do art. 142 da Constituição, assinale a alternativa correta.',
  'Gabarito: Letra D. O Exército integra as Forças Armadas e se destina à defesa da Pátria, à garantia dos poderes constitucionais e, por iniciativa de qualquer destes, da lei e da ordem. A resposta decorre de Art. 142 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('337752fd-88ed-42c5-9614-7e80d5836387', '5304cde3-fd41-4033-855f-bf54d7d3a5d4', 'A', 'O Exército compõe o rol do art. 144 como órgão comum de segurança pública estadual.', false, 'Incorreta. O Exército compõe o rol do art. 144 como órgão comum de segurança pública estadual. A assertiva contraria o fundamento constitucional aplicável ao tema Exército.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 0),
  ('e712ce0e-2968-47c2-a72a-951a13c7a840', '5304cde3-fd41-4033-855f-bf54d7d3a5d4', 'B', 'O Exército é subordinado hierarquicamente ao Ministério Público em operações internas.', false, 'Incorreta. O Exército é subordinado hierarquicamente ao Ministério Público em operações internas. A assertiva contraria o fundamento constitucional aplicável ao tema Exército.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 1),
  ('162c2cca-509f-4894-abbd-de120115ede4', '5304cde3-fd41-4033-855f-bf54d7d3a5d4', 'C', 'O Exército exerce, como função ordinária, investigação de crimes comuns estaduais.', false, 'Incorreta. O Exército exerce, como função ordinária, investigação de crimes comuns estaduais. A assertiva contraria o fundamento constitucional aplicável ao tema Exército.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 2),
  ('127bbf06-725c-4c19-bdeb-473ce1bbdb21', '5304cde3-fd41-4033-855f-bf54d7d3a5d4', 'D', 'O Exército integra as Forças Armadas e se destina à defesa da Pátria, à garantia dos poderes constitucionais e, por iniciativa de qualquer destes, da lei e da ordem.', true, 'Correta. O Exército integra as Forças Armadas e se destina à defesa da Pátria, à garantia dos poderes constitucionais e, por iniciativa de qualquer destes, da lei e da ordem. Fundamento: Art. 142 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100094 (ID: 36a08646-f190-4ae6-ace1-183481212cbf)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '36a08646-f190-4ae6-ace1-183481212cbf',
  'Q100094',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '1304f416-9da8-43e6-90a5-bfe99b652dcf', -- assuntoId (Defesa do Estado e das Instituições)
  'd16d5837-71c6-431f-8bc4-8d50d4785613', -- topicoId (Forças Armadas)
  '7446ede3-74b3-46ec-a7d4-5876ed5c1dd7', -- subtopicoId (Marinha)
  'Em fiscalização costeira, determinado ato administrativo confunde atribuições da Marinha com competências de polícia civil estadual.',
  'Sobre a Marinha na ordem constitucional, assinale a opção correta.',
  'Gabarito: Letra A. A Marinha integra as Forças Armadas, instituições nacionais permanentes, e sua atuação constitucional relaciona-se à defesa da Pátria e à garantia dos poderes constitucionais. A resposta decorre de Art. 142 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('3cb88b87-78ac-4c52-b0df-bdc85dc5cfeb', '36a08646-f190-4ae6-ace1-183481212cbf', 'A', 'A Marinha integra as Forças Armadas, instituições nacionais permanentes, e sua atuação constitucional relaciona-se à defesa da Pátria e à garantia dos poderes constitucionais.', true, 'Correta. A Marinha integra as Forças Armadas, instituições nacionais permanentes, e sua atuação constitucional relaciona-se à defesa da Pátria e à garantia dos poderes constitucionais. Fundamento: Art. 142 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 0),
  ('aaec6a5e-2d1f-4ee9-89dc-4f7c2fa31252', '36a08646-f190-4ae6-ace1-183481212cbf', 'B', 'A Marinha substitui a Polícia Civil na apuração de todos os crimes ocorridos em cidades litorâneas.', false, 'Incorreta. A Marinha substitui a Polícia Civil na apuração de todos os crimes ocorridos em cidades litorâneas. A assertiva contraria o fundamento constitucional aplicável ao tema Marinha.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 1),
  ('54abcc01-f4c7-4fe3-9520-e0a6fb187311', '36a08646-f190-4ae6-ace1-183481212cbf', 'C', 'A Marinha é órgão municipal de segurança portuária previsto no art. 144.', false, 'Incorreta. A Marinha é órgão municipal de segurança portuária previsto no art. 144. A assertiva contraria o fundamento constitucional aplicável ao tema Marinha.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 2),
  ('74e5d242-3fa4-4541-8c53-1296e49e0775', '36a08646-f190-4ae6-ace1-183481212cbf', 'D', 'A Marinha possui autonomia constitucional para requisitar intervenção federal sem participação presidencial.', false, 'Incorreta. A Marinha possui autonomia constitucional para requisitar intervenção federal sem participação presidencial. A assertiva contraria o fundamento constitucional aplicável ao tema Marinha.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100095 (ID: bd136047-0b38-4fc5-87c6-b25d3b47205e)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'bd136047-0b38-4fc5-87c6-b25d3b47205e',
  'Q100095',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'cdced789-77dd-43aa-a758-119103daa1de', -- topicoId (Forças Armadas)
  '44613ac0-f469-42a0-8a7e-6a82dbb4c3d5', -- subtopicoId (Aeronáutica)
  'Um edital policial cobra a distinção entre Forças Armadas e órgãos de segurança pública. A questão apresenta a Aeronáutica como órgão do art. 144.',
  'Assinale a alternativa constitucionalmente correta.',
  'Gabarito: Letra B. A Aeronáutica não integra o rol de órgãos de segurança pública do art. 144; ela é componente das Forças Armadas disciplinadas no art. 142. A resposta decorre de Arts. 142 e 144 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('abd053f7-7bd2-4110-932f-e66518329cc2', 'bd136047-0b38-4fc5-87c6-b25d3b47205e', 'A', 'A Aeronáutica é polícia ostensiva federal prevista no art. 144, § 5º.', false, 'Incorreta. A Aeronáutica é polícia ostensiva federal prevista no art. 144, § 5º. A assertiva contraria o fundamento constitucional aplicável ao tema Aeronáutica.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Arts. 142 e 144 da CF/88.', 0),
  ('d25d18e6-3d41-4da6-b5f1-ccaa3e27f744', 'bd136047-0b38-4fc5-87c6-b25d3b47205e', 'B', 'A Aeronáutica não integra o rol de órgãos de segurança pública do art. 144; ela é componente das Forças Armadas disciplinadas no art. 142.', true, 'Correta. A Aeronáutica não integra o rol de órgãos de segurança pública do art. 144; ela é componente das Forças Armadas disciplinadas no art. 142. Fundamento: Arts. 142 e 144 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Arts. 142 e 144 da CF/88.', 1),
  ('58e0f0b8-768e-4b52-acad-c4c3b1ea8277', 'bd136047-0b38-4fc5-87c6-b25d3b47205e', 'C', 'A Aeronáutica é polícia judiciária da União com exclusividade.', false, 'Incorreta. A Aeronáutica é polícia judiciária da União com exclusividade. A assertiva contraria o fundamento constitucional aplicável ao tema Aeronáutica.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Arts. 142 e 144 da CF/88.', 2),
  ('dd0d6aff-20f3-442a-bfb6-06b64501eb6f', 'bd136047-0b38-4fc5-87c6-b25d3b47205e', 'D', 'A Aeronáutica é força auxiliar e reserva do Exército.', false, 'Incorreta. A Aeronáutica é força auxiliar e reserva do Exército. A assertiva contraria o fundamento constitucional aplicável ao tema Aeronáutica.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Arts. 142 e 144 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100096 (ID: 2ae174b3-6ecf-4c93-b989-a9d0e55cc4fd)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '2ae174b3-6ecf-4c93-b989-a9d0e55cc4fd',
  'Q100096',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'cdced789-77dd-43aa-a758-119103daa1de', -- topicoId (Forças Armadas)
  '6b976507-eb06-4acb-be8c-784f4326adce', -- subtopicoId (Exército)
  'Em prova oral, candidato afirma que apenas o Exército possui fundamento constitucional entre as Forças Armadas.',
  'Sobre a composição constitucional das Forças Armadas, assinale a alternativa correta.',
  'Gabarito: Letra C. As Forças Armadas são constituídas pela Marinha, pelo Exército e pela Aeronáutica. A resposta decorre de Art. 142 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('9e168faf-675b-4bb0-a6dd-a57220d6dc6e', '2ae174b3-6ecf-4c93-b989-a9d0e55cc4fd', 'A', 'As Forças Armadas são compostas pela Polícia Federal, Polícia Rodoviária Federal e Polícia Penal Federal.', false, 'Incorreta. As Forças Armadas são compostas pela Polícia Federal, Polícia Rodoviária Federal e Polícia Penal Federal. A assertiva contraria o fundamento constitucional aplicável ao tema Exército.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 0),
  ('83709fd9-83a2-440a-b912-0010d7fceaa2', '2ae174b3-6ecf-4c93-b989-a9d0e55cc4fd', 'B', 'As Forças Armadas são compostas apenas pelo Exército em tempos de paz.', false, 'Incorreta. As Forças Armadas são compostas apenas pelo Exército em tempos de paz. A assertiva contraria o fundamento constitucional aplicável ao tema Exército.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 1),
  ('52c89c1a-ac2a-49c3-8864-2e50bdc0e2ac', '2ae174b3-6ecf-4c93-b989-a9d0e55cc4fd', 'C', 'As Forças Armadas são constituídas pela Marinha, pelo Exército e pela Aeronáutica.', true, 'Correta. As Forças Armadas são constituídas pela Marinha, pelo Exército e pela Aeronáutica. Fundamento: Art. 142 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 2),
  ('26789e19-de41-44f6-bb5c-8b5d367c9369', '2ae174b3-6ecf-4c93-b989-a9d0e55cc4fd', 'D', 'As guardas municipais integram as Forças Armadas quando atuam em proteção de bens públicos.', false, 'Incorreta. As guardas municipais integram as Forças Armadas quando atuam em proteção de bens públicos. A assertiva contraria o fundamento constitucional aplicável ao tema Exército.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100097 (ID: 60859d8c-1f4b-47ef-8e6b-c08cde7edb8f)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '60859d8c-1f4b-47ef-8e6b-c08cde7edb8f',
  'Q100097',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'cdced789-77dd-43aa-a758-119103daa1de', -- topicoId (Forças Armadas)
  '96b0f73c-30ec-495d-94ca-46b1d2d39896', -- subtopicoId (Garantia da lei e da ordem)
  'Após esgotamento de meios ordinários de segurança, discute-se emprego das Forças Armadas para garantia da lei e da ordem.',
  'Considerando o texto constitucional, assinale a opção correta.',
  'Gabarito: Letra D. As Forças Armadas destinam-se também, por iniciativa de qualquer dos poderes constitucionais, à garantia da lei e da ordem, nos termos constitucionais e legais. A resposta decorre de Art. 142 da CF/88 e legislação complementar pertinente.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('6c162458-7dd9-4a5f-8bb2-ff4205af6c5a', '60859d8c-1f4b-47ef-8e6b-c08cde7edb8f', 'A', 'As Forças Armadas somente podem atuar internamente mediante ordem direta de governador de Estado.', false, 'Incorreta. As Forças Armadas somente podem atuar internamente mediante ordem direta de governador de Estado. A assertiva contraria o fundamento constitucional aplicável ao tema Garantia da lei e da ordem.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88 e legislação complementar pertinente.', 0),
  ('f2bf78df-c741-4c7e-827c-b74453b280e7', '60859d8c-1f4b-47ef-8e6b-c08cde7edb8f', 'B', 'A garantia da lei e da ordem autoriza supressão automática de controle judicial sobre prisões.', false, 'Incorreta. A garantia da lei e da ordem autoriza supressão automática de controle judicial sobre prisões. A assertiva contraria o fundamento constitucional aplicável ao tema Garantia da lei e da ordem.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88 e legislação complementar pertinente.', 1),
  ('2c453b1d-57e9-4578-9143-6bc5852e8835', '60859d8c-1f4b-47ef-8e6b-c08cde7edb8f', 'C', 'A atuação em garantia da lei e da ordem transforma militares federais em policiais civis estaduais.', false, 'Incorreta. A atuação em garantia da lei e da ordem transforma militares federais em policiais civis estaduais. A assertiva contraria o fundamento constitucional aplicável ao tema Garantia da lei e da ordem.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88 e legislação complementar pertinente.', 2),
  ('27b3c815-7ca9-4e9d-9ca6-a18e5d1b4fdb', '60859d8c-1f4b-47ef-8e6b-c08cde7edb8f', 'D', 'As Forças Armadas destinam-se também, por iniciativa de qualquer dos poderes constitucionais, à garantia da lei e da ordem, nos termos constitucionais e legais.', true, 'Correta. As Forças Armadas destinam-se também, por iniciativa de qualquer dos poderes constitucionais, à garantia da lei e da ordem, nos termos constitucionais e legais. Fundamento: Art. 142 da CF/88 e legislação complementar pertinente.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88 e legislação complementar pertinente.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100098 (ID: 9c720a86-6bb2-44e8-b7e0-d10f26b2c4bd)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '9c720a86-6bb2-44e8-b7e0-d10f26b2c4bd',
  'Q100098',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'cdced789-77dd-43aa-a758-119103daa1de', -- topicoId (Forças Armadas)
  '8d5be71e-bdc2-4208-8232-a1d5ef726e8d', -- subtopicoId (Hierarquia e disciplina)
  'Militar punido disciplinarmente impetra habeas corpus para discutir exclusivamente o mérito da punição administrativa militar.',
  'Conforme a Constituição, assinale a alternativa correta.',
  'Gabarito: Letra A. Não caberá habeas corpus em relação a punições disciplinares militares, sem prejuízo do controle judicial de legalidade do ato. A resposta decorre de Art. 142, § 2º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('8fc311a3-090c-4cce-a706-01f902970447', '9c720a86-6bb2-44e8-b7e0-d10f26b2c4bd', 'A', 'Não caberá habeas corpus em relação a punições disciplinares militares, sem prejuízo do controle judicial de legalidade do ato.', true, 'Correta. Não caberá habeas corpus em relação a punições disciplinares militares, sem prejuízo do controle judicial de legalidade do ato. Fundamento: Art. 142, § 2º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142, § 2º, da CF/88.', 0),
  ('1d644663-fc7f-4599-bcbd-9e8a893e4e0b', '9c720a86-6bb2-44e8-b7e0-d10f26b2c4bd', 'B', 'O habeas corpus é sempre cabível para rediscutir o mérito de qualquer punição disciplinar militar.', false, 'Incorreta. O habeas corpus é sempre cabível para rediscutir o mérito de qualquer punição disciplinar militar. A assertiva contraria o fundamento constitucional aplicável ao tema Hierarquia e disciplina.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142, § 2º, da CF/88.', 1),
  ('e4b47d79-7940-490a-99cb-ae08667a7262', '9c720a86-6bb2-44e8-b7e0-d10f26b2c4bd', 'C', 'A Constituição proíbe controle judicial de legalidade em qualquer ato disciplinar militar.', false, 'Incorreta. A Constituição proíbe controle judicial de legalidade em qualquer ato disciplinar militar. A assertiva contraria o fundamento constitucional aplicável ao tema Hierarquia e disciplina.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142, § 2º, da CF/88.', 2),
  ('d1af2717-bf10-4c38-a0e1-c1fc2e20abe0', '9c720a86-6bb2-44e8-b7e0-d10f26b2c4bd', 'D', 'A punição disciplinar militar depende de aprovação prévia do Poder Judiciário.', false, 'Incorreta. A punição disciplinar militar depende de aprovação prévia do Poder Judiciário. A assertiva contraria o fundamento constitucional aplicável ao tema Hierarquia e disciplina.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142, § 2º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100099 (ID: 530609ec-bc73-4513-92e6-a339a435c732)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '530609ec-bc73-4513-92e6-a339a435c732',
  'Q100099',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'cdced789-77dd-43aa-a758-119103daa1de', -- topicoId (Forças Armadas)
  'd9000686-1da9-4fee-9751-edcd11c3a9be', -- subtopicoId (Marinha)
  'Uma autoridade local pretende subordinar unidade da Marinha ao comando operacional permanente de órgão estadual.',
  'À luz da organização constitucional, assinale a alternativa correta.',
  'Gabarito: Letra B. As Forças Armadas estão sob a autoridade suprema do Presidente da República, não se submetendo a comando estadual permanente. A resposta decorre de Art. 142 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('c2d1f3b0-3dfb-4f9a-bab5-7d75c3009521', '530609ec-bc73-4513-92e6-a339a435c732', 'A', 'A Marinha se subordina diretamente ao governador quando atua em porto situado no Estado.', false, 'Incorreta. A Marinha se subordina diretamente ao governador quando atua em porto situado no Estado. A assertiva contraria o fundamento constitucional aplicável ao tema Marinha.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 0),
  ('a93a53fa-d592-4031-b05f-f65461c635c3', '530609ec-bc73-4513-92e6-a339a435c732', 'B', 'As Forças Armadas estão sob a autoridade suprema do Presidente da República, não se submetendo a comando estadual permanente.', true, 'Correta. As Forças Armadas estão sob a autoridade suprema do Presidente da República, não se submetendo a comando estadual permanente. Fundamento: Art. 142 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 1),
  ('0529a007-a9eb-45d6-90f4-38bae88034d8', '530609ec-bc73-4513-92e6-a339a435c732', 'C', 'A Marinha é vinculada às câmaras municipais para proteção de bens locais.', false, 'Incorreta. A Marinha é vinculada às câmaras municipais para proteção de bens locais. A assertiva contraria o fundamento constitucional aplicável ao tema Marinha.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 2),
  ('88a82da3-8e52-4a31-8a92-f99707009022', '530609ec-bc73-4513-92e6-a339a435c732', 'D', 'A Marinha integra a estrutura orgânica das polícias militares.', false, 'Incorreta. A Marinha integra a estrutura orgânica das polícias militares. A assertiva contraria o fundamento constitucional aplicável ao tema Marinha.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 142 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100100 (ID: 6f1901e9-9e12-45aa-a6a8-2927fcae27fe)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '6f1901e9-9e12-45aa-a6a8-2927fcae27fe',
  'Q100100',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'a2c9f22f-e5eb-42fd-81f1-b83835c715b0', -- topicoId (Segurança Pública)
  '8f9b5e29-0568-4186-941e-cc1ad9e77d48', -- subtopicoId (Corpos de bombeiros militares)
  'Lei estadual atribui aos corpos de bombeiros militares apenas atividades de defesa civil, negando-lhes natureza de força auxiliar.',
  'Sobre os corpos de bombeiros militares, assinale a opção correta.',
  'Gabarito: Letra C. Os corpos de bombeiros militares, juntamente com as polícias militares, são forças auxiliares e reserva do Exército, subordinando-se aos governadores dos Estados, do Distrito Federal e dos Territórios. A resposta decorre de Art. 144, §§ 5º e 6º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('db915c54-f606-4298-8882-3db00727fbe2', '6f1901e9-9e12-45aa-a6a8-2927fcae27fe', 'A', 'Os corpos de bombeiros militares são órgãos federais subordinados à Polícia Federal.', false, 'Incorreta. Os corpos de bombeiros militares são órgãos federais subordinados à Polícia Federal. A assertiva contraria o fundamento constitucional aplicável ao tema Corpos de bombeiros militares.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, §§ 5º e 6º, da CF/88.', 0),
  ('8d0eb08d-cc68-403b-9507-8424348f0b72', '6f1901e9-9e12-45aa-a6a8-2927fcae27fe', 'B', 'Os corpos de bombeiros militares exercem exclusivamente polícia judiciária da União.', false, 'Incorreta. Os corpos de bombeiros militares exercem exclusivamente polícia judiciária da União. A assertiva contraria o fundamento constitucional aplicável ao tema Corpos de bombeiros militares.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, §§ 5º e 6º, da CF/88.', 1),
  ('13f0039a-55f6-46ec-8839-ca58733212ec', '6f1901e9-9e12-45aa-a6a8-2927fcae27fe', 'C', 'Os corpos de bombeiros militares, juntamente com as polícias militares, são forças auxiliares e reserva do Exército, subordinando-se aos governadores dos Estados, do Distrito Federal e dos Territórios.', true, 'Correta. Os corpos de bombeiros militares, juntamente com as polícias militares, são forças auxiliares e reserva do Exército, subordinando-se aos governadores dos Estados, do Distrito Federal e dos Territórios. Fundamento: Art. 144, §§ 5º e 6º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, §§ 5º e 6º, da CF/88.', 2),
  ('52bc4375-6340-4035-b39d-5e25749639fe', '6f1901e9-9e12-45aa-a6a8-2927fcae27fe', 'D', 'Os corpos de bombeiros militares não integram o sistema constitucional de segurança pública.', false, 'Incorreta. Os corpos de bombeiros militares não integram o sistema constitucional de segurança pública. A assertiva contraria o fundamento constitucional aplicável ao tema Corpos de bombeiros militares.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, §§ 5º e 6º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100101 (ID: f1eefed6-694a-48e4-ae97-883482025092)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'f1eefed6-694a-48e4-ae97-883482025092',
  'Q100101',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'a2c9f22f-e5eb-42fd-81f1-b83835c715b0', -- topicoId (Segurança Pública)
  '6d26a8a8-4a08-44c5-8cd0-8ea11c2011d3', -- subtopicoId (Guardas municipais)
  'Município institui guarda municipal e lhe atribui a proteção de escolas, prédios administrativos e praças públicas municipais.',
  'De acordo com a Constituição, assinale a alternativa correta.',
  'Gabarito: Letra D. Os Municípios podem constituir guardas municipais destinadas à proteção de seus bens, serviços e instalações, conforme dispuser a lei. A resposta decorre de Art. 144, § 8º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('83780811-f436-48b6-a2be-1975644d727f', 'f1eefed6-694a-48e4-ae97-883482025092', 'A', 'Guardas municipais exercem polícia judiciária estadual com exclusividade.', false, 'Incorreta. Guardas municipais exercem polícia judiciária estadual com exclusividade. A assertiva contraria o fundamento constitucional aplicável ao tema Guardas municipais.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 8º, da CF/88.', 0),
  ('c22a27e8-8bde-4844-8748-80c8bf587295', 'f1eefed6-694a-48e4-ae97-883482025092', 'B', 'Guardas municipais são forças auxiliares e reserva do Exército.', false, 'Incorreta. Guardas municipais são forças auxiliares e reserva do Exército. A assertiva contraria o fundamento constitucional aplicável ao tema Guardas municipais.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 8º, da CF/88.', 1),
  ('8f3e748b-6639-4afa-aeaa-1a37478e75dc', 'f1eefed6-694a-48e4-ae97-883482025092', 'C', 'A Constituição veda a criação de guarda municipal em municípios com menos de quinhentos mil habitantes.', false, 'Incorreta. A Constituição veda a criação de guarda municipal em municípios com menos de quinhentos mil habitantes. A assertiva contraria o fundamento constitucional aplicável ao tema Guardas municipais.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 8º, da CF/88.', 2),
  ('a1ab8021-8b5f-49c5-9fbb-2b638838860a', 'f1eefed6-694a-48e4-ae97-883482025092', 'D', 'Os Municípios podem constituir guardas municipais destinadas à proteção de seus bens, serviços e instalações, conforme dispuser a lei.', true, 'Correta. Os Municípios podem constituir guardas municipais destinadas à proteção de seus bens, serviços e instalações, conforme dispuser a lei. Fundamento: Art. 144, § 8º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 8º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100102 (ID: c33dd1a9-dfeb-408f-826b-888aeb93e6d2)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'c33dd1a9-dfeb-408f-826b-888aeb93e6d2',
  'Q100102',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'a2c9f22f-e5eb-42fd-81f1-b83835c715b0', -- topicoId (Segurança Pública)
  '0be9ecd1-b95f-464b-a996-83cef7945dc0', -- subtopicoId (Órgãos de segurança pública)
  'Em aula, afirma-se que o Ministério Público e as guardas municipais constam no caput do art. 144 como órgãos de segurança pública.',
  'Considerando a enumeração constitucional do caput do art. 144, assinale a opção correta.',
  'Gabarito: Letra A. O caput do art. 144 enumera polícia federal, polícia rodoviária federal, polícia ferroviária federal, polícias civis, polícias militares e corpos de bombeiros militares, além das polícias penais federal, estaduais e distrital. A resposta decorre de Art. 144, caput, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('1d59e12c-e21f-482c-9682-18587d61b28e', 'c33dd1a9-dfeb-408f-826b-888aeb93e6d2', 'A', 'O caput do art. 144 enumera polícia federal, polícia rodoviária federal, polícia ferroviária federal, polícias civis, polícias militares e corpos de bombeiros militares, além das polícias penais federal, estaduais e distrital.', true, 'Correta. O caput do art. 144 enumera polícia federal, polícia rodoviária federal, polícia ferroviária federal, polícias civis, polícias militares e corpos de bombeiros militares, além das polícias penais federal, estaduais e distrital. Fundamento: Art. 144, caput, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, caput, da CF/88.', 0),
  ('e2391440-41b0-465c-b0a9-a7f2f7ef0ce3', 'c33dd1a9-dfeb-408f-826b-888aeb93e6d2', 'B', 'O Ministério Público integra expressamente o caput do art. 144 como órgão de segurança pública.', false, 'Incorreta. O Ministério Público integra expressamente o caput do art. 144 como órgão de segurança pública. A assertiva contraria o fundamento constitucional aplicável ao tema Órgãos de segurança pública.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, caput, da CF/88.', 1),
  ('b5600737-11d2-42fe-822e-41a51d96b90f', 'c33dd1a9-dfeb-408f-826b-888aeb93e6d2', 'C', 'As guardas municipais substituem as polícias civis no caput do art. 144.', false, 'Incorreta. As guardas municipais substituem as polícias civis no caput do art. 144. A assertiva contraria o fundamento constitucional aplicável ao tema Órgãos de segurança pública.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, caput, da CF/88.', 2),
  ('7c2d4f5c-f522-405b-8031-533ac31d622e', 'c33dd1a9-dfeb-408f-826b-888aeb93e6d2', 'D', 'As Forças Armadas compõem o caput do art. 144 como polícias militares federais.', false, 'Incorreta. As Forças Armadas compõem o caput do art. 144 como polícias militares federais. A assertiva contraria o fundamento constitucional aplicável ao tema Órgãos de segurança pública.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, caput, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100103 (ID: c1f9c550-3bb7-4490-bd14-ec04568bd24b)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'c1f9c550-3bb7-4490-bd14-ec04568bd24b',
  'Q100103',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'a2c9f22f-e5eb-42fd-81f1-b83835c715b0', -- topicoId (Segurança Pública)
  '8c2e98b3-2c68-49b6-9a52-d0c1644d0718', -- subtopicoId (Polícia penal)
  'Após a Emenda Constitucional n.º 104/2019, discute-se a posição das polícias penais no sistema de segurança pública.',
  'Assinale a alternativa correta sobre a polícia penal.',
  'Gabarito: Letra B. As polícias penais federal, estaduais e distrital integram o rol constitucional de órgãos de segurança pública e vinculam-se à segurança dos estabelecimentos penais. A resposta decorre de Art. 144, caput, VI, e § 5º-A da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('680d94ae-5e9a-433c-a59f-38b9f4104c2f', 'c1f9c550-3bb7-4490-bd14-ec04568bd24b', 'A', 'A polícia penal foi criada como órgão privado de administração penitenciária.', false, 'Incorreta. A polícia penal foi criada como órgão privado de administração penitenciária. A assertiva contraria o fundamento constitucional aplicável ao tema Polícia penal.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, caput, VI, e § 5º-A da CF/88.', 0),
  ('c257c352-6ada-4b7d-abce-02ad0ec6f059', 'c1f9c550-3bb7-4490-bd14-ec04568bd24b', 'B', 'As polícias penais federal, estaduais e distrital integram o rol constitucional de órgãos de segurança pública e vinculam-se à segurança dos estabelecimentos penais.', true, 'Correta. As polícias penais federal, estaduais e distrital integram o rol constitucional de órgãos de segurança pública e vinculam-se à segurança dos estabelecimentos penais. Fundamento: Art. 144, caput, VI, e § 5º-A da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, caput, VI, e § 5º-A da CF/88.', 1),
  ('25ce82c9-68fa-405e-bcea-f419c703c25a', 'c1f9c550-3bb7-4490-bd14-ec04568bd24b', 'C', 'A polícia penal substituiu a Polícia Civil na apuração de crimes comuns.', false, 'Incorreta. A polícia penal substituiu a Polícia Civil na apuração de crimes comuns. A assertiva contraria o fundamento constitucional aplicável ao tema Polícia penal.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, caput, VI, e § 5º-A da CF/88.', 2),
  ('bf911292-5ce5-4167-b303-5d0d23b466bc', 'c1f9c550-3bb7-4490-bd14-ec04568bd24b', 'D', 'A polícia penal não possui previsão no art. 144 da Constituição.', false, 'Incorreta. A polícia penal não possui previsão no art. 144 da Constituição. A assertiva contraria o fundamento constitucional aplicável ao tema Polícia penal.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, caput, VI, e § 5º-A da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100104 (ID: bb00f008-607a-4d31-a363-633e7811b05f)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'bb00f008-607a-4d31-a363-633e7811b05f',
  'Q100104',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'a2c9f22f-e5eb-42fd-81f1-b83835c715b0', -- topicoId (Segurança Pública)
  'f5b25802-10f9-4b6b-9ac1-aadfc2bb5062', -- subtopicoId (Polícias civis)
  'Delegado de polícia civil recebe notícia-crime de roubo praticado por civil e instaura investigação, ressalvada competência da União.',
  'Sobre as polícias civis, assinale a opção correta.',
  'Gabarito: Letra C. Às polícias civis, dirigidas por delegados de polícia de carreira, incumbem as funções de polícia judiciária e a apuração de infrações penais, exceto as militares. A resposta decorre de Art. 144, § 4º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('0d4bc808-ecba-4561-b684-744c2d80a9c0', 'bb00f008-607a-4d31-a363-633e7811b05f', 'A', 'Às polícias civis incumbe o policiamento ostensivo e a preservação da ordem pública.', false, 'Incorreta. Às polícias civis incumbe o policiamento ostensivo e a preservação da ordem pública. A assertiva contraria o fundamento constitucional aplicável ao tema Polícias civis.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 4º, da CF/88.', 0),
  ('3b3aef38-e77c-4ee5-905c-f6444cbb8e21', 'bb00f008-607a-4d31-a363-633e7811b05f', 'B', 'As polícias civis são forças auxiliares e reserva do Exército.', false, 'Incorreta. As polícias civis são forças auxiliares e reserva do Exército. A assertiva contraria o fundamento constitucional aplicável ao tema Polícias civis.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 4º, da CF/88.', 1),
  ('fab95f9f-a701-4bab-8c1c-214f009c71c8', 'bb00f008-607a-4d31-a363-633e7811b05f', 'C', 'Às polícias civis, dirigidas por delegados de polícia de carreira, incumbem as funções de polícia judiciária e a apuração de infrações penais, exceto as militares.', true, 'Correta. Às polícias civis, dirigidas por delegados de polícia de carreira, incumbem as funções de polícia judiciária e a apuração de infrações penais, exceto as militares. Fundamento: Art. 144, § 4º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 4º, da CF/88.', 2),
  ('b9cbc025-1ba8-481b-97b6-454dd28b14b3', 'bb00f008-607a-4d31-a363-633e7811b05f', 'D', 'As polícias civis exercem polícia marítima, aeroportuária e de fronteiras.', false, 'Incorreta. As polícias civis exercem polícia marítima, aeroportuária e de fronteiras. A assertiva contraria o fundamento constitucional aplicável ao tema Polícias civis.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 4º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100105 (ID: 0f6142ca-bca7-492c-ba85-7e14fa0e5f90)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '0f6142ca-bca7-492c-ba85-7e14fa0e5f90',
  'Q100105',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3', -- assuntoId (Defesa do Estado e das Instituições Democráticas)
  'a2c9f22f-e5eb-42fd-81f1-b83835c715b0', -- topicoId (Segurança Pública)
  '0425ebb5-3504-4595-b157-d1911c420540', -- subtopicoId (Polícias militares)
  'Durante patrulhamento ostensivo, a Polícia Militar prende agente em flagrante e o apresenta à autoridade competente.',
  'Quanto à função constitucional das polícias militares, assinale a alternativa correta.',
  'Gabarito: Letra D. Às polícias militares cabem a polícia ostensiva e a preservação da ordem pública. A resposta decorre de Art. 144, § 5º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('50c7f52a-1c9b-435e-9ca5-180c3bd983b0', '0f6142ca-bca7-492c-ba85-7e14fa0e5f90', 'A', 'Às polícias militares cabe a polícia judiciária da União com exclusividade.', false, 'Incorreta. Às polícias militares cabe a polícia judiciária da União com exclusividade. A assertiva contraria o fundamento constitucional aplicável ao tema Polícias militares.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 5º, da CF/88.', 0),
  ('a0aec383-04ae-4c66-b537-609d89ce1620', '0f6142ca-bca7-492c-ba85-7e14fa0e5f90', 'B', 'Às polícias militares cabe apurar infrações penais comuns, exceto as militares, como regra geral.', false, 'Incorreta. Às polícias militares cabe apurar infrações penais comuns, exceto as militares, como regra geral. A assertiva contraria o fundamento constitucional aplicável ao tema Polícias militares.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 5º, da CF/88.', 1),
  ('1e862314-567e-4bdd-9e0a-d9f53e8391e1', '0f6142ca-bca7-492c-ba85-7e14fa0e5f90', 'C', 'Às polícias militares cabe editar normas penais incriminadoras em situação de crise.', false, 'Incorreta. Às polícias militares cabe editar normas penais incriminadoras em situação de crise. A assertiva contraria o fundamento constitucional aplicável ao tema Polícias militares.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 5º, da CF/88.', 2),
  ('0455f8d6-a40a-4107-a07b-a4af44e07625', '0f6142ca-bca7-492c-ba85-7e14fa0e5f90', 'D', 'Às polícias militares cabem a polícia ostensiva e a preservação da ordem pública.', true, 'Correta. Às polícias militares cabem a polícia ostensiva e a preservação da ordem pública. Fundamento: Art. 144, § 5º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 144, § 5º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100106 (ID: bdeb310e-b115-423e-9042-03faa4975057)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'bdeb310e-b115-423e-9042-03faa4975057',
  'Q100106',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  'ac90b840-e0f8-49c8-a849-b9fd6cbd6d0b', -- subtopicoId (Ato jurídico perfeito)
  'Lei nova altera critérios de concessão de vantagem funcional e a administração pretende desfazer ato já consumado segundo a lei vigente ao tempo de sua prática.',
  'À luz do art. 5º, XXXVI, assinale a alternativa correta.',
  'Gabarito: Letra A. A lei não prejudicará o direito adquirido, o ato jurídico perfeito e a coisa julgada. A resposta decorre de Art. 5º, XXXVI, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('9524c08e-810b-4c09-a8d5-45615db62a1d', 'bdeb310e-b115-423e-9042-03faa4975057', 'A', 'A lei não prejudicará o direito adquirido, o ato jurídico perfeito e a coisa julgada.', true, 'Correta. A lei não prejudicará o direito adquirido, o ato jurídico perfeito e a coisa julgada. Fundamento: Art. 5º, XXXVI, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 0),
  ('cd53a927-659f-446a-a53d-4e30d46f1c80', 'bdeb310e-b115-423e-9042-03faa4975057', 'B', 'A lei nova sempre desfaz atos administrativos perfeitos quando houver conveniência administrativa.', false, 'Incorreta. A lei nova sempre desfaz atos administrativos perfeitos quando houver conveniência administrativa. A assertiva contraria o fundamento constitucional aplicável ao tema Ato jurídico perfeito.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 1),
  ('637598a3-bd39-462e-b466-4c33d0b2eb33', 'bdeb310e-b115-423e-9042-03faa4975057', 'C', 'A proteção constitucional alcança apenas decisões judiciais, nunca atos jurídicos perfeitos.', false, 'Incorreta. A proteção constitucional alcança apenas decisões judiciais, nunca atos jurídicos perfeitos. A assertiva contraria o fundamento constitucional aplicável ao tema Ato jurídico perfeito.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 2),
  ('7d243fd4-d929-4f71-8820-b01ecdaeb5c3', 'bdeb310e-b115-423e-9042-03faa4975057', 'D', 'O ato jurídico perfeito pode ser invalidado por lei penal posterior mais gravosa.', false, 'Incorreta. O ato jurídico perfeito pode ser invalidado por lei penal posterior mais gravosa. A assertiva contraria o fundamento constitucional aplicável ao tema Ato jurídico perfeito.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100107 (ID: 94ea45f4-77a4-4ab1-bddd-20f977a34cae)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '94ea45f4-77a4-4ab1-bddd-20f977a34cae',
  'Q100107',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  'f9aea7e7-4d7d-4c77-a442-ad74aa09621e', -- subtopicoId (Coisa julgada)
  'Após decisão judicial transitada em julgado favorável a servidor, lei posterior tenta afastar diretamente os efeitos daquela decisão.',
  'Considerando a proteção constitucional da coisa julgada diante de lei posterior, assinale a alternativa correta.',
  'Gabarito: Letra B. A coisa julgada recebe proteção constitucional e não pode ser prejudicada por lei posterior. A resposta decorre de Art. 5º, XXXVI, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('95cdbb41-4005-4f03-b372-65c62ffbf97e', '94ea45f4-77a4-4ab1-bddd-20f977a34cae', 'A', 'A coisa julgada só existe em processos criminais com réu preso.', false, 'Incorreta. A coisa julgada só existe em processos criminais com réu preso. A assertiva contraria o fundamento constitucional aplicável ao tema Coisa julgada.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 0),
  ('ec8f615d-af73-48e9-9ee9-c92953be1756', '94ea45f4-77a4-4ab1-bddd-20f977a34cae', 'B', 'A coisa julgada recebe proteção constitucional e não pode ser prejudicada por lei posterior.', true, 'Correta. A coisa julgada recebe proteção constitucional e não pode ser prejudicada por lei posterior. Fundamento: Art. 5º, XXXVI, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 1),
  ('644a6d6a-5e51-491b-8540-33d0acbbc068', '94ea45f4-77a4-4ab1-bddd-20f977a34cae', 'C', 'Lei ordinária posterior pode desconstituir automaticamente qualquer coisa julgada.', false, 'Incorreta. Lei ordinária posterior pode desconstituir automaticamente qualquer coisa julgada. A assertiva contraria o fundamento constitucional aplicável ao tema Coisa julgada.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 2),
  ('c521b3c6-144e-44fe-b296-e816a493ae99', '94ea45f4-77a4-4ab1-bddd-20f977a34cae', 'D', 'A coisa julgada impede inclusive ação rescisória nas hipóteses previstas em lei processual.', false, 'Incorreta. A coisa julgada impede inclusive ação rescisória nas hipóteses previstas em lei processual. A assertiva contraria o fundamento constitucional aplicável ao tema Coisa julgada.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100108 (ID: 46ec737b-8f5f-4dac-a2fb-d4313291e804)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '46ec737b-8f5f-4dac-a2fb-d4313291e804',
  'Q100108',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  '9dae14cd-30b9-4611-bc99-264a248a47c5', -- subtopicoId (Direito adquirido)
  'Servidor preenche todos os requisitos legais para determinado benefício antes da revogação da lei, mas ainda não formulou requerimento administrativo.',
  'Quanto ao direito adquirido, assinale a opção correta.',
  'Gabarito: Letra C. Preenchidos os requisitos sob a lei anterior, pode haver direito adquirido, protegido contra lei posterior que pretenda suprimi-lo. A resposta decorre de Art. 5º, XXXVI, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('4dfc275d-f524-4b9d-a448-83e7919b8c6a', '46ec737b-8f5f-4dac-a2fb-d4313291e804', 'A', 'Direito adquirido depende sempre de sentença judicial transitada em julgado.', false, 'Incorreta. Direito adquirido depende sempre de sentença judicial transitada em julgado. A assertiva contraria o fundamento constitucional aplicável ao tema Direito adquirido.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 0),
  ('815e036c-838b-4b19-bcc7-3386e3c2e660', '46ec737b-8f5f-4dac-a2fb-d4313291e804', 'B', 'Expectativa de direito e direito adquirido são expressões equivalentes.', false, 'Incorreta. Expectativa de direito e direito adquirido são expressões equivalentes. A assertiva contraria o fundamento constitucional aplicável ao tema Direito adquirido.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 1),
  ('4d2bbf3b-3c65-4cc8-87f0-3131e8ef794b', '46ec737b-8f5f-4dac-a2fb-d4313291e804', 'C', 'Preenchidos os requisitos sob a lei anterior, pode haver direito adquirido, protegido contra lei posterior que pretenda suprimi-lo.', true, 'Correta. Preenchidos os requisitos sob a lei anterior, pode haver direito adquirido, protegido contra lei posterior que pretenda suprimi-lo. Fundamento: Art. 5º, XXXVI, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 2),
  ('8c3865dd-45e9-4c2a-b386-c3ac79dc2dc4', '46ec737b-8f5f-4dac-a2fb-d4313291e804', 'D', 'A Constituição protege apenas o ato jurídico perfeito, sem mencionar direito adquirido.', false, 'Incorreta. A Constituição protege apenas o ato jurídico perfeito, sem mencionar direito adquirido. A assertiva contraria o fundamento constitucional aplicável ao tema Direito adquirido.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXXVI, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100109 (ID: 8ba16df5-dbc5-4003-ab0b-4380613468fd)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '8ba16df5-dbc5-4003-ab0b-4380613468fd',
  'Q100109',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  'ecde03f4-9f04-4f4e-bf21-6d3b3d6e6faa', -- subtopicoId (Direito de associação)
  'Grupo de moradores cria associação para fiscalizar políticas de segurança local. O poder público exige autorização estatal prévia para seu funcionamento lícito.',
  'Com base no direito de associação, assinale a alternativa correta.',
  'Gabarito: Letra D. A criação de associações independe de autorização, é vedada a interferência estatal em seu funcionamento e ninguém pode ser compelido a associar-se ou a permanecer associado. A resposta decorre de Art. 5º, XVII a XX, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('2aa30961-e47d-4512-b496-e8b4c07cf2fb', '8ba16df5-dbc5-4003-ab0b-4380613468fd', 'A', 'Associação civil só pode existir mediante autorização policial prévia.', false, 'Incorreta. Associação civil só pode existir mediante autorização policial prévia. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de associação.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XVII a XX, da CF/88.', 0),
  ('2210d534-abce-49d2-a48e-0399bf86fb23', '8ba16df5-dbc5-4003-ab0b-4380613468fd', 'B', 'A dissolução compulsória de associação pode ocorrer por ato administrativo motivado.', false, 'Incorreta. A dissolução compulsória de associação pode ocorrer por ato administrativo motivado. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de associação.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XVII a XX, da CF/88.', 1),
  ('a23de7e5-f6e2-401a-80aa-6ee8be6f77f3', '8ba16df5-dbc5-4003-ab0b-4380613468fd', 'C', 'O Poder Executivo pode suspender associação por conveniência, sem decisão judicial.', false, 'Incorreta. O Poder Executivo pode suspender associação por conveniência, sem decisão judicial. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de associação.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XVII a XX, da CF/88.', 2),
  ('17ffdc9f-c3ec-4edf-a613-a748f3e88f1f', '8ba16df5-dbc5-4003-ab0b-4380613468fd', 'D', 'A criação de associações independe de autorização, é vedada a interferência estatal em seu funcionamento e ninguém pode ser compelido a associar-se ou a permanecer associado.', true, 'Correta. A criação de associações independe de autorização, é vedada a interferência estatal em seu funcionamento e ninguém pode ser compelido a associar-se ou a permanecer associado. Fundamento: Art. 5º, XVII a XX, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XVII a XX, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100110 (ID: 9b2fa415-bc39-4cbf-86a3-3a5bc99a9d4a)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '9b2fa415-bc39-4cbf-86a3-3a5bc99a9d4a',
  'Q100110',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  'b255273d-f828-4969-81f3-9d1678602e63', -- subtopicoId (Direito de propriedade)
  'Em política urbana, o poder público impõe limitações ao uso de imóvel particular para atender exigências urbanísticas previstas em lei.',
  'Sobre o direito de propriedade na Constituição, assinale a alternativa correta.',
  'Gabarito: Letra A. O direito de propriedade é garantido, mas a propriedade atenderá a sua função social. A resposta decorre de Art. 5º, XXII e XXIII, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('9c9ae868-5f70-4927-b485-bf956f888a6d', '9b2fa415-bc39-4cbf-86a3-3a5bc99a9d4a', 'A', 'O direito de propriedade é garantido, mas a propriedade atenderá a sua função social.', true, 'Correta. O direito de propriedade é garantido, mas a propriedade atenderá a sua função social. Fundamento: Art. 5º, XXII e XXIII, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXII e XXIII, da CF/88.', 0),
  ('ec6dede4-8c93-40e4-bbbd-6c3e0e8bd996', '9b2fa415-bc39-4cbf-86a3-3a5bc99a9d4a', 'B', 'A propriedade privada é absoluta e não se sujeita a função social.', false, 'Incorreta. A propriedade privada é absoluta e não se sujeita a função social. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de propriedade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXII e XXIII, da CF/88.', 1),
  ('1bbfb1df-e4f1-4f32-8cd8-2164288eaa7e', '9b2fa415-bc39-4cbf-86a3-3a5bc99a9d4a', 'C', 'A Constituição só protege propriedade rural produtiva, não imóvel urbano.', false, 'Incorreta. A Constituição só protege propriedade rural produtiva, não imóvel urbano. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de propriedade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXII e XXIII, da CF/88.', 2),
  ('016b6872-75a7-4303-bd27-76c807502db3', '9b2fa415-bc39-4cbf-86a3-3a5bc99a9d4a', 'D', 'A função social permite confisco administrativo sem processo e sem previsão constitucional.', false, 'Incorreta. A função social permite confisco administrativo sem processo e sem previsão constitucional. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de propriedade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XXII e XXIII, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100111 (ID: 36d4f776-cb70-4c08-a427-c7b8a8d0caa8)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '36d4f776-cb70-4c08-a427-c7b8a8d0caa8',
  'Q100111',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  '14607e40-3fa7-48f1-b665-e9f1180e2690', -- subtopicoId (Direito de reunião)
  'Cidadãos organizam manifestação pacífica em praça pública, sem armas, e comunicam previamente a autoridade competente para evitar conflito com outro evento.',
  'Assinale a opção correta sobre o direito de reunião.',
  'Gabarito: Letra B. Todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo exigido prévio aviso à autoridade competente. A resposta decorre de Art. 5º, XVI, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('3dfe92aa-d7b0-4fed-bf1c-7b47810cd055', '36d4f776-cb70-4c08-a427-c7b8a8d0caa8', 'A', 'O direito de reunião depende de licença prévia da autoridade policial.', false, 'Incorreta. O direito de reunião depende de licença prévia da autoridade policial. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de reunião.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XVI, da CF/88.', 0),
  ('ef5bcd91-06d3-43dc-990f-540eaf4d8126', '36d4f776-cb70-4c08-a427-c7b8a8d0caa8', 'B', 'Todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo exigido prévio aviso à autoridade competente.', true, 'Correta. Todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo exigido prévio aviso à autoridade competente. Fundamento: Art. 5º, XVI, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XVI, da CF/88.', 1),
  ('0981fff4-6760-4831-8317-592386125ee7', '36d4f776-cb70-4c08-a427-c7b8a8d0caa8', 'C', 'A Constituição permite reunião armada quando houver finalidade política.', false, 'Incorreta. A Constituição permite reunião armada quando houver finalidade política. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de reunião.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XVI, da CF/88.', 2),
  ('24803228-481f-41b8-8e90-10d5c6d1228c', '36d4f776-cb70-4c08-a427-c7b8a8d0caa8', 'D', 'Reunião pacífica em local aberto ao público é vedada durante período eleitoral.', false, 'Incorreta. Reunião pacífica em local aberto ao público é vedada durante período eleitoral. A assertiva contraria o fundamento constitucional aplicável ao tema Direito de reunião.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XVI, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100112 (ID: bd704c0a-6b1a-4831-be8d-df6c9ed52b8c)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'bd704c0a-6b1a-4831-be8d-df6c9ed52b8c',
  'Q100112',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  '8c4af20d-6edb-4319-aafb-f115934f08c9', -- subtopicoId (Inviolabilidade domiciliar)
  'Policiais ingressam em residência durante a noite sem consentimento do morador, sem flagrante delito, sem desastre e sem ordem judicial.',
  'Com base na inviolabilidade domiciliar, assinale a alternativa correta.',
  'Gabarito: Letra C. A casa é asilo inviolável do indivíduo; durante a noite, o ingresso forçado somente se admite, em regra constitucional, em flagrante delito, desastre ou para prestar socorro. A resposta decorre de Art. 5º, XI, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('b7c6728d-1f7d-4b6a-a11b-680738d6d276', 'bd704c0a-6b1a-4831-be8d-df6c9ed52b8c', 'A', 'Ordem judicial autoriza ingresso domiciliar forçado a qualquer hora do dia ou da noite para busca comum.', false, 'Incorreta. Ordem judicial autoriza ingresso domiciliar forçado a qualquer hora do dia ou da noite para busca comum. A assertiva contraria o fundamento constitucional aplicável ao tema Inviolabilidade domiciliar.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XI, da CF/88.', 0),
  ('d8fd1823-a0b1-4921-b056-fd59fdbe805c', 'bd704c0a-6b1a-4831-be8d-df6c9ed52b8c', 'B', 'A inviolabilidade domiciliar não se aplica a quartos de hotel ocupados.', false, 'Incorreta. A inviolabilidade domiciliar não se aplica a quartos de hotel ocupados. A assertiva contraria o fundamento constitucional aplicável ao tema Inviolabilidade domiciliar.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XI, da CF/88.', 1),
  ('891ecb32-d67f-4da5-8488-7e2b3519a062', 'bd704c0a-6b1a-4831-be8d-df6c9ed52b8c', 'C', 'A casa é asilo inviolável do indivíduo; durante a noite, o ingresso forçado somente se admite, em regra constitucional, em flagrante delito, desastre ou para prestar socorro.', true, 'Correta. A casa é asilo inviolável do indivíduo; durante a noite, o ingresso forçado somente se admite, em regra constitucional, em flagrante delito, desastre ou para prestar socorro. Fundamento: Art. 5º, XI, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XI, da CF/88.', 2),
  ('4c561c88-12bd-47f3-a100-3704efa2e48f', 'bd704c0a-6b1a-4831-be8d-df6c9ed52b8c', 'D', 'O consentimento do morador nunca autoriza ingresso estatal na residência.', false, 'Incorreta. O consentimento do morador nunca autoriza ingresso estatal na residência. A assertiva contraria o fundamento constitucional aplicável ao tema Inviolabilidade domiciliar.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, XI, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100113 (ID: 653810ac-3bfa-48e5-9cef-72656ac0b3b6)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '653810ac-3bfa-48e5-9cef-72656ac0b3b6',
  'Q100113',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  'f352a42a-8327-4b93-aa42-7d8cc16be998', -- subtopicoId (Legalidade)
  'Agente público impõe obrigação a particular sem base legal, alegando conveniência administrativa e interesse público genérico.',
  'À luz do princípio da legalidade, assinale a opção correta.',
  'Gabarito: Letra D. Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei. A resposta decorre de Art. 5º, II, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('b4e0148c-53ef-4189-8a9a-c6ab785b28c8', '653810ac-3bfa-48e5-9cef-72656ac0b3b6', 'A', 'A administração pode criar deveres primários ao cidadão por simples orientação verbal.', false, 'Incorreta. A administração pode criar deveres primários ao cidadão por simples orientação verbal. A assertiva contraria o fundamento constitucional aplicável ao tema Legalidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, II, da CF/88.', 0),
  ('e9565421-1bd4-44ed-be5a-5d60dad337b1', '653810ac-3bfa-48e5-9cef-72656ac0b3b6', 'B', 'O princípio da legalidade vale apenas para relações privadas, não para o poder público.', false, 'Incorreta. O princípio da legalidade vale apenas para relações privadas, não para o poder público. A assertiva contraria o fundamento constitucional aplicável ao tema Legalidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, II, da CF/88.', 1),
  ('efa4cc99-1920-404f-af69-058b4b39a711', '653810ac-3bfa-48e5-9cef-72656ac0b3b6', 'C', 'A Constituição permite obrigações sem lei quando a autoridade alegar eficiência.', false, 'Incorreta. A Constituição permite obrigações sem lei quando a autoridade alegar eficiência. A assertiva contraria o fundamento constitucional aplicável ao tema Legalidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, II, da CF/88.', 2),
  ('77cd439f-aca4-4ce8-a813-a78c9b2540a8', '653810ac-3bfa-48e5-9cef-72656ac0b3b6', 'D', 'Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei.', true, 'Correta. Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei. Fundamento: Art. 5º, II, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, II, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100114 (ID: 739bac52-f4f0-4ceb-b7cc-a85c1642beb1)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '739bac52-f4f0-4ceb-b7cc-a85c1642beb1',
  'Q100114',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  '0f7d59d0-858f-4d6f-a314-470892324d24', -- subtopicoId (Liberdade de expressão)
  'Autoridade pública proíbe previamente reportagem crítica sobre operação policial, sem decisão judicial e sem fundamento constitucional específico.',
  'Sobre liberdade de expressão, assinale a alternativa correta.',
  'Gabarito: Letra A. É livre a manifestação do pensamento, sendo vedado o anonimato, e a Constituição repudia censura prévia como regra em matéria de expressão. A resposta decorre de Art. 5º, IV e IX, e art. 220 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('bd3fc3e3-fc00-4aea-bdee-8563d7e39e1b', '739bac52-f4f0-4ceb-b7cc-a85c1642beb1', 'A', 'É livre a manifestação do pensamento, sendo vedado o anonimato, e a Constituição repudia censura prévia como regra em matéria de expressão.', true, 'Correta. É livre a manifestação do pensamento, sendo vedado o anonimato, e a Constituição repudia censura prévia como regra em matéria de expressão. Fundamento: Art. 5º, IV e IX, e art. 220 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, IV e IX, e art. 220 da CF/88.', 0),
  ('da8c0c8d-77b2-4be1-9239-62074bcc9497', '739bac52-f4f0-4ceb-b7cc-a85c1642beb1', 'B', 'A manifestação do pensamento só é lícita após autorização administrativa.', false, 'Incorreta. A manifestação do pensamento só é lícita após autorização administrativa. A assertiva contraria o fundamento constitucional aplicável ao tema Liberdade de expressão.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, IV e IX, e art. 220 da CF/88.', 1),
  ('3664f595-1945-4b2d-87fc-221e4d985135', '739bac52-f4f0-4ceb-b7cc-a85c1642beb1', 'C', 'A liberdade de expressão protege o anonimato absoluto em qualquer hipótese.', false, 'Incorreta. A liberdade de expressão protege o anonimato absoluto em qualquer hipótese. A assertiva contraria o fundamento constitucional aplicável ao tema Liberdade de expressão.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, IV e IX, e art. 220 da CF/88.', 2),
  ('e360939b-a7cc-4a12-9297-98184c1f3b2e', '739bac52-f4f0-4ceb-b7cc-a85c1642beb1', 'D', 'A crítica a agente público é sempre crime, independentemente de abuso ou excesso.', false, 'Incorreta. A crítica a agente público é sempre crime, independentemente de abuso ou excesso. A assertiva contraria o fundamento constitucional aplicável ao tema Liberdade de expressão.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, IV e IX, e art. 220 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100115 (ID: 299df9ed-9c57-4b26-bf24-20601c00e1a2)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '299df9ed-9c57-4b26-bf24-20601c00e1a2',
  'Q100115',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  '3ff8b85d-b8e8-48c2-a3a9-89ca0a90583e', -- subtopicoId (Liberdade religiosa)
  'Durante concurso público, candidato solicita tratamento compatível com sua crença religiosa, sem prejuízo da igualdade entre candidatos e conforme previsão legal.',
  'No caso apresentado, assinale a alternativa compatível com a proteção constitucional da liberdade religiosa.',
  'Gabarito: Letra B. A liberdade de consciência e de crença é inviolável, sendo assegurado o livre exercício dos cultos religiosos e protegidos, na forma da lei, os locais de culto e suas liturgias. A resposta decorre de Art. 5º, VI e VIII, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('1c94f04c-6da1-406b-8d54-9e3d4bc0a976', '299df9ed-9c57-4b26-bf24-20601c00e1a2', 'A', 'A Constituição adota religião oficial e permite discriminação de crenças minoritárias.', false, 'Incorreta. A Constituição adota religião oficial e permite discriminação de crenças minoritárias. A assertiva contraria o fundamento constitucional aplicável ao tema Liberdade religiosa.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, VI e VIII, da CF/88.', 0),
  ('3f78b695-0c12-4485-9c72-0474a4bdebac', '299df9ed-9c57-4b26-bf24-20601c00e1a2', 'B', 'A liberdade de consciência e de crença é inviolável, sendo assegurado o livre exercício dos cultos religiosos e protegidos, na forma da lei, os locais de culto e suas liturgias.', true, 'Correta. A liberdade de consciência e de crença é inviolável, sendo assegurado o livre exercício dos cultos religiosos e protegidos, na forma da lei, os locais de culto e suas liturgias. Fundamento: Art. 5º, VI e VIII, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, VI e VIII, da CF/88.', 1),
  ('190d8249-c56a-4cdd-b9ac-88d327d720b0', '299df9ed-9c57-4b26-bf24-20601c00e1a2', 'C', 'A liberdade religiosa não alcança o exercício de culto, apenas convicção íntima.', false, 'Incorreta. A liberdade religiosa não alcança o exercício de culto, apenas convicção íntima. A assertiva contraria o fundamento constitucional aplicável ao tema Liberdade religiosa.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, VI e VIII, da CF/88.', 2),
  ('320a8785-61f2-4679-8d29-c27b9b5349e5', '299df9ed-9c57-4b26-bf24-20601c00e1a2', 'D', 'A proteção constitucional dispensa qualquer compatibilização com a ordem pública e direitos de terceiros.', false, 'Incorreta. A proteção constitucional dispensa qualquer compatibilização com a ordem pública e direitos de terceiros. A assertiva contraria o fundamento constitucional aplicável ao tema Liberdade religiosa.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, VI e VIII, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100116 (ID: 0080c7b6-9059-4102-8c16-0e6f3e186e44)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '0080c7b6-9059-4102-8c16-0e6f3e186e44',
  'Q100116',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  'f1a7c86b-19ab-465c-8305-8b787cdedf29', -- subtopicoId (Princípio da igualdade)
  'Edital de concurso cria restrição discriminatória sem pertinência com as atribuições do cargo policial.',
  'Sobre o princípio da igualdade, assinale a opção correta.',
  'Gabarito: Letra C. Todos são iguais perante a lei, sem distinção de qualquer natureza, admitidas diferenciações proporcionais e justificadas pela natureza das atribuições quando constitucionalmente legítimas. A resposta decorre de Art. 5º, caput, da CF/88 e jurisprudência constitucional.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('1afae589-c099-47b3-9f67-b5b93eb11fd1', '0080c7b6-9059-4102-8c16-0e6f3e186e44', 'A', 'A igualdade proíbe qualquer requisito físico ou etário em concursos, ainda que previsto em lei e compatível com o cargo.', false, 'Incorreta. A igualdade proíbe qualquer requisito físico ou etário em concursos, ainda que previsto em lei e compatível com o cargo. A assertiva contraria o fundamento constitucional aplicável ao tema Princípio da igualdade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, caput, da CF/88 e jurisprudência constitucional.', 0),
  ('b50947f0-8725-4c59-bbfd-9251c9c9a0b2', '0080c7b6-9059-4102-8c16-0e6f3e186e44', 'B', 'A igualdade autoriza discriminação arbitrária se prevista em edital.', false, 'Incorreta. A igualdade autoriza discriminação arbitrária se prevista em edital. A assertiva contraria o fundamento constitucional aplicável ao tema Princípio da igualdade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, caput, da CF/88 e jurisprudência constitucional.', 1),
  ('eab51542-a7e1-411e-99fa-4779c9069e82', '0080c7b6-9059-4102-8c16-0e6f3e186e44', 'C', 'Todos são iguais perante a lei, sem distinção de qualquer natureza, admitidas diferenciações proporcionais e justificadas pela natureza das atribuições quando constitucionalmente legítimas.', true, 'Correta. Todos são iguais perante a lei, sem distinção de qualquer natureza, admitidas diferenciações proporcionais e justificadas pela natureza das atribuições quando constitucionalmente legítimas. Fundamento: Art. 5º, caput, da CF/88 e jurisprudência constitucional.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, caput, da CF/88 e jurisprudência constitucional.', 2),
  ('0a38fdb9-6473-4342-9959-5bf75d4c29b5', '0080c7b6-9059-4102-8c16-0e6f3e186e44', 'D', 'A Constituição restringe a igualdade apenas a brasileiros natos.', false, 'Incorreta. A Constituição restringe a igualdade apenas a brasileiros natos. A assertiva contraria o fundamento constitucional aplicável ao tema Princípio da igualdade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, caput, da CF/88 e jurisprudência constitucional.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100117 (ID: 588f676b-312e-4721-a8cd-d743cdb17792)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '588f676b-312e-4721-a8cd-d743cdb17792',
  'Q100117',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '49c896a5-8041-4224-bed0-15c3f3120847', -- topicoId (Direitos Individuais e Coletivos)
  'a7ca1645-795b-49f5-913d-d5cf7ad2e9fb', -- subtopicoId (Sigilo de correspondência)
  'Investigador acessa mensagens privadas de terceiro sem ordem judicial e fora das hipóteses legais, usando apenas curiosidade funcional.',
  'À luz da inviolabilidade das comunicações, assinale a alternativa correta.',
  'Gabarito: Letra D. São invioláveis a intimidade, a vida privada e o sigilo da correspondência e das comunicações, ressalvadas as hipóteses constitucionais e legais, especialmente ordem judicial para interceptação telefônica nas condições da lei. A resposta decorre de Art. 5º, X e XII, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('27a9acb6-644d-4545-a9f6-1f69b3d53190', '588f676b-312e-4721-a8cd-d743cdb17792', 'A', 'O sigilo de correspondência pode ser afastado por qualquer servidor público por interesse investigativo genérico.', false, 'Incorreta. O sigilo de correspondência pode ser afastado por qualquer servidor público por interesse investigativo genérico. A assertiva contraria o fundamento constitucional aplicável ao tema Sigilo de correspondência.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, X e XII, da CF/88.', 0),
  ('9d7eaaf7-3440-45bf-999a-26a7fc9b7504', '588f676b-312e-4721-a8cd-d743cdb17792', 'B', 'A Constituição não protege comunicações de investigados.', false, 'Incorreta. A Constituição não protege comunicações de investigados. A assertiva contraria o fundamento constitucional aplicável ao tema Sigilo de correspondência.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, X e XII, da CF/88.', 1),
  ('23254859-e4a0-423c-9af0-85facbda7fd7', '588f676b-312e-4721-a8cd-d743cdb17792', 'C', 'A interceptação telefônica independe de ordem judicial quando o crime for grave.', false, 'Incorreta. A interceptação telefônica independe de ordem judicial quando o crime for grave. A assertiva contraria o fundamento constitucional aplicável ao tema Sigilo de correspondência.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, X e XII, da CF/88.', 2),
  ('2fc294ee-c327-4757-bbb2-80007a82cc16', '588f676b-312e-4721-a8cd-d743cdb17792', 'D', 'São invioláveis a intimidade, a vida privada e o sigilo da correspondência e das comunicações, ressalvadas as hipóteses constitucionais e legais, especialmente ordem judicial para interceptação telefônica nas condições da lei.', true, 'Correta. São invioláveis a intimidade, a vida privada e o sigilo da correspondência e das comunicações, ressalvadas as hipóteses constitucionais e legais, especialmente ordem judicial para interceptação telefônica nas condições da lei. Fundamento: Art. 5º, X e XII, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, X e XII, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100118 (ID: 18535d13-d2ef-4e0c-9210-5c8a24b27b45)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '18535d13-d2ef-4e0c-9210-5c8a24b27b45',
  'Q100118',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  'fca6b50e-b0aa-43d5-be03-1c4573eddc4d', -- topicoId (Direitos Políticos)
  '8e762375-f648-4100-970e-c07f287f0c9e', -- subtopicoId (Elegibilidade)
  'Candidato a cargo eletivo pretende concorrer sem preencher requisito constitucional de elegibilidade.',
  'Assinale a alternativa correta sobre condições de elegibilidade.',
  'Gabarito: Letra A. São condições de elegibilidade, na forma da lei, a nacionalidade brasileira, o pleno exercício dos direitos políticos, o alistamento eleitoral, o domicílio eleitoral na circunscrição, a filiação partidária e a idade mínima constitucional. A resposta decorre de Art. 14, § 3º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('8c8f734d-cb9f-4ca3-b630-5cd6e45f313a', '18535d13-d2ef-4e0c-9210-5c8a24b27b45', 'A', 'São condições de elegibilidade, na forma da lei, a nacionalidade brasileira, o pleno exercício dos direitos políticos, o alistamento eleitoral, o domicílio eleitoral na circunscrição, a filiação partidária e a idade mínima constitucional.', true, 'Correta. São condições de elegibilidade, na forma da lei, a nacionalidade brasileira, o pleno exercício dos direitos políticos, o alistamento eleitoral, o domicílio eleitoral na circunscrição, a filiação partidária e a idade mínima constitucional. Fundamento: Art. 14, § 3º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 3º, da CF/88.', 0),
  ('61ec6420-56e3-445d-9e39-6d4701a7e501', '18535d13-d2ef-4e0c-9210-5c8a24b27b45', 'B', 'A Constituição exige apenas alfabetização para qualquer cargo eletivo.', false, 'Incorreta. A Constituição exige apenas alfabetização para qualquer cargo eletivo. A assertiva contraria o fundamento constitucional aplicável ao tema Elegibilidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 3º, da CF/88.', 1),
  ('bb495dfd-d403-46c0-a396-0e147d15b9da', '18535d13-d2ef-4e0c-9210-5c8a24b27b45', 'C', 'Estrangeiro não naturalizado pode concorrer a qualquer cargo político no Brasil.', false, 'Incorreta. Estrangeiro não naturalizado pode concorrer a qualquer cargo político no Brasil. A assertiva contraria o fundamento constitucional aplicável ao tema Elegibilidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 3º, da CF/88.', 2),
  ('6401bee8-9b76-4ef1-af44-f589cdb520a9', '18535d13-d2ef-4e0c-9210-5c8a24b27b45', 'D', 'A filiação partidária é irrelevante para todos os cargos eletivos.', false, 'Incorreta. A filiação partidária é irrelevante para todos os cargos eletivos. A assertiva contraria o fundamento constitucional aplicável ao tema Elegibilidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 3º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100119 (ID: 9d4422ec-87c2-450e-b156-db85a34e57ef)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '9d4422ec-87c2-450e-b156-db85a34e57ef',
  'Q100119',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  'fca6b50e-b0aa-43d5-be03-1c4573eddc4d', -- topicoId (Direitos Políticos)
  '75d34e2b-10fc-444f-af39-be5a2a1fa37d', -- subtopicoId (Inelegibilidade)
  'Governador no segundo mandato consecutivo pretende disputar novamente o mesmo cargo no período subsequente.',
  'Com base nas regras constitucionais de inelegibilidade, assinale a opção correta.',
  'Gabarito: Letra B. O Presidente da República, governadores, prefeitos e quem os houver sucedido ou substituído no curso dos mandatos podem ser reeleitos para um único período subsequente. A resposta decorre de Art. 14, § 5º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('fed096f2-31da-40ad-9fbd-a23a1080ea84', '9d4422ec-87c2-450e-b156-db85a34e57ef', 'A', 'A Constituição permite reeleições ilimitadas para chefes do Executivo.', false, 'Incorreta. A Constituição permite reeleições ilimitadas para chefes do Executivo. A assertiva contraria o fundamento constitucional aplicável ao tema Inelegibilidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 5º, da CF/88.', 0),
  ('70f95b24-9849-4abf-93bf-8db9c08f9e6f', '9d4422ec-87c2-450e-b156-db85a34e57ef', 'B', 'O Presidente da República, governadores, prefeitos e quem os houver sucedido ou substituído no curso dos mandatos podem ser reeleitos para um único período subsequente.', true, 'Correta. O Presidente da República, governadores, prefeitos e quem os houver sucedido ou substituído no curso dos mandatos podem ser reeleitos para um único período subsequente. Fundamento: Art. 14, § 5º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 5º, da CF/88.', 1),
  ('200997a3-a8e6-4062-a695-344100d5d1da', '9d4422ec-87c2-450e-b156-db85a34e57ef', 'C', 'A inelegibilidade só pode decorrer de condenação criminal transitada em julgado.', false, 'Incorreta. A inelegibilidade só pode decorrer de condenação criminal transitada em julgado. A assertiva contraria o fundamento constitucional aplicável ao tema Inelegibilidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 5º, da CF/88.', 2),
  ('ea35d7dc-6a21-4ea8-acaa-319d121f7a85', '9d4422ec-87c2-450e-b156-db85a34e57ef', 'D', 'Vice que substitui o titular nunca se submete a regras de reeleição.', false, 'Incorreta. Vice que substitui o titular nunca se submete a regras de reeleição. A assertiva contraria o fundamento constitucional aplicável ao tema Inelegibilidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 5º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100120 (ID: 51033496-cfc9-4491-9bf4-9e2c3c557e56)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '51033496-cfc9-4491-9bf4-9e2c3c557e56',
  'Q100120',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  'fca6b50e-b0aa-43d5-be03-1c4573eddc4d', -- topicoId (Direitos Políticos)
  '4ba9f5db-246d-4ee7-9690-233e179a6366', -- subtopicoId (Sufrágio)
  'Em debate sobre direitos políticos, afirma-se que o sufrágio brasileiro é censitário e público.',
  'Segundo a Constituição, assinale a alternativa correta.',
  'Gabarito: Letra C. A soberania popular será exercida pelo sufrágio universal e pelo voto direto e secreto, com valor igual para todos, nos termos constitucionais. A resposta decorre de Art. 14, caput, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('5863ccb7-eb13-4f4c-889b-b0ef59d2184c', '51033496-cfc9-4491-9bf4-9e2c3c557e56', 'A', 'O sufrágio brasileiro depende de comprovação de renda.', false, 'Incorreta. O sufrágio brasileiro depende de comprovação de renda. A assertiva contraria o fundamento constitucional aplicável ao tema Sufrágio.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, caput, da CF/88.', 0),
  ('b0f59e19-1628-4687-bd7c-0a5faa222360', '51033496-cfc9-4491-9bf4-9e2c3c557e56', 'B', 'O voto é público para permitir fiscalização partidária direta.', false, 'Incorreta. O voto é público para permitir fiscalização partidária direta. A assertiva contraria o fundamento constitucional aplicável ao tema Sufrágio.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, caput, da CF/88.', 1),
  ('c21e442c-1f78-4d53-8195-5cc732ae5219', '51033496-cfc9-4491-9bf4-9e2c3c557e56', 'C', 'A soberania popular será exercida pelo sufrágio universal e pelo voto direto e secreto, com valor igual para todos, nos termos constitucionais.', true, 'Correta. A soberania popular será exercida pelo sufrágio universal e pelo voto direto e secreto, com valor igual para todos, nos termos constitucionais. Fundamento: Art. 14, caput, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, caput, da CF/88.', 2),
  ('8e1ed964-d649-4774-b869-ba91bc8fa528', '51033496-cfc9-4491-9bf4-9e2c3c557e56', 'D', 'A Constituição não prevê plebiscito, referendo ou iniciativa popular.', false, 'Incorreta. A Constituição não prevê plebiscito, referendo ou iniciativa popular. A assertiva contraria o fundamento constitucional aplicável ao tema Sufrágio.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, caput, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100121 (ID: 7e3df623-273b-429b-956b-4bdae2c00cab)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '7e3df623-273b-429b-956b-4bdae2c00cab',
  'Q100121',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  'fca6b50e-b0aa-43d5-be03-1c4573eddc4d', -- topicoId (Direitos Políticos)
  'f4e1186e-28f6-4fa4-9f89-104357e6ff2e', -- subtopicoId (Voto)
  'Cidadão de setenta e um anos pergunta se é obrigado a votar nas eleições gerais.',
  'Considerando a idade do eleitor e a disciplina constitucional do voto facultativo, assinale a alternativa correta.',
  'Gabarito: Letra D. O alistamento eleitoral e o voto são facultativos para os maiores de setenta anos. A resposta decorre de Art. 14, § 1º, II, b, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('a3e741e9-2dcb-4d43-bff6-ca51ab022623', '7e3df623-273b-429b-956b-4bdae2c00cab', 'A', 'O voto é obrigatório para maiores de setenta anos e facultativo apenas para analfabetos.', false, 'Incorreta. O voto é obrigatório para maiores de setenta anos e facultativo apenas para analfabetos. A assertiva contraria o fundamento constitucional aplicável ao tema Voto.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 1º, II, b, da CF/88.', 0),
  ('18346cd2-2514-404a-9334-110b227ac97c', '7e3df623-273b-429b-956b-4bdae2c00cab', 'B', 'O alistamento é vedado aos maiores de setenta anos.', false, 'Incorreta. O alistamento é vedado aos maiores de setenta anos. A assertiva contraria o fundamento constitucional aplicável ao tema Voto.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 1º, II, b, da CF/88.', 1),
  ('58be5309-955f-4ae7-a892-c4994927c0dc', '7e3df623-273b-429b-956b-4bdae2c00cab', 'C', 'O voto facultativo alcança todos os maiores de dezesseis anos, sem distinção etária posterior.', false, 'Incorreta. O voto facultativo alcança todos os maiores de dezesseis anos, sem distinção etária posterior. A assertiva contraria o fundamento constitucional aplicável ao tema Voto.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 1º, II, b, da CF/88.', 2),
  ('b317c53a-2bc1-4c51-9176-bc65e015f706', '7e3df623-273b-429b-956b-4bdae2c00cab', 'D', 'O alistamento eleitoral e o voto são facultativos para os maiores de setenta anos.', true, 'Correta. O alistamento eleitoral e o voto são facultativos para os maiores de setenta anos. Fundamento: Art. 14, § 1º, II, b, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 14, § 1º, II, b, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100122 (ID: f32cba72-d76a-4f0b-8765-48c3297a0574)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'f32cba72-d76a-4f0b-8765-48c3297a0574',
  'Q100122',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '243b55b6-a17c-4b6e-b8e0-ffc661b6e913', -- topicoId (Direitos Sociais)
  '05191312-4576-4be0-96cc-9377afd18a60', -- subtopicoId (Direito à educação)
  'Estado deixa de oferecer ensino obrigatório a criança em idade escolar, alegando discricionariedade orçamentária absoluta.',
  'Sobre o direito à educação, assinale a opção correta.',
  'Gabarito: Letra A. A educação é direito de todos e dever do Estado e da família, promovida e incentivada com a colaboração da sociedade. A resposta decorre de Art. 205 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('4da781c0-cbfd-4320-8dd1-4aff0feae0d8', 'f32cba72-d76a-4f0b-8765-48c3297a0574', 'A', 'A educação é direito de todos e dever do Estado e da família, promovida e incentivada com a colaboração da sociedade.', true, 'Correta. A educação é direito de todos e dever do Estado e da família, promovida e incentivada com a colaboração da sociedade. Fundamento: Art. 205 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 205 da CF/88.', 0),
  ('967dd11d-8a85-4f6f-9eaf-9dbfee8eef2c', 'f32cba72-d76a-4f0b-8765-48c3297a0574', 'B', 'A educação pública obrigatória é mera liberalidade administrativa sem proteção constitucional.', false, 'Incorreta. A educação pública obrigatória é mera liberalidade administrativa sem proteção constitucional. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à educação.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 205 da CF/88.', 1),
  ('faa2671e-cd3d-4415-ad12-6af160ebf12b', 'f32cba72-d76a-4f0b-8765-48c3297a0574', 'C', 'A Constituição atribui o dever de educação exclusivamente à iniciativa privada.', false, 'Incorreta. A Constituição atribui o dever de educação exclusivamente à iniciativa privada. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à educação.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 205 da CF/88.', 2),
  ('d4ad0543-9bc0-4e00-990e-5b78bcbcc85b', 'f32cba72-d76a-4f0b-8765-48c3297a0574', 'D', 'O direito à educação não se relaciona ao desenvolvimento da pessoa e preparo para cidadania.', false, 'Incorreta. O direito à educação não se relaciona ao desenvolvimento da pessoa e preparo para cidadania. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à educação.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 205 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100123 (ID: 3c943d14-2367-4331-ae92-a8ae2a185387)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '3c943d14-2367-4331-ae92-a8ae2a185387',
  'Q100123',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '243b55b6-a17c-4b6e-b8e0-ffc661b6e913', -- topicoId (Direitos Sociais)
  'c01a680e-1940-46f5-a6b8-bdc38e6e726b', -- subtopicoId (Direito à saúde)
  'Pessoa custodiada pelo Estado necessita atendimento médico urgente, e a administração penitenciária nega assistência por ausência de previsão editalícia.',
  'À luz da Constituição, assinale a alternativa correta.',
  'Gabarito: Letra B. A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas destinadas à redução do risco de doença e ao acesso universal e igualitário às ações e serviços. A resposta decorre de Art. 196 da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('02f368c7-cb93-4f28-809a-4b391300a74e', '3c943d14-2367-4331-ae92-a8ae2a185387', 'A', 'A saúde de preso depende exclusivamente de custeio familiar.', false, 'Incorreta. A saúde de preso depende exclusivamente de custeio familiar. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à saúde.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 196 da CF/88.', 0),
  ('f62ce909-f1bf-4646-818a-f6c88a09d279', '3c943d14-2367-4331-ae92-a8ae2a185387', 'B', 'A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas destinadas à redução do risco de doença e ao acesso universal e igualitário às ações e serviços.', true, 'Correta. A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas destinadas à redução do risco de doença e ao acesso universal e igualitário às ações e serviços. Fundamento: Art. 196 da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 196 da CF/88.', 1),
  ('091ff140-0806-4472-9ae1-bee8ec2214f4', '3c943d14-2367-4331-ae92-a8ae2a185387', 'C', 'A Constituição trata a saúde como serviço privado sem dever estatal.', false, 'Incorreta. A Constituição trata a saúde como serviço privado sem dever estatal. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à saúde.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 196 da CF/88.', 2),
  ('a56b95c3-603b-4abc-b5b4-209f8b027322', '3c943d14-2367-4331-ae92-a8ae2a185387', 'D', 'O acesso universal à saúde exclui pessoas submetidas à custódia estatal.', false, 'Incorreta. O acesso universal à saúde exclui pessoas submetidas à custódia estatal. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à saúde.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 196 da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100124 (ID: f9701080-dcba-4f67-8440-ccfdbb2d37fd)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'f9701080-dcba-4f67-8440-ccfdbb2d37fd',
  'Q100124',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '243b55b6-a17c-4b6e-b8e0-ffc661b6e913', -- topicoId (Direitos Sociais)
  'a419801b-00ea-4fe9-ad67-d7f3ce6d20cf', -- subtopicoId (Direito à segurança)
  'Moradores cobram atuação estatal diante de onda de crimes, e a autoridade afirma que segurança não é direito social.',
  'Considerando o art. 6º da Constituição, assinale a opção correta.',
  'Gabarito: Letra C. A segurança está prevista como direito social, ao lado de outros direitos como educação, saúde, trabalho, moradia e assistência aos desamparados. A resposta decorre de Art. 6º da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('747a34be-d4a8-4663-9a6d-b1ca4cc6e3d1', 'f9701080-dcba-4f67-8440-ccfdbb2d37fd', 'A', 'A segurança aparece apenas como dever individual, sem dimensão social.', false, 'Incorreta. A segurança aparece apenas como dever individual, sem dimensão social. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à segurança.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 6º da CF/88.', 0),
  ('21110de9-8213-4ee4-945c-027831ab0193', 'f9701080-dcba-4f67-8440-ccfdbb2d37fd', 'B', 'O art. 6º da Constituição foi revogado quanto à segurança.', false, 'Incorreta. O art. 6º da Constituição foi revogado quanto à segurança. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à segurança.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 6º da CF/88.', 1),
  ('de944352-94e3-445d-9659-56255982e3d9', 'f9701080-dcba-4f67-8440-ccfdbb2d37fd', 'C', 'A segurança está prevista como direito social, ao lado de outros direitos como educação, saúde, trabalho, moradia e assistência aos desamparados.', true, 'Correta. A segurança está prevista como direito social, ao lado de outros direitos como educação, saúde, trabalho, moradia e assistência aos desamparados. Fundamento: Art. 6º da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 6º da CF/88.', 2),
  ('41606b1d-e8da-440a-8b15-1f3637df6adb', 'f9701080-dcba-4f67-8440-ccfdbb2d37fd', 'D', 'Segurança pública e segurança como direito social são categorias incompatíveis.', false, 'Incorreta. Segurança pública e segurança como direito social são categorias incompatíveis. A assertiva contraria o fundamento constitucional aplicável ao tema Direito à segurança.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 6º da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100125 (ID: 235db3d6-fc99-4f2e-8c2b-974a2c80daeb)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '235db3d6-fc99-4f2e-8c2b-974a2c80daeb',
  'Q100125',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '243b55b6-a17c-4b6e-b8e0-ffc661b6e913', -- topicoId (Direitos Sociais)
  '87028eb0-715c-4760-9ae1-3024cc1e3ab3', -- subtopicoId (Direitos trabalhistas)
  'Servidor celetista em atividade urbana questiona a supressão integral de férias anuais remuneradas.',
  'Sobre direitos dos trabalhadores previstos na Constituição, assinale a alternativa correta.',
  'Gabarito: Letra D. São direitos dos trabalhadores, entre outros, férias anuais remuneradas com, pelo menos, um terço a mais do que o salário normal. A resposta decorre de Art. 7º, XVII, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('f576ab1a-0709-4f74-9873-f85a2aa4667d', '235db3d6-fc99-4f2e-8c2b-974a2c80daeb', 'A', 'Férias anuais remuneradas não possuem previsão constitucional.', false, 'Incorreta. Férias anuais remuneradas não possuem previsão constitucional. A assertiva contraria o fundamento constitucional aplicável ao tema Direitos trabalhistas.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 7º, XVII, da CF/88.', 0),
  ('3d6c7c51-360f-44dd-adea-f77dd540ed1e', '235db3d6-fc99-4f2e-8c2b-974a2c80daeb', 'B', 'O adicional constitucional de férias é facultativo e depende exclusivamente de acordo verbal.', false, 'Incorreta. O adicional constitucional de férias é facultativo e depende exclusivamente de acordo verbal. A assertiva contraria o fundamento constitucional aplicável ao tema Direitos trabalhistas.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 7º, XVII, da CF/88.', 1),
  ('2d245552-6f0f-4f71-a3ea-336cf35c2c4f', '235db3d6-fc99-4f2e-8c2b-974a2c80daeb', 'C', 'A Constituição assegura férias apenas a servidores militares.', false, 'Incorreta. A Constituição assegura férias apenas a servidores militares. A assertiva contraria o fundamento constitucional aplicável ao tema Direitos trabalhistas.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 7º, XVII, da CF/88.', 2),
  ('551c7921-1bf9-4680-afec-eca4db54acb6', '235db3d6-fc99-4f2e-8c2b-974a2c80daeb', 'D', 'São direitos dos trabalhadores, entre outros, férias anuais remuneradas com, pelo menos, um terço a mais do que o salário normal.', true, 'Correta. São direitos dos trabalhadores, entre outros, férias anuais remuneradas com, pelo menos, um terço a mais do que o salário normal. Fundamento: Art. 7º, XVII, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 7º, XVII, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100126 (ID: 447e7b1e-1599-46c5-9a8a-6b47466fdd67)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '447e7b1e-1599-46c5-9a8a-6b47466fdd67',
  'Q100126',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  'ff550113-b52e-4933-b8ec-ea22a45b6a1a', -- topicoId (Nacionalidade)
  '73bb102b-6dd1-49e5-aa32-460260cd47b1', -- subtopicoId (Brasileiro nato)
  'Filho de brasileiros nasce no exterior enquanto um dos pais está a serviço da República Federativa do Brasil.',
  'Assinale a alternativa correta sobre nacionalidade originária.',
  'Gabarito: Letra A. São brasileiros natos os nascidos no estrangeiro, de pai brasileiro ou mãe brasileira, desde que qualquer deles esteja a serviço da República Federativa do Brasil. A resposta decorre de Art. 12, I, b, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('3bb3320e-a574-4964-8db1-ead2df690c11', '447e7b1e-1599-46c5-9a8a-6b47466fdd67', 'A', 'São brasileiros natos os nascidos no estrangeiro, de pai brasileiro ou mãe brasileira, desde que qualquer deles esteja a serviço da República Federativa do Brasil.', true, 'Correta. São brasileiros natos os nascidos no estrangeiro, de pai brasileiro ou mãe brasileira, desde que qualquer deles esteja a serviço da República Federativa do Brasil. Fundamento: Art. 12, I, b, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, I, b, da CF/88.', 0),
  ('ae4c7fea-49e1-4de5-a40d-b859c65c1a57', '447e7b1e-1599-46c5-9a8a-6b47466fdd67', 'B', 'Nessa hipótese, a Constituição exige naturalização ordinária após a maioridade.', false, 'Incorreta. Nessa hipótese, a Constituição exige naturalização ordinária após a maioridade. A assertiva contraria o fundamento constitucional aplicável ao tema Brasileiro nato.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, I, b, da CF/88.', 1),
  ('0d645db6-1929-4e11-bf07-23ac001b586a', '447e7b1e-1599-46c5-9a8a-6b47466fdd67', 'C', 'Filho de brasileiro nascido no exterior nunca pode ser brasileiro nato.', false, 'Incorreta. Filho de brasileiro nascido no exterior nunca pode ser brasileiro nato. A assertiva contraria o fundamento constitucional aplicável ao tema Brasileiro nato.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, I, b, da CF/88.', 2),
  ('5096a3b1-c25c-4b91-b7bd-97eb40698db6', '447e7b1e-1599-46c5-9a8a-6b47466fdd67', 'D', 'A nacionalidade brasileira depende sempre do local físico do parto no território nacional.', false, 'Incorreta. A nacionalidade brasileira depende sempre do local físico do parto no território nacional. A assertiva contraria o fundamento constitucional aplicável ao tema Brasileiro nato.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, I, b, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100127 (ID: 907e5182-5b04-4009-b425-57183d7b3cfa)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '907e5182-5b04-4009-b425-57183d7b3cfa',
  'Q100127',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  'ff550113-b52e-4933-b8ec-ea22a45b6a1a', -- topicoId (Nacionalidade)
  '170fa44e-4fad-4c7f-8d17-81910f7c0f72', -- subtopicoId (Brasileiro naturalizado)
  'Estrangeiro residente no Brasil pretende adquirir nacionalidade brasileira, observadas as condições constitucionais e legais.',
  'Sobre brasileiro naturalizado, assinale a opção correta.',
  'Gabarito: Letra B. A Constituição prevê hipóteses de naturalização, incluindo a ordinária na forma da lei e a extraordinária para estrangeiros residentes no País há mais de quinze anos ininterruptos e sem condenação penal, desde que requeiram a nacionalidade brasileira. A resposta decorre de Art. 12, II, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('7177f15c-cefb-4c40-86f2-0853b0698779', '907e5182-5b04-4009-b425-57183d7b3cfa', 'A', 'Naturalização transforma automaticamente o naturalizado em brasileiro nato.', false, 'Incorreta. Naturalização transforma automaticamente o naturalizado em brasileiro nato. A assertiva contraria o fundamento constitucional aplicável ao tema Brasileiro naturalizado.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, II, da CF/88.', 0),
  ('51a2dc3a-7482-44b7-a8cf-0b13c77cd805', '907e5182-5b04-4009-b425-57183d7b3cfa', 'B', 'A Constituição prevê hipóteses de naturalização, incluindo a ordinária na forma da lei e a extraordinária para estrangeiros residentes no País há mais de quinze anos ininterruptos e sem condenação penal, desde que requeiram a nacionalidade brasileira.', true, 'Correta. A Constituição prevê hipóteses de naturalização, incluindo a ordinária na forma da lei e a extraordinária para estrangeiros residentes no País há mais de quinze anos ininterruptos e sem condenação penal, desde que requeiram a nacionalidade brasileira. Fundamento: Art. 12, II, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, II, da CF/88.', 1),
  ('8105388a-7621-45ef-8fd8-b894acd669c4', '907e5182-5b04-4009-b425-57183d7b3cfa', 'C', 'Brasileiro naturalizado pode ocupar todos os cargos privativos de brasileiro nato.', false, 'Incorreta. Brasileiro naturalizado pode ocupar todos os cargos privativos de brasileiro nato. A assertiva contraria o fundamento constitucional aplicável ao tema Brasileiro naturalizado.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, II, da CF/88.', 2),
  ('70d2e45e-d66a-4d13-828b-db41007c19fa', '907e5182-5b04-4009-b425-57183d7b3cfa', 'D', 'A Constituição não admite naturalização de estrangeiros.', false, 'Incorreta. A Constituição não admite naturalização de estrangeiros. A assertiva contraria o fundamento constitucional aplicável ao tema Brasileiro naturalizado.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, II, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100128 (ID: e9d2975c-7e50-4ebe-966d-260242fc9c5d)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  'e9d2975c-7e50-4ebe-966d-260242fc9c5d',
  'Q100128',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  'ff550113-b52e-4933-b8ec-ea22a45b6a1a', -- topicoId (Nacionalidade)
  'a9748013-3879-4e0e-865a-4ae66250f087', -- subtopicoId (Perda da nacionalidade)
  'Brasileiro naturalizado tem cancelada a naturalização por sentença judicial em razão de fraude no processo de naturalização.',
  'Considerando a perda da nacionalidade brasileira após cancelamento judicial da naturalização, assinale a alternativa correta.',
  'Gabarito: Letra C. A Constituição admite perda da nacionalidade nas hipóteses nela previstas, como cancelamento da naturalização por sentença judicial em virtude de fraude relacionada ao processo de naturalização ou atentado contra a ordem constitucional e o Estado Democrático. A resposta decorre de Art. 12, § 4º, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('9171d7a8-be4b-4700-bc41-43fefdfdcf66', 'e9d2975c-7e50-4ebe-966d-260242fc9c5d', 'A', 'A nacionalidade brasileira jamais pode ser perdida por brasileiro naturalizado.', false, 'Incorreta. A nacionalidade brasileira jamais pode ser perdida por brasileiro naturalizado. A assertiva contraria o fundamento constitucional aplicável ao tema Perda da nacionalidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, § 4º, da CF/88.', 0),
  ('b0bea2eb-bfea-498b-8732-7102c7c47056', 'e9d2975c-7e50-4ebe-966d-260242fc9c5d', 'B', 'A perda da nacionalidade é decretada por portaria policial sem controle judicial.', false, 'Incorreta. A perda da nacionalidade é decretada por portaria policial sem controle judicial. A assertiva contraria o fundamento constitucional aplicável ao tema Perda da nacionalidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, § 4º, da CF/88.', 1),
  ('9ec49758-abe8-472e-b905-1d09f9f80c56', 'e9d2975c-7e50-4ebe-966d-260242fc9c5d', 'C', 'A Constituição admite perda da nacionalidade nas hipóteses nela previstas, como cancelamento da naturalização por sentença judicial em virtude de fraude relacionada ao processo de naturalização ou atentado contra a ordem constitucional e o Estado Democrático.', true, 'Correta. A Constituição admite perda da nacionalidade nas hipóteses nela previstas, como cancelamento da naturalização por sentença judicial em virtude de fraude relacionada ao processo de naturalização ou atentado contra a ordem constitucional e o Estado Democrático. Fundamento: Art. 12, § 4º, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, § 4º, da CF/88.', 2),
  ('a8491a71-6dc3-4729-a6a3-a8b0365c9bed', 'e9d2975c-7e50-4ebe-966d-260242fc9c5d', 'D', 'A perda da nacionalidade implica automaticamente pena criminal de banimento.', false, 'Incorreta. A perda da nacionalidade implica automaticamente pena criminal de banimento. A assertiva contraria o fundamento constitucional aplicável ao tema Perda da nacionalidade.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 12, § 4º, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100129 (ID: 2945bbb2-9431-4ed8-bf7b-dfe7a8997dcb)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '2945bbb2-9431-4ed8-bf7b-dfe7a8997dcb',
  'Q100129',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '9f6fef17-c827-4338-8406-3b5b6e64b708', -- topicoId (Remédios Constitucionais)
  '74e8f7e0-7ca0-4681-972b-b963950c3fd9', -- subtopicoId (Ação popular)
  'Cidadão pretende anular ato lesivo ao patrimônio público municipal e à moralidade administrativa.',
  'Sobre a ação popular, assinale a alternativa correta.',
  'Gabarito: Letra D. Qualquer cidadão é parte legítima para propor ação popular que vise anular ato lesivo ao patrimônio público, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural. A resposta decorre de Art. 5º, LXXIII, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('f23356e7-1983-4000-a686-a6c5703fc0b9', '2945bbb2-9431-4ed8-bf7b-dfe7a8997dcb', 'A', 'A ação popular é privativa do Ministério Público.', false, 'Incorreta. A ação popular é privativa do Ministério Público. A assertiva contraria o fundamento constitucional aplicável ao tema Ação popular.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXXIII, da CF/88.', 0),
  ('233d081a-1d55-4489-9fec-870aa1ac9797', '2945bbb2-9431-4ed8-bf7b-dfe7a8997dcb', 'B', 'A ação popular só protege direito líquido e certo individual do impetrante.', false, 'Incorreta. A ação popular só protege direito líquido e certo individual do impetrante. A assertiva contraria o fundamento constitucional aplicável ao tema Ação popular.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXXIII, da CF/88.', 1),
  ('d637d638-6449-4f2a-802a-0e86a029f29b', '2945bbb2-9431-4ed8-bf7b-dfe7a8997dcb', 'C', 'A ação popular exige, como regra constitucional, pagamento prévio de custas pelo cidadão autor.', false, 'Incorreta. A ação popular exige, como regra constitucional, pagamento prévio de custas pelo cidadão autor. A assertiva contraria o fundamento constitucional aplicável ao tema Ação popular.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXXIII, da CF/88.', 2),
  ('18520dba-7859-42b7-bb50-4db3407c5dac', '2945bbb2-9431-4ed8-bf7b-dfe7a8997dcb', 'D', 'Qualquer cidadão é parte legítima para propor ação popular que vise anular ato lesivo ao patrimônio público, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural.', true, 'Correta. Qualquer cidadão é parte legítima para propor ação popular que vise anular ato lesivo ao patrimônio público, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural. Fundamento: Art. 5º, LXXIII, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXXIII, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100130 (ID: 76b678cf-d98e-4951-b120-e64ae959c238)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '76b678cf-d98e-4951-b120-e64ae959c238',
  'Q100130',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '9f6fef17-c827-4338-8406-3b5b6e64b708', -- topicoId (Remédios Constitucionais)
  '9017cca4-b429-48d0-8ae8-d7db8a9795f8', -- subtopicoId (Habeas corpus)
  'Pessoa é presa por autoridade sem fundamentação legal e sofre constrangimento ilegal em sua liberdade de locomoção.',
  'Assinale a opção correta sobre habeas corpus.',
  'Gabarito: Letra A. Conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção por ilegalidade ou abuso de poder. A resposta decorre de Art. 5º, LXVIII, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('bf9ce66f-3417-4aa9-9935-ee96ed09aa8e', '76b678cf-d98e-4951-b120-e64ae959c238', 'A', 'Conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção por ilegalidade ou abuso de poder.', true, 'Correta. Conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção por ilegalidade ou abuso de poder. Fundamento: Art. 5º, LXVIII, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXVIII, da CF/88.', 0),
  ('1b5afabe-e585-46d8-91d4-c13225730847', '76b678cf-d98e-4951-b120-e64ae959c238', 'B', 'Habeas corpus protege apenas direito de acesso a informações pessoais em banco de dados público.', false, 'Incorreta. Habeas corpus protege apenas direito de acesso a informações pessoais em banco de dados público. A assertiva contraria o fundamento constitucional aplicável ao tema Habeas corpus.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXVIII, da CF/88.', 1),
  ('d806d861-f5da-490a-bf24-dec29dc04e50', '76b678cf-d98e-4951-b120-e64ae959c238', 'C', 'Habeas corpus depende sempre de advogado e pagamento de custas.', false, 'Incorreta. Habeas corpus depende sempre de advogado e pagamento de custas. A assertiva contraria o fundamento constitucional aplicável ao tema Habeas corpus.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXVIII, da CF/88.', 2),
  ('015302b9-61db-43ec-9992-8b2a2639c359', '76b678cf-d98e-4951-b120-e64ae959c238', 'D', 'Habeas corpus é cabível para discutir exclusivamente multa contratual civil.', false, 'Incorreta. Habeas corpus é cabível para discutir exclusivamente multa contratual civil. A assertiva contraria o fundamento constitucional aplicável ao tema Habeas corpus.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXVIII, da CF/88.', 3);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100131 (ID: 5cbe5c57-cd99-47a3-87f2-53f00ae5eadd)
-- LOTE 001 CORRIGIDO: revisão individual de conteúdo
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"
) VALUES (
  '5cbe5c57-cd99-47a3-87f2-53f00ae5eadd',
  'Q100131',
  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)
  'INEDITA',
  'PUBLICADA',
  2026,
  true,
  'free',
  'publica',
  'LEI_SECA',
  (SELECT id FROM usuarios LIMIT 1),
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)
  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)
  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)
  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId
  '8d936de8-402d-46f1-b92f-eb38e1b89c09', -- disciplinaId (Direito Constitucional)
  '4a642a68-df22-499a-8352-330f1e99c581', -- assuntoId (Direitos e Garantias Fundamentais)
  '9f6fef17-c827-4338-8406-3b5b6e64b708', -- topicoId (Remédios Constitucionais)
  '32b1bc28-ab5b-4ca7-ba92-31614c56c155', -- subtopicoId (Habeas data)
  'Candidato descobre informação pessoal incorreta em banco de dados de entidade governamental e pretende retificá-la após recusa administrativa.',
  'Sobre habeas data, assinale a alternativa correta.',
  'Gabarito: Letra B. Conceder-se-á habeas data para assegurar conhecimento de informações relativas à pessoa do impetrante constantes de registros ou bancos de dados governamentais ou de caráter público, bem como para retificação de dados. A resposta decorre de Art. 5º, LXXII, da CF/88.. As demais alternativas foram construídas com inversões de competência, ampliação indevida do instituto ou negação de requisito constitucional específico.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES
  ('11431611-4a9a-4b99-8c6a-1dd7df8eee9b', '5cbe5c57-cd99-47a3-87f2-53f00ae5eadd', 'A', 'Habeas data protege liberdade de locomoção contra prisão ilegal.', false, 'Incorreta. Habeas data protege liberdade de locomoção contra prisão ilegal. A assertiva contraria o fundamento constitucional aplicável ao tema Habeas data.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXXII, da CF/88.', 0),
  ('96ad8fe5-1a4c-4815-81fc-90ecd5824c37', '5cbe5c57-cd99-47a3-87f2-53f00ae5eadd', 'B', 'Conceder-se-á habeas data para assegurar conhecimento de informações relativas à pessoa do impetrante constantes de registros ou bancos de dados governamentais ou de caráter público, bem como para retificação de dados.', true, 'Correta. Conceder-se-á habeas data para assegurar conhecimento de informações relativas à pessoa do impetrante constantes de registros ou bancos de dados governamentais ou de caráter público, bem como para retificação de dados. Fundamento: Art. 5º, LXXII, da CF/88.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXXII, da CF/88.', 1),
  ('300c614e-b619-45ba-b285-fa73fd6e5be7', '5cbe5c57-cd99-47a3-87f2-53f00ae5eadd', 'C', 'Habeas data é ação exclusiva do Ministério Público para defesa de patrimônio público.', false, 'Incorreta. Habeas data é ação exclusiva do Ministério Público para defesa de patrimônio público. A assertiva contraria o fundamento constitucional aplicável ao tema Habeas data.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXXII, da CF/88.', 2),
  ('afa81522-af4e-4d33-a9e4-885a9b4830aa', '5cbe5c57-cd99-47a3-87f2-53f00ae5eadd', 'D', 'Habeas data serve para impugnar lei em tese no controle concentrado.', false, 'Incorreta. Habeas data serve para impugnar lei em tese no controle concentrado. A assertiva contraria o fundamento constitucional aplicável ao tema Habeas data.', 'Revise o fundamento constitucional específico antes de marcar a alternativa.', 'Art. 5º, LXXII, da CF/88.', 3);

SELECT COUNT(*) AS questoes_lote_001 FROM questoes WHERE code BETWEEN 'Q100082' AND 'Q100131';

SELECT q.code, COUNT(a.id) AS alternativas, SUM(CASE WHEN a."isCorreta" THEN 1 ELSE 0 END) AS corretas
FROM questoes q
JOIN alternativas a ON a."questaoId" = q.id
WHERE q.code BETWEEN 'Q100082' AND 'Q100131'
GROUP BY q.code
HAVING COUNT(a.id) <> 4 OR SUM(CASE WHEN a."isCorreta" THEN 1 ELSE 0 END) <> 1;

COMMIT;
