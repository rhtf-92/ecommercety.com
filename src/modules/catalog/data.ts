import { getDb } from "@/lib/db";
import type {
  AffiliateLink,
  Category,
  PrismaClient,
  Product,
} from "@prisma/client";

import type { ProductPrice } from "@prisma/client";

export type ProductWithLinks = Product & {
  links: AffiliateLink[];
  price?: ProductPrice | null;
};

/**
 * Categorías de Fase 1 (aprobadas el 2026-10-31) y Fase 2 (Sprint 8,
 * 2026-11-01). Sirven como respaldo para que el sitio renderice aunque
 * la base de datos aún no esté provisionada; en cuanto exista
 * DATABASE_URL, manda la base de datos.
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
  { id: "fallback-toys-games", slug: "toys-games", nameEn: "Toys & Games", descriptionEn: "Building sets, board games and gifts kids actually ask for.", phase: 2, isActive: true },
  { id: "fallback-baby-products", slug: "baby-products", nameEn: "Baby Products", descriptionEn: "Registry-worthy essentials for newborns and new parents.", phase: 2, isActive: true },
  { id: "fallback-fashion-accessories", slug: "fashion-accessories", nameEn: "Fashion & Accessories", descriptionEn: "Shoes, bags, watches and seasonal style staples.", phase: 2, isActive: true },
  { id: "fallback-automotive", slug: "automotive", nameEn: "Automotive", descriptionEn: "Car care, safety and accessories for every drive.", phase: 2, isActive: true },
  { id: "fallback-office-products", slug: "office-products", nameEn: "Office & School Supplies", descriptionEn: "Desk upgrades and supplies that make workdays smoother.", phase: 2, isActive: true },
  { id: "fallback-video-games", slug: "video-games", nameEn: "Video Games & Electronics", descriptionEn: "Consoles, controllers and gear for every kind of player.", phase: 2, isActive: true },
  { id: "fallback-health-household", slug: "health-household", nameEn: "Health & Household", descriptionEn: "Wellness, rest and everyday-care essentials.", phase: 2, isActive: true },
  { id: "fallback-grocery-gourmet", slug: "grocery-gourmet", nameEn: "Grocery & Gourmet Gifts", descriptionEn: "Gift baskets, coffee and treats worth sharing.", phase: 2, isActive: true },
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

/**
 * Los precios se cargan SIEMPRE por separado del catálogo. Motivo
 * (bug real, 2026-10-31): si la tabla ProductPrice aún no existe en la
 * base (migración sin aplicar), una consulta del catálogo que la
 * incluya falla entera y la tienda aparece vacía aunque los productos
 * existan. Con el desacople, el peor caso es "sin precios", nunca
 * "sin productos".
 */
async function attachPrices<T extends { id: string }>(
  products: T[],
): Promise<(T & { price: ProductPrice | null })[]> {
  if (products.length === 0) return products as (T & { price: null })[];
  const prices = await dbOrNull((client) =>
    client.productPrice.findMany({
      where: { productId: { in: products.map((p) => p.id) } },
    }),
  );
  const byId = new Map((prices ?? []).map((price) => [price.productId, price]));
  return products.map((product) => ({
    ...product,
    price: byId.get(product.id) ?? null,
  }));
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
  return attachPrices(fromDb ?? []);
}

export async function getFeaturedProducts(
  limit = 6,
): Promise<ProductWithLinks[]> {
  const fromDb = await dbOrNull((client) =>
    client.product.findMany({
      where: { status: "PUBLISHED" },
      include: { links: { where: { isActive: true } } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    }),
  );
  return attachPrices(fromDb ?? []);
}

/**
 * Hallazgos del radar de tendencias (página /todays-deals): productos
 * publicados cuyo discoveredVia marca "Radar de tendencias" (las tandas
 * de las cazas de los ciclos de 5 horas), del más reciente al más
 * antiguo por fecha de alta. Si el radar aún no hubiera traído nada
 * (no es el caso en producción), se respalda con los destacados. La
 * página NO afirma precios ni descuentos: la señal de oferta es
 * interna y el precio vivo se confirma siempre en Amazon.
 */
export async function getTrendRadarProducts(
  limit = 24,
): Promise<ProductWithLinks[]> {
  const fromDb = await dbOrNull((client) =>
    client.product.findMany({
      where: {
        status: "PUBLISHED",
        discoveredVia: { contains: "Radar de tendencias", mode: "insensitive" },
      },
      include: { links: { where: { isActive: true } } },
      orderBy: { createdAt: "desc" },
      take: limit,
    }),
  );
  if (fromDb && fromDb.length > 0) return attachPrices(fromDb);
  return getFeaturedProducts(limit);
}

export type ProductWithCategory = ProductWithLinks & {
  category: Pick<Category, "nameEn" | "slug">;
};

/**
 * Destacados de portada, UNO por categoría (las 14): la portada dejó
 * de mostrar la parrilla de categorías (redundante con el mega-menú)
 * y en su lugar resalta el producto más interesante de cada una.
 * Criterio por categoría, en orden: (1) el hallazgo más reciente del
 * radar de tendencias en esa categoría; (2) el publicado más
 * reciente. El modelo no tiene marca editorial de "destacado", así
 * que la frescura del radar es el primer criterio. La representación
 * de las 14 queda garantizada por construcción (una consulta por
 * categoría de getCategories); sin base, devuelve vacío como el
 * resto de la capa (la portada muestra su estado vacío).
 */
export async function getCategoryStandouts(): Promise<ProductWithCategory[]> {
  const categories = await getCategories();
  const include = {
    links: { where: { isActive: true } },
    category: { select: { nameEn: true, slug: true } },
  } as const;
  const standouts = await Promise.all(
    categories.map(async (category) => {
      const radar = await dbOrNull((client) =>
        client.product.findFirst({
          where: {
            categoryId: category.id,
            status: "PUBLISHED",
            discoveredVia: {
              contains: "Radar de tendencias",
              mode: "insensitive",
            },
          },
          include,
          orderBy: { createdAt: "desc" },
        }),
      );
      if (radar) return radar;
      return dbOrNull((client) =>
        client.product.findFirst({
          where: { categoryId: category.id, status: "PUBLISHED" },
          include,
          orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        }),
      );
    }),
  );
  const found = standouts.filter(
    (product): product is NonNullable<typeof product> => product !== null,
  );
  return attachPrices(found) as Promise<ProductWithCategory[]>;
}

export async function searchProducts(
  query: string,
): Promise<ProductWithLinks[]> {
  const q = query.trim();
  if (!q) return [];
  const fromDb = await dbOrNull((client) =>
    client.product.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
          { shortDescription: { contains: q, mode: "insensitive" } },
        ],
      },
      include: { links: { where: { isActive: true } } },
      orderBy: { publishedAt: "desc" },
      take: 24,
    }),
  );
  return attachPrices(fromDb ?? []);
}

export async function getProductByAsin(
  asin: string,
): Promise<(ProductWithLinks & { category: Category }) | null> {
  const product = await dbOrNull((client) =>
    client.product.findUnique({
      where: { asin },
      include: { links: { where: { isActive: true } }, category: true },
    }),
  );
  if (!product) return null;
  const [withPrice] = await attachPrices([product]);
  return withPrice;
}

// Lista mínima para el sitemap: ASIN y fecha de actualización de los
// productos publicados. Sin base de datos devuelve vacío (el sitemap
// sigue siendo válido con categorías y guías).
export async function getSitemapProducts(): Promise<
  { asin: string; updatedAt: Date }[]
> {
  const products = await dbOrNull((client) =>
    client.product.findMany({
      where: { status: "PUBLISHED" },
      select: { asin: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
  );
  return products ?? [];
}
