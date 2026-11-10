import type { BatchProduct } from "./batch-001";

// Lote de la caza manual del 2026-11-10 (revisión de las 07:00 hora
// Lima), con enlaces SiteStripe generados por Alya con el Tracking
// ID WEB (ecommercety00-20). Sin scraping de Amazon y sin precios
// copiados: el sitio sigue mostrando "Check price on Amazon" hasta
// la Creators API. Los 6 ASIN son nuevos en el catálogo (verificado
// contra los lotes existentes en main, 484 ASINs). Fuera del lote:
// Samsonite Omni 2 B0DK9WC5BY — Amazon no permite generar SiteStripe
// por "Frequently Returned Item" (confirmado por Alya); se suma a la
// lista de excluidos por ese motivo (Solo Stove, Casio Casiotone,
// YnM). Va en el mismo PR que el lote de las 11:00 del mismo día
// (Alya envió los enlaces de las dos revisiones juntos).
export const BATCH_HUNT_0700_2026_11_10: BatchProduct[] = [
  {
    asin: "1538724731",
    affiliateUrl:
      "https://www.amazon.com/dp/1538724731?&linkCode=ll2&tag=ecommercety00-20&linkId=78fc1c4334dbbaa2d156795ff147a5e0&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Colleen Hoover",
    title: "Verity",
    categorySlug: "books",
    shortDescription:
      "Verity by Colleen Hoover — #3 Amazon Best Sellers, with the movie released in October 2026.",
    imageUrl: null,
    highlights: ["Verity", "Colleen Hoover", "Bestseller"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 07:00, SiteStripe)",
  },
  {
    asin: "1668236516",
    affiliateUrl:
      "https://www.amazon.com/dp/1668236516?&linkCode=ll2&tag=ecommercety00-20&linkId=a5b103561e476f9b8bd47cc542bf7469&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Allen Levi",
    title: "Theo of Golden",
    categorySlug: "books",
    shortDescription:
      "Theo of Golden by Allen Levi — #1 NYT bestseller, the word-of-mouth phenomenon of 2026.",
    imageUrl: null,
    highlights: ["Theo of Golden", "Allen Levi", "NYT bestseller"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 07:00, SiteStripe)",
  },
  {
    asin: "B00152AGEW",
    affiliateUrl:
      "https://www.amazon.com/dp/B00152AGEW?th=1&psc=1&linkCode=ll2&tag=ecommercety00-20&linkId=4236988e400c01e6dbe9ba326cd650f6&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Crocs",
    title: "Crocs Unisex-Adult Classic Clog, White",
    categorySlug: "fashion-accessories",
    shortDescription:
      "Crocs Unisex-Adult Classic Clog in White — the classic white clog, among the top sellers right now.",
    imageUrl: null,
    highlights: ["Classic Clog", "White", "Crocs"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 07:00, SiteStripe)",
  },
  {
    asin: "B0DLLK5FM3",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DLLK5FM3?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=40df34606ca1a13f8f58d09d779b9552&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Canopy",
    title: "Canopy Bedside Humidifier 2.0, White",
    categorySlug: "home-kitchen",
    shortDescription:
      "Canopy Bedside Humidifier 2.0 in White — the viral humidifier of the season.",
    imageUrl: null,
    highlights: ["Bedside Humidifier", "2.0", "White"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 07:00, SiteStripe)",
  },
  {
    asin: "B09LD2D1TV",
    affiliateUrl:
      "https://www.amazon.com/dp/B09LD2D1TV?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=4786575dda0963ab1230d5dbf111ed86&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "TAGRY",
    title: "TAGRY Bluetooth Headphones True Wireless Earbuds X08 60H",
    categorySlug: "tech-smart-home",
    shortDescription:
      "TAGRY Bluetooth Headphones True Wireless Earbuds X08 60H — budget earbuds with tens of thousands sold per month.",
    imageUrl: null,
    highlights: ["True Wireless Earbuds", "X08", "60H"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 07:00, SiteStripe)",
  },
  {
    asin: "B0DVD67F76",
    affiliateUrl:
      "https://www.amazon.com/dp/B0DVD67F76?th=1&linkCode=ll2&tag=ecommercety00-20&linkId=401953097975ead745343d97cf82f00c&language=en_US&gaOptInStatus=true&ref_=as_li_ss_tl",
    brand: "Nespresso",
    title: "Nespresso Vertuo Pop+ by De'Longhi, Liquorice Black",
    categorySlug: "home-kitchen",
    shortDescription:
      "Nespresso Vertuo Pop+ by De'Longhi in Liquorice Black — the machine alone, no milk frother (Pacific Blue already in the catalog).",
    imageUrl: null,
    highlights: ["Vertuo Pop+", "Liquorice Black", "De'Longhi"],
    discoveredVia: "Radar de tendencias (caza manual 2026-11-10 07:00, SiteStripe)",
  },
];
