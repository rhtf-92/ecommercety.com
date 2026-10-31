"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  validateProductInput,
  type ProductInput,
} from "@/modules/admin/validation";
import { TRACKING_IDS } from "@/modules/affiliate/tracking";
import { writeAudit } from "@/modules/audit/log";

export type ProductFormState = {
  errors?: Record<string, string>;
  values?: Record<string, string>;
  ok?: boolean;
};

function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    values[key] = String(value);
  }
  return values;
}

function productData(result: { data: ProductInput }) {
  const d = result.data;
  return {
    asin: d.asin,
    title: d.title,
    brand: d.brand || null,
    categoryId: d.categoryId,
    amazonUrl: d.amazonUrl,
    imageUrl: d.imageUrl || null,
    shortDescription: d.shortDescription || null,
    status: d.status,
    publishedAt: d.status === "PUBLISHED" ? new Date() : null,
  };
}

async function upsertWebLink(
  db: Awaited<ReturnType<typeof getDb>>,
  productId: string,
  affiliateUrl: string,
) {
  if (!affiliateUrl) return;
  await db.affiliateLink.upsert({
    where: { productId_channel: { productId, channel: "WEB" } },
    create: {
      productId,
      channel: "WEB",
      trackingId: TRACKING_IDS.WEB,
      url: affiliateUrl,
      isActive: true,
    },
    update: { url: affiliateUrl, trackingId: TRACKING_IDS.WEB, isActive: true },
  });
}

export async function createProductAction(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const actor = await requireAdmin();
  const result = validateProductInput(Object.fromEntries(formData));
  if (!result.ok) {
    return { errors: result.errors, values: formValues(formData) };
  }
  const db = await getDb();
  const existing = await db.product.findUnique({
    where: { asin: result.data.asin },
    select: { id: true },
  });
  if (existing) {
    return {
      errors: { asin: "Ya existe un producto con ese ASIN." },
      values: formValues(formData),
    };
  }
  const created = await db.product.create({ data: productData(result) });
  await upsertWebLink(db, created.id, result.data.affiliateUrl);
  await writeAudit({
    entityType: "Product",
    entityId: created.id,
    action: "CREATE",
    after: { asin: created.asin, status: created.status },
    actor,
  });
  revalidatePath("/admin/productos");
  redirect("/admin/productos?creado=1");
}

export async function updateProductAction(
  id: string,
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const actor = await requireAdmin();
  const result = validateProductInput(Object.fromEntries(formData));
  if (!result.ok) {
    return { errors: result.errors, values: formValues(formData) };
  }
  const db = await getDb();
  const before = await db.product.findUnique({ where: { id } });
  if (!before) {
    return { errors: { form: "El producto ya no existe." } };
  }
  const clash = await db.product.findFirst({
    where: { asin: result.data.asin, NOT: { id } },
    select: { id: true },
  });
  if (clash) {
    return {
      errors: { asin: "Otro producto ya usa ese ASIN." },
      values: formValues(formData),
    };
  }
  const data = productData(result);
  if (before.status === "PUBLISHED" && data.status === "PUBLISHED") {
    data.publishedAt = before.publishedAt ?? new Date();
  }
  const updated = await db.product.update({ where: { id }, data });
  await upsertWebLink(db, id, result.data.affiliateUrl);
  await writeAudit({
    entityType: "Product",
    entityId: id,
    action: "UPDATE",
    before: { asin: before.asin, status: before.status, title: before.title },
    after: { asin: updated.asin, status: updated.status, title: updated.title },
    actor,
  });
  revalidatePath("/admin/productos");
  revalidatePath(`/product/${updated.asin}`);
  return { ok: true };
}

export async function toggleProductStatusAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = String(formData.get("next") ?? "");
  if (!id || !["PUBLISHED", "UNPUBLISHED", "DEMOTED", "DRAFT"].includes(next)) {
    return;
  }
  const db = await getDb();
  const before = await db.product.findUnique({ where: { id } });
  if (!before) return;
  const updated = await db.product.update({
    where: { id },
    data: {
      status: next as typeof before.status,
      publishedAt:
        next === "PUBLISHED" ? (before.publishedAt ?? new Date()) : before.publishedAt,
    },
  });
  await writeAudit({
    entityType: "Product",
    entityId: id,
    action:
      next === "PUBLISHED"
        ? "PUBLISH"
        : next === "UNPUBLISHED"
          ? "UNPUBLISH"
          : "STATUS",
    before: { status: before.status },
    after: { status: updated.status },
    actor,
  });
  revalidatePath("/admin/productos");
  revalidatePath(`/product/${updated.asin}`);
}

export async function deleteProductAction(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const db = await getDb();
  const before = await db.product.findUnique({ where: { id } });
  if (!before) return;
  await db.product.delete({ where: { id } });
  await writeAudit({
    entityType: "Product",
    entityId: id,
    action: "DELETE",
    before: { asin: before.asin, title: before.title, status: before.status },
    actor,
  });
  revalidatePath("/admin/productos");
}
