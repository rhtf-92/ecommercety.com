import { describe, it, expect } from "vitest";
import {
  normalizeSearchTerm,
  buildSearchTermStats,
  mergeSearchTermGroups,
  findZeroResultTerms,
} from "@/modules/search/log";

describe("normalizeSearchTerm", () => {
  it("recorta, colapsa espacios y pasa a minúsculas", () => {
    expect(normalizeSearchTerm("  Air   Fryer  ")).toBe("air fryer");
    expect(normalizeSearchTerm("LÁMPARA")).toBe("lámpara");
  });

  it("descarta términos de menos de 2 caracteres y vacíos", () => {
    expect(normalizeSearchTerm("a")).toBeNull();
    expect(normalizeSearchTerm("   ")).toBeNull();
    expect(normalizeSearchTerm("")).toBeNull();
  });

  it("corta a 80 caracteres", () => {
    const term = normalizeSearchTerm("x".repeat(100));
    expect(term).toHaveLength(80);
  });
});

describe("buildSearchTermStats", () => {
  it("agrega por término normalizado, cuenta los ceros y toma la última fecha", () => {
    const stats = buildSearchTermStats([
      { term: "Air Fryer", resultCount: 3, createdAt: new Date("2026-11-01") },
      { term: "air fryer", resultCount: 0, createdAt: new Date("2026-11-03") },
      { term: "dog toy", resultCount: 2, createdAt: new Date("2026-11-02") },
      { term: "a", resultCount: 0, createdAt: new Date("2026-11-02") },
    ]);
    expect(stats).toHaveLength(2);
    expect(stats[0]).toMatchObject({
      term: "air fryer",
      searches: 2,
      zeroResultSearches: 1,
    });
    expect(stats[0].lastSearchedAt).toEqual(new Date("2026-11-03"));
    expect(stats[1].term).toBe("dog toy");
  });
});

describe("mergeSearchTermGroups", () => {
  it("fusiona totales y ceros, ordenando por búsquedas", () => {
    const stats = mergeSearchTermGroups(
      [
        { term: "air fryer", searches: 5, lastSearchedAt: new Date("2026-11-03") },
        { term: "dog toy", searches: 2, lastSearchedAt: new Date("2026-11-02") },
      ],
      [{ term: "air fryer", searches: 2 }],
    );
    expect(stats[0]).toMatchObject({
      term: "air fryer",
      searches: 5,
      zeroResultSearches: 2,
    });
    expect(stats[1].zeroResultSearches).toBe(0);
  });
});

describe("findZeroResultTerms", () => {
  it("solo deja términos con al menos una búsqueda sin resultados, primero los más buscados sin oferta", () => {
    const stats = buildSearchTermStats([
      { term: "air fryer", resultCount: 3, createdAt: new Date("2026-11-01") },
      { term: "dog toy", resultCount: 0, createdAt: new Date("2026-11-01") },
      { term: "dog toy", resultCount: 0, createdAt: new Date("2026-11-02") },
      { term: "led strip", resultCount: 0, createdAt: new Date("2026-11-01") },
    ]);
    const zero = findZeroResultTerms(stats);
    expect(zero.map((row) => row.term)).toEqual(["dog toy", "led strip"]);
  });
});
