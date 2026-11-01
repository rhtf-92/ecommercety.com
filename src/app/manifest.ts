import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/modules/seo/site";

// Manifiesto web: nombre, colores e icono cuando el visitante guarda
// el sitio en su pantalla de inicio (señal de marca para buscadores).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Best Amazon Deals & Trending Products`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf8",
    theme_color: "#0d1220",
    lang: "en-US",
    categories: ["shopping"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
