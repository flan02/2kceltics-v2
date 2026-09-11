/// <reference types="node" />
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearShots() {
  console.log("🗑️ Eliminando todos los registros de la tabla Shot...");

  const result = await prisma.shot.deleteMany({});

  console.log(`✅ Se eliminaron ${result.count} tiros correctamente.`);
}

clearShots()
  .catch((err) => {
    console.error("❌ Error al vaciar la tabla Shot:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
