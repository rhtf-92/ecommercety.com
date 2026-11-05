import type { BatchProduct } from "./batch-001";

// Lote de la caza amplia del 2026-11-05, con enlaces SiteStripe
// generados por Alya con el Tracking ID WEB (ecommercety00-20).
// 29 productos: 18 en las 14 categorías existentes y 11 en las 11
// categorías nuevas de la Fase 3 (books, jewelry, watches,
// musical-instruments, arts-crafts, cell-phones-accessories,
// computers, garden, luggage, shoes, appliances), creadas en este
// mismo cambio. Sin scraping de Amazon y sin precios copiados: el
// sitio sigue mostrando "Check price on Amazon" hasta la Creators
// API. Benebone B014JY9E9U y Bonnie & Pop B07K38QBKQ quedaron FUERA:
// Alya no envió enlace SiteStripe de ninguno de los dos (del
// Benebone dijo que SiteStripe no lo genera) y sin su enlace no se
// publica. Los 29 ASIN son nuevos en el catálogo (verificado contra
// main y contra los PRs #20 y #21 abiertos).
export const BATCH_WIDE_2026_11_05: BatchProduct[] = [
  {
    asin: "B0BWP15J1P",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BWP15J1P?&linkCode=ll2&tag=ecommercety00-20&linkId=cce71561b078f76d482ea6755898f91d&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Fujifilm",
    title: "Fujifilm Instax Mini 12 Instant Camera (Blossom Pink)",
    categorySlug: "tech-smart-home",
    shortDescription:
      "An instant camera that prints credit-card photos on the spot, the teen gift of the season.",
    imageUrl: null,
    highlights: ["Instant prints", "Blossom Pink", "Teen favorite"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0CTP1XHBX",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CTP1XHBX?&linkCode=ll2&tag=ecommercety00-20&linkId=a296513e05fbdad518892cea5770ef77&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "JBL",
    title: "JBL Clip 5 Portable Bluetooth Speaker (Squad)",
    categorySlug: "tech-smart-home",
    shortDescription:
      "A waterproof clip-on speaker that goes anywhere, the portable gift teens actually use.",
    imageUrl: null,
    highlights: ["Waterproof", "Clip-on", "Portable"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B07VHZ41L8",
    affiliateUrl:
      "https://www.amazon.com/dp/B07VHZ41L8?&linkCode=ll2&tag=ecommercety00-20&linkId=580d91b427c59e79f1e776ecc58e6a86&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Amazon",
    title: "Amazon Echo Show 10 (3rd Gen, Charcoal)",
    categorySlug: "tech-smart-home",
    shortDescription:
      "A smart display that follows you around the room, the kitchen-counter upgrade of the season.",
    imageUrl: null,
    highlights: ["Rotating display", "Alexa built-in", "Smart home hub"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0B2RM68G2",
    affiliateUrl:
      "https://www.amazon.com/dp/B0B2RM68G2?&linkCode=ll2&tag=ecommercety00-20&linkId=b205a7d1c55dab37b99afdbd9c57e88e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "BIODANCE",
    title: "BIODANCE Bio-Collagen Real Deep Mask, 1.19 oz x 4",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "An overnight Korean collagen mask for glass-skin mornings, the viral beauty gift.",
    imageUrl: null,
    highlights: ["Overnight mask", "K-beauty", "4 masks"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B09V7Z4TJG",
    affiliateUrl:
      "https://www.amazon.com/dp/B09V7Z4TJG?&linkCode=ll2&tag=ecommercety00-20&linkId=f1536821fbb3061bdb52bc0c65a5ebe1&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "medicube",
    title: "medicube Toner Pads Zero Pore Pad 2.0, 70 pads",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "Viral Korean toner pads for visibly smoother pores, the skincare stocking stuffer.",
    imageUrl: null,
    highlights: ["Pore care", "K-beauty", "70 pads"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B08KT2Z93D",
    affiliateUrl:
      "https://www.amazon.com/dp/B08KT2Z93D?&linkCode=ll2&tag=ecommercety00-20&linkId=938f510930872478620f7fcc1e9de270&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "eos",
    title: "eos Shea Better Body Lotion Vanilla Cashmere, 16 fl oz",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "A bestselling vanilla cashmere body lotion, the everyday luxury gift.",
    imageUrl: null,
    highlights: ["Vanilla Cashmere", "Shea butter", "16 fl oz"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0DJFB6ZKM",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DJFB6ZKM?ie=UTF8&s=psc&ASIN=B0DJFB6ZKM&linkCode=ll2&tag=ecommercety00-20&linkId=2d3c46543cb007521fb3132b6ea162db&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ninja",
    title: "Ninja Crispi 4-in-1 Portable Glass Air Fryer, FN101SG (Green)",
    categorySlug: "home-kitchen",
    shortDescription:
      "A portable glass air fryer for crisp meals anywhere, the kitchen gift of the season.",
    imageUrl: null,
    highlights: ["4-in-1", "Glass baskets", "Portable"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B003OAJGJO",
    affiliateUrl:
      "https://www.amazon.com/dp/B003OAJGJO?&linkCode=ll2&tag=ecommercety00-20&linkId=fa8d2e546c05ee5273a995e5bbf83a2b&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Crock-Pot",
    title: "Crock-Pot 7-Quart Manual Slow Cooker (Stainless)",
    categorySlug: "home-kitchen",
    shortDescription:
      "A classic 7-quart slow cooker for family dinners, the winter kitchen staple.",
    imageUrl: null,
    highlights: ["7-quart", "Family size", "Winter staple"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B086PKMZ21",
    affiliateUrl:
      "https://www.amazon.com/dp/B086PKMZ21?&linkCode=ll2&tag=ecommercety00-20&linkId=3cc570cfb0694e8ba986c82cd34ef9a5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Razer",
    title: "Razer BlackShark V2 X Gaming Headset (Black, 7.1)",
    categorySlug: "video-games",
    shortDescription:
      "A budget gaming headset with 7.1 surround sound, the teen gamer gift.",
    imageUrl: null,
    highlights: ["7.1 surround", "Wired", "Teen favorite"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0D78V8D9C",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D78V8D9C?&linkCode=ll2&tag=ecommercety00-20&linkId=3a60832c9522e13184c25da9dca32a5f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Bedsure",
    title: "Bedsure Calming Dog Bed, 27 inches, Dark Grey",
    categorySlug: "pet-supplies",
    shortDescription:
      "A calming donut bed for anxious pups, the pet gift of the season.",
    imageUrl: null,
    highlights: ["Calming donut design", "27 inches", "Dark Grey"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B002G9UDYG",
    affiliateUrl:
      "https://www.amazon.com/dp/B002G9UDYG?&linkCode=ll2&tag=ecommercety00-20&linkId=2de80f1ab4b20731edfbbb95384ac416&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Carhartt",
    title: "Carhartt Men's Knit Cuffed Beanie (Black)",
    categorySlug: "fashion-accessories",
    shortDescription:
      "A classic knit beanie for cold mornings, the winter gift staple.",
    imageUrl: null,
    highlights: ["Knit cuffed", "Black", "Winter staple"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B09YCK9HVD",
    affiliateUrl:
      "https://www.amazon.com/dp/B09YCK9HVD?&linkCode=ll2&tag=ecommercety00-20&linkId=de56840284a2188c47cdb52d9ee06ff4&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "JISULIFE",
    title: "JISULIFE Handheld Turbo Fan Life5 Plus (Green)",
    categorySlug: "sports-outdoors",
    shortDescription:
      "A viral handheld turbo fan for hot days and travel, the pocket-size gift.",
    imageUrl: null,
    highlights: ["Turbo fan", "Handheld", "Travel-ready"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B06X6GHTQD",
    affiliateUrl:
      "https://www.amazon.com/dp/B06X6GHTQD?&linkCode=ll2&tag=ecommercety00-20&linkId=edf3e77666034e07e6845099594d17b7&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Scrub Daddy",
    title: "Scrub Daddy Sponge",
    categorySlug: "health-household",
    shortDescription:
      "The bestselling scrub sponge that changes texture with water temperature.",
    imageUrl: null,
    highlights: ["FlexTexture", "Bestseller", "Everyday essential"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B08NC9GGVX",
    affiliateUrl:
      "https://www.amazon.com/dp/B08NC9GGVX?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=45fa242ad0c287a2adada88726513bfc&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Scrub Daddy",
    title: "Scrub Daddy Sponge Set, Holiday Shapes, 3 Count",
    categorySlug: "health-household",
    shortDescription:
      "A holiday-shaped set of the bestselling sponge, the stocking stuffer that gets used.",
    imageUrl: null,
    highlights: ["Holiday shapes", "3 count", "Stocking stuffer"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B07B6ZN7P8",
    affiliateUrl:
      "https://www.amazon.com/dp/B07B6ZN7P8?&linkCode=ll2&tag=ecommercety00-20&linkId=17c1bf20e0900c85a2f49e7e90a3e1ce&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LeapFrog",
    title: "LeapFrog Learning Friends 100 Words Book (Standard, Green)",
    categorySlug: "baby-products",
    shortDescription:
      "An interactive first-words book for little learners, the educational baby gift.",
    imageUrl: null,
    highlights: ["100 first words", "Interactive", "Educational"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0G4SR68GB",
    affiliateUrl:
      "https://www.amazon.com/dp/B0G4SR68GB?&linkCode=ll2&tag=ecommercety00-20&linkId=d15ea5b27572c8431cf72c22fee44b4d&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Fisher-Price",
    title: "Fisher-Price Little People My Mario Adventure Playset",
    categorySlug: "baby-products",
    shortDescription:
      "A Mario adventure playset for little ones, a Hot 20 toy of the season.",
    imageUrl: null,
    highlights: ["Mario adventure", "Little People", "Toy Insider Hot 20"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B097SXK3FG",
    affiliateUrl:
      "https://www.amazon.com/dp/B097SXK3FG?&linkCode=ll2&tag=ecommercety00-20&linkId=1ac0d4f8be8646046e86d1fc0fb24f7e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "WORKPRO",
    title: "WORKPRO Premium Utility Knife W013053",
    categorySlug: "tools-home-improvement",
    shortDescription:
      "A premium utility knife for everyday fixes, the toolbox gift.",
    imageUrl: null,
    highlights: ["Premium utility knife", "Everyday fixes", "Toolbox staple"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0FC5SJNQX",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FC5SJNQX?&linkCode=ll2&tag=ecommercety00-20&linkId=2f8635e4478c28a0fc055ecf83e019b3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Logitech",
    title: "Logitech MX Master 4 Wireless Mouse (Graphite)",
    categorySlug: "office-products",
    shortDescription:
      "The new flagship wireless mouse with haptic feedback, the desk upgrade of 2026.",
    imageUrl: null,
    highlights: ["Haptic feedback", "Wireless", "2026 flagship"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0DM4KN6PP",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DM4KN6PP?&linkCode=ll2&tag=ecommercety00-20&linkId=a45cdd26dce09340a3b3beacc7dbb01b&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Patrick Ryan",
    title: "Buckeye: A Novel, by Patrick Ryan (Kindle Edition)",
    categorySlug: "books",
    shortDescription:
      "Amazon editors' #1 book of the year, the literary gift of the season.",
    imageUrl: null,
    highlights: ["Editors' #1 of the year", "Kindle Edition", "Read With Jenna pick"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B088S8QCSG",
    affiliateUrl:
      "https://www.amazon.com/dp/B088S8QCSG?&linkCode=ll2&tag=ecommercety00-20&linkId=f59a0e87c431a321ff287091b5c84de6&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "PAVOI",
    title: "PAVOI 14K Gold Plated Cubic Zirconia Initial Necklace (Letter L)",
    categorySlug: "jewelry",
    shortDescription:
      "A gold-plated initial necklace, the personalized jewelry gift.",
    imageUrl: null,
    highlights: ["14K gold plated", "Initial L", "Personalized gift"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B00YTY4ABI",
    affiliateUrl:
      "https://www.amazon.com/dp/B00YTY4ABI?&linkCode=ll2&tag=ecommercety00-20&linkId=c2275c564e0ad1528b8ae43185084d61&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Timex",
    title: "Timex Men's Easy Reader 38mm Watch, Brown/Gold-Tone/Cream Leather Strap",
    categorySlug: "watches",
    shortDescription:
      "A classic American watch with Indiglo, the timeless gift for dad.",
    imageUrl: null,
    highlights: ["Indiglo", "Leather strap", "Classic American"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B07Q38FWFJ",
    affiliateUrl:
      "https://www.amazon.com/dp/B07Q38FWFJ?&linkCode=ll2&tag=ecommercety00-20&linkId=1fb3440a39fa1137b3b7580e92875fa7&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Newlam",
    title: "Newlam Kalimba Thumb Piano 17 Keys, Portable Mbira Finger Piano",
    categorySlug: "musical-instruments",
    shortDescription:
      "A bestselling thumb piano anyone can play, the musical gift for all ages.",
    imageUrl: null,
    highlights: ["17 keys", "Portable", "Easy to play"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0DXL24S1D",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DXL24S1D?&linkCode=ll2&tag=ecommercety00-20&linkId=86ba1ce80555140d7735712a07fbd796&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Yezavesu",
    title: "Yezavesu Religious Cross Diamond Art Kits for Adults, 5D Diamond Painting Kit, 12x16 in",
    categorySlug: "arts-crafts",
    shortDescription:
      "A relaxing diamond painting kit for adults, the creative gift.",
    imageUrl: null,
    highlights: ["5D diamond painting", "12x16 in", "Relaxing craft"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0D5CLSMFB",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D5CLSMFB?&linkCode=ll2&tag=ecommercety00-20&linkId=b7165b5c6bffcc88e67c34984e27ba68&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Anker",
    title: "Anker Power Bank (PowerCore 10K), 10,000mAh, Slim, Black",
    categorySlug: "cell-phones-accessories",
    shortDescription:
      "Anker's bestselling slim power bank, the travel essential everyone needs.",
    imageUrl: null,
    highlights: ["10,000mAh", "Slim", "Travel essential"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0DZ7871B8",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DZ7871B8?&linkCode=ll2&tag=ecommercety00-20&linkId=3c6f6cd78260b329018e4c502553c9fc&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Apple",
    title: "Apple iPad 11-inch (A16, 2025), 128GB, Wi-Fi, Pink",
    categorySlug: "computers",
    shortDescription:
      "The #1 tablet of the season, the big tech gift.",
    imageUrl: null,
    highlights: ["A16 chip", "128GB", "#1 tablet"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0D66DF4Q6",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D66DF4Q6?&linkCode=ll2&tag=ecommercety00-20&linkId=370a402e861bef71be4f3ebc18376713&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "SRNPMIU",
    title: "SRNPMIU Solar Watering Can Light, Solar Yard Decorations Outdoor",
    categorySlug: "garden",
    shortDescription:
      "A solar watering-can light for the garden, the original gift for mom.",
    imageUrl: null,
    highlights: ["Solar powered", "Garden décor", "Outdoor"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0711DPSXT",
    affiliateUrl:
      "https://www.amazon.com/dp/B0711DPSXT?&linkCode=ll2&tag=ecommercety00-20&linkId=0ee167122bcbf55d0ee5eb7f56ed95a5&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Amazon Basics",
    title: "Amazon Basics 21\" Hardside Carry-On Luggage, Expandable, Navy Blue",
    categorySlug: "luggage",
    shortDescription:
      "The #1 expandable carry-on, the travel gift.",
    imageUrl: null,
    highlights: ["21-inch carry-on", "Expandable", "#1 luggage"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B0B9W8W9WR",
    affiliateUrl:
      "https://www.amazon.com/dp/B0B9W8W9WR?th=1&psc=1&linkCode=ll2&tag=ecommercety00-20&linkId=70981c127ce4edde474ec670a5342c89&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "HEYDUDE",
    title: "HEYDUDE Men's Wally Stretch Sox Slip-On Loafer, Total Black, Size 10",
    categorySlug: "shoes",
    shortDescription:
      "The #1 men's loafer, the comfortable shoe gift.",
    imageUrl: null,
    highlights: ["Slip-on", "Stretch Sox", "Total Black"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
  {
    asin: "B07GV2S1GS",
    affiliateUrl:
      "https://www.amazon.com/dp/B07GV2S1GS?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=b71d03b314d885601754ac44ed50e387&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Keurig",
    title: "Keurig K-Mini Single Serve K-Cup Pod Coffee Maker, Black",
    categorySlug: "appliances",
    shortDescription:
      "A bestselling single-serve coffee maker, the compact kitchen gift.",
    imageUrl: null,
    highlights: ["Single serve", "K-Cup pods", "Compact"],
    discoveredVia: "Radar de tendencias (caza amplia 2026-11-05, SiteStripe)",
  },
];
