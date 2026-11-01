"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { writeAudit } from "@/modules/audit/log";
import {
  getShowProductImages,
  setShowProductImages,
  SHOW_PRODUCT_IMAGES_KEY,
} from "@/modules/settings/site";

export type ImagesState = { showImages: boolean };

export async function toggleImagesAction(
  _prev: ImagesState,
  formData: FormData,
): Promise<ImagesState> {
  void _prev;
  const actor = await requireAdmin();
  const next = String(formData.get("next") ?? "") === "true";
  const before = await getShowProductImages();
  await setShowProductImages(next);
  await writeAudit({
    actor,
    entityType: "SiteSetting",
    entityId: SHOW_PRODUCT_IMAGES_KEY,
    action: "UPDATE",
    before: { showProductImages: before },
    after: { showProductImages: next },
  });
  // El cambio afecta a todo el sitio público.
  revalidatePath("/", "layout");
  return { showImages: next };
}
