// Siembra las guías editoriales de content.ts en la base (Fase 3,
// 3a parte). Idempotente: upsert por slug y reconstrucción de los
// items por guía. Un ASIN sin producto en base se salta con aviso
// (la página ya filtra hoy los productos no publicados), nunca
// rompe el seed. Correr tras `npx prisma migrate deploy`, con el
// .env apuntando al DATABASE_URL directo de Neon, igual que
// db:import. Hasta que este seed corre, las páginas siguen
// sirviendo el contenido del código (respaldo en guides/data.ts).

// Carga .env si existe (la CLI de Prisma no es quien corre este script).
try {
  const proc = process as unknown as { loadEnvFile?: (p?: string) => void };
  proc.loadEnvFile?.(".env");
} catch {
  // Sin .env: se espera DATABASE_URL en el entorno.
}

import { PrismaClient, Prisma } from "@prisma/client";
import { GUIDES } from "../src/modules/guides/content";
import { guideToDbPayload } from "../src/modules/guides/data";

const prisma = new PrismaClient();

async function main() {
  let skipped = 0;
  for (const [index, guide] of GUIDES.entries()) {
    const { data, asins } = guideToDbPayload(guide, index);
    const saved = await prisma.guide.upsert({
      where: { slug: guide.slug },
      update: {
        ...data,
        sections: data.sections as Prisma.InputJsonValue,
        groups: data.groups as Prisma.InputJsonValue,
        status: "PUBLISHED",
      },
      create: {
        ...data,
        sections: data.sections as Prisma.InputJsonValue,
        groups: data.groups as Prisma.InputJsonValue,
        status: "PUBLISHED",
      },
    });
    await prisma.guideProduct.deleteMany({
      where: { guideId: saved.id },
    });
    const products = await prisma.product.findMany({
      where: { asin: { in: asins } },
      select: { id: true, asin: true },
    });
    const byAsin = new Map(products.map((p) => [p.asin, p.id]));
    const items = asins
      .map((asin, position) => ({ asin, productId: byAsin.get(asin), position }))
      .filter((item) => {
        if (!item.productId) {
          console.warn(`  ${guide.slug}: ASIN ${item.asin} sin producto en base, saltado`);
          skipped += 1;
          return false;
        }
        return true;
      });
    if (items.length > 0) {
      await prisma.guideProduct.createMany({
        data: items.map((item) => ({
          guideId: saved.id,
          productId: item.productId as string,
          position: item.position,
        })),
      });
    }
    console.log(`  ${guide.slug}: ${items.length}/${asins.length} productos enlazados`);
  }
  console.log(
    `Seed de guías completado: ${GUIDES.length} guías, ${skipped} ASINs saltados sin producto en base.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
