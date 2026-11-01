import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact T&F Picks by E-Commerce T&F.",
};

export default function ContactPage() {
  return (
    <StaticPage
      eyebrow="Contact"
      title="Talk to a human"
      intro="Corrections, product suggestions, business inquiries or a pick you think we got wrong: we read everything."
    >
      <p>
        Email us at{" "}
        <a
          className="font-semibold text-brand-700 underline"
          href="mailto:contact@ecommercety.com"
        >
          contact@ecommercety.com
        </a>
        . We usually reply within two business days.
      </p>
      <h2>Please note</h2>
      <ul>
        <li>
          For order, shipping or return questions, contact Amazon directly:
          they handle every purchase made through our links.
        </li>
        <li>
          Brands: we do not accept payment for placement or reviews. You are
          welcome to suggest a product for our research list.
        </li>
      </ul>
    </StaticPage>
  );
}
