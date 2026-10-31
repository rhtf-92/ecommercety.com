import type { Channel } from "@prisma/client";

/**
 * Tracking IDs oficiales de la cuenta Amazon Associates EE. UU.
 * Store ID principal: ecommercety00-20 (creados y verificados el 2026-10-31).
 * Cada canal usa su propio Tracking ID para medir su rendimiento en
 * Associates Central; las categorías y productos se miden con la analítica
 * propia de la plataforma (tabla ClickEvent).
 */
export const TRACKING_IDS: Record<Channel, string> = {
  WEB: "ecommercety00-20",
  GUIDES: "ecommercetyguides-20",
  TRENDING: "ecommercetytrend-20",
  YOUTUBE: "ecommercetyyoutube-20",
  TIKTOK: "ecommercetytiktok-20",
  PINTEREST: "ecommercetypinterest-20",
  INSTAGRAM: "ecommercetyinsta-20",
  FACEBOOK: "ecommercetyfacebook-20",
};

export const STORE_ID = TRACKING_IDS.WEB;
