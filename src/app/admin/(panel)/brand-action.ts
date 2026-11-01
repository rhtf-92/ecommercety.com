"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { logEvent } from "@/lib/log";
import { writeAudit } from "@/modules/audit/log";
import {
  BANNER_VARIANT_IDS,
  LOGO_VARIANT_IDS,
  getBannerVariant,
  getLogoVariant,
  settingsErrorMessage,
  setBannerVariant,
  setLogoVariant,
} from "@/modules/settings/site";

export type BrandState = {
  logoVariant: string;
  bannerVariant: string;
  error?: string;
  savedAt?: number;
};

export async function setBrandAction(
  _prev: BrandState,
  formData: FormData,
): Promise<BrandState> {
  const actor = await requireAdmin();
  const logo = String(formData.get("logoVariant") ?? "");
  const banner = String(formData.get("bannerVariant") ?? "");
  const [beforeLogo, beforeBanner] = await Promise.all([
    getLogoVariant(),
    getBannerVariant(),
  ]);

  let nextLogo = beforeLogo;
  let nextBanner: string = beforeBanner;
  try {
    if ((LOGO_VARIANT_IDS as readonly string[]).includes(logo)) {
      await setLogoVariant(logo);
      nextLogo = logo;
    }
    if ((BANNER_VARIANT_IDS as readonly string[]).includes(banner)) {
      await setBannerVariant(banner);
      nextBanner = banner;
    }
    await writeAudit({
      actor,
      entityType: "SiteSetting",
      entityId: "brand",
      action: "UPDATE",
      before: { logoVariant: beforeLogo, bannerVariant: beforeBanner },
      after: { logoVariant: nextLogo, bannerVariant: nextBanner },
    });
  } catch (error) {
    logEvent("error", "settings.brand_save_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      logoVariant: beforeLogo,
      bannerVariant: beforeBanner,
      error: settingsErrorMessage(error),
    };
  }
  revalidatePath("/", "layout");
  return { logoVariant: nextLogo, bannerVariant: nextBanner, savedAt: Date.now() };
}
