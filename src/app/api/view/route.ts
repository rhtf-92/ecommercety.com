import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Analítica propia de visitas: registra ruta y momento (sin cookies,
// sin IP, sin terceros). Filtra bots evidentes y limita por IP para
// que nadie infle las métricas del panel.

const BOT_UA = /bot|crawler|spider|preview|headless|lighthouse/i;

export async function POST(request: Request) {
  const gate = rateLimit(`view:${clientIp(request.headers)}`, 240, 60_000);
  if (!gate.ok) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }
  const ua = request.headers.get("user-agent") ?? "";
  if (BOT_UA.test(ua)) {
    return new NextResponse(null, { status: 204 });
  }
  try {
    const body = (await request.json()) as { path?: string };
    const path = String(body.path ?? "");
    if (!path.startsWith("/") || path.startsWith("/admin") || path.length > 255) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const db = await getDb();
    await db.pageView.create({ data: { path } });
  } catch {
    // Best-effort: una visita sin registrar nunca rompe la navegación.
  }
  return new NextResponse(null, { status: 204 });
}
