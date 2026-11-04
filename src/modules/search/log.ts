// Búsquedas internas de la página /search (Fase 3, 2a parte): lógica
// pura, sin Prisma, para que la normalización y la agregación sean
// testeables sin base de datos.
//
// Qué se registra y qué no, dicho en voz alta porque condiciona la
// lectura del reporte:
// - Solo la página /search (no el desplegable en vivo del header ni el
//   buscador del panel): una búsqueda, un registro, sin duplicados.
// - Solo término normalizado + nº de resultados + momento. Nada de IP,
//   usuario o cookies: es demanda agregada, no perfilado, en la misma
//   línea que PageView (ruta + momento).
// - Matiz del buscador en vivo de la página: el formulario actualiza
//   ?q= con debounce de 300 ms, así que un término intermedio
//   ("air") puede quedar registrado junto al final ("air fryer").
//   La agregación lo absorbe: los términos finales dominan el ranking
//   y los intermedios quedan abajo con 1 búsqueda. No se intenta
//   adivinar la "búsqueda final" en el servidor.

export const MIN_TERM_LENGTH = 2;
export const MAX_TERM_LENGTH = 80;

/**
 * Normaliza un término para agregarlo: espacios recortados y
 * colapsados, minúsculas, máximo 80 caracteres. Devuelve null si
 * queda vacío o con menos de 2 caracteres (ruido de una letra).
 * Los acentos se conservan a propósito: "lámpara" y "lampara" son la
 * misma búsqueda para el motor (match.ts), pero en el reporte se
 * muestran tal como se escribieron, normalizadas solo en caso y
 * espacios, para no perder la forma real de la demanda.
 */
export function normalizeSearchTerm(raw: string): string | null {
  const term = raw
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .slice(0, MAX_TERM_LENGTH);
  if (term.length < MIN_TERM_LENGTH) return null;
  return term;
}

export type SearchLogRow = {
  term: string;
  resultCount: number;
  createdAt: Date | string;
};

export type SearchTermStat = {
  term: string;
  searches: number;
  zeroResultSearches: number;
  lastSearchedAt: Date;
};

/** Agrega registros en estadísticas por término (30 días u otra ventana). */
export function buildSearchTermStats(rows: SearchLogRow[]): SearchTermStat[] {
  const byTerm = new Map<string, SearchTermStat>();
  for (const row of rows) {
    const term = normalizeSearchTerm(row.term);
    if (!term) continue;
    const current = byTerm.get(term) ?? {
      term,
      searches: 0,
      zeroResultSearches: 0,
      lastSearchedAt: new Date(0),
    };
    current.searches += 1;
    if (row.resultCount <= 0) current.zeroResultSearches += 1;
    const at = new Date(row.createdAt);
    if (at > current.lastSearchedAt) current.lastSearchedAt = at;
    byTerm.set(term, current);
  }
  return [...byTerm.values()].sort(
    (a, b) =>
      b.searches - a.searches ||
      b.lastSearchedAt.getTime() - a.lastSearchedAt.getTime(),
  );
}

export type SearchTermGroup = {
  term: string;
  searches: number;
  lastSearchedAt: Date;
};

/**
 * Fusiona los dos groupBy de Prisma (totales por término y
 * búsquedas con 0 resultados por término) en las mismas
 * estadísticas que buildSearchTermStats. Separar los groupBy evita
 * traer miles de filas a memoria cuando la ventana crece.
 */
export function mergeSearchTermGroups(
  totals: SearchTermGroup[],
  zeroResultTotals: { term: string; searches: number }[],
): SearchTermStat[] {
  const zeroByTerm = new Map(
    zeroResultTotals.map((group) => [group.term, group.searches]),
  );
  return totals
    .map((group) => ({
      term: group.term,
      searches: group.searches,
      zeroResultSearches: zeroByTerm.get(group.term) ?? 0,
      lastSearchedAt: group.lastSearchedAt,
    }))
    .sort(
      (a, b) =>
        b.searches - a.searches ||
        b.lastSearchedAt.getTime() - a.lastSearchedAt.getTime(),
    );
}

/** Demanda sin oferta: términos buscados que alguna vez dieron 0 resultados. */
export function findZeroResultTerms(
  stats: SearchTermStat[],
): SearchTermStat[] {
  return stats
    .filter((stat) => stat.zeroResultSearches > 0)
    .sort((a, b) => b.zeroResultSearches - a.zeroResultSearches);
}
