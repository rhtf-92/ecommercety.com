"use server";

import { redirect } from "next/navigation";
import { clearSessionCookie, requireAdmin } from "@/lib/auth";

export async function logoutAction() {
  await requireAdmin();
  await clearSessionCookie();
  redirect("/admin/login");
}
