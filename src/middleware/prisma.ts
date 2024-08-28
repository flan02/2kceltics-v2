import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware para eliminar campos nulos o indefinidos. Evitando asi que vayan como dato NULL a mongodb.
prisma.$use(async (params, next) => {
  if (params.action === 'create' || params.action === 'update') {
    params.args.data = Object.fromEntries(
      Object.entries(params.args.data).filter(([_, v]) => v != null)
    );
  }
  return next(params);
});

export default prisma;


/*
const prisma = new PrismaClient().$extends({
  name: 'cleanNullFields',
  query: {
    async $allOperations({ model, operation, args, query }) {
      if (operation === 'create' || operation === 'update') {
        args.data = Object.fromEntries(
          Object.entries(args.data).filter(([_, v]) => v != null)
        );
      }
      return query(args);
    },
  },
});

export default prisma;
*/







