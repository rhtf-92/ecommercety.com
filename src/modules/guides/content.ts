// Guías editoriales publicadas (contenido propio de T&F Picks).
// Cada guía enlaza productos del catálogo por ASIN; si el producto no
// está publicado en la base, la guía simplemente no muestra su tarjeta.

export type GuideSection = { heading: string; paragraphs: string[] };
export type Guide = {
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  categoryLabel: string;
  readingMinutes: number;
  intro: string;
  sections: GuideSection[];
  asins: string[];
  verdict: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "cafe-quality-espresso-at-home",
    title: "Café-quality espresso at home, without the barista course",
    description:
      "What actually matters in a home espresso setup, and the one machine we would start with: the Ninja ES351 with AutoFroth.",
    categorySlug: "home-kitchen",
    categoryLabel: "Home & Kitchen",
    readingMinutes: 4,
    intro:
      "Most home espresso setups fail for one boring reason: milk. Pulling a decent shot is learnable in a weekend, but texturing milk by hand takes months of practice. That is why the smartest first machine is the one that removes the hardest skill from the equation.",
    sections: [
      {
        heading: "What to look for (and what to ignore)",
        paragraphs: [
          "Look for three things: a frothing system that works without technique, a footprint your counter can actually live with, and cleanup that takes under two minutes, because a machine that is annoying to clean becomes decoration by March.",
          "Ignore pressure-gauge marketing and app connectivity. Espresso is water, heat and timing; the features that change your daily experience are milk texture, warm-up speed and how fast you can go from beans to cup on a weekday morning.",
        ],
      },
      {
        heading: "Our pick: Ninja Espresso Machine (ES351)",
        paragraphs: [
          "The Ninja ES351 earns this guide's pick because of AutoFroth: it textures the milk for lattes and cappuccinos automatically, which deletes the steepest learning curve in home espresso. The stainless build also looks like it belongs on the counter, not in a dorm room.",
          "Who should skip it: purists who want to learn manual steaming as a hobby, and households that only drink drip coffee. For everyone else, this is the shortest honest path from coffee-shop spending to café-style drinks at home.",
        ],
      },
    ],
    asins: ["B0GVTQQLPD"],
    verdict:
      "Start here if the goal is great lattes on day one. Add a burr grinder later; the machine will still be the right foundation.",
  },
  {
    slug: "travel-tech-that-earns-its-space",
    title: "Travel tech that earns its space in the bag",
    description:
      "Three picks that pass the only travel test that matters: they solve a real problem every single trip, starting with the Soundcore P31i translation earbuds.",
    categorySlug: "tech-smart-home",
    categoryLabel: "Tech, Accessories & Smart Home",
    readingMinutes: 5,
    intro:
      "Every traveler has bought a gadget that flew once and retired to a drawer. The rule behind this guide is brutal and simple: if a device does not solve a problem on every trip, it does not deserve the space. Three products pass.",
    sections: [
      {
        heading: "1. Translation in your ears: Soundcore P31i",
        paragraphs: [
          "The Soundcore P31i pairs real-time adaptive noise cancelling with real-time translation, which quietly changes what a trip feels like: taxi negotiations, market conversations and station announcements stop being charades. They are also properly good everyday earbuds, so they earn their space on non-travel days too.",
        ],
      },
      {
        heading: "2. One charger, every device: MOKiN foldable station",
        paragraphs: [
          "The cable nest is the most fixable annoyance in travel. A foldable multi-device charging station replaces the phone cable, the watch puck and the spare brick with one flat object that lives in the bag permanently. One outlet at the airport or the hotel desk becomes enough.",
        ],
      },
      {
        heading: "3. Movie night, anywhere: Aurzen portable projector",
        paragraphs: [
          "The luxury item that justifies itself: a battery-powered portable projector turns a hotel wall, a backyard or a campsite into the evening plan. It is not a work tool and does not pretend to be; it is the product friends ask about after the trip.",
        ],
      },
    ],
    asins: ["B0FNWCYLZN", "B0GYXT61F8", "B0GSQKP7RF"],
    verdict:
      "Pack in this order: earbuds first for every trip, charger second for every bag, projector when the trip has evenings worth upgrading.",
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
