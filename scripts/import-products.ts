// Usa --batch <id> para importar un solo lote y --dry-run para validarlo.
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
import { BATCH_HUNT_1100_2026_11_05 } from "../data/products/batch-hunt-1100-2026-11-05";
import { BATCH_HUNT_1500_1900_2026_11_05 } from "../data/products/batch-hunt-1500-1900-2026-11-05";
import { BATCH_HUNT_2300_2026_11_05 } from "../data/products/batch-hunt-2300-2026-11-05";
import { BATCH_HUNT_0700_2026_11_06 } from "../data/products/batch-hunt-0700-2026-11-06";
import { BATCH_HUNT_1100_2026_11_06 } from "../data/products/batch-hunt-1100-2026-11-06";
import { BATCH_HUNT_1500_1900_2026_11_06 } from "../data/products/batch-hunt-1500-1900-2026-11-06";
import { BATCH_HUNT_2300_0700_2026_11_07 } from "../data/products/batch-hunt-2300-0700-2026-11-07";
import { BATCH_HUNT_1100_2026_11_07 } from "../data/products/batch-hunt-1100-2026-11-07";
import { BATCH_HUNT_1500_2026_11_07 } from "../data/products/batch-hunt-1500-2026-11-07";
import { BATCH_HUNT_1900_2026_11_07 } from "../data/products/batch-hunt-1900-2026-11-07";
import { BATCH_HUNT_2300_2026_11_07 } from "../data/products/batch-hunt-2300-2026-11-07";
import { BATCH_HUNT_0700_2026_11_08 } from "../data/products/batch-hunt-0700-2026-11-08";
import { BATCH_HUNT_1100_2026_11_08 } from "../data/products/batch-hunt-1100-2026-11-08";
import { BATCH_HUNT_1500_2026_11_08 } from "../data/products/batch-hunt-1500-2026-11-08";
import { BATCH_HUNT_1900_2026_11_08 } from "../data/products/batch-hunt-1900-2026-11-08";
import { BATCH_HUNT_2300_2026_11_08 } from "../data/products/batch-hunt-2300-2026-11-08";
import { BATCH_HUNT_0700_2026_11_09 } from "../data/products/batch-hunt-0700-2026-11-09";
import { BATCH_HUNT_1100_2026_11_09 } from "../data/products/batch-hunt-1100-2026-11-09";
import { BATCH_HUNT_1500_2026_11_09 } from "../data/products/batch-hunt-1500-2026-11-09";
import { BATCH_HUNT_1900_2026_11_09 } from "../data/products/batch-hunt-1900-2026-11-09";
import { BATCH_HUNT_2300_2026_11_09 } from "../data/products/batch-hunt-2300-2026-11-09";
import { BATCH_HUNT_0700_2026_11_10 } from "../data/products/batch-hunt-0700-2026-11-10";
import { BATCH_HUNT_1100_2026_11_10 } from "../data/products/batch-hunt-1100-2026-11-10";
import { BATCH_HUNT_1500_2026_11_10 } from "../data/products/batch-hunt-1500-2026-11-10";
import { BATCH_HUNT_1900_2026_11_10 } from "../data/products/batch-hunt-1900-2026-11-10";
import { BATCH_HUNT_2300_2026_11_10 } from "../data/products/batch-hunt-2300-2026-11-10";
import { BATCH_HUNT_0700_2026_11_11 } from "../data/products/batch-hunt-0700-2026-11-11";
import { BATCH_HUNT_1100_2026_11_11 } from "../data/products/batch-hunt-1100-2026-11-11";
import { BATCH_HUNT_1500_2026_11_11 } from "../data/products/batch-hunt-1500-2026-11-11";
import { BATCH_HUNT_1900_2026_11_11 } from "../data/products/batch-hunt-1900-2026-11-11";
import { BATCH_HUNT_2300_2026_11_11 } from "../data/products/batch-hunt-2300-2026-11-11";
import { BATCH_HUNT_0700_2026_11_12 } from "../data/products/batch-hunt-0700-2026-11-12";
import { BATCH_HUNT_1500_2026_11_12 } from "../data/products/batch-hunt-1500-2026-11-12";
import { BATCH_HUNT_1900_2026_11_12 } from "../data/products/batch-hunt-1900-2026-11-12";
import { BATCH_HUNT_2300_2026_11_12 } from "../data/products/batch-hunt-2300-2026-11-12";
import { BATCH_TRENDING_2026 } from "../data/products/batch-trending-2026";
import { BATCH_WIDE_2026_11_05 } from "../data/products/batch-wide-2026-11-05";
import { BATCH_WAVE1_A } from "../data/products/batch-wave1-a";
import { BATCH_WAVE1_B } from "../data/products/batch-wave1-b";
import { BATCH_WAVE2_A } from "../data/products/batch-wave2-a";
import { BATCH_WAVE2_B } from "../data/products/batch-wave2-b";
import { BATCH_TREND_2026_11_01 } from "../data/products/batch-trend-2026-11-01";
import { BATCH_TREND_2026_11_01_H1_5 } from "../data/products/batch-trend-2026-11-01-h1-5";
import { BATCH_TREND_2026_11_01_H3_5 } from "../data/products/batch-trend-2026-11-01-h3-5";
import { BATCH_TREND_2026_11_02_H1_5 } from "../data/products/batch-trend-2026-11-02-h1-5";
import { BATCH_TREND_2026_11_02_H3_5 } from "../data/products/batch-trend-2026-11-02-h3-5";
import { BATCH_TREND_2026_11_02_H1_5_C2 } from "../data/products/batch-trend-2026-11-02-h1-5-c2";
import { BATCH_TREND_2026_11_02_SITESTRIPE } from "../data/products/batch-trend-2026-11-02-sitestripe";
import { BATCH_HOLIDAY_REPLACEMENTS } from "../data/products/batch-holiday-replacements-2026";
import { BATCH_OSOU_REPLACEMENT } from "../data/products/batch-osou-replacement";
import { BATCH_CRESCENT_REPLACEMENT } from "../data/products/batch-crescent-replacement";
import { BATCH_SEASONAL_2026_11_04 } from "../data/products/batch-seasonal-2026-11-04";
import { BATCH_HUNT_2026_11_04 } from "../data/products/batch-hunt-2026-11-04";
import { BATCH_HUNT_1100_2026_11_04 } from "../data/products/batch-hunt-1100-2026-11-04";
import { BATCH_HUNT_1500_2026_11_04 } from "../data/products/batch-hunt-1500-2026-11-04";
import { BATCH_HUNT_1900_2300_2026_11_04 } from "../data/products/batch-hunt-1900-2300-2026-11-04";
import { BATCH_HUNT_0700_2026_11_05 } from "../data/products/batch-hunt-0700-2026-11-05";
import { TRACKING_IDS } from "../src/modules/affiliate/tracking";

const BATCHES: { id: string; items: BatchProduct[] }[] = [
  { id: "batch-crescent-replacement", items: BATCH_CRESCENT_REPLACEMENT },
  { id: "batch-seasonal-2026-11-04", items: BATCH_SEASONAL_2026_11_04 },
  { id: "batch-hunt-2026-11-04", items: BATCH_HUNT_2026_11_04 },
  { id: "batch-hunt-1100-2026-11-04", items: BATCH_HUNT_1100_2026_11_04 },
  { id: "batch-hunt-1500-2026-11-04", items: BATCH_HUNT_1500_2026_11_04 },
  { id: "batch-hunt-1900-2300-2026-11-04", items: BATCH_HUNT_1900_2300_2026_11_04 },
  { id: "batch-hunt-0700-2026-11-05", items: BATCH_HUNT_0700_2026_11_05 },
  { id: "batch-osou-replacement", items: BATCH_OSOU_REPLACEMENT },
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
  { id: "batch-trend-2026-11-02-h1-5-c2", items: BATCH_TREND_2026_11_02_H1_5_C2 },
  { id: "batch-trend-2026-11-02-sitestripe", items: BATCH_TREND_2026_11_02_SITESTRIPE },
  { id: "batch-wide-2026-11-05", items: BATCH_WIDE_2026_11_05 },
  { id: "batch-holiday-replacements-2026", items: BATCH_HOLIDAY_REPLACEMENTS },
  { id: "batch-hunt-1100-2026-11-05", items: BATCH_HUNT_1100_2026_11_05 },
  { id: "batch-hunt-1500-1900-2026-11-05", items: BATCH_HUNT_1500_1900_2026_11_05 },
  { id: "batch-hunt-2300-2026-11-05", items: BATCH_HUNT_2300_2026_11_05 },
  { id: "batch-hunt-0700-2026-11-06", items: BATCH_HUNT_0700_2026_11_06 },
  { id: "batch-hunt-1100-2026-11-06", items: BATCH_HUNT_1100_2026_11_06 },
  { id: "batch-hunt-1500-1900-2026-11-06", items: BATCH_HUNT_1500_1900_2026_11_06 },
  { id: "batch-hunt-2300-0700-2026-11-07", items: BATCH_HUNT_2300_0700_2026_11_07 },
  { id: "batch-hunt-1100-2026-11-07", items: BATCH_HUNT_1100_2026_11_07 },
  { id: "batch-hunt-1500-2026-11-07", items: BATCH_HUNT_1500_2026_11_07 },
  { id: "batch-hunt-1900-2026-11-07", items: BATCH_HUNT_1900_2026_11_07 },
  { id: "batch-hunt-2300-2026-11-07", items: BATCH_HUNT_2300_2026_11_07 },
  { id: "batch-hunt-0700-2026-11-08", items: BATCH_HUNT_0700_2026_11_08 },
  { id: "batch-hunt-1100-2026-11-08", items: BATCH_HUNT_1100_2026_11_08 },
  { id: "batch-hunt-1500-2026-11-08", items: BATCH_HUNT_1500_2026_11_08 },
  { id: "batch-hunt-1900-2026-11-08", items: BATCH_HUNT_1900_2026_11_08 },
  { id: "batch-hunt-2300-2026-11-08", items: BATCH_HUNT_2300_2026_11_08 },
  { id: "batch-hunt-0700-2026-11-09", items: BATCH_HUNT_0700_2026_11_09 },
  { id: "batch-hunt-1100-2026-11-09", items: BATCH_HUNT_1100_2026_11_09 },
  { id: "batch-hunt-1500-2026-11-09", items: BATCH_HUNT_1500_2026_11_09 },
  { id: "batch-hunt-1900-2026-11-09", items: BATCH_HUNT_1900_2026_11_09 },
  { id: "batch-hunt-2300-2026-11-09", items: BATCH_HUNT_2300_2026_11_09 },
  { id: "batch-hunt-0700-2026-11-10", items: BATCH_HUNT_0700_2026_11_10 },
  { id: "batch-hunt-1100-2026-11-10", items: BATCH_HUNT_1100_2026_11_10 },
  { id: "batch-hunt-1500-2026-11-10", items: BATCH_HUNT_1500_2026_11_10 },
  { id: "batch-hunt-1900-2026-11-10", items: BATCH_HUNT_1900_2026_11_10 },
  { id: "batch-hunt-2300-2026-11-10", items: BATCH_HUNT_2300_2026_11_10 },
  { id: "batch-hunt-0700-2026-11-11", items: BATCH_HUNT_0700_2026_11_11 },
  { id: "batch-hunt-1100-2026-11-11", items: BATCH_HUNT_1100_2026_11_11 },
  { id: "batch-hunt-1500-2026-11-11", items: BATCH_HUNT_1500_2026_11_11 },
  { id: "batch-hunt-1900-2026-11-11", items: BATCH_HUNT_1900_2026_11_11 },
  { id: "batch-hunt-2300-2026-11-11", items: BATCH_HUNT_2300_2026_11_11 },
  { id: "batch-hunt-0700-2026-11-12", items: BATCH_HUNT_0700_2026_11_12 },
  { id: "batch-hunt-1500-2026-11-12", items: BATCH_HUNT_1500_2026_11_12 },
  { id: "batch-hunt-1900-2026-11-12", items: BATCH_HUNT_1900_2026_11_12 },
  { id: "batch-hunt-2300-2026-11-12", items: BATCH_HUNT_2300_2026_11_12 },
];
const ASIN_RE = /^[A-Z0-9]{10}$/;

function validate(product: BatchProduct): string[] {
  const errors: string[] = [];
  if (!ASIN_RE.test(product.asin)) errors.push("ASIN inválido");
  const url = URL.parse(product.affiliateUrl);
  if (url?.origin !== "https://www.amazon.com" || url.username || url.password) {
    errors.push("el enlace no es de Amazon.com");
  } else if (!url.pathname.endsWith(`/dp/${product.asin}`) && !url.pathname.endsWith(`/gp/product/${product.asin}`)) {
    errors.push("el enlace apunta a otro ASIN o no es una ficha de producto");
  }
  const tags = url?.searchParams.getAll("tag") ?? [];
  if (tags.length !== 1 || tags[0] !== TRACKING_IDS.WEB) {
    errors.push("el enlace debe llevar exactamente el Tracking ID WEB");
  }
  if (!product.title || product.title.length < 3) errors.push("título vacío");
  if (!product.categorySlug) errors.push("sin categoría");
  return errors;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const batchArgs = args.filter((arg) => arg !== "--dry-run");
  const batchId = batchArgs.length === 2 && batchArgs[0] === "--batch" ? batchArgs[1] : undefined;
  const batches = batchId ? BATCHES.filter((batch) => batch.id === batchId) : BATCHES;
  if ((batchArgs.length > 0 && !batchId) || batches.length === 0) {
    throw new Error("Uso: npm run db:import -- [--batch <id registrado>] [--dry-run]");
  }
  const all = BATCHES.flatMap((batch) =>
    batch.items.map((product) => ({ batchId: batch.id, product })),
  );
  const seen = new Set<string>();
  let invalid = 0;
  let validated = 0;

  for (const { batchId: ownerId, product } of all) {
    const selected = !batchId || ownerId === batchId;
    const errors = selected ? validate(product) : [];
    if (seen.has(product.asin)) errors.push("ASIN duplicado dentro del lote");
    seen.add(product.asin);
    if (errors.length > 0) {
      invalid++;
      console.error(`✗ ${product.asin}: ${errors.join("; ")}`);
    } else if (selected) {
      validated++;
      console.log(`✓ ${product.asin} · ${product.categorySlug} · ${product.title}`);
    }
  }
  if (invalid > 0) {
    console.error(`\n${invalid} producto(s) con errores. No se importó nada.`);
    process.exit(1);
  }
  if (dryRun) {
    console.log(`\nValidación en seco OK: ${validated} productos listos.`);
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
    const categories = await prisma.category.findMany({ select: { id: true, slug: true } });
    const categoryIds = new Map(categories.map(({ id, slug }) => [slug, id]));
    for (const { id, items } of batches) {
      const results = await prisma.$transaction(async (tx) => {
        const savedProducts = [];
        for (const product of items) {
          const categoryId = categoryIds.get(product.categorySlug);
          if (!categoryId) throw new Error(`${product.asin}: categoría "${product.categorySlug}" no existe`);
          const amazonUrl = `https://www.amazon.com/dp/${product.asin}`;
          const existing = await tx.product.findUnique({
            where: { asin: product.asin },
            select: { id: true, publishedAt: true },
          });
          const saved = await tx.product.upsert({
            where: { asin: product.asin },
            create: {
              asin: product.asin,
              title: product.title,
              brand: product.brand,
              categoryId,
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
              categoryId,
              status: "PUBLISHED",
              amazonUrl,
              imageUrl: product.imageUrl,
              shortDescription: product.shortDescription,
              highlights: product.highlights,
              publishedAt: existing?.publishedAt ?? new Date(),
            },
          });
          await tx.affiliateLink.upsert({
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
          await tx.auditLog.create({
            data: {
              entityType: "Product",
              entityId: saved.id,
              action: existing ? "IMPORT_UPDATE" : "IMPORT_CREATE",
              after: { asin: product.asin, status: "PUBLISHED", batch: id },
              actor: "dayana-import",
            },
          });
          savedProducts.push({ asin: product.asin, existed: Boolean(existing) });
        }
        return savedProducts;
      }, { timeout: 60_000 });
      for (const { asin, existed } of results) {
        if (existed) updated++;
        else created++;
        console.log(`→ ${asin} ${existed ? "actualizado" : "publicado"}`);
      }
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
