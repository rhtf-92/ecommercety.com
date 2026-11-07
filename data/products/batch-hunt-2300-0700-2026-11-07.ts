import type { BatchProduct } from "./batch-001";

// Lote combinado de las cazas manuales del 2026-11-06 (revisión de
// las 23:00) y del 2026-11-07 (revisión de las 07:00 hora Lima), con
// enlaces SiteStripe generados por Alya con el Tracking ID WEB
// (ecommercety00-20). Sin scraping de Amazon y sin precios copiados:
// el sitio sigue mostrando "Check price on Amazon" hasta la
// Creators API. Los 24 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes en main). Fuera del lote: YnM Weighted
// Blanket 15 lb (B073429DV2) — Amazon no genera SiteStripe por
// "Frequently Returned Item" (3er caso tras Solo Stove y Casio
// Casiotone). La Instax, el Tree Hut y los Bose QC Ultra Earbuds
// mostraron "Currently Unavailable" en cachés viejos pero SÍ
// generaron enlace, así que la advertencia queda resuelta. Sin
// categorías nuevas (cameras-photo ya existe en main desde el PR #28).
export const BATCH_HUNT_2300_0700_2026_11_07: BatchProduct[] = [
  {
    asin: "B0DHLHWZT7",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DHLHWZT7?&linkCode=ll2&tag=ecommercety00-20&linkId=82cc36ff4032adf8e064e607418e7baf&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Speed Champions Ferrari SF-24 (77242)",
    categorySlug: "toys-games",
    shortDescription:
      "A Speed Champions Ferrari SF-24 building set, retiring soon and in the toy charts.",
    imageUrl: null,
    highlights: ["Speed Champions", "77242", "Retiring soon"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 23:00, SiteStripe)",
  },
  {
    asin: "B0GV6WRPRV",
    affiliateUrl:
      "https://www.amazon.com/dp/B0GV6WRPRV?&linkCode=ll2&tag=ecommercety00-20&linkId=146f51ca41f1266eda5c59e92afd0b91&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Pokémon",
    title: "Pokémon TCG: Mega Moonlit Tin (Mega Gengar ex)",
    categorySlug: "toys-games",
    shortDescription:
      "A Mega Moonlit Tin with Mega Gengar ex, in Amazon's Toys We Love 2026 list.",
    imageUrl: null,
    highlights: ["Mega Gengar ex", "TCG tin", "Toys We Love 2026"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 23:00, SiteStripe)",
  },
  {
    asin: "B09GW8QKTR",
    affiliateUrl:
      "https://www.amazon.com/dp/B09GW8QKTR?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=5012e5a70426591a5be27dc782a27c9b&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Crayola",
    title: "Crayola Spiderman Color Wonder (18 pages)",
    categorySlug: "toys-games",
    shortDescription:
      "A Spider-Man Color Wonder mess-free coloring pad, #2 in the toy chart with 10K+ bought last month.",
    imageUrl: null,
    highlights: ["Color Wonder", "Spider-Man", "18 pages"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 23:00, SiteStripe)",
  },
  {
    asin: "B0DF495Y66",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DF495Y66?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=9283b6c9a56e111cd15b57bf72ce9237&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Owala",
    title: "Owala SmoothSip Slider 20 oz, Cozy Cocoa",
    categorySlug: "home-kitchen",
    shortDescription:
      "A 20 oz SmoothSip Slider bottle from Owala in Cozy Cocoa, climbing the kitchen best sellers.",
    imageUrl: null,
    highlights: ["20 oz", "SmoothSip", "Cozy Cocoa"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 23:00, SiteStripe)",
  },
  {
    asin: "B0DQ6PP1ZV",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DQ6PP1ZV?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=ec45e769cde6d03d8e170c2b302c4ea8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "bella",
    title: "bella Fits-Anywhere Slim Toaster 2-slice",
    categorySlug: "home-kitchen",
    shortDescription:
      "A slim 2-slice toaster from bella, #1 in small appliances.",
    imageUrl: null,
    highlights: ["2-slice", "Slim", "#1 small appliances"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 23:00, SiteStripe)",
  },
  {
    asin: "B0C2FF4JD1",
    affiliateUrl:
      "https://www.amazon.com/dp/B0C2FF4JD1?ie=UTF8&s=psc&ASIN=B0C2FF4JD1&th=1&linkCode=ll2&tag=ecommercety00-20&linkId=d3ce23d425a32a61f800689cdaf574b1&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ninja",
    title: "Ninja Blast 18 oz, Black (BC151BK)",
    categorySlug: "home-kitchen",
    shortDescription:
      "An 18 oz portable blender from Ninja, new at #15 in Small Appliances and rising.",
    imageUrl: null,
    highlights: ["18 oz", "Portable blender", "BC151BK"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 23:00, SiteStripe)",
  },
  {
    asin: "B0C33CHG99",
    affiliateUrl:
      "https://www.amazon.com/dp/B0C33CHG99?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=04248f06f1f7049b31021cfdb9ec07b9&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Cosori",
    title: "Cosori TurboBlaze 9-in-1 Air Fryer 6 Qt, Dark Gray",
    categorySlug: "home-kitchen",
    shortDescription:
      "A 6-quart 9-in-1 air fryer from Cosori, a best seller among air fryers.",
    imageUrl: null,
    highlights: ["6 Qt", "9-in-1", "TurboBlaze"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 23:00, SiteStripe)",
  },
  {
    asin: "B0B4PPHG8G",
    affiliateUrl:
      "https://www.amazon.com/dp/B0B4PPHG8G?ie=UTF8&s=psc&ASIN=B0B4PPHG8G&th=1&linkCode=ll2&tag=ecommercety00-20&linkId=d7baa2ed7306005175cc7304fdad7259&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ninja",
    title: "Ninja PossibleCooker PRO 8.5-Qt, Sea Salt Gray (MC1001)",
    categorySlug: "home-kitchen",
    shortDescription:
      "An 8.5-quart multi-cooker from Ninja, #12 in Small Appliances and climbing.",
    imageUrl: null,
    highlights: ["8.5-Qt", "8-in-1", "MC1001"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 23:00, SiteStripe)",
  },
  {
    asin: "B08FCGH2RL",
    affiliateUrl:
      "https://www.amazon.com/dp/B08FCGH2RL?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=019afd6fc7f708239ed22e127362eb9a&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Skullcandy",
    title: "Skullcandy Crusher Evo, True Black",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Over-ear headphones from Skullcandy with patented bass vibration and 40 h battery, #3 in the teen gift guide.",
    imageUrl: null,
    highlights: ["Bass vibration", "40 h battery", "Over-ear"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B08MVGF24M",
    affiliateUrl:
      "https://www.amazon.com/dp/B08MVGF24M?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=61d629e1130548016c03297af35092bf&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Sony",
    title: "Sony WH-1000XM4, Midnight Blue",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Noise-canceling headphones from Sony with 30 h battery, a teen gift guide favorite.",
    imageUrl: null,
    highlights: ["Noise canceling", "30 h battery", "Midnight Blue"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B09X1XN3FZ",
    affiliateUrl:
      "https://www.amazon.com/dp/B09X1XN3FZ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=56353170dfb636b6b1133a8b7641cdf0&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Aura",
    title: "Aura Carver HD WiFi Digital Picture Frame 10.1\"",
    categorySlug: "tech-smart-home",
    shortDescription:
      "A 10.1-inch WiFi digital picture frame from Aura, the best digital frame of 2026, a gift for moms and grandparents.",
    imageUrl: null,
    highlights: ["10.1-inch", "WiFi frame", "Wirecutter pick"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0DC93K4NW",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DC93K4NW?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=a591dbcb8071c0bb0118391747154c23&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Amazon",
    title: "Amazon Echo Show 8 (2025 release), Glacier White",
    categorySlug: "tech-smart-home",
    shortDescription:
      "The 2025 Echo Show 8 with an 8.7-inch HD screen and Alexa+, in the dad and Black Friday gadget guides.",
    imageUrl: null,
    highlights: ["8.7-inch HD", "Alexa+", "2025 release"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0F7M3HPBD",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F7M3HPBD?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=989b3a6d20e0f5d50551a20a7cb57af6&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Bose",
    title: "Bose QuietComfort Ultra Earbuds (2nd Gen), Black",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Second-gen noise-canceling earbuds from Bose with immersive audio, in the Black Friday guide for men.",
    imageUrl: null,
    highlights: ["Noise canceling", "Immersive audio", "2nd Gen"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0FM1VBJYQ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FM1VBJYQ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=fdb70e91d79891fbe30b0e5aa8012e21&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "FUJIFILM",
    title: "FUJIFILM Instax Mini Link 2 Smartphone Printer Bundle 2025, Clay White",
    categorySlug: "cameras-photo",
    shortDescription:
      "A smartphone printer bundle from FUJIFILM, a teen gift guide pick with 5K+ bought last month.",
    imageUrl: null,
    highlights: ["Smartphone printer", "Bundle 2025", "Clay White"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0DY89Z83G",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DY89Z83G?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=f9553e986f76fba4093d7c8ae9f764a3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "KODAK",
    title: "KODAK PIXPRO C1 Digital Camera, 13MP, Brown",
    categorySlug: "cameras-photo",
    shortDescription:
      "A 13MP compact digital camera from KODAK, in the Gen Z compact camera trend with a flip screen for selfies.",
    imageUrl: null,
    highlights: ["13MP", "Flip screen", "Compact"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0CGY4X222",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CGY4X222?&linkCode=ll2&tag=ecommercety00-20&linkId=d09e6b1e487c770b41c6f61be0a7b4d2&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Botanicals Bouquet of Roses (10328)",
    categorySlug: "toys-games",
    shortDescription:
      "A Botanicals bouquet of 12 roses to build, 822 pieces, in the gift guides for moms and couples.",
    imageUrl: null,
    highlights: ["Botanicals 10328", "12 roses", "822 pieces"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0DDS1368S",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DDS1368S?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=25ca864648734d618466878b5d2dc8e0&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "DJI",
    title: "DJI Neo Three-Battery Combo, Mini Drone 4K",
    categorySlug: "toys-games",
    shortDescription:
      "A 135 g palm-takeoff mini drone from DJI in 4K, #1 in the teen gift guide.",
    imageUrl: null,
    highlights: ["4K mini drone", "135 g", "Three-battery combo"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B09MDJ1ZK8",
    affiliateUrl:
      "https://www.amazon.com/dp/B09MDJ1ZK8?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=1544e90414e58b545d49de547569497e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Kitsch",
    title: "Kitsch Satin Pillowcase with Zipper, Ivory, set of 2 (19\"x26\")",
    categorySlug: "home-kitchen",
    shortDescription:
      "A set of 2 satin pillowcases from Kitsch, 3.6M sold, for hair and skin.",
    imageUrl: null,
    highlights: ["Set of 2", "Satin", "Ivory"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B091B99DR1",
    affiliateUrl:
      "https://www.amazon.com/dp/B091B99DR1?&linkCode=ll2&tag=ecommercety00-20&linkId=6bdce551ae558f5e71384c6f623fa676&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Tree Hut",
    title: "Tree Hut Tropic Glow Shea Sugar Scrub, 18 oz",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "An 18 oz shea sugar scrub from Tree Hut, #1 in Body Scrubs and in the teen guides.",
    imageUrl: null,
    highlights: ["18 oz", "#1 Body Scrubs", "Tropic Glow"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0DVDG5TRT",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DVDG5TRT?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=315dd1865fa890c63f4a2b961761f66f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Nespresso",
    title: "Nespresso Vertuo Pop+ by De'Longhi, Pacific Blue",
    categorySlug: "appliances",
    shortDescription:
      "A compact capsule coffee maker from Nespresso by De'Longhi, 5 sizes, in the mom gift guide.",
    imageUrl: null,
    highlights: ["Capsule coffee", "5 sizes", "Pacific Blue"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B07WNRN9WQ",
    affiliateUrl:
      "https://www.amazon.com/dp/B07WNRN9WQ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=847c85fd94971160dfc7e8c0119f0807&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Glocusent",
    title: "Glocusent LED Neck Reading Light",
    categorySlug: "books",
    shortDescription:
      "A rechargeable LED neck reading light from Glocusent, 3 colors and 80 h, in the mom gift guide.",
    imageUrl: null,
    highlights: ["Rechargeable", "3 colors", "80 h"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0BHTWFQ5X",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BHTWFQ5X?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=e09946d5e74f229ddb77509d89caac59&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Lindt",
    title: "Lindt LINDOR Assorted Chocolate Truffles 90 Count Gift Box, 38.4 oz",
    categorySlug: "grocery-gourmet",
    shortDescription:
      "A 90-count assorted truffle gift box from Lindt, ready to gift, in the mom gift guide.",
    imageUrl: null,
    highlights: ["90 count", "Gift box", "Assorted"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0D4DLXNR1",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D4DLXNR1?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=726ce106fbf8b67a805adc9a6cded472&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "GOOLOO",
    title: "GOOLOO A3 Jump Starter with Air Compressor, 3000A",
    categorySlug: "automotive",
    shortDescription:
      "A 3000A jump starter with air compressor from GOOLOO, #4 in Jump Starters.",
    imageUrl: null,
    highlights: ["3000A", "Air compressor", "150 PSI"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
  {
    asin: "B0GR6KJ72L",
    affiliateUrl:
      "https://www.amazon.com/dp/B0GR6KJ72L?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=c504694f9f1e3513cdbffb32114fa84c&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Apple",
    title: "Apple MacBook Neo 13\" (2026, A18 Pro, 8GB/256GB), Blush",
    categorySlug: "computers",
    shortDescription:
      "The 2026 MacBook Neo 13-inch with A18 Pro chip, 8GB memory and 256GB SSD in Blush, #1 in the teen guide and in Traditional Laptop Computers.",
    imageUrl: null,
    highlights: ["A18 Pro", "8GB / 256GB", "Blush"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-07 07:00, SiteStripe)",
  },
];
