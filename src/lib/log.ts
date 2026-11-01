// Registro estructurado del servidor: una línea JSON por evento en
// stdout/stderr, lista para los logs de Render o cualquier colector.
// Sin dependencias ni servicios externos; si mañana se adopta un
// agregador (Sentry, Axiom...), este es el único punto a conectar.

type Level = "info" | "warn" | "error";

export function logEvent(
  level: Level,
  event: string,
  data?: Record<string, unknown>,
): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    event,
    ...data,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}
