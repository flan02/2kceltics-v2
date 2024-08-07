// src/middleware/middleware.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware para eliminar campos nulos o indefinidos
prisma.$use(async (params, next) => {
  if (params.action === 'create' || params.action === 'update') {
    params.args.data = Object.fromEntries(
      Object.entries(params.args.data).filter(([_, v]) => v != null)
    );
  }
  return next(params);
});

export default prisma;
