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
