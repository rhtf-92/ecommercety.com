import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Primera barrera del panel: sin cookie de sesión válida, a /admin/login.
// La verificación completa también ocurre en cada página y acción del
// panel con requireAdmin() (defensa en profundidad).

const COOKIE = "tfp_admin";

async function isValidToken(token: string | undefined): Promise<boolean> {
  const secret = process.env.SESSION_SECRET;
  if (!token || !secret) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const mac = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(payload),
    );
    const expected = Buffer.from(mac).toString("base64url");
    if (expected !== signature) return false;
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    ) as { exp: number };
    return Date.now() <= data.exp;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const ok = await isValidToken(request.cookies.get(COOKIE)?.value);
  if (!ok) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
