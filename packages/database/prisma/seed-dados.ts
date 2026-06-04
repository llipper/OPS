import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

function cleanVal(val: string | undefined): string | null {
  if (!val) return null;
  let trimmed = val.trim();
  if (trimmed === "" || trimmed === "NULL" || trimmed === "\\N") return null;
  // Remove surrounding quotes if they exist
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    trimmed = trimmed.slice(1, -1);
  }
  return trimmed || null;
}

function cleanNum(val: string | undefined): number | null {
  const cleaned = cleanVal(val);
  if (!cleaned) return null;
  const num = Number(cleaned);
  return isNaN(num) ? null : num;
}

function cleanBool(val: string | undefined): boolean {
  const cleaned = cleanVal(val);
  if (!cleaned) return false;
  return cleaned.toLowerCase() === "true" || cleaned === "1";
}

function isQueryLine(line: string): boolean {
  const t = line.trim();
  if (t.startsWith("--") || t.startsWith("SELECT") || t.startsWith("FROM") || t.startsWith("LEFT JOIN") || t.startsWith("WHERE") || t.startsWith("ORDER BY") || t.startsWith("OR ") || t.endsWith(";") || t.endsWith(",")) return true;
  if (t.includes(" AS ")) return true;
  return false;
}

async function main() {
  const filePath = path.resolve(__dirname, "../../../Json QUestoes/dados.json");
  console.log(`=== INICIANDO PARSER DE DADOS ===`);
  console.log(`Lendo arquivo: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado em: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  
  let currentSection = "";
  let processedCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Detect section header or query line
    if (isQueryLine(line)) {
      if (trimmed.includes("carreira_principal_id")) {
        currentSection = "carreiras";
        console.log(`\n[SEÇÃO] Iniciando Carreiras...`);
      } else if (trimmed.includes("public.bancas")) {
        currentSection = "bancas";
        console.log(`\n[SEÇÃO] Iniciando Bancas...`);
      } else if (trimmed.includes("disciplina_id")) {
        currentSection = "disciplinas";
        console.log(`\n[SEÇÃO] Iniciando Disciplinas...`);
      } else if (trimmed.includes("public.tipos_questao")) {
        currentSection = "tipos_questao";
        console.log(`\n[SEÇÃO] Iniciando Tipos de Questão...`);
      } else if (trimmed.includes("public.niveis_educacionais")) {
        currentSection = "niveis_educacionais";
        console.log(`\n[SEÇÃO] Iniciando Níveis Educacionais...`);
      } else if (trimmed.includes("public.dificuldades")) {
        currentSection = "dificuldades";
        console.log(`\n[SEÇÃO] Iniciando Dificuldades...`);
      }
      continue;
    }

    const parts = line.split("\t");
    if (parts.length <= 1) continue;

    try {
      if (currentSection === "carreiras") {
        const c1_id = cleanVal(parts[0]);
        const c1_nome = cleanVal(parts[1]);
        const c2_id = cleanVal(parts[2]);
        const c2_nome = cleanVal(parts[3]);
        const c3_id = cleanVal(parts[4]);
        const c3_nome = cleanVal(parts[5]);
        const con_id = cleanVal(parts[6]);
        const con_nome = cleanVal(parts[7]);
        const con_ano = cleanNum(parts[8]);
        const car_id = cleanVal(parts[9]);
        const car_nome = cleanVal(parts[10]);

        if (c1_id && c1_nome) {
          await prisma.carreira.upsert({
            where: { id: c1_id },
            update: { nome: c1_nome },
            create: { id: c1_id, nome: c1_nome, ativo: true },
          });
        }
        if (c2_id && c2_nome && c1_id) {
          await prisma.carreira.upsert({
            where: { id: c2_id },
            update: { nome: c2_nome, parentId: c1_id },
            create: { id: c2_id, nome: c2_nome, parentId: c1_id, ativo: true },
          });
        }
        if (c3_id && c3_nome && c2_id) {
          await prisma.carreira.upsert({
            where: { id: c3_id },
            update: { nome: c3_nome, parentId: c2_id },
            create: { id: c3_id, nome: c3_nome, parentId: c2_id, ativo: true },
          });
        }
        if (con_id && con_nome) {
          const carreiraId = c3_id || c2_id || c1_id || null;
          await prisma.concurso.upsert({
            where: { id: con_id },
            update: { nome: con_nome, ano: con_ano, carreiraId },
            create: { id: con_id, nome: con_nome, ano: con_ano, carreiraId, ativo: true },
          });
        }
        if (car_id && car_nome && con_id) {
          await prisma.cargo.upsert({
            where: { id: car_id },
            update: { nome: car_nome, concursoId: con_id },
            create: { id: car_id, nome: car_nome, concursoId: con_id, ativo: true },
          });
        }
      } else if (currentSection === "bancas") {
        const id = cleanVal(parts[0]);
        const nome = cleanVal(parts[1]);
        const sigla = cleanVal(parts[2]);
        const slug = cleanVal(parts[3]);
        const logoUrl = cleanVal(parts[4]);
        const descricao = cleanVal(parts[5]);
        const cor = cleanVal(parts[6]);
        const ordem = cleanNum(parts[7]) || 0;
        const ativo = cleanBool(parts[8]);

        if (id && nome) {
          await prisma.banca.upsert({
            where: { id },
            update: { nome, sigla, slug, logoUrl, descricao, cor, ordem, ativo },
            create: { id, nome, sigla, slug, logoUrl, descricao, cor, ordem, ativo },
          });
        }
      } else if (currentSection === "disciplinas") {
        const disc_id = cleanVal(parts[0]);
        const disc_nome = cleanVal(parts[1]);
        const disc_sigla = cleanVal(parts[2]);
        const ass_id = cleanVal(parts[3]);
        const ass_nome = cleanVal(parts[4]);
        const top_id = cleanVal(parts[5]);
        const top_nome = cleanVal(parts[6]);
        const sub_id = cleanVal(parts[7]);
        const sub_nome = cleanVal(parts[8]);

        if (disc_id && disc_nome) {
          await prisma.disciplina.upsert({
            where: { id: disc_id },
            update: { nome: disc_nome, sigla: disc_sigla || "" },
            create: { id: disc_id, nome: disc_nome, sigla: disc_sigla || "", ativo: true },
          });
        }
        if (ass_id && ass_nome && disc_id) {
          await prisma.assunto.upsert({
            where: { id: ass_id },
            update: { nome: ass_nome, disciplinaId: disc_id },
            create: { id: ass_id, nome: ass_nome, disciplinaId: disc_id, ativo: true },
          });
        }
        if (top_id && top_nome && ass_id) {
          await prisma.topico.upsert({
            where: { id: top_id },
            update: { nome: top_nome, assuntoId: ass_id },
            create: { id: top_id, nome: top_nome, assuntoId: ass_id, ativo: true },
          });
        }
        if (sub_id && sub_nome && top_id) {
          await prisma.subtopico.upsert({
            where: { id: sub_id },
            update: { nome: sub_nome, topicoId: top_id },
            create: { id: sub_id, nome: sub_nome, topicoId: top_id, ativo: true },
          });
        }
      } else if (currentSection === "tipos_questao") {
        const id = cleanVal(parts[0]);
        const nome = cleanVal(parts[1]);
        const slug = cleanVal(parts[2]);
        const formato = cleanVal(parts[3]) || "ALTERNATIVAS";
        const quantidadeAlternativas = cleanNum(parts[4]) || 5;
        const descricao = cleanVal(parts[5]);
        const ordem = cleanNum(parts[6]) || 0;
        const ativo = cleanBool(parts[7]);

        if (id && nome && slug) {
          await prisma.tipoQuestao.upsert({
            where: { id },
            update: { nome, slug, formato, quantidadeAlternativas, descricao, ordem, ativo },
            create: { id, nome, slug, formato, quantidadeAlternativas, descricao, ordem, ativo },
          });
        }
      } else if (currentSection === "niveis_educacionais") {
        const id = cleanVal(parts[0]);
        const nome = cleanVal(parts[1]);
        const slug = cleanVal(parts[2]);
        const descricao = cleanVal(parts[3]);
        const ordem = cleanNum(parts[4]) || 0;
        const ativo = cleanBool(parts[5]);

        if (id && nome && slug) {
          await prisma.nivelEducacional.upsert({
            where: { id },
            update: { nome, slug, descricao, ordem, ativo },
            create: { id, nome, slug, descricao, ordem, ativo },
          });
        }
      } else if (currentSection === "dificuldades") {
        const id = cleanVal(parts[0]);
        const nome = cleanVal(parts[1]);
        const slug = cleanVal(parts[2]);
        const descricao = cleanVal(parts[3]);
        const peso = cleanNum(parts[4]) || 1;
        const ordem = cleanNum(parts[5]) || 0;
        const cor = cleanVal(parts[6]) || "";
        const ativo = cleanBool(parts[7]);

        if (id && nome && slug) {
          await prisma.dificuldade.upsert({
            where: { id },
            update: { nome, slug, descricao, peso, ordem, cor, ativo },
            create: { id, nome, slug, descricao, peso, ordem, cor, ativo },
          });
        }
      }
      processedCount++;
    } catch (err: any) {
      console.error(`[ERRO] Falha ao processar linha na seção ${currentSection}:`, line);
      console.error(err);
      throw err;
    }
  }

  console.log(`\n=== DADOS POPULADOS COM SUCESSO! ===`);
  console.log(`Total de registros processados/sincronizados: ${processedCount}`);
}

main()
  .catch((e) => {
    console.error("=== ERRO FATAL NO SEED DE DADOS ===", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
