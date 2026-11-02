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
  {
    slug: "holiday-gift-guide-2026",
    title: "The 2026 holiday gift guide: thoughtful picks for everyone on your list",
    description:
      "Our seasonal hub for holiday gifting: home cooks, tech lovers, cozy homes, game nights and stocking stuffers, all from picks we research and keep verified.",
    categorySlug: "home-kitchen",
    categoryLabel: "Home & Kitchen",
    readingMinutes: 8,
    intro:
      "Good gifting is not about spending more; it is about matching the gift to the way someone actually lives. This hub gathers the strongest picks in our catalog by the person you are shopping for, so you can decide in minutes and order with time to spare. Every product below is one we research, write about in our own words and keep verified through the season.",
    sections: [
      {
        heading: "For the home cook",
        paragraphs: [
          "Cooks do not want more gadgets; they want fewer weeknight problems. The Instant Pot RIO 7-in-1 is the gift that quietly takes over Tuesday nights: pressure cooking, slow cooking and more in one pot that earns its counter space. For the cook who already has the basics, the Ninja CREAMi NC301 opens a whole new category at home, turning frozen bases into ice cream, sorbet and frozen treats with flavors no store stocks.",
          "Round it out with the Zulay Kitchen Tornado milk frother, a handheld whisk that makes lattes and matcha feel café-made. We go deeper on all three in our dedicated guide, Gifts for the Home Cook (2026).",
        ],
      },
      {
        heading: "For tech lovers",
        paragraphs: [
          "Start with the Apple AirPods 5, the newest generation of the earbuds they will use every single day, with the simple pairing Apple users expect. For the person whose TV feels a step behind, the Amazon Fire TV Stick 4K Select brings essential 4K streaming and fast app launches to any screen with an HDMI port.",
          "The sleeper hit of this section is the Apple AirTag 4-pack: keys, bags, luggage and the bike all become findable, and a four-pack means one gift quietly covers four everyday headaches.",
        ],
      },
      {
        heading: "For the cozy home",
        paragraphs: [
          "The Stanley Quencher H2.0 40 oz tumbler is the rare trendy gift that is also genuinely useful, the bottle-and-a-half that lives in cup holders, desks and gym bags. Pair the mood with the Vicks Warm Mist Humidifier, which brings soothing moisture to dry winter air exactly when heating season makes bedrooms feel like deserts.",
          "For the full reset, the Bedsure 7-piece comforter set is a bed-in-a-bag that refreshes a whole room in one box: comforter, sheets, pillowcases and shams, coordinated so nobody has to play interior designer.",
        ],
      },
      {
        heading: "For game night",
        paragraphs: [
          "UNO is the family classic for a reason: two minutes to teach, endless rematches, and it works across every age at the table. Taco Cat Goat Cheese Pizza is its louder modern cousin, a fast slap-happy card game where one wrong move changes everything and nobody stays a spectator for long.",
          "When the group wants a real board game, CATAN is the original strategy game of trading and settling: deep enough for adults, welcoming enough for first-timers, and endlessly replayable because the island is rebuilt every game.",
        ],
      },
      {
        heading: "Stocking stuffers",
        paragraphs: [
          "The best stocking stuffers are small, useful and a little bit delightful. HotHands hand warmers (a 40-pair pack) turn cold mornings, outdoor games and winter commutes into non-events. O'Keeffe's Working Hands cream is the winter staple for anyone whose hands actually work for a living, and the LANEIGE Lip Sleeping Mask is the little luxury that makes an overnight difference.",
          "The Owala FreeSip 24 oz bottle, with its sip-or-swig spout, is the bigger stuffer that becomes a daily carry within a week. For the complete list of small gifts, see our guide to the Best Stocking Stuffers of 2026.",
        ],
      },
    ],
    asins: [
      "B0FBK1XHXR",
      "B08QXB9BH5",
      "B0DGZQ7L35",
      "B0HJB69GJL",
      "B0C6W3D4RM",
      "B0GJTXVN9Z",
      "B0CRMY498M",
      "B001FWXKTA",
      "B07NYR18X4",
      "B00004TZY8",
      "B077Z1R28P",
      "B00U26V4VQ",
      "B0007ZF4OA",
      "B00121UVU0",
      "B07XXPHQZK",
      "B085DVHQ57",
    ],
    verdict:
      "Start with the person, not the product: one gift matched to a daily habit beats three guesses. Any pick above is a safe, researched answer; the cards under each section link straight to the full review.",
  },
  {
    slug: "best-stocking-stuffers-2026",
    title: "Best stocking stuffers 2026: small gifts that land big",
    description:
      "Small gifts with outsized usefulness: pocket games, winter care, a sweet surprise and the little upgrades people thank you for in February.",
    categorySlug: "toys-games",
    categoryLabel: "Toys & Games",
    readingMinutes: 5,
    intro:
      "Stockings are where gifting gets fun: no big-box pressure, just small things chosen well. Our rule for this list is simple, every stuffer has to be used within a week of the holidays, or it does not make the cut. Games, winter care, one sweet wildcard and two gifts for the dog people, all small enough to tuck into a stocking and good enough to be remembered.",
    sections: [
      {
        heading: "Games that fit in a pocket",
        paragraphs: [
          "UNO is the safest small gift in America: everyone knows it, every age can play it, and a deck lives happily in a glove box or travel bag long after the holidays. Taco Cat Goat Cheese Pizza is the louder option, a fast and funny card game for 2 to 8 players where rounds take minutes and rematches are instant.",
          "Either one turns the quiet hour after dinner into the loudest part of the day. If you are building the full holiday table, our 2026 Holiday Gift Guide has a whole game-night section.",
        ],
      },
      {
        heading: "Warm hands, cared-for skin",
        paragraphs: [
          "HotHands hand warmers come in a 40-pair pack, which means one stocking quietly covers a whole winter of cold mornings, stadium seats and dog walks. They are air-activated, light and easy to stash in every coat pocket.",
          "O'Keeffe's Working Hands cream is the gift for the person whose hands crack every winter and never buy relief for themselves. Add the LANEIGE Lip Sleeping Mask for the overnight lip care that feels like a little luxury and works while they sleep.",
        ],
      },
      {
        heading: "The sweet and the practical",
        paragraphs: [
          "Freeze dried candy is the wildcard stuffer: familiar sweets turned crunchy, light and strangely addictive, and a variety pack means there is something in it for every taste at the table.",
          "On the practical side, the Anker Nano power bank is the small charger with a built-in USB-C cable that ends the dead-phone moment for good. It is the stuffer people borrow once and then ask where it came from.",
        ],
      },
      {
        heading: "For the dog people",
        paragraphs: [
          "Every dog household runs on refills, which makes Earth Rated leak-proof dog poop bags (lavender-scented, 120 count) the rare practical joke that is genuinely appreciated by February.",
          "And because the dog deserves an actual gift too, the Multipet Lamb Chop plush toy with squeaker is a nostalgic classic that has been delighting dogs for decades. Small, soft and instantly claimed.",
        ],
      },
    ],
    asins: [
      "B00004TZY8",
      "B077Z1R28P",
      "B0007ZF4OA",
      "B00121UVU0",
      "B07XXPHQZK",
      "B0F68QZC1L",
      "B0FKN5RCV7",
      "B0088LIINY",
      "B003XVYKVI",
    ],
    verdict:
      "One game, one winter helper, one treat: that trio fills a stocking with things that get used, not shelved. Mix across the sections above and you cannot really miss.",
  },
  {
    slug: "gifts-for-the-home-cook-2026",
    title: "Gifts for the home cook 2026: upgrades they will actually use",
    description:
      "For the person who runs your favorite kitchen: a one-pot workhorse, a dessert machine, café-level coffee and the small tools that earn daily gratitude.",
    categorySlug: "home-kitchen",
    categoryLabel: "Home & Kitchen",
    readingMinutes: 6,
    intro:
      "Home cooks are easy to shop for if you follow one rule: give them time, not clutter. The gifts below remove weeknight friction, open one new pleasure (homemade ice cream, real espresso at home), or quietly replace the tool that has annoyed them for years. This guide is the kitchen chapter of our 2026 Holiday Gift Guide, expanded.",
    sections: [
      {
        heading: "The one-pot wonder: Instant Pot RIO",
        paragraphs: [
          "The Instant Pot RIO 7-in-1 multi-cooker (6 Qt) is the anchor gift of this list: pressure cook, slow cook, steam and more in a single pot sized for real family dinners. For a cook, it is not another appliance; it is Tuesday night, solved.",
          "It also pairs beautifully with the way people actually cook in winter: soups, braises and big-batch staples that reheat like a gift to their future selves.",
        ],
      },
      {
        heading: "Dessert, handled: Ninja CREAMi NC301",
        paragraphs: [
          "The Ninja CREAMi NC301 turns frozen bases into ice cream, sorbet and frozen treats at home, with seven one-touch programs and two pint containers with lids. The real gift is creative control: flavors the store never stocks, made exactly as sweet as the household likes them.",
          "It is the rare countertop machine that gets more use in month three than in week one, because every pint is a new experiment.",
        ],
      },
      {
        heading: "For the coffee devotee",
        paragraphs: [
          "The Ninja Espresso Machine (ES351) with AutoFroth textures milk automatically, which removes the hardest skill in home espresso and gets lattes right on day one. We dedicated a full guide to it, Café-quality Espresso at Home, if you want the long version before you gift it.",
          "Add the Zulay Kitchen Tornado milk frother as the companion piece: a handheld electric whisk for lattes and matcha that makes weekday coffee feel made, not poured.",
        ],
      },
      {
        heading: "Weeknight reinforcements",
        paragraphs: [
          "The Ninja Air Fryer Pro 4-in-1 (5 QT) is the appliance that quietly becomes the most-used in the kitchen: crispy results, fast preheats and capacity that respects a real dinner. For the cook ready for a full reset, the CAROTE 27-piece ceramic cookware set with detachable handles rebuilds the whole stovetop in one box and stacks away neatly.",
          "Both are the kind of gift that gets thanked at random dinners for months, which is exactly the point.",
        ],
      },
      {
        heading: "Small tools, daily gratitude",
        paragraphs: [
          "The Kitchen Gizmo Snap N Strain clips onto pots and drains pasta and vegetables without the colander dance or the lost noodles in the sink. It is a tiny gift that fixes a daily annoyance, the highest praise a kitchen tool can earn.",
          "The Etekcity food kitchen scale (EK6015) is the baker's quiet upgrade: consistent portions, better bread, and meal prep that finally adds up. Small box, serious cook energy.",
        ],
      },
    ],
    asins: [
      "B0FBK1XHXR",
      "B08QXB9BH5",
      "B0GVTQQLPD",
      "B0CSZ7WBYW",
      "B0DPKB987C",
      "B01MZ14LJV",
      "B0113UZJE2",
      "B0DGZQ7L35",
    ],
    verdict:
      "If they cook three nights a week, the Instant Pot RIO is the gift. If they host, make it the CREAMi. And if you are not sure, the small tools section has never once been returned.",
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
