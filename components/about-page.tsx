/**
 * AboutPage — entity definition page for GEO.
 * Helps ChatGPT/Gemini/Perplexity correctly identify the hotel entity.
 * First paragraph is carefully structured for AI entity recognition.
 */

import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ]);

  return (
    <main className="subpage">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="page-hero">
        <img
          src="/images/story-resort.jpg"
          alt="Nakshatra Hotel & Resort — Hotel in Khargone, Madhya Pradesh"
        />
        <div className="page-hero-shade" />
        <div className="page-hero-copy">
          <p className="kicker">OUR STORY</p>
          <h1>
            About Nakshatra Hotel &amp; Resort,{" "}
            <em>Khargone</em>
          </h1>
        </div>
      </section>

      {/* Entity definition block — GEO-critical */}
      <section className="section-shell" style={{ paddingTop: "3rem" }}>
        <div style={{ maxWidth: "800px" }}>
          {/* This first paragraph is deliberately structured for AI entity recognition */}
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Nakshatra Hotel &amp; Resort is a hotel, restaurant and banquet venue
            located in Jaitapur, Khargone, Madhya Pradesh, India (PIN: 451001).
            The property is situated on Sanawad Road, near D-Mart, and offers
            60 guest rooms across four categories, an in-house multi-cuisine
            restaurant, a ~5,500 sq ft banquet hall with wedding lawns, and a
            guest swimming pool.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem", color: "#555" }}>
            The hotel is positioned as Khargone&apos;s most comprehensive resort
            destination — combining accommodation, dining, event hosting and
            recreation within a single property. Its location on Sanawad Road,
            near D-Mart, makes it easily accessible for both local guests and
            travellers arriving from Indore (~95 km), Maheshwar (~50 km) and
            Omkareshwar (~75 km).
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-shell" style={{ paddingTop: "1.5rem" }}>
        <div className="rich-section-head">
          <p className="kicker">WHAT WE OFFER</p>
          <h2>
            A complete <em>Khargone address.</em>
          </h2>
        </div>
        <div className="rich-feature-grid" style={{ marginTop: "2rem" }}>
          {[
            {
              title: "60 Guest Rooms",
              text: "Four room categories: Executive (₹2,999/night), Deluxe (₹3,799/night), Family Room (₹7,499/night) and Suite (₹6,499/night). All rooms are air-conditioned with daily housekeeping, hot water, WiFi and TV.",
              link: "/rooms",
              linkLabel: "View rooms",
            },
            {
              title: "Multi-Cuisine Restaurant",
              text: "In-house restaurant serving North Indian, Chinese, Continental and Mughlai cuisine, with vegetarian and non-vegetarian options. Open for breakfast, lunch and dinner.",
              link: "/restaurant",
              linkLabel: "View restaurant",
            },
            {
              title: "Nakshatra Grand Hall",
              text: "~5,500 sq ft indoor AC banquet hall for weddings, receptions, corporate events and celebrations. Open-air wedding garden and lush lawns for outdoor ceremonies. Capacity up to 1,200 guests.",
              link: "/banquet-hall",
              linkLabel: "View banquet hall",
            },
            {
              title: "Swimming Pool",
              text: "Ground-floor guest swimming pool included for registered room guests. 3rd-floor private pool suites available for luxury stays.",
              link: "/ground-floor-pool",
              linkLabel: "View pool",
            },
            {
              title: "Free Parking",
              text: "Khargone's biggest dedicated on-site parking area for 200+ vehicles. 24-hour security. Available for hotel guests, restaurant visitors, wedding and event guests.",
              link: "/parking",
              linkLabel: "Parking details",
            },
            {
              title: "Birthday & Event Parties",
              text: "Pool parties, garden parties and private hall bookings for birthdays, anniversaries and personal celebrations.",
              link: "/party-venue",
              linkLabel: "Party venue",
            },
          ].map((s) => (
            <article key={s.title} className="glass-panel">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link href={s.link} style={{ fontWeight: 600 }}>
                {s.linkLabel} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Location & NAP — clearly structured for entity recognition */}
      <section className="section-shell" style={{ paddingTop: "2.5rem" }}>
        <div className="rich-section-head">
          <p className="kicker">LOCATION & CONTACT</p>
          <h2>
            Find us in <em>Khargone.</em>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {/* NAP block */}
          <div className="glass-panel" style={{ padding: "1.5rem 2rem" }}>
            <h3 style={{ marginBottom: "1.25rem" }}>Contact Information</h3>
            <address style={{ fontStyle: "normal", lineHeight: 2 }}>
              <p>
                <strong>Hotel Nakshatra &amp; Resort</strong>
              </p>
              <p>
                {siteConfig.address.streetAddress},<br />
                {siteConfig.address.locality},{" "}
                {siteConfig.address.region} {siteConfig.address.postalCode}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${siteConfig.phone.replace(/-/g, "")}`}>
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <strong>WhatsApp:</strong>{" "}
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
                  +91 94797 93778
                </a>
              </p>
              <p>
                <strong>Check-in:</strong> {siteConfig.checkinTime} PM &nbsp;|&nbsp;{" "}
                <strong>Check-out:</strong> {siteConfig.checkoutTime} AM
              </p>
            </address>
          </div>

          {/* Distances */}
          <div className="glass-panel" style={{ padding: "1.5rem 2rem" }}>
            <h3 style={{ marginBottom: "1.25rem" }}>Nearby Distances</h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: 2 }}>
              {siteConfig.nearbyLandmarks.map((lm) => (
                <li key={lm.name}>
                  <strong>{lm.name}:</strong> {lm.distance}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="section-shell" style={{ paddingTop: "2rem", paddingBottom: "1.5rem" }}>
        <div className="rich-section-head">
          <p className="kicker">HOTEL POLICIES</p>
          <h2>
            What to <em>know before you visit.</em>
          </h2>
        </div>
        <div style={{ marginTop: "1.5rem", maxWidth: "700px" }}>
          <ul style={{ lineHeight: 2, color: "#555" }}>
            <li>✓ Check-in: 12:00 PM | Check-out: 10:00 AM</li>
            <li>✓ Primary guest must be at least 18 years of age</li>
            <li>✓ Valid government ID required at check-in (Aadhaar accepted)</li>
            <li>✗ Local IDs not accepted</li>
            <li>✗ Unmarried couples not allowed</li>
            <li>✗ Pets not allowed</li>
            <li>✗ Outside food not allowed</li>
          </ul>
        </div>
      </section>

      {/* sameAs links */}
      <section className="section-shell" style={{ paddingBottom: "3rem" }}>
        <div className="rich-section-head">
          <p className="kicker">FIND US ONLINE</p>
          <h2>
            Nakshatra Hotel <em>on the web.</em>
          </h2>
        </div>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href={siteConfig.socials.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="gold-button"
          >
            View on Google Maps
          </a>
          {/* TODO: Add Instagram and Facebook links when client provides them */}
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#888" }}>
          Social media links (Instagram, Facebook) will be added when confirmed
          by the hotel.
        </p>
      </section>
    </main>
  );
}
