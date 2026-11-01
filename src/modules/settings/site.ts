import { getDb } from "@/lib/db";

// Ajustes globales del sitio (tabla SiteSetting). Lectura tolerante a
// fallos: sin base o sin fila, manda el valor por defecto.

export const SHOW_PRODUCT_IMAGES_KEY = "showProductImages";

export async function getShowProductImages(): Promise<boolean> {
  try {
    const db = await getDb();
    const row = await db.siteSetting.findUnique({
      where: { key: SHOW_PRODUCT_IMAGES_KEY },
    });
    if (!row) return true; // por defecto: mostrar imágenes
    return row.value === "true";
  } catch {
    return true;
  }
}

export async function setShowProductImages(value: boolean): Promise<void> {
  const db = await getDb();
  await db.siteSetting.upsert({
    where: { key: SHOW_PRODUCT_IMAGES_KEY },
    create: { key: SHOW_PRODUCT_IMAGES_KEY, value: String(value) },
    update: { value: String(value) },
  });
}

/**
 * Regla de renderizado: hay bloque de imagen SOLO si el interruptor
 * está activado Y el producto tiene imagen. Nunca se dibuja un bloque
 * vacío ni marcador: sin imagen, la tarjeta es solo texto.
 */
export function shouldRenderImage(
  showImages: boolean,
  imageUrl: string | null | undefined,
): boolean {
  return showImages && Boolean(imageUrl);
}

// ---- Marca: variante de logo y de banner, elegibles desde el panel ----

export const LOGO_VARIANT_KEY = "logoVariant";
export const BANNER_VARIANT_KEY = "bannerVariant";
export const LOGO_VARIANT_IDS = ["badge", "tag", "arrow", "seal", "wordmark"] as const;
export const BANNER_VARIANT_IDS = ["slider", "classic", "showcase"] as const;
export type BannerVariant = (typeof BANNER_VARIANT_IDS)[number];

async function getSetting(key: string): Promise<string | null> {
  try {
    const db = await getDb();
    const row = await db.siteSetting.findUnique({ where: { key } });
    return row?.value ?? null;
  } catch {
    return null;
  }
}

async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  await db.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
}

export async function getLogoVariant(): Promise<string> {
  const value = await getSetting(LOGO_VARIANT_KEY);
  return (LOGO_VARIANT_IDS as readonly string[]).includes(value ?? "")
    ? (value as string)
    : "badge";
}

export async function getBannerVariant(): Promise<BannerVariant> {
  const value = await getSetting(BANNER_VARIANT_KEY);
  return (BANNER_VARIANT_IDS as readonly string[]).includes(value ?? "")
    ? (value as BannerVariant)
    : "slider";
}

export async function setLogoVariant(value: string): Promise<void> {
  await setSetting(LOGO_VARIANT_KEY, value);
}

export async function setBannerVariant(value: string): Promise<void> {
  await setSetting(BANNER_VARIANT_KEY, value);
}
