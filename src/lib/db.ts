import type { PrismaClient } from "@prisma/client";

// Cliente Prisma PEREZOSO y con importación dinámica: el módulo
// @prisma/client solo se carga cuando una consulta lo necesita, y la
// carga ocurre dentro del try/catch de la capa de datos. Así el sitio
// público renderiza con datos de respaldo aunque falte DATABASE_URL o
// aún no se haya ejecutado `prisma generate` en la máquina local.
const globalForPrisma = globalThis as unknown as {
  prismaPromise?: Promise<PrismaClient>;
};

export function getDb(): Promise<PrismaClient> {
  if (!globalForPrisma.prismaPromise) {
    globalForPrisma.prismaPromise = import("@prisma/client").then(
      ({ PrismaClient }) =>
        new PrismaClient({
          log:
            process.env.NODE_ENV === "development"
              ? ["warn", "error"]
              : ["error"],
        }),
    );
  }
  return globalForPrisma.prismaPromise;
}
