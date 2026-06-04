-- =============================================================================
-- SQL DE IMPORTAÇÃO DE QUESTÕES CERTO/ERRADO (Banca OPS)
-- Total de Questões: 39
-- Gerado em: 2026-05-19T12:36:21.079Z
-- =============================================================================

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100051 (ID: ef36a665-e691-46ea-9927-65149cce9d72)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'ef36a665-e691-46ea-9927-65149cce9d72',
  'Q100051',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '4aba9175-b561-4434-abbc-fc3ae2475a51',
  '0538ec47-b1c6-44ed-bf8b-41a160089ccb',
  '3bdf58cf-d269-49ac-b58a-c754fedf49d2',
  'A teoria finalista, proposta por Hans Welzel, revolucionou o direito penal ao deslocar o dolo e a culpa da culpabilidade para o fato típico.',
  'Para a teoria finalista da ação, adotada pelo Código Penal brasileiro, a conduta penalmente relevante exige um comportamento humano voluntário (ação ou omissão) dirigido a uma finalidade, sendo o dolo considerado elemento da culpabilidade e não do fato típico.',
  'A assertiva está ERRADA. No finalismo penal, adotado pelo Código Penal brasileiro, o dolo e a culpa são elementos da conduta (fato típico), não da culpabilidade. A conduta é voluntária e finalista, e o dolo (vontade consciente de realizar o tipo penal) integra o conceito de ação final. A culpabilidade passa a ser analisada apenas sob o aspecto da exigibilidade de conduta diversa, potencial consciência da ilicitude e imputabilidade. A assertiva erra ao afirmar que o dolo pertence à culpabilidade.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('702a75c1-29d4-4bcb-8309-6f770703d919', 'ef36a665-e691-46ea-9927-65149cce9d72', 'C', 'Certo', false, 'Incorreta. No finalismo, dolo e culpa são elementos do fato típico (conduta), não da culpabilidade.', 'Decore: no finalismo, dolo e culpa estão no fato típico; na culpabilidade, analisamos apenas imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa.', 'Código Penal, arts. 18 e 20; Doutrina de Rogério Greco e Cezar Roberto Bitencourt.', 0),
  ('35fe91f4-0791-499f-bf5f-faed6f97f266', 'ef36a665-e691-46ea-9927-65149cce9d72', 'E', 'Errado', true, 'Correta. A assertiva está errada porque inverte a posição do dolo no sistema finalista.', 'O CEBRASPE (e sua banca OPS) adora essa pegadinha: confundir a posição do dolo entre as teorias causalista e finalista.', 'Código Penal, arts. 18 e 20; Doutrina de Rogério Greco e Cezar Roberto Bitencourt.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100052 (ID: 0b6a6818-2f25-4ca6-a032-2a35e2ecd63a)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '0b6a6818-2f25-4ca6-a032-2a35e2ecd63a',
  'Q100052',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '4aba9175-b561-4434-abbc-fc3ae2475a51',
  '0538ec47-b1c6-44ed-bf8b-41a160089ccb',
  '838b5555-9c62-4a67-83ba-befceb2adcce',
  'O art. 22 do CP trata das causas de isenção de pena por coação irresistível e obediência hierárquica.',
  'A coação moral irresistível e a obediência hierárquica a ordem não manifestamente ilegal são causas que excluem a ilicitude da conduta do agente, previstas no artigo 22 do Código Penal.',
  'A assertiva está ERRADA. O art. 22 do Código Penal estabelece que a coação moral irresistível e a obediência hierárquica a ordem não manifestamente ilegal excluem a culpabilidade (são causas de isenção de pena), não a ilicitude. A conduta do agente continua sendo ilícita, mas ele não é culpável porque não se podia exigir conduta diversa. Quem exclui a ilicitude são as causas do art. 23 do CP: estado de necessidade, legítima defesa, estrito cumprimento de dever legal e exercício regular de direito.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('18c252b2-908c-4590-952b-b9d27b827164', '0b6a6818-2f25-4ca6-a032-2a35e2ecd63a', 'C', 'Certo', false, 'Incorreta. O art. 22 exclui a CULPABILIDADE, não a ilicitude.', 'Decore: art. 22 (coação e obediência) = exclui CULPABILIDADE. art. 23 (legítima defesa, estado de necessidade, etc.) = exclui ILICITUDE.', 'Código Penal, art. 22 e art. 23.', 0),
  ('43b52768-9324-4ea4-b673-b4a28505480f', '0b6a6818-2f25-4ca6-a032-2a35e2ecd63a', 'E', 'Errado', true, 'Correta. A assertiva erra ao afirmar que essas causas excluem a ilicitude.', 'Pegadinha clássica do CESPE/OPS: trocar ilicitude por culpabilidade.', 'Código Penal, art. 22 e art. 23.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100053 (ID: 95d8ed5c-972c-4a68-bd5d-7b1fd349b8c8)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '95d8ed5c-972c-4a68-bd5d-7b1fd349b8c8',
  'Q100053',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '4aba9175-b561-4434-abbc-fc3ae2475a51',
  '0538ec47-b1c6-44ed-bf8b-41a160089ccb',
  '532e1818-3e0e-4db1-80ae-da2d762b2f16',
  'O art. 25 do CP define a legítima defesa, e o parágrafo único do art. 23 trata do excesso.',
  'A legítima defesa, causa de exclusão da ilicitude, exige agressão atual ou iminente, injusta e dirigida a direito próprio ou de terceiro, sendo admitido o chamado ''excesso exculpante'' como modalidade que exclui a ilicitude quando o agente, por escusável medo ou surpresa, vai além do necessário na defesa.',
  'A assertiva está ERRADA. O excesso exculpante (ou excesso culposo) não exclui a ilicitude, mas sim a culpabilidade (art. 23, parágrafo único, 1ª parte, do CP). Ele ocorre quando o agente, em situação de legítima defesa, age com dolo na defesa, mas excede por culpa (erro de avaliação, medo escusável, surpresa). Nesse caso, a conduta continua ilícita, mas o agente não é culpável. O excesso doloso (quando o agente quer exceder) exclui completamente a legítima defesa. A assertiva erra ao afirmar que o excesso exculpante exclui a ilicitude.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('752a45d4-914a-4537-afa5-e87b60dc22aa', '95d8ed5c-972c-4a68-bd5d-7b1fd349b8c8', 'C', 'Certo', false, 'Incorreta. O excesso exculpante exclui a culpabilidade, não a ilicitude.', 'Excesso exculpante = excesso culposo = exclui CULPABILIDADE. Excesso doloso = exclui a própria legítima defesa.', 'Código Penal, art. 23, parágrafo único.', 0),
  ('3f869f4a-05f8-44b5-83ad-daf8ca1ce9e5', '95d8ed5c-972c-4a68-bd5d-7b1fd349b8c8', 'E', 'Errado', true, 'Correta. O erro está em afirmar que o excesso exculpante exclui a ilicitude.', 'Decore a hierarquia: legítima defesa → exclui ilicitude. Excesso (exculpante ou doloso) → NUNCA exclui ilicitude.', 'Código Penal, art. 23, parágrafo único.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100054 (ID: ec47f6cb-b2ca-4a8e-b827-408eed5e344d)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'ec47f6cb-b2ca-4a8e-b827-408eed5e344d',
  'Q100054',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '00105a84-81e5-4ebe-9600-0aab117062f1',
  'e99a9ea8-4e59-48ae-925b-d165230fd742',
  'eb14c894-7086-43d3-838e-4c5de55567c4',
  'A Lei 13.104/2015 criou a qualificadora do feminicídio no homicídio.',
  'O feminicídio, inserido como qualificadora do crime de homicídio (art. 121, §2º, VI, do CP), é crime hediondo e não admite a aplicação das causas de diminuição de pena previstas no §1º do mesmo artigo (homicídio privilegiado), ainda que presentes os requisitos do privilégio.',
  'A assertiva está ERRADA. O feminicídio é, sim, crime hediondo (Lei 8.072/90, art. 1º, I). No entanto, a doutrina e a jurisprudência majoritárias (inclusive do STJ) admitem a aplicação do privilégio do §1º do art. 121 do CP (relevante valor social ou moral, ou domínio de violenta emoção logo após injusta provocação da vítima) ao feminicídio, desde que presentes os requisitos. O feminicídio não é um crime autônomo, mas uma qualificadora, portanto todas as regras do homicídio se aplicam, inclusive o privilégio.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('0e11a5f3-fc45-4e73-a1a8-8f161d3d9db4', 'ec47f6cb-b2ca-4a8e-b827-408eed5e344d', 'C', 'Certo', false, 'Incorreta. O privilégio do homicídio pode sim ser aplicado ao feminicídio, conforme STJ.', 'O CEBRASPE/OPS adora essa questão. Lembre-se: feminicídio é qualificadora, não crime autônomo. Tudo que vale para homicídio vale para feminicídio, salvo disposição em contrário.', 'Art. 121, §1º e §2º, VI do CP; STJ, REsp 1.732.319.', 0),
  ('431ea50c-cf38-45d1-9ce0-6be648d64498', 'ec47f6cb-b2ca-4a8e-b827-408eed5e344d', 'E', 'Errado', true, 'Correta. O privilégio é aplicável ao feminicídio.', 'Muita atenção: feminicídio pode ser privilegiado!', 'Art. 121, §1º e §2º, VI do CP; STJ, REsp 1.732.319.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100055 (ID: 5cb50da6-8b93-459f-a75e-daf3fb10b4aa)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '5cb50da6-8b93-459f-a75e-daf3fb10b4aa',
  'Q100055',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '00105a84-81e5-4ebe-9600-0aab117062f1',
  '3961753a-9643-44a0-bda6-58f7e056a491',
  '102e4d7f-c848-46a0-8a19-0e8a14edde7f',
  'O furto está previsto no art. 155 do Código Penal.',
  'No crime de furto, o elemento subjetivo é o ''animus rem sibi habendi'' (vontade de ter a coisa para si), de modo que a subtração da coisa alheia móvel com a imediata intenção de restituição (furto de uso) é considerada atípica por ausência de dolo específico, conforme entendimento doutrinário tradicional.',
  'A assertiva está CERTA. O furto de uso é uma figura doutrinária na qual o agente subtrai a coisa alheia móvel com a intenção de usá-la e restituí-la imediatamente. Para a doutrina majoritária (Damásio de Jesus, Fernando Capez), no furto de uso o dolo específico (animus rem sibi habendi - vontade de não restituir) está ausente, tornando a conduta atípica. A jurisprudência, no entanto, tem restringido essa tese em casos de abuso ou quando a restituição não ocorre de forma espontânea e imediata. A assertiva está correta ao reproduzir o entendimento doutrinário tradicional.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('b14c6a00-58a7-429b-9fdc-2bed54238de9', '5cb50da6-8b93-459f-a75e-daf3fb10b4aa', 'C', 'Certo', true, 'Correta. O furto de uso é atípico por ausência do elemento subjetivo ''animus rem sibi habendi''.', 'O CEBRASPE cobra a diferença: furto = vontade de não restituir (animus rem sibi habendi). Furto de uso = atípico.', 'Art. 155 do CP; Doutrina de Damásio de Jesus e Fernando Capez.', 0),
  ('4bd4961a-cedb-4d79-8518-60d34997b71d', '5cb50da6-8b93-459f-a75e-daf3fb10b4aa', 'E', 'Errado', false, 'Incorreta. O entendimento doutrinário tradicional realmente considera o furto de uso como atípico.', 'Cuidado: a jurisprudência recente tem mitigado essa tese, mas a doutrina majoritária ainda a aceita.', 'Art. 155 do CP; Doutrina de Damásio de Jesus e Fernando Capez.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100056 (ID: a660a942-218f-49de-9aa7-3933b344a400)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'a660a942-218f-49de-9aa7-3933b344a400',
  'Q100056',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '00105a84-81e5-4ebe-9600-0aab117062f1',
  'db51f55a-53cb-424b-b740-f91456a9808a',
  'ba073e53-efd0-4bd8-af5e-03a2c6d582af',
  'O peculato está previsto no art. 312 do Código Penal.',
  'O crime de peculato (art. 312 do CP) exige, para sua configuração, que o funcionário público tenha a posse ou disponibilidade da coisa em razão do cargo, sendo descabida a modalidade culposa, pois se trata de crime exclusivamente doloso.',
  'A assertiva está ERRADA. O peculato admite sim a modalidade culposa, prevista no §2º do art. 312 do CP: ''Se o funcionário concorre culposamente para o crime de outrem, a pena é diminuída de um a dois terços'' (peculato culposo). Além disso, o peculato doloso exige que o funcionário tenha a posse ou disponibilidade da coisa em razão do cargo (elemento normativo), mas a assertiva erra ao afirmar que não há peculato culposo.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('92514d62-a7c3-408d-a21b-05283d0324be', 'a660a942-218f-49de-9aa7-3933b344a400', 'C', 'Certo', false, 'Incorreta. O peculato tem sim a modalidade culposa (art. 312, §2º).', 'Decore: peculato doloso (caput) e peculato culposo (§2º). O CEBRASPE adora essa pegadinha.', 'Código Penal, art. 312, caput e §2º.', 0),
  ('f5610a00-ac60-4e28-b296-3c91ed520823', 'a660a942-218f-49de-9aa7-3933b344a400', 'E', 'Errado', true, 'Correta. O peculato culposo existe e está previsto no §2º do art. 312.', 'Cuidado: a banca pode dizer ''peculato é crime exclusivamente doloso'' - isso é FALSO!', 'Código Penal, art. 312, caput e §2º.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100057 (ID: 6495d791-ecfb-4878-bca3-66a54c22a58e)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '6495d791-ecfb-4878-bca3-66a54c22a58e',
  'Q100057',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '79598e72-7696-43ff-9ad6-adadfa6d0ec0',
  '218f34e0-a60c-4a53-8830-65141f2d5d02',
  'bc69c64d-6eac-4384-9e0a-473d728b6c29',
  '7bbc353e-6221-4543-8622-2309defdbc85',
  'O caput do art. 37 da CF/88 estabelece os princípios da Administração Pública.',
  'O princípio da legalidade administrativa, previsto no art. 37, caput, da CF/88, estabelece que a Administração Pública só pode fazer o que a lei autoriza, diferentemente do particular, que pode fazer tudo o que a lei não proíbe.',
  'A assertiva está CERTA. O princípio da legalidade para a Administração Pública é um princípio de subordinação (ou legalidade estrita): a Administração só pode atuar se houver previsão legal autorizativa. Já para o particular, vigora o princípio da legalidade como liberdade (o particular pode fazer tudo o que a lei não proíbe). Essa é a diferença clássica entre legalidade administrativa e legalidade civil. A assertiva está correta ao reproduzir esse entendimento.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('1811fdd9-7a47-4198-b276-350ba8142fe2', '6495d791-ecfb-4878-bca3-66a54c22a58e', 'C', 'Certo', true, 'Correta. A Administração Pública atua sob o princípio da legalidade estrita (só o que a lei autoriza).', 'Decore: particular → pode fazer tudo que a lei não proíbe. Administração → só pode fazer o que a lei autoriza.', 'Art. 37, caput, da CF/88; Doutrina de Hely Lopes Meirelles e Diogo de Figueiredo Moreira Neto.', 0),
  ('e85af6a3-ffbc-43b1-be88-33c373414da1', '6495d791-ecfb-4878-bca3-66a54c22a58e', 'E', 'Errado', false, 'Incorreta. A assertiva está perfeitamente alinhada com a doutrina e a jurisprudência.', 'Pegadinha: a banca pode inverter os conceitos. Fique atento!', 'Art. 37, caput, da CF/88; Doutrina de Hely Lopes Meirelles e Diogo de Figueiredo Moreira Neto.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100058 (ID: 8151cdbd-0eb2-4c82-997e-5569d0b19bff)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '8151cdbd-0eb2-4c82-997e-5569d0b19bff',
  'Q100058',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '79598e72-7696-43ff-9ad6-adadfa6d0ec0',
  '218f34e0-a60c-4a53-8830-65141f2d5d02',
  'cabfd043-7e30-441b-8db0-4b0199c727b7',
  '1ef6297f-47a2-4efd-ba23-7a269b58ba0f',
  'As autarquias integram a Administração Pública Indireta.',
  'As autarquias são pessoas jurídicas de direito público, criadas por lei específica, com capacidade de autoadministração e patrimônio próprio, sendo-lhes vedado o exercício de atividades econômicas em sentido estrito, salvo quando houver autorização legal expressa.',
  'A assertiva está CERTA. As autarquias são pessoas jurídicas de direito público, criadas por lei específica (art. 37, XIX, CF/88), com capacidade de autoadministração, patrimônio próprio e sujeitas a controle finalístico (tutela). Via de regra, exercem atividades típicas de Estado (serviços públicos), e não atividades econômicas. A exploração de atividade econômica em sentido estrito é típica de empresas públicas e sociedades de economia mista, e mesmo assim mediante autorização legal e sob regime de direito privado. A assertiva está correta ao afirmar que é vedado às autarquias o exercício de atividades econômicas em sentido estrito, salvo autorização legal expressa (excepcionalmente, como no caso de autarquias como o DETRAN que exploram serviços de forma não econômica).',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('95beff4d-ad7e-4d29-9be0-0be0dc7fe7d7', '8151cdbd-0eb2-4c82-997e-5569d0b19bff', 'C', 'Certo', true, 'Correta. Autarquias são pessoas jurídicas de direito público, criadas por lei específica, e não exercem atividade econômica em sentido estrito.', 'Decore: autarquia = direito público, criada por lei, atividades típicas de Estado. Empresa pública e S.E.M. = direito privado, atividade econômica.', 'Art. 37, XIX da CF/88; Decreto-Lei 200/67, art. 5º, I.', 0),
  ('90d57de2-f7b8-4566-8df0-afbe7d066d2d', '8151cdbd-0eb2-4c82-997e-5569d0b19bff', 'E', 'Errado', false, 'Incorreta. A assertiva está correta em todos os aspectos.', 'Cuidado com a exceção: autarquias podem excepcionalmente explorar atividade econômica se houver previsão legal expressa (ex: Agências Reguladoras).', 'Art. 37, XIX da CF/88; Decreto-Lei 200/67, art. 5º, I.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100059 (ID: b7e09ee2-abe2-449e-adeb-0bf7e4fd0bae)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'b7e09ee2-abe2-449e-adeb-0bf7e4fd0bae',
  'Q100059',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  '79598e72-7696-43ff-9ad6-adadfa6d0ec0',
  '06004609-98f0-4a83-a734-32dba616e8b4',
  '219fe8af-a6c1-4225-802d-803aff39039d',
  '1a4ad3e1-610f-4e42-959e-c709151144b0',
  'O poder de polícia é a atividade estatal de limitação de direitos individuais em prol do interesse público.',
  'O poder de polícia, atributo da Administração Pública, caracteriza-se pela discricionariedade, autoexecutoriedade e coercibilidade, sendo que a discricionariedade confere à Administração liberdade total para escolher, entre várias opções previstas em lei, a mais adequada ao caso concreto, sem qualquer controle judicial.',
  'A assertiva está ERRADA. Embora o poder de polícia tenha os atributos mencionados (discricionariedade, autoexecutoriedade e coercibilidade), a discricionariedade não é absoluta e não exclui o controle judicial. O Judiciário pode controlar a legalidade do ato de polícia, inclusive os aspectos discricionários, para verificar se houve desvio de finalidade, abuso de poder ou violação aos princípios da razoabilidade e proporcionalidade. O controle judicial não adentra o mérito administrativo discricionário (oportunidade e conveniência), mas pode anular o ato se houver ilegalidade. A assertiva erra ao afirmar ''sem qualquer controle judicial''.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('57a83c7f-5ab1-45b6-88a4-2d99ceb96a03', 'b7e09ee2-abe2-449e-adeb-0bf7e4fd0bae', 'C', 'Certo', false, 'Incorreta. O ato discricionário está sujeito a controle judicial quanto à legalidade (desvio de finalidade, abuso de poder, etc.).', 'Decore: discricionariedade ≠ arbítrio. O Judiciário controla a legalidade, inclusive dos atos discricionários.', 'Doutrina de Hely Lopes Meirelles e Maria Sylvia Zanella Di Pietro; Súmula 473 do STF.', 0),
  ('edd4f800-f987-4d75-bf10-43a29a56adb9', 'b7e09ee2-abe2-449e-adeb-0bf7e4fd0bae', 'E', 'Errado', true, 'Correta. A discricionariedade não exclui o controle judicial quanto aos aspectos legais.', 'Pegadinha clássica: a banca diz que ato discricionário não pode ser controlado pelo Judiciário = FALSO!', 'Doutrina de Hely Lopes Meirelles e Maria Sylvia Zanella Di Pietro; Súmula 473 do STF.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100060 (ID: d92ab967-8e5e-4662-9f8a-187a58edaa2e)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'd92ab967-8e5e-4662-9f8a-187a58edaa2e',
  'Q100060',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '8d936de8-402d-46f1-b92f-eb38e1b89c09',
  '84f5cb6f-0784-4d7b-bccb-592f53b061a3',
  'a2c9f22f-e5eb-42fd-81f1-b83835c715b0',
  'f5b25802-10f9-4b6b-9ac1-aadfc2bb5062',
  'O art. 144 da CF/88 trata da segurança pública.',
  'Nos termos do art. 144, §4º, da Constituição Federal, as polícias civis, dirigidas por delegados de polícia de carreira, incumbem, ressalvada a competência da União, as funções de polícia judiciária e a apuração de infrações penais, exceto as militares.',
  'A assertiva está CERTA. É a transcrição literal do §4º do art. 144 da Constituição Federal: ''Às polícias civis, dirigidas por delegados de polícia de carreira, incumbem, ressalvada a competência da União, as funções de polícia judiciária e a apuração de infrações penais, exceto as militares.'' A assertiva está correta e é um dos dispositivos mais cobrados em concursos policiais.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('548c485b-76b9-4f2c-863a-631781ec52a2', 'd92ab967-8e5e-4662-9f8a-187a58edaa2e', 'C', 'Certo', true, 'Correta. Literalidade do art. 144, §4º da CF/88.', 'Decore: Polícia Civil → delegado de carreira → polícia judiciária → apura infrações penais (exceto militares).', 'Art. 144, §4º da Constituição Federal de 1988.', 0),
  ('188cd674-13bd-41d7-bf4a-d65226b3b774', 'd92ab967-8e5e-4662-9f8a-187a58edaa2e', 'E', 'Errado', false, 'Incorreta. A assertiva está literalmente correta.', 'O CEBRASPE adora cobrar esse dispositivo. Grave bem!', 'Art. 144, §4º da Constituição Federal de 1988.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100061 (ID: 3eb7266f-1b36-413f-8010-07651a236413)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '3eb7266f-1b36-413f-8010-07651a236413',
  'Q100061',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '8d936de8-402d-46f1-b92f-eb38e1b89c09',
  '4a642a68-df22-499a-8352-330f1e99c581',
  '49c896a5-8041-4224-bed0-15c3f3120847',
  'f1a7c86b-19ab-465c-8305-8b787cdedf29',
  'O caput do art. 5º da CF/88 garante a igualdade de todos perante a lei.',
  'O princípio da igualdade, previsto no art. 5º, caput, da CF/88, veda qualquer forma de discriminação, inclusive as chamadas ''ações afirmativas'', pois estas violam a isonomia ao tratar desigualmente os cidadãos com base em critérios como raça, gênero ou deficiência.',
  'A assertiva está ERRADA. O princípio da igualdade não é absoluto e matemático. A Constituição prevê a chamada ''igualdade material'' ou ''isonomia substancial'', que autoriza a discriminação positiva (ações afirmativas) para corrigir desigualdades históricas e promover a igualdade real. Exemplos: reserva de vagas para pessoas com deficiência (art. 37, VIII, CF/88), cotas raciais em universidades (STF, ADPF 186) e concursos públicos. A assertiva erra ao afirmar que as ações afirmativas violam a isonomia.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('6cb41ac6-fbf5-43d6-9744-a471bd303aa8', '3eb7266f-1b36-413f-8010-07651a236413', 'C', 'Certo', false, 'Incorreta. As ações afirmativas são constitucionais e buscam promover a igualdade material.', 'Decore: igualdade formal ≠ igualdade material. Ações afirmativas são constitucionais!', 'Art. 5º, caput e art. 37, VIII da CF/88; STF, ADPF 186.', 0),
  ('001a8e1e-0e4d-4ad8-96ea-e8e73366b443', '3eb7266f-1b36-413f-8010-07651a236413', 'E', 'Errado', true, 'Correta. Ações afirmativas não violam a isonomia; ao contrário, a promovem.', 'Cuidado: a banca adora dizer que ação afirmativa é discriminação. Não caia nessa!', 'Art. 5º, caput e art. 37, VIII da CF/88; STF, ADPF 186.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100062 (ID: 669878b6-c48e-42be-8766-771d2b347106)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '669878b6-c48e-42be-8766-771d2b347106',
  'Q100062',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '7cbbec89-e04a-4964-9a72-a7a8d86e745e',
  '309518b5-6521-4a17-baeb-02d1c3eb95cf',
  '0217c869-24f8-4606-a925-3c562e310834',
  'fe52f591-8638-407c-ad53-b11361179493',
  'A Lei 11.340/2006 (Lei Maria da Penha) protege a mulher contra a violência doméstica e familiar.',
  'A Lei Maria da Penha (Lei 11.340/2006) prevê, entre as medidas protetivas de urgência, o afastamento do agressor do lar e a proibição de contato com a vítima, podendo tais medidas ser aplicadas independentemente da existência de processo criminal instaurado.',
  'A assertiva está CERTA. As medidas protetivas de urgência (arts. 22 a 24 da Lei 11.340/06) podem ser concedidas pelo juiz a requerimento do Ministério Público ou da vítima, independentemente de instauração de inquérito policial ou processo criminal. O art. 19 da lei estabelece que as medidas protetivas são autônomas e não dependem da existência de ação penal. O afastamento do lar (art. 22, II) e a proibição de contato (art. 22, III) são medidas típicas. A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('79e9418b-4ff8-4d37-948a-659ba475f62f', '669878b6-c48e-42be-8766-771d2b347106', 'C', 'Certo', true, 'Correta. As medidas protetivas são autônomas e não dependem de processo criminal.', 'Decore: medidas protetivas são URGENTES, AUTÔNOMAS e INDEPENDENTES de processo criminal.', 'Lei 11.340/2006, arts. 19, 22, II e III.', 0),
  ('6b07a5a7-fec5-4aae-84e3-aa1804d45d8b', '669878b6-c48e-42be-8766-771d2b347106', 'E', 'Errado', false, 'Incorreta. A lei expressamente prevê a autonomia das medidas protetivas.', 'Pegadinha: a banca pode dizer que medidas protetivas dependem de IP. Não dependem!', 'Lei 11.340/2006, arts. 19, 22, II e III.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100063 (ID: 00eda482-c6ae-4aa2-b1c3-7aa1f88c74bd)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '00eda482-c6ae-4aa2-b1c3-7aa1f88c74bd',
  'Q100063',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '7cbbec89-e04a-4964-9a72-a7a8d86e745e',
  'c7739498-25bb-421e-8b9c-c4b2eb8d083b',
  '82e3545d-e9a6-424b-bf8c-b12fe5bc1219',
  'b35aa176-1f51-44e2-a5e6-74292f6f4477',
  'A Lei 11.343/2006 diferencia o usuário (art. 28) do traficante (art. 33).',
  'Para a caracterização do crime de tráfico de drogas (art. 33 da Lei 11.343/2006), é indispensável a prova da finalidade de comércio, sendo que o porte de pequena quantidade de entorpecente, por si só, autoriza o reconhecimento do crime do art. 28 (usuário), independentemente de outras circunstâncias.',
  'A assertiva está ERRADA. A diferença entre tráfico (art. 33) e uso (art. 28) não é determinada apenas pela quantidade da droga. A jurisprudência do STJ e STF (Informativo STF nº 855) estabelece que devem ser analisadas outras circunstâncias: natureza e quantidade da substância, local e condições da apreensão, antecedentes do agente, conduta social, etc. A presunção de que pequena quantidade autoriza, por si só, o reconhecimento do art. 28 é relativa, não absoluta. O STF, no RE 635.659, fixou tese de que a análise deve ser concreta e fundamentada, não se presumindo o tráfico ou o uso apenas pela quantidade.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('e8fce41c-8410-425f-b725-8c63173afe68', '00eda482-c6ae-4aa2-b1c3-7aa1f88c74bd', 'C', 'Certo', false, 'Incorreta. A quantidade não é o único critério; outras circunstâncias devem ser analisadas.', 'Decore: pequena quantidade ≠ automaticamente usuário. Analisar o caso concreto!', 'Lei 11.343/2006, arts. 28 e 33; STF, RE 635.659.', 0),
  ('5945ba8d-773e-45f1-ad2e-4068f602d97a', '00eda482-c6ae-4aa2-b1c3-7aa1f88c74bd', 'E', 'Errado', true, 'Correta. A assertiva erra ao afirmar que a pequena quantidade, por si só, autoriza o reconhecimento do art. 28.', 'Pegadinha clássica: a banca diz ''pequena quantidade = art. 28'' — isso é relativo, não absoluto.', 'Lei 11.343/2006, arts. 28 e 33; STF, RE 635.659.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100064 (ID: a03334cb-7ea5-44dd-bb07-a089cecd74c2)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'a03334cb-7ea5-44dd-bb07-a089cecd74c2',
  'Q100064',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'a6edd91e-2c37-4d2d-9cb8-9306b2cd45d4',
  '057f2250-f7c9-466c-972a-2b809014c3ff',
  '66556bc5-4ece-4cbe-9d18-8d04cd6c44c5',
  'f25b091c-c924-40d4-9274-cbe74d96bf1e',
  'O uso progressivo da força é um dos pilares dos direitos humanos na atividade policial.',
  'O princípio da proporcionalidade no uso da força por agentes de segurança pública, previsto em diretrizes internacionais e adotado pelo ordenamento brasileiro, estabelece que o agente deve empregar, gradativamente, meios menos lesivos antes de recorrer a meios potencialmente letais, salvo quando houver iminente risco de morte ou lesão grave a si ou a terceiro.',
  'A assertiva está CERTA. O princípio da proporcionalidade, na atuação policial, está consagrado em documentos internacionais como o Código de Conduta para os Funcionários Responsáveis pela Aplicação da Lei (ONU) e os Princípios Básicos sobre o Uso da Força e Armas de Fogo. No Brasil, é adotado pelo Manual da Força Nacional e pelas diretrizes de direitos humanos. O princípio estabelece a gradação do uso da força: primeiramente, meios de menor potencial ofensivo (verbal, contenção física, equipamentos menos letais) e, apenas diante de iminente risco de morte ou lesão grave, o uso de força letal. A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('5faf7024-3835-4b11-b805-0690c0630d9c', 'a03334cb-7ea5-44dd-bb07-a089cecd74c2', 'C', 'Certo', true, 'Correta. O princípio da proporcionalidade exige a gradação do uso da força, com a força letal como último recurso.', 'Decore: progressividade, necessidade, legalidade e prestação de contas são os pilares do uso da força.', 'Princípios Básicos sobre o Uso da Força e Armas de Fogo (ONU); Manual da Força Nacional de Segurança Pública.', 0),
  ('03624e79-e7c4-40ba-a0a7-afd9930b8a03', 'a03334cb-7ea5-44dd-bb07-a089cecd74c2', 'E', 'Errado', false, 'Incorreta. A assertiva reproduz corretamente o princípio da proporcionalidade.', 'Cuidado: a banca pode tentar confundir proporcionalidade com necessidade ou adequação.', 'Princípios Básicos sobre o Uso da Força e Armas de Fogo (ONU); Manual da Força Nacional de Segurança Pública.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100065 (ID: 88c86dbf-3023-4af9-9782-55847aa5934c)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '88c86dbf-3023-4af9-9782-55847aa5934c',
  'Q100065',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'a27fc0f0-1bb2-4131-9177-f462e7144b4b',
  '4a23029c-a85b-4119-b283-a411c433d0f0',
  '6ee94576-9e33-4257-9054-56be2139c9d6',
  'e00d43c1-af65-4108-bfe3-f369be09050b',
  'As escolas criminológicas explicam as causas do crime de diferentes perspectivas.',
  'A Escola Clássica da Criminologia, representada por autores como Cesare Beccaria, defendia a ideia de que o crime é um fenômeno natural e que o criminoso seria um ser atávico, determinado biologicamente ao comportamento delituoso, razão pela qual pregava a aplicação de penas severas e indeterminadas.',
  'A assertiva está ERRADA. A descrição apresentada corresponde à Escola Positivista (Lombroso, Ferri, Garofalo), que defendia o determinismo biológico (criminoso atávico, nato) e penas indeterminadas. A Escola Clássica (Beccaria, Feuerbach, Carrara) tinha fundamentos iluministas: livre-arbítrio, utilidade da pena, proporcionalidade, legalidade, e combate às penas cruéis e indeterminadas. A assertiva inverte as características das duas escolas.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('9253af55-ff9a-4fc6-8f7e-a77a516400de', '88c86dbf-3023-4af9-9782-55847aa5934c', 'C', 'Certo', false, 'Incorreta. A descrição é da Escola Positivista, não da Clássica.', 'Decore: Clássica = livre-arbítrio, iluminismo, pena proporcional. Positivista = determinismo biológico, criminoso nato.', 'Doutrina criminológica: Escola Clássica (Beccaria) x Escola Positivista (Lombroso).', 0),
  ('f7b7ddd8-d03c-4a26-a2e2-be8b9843115b', '88c86dbf-3023-4af9-9782-55847aa5934c', 'E', 'Errado', true, 'Correta. A assertiva trocou as características das escolas Clássica e Positivista.', 'Pegadinha clássica: a banca descreve o Positivismo e diz que é a Escola Clássica. Fique atento!', 'Doutrina criminológica: Escola Clássica (Beccaria) x Escola Positivista (Lombroso).', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100066 (ID: 58e4b469-1a5b-4ddc-b5c1-54e564db0c50)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '58e4b469-1a5b-4ddc-b5c1-54e564db0c50',
  'Q100066',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'INTERPRETACAO', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '8faf47c4-d957-4899-bc94-e5efd7104c49',
  'f6e409fb-0664-4520-bf80-5e2851217c95',
  '2f589bdb-efb6-4ccf-9f04-e34c424019a5',
  '54951369-802c-4d71-9270-3cd7a605ef6c',
  'A compreensão textual exige a distinção entre ideia principal e ideias secundárias.',
  'A ideia central de um texto (tese) e as ideias secundárias (argumentos) que a sustentam mantêm uma relação de hierarquia, de modo que a supressão de um argumento secundário, em princípio, não compromete a compreensão global da tese, ao passo que a supressão da tese inviabiliza a identificação do propósito comunicativo do autor.',
  'A assertiva está CERTA. Na estrutura de um texto dissertativo-argumentativo, a tese (ideia principal) é o argumento central defendido pelo autor. As ideias secundárias são os argumentos que sustentam a tese. A supressão de uma ideia secundária pode enfraquecer a argumentação, mas não necessariamente impede a compreensão da tese. Já a supressão da tese inviabiliza a compreensão do propósito comunicativo do texto, pois o leitor não saberá qual é a posição defendida. A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('f7765860-e6fd-49b7-b944-b36b12022756', '58e4b469-1a5b-4ddc-b5c1-54e564db0c50', 'C', 'Certo', true, 'Correta. A tese é hierarquicamente superior aos argumentos secundários.', 'Para a FGV e OPS (estilo CESPE), a compreensão da hierarquia textual é fundamental.', 'Teoria da argumentação; Análise de discurso.', 0),
  ('7d2df93a-5b04-4b32-a9de-32bb7febb421', '58e4b469-1a5b-4ddc-b5c1-54e564db0c50', 'E', 'Errado', false, 'Incorreta. A relação hierárquica entre tese e argumentos é correta.', 'Lembre-se: a tese é o ''esqueleto'' do texto; os argumentos são os ''músculos''.', 'Teoria da argumentação; Análise de discurso.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100067 (ID: a33ac446-030a-4033-9450-952b2f50acd9)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'a33ac446-030a-4033-9450-952b2f50acd9',
  'Q100067',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '00105a84-81e5-4ebe-9600-0aab117062f1',
  'db51f55a-53cb-424b-b740-f91456a9808a',
  'f597e885-2cc1-4d68-91d9-d621c9cab99f',
  'A concussão (art. 316) e a extorsão (art. 158) são crimes contra a Administração Pública e contra o patrimônio, respectivamente.',
  'No crime de concussão (art. 316 do CP), o funcionário público exige, para si ou para outrem, vantagem indevida, utilizando-se da violência ou grave ameaça, enquanto no crime de extorsão (art. 158 do CP), o particular exige vantagem indevida valendo-se de sua função pública, sendo a distinção fundamental a qualidade do sujeito ativo.',
  'A assertiva está ERRADA. O crime de concussão (art. 316 do CP) é praticado por funcionário público que exige vantagem indevida, utilizando-se da sua função (sem violência ou grave ameaça). O crime de extorsão (art. 158 do CP) é praticado por qualquer pessoa (particular) que, mediante violência ou grave ameaça, constrange alguém a fazer, tolerar ou omitir algo. A assertiva inverteu: na concussão não há violência/ameaça (apenas o uso da função), e na extorsão o sujeito ativo é qualquer pessoa (não funcionário público). Além disso, a distinção fundamental não é apenas a qualidade do sujeito ativo, mas também os meios empregados.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('3cdd4c34-7c85-477e-bd64-303960b8d922', 'a33ac446-030a-4033-9450-952b2f50acd9', 'C', 'Certo', false, 'Incorreta. A concussão não exige violência/ameaça (usa a função); a extorsão é crime comum, não próprio.', 'Decore: concussão = funcionário público + exige vantagem indevida + usa a função (sem violência). Extorsão = qualquer pessoa + violência/grave ameaça.', 'Código Penal, arts. 158 e 316.', 0),
  ('f765e2b3-1812-4f96-a20b-5da34c03ef70', 'a33ac446-030a-4033-9450-952b2f50acd9', 'E', 'Errado', true, 'Correta. A assertiva inverteu as características da concussão e da extorsão.', 'Pegadinha clássica: confundir concussão (art. 316) com extorsão (art. 158).', 'Código Penal, arts. 158 e 316.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100068 (ID: 321e4b82-0a72-45a9-820e-3ee850b76950)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '321e4b82-0a72-45a9-820e-3ee850b76950',
  'Q100068',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '4aba9175-b561-4434-abbc-fc3ae2475a51',
  '9e45d174-9e4a-47ee-a870-f1fb5a1ee371',
  'fcf1ac8c-1fb0-4dd0-98d6-300d7b27d2f3',
  'A substituição por penas restritivas de direitos está prevista no art. 44 do CP.',
  'As penas restritivas de direitos são aplicáveis em substituição à pena privativa de liberdade quando presentes os requisitos do art. 44 do Código Penal: condenação a pena privativa de liberdade não superior a 4 (quatro) anos; crime cometido sem violência ou grave ameaça à pessoa; réu não reincidente em crime doloso; e culpabilidade, antecedentes, conduta social e personalidade favoráveis.',
  'A assertiva está CERTA. O art. 44 do Código Penal estabelece os requisitos para a substituição da pena privativa de liberdade por restritiva de direitos: (I) condenação a pena privativa de liberdade não superior a 4 anos; (II) crime cometido sem violência ou grave ameaça à pessoa; (III) réu não reincidente em crime doloso; (IV) culpabilidade, antecedentes, conduta social e personalidade favoráveis, bem como os motivos e as circunstâncias do crime indiquem que a substituição é suficiente. A assertiva está literalmente correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('463d25b2-3954-467d-a6e9-ecb96ed67149', '321e4b82-0a72-45a9-820e-3ee850b76950', 'C', 'Certo', true, 'Correta. A assertiva transcreve os requisitos do art. 44 do CP.', 'Decore os 4 requisitos: pena ≤ 4 anos, crime sem violência/grave ameaça, não reincidente em crime doloso, condições pessoais favoráveis.', 'Código Penal, art. 44, incisos I, II, III e §2º.', 0),
  ('589b6bf0-30fc-49e6-9c20-f5f8a1d8e678', '321e4b82-0a72-45a9-820e-3ee850b76950', 'E', 'Errado', false, 'Incorreta. A assertiva está em conformidade com o art. 44 do CP.', 'Cuidado: o limite é 4 anos. Não confunda com a suspensão condicional da pena (art. 77) que é 2 anos.', 'Código Penal, art. 44, incisos I, II, III e §2º.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100069 (ID: 753879c4-7a30-41ec-a774-0bdf89dcf46d)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '753879c4-7a30-41ec-a774-0bdf89dcf46d',
  'Q100069',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  '8d936de8-402d-46f1-b92f-eb38e1b89c09',
  '604e20e5-308f-44f6-bc1d-62d3ed9df757',
  '7a8401ed-14e9-4dde-84a9-41c4f66cca96',
  'ab4d35c0-5fdb-48e0-933c-97e9b5f2eef9',
  'O art. 103 da CF/88 lista os legitimados para propor ADI.',
  'A Ação Direta de Inconstitucionalidade (ADI) pode ser proposta pelo Conselho Seccional da Ordem dos Advogados do Brasil (OAB), pelos partidos políticos com representação no Congresso Nacional, e pelo Procurador-Geral da República, sendo este o único legitimado com capacidade para propor ADI por omissão.',
  'A assertiva está ERRADA. O art. 103 da CF/88 estabelece que o legitimado para propor ADI é o Conselho FEDERAL da OAB, não os Conselhos Seccionais. Além disso, a ADI por omissão (art. 103, §2º) pode ser proposta pelos mesmos legitimados da ADI interventiva, não apenas pelo PGR. O Procurador-Geral da República é legitimado universal (pode propor todas as ações de controle concentrado), mas não é o único legitimado para ADI por omissão. A assertiva erra ao afirmar que o Conselho Seccional é legitimado e que apenas o PGR pode propor ADI por omissão.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('21177b2e-52d8-4808-b97e-2afd974dcb5c', '753879c4-7a30-41ec-a774-0bdf89dcf46d', 'C', 'Certo', false, 'Incorreta. O legitimado é o Conselho FEDERAL, não o Seccional. E ADI por omissão pode ser proposta por qualquer legitimado do art. 103.', 'Decore: ADI → Conselho FEDERAL da OAB (não Seccional). ADI por omissão → mesmos legitimados da ADI.', 'Art. 103, VI, VII e §2º da CF/88.', 0),
  ('e6f59f71-68ba-4207-9ed4-b0d89d447c5c', '753879c4-7a30-41ec-a774-0bdf89dcf46d', 'E', 'Errado', true, 'Correta. A assertiva erra ao mencionar Conselho Seccional e ao restringir a ADI por omissão ao PGR.', 'Pegadinha clássica: confundir Conselho Federal com Seccional.', 'Art. 103, VI, VII e §2º da CF/88.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100070 (ID: b630c0a0-47da-4298-8f0b-ade0e7c725a1)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'b630c0a0-47da-4298-8f0b-ade0e7c725a1',
  'Q100070',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '79598e72-7696-43ff-9ad6-adadfa6d0ec0',
  'aed5b864-3f65-4d4d-95eb-d15092e704cc',
  'edbfba6c-8d16-4f79-b537-71b20ad90948',
  '62e20413-fa57-4478-8154-0ecad77cd457',
  'A responsabilidade objetiva do Estado está prevista no art. 37, §6º da CF/88.',
  'A responsabilidade civil do Estado, regida pela teoria do risco administrativo, dispensa a comprovação de culpa do agente público (responsabilidade objetiva), mas exige a demonstração do dano e do nexo causal, sendo admitidas excludentes como culpa exclusiva da vítima, caso fortuito ou força maior.',
  'A assertiva está CERTA. A responsabilidade civil do Estado é objetiva (art. 37, §6º, CF/88), baseada na teoria do risco administrativo: o Estado responde independentemente de culpa do agente público, desde que presentes o dano e o nexo causal. São admitidas excludentes: culpa exclusiva da vítima, caso fortuito, força maior e fato de terceiro (desde que rompa o nexo causal). A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('663cb309-108b-4d6f-a338-b09b448a674e', 'b630c0a0-47da-4298-8f0b-ade0e7c725a1', 'C', 'Certo', true, 'Correta. A responsabilidade objetiva exige dano e nexo causal, admitindo excludentes.', 'Decore: responsabilidade objetiva do Estado (teoria do risco administrativo) ≠ teoria do risco integral (sem excludentes).', 'Art. 37, §6º da CF/88; Doutrina de Celso Antônio Bandeira de Mello.', 0),
  ('8e0b3aee-6000-4ec7-900b-1b3fba9e936c', 'b630c0a0-47da-4298-8f0b-ade0e7c725a1', 'E', 'Errado', false, 'Incorreta. A assertiva está perfeitamente alinhada com o art. 37, §6º da CF/88 e a doutrina majoritária.', 'Cuidado: se a banca disser ''responsabilidade objetiva SEM excludentes'' → isso é teoria do risco integral (ex: dano nuclear, ambiental em alguns casos).', 'Art. 37, §6º da CF/88; Doutrina de Celso Antônio Bandeira de Mello.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100071 (ID: d6bd72bd-695c-4019-95f2-a9f02d8a691b)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'd6bd72bd-695c-4019-95f2-a9f02d8a691b',
  'Q100071',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'be68efdb-55ed-4b37-823c-260610cf1b11',
  '081878ce-9a40-4245-bda2-b3a1ef8a4128',
  '58cebd43-9c2a-4c69-a8e0-6ba20652fb6b',
  '5b2f22bc-57de-409b-9063-344d30725f97',
  'O inquérito policial é regulado pelo Código de Processo Penal.',
  'O princípio do contraditório, previsto no art. 5º, LV, da CF/88, aplica-se apenas ao processo judicial, não alcançando o inquérito policial, que é procedimento administrativo investigatório de natureza inquisitiva, no qual não há direito ao contraditório ou à ampla defesa.',
  'A assertiva está ERRADA. Embora o inquérito policial seja inquisitivo e não judicial, a doutrina e a jurisprudência atuais reconhecem que alguns direitos decorrentes do contraditório e da ampla defesa devem ser observados, ainda que de forma mitigada. O investigado tem direito de acompanhar o inquérito por advogado, ter acesso aos autos (HC 71.630/RS), e apresentar defesa indireta (memoriais). A Súmula Vinculante 14 do STF garante o acesso do advogado aos autos do inquérito. A assertiva erra ao afirmar que não há qualquer direito ao contraditório.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('d03c659e-8f1e-4399-a93a-a3ce6ef1537b', 'd6bd72bd-695c-4019-95f2-a9f02d8a691b', 'C', 'Certo', false, 'Incorreta. Existe direito mitigado ao contraditório no inquérito policial, como acesso aos autos por advogado.', 'O CEBRASPE adora afirmar ''inquérito não tem contraditório'' como absoluto. É FALSO! Há acesso aos autos e defesa indireta.', 'Art. 5º, LV da CF/88; Súmula Vinculante 14 do STF; HC 71.630/RS.', 0),
  ('aeb9ea55-c723-44c2-bd9e-6d6dbbdb3865', 'd6bd72bd-695c-4019-95f2-a9f02d8a691b', 'E', 'Errado', true, 'Correta. O inquérito policial não é um processo judicial, mas garante alguns direitos ao investigado.', 'Decore: Inquérito = inquisitivo, mas não é ''terra sem lei''. Advogado tem acesso aos autos.', 'Art. 5º, LV da CF/88; Súmula Vinculante 14 do STF; HC 71.630/RS.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100072 (ID: 1730838e-2243-419a-a2a5-450a4a8cff3f)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '1730838e-2243-419a-a2a5-450a4a8cff3f',
  'Q100072',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'be68efdb-55ed-4b37-823c-260610cf1b11',
  '0e3147f9-119d-43d8-b042-f100611da7ea',
  'edd2a236-016c-4c00-910c-5335d16c5663',
  '3fd89a77-5171-4603-a5d5-0e8e05c536e0',
  'Art. 10 do Código de Processo Penal.',
  'O prazo para conclusão do inquérito policial quando o indiciado estiver preso é de 10 dias, prorrogável por igual período mediante requerimento fundamentado da autoridade policial ao juiz, sendo vedada a prorrogação sucessiva.',
  'A assertiva está ERRADA. O art. 10, caput, do CPP estabelece o prazo de 10 dias para o inquérito com indiciado preso. O §2º do mesmo art. permite que o juiz prorrogue o prazo ''por mais um prazo igual'' sempre que a autoridade policial justificar a necessidade de novas diligências. A lei não veda a prorrogação sucessiva; o juiz pode conceder quantas prorrogações forem necessárias, desde que devidamente fundamentadas. A assertiva erra ao afirmar ''vedada a prorrogação sucessiva''.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('8755bfd5-1a92-492b-a5cf-ce27bc5e42c2', '1730838e-2243-419a-a2a5-450a4a8cff3f', 'C', 'Certo', false, 'Incorreta. A prorrogação sucessiva é permitida, desde que fundamentada.', 'Decore: prazo de 10 dias para preso, 30 dias para solto. Prorrogação pode ser sucessiva, desde que justificada.', 'CPP, art. 10, caput e §2º.', 0),
  ('30f3b921-212d-4e4a-9f23-47b6ea941e11', '1730838e-2243-419a-a2a5-450a4a8cff3f', 'E', 'Errado', true, 'Correta. A lei não veda a prorrogação sucessiva do inquérito policial.', 'Pegadinha clássica: ''prorrogação por uma única vez'' = FALSO.', 'CPP, art. 10, caput e §2º.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100073 (ID: 5bd1f6c2-9b7f-46bc-8c28-4e6ac80238e6)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '5bd1f6c2-9b7f-46bc-8c28-4e6ac80238e6',
  'Q100073',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  'be68efdb-55ed-4b37-823c-260610cf1b11',
  '081878ce-9a40-4245-bda2-b3a1ef8a4128',
  '1959a566-4917-4a82-bb29-e8dac0eed82e',
  'ddbeac41-6a4f-411b-80ce-33fe7a9a16bd',
  'Arts. 24 e 28 do CPP.',
  'O princípio da obrigatoriedade da ação penal pública incondicionada estabelece que, uma vez presentes os requisitos da justa causa (materialidade e indícios de autoria), o Ministério Público é obrigado a oferecer denúncia, não dispondo de discricionariedade para arquivar o inquérito, devendo, se entender pela não propositura, solicitar arquivamento ao juiz, que poderá determinar a instauração de novas diligências ou remeter os autos ao Procurador-Geral.',
  'A assertiva está CERTA. O princípio da obrigatoriedade (ou legalidade) rege a ação penal pública incondicionada: o MP não pode escolher se processa ou não; uma vez presentes os requisitos, deve oferecer denúncia. Se entender que não deve processar, requer o arquivamento ao juiz (art. 28 do CPP). O juiz, discordando, remete os autos ao Procurador-Geral, que pode oferecer denúncia, designar outro promotor ou insistir no arquivamento (aí o juiz fica vinculado). A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('8b92d144-2764-46f4-9638-5f9c90d583a6', '5bd1f6c2-9b7f-46bc-8c28-4e6ac80238e6', 'C', 'Certo', true, 'Correta. O princípio da obrigatoriedade impõe ao MP o dever de denunciar quando houver justa causa.', 'Decore: ação penal pública incondicionada = obrigatoriedade. Ação penal condicionada = pode haver discricionariedade regulamentada.', 'CPP, arts. 24, 28; Doutrina de Eugênio Pacelli.', 0),
  ('2700c6fa-dad4-4ff3-8ebf-10cefa3e2a20', '5bd1f6c2-9b7f-46bc-8c28-4e6ac80238e6', 'E', 'Errado', false, 'Incorreta. A assertiva descreve corretamente o princípio da obrigatoriedade.', 'Não confunda: princípio da obrigatoriedade ≠ princípio da oportunidade (ação penal privada).', 'CPP, arts. 24, 28; Doutrina de Eugênio Pacelli.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100074 (ID: 7f692339-d334-4fbf-ae2a-a6a69498e9d1)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '7f692339-d334-4fbf-ae2a-a6a69498e9d1',
  'Q100074',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '00105a84-81e5-4ebe-9600-0aab117062f1',
  '3961753a-9643-44a0-bda6-58f7e056a491',
  '0d7018e9-3174-49ad-892a-afb179288c43',
  'O roubo é crime complexo, com elemento material e violento.',
  'No crime de roubo (art. 157 do CP), a consumação se dá com a posse da coisa subtraída, ainda que a posse seja momentânea e mesmo que o agente não tenha plena disponibilidade do bem, sendo o crime de roubo próprio classificado como crime material, exigindo o resultado naturalístico (subtração).',
  'A assertiva está CERTA. O roubo é crime material, consuma-se com a inversão da posse da coisa (apreensão pelo agente), ainda que não tenha a posse mansa e pacífica ou que seja logo recuperado pela vítima. A jurisprudência do STJ é firme: ''o crime de roubo se consuma no momento em que o agente tem a posse da coisa, ainda que não tenha a disponibilidade plena'' (HC 175.260/SP). A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('4fa084bf-d3d9-494c-83e3-bf526b9f52b3', '7f692339-d334-4fbf-ae2a-a6a69498e9d1', 'C', 'Certo', true, 'Correta. A consumação do roubo se dá com a posse da coisa, ainda que momentânea.', 'Decore: consumação do roubo = inversão da posse. Tentativa = se a vítima resiste e o agente não consegue levar a coisa.', 'Art. 157 do CP; STJ, HC 175.260/SP.', 0),
  ('5f62bf30-5983-48bc-b537-9e1f270d1028', '7f692339-d334-4fbf-ae2a-a6a69498e9d1', 'E', 'Errado', false, 'Incorreta. O roubo se consuma com a posse, mesmo que breve.', 'Pegadinha: ''roubo só se consuma se o agente tiver disponibilidade plena'' = FALSO.', 'Art. 157 do CP; STJ, HC 175.260/SP.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100075 (ID: bc1f437c-a4ea-46b0-a78c-72b6c58bfe76)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'bc1f437c-a4ea-46b0-a78c-72b6c58bfe76',
  'Q100075',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '4aba9175-b561-4434-abbc-fc3ae2475a51',
  '9e45d174-9e4a-47ee-a870-f1fb5a1ee371',
  'cbeab99a-818f-4bdf-81a4-51d4fba1c1ad',
  'Art. 311 do CPP.',
  'A prisão preventiva pode ser decretada em qualquer fase da investigação policial ou do processo penal, de ofício pelo juiz, a requerimento do Ministério Público, do querelante ou do assistente, ou ainda por representação da autoridade policial.',
  'A assertiva está ERRADA. A prisão preventiva pode ser decretada em qualquer fase da investigação ou do processo, mas o juiz só pode decretá-la de ofício no curso da ação penal (após o recebimento da denúncia ou queixa), conforme §2º do art. 311 do CPP. Na fase do inquérito policial, o juiz não pode decretar preventiva de ofício; depende de representação da autoridade policial ou requerimento do MP/querelante. A assertiva erra ao dizer ''de ofício pelo juiz em qualquer fase''.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('b3d360ef-87f9-4f69-bf43-920e9707f5d1', 'bc1f437c-a4ea-46b0-a78c-72b6c58bfe76', 'C', 'Certo', false, 'Incorreta. Na fase inquisitorial, o juiz não pode decretar preventiva de ofício.', 'Decore: juiz decreta de ofício apenas depois de instaurada a ação penal. Antes, precisa de representação/requerimento.', 'CPP, art. 311, caput e §2º.', 0),
  ('973d5e4d-eb21-484f-8c91-c7ee56561a32', 'bc1f437c-a4ea-46b0-a78c-72b6c58bfe76', 'E', 'Errado', true, 'Correta. A assertiva erra ao afirmar que o juiz pode decretar de ofício em qualquer fase.', 'Pegadinha clássica: ''juiz pode decretar preventiva de ofício em qualquer fase'' = FALSO.', 'CPP, art. 311, caput e §2º.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100076 (ID: 258f93f7-ae63-4456-8da8-bdec8bd5b7c4)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '258f93f7-ae63-4456-8da8-bdec8bd5b7c4',
  'Q100076',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  'be68efdb-55ed-4b37-823c-260610cf1b11',
  '081878ce-9a40-4245-bda2-b3a1ef8a4128',
  '1959a566-4917-4a82-bb29-e8dac0eed82e',
  '0c257543-3679-4249-8e91-95b8c6f11381',
  'Art. 109, IV e V, da CF/88.',
  'A competência para processar e julgar crimes cometidos em detrimento de bens, serviços ou interesses da União é da Justiça Federal, abrangendo também os crimes contra órgãos autárquicos federais, empresas públicas federais e sociedades de economia mista federais, independentemente da natureza da empresa prestar serviço público ou explorar atividade econômica.',
  'A assertiva está ERRADA. A Justiça Federal processa crimes contra bens, serviços ou interesses da União, autarquias e empresas públicas federais (art. 109, IV e V, CF/88). No entanto, a jurisprudência do STF e STJ tem diferenciado: se a empresa pública ou sociedade de economia mista federal explora atividade econômica (ex: Banco do Brasil, Petrobras em atividades não-monopólio), a competência pode ser da Justiça Estadual, salvo se houver interesse direto da União. A assertiva erra ao afirmar ''independentemente da natureza''.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('f8dea295-14c4-4365-a33e-76207e7ccd8d', '258f93f7-ae63-4456-8da8-bdec8bd5b7c4', 'C', 'Certo', false, 'Incorreta. Para empresas públicas que exploram atividade econômica, a competência pode ser estadual.', 'Decore: empresas públicas prestadoras de serviço público → Justiça Federal. Empresas públicas exploradoras de atividade econômica → Justiça Estadual.', 'Art. 109, IV e V da CF/88; Súmula 42 do STJ; STF, RE 228.825.', 0),
  ('ebbef4c9-1da3-4a78-956a-45899099c207', '258f93f7-ae63-4456-8da8-bdec8bd5b7c4', 'E', 'Errado', true, 'Correta. A competência da Justiça Federal depende da natureza da atividade da empresa.', 'Pegadinha: banca afirma ''sempre Justiça Federal'' → FALSO quando empresa explora atividade econômica.', 'Art. 109, IV e V da CF/88; Súmula 42 do STJ; STF, RE 228.825.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100077 (ID: 3cd835b9-b878-47e7-a2f3-5b108ab622bc)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '3cd835b9-b878-47e7-a2f3-5b108ab622bc',
  'Q100077',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '79598e72-7696-43ff-9ad6-adadfa6d0ec0',
  'a59302ed-b918-44af-bbab-e459309186b6',
  '40dcac3d-5510-4b0f-a0e0-265ba1e148f2',
  '8e9ddfe7-ed9a-4b96-a06b-0d35675d2d2d',
  'Lei 14.133/2021 e Lei 8.666/93.',
  'As cláusulas exorbitantes nos contratos administrativos, como a possibilidade de alteração unilateral e de rescisão unilateral por interesse público, são prerrogativas da Administração Pública que decorrem do princípio da supremacia do interesse público, não sendo aplicáveis às empresas estatais que explorem atividade econômica em regime de concorrência.',
  'A assertiva está CERTA. As cláusulas exorbitantes (alteração e rescisão unilateral, fiscalização, etc.) são inerentes aos contratos administrativos, com fundamento no princípio da supremacia do interesse público. No entanto, para as empresas estatais (empresas públicas e sociedades de economia mista) que explorem atividade econômica em sentido estrito (art. 173 da CF/88), o regime é de direito privado, e as cláusulas exorbitantes não são aplicáveis de forma automática, conforme entendimento do STF (ARE 766.618). A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('6b29e49d-4c4a-4df5-81b2-6188d29877c8', '3cd835b9-b878-47e7-a2f3-5b108ab622bc', 'C', 'Certo', true, 'Correta. Empresas estatais exploradoras de atividade econômica sujeitam-se ao regime de direito privado, sem cláusulas exorbitantes.', 'Decore: contratos administrativos típicos → cláusulas exorbitantes. Empresas estatais econômicas → regime privado.', 'Art. 173 da CF/88; STF, ARE 766.618; Lei 14.133/2021, art. 1º, §2º.', 0),
  ('e4f229cf-7c07-435e-aa07-e4f5a20b024b', '3cd835b9-b878-47e7-a2f3-5b108ab622bc', 'E', 'Errado', false, 'Incorreta. A assertiva está de acordo com a jurisprudência do STF.', 'Cuidado: a banca pode afirmar que ''toda estatal tem cláusulas exorbitantes'' — isso é FALSO para as econômicas.', 'Art. 173 da CF/88; STF, ARE 766.618; Lei 14.133/2021, art. 1º, §2º.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100078 (ID: 5ae9c4c3-beb3-4e15-9fcd-b355e413c275)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '5ae9c4c3-beb3-4e15-9fcd-b355e413c275',
  'Q100078',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '00105a84-81e5-4ebe-9600-0aab117062f1',
  'db51f55a-53cb-424b-b740-f91456a9808a',
  '2b0a4dc6-9fd0-477a-a7ae-485dd455dc30',
  'Arts. 317 e 333 do CP.',
  'No crime de corrupção passiva (art. 317 do CP), o funcionário público solicita ou recebe vantagem indevida; na corrupção ativa (art. 333 do CP), o particular oferece ou promete vantagem indevida. Se a promesa parte do funcionário (solicitação) e o particular apenas cede, o particular não responde por corrupção ativa, pois a iniciativa do crime foi do funcionário.',
  'A assertiva está ERRADA. Mesmo que a iniciativa seja do funcionário público (solicitação), o particular que aceita e oferece a vantagem incorre no crime de corrupção ativa. O art. 333 não exige que a iniciativa seja do particular; basta oferecer ou prometer vantagem indevida em razão da função. A jurisprudência é firme: ''responde por corrupção ativa o particular que, atendendo à solicitação do funcionário, oferece ou promete vantagem indevida'' (STJ, HC 120.572). A assertiva erra ao afirmar que o particular não responde.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('8e2a8d0b-f7a9-4ed5-ad0c-94aa9c33fbaa', '5ae9c4c3-beb3-4e15-9fcd-b355e413c275', 'C', 'Certo', false, 'Incorreta. O particular responde por corrupção ativa mesmo se a iniciativa foi do funcionário.', 'Decore: corrupção é crime de mão dupla. Funcionário → passiva; particular → ativa, independentemente de quem iniciou.', 'Arts. 317 e 333 do CP; STJ, HC 120.572.', 0),
  ('fd4a975d-e81a-4c94-ab1a-b67d122a8644', '5ae9c4c3-beb3-4e15-9fcd-b355e413c275', 'E', 'Errado', true, 'Correta. O particular que cede à solicitação também comete corrupção ativa.', 'Pegadinha clássica: ''se o funcionário pediu, o particular não responde'' = FALSO.', 'Arts. 317 e 333 do CP; STJ, HC 120.572.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100079 (ID: dd62338c-f659-4876-81a1-11c16731c803)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'dd62338c-f659-4876-81a1-11c16731c803',
  'Q100079',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'JURISPRUDENCIA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '8d936de8-402d-46f1-b92f-eb38e1b89c09',
  '4a642a68-df22-499a-8352-330f1e99c581',
  '9f6fef17-c827-4338-8406-3b5b6e64b708',
  '9017cca4-b429-48d0-8ae8-d7db8a9795f8',
  'Art. 5º, LXVIII, da CF/88.',
  'O habeas corpus é remédio constitucional destinado a proteger o direito de locomoção contra ato ilegal ou abusivo de autoridade, sendo cabível inclusive contra prisão civil por dívida, salvo a do depositário infiel, após a edição da Súmula Vinculante 25 e da Súmula 619 do STF.',
  'A assertiva está ERRADA. O habeas corpus é cabível para proteger o direito de locomoção. A prisão civil por dívida de depositário infiel foi considerada inconstitucional pelo STF (Súmula Vinculante 25: ''É ilícita a prisão civil de depositário infiel''). Atualmente, a única prisão civil cabível é a do devedor de alimentos (art. 5º, LXVII, CF/88). O depositário infiel não pode mais ser preso. A assertiva erra ao afirmar ''exceto a do depositário infiel'' - esta é exceção que não existe mais.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('3d7d912a-a4e9-4b0d-a3af-199e5910ed66', 'dd62338c-f659-4876-81a1-11c16731c803', 'C', 'Certo', false, 'Incorreta. A prisão civil do depositário infiel foi abolida pela Súmula Vinculante 25.', 'Decore: única prisão civil atualmente: devedor de alimentos. Depositário infiel não pode ser preso.', 'Art. 5º, LXVII e LXVIII da CF/88; Súmula Vinculante 25 do STF; Súmula 619 do STF.', 0),
  ('95809bfc-cdf9-4b72-b853-52df41ce57e3', 'dd62338c-f659-4876-81a1-11c16731c803', 'E', 'Errado', true, 'Correta. A assertiva erra ao excluir o depositário infiel da proteção do habeas corpus.', 'Pegadinha: banca diz ''cabe HC para todo mundo, menos depositário infiel'' → isso era antes da SV 25. Hoje não mais.', 'Art. 5º, LXVII e LXVIII da CF/88; Súmula Vinculante 25 do STF; Súmula 619 do STF.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100080 (ID: 94278e5d-497c-41b7-b24f-37aa354f75b8)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '94278e5d-497c-41b7-b24f-37aa354f75b8',
  'Q100080',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '7cbbec89-e04a-4964-9a72-a7a8d86e745e',
  '13e8dd9e-3e83-4b4a-80a5-dfd58d01b2b2',
  '6bd1fc55-797e-4d30-9c92-6adc347b17d2',
  'eda386e4-7cd9-4b59-8d24-d021bc9fe8a0',
  'Lei 13.869/2019, art. 1º.',
  'A Lei de Abuso de Autoridade (Lei 13.869/2019) prevê como sujeito ativo do crime o agente público que exerce função típica de Estado, incluindo policiais civis e militares, mas exclui da sua incidência os membros do Ministério Público e da Magistratura, que respondem por crime de responsabilidade.',
  'A assertiva está ERRADA. A Lei de Abuso de Autoridade (Lei 13.869/2019) aplica-se a todos os agentes públicos, incluindo membros do Ministério Público e da Magistratura (art. 1º, §2º: ''Aplica-se aos membros do Ministério Público, da Magistratura e do Tribunal de Contas da União, no que couber''). Eles não estão excluídos; respondem por abuso de autoridade da mesma forma, ressalvadas as prerrogativas funcionais. A assertiva erra ao afirmar que são excluídos.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('c12f2fb9-e365-4ac4-97e2-c94696f82ea1', '94278e5d-497c-41b7-b24f-37aa354f75b8', 'C', 'Certo', false, 'Incorreta. A lei se aplica também a magistrados e membros do MP.', 'Decore: abuso de autoridade atinge todos os agentes públicos, sem exceção de magistrados ou MP.', 'Lei 13.869/2019, art. 1º, §2º.', 0),
  ('c7259d68-a26e-4714-abba-613684dcdf9e', '94278e5d-497c-41b7-b24f-37aa354f75b8', 'E', 'Errado', true, 'Correta. A assertiva está errada ao excluir MP e magistratura.', 'Pegadinha: banca diz ''MP e juízes não respondem por abuso de autoridade'' → FALSO.', 'Lei 13.869/2019, art. 1º, §2º.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100081 (ID: 258ddfe4-8abb-4231-9529-caf040604ed2)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '258ddfe4-8abb-4231-9529-caf040604ed2',
  'Q100081',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '7cbbec89-e04a-4964-9a72-a7a8d86e745e',
  '309518b5-6521-4a17-baeb-02d1c3eb95cf',
  '0217c869-24f8-4606-a925-3c562e310834',
  'c8e06526-fb40-466e-bf48-d05b33a250bb',
  'Art. 5º da Lei 11.340/2006.',
  'A Lei Maria da Penha (Lei 11.340/2006) define a violência doméstica e familiar como qualquer ação ou omissão baseada no gênero que lhe cause morte, lesão, sofrimento físico, sexual ou psicológico, dano moral ou patrimonial, sendo necessária, para sua caracterização, a existência de relação íntima de afeto entre a vítima e o agressor, com coabitação.',
  'A assertiva está ERRADA. A Lei Maria da Penha define violência doméstica no art. 5º, e as relações de convivência ou afeto não exigem coabitação. O §2º do art. 5º é claro: ''As relações pessoais enunciadas neste artigo independem de orientação sexual''. Além disso, a relação pode ser apenas de parentesco, ou mesmo sem coabitação (ex: namorados que não moram juntos, ex-companheiros). A assertiva erra ao afirmar ''com coabitação'' como necessária.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('bab82058-c838-4184-aa5b-e66ec116a4d0', '258ddfe4-8abb-4231-9529-caf040604ed2', 'C', 'Certo', false, 'Incorreta. A coabitação não é exigida pela Lei Maria da Penha.', 'Decore: violência doméstica pode ocorrer sem coabitação (ex: namoro, ex-companheiros, pais que não moram com filhos).', 'Lei 11.340/2006, art. 5º, caput e §2º.', 0),
  ('9beb808f-75ca-4db8-b647-7dc47fd8549d', '258ddfe4-8abb-4231-9529-caf040604ed2', 'E', 'Errado', true, 'Correta. A assertiva erra ao condicionar a violência doméstica à coabitação.', 'Pegadinha clássica: banca afirma ''é necessário coabitação'' → FALSO.', 'Lei 11.340/2006, art. 5º, caput e §2º.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100082 (ID: cdf9b990-792f-4bf4-bd0f-4ed3d963846b)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'cdf9b990-792f-4bf4-bd0f-4ed3d963846b',
  'Q100082',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '7cbbec89-e04a-4964-9a72-a7a8d86e745e',
  '8000db81-fc2d-4a88-941b-a1bb6ea276ad',
  '9e73d41f-81cb-4544-ba0d-dd1cd225aaef',
  'f763ccce-2987-4805-a37f-ea068051b683',
  'Lei 8.069/1990 (ECA), arts. 112 e 121.',
  'O adolescente que pratica ato infracional análogo a crime hediondo está sujeito à medida socioeducativa de internação, por prazo determinado de até 3 (três) anos, sendo vedada a aplicação de qualquer medida restritiva de direitos anterior à internação, em razão da gravidade do ato.',
  'A assertiva está ERRADA. A internação do adolescente (art. 121 do ECA) não tem prazo máximo de 3 anos, mas sim de 3 anos, salvo determinação judicial fundamentada (máximo de 3 anos, podendo ser prorrogada por mais 3 anos em casos excepcionais, até o máximo de 3 anos? Na verdade, o ECA prevê prazo máximo de 3 anos, mas a doutrina e jurisprudência admitem que, em casos de atos infracionais graves (inclusive hediondos), pode haver reavaliação a cada 6 meses, podendo ultrapassar 3 anos se necessário à ressocialização. Além disso, a assertiva erra ao dizer que ''é vedada qualquer medida restritiva de direitos anterior à internação'' - o juiz pode aplicar outras medidas (semiliberdade, prestação de serviços, etc.) antes da internação, conforme art. 112 do ECA.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('ee8cfdb1-d6d3-4d09-ab8b-f17aa7a4feaa', 'cdf9b990-792f-4bf4-bd0f-4ed3d963846b', 'C', 'Certo', false, 'Incorreta. A internação pode ultrapassar 3 anos em casos excepcionais, e outras medidas podem antecedê-la.', 'Decore: prazo máximo de internação é 3 anos, mas pode ser prorrogado por mais 3 anos em casos excepcionais (total de 6 anos).', 'ECA, arts. 112 e 121.', 0),
  ('e2f201ca-5b87-4eca-981a-3f43d3bbb5b9', 'cdf9b990-792f-4bf4-bd0f-4ed3d963846b', 'E', 'Errado', true, 'Correta. A assertiva erra ao afirmar prazo fixo de 3 anos (pode ser prorrogado) e ao vedar outras medidas.', 'Cuidado: a banca pode dizer ''internação máxima 3 anos'' ignorando a prorrogação excepcional.', 'ECA, arts. 112 e 121.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100083 (ID: 5cada530-c033-45b6-a28c-4a9647e8612c)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '5cada530-c033-45b6-a28c-4a9647e8612c',
  'Q100083',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  'a6edd91e-2c37-4d2d-9cb8-9306b2cd45d4',
  '057f2250-f7c9-466c-972a-2b809014c3ff',
  '66556bc5-4ece-4cbe-9d18-8d04cd6c44c5',
  'ca2fc923-391a-43aa-92af-d279082a54c3',
  'Princípio da legalidade no uso da força (ONU, Código de Conduta).',
  'O princípio da legalidade na atuação policial exige que o agente de segurança pública só pode agir com base em previsão legal, não sendo permitido o uso da força para prevenir um crime se não houver autorização expressa na lei, ainda que haja iminente perigo.',
  'A assertiva está ERRADA. O princípio da legalidade na atuação policial não é absoluto ao ponto de vedar a prevenção iminente de crime sem autorização legal expressa. Os agentes de segurança pública têm o dever de agir para proteger a vida e a integridade das pessoas, com base nos princípios da necessidade e proporcionalidade. O Código de Processo Penal (art. 284, 301, etc.) autoriza a prisão em flagrante e o uso moderado da força para impedir a prática de crime. Além disso, o estado de necessidade justifica o uso da força para evitar perigo iminente. A assertiva erra ao afirmar ''ainda que haja iminente perigo'' - exatamente no iminente perigo o uso da força é autorizado.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('3815ef08-6ba7-4fd8-9e3e-508d9336519a', '5cada530-c033-45b6-a28c-4a9647e8612c', 'C', 'Certo', false, 'Incorreta. O uso da força é permitido em situações de iminente perigo, mesmo sem autorização legal específica.', 'Decore: legalidade na polícia não exclui a atuação em estado de necessidade ou flagrante.', 'CPP, arts. 284, 301; princípios da necessidade e proporcionalidade.', 0),
  ('c38b27a8-2da4-41f1-9fb0-08799eac9664', '5cada530-c033-45b6-a28c-4a9647e8612c', 'E', 'Errado', true, 'Correta. A assertiva erra ao vedar o uso da força em iminente perigo.', 'Pegadinha: banca diz ''não pode usar força sem autorização legal, mesmo em perigo'' = FALSO.', 'CPP, arts. 284, 301; princípios da necessidade e proporcionalidade.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100084 (ID: d5bf2f61-69de-42b1-be43-8b9b52533c64)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'd5bf2f61-69de-42b1-be43-8b9b52533c64',
  'Q100084',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'a27fc0f0-1bb2-4131-9177-f462e7144b4b',
  'a179cefd-35c4-47ee-9859-f1440ba7312c',
  'c02d6619-172e-4eca-b9bf-c1258cc996e7',
  '0afbb6d0-1077-4d93-b276-749570de5ff1',
  'Classificação de Mendelsohn e von Hentig.',
  'A vitimologia, ramo da criminologia, classifica as vítimas em, por exemplo, vítima provocadora (aquela que, por sua conduta, incita o agente a cometer o crime) e vítima inocente (aquela que não contribui de forma alguma para o evento criminoso), sendo que a classificação pode influenciar na determinação da pena.',
  'A assertiva está CERTA. A vitimologia estuda o papel da vítima no crime. Classificações tradicionais (Mendelsohn, von Hentig) incluem: vítima completamente inocente, vítima provocadora, vítima por ignorância, vítima voluntária, etc. Essa classificação pode influenciar a dosimetria da pena, por exemplo, na atenuante genérica do art. 65, III, ''d'' do CP (relevante valor social ou moral da vítima) ou na compensação de culpas. A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('1dd09d8a-9e1c-4e3f-9b82-6e52e14bde0c', 'd5bf2f61-69de-42b1-be43-8b9b52533c64', 'C', 'Certo', true, 'Correta. A vitimologia classifica vítimas e essa classificação pode influenciar a pena.', 'Decore: vítima contribuiu para o crime? Isso pode atenuar a pena do agente.', 'Doutrina de Mendelsohn e von Hentig; art. 65, III, ''d'' do CP.', 0),
  ('3f8a1144-1b1b-4c76-b692-d16b4f3a65c7', 'd5bf2f61-69de-42b1-be43-8b9b52533c64', 'E', 'Errado', false, 'Incorreta. A assertiva está alinhada com a doutrina vitimológica.', 'Cuidado: a banca pode negar a relevância da classificação da vítima na pena.', 'Doutrina de Mendelsohn e von Hentig; art. 65, III, ''d'' do CP.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100085 (ID: 69d68df6-fffc-49e1-8cc8-9bdad47f946b)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '69d68df6-fffc-49e1-8cc8-9bdad47f946b',
  'Q100085',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '0828cbf9-a5f5-4a6f-a331-2940fa7220a2',
  '4511ed69-bc74-4df0-ab6d-d14095327a37',
  'd4619e9a-5bf6-4711-9dac-b1f8b68b7c6f',
  '704a5204-3903-4175-a067-9fc9eef676b0',
  'Lei 8.112/90, arts. 116 e 117.',
  'O decoro na função pública, previsto nos códigos de ética e no Regime Jurídico dos Servidores, exige que o agente público mantenha conduta compatível com a moralidade administrativa, vedando práticas como o nepotismo, a utilização do cargo para fins particulares e o tratamento privilegiado a amigos ou familiares.',
  'A assertiva está CERTA. O decoro é um dever ético do servidor público (art. 116, XI, da Lei 8.112/90: ''manter conduta compatível com a moralidade administrativa''). O nepotismo, o uso do cargo em benefício próprio ou de terceiros, e o tratamento privilegiado violam o decoro e os princípios da impessoalidade e moralidade. A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('ca746c01-cf6c-44fa-a01a-a06d6fc1f1ae', '69d68df6-fffc-49e1-8cc8-9bdad47f946b', 'C', 'Certo', true, 'Correta. O decoro exige conduta moral e vedação a favorecimentos pessoais.', 'Decore: nepotismo é vedado pela Súmula Vinculante 13 do STF.', 'Lei 8.112/90, art. 116, XI e art. 117; Súmula Vinculante 13 do STF (nepotismo).', 0),
  ('6bfa49da-3d62-4a54-84f0-3866b7a4d537', '69d68df6-fffc-49e1-8cc8-9bdad47f946b', 'E', 'Errado', false, 'Incorreta. A assertiva está em conformidade com os deveres éticos do servidor.', 'Cuidado: a banca pode dizer que ''nepotismo não viola decoro'' = FALSO.', 'Lei 8.112/90, art. 116, XI e art. 117; Súmula Vinculante 13 do STF.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100086 (ID: fa7a2ed0-45f2-476d-9456-644b9dcd5442)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'fa7a2ed0-45f2-476d-9456-644b9dcd5442',
  'Q100086',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'DOUTRINA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '8faf47c4-d957-4899-bc94-e5efd7104c49',
  'cb2165d5-2395-4140-a9a9-e0bd585fc2b5',
  '8d28ca9e-7702-4f9f-8e93-f1a9a08aedb3',
  '4dbd2f74-46ec-4256-800a-17780cc3adf6',
  'Manual de Redação da Presidência da República.',
  'A redação oficial, em conformidade com o Manual de Redação da Presidência da República, deve pautar-se pela impessoalidade, que significa que o texto não deve conter marcas de opinião pessoal ou emoções do redator, sendo vedado o uso da primeira pessoa do singular e admitido o uso da primeira pessoa do plural apenas em documentos que representem a voz de uma instituição.',
  'A assertiva está CERTA. A impessoalidade na redação oficial exige a ausência de opiniões pessoais, emoções ou juízos de valor. Evita-se o uso da primeira pessoa do singular (''eu''), e a primeira pessoa do plural (''nós'') é admitida quando o redator fala em nome da instituição (ex: ''Consideramos que...''). O Manual de Redação é explícito quanto a isso. A assertiva está correta.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('34789bff-9da2-4511-b2a7-b3da25ff7506', 'fa7a2ed0-45f2-476d-9456-644b9dcd5442', 'C', 'Certo', true, 'Correta. A impessoalidade veda primeira pessoa do singular e admite ''nós'' institucional.', 'Decore: redação oficial = impessoal, clara, concisa, formal, padronizada.', 'Manual de Redação da Presidência da República (2018).', 0),
  ('583061e9-308c-416c-964f-69488a3e529a', 'fa7a2ed0-45f2-476d-9456-644b9dcd5442', 'E', 'Errado', false, 'Incorreta. A assertiva está correta quanto aos princípios da redação oficial.', 'Pegadinha: banca diz ''pode usar eu na redação oficial'' = FALSO.', 'Manual de Redação da Presidência da República (2018).', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100087 (ID: 8bef89bd-b04f-4257-a457-6207b647bbcd)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '8bef89bd-b04f-4257-a457-6207b647bbcd',
  'Q100087',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '3fbb946c-7e7f-4f97-95e0-19b0fa36a387',
  '8d936de8-402d-46f1-b92f-eb38e1b89c09',
  'cd561c69-727e-4b0c-a5e3-09d25feffb87',
  'ed74b589-5403-4f2c-ae23-30b20f0b4ee6',
  '4b09648b-f460-4634-96c8-8bd7ae3007a5',
  'Art. 34 da CF/88.',
  'A intervenção federal no Estado-membro, prevista no art. 34 da CF/88, pode ser decretada pelo Presidente da República, independentemente de autorização do Congresso Nacional, quando se tratar de ''garantir o livre exercício de qualquer dos Poderes nas unidades da Federação'', sendo a autorização legislativa exigida apenas nas hipóteses de ''repelir invasão estrangeira'' ou ''reorganizar as finanças''.',
  'A assertiva está ERRADA. O art. 34 da CF/88 lista as hipóteses de intervenção federal. Em todas elas, é necessária a autorização do Congresso Nacional (art. 36, I), salvo na hipótese de ''repelir invasão estrangeira ou de uma unidade da Federação em outra'' (art. 34, I) e ''garantir o livre exercício de qualquer dos Poderes'' (art. 34, III) — estas duas excepcionam a autorização congressual, segundo o art. 36, §1º? Na verdade, o art. 36, §1º, diz que ''nos casos do art. 34, I e III, a intervenção pode ser decretada sem autorização do Congresso Nacional, devendo este a apreciar no prazo de 24 horas''. A assertiva diz que a autorização legislativa é exigida apenas nas hipóteses de ''repelir invasão estrangeira'' ou ''reorganizar as finanças'' — isso está invertido. As hipóteses que exigem autorização prévia são as outras (como ''reorganizar as finanças''). A assertiva erra ao afirmar que as duas mencionadas exigem autorização.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('7e365d67-d5e6-4d9c-b85c-14bc46ee62eb', '8bef89bd-b04f-4257-a457-6207b647bbcd', 'C', 'Certo', false, 'Incorreta. As hipóteses do art. 34, I e III, dispensam autorização prévia do Congresso.', 'Decore: intervenção federal sem autorização prévia: repelir invasão (art. 34, I) e garantir livre exercício dos Poderes (art. 34, III).', 'CF/88, arts. 34 e 36, §1º.', 0),
  ('306f7790-d396-4fd7-b014-512574667f8c', '8bef89bd-b04f-4257-a457-6207b647bbcd', 'E', 'Errado', true, 'Correta. A assertiva erra ao inverter as hipóteses que exigem ou não autorização.', 'Pegadinha: banca diz ''repelir invasão precisa de autorização'' = FALSO.', 'CF/88, arts. 34 e 36, §1º.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100088 (ID: c339c9f6-b816-49c3-88dd-c609f424f30f)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  'c339c9f6-b816-49c3-88dd-c609f424f30f',
  'Q100088',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  '79598e72-7696-43ff-9ad6-adadfa6d0ec0',
  '218f34e0-a60c-4a53-8830-65141f2d5d02',
  'cabfd043-7e30-441b-8db0-4b0199c727b7',
  '749c6341-1910-4d46-9d57-9d5183813986',
  'Decreto-Lei 200/67 e Lei 13.303/2016.',
  'As empresas públicas, diferentemente das sociedades de economia mista, não podem ter capital privado, sendo o seu capital exclusivamente público, e ambas estão sujeitas ao regime de falência quando exploram atividade econômica em sentido estrito.',
  'A assertiva está ERRADA. As empresas públicas podem ter capital exclusivamente público (100% estatal). Já as sociedades de economia mista têm capital misto (maioria do capital votante do Estado, mas com participação privada). Ambas podem explorar atividade econômica, mas não se sujeitam à falência (Lei 11.101/2005, art. 2º, I: ''Não se aplica a recuperação judicial e a falência às empresas públicas e sociedades de economia mista''). Elas podem sofrer liquidação extrajudicial, mas não falência. A assertiva erra ao afirmar que estão sujeitas à falência.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('05975197-2e5c-4875-8251-628192d69694', 'c339c9f6-b816-49c3-88dd-c609f424f30f', 'C', 'Certo', false, 'Incorreta. Empresas estatais não se submetem à falência.', 'Decore: empresa pública e S.E.M. → não falência; podem ter liquidação extrajudicial.', 'Lei 11.101/2005, art. 2º, I.', 0),
  ('06bbb06e-e816-47ab-9fa9-2da640d74bf5', 'c339c9f6-b816-49c3-88dd-c609f424f30f', 'E', 'Errado', true, 'Correta. A assertiva erra ao afirmar que empresas públicas e S.E.M. estão sujeitas à falência.', 'Pegadinha: banca diz ''estatais podem falir'' = FALSO.', 'Lei 11.101/2005, art. 2º, I.', 1);

-- -----------------------------------------------------------------------------
-- QUESTÃO CODE: Q100089 (ID: 5b3d20fd-ee44-4098-af20-a0f725a97a55)
-- -----------------------------------------------------------------------------
INSERT INTO questoes (
  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",
  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",
  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",
  "criadoEm", "atualizadoEm"
) VALUES (
  '5b3d20fd-ee44-4098-af20-a0f725a97a55',
  'Q100089',
  'ac39611b-8fea-4913-9c37-e7ca6b0424d8', -- tipoQuestaoId (CERTO_ERRADO)
  'INEDITA', -- origem
  'PUBLICADA', -- status
  2026, -- ano
  true, -- isUnique
  'free', -- access
  'publica', -- visibility
  'LEI_SECA', -- tipoCobranca
  '4aed48ad-f96a-413c-9327-e44283ab9d8c', -- autorId (vinculado ao usuário existente)
  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132',
  'c97fbb6e-a1ad-4268-970a-421f7a0da997',
  '53d5e374-bf33-43b3-825a-b6a1bf2950bd',
  '558da9cd-aa1c-43ce-b895-93b5b37c103d',
  '67e67bc5-fc0e-420e-9543-f2efe9b2595a',
  '8414056c-5e74-40b9-8c25-5829cce83ab7',
  'ec374769-2fd4-410c-97d3-c3cf37933b98',
  '00105a84-81e5-4ebe-9600-0aab117062f1',
  'e99a9ea8-4e59-48ae-925b-d165230fd742',
  '903332d4-9100-4b6d-bd0c-c2c529ad7279',
  'Art. 129 do CP.',
  'A lesão corporal de natureza grave, prevista no art. 129, §1º, do CP, exige resultado naturalístico consistente em debilidade permanente de membro, sentido ou função, incapacidade para ocupações habituais por mais de trinta dias ou perigo de vida, sendo que a lesão corporal gravíssima (§2º) inclui a perda ou inutilização do membro, sentido ou função.',
  'A assertiva está CERTA. A lesão grave (art. 129, §1º) exige: I - incapacidade para ocupações habituais por mais de 30 dias; II - perigo de vida; III - debilidade permanente de membro, sentido ou função; IV - antecipação de parto (redação atual). A lesão gravíssima (§2º) inclui: I - perda ou inutilização do membro, sentido ou função; II - incapacidade permanente para o trabalho; III - enfermidade incurável; etc. A assertiva está correta ao descrever os dois níveis.',
  '',
  NOW(),
  NOW()
);

INSERT INTO alternativas (
  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem
) VALUES 
  ('21791ccb-2a10-4930-960c-ef26bbc21180', '5b3d20fd-ee44-4098-af20-a0f725a97a55', 'C', 'Certo', true, 'Correta. A assertiva descreve corretamente as lesões grave e gravíssima.', 'Decore: lesão grave = debilidade permanente; gravíssima = perda ou inutilização.', 'CP, art. 129, §1º e §2º.', 0),
  ('6e65d3d6-42b5-4fe6-9596-99ce12742f8c', '5b3d20fd-ee44-4098-af20-a0f725a97a55', 'E', 'Errado', false, 'Incorreta. A assertiva está de acordo com o CP.', 'Cuidado: a banca pode trocar ''debilidade'' por ''incapacidade'' — são conceitos diferentes.', 'CP, art. 129, §1º e §2º.', 1);

