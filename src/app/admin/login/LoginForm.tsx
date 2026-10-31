"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);
  return (
    <form action={action} className="mt-8 space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Correo del administrador
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-zinc-700">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      {state.error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-800 disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar al panel"}
      </button>
    </form>
  );
}
