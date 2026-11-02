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

// ---- Diagnóstico para el panel ----
// Distingue "sin base", "base sin la tabla de ajustes" (migraciones
// pendientes) y "todo operativo", para que un fallo de guardado nunca
// sea silencioso: el panel muestra la causa y el comando exacto.

export type SettingsHealth = {
  dbOk: boolean;
  /** El cliente Prisma generado conoce el modelo SiteSetting. */
  clientOk: boolean;
  /** La tabla física existe (information_schema, no depende del cliente). */
  tableOk: boolean;
  appliedMigrations: number;
};

// Total de migraciones que la base debe tener aplicadas: debe
// coincidir con el número de carpetas de prisma/migrations. Se deja
// como constante manual (y no contando carpetas en runtime) porque en
// el despliegue serverless el filesystem del bundle no garantiza la
// presencia de prisma/migrations junto a la función; al agregar una
// migración nueva, incrementa este número en el mismo commit.
export const EXPECTED_MIGRATIONS = 6;

export async function getSettingsHealth(): Promise<SettingsHealth> {
  const down: SettingsHealth = {
    dbOk: false,
    clientOk: false,
    tableOk: false,
    appliedMigrations: 0,
  };
  try {
    const db = await getDb();
    let appliedMigrations = 0;
    let tableOk = false;
    try {
      const rows = await db.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*)::bigint AS count FROM "_prisma_migrations"
        WHERE finished_at IS NOT NULL`;
      appliedMigrations = Number(rows[0]?.count ?? 0);
      const found = await db.$queryRaw<{ exists: boolean }[]>`
        SELECT EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = 'SiteSetting'
        ) AS exists`;
      tableOk = Boolean(found[0]?.exists);
    } catch {
      return down;
    }
    // Sonda del cliente generado: si el esquema creció (nuevo modelo) y
    // no se regeneró, el delegado no existe y cualquier lectura/escritura
    // del modelo lanza TypeError. Es un caso distinto a "falta la tabla".
    const delegate = (db as unknown as Record<string, unknown>)[
      "siteSetting"
    ] as { findFirst?: unknown } | undefined;
    const clientOk = Boolean(delegate && typeof delegate.findFirst === "function");
    return { dbOk: true, clientOk, tableOk, appliedMigrations };
  } catch {
    return down;
  }
}

/** Mensaje accionable cuando un guardado de ajustes falla. */
export function settingsErrorMessage(error: unknown): string {
  const text = error instanceof Error ? error.message : String(error);
  if (
    text.includes("is not a function") ||
    text.includes("Cannot read properties of undefined") ||
    text.includes("siteSetting is undefined") ||
    text.includes(".siteSetting.")
  ) {
    return "No se pudo guardar: el cliente de base de datos está desactualizado (se generó antes de existir la tabla de ajustes). Ejecuta «npx prisma generate», reinicia el servidor (npm run dev) y vuelve a intentarlo.";
  }
  if (
    text.includes("SiteSetting") ||
    text.includes("does not exist") ||
    text.includes("P2021")
  ) {
    return "No se pudo guardar: falta la tabla de ajustes en tu base de datos. Ejecuta «npx prisma migrate deploy» en tu carpeta del proyecto y vuelve a intentarlo.";
  }
  if (
    text.includes("Can't reach database") ||
    text.includes("ECONNREFUSED") ||
    text.includes("P1001")
  ) {
    return "No se pudo guardar: la base de datos no responde. Verifica que Docker esté corriendo (docker compose up -d).";
  }
  return "No se pudo guardar el ajuste. Revisa la conexión con la base de datos e inténtalo de nuevo.";
}
