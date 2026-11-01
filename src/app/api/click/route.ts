import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { logEvent } from "@/lib/log";
import type { Channel } from "@prisma/client";

const CHANNELS: Channel[] = [
  "WEB",
  "GUIDES",
  "TRENDING",
  "YOUTUBE",
  "TIKTOK",
  "PINTEREST",
  "INSTAGRAM",
  "FACEBOOK",
];

/**
 * Registra un clic saliente hacia Amazon (analítica propia).
 * El enlace del usuario apunta directo a Amazon; este registro es un
 * beacon en segundo plano y nunca bloquea ni redirige la navegación.
 */
export async function POST(request: Request) {
  // Anti-spam de métricas: 120 registros por minuto y por IP.
  const gate = rateLimit(`click:${clientIp(request.headers)}`, 120, 60_000);
  if (!gate.ok) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }
  try {
    const body = (await request.json()) as {
      asin?: string;
      channel?: string;
      sourcePage?: string;
    };
    if (!body.asin) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const channel = CHANNELS.includes(body.channel as Channel)
      ? (body.channel as Channel)
      : "WEB";

    const db = await getDb();
    const product = await db.product.findUnique({
      where: { asin: body.asin },
      select: { id: true },
    });
    if (product) {
      await db.clickEvent.create({
        data: {
          productId: product.id,
          channel,
          sourcePage: body.sourcePage?.slice(0, 255),
        },
      });
    }
  } catch (error) {
    // Sin base de datos o payload inválido: el clic del usuario ya ocurrió
    // en Amazon; el registro es best-effort (pero queda en el log).
    logEvent("warn", "click.record_failed", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
  return new NextResponse(null, { status: 204 });
}
