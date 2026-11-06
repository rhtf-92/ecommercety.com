import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-06 (revisión de las 11:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 9 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes en main). Fuera del lote: OCOOPA UT3
// Lite (B0FHW3GKJ3, enlace caído según Alya) y Casio Casiotone
// CT-S300 (B07WN7NG5H, Amazon no permite generarle SiteStripe por
// ser "Frequently Returned Item"); A Court of Splintered Harmony
// (1639739130) ya estaba en el catálogo desde el lote 23:00 (PR #25).
export const BATCH_HUNT_1100_2026_11_06: BatchProduct[] = [
  {
    asin: "B0DPNHFPSC",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DPNHFPSC?&linkCode=ll2&tag=ecommercety00-20&linkId=8a0378b3be32440c7363aa76917c36e2&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Disney",
    title: "Disney Darlings Minnie Mouse Feature Doll",
    categorySlug: "toys-games",
    shortDescription:
      "An interactive 13-inch Minnie Mouse feature doll with lights, sounds and a magic wand, from Amazon's 'Toys We Love 2026' list.",
    imageUrl: null,
    highlights: ["13-inch doll", "Lights & sounds", "Magic wand"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
  {
    asin: "B0F3PQHWTZ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F3PQHWTZ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=926781f9dbba2e3f28263b300d6cc7eb&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Sony",
    title: "Sony WH-1000XM6 (Black)",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Sony's flagship noise-canceling headphones, a top pick in 2026 gift guides for dad.",
    imageUrl: null,
    highlights: ["Noise canceling", "Flagship headphones", "Black"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
  {
    asin: "B0CZPGX972",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CZPGX972?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=ab778b91a2b612be81479894cf0e9f2c&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Beats",
    title: "Beats Solo 4, Cloud Pink",
    categorySlug: "tech-smart-home",
    shortDescription:
      "On-ear headphones from Beats with 50 hours of battery, a gift guide pick for her and teens.",
    imageUrl: null,
    highlights: ["50h battery", "On-ear", "Cloud Pink"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
  {
    asin: "B0CGMV5TMR",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CGMV5TMR?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=a5cf80910706f44f222fef78f9ccf612&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "JBL",
    title: "JBL Tune 520BT (Blue)",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Wireless on-ear headphones from JBL with 57 hours of battery, a teen gift guide pick.",
    imageUrl: null,
    highlights: ["57h battery", "Wireless", "Blue"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
  {
    asin: "B0CZXX465Z",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CZXX465Z?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=4c8f18af9e473c88b2370284b6fe6516&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Kobo",
    title: "Kobo Libra Colour, Black",
    categorySlug: "tech-smart-home",
    shortDescription:
      "A color e-reader from Kobo with physical buttons, 32 GB and built-in library lending.",
    imageUrl: null,
    highlights: ["Color e-reader", "Physical buttons", "32 GB"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
  {
    asin: "B0DY2PB7RB",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DY2PB7RB?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=56c06dd07b52379c68a16eec041e1f28&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "WHOOP",
    title: "WHOOP Life, 12-month membership",
    categorySlug: "health-household",
    shortDescription:
      "A 12-month WHOOP Life membership with daily health insights, ECG and 14+ day battery.",
    imageUrl: null,
    highlights: ["12-month membership", "ECG", "14+ day battery"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
  {
    asin: "B07H52SVM7",
    affiliateUrl:
      "https://www.amazon.com/dp/B07H52SVM7?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=719a20067668dfbacdc7a1819ed415a4&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "OUAI",
    title: "OUAI Scalp & Body Scrub, Melrose Place 8.8 oz",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "A scalp and body scrub from OUAI, with 400+ bought in the past week.",
    imageUrl: null,
    highlights: ["Scalp & body scrub", "Melrose Place", "8.8 oz"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
  {
    asin: "B01B13YLPY",
    affiliateUrl:
      "https://www.amazon.com/dp/B01B13YLPY?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=981a43efb934febaa331981e21ef6a04&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "YETI",
    title: "YETI Rambler 30 oz with MagSlider Lid",
    categorySlug: "home-kitchen",
    shortDescription:
      "A 30 oz Rambler tumbler from YETI with MagSlider lid, a classic in dad and outdoors gift guides.",
    imageUrl: null,
    highlights: ["30 oz", "MagSlider lid", "Outdoors classic"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
  {
    asin: "B0CSLX9D2D",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CSLX9D2D?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=abc446e85b4bb42e161d55dc5d838ac7&language=es_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Fender",
    title: "Fender FA-25 Dreadnought, Sunburst",
    categorySlug: "musical-instruments",
    shortDescription:
      "A dreadnought acoustic guitar from Fender, #1 for beginners and including Fender Play.",
    imageUrl: null,
    highlights: ["Dreadnought", "#1 for beginners", "Fender Play"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 11:00, SiteStripe)",
  },
];
