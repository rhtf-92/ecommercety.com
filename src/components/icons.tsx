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

export function IconBook(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </svg>
  );
}
