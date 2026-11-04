// Autorización del cron de Vercel: función pura para poder testearla
// sin una petición real.
//
// Regla fail-closed: si CRON_SECRET no está configurado, NUNCA se
// autoriza. Un cron sin secreto no es un cron "abierto por comodidad",
// es una ruta que cualquiera podría disparar para gastar cuota de la
// Creators API (1 solicitud/segundo, 8.640/día) y escribir en la base.
// Vercel Cron envía el secreto como `Authorization: Bearer <secreto>`.
export function isCronAuthorized(
  authorizationHeader: string | null,
  secret: string | undefined,
): boolean {
  if (!secret) return false;
  const expected = `Bearer ${secret}`;
  if (!authorizationHeader || authorizationHeader.length !== expected.length) {
    return false;
  }
  // Comparación en tiempo constante para no filtrar el secreto por
  // tiempo de respuesta (el secreto nunca se devuelve en la respuesta).
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= authorizationHeader.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
