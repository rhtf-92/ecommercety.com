import { describe, expect, it } from "vitest";
import {
  ZOMBIE_DEMOTE_DEFAULT_REASON,
  canDemoteProduct,
  normalizeDemoteReason,
  validateDemoteInput,
  validateReplaceInput,
} from "@/modules/catalog/zombie";

describe("acciones sobre zombis (Fase 3)", () => {
  it("solo un producto publicado se puede degradar", () => {
    expect(canDemoteProduct("PUBLISHED")).toBe(true);
    expect(canDemoteProduct("DRAFT")).toBe(false);
    expect(canDemoteProduct("DEMOTED")).toBe(false);
    expect(canDemoteProduct("UNPUBLISHED")).toBe(false);
  });

  it("el motivo se recorta y, si viene vacío, usa el de defecto", () => {
    expect(normalizeDemoteReason("  Sin encaje  ")).toBe("Sin encaje");
    expect(normalizeDemoteReason("")).toBe(ZOMBIE_DEMOTE_DEFAULT_REASON);
    expect(normalizeDemoteReason(null)).toBe(ZOMBIE_DEMOTE_DEFAULT_REASON);
    expect(normalizeDemoteReason("x".repeat(400))).toHaveLength(300);
  });

  it("degradar exige un producto publicado", () => {
    expect(
      validateDemoteInput({ productId: "p1", status: "PUBLISHED", reason: "Sin clics" }),
    ).toEqual({ ok: true, data: { productId: "p1", reason: "Sin clics" } });
    expect(
      validateDemoteInput({ productId: "p1", status: "DRAFT", reason: "" }),
    ).toEqual({ ok: false, error: "Solo se puede degradar un producto publicado." });
    expect(validateDemoteInput({ productId: "", status: "PUBLISHED", reason: "" })).toEqual({
      ok: false,
      error: "Producto no válido.",
    });
  });

  it("reemplazar exige zombi publicado y candidato aprobado, con ASIN distinto", () => {
    const base = {
      zombieId: "z1",
      zombieStatus: "PUBLISHED",
      zombieAsin: "B000000001",
      zombieCategoryId: "c1",
      candidateId: "t1",
      candidateStatus: "APPROVED",
      candidateAsin: "B000000002",
      existingProductId: null,
    };
    expect(validateReplaceInput(base)).toEqual({
      ok: true,
      data: { zombieId: "z1", candidateId: "t1", categoryId: "c1" },
    });
    expect(validateReplaceInput({ ...base, candidateStatus: "PENDING" })).toEqual({
      ok: false,
      error: "Solo un candidato aprobado puede reemplazar a un zombi.",
    });
    expect(validateReplaceInput({ ...base, candidateAsin: "B000000001" })).toEqual({
      ok: false,
      error: "El candidato no puede ser el mismo producto que el zombi.",
    });
    expect(validateReplaceInput({ ...base, existingProductId: "p9" })).toEqual({
      ok: false,
      error: "Ya existe un producto con el ASIN del candidato. Edítalo en Productos.",
    });
    expect(validateReplaceInput({ ...base, zombieStatus: "DEMOTED" })).toEqual({
      ok: false,
      error: "Solo se puede reemplazar un producto publicado.",
    });
  });
});
