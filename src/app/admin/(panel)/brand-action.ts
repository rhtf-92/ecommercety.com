"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { writeAudit } from "@/modules/audit/log";
import {
  BANNER_VARIANT_IDS,
  LOGO_VARIANT_IDS,
  getBannerVariant,
  getLogoVariant,
  setBannerVariant,
  setLogoVariant,
} from "@/modules/settings/site";

export type BrandState = { logoVariant: string; bannerVariant: string };

export async function setBrandAction(
  _prev: BrandState,
  formData: FormData,
): Promise<BrandState> {
  void _prev;
  const actor = await requireAdmin();
  const logo = String(formData.get("logoVariant") ?? "");
  const banner = String(formData.get("bannerVariant") ?? "");
  const [beforeLogo, beforeBanner] = await Promise.all([
    getLogoVariant(),
    getBannerVariant(),
  ]);

  let nextLogo = beforeLogo;
  let nextBanner: string = beforeBanner;
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
  revalidatePath("/", "layout");
  return { logoVariant: nextLogo, bannerVariant: nextBanner };
}
