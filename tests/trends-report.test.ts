import { describe, it, expect } from "vitest";
import { validateCandidateInput } from "@/modules/trends/queue";
import {
  asinFromProductPath,
  buildCategoryPerformance,
  buildProductPerformance,
  computeCtr,
  findZombies,
} from "@/modules/analytics/report";

describe("Cola de tendencias: validación", () => {
  it("acepta un candidato válido y normaliza el ASIN a mayúsculas", () => {
    const result = validateCandidateInput({
      asin: "b0csZ7wbyw",
      title: "Ninja Air Fryer",
      sourceList: "Best Sellers",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.asin).toBe("B0CSZ7WBYW");
  });

  it("rechaza ASIN corto y título vacío", () => {
    const result = validateCandidateInput({
      asin: "ABC",
      title: "",
      sourceList: "Best Sellers",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.asin).toBeDefined();
      expect(result.errors.title).toBeDefined();
    }
  });
});

describe("Reporte: rutas y CTR", () => {
  it("extrae el ASIN solo de rutas de ficha", () => {
    expect(asinFromProductPath("/product/B0CSZ7WBYW")).toBe("B0CSZ7WBYW");
    expect(asinFromProductPath("/product/b0csz7wbyw/")).toBe("B0CSZ7WBYW");
    expect(asinFromProductPath("/category/home-kitchen")).toBeNull();
    expect(asinFromProductPath("/product/DEMASIADOLARGO123")).toBeNull();
  });

  it("sin visitas el CTR es null, no 0", () => {
    expect(computeCtr(0, 0)).toBeNull();
    expect(computeCtr(100, 5)).toBe(5);
    expect(computeCtr(3, 1)).toBe(33.3);
  });

  it("ordena por clics y agrupa por categoría", () => {
    const products = [
      { id: "a", asin: "AAAAAAAAAA", title: "A", categoryName: "Cocina", status: "PUBLISHED" },
      { id: "b", asin: "BBBBBBBBBB", title: "B", categoryName: "Cocina", status: "PUBLISHED" },
    ];
    const rows = buildProductPerformance(
      products,
      new Map([["AAAAAAAAAA", 10], ["BBBBBBBBBB", 100]]),
      new Map([["a", 1], ["b", 20]]),
    );
    expect(rows[0].id).toBe("b");
    expect(rows[0].ctr).toBe(20);
    const categories = buildCategoryPerformance(rows);
    expect(categories).toHaveLength(1);
    expect(categories[0].views).toBe(110);
    expect(categories[0].clicks).toBe(21);
  });

  it("un publicado sin clics es zombi y un borrador sin clics no", () => {
    const rows = buildProductPerformance(
      [
        { id: "a", asin: "AAAAAAAAAA", title: "A", categoryName: "Cocina", status: "PUBLISHED" },
        { id: "b", asin: "BBBBBBBBBB", title: "B", categoryName: "Cocina", status: "DRAFT" },
      ],
      new Map(),
      new Map(),
    );
    expect(findZombies(rows).map((row) => row.id)).toEqual(["a"]);
  });
});
