import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-05 (revisión de las 11:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 3 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes, incluido el de la tarde-noche del
// 2026-11-04 ya fusionado).
export const BATCH_HUNT_1100_2026_11_05: BatchProduct[] = [
  {
    asin: "B0FMYVG58P",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FMYVG58P?&linkCode=ll2&tag=ecommercety00-20&linkId=acf3e4bbf901853d875a0e196e02f46c&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Pokémon Pikachu and Poké Ball",
    categorySlug: "toys-games",
    shortDescription:
      "A buildable Pikachu with its Poké Ball, the first-ever LEGO and Pokémon set and the collector toy of the season.",
    imageUrl: null,
    highlights: ["First LEGO Pokémon set", "Buildable Pikachu", "Poké Ball"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-05 11:00, SiteStripe)",
  },
  {
    asin: "B0FPXFLNR7",
    affiliateUrl:
      "https://www.amazon.com/dp/B0FPXFLNR7?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=007d7a2292850659e5fa01b1eb6f61d3&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "LEGO",
    title: "LEGO Botanicals Rocking Plants",
    categorySlug: "toys-games",
    shortDescription:
      "A buildable botanical decor set from the bestselling Botanicals line, a gift for adults who love plants and design.",
    imageUrl: null,
    highlights: ["Botanicals line", "Buildable decor", "Gift for adults"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-05 11:00, SiteStripe)",
  },
  {
    asin: "B0GHMQBB3J",
    affiliateUrl:
      "https://www.amazon.com/dp/B0GHMQBB3J?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=ed3b107896e54af571b403849122031d&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "STAR WARS",
    title: "STAR WARS Ultimate Grogu",
    categorySlug: "toys-games",
    shortDescription:
      "An interactive Grogu plush from Star Wars, the standout toy of the holiday season for kids and collectors.",
    imageUrl: null,
    highlights: ["Interactive plush", "Star Wars", "Holiday standout"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-05 11:00, SiteStripe)",
  },
];
