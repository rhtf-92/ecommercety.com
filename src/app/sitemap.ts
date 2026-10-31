import type { MetadataRoute } from "next";
import { FALLBACK_CATEGORIES } from "@/modules/catalog/data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecommercety.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ...FALLBACK_CATEGORIES.map((category) => ({
      url: `${BASE_URL}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];
}
