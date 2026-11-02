// Efectos de clic contextuales para las píldoras promocionales del
// header ("Holiday Gifts" y "Today's Deals"), 2026-11-02.
//
// Investigación previa (ver PR): se evaluaron canvas-confetti
// (catdad/canvas-confetti, licencia ISC, ~4,4 kB gzip, cero
// dependencias), tsParticles (MIT, pero su bundle de confeti supera
// los 100 kB entre engine y plugins), party.js (MIT, ~7,4 kB gzip y
// menos fluido según los benchmarks enlazados en el repo de
// canvas-confetti) y js-confetti (centrado en emojis). Gana
// canvas-confetti: `create()` sobre un canvas propio, formas
// integradas (star/circle) + `shapeFromPath` para formas SVG a
// medida (copo, rayo, etiqueta), física completa (gravedad, deriva,
// ticks, decay) y guarda nativa `disableForReducedMotion`.
//
// Carga: la librería entra con import() dinámico SOLO tras la
// primera intención (hover/foco) o el primer clic — nunca infla el
// JS inicial. El canvas es un singleton fijo (pointer-events: none,
// aria-hidden) que sobrevive a la navegación cliente porque el
// Header persiste en el layout: la cola del efecto se ve sobre la
// página destino sin bloquear ni retrasar el enlace.

import type confetti from "canvas-confetti";

export type PromoBurstKind = "holiday" | "deals";

type Shapes = NonNullable<confetti.Options["shapes"]>;
type Volley = confetti.Options;

export const HOLIDAY_COLORS = [
  "#ffffff",
  "#fff7d6",
  "#fcd34d",
  "#fbbf24",
  "#f87171",
  "#dc2626",
] as const;

export const SNOW_COLORS = ["#ffffff", "#fef9c3"] as const;

export const DEALS_COLORS = [
  "#fff7ed",
  "#fde68a",
  "#fbbf24",
  "#fb923c",
  "#f97316",
  "#ef4444",
] as const;

// Topes duros de partículas por clic (rendimiento): la nevada se
// reparte en voleas pequeñas con temporizador, nunca en un bucle
// eterno, y se limpia al terminar o al volver a disparar.
export const SNOW_VOLLEYS = 8;
export const SNOW_PER_VOLLEY = 4;
export const PARTICLE_CAPS = {
  holiday: 44 + SNOW_VOLLEYS * SNOW_PER_VOLLEY,
  deals: 46 + 14,
} as const;

/** Origen normalizado (0..1) desde el centro de un rectángulo. */
export function originFromRect(
  rect: { left: number; top: number; width: number; height: number },
  viewportWidth: number,
  viewportHeight: number,
): { x: number; y: number } {
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  return {
    x: clamp01((rect.left + rect.width / 2) / viewportWidth),
    y: clamp01((rect.top + rect.height / 2) / viewportHeight),
  };
}

const BASE: Partial<Volley> = {
  // Doble guarda de movimiento reducido: además de esta opción
  // nativa de la librería, firePromoBurst() ni siquiera dispara si
  // el sistema pide reducir el movimiento.
  disableForReducedMotion: true,
  zIndex: 100,
};

/** Holiday Gifts: estallido mágico (estrellas, copos y polvo dorado). */
export function buildHolidayVolleys(
  origin: { x: number; y: number },
  shapes: Shapes,
): Volley[] {
  return [
    {
      ...BASE,
      origin,
      shapes,
      colors: [...HOLIDAY_COLORS],
      particleCount: 44,
      spread: 105,
      startVelocity: 32,
      gravity: 0.85,
      decay: 0.92,
      scalar: 0.95,
      ticks: 160,
      drift: 0,
    },
  ];
}

/** Un copo de la nevada residual que sigue al estallido navideño. */
export function buildSnowFlake(
  origin: { x: number; y: number },
  shapes: Shapes,
  drift: number,
  scalar: number,
): Volley {
  return {
    ...BASE,
    origin,
    shapes,
    colors: [...SNOW_COLORS],
    particleCount: SNOW_PER_VOLLEY,
    spread: 40,
    angle: 270,
    startVelocity: 5,
    gravity: 0.32,
    decay: 0.985,
    scalar,
    ticks: 135,
    drift,
  };
}

/** Today's Deals: brasas cálidas ascendentes + anillo de chispas. */
export function buildDealsVolleys(
  origin: { x: number; y: number },
  shapes: Shapes,
): Volley[] {
  return [
    {
      ...BASE,
      origin,
      shapes,
      colors: [...DEALS_COLORS],
      particleCount: 46,
      angle: 90,
      spread: 58,
      startVelocity: 39,
      gravity: 0.48,
      decay: 0.94,
      scalar: 0.9,
      ticks: 145,
    },
    {
      ...BASE,
      origin,
      shapes: ["circle"],
      colors: [...DEALS_COLORS],
      particleCount: 14,
      spread: 360,
      startVelocity: 15,
      gravity: 0.6,
      decay: 0.92,
      scalar: 0.55,
      ticks: 80,
    },
  ];
}

// Formas SVG a medida (caja 0..100; shapeFromPath auto-escala).
// Copo: estrella de 12 puntas que a tamaño pequeño se lee como
// copo de nieve geométrico.
const SNOWFLAKE_PATH =
  "M50.0 2.0 L54.4 33.6 L74.0 8.4 L62.0 38.0 L91.6 26.0 L66.4 45.6 L98.0 50.0 L66.4 54.4 L91.6 74.0 L62.0 62.0 L74.0 91.6 L54.4 66.4 L50.0 98.0 L45.6 66.4 L26.0 91.6 L38.0 62.0 L8.4 74.0 L33.6 54.4 L2.0 50.0 L33.6 45.6 L8.4 26.0 L38.0 38.0 L26.0 8.4 L45.6 33.6 Z";
// Rayo de "hot deal".
const BOLT_PATH = "M58 2 L24 54 L44 54 L38 98 L78 40 L56 40 Z";
// Etiqueta de precio.
const TAG_PATH = "M12 12 L56 12 L90 46 L46 90 L12 56 Z";

type ConfettiFn = typeof confetti;

let libPromise: Promise<ConfettiFn> | null = null;
let fireInstance: ReturnType<ConfettiFn["create"]> | null = null;
let customShapes: {
  snowflake: confetti.Shape;
  bolt: confetti.Shape;
  tag: confetti.Shape;
} | null = null;
let snowTimer: ReturnType<typeof setInterval> | null = null;
const lastFiredAt: Record<PromoBurstKind, number> = { holiday: 0, deals: 0 };

function loadLib(): Promise<ConfettiFn> {
  if (!libPromise) {
    libPromise = import("canvas-confetti").then((mod) => {
      // El paquete es CJS (module.exports = confetti): según el
      // empaquetado, la función llega como módulo o como .default.
      const candidate = mod as unknown as { default?: ConfettiFn };
      return candidate.default ?? (mod as unknown as ConfettiFn);
    });
  }
  return libPromise;
}

function buildCustomShapes(lib: ConfettiFn): void {
  if (customShapes) return;
  try {
    customShapes = {
      snowflake: lib.shapeFromPath({ path: SNOWFLAKE_PATH }),
      bolt: lib.shapeFromPath({ path: BOLT_PATH }),
      tag: lib.shapeFromPath({ path: TAG_PATH }),
    };
  } catch {
    // Navegador sin Path2D: se cae a las formas integradas.
    customShapes = null;
  }
}

function ensureFireInstance(lib: ConfettiFn): ReturnType<ConfettiFn["create"]> {
  if (fireInstance) return fireInstance;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "100";
  document.body.appendChild(canvas);
  fireInstance = lib.create(canvas, { resize: true, useWorker: false });
  return fireInstance;
}

function stopSnowfall(): void {
  if (snowTimer !== null) {
    clearInterval(snowTimer);
    snowTimer = null;
  }
}

/** Precarga la librería y las formas (hover/foco): el clic no espera. */
export function preloadPromoBursts(): void {
  if (typeof window === "undefined") return;
  void loadLib().then(buildCustomShapes).catch(() => undefined);
}

/**
 * Dispara el efecto del contexto indicado desde el elemento dado.
 * Nunca bloquea: es fire-and-forget y el enlace navega a la vez.
 */
export function firePromoBurst(
  kind: PromoBurstKind,
  el: HTMLElement | null,
): void {
  if (typeof window === "undefined" || !el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const now = Date.now();
  if (now - lastFiredAt[kind] < 300) return;
  lastFiredAt[kind] = now;

  const origin = originFromRect(
    el.getBoundingClientRect(),
    window.innerWidth,
    window.innerHeight,
  );

  void loadLib()
    .then((lib) => {
      buildCustomShapes(lib);
      const fire = ensureFireInstance(lib);
      if (kind === "holiday") {
        const shapes: Shapes = customShapes
          ? ["star", customShapes.snowflake, "circle"]
          : ["star", "circle"];
        for (const volley of buildHolidayVolleys(origin, shapes)) {
          void fire(volley);
        }
        // Nevada residual breve (~0,8 s de emisión, copos que caen
        // con deriva suave alrededor del botón).
        stopSnowfall();
        const flakeShapes: Shapes = customShapes
          ? [customShapes.snowflake, "circle"]
          : ["circle"];
        let volleysLeft = SNOW_VOLLEYS;
        snowTimer = setInterval(() => {
          volleysLeft -= 1;
          if (volleysLeft < 0) {
            stopSnowfall();
            return;
          }
          const jitter = (Math.random() - 0.5) * 0.07;
          void fire(
            buildSnowFlake(
              {
                x: Math.min(1, Math.max(0, origin.x + jitter)),
                y: origin.y,
              },
              flakeShapes,
              (Math.random() - 0.5) * 1.1,
              0.5 + Math.random() * 0.35,
            ),
          );
        }, 95);
      } else {
        const shapes: Shapes = customShapes
          ? ["circle", customShapes.bolt, "circle", customShapes.tag]
          : ["circle"];
        for (const volley of buildDealsVolleys(origin, shapes)) {
          void fire(volley);
        }
      }
    })
    .catch(() => undefined);
}
