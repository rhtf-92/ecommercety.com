"use client";

type Props = {
  asin: string;
  channel?: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Botón de afiliado: enlaza DIRECTAMENTE a Amazon con
 * rel="sponsored nofollow" (sin cloaking) y registra el clic con un
 * beacon que no bloquea la navegación.
 */
export default function TrackedAffiliateButton({
  asin,
  channel = "WEB",
  href,
  children,
  className,
}: Props) {
  function trackClick() {
    try {
      const payload = JSON.stringify({
        asin,
        channel,
        sourcePage: window.location.pathname,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/click",
          new Blob([payload], { type: "application/json" }),
        );
      } else {
        void fetch("/api/click", {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        });
      }
    } catch {
      // El registro nunca debe impedir que el usuario llegue a Amazon.
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      onClick={trackClick}
      className={className}
    >
      {children}
    </a>
  );
}
