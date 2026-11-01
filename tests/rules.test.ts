import { describe, it, expect } from "vitest";
import { TRACKING_IDS, STORE_ID } from "@/modules/affiliate/tracking";
import {
  shouldRenderImage,
  settingsErrorMessage,
  LOGO_VARIANT_IDS,
  BANNER_VARIANT_IDS,
} from "@/modules/settings/site";
import { freshPrice } from "@/components/PriceBlock";

describe("Tracking IDs oficiales", () => {
  it("hay un ID por cada canal y el principal es el WEB", () => {
    expect(Object.keys(TRACKING_IDS)).toHaveLength(8);
    expect(STORE_ID).toBe("ecommercety00-20");
    for (const id of Object.values(TRACKING_IDS)) {
      expect(id.endsWith("-20")).toBe(true);
    }
  });
});

describe("Regla de imágenes: sin imagen no hay bloque", () => {
  it("muestra imagen solo con interruptor activo y URL presente", () => {
    expect(shouldRenderImage(true, "https://img/x.jpg")).toBe(true);
    expect(shouldRenderImage(true, null)).toBe(false);
    expect(shouldRenderImage(true, "")).toBe(false);
    expect(shouldRenderImage(false, "https://img/x.jpg")).toBe(false);
  });

  it("las variantes de marca y banner son las conocidas", () => {
    expect(LOGO_VARIANT_IDS).toContain("tag");
    expect(LOGO_VARIANT_IDS).toHaveLength(5);
    expect(BANNER_VARIANT_IDS).toEqual(["slider", "classic", "showcase"]);
  });
});

describe("Diagnóstico de ajustes", () => {
  it("cliente Prisma desactualizado → ordena regenerar", () => {
    const msg = settingsErrorMessage(
      new Error("Cannot read properties of undefined (reading 'upsert')"),
    );
    expect(msg).toContain("prisma generate");
  });

  it("tabla ausente → ordena aplicar migraciones", () => {
    const msg = settingsErrorMessage(
      new Error("The table `public.SiteSetting` does not exist"),
    );
    expect(msg).toContain("prisma migrate deploy");
  });
});

describe("freshPrice: regla de las 24 horas de Amazon", () => {
  const base = {
    currency: "USD",
    listAmount: null,
    savingsPercent: null,
    dealBadge: null,
    dealEndsAt: null,
    primeEligible: null,
  };

  it("precio de hace 1 hora se muestra", () => {
    const p = freshPrice({
      ...base,
      amount: 10,
      fetchedAt: new Date(Date.now() - 60 * 60 * 1000),
    });
    expect(p?.amount).toBe(10);
  });

  it("precio de hace 25 horas se oculta", () => {
    const p = freshPrice({
      ...base,
      amount: 10,
      fetchedAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
    });
    expect(p).toBeNull();
  });

  it("sin importe no hay precio aunque sea reciente", () => {
    const p = freshPrice({ ...base, amount: null, fetchedAt: new Date() });
    expect(p).toBeNull();
  });

  it("convierte importes Decimal (objetos con toString)", () => {
    const p = freshPrice({
      ...base,
      amount: { toString: () => "19.99" },
      fetchedAt: new Date(),
    });
    expect(p?.amount).toBe(19.99);
  });
});
