import Link from "next/link";
import Script from "next/script";
import { MapPin, Navigation, BedDouble, UtensilsCrossed, Waves, ArrowRight, Check, ChevronRight } from "lucide-react";

export type GuideKey = "maheshwar" | "omkareshwar" | "indore" | "wedding-cost";

type GuideData = {
  schema: object;
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; h1em: string; image: string };
  intro: { headline: string; paragraphs: string[] };
  highlights: { label: string; value: string }[];
  route: { from: string; distance: string; time: string; via: string };
  faqs: { q: string; a: string }[];
  table?: { headers: string[]; rows: string[][] };
  relatedGuides: { href: string; label: string }[];
};

const guides: Record<GuideKey, GuideData> = {
  maheshwar: {
    meta: {
      title: "Hotel Near Maheshwar MP | Nakshatra Resort, Khargone (55 km)",
      description: "Staying near Maheshwar? Nakshatra Hotel & Resort in Khargone is a 55 km, 1-hour drive — AC rooms, pool, dining, and easy parking.",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How far is Nakshatra Hotel & Resort from Maheshwar?", "acceptedAnswer": { "@type": "Answer", "text": "About 55 km, roughly a 1-hour to 1-hour-15-minute drive via Mandleshwar and Kasrawad." } },
        { "@type": "Question", "name": "Is there a hotel with a pool near Maheshwar?", "acceptedAnswer": { "@type": "Answer", "text": "Maheshwar itself has few full-service properties. Nakshatra Hotel & Resort in Khargone, about an hour away, has a swimming pool, AC rooms, and multi-cuisine dining." } },
        { "@type": "Question", "name": "Can I visit Maheshwar and Omkareshwar from the same hotel?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — Nakshatra Hotel & Resort in Khargone is roughly equidistant from both (55 km to Maheshwar, ~80 km to Omkareshwar), making it a practical single base for a two-day Narmada valley loop." } },
      ]
    },
    hero: {
      eyebrow: "HOTEL NEAR MAHESHWAR, MADHYA PRADESH",
      h1: "Looking for a hotel near",
      h1em: "Maheshwar? We're 55 km away.",
      image: "/images/story-resort.jpg",
    },
    intro: {
      headline: "Stay at Nakshatra Khargone — 1 Hour from Maheshwar's Ahilya Fort & Narmada Ghats",
      paragraphs: [
        "Maheshwar's own accommodation options are mostly heritage guesthouses and riverside homestays along the Narmada ghats — comfortable for a short halt, but limited if you want a full-service stay with a pool, air-conditioned rooms, multi-cuisine dining, and secure parking for a car or group. The nearest city offering that is Khargone, roughly 55 km and a 1-hour to 1-hour-15-minute drive south via the Khargone–Mandleshwar road.",
        "Nakshatra Hotel & Resort sits on Sanawad Road in Khargone, near D-Mart, and works well as a base for travelers visiting Maheshwar's Ahilya Fort, the ghats, or the Maheshwari handloom markets — either as a night-before stop on the way in, or a comfortable stay after a day of sightseeing.",
        "Guests doing a longer Narmada circuit (Maheshwar–Mandleshwar–Omkareshwar) also use Khargone as a central overnight point rather than booking separate rooms in each town. From Nakshatra, both Maheshwar and Omkareshwar are within a convenient 1.5-hour drive — meaning you can cover both on successive days without moving hotels.",
      ],
    },
    highlights: [
      { label: "Distance to Maheshwar", value: "55 km" },
      { label: "Drive time", value: "~1 hr" },
      { label: "Hotel rooms", value: "60" },
      { label: "Nearest city", value: "Khargone" },
    ],
    route: {
      from: "Maheshwar",
      distance: "55–56 km",
      time: "1 hr – 1 hr 15 min",
      via: "Mandleshwar → Kasrawad → Sanawad Road, Khargone",
    },
    faqs: [
      { q: "How far is Nakshatra Hotel & Resort from Maheshwar?", a: "About 55 km, roughly a 1-hour to 1-hour-15-minute drive via Mandleshwar and Kasrawad." },
      { q: "Is there a hotel with a pool near Maheshwar?", a: "Maheshwar itself has few full-service properties. Nakshatra Hotel & Resort in Khargone, about an hour away, has a swimming pool, AC rooms, and multi-cuisine dining." },
      { q: "Can I visit Maheshwar and Omkareshwar from the same hotel?", a: "Yes — Nakshatra Hotel & Resort in Khargone is roughly equidistant from both (55 km to Maheshwar, ~80 km to Omkareshwar), making it a practical single base for a two-day Narmada valley loop." },
      { q: "What is the best route from Maheshwar to Khargone?", a: "Head south via Mandleshwar and Kasrawad on the Khargone–Maheshwar road (~55–56 km). The drive takes about 1 hour in normal traffic." },
      { q: "Are there AC rooms near Maheshwar?", a: "Maheshwar's accommodation is mainly heritage guesthouses and dharamshalas. For proper AC rooms with a restaurant, pool, and parking, Nakshatra Hotel & Resort in Khargone (55 km) is the nearest full-service option." },
    ],
    relatedGuides: [
      { href: "/guides/hotel-near-omkareshwar", label: "Hotel near Omkareshwar" },
      { href: "/guides/indore-to-khargone-road-trip", label: "Indore to Khargone road trip guide" },
      { href: "/explore-khargone", label: "Explore Khargone region" },
    ],
  },

  omkareshwar: {
    meta: {
      title: "Hotel Near Omkareshwar | Nakshatra Resort, Khargone (~80 km)",
      description: "Visiting Omkareshwar? Nakshatra Hotel & Resort in Khargone is about 80 km / 1.5 hours away, with AC rooms, pool, and full dining.",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How far is Khargone from Omkareshwar?", "acceptedAnswer": { "@type": "Answer", "text": "Approximately 80 km, about a 1.5-hour drive via NH347." } },
        { "@type": "Question", "name": "Is there a good hotel to stay at after visiting Omkareshwar temple?", "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort in Khargone, roughly 80 km away, offers full-service rooms, a pool, and multi-cuisine dining — a comfortable alternative to the pilgrim lodges immediately around the temple." } },
        { "@type": "Question", "name": "What is the best route from Omkareshwar to Khargone?", "acceptedAnswer": { "@type": "Answer", "text": "NH347 via Khalghat is the standard route, covering roughly 80–85 km in about 1.5 hours by car." } },
      ]
    },
    hero: {
      eyebrow: "HOTEL NEAR OMKARESHWAR JYOTIRLINGA",
      h1: "A comfortable base near",
      h1em: "Omkareshwar — 80 km away.",
      image: "/images/story-resort.jpg",
    },
    intro: {
      headline: "Stay at Nakshatra Khargone — A Peaceful Full-Service Hotel after Omkareshwar Darshan",
      paragraphs: [
        "Omkareshwar's accommodation is built around pilgrim traffic — ashrams, budget lodges, and dharamshalas close to the temple. If you'd rather stay somewhere with a proper restaurant, a pool, and AC rooms after the day's darshan, Khargone is the nearest city set up for that, about 80 km and a 1.5-hour drive via NH347.",
        "Nakshatra Hotel & Resort, near D-Mart on Sanawad Road, is a straightforward option for families or business travelers passing through the Omkareshwar–Khargone corridor — whether that's a pilgrimage trip, a stop en route to Indore, or part of a wider Narmada valley itinerary that also takes in Maheshwar and Mandu.",
        "Getting here from Omkareshwar: take NH347 south-west toward Khargone; the drive covers roughly 80–85 km and takes about 1.5 hours depending on traffic through Khalghat.",
      ],
    },
    highlights: [
      { label: "Distance to Omkareshwar", value: "80 km" },
      { label: "Drive time", value: "~1.5 hrs" },
      { label: "Hotel rooms", value: "60" },
      { label: "Route", value: "NH347" },
    ],
    route: {
      from: "Omkareshwar",
      distance: "80–85 km",
      time: "~1.5 hours",
      via: "NH347 → Khalghat → Sanawad Road, Khargone",
    },
    faqs: [
      { q: "How far is Khargone from Omkareshwar?", a: "Approximately 80 km, about a 1.5-hour drive via NH347." },
      { q: "Is there a good hotel to stay at after visiting Omkareshwar temple?", a: "Nakshatra Hotel & Resort in Khargone, roughly 80 km away, offers full-service rooms, a pool, and multi-cuisine dining — a comfortable alternative to pilgrim lodges near the temple." },
      { q: "What is the best route from Omkareshwar to Khargone?", a: "NH347 via Khalghat is the standard route, covering roughly 80–85 km in about 1.5 hours by car." },
      { q: "Can I visit both Omkareshwar and Maheshwar from Khargone?", a: "Yes. Nakshatra Hotel & Resort in Khargone is roughly equidistant from Omkareshwar (80 km) and Maheshwar (55 km), making it the ideal base for visiting both on a 2-day Narmada loop." },
      { q: "Is there a hotel with dining options near Omkareshwar?", a: "Most accommodation near Omkareshwar temple is basic ashrams and dharamshalas. Nakshatra Hotel & Resort in Khargone (80 km, 1.5 hrs) offers a full multi-cuisine restaurant, AC rooms, a swimming pool, and free parking." },
    ],
    relatedGuides: [
      { href: "/guides/hotel-near-maheshwar", label: "Hotel near Maheshwar" },
      { href: "/guides/indore-to-khargone-road-trip", label: "Indore to Khargone road trip" },
      { href: "/explore-khargone", label: "Explore Khargone region" },
    ],
  },

  indore: {
    meta: {
      title: "Indore to Khargone Road Trip: Route, Distance & Where to Stay",
      description: "Indore to Khargone is ~95 km via NH3, about 2 hours. Route, detour options to Maheshwar and Omkareshwar, and where to stay overnight.",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How far is Khargone from Indore?", "acceptedAnswer": { "@type": "Answer", "text": "About 95 km via NH3, roughly a 2-hour drive." } },
        { "@type": "Question", "name": "Is Khargone a good base for visiting Maheshwar and Omkareshwar?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — Khargone sits roughly 55 km from Maheshwar and 80 km from Omkareshwar, making it possible to day-trip to both from a single hotel rather than booking separate stays." } },
        { "@type": "Question", "name": "What's the best route from Indore to Khargone?", "acceptedAnswer": { "@type": "Answer", "text": "NH3 south-west from Indore is the standard route, covering about 95 km in roughly 2 hours." } },
      ]
    },
    hero: {
      eyebrow: "INDORE TO KHARGONE ROAD TRIP GUIDE",
      h1: "Planning an Indore to Khargone",
      h1em: "road trip? Here's your guide.",
      image: "/images/hero-resort.jpg",
    },
    intro: {
      headline: "Indore to Khargone: 95 km via NH3 — Route, Stops & Where to Stay",
      paragraphs: [
        "Khargone is about 95 km from Indore via NH3, a drive of roughly 2 hours in normal traffic. It's a popular stopover for travelers heading toward the Narmada valley towns of Maheshwar (55 km further) and Omkareshwar (80 km further), since both are a manageable day-trip distance from Khargone rather than requiring a separate hotel booking in each town.",
        "A practical two-day plan: drive from Indore to Khargone (2 hours), check in at Nakshatra Hotel & Resort, and use Khargone as base camp — day trip to Maheshwar's Ahilya Fort and ghats one day, Omkareshwar's Jyotirlinga temple the next, returning to Indore via NH3. This avoids packing and unpacking at multiple small-town lodges and keeps you within an hour or so of either destination.",
        "Nakshatra Hotel & Resort, on Sanawad Road near D-Mart in Khargone, has 60 rooms across Executive, Deluxe, Family, and Suite categories, a guest pool, in-house restaurant, and grand parking — suited to both solo road-trippers and groups traveling together.",
      ],
    },
    highlights: [
      { label: "Distance from Indore", value: "~95 km" },
      { label: "Drive time", value: "~2 hrs" },
      { label: "To Maheshwar", value: "55 km" },
      { label: "To Omkareshwar", value: "80 km" },
    ],
    route: {
      from: "Indore",
      distance: "~95 km",
      time: "~2 hours",
      via: "NH3 South-West → Sanawad Road, Khargone",
    },
    table: {
      headers: ["From", "To", "Distance", "Drive Time", "Route"],
      rows: [
        ["Indore", "Khargone", "~95 km", "~2 hrs", "NH3"],
        ["Khargone", "Maheshwar", "~55 km", "~1 hr", "Mandleshwar–Kasrawad"],
        ["Khargone", "Omkareshwar", "~80 km", "~1.5 hrs", "NH347"],
        ["Indore Airport", "Khargone", "~95 km", "~2 hrs", "NH3"],
      ],
    },
    faqs: [
      { q: "How far is Khargone from Indore?", a: "About 95 km via NH3, roughly a 2-hour drive." },
      { q: "Is Khargone a good base for visiting Maheshwar and Omkareshwar?", a: "Yes — Khargone sits roughly 55 km from Maheshwar and 80 km from Omkareshwar, making it possible to day-trip to both from a single hotel rather than booking separate stays." },
      { q: "What is the best route from Indore to Khargone?", a: "NH3 south-west from Indore is the standard route, covering about 95 km in roughly 2 hours." },
      { q: "Where should I stay on the Indore to Khargone road trip?", a: "Nakshatra Hotel & Resort on Sanawad Road, Khargone is the most convenient full-service stop — 60 rooms, restaurant, pool, and parking. It's also positioned perfectly for day-trips to Maheshwar and Omkareshwar." },
      { q: "How far is Indore Airport from Khargone?", a: "Devi Ahilya Bai Holkar Airport in Indore is approximately 95 km from Khargone — roughly a 2-hour drive via NH3." },
    ],
    relatedGuides: [
      { href: "/guides/hotel-near-maheshwar", label: "Hotel near Maheshwar" },
      { href: "/guides/hotel-near-omkareshwar", label: "Hotel near Omkareshwar" },
      { href: "/explore-khargone", label: "Explore Khargone" },
    ],
  },

  "wedding-cost": {
    meta: {
      title: "Wedding Cost in Khargone (2025–26 Guide) | Banquet Hall & Catering Prices",
      description: "What does a wedding in Khargone actually cost? Banquet hall rental, per-plate catering prices, and what's included at Nakshatra Grand Hall.",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the average per-plate cost for a wedding in Khargone?", "acceptedAnswer": { "@type": "Answer", "text": "Roughly ₹400–₹800 for vegetarian menus and ₹600–₹1,000 for non-vegetarian, depending on the caterer and menu. Contact Nakshatra Hotel & Resort directly for an exact quote for your guest count." } },
        { "@type": "Question", "name": "How much does it cost to book a banquet hall in Khargone?", "acceptedAnswer": { "@type": "Answer", "text": "Typically ₹50,000–₹2,50,000 depending on guest capacity, season, and weekday vs. weekend. Nakshatra Grand Hall can be booked with a room block for out-of-town guests." } },
        { "@type": "Question", "name": "Does Nakshatra Hotel & Resort offer combined wedding and stay packages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — the Grand Hall and wedding garden can be booked alongside room blocks, so guest accommodation and the wedding venue are on one property instead of split across town." } },
      ]
    },
    hero: {
      eyebrow: "WEDDING COST GUIDE · KHARGONE 2025–26",
      h1: "How much does a wedding in",
      h1em: "Khargone cost? A clear guide.",
      image: "/images/wedding.jpg",
    },
    intro: {
      headline: "Khargone Wedding Costs: Hall Rental, Per-Plate Catering & What to Expect",
      paragraphs: [
        "For a mid-sized wedding in Khargone, budget roughly ₹400–₹800 per plate for a vegetarian menu and ₹600–₹1,000 per plate for non-vegetarian, depending on the caterer and menu complexity. Standalone banquet hall or marriage garden rental typically runs ₹50,000–₹2,50,000, varying by guest capacity, season, and whether the date falls on a weekday or weekend — wedding season (November–April) commands the higher end.",
        "These figures sit below Indore and Bhopal city rates, where premium venues push per-plate pricing well past ₹1,500, simply because Khargone's venue market is smaller and less competitive.",
        "Most Khargone venues are either a standalone marriage garden (catering + hall only) or a hotel banquet hall without much room inventory for guests. Nakshatra Hotel & Resort's 5,500 sq ft Grand Hall and wedding garden sit on the same property as 60 rooms across Executive, Deluxe, Family, and Suite categories — so out-of-town family can be housed on-site instead of booking rooms elsewhere in Khargone.",
      ],
    },
    highlights: [
      { label: "Veg per plate (approx.)", value: "₹400–800" },
      { label: "Non-veg per plate (approx.)", value: "₹600–1,000" },
      { label: "Hall rental (approx.)", value: "₹50K–2.5L" },
      { label: "On-site rooms", value: "60 rooms" },
    ],
    route: {
      from: "Khargone City",
      distance: "2–3 km",
      time: "5 min",
      via: "Sanawad Road toward D-Mart",
    },
    table: {
      headers: ["Guests", "Veg catering (approx.)", "Non-veg catering (approx.)", "Hall rental (approx.)"],
      rows: [
        ["100", "₹40,000–₹80,000", "₹60,000–₹1,00,000", "₹50,000–₹1,00,000"],
        ["300", "₹1,20,000–₹2,40,000", "₹1,80,000–₹3,00,000", "₹1,00,000–₹2,00,000"],
        ["500+", "₹2,00,000–₹4,00,000", "₹3,00,000–₹5,00,000", "₹1,50,000–₹2,50,000+"],
      ],
    },
    faqs: [
      { q: "What is the average per-plate cost for a wedding in Khargone?", a: "Roughly ₹400–₹800 for vegetarian menus and ₹600–₹1,000 for non-vegetarian, depending on the caterer and menu. Contact Nakshatra for an exact quote." },
      { q: "How much does it cost to book a banquet hall in Khargone?", a: "Typically ₹50,000–₹2,50,000 depending on guest capacity, season, and weekday vs. weekend. Nakshatra Grand Hall includes 60 on-site rooms for out-of-town guests." },
      { q: "Does Nakshatra Hotel & Resort offer combined wedding and stay packages?", a: "Yes — the Grand Hall and wedding garden can be booked alongside room blocks, so guest accommodation and the wedding venue are on one property instead of split across town." },
      { q: "When is wedding season in Khargone?", a: "November through April is peak season, when hall rental and catering rates run toward the higher end of the range. Book early for preferred dates." },
      { q: "What makes Nakshatra different from other wedding venues in Khargone?", a: "Nakshatra Hotel & Resort is the only Khargone venue with a 5,500 sq ft banquet hall, outdoor wedding garden, AND 60 on-site rooms for guests — no need to book separate accommodation across town for your out-of-town family." },
    ],
    relatedGuides: [
      { href: "/wedding", label: "Weddings at Nakshatra" },
      { href: "/wedding-hall", label: "Nakshatra Grand Hall" },
      { href: "/wedding-garden", label: "Wedding Garden" },
    ],
  },
};

export function GuidesPage({ guide }: { guide: GuideKey }) {
  const data = guides[guide];
  if (!data) return null;

  return (
    <>
      <Script id={`guide-schema-${guide}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema) }} />

      {/* Hero */}
      <section className="guide-hero">
        <img src={data.hero.image} alt={`${data.hero.h1} ${data.hero.h1em}`} className="guide-hero-img" />
        <div className="guide-hero-shade" />
        <div className="guide-hero-content">
          <p className="kicker">{data.hero.eyebrow}</p>
          <h1>{data.hero.h1}<br/><em>{data.hero.h1em}</em></h1>
          <div className="guide-hero-ctas">
            <a href="https://wa.me/919479793778?text=Hello%2C%20I%20would%20like%20to%20book%20a%20room%20at%20Nakshatra%20Hotel%20Khargone." target="_blank" rel="noreferrer" className="gold-button">
              Book via WhatsApp
            </a>
            <a href="/directions" className="guide-hero-link">
              <Navigation size={15}/> Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Highlights bar */}
      <div className="guide-highlights-bar">
        {data.highlights.map(h => (
          <div key={h.label} className="guide-highlight">
            <b>{h.value}</b>
            <span>{h.label}</span>
          </div>
        ))}
      </div>

      {/* Article body */}
      <article className="guide-body section-shell">
        <h2 className="guide-article-h2">{data.intro.headline}</h2>
        {data.intro.paragraphs.map((p, i) => (
          <p key={i} className="guide-para">{p}</p>
        ))}

        {/* Route box */}
        <div className="guide-route-box">
          <p className="kicker">GETTING HERE FROM {data.route.from.toUpperCase()}</p>
          <div className="guide-route-row">
            <span><b>Distance:</b> {data.route.distance}</span>
            <span><b>Drive time:</b> {data.route.time}</span>
            <span><b>Via:</b> {data.route.via}</span>
          </div>
          <a href="/directions" className="guide-route-map-link">
            <MapPin size={14}/> Open Interactive Map →
          </a>
        </div>

        {/* Distance table (if present) */}
        {data.table && (
          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead>
                <tr>{data.table.headers.map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {data.table.rows.map((row, i) => (
                  <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
            {guide === "wedding-cost" && (
              <p className="guide-table-note">* Indicative regional benchmarks. Contact Nakshatra for confirmed rates for your event.</p>
            )}
          </div>
        )}

        {/* Nakshatra features */}
        <div className="guide-feature-grid">
          {[
            { icon: BedDouble, label: "60 AC Rooms", text: "Executive, Deluxe, Family & Suite categories" },
            { icon: UtensilsCrossed, label: "Multi-Cuisine Restaurant", text: "In-house dining for guests and walk-ins" },
            { icon: Waves, label: "Swimming Pool", text: "Included for registered room guests" },
            { icon: MapPin, label: "Ample Free Parking", text: "Khargone's largest parking — hotel guests stay free" },
          ].map(f => {
            const FIcon = f.icon;
            return (
              <div key={f.label} className="guide-feature-card">
                <span className="luxury-icon"><FIcon size={18}/></span>
                <h3>{f.label}</h3>
                <p>{f.text}</p>
              </div>
            );
          })}
        </div>
      </article>

      {/* FAQ Section */}
      <section className="guide-faq-section section-shell">
        <div className="rich-section-head">
          <p className="kicker">COMMON QUESTIONS</p>
          <h2>Frequently asked<br/><em>questions.</em></h2>
        </div>
        <div className="faq-list">
          {data.faqs.map((item, i) => (
            <details key={i} className="faq-item" name={`guide-faq-${guide}`}>
              <summary className="faq-question">
                <span>{item.q}</span>
                <span className="faq-chevron"><ChevronRight size={18} className="faq-chevron-icon"/></span>
              </summary>
              <div className="faq-answer"><p>{item.a}</p></div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA + Related */}
      <section className="guide-cta-section">
        <div className="section-shell">
          <div className="guide-cta-card">
            <div>
              <p className="kicker">BOOK YOUR STAY</p>
              <h2>Ready to visit <em>Nakshatra?</em></h2>
              <p>60 rooms, restaurant, pool, and Khargone's largest parking — on Sanawad Road, Near D-Mart, Khargone MP 451001.</p>
            </div>
            <div className="guide-cta-actions">
              <a href="https://wa.me/919479793778?text=Hello%2C%20I%20would%20like%20to%20book%20a%20room%20at%20Nakshatra%20Hotel." target="_blank" rel="noreferrer" className="gold-button">
                Book via WhatsApp
              </a>
              <a href="tel:+919425088369" className="guide-outline-btn">
                Call +91 94250 88369
              </a>
            </div>
          </div>

          <div className="guide-related">
            <p className="kicker">RELATED GUIDES</p>
            <div className="guide-related-links">
              {data.relatedGuides.map(link => (
                <Link key={link.href} href={link.href} className="guide-related-link">
                  {link.label} <ArrowRight size={14}/>
                </Link>
              ))}
              <Link href="/faq" className="guide-related-link">
                All FAQs — Hotel, Food, Weddings <ArrowRight size={14}/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
