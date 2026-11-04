import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-04 (revisión de las 07:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 5 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes). El primer candidato Labubu
// (B0FQ4CPRWH) queda FUERA porque su ficha no ofrece compra en
// este momento; en su lugar entra la ficha alternativa del mismo
// producto (B0DT44TSM2, tienda oficial POP MART), verificada por
// Alya y con su propio enlace SiteStripe.
export const BATCH_HUNT_2026_11_04: BatchProduct[] = [
  {
    asin: "B0FLYL568F",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FLYL568F?&linkCode=ll2&tag=ecommercety00-20&linkId=d7f55e7b79d0ca8802aa97963f3680c3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ray-Ban",
    title: "Ray-Ban Meta (Gen 2), Wayfarer Large, Matte Black, Transitions Grey Lenses",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Smart glasses with a camera and assistant in a classic Wayfarer frame, with Transitions lenses that adapt to the light.",
    imageUrl: null,
    highlights: ["Camera and assistant", "Transitions lenses", "Wayfarer frame"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-04, SiteStripe)",
  },
  {
    asin: "B013XKHA4M",
    affiliateUrl:
      "https://www.amazon.com/dp/B013XKHA4M?&linkCode=ll2&tag=ecommercety00-20&linkId=59ae11598e6306acb4b0174d22883143&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Sol de Janeiro",
    title: "Sol de Janeiro Brazilian Bum Bum Cream, 240 ml",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "The viral Brazilian body cream with the brand's signature scent, for soft, moisturized skin.",
    imageUrl: null,
    highlights: ["240 ml", "Brazilian scent", "Body moisturizer"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-04, SiteStripe)",
  },
  {
    asin: "B0DWGVM7RY",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DWGVM7RY?&linkCode=ll2&tag=ecommercety00-20&linkId=3a3adcec0b07aea0edc672d1727e4768&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "USAOPOLY",
    title: "USAOPOLY Flip 7",
    categorySlug: "toys-games",
    shortDescription:
      "A fast card game for family game nights: flip, match and be the first to play all your cards.",
    imageUrl: null,
    highlights: ["Fast gameplay", "Family game nights", "Card game"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-04, SiteStripe)",
  },
  {
    asin: "B0G36DYL88",
    affiliateUrl:
      "https://www.amazon.com/dp/B0G36DYL88?&linkCode=ll2&tag=ecommercety00-20&linkId=496e17714d2489da2676d17b385848e8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Funko",
    title: "Funko Pop! Animation: KPop Demon Hunters — Zoey",
    categorySlug: "toys-games",
    shortDescription:
      "Zoey from KPop Demon Hunters as a collectible vinyl figure, part of the 2026 toy story.",
    imageUrl: null,
    highlights: ["Collectible vinyl figure", "KPop Demon Hunters", "Display-ready"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-04, SiteStripe)",
  },
  {
    asin: "B0DT44TSM2",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DT44TSM2?&linkCode=ll2&tag=ecommercety00-20&linkId=192a4911b49359625f243c1548cf7137&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "POP MART",
    title: "POP MART The Monsters Big into Energy Series — Vinyl Plush Pendant Blind Box, Single Box",
    categorySlug: "toys-games",
    shortDescription:
      "A single blind-box vinyl plush pendant from the Big into Energy series: one random figure per box, a viral collectible for the season.",
    imageUrl: null,
    highlights: ["Single blind box", "Vinyl plush pendant", "Random figure", "Collectible"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-04, SiteStripe)",
  },
];
