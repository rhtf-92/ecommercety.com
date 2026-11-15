import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-14 (revisión de las 19:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 9 ASIN son nuevos en el catálogo (verificado
// contra main, 698 ASINs tras el PR #49). El portátil ASUS Vivobook
// S16 B0DTVYQCPV quedó fuera: Amazon no permite generar su
// SiteStripe por "Frequently Returned Item" (confirmado por Alya).
// El B08DXFZ5J6 que llegó en lugar de las pantuflas Snug Leaves
// B08DY1ZLBR quedó fuera: dos búsquedas web no devolvieron ningún
// registro de ese ASIN en Amazon, pendiente de que Alya confirme
// qué producto es. Va en el mismo PR que los lotes de las 11:00 y
// 15:00 del 2026-11-14 (Alya envió los enlaces de las tres
// revisiones juntos).
export const BATCH_HUNT_1900_2026_11_14: BatchProduct[] = [
  {
    asin: "B07NC58H7P",
    affiliateUrl:
      "https://www.amazon.com/dp/B07NC58H7P?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=9a726b799ac1d8acbdb5c0de8d0523ca&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Barbie",
    title: "Barbie Dreamplane Transforming Playset",
    categorySlug: "toys-games",
    shortDescription:
      "Barbie Dreamplane Transforming Playset — the transforming Barbie Dreamplane, an Amazon Exclusive in the early Black Friday rounds.",
    imageUrl: null,
    highlights: ["Barbie", "Dreamplane", "Transforming Playset"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
  {
    asin: "B0BGQL5B3Q",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BGQL5B3Q?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=64194a673ad95d9b63113a0d47a4e0e8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Botanicals Artificial Wildflower Bouquet 10313",
    categorySlug: "toys-games",
    shortDescription:
      "LEGO Botanicals Artificial Wildflower Bouquet 10313 — the classic LEGO Botanicals bouquet, a gift for adults.",
    imageUrl: null,
    highlights: ["LEGO", "Botanicals", "Wildflower Bouquet"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
  {
    asin: "B0D455QDR9",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D455QDR9?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=267311d5d3cf6462f46434b6b72918b2&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Govee",
    title: "Govee Christmas Lights 2, 99 ft, 300 LED",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Govee Christmas Lights 2, 99 ft, 300 LED — the smart Christmas lights of the season, with Matter and 130+ scenes.",
    imageUrl: null,
    highlights: ["Govee", "Christmas Lights 2", "300 LED"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
  {
    asin: "B0FWK41WF2",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FWK41WF2?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=7ebe317df3e017f412b16bb4008828bf&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "eufy",
    title: "eufy Robot Vacuum Omni C28",
    categorySlug: "appliances",
    shortDescription:
      "eufy Robot Vacuum Omni C28 — the robot vacuum and mop with a 5-in-1 station, in the Black Friday rounds.",
    imageUrl: null,
    highlights: ["eufy", "Robot Vacuum Omni C28", "5-in-1 Station"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
  {
    asin: "B0D9KW8XH9",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D9KW8XH9?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=e7a23003e45e0a567f8cf1c4159679b2&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Melissa & Doug",
    title: "Melissa & Doug Sticker WOW! Disney Mickey Mouse",
    categorySlug: "toys-games",
    shortDescription:
      "Melissa & Doug Sticker WOW! Disney Mickey Mouse — the Mickey sticker album, a mess-free stocking stuffer.",
    imageUrl: null,
    highlights: ["Melissa & Doug", "Sticker WOW!", "Mickey Mouse"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
  {
    asin: "B0DSC8JF59",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DSC8JF59?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=c045cc2923af1e1bb4a5ad1b11fc5577&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Garmin",
    title: "Garmin Instinct 3 AMOLED 45 mm, Black",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Garmin Instinct 3 AMOLED 45 mm, Black — the rugged outdoor GPS watch with an AMOLED screen, in the early Black Friday rounds.",
    imageUrl: null,
    highlights: ["Garmin", "Instinct 3", "AMOLED"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
  {
    asin: "B0C4Y6D5BD",
    affiliateUrl:
      "https://www.amazon.com/dp/B0C4Y6D5BD?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=88df61cc2fbe6c876aa503fae21506d3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "HARYMOR",
    title: "HARYMOR Smart Bird Feeder with Camera",
    categorySlug: "garden",
    shortDescription:
      "HARYMOR Smart Bird Feeder with Camera — the smart bird feeder with a 2K camera and AI species identification, solar powered.",
    imageUrl: null,
    highlights: ["HARYMOR", "Smart Bird Feeder", "Camera"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
  {
    asin: "B0FH6MKKKS",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FH6MKKKS?&linkCode=ll2&tag=ecommercety00-20&linkId=93f47f9dc44a53e9af14a7433ed02869&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "BRAVEBUG",
    title: "BRAVEBUG What I Love About Mom",
    categorySlug: "books",
    shortDescription:
      "BRAVEBUG What I Love About Mom — the fill-in book, a sentimental gift for mom.",
    imageUrl: null,
    highlights: ["BRAVEBUG", "What I Love About Mom", "Fill-in Book"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
  {
    asin: "B00JM5GW10",
    affiliateUrl:
      "https://www.amazon.com/dp/B00JM5GW10?&linkCode=ll2&tag=ecommercety00-20&linkId=71cba3894cccde79b1fdc951ad53fc3c&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Play-Doh",
    title: "Play-Doh Modeling Compound 10-Pack",
    categorySlug: "toys-games",
    shortDescription:
      "Play-Doh Modeling Compound 10-Pack — the 10-pack of Play-Doh, number one in kids' art clay and dough, the classic stocking stuffer.",
    imageUrl: null,
    highlights: ["Play-Doh", "Modeling Compound", "10-Pack"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 19:00, SiteStripe)",
  },
];
