import { getDb } from "@/lib/db";
import type {
  AffiliateLink,
  Category,
  PrismaClient,
  Product,
} from "@prisma/client";

export type ProductWithLinks = Product & { links: AffiliateLink[] };

/**
 * Categorías de la Fase 1 (aprobadas el 2026-10-31). Sirven como respaldo
 * para que el sitio renderice aunque la base de datos aún no esté
 * provisionada; en cuanto exista DATABASE_URL, manda la base de datos.
 */
export const FALLBACK_CATEGORIES: Pick<
  Category,
  "id" | "slug" | "nameEn" | "descriptionEn" | "phase" | "isActive"
>[] = [
  { id: "fallback-home-kitchen", slug: "home-kitchen", nameEn: "Home & Kitchen", descriptionEn: "Kitchen essentials and home upgrades that earn their counter space.", phase: 1, isActive: true },
  { id: "fallback-tech-smart-home", slug: "tech-smart-home", nameEn: "Tech, Accessories & Smart Home", descriptionEn: "Gadgets, accessories and smart-home gear worth your money.", phase: 1, isActive: true },
  { id: "fallback-beauty-personal-care", slug: "beauty-personal-care", nameEn: "Beauty & Personal Care", descriptionEn: "Skincare, grooming and beauty picks, including luxury favorites.", phase: 1, isActive: true },
  { id: "fallback-pet-supplies", slug: "pet-supplies", nameEn: "Pet Supplies", descriptionEn: "Food, toys and care essentials your pets will actually enjoy.", phase: 1, isActive: true },
  { id: "fallback-sports-outdoors", slug: "sports-outdoors", nameEn: "Sports, Fitness & Outdoors", descriptionEn: "Fitness gear and outdoor equipment for every level.", phase: 1, isActive: true },
  { id: "fallback-tools-home-improvement", slug: "tools-home-improvement", nameEn: "Tools & Home Improvement", descriptionEn: "Tools and fixes that make home projects easier.", phase: 1, isActive: true },
];

async function dbOrNull<T>(
  query: (client: PrismaClient) => Promise<T>,
): Promise<T | null> {
  try {
    // getDb() va DENTRO del try: si el cliente no puede cargarse o
    // construirse (sin generar o sin DATABASE_URL), se usa el respaldo.
    return await query(await getDb());
  } catch {
    // Sin base de datos disponible (entorno local/CI): se usa el respaldo.
    return null;
  }
}

export async function getCategories() {
  const fromDb = await dbOrNull((client) =>
    client.category.findMany({ where: { isActive: true }, orderBy: { nameEn: "asc" } }),
  );
  return fromDb && fromDb.length > 0 ? fromDb : FALLBACK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string) {
  const fromDb = await dbOrNull((client) =>
    client.category.findUnique({ where: { slug } }),
  );
  if (fromDb) return fromDb;
  return FALLBACK_CATEGORIES.find((category) => category.slug === slug) ?? null;
}

export async function getPublishedProductsByCategory(
  categoryId: string,
): Promise<ProductWithLinks[]> {
  const fromDb = await dbOrNull((client) =>
    client.product.findMany({
      where: { categoryId, status: "PUBLISHED" },
      include: { links: { where: { isActive: true } } },
      orderBy: { publishedAt: "desc" },
    }),
  );
  return fromDb ?? [];
}

export async function getProductByAsin(
  asin: string,
): Promise<(ProductWithLinks & { category: Category }) | null> {
  return dbOrNull((client) =>
    client.product.findUnique({
      where: { asin },
      include: { links: { where: { isActive: true } }, category: true },
    }),
  );
}
