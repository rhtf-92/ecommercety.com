"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

// Captura de correo del lead magnet editorial de temporada.
// Promesa honesta: una carta semanal con hallazgos de regalo y guías
// de temporada. NUNCA alertas de precios (cumplimiento Associates:
// sin API oficial no prometemos datos de Amazon que no controlamos).

type Props = {
  source: string; // home | footer | guide-holiday (queda en Subscriber.source)
  tone?: "light" | "dark";
};

type Status = "idle" | "sending" | "done" | "error";

export default function SubscribeForm({ source, tone = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot anti-spam
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const dark = tone === "dark";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (response.ok && data?.ok) {
        setStatus("done");
        return;
      }
      setStatus("error");
      setMessage(
        data?.error ??
          "Something went wrong on our side. Please try again in a moment.",
      );
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`rounded-2xl p-5 ring-1 ${
          dark
            ? "bg-white/5 ring-white/15 text-zinc-100"
            : "bg-emerald-50 ring-emerald-200 text-zinc-800"
        }`}
        role="status"
      >
        <p className="font-bold">You are on the list. Welcome in.</p>
        <p className={`mt-1 text-sm ${dark ? "text-zinc-300" : "text-zinc-600"}`}>
          Your first edition is the seasonal hub our readers start with:
        </p>
        <Link
          href="/guides/holiday-gift-guide-2026"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-500"
        >
          Read the 2026 Holiday Gift Guide
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`subscribe-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`subscribe-email-${source}`}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`w-full flex-1 rounded-full px-5 py-3 text-sm ring-1 outline-none ${
            dark
              ? "bg-white/10 text-white placeholder-zinc-400 ring-white/20 focus:ring-amber-300"
              : "bg-white text-zinc-900 placeholder-zinc-400 ring-zinc-300 focus:ring-brand-400"
          }`}
        />
        {/* Honeypot: invisible para humanos; los bots lo rellenan y la
            API descarta el registro en silencio. */}
        <span className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Company
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </label>
        </span>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cta-500 px-6 py-3 text-sm font-bold text-ink-900 transition hover:bg-cta-400 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Joining…" : "Get the gift list"}
        </button>
      </div>
      {status === "error" && message ? (
        <p className={`mt-3 text-sm font-medium ${dark ? "text-red-300" : "text-red-600"}`} role="alert">
          {message}
        </p>
      ) : null}
      <p className={`mt-3 text-xs leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
        The Holiday Gift List: one thoughtful email a week with our newest
        gift finds and seasonal guides. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}
