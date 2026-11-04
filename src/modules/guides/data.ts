// Guías editoriales desde la base de datos (Fase 3, 3a parte),
// con el código como respaldo. El diseño es deliberadamente
// reversible y sin tiempo de inactividad:
//
// - La base es la fuente cuando tiene la guía (estado PUBLISHED);
//   si la base está vacía, sin migrar o sin esa guía, se devuelve
//   el contenido de `content.ts`, idéntico al de hoy. Por eso
//   fusionar este PR no cambia nada visible: el cambio visible
//   llega solo cuando se corre el seed (`npm run db:seed-guides`)
//   tras la migración, y aun entonces el contenido sembrado es
//   byte a byte el mismo que el del código (la paridad se prueba
//   en tests/guides-db.test.ts).
// - `content.ts` se retira en un PR de limpieza posterior, solo
//   después de verificar la paridad en producción. Retirarlo en
//   este mismo PR dejaría al sitio sin respaldo si el seed falla.
// - sections/groups se guardan como JSON: la prosa se lee entera
//   y se renderiza, sin consultas por campo. Los productos
//   enlazados van en GuideProduct (posición + FK), que es lo que
//   la página usa para las tarjetas; un ASIN sin producto en base
//   se salta en el seed, igual que la página ya filtra hoy los
//   productos que no están publicados.

import { getDb } from "@/lib/db";
import {
  GUIDES,
  getGuideBySlug as getGuideBySlugFromCode,
  type Guide,
  type GuideGroup,
  type GuideSection,
} from "./content";

export type GuideDbRow = {
  slug: string;
  titleEn: string;
  description: string | null;
  categorySlug: string;
  categoryLabel: string;
  readingMinutes: number;
  introEn: string | null;
  verdict: string;
  sections: unknown;
  groups: unknown;
  asins: string[];
};

function isSection(value: unknown): value is GuideSection {
  if (typeof value !== "object" || value === null) return false;
  const row = value as { heading?: unknown; paragraphs?: unknown };
  return (
    typeof row.heading === "string" &&
    Array.isArray(row.paragraphs) &&
    row.paragraphs.every((p) => typeof p === "string")
  );
}

function isGroup(value: unknown): value is GuideGroup {
  if (typeof value !== "object" || value === null) return false;
  const row = value as {
    heading?: unknown;
    line?: unknown;
    asins?: unknown;
  };
  return (
    typeof row.heading === "string" &&
    typeof row.line === "string" &&
    Array.isArray(row.asins) &&
    row.asins.every((a) => typeof a === "string")
  );
}

/**
 * Convierte una fila de base de datos en una guía del tipo que
 * usan las páginas. Devuelve null si la fila está incompleta o
 * malformada (prosa que no es un arreglo válido): quien llama
 * cae entonces al contenido del código, nunca a una página rota.
 */
export function guideFromDbRow(row: GuideDbRow): Guide | null {
  if (
    !row.slug ||
    !row.titleEn ||
    !row.categorySlug ||
    !row.categoryLabel ||
    !Array.isArray(row.sections) ||
    !row.sections.every(isSection)
  ) {
    return null;
  }
  let groups: GuideGroup[] | undefined;
  if (row.groups !== null && row.groups !== undefined) {
    if (!Array.isArray(row.groups) || !row.groups.every(isGroup)) {
      return null;
    }
    groups = row.groups;
  }
  return {
    slug: row.slug,
    title: row.titleEn,
    description: row.description ?? "",
    categorySlug: row.categorySlug,
    categoryLabel: row.categoryLabel,
    readingMinutes: row.readingMinutes,
    intro: row.introEn ?? "",
    sections: row.sections,
    groups,
    asins: row.asins,
    verdict: row.verdict,
  };
}

/** Carga útil que el seed escribe por guía (pura, testeable). */
export function guideToDbPayload(
  guide: Guide,
  position: number,
): {
  data: Omit<GuideDbRow, "asins"> & { position: number };
  asins: string[];
} {
  return {
    data: {
      slug: guide.slug,
      titleEn: guide.title,
      description: guide.description,
      categorySlug: guide.categorySlug,
      categoryLabel: guide.categoryLabel,
      readingMinutes: guide.readingMinutes,
      introEn: guide.intro,
      verdict: guide.verdict,
      sections: guide.sections,
      groups: guide.groups ?? null,
      position,
    },
    asins: guide.asins,
  };
}

type DbGuideWithItems = {
  slug: string;
  titleEn: string;
  description: string | null;
  categorySlug: string;
  categoryLabel: string;
  readingMinutes: number;
  introEn: string | null;
  verdict: string;
  sections: unknown;
  groups: unknown;
  items: { product: { asin: string } }[];
};

function fromDbGuide(row: DbGuideWithItems): Guide | null {
  return guideFromDbRow({
    ...row,
    asins: row.items.map((item) => item.product.asin),
  });
}

const guideInclude = {
  items: {
    orderBy: { position: "asc" as const },
    include: { product: { select: { asin: true } } },
  },
};

/** Todas las guías publicadas: base primero, código como respaldo. */
export async function getGuides(): Promise<Guide[]> {
  try {
    const db = await getDb();
    const rows = await db.guide.findMany({
      where: { status: "PUBLISHED" },
      include: guideInclude,
      orderBy: { position: "asc" },
    });
    const guides = rows
      .map((row) => fromDbGuide(row as DbGuideWithItems))
      .filter((guide): guide is Guide => guide !== null);
    // Si la base aún no tiene guías (sin seed), el código manda:
    // el orden de la lista es el editorial, no el alfabético.
    if (guides.length > 0) return guides;
  } catch {
    // Sin base o sin migrar: respaldo silencioso, como el resto
    // de la capa pública.
  }
  return GUIDES;
}

/** Una guía por slug: base primero, código como respaldo. */
export async function getGuideBySlug(
  slug: string,
): Promise<Guide | undefined> {
  try {
    const db = await getDb();
    const row = await db.guide.findUnique({
      where: { slug },
      include: guideInclude,
    });
    if (row && row.status === "PUBLISHED") {
      const guide = fromDbGuide(row as DbGuideWithItems);
      if (guide) return guide;
    }
  } catch {
    // Respaldo silencioso al código.
  }
  return getGuideBySlugFromCode(slug);
}
