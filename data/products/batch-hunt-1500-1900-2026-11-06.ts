import type { BatchProduct } from "./batch-001";

// Lote combinado de las cazas manuales del 2026-11-06 (revisiones de
// las 15:00 y las 19:00 hora Lima), con enlaces SiteStripe generados
// por Alya con el Tracking ID WEB (ecommercety00-20). Sin scraping
// de Amazon y sin precios copiados: el sitio sigue mostrando "Check
// price on Amazon" hasta la Creators API. Los 20 ASIN son nuevos en
// el catálogo (verificado contra los lotes existentes en main).
// Fuera del lote: Kendra Scott Elisa (B00FGZ0KWM) — el ASIN no pudo
// verificarse contra ninguna ficha de amazon.com (la búsqueda no lo
// confirma y Amazon bloquea el acceso de agentes de IA), así que no
// entra hasta que Alya confirme qué producto es. Incluye la nueva
// categoría cameras-photo (DJI Osmo Pocket 3), implementada en este
// mismo PR: el import exige db:seed antes que db:import.
export const BATCH_HUNT_1500_1900_2026_11_06: BatchProduct[] = [
  {
    asin: "B0GCBV6M3Y",
    affiliateUrl:
      "https://www.amazon.com/dp/B0GCBV6M3Y?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=606c74008a32780a4cdcf9ad447e46dc&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Mattel",
    title: "Mattel KPop Demon Hunters HUNTR/X Zoey \"Golden\" Singing Doll",
    categorySlug: "toys-games",
    shortDescription:
      "A singing Zoey doll from Mattel's KPop Demon Hunters HUNTR/X line, #1 in Dolls and #6 in Toys & Games.",
    imageUrl: null,
    highlights: ["Singing doll", "#1 in Dolls", "HUNTR/X"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B0CYM2Y154",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CYM2Y154?&linkCode=ll2&tag=ecommercety00-20&linkId=6fc35c89b4615c78150a781e1b24778b&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Icons Poinsettia (10370)",
    categorySlug: "toys-games",
    shortDescription:
      "A Christmas poinsettia building set from LEGO Icons, retiring soon and in Black Friday rounds.",
    imageUrl: null,
    highlights: ["Icons 10370", "Christmas set", "Retiring soon"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B0DTJ6K9V3",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DTJ6K9V3?&linkCode=ll2&tag=ecommercety00-20&linkId=0a2262ac0249619132debeaa48f5619e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Hatchimals",
    title: "Hatchimals Bloomables Kittyfly",
    categorySlug: "toys-games",
    shortDescription:
      "A Bloomables Kittyfly from Hatchimals, in the holiday gift lists.",
    imageUrl: null,
    highlights: ["Bloomables", "Holiday lists", "Interactive toy"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B0CTJ7PVN1",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CTJ7PVN1?&linkCode=ll2&tag=ecommercety00-20&linkId=a839d1cf811556ca5fdd530927fdabca&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Shure",
    title: "Shure MV7+ Podcast Dynamic Microphone",
    categorySlug: "musical-instruments",
    shortDescription:
      "A dynamic podcast microphone from Shure, in early Black Friday coverage.",
    imageUrl: null,
    highlights: ["Podcast mic", "Dynamic", "USB/XLR"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B0DZDBHQPQ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DZDBHQPQ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=312ea87bd2f0e16da392b6a8b6489b80&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Apple",
    title: "Apple 2025 MacBook Air 13-inch Laptop with M4 chip, 24GB/512GB, Midnight",
    categorySlug: "computers",
    shortDescription:
      "The 2025 MacBook Air 13-inch with M4 chip, 24GB unified memory and 512GB SSD in Midnight.",
    imageUrl: null,
    highlights: ["M4 chip", "24GB / 512GB", "Midnight"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B08S35399Y",
    affiliateUrl:
      "https://www.amazon.com/dp/B08S35399Y?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=e1d4a140c61fa9a154d1c91146bbe6c2&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "BAGAIL",
    title: "BAGAIL 8 Set Packing Cubes",
    categorySlug: "luggage",
    shortDescription:
      "An 8-piece packing cube set from BAGAIL, #1 Best Seller in Organizers.",
    imageUrl: null,
    highlights: ["8-piece set", "#1 Organizers", "Travel"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B0DHLSZXQD",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DHLSZXQD?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=2c6d9a2a560db6f7b489f408dfea86ab&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Blink",
    title: "Blink Outdoor 4",
    categorySlug: "tech-smart-home",
    shortDescription:
      "An outdoor security camera from Blink, in Black Friday coverage.",
    imageUrl: null,
    highlights: ["Outdoor camera", "Wireless", "Smart home"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B08BVTC7X4",
    affiliateUrl:
      "https://www.amazon.com/dp/B08BVTC7X4?th=1&psc=1&linkCode=ll2&tag=ecommercety00-20&linkId=2ba8381d8c507b24a2858db9602eb2de&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "PAVILIA",
    title: "PAVILIA Premium Women's Plush Sherpa Robe",
    categorySlug: "fashion-accessories",
    shortDescription:
      "A plush sherpa robe from PAVILIA, #1 in Women's Robes.",
    imageUrl: null,
    highlights: ["Plush sherpa", "#1 Women's Robes", "Fleece"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B0BRDZVJHV",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BRDZVJHV?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=47967d94f46dee055011894afee79969&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Yesteel",
    title: "Yesteel 9 Pairs Gold Hoop Earrings",
    categorySlug: "jewelry",
    shortDescription:
      "A 9-pair set of gold hoop earrings from Yesteel, a top seller in jewelry.",
    imageUrl: null,
    highlights: ["9 pairs", "Gold hoops", "Top seller"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B0CT43D46H",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CT43D46H?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=66f6a1b9caf5ec470f7225841f9029f7&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Keurig",
    title: "Keurig K-Express",
    categorySlug: "appliances",
    shortDescription:
      "A single-serve coffee maker from Keurig, #1 in small appliances.",
    imageUrl: null,
    highlights: ["Single-serve", "#1 small appliance", "Coffee maker"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 15:00, SiteStripe)",
  },
  {
    asin: "B096X9LGJ1",
    affiliateUrl:
      "https://www.amazon.com/dp/B096X9LGJ1?ie=UTF8&s=psc&ASIN=B096X9LGJ1&linkCode=ll2&tag=ecommercety00-20&linkId=528d36e5cd79faca4d006fa2592485c8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ninja",
    title: "Ninja DZ401 Foodi 10-Qt DualZone XL 2-Basket Air Fryer",
    categorySlug: "appliances",
    shortDescription:
      "A 10-quart DualZone XL air fryer from Ninja, an Amazon's Choice in Black Friday rounds.",
    imageUrl: null,
    highlights: ["10-quart", "DualZone XL", "2 baskets"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "B0C7W4KXWJ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0C7W4KXWJ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=00eabb4a13e6da4ebed84a867e6ff963&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "e.l.f.",
    title: "e.l.f. Squeeze Me Lip Balm, Peach",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "A squeeze lip balm from e.l.f., #8 in Lip Balms with 60K+ bought in the past month.",
    imageUrl: null,
    highlights: ["Lip balm", "Peach", "#8 Lip Balms"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "B09SP2XHKT",
    affiliateUrl:
      "https://www.amazon.com/dp/B09SP2XHKT?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=29b8d6abf2a9c72f9a4c82a8b8c55f11&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "NYX",
    title: "NYX PROFESSIONAL MAKEUP Butter Gloss, Sugar Glass (Clear)",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "A butter gloss from NYX, #1 in Lip Gloss with 10K+ bought in the past month.",
    imageUrl: null,
    highlights: ["Lip gloss", "Sugar Glass", "#1 Lip Gloss"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "B0CG19FGQ5",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CG19FGQ5?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=7d38046fcbc4bff9ac4b0e62f5374da0&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "DJI",
    title: "DJI Osmo Pocket 3 Creator Combo",
    categorySlug: "cameras-photo",
    shortDescription:
      "A 4K vlogging camera kit from DJI, #1 Best Seller in Camcorders.",
    imageUrl: null,
    highlights: ["4K vlogging", "Creator Combo", "#1 Camcorders"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "B0CJT5DJ16",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CJT5DJ16?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=75b3bbe30487a966bc7b8ebbda76bfcd&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "PlayStation",
    title: "PlayStation Portal Remote Player",
    categorySlug: "video-games",
    shortDescription:
      "The remote player for PS5 from PlayStation, an Amazon's Choice.",
    imageUrl: null,
    highlights: ["Remote player", "PS5", "Amazon's Choice"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "B0DDQ71B9P",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DDQ71B9P?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=0d8f9f5e2e39516a6ed004d08bf42015&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Anker",
    title: "Anker MagGo 3-in-1 Charging Station, Dock Stand (Qi2 15W)",
    categorySlug: "cell-phones-accessories",
    shortDescription:
      "A 3-in-1 charging station from Anker for iPhone, Apple Watch and AirPods.",
    imageUrl: null,
    highlights: ["3-in-1", "Qi2 15W", "Dock stand"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "B09YVSYGDW",
    affiliateUrl:
      "https://www.amazon.com/dp/B09YVSYGDW?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=dc13231d41a1ad44daa620a2fb163161&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Owlet",
    title: "Owlet Dream Sock, Bedtime Blue",
    categorySlug: "baby-products",
    shortDescription:
      "A smart baby monitor sock from Owlet, #1 in Smart Baby Monitors.",
    imageUrl: null,
    highlights: ["Smart monitor", "Pulse & oxygen", "Bedtime Blue"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "1668236567",
    affiliateUrl:
      "https://www.amazon.com/dp/1668236567?&linkCode=ll2&tag=ecommercety00-20&linkId=66e542a1dc62957609a6527ace7b29a5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Allen Levi",
    title: "Theo of Golden: A Novel",
    categorySlug: "books",
    shortDescription:
      "A novel by Allen Levi, #1 NYT bestseller and #5 on Amazon.",
    imageUrl: null,
    highlights: ["#1 NYT bestseller", "Hardcover", "2026 phenomenon"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "1454961791",
    affiliateUrl:
      "https://www.amazon.com/dp/1454961791?&linkCode=ll2&tag=ecommercety00-20&linkId=b8d1950d286e60815f6548847173390e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Manuel Garand",
    title: "Murdoku: 80 Murder Mystery Logic Puzzles",
    categorySlug: "books",
    shortDescription:
      "A murder-mystery logic puzzle book by Manuel Garand, #1 in Sudoku with 159K+ copies sold.",
    imageUrl: null,
    highlights: ["80 puzzles", "#1 Sudoku", "Murder mystery"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
  {
    asin: "B0D9LNV47N",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D9LNV47N?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=4c54bd49f844a5329dd515d5fd439781&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "PETLIBRO",
    title: "PETLIBRO Dockstream Cat Water Fountain + 4 filters (bundle)",
    categorySlug: "pet-supplies",
    shortDescription:
      "A cat water fountain bundle with app and steel tray from PETLIBRO.",
    imageUrl: null,
    highlights: ["App control", "Steel tray", "Bundle + 4 filters"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-06 19:00, SiteStripe)",
  },
];
