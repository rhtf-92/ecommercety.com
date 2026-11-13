import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-12 (revisión de las 19:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 9 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes en main, 594 ASINs). Excluido: el mando
// PlayStation DualSense B0CQKLS4RP, Amazon no genera su SiteStripe
// por "Frequently Returned Item" (confirmado por Alya). Sustitución
// aceptada: Alya envió B0DNZRSCMS en lugar del Fullstar Pro Chopper
// 4-in-1 White B0764HS4SL propuesto; verificado en búsqueda web como
// el Fullstar The Original Pro Chopper 14-in-1, SS Black (fichas de
// amazon.ca y amazon.co.uk), misma familia de producto, entra con su
// título correcto. Va en el mismo PR que los lotes de las 15:00 y
// 23:00 del 2026-11-12 (Alya envió los enlaces de las tres
// revisiones juntos).
export const BATCH_HUNT_1900_2026_11_12: BatchProduct[] = [
  {
    asin: "B06XNQDR8J",
    affiliateUrl:
      "https://www.amazon.com/dp/B06XNQDR8J?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=d763e4c61890459162b7b96ce7753231&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LeapFrog",
    title: "LeapFrog 2-in-1 LeapTop Touch, Green",
    categorySlug: "toys-games",
    shortDescription:
      "LeapFrog 2-in-1 LeapTop Touch, Green — the toddler laptop that grows from touch to typing.",
    imageUrl: null,
    highlights: ["LeapFrog", "LeapTop Touch", "Green"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
  {
    asin: "B08LQYT546",
    affiliateUrl:
      "https://www.amazon.com/dp/B08LQYT546?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=057ad59d9cf82e473fb755e82de0e880&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Crayola",
    title: "Crayola Clicks Retractable Tip Markers (10ct)",
    categorySlug: "toys-games",
    shortDescription:
      "Crayola Clicks Retractable Tip Markers (10ct) — the click-and-go markers, no caps to lose.",
    imageUrl: null,
    highlights: ["Crayola", "Clicks", "Retractable Markers 10ct"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
  {
    asin: "B00EB4ADQW",
    affiliateUrl:
      "https://www.amazon.com/dp/B00EB4ADQW?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=ffa34e5f4d3c39e55c06f586da48dca8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "FUJIFILM",
    title: "FUJIFILM Instax Mini Instant Film Twin Pack, 20 Photos",
    categorySlug: "cameras-photo",
    shortDescription:
      "FUJIFILM Instax Mini Instant Film Twin Pack, 20 Photos — the refill for every Instax Mini camera.",
    imageUrl: null,
    highlights: ["FUJIFILM", "Instax Mini", "Film Twin Pack"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
  {
    asin: "B00FA2RLX2",
    affiliateUrl:
      "https://www.amazon.com/dp/B00FA2RLX2?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=1f1456cbe3a7c50dc8526b6f9e70f6c5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Sawyer",
    title: "Sawyer MINI Water Filtration System SP128, Blue",
    categorySlug: "sports-outdoors",
    shortDescription:
      "Sawyer MINI Water Filtration System SP128, Blue — the pocket water filter for trails and travel.",
    imageUrl: null,
    highlights: ["Sawyer", "MINI", "Water Filtration SP128"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
  {
    asin: "B08PPZWNCV",
    affiliateUrl:
      "https://www.amazon.com/dp/B08PPZWNCV?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=61e19ca3af6e476ece46c49478ea49db&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Instant Pot",
    title: "Instant Pot Pro 8 Qt 10-in-1 Pressure Cooker, Black",
    categorySlug: "home-kitchen",
    shortDescription:
      "Instant Pot Pro 8 Qt 10-in-1 Pressure Cooker, Black — the 10-in-1 cooker for big family meals.",
    imageUrl: null,
    highlights: ["Instant Pot", "Pro 8 Qt", "10-in-1 Pressure Cooker"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
  {
    asin: "B0CX24138S",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CX24138S?&linkCode=ll2&tag=ecommercety00-20&linkId=47a2b01bba99ae77209ffa7c184b2abe&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ms. Rachel",
    title: "Ms. Rachel Official Speak & Sing Doll, 16\"",
    categorySlug: "toys-games",
    shortDescription:
      "Ms. Rachel Official Speak & Sing Doll, 16\" — the doll of the show toddlers sing along to.",
    imageUrl: null,
    highlights: ["Ms. Rachel", "Speak & Sing Doll", "16\""],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
  {
    asin: "B0DNZRSCMS",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DNZRSCMS?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=bb46d3efa548326c0f8a5022c7451c80&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Fullstar",
    title: "Fullstar The Original Pro Chopper 14-in-1, SS Black",
    categorySlug: "home-kitchen",
    shortDescription:
      "Fullstar The Original Pro Chopper 14-in-1, SS Black — the viral veggie chopper with 14 functions, in stainless steel black.",
    imageUrl: null,
    highlights: ["Fullstar", "Pro Chopper", "14-in-1"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
  {
    asin: "B07QTZ8238",
    affiliateUrl:
      "https://www.amazon.com/dp/B07QTZ8238?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=14b9fad456cb7849effdca8e9411afd1&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Disney",
    title: "Disney Store Sheriff Woody Talking Action Figure, 15\"",
    categorySlug: "toys-games",
    shortDescription:
      "Disney Store Sheriff Woody Talking Action Figure, 15\" — the talking Woody, straight out of Toy Story.",
    imageUrl: null,
    highlights: ["Disney", "Sheriff Woody", "Talking Action Figure"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
  {
    asin: "B0B1JPPG2L",
    affiliateUrl:
      "https://www.amazon.com/dp/B0B1JPPG2L?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=3094a54a8f451af4a7e25f307ab8a87f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Breville",
    title: "Breville Bambino Espresso Machine BES450BSS",
    categorySlug: "home-kitchen",
    shortDescription:
      "Breville Bambino Espresso Machine BES450BSS — the compact espresso machine for café coffee at home.",
    imageUrl: null,
    highlights: ["Breville", "Bambino", "Espresso Machine"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 19:00, SiteStripe)",
  },
];
