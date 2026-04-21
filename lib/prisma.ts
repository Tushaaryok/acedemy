import { PrismaClient } from '@prisma/client';

/**
 * Singleton instance of the Prisma Client.
 * Includes a build-time safety check to prevent connectivity failures 
 * during Next.js static asset collection.
 */
const prismaClientSingleton = () => {
  // Build-time safety: If we're building and using a dummy URL, return a Proxy
  // to avoid PrismaClientInitializationError during 'collecting page data'
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL?.includes('localhost')) {
    console.log('🏗️ Prisma: Build-time bypass active.');
    return new Proxy({}, {
      get: (target, prop) => {
        const mockOp = () => Promise.resolve([]);
        const mockModel = new Proxy({}, {
          get: () => mockOp
        });
        if (prop === '$transaction') return (ops: any) => Promise.all(ops);
        if (prop === '$connect' || prop === '$disconnect') return () => Promise.resolve();
        return mockModel;
      }
    }) as any;
  }
  
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
