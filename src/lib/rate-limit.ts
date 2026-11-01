// Limitador de velocidad en memoria (ventana fija por clave).
// Alcance honesto: protege contra abuso básico y fuerza bruta en una
// sola instancia (desarrollo y despliegues pequeños). Si el sitio
// escala a varias instancias, migrar a un almacén compartido
// (Upstash/Redis) manteniendo esta misma interfaz.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitResult {
  // Limpieza oportunista para acotar la memoria.
  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 };
  }
  if (bucket.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, retryAfterSec: 0 };
}

/** IP del cliente detrás del proxy de producción (Vercel) o local. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  return headers.get("x-real-ip")?.slice(0, 64) ?? "unknown";
}

/** Solo para pruebas. */
export function __resetRateLimit(): void {
  buckets.clear();
}
