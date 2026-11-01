"use client";

import { useActionState } from "react";
import {
  toggleImagesAction,
  type ImagesState,
} from "@/app/admin/(panel)/settings-action";

export default function ImagesToggle({ initial }: { initial: boolean }) {
  const [state, action, pending] = useActionState<ImagesState, FormData>(
    toggleImagesAction,
    { showImages: initial },
  );
  const on = state.showImages;
  return (
    <form action={action} className="flex items-center gap-4">
      <input type="hidden" name="next" value={String(!on)} />
      <button
        type="submit"
        disabled={pending}
        role="switch"
        aria-checked={on}
        aria-label="Mostrar imágenes de productos en el sitio"
        className={`relative h-8 w-14 shrink-0 rounded-full transition disabled:opacity-60 ${
          on ? "bg-brand-600" : "bg-zinc-300"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${
            on ? "left-7" : "left-1"
          }`}
        />
      </button>
      <div className="text-sm">
        <p className="font-bold text-zinc-900">
          {on ? "Imágenes activadas" : "Imágenes desactivadas"}
        </p>
        <p className="text-zinc-500">
          {pending
            ? "Aplicando…"
            : on
              ? "El sitio muestra la foto de cada producto que tenga imagen oficial."
              : "El sitio no muestra ninguna imagen de producto (ni espacios vacíos)."}
        </p>
      </div>
    </form>
  );
}
