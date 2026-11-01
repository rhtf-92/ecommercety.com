"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { adminConfigured, checkCredentials, setSessionCookie } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { logEvent } from "@/lib/log";

export type LoginState = { error?: string };

// Protección anti fuerza bruta: 5 intentos por IP cada 10 minutos.
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!adminConfigured()) {
    return {
      error:
        "El panel aún no está configurado: faltan ADMIN_EMAIL, ADMIN_PASSWORD o SESSION_SECRET en el entorno.",
    };
  }
  const ip = clientIp(await headers());
  const gate = rateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!gate.ok) {
    logEvent("warn", "login.rate_limited", { ip });
    return {
      error: `Demasiados intentos. Espera ${Math.ceil(gate.retryAfterSec / 60)} min e inténtalo de nuevo.`,
    };
  }
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!checkCredentials(email, password)) {
    logEvent("warn", "login.failed", { ip });
    return { error: "Correo o contraseña incorrectos." };
  }
  logEvent("info", "login.success", { ip });
  await setSessionCookie(email.trim().toLowerCase());
  redirect("/admin");
}
