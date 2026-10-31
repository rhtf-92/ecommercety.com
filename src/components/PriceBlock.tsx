// Bloque de precio OFICIAL: solo se renderiza si existe una foto de
// precio traída de la Creators API y vigente (< 24 h, regla de Amazon).
// Sin foto válida, la ficha mantiene "Check price on Amazon" y este
// componente no muestra nada. Nunca hay precios escritos a mano.

export type PriceView = {
  amount: number | null;
  currency: string;
  listAmount: number | null;
  savingsPercent: number | null;
  dealBadge: string | null;
  dealEndsAt: Date | string | null;
  primeEligible: boolean | null;
  fetchedAt: Date | string;
};

// Lo que llega de Prisma: Decimal en los importes. Se normaliza aquí.
type PriceInput = Omit<PriceView, "amount" | "listAmount"> & {
  amount: { toString(): string } | number | string | null;
  listAmount: { toString(): string } | number | string | null;
};

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function toNumber(
  value: { toString(): string } | number | string | null,
): number | null {
  if (value === null || value === undefined) return null;
  const n = typeof value === "number" ? value : Number(value.toString());
  return Number.isFinite(n) ? n : null;
}

export function freshPrice(
  price: PriceInput | null | undefined,
): PriceView | null {
  if (!price || price.amount === null || price.amount === undefined) {
    return null;
  }
  const fetched = new Date(price.fetchedAt).getTime();
  if (Number.isNaN(fetched) || Date.now() - fetched > MAX_AGE_MS) {
    return null;
  }
  const amount = toNumber(price.amount);
  if (amount === null) return null;
  return { ...price, amount, listAmount: toNumber(price.listAmount) };
}

function fmt(value: number | null, currency: string): string | null {
  if (value === null) return null;
  const n = value;
  if (!Number.isFinite(n)) return null;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

export function UpdatedStamp({ fetchedAt }: { fetchedAt: Date | string }) {
  const date = new Date(fetchedAt);
  const label = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <p className="text-[11px] leading-relaxed text-zinc-400">
      Price checked {label}. Prices and availability on Amazon change
      often; the live price at checkout is the one that counts.
    </p>
  );
}

export default function PriceBlock({
  price,
  size = "card",
}: {
  price: PriceView;
  size?: "card" | "detail";
}) {
  const amount = fmt(price.amount, price.currency);
  if (!amount) return null;
  const list = fmt(price.listAmount, price.currency);
  const showList = list && list !== amount;
  const dealEnds = price.dealEndsAt ? new Date(price.dealEndsAt) : null;

  if (size === "card") {
    return (
      <div className="mt-4">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-2xl font-extrabold tracking-tight text-zinc-900">
            {amount}
          </span>
          {showList ? (
            <span className="text-sm text-zinc-400 line-through">{list}</span>
          ) : null}
          {price.savingsPercent ? (
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              -{price.savingsPercent}%
            </span>
          ) : null}
        </p>
        {price.dealBadge ? (
          <p className="mt-1 text-xs font-bold text-red-600">
            {price.dealBadge}
            {dealEnds
              ? ` · ends ${dealEnds.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
              : ""}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-3">
        <span className="text-4xl font-black tracking-tight text-zinc-900">
          {amount}
        </span>
        {showList ? (
          <span className="text-lg text-zinc-400 line-through">{list}</span>
        ) : null}
        {price.savingsPercent ? (
          <span className="rounded-full bg-red-600 px-2.5 py-1 text-sm font-bold text-white">
            Save {price.savingsPercent}%
          </span>
        ) : null}
      </p>
      {price.dealBadge ? (
        <p className="mt-2 font-semibold text-red-600">
          {price.dealBadge}
          {dealEnds
            ? ` — ends ${dealEnds.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`
            : ""}
        </p>
      ) : null}
      {price.primeEligible ? (
        <p className="mt-1 text-sm font-semibold text-sky-700">
          Prime delivery available
        </p>
      ) : null}
    </div>
  );
}
