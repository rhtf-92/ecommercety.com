import { NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { searchProductsLive } from "@/modules/catalog/data";

// Buscador en tiempo real del sitio público: alimenta el desplegable
// del header (escritorio y móvil). Solo productos publicados, solo
// campos ligeros; la coincidencia (tokens, acentos, relevancia) vive
// en modules/search/match y la comparte todo el sitio.
const MAX_QUERY_LENGTH = 80;
const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 10;

export async function GET(request: Request) {
  // En la línea de los demás endpoints públicos: 120/min por IP.
  const gate = rateLimit(`search:${clientIp(request.headers)}`, 120, 60_000);
  if (!gate.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: { "Retry-After": String(gate.retryAfterSec) },
      },
    );
  }

  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "")
    .trim()
    .slice(0, MAX_QUERY_LENGTH);
  // Sin consulta no hay nada que buscar: respuesta vacía inmediata.
  if (!q) {
    return NextResponse.json({ query: "", total: 0, results: [] });
  }
  const limitRaw = Number.parseInt(url.searchParams.get("limit") ?? "", 10);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), MAX_LIMIT)
    : DEFAULT_LIMIT;

  const { total, results } = await searchProductsLive(q, limit);
  return NextResponse.json({ query: q, total, results });
}
