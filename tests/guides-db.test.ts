import { describe, it, expect } from "vitest";
import {
  guideFromDbRow,
  guideToDbPayload,
  type Guide,
  type GuideDbRow,
} from "@/modules/guides/data";

// Fixtures pequeños con la misma forma que tenían las guías del
// código retirado: una con grupos (variante hub) y otra solo con
// secciones de prosa. El mapeo puro es lo que se prueba, no el
// contenido editorial, que ya vive solo en la base.
const groupGuide: Guide = {
  slug: "holiday-gift-guide-2026",
  title: "The 2026 holiday gift guide: thoughtful picks for everyone on your list",
  description:
    "Our seasonal hub for holiday gifting: home cooks, tech lovers, cozy homes, game nights and stocking stuffers.",
  categorySlug: "home-kitchen",
  categoryLabel: "Home & Kitchen",
  readingMinutes: 3,
  intro: "Good gifting is matching the gift to the way someone actually lives.",
  sections: [],
  groups: [
    {
      heading: "For the home cook",
      line: "Fewer weeknight problems, more small luxuries.",
      asins: ["B0FBK1XHXR", "B08QXB9BH5"],
    },
  ],
  asins: ["B0FBK1XHXR", "B08QXB9BH5"],
  verdict: "Start with the person, not the product.",
};

const sectionsGuide: Guide = {
  slug: "cafe-quality-espresso-at-home",
  title: "Café-quality espresso at home, without the barista course",
  description: "What actually matters in a home espresso setup.",
  categorySlug: "home-kitchen",
  categoryLabel: "Home & Kitchen",
  readingMinutes: 4,
  intro: "Most home espresso setups fail for one boring reason: milk.",
  sections: [
    {
      heading: "What to look for (and what to ignore)",
      paragraphs: ["Look for three things: frothing, footprint and cleanup."],
    },
  ],
  asins: ["B0GVTQQLPD"],
  verdict: "Start here if the goal is great lattes on day one.",
};

const ALL: Guide[] = [groupGuide, sectionsGuide];

function toDbRow(guide: Guide): GuideDbRow {
  const { data, asins } = guideToDbPayload(guide, 2);
  return { ...data, asins };
}

describe("guideToDbPayload / guideFromDbRow", () => {
  it("hace ida y vuelta exacta con una guía con grupos", () => {
    const restored = guideFromDbRow(toDbRow(groupGuide));
    expect(restored).toEqual(groupGuide);
  });

  it("hace ida y vuelta exacta con guías con y sin grupos", () => {
    for (const guide of ALL) {
      expect(guideFromDbRow(toDbRow(guide))).toEqual(guide);
    }
  });

  it("conserva la posición editorial en la carga útil", () => {
    const { data } = guideToDbPayload(ALL[1], 3);
    expect(data.position).toBe(3);
    expect(data.slug).toBe(ALL[1].slug);
  });

  it("rechaza filas malformadas para que la página las descarte", () => {
    const base = toDbRow(groupGuide);
    expect(guideFromDbRow({ ...base, sections: "no-es-un-arreglo" })).toBeNull();
    expect(guideFromDbRow({ ...base, sections: [{ heading: "x" }] })).toBeNull();
    expect(
      guideFromDbRow({ ...base, groups: [{ heading: "x", line: "y" }] }),
    ).toBeNull();
    expect(guideFromDbRow({ ...base, slug: "" })).toBeNull();
    expect(guideFromDbRow({ ...base, groups: null })).toMatchObject({
      slug: groupGuide.slug,
      groups: undefined,
    });
  });
});
