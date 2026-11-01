"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { writeAudit } from "@/modules/audit/log";
import {
  getShowProductImages,
  setShowProductImages,
  settingsErrorMessage,
  SHOW_PRODUCT_IMAGES_KEY,
} from "@/modules/settings/site";

export type ImagesState = {
  showImages: boolean;
  error?: string;
  savedAt?: number;
};

export async function toggleImagesAction(
  _prev: ImagesState,
  formData: FormData,
): Promise<ImagesState> {
  const actor = await requireAdmin();
  const next = String(formData.get("next") ?? "") === "true";
  try {
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
  } catch (error) {
    // Nunca fallar en silencio: el panel muestra la causa exacta.
    const current = await getShowProductImages();
    return { showImages: current, error: settingsErrorMessage(error) };
  }
  // El cambio afecta a todo el sitio público.
  revalidatePath("/", "layout");
  return { showImages: next, savedAt: Date.now() };
}
