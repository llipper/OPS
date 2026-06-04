import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const USERS = [
  {
    nome: "Administrador",
    email: "admin@ops.com",
    role: Role.SUPER_ADMIN,
  },
  {
    nome: "Gerente",
    email: "gerente@ops.com",
    role: Role.ADMIN, // Mapeado de ADMIN_INSTITUICAO para ADMIN (conforme Role enum no schema)
  },
  {
    nome: "Professor",
    email: "professor@ops.com",
    role: Role.PROFESSOR,
  },
  {
    nome: "Revisor",
    email: "revisor@ops.com",
    role: Role.REVISOR,
  },
  {
    nome: "Aluno",
    email: "aluno@ops.com",
    role: Role.ALUNO,
  },
  {
    nome: "Suporte",
    email: "suporte@ops.com",
    role: Role.SUPORTE,
  },
];

async function main() {
  console.log("=== INICIANDO SEED DE USUÁRIOS ===");
  const hashedPassword = await bcrypt.hash("ops123", 10);

  for (const user of USERS) {
    const existingUser = await prisma.usuario.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(`[INFO] Usuário ${user.email} já existe. Atualizando cargo...`);
      await prisma.usuario.update({
        where: { email: user.email },
        data: { role: user.role },
      });
    } else {
      console.log(`[CRIANDO] Usuário: ${user.nome} (${user.email}) com cargo ${user.role}`);
      await prisma.usuario.create({
        data: {
          nome: user.nome,
          email: user.email,
          password: hashedPassword,
          role: user.role,
          ativo: true,
        },
      });
    }
  }

  console.log("=== SEED DE USUÁRIOS CONCLUÍDO COM SUCESSO! ===");
}

main()
  .catch((e) => {
    console.error("=== ERRO FATAL NO SEED DE USUÁRIOS ===", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
