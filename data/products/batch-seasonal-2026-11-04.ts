import type { BatchProduct } from "./batch-001";

// Lote estacional Navidad / Cyber Monday 2026, curado por búsqueda
// editorial el 2026-11-04 (listas de tendencias y más vendidos de
// noviembre, sin scraping de Amazon y sin precios copiados: el sitio
// sigue mostrando "Check price on Amazon" hasta la Creators API).
// Los 5 ASIN son nuevos en el catálogo (verificado contra los lotes
// existentes); Switch 2 + Mario Kart y AirTag 2 4-pack ya estaban y
// no se duplican aquí. Enlaces con el Tracking ID WEB
// (ecommercety00-20); sin linkId de SiteStripe, que es metadato de
// reporte y no requisito de la validación del import ni de la
// atribución: si se generan enlaces SiteStripe después, se
// actualizan las URLs en un lote posterior, como se hizo con
// SKITTLES, Stanley y Blink Mini.
export const BATCH_SEASONAL_2026_11_04: BatchProduct[] = [
  {
    asin: "B0FQFB8FMG",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FQFB8FMG?&linkCode=ll2&tag=ecommercety00-20&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Apple",
    title: "Apple AirPods Pro 3 Wireless Earbuds with Active Noise Cancellation",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Apple's newest earbuds with stronger noise cancellation, live translation and heart-rate sensing, in a pocket-sized USB-C case.",
    imageUrl: null,
    highlights: ["Active noise cancellation", "Live translation", "Heart-rate sensing", "USB-C charging case"],
    discoveredVia: "Radar de tendencias (Navidad/Cyber 2026, búsqueda editorial, 2026-11-04)",
  },
  {
    asin: "B0D2LZYQ2M",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D2LZYQ2M?&linkCode=ll2&tag=ecommercety00-20&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ninja",
    title: "Ninja SLUSHi with RapidChill Technology, 88 oz. Frozen Drink & Slushie Machine, 5 Preset Programs, FS301",
    categorySlug: "home-kitchen",
    shortDescription:
      "Turns almost any drink into a frozen slushie with no ice and no blender — five presets cover slushies, frozen margaritas, frappés and more.",
    imageUrl: null,
    highlights: ["No ice needed", "5 preset programs", "88 oz. vessel", "Keeps drinks frozen up to 12 hours"],
    discoveredVia: "Radar de tendencias (Navidad/Cyber 2026, búsqueda editorial, 2026-11-04)",
  },
  {
    asin: "B08D66HCXW",
    affiliateUrl:
      "https://www.amazon.com/dp/B08D66HCXW?&linkCode=ll2&tag=ecommercety00-20&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LHKNL",
    title: "LHKNL Rechargeable Headlamp, 2-Pack with Motion Sensor",
    categorySlug: "sports-outdoors",
    shortDescription:
      "A pair of rechargeable, motion-sensor headlamps for hands-free light on walks, camping trips and jobs around the house.",
    imageUrl: null,
    highlights: ["Rechargeable", "Motion sensor", "2-pack", "Hands-free light"],
    discoveredVia: "Radar de tendencias (más vendidos noviembre 2026, búsqueda editorial, 2026-11-04)",
  },
  {
    asin: "B0BXKB7QF6",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BXKB7QF6?&linkCode=ll2&tag=ecommercety00-20&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Coquimbo",
    title: "Coquimbo Sewing Kit, 86-Piece Travel Set",
    categorySlug: "tools-home-improvement",
    shortDescription:
      "An 86-piece travel sewing kit that covers quick repairs at home or on the road, in one compact case.",
    imageUrl: null,
    highlights: ["86 pieces", "Compact travel case", "Quick repairs"],
    discoveredVia: "Radar de tendencias (más vendidos noviembre 2026, búsqueda editorial, 2026-11-04)",
  },
  {
    asin: "1250892317",
    affiliateUrl:
      "https://www.amazon.com/dp/1250892317?&linkCode=ll2&tag=ecommercety00-20&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Murdle",
    title: "Murdle: Volume 1 — 100 Murder Mystery Logic Puzzles",
    categorySlug: "toys-games",
    shortDescription:
      "100 murder-mystery logic puzzles to solve by deduction — a stocking stuffer for puzzle lovers and game nights.",
    imageUrl: null,
    highlights: ["100 logic puzzles", "Deduction gameplay", "Stocking stuffer"],
    discoveredVia: "Radar de tendencias (más vendidos noviembre 2026, búsqueda editorial, 2026-11-04)",
  },
];
