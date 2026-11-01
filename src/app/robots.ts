import type { MetadataRoute } from "next";
import { SITE_URL } from "@/modules/seo/site";

// Todo el sitio público es rastreable e indexable por cualquier
// buscador (Google, Bing, DuckDuckGo, Yandex, motores de IA). Solo
// se excluyen el panel y la API.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
