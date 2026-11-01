// Cliente de la Amazon Creators API (sucesora oficial de PA-API 5.0,
// retirada el 15-may-2026). Documentación oficial:
// https://affiliate-program.amazon.com/creatorsapi/docs/en-us/
//
// Autenticación: OAuth 2.0 client credentials contra Login with Amazon
// (endpoint NA: https://api.amazon.com/auth/o2/token), scope
// "creatorsapi::default". Credenciales SOLO por entorno:
// CREATORS_API_CREDENTIAL_ID y CREATORS_API_CREDENTIAL_SECRET.
//
// Elegibilidad (Amazon): cuenta Associates aprobada + al menos 10
// ventas calificadas en los últimos 30 días. Sin eso, Amazon no emite
// credenciales y NO existe canal oficial alterno para precios o
// imágenes: el sitio mantiene "Check price on Amazon".

import { TRACKING_IDS } from "@/modules/affiliate/tracking";

const TOKEN_URL = "https://api.amazon.com/auth/o2/token";
const API_BASE = "https://creatorsapi.amazon";
const MARKETPLACE = "www.amazon.com";

export function isCreatorsApiConfigured(): boolean {
  return Boolean(
    process.env.CREATORS_API_CREDENTIAL_ID &&
      process.env.CREATORS_API_CREDENTIAL_SECRET,
  );
}

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 30_000) {
    return tokenCache.token;
  }
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.CREATORS_API_CREDENTIAL_ID,
      client_secret: process.env.CREATORS_API_CREDENTIAL_SECRET,
      scope: "creatorsapi::default",
    }),
  });
  if (!res.ok) {
    throw new Error(`Creators API token: HTTP ${res.status}`);
  }
  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

export type AmazonItemData = {
  asin: string;
  imageLarge: string | null;
  priceAmount: number | null;
  currency: string;
  listAmount: number | null;
  savingsPercent: number | null;
  availability: string | null;
  primeEligible: boolean | null;
  dealBadge: string | null;
  dealEndsAt: string | null;
  raw: unknown;
};

// Tipos defensivos: la respuesta OffersV2 varía por oferta; cualquier
// campo ausente queda en null y la respuesta cruda se conserva.
type Loose = Record<string, unknown>;
const obj = (v: unknown): Loose =>
  v && typeof v === "object" ? (v as Loose) : {};
const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : null;
const str = (v: unknown): string | null =>
  typeof v === "string" && v.length > 0 ? v : null;

export function mapAmazonItem(item: Loose): AmazonItemData {
  const images = obj(item.images);
  const primary = obj(images.primary);
  const large = obj(primary.large);
  const medium = obj(primary.medium);

  const offers = obj(item.offersV2);
  const listings = Array.isArray(offers.listings) ? offers.listings : [];
  const listing = obj(
    listings.find(
      (l) => obj(l).isBuyBoxWinner === true,
    ) ?? listings[0],
  );
  const price = obj(listing.price);
  const money = obj(price.money);
  const savings = obj(price.savings);
  const savingBasis = obj(listing.savingBasis);
  const savingBasisMoney = obj(savingBasis.money);
  const availability = obj(listing.availability);
  const deal = obj(listing.dealDetails);

  const priceAmount = num(money.amount);
  const listAmount = num(savingBasisMoney.amount);
  let savingsPercent = num(savings.percent);
  if (
    savingsPercent === null &&
    priceAmount !== null &&
    listAmount !== null &&
    listAmount > priceAmount &&
    listAmount > 0
  ) {
    savingsPercent = Math.round((1 - priceAmount / listAmount) * 100);
  }

  return {
    asin: String(item.asin ?? ""),
    imageLarge: str(large.url) ?? str(medium.url),
    priceAmount,
    currency: str(money.currency) ?? "USD",
    listAmount,
    savingsPercent,
    availability:
      str(availability.message) ?? str(availability.type),
    primeEligible:
      typeof obj(listing.deliveryInfo).isPrimeEligible === "boolean"
        ? (obj(listing.deliveryInfo).isPrimeEligible as boolean)
        : null,
    dealBadge: str(deal.badgeLabel) ?? str(deal.dealBadge),
    dealEndsAt: str(deal.endTime) ?? str(deal.accessEndTime),
    raw: item,
  };
}

/** GetItems por lotes de hasta 10 ASIN (límite de la API). */
export async function getItems(asins: string[]): Promise<AmazonItemData[]> {
  if (asins.length === 0) return [];
  if (asins.length > 10) {
    throw new Error("getItems acepta máximo 10 ASIN por llamada");
  }
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/catalog/v1/getItems`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-marketplace": MARKETPLACE,
    },
    body: JSON.stringify({
      itemIds: asins,
      itemIdType: "ASIN",
      marketplace: MARKETPLACE,
      partnerTag: TRACKING_IDS.WEB,
      languagesOfPreference: ["en_US"],
      resources: [
        "images.primary.large",
        "images.primary.medium",
        "itemInfo.title",
        "offersV2.listings.price",
        "offersV2.listings.dealDetails",
        "offersV2.listings.availability",
        "offersV2.listings.isBuyBoxWinner",
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`Creators API getItems: HTTP ${res.status}`);
  }
  const data = obj(await res.json());
  // La documentación muestra el contenedor como itemsResult y también
  // como itemResults según la página: se aceptan ambos.
  const container = obj(data.itemsResult ?? data.itemResults);
  const items = Array.isArray(container.items) ? container.items : [];
  return items.map((item) => mapAmazonItem(obj(item)));
}
