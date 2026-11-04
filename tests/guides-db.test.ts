import { describe, it, expect } from "vitest";
import { GUIDES, type Guide } from "@/modules/guides/content";
import {
  guideFromDbRow,
  guideToDbPayload,
  type GuideDbRow,
} from "@/modules/guides/data";

const sample: Guide = GUIDES.find(
  (guide) => guide.slug === "holiday-gift-guide-2026",
) as Guide;

function toDbRow(guide: Guide): GuideDbRow {
  const { data, asins } = guideToDbPayload(guide, 2);
  return { ...data, asins };
}

describe("guideToDbPayload / guideFromDbRow", () => {
  it("hace ida y vuelta exacta con una guía con grupos", () => {
    const restored = guideFromDbRow(toDbRow(sample));
    expect(restored).toEqual(sample);
  });

  it("hace ida y vuelta exacta con todas las guías del código", () => {
    for (const guide of GUIDES) {
      expect(guideFromDbRow(toDbRow(guide))).toEqual(guide);
    }
  });

  it("conserva la posición editorial en la carga útil", () => {
    const { data } = guideToDbPayload(GUIDES[3], 3);
    expect(data.position).toBe(3);
    expect(data.slug).toBe(GUIDES[3].slug);
  });

  it("rechaza filas malformadas para que la página caiga al código", () => {
    const base = toDbRow(sample);
    expect(guideFromDbRow({ ...base, sections: "no-es-un-arreglo" })).toBeNull();
    expect(guideFromDbRow({ ...base, sections: [{ heading: "x" }] })).toBeNull();
    expect(
      guideFromDbRow({ ...base, groups: [{ heading: "x", line: "y" }] }),
    ).toBeNull();
    expect(guideFromDbRow({ ...base, slug: "" })).toBeNull();
    expect(guideFromDbRow({ ...base, groups: null })).toMatchObject({
      slug: sample.slug,
      groups: undefined,
    });
  });
});
