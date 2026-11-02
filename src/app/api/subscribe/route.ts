import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { logEvent } from "@/lib/log";

// Suscripción al lead magnet editorial (The Holiday Gift List).
// - Honeypot: si el campo trampa "company" viene relleno, es un bot:
//   se responde ok sin guardar nada (no revelar la trampa).
// - Rate limit estricto por IP: 5 intentos cada 10 minutos.
// - Upsert idempotente por email: re-suscribirse no duplica ni falla.
// - Si la tabla aún no existe (migración pendiente de aplicar en el
//   entorno), se responde 503 controlado y el resto del sitio no se
//   ve afectado; el formulario muestra un mensaje amable.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const gate = rateLimit(`subscribe:${clientIp(request.headers)}`, 5, 600_000);
  if (!gate.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  let body: { email?: string; source?: string; company?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot relleno → bot: éxito simulado, cero escritura.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  const source = String(body.source ?? "site").slice(0, 64) || "site";

  try {
    const db = await getDb();
    await db.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source },
    });
  } catch (error) {
    // Tabla ausente u otro fallo de base: respuesta controlada.
    logEvent("warn", "subscribe.failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      {
        ok: false,
        error: "Sign-ups are briefly unavailable. Please try again soon.",
      },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}
