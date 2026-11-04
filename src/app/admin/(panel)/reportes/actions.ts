"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { writeAudit } from "@/modules/audit/log";
import {
  normalizeDemoteReason,
  validateDemoteInput,
  validateReplaceInput,
} from "@/modules/catalog/zombie";

// Acciones sobre zombis desde el reporte (Fase 3). Reglas:
// - Nunca automáticas: cada acción nace de un clic en /admin/reportes.
// - Degradar no borra ni despublica: PUBLISHED → DEMOTED, con motivo
//   en AuditLog. El producto sale de los listados públicos, la ficha
//   directa sigue funcionando y el sincronizador sigue actualizando
//   sus datos, así que volver a publicar es seguro.
// - Reemplazar degrada el zombi y crea un BORRADOR desde un candidato
//   APROBADO, en la misma categoría del zombi. El borrador NO se
//   publica solo: se completa en Productos con descripción propia y
//   enlace SiteStripe válido antes de poder publicarse, como exige
//   validateProductInput. El candidato sigue APROBADO hasta que ese
//   borrador se publique, igual que en el flujo de Tendencias.

function back(message: string, kind: "ok" | "error" = "ok"): never {
  revalidatePath("/admin/reportes");
  return redirect(`/admin/reportes?${kind}=${encodeURIComponent(message)}`);
}

export async function demoteZombieAction(formData: FormData) {
  const actor = await requireAdmin();
  const db = await getDb();
  const productId = String(formData.get("id") ?? "");
  const before = productId
    ? await db.product.findUnique({ where: { id: productId } })
    : null;
  const result = validateDemoteInput({
    productId,
    status: before?.status,
    reason: formData.get("reason"),
  });
  if (!result.ok) back(result.error, "error");
  const updated = await db.product.update({
    where: { id: result.data.productId },
    data: { status: "DEMOTED" },
  });
  await writeAudit({
    entityType: "Product",
    entityId: updated.id,
    action: "DEMOTE",
    before: { status: before?.status, asin: before?.asin },
    after: { status: updated.status, reason: result.data.reason },
    actor,
  });
  revalidatePath("/admin/productos");
  revalidatePath(`/product/${updated.asin}`);
  back("Producto degradado. Ya no aparece en los listados públicos.");
}

export async function replaceZombieAction(formData: FormData) {
  const actor = await requireAdmin();
  const db = await getDb();
  const zombieId = String(formData.get("id") ?? "");
  const candidateId = String(formData.get("candidateId") ?? "");
  const zombie = zombieId
    ? await db.product.findUnique({ where: { id: zombieId } })
    : null;
  const candidate = candidateId
    ? await db.trendCandidate.findUnique({ where: { id: candidateId } })
    : null;
  const existing = candidate
    ? await db.product.findUnique({
        where: { asin: candidate.asin },
        select: { id: true },
      })
    : null;
  const result = validateReplaceInput({
    zombieId,
    zombieStatus: zombie?.status,
    zombieAsin: zombie?.asin,
    zombieCategoryId: zombie?.categoryId,
    candidateId,
    candidateStatus: candidate?.status,
    candidateAsin: candidate?.asin,
    existingProductId: existing?.id ?? null,
  });
  if (!result.ok || !zombie || !candidate) {
    back(result.ok ? "Zombi o candidato no válido." : result.error, "error");
  }
  const reason = normalizeDemoteReason(formData.get("reason"));
  const [demoted, draft] = await db.$transaction([
    db.product.update({
      where: { id: zombie.id },
      data: { status: "DEMOTED" },
    }),
    db.product.create({
      data: {
        asin: candidate.asin,
        title: candidate.title,
        categoryId: result.data.categoryId,
        status: "DRAFT",
        amazonUrl: `https://www.amazon.com/dp/${candidate.asin}`,
        discoveredVia: `Radar de tendencias · ${candidate.sourceList} · reemplaza a ${zombie.asin}`,
      },
    }),
  ]);
  await writeAudit({
    entityType: "Product",
    entityId: demoted.id,
    action: "DEMOTE",
    before: { status: zombie.status, asin: zombie.asin },
    after: {
      status: demoted.status,
      reason,
      replacedByDraft: draft.id,
      fromCandidate: candidate.id,
    },
    actor,
  });
  await writeAudit({
    entityType: "Product",
    entityId: draft.id,
    action: "CREATE",
    after: {
      asin: draft.asin,
      status: "DRAFT",
      fromCandidate: candidate.id,
      replaces: zombie.id,
    },
    actor,
  });
  revalidatePath("/admin/productos");
  revalidatePath(`/product/${demoted.asin}`);
  redirect(`/admin/productos/${draft.id}?from=zombi`);
}
