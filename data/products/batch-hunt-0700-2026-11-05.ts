import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-05 (revisión de las 07:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 2 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes, incluido el de la tarde-noche del
// 2026-11-04 ya fusionado).
export const BATCH_HUNT_0700_2026_11_05: BatchProduct[] = [
  {
    asin: "B0H78BB9TY",
    affiliateUrl:
      "https://www.amazon.com/dp/B0H78BB9TY?&linkCode=ll2&tag=ecommercety00-20&linkId=9ff2a0bbd3db0689955bb22b7c1db5d5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Pokémon",
    title: "Pokémon TCG: 30th Celebration Elite Trainer Box",
    categorySlug: "toys-games",
    shortDescription:
      "A 30th anniversary Elite Trainer Box with 9 booster packs and a Nidorina promo card, the collector gift of the season.",
    imageUrl: null,
    highlights: ["30th anniversary", "9 booster packs", "Nidorina promo"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-05 07:00, SiteStripe)",
  },
  {
    asin: "B0DGTMR754",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DGTMR754?&linkCode=ll2&tag=ecommercety00-20&linkId=bc8787072716c517ae7320a0b617350f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "medicube",
    title: "medicube Salmon DNA PDRN Pink Collagen Jelly Gel Mask, 28g x 4ea",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "A K-beauty jelly gel mask for the glass-skin glow, the viral skincare gift of the season.",
    imageUrl: null,
    highlights: ["Glass-skin glow", "K-beauty", "4 masks"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-05 07:00, SiteStripe)",
  },
];
