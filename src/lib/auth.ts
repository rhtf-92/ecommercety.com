import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Autenticación del panel de administración (usuario único por entorno).
// Credenciales en variables de entorno: ADMIN_EMAIL, ADMIN_PASSWORD y
// SESSION_SECRET. La sesión es una cookie firmada con HMAC-SHA256.

export const SESSION_COOKIE = "tfp_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 horas

export function adminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD &&
      process.env.SESSION_SECRET,
  );
}

function sign(payloadB64: string): string {
  return createHmac("sha256", process.env.SESSION_SECRET ?? "")
    .update(payloadB64)
    .digest("base64url");
}

export function createSessionToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + SESSION_TTL_MS }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token || !process.env.SESSION_SECRET) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      email: string;
      exp: number;
    };
    if (Date.now() > data.exp) return null;
    return data.email;
  } catch {
    return null;
  }
}

export function checkCredentials(email: string, password: string): boolean {
  if (!adminConfigured()) return false;
  const emailOk = email.trim().toLowerCase() === process.env.ADMIN_EMAIL;
  const passOk = password === process.env.ADMIN_PASSWORD;
  return emailOk && passOk;
}

export async function currentAdmin(): Promise<string | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Úsalo al inicio de cada página/acción del panel. */
export async function requireAdmin(): Promise<string> {
  const email = await currentAdmin();
  if (!email) redirect("/admin/login");
  return email;
}

export async function setSessionCookie(email: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
