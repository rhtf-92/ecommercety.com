import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "Full affiliate disclosure for T&F Picks: Amazon Associates participation, commissions, pricing and data practices.",
};

export default function DisclosurePage() {
  return (
    <StaticPage
      eyebrow="Transparency"
      title="Affiliate disclosure"
      intro="Plain language, no fine print games. This page explains how T&F Picks earns money and how product data on this site works."
    >
      <h2>Amazon Associates</h2>
      <p>
        T&F Picks is a participant in the Amazon Services LLC Associates
        Program, an affiliate advertising program designed to provide a
        means for sites to earn advertising fees by advertising and linking
        to Amazon.com. As an Amazon Associate, T&F Picks earns from
        qualifying purchases.
      </p>
      <h2>What that means for you</h2>
      <ul>
        <li>Prices are exactly the same whether you use our link or not.</li>
        <li>Your purchase, payment, shipping and returns are handled entirely by Amazon.</li>
        <li>We never see your payment details or your Amazon account.</li>
      </ul>
      <h2>Prices and availability</h2>
      <p>
        Product prices and availability are accurate as of the date and time
        indicated next to any price we display, and are subject to change.
        When we cannot show verified pricing from Amazon&apos;s official
        data, we show no price at all and link you to Amazon to check the
        live price. Any price displayed at checkout on Amazon will apply to
        your purchase.
      </p>
      <h2>Trademarks</h2>
      <p>
        Amazon, the Amazon logo and Amazon Prime are trademarks of
        Amazon.com, Inc. or its affiliates. Product names and brands shown
        on this site belong to their respective owners. T&F Picks is an
        independent site and is not endorsed by Amazon.
      </p>
      <h2>Editorial independence</h2>
      <p>
        Commissions do not buy placement. Picks are chosen by our own
        research method and are removed when they stop meeting it, whatever
        they earn.
      </p>
    </StaticPage>
  );
}
