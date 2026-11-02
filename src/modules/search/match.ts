/**
 * Coincidencia del buscador en tiempo real (lógica pura, sin base de
 * datos): la comparten el endpoint público /api/search, el endpoint
 * del panel /api/admin/search y la página /search, para que TODAS las
 * superficies respondan con el mismo criterio.
 *
 * Reglas:
 * - Insensible a mayúsculas y acentos ("lampara" encuentra "Lámpara").
 * - Por tokens: la consulta se trocea en palabras y TODAS deben
 *   aparecer en algún campo del producto (título, marca, categoría,
 *   ASIN o descripción), en cualquier combinación de campos.
 * - Relevancia: un token pesa más si abre el título que si solo está
 *   contenido en él; después marca, categoría, ASIN y descripción.
 *   La puntuación del producto es la suma de sus tokens, con un extra
 *   si la consulta completa aparece en el título. Los empates
 *   conservan el orden de entrada (la capa de datos entrega por
 *   fecha, así que entre iguales manda lo más reciente).
 */

export type SearchableProduct = {
  asin: string;
  title: string;
  brand: string | null;
  categoryName: string;
  shortDescription?: string | null;
};

/** Minúsculas sin diacríticos: "Lámpara Piñón" → "lampara pinon". */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

/** Palabras de la consulta ya normalizadas (sin signos ni duplicados). */
export function tokenizeQuery(query: string): string[] {
  const tokens = normalizeText(query).split(/[^a-z0-9]+/).filter(Boolean);
  return [...new Set(tokens)];
}

type PreparedFields = {
  title: string;
  brand: string;
  category: string;
  asin: string;
  description: string;
};

function prepare(product: SearchableProduct): PreparedFields {
  return {
    title: normalizeText(product.title),
    brand: normalizeText(product.brand ?? ""),
    category: normalizeText(product.categoryName),
    asin: normalizeText(product.asin),
    description: normalizeText(product.shortDescription ?? ""),
  };
}

function startsWithWord(text: string, token: string): boolean {
  return text.split(/[^a-z0-9]+/).some((word) => word.startsWith(token));
}

/** Peso de UN token en los campos del producto; 0 = no aparece. */
function tokenScore(fields: PreparedFields, token: string): number {
  if (fields.asin === token) return 70;
  if (fields.title.startsWith(token)) return 55;
  if (startsWithWord(fields.title, token)) return 48;
  if (fields.title.includes(token)) return 40;
  if (fields.brand.startsWith(token)) return 36;
  if (fields.brand.includes(token)) return 32;
  if (startsWithWord(fields.category, token)) return 26;
  if (fields.category.includes(token)) return 22;
  if (fields.asin.includes(token)) return 18;
  if (fields.description.includes(token)) return 10;
  return 0;
}

/**
 * Puntuación del producto para la consulta, o null si algún token no
 * aparece en ningún campo (no es coincidencia).
 */
export function scoreProduct(
  product: SearchableProduct,
  tokens: string[],
): number | null {
  if (tokens.length === 0) return null;
  const fields = prepare(product);
  let score = 0;
  for (const token of tokens) {
    const weight = tokenScore(fields, token);
    if (weight === 0) return null;
    score += weight;
  }
  const phrase = tokens.join(" ");
  if (fields.title.startsWith(phrase)) score += 15;
  else if (fields.title.includes(phrase)) score += 8;
  return score;
}

export type CatalogSearchResult<T> = {
  /** Coincidencias totales (sin recortar por el límite). */
  total: number;
  /** Coincidencias ordenadas por relevancia, recortadas al límite. */
  results: T[];
};

/**
 * Filtra y ordena un catálogo ya cargado (el catálogo es pequeño:
 * cientos de filas ligeras). `limit` opcional recorta los resultados
 * pero `total` siempre cuenta todas las coincidencias.
 */
export function searchCatalog<T extends SearchableProduct>(
  products: readonly T[],
  query: string,
  limit?: number,
): CatalogSearchResult<T> {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return { total: 0, results: [] };
  const scored: { product: T; score: number; index: number }[] = [];
  products.forEach((product, index) => {
    const score = scoreProduct(product, tokens);
    if (score !== null) scored.push({ product, score, index });
  });
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  const total = scored.length;
  const sliced = limit !== undefined ? scored.slice(0, limit) : scored;
  return { total, results: sliced.map((entry) => entry.product) };
}
