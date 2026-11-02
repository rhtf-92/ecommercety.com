// Iconos de trazo (estilo Lucide, dibujados a mano para no sumar dependencias).
type P = { className?: string };

function base(props: P) {
  return {
    className: props.className ?? "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };
}

export function IconHome(p: P) {
  return (
    <svg {...base(p)}>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

export function IconCpu(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  );
}

export function IconSparkles(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
    </svg>
  );
}

export function IconPaw(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="5" cy="9" r="1.6" />
      <circle cx="9.5" cy="5.5" r="1.6" />
      <circle cx="14.5" cy="5.5" r="1.6" />
      <circle cx="19" cy="9" r="1.6" />
      <path d="M12 11c3.2 0 5.5 2.4 5.5 5 0 1.9-1.4 3-3.2 3-1 0-1.5-.3-2.3-.3s-1.3.3-2.3.3c-1.8 0-3.2-1.1-3.2-3 0-2.6 2.3-5 5.5-5z" />
    </svg>
  );
}

export function IconDumbbell(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11" />
    </svg>
  );
}

export function IconWrench(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3z" />
    </svg>
  );
}

export function IconBlocks(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="4" />
    </svg>
  );
}

export function IconBaby(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M12 4c.3-1.2 1.3-1.9 2.6-1.7" />
      <path d="M5.5 21c.8-3.8 3.4-5.7 6.5-5.7s5.7 1.9 6.5 5.7" />
    </svg>
  );
}

export function IconShirt(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.1a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.3-2.2z" />
    </svg>
  );
}

export function IconCar(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M5.5 15.5 6.8 8a2 2 0 0 1 2-1.5h6.4a2 2 0 0 1 2 1.5l1.3 7.5" />
      <path d="M3 15.5h18a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1h-1.5M3 20.5a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 1-1" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
      <path d="M8.8 18h6.4" />
    </svg>
  );
}

export function IconBriefcase(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2.5 13h19" />
    </svg>
  );
}

export function IconGamepad(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M6.7 5h10.6a4 4 0 0 1 4 3.6l.7 6.9a3 3 0 0 1-5.2 2.3L14 14.5h-4L7.2 17.8A3 3 0 0 1 2 15.5l.7-6.9A4 4 0 0 1 6.7 5z" />
      <path d="M7 10v4M5 12h4" />
      <path d="M15.5 10h.01M18 13h.01" />
    </svg>
  );
}

export function IconHeartPulse(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M19.5 13.5 12 21l-7.5-7.5A5.3 5.3 0 0 1 12 6.2a5.3 5.3 0 0 1 7.5 7.3z" />
      <path d="M3.5 12h4l1.5-3 3.5 6 1.5-3h6" />
    </svg>
  );
}

export function IconBasket(p: P) {
  return (
    <svg {...base(p)}>
      <path d="m5 11 4-7M19 11l-4-7M2.5 11h19" />
      <path d="m4 11 1.5 7.2A2 2 0 0 0 7.5 20h9a2 2 0 0 0 2-1.8L20 11" />
      <path d="M9.5 14.5v3M14.5 14.5v3" />
    </svg>
  );
}

export function IconShieldCheck(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 3l7 3v5c0 5-3.1 8.4-7 10-3.9-1.6-7-5-7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconRefresh(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6" />
    </svg>
  );
}

export function IconClick(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M9 9l10 3-4 1.5L13.5 18z" />
      <path d="M7.2 2.2l.8 2.3M2.2 7.2l2.3.8M5 12H2.5M12 5l-.8-2.3" />
    </svg>
  );
}

export function IconCheck(p: P) {
  return (
    <svg {...base(p)}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function IconArrowRight(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function IconSearch(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

export function IconTrending(p: P) {
  return (
    <svg {...base(p)}>
      <path d="m3 17 6-6 4 4 7-7" />
      <path d="M15 8h5v5" />
    </svg>
  );
}

export function IconLock(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function IconExternal(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />
    </svg>
  );
}

export function IconChevronDown(p: P) {
  return (
    <svg {...base(p)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconMenu(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconX(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconBook(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </svg>
  );
}
