import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

// Manually load .env file from root directory to ensure DATABASE_URL is available
function loadEnv() {
  const envPath = path.resolve(__dirname, "../../../.env");
  if (fs.existsSync(envPath)) {
    console.log(`Carregando variáveis de ambiente de: ${envPath}`);
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      
      const equalIndex = trimmed.indexOf("=");
      if (equalIndex > 0) {
        const key = trimmed.slice(0, equalIndex).trim();
        let value = trimmed.slice(equalIndex + 1).trim();
        
        // Remove surrounding quotes if they exist
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        
        process.env[key] = value;
      }
    });
  } else {
    console.warn(`Aviso: Arquivo .env não encontrado em ${envPath}`);
  }
}

// Load environment variables before initializing Prisma Client
loadEnv();

const prisma = new PrismaClient();

// Dependency-free UUID v4 generator
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to escape SQL strings
function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return "";
  return str.replace(/'/g, "''");
}

async function main() {
  const jsonPath = path.resolve(__dirname, "../../../Json QUestoes/questoe1.json");
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`JSON file not found at ${jsonPath}`);
  }

  console.log("=== INICIANDO CONVERSÃO E IMPORTAÇÃO ===");
  console.log(`Lendo arquivo JSON: ${jsonPath}`);
  
  const rawContent = fs.readFileSync(jsonPath, "utf8").trim();
  
  // Convert JSON-Lines-like structure (or multiple root objects) into a valid JSON array string
  const jsonArrayString = "[" + rawContent.replace(/\}\s*\{/g, "},{") + "]";
  
  let questions: any[];
  try {
    questions = JSON.parse(jsonArrayString);
  } catch (err: any) {
    console.error("Erro ao analisar o JSON do arquivo questoe1.json:", err.message);
    throw err;
  }

  console.log(`Total de questões encontradas no JSON: ${questions.length}`);

  // Fetch default user
  const defaultUser = await prisma.usuario.findFirst();
  if (!defaultUser) {
    throw new Error("Nenhum usuário cadastrado no banco de dados. Por favor, crie um usuário antes de rodar a importação.");
  }
  console.log(`Usuário de autoria padrão: ${defaultUser.nome} (${defaultUser.email})`);

  // Fetch the highest question code in the database starting with 'Q'
  const maxQuestion = await prisma.questao.findFirst({
    where: {
      code: {
        startsWith: "Q",
      },
    },
    orderBy: {
      code: "desc",
    },
  });

  let nextCodeNum = 100051; // Fallback if none exist
  if (maxQuestion) {
    const codeNum = parseInt(maxQuestion.code.replace(/\D/g, ""), 10);
    if (!isNaN(codeNum)) {
      nextCodeNum = codeNum + 1;
    }
  }
  console.log(`Próximo código de questão disponível: Q${nextCodeNum}`);

  let sql = `-- =============================================================================\n`;
  sql += `-- SQL DE IMPORTAÇÃO DE QUESTÕES DE MÚLTIPLA ESCOLHA (Banca OPS)\n`;
  sql += `-- Total de Questões: ${questions.length}\n`;
  sql += `-- Gerado em: ${new Date().toISOString()}\n`;
  sql += `-- =============================================================================\n\n`;

  let currentCodeNum = nextCodeNum;
  const queriesToRun: string[] = [];

  for (let idx = 0; idx < questions.length; idx++) {
    const q = questions[idx];
    const qId = generateUUID();
    const qCode = `Q${currentCodeNum}`;
    currentCodeNum++;

    // Validation for correct alternatives
    const correctAlts = q.alternativas.filter((alt: any) => alt.isCorreta === true);
    if (correctAlts.length !== 1) {
      console.warn(`[AVISO] Questão ${idx + 1} (${qCode}) possui ${correctAlts.length} alternativas corretas!`);
    }

    // Generate INSERT INTO questoes
    let questionInsert = `INSERT INTO questoes (\n`;
    questionInsert += `  id, code, "tipoQuestaoId", origem, status, ano, "isUnique", access, visibility, "tipoCobranca",\n`;
    questionInsert += `  "autorId", "bancaId", "concursoId", "cargoId", "carreiraId", "nivelEducacionalId", "dificuldadeId",\n`;
    questionInsert += `  "disciplinaId", "assuntoId", "topicoId", "subtopicoId", "textoApoio", enunciado, resolucao, "videoUrl",\n`;
    questionInsert += `  "criadoEm", "atualizadoEm"\n`;
    questionInsert += `) VALUES (\n`;
    questionInsert += `  '${qId}',\n`;
    questionInsert += `  '${qCode}',\n`;
    questionInsert += `  '${q.tipoQuestaoId || "9440bee0-7611-4842-b832-2f5a638553c4"}', -- tipoQuestaoId (MULT4)\n`;
    questionInsert += `  'INEDITA', -- origem\n`;
    questionInsert += `  'PUBLICADA', -- status\n`;
    questionInsert += `  ${q.ano || 2026}, -- ano\n`;
    questionInsert += `  ${q.isUnique !== undefined ? q.isUnique : true}, -- isUnique\n`;
    questionInsert += `  'free', -- access\n`;
    questionInsert += `  '${q.visibility || "publica"}', -- visibility\n`;
    questionInsert += `  '${q.tipoCobranca || "LEI_SECA"}', -- tipoCobranca\n`;
    questionInsert += `  '${defaultUser.id}', -- autorId\n`;
    questionInsert += `  ${q.bancaId ? `'${q.bancaId}'` : "NULL"},\n`;
    questionInsert += `  ${q.concursoId ? `'${q.concursoId}'` : "NULL"},\n`;
    questionInsert += `  ${q.cargoId ? `'${q.cargoId}'` : "NULL"},\n`;
    questionInsert += `  ${q.carreiraId ? `'${q.carreiraId}'` : "NULL"},\n`;
    questionInsert += `  ${q.nivelEducacionalId ? `'${q.nivelEducacionalId}'` : "NULL"},\n`;
    questionInsert += `  ${q.dificuldadeId ? `'${q.dificuldadeId}'` : "NULL"},\n`;
    questionInsert += `  '${q.disciplinaId}',\n`;
    questionInsert += `  ${q.assuntoId ? `'${q.assuntoId}'` : "NULL"},\n`;
    questionInsert += `  ${q.topicoId ? `'${q.topicoId}'` : "NULL"},\n`;
    questionInsert += `  ${q.subtopicoId ? `'${q.subtopicoId}'` : "NULL"},\n`;
    questionInsert += `  '${escapeSql(q.textoApoio)}',\n`;
    questionInsert += `  '${escapeSql(q.enunciado)}',\n`;
    questionInsert += `  '${escapeSql(q.resolucao)}',\n`;
    questionInsert += `  '${escapeSql(q.videoUrl)}',\n`;
    questionInsert += `  NOW(),\n`;
    questionInsert += `  NOW()\n`;
    questionInsert += `);`;

    queriesToRun.push(questionInsert);

    sql += `-- -----------------------------------------------------------------------------\n`;
    sql += `-- QUESTÃO CODE: ${qCode} (ID: ${qId})\n`;
    sql += `-- -----------------------------------------------------------------------------\n`;
    sql += questionInsert + `\n\n`;

    // Generate INSERT INTO alternativas
    if (q.alternativas && q.alternativas.length > 0) {
      let alternativesInsert = `INSERT INTO alternativas (\n`;
      alternativesInsert += `  id, "questaoId", letra, texto, "isCorreta", explicacao, dica, referencia, ordem\n`;
      alternativesInsert += `) VALUES \n`;

      const altValues = q.alternativas.map((alt: any, altIdx: number) => {
        const altId = generateUUID();
        return `  ('${altId}', '${qId}', '${alt.letra}', '${escapeSql(alt.texto)}', ${alt.isCorreta}, '${escapeSql(alt.explicacao)}', '${escapeSql(alt.dica)}', '${escapeSql(alt.referencia)}', ${altIdx})`;
      });

      alternativesInsert += altValues.join(",\n") + ";";
      queriesToRun.push(alternativesInsert);
      sql += alternativesInsert + `\n\n`;
    }
  }

  // Write SQL file
  const sqlOutputPath = path.resolve(__dirname, "../../../Json QUestoes/questoe1.sql");
  fs.writeFileSync(sqlOutputPath, sql, "utf8");
  console.log(`[OK] Arquivo SQL gerado em: ${sqlOutputPath}`);

  // Execute queries in transaction
  console.log("Executando inserções no banco de dados...");
  
  await prisma.$transaction(async (tx) => {
    for (const query of queriesToRun) {
      await tx.$executeRawUnsafe(query);
    }
  }, {
    timeout: 30000 // 30 segundos de timeout
  });

  console.log(`[OK] Importação de ${questions.length} questões concluída com sucesso no banco de dados!`);
}

main()
  .catch((e) => {
    console.error("=== ERRO FATAL NA IMPORTAÇÃO ===", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
