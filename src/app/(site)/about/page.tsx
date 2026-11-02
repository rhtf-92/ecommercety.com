import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "About us",
  description:
    "T&F Picks by E-Commerce T&F: who we are, how we curate Amazon products and how we keep every pick verified.",
};

export default function AboutPage() {
  return (
    <StaticPage
      image="/pages/about.jpg"
      eyebrow="About"
      title="Great products, zero guesswork. That is the whole idea."
      intro="T&F Picks is the storefront of E-Commerce T&F. We research Amazon so you do not have to scroll through thousands of near-identical listings to find the one worth buying."
    >
      <h2>How a product earns a spot here</h2>
      <p>
        Every pick starts in Amazon&apos;s best-seller, trending and new
        release lists. We shortlist by hand, check the listing quality and
        the category, and write our own short take for each product. Nothing
        is copied from Amazon, and nothing is published just to fill a page.
      </p>
      <h2>Kept honest, on a cycle</h2>
      <p>
        Published picks are re-verified on a 5-hour cycle against Amazon:
        if a product is discontinued or its link breaks, it comes down. New
        trending finds join mid-cycle after passing the same checks.
      </p>
      <h2>How we make money</h2>
      <p>
        We participate in the Amazon Associates program. When you buy
        through a link on this site, Amazon pays us a small commission at no
        extra cost to you. That commission funds the research, and it never
        changes which products we pick. Read the full{" "}
        <a className="font-semibold text-brand-700 underline" href="/disclosure">
          affiliate disclosure
        </a>
        .
      </p>
      <h2>What we will never do</h2>
      <ul>
        <li>Show a price we cannot verify through Amazon&apos;s official data.</li>
        <li>Copy Amazon descriptions, photos or customer reviews.</li>
        <li>Recommend a product only because its commission is higher.</li>
      </ul>
    </StaticPage>
  );
}
