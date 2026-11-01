// Datos estructurados (schema.org) para buscadores y motores de IA.
// Reglas de cumplimiento: NUNCA se inventan precios, ratings ni
// reseñas. El bloque Offer de un producto solo se emite cuando hay
// un precio FRESCo de la Creators API (misma regla de 24 h de la
// ficha pública), y su URL es la página del producto en Amazon.

import { SITE_DESCRIPTION, SITE_LEGAL_NAME, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

type Ld = Record<string, unknown>;

export function organizationLd(): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    description: SITE_DESCRIPTION,
    email: "contact@ecommercety.com",
  };
}

export function websiteLd(): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListLd(
  items: { name: string; path: string }[],
  name?: string,
): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name ? { name } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function productLd(input: {
  asin: string;
  title: string;
  brand?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  categoryName: string;
  amazonUrl: string;
  freshOffer?: { amount: number; currency: string } | null;
}): Ld {
  const ld: Ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.title,
    description: input.description ?? undefined,
    sku: input.asin,
    mpn: input.asin,
    category: input.categoryName,
    url: absoluteUrl(`/product/${input.asin}`),
    ...(input.brand ? { brand: { "@type": "Brand", name: input.brand } } : {}),
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
  };
  if (input.freshOffer) {
    ld.offers = {
      "@type": "Offer",
      url: input.amazonUrl,
      priceCurrency: input.freshOffer.currency,
      price: input.freshOffer.amount,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Amazon.com" },
    };
  }
  return ld;
}

export function articleLd(input: {
  slug: string;
  title: string;
  description: string;
}): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(`/guides/${input.slug}`),
    inLanguage: "en-US",
    author: { "@type": "Organization", name: SITE_LEGAL_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}
