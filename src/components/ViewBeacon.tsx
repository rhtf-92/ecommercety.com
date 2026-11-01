"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Envía una señal de visita por cada ruta pública visitada
// (analítica propia, sin cookies ni terceros). Solo corre en el
// navegador y nunca bloquea la navegación.

export default function ViewBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const body = JSON.stringify({ path: pathname });
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon(
        "/api/view",
        new Blob([body], { type: "application/json" }),
      );
    } else {
      void fetch("/api/view", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => undefined);
    }
  }, [pathname]);

  return null;
}
