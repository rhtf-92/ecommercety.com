import { describe, it, expect } from "vitest";
import {
  normalizeText,
  tokenizeQuery,
  scoreProduct,
  searchCatalog,
  type SearchableProduct,
} from "@/modules/search/match";

// Muestra del catálogo real (lotes importados): incluye los Momcozy
// que Renato buscó como "mom" en su captura del 2026-11-02.
const CATALOG: SearchableProduct[] = [
  {
    asin: "B0G6417BM1",
    title:
      "Momcozy Wellness 1 Warm-Massage Wearable Breast Pump, App-Controlled, 4 Modes, 12 Levels",
    brand: "Momcozy",
    categoryName: "Baby Products",
    shortDescription: "A wearable breast pump with warm massage.",
  },
  {
    asin: "B0KLEANPAL",
    title: "Momcozy KleanPal Pro Baby Bottle Washer, Sterilizer & Dryer",
    brand: "Momcozy",
    categoryName: "Baby Products",
    shortDescription: "Washes, sterilizes and dries baby bottles.",
  },
  {
    asin: "B00FZPRUTY",
    title: "Dyson V11 Origin Cordless Vacuum, Nickel/Blue, 481771-01",
    brand: "Dyson",
    categoryName: "Home & Kitchen",
    shortDescription: "A cordless stick vacuum for hard floors and carpets.",
  },
  {
    asin: "B0LAMP0001",
    title: "Lámpara LED de escritorio con brazo flexible",
    brand: "Brillo",
    categoryName: "Office & School Supplies",
    shortDescription: "Luz cálida para estudiar.",
  },
  {
    asin: "B0AIRFRYER",
    title: "Ninja Air Fryer Pro 4-in-1 with Air Crisp Technology",
    brand: "Ninja",
    categoryName: "Home & Kitchen",
    shortDescription: "Crispy results with little oil.",
  },
];

describe("normalizeText y tokenizeQuery", () => {
  it("quita acentos y pasa a minúsculas", () => {
    expect(normalizeText("Lámpara Piñón ÁGIL")).toBe("lampara pinon agil");
  });

  it("trocea por cualquier signo y deduplica tokens", () => {
    expect(tokenizeQuery("  Air-Fryer,  air! ")).toEqual(["air", "fryer"]);
    expect(tokenizeQuery("")).toEqual([]);
    expect(tokenizeQuery("···")).toEqual([]);
  });
});

describe("searchCatalog — coincidencia", () => {
  it("'mom' encuentra los dos Momcozy publicados", () => {
    const { total, results } = searchCatalog(CATALOG, "mom");
    expect(total).toBe(2);
    expect(results.map((p) => p.asin)).toEqual(
      expect.arrayContaining(["B0G6417BM1", "B0KLEANPAL"]),
    );
  });

  it("es insensible a mayúsculas y acentos", () => {
    expect(searchCatalog(CATALOG, "LAMPARA").total).toBe(1);
    expect(searchCatalog(CATALOG, "lámpara").total).toBe(1);
  });

  it("por tokens: TODAS las palabras deben aparecer, en cualquier campo", () => {
    // "dyson" está en marca/título y "vacuum" en título/descripción.
    expect(searchCatalog(CATALOG, "dyson vacuum").total).toBe(1);
    // "momcozy" + "vacuum" no conviven en ningún producto.
    expect(searchCatalog(CATALOG, "momcozy vacuum").total).toBe(0);
    // Token de categoría + token de título.
    expect(searchCatalog(CATALOG, "kitchen fryer").total).toBe(1);
  });

  it("coincide por ASIN parcial", () => {
    const { total, results } = searchCatalog(CATALOG, "b00fzpr");
    expect(total).toBe(1);
    expect(results[0].asin).toBe("B00FZPRUTY");
  });

  it("coincide por nombre de categoría", () => {
    expect(searchCatalog(CATALOG, "baby").total).toBe(2);
  });

  it("sin coincidencias devuelve total 0 y lista vacía", () => {
    expect(searchCatalog(CATALOG, "zzqq inexistente")).toEqual({
      total: 0,
      results: [],
    });
  });

  it("consulta vacía no busca nada", () => {
    expect(searchCatalog(CATALOG, "   ")).toEqual({ total: 0, results: [] });
  });

  it("el límite recorta resultados pero el total cuenta todo", () => {
    const { total, results } = searchCatalog(CATALOG, "momcozy", 1);
    expect(total).toBe(2);
    expect(results).toHaveLength(1);
  });
});

describe("searchCatalog — relevancia", () => {
  it("el título que empieza por la consulta supera a la marca sola", () => {
    const items: SearchableProduct[] = [
      {
        asin: "B0000000B1",
        title: "Everyday Bottle Washer Brush Set",
        brand: "Momcozy",
        categoryName: "Baby Products",
      },
      {
        asin: "B0000000B2",
        title: "Momcozy Baby Carrier Wrap",
        brand: "Other",
        categoryName: "Baby Products",
      },
    ];
    const { results } = searchCatalog(items, "momcozy");
    expect(results[0].asin).toBe("B0000000B2");
  });

  it("scoreProduct devuelve null si falta cualquier token", () => {
    expect(scoreProduct(CATALOG[2], ["dyson", "vacuum"])).not.toBeNull();
    expect(scoreProduct(CATALOG[2], ["dyson", "playa"])).toBeNull();
    expect(scoreProduct(CATALOG[2], [])).toBeNull();
  });
});
