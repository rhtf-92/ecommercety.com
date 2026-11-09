import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-09 (revisión de las 11:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 8 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes en main, 445 ASINs). Fuera del lote:
// UGG B000EO5MJG — Alya lo envió en lugar del Coquette B0F7FSQ414
// propuesto; no se pudo verificar qué producto es (sin registro del
// ASIN en búsquedas; Amazon no permite el acceso de Muse a sus
// páginas). Furbo B09GDQZLD1 — Alya lo envió en lugar del Furbo
// Mini 360 B0F8LNT9H7 propuesto; verificado como Furbo 360° Dog
// Camera (modelo anterior), pero YA ESTÁ en el catálogo
// (batch-wave1-b.ts), así que es duplicado y queda fuera. Ambos
// quedan fuera hasta que Alya confirme qué productos son (el Furbo
// Mini 360 nuevo sigue sin entrar por no tener enlace).
export const BATCH_HUNT_1100_2026_11_09: BatchProduct[] = [
  {
    asin: "B08H4FSGDW",
    affiliateUrl:
      "https://www.amazon.com/dp/B08H4FSGDW?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=9cfba8c2be663cab5cca9619745f9acf&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Maybelline",
    title: "Maybelline Lash Sensational Sky High Washable Mascara, Very Black",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "Maybelline Lash Sensational Sky High Washable Mascara in Very Black — the viral mascara for long lashes, 7K+ bought last week.",
    imageUrl: null,
    highlights: ["Lash Sensational", "Sky High", "Very Black"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-09 11:00, SiteStripe)",
  },
  {
    asin: "B096SVJZSW",
    affiliateUrl:
      "https://www.amazon.com/dp/B096SVJZSW?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=7c251f22c992e3784a2b352a497925b3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "REVLON",
    title: "REVLON One-Step Volumizer PLUS 2.0, Black",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "REVLON One-Step Volumizer PLUS 2.0 in Black — a 2.4-inch oval brush with heat control, 1K+ bought last week.",
    imageUrl: null,
    highlights: ["One-Step Volumizer", "PLUS 2.0", "2.4-inch"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-09 11:00, SiteStripe)",
  },
  {
    asin: "B0F9Z3JPF6",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F9Z3JPF6?&linkCode=ll2&tag=ecommercety00-20&linkId=6572ef8ead3ca5749634f56f9ade2746&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Sol de Janeiro",
    title: "Sol de Janeiro Spritz & Shine Cheirosa Perfume Mist Set",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "Sol de Janeiro Spritz & Shine Cheirosa Perfume Mist Set — an exclusive holiday set of 4 body mists, Cheirosa 62 scent viral on TikTok.",
    imageUrl: null,
    highlights: ["Cheirosa Perfume Mist", "Holiday set", "4 mists"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-09 11:00, SiteStripe)",
  },
  {
    asin: "B0F7PW29DS",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F7PW29DS?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=2c5bb5c56c19a2879c141e8886d4c950&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Samsung",
    title: "Samsung Galaxy Watch 8 (2025), 44mm Bluetooth, Silver",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Samsung Galaxy Watch 8 (2025), 44mm Bluetooth in Silver — on early Black Friday deal lists.",
    imageUrl: null,
    highlights: ["Galaxy Watch 8", "44mm", "Silver"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-09 11:00, SiteStripe)",
  },
  {
    asin: "B0B789CGGQ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0B789CGGQ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=c7ba65eba1dd9b30473a0891ce0a0640&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Xbox",
    title: "Xbox Elite Series 2 Core Wireless Controller, White",
    categorySlug: "video-games",
    shortDescription:
      "Xbox Elite Series 2 Core Wireless Controller in White — an early Black Friday deal.",
    imageUrl: null,
    highlights: ["Elite Series 2", "Core", "Wireless"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-09 11:00, SiteStripe)",
  },
  {
    asin: "B00IJ0ALYS",
    affiliateUrl:
      "https://www.amazon.com/dp/B00IJ0ALYS?&linkCode=ll2&tag=ecommercety00-20&linkId=e722a0feb58c1306dce27a667c445112&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "DEWALT",
    title: "DEWALT 20V MAX Drill & Impact Driver Combo Kit DCK240C2",
    categorySlug: "tools-home-improvement",
    shortDescription:
      "DEWALT 20V MAX Drill & Impact Driver Combo Kit DCK240C2 — #1 in drill kits, an early Black Friday deal.",
    imageUrl: null,
    highlights: ["20V MAX", "Drill & Impact Driver", "Combo kit"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-09 11:00, SiteStripe)",
  },
  {
    asin: "B008M5U1C2",
    affiliateUrl:
      "https://www.amazon.com/dp/B008M5U1C2?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=95752537cc3b65621cfb83e1b58fff14&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Victorinox",
    title: "Victorinox Fibrox Pro Chef's Knife, 8-Inch",
    categorySlug: "home-kitchen",
    shortDescription:
      "Victorinox Fibrox Pro Chef's Knife, 8-Inch — #1 in chef's knives, 4.8 stars with 15,000+ reviews.",
    imageUrl: null,
    highlights: ["Fibrox Pro", "Chef's knife", "8-Inch"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-09 11:00, SiteStripe)",
  },
  {
    asin: "B00AHAWWO0",
    affiliateUrl:
      "https://www.amazon.com/dp/B00AHAWWO0?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=edcf7ba284688b0c91f0d894385a8f17&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Crest",
    title: "Crest 3D Whitestrips Professional Effects, 44 strips",
    categorySlug: "health-household",
    shortDescription:
      "Crest 3D Whitestrips Professional Effects, 44 strips — #1 in teeth whitening, 5K+ bought last week.",
    imageUrl: null,
    highlights: ["3D Whitestrips", "Professional Effects", "44 strips"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-09 11:00, SiteStripe)",
  },
];
