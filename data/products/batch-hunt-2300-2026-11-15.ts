import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-15 (revisión de las 23:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 18 ASIN son nuevos en el catálogo (verificado
// contra main, 786 ASINs tras el PR #52). Fuera: el pack de 2
// regaderas solares enanas propuesto como B0FLDM5G11 (sin enlace de
// Alya) y el B0FLDJRSG5 que Alya envió en su lugar (dos búsquedas web
// no devuelven ningún registro de Amazon para ese ASIN; queda fuera
// hasta que Alya confirme qué producto es, mismo listón que
// B08DXFZ5J6). Las velas Homemory van en home-kitchen (precedente
// GODONLIF), no en tools-home-improvement.
export const BATCH_HUNT_2300_2026_11_15: BatchProduct[] = [
  {
    asin: "B0FXN2JWST",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FXN2JWST?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=fd2bd247943ddaa3f0833c7849914c24&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Amazon",
    title: "Amazon Echo Dot (Newest Model), 6th Gen",
    categorySlug: "tech-smart-home",
    shortDescription:
      "The newest Echo Dot with a built-in smart home hub — the 2026 model, a Christmas-season favorite.",
    imageUrl: null,
    highlights: ["Echo Dot", "6th Gen", "Smart Home Hub"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0F82HR8QZ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F82HR8QZ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=3361b1e23252271aced54401a9dfc4f9&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "UGREEN",
    title: "UGREEN FineTrack Air Tracker Tags, 4-Pack",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Four UGREEN FineTrack tags for Apple Find My — the budget alternative to AirTag for keys and bags.",
    imageUrl: null,
    highlights: ["UGREEN", "FineTrack", "4-Pack"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0C3242SWL",
    affiliateUrl:
      "https://www.amazon.com/dp/B0C3242SWL?&linkCode=ll2&tag=ecommercety00-20&linkId=a597bcad0caf88aefe993e065122562b&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "FUJIFILM",
    title: "FUJIFILM Instax Mini 12 Instant Camera Bundle, Lilac Purple",
    categorySlug: "cameras-photo",
    shortDescription:
      "The Instax Mini 12 bundle in Lilac Purple with 60 film sheets, a case and an album — a different bundle from the Holiday Bundle 2025 already in the catalog.",
    imageUrl: null,
    highlights: ["Instax Mini 12", "Bundle", "Lilac Purple"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B08HVMF9QL",
    affiliateUrl:
      "https://www.amazon.com/dp/B08HVMF9QL?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=f201d394224b7ac12dc5a8cda176a05f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Phomemo",
    title: "Phomemo D30 Label Maker",
    categorySlug: "office-products",
    shortDescription:
      "The portable thermal label maker, number one in portable thermal printers.",
    imageUrl: null,
    highlights: ["Phomemo", "Label Maker", "Thermal"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0DZD9S5GC",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DZD9S5GC?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=3d5cb5459dc8a232da343016b9ab29e8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Apple",
    title: "Apple MacBook Air 13-inch Laptop with M4 chip, 16GB, 256GB, Midnight",
    categorySlug: "computers",
    shortDescription:
      "The 13-inch MacBook Air with the M4 chip — the number one laptop, the season's premium gift.",
    imageUrl: null,
    highlights: ["MacBook Air", "M4", "Midnight"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0B14C719T",
    affiliateUrl:
      "https://www.amazon.com/dp/B0B14C719T?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=56b7545e912720b7c318835cc230185e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Kasa",
    title: "Kasa Smart Plug Mini EP25P4 with HomeKit, 4-Pack",
    categorySlug: "tech-smart-home",
    shortDescription:
      "The Kasa smart plug with HomeKit support, ideal for Christmas lights — a different model from the EP10P4 already in the catalog.",
    imageUrl: null,
    highlights: ["Kasa", "EP25P4", "HomeKit"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B06XCTP65H",
    affiliateUrl:
      "https://www.amazon.com/dp/B06XCTP65H?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=0e628e5c0ff6d32fb6ebbb454cf4ab8b&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Homemory",
    title: "Homemory Flameless LED Candles, 24-Pack",
    categorySlug: "home-kitchen",
    shortDescription:
      "Twenty-four flameless LED candles — the safe Christmas centerpiece candles.",
    imageUrl: null,
    highlights: ["Homemory", "LED Candles", "24-Pack"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0GGRTD2ZY",
    affiliateUrl:
      "https://www.amazon.com/dp/B0GGRTD2ZY?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=883008dd3fe327036889a3cc000fa6e3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "roborock",
    title: "roborock Qrevo S Pro Robot Vacuum and Mop (2026)",
    categorySlug: "appliances",
    shortDescription:
      "The 2026 roborock robot vacuum and mop — the viral Black Friday model.",
    imageUrl: null,
    highlights: ["roborock", "Qrevo S Pro", "Robot Vacuum"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0F7X6BKRC",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F7X6BKRC?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=50245fd0e2e35e62adc0f78d33184f8c&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ostritec",
    title: "Ostritec Solar Metal Watering Can with Hummingbird and Cascading Lights",
    categorySlug: "garden",
    shortDescription:
      "The solar watering can with a hummingbird and cascading lights — Amazon's Choice for garden decor.",
    imageUrl: null,
    highlights: ["Solar Watering Can", "Hummingbird", "Garden Decor"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B071VG5N9D",
    affiliateUrl:
      "https://www.amazon.com/dp/B071VG5N9D?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=870252de55fd201de7f4feeec1a9ec70&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Amazon Basics",
    title: "Amazon Basics 21-Inch Hardside Carry-On Luggage, Black",
    categorySlug: "luggage",
    shortDescription:
      "The number one cabin-size hardside carry-on, in black — the navy variant is already in the catalog.",
    imageUrl: null,
    highlights: ["Amazon Basics", "Carry-On", "Black"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0DDDN9SV6",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DDDN9SV6?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=f33afd9c929912a3fd8bc53961c3877f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Poppy Playtime",
    title: "Poppy Playtime Triple Pack, PS5",
    categorySlug: "video-games",
    shortDescription:
      "The first three chapters of the youth phenomenon, in one PS5 pack.",
    imageUrl: null,
    highlights: ["Poppy Playtime", "Triple Pack", "PS5"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0DXSYTFY7",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DXSYTFY7?&linkCode=ll2&tag=ecommercety00-20&linkId=de50a008e648cdae86d56cc8154ef4bf&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LOVEVERY",
    title: "LOVEVERY Newborn Gift Set",
    categorySlug: "baby-products",
    shortDescription:
      "The newborn gift set with the most recommended baby play gym — the gym alone is already in the catalog.",
    imageUrl: null,
    highlights: ["LOVEVERY", "Newborn Gift Set", "Play Gym"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0G6N53JYP",
    affiliateUrl:
      "https://www.amazon.com/dp/B0G6N53JYP?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=2cc695302e92c17ff08b6faf92147b98&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "HALO",
    title: "HALO SleepSack Swaddle, Sage, Small",
    categorySlug: "baby-products",
    shortDescription:
      "The classic swaddle for newborns, in Sage — a variant of the line already in the catalog.",
    imageUrl: null,
    highlights: ["HALO", "SleepSack Swaddle", "Sage"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0FPL3QMCQ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FPL3QMCQ?&linkCode=ll2&tag=ecommercety00-20&linkId=af9f31f3448663c4ce19742240c64cb7&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Tayari Jones",
    title: "Kin",
    categorySlug: "books",
    shortDescription:
      "Kin by Tayari Jones, Kindle edition — number four in Amazon's Best Books of 2026, an Oprah's Book Club pick. The hardcover is already in the catalog.",
    imageUrl: null,
    highlights: ["Kin", "Tayari Jones", "Kindle"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B07D323MFZ",
    affiliateUrl:
      "https://www.amazon.com/dp/B07D323MFZ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=4f2a385b196576e0502dd38c25d3aaf0&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "INABA",
    title: "INABA Churu Cat Treats, 50 Tubes",
    categorySlug: "pet-supplies",
    shortDescription:
      "The most recommended cat treats — fifty tubes of the lickable puree cats love.",
    imageUrl: null,
    highlights: ["INABA", "Churu", "50 Tubes"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B0BZWWB6FB",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BZWWB6FB?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=2593caa3df2baca6c9043363565c9849&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "SOL DE JANEIRO",
    title: "SOL DE JANEIRO Beija Flor Jet Set",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "The Beija Flor travel set — the gift set for mom.",
    imageUrl: null,
    highlights: ["SOL DE JANEIRO", "Beija Flor", "Jet Set"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B08D98XBX8",
    affiliateUrl:
      "https://www.amazon.com/dp/B08D98XBX8?&linkCode=ll2&tag=ecommercety00-20&linkId=6cbf6de0a10b790fc6dc159ebb0ddf18&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Bonne Maman",
    title: "Bonne Maman 2026 Limited Edition Advent Calendar",
    categorySlug: "grocery-gourmet",
    shortDescription:
      "The gourmet advent calendar that sells out every year.",
    imageUrl: null,
    highlights: ["Bonne Maman", "Advent Calendar", "2026"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
  {
    asin: "B07NJSDBQ3",
    affiliateUrl:
      "https://www.amazon.com/dp/B07NJSDBQ3?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=2b33cf3b67b8c3dc5c64a6011e8a4b5b&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Yogasleep",
    title: "Yogasleep Dohm White Noise Machine, White",
    categorySlug: "health-household",
    shortDescription:
      "The original white noise machine — the rest gift for mom.",
    imageUrl: null,
    highlights: ["Yogasleep", "Dohm", "White Noise"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-15 23:00, SiteStripe)",
  },
];
