import { describe, it, expect } from "vitest";
import { isCronAuthorized } from "@/modules/automation/cron";

describe("Cron: autorización fail-closed", () => {
  it("autoriza el Bearer exacto de Vercel Cron", () => {
    expect(isCronAuthorized("Bearer secreto-largo", "secreto-largo")).toBe(true);
  });

  it("rechaza secreto incorrecto, ausente o de otra longitud", () => {
    expect(isCronAuthorized("Bearer otro", "secreto-largo")).toBe(false);
    expect(isCronAuthorized(null, "secreto-largo")).toBe(false);
    expect(isCronAuthorized("Bearer x", "secreto-largo")).toBe(false);
  });

  it("sin CRON_SECRET configurado, nunca autoriza", () => {
    expect(isCronAuthorized("Bearer cualquier-cosa", undefined)).toBe(false);
    expect(isCronAuthorized("Bearer cualquier-cosa", "")).toBe(false);
  });
});
