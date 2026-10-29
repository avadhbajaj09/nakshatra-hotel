/**
 * ContactPage — full contact page with NAP block, directions, WhatsApp CTA,
 * Quick Answer block, and lazy-loaded Google Maps iframe.
 */

import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Contact", url: `${siteConfig.url}/contact` },
  ]);

  return (
    <main className="subpage">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="page-hero">
        <img
          src="/images/lobby.jpg"
          alt="Contact Nakshatra Hotel & Resort — Khargone"
        />
        <div className="page-hero-shade" />
        <div className="page-hero-copy">
          <p className="kicker">GET IN TOUCH</p>
          <h1>
            Contact Nakshatra Hotel &amp; Resort —{" "}
            <em>Khargone</em>
          </h1>
          <p>
            Call, WhatsApp or visit us on Sanawad Road, near D-Mart, Khargone,
            Madhya Pradesh 451001.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section
        className="section-shell"
        style={{ paddingTop: "2.5rem", paddingBottom: "1.5rem" }}
      >
        <div
          className="glass-panel"
          style={{ maxWidth: "720px", margin: "0 auto", padding: "1.5rem 2rem" }}
        >
          <p className="kicker">QUICK ANSWER</p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            Nakshatra Hotel &amp; Resort is located on Sanawad Road, near D-Mart,
            Khargone, Madhya Pradesh 451001. Call{" "}
            <a href="tel:+919425088369">+91 94250 88369</a> or WhatsApp{" "}
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              +91 94797 93778
            </a>{" "}
            for bookings and enquiries.
          </p>
        </div>
      </section>

      {/* NAP + WhatsApp CTA */}
      <section className="section-shell" style={{ paddingTop: "2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* NAP block */}
          <div className="glass-panel" style={{ padding: "1.75rem 2rem" }}>
            <p className="kicker">ADDRESS & CONTACT</p>
            <address style={{ fontStyle: "normal", lineHeight: 2.1 }}>
              <p style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                Hotel Nakshatra &amp; Resort
              </p>
              <p>
                Sanawad Road, Jaitapur, Near D-Mart,
                <br />
                Khargone, Madhya Pradesh 451001
              </p>
              <p>
                📞{" "}
                <a href="tel:+919425088369" style={{ fontWeight: 500 }}>
                  +91 94250 88369
                </a>
              </p>
              <p>
                💬{" "}
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontWeight: 500 }}
                >
                  +91 94797 93778 (WhatsApp)
                </a>
              </p>
              <p>
                ⏰ Check-in: {siteConfig.checkinTime} PM &nbsp;|&nbsp;
                Check-out: {siteConfig.checkoutTime} AM
              </p>
            </address>
          </div>

          {/* WhatsApp CTA */}
          <div
            className="glass-panel"
            style={{ padding: "1.75rem 2rem", textAlign: "center" }}
          >
            <p className="kicker">BOOK OR ENQUIRE</p>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
              WhatsApp for fastest response
            </h2>
            <p style={{ color: "#555", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              For room bookings, banquet enquiries, rate questions or
              directions — WhatsApp gets you the fastest response from the
              hotel team.
            </p>
            <a
              href={siteConfig.whatsappUrl}
              className="gold-button"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp +91 94797 93778
            </a>
            <p style={{ marginTop: "1rem", fontSize: "0.87rem", color: "#777" }}>
              Or call:{" "}
              <a href="tel:+919425088369">{siteConfig.phone}</a>
            </p>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="section-shell" style={{ paddingTop: "2.5rem" }}>
        <div className="rich-section-head">
          <p className="kicker">GETTING HERE</p>
          <h2>
            Directions to <em>Nakshatra Hotel.</em>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
            marginTop: "2rem",
          }}
        >
          {[
            {
              from: "From Indore",
              detail:
                "~95 km via NH3 (Agra-Mumbai Highway), approximately 2 hours. Take NH3 south-west towards Sanawad and Barwah, then follow signs to Khargone.",
            },
            {
              from: "From Maheshwar",
              detail:
                "~50 km, approximately 1 hour 10 minutes by road. Take the route via Barwah/Mandleshwar to Khargone city.",
            },
            {
              from: "From Omkareshwar",
              detail:
                "~75 km, approximately 1 hour 45 minutes by road. Route via Sanawad on NH3.",
            },
            {
              from: "From Khargone Bus Stand",
              detail:
                "Approximately 3–4 km from Khargone Bus Stand. TODO: confirm exact distance and directions with hotel team.",
            },
            {
              from: "From Khandwa Railway Station",
              detail:
                "~85 km from Khandwa Junction (nearest major railway station). Khargone does not have its own major railway station.",
            },
            {
              from: "Landmark",
              detail:
                "The hotel is directly on Sanawad Road, near D-Mart in the Jaitapur area of Khargone. If using GPS, search for 'Nakshatra Hotel Resort Khargone' on Google Maps.",
            },
          ].map((d) => (
            <div
              key={d.from}
              className="glass-panel"
              style={{ padding: "1.25rem 1.5rem" }}
            >
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>
                {d.from}
              </h3>
              <p style={{ color: "#555", lineHeight: 1.7, fontSize: "0.93rem" }}>
                {d.detail}
              </p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <a
            href={siteConfig.socials.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="gold-button"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      {/* Google Maps embed */}
      <section className="section-shell" style={{ paddingTop: "2.5rem", paddingBottom: "3rem" }}>
        <div className="rich-section-head" style={{ marginBottom: "1.5rem" }}>
          <p className="kicker">MAP</p>
          <h2>
            Find us on <em>Google Maps.</em>
          </h2>
        </div>
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
          }}
        >
          <iframe
            title="Nakshatra Hotel & Resort location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.1234567890!2d75.6206!3d22.0121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDAwJzQzLjYiTiA3NcKwMzcnMTQuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{
              border: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p style={{ marginTop: "0.75rem", fontSize: "0.83rem", color: "#888" }}>
          Nakshatra Hotel &amp; Resort · Sanawad Road, near D-Mart, Jaitapur,
          Khargone, Madhya Pradesh 451001 · Coordinates: 22.0121° N, 75.6206° E
        </p>
      </section>
    </main>
  );
}
