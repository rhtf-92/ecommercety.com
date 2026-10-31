import {
  IconClick,
  IconRefresh,
  IconSearch,
  IconShieldCheck,
} from "@/components/icons";

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold tracking-[0.18em] text-brand-600 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900">
        {title}
      </h2>
      {sub ? <p className="mt-3 text-zinc-600">{sub}</p> : null}
    </div>
  );
}

export function HowWePick() {
  const steps = [
    {
      icon: <IconSearch className="h-6 w-6" />,
      title: "1. We research",
      text: "We scan Amazon's best sellers, movers and new releases, and shortlist products with real demand and listings that hold up to scrutiny.",
    },
    {
      icon: <IconRefresh className="h-6 w-6" />,
      title: "2. We keep verifying",
      text: "Every published pick is re-checked against Amazon on a 5-hour cycle: availability, link health and listing changes. Stale picks are fixed or removed.",
    },
    {
      icon: <IconClick className="h-6 w-6" />,
      title: "3. You buy on Amazon",
      text: "Prices live on Amazon, never copied here. One click takes you to the product page, where you check out with Amazon's secure payment and delivery.",
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {steps.map((step) => (
        <article
          key={step.title}
          className="rounded-3xl border border-zinc-200 bg-white p-6"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            {step.icon}
          </span>
          <h3 className="mt-4 font-bold text-zinc-900">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            {step.text}
          </p>
        </article>
      ))}
    </div>
  );
}

export function TrustStrip() {
  const items = [
    {
      icon: <IconShieldCheck className="h-5 w-5" />,
      text: "Secure checkout on Amazon.com",
    },
    {
      icon: <IconRefresh className="h-5 w-5" />,
      text: "Picks re-verified every 5 hours",
    },
    {
      icon: <IconSearch className="h-5 w-5" />,
      text: "Researched by humans, not scraped",
    },
    {
      icon: <IconClick className="h-5 w-5" />,
      text: "Live prices, always on Amazon",
    },
  ];
  return (
    <div className="grid gap-3 rounded-3xl bg-zinc-50 p-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <p
          key={item.text}
          className="flex items-center gap-2.5 text-sm font-medium text-zinc-700"
        >
          <span className="text-brand-600">{item.icon}</span>
          {item.text}
        </p>
      ))}
    </div>
  );
}

const FAQS = [
  {
    q: "How does T&F Picks make money?",
    a: "We are part of the Amazon Associates program. When you buy through a link on this site, Amazon pays us a small commission at no extra cost to you. That is how we keep the research free.",
  },
  {
    q: "Why don't you show prices on this site?",
    a: "Amazon prices change constantly, and showing stale prices would mislead you. Instead, every pick links straight to Amazon, where you always see the live price, deals and availability.",
  },
  {
    q: "How do you choose the products?",
    a: "We shortlist from Amazon's best-selling and trending lists, check the category and listing quality, and write our own short take for every pick. Anything discontinued or unavailable gets removed in our 5-hour verification cycle.",
  },
  {
    q: "Is checkout safe?",
    a: "Yes. We never take payments here. Your purchase, payment and delivery are handled entirely by Amazon.com, with your usual Amazon account protections.",
  },
];

export function Faq() {
  return (
    <div className="grid gap-3">
      {FAQS.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-zinc-200 bg-white px-5 py-4"
        >
          <summary className="cursor-pointer list-none font-semibold text-zinc-900 marker:hidden">
            {item.q}
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
