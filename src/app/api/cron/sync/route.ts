import { NextResponse } from "next/server";
import { syncAmazonData } from "@/modules/amazon/sync";
import { isCronAuthorized } from "@/modules/automation/cron";

// Ciclo automático cada 5 horas, disparado por Vercel Cron (ver
// vercel.json). No es scraping: reutiliza exactamente el mismo
// sincronizador oficial que el botón del panel (Creators API, lotes
// de 10 ASIN, 1 solicitud/segundo). Sin credenciales de la Creators
// API, el sincronizador devuelve NOT_CONFIGURED y no escribe nada:
// el cron queda listo y empieza a trabajar solo cuando Amazon emita
// las credenciales, sin cambiar código.
//
// Seguridad: solo Vercel Cron con CRON_SECRET. Sin secreto
// configurado, 503. Con secreto incorrecto, 401. Nunca se expone el
// secreto ni el motivo exacto más allá del código de estado.
// Sin `export const dynamic`: con cacheComponents activado en
// next.config.ts esa opción es incompatible, y una ruta que lee
// headers de la petición ya es dinámica por sí misma.
export const maxDuration = 300;

export async function GET(request: Request) {
  if (!isCronAuthorized(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    const configured = Boolean(process.env.CRON_SECRET);
    return NextResponse.json(
      { ok: false, error: configured ? "unauthorized" : "cron_not_configured" },
      { status: configured ? 401 : 503 },
    );
  }

  const result = await syncAmazonData("cron");
  return NextResponse.json(
    {
      ok: result.ok,
      reason: result.reason ?? null,
      checked: result.checked,
      updated: result.updated,
      missing: result.missing,
      message: result.message,
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
