// Guías editoriales desde la base de datos (Fase 3, 3a parte,
// limpieza posterior al PR #7). La base es la única fuente: el
// respaldo en código (`content.ts`) se retiró tras verificar la
// paridad en producción el 2026-11-04 (las 11 guías en /guides en
// el mismo orden, y la ficha de la guía navideña con sus grupos y
// su veredicto, idénticos al código; seed con 0 ASINs saltados).
//
// - sections/groups se guardan como JSON: la prosa se lee entera
//   y se renderiza, sin consultas por campo. Los productos
//   enlazados van en GuideProduct (posición + FK), que es lo que
//   la página usa para las tarjetas; un ASIN sin producto en base
//   simplemente no muestra tarjeta.
// - Una fila malformada se descarta (hub) o da 404 (ficha), nunca
//   una página rota. Si la base no responde, el hub queda vacío y
//   la ficha da 404, igual que el resto de la capa pública cuando
//   la base falla: ya no hay respaldo en código que lo oculte.
// - El script de seed se retiró con `content.ts` (su fuente era el
//   código). Las guías ya sembradas viven en Neon; una guía nueva
//   o editada se escribe directo en base (Prisma Studio, SQL o un
//   upsert con `guideToDbPayload`), y un entorno nuevo se siembra
//   copiando las filas Guide/GuideProduct desde producción.

import { getDb } from "@/lib/db";

// Tipos de guía (antes vivían en `content.ts`, retirado aquí).
export type GuideSection = { heading: string; paragraphs: string[] };
// Variante de hub orientada a productos (p. ej. Holiday Gifts): en vez
// de secciones de prosa, la página muestra primero los productos
// agrupados por tema, cada grupo con una sola línea editorial corta.
export type GuideGroup = { heading: string; line: string; asins: string[] };
export type Guide = {
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  categoryLabel: string;
  readingMinutes: number;
  intro: string;
  sections: GuideSection[];
  groups?: GuideGroup[];
  asins: string[];
  verdict: string;
};

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
 * malformada (prosa que no es un arreglo válido): quien llama la
 * descarta, nunca renderiza una página rota.
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

/** Todas las guías publicadas, solo desde la base. */
export async function getGuides(): Promise<Guide[]> {
  try {
    const db = await getDb();
    const rows = await db.guide.findMany({
      where: { status: "PUBLISHED" },
      include: guideInclude,
      orderBy: { position: "asc" },
    });
    return rows
      .map((row) => fromDbGuide(row as DbGuideWithItems))
      .filter((guide): guide is Guide => guide !== null);
  } catch {
    // Sin base o sin migrar: lista vacía, como el resto de la
    // capa pública cuando la base falla. Ya no hay respaldo.
    return [];
  }
}

/** Una guía por slug, solo desde la base. */
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
      return fromDbGuide(row as DbGuideWithItems) ?? undefined;
    }
  } catch {
    // Sin base o sin migrar: sin guía (la página da 404).
  }
  return undefined;
}
