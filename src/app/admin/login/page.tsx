import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { SiteLogoMark } from "@/components/SiteLogo";

export const metadata: Metadata = {
  title: "Panel · Acceso",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-zinc-900/5 ring-1 ring-zinc-200">
        <SiteLogoMark />
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
          Panel de administración
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          T&amp;F Picks · by E-Commerce T&amp;F. Acceso interno.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
