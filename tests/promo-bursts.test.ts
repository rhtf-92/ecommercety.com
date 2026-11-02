import { describe, it, expect } from "vitest";
import {
  HOLIDAY_COLORS,
  DEALS_COLORS,
  SNOW_COLORS,
  SNOW_VOLLEYS,
  SNOW_PER_VOLLEY,
  PARTICLE_CAPS,
  originFromRect,
  buildHolidayVolleys,
  buildSnowFlake,
  buildDealsVolleys,
} from "@/components/fx/promoBursts";

// Las formas reales (star/circle/SVG) las aporta canvas-confetti en
// el navegador; aquí se usan centinelas para verificar planes.
const SHAPES = ["star", "circle"] as never[];
const ORIGIN = { x: 0.42, y: 0.06 };

describe("originFromRect", () => {
  it("centra el origen en el rectángulo y lo normaliza", () => {
    const o = originFromRect(
      { left: 100, top: 50, width: 200, height: 100 },
      1000,
      800,
    );
    expect(o.x).toBeCloseTo(0.2);
    expect(o.y).toBeCloseTo(0.125);
  });

  it("recorta a 0..1 fuera de la ventana", () => {
    const o = originFromRect(
      { left: -50, top: 900, width: 40, height: 40 },
      1000,
      800,
    );
    expect(o.x).toBe(0);
    expect(o.y).toBe(1);
  });
});

describe("voleas Holiday Gifts", () => {
  const volleys = buildHolidayVolleys(ORIGIN, SHAPES);

  it("respeta el tope total de partículas incluyendo la nevada", () => {
    const burst = volleys.reduce((n, v) => n + (v.particleCount ?? 0), 0);
    expect(burst).toBeGreaterThan(0);
    expect(burst + SNOW_VOLLEYS * SNOW_PER_VOLLEY).toBeLessThanOrEqual(
      PARTICLE_CAPS.holiday,
    );
  });

  it("usa solo la paleta festiva y desactiva con movimiento reducido", () => {
    for (const v of volleys) {
      expect(v.disableForReducedMotion).toBe(true);
      for (const c of v.colors ?? []) {
        expect(HOLIDAY_COLORS).toContain(c as never);
      }
      expect(v.origin).toEqual(ORIGIN);
    }
  });

  it("la nevada cae suave: poca gravedad, deriva y vida corta", () => {
    const flake = buildSnowFlake(ORIGIN, SHAPES, 0.4, 0.7);
    expect(flake.particleCount).toBe(SNOW_PER_VOLLEY);
    expect(flake.gravity).toBeLessThan(0.5);
    expect(flake.ticks).toBeLessThanOrEqual(150);
    expect(flake.disableForReducedMotion).toBe(true);
    for (const c of flake.colors ?? []) {
      expect(SNOW_COLORS).toContain(c as never);
    }
  });
});

describe("voleas Today's Deals", () => {
  const volleys = buildDealsVolleys(ORIGIN, SHAPES);

  it("las brasas suben (ángulo 90) con gravedad suave", () => {
    expect(volleys[0].angle).toBe(90);
    expect(volleys[0].gravity).toBeLessThan(0.6);
    expect(volleys[0].startVelocity).toBeGreaterThan(30);
  });

  it("respeta el tope de partículas y la paleta cálida", () => {
    const total = volleys.reduce((n, v) => n + (v.particleCount ?? 0), 0);
    expect(total).toBeLessThanOrEqual(PARTICLE_CAPS.deals);
    for (const v of volleys) {
      expect(v.disableForReducedMotion).toBe(true);
      for (const c of v.colors ?? []) {
        expect(DEALS_COLORS).toContain(c as never);
      }
    }
  });

  it("el anillo final es un círculo completo de chispas pequeñas", () => {
    const ring = volleys[volleys.length - 1];
    expect(ring.spread).toBe(360);
    expect(ring.shapes).toEqual(["circle"]);
  });
});
