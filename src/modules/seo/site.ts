// Constantes SEO del sitio público. La intención de búsqueda que
// perseguimos: personas que quieren COMPRAR en Amazon buscando
// ofertas, tendencias y recomendaciones honestas ("amazon deals",
// "trending products", "best ... on amazon"). Todo el copy de
// metadatos se escribe para esa intención, sin prometer precios ni
// descuentos puntuales (cumplimiento Associates).

export const SITE_NAME = "T&F Picks";
export const SITE_LEGAL_NAME = "E-Commerce T&F";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecommercety.com";

export const SITE_TITLE_DEFAULT =
  "Best Amazon Deals & Trending Products — Honest Picks | T&F Picks";

export const SITE_DESCRIPTION =
  "Find the best Amazon deals and trending products, hand-picked and re-verified every 5 hours across 27 categories — home, tech, beauty, toys, gaming and more. Honest guides, zero guesswork: every pick links straight to Amazon for the live price.";

export const SITE_KEYWORDS = [
  "amazon deals",
  "best amazon products",
  "trending products on amazon",
  "amazon deals today",
  "best sellers amazon",
  "amazon finds",
  "amazon must haves",
  "amazon discounts",
  "trending amazon products",
  "best amazon gifts",
  "amazon deals and promotions",
  "curated amazon picks",
];

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
