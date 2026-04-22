import { PrismaClient } from '@prisma/client';

/**
 * Singleton instance of the Prisma Client.
 * Enhanced for high-availability and build-time safety in Next.js environment.
 */
const prismaClientSingleton = () => {
  // 1. Detect Build-Time environment
  // Next.js sets NEXT_PHASE during build, but we can also check for CI or missing DATABASE_URL
  const isBuildTime = 
    process.env.NEXT_PHASE === 'phase-production-build' || 
    process.env.CI === 'true' ||
    (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production');

  // 2. Build-time Bypass Logic
  if (isBuildTime && (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('localhost'))) {
    console.log('🏗️ Prisma: Static analysis bypass activated for build optimization.');
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
  
  // 3. Runtime Initialization
  try {
    return new PrismaClient();
  } catch (err) {
    console.error('❌ Prisma Initialization Error:', err);
    // Return proxy as fallback to prevent build crash if initialization fails
    return new Proxy({}, { get: () => () => Promise.reject(new Error('DATABASE_NOT_READY')) }) as any;
  }
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Lazy initialization
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
