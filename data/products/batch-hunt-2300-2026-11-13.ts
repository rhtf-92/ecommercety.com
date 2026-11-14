import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-13 (revisión de las 23:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 15 ASIN son nuevos en el catálogo (verificado
// contra main, 672 ASINs tras el PR #48). La Canon EOS Rebel T7
// llegó dos veces con distinto linkId y entra una sola vez, con el
// primero. El LEGO Pokémon Kanto Badge (B0GQH88P19) es un Gift With
// Purchase vendido por un tercero, pero Alya generó su enlace
// SiteStripe, que es la prueba de disponibilidad (precedente
// RingConn/Clinique/INABA). Va en el mismo PR que el lote de las
// 07:00 del 2026-11-14 (Alya envió los enlaces de las dos
// revisiones juntos).
export const BATCH_HUNT_2300_2026_11_13: BatchProduct[] = [
  {
    asin: "B0C4DWM3JT",
    affiliateUrl:
      "https://www.amazon.com/dp/B0C4DWM3JT?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=89b1be13b4a8d8717dd75f38934a48e8&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "COOGEO",
    title: "COOGEO Car Roadside Emergency Kit with Battery Jumper Cables, Blue",
    categorySlug: "automotive",
    shortDescription:
      "COOGEO Car Roadside Emergency Kit with Battery Jumper Cables, Blue — the roadside kit with jumper cables, ready for the trunk.",
    imageUrl: null,
    highlights: ["COOGEO", "Roadside Emergency Kit", "Battery Jumper Cables"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B07C2Z21X5",
    affiliateUrl:
      "https://www.amazon.com/dp/B07C2Z21X5?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=d3094931ddeb93af764b63a3e14ae0e0&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Canon",
    title: "Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens",
    categorySlug: "cameras-photo",
    shortDescription:
      "Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens — the best-selling DSLR, a first camera that still feels serious.",
    imageUrl: null,
    highlights: ["Canon", "EOS Rebel T7", "DSLR Camera"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B091FXLMS8",
    affiliateUrl:
      "https://www.amazon.com/dp/B091FXLMS8?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=8f7f04637ef1bc32f6609427568ef5ee&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Kasa",
    title: "Kasa Smart Plug Mini 15A 4-Pack (EP10P4), White",
    categorySlug: "tech-smart-home",
    shortDescription:
      "Kasa Smart Plug Mini 15A 4-Pack (EP10P4), White — the first step into a smart home, no hub needed, made for the Christmas lights.",
    imageUrl: null,
    highlights: ["Kasa", "Smart Plug Mini", "4-Pack"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B0C6XK77HJ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0C6XK77HJ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=835a9a6728a6b48a258b44c46257004c&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Anker",
    title: "Anker Nano Power Bank 5,000mAh USB-C 22.5W (A1653)",
    categorySlug: "cell-phones-accessories",
    shortDescription:
      "Anker Nano Power Bank 5,000mAh USB-C 22.5W (A1653) — the pocket power bank from the Nano family, a stocking stuffer that gets used.",
    imageUrl: null,
    highlights: ["Anker", "Nano Power Bank", "5,000mAh"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B0CBN9W1Z5",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CBN9W1Z5?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=a447e63d0ec6303a72be6212214d46dc&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Sony",
    title: "Sony Alpha 6700 with 18-135mm Zoom Lens (ILCE6700M/B)",
    categorySlug: "cameras-photo",
    shortDescription:
      "Sony Alpha 6700 with 18-135mm Zoom Lens (ILCE6700M/B) — the top-selling APS-C camera, for the photographer who wants more than a phone.",
    imageUrl: null,
    highlights: ["Sony", "Alpha 6700", "APS-C Camera"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B07H9PZGSP",
    affiliateUrl:
      "https://www.amazon.com/dp/B07H9PZGSP?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=164bf62aa177d2fe625ae4b4f9dcd52e&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Gaiam",
    title: "Gaiam Essentials Thick Yoga Mat 10mm, Navy",
    categorySlug: "sports-outdoors",
    shortDescription:
      "Gaiam Essentials Thick Yoga Mat 10mm, Navy — the thick yoga mat, number one in its category, in navy.",
    imageUrl: null,
    highlights: ["Gaiam", "Thick Yoga Mat", "10mm"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B0BDF8CVBN",
    affiliateUrl:
      "https://www.amazon.com/dp/B0BDF8CVBN?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=a7d4aa6be9ec1de8ed0feabc72297496&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "MCGOR",
    title: "MCGOR Under Cabinet Lighting, 10 Inch, 2-Pack, Rechargeable",
    categorySlug: "tools-home-improvement",
    shortDescription:
      "MCGOR Under Cabinet Lighting, 10 Inch, 2-Pack, Rechargeable — the rechargeable under-cabinet light, most wished for in home improvement.",
    imageUrl: null,
    highlights: ["MCGOR", "Under Cabinet Lighting", "Rechargeable"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B0D5B2W11M",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D5B2W11M?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=8f8ab4eef8e822df3c2ca497f74092e7&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "JoycuFF",
    title: "JoycuFF Gifts for Women Moonstone Bracelet",
    categorySlug: "jewelry",
    shortDescription:
      "JoycuFF Gifts for Women Moonstone Bracelet — the moonstone cuff bracelet, number one in its category, a small gift with meaning.",
    imageUrl: null,
    highlights: ["JoycuFF", "Moonstone Bracelet", "Gifts for Women"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B09WGVV6TB",
    affiliateUrl:
      "https://www.amazon.com/dp/B09WGVV6TB?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=8e725514f3acde7ca78dbf8d7e23f035&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "NYMPHY",
    title: "NYMPHY Solar Lights Outdoor Waterproof, 4-Pack, 56 LED, Cool White",
    categorySlug: "garden",
    shortDescription:
      "NYMPHY Solar Lights Outdoor Waterproof, 4-Pack, 56 LED, Cool White — the solar spotlights for the garden, number one in landscape lights.",
    imageUrl: null,
    highlights: ["NYMPHY", "Solar Lights", "56 LED"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B09KYD4LG8",
    affiliateUrl:
      "https://www.amazon.com/dp/B09KYD4LG8?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=5bba7fdab20bb3167480891cbd19d919&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Anne Klein",
    title: "Anne Klein Women's Genuine Diamond Dial Bangle Watch AK/1981BKSV, Black",
    categorySlug: "watches",
    shortDescription:
      "Anne Klein Women's Genuine Diamond Dial Bangle Watch AK/1981BKSV, Black — the diamond-dial bangle watch, a milestone gift at an accessible price.",
    imageUrl: null,
    highlights: ["Anne Klein", "Diamond Dial", "Bangle Watch"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B0GQH88P19",
    affiliateUrl:
      "https://www.amazon.com/dp/B0GQH88P19?&linkCode=ll2&tag=ecommercety00-20&linkId=8fc1902c718a7da56c2d383e3a2b34b2&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Pokémon Kanto Region Badge Collection 40892, 312 Pieces",
    categorySlug: "toys-games",
    shortDescription:
      "LEGO Pokémon Kanto Region Badge Collection 40892, 312 Pieces — the Kanto badge set for the 30th anniversary of Pokémon.",
    imageUrl: null,
    highlights: ["LEGO", "Pokémon", "Kanto Region Badge Collection"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B07W738MG5",
    affiliateUrl:
      "https://www.amazon.com/dp/B07W738MG5?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=cba73523f0bc6e4186dca3cfcae40120&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Ferrero Rocher",
    title: "Ferrero Rocher Gourmet Hazelnut Milk Chocolate Gift Box, 42 ct",
    categorySlug: "grocery-gourmet",
    shortDescription:
      "Ferrero Rocher Gourmet Hazelnut Milk Chocolate Gift Box, 42 ct — the chocolate gift box for Christmas, a classic that never misses.",
    imageUrl: null,
    highlights: ["Ferrero Rocher", "Hazelnut Milk Chocolate", "Gift Box"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B072VYPWM4",
    affiliateUrl:
      "https://www.amazon.com/dp/B072VYPWM4?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=0f0ce0eac2f5a1de514f4f2dd86f16ff&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Cricut",
    title: "Cricut Maker Smart Cutting Machine, Champagne",
    categorySlug: "arts-crafts",
    shortDescription:
      "Cricut Maker Smart Cutting Machine, Champagne — the cutting machine for Christmas cards, decorations and handmade gifts.",
    imageUrl: null,
    highlights: ["Cricut", "Maker", "Smart Cutting Machine"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B0FL2F45JB",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FL2F45JB?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=1a7646d73b0ac89df125e0d220851ddd&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "MATEIN",
    title: "MATEIN Rolling Garment Bags for Travel, Blue",
    categorySlug: "luggage",
    shortDescription:
      "MATEIN Rolling Garment Bags for Travel, Blue — the rolling garment bag for travel, a Christmas gift for the frequent traveler.",
    imageUrl: null,
    highlights: ["MATEIN", "Rolling Garment Bags", "Travel"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
  {
    asin: "B07K38QBKQ",
    affiliateUrl:
      "https://www.amazon.com/dp/B07K38QBKQ?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=0e043b3a176fc97bfbf53e7818cb5a04&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Bonnie & Pop",
    title: "Bonnie & Pop Chocolate Gift Basket",
    categorySlug: "grocery-gourmet",
    shortDescription:
      "Bonnie & Pop Chocolate Gift Basket — the chocolate gift basket, number three in candy and chocolate gifts, for Thanksgiving, Christmas and corporate gifting.",
    imageUrl: null,
    highlights: ["Bonnie & Pop", "Chocolate Gift Basket", "Gift Basket"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-13 23:00, SiteStripe)",
  },
];
