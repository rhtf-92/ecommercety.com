"use client";

import { useActionState } from "react";
import { runSyncAction, type SyncState } from "@/app/admin/(panel)/sync-action";

const initial: SyncState = {};

export default function SyncButton() {
  const [state, action, pending] = useActionState(runSyncAction, initial);
  return (
    <div className="mt-3">
      <form action={action}>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-ink-800 disabled:opacity-60"
        >
          {pending ? "Sincronizando…" : "Sincronizar precios e imágenes ahora"}
        </button>
      </form>
      {state.message ? (
        <p className="mt-2 text-sm font-medium">{state.message}</p>
      ) : null}
    </div>
  );
}
