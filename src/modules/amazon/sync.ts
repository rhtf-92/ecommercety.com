import { getDb } from "@/lib/db";
import { getItems, isCreatorsApiConfigured } from "./creators";
import { writeAudit } from "@/modules/audit/log";

export type SyncResult = {
  ok: boolean;
  reason?: "NOT_CONFIGURED" | "NO_PRODUCTS" | "ERROR";
  checked: number;
  updated: number;
  missing: string[];
  message: string;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Sincroniza precio, oferta, disponibilidad e imagen oficial de todos
 * los productos publicados desde la Creators API.
 * Límites oficiales iniciales: 1 solicitud/segundo y 8.640/día; cada
 * llamada lleva hasta 10 ASIN. El contenido caduca a las 24 h: este
 * refresco corre dentro de los ciclos de 5 h de Dayana.
 */
export async function syncAmazonData(
  actor = "dayana-sync",
): Promise<SyncResult> {
  if (!isCreatorsApiConfigured()) {
    return {
      ok: false,
      reason: "NOT_CONFIGURED",
      checked: 0,
      updated: 0,
      missing: [],
      message:
        "Creators API no configurada: faltan CREATORS_API_CREDENTIAL_ID/SECRET (Amazon exige 10 ventas calificadas en 30 días para emitirlas).",
    };
  }

  const db = await getDb();
  const run = await db.verificationRun.create({ data: {} });
  const products = await db.product.findMany({
    where: { status: { in: ["PUBLISHED", "DEMOTED"] } },
    select: { id: true, asin: true, imageUrl: true },
    orderBy: { asin: "asc" },
  });
  if (products.length === 0) {
    await db.verificationRun.update({
      where: { id: run.id },
      data: { finishedAt: new Date(), report: "Sin productos publicados." },
    });
    return {
      ok: false,
      reason: "NO_PRODUCTS",
      checked: 0,
      updated: 0,
      missing: [],
      message: "No hay productos publicados para sincronizar.",
    };
  }

  const byAsin = new Map(products.map((p) => [p.asin, p]));
  const seen = new Set<string>();
  let updated = 0;
  const now = new Date();

  try {
    for (let i = 0; i < products.length; i += 10) {
      const batch = products.slice(i, i + 10).map((p) => p.asin);
      if (i > 0) await sleep(1100); // respeta 1 solicitud/segundo
      const items = await getItems(batch);
      for (const item of items) {
        const product = byAsin.get(item.asin);
        if (!product) continue;
        seen.add(item.asin);
        await db.productPrice.upsert({
          where: { productId: product.id },
          create: {
            productId: product.id,
            amount: item.priceAmount,
            currency: item.currency,
            listAmount: item.listAmount,
            savingsPercent: item.savingsPercent,
            availability: item.availability,
            primeEligible: item.primeEligible,
            dealBadge: item.dealBadge,
            dealEndsAt: item.dealEndsAt ? new Date(item.dealEndsAt) : null,
            imageLarge: item.imageLarge,
            fetchedAt: now,
            raw: item.raw as object,
          },
          update: {
            amount: item.priceAmount,
            currency: item.currency,
            listAmount: item.listAmount,
            savingsPercent: item.savingsPercent,
            availability: item.availability,
            primeEligible: item.primeEligible,
            dealBadge: item.dealBadge,
            dealEndsAt: item.dealEndsAt ? new Date(item.dealEndsAt) : null,
            imageLarge: item.imageLarge,
            fetchedAt: now,
            raw: item.raw as object,
          },
        });
        // La imagen oficial de la API rellena la ficha si aún no tiene.
        if (!product.imageUrl && item.imageLarge) {
          await db.product.update({
            where: { id: product.id },
            data: { imageUrl: item.imageLarge, lastVerifiedAt: now },
          });
        } else {
          await db.product.update({
            where: { id: product.id },
            data: { lastVerifiedAt: now },
          });
        }
        updated++;
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    await db.verificationRun.update({
      where: { id: run.id },
      data: {
        finishedAt: new Date(),
        checkedCount: seen.size,
        issuesFound: 1,
        report: `Sincronización interrumpida: ${message}`,
      },
    });
    return {
      ok: false,
      reason: "ERROR",
      checked: seen.size,
      updated,
      missing: products.filter((p) => !seen.has(p.asin)).map((p) => p.asin),
      message,
    };
  }

  const missing = products
    .filter((p) => !seen.has(p.asin))
    .map((p) => p.asin);
  await db.verificationRun.update({
    where: { id: run.id },
    data: {
      finishedAt: new Date(),
      checkedCount: products.length,
      issuesFound: missing.length,
      report: `Creators API: ${updated} actualizados, ${missing.length} sin respuesta (${missing.join(", ") || "ninguno"}).`,
    },
  });
  await writeAudit({
    entityType: "Catalog",
    entityId: "amazon-sync",
    action: "PRICE_SYNC",
    after: { checked: products.length, updated, missing },
    actor,
  });
  return {
    ok: true,
    checked: products.length,
    updated,
    missing,
    message: `Sincronizados ${updated} de ${products.length} productos.`,
  };
}
