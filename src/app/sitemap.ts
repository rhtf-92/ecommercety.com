import type { MetadataRoute } from "next";
import {
  FALLBACK_CATEGORIES,
  getSitemapProducts,
} from "@/modules/catalog/data";
import { GUIDES } from "@/modules/guides/content";
import { SITE_URL } from "@/modules/seo/site";

// Sitemap completo: portada, guías, páginas institucionales, las 14
// categorías y TODOS los productos publicados (desde la base; sin
// base, el sitemap sigue válido sin productos). La búsqueda queda
// fuera a propósito: su página es noindex.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await getSitemapProducts();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/todays-deals`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/disclosure`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    ...FALLBACK_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/product/${product.asin}`,
      lastModified: product.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ];
}
