import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-08 (revisión de las 11:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 9 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes en main, 398 ASINs). Fuera del lote:
// Ocoopa UT3 Lite B0CC18WMZS — link caído, confirmado por Alya.
// Carhartt B08BG8JBCR — Alya lo envió en lugar del B002G9U38W
// propuesto (A18); no se pudo verificar qué producto es (Amazon no
// permite el acceso de Muse a sus páginas y no hay registro del
// ASIN en búsquedas). No entra hasta que Alya confirme qué gorro
// es. Sustitución aceptada como variante: Fire TV Stick 4K Plus
// B0CJM1GNFQ → B0F7Z4QZTT (mismo modelo, verificado en Abt y Ubuy).
export const BATCH_HUNT_1100_2026_11_08: BatchProduct[] = [
  {
    asin: "B0F6C7J47V",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F6C7J47V?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=67c9627f102dccc9570b57fcd0383bd3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Bedsure",
    title: "Bedsure Christmas Heated Blanket Throw, Fair Isle 50x60",
    categorySlug: "home-kitchen",
    shortDescription:
      "A Bedsure Christmas Heated Blanket Throw in Fair Isle, 50x60 — a cozy heated throw for winter nights and holiday gifting.",
    imageUrl: null,
    highlights: ["Heated blanket", "Fair Isle", "50x60"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
  {
    asin: "B09GD4YBCY",
    affiliateUrl:
      "https://www.amazon.com/dp/B09GD4YBCY?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=f2e5f02c936b319edbe95a0f3ccd9b54&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Owala",
    title: "Owala FreeSip 24 oz, Boneyard",
    categorySlug: "sports-outdoors",
    shortDescription:
      "An Owala FreeSip bottle, 24 oz in Boneyard — a trending bottle for the gym, the desk and the road.",
    imageUrl: null,
    highlights: ["FreeSip", "24 oz", "Boneyard"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
  {
    asin: "B01GZQ1JFC",
    affiliateUrl:
      "https://www.amazon.com/dp/B01GZQ1JFC?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=40ccfc2e187dc6e4583081b917dc45e5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Kendra Scott",
    title: "Kendra Scott Elisa Pendant Necklace, Emerald Cat's Eye",
    categorySlug: "jewelry",
    shortDescription:
      "A Kendra Scott Elisa pendant necklace in Emerald Cat's Eye, 14k gold-plated — a classic gift for moms.",
    imageUrl: null,
    highlights: ["Elisa", "Emerald Cat's Eye", "14k gold-plated"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
  {
    asin: "B0GC193KXB",
    affiliateUrl:
      "https://www.amazon.com/dp/B0GC193KXB?&linkCode=ll2&tag=ecommercety00-20&linkId=0047c18fef185823f88ba48b81d88ee8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Mattel",
    title: "Mattel KPop Demon Hunters 3.5\" Collectible Figure",
    categorySlug: "toys-games",
    shortDescription:
      "A Mattel KPop Demon Hunters 3.5-inch collectible figure, a small surprise from the viral franchise of the season.",
    imageUrl: null,
    highlights: ["KPop Demon Hunters", "Collectible figure", "3.5-inch"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
  {
    asin: "B0BDDX27WT",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BDDX27WT?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=8007aff8669bf6249d307d497bfcec17&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LOVE MOMENT",
    title: "LOVE MOMENT Electric Mason Jar Vacuum Sealer Kit",
    categorySlug: "home-kitchen",
    shortDescription:
      "A LOVE MOMENT electric mason jar vacuum sealer kit, a clever kitchen gadget for keeping food fresh.",
    imageUrl: null,
    highlights: ["Vacuum sealer", "Mason jar", "Electric"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
  {
    asin: "B0G36TPFH9",
    affiliateUrl:
      "https://www.amazon.com/dp/B0G36TPFH9?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=84ae16a651f3c39ff1ed8e0ae530712e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Squishmallows",
    title: "Squishmallows KPop Demon Hunters Derpy Plush 8\"",
    categorySlug: "toys-games",
    shortDescription:
      "A Squishmallows KPop Demon Hunters Derpy plush, 8 inches — two fan favorites in one soft collectible.",
    imageUrl: null,
    highlights: ["Squishmallows", "KPop Demon Hunters", "Derpy 8-inch"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
  {
    asin: "B0F7Z4QZTT",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F7Z4QZTT?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=8c9a5adf3da4a07236da4152cabd1bda&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Amazon",
    title: "Amazon Fire TV Stick 4K Plus (newest model)",
    categorySlug: "tech-smart-home",
    shortDescription:
      "The newest Amazon Fire TV Stick 4K Plus, with AI-powered Fire TV Search and Wi-Fi 6 — a streaming gift for the living room.",
    imageUrl: null,
    highlights: ["4K Plus", "Wi-Fi 6", "Alexa+"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
  {
    asin: "B0BWNZLQ69",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BWNZLQ69?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=c5d2a8e21bc831b4525ccbaf9c2e2ccb&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Fujifilm",
    title: "Fujifilm Instax Mini 12 Instant Camera, Pastel Blue",
    categorySlug: "cameras-photo",
    shortDescription:
      "A Fujifilm Instax Mini 12 instant camera in Pastel Blue, a fun gift for teens and photo lovers.",
    imageUrl: null,
    highlights: ["Instant camera", "Pastel Blue", "Mini 12"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
  {
    asin: "B0C1HGKNG7",
    affiliateUrl:
      "https://www.amazon.com/dp/B0C1HGKNG7?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=c779fd51c0e735433c969e5d924eaf98&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "JBL",
    title: "JBL Tune 520BT Wireless Headphones, Black",
    categorySlug: "tech-smart-home",
    shortDescription:
      "JBL Tune 520BT wireless headphones in Black, a solid everyday gift for music lovers.",
    imageUrl: null,
    highlights: ["Wireless", "Headphones", "Black"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-08 11:00, SiteStripe)",
  },
];
