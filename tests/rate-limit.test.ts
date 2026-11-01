import { describe, it, expect, beforeEach } from "vitest";
import { rateLimit, clientIp, __resetRateLimit } from "@/lib/rate-limit";

describe("rateLimit (ventana fija)", () => {
  beforeEach(() => __resetRateLimit());

  it("permite hasta el límite y luego bloquea", () => {
    const t0 = 1_000_000;
    expect(rateLimit("k", 3, 60_000, t0).ok).toBe(true);
    expect(rateLimit("k", 3, 60_000, t0 + 1).ok).toBe(true);
    expect(rateLimit("k", 3, 60_000, t0 + 2).ok).toBe(true);
    const blocked = rateLimit("k", 3, 60_000, t0 + 3);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("la ventana se reinicia al vencer", () => {
    const t0 = 2_000_000;
    rateLimit("k", 1, 10_000, t0);
    expect(rateLimit("k", 1, 10_000, t0 + 5_000).ok).toBe(false);
    expect(rateLimit("k", 1, 10_000, t0 + 10_001).ok).toBe(true);
  });

  it("las claves son independientes", () => {
    const t0 = 3_000_000;
    rateLimit("a", 1, 60_000, t0);
    expect(rateLimit("a", 1, 60_000, t0).ok).toBe(false);
    expect(rateLimit("b", 1, 60_000, t0).ok).toBe(true);
  });
});

describe("clientIp", () => {
  it("toma la primera IP de x-forwarded-for", () => {
    const h = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(clientIp(h)).toBe("1.2.3.4");
  });

  it("sin cabeceras devuelve 'unknown'", () => {
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
