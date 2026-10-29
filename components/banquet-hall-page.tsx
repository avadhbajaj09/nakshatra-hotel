/**
 * BanquetHallPage — targets "banquet hall in Khargone" / "marriage hall in Khargone"
 * Includes FAQPage + BreadcrumbList JSON-LD and an AEO Quick Answer block.
 */

import { JsonLd } from "@/components/json-ld";
import { buildFaqSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

const banquetFaqs = [
  {
    q: "What is the capacity of the banquet hall in Khargone at Nakshatra?",
    a: "Nakshatra Grand Hall can accommodate up to 1,200 guests across its approximately 5,500 sq ft indoor air-conditioned banquet hall and outdoor wedding lawns combined.",
  },
  {
    q: "Does Nakshatra Hotel in Khargone have a marriage hall?",
    a: "Yes. Nakshatra Hotel & Resort has Nakshatra Grand Hall — a dedicated wedding and marriage hall in Khargone with ~5,500 sq ft of indoor space, plus outdoor garden lawns for open-air ceremonies and receptions.",
  },
  {
    q: "What events can be held at Nakshatra banquet hall?",
    a: "Nakshatra Grand Hall hosts weddings, engagements, receptions, birthday parties, anniversary celebrations, corporate conferences, business meetings and social gatherings.",
  },
  {
    q: "Is the banquet hall at Nakshatra Hotel AC?",
    a: "Yes. The indoor banquet hall at Nakshatra Hotel & Resort is fully air-conditioned. The property also has open-air garden lawns for events in cooler months.",
  },
  {
    q: "How do I book the banquet hall at Nakshatra Hotel Khargone?",
    a: "To book the banquet hall, WhatsApp +91 94797 93778 or call +91 94250 88369. Share your preferred date, event type and approximate guest count to receive availability confirmation.",
  },
  {
    q: "Does Nakshatra Hotel have parking for wedding guests?",
    a: "Yes. Nakshatra Hotel & Resort offers Khargone's biggest dedicated on-site parking area, capable of accommodating 200+ vehicles, with 24-hour security — ideal for large wedding gatherings.",
  },
];

const capacityLayouts = [
  { layout: "Seated dinner (banquet tables)", capacity: "800–1,000" },
  { layout: "Theatre / conference style", capacity: "1,000–1,200" },
  { layout: "Cocktail reception (standing)", capacity: "1,200+" },
  {
    layout: "Wedding ceremony (chairs, aisle setup)",
    capacity: "600–800",
  },
];

export function BanquetHallPage() {
  const faqSchema = buildFaqSchema(banquetFaqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Banquet Hall", url: `${siteConfig.url}/banquet-hall` },
  ]);

  return (
    <main className="subpage">
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="page-hero">
        <img
          src="/images/grand-hall-gallery/nakshatra69.jpeg"
          alt="Nakshatra Grand Hall — Banquet Hall in Khargone"
        />
        <div className="page-hero-shade" />
        <div className="page-hero-copy">
          <p className="kicker">NAKSHATRA GRAND HALL</p>
          <h1>Banquet Hall in Khargone —{" "}
            <em>Nakshatra Grand Hall</em>
          </h1>
          <p>
            5,500 sq ft AC indoor venue + outdoor wedding lawns. Up to 1,200
            guests. 60 on-site rooms. Khargone&apos;s biggest free parking.
          </p>
        </div>
      </section>

      {/* Quick Answer block — AEO */}
      <section className="section-shell" style={{ paddingTop: "2.5rem", paddingBottom: "1.5rem" }}>
        <div
          className="glass-panel"
          style={{ maxWidth: "720px", margin: "0 auto", padding: "1.5rem 2rem" }}
        >
          <p className="kicker">QUICK ANSWER</p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            <strong>What is the best banquet hall in Khargone?</strong>{" "}
            Nakshatra Grand Hall at Nakshatra Hotel &amp; Resort is one of
            Khargone&apos;s largest and most complete wedding venues — featuring a
            ~5,500 sq ft AC indoor hall, open-air wedding lawns, capacity for up
            to 1,200 guests, 60 on-site guest rooms, multi-cuisine catering and
            Khargone&apos;s biggest free parking area, all on Sanawad Road near
            D-Mart.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="rich-highlights">
        <div className="section-shell">
          {[
            { value: "~5,500 sq ft", label: "Indoor AC banquet hall" },
            { value: "1,200 guests", label: "Maximum capacity" },
            { value: "60 rooms", label: "On-site accommodation" },
            { value: "200+ vehicles", label: "Free parking capacity" },
          ].map((h) => (
            <div key={h.label}>
              <b>{h.value}</b>
              <span>{h.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capacity Table */}
      <section className="section-shell" style={{ paddingTop: "2.5rem" }}>
        <div className="rich-section-head">
          <p className="kicker">LAYOUT OPTIONS</p>
          <h2>
            Capacity by <em>event layout</em>
          </h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1.5rem",
              fontSize: "0.97rem",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid var(--gold, #b8972c)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "var(--font-serif)" }}>
                  Layout / Setup
                </th>
                <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "var(--font-serif)" }}>
                  Approximate Capacity
                </th>
              </tr>
            </thead>
            <tbody>
              {capacityLayouts.map((row, i) => (
                <tr
                  key={row.layout}
                  style={{
                    background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.025)",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <td style={{ padding: "0.75rem 1rem" }}>{row.layout}</td>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>
                    {row.capacity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            style={{
              fontSize: "0.82rem",
              color: "#666",
              marginTop: "0.5rem",
              paddingLeft: "1rem",
            }}
          >
            Actual capacity depends on final layout, stage placement, food
            counters and décor. Confirm your preferred setup with the hotel
            team.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="section-shell" style={{ paddingTop: "2.5rem" }}>
        <div className="rich-section-head">
          <p className="kicker">WHY CHOOSE NAKSHATRA</p>
          <h2>
            Everything a wedding needs,{" "}
            <em>in one place.</em>
          </h2>
        </div>
        <div className="rich-feature-grid" style={{ marginTop: "2rem" }}>
          {[
            {
              title: "Indoor + Outdoor",
              text: "The ~5,500 sq ft AC banquet hall for all-weather events, plus lush open-air wedding garden lawns for ceremonies and evening receptions.",
            },
            {
              title: "On-site Rooms",
              text: "60 guest rooms across Executive, Deluxe, Family and Suite categories let wedding families and out-of-town guests stay on-site — no coordinating hotel shuttles.",
            },
            {
              title: "Multi-Cuisine Catering",
              text: "In-house restaurant team handles wedding meal service — North Indian, Chinese, Continental and Mughlai menus, vegetarian and non-vegetarian.",
            },
            {
              title: "Biggest Parking in Khargone",
              text: "Dedicated on-site parking for 200+ vehicles with 24-hour security — essential for wedding gatherings of 500–1,200 guests.",
            },
            {
              title: "Central Location",
              text: "Near D-Mart on Sanawad Road, Jaitapur, Khargone — easy access from Indore (95 km) and nearby districts.",
            },
            {
              title: "Events Team Support",
              text: "Discuss date, functions, guest flow, dining and accommodation requirements in one planning conversation with the hotel team.",
            },
          ].map((f) => (
            <article key={f.title} className="glass-panel">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery strip */}
      <section className="rooms-photo-band" style={{ marginTop: "2.5rem" }}>
        <figure>
          <img
            src="/images/grand-hall-gallery/nakshatra42.jpeg"
            alt="Banquet hall interior at Nakshatra Hotel Khargone"
          />
          <figcaption>Indoor AC banquet hall</figcaption>
        </figure>
        <figure>
          <img
            src="/images/grand-hall-gallery/nakshatra74.jpeg"
            alt="Wedding setup at Nakshatra Grand Hall Khargone"
          />
          <figcaption>Wedding ceremony setup</figcaption>
        </figure>
        <figure>
          <img
            src="/images/wedding-garden.jpg"
            alt="Outdoor wedding garden at Nakshatra Hotel Khargone"
          />
          <figcaption>Open-air wedding garden</figcaption>
        </figure>
      </section>

      {/* FAQ */}
      <section className="section-shell" style={{ paddingTop: "2.5rem" }}>
        <div className="rich-section-head">
          <p className="kicker">FREQUENTLY ASKED QUESTIONS</p>
          <h2>
            Banquet hall{" "}
            <em>questions answered.</em>
          </h2>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {banquetFaqs.map((faq) => (
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
          <p className="kicker">ENQUIRE NOW</p>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Plan your event at Nakshatra Grand Hall
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#555" }}>
            Share your preferred date, event type and guest count to receive
            availability and a tailored package quote.
          </p>
          <a
            href={siteConfig.whatsappUrl}
            className="gold-button"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp to Enquire
          </a>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
            Or call: <a href={`tel:${siteConfig.phone.replace(/-/g, "")}`}>{siteConfig.phone}</a>
          </p>
          <p
            style={{
              marginTop: "2rem",
              fontSize: "0.8rem",
              color: "#999",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              paddingTop: "1rem",
            }}
          >
            Last updated: October 2025
          </p>
        </div>
      </section>
    </main>
  );
}
