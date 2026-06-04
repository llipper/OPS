import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const sqlPath = path.resolve(__dirname, "../../../Json QUestoes/constitucional.sql");
  if (!fs.existsSync(sqlPath)) {
    throw new Error(`SQL file not found at ${sqlPath}`);
  }

  const sql = fs.readFileSync(sqlPath, "utf8");

  console.log("=== INICIANDO IMPORTAÇÃO DO SQL SEED ===");
  console.log(`Lendo arquivo: ${sqlPath}`);
  
  // Split the SQL file by "-- QUESTÃO CODE:" to process each question and its alternatives block
  const blocks = sql.split(/-- QUESTÃO CODE:/);
  
  let importedCount = 0;
  let skippedCount = 0;
  
  for (const block of blocks) {
    if (!block.trim()) continue;
    
    const lines = block.split("\n");
    const headerLine = lines[0] || "";
    const codeMatch = headerLine.match(/(Q\d+)/);
    const code = codeMatch ? codeMatch[1] : "HEADER";
    
    // We will execute each INSERT statement within the block individually to comply with the driver
    const inserts = block.split(/INSERT INTO/i);
    
    let importedQuestion = false;
    let skippedQuestion = false;
    
    for (let i = 0; i < inserts.length; i++) {
      const trimmed = inserts[i].trim();
      if (!trimmed) continue;
      
      // Skip the first split element (i === 0) since it contains the comments before the first INSERT INTO statement
      if (i === 0) continue;
      
      // Reconstruct the full INSERT statement
      let query = "INSERT INTO " + trimmed;
      if (query.endsWith(";")) {
        query = query.slice(0, -1);
      }
      
      try {
        await prisma.$executeRawUnsafe(query);
        if (query.includes("INTO questoes")) {
          importedQuestion = true;
        }
      } catch (error: any) {
        // Robust check for duplicate keys / unique constraints, including localized (Portuguese) messages
        const isDuplicate = 
          error.code === 'P2002' || 
          (error.meta && error.meta.code === '23505') ||
          (error.message && (
            error.message.includes("unique constraint") || 
            error.message.includes("duplicate key") || 
            error.message.includes("já existe")
          ));
          
        if (isDuplicate) {
          if (query.includes("INTO questoes")) {
            skippedQuestion = true;
            // Break the loop for this block since the question already exists (alternatives will also exist)
            break;
          }
        } else {
          console.error(`[ERRO] Falha ao executar INSERT na Questão ${code}:`, error);
          console.error("Query problemática:", query);
          throw error;
        }
      }
    }
    
    if (importedQuestion && code !== "HEADER") {
      console.log(`[OK] Questão ${code} importada com sucesso.`);
      importedCount++;
    } else if (skippedQuestion && code !== "HEADER") {
      console.log(`[INFO] Questão ${code} já existe no banco. Pulada.`);
      skippedCount++;
    }
  }

  console.log(`=== IMPORTAÇÃO CONCLUÍDA! ===`);
  console.log(`Total de novas questões importadas: ${importedCount}`);
  console.log(`Total de questões já existentes (puladas): ${skippedCount}`);
}

main()
  .catch((e) => {
    console.error("=== ERRO FATAL NO SEED ===", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
