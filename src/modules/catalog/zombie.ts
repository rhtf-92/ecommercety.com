// Acciones editoriales sobre productos zombis (Fase 3, primera parte).
// Regla que no se negocia: nada aquí se ejecuta solo. El reporte
// (/admin/reportes) solo señala zombis; degradar o reemplazar exige
// siempre un clic humano en esa pantalla, con AuditLog.
//
// Semántica de DEMOTED en este proyecto, dicha en voz alta porque
// condiciona lo que "degradar" hace y no hace:
// - Un producto DEMOTED sale de los listados públicos (categoría,
//   destacados y radar), porque esas consultas piden status PUBLISHED.
// - La ficha directa /product/<ASIN> sigue funcionando: solo
//   UNPUBLISHED devuelve 404. Degradar no rompe enlaces compartidos
//   ni SEO, y es reversible desde Productos volviendo a publicar.
// - El sincronizador de la Creators API sigue incluyendo a los
//   DEMOTED, así que si un degradado vuelve a publicarse, sus datos
//   de precio ya están frescos. Degradar no es borrar ni despublicar.

export const ZOMBIE_DEMOTE_DEFAULT_REASON = "Sin clics en 30 días";

export function normalizeDemoteReason(reason: unknown): string {
  const clean = String(reason ?? "").trim().slice(0, 300);
  return clean || ZOMBIE_DEMOTE_DEFAULT_REASON;
}

export function canDemoteProduct(status: string): boolean {
  return status === "PUBLISHED";
}

export function validateDemoteInput(input: {
  productId: unknown;
  status: unknown;
  reason: unknown;
}): { ok: true; data: { productId: string; reason: string } } | { ok: false; error: string } {
  const productId = String(input.productId ?? "").trim();
  if (!productId) return { ok: false, error: "Producto no válido." };
  if (!canDemoteProduct(String(input.status ?? ""))) {
    return { ok: false, error: "Solo se puede degradar un producto publicado." };
  }
  return { ok: true, data: { productId, reason: normalizeDemoteReason(input.reason) } };
}

export function validateReplaceInput(input: {
  zombieId: unknown;
  zombieStatus: unknown;
  zombieAsin: unknown;
  zombieCategoryId: unknown;
  candidateId: unknown;
  candidateStatus: unknown;
  candidateAsin: unknown;
  existingProductId: unknown;
}):
  | { ok: true; data: { zombieId: string; candidateId: string; categoryId: string } }
  | { ok: false; error: string } {
  const zombieId = String(input.zombieId ?? "").trim();
  const candidateId = String(input.candidateId ?? "").trim();
  const categoryId = String(input.zombieCategoryId ?? "").trim();
  if (!zombieId || !candidateId || !categoryId) {
    return { ok: false, error: "Zombi o candidato no válido." };
  }
  if (!canDemoteProduct(String(input.zombieStatus ?? ""))) {
    return { ok: false, error: "Solo se puede reemplazar un producto publicado." };
  }
  if (String(input.candidateStatus ?? "") !== "APPROVED") {
    return { ok: false, error: "Solo un candidato aprobado puede reemplazar a un zombi." };
  }
  const zombieAsin = String(input.zombieAsin ?? "").toUpperCase();
  const candidateAsin = String(input.candidateAsin ?? "").toUpperCase();
  if (!zombieAsin || !candidateAsin || zombieAsin === candidateAsin) {
    return { ok: false, error: "El candidato no puede ser el mismo producto que el zombi." };
  }
  if (input.existingProductId) {
    return { ok: false, error: "Ya existe un producto con el ASIN del candidato. Edítalo en Productos." };
  }
  return { ok: true, data: { zombieId, candidateId, categoryId } };
}
