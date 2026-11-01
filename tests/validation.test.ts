import { describe, it, expect } from "vitest";
import { validateProductInput } from "@/modules/admin/validation";

const base = {
  asin: "B0FNWCYLZN",
  title: "soundcore P31i by Anker",
  brand: "Soundcore",
  categoryId: "cat-1",
  amazonUrl: "https://www.amazon.com/dp/B0FNWCYLZN",
  imageUrl: "",
  shortDescription: "Descripción propia.",
  highlights: "",
  internalNotes: "",
  affiliateUrl: "",
  status: "DRAFT",
};

describe("validateProductInput", () => {
  it("acepta un borrador válido y normaliza el ASIN a mayúsculas", () => {
    const r = validateProductInput({ ...base, asin: "b0fnwcylzn" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.asin).toBe("B0FNWCYLZN");
  });

  it("rechaza un ASIN con formato inválido", () => {
    const r = validateProductInput({ ...base, asin: "CORTO" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.asin).toBeTruthy();
  });

  it("rechaza URLs que no son de Amazon.com", () => {
    const r = validateProductInput({
      ...base,
      amazonUrl: "https://www.ejemplo.com/dp/B0FNWCYLZN",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.amazonUrl).toBeTruthy();
  });

  it("para publicar exige el enlace de afiliado", () => {
    const r = validateProductInput({ ...base, status: "PUBLISHED" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.affiliateUrl).toBeTruthy();
  });

  it("para publicar exige un Tracking ID oficial en el enlace", () => {
    const r = validateProductInput({
      ...base,
      status: "PUBLISHED",
      affiliateUrl: "https://www.amazon.com/dp/B0FNWCYLZN?tag=otro-20",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.affiliateUrl).toBeTruthy();
  });

  it("acepta publicar con cualquier Tracking ID oficial de canal", () => {
    const r = validateProductInput({
      ...base,
      status: "PUBLISHED",
      affiliateUrl:
        "https://www.amazon.com/dp/B0FNWCYLZN?tag=ecommercetytiktok-20",
    });
    expect(r.ok).toBe(true);
  });

  it("procesa destacados: quita viñetas, vacíos y limita a 8", () => {
    const highlights = Array.from({ length: 10 }, (_, i) => `- Punto ${i}`).join("\n");
    const r = validateProductInput({ ...base, highlights });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.highlights).toHaveLength(8);
      expect(r.data.highlights[0]).toBe("Punto 0");
    }
  });

  it("rechaza destacados de más de 140 caracteres", () => {
    const r = validateProductInput({
      ...base,
      highlights: "x".repeat(141),
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.highlights).toBeTruthy();
  });
});
