import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-13 (revisión de las 07:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 10 ASIN son nuevos en el catálogo (verificado
// contra main, 654 ASINs tras el PR #47). Dos sustituciones
// verificadas: la Leatherman Wave+ llega como B079MJBP21 (la ficha
// de amazon.com confirma que es la Wave+ 18-in-1 Stainless Steel)
// en lugar del B07BK58NX2 propuesto, y la Fellow Stagg EKG Pro
// llega como B0BF7NKK81 (Matte White, modelo 1222PRO-MW-US) en
// lugar del B07NHC9N34 (Matte Black) propuesto — mismo producto,
// variante de color verificada. Va en el mismo PR que el lote de
// las 11:00 del 2026-11-12 (Alya envió los enlaces de las dos
// revisiones juntos).
export const BATCH_HUNT_0700_2026_11_13: BatchProduct[] = [
  {
    asin: "B079MJBP21",
    affiliateUrl:
      "https://www.amazon.com/dp/B079MJBP21?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=a3961b91abe5e672223b852b494c5783&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Leatherman",
    title: "LEATHERMAN Wave+, 18-in-1, Stainless Steel",
    categorySlug: "tools-home-improvement",
    shortDescription:
      "LEATHERMAN Wave+, 18-in-1, Stainless Steel — the full-size multitool, in stainless steel.",
    imageUrl: null,
    highlights: ["Leatherman", "Wave+", "18-in-1"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B00JP9AJC6",
    affiliateUrl:
      "https://www.amazon.com/dp/B00JP9AJC6?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=e007eca617b8838537114b8a27a76179&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "YETI",
    title: "YETI Rambler 20 oz Tumbler, Stainless Steel",
    categorySlug: "home-kitchen",
    shortDescription:
      "YETI Rambler 20 oz Tumbler, Stainless Steel — the 20 oz tumbler from the gift guides.",
    imageUrl: null,
    highlights: ["YETI", "Rambler", "20 oz Tumbler"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B0HJB76H2V",
    affiliateUrl:
      "https://www.amazon.com/dp/B0HJB76H2V?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=cfc4bcaac9925a655d0fcb99c056c5b5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Apple",
    title: "Apple AirPods 5 with Wireless Charging Case",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Apple AirPods 5 with Wireless Charging Case — the new AirPods with wireless charging.",
    imageUrl: null,
    highlights: ["Apple", "AirPods 5", "Wireless Charging Case"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B0CTP56C5R",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CTP56C5R?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=0ec8cfc2d998fb50163a00ea53d54496&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "JBL",
    title: "JBL Clip 5 Portable Bluetooth Speaker, Black",
    categorySlug: "tech-smart-home",
    shortDescription:
      "JBL Clip 5 Portable Bluetooth Speaker, Black — the portable speaker, in black.",
    imageUrl: null,
    highlights: ["JBL", "Clip 5", "Portable Bluetooth Speaker"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B00B5FEBEA",
    affiliateUrl:
      "https://www.amazon.com/dp/B00B5FEBEA?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=d70f76bcc7d8e74e0201ff914ba5ca51&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Jellycat",
    title: "Jellycat Bartholomew Bear Stuffed Animal, Medium 10\"",
    categorySlug: "toys-games",
    shortDescription:
      "Jellycat Bartholomew Bear Stuffed Animal, Medium 10\" — the classic Jellycat bear.",
    imageUrl: null,
    highlights: ["Jellycat", "Bartholomew Bear", "Medium 10\""],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B001650NNW",
    affiliateUrl:
      "https://www.amazon.com/dp/B001650NNW?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=63c28b9b778b4a2da86b5594e60d8a8d&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Purina",
    title: "Purina Pro Plan FortiFlora Dog Probiotic, 30 ct Box",
    categorySlug: "pet-supplies",
    shortDescription:
      "Purina Pro Plan FortiFlora Dog Probiotic, 30 ct Box — the dog probiotic, 100K+ bought last month.",
    imageUrl: null,
    highlights: ["Purina", "FortiFlora", "Dog Probiotic"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B08T26NDPN",
    affiliateUrl:
      "https://www.amazon.com/dp/B08T26NDPN?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=975aefe55216ab8283c0ca8a0256fd90&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Icons Porsche 911 10295, Turbo/Targa 2-in-1",
    categorySlug: "toys-games",
    shortDescription:
      "LEGO Icons Porsche 911 10295, Turbo/Targa 2-in-1 — the classic build for dad, two cars in one set.",
    imageUrl: null,
    highlights: ["LEGO", "Icons Porsche 911", "10295"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B0BF7NKK81",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BF7NKK81?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=5a8586fbbe3a0b0994d7811d9ed18b16&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Fellow",
    title: "Fellow Stagg EKG Pro Electric Gooseneck Kettle, Matte White, 0.9 L",
    categorySlug: "home-kitchen",
    shortDescription:
      "Fellow Stagg EKG Pro Electric Gooseneck Kettle, Matte White, 0.9 L — the gooseneck kettle for pour-over coffee, in matte white.",
    imageUrl: null,
    highlights: ["Fellow", "Stagg EKG Pro", "Gooseneck Kettle"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B0DSWVM4TW",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DSWVM4TW?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=da8b5d4185a64fadbd0f4d87ca2689b2&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Disney",
    title: "Disney Store Forky Talking Action Figure, 7\"",
    categorySlug: "toys-games",
    shortDescription:
      "Disney Store Forky Talking Action Figure, 7\" — the talking Forky from Toy Story.",
    imageUrl: null,
    highlights: ["Disney", "Forky", "Talking Action Figure"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
  {
    asin: "B0FK19M576",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FK19M576?&linkCode=ll2&tag=ecommercety00-20&linkId=82ea5e316024b50da4d328034f019e8a&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Fisher-Price",
    title: "Fisher-Price Imaginext Woody & R.C. Play Set",
    categorySlug: "toys-games",
    shortDescription:
      "Fisher-Price Imaginext Woody & R.C. Play Set — Woody and R.C. together, ready to play.",
    imageUrl: null,
    highlights: ["Fisher-Price", "Imaginext", "Woody & R.C."],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 07:00, SiteStripe)",
  },
];
