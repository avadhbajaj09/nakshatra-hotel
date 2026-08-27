"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Waves, UtensilsCrossed, PartyPopper, Car, ShieldCheck, Star, Compass, Phone, Sparkles, BedDouble, Check } from "lucide-react";

const ATTRACTIONS = [
  {
    name: "Maheshwar Fort & Ahilya Ghat",
    distance: "50 km · 1 hr 10 min",
    category: "Heritage & Narmada River",
    image: "/images/wedding-garden.jpg",
    desc: "The historic capital of Queen Ahilyabai Holkar on the sacred Narmada River. World-famous for Ahilya Fort, ghats, boating, and Maheshwari handloom sarees. Stay comfortably at Nakshatra and take an easy day trip.",
  },
  {
    name: "Omkareshwar Jyotirlinga Temple",
    distance: "75 km · 1 hr 45 min",
    category: "Sacred Pilgrimage & Jyotirlinga",
    image: "/images/story-resort.jpg",
    desc: "One of the 12 sacred Jyotirlingas of Lord Shiva situated on the island of Mandhata in the Narmada River. Nakshatra is the preferred luxury stopover for pilgrims and families travelling from Maharashtra & MP.",
  },
  {
    name: "Navgraha Mandir Khargone",
    distance: "4 km · 10 min",
    category: "Local Sacred Landmark",
    image: "/images/lobby.jpg",
    desc: "The ancient Navgraha Temple in Khargone dedicated to the nine celestial planetary deities, attracting pilgrims from across India. Located just minutes from our resort near D-Mart.",
  },
  {
    name: "Sirwel Mahadev & Bistan",
    distance: "35 km · 45 min",
    category: "Nature & Spiritual Retreat",
    image: "/images/pool.jpg",
    desc: "A picturesque Shiva temple set in the scenic Satpura hill ranges near the Maharashtra border, surrounded by lush seasonal greenery and waterfalls.",
  },
  {
    name: "Mandleshwar Narmada Ghats",
    distance: "42 km · 55 min",
    category: "Riverfront & Fort",
    image: "/images/wedding.jpg",
    desc: "Charming historic town on the banks of Narmada with serene temples, Chhatris, and peaceful riverside views just north of Khargone.",
  },
  {
    name: "Indore Airport & Transit Hub",
    distance: "95 km · 2 hr 15 min",
    category: "Airport & Metro Connectivity",
    image: "/images/main-front-facade.webp",
    desc: "Devi Ahilyabai Holkar International Airport (IDR) in Indore provides direct flights to Delhi, Mumbai, Bengaluru, Dubai, and across India, connecting via smooth NH3 highway to Khargone.",
  },
];

const HIGHLIGHTS = [
  {
    icon: BedDouble,
    title: "60 Luxury Rooms & Suites",
    text: "Executive, Deluxe, Family suites, and romantic 3rd-floor private pool rooms with climate control, fast WiFi and 24/7 room service.",
  },
  {
    icon: Waves,
    title: "Two Swimming Pools",
    text: "A ground-floor swimming pool for all staying guests plus exclusive private pool suites for couples and VIP stays.",
  },
  {
    icon: PartyPopper,
    title: "5,500 Sq Ft Banquet & Lawns",
    text: "Khargone's premier destination for weddings, receptions, conferences, and birthday parties with in-house catering.",
  },
  {
    icon: UtensilsCrossed,
    title: "Multi-Cuisine Dining",
    text: "Delicious North Indian, Continental, Chinese, and regional flavours prepared fresh daily with flexible meal plan packages.",
  },
  {
    icon: Car,
    title: "Khargone's Biggest Parking",
    text: "Spacious, secure, free on-site self-parking accommodating 200+ vehicles for smooth wedding and corporate arrivals.",
  },
  {
    icon: ShieldCheck,
    title: "Prime Location Near D-Mart",
    text: "Directly on Sanawad Road in Jaitapur, providing quick access to markets, highways, and regional pilgrimage routes.",
  },
];

const FAQS = [
  {
    q: "Why is Hotel Nakshatra considered the best resort in Khargone?",
    a: "Hotel Nakshatra & Resort offers the most comprehensive luxury hospitality in Khargone with 60 rooms, private rooftop pools, guest pool, 5,500 sq ft grand banquet hall, wedding garden, in-house multi-cuisine dining, and the city's largest free parking on Sanawad Road near D-Mart.",
  },
  {
    q: "How far is Maheshwar and Omkareshwar from Nakshatra Hotel Khargone?",
    a: "Maheshwar Fort is approximately 50 km (1 hour 10 minutes drive) and Omkareshwar Jyotirlinga is approximately 75 km (1 hour 45 minutes drive) via smooth state and national highways, making Nakshatra the perfect hub for spiritual and leisure tours.",
  },
  {
    q: "How can I book a room or check venue availability for a wedding?",
    a: "You can book directly by messaging our 24/7 WhatsApp booking desk at +91 94797 93778 or calling management at +91 94250 88369 for instant confirmation, live rates, and custom celebration packages.",
  },
  {
    q: "Does the hotel provide parking for weddings and corporate conferences?",
    a: "Yes! Nakshatra features Khargone's biggest dedicated on-site parking area with 24/7 security, comfortably accommodating large wedding entourages, buses, and private vehicles.",
  },
];

export function ExploreKhargonePage() {
  return (
    <div className="explore-root">
      {/* ── HERO HEADER ── */}
      <section className="explore-hero">
        <div className="explore-hero-inner">
          <p className="kicker">✦ KHARGONE DESTINATION &amp; TRAVEL GUIDE</p>
          <h1 className="explore-title">
            Discover Khargone.<br />
            <em>Stay at Nakshatra.</em>
          </h1>
          <p className="explore-subtitle">
            Your premier luxury resort on Sanawad Road near D-Mart — the perfect gateway to explore Maheshwar, Omkareshwar, ancient temples, and the vibrant culture of the Nimar region.
          </p>
          <div className="explore-hero-actions">
            <a
              href="https://wa.me/919479793778?text=Hello%20Nakshatra%20Hotel%20%26%20Resort%2C%20I%20would%20like%20to%20inquire%20about%20staying%20and%20exploring%20Khargone."
              target="_blank"
              rel="noreferrer"
              className="gold-button"
            >
              Book Stay on WhatsApp <ArrowRight size={16} />
            </a>
            <Link href="/gallery" className="outline-button-light">
              View 3D Photo Gallery ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ── KEYWORD INTRO BADGE STRIP ── */}
      <section className="explore-badges-section">
        <div className="explore-badges-container">
          <span>🏨 60 Luxury Rooms &amp; Suites</span>
          <span>🌊 Private &amp; Guest Pools</span>
          <span>📍 Near D-Mart, Sanawad Road</span>
          <span>🏛️ 50 km to Maheshwar Fort</span>
          <span>🕉️ 75 km to Omkareshwar Jyotirlinga</span>
          <span>🚗 Khargone’s Biggest Free Parking</span>
        </div>
      </section>

      {/* ── REGIONAL ATTRACTIONS GRID ── */}
      <section className="explore-section section-shell">
        <div className="explore-section-head">
          <p className="kicker">PLACES TO VISIT AROUND KHARGONE</p>
          <h2>
            Heritage, pilgrimage &amp;<br />
            <em>unforgettable day trips.</em>
          </h2>
          <p>
            Khargone is centrally located in Madhya Pradesh’s historic Nimar valley. Base your journey at Nakshatra for restful luxury after each day of exploration.
          </p>
        </div>

        <div className="explore-attractions-grid">
          {ATTRACTIONS.map((spot) => (
            <article key={spot.name} className="explore-spot-card">
              <div className="explore-spot-img">
                <img src={spot.image} alt={`${spot.name} near Khargone`} loading="lazy" />
                <span className="explore-spot-dist"><MapPin size={13} /> {spot.distance}</span>
              </div>
              <div className="explore-spot-content">
                <small className="kicker">{spot.category}</small>
                <h3>{spot.name}</h3>
                <p>{spot.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── WHY NAKSHATRA IS #1 ── */}
      <section className="explore-why-section">
        <div className="section-shell">
          <div className="explore-section-head text-center">
            <p className="kicker">WHY CHOOSE NAKSHATRA HOTEL &amp; RESORT</p>
            <h2>
              The finest hospitality in<br />
              <em>Khargone, Madhya Pradesh.</em>
            </h2>
            <p className="max-w-700">
              Whether you are visiting for spiritual pilgrimage, leisure travel, a grand destination wedding, or corporate business, Nakshatra brings everything together under one address.
            </p>
          </div>

          <div className="explore-highlights-grid">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="explore-highlight-card">
                  <span className="explore-highlight-icon">
                    <Icon size={24} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DISTANCE MATRIX ── */}
      <section className="explore-section section-shell">
        <div className="explore-section-head">
          <p className="kicker">EASY CONNECTIVITY</p>
          <h2>
            Travel distances to<br />
            <em>Nakshatra Hotel &amp; Resort.</em>
          </h2>
        </div>

        <div className="explore-distance-table-wrap">
          <table className="explore-distance-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Distance</th>
                <th>Approx. Drive Time</th>
                <th>Route Highlights</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Near D-Mart, Khargone</b></td>
                <td>0.2 km</td>
                <td>1 min</td>
                <td>Walking distance on Sanawad Road</td>
              </tr>
              <tr>
                <td><b>Navgraha Mandir, Khargone</b></td>
                <td>4 km</td>
                <td>10 min</td>
                <td>Via Sanawad Road / Town Center</td>
              </tr>
              <tr>
                <td><b>Maheshwar (Ahilya Fort &amp; Ghats)</b></td>
                <td>50 km</td>
                <td>1 hr 10 min</td>
                <td>Via MP SH-1 / Kasrawad route</td>
              </tr>
              <tr>
                <td><b>Omkareshwar Jyotirlinga</b></td>
                <td>75 km</td>
                <td>1 hr 45 min</td>
                <td>Via Sanawad &amp; Mortakka</td>
              </tr>
              <tr>
                <td><b>Khandwa Junction</b></td>
                <td>85 km</td>
                <td>2 hr</td>
                <td>Via SH-26</td>
              </tr>
              <tr>
                <td><b>Indore Airport (IDR)</b></td>
                <td>95 km</td>
                <td>2 hr 15 min</td>
                <td>Via NH-3 (Agra-Bombay Highway)</td>
              </tr>
              <tr>
                <td><b>Ujjain Mahakaleshwar</b></td>
                <td>145 km</td>
                <td>3 hr 15 min</td>
                <td>Via Indore-Ujjain 4-lane expressway</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SEO FAQ ACCORDION / LIST FOR AI & GOOGLE ── */}
      <section className="explore-faq-section section-shell">
        <div className="explore-section-head">
          <p className="kicker">FREQUENTLY ASKED QUESTIONS</p>
          <h2>
            Everything you need to know about<br />
            <em>staying in Khargone.</em>
          </h2>
        </div>

        <div className="explore-faq-grid">
          {FAQS.map((faq, i) => (
            <div key={i} className="explore-faq-card">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="explore-cta-strip">
        <div className="explore-cta-inner">
          <p className="kicker">PLAN YOUR VISIT TODAY</p>
          <h2>
            Experience pure comfort in<br />
            <em>the heart of Khargone.</em>
          </h2>
          <p>
            Direct booking on WhatsApp gives you instant confirmation, room choices, and tailored stay packages.
          </p>
          <div className="explore-cta-buttons">
            <a
              href="https://wa.me/919479793778?text=Hello%20Nakshatra%20Hotel%20%26%20Resort%2C%20I%20would%20like%20to%20check%20room%20availability%20for%20my%20upcoming%20travel%20dates."
              target="_blank"
              rel="noreferrer"
              className="gold-button"
            >
              Inquire on WhatsApp (+91 94797 93778) →
            </a>
            <a href="tel:+919425088369" className="outline-button-light">
              <Phone size={15} /> Call Management (+91 94250 88369)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
