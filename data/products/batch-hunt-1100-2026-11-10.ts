import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-10 (revisión de las 11:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 9 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes en main, 484 ASINs). Sin exclusiones
// ni sustituciones en este lote. Va en el mismo PR que el lote de
// las 07:00 del mismo día (Alya envió los enlaces de las dos
// revisiones juntos). Nota: Spikeball y ThermoPro tuvieron señales
// mixtas de stock en las búsquedas, pero Alya generó sus enlaces
// SiteStripe, así que entran (el SiteStripe es la prueba de
// disponibilidad).
export const BATCH_HUNT_1100_2026_11_10: BatchProduct[] = [
  {
    asin: "B01IHHLB3W",
    affiliateUrl:
      "https://www.amazon.com/dp/B01IHHLB3W?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=eb1419035b18057f86a3d00bd8c46e14&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "ThermoPro",
    title: "ThermoPro TP03B",
    categorySlug: "home-kitchen",
    shortDescription:
      "ThermoPro TP03B — a digital kitchen thermometer, a classic gift for cooks.",
    imageUrl: null,
    highlights: ["TP03B", "Digital thermometer", "ThermoPro"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
  {
    asin: "B00006JSUA",
    affiliateUrl:
      "https://www.amazon.com/dp/B00006JSUA?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=8e141c0017b22db68e03a2d6a619189c&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Lodge",
    title: "Lodge Cast Iron Skillet, 10.25\"",
    categorySlug: "home-kitchen",
    shortDescription:
      "Lodge Cast Iron Skillet, 10.25-inch — the classic cast iron skillet, on every kitchen gift list.",
    imageUrl: null,
    highlights: ["Cast Iron Skillet", "10.25-inch", "Lodge"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
  {
    asin: "B014E2D6BY",
    affiliateUrl:
      "https://www.amazon.com/dp/B014E2D6BY?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=90d7ff92a050afbe129da08c5bb456e7&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "grace & stella",
    title: "grace & stella Gold Under Eye Patches, 24 pairs",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "grace & stella Gold Under Eye Patches, 24 pairs — viral under-eye patches, great for gifting.",
    imageUrl: null,
    highlights: ["Gold Under Eye Patches", "24 pairs", "grace & stella"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
  {
    asin: "B002V7A7MQ",
    affiliateUrl:
      "https://www.amazon.com/dp/B002V7A7MQ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=f3a7857aa30a022944ab1eec144d06a8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Spikeball",
    title: "Spikeball 3-Ball Original",
    categorySlug: "sports-outdoors",
    shortDescription:
      "Spikeball 3-Ball Original — the lawn game on every gift list for teens and families.",
    imageUrl: null,
    highlights: ["Spikeball", "3-Ball", "Original"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
  {
    asin: "B0BS1QCFHX",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BS1QCFHX?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=ad52e1e0fdf8f3fdd4a1868ddc22fea0&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Sony",
    title: "Sony WH-CH720N",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Sony WH-CH720N — noise-cancelling headphones, among the most searched in audio.",
    imageUrl: null,
    highlights: ["WH-CH720N", "Noise-cancelling", "Sony"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
  {
    asin: "B0CJ9YX7DG",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CJ9YX7DG?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=ce69226b1e381f4c0c28a77422deeaf8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Wyze",
    title: "Wyze Cam v4",
    categorySlug: "cameras-photo",
    shortDescription:
      "Wyze Cam v4 — a home security camera, much gifted for the house.",
    imageUrl: null,
    highlights: ["Cam v4", "Security camera", "Wyze"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
  {
    asin: "B0D4Z899FP",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D4Z899FP?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=505397b1a638737dd1b6208c1b9afda5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Insta360",
    title: "Insta360 GO 3S Action Bundle, 128GB, White",
    categorySlug: "cameras-photo",
    shortDescription:
      "Insta360 GO 3S Action Bundle, 128GB in White — the tiny action camera, for creators and travel.",
    imageUrl: null,
    highlights: ["GO 3S", "Action Bundle", "128GB"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
  {
    asin: "B07YN82X3B",
    affiliateUrl:
      "https://www.amazon.com/dp/B07YN82X3B?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=bb79525beea8d8d6b651e07c520bf5a6&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Logitech",
    title: "Logitech G203 Lightsync, Black",
    categorySlug: "video-games",
    shortDescription:
      "Logitech G203 Lightsync in Black — a budget gaming mouse, a classic gift for gamers.",
    imageUrl: null,
    highlights: ["G203", "Lightsync", "Gaming mouse"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
  {
    asin: "B0B52MBWNB",
    affiliateUrl:
      "https://www.amazon.com/dp/B0B52MBWNB?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=795e34e7cf65b7a5bda7fc70f81c684f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "INABA",
    title: "INABA Churu Chicken Variety, 40 tubes",
    categorySlug: "pet-supplies",
    shortDescription:
      "INABA Churu Chicken Variety, 40 tubes — the best-selling cat treats, a safe gift for cat owners.",
    imageUrl: null,
    highlights: ["Churu", "Chicken Variety", "40 tubes"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 11:00, SiteStripe)",
  },
];
