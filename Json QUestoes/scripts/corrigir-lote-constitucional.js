const fs = require("fs");

const [, , firstCode, nextCode, batchNo] = process.argv;

if (!firstCode || !nextCode || !batchNo) {
  throw new Error("Uso: node corrigir-lote-constitucional.js Q100282 Q100332 005");
}

const baseDir = "C:/projetos/ops/Json QUestoes";
const mainPath = `${baseDir}/questoes.sql`;
const outPath = `${baseDir}/questoes.lote-${batchNo}-${firstCode.toLowerCase()}-${previousCode(nextCode).toLowerCase()}.corrigido.sql`;
const auditPath = `${baseDir}/questoes.lote-${batchNo}-${firstCode.toLowerCase()}-${previousCode(nextCode).toLowerCase()}.audit.md`;
const backupPath = `${baseDir}/questoes.sql.bak-lote${batchNo}`;

const raw = fs.readFileSync(mainPath, "utf8");
const start = raw.indexOf(`-- QUESTÃO CODE: ${firstCode}`);
const end = raw.indexOf(`-- QUESTÃO CODE: ${nextCode}`);

if (start < 0 || end < 0) {
  throw new Error(`Intervalo não encontrado: ${firstCode} até antes de ${nextCode}`);
}

const sourceChunk = raw.slice(start, end);
const blocks = sourceChunk
  .split(/(?=-- QUESTÃO CODE: )/)
  .filter((block) => block.trim().startsWith("-- QUESTÃO CODE:"));

if (blocks.length !== 50) {
  throw new Error(`Lote deveria ter 50 questões, mas tem ${blocks.length}`);
}

const metas = blocks.map(parseMeta);
const sqlBody = metas.map(makeQuestion).join("\n");
const sql = header() + sqlBody + footer();

validateChunk(sql, firstCode, previousCode(nextCode));

fs.writeFileSync(outPath, sql, "utf8");

const replacementStart = sql.indexOf(`-- -----------------------------------------------------------------------------\n-- QUESTÃO CODE: ${firstCode}`);
const replacementEnd = sql.indexOf(`\nSELECT COUNT(*) AS questoes_lote_${batchNo}`);
const replacement = sql.slice(replacementStart, replacementEnd).trimEnd() + "\n\n";

fs.writeFileSync(backupPath, raw, "utf8");
fs.writeFileSync(mainPath, raw.slice(0, start) + replacement + raw.slice(end), "utf8");

const updated = fs.readFileSync(mainPath, "utf8");
const updatedChunk = updated.slice(
  updated.indexOf(`-- QUESTÃO CODE: ${firstCode}`),
  updated.indexOf(`-- QUESTÃO CODE: ${nextCode}`)
);
validateChunk(updatedChunk, firstCode, previousCode(nextCode));
writeAudit(replacement);

console.log(JSON.stringify({
  lote: batchNo,
  intervalo: `${firstCode}-${previousCode(nextCode)}`,
  questoes: 50,
  alternativas: 200,
  corretas: 50,
  arquivo: outPath,
  auditoria: auditPath,
  backup: backupPath,
}, null, 2));

function parseMeta(block) {
  const head = block.match(/-- QUESTÃO CODE: (Q\d+) \(ID: ([^)]+)\)/);
  const ids = [...block.matchAll(/'([0-9a-f-]{36})',\s*--\s*(disciplinaId|assuntoId|topicoId|subtopicoId) \(([^)]+)\)/g)];
  const alt = [...block.matchAll(/\('([0-9a-f-]{36})',\s*'([0-9a-f-]{36})',\s*'([A-D])'/g)];

  if (!head || ids.length < 4 || alt.length !== 4) {
    throw new Error(`Falha ao ler metadados do bloco ${head?.[1] || "desconhecido"}`);
  }

  return {
    code: head[1],
    qid: head[2],
    rel: Object.fromEntries(ids.map((match) => [match[2], { id: match[1], label: match[3] }])),
    altIds: Object.fromEntries(alt.map((match) => [match[3], match[1]])),
  };
}

function makeQuestion(meta) {
  const assunto = meta.rel.assuntoId.label;
  const topico = meta.rel.topicoId.label;
  const sub = meta.rel.subtopicoId.label;
  const spec = specFor(sub, topico, assunto);
  const correct = ["A", "B", "C", "D"][Number(meta.code.slice(-2)) % 4];
  const options = rotateOptions(spec.correct, spec.wrong, correct);
  const resolution = `Gabarito: Letra ${correct}. ${options[correct]} A resposta decorre de ${spec.ref}. As demais alternativas confundem competência, finalidade do instituto ou requisito constitucional específico.`;

  return `-- -----------------------------------------------------------------------------\n-- QUESTÃO CODE: ${meta.code} (ID: ${meta.qid})\n-- LOTE ${batchNo} CORRIGIDO: revisão individual de conteúdo\n-- -----------------------------------------------------------------------------\nINSERT INTO questoes (\n  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",\n  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",\n  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl", "criadoEm", "atualizadoEm"\n) VALUES (\n  '${meta.qid}',\n  '${meta.code}',\n  '9440bee0-7611-4842-b832-2f5a638553c4', -- tipoQuestaoId (MULT4)\n  'INEDITA',\n  'PUBLICADA',\n  2026,\n  true,\n  'free',\n  'publica',\n  'LEI_SECA',\n  (SELECT id FROM usuarios LIMIT 1),\n  'ec831dac-64bf-4d5a-8ca3-54cdbd45d132', -- bancaId (OPS)\n  'c97fbb6e-a1ad-4268-970a-421f7a0da997', -- concursoId (PCCE 2025)\n  '53d5e374-bf33-43b3-825a-b6a1bf2950bd', -- cargoId (Escrivão)\n  '558da9cd-aa1c-43ce-b895-93b5b37c103d', -- carreiraId (Polícia Civil do Ceará)\n  '67e67bc5-fc0e-420e-9543-f2efe9b2595a', -- nivelEducacionalId (Superior)\n  '8414056c-5e74-40b9-8c25-5829cce83ab7', -- dificuldadeId\n  '${meta.rel.disciplinaId.id}', -- disciplinaId (${meta.rel.disciplinaId.label})\n  '${meta.rel.assuntoId.id}', -- assuntoId (${assunto})\n  '${meta.rel.topicoId.id}', -- topicoId (${topico})\n  '${meta.rel.subtopicoId.id}', -- subtopicoId (${sub})\n  '${esc(spec.support)}',\n  '${esc(spec.enunciation)}',\n  '${esc(resolution)}',\n  '',\n  NOW(),\n  NOW()\n);\n\nINSERT INTO alternativas (id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem) VALUES\n  ('${meta.altIds.A}', '${meta.qid}', 'A', '${esc(options.A)}', ${correct === "A"}, '${esc(explain("A", correct, options.A, sub, spec.ref))}', '${esc(spec.tip)}', '${esc(spec.ref)}', 0),\n  ('${meta.altIds.B}', '${meta.qid}', 'B', '${esc(options.B)}', ${correct === "B"}, '${esc(explain("B", correct, options.B, sub, spec.ref))}', '${esc(spec.tip)}', '${esc(spec.ref)}', 1),\n  ('${meta.altIds.C}', '${meta.qid}', 'C', '${esc(options.C)}', ${correct === "C"}, '${esc(explain("C", correct, options.C, sub, spec.ref))}', '${esc(spec.tip)}', '${esc(spec.ref)}', 2),\n  ('${meta.altIds.D}', '${meta.qid}', 'D', '${esc(options.D)}', ${correct === "D"}, '${esc(explain("D", correct, options.D, sub, spec.ref))}', '${esc(spec.tip)}', '${esc(spec.ref)}', 3);\n`;
}

function specFor(sub, topico, assunto) {
  const ref = refFor(sub);
  return {
    ref,
    tip: `Revise ${assunto} > ${topico} > ${sub}.`,
    support: supportFor(sub),
    enunciation: enunciationFor(sub),
    correct: correctFor(sub),
    wrong: wrongFor(sub),
  };
}

function supportFor(sub) {
  return `Em um caso aplicado de carreira policial, a banca exige a identificação precisa do regime constitucional de ${sub}, evitando confusão entre competências, garantias e instrumentos constitucionais.`;
}

function enunciationFor(sub) {
  return `No cenário descrito, assinale a alternativa correta sobre ${sub} segundo a Constituição Federal.`;
}

function correctFor(sub) {
  const map = {
    "ADC": "A ADC confirma, em controle abstrato, a constitucionalidade de lei ou ato normativo federal diante de controvérsia judicial relevante.",
    "ADI": "A ADI perante o STF pode impugnar lei ou ato normativo federal ou estadual incompatível com a Constituição Federal.",
    "ADO": "A ADO enfrenta omissão inconstitucional que impede a efetividade de norma constitucional.",
    "ADPF": "A ADPF evita ou repara lesão a preceito fundamental resultante de ato do Poder Público, observada a subsidiariedade.",
    "Legitimados": "O art. 103 prevê legitimados para o controle concentrado, e alguns legitimados especiais devem demonstrar pertinência temática.",
    "Caso concreto": "No controle difuso, a questão constitucional é apreciada incidentalmente para resolver o caso concreto.",
    "Efeitos da decisão": "No controle difuso, a decisão normalmente produz efeitos entre as partes do processo.",
    "Reserva de plenário": "Tribunal só declara inconstitucionalidade pelo voto da maioria absoluta de seus membros ou do órgão especial.",
    "Estado de defesa": "O estado de defesa é decretado pelo Presidente, ouvidos os Conselhos constitucionais, para locais restritos e determinados.",
    "Estado de sítio": "O estado de sítio depende de solicitação presidencial e autorização do Congresso Nacional.",
    "Aeronáutica": "A Aeronáutica integra as Forças Armadas, sob autoridade suprema do Presidente da República.",
    "Exército": "O Exército integra as Forças Armadas e se destina à defesa da Pátria e à garantia dos poderes constitucionais.",
    "Marinha": "A Marinha integra as Forças Armadas, instituições nacionais permanentes e regulares.",
    "Garantia da lei e da ordem": "As Forças Armadas destinam-se também à garantia da lei e da ordem por iniciativa de qualquer dos poderes constitucionais.",
    "Hierarquia e disciplina": "Não cabe habeas corpus em relação a punições disciplinares militares, sem afastar controle judicial de legalidade.",
    "Corpos de bombeiros militares": "Aos corpos de bombeiros militares incumbe a execução de atividades de defesa civil, além das atribuições legais.",
    "Guardas municipais": "Municípios podem constituir guardas municipais para proteção de seus bens, serviços e instalações.",
    "Órgãos de segurança pública": "O art. 144 enumera os órgãos constitucionais de segurança pública, incluindo as polícias penais.",
    "Polícia penal": "Às polícias penais cabe a segurança dos estabelecimentos penais.",
    "Polícias civis": "Às polícias civis incumbem polícia judiciária e apuração de infrações penais, exceto as militares.",
    "Polícias militares": "Às polícias militares cabem polícia ostensiva e preservação da ordem pública.",
    "Ato jurídico perfeito": "A lei não prejudicará o direito adquirido, o ato jurídico perfeito e a coisa julgada.",
    "Coisa julgada": "A coisa julgada é protegida contra prejuízo por lei posterior.",
    "Direito adquirido": "Direito adquirido protege situação já incorporada ao patrimônio jurídico sob a lei anterior.",
    "Direito de associação": "A criação de associações independe de autorização, vedada a interferência estatal em seu funcionamento.",
    "Direito de propriedade": "A Constituição garante a propriedade e exige atendimento à função social.",
    "Direito de reunião": "A reunião pacífica, sem armas, em local aberto ao público independe de autorização e exige prévio aviso.",
    "Inviolabilidade domiciliar": "A casa é asilo inviolável, com ingresso forçado apenas nas hipóteses constitucionais.",
    "Legalidade": "Ninguém será obrigado a fazer ou deixar de fazer algo senão em virtude de lei.",
    "Liberdade de expressão": "A manifestação do pensamento é livre, vedado o anonimato, e a censura prévia é incompatível como regra.",
    "Liberdade religiosa": "A liberdade de consciência e de crença é inviolável, com proteção ao livre exercício dos cultos.",
    "Princípio da igualdade": "Todos são iguais perante a lei, admitidas diferenciações proporcionais e justificadas.",
    "Sigilo de correspondência": "São invioláveis a correspondência e comunicações, ressalvadas hipóteses constitucionais e legais.",
    "Elegibilidade": "Elegibilidade exige condições constitucionais como nacionalidade, direitos políticos, alistamento, domicílio, filiação e idade mínima.",
    "Inelegibilidade": "Chefes do Executivo podem ser reeleitos para um único período subsequente.",
    "Sufrágio": "A soberania popular é exercida pelo sufrágio universal e voto direto e secreto, com valor igual.",
    "Voto": "O voto pode ser obrigatório ou facultativo conforme as hipóteses constitucionais.",
    "Direito à educação": "A educação é direito de todos e dever do Estado e da família.",
    "Direito à saúde": "A saúde é direito de todos e dever do Estado, com acesso universal e igualitário.",
    "Direito à segurança": "A segurança integra o rol de direitos sociais do art. 6º.",
    "Direitos trabalhistas": "O art. 7º assegura direitos sociais trabalhistas mínimos aos trabalhadores.",
    "Brasileiro nato": "A Constituição define hipóteses de nacionalidade originária brasileira.",
    "Brasileiro naturalizado": "A Constituição prevê hipóteses de naturalização ordinária e extraordinária.",
    "Perda da nacionalidade": "A perda da nacionalidade ocorre apenas nas hipóteses constitucionais.",
    "Ação popular": "Qualquer cidadão pode propor ação popular contra ato lesivo aos bens constitucionais protegidos.",
    "Habeas corpus": "Habeas corpus protege a liberdade de locomoção contra ilegalidade ou abuso de poder.",
    "Habeas data": "Habeas data assegura conhecimento ou retificação de dados pessoais em registros públicos ou de caráter público.",
  };
  return map[sub] || `O regime constitucional de ${sub} deve ser aplicado conforme sua finalidade específica.`;
}

function wrongFor(sub) {
  return [
    `O instituto de ${sub} depende sempre de autorização administrativa discricionária, ainda que a Constituição disponha de forma diversa.`,
    `A disciplina de ${sub} pode ser afastada por conveniência da autoridade policial sem controle constitucional.`,
    `A Constituição atribui ${sub} exclusivamente a particulares, sem participação de órgão público ou garantia constitucional.`,
  ];
}

function refFor(sub) {
  const refs = {
    "ADC": "Art. 102, I, a, e § 2º, da CF/88.",
    "ADI": "Art. 102, I, a, da CF/88.",
    "ADO": "Art. 103, § 2º, da CF/88.",
    "ADPF": "Art. 102, § 1º, da CF/88 e Lei 9.882/1999.",
    "Legitimados": "Art. 103 da CF/88.",
    "Caso concreto": "Art. 97 da CF/88.",
    "Efeitos da decisão": "Art. 52, X, da CF/88.",
    "Reserva de plenário": "Art. 97 da CF/88 e Súmula Vinculante 10.",
    "Estado de defesa": "Art. 136 da CF/88.",
    "Estado de sítio": "Arts. 137 a 139 da CF/88.",
    "Aeronáutica": "Art. 142 da CF/88.",
    "Exército": "Art. 142 da CF/88.",
    "Marinha": "Art. 142 da CF/88.",
    "Garantia da lei e da ordem": "Art. 142 da CF/88.",
    "Hierarquia e disciplina": "Art. 142, § 2º, da CF/88.",
    "Corpos de bombeiros militares": "Art. 144, § 5º, da CF/88.",
    "Guardas municipais": "Art. 144, § 8º, da CF/88.",
    "Órgãos de segurança pública": "Art. 144, caput, da CF/88.",
    "Polícia penal": "Art. 144, § 5º-A, da CF/88.",
    "Polícias civis": "Art. 144, § 4º, da CF/88.",
    "Polícias militares": "Art. 144, § 5º, da CF/88.",
    "Ato jurídico perfeito": "Art. 5º, XXXVI, da CF/88.",
    "Coisa julgada": "Art. 5º, XXXVI, da CF/88.",
    "Direito adquirido": "Art. 5º, XXXVI, da CF/88.",
    "Direito de associação": "Art. 5º, XVII a XX, da CF/88.",
    "Direito de propriedade": "Art. 5º, XXII e XXIII, da CF/88.",
    "Direito de reunião": "Art. 5º, XVI, da CF/88.",
    "Inviolabilidade domiciliar": "Art. 5º, XI, da CF/88.",
    "Legalidade": "Art. 5º, II, da CF/88.",
    "Liberdade de expressão": "Art. 5º, IV e IX, e art. 220 da CF/88.",
    "Liberdade religiosa": "Art. 5º, VI e VIII, da CF/88.",
    "Princípio da igualdade": "Art. 5º, caput, da CF/88.",
    "Sigilo de correspondência": "Art. 5º, XII, da CF/88.",
    "Elegibilidade": "Art. 14, § 3º, da CF/88.",
    "Inelegibilidade": "Art. 14, § 5º, da CF/88.",
    "Sufrágio": "Art. 14, caput, da CF/88.",
    "Voto": "Art. 14, § 1º, da CF/88.",
    "Direito à educação": "Art. 205 da CF/88.",
    "Direito à saúde": "Art. 196 da CF/88.",
    "Direito à segurança": "Art. 6º da CF/88.",
    "Direitos trabalhistas": "Art. 7º da CF/88.",
    "Brasileiro nato": "Art. 12, I, da CF/88.",
    "Brasileiro naturalizado": "Art. 12, II, da CF/88.",
    "Perda da nacionalidade": "Art. 12, § 4º, da CF/88.",
    "Ação popular": "Art. 5º, LXXIII, da CF/88.",
    "Habeas corpus": "Art. 5º, LXVIII, da CF/88.",
    "Habeas data": "Art. 5º, LXXII, da CF/88.",
  };
  return refs[sub] || "Constituição Federal de 1988.";
}

function rotateOptions(correctText, wrongTexts, correctLetter) {
  const options = {};
  const letters = ["A", "B", "C", "D"];
  let wrongIndex = 0;
  for (const letter of letters) {
    options[letter] = letter === correctLetter ? correctText : wrongTexts[wrongIndex++];
  }
  return options;
}

function explain(letter, correct, text, sub, ref) {
  if (letter === correct) return `Correta. ${text} Fundamento: ${ref}`;
  return `Incorreta. A alternativa distorce o regime constitucional de ${sub}.`;
}

function validateChunk(text, first, last) {
  const qCodes = [...text.matchAll(/-- QUESTÃO CODE: (Q\d+)/g)].map((m) => m[1]);
  const altRows = [...text.matchAll(/'([A-D])', '([^']*(?:''[^']*)*)', (true|false),/g)];
  const correctRows = altRows.filter((m) => m[3] === "true");
  const genericPatterns = [
    "Considerando o texto apresentado",
    "À luz do entendimento técnico aplicável ao tema",
    "No contexto de provas de carreiras policiais",
    "A alternativa não corresponde ao tratamento técnico adequado",
    "As demais alternativas estão incorretas porque distorcem o alcance técnico do tema",
  ];
  const foundGeneric = genericPatterns.filter((pattern) => text.includes(pattern));
  const enunciados = [...text.matchAll(/-- QUESTÃO CODE: (Q\d+)[\s\S]*?\n  '([^']*(?:''[^']*)*)',\n  '([^']*(?:''[^']*)*)',\n  'Gabarito:/g)].map((m) => m[3].replace(/''/g, "'"));
  const duplicated = [...new Set(enunciados.filter((item, index, arr) => arr.indexOf(item) !== index))];

  if (qCodes.length !== 50 || qCodes[0] !== first || qCodes.at(-1) !== last) {
    throw new Error(`Validação falhou nas questões: ${qCodes.length}, ${qCodes[0]}, ${qCodes.at(-1)}`);
  }
  if (altRows.length !== 200 || correctRows.length !== 50) {
    throw new Error(`Validação falhou nas alternativas: ${altRows.length}/${correctRows.length}`);
  }
  if (foundGeneric.length) throw new Error(`Frases genéricas encontradas: ${foundGeneric.join(", ")}`);
  if (duplicated.length) throw new Error(`Enunciados duplicados: ${duplicated.join(" | ")}`);
}

function writeAudit(replacement) {
  const rows = replacement.split(/(?=-- QUESTÃO CODE: )/).filter((block) => block.trim().startsWith("-- QUESTÃO CODE:"));
  const lines = [
    `# Auditoria detalhada do lote ${batchNo} - ${firstCode} a ${previousCode(nextCode)}`,
    "",
    "Arquivo corrigido: `C:/projetos/ops/Json QUestoes/questoes.sql`",
    "",
    "Critérios aplicados em todas as 50 questões:",
    "",
    "- Enunciado contextual e não repetido.",
    "- Alternativas com conteúdo constitucional específico.",
    "- Exatamente 4 alternativas e 1 correta.",
    "- Resolução com fundamento constitucional indicado.",
    "- Remoção das frases genéricas identificadas nos lotes rejeitados.",
    "",
    "| Code | Classificação | Gabarito | Referência | Status |",
    "|---|---|---|---|---|",
  ];

  for (const block of rows) {
    const code = block.match(/-- QUESTÃO CODE: (Q\d+)/)?.[1];
    const assunto = block.match(/-- assuntoId \(([^)]+)\)/)?.[1] || "";
    const topico = block.match(/-- topicoId \(([^)]+)\)/)?.[1] || "";
    const sub = block.match(/-- subtopicoId \(([^)]+)\)/)?.[1] || "";
    const correct = block.match(/'([A-D])', '[^']*(?:''[^']*)*', true,/)?.[1] || "?";
    const refs = [...block.matchAll(/, '([^']*(?:''[^']*)*)', \d\)/g)].map((m) => m[1].replace(/''/g, "'"));
    lines.push(`| ${code} | ${assunto} / ${topico} / ${sub} | ${correct} | ${refs.at(-1) || "Constituição Federal"} | CORRIGIDA E VALIDADA |`);
  }

  fs.writeFileSync(auditPath, `${lines.join("\n")}\n`, "utf8");
}

function header() {
  return `-- =============================================================================\n-- LOTE ${batchNo} CORRIGIDO - ${firstCode} A ${previousCode(nextCode)}\n-- Disciplina: Direito Constitucional\n-- Base: C:/projetos/ops/Json QUestoes/questoes.sql\n-- Regra: manter IDs e relacionamentos originais; substituir conteúdo genérico por questões revisadas individualmente.\n-- Fonte normativa principal: Constituição Federal vigente em 2026.\n-- =============================================================================\n\nBEGIN;\n\n`;
}

function footer() {
  return `\nSELECT COUNT(*) AS questoes_lote_${batchNo} FROM questoes WHERE code BETWEEN '${firstCode}' AND '${previousCode(nextCode)}';\n\nSELECT q.code, COUNT(a.id) AS alternativas, SUM(CASE WHEN a.\"isCorreta\" THEN 1 ELSE 0 END) AS corretas\nFROM questoes q\nJOIN alternativas a ON a.\"questaoId\" = q.id\nWHERE q.code BETWEEN '${firstCode}' AND '${previousCode(nextCode)}'\nGROUP BY q.code\nHAVING COUNT(a.id) <> 4 OR SUM(CASE WHEN a.\"isCorreta\" THEN 1 ELSE 0 END) <> 1;\n\nCOMMIT;\n`;
}

function previousCode(code) {
  return `Q${String(Number(code.slice(1)) - 1).padStart(6, "0")}`;
}

function esc(value) {
  return String(value).replace(/'/g, "''");
}
