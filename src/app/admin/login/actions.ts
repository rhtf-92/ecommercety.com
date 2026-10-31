"use server";

import { redirect } from "next/navigation";
import { adminConfigured, checkCredentials, setSessionCookie } from "@/lib/auth";

export type LoginState = { error?: string };

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
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!checkCredentials(email, password)) {
    return { error: "Correo o contraseña incorrectos." };
  }
  await setSessionCookie(email.trim().toLowerCase());
  redirect("/admin");
}
