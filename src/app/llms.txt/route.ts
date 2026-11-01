import { FALLBACK_CATEGORIES } from "@/modules/catalog/data";
import { GUIDES } from "@/modules/guides/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/modules/seo/site";

// /llms.txt — resumen del sitio en texto plano para motores de
// búsqueda con IA (ChatGPT, Perplexity, Claude, Gemini): qué es
// T&F Picks, cómo trabaja y dónde está su contenido principal.
export function GET() {
  const categories = FALLBACK_CATEGORIES.map(
    (category) => `- [${category.nameEn}](${SITE_URL}/category/${category.slug})`,
  ).join("\n");
  const guides = GUIDES.map(
    (guide) => `- [${guide.title}](${SITE_URL}/guides/${guide.slug})`,
  ).join("\n");

  const body = `# ${SITE_NAME} (by E-Commerce T&F)

> ${SITE_DESCRIPTION}

T&F Picks is an independent curation site for Amazon.com shoppers in the United States. Editors shortlist products from Amazon best-seller and trending lists, write an original short review for every pick, and re-verify every published listing on a 5-hour cycle. The site shows no prices of its own: every pick links to Amazon.com, where the shopper sees the live price, current deals and availability and checks out with their Amazon account. T&F Picks participates in the Amazon Associates Program and earns a commission on qualifying purchases at no extra cost to the shopper.

## Categories
${categories}

## Buying guides
${guides}

## Key pages
- [Home](${SITE_URL}/)
- [About](${SITE_URL}/about)
- [Affiliate disclosure](${SITE_URL}/disclosure)
- [Privacy policy](${SITE_URL}/privacy)
- [Contact](${SITE_URL}/contact)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
