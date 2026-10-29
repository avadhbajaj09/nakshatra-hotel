/**
 * PartyVenuePage — targets "birthday party venue in Khargone"
 * Includes Quick Answer block and FAQPage JSON-LD.
 */

import { JsonLd } from "@/components/json-ld";
import { buildFaqSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

const partyFaqs = [
  {
    q: "Where can I host a birthday party in Khargone?",
    a: "Nakshatra Hotel & Resort on Sanawad Road, near D-Mart, Khargone offers indoor halls, outdoor garden lawns and poolside settings for birthday parties of all sizes. WhatsApp +91 94797 93778 to enquire.",
  },
  {
    q: "Does Nakshatra Hotel offer pool parties in Khargone?",
    a: "Yes. Nakshatra Hotel & Resort's ground-floor guest swimming pool is available for poolside party arrangements, subject to date availability, guest count and safety conditions confirmed with the hotel team.",
  },
  {
    q: "Can I book a private hall for a birthday celebration at Nakshatra?",
    a: "Yes. Nakshatra Hotel & Resort offers private hall bookings for birthday parties, anniversaries and personal celebrations — indoor banquet hall, outdoor garden lawns or a combination of both can be arranged.",
  },
  {
    q: "Is there accommodation for birthday party guests in Khargone?",
    a: "Yes. Nakshatra Hotel & Resort has 60 rooms (Executive, Deluxe, Family, Suite) so birthday party guests travelling from outside Khargone can stay on-site — rooms from ₹2,999/night.",
  },
  {
    q: "How do I plan an anniversary party at Nakshatra Hotel Khargone?",
    a: "WhatsApp +91 94797 93778 with your preferred date, guest count and the type of setup you want (indoor dinner, garden party or pool party). The hotel team will provide availability and a package outline.",
  },
];

const partyOptions = [
  {
    title: "Pool Party",
    icon: "🏊",
    description:
      "Celebrate by the water. Nakshatra's ground-floor guest pool can be arranged for poolside birthday parties — great for summer daytime celebrations and younger guests. Discuss timing, safety and catering with the hotel.",
  },
  {
    title: "Garden Party",
    icon: "🌿",
    description:
      "Open-air celebrations on Nakshatra's lush wedding lawns and garden. Ideal for October–February when Khargone evenings are pleasant. Fairy lights, outdoor seating and lawn games can all be arranged.",
  },
  {
    title: "Private Hall Booking",
    icon: "🎉",
    description:
      "Indoor banquet hall for formal birthday dinners, DJ nights, milestone celebrations and corporate anniversary parties. AC, stage-ready, and catering by the in-house restaurant team.",
  },
];

export function PartyVenuePage() {
  const faqSchema = buildFaqSchema(partyFaqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Party Venue", url: `${siteConfig.url}/party-venue` },
  ]);

  return (
    <main className="subpage">
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="page-hero">
        <img
          src="/images/ground-floor-pool-gallery/nakshatra14.jpeg"
          alt="Birthday Party Venue in Khargone — Nakshatra Hotel"
        />
        <div className="page-hero-shade" />
        <div className="page-hero-copy">
          <p className="kicker">CELEBRATIONS AT NAKSHATRA</p>
          <h1>
            Birthday Party Venue in Khargone —{" "}
            <em>Nakshatra Hotel</em>
          </h1>
          <p>
            Pool parties, garden parties and private hall bookings — plan your
            celebration at Khargone&apos;s resort destination.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="section-shell" style={{ paddingTop: "2.5rem", paddingBottom: "1.5rem" }}>
        <div
          className="glass-panel"
          style={{ maxWidth: "720px", margin: "0 auto", padding: "1.5rem 2rem" }}
        >
          <p className="kicker">QUICK ANSWER</p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            <strong>
              Where is the best birthday party venue in Khargone?
            </strong>{" "}
            Nakshatra Hotel &amp; Resort offers Khargone&apos;s most complete party
            venue setup — a guest swimming pool for pool parties, lush garden
            lawns for outdoor celebrations, an indoor AC hall for private dinners
            and DJ nights, in-house catering, and 60 on-site rooms for guests
            who want to stay over. Located near D-Mart on Sanawad Road.
          </p>
        </div>
      </section>

      {/* Party Options */}
      <section className="section-shell" style={{ paddingTop: "2rem" }}>
        <div className="rich-section-head">
          <p className="kicker">PARTY OPTIONS</p>
          <h2>
            Choose your <em>celebration style.</em>
          </h2>
        </div>
        <div className="rich-feature-grid" style={{ marginTop: "2rem" }}>
          {partyOptions.map((opt) => (
            <article key={opt.title} className="glass-panel">
              <span className="luxury-icon" style={{ fontSize: "2rem" }}>
                {opt.icon}
              </span>
              <h3>{opt.title}</h3>
              <p>{opt.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="rich-highlights" style={{ marginTop: "2.5rem" }}>
        <div className="section-shell">
          {[
            { value: "60 rooms", label: "On-site guest accommodation" },
            { value: "Pool + Lawns", label: "Multiple party settings" },
            { value: "In-house", label: "Multi-cuisine catering" },
            { value: "200+ vehicles", label: "Free parking" },
          ].map((h) => (
            <div key={h.label}>
              <b>{h.value}</b>
              <span>{h.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Photo strip */}
      <section className="rooms-photo-band" style={{ marginTop: "2.5rem" }}>
        <figure>
          <img
            src="/images/ground-floor-pool-gallery/nakshatra10.jpeg"
            alt="Guest swimming pool at Nakshatra Hotel Khargone for pool parties"
          />
          <figcaption>Guest pool — pool party setting</figcaption>
        </figure>
        <figure>
          <img
            src="/images/wedding-garden.jpg"
            alt="Garden lawns at Nakshatra Hotel Khargone for outdoor parties"
          />
          <figcaption>Outdoor garden lawns</figcaption>
        </figure>
        <figure>
          <img
            src="/images/party.jpg"
            alt="Indoor party venue at Nakshatra Hotel Khargone"
          />
          <figcaption>Indoor celebration venue</figcaption>
        </figure>
      </section>

      {/* FAQ */}
      <section className="section-shell" style={{ paddingTop: "2.5rem" }}>
        <div className="rich-section-head">
          <p className="kicker">PARTY PLANNING FAQ</p>
          <h2>
            Common questions <em>answered.</em>
          </h2>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {partyFaqs.map((faq) => (
            <details
              key={faq.q}
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                padding: "1rem 0",
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1rem",
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {faq.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p style={{ marginTop: "0.75rem", lineHeight: 1.7, color: "#444" }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell" style={{ paddingTop: "2.5rem", paddingBottom: "3rem" }}>
        <div
          className="glass-panel"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <p className="kicker">PLAN YOUR PARTY</p>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            WhatsApp to start planning
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#555" }}>
            Share your preferred date, guest count and party type (pool /
            garden / indoor). We&apos;ll respond with availability and options.
          </p>
          <a
            href={siteConfig.whatsappUrl}
            className="gold-button"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Now
          </a>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
            Or call:{" "}
            <a href={`tel:${siteConfig.phone.replace(/-/g, "")}`}>
              {siteConfig.phone}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
