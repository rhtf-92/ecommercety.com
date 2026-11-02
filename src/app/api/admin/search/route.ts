import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { searchProductsAdmin } from "@/modules/catalog/data";

// Buscador en tiempo real del panel: atajo de localización sobre
// /admin/productos. A diferencia del público, busca en TODOS los
// estados y exige sesión del panel (401 sin ella). La coincidencia es
// la misma del sitio (modules/search/match).
const MAX_QUERY_LENGTH = 80;
const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 10;

export async function GET(request: Request) {
  const email = await currentAdmin();
  if (!email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const gate = rateLimit(
    `admin-search:${clientIp(request.headers)}`,
    120,
    60_000,
  );
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
  if (!q) {
    return NextResponse.json({ query: "", total: 0, results: [] });
  }
  const limitRaw = Number.parseInt(url.searchParams.get("limit") ?? "", 10);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), MAX_LIMIT)
    : DEFAULT_LIMIT;

  const { total, results } = await searchProductsAdmin(q, limit);
  return NextResponse.json({ query: q, total, results });
}
