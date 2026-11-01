import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy policy of T&F Picks: what we collect (very little), why, and your choices.",
};

export default function PrivacyPage() {
  return (
    <StaticPage
      eyebrow="Privacy"
      title="Privacy policy"
      intro="Last updated: October 31, 2026. T&F Picks is a catalog and guide site: there are no user accounts, no checkout and no payments here."
    >
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Click analytics:</strong> when you click a product link,
          we record the product, the time and the section of the site you
          clicked from. This tells us which picks people actually want.
        </li>
        <li>
          <strong>Basic technical logs:</strong> standard server data such
          as browser type and pages visited, used to keep the site working
          and secure.
        </li>
      </ul>
      <h2>What we do not collect</h2>
      <ul>
        <li>No names, accounts or passwords for shoppers.</li>
        <li>No payment information: purchases happen on Amazon.com.</li>
        <li>We do not sell personal data. Ever.</li>
      </ul>
      <h2>Amazon and third parties</h2>
      <p>
        When you follow a link to Amazon, Amazon&apos;s own privacy policy
        applies to everything that happens there, including any cookies
        Amazon uses to attribute the visit. We are not responsible for
        Amazon&apos;s practices.
      </p>
      <h2>Your choices</h2>
      <p>
        You can browse this site without providing any personal information.
        Questions about this policy can be sent through our{" "}
        <a className="font-semibold text-brand-700 underline" href="/contact">
          contact page
        </a>
        .
      </p>
    </StaticPage>
  );
}
