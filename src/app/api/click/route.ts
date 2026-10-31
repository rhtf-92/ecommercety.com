import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
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
  } catch {
    // Sin base de datos o payload inválido: el clic del usuario ya ocurrió
    // en Amazon; el registro es best-effort.
  }
  return new NextResponse(null, { status: 204 });
}
