import type { BatchProduct } from "./batch-001";

// Lote combinado de las cazas manuales del 2026-11-04 (revisiones de
// las 19:00 y las 23:00 hora Lima), con enlaces SiteStripe generados
// por Alya con el Tracking ID WEB (ecommercety00-20). Sin scraping de
// Amazon y sin precios copiados: el sitio sigue mostrando "Check price
// on Amazon" hasta la Creators API. Los 3 ASIN son nuevos en el
// catálogo (verificado contra los lotes existentes, incluido el de
// las 15:00 ya fusionado).
export const BATCH_HUNT_1900_2300_2026_11_04: BatchProduct[] = [
  {
    asin: "B0D9WW6RPJ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D9WW6RPJ?&linkCode=ll2&tag=ecommercety00-20&linkId=22cec2007194664ad8cca90f6912b311&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Oura",
    title: "Oura Ring 4, Silver, Size 7",
    categorySlug: "health-household",
    shortDescription:
      "A smart health ring that tracks sleep, recovery and readiness, the premium wellness gift of the season.",
    imageUrl: null,
    highlights: ["Sleep tracking", "Recovery insights", "Size 7"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-04 19:00, SiteStripe)",
  },
  {
    asin: "B0D2M11BPD",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D2M11BPD?&linkCode=ll2&tag=ecommercety00-20&linkId=2049a6c77329448e6118170784947c71&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Jellycat",
    title: "Jellycat Bartholomew Bear with Bathrobe Stuffed Animal, 10 inches",
    categorySlug: "toys-games",
    shortDescription:
      "A soft 10-inch Bartholomew Bear in his bathrobe, the plush gift at the top of Christmas wish lists.",
    imageUrl: null,
    highlights: ["10-inch plush", "Bathrobe", "Christmas favorite"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-04 23:00, SiteStripe)",
  },
  {
    asin: "B0D2WGQW87",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D2WGQW87?&linkCode=ll2&tag=ecommercety00-20&linkId=bd180c3ac7f881187343941910154371&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Rhode",
    title: "Rhode Peptide Lip Tint, Espresso",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "A peptide lip tint in Espresso, the viral shade everyone is gifting this holiday season.",
    imageUrl: null,
    highlights: ["Peptide lip tint", "Espresso shade", "Viral favorite"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-04 23:00, SiteStripe)",
  },
];
