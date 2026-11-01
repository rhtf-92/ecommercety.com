import { TRACKING_IDS } from "@/modules/affiliate/tracking";

// Validaciones de negocio para el alta/edición de productos.
// Reglas del plan: ASIN único y válido, URLs de Amazon.com, enlace de
// afiliado con el Tracking ID correcto del canal e imagen oficial.

export type ProductInput = {
  asin: string;
  title: string;
  brand: string;
  categoryId: string;
  amazonUrl: string;
  imageUrl: string;
  shortDescription: string;
  highlights: string[]; // puntos destacados editoriales propios
  internalNotes: string; // notas internas: NUNCA se publican
  affiliateUrl: string; // enlace WEB (SiteStripe)
  status: "DRAFT" | "PUBLISHED" | "DEMOTED" | "UNPUBLISHED";
};

export type ValidationResult =
  | { ok: true; data: ProductInput }
  | { ok: false; errors: Record<string, string> };

const ASIN_RE = /^[A-Z0-9]{10}$/;

function isAmazonUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "www.amazon.com" ||
        url.hostname === "amazon.com" ||
        url.hostname === "amzn.to" ||
        url.hostname === "www.amzn.to")
    );
  } catch {
    return false;
  }
}

export function validateProductInput(raw: {
  [key: string]: FormDataEntryValue | null | undefined;
}): ValidationResult {
  const get = (key: string) => String(raw[key] ?? "").trim();
  const errors: Record<string, string> = {};

  const data: ProductInput = {
    asin: get("asin").toUpperCase(),
    title: get("title"),
    brand: get("brand"),
    categoryId: get("categoryId"),
    amazonUrl: get("amazonUrl"),
    imageUrl: get("imageUrl"),
    shortDescription: get("shortDescription"),
    highlights: get("highlights")
      .split("\n")
      .map((line) => line.replace(/^[-•]\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 8),
    internalNotes: get("internalNotes"),
    affiliateUrl: get("affiliateUrl"),
    status: (get("status") || "DRAFT") as ProductInput["status"],
  };

  if (!ASIN_RE.test(data.asin)) {
    errors.asin = "El ASIN debe tener 10 caracteres alfanuméricos.";
  }
  if (data.title.length < 3 || data.title.length > 300) {
    errors.title = "El título debe tener entre 3 y 300 caracteres.";
  }
  if (!data.categoryId) {
    errors.categoryId = "Selecciona una categoría.";
  }
  if (!isAmazonUrl(data.amazonUrl)) {
    errors.amazonUrl = "La URL del producto debe ser de Amazon.com (https).";
  }
  if (data.imageUrl && !/^https:\/\//.test(data.imageUrl)) {
    errors.imageUrl = "La URL de la imagen debe ser https.";
  }
  if (data.shortDescription.length > 1200) {
    errors.shortDescription = "La descripción propia no debe pasar de 1200 caracteres.";
  }
  if (data.highlights.some((h) => h.length > 140)) {
    errors.highlights = "Cada punto destacado debe tener máximo 140 caracteres.";
  }
  if (data.internalNotes.length > 2000) {
    errors.internalNotes = "Las notas internas no deben pasar de 2000 caracteres.";
  }

  // Enlace de afiliado: obligatorio si se publica; debe ser de Amazon y
  // llevar el tag del canal WEB (o cualquier Tracking ID oficial).
  if (data.status === "PUBLISHED" && !data.affiliateUrl) {
    errors.affiliateUrl =
      "Para publicar se requiere el enlace de afiliado generado con SiteStripe.";
  }
  if (data.affiliateUrl) {
    if (!isAmazonUrl(data.affiliateUrl)) {
      errors.affiliateUrl = "El enlace de afiliado debe ser de Amazon.com.";
    } else {
      const officialIds = Object.values(TRACKING_IDS);
      const hasOfficialTag = officialIds.some((id) =>
        data.affiliateUrl.includes(`tag=${id}`),
      );
      if (!hasOfficialTag) {
        errors.affiliateUrl =
          "El enlace no lleva un Tracking ID oficial (tag=...). Genéralo con SiteStripe usando el ID del canal.";
      }
    }
  }

  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, data };
}
