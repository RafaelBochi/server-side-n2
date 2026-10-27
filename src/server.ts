import "dotenv/config";
import { criarApp } from "./app.js";
import { prisma } from "./config/prisma.js";
import { PrismaAssinanteRepository } from "./repository/prisma-assinante-repository.js";

const porta = Number(process.env.PORT ?? 3000);
const app = criarApp(new PrismaAssinanteRepository(prisma));
const servidor = app.listen(porta, () => console.log(`API disponível em http://localhost:${porta}`));

async function encerrar(): Promise<void> {
  servidor.close();
  await prisma.$disconnect();
}

process.once("SIGINT", encerrar);
process.once("SIGTERM", encerrar);
