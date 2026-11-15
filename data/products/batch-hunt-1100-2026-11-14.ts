import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-14 (revisión de las 11:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 12 ASIN son nuevos en el catálogo (verificado
// contra main, 698 ASINs tras el PR #49). El Kitsch llega como
// B09S4PVZ81 (Sunset Tie Dye, misma línea Satin Heatless Curling
// Set, verificado en la ficha de amazon.com) en lugar del B0CCSS6Z8Y
// (Marble) propuesto en la caza 11:00 del 2026-11-12 — entra con su
// título correcto; llegó dos veces con distinto linkId y entra una
// sola vez, con el primero. La manta Bedsure con capucha B0FDVF91Y1
// quedó fuera: Alya confirmó que su enlace está caído. Va en el
// mismo PR que los lotes de las 15:00 y 19:00 del 2026-11-14 (Alya
// envió los enlaces de las tres revisiones juntos).
export const BATCH_HUNT_1100_2026_11_14: BatchProduct[] = [
  {
    asin: "B09S4PVZ81",
    affiliateUrl:
      "https://www.amazon.com/dp/B09S4PVZ81?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=0e11369299e842567841554a8e98aa3f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Kitsch",
    title: "Kitsch Satin Heatless Curlers Set, Sunset Tie Dye",
    categorySlug: "beauty-personal-care",
    shortDescription:
      "Kitsch Satin Heatless Curlers Set, Sunset Tie Dye — the heatless curling set with a 34-inch rod and two satin scrunchies, curls overnight without heat.",
    imageUrl: null,
    highlights: ["Kitsch", "Satin Heatless Curlers", "Sunset Tie Dye"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-12 11:00, SiteStripe)",
  },
  {
    asin: "B0G36CJG5Y",
    affiliateUrl:
      "https://www.amazon.com/dp/B0G36CJG5Y?&linkCode=ll2&tag=ecommercety00-20&linkId=0c27c1b3df5e8e67a422b4f75639787f&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Funko",
    title: "Funko Pop! Animation: KPop Demon Hunters – Rumi",
    categorySlug: "toys-games",
    shortDescription:
      "Funko Pop! Animation: KPop Demon Hunters – Rumi — the Rumi figure from the KPop Demon Hunters launch.",
    imageUrl: null,
    highlights: ["Funko Pop!", "KPop Demon Hunters", "Rumi"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B0FMSVHZ4F",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FMSVHZ4F?&linkCode=ll2&tag=ecommercety00-20&linkId=d960e81648d084c8071c8caaeeee6491&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Marvel Spidey and His Amazing Friends Team Spidey Pirate Ship 11208",
    categorySlug: "toys-games",
    shortDescription:
      "LEGO Marvel Spidey and His Amazing Friends Team Spidey Pirate Ship 11208 — the Spidey pirate ship set for the gift season.",
    imageUrl: null,
    highlights: ["LEGO", "Marvel Spidey", "Pirate Ship"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B0DN6YTNYZ",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DN6YTNYZ?&linkCode=ll2&tag=ecommercety00-20&linkId=e91bd31502a3fde070dbfdd3011fb646&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Beyblade",
    title: "Beyblade X Drop Attack Battle Set",
    categorySlug: "toys-games",
    shortDescription:
      "Beyblade X Drop Attack Battle Set — the battle set, strong in the toy Best Sellers.",
    imageUrl: null,
    highlights: ["Beyblade X", "Drop Attack", "Battle Set"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B0DN6XKB7W",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DN6XKB7W?&linkCode=ll2&tag=ecommercety00-20&linkId=19437537ea10363eb22eea07f4c2d276&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Beyblade",
    title: "Beyblade X and Transformers Collab, Bumblebee 3-60GP vs Shockwave 5-80O",
    categorySlug: "toys-games",
    shortDescription:
      "Beyblade X and Transformers Collab, Bumblebee 3-60GP vs Shockwave 5-80O — the Beyblade and Transformers crossover of the season.",
    imageUrl: null,
    highlights: ["Beyblade X", "Transformers", "Bumblebee vs Shockwave"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B0CSPFGZ5Y",
    affiliateUrl:
      "https://www.amazon.com/dp/B0CSPFGZ5Y?&linkCode=ll2&tag=ecommercety00-20&linkId=a653d82400cf96337c45e9364267f3d9&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Gabby's Dollhouse",
    title: "Gabby's Dollhouse Celebration Themed Figures, 5 Figures",
    categorySlug: "toys-games",
    shortDescription:
      "Gabby's Dollhouse Celebration Themed Figures, 5 Figures — the celebration figure pack for Gabby fans.",
    imageUrl: null,
    highlights: ["Gabby's Dollhouse", "Celebration Figures", "5 Figures"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B0DKJNXVRR",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DKJNXVRR?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=b41ce8a47dde8a155b7c0cf341b08adc&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Gabby's Dollhouse",
    title: "Gabby's Dollhouse Kitty Care Ear Purrfect Playroom, 17 Pieces",
    categorySlug: "toys-games",
    shortDescription:
      "Gabby's Dollhouse Kitty Care Ear Purrfect Playroom, 17 Pieces — the top Gabby playset.",
    imageUrl: null,
    highlights: ["Gabby's Dollhouse", "Kitty Care Playroom", "17 Pieces"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B08TTQ21P4",
    affiliateUrl:
      "https://www.amazon.com/dp/B08TTQ21P4?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=2ed64dbb778fb9876249655db665fe53&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Gabby's Dollhouse",
    title: "Gabby's Dollhouse Purrfect Dollhouse, 15 Pieces",
    categorySlug: "toys-games",
    shortDescription:
      "Gabby's Dollhouse Purrfect Dollhouse, 15 Pieces — the classic Gabby dollhouse.",
    imageUrl: null,
    highlights: ["Gabby's Dollhouse", "Purrfect Dollhouse", "15 Pieces"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B0F9HS5FK5",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F9HS5FK5?&linkCode=ll2&tag=ecommercety00-20&linkId=67eb5b1b277dd405843a3983e46f2b89&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Exploding Kittens",
    title: "Exploding Kittens: The Board Game (10th Anniversary)",
    categorySlug: "toys-games",
    shortDescription:
      "Exploding Kittens: The Board Game (10th Anniversary) — the board game, Toy of the Year 2026 in its category.",
    imageUrl: null,
    highlights: ["Exploding Kittens", "The Board Game", "10th Anniversary"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B0D9C251D4",
    affiliateUrl:
      "https://www.amazon.com/dp/B0D9C251D4?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=bd13b4bb7d91088a17366ec0766a78e2&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Exploding Kittens",
    title: "Exploding Kittens Original Edition in Collectible Tin",
    categorySlug: "toys-games",
    shortDescription:
      "Exploding Kittens Original Edition in Collectible Tin — the original game in its collectible tin.",
    imageUrl: null,
    highlights: ["Exploding Kittens", "Original Edition", "Collectible Tin"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B0F3DPXQP1",
    affiliateUrl:
      "https://www.amazon.com/dp/B0F3DPXQP1?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=94caca48f6b6f945524ce05326ccb5e3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Yankee Candle",
    title: "Yankee Candle Balsam & Cedar, 22 oz Large Jar",
    categorySlug: "home-kitchen",
    shortDescription:
      "Yankee Candle Balsam & Cedar, 22 oz Large Jar — the large jar candle, a Christmas classic.",
    imageUrl: null,
    highlights: ["Yankee Candle", "Balsam & Cedar", "Large Jar"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
  {
    asin: "B07CRSXMW8",
    affiliateUrl:
      "https://www.amazon.com/dp/B07CRSXMW8?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=5d49560564cb6ba9389825b4794967ca&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "VTech",
    title: "VTech Sit-to-Stand Learning Walker, Blue",
    categorySlug: "baby-products",
    shortDescription:
      "VTech Sit-to-Stand Learning Walker, Blue — the learning walker, in blue.",
    imageUrl: null,
    highlights: ["VTech", "Sit-to-Stand", "Learning Walker"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-14 11:00, SiteStripe)",
  },
];
