// src/middleware/visitCounter.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function visitCounter(req: Request, res: NextResponse, next: () => void) {
  if (req.url === '/') {
    // Incrementa el contador de visitas solo si la URL es la página de inicio
    await prisma.visitCounter.update({
      where: { id: 'unique-counter-id' }, // Asegúrate de tener un ID único para el contador
      data: { count: { increment: 1 } },
    });
  }
  next();
}

export default visitCounter;
