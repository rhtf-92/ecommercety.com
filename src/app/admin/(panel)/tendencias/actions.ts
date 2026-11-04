"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { writeAudit } from "@/modules/audit/log";
import { validateCandidateInput } from "@/modules/trends/queue";

// Acciones de la cola de caza. Regla de la puerta de calidad:
// solo un candidato APROBADO puede convertirse en borrador, y solo
// un borrador con enlace SiteStripe válido puede publicarse (eso ya
// lo exige validateProductInput en Productos). Aprobar no publica
// nada: publica el editor, no el botón.

function back(message: string, kind: "ok" | "error" = "ok"): never {
  revalidatePath("/admin/tendencias");
  return redirect(`/admin/tendencias?${kind}=${encodeURIComponent(message)}`);
}

export async function addCandidateAction(formData: FormData) {
  const actor = await requireAdmin();
  const result = validateCandidateInput(Object.fromEntries(formData));
  if (!result.ok) {
    back(Object.values(result.errors).join(" "), "error");
  }
  const db = await getDb();
  const clash = await db.trendCandidate.findUnique({
    where: { asin: result.data.asin },
    select: { id: true },
  });
  if (clash) {
    back("Ya existe un candidato con ese ASIN.", "error");
  }
  const created = await db.trendCandidate.create({ data: result.data });
  await writeAudit({
    entityType: "TrendCandidate",
    entityId: created.id,
    action: "CREATE",
    after: { asin: created.asin, sourceList: created.sourceList },
    actor,
  });
  back("Candidato añadido a la cola.");
}

export async function approveCandidateAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) back("Candidato no válido.", "error");
  const db = await getDb();
  const before = await db.trendCandidate.findUnique({ where: { id } });
  if (!before || before.status !== "PENDING") {
    back("Solo se puede aprobar un candidato pendiente.", "error");
  }
  const updated = await db.trendCandidate.update({
    where: { id },
    data: { status: "APPROVED", reviewedAt: new Date() },
  });
  await writeAudit({
    entityType: "TrendCandidate",
    entityId: id,
    action: "APPROVE",
    before: { status: before.status },
    after: { status: updated.status },
    actor,
  });
  back("Candidato aprobado. Ya puede convertirse en borrador.");
}

export async function rejectCandidateAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 300);
  if (!id) back("Candidato no válido.", "error");
  const db = await getDb();
  const before = await db.trendCandidate.findUnique({ where: { id } });
  if (!before || before.status === "REJECTED") {
    back("Ese candidato ya está rechazado o no existe.", "error");
  }
  const updated = await db.trendCandidate.update({
    where: { id },
    data: { status: "REJECTED", reason: reason || null, reviewedAt: new Date() },
  });
  await writeAudit({
    entityType: "TrendCandidate",
    entityId: id,
    action: "REJECT",
    before: { status: before.status },
    after: { status: updated.status, reason: updated.reason },
    actor,
  });
  back("Candidato rechazado.");
}

export async function createDraftFromCandidateAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "");
  if (!id || !categoryId) {
    back("Elige una categoría para crear el borrador.", "error");
  }
  const db = await getDb();
  const candidate = await db.trendCandidate.findUnique({ where: { id } });
  if (!candidate || candidate.status !== "APPROVED") {
    back("Solo un candidato aprobado puede convertirse en borrador.", "error");
  }
  const category = await db.category.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });
  if (!category) back("La categoría elegida no existe.", "error");
  const existing = await db.product.findUnique({
    where: { asin: candidate.asin },
    select: { id: true },
  });
  if (existing) {
    back("Ya existe un producto con ese ASIN. Edítalo en Productos.", "error");
  }
  const created = await db.product.create({
    data: {
      asin: candidate.asin,
      title: candidate.title,
      categoryId,
      status: "DRAFT",
      amazonUrl: `https://www.amazon.com/dp/${candidate.asin}`,
      discoveredVia: `Radar de tendencias · ${candidate.sourceList}`,
    },
  });
  await writeAudit({
    entityType: "Product",
    entityId: created.id,
    action: "CREATE",
    after: { asin: created.asin, status: "DRAFT", fromCandidate: candidate.id },
    actor,
  });
  revalidatePath("/admin/productos");
  redirect(`/admin/productos/${created.id}?from=tendencia`);
}
