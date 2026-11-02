// Importador de lotes de productos (uso: npm run db:import -- --dry-run
// para validar sin escribir; sin flags, publica en la base de datos).
// Idempotente: upsert por ASIN. Valida ASIN, dominio Amazon y tag
// oficial ANTES de tocar la base. Registra cada alta en AuditLog con
// actor "dayana-import".

// Carga .env si existe (la CLI de Prisma no es quien corre este script).
try {
  const proc = process as unknown as { loadEnvFile?: (p?: string) => void };
  proc.loadEnvFile?.(".env");
} catch {
  // Sin .env: se espera DATABASE_URL en el entorno.
}

import { PrismaClient } from "@prisma/client";
import { BATCH_001, type BatchProduct } from "../data/products/batch-001";
import { BATCH_TRENDING_2026 } from "../data/products/batch-trending-2026";
import { BATCH_WAVE1_A } from "../data/products/batch-wave1-a";
import { BATCH_WAVE1_B } from "../data/products/batch-wave1-b";
import { BATCH_WAVE2_A } from "../data/products/batch-wave2-a";
import { BATCH_WAVE2_B } from "../data/products/batch-wave2-b";
import { BATCH_TREND_2026_11_01 } from "../data/products/batch-trend-2026-11-01";
import { BATCH_TREND_2026_11_01_H1_5 } from "../data/products/batch-trend-2026-11-01-h1-5";
import { BATCH_TREND_2026_11_01_H3_5 } from "../data/products/batch-trend-2026-11-01-h3-5";
import { BATCH_TREND_2026_11_02_H1_5 } from "../data/products/batch-trend-2026-11-02-h1-5";
import { BATCH_TREND_2026_11_02_H3_5 } from "../data/products/batch-trend-2026-11-02-h3-5";
import { TRACKING_IDS } from "../src/modules/affiliate/tracking";

const BATCHES: { id: string; items: BatchProduct[] }[] = [
  { id: "batch-001", items: BATCH_001 },
  { id: "batch-trending-2026", items: BATCH_TRENDING_2026 },
  { id: "batch-wave1-a", items: BATCH_WAVE1_A },
  { id: "batch-wave1-b", items: BATCH_WAVE1_B },
  { id: "batch-wave2-a", items: BATCH_WAVE2_A },
  { id: "batch-wave2-b", items: BATCH_WAVE2_B },
  { id: "batch-trend-2026-11-01", items: BATCH_TREND_2026_11_01 },
  { id: "batch-trend-2026-11-01-h1-5", items: BATCH_TREND_2026_11_01_H1_5 },
  { id: "batch-trend-2026-11-01-h3-5", items: BATCH_TREND_2026_11_01_H3_5 },
  { id: "batch-trend-2026-11-02-h1-5", items: BATCH_TREND_2026_11_02_H1_5 },
  { id: "batch-trend-2026-11-02-h3-5", items: BATCH_TREND_2026_11_02_H3_5 },
];
const ASIN_RE = /^[A-Z0-9]{10}$/;
const OFFICIAL_TAGS = Object.values(TRACKING_IDS);

function validate(product: BatchProduct): string[] {
  const errors: string[] = [];
  if (!ASIN_RE.test(product.asin)) errors.push("ASIN inválido");
  if (!product.affiliateUrl.startsWith("https://www.amazon.com/")) {
    errors.push("el enlace no es de Amazon.com");
  }
  if (!OFFICIAL_TAGS.some((tag) => product.affiliateUrl.includes(`tag=${tag}`))) {
    errors.push("el enlace no lleva un Tracking ID oficial");
  }
  if (!product.title || product.title.length < 3) errors.push("título vacío");
  if (!product.categorySlug) errors.push("sin categoría");
  return errors;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const all = BATCHES.flatMap((batch) =>
    batch.items.map((product) => ({ batchId: batch.id, product })),
  );
  const seen = new Set<string>();
  let invalid = 0;

  for (const { product } of all) {
    const errors = validate(product);
    if (seen.has(product.asin)) errors.push("ASIN duplicado dentro del lote");
    seen.add(product.asin);
    if (errors.length > 0) {
      invalid++;
      console.error(`✗ ${product.asin}: ${errors.join("; ")}`);
    } else {
      console.log(`✓ ${product.asin} · ${product.categorySlug} · ${product.title}`);
    }
  }
  if (invalid > 0) {
    console.error(`\n${invalid} producto(s) con errores. No se importó nada.`);
    process.exit(1);
  }
  if (dryRun) {
    console.log(`\nValidación en seco OK: ${all.length} productos listos.`);
    return;
  }

  if (!process.env.DATABASE_URL) {
    console.error("Falta DATABASE_URL (revisa tu archivo .env).");
    process.exit(1);
  }

  const prisma = new PrismaClient();
  let created = 0;
  let updated = 0;
  try {
    for (const { batchId, product } of all) {
      const category = await prisma.category.findUnique({
        where: { slug: product.categorySlug },
        select: { id: true },
      });
      if (!category) {
        console.error(
          `✗ ${product.asin}: categoría "${product.categorySlug}" no existe (¿corriste npm run db:seed?)`,
        );
        continue;
      }
      const amazonUrl = `https://www.amazon.com/dp/${product.asin}`;
      const existing = await prisma.product.findUnique({
        where: { asin: product.asin },
        select: { id: true, publishedAt: true },
      });
      const saved = await prisma.product.upsert({
        where: { asin: product.asin },
        create: {
          asin: product.asin,
          title: product.title,
          brand: product.brand,
          categoryId: category.id,
          status: "PUBLISHED",
          amazonUrl,
          imageUrl: product.imageUrl,
          shortDescription: product.shortDescription,
          highlights: product.highlights,
          discoveredVia: product.discoveredVia,
          publishedAt: new Date(),
        },
        update: {
          title: product.title,
          brand: product.brand,
          categoryId: category.id,
          status: "PUBLISHED",
          amazonUrl,
          imageUrl: product.imageUrl,
          shortDescription: product.shortDescription,
          highlights: product.highlights,
          publishedAt: existing?.publishedAt ?? new Date(),
        },
      });
      await prisma.affiliateLink.upsert({
        where: { productId_channel: { productId: saved.id, channel: "WEB" } },
        create: {
          productId: saved.id,
          channel: "WEB",
          trackingId: TRACKING_IDS.WEB,
          url: product.affiliateUrl,
          isActive: true,
        },
        update: {
          url: product.affiliateUrl,
          trackingId: TRACKING_IDS.WEB,
          isActive: true,
        },
      });
      await prisma.auditLog.create({
        data: {
          entityType: "Product",
          entityId: saved.id,
          action: existing ? "IMPORT_UPDATE" : "IMPORT_CREATE",
          after: { asin: product.asin, status: "PUBLISHED", batch: batchId },
          actor: "dayana-import",
        },
      });
      if (existing) updated++;
      else created++;
      console.log(`→ ${product.asin} ${existing ? "actualizado" : "publicado"}`);
    }
  } finally {
    await prisma.$disconnect();
  }
  console.log(`\nImportación completa: ${created} nuevos, ${updated} actualizados.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
