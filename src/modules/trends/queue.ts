// Cola de caza de tendencias: validación de un candidato antes de
// tocar la base de datos. La puerta de calidad es deliberada: un ASIN
// inválido, un título vacío o una fuente sin registrar no entran en
// la cola, porque luego costarían una ficha, un enlace SiteStripe y
// una revisión que nadie debería hacer dos veces.

const ASIN_RE = /^[A-Z0-9]{10}$/;

export type CandidateInput = {
  asin: string;
  title: string;
  sourceList: string;
};

export type CandidateValidation =
  | { ok: true; data: CandidateInput }
  | { ok: false; errors: Record<string, string> };

export function validateCandidateInput(raw: {
  [key: string]: FormDataEntryValue | null | undefined;
}): CandidateValidation {
  const get = (key: string) => String(raw[key] ?? "").trim();
  const errors: Record<string, string> = {};
  const data: CandidateInput = {
    asin: get("asin").toUpperCase(),
    title: get("title"),
    sourceList: get("sourceList"),
  };

  if (!ASIN_RE.test(data.asin)) {
    errors.asin = "El ASIN debe tener 10 caracteres alfanuméricos.";
  }
  if (data.title.length < 3 || data.title.length > 300) {
    errors.title = "El título debe tener entre 3 y 300 caracteres.";
  }
  if (!data.sourceList || data.sourceList.length > 100) {
    errors.sourceList = "Indica la fuente de la señal (máximo 100 caracteres).";
  }

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}

// Fuentes editoriales habituales. No es una lista cerrada en base de
// datos: sirve para el formulario y para mantener el vocabulario
// consistente entre cazas (la página /todays-deals filtra por
// discoveredVia, así que la consistencia aquí también es SEO).
export const TREND_SOURCES = [
  "Best Sellers",
  "Movers & Shakers",
  "Hot New Releases",
  "Most Wished For",
  "Cobertura de ofertas",
  "Tendencia social",
  "Búsqueda interna",
  "Otro",
] as const;
