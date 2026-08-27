import Link from "next/link";
import Script from "next/script";
import { UtensilsCrossed, Flame, Leaf, Star, MapPin, ArrowRight, ChevronRight, Phone } from "lucide-react";

const foodSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where to find the best biryani in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort restaurant on Sanawad Road, Khargone serves freshly prepared biryani — both vegetarian and non-vegetarian varieties — open daily for lunch and dinner to both hotel guests and walk-in diners." }
    },
    {
      "@type": "Question",
      "name": "Where to get the best paneer dishes in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort's restaurant in Khargone is known for rich paneer dishes: Paneer Butter Masala, Shahi Paneer, Paneer Tikka, Kadhai Paneer — generously portioned with authentic North Indian preparation, served on Sanawad Road near D-Mart." }
    },
    {
      "@type": "Question",
      "name": "Best tikka in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort restaurant serves Paneer Tikka, Chicken Tikka, and Seekh Kebab freshly prepared in a tandoor — considered the best tikka available at a restaurant in Khargone." }
    },
    {
      "@type": "Question",
      "name": "Best chap in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort's restaurant on Sanawad Road serves soya chap and North Indian starters, popular with local diners and hotel guests looking for the best chap in Khargone." }
    },
    {
      "@type": "Question",
      "name": "What is the best vegetarian restaurant in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort offers one of Khargone's most comprehensive vegetarian menus — paneer dishes, dal, sabzis, veg biryani, tandoor items, and Chinese — making it the top vegetarian dining choice in Khargone for families and travelers." }
    },
    {
      "@type": "Question",
      "name": "Is there a restaurant near D-Mart Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Nakshatra Hotel & Resort is located on Sanawad Road, Near D-Mart, Khargone — its multi-cuisine restaurant is open for lunch and dinner and welcomes walk-in diners." }
    },
  ]
};

const menuHighlights = [
  {
    category: "Biryani",
    icon: Flame,
    color: "amber",
    items: ["Veg Dum Biryani", "Paneer Biryani", "Chicken Biryani", "Mutton Biryani"],
    description: "Slow-cooked dum biryani, freshly prepared each day — fragrant basmati rice with generous portions."
  },
  {
    category: "Paneer Dishes",
    icon: Leaf,
    color: "green",
    items: ["Paneer Butter Masala", "Shahi Paneer", "Kadhai Paneer", "Paneer Tikka", "Paneer Lababdar", "Paneer Do Pyaza"],
    description: "Rich, authentic North Indian paneer preparations — Khargone's most comprehensive paneer menu."
  },
  {
    category: "Tikka & Kebabs",
    icon: Flame,
    color: "red",
    items: ["Paneer Tikka", "Chicken Tikka", "Seekh Kebab", "Hariyali Kebab", "Tandoori Platter"],
    description: "Tandoor-fired starters — crispy outside, juicy inside — freshly prepared to order."
  },
  {
    category: "Chap & Starters",
    icon: Star,
    color: "gold",
    items: ["Soya Chap Masala", "Chap Tikka", "Veg Manchurian", "Spring Rolls", "Crispy Corn"],
    description: "North Indian snacks and appetizers — perfect for groups, families, and quick bites."
  },
  {
    category: "North Indian Curries",
    icon: UtensilsCrossed,
    color: "orange",
    items: ["Dal Tadka", "Dal Makhani", "Palak Paneer", "Matar Mushroom", "Aloo Gobi", "Mix Veg"],
    description: "Home-style North Indian curries, slow-cooked with fresh spices and generous portions."
  },
  {
    category: "Chinese & Multi-Cuisine",
    icon: Star,
    color: "blue",
    items: ["Veg Hakka Noodles", "Fried Rice", "Veg Chowmein", "Manchow Soup", "Veg Soup"],
    description: "Indo-Chinese options alongside North Indian classics — something for every palate."
  },
];

const faqs = [
  { q: "What is the best biryani in Khargone?", a: "Nakshatra Hotel & Resort restaurant on Sanawad Road serves freshly prepared dum biryani — vegetarian and non-vegetarian — considered the best biryani option available at a sit-down restaurant in Khargone." },
  { q: "Where to find the best paneer dishes in Khargone?", a: "Nakshatra Hotel & Resort's in-house restaurant is known for the most comprehensive paneer menu in Khargone, including Paneer Butter Masala, Shahi Paneer, Kadhai Paneer, Paneer Tikka, and more — all freshly prepared." },
  { q: "Where is the best chap in Khargone?", a: "Nakshatra Hotel & Resort on Sanawad Road, Near D-Mart, serves soya chap masala and chap tikka — popular with local diners looking for the best chap in Khargone." },
  { q: "Where is the best tikka in Khargone?", a: "Nakshatra Hotel & Resort restaurant prepares Paneer Tikka, Chicken Tikka, and Seekh Kebab fresh in a tandoor — the best tandoori tikka restaurant experience in Khargone." },
  { q: "Is there a good vegetarian restaurant in Khargone?", a: "Yes. Nakshatra Hotel & Resort offers Khargone's most comprehensive vegetarian menu — paneer dishes, veg biryani, dal, sabzis, tandoor starters, Chinese options — open to walk-in diners on Sanawad Road." },
  { q: "Is the restaurant open for walk-in guests?", a: "Yes. The restaurant at Nakshatra Hotel & Resort, Sanawad Road near D-Mart, is open for both hotel guests and walk-in diners for lunch and dinner. No reservation required." },
  { q: "What is the best food in Khargone?", a: "Nakshatra Hotel & Resort's multi-cuisine restaurant on Sanawad Road is widely considered the best dining option in Khargone, serving biryani, paneer dishes, tikka, chap, North Indian curries, and Chinese cuisine." },
  { q: "Is there a restaurant near D-Mart Khargone?", a: "Yes. Nakshatra Hotel & Resort is located on Sanawad Road, Near D-Mart, Khargone. The restaurant is open daily for lunch and dinner and is just minutes from the city center." },
];

export function FoodSeoPage() {
  return (
    <>
      <Script id="food-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(foodSchema) }} />

      {/* Hero */}
      <section className="food-hero">
        <div className="food-hero-shade" />
        <img src="/images/restaurant-gallery/nakshatra18.jpeg" alt="Best restaurant and food in Khargone — Nakshatra Hotel & Resort" className="food-hero-img" />
        <div className="food-hero-content">
          <p className="kicker">✦ BEST FOOD IN KHARGONE · NAKSHATRA HOTEL &amp; RESORT</p>
          <h1>The best biryani, paneer,<br/>tikka &amp; chap in <em>Khargone.</em></h1>
          <p className="food-hero-sub">
            Nakshatra Hotel &amp; Resort's multi-cuisine restaurant on Sanawad Road, Near D-Mart, Khargone — open to hotel guests and walk-in diners daily.
          </p>
          <div className="food-hero-actions">
            <a href="https://wa.me/919479793778?text=Hello%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Nakshatra%20Restaurant%20Khargone." target="_blank" rel="noreferrer" className="gold-button">
              Reserve a Table
            </a>
            <a href="/directions" className="food-hero-dir-btn">
              <MapPin size={15}/> Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Quick facts bar */}
      <div className="food-facts-bar">
        {[
          { label: "Restaurant Type", value: "Multi-Cuisine" },
          { label: "Cuisine", value: "North Indian · Chinese" },
          { label: "Dining", value: "Veg & Non-Veg" },
          { label: "Location", value: "Near D-Mart, Sanawad Rd" },
        ].map(f => (
          <div key={f.label} className="food-fact">
            <b>{f.value}</b>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      {/* Intro */}
      <section className="food-intro section-shell">
        <div className="food-intro-grid">
          <div>
            <p className="kicker">BEST FOOD IN KHARGONE</p>
            <h2>From biryani to paneer,<br/>tikka to chap — <em>all here.</em></h2>
            <p>Nakshatra Hotel &amp; Resort's in-house restaurant is Khargone's most complete dining destination. Whether you're craving a rich Paneer Butter Masala, freshly prepared dum biryani, crispy tikka from the tandoor, or soya chap — our kitchen prepares it fresh, every day.</p>
            <p>Open to walk-in diners as well as hotel guests, the restaurant sits on Sanawad Road near D-Mart, Khargone — easy to find and with free parking for every guest.</p>
            <div className="food-intro-badges">
              <span className="food-badge"><Leaf size={13}/> Vegetarian Friendly</span>
              <span className="food-badge"><Flame size={13}/> Tandoor Fresh</span>
              <span className="food-badge"><Star size={13}/> Walk-ins Welcome</span>
            </div>
          </div>
          <div className="food-intro-img-wrap">
            <img src="/images/restaurant-gallery/nakshatra18.jpeg" alt="Nakshatra Hotel Restaurant Khargone — best food" className="food-intro-img" />
          </div>
        </div>
      </section>

      {/* Menu highlights */}
      <section className="food-menu-section">
        <div className="section-shell">
          <div className="rich-section-head">
            <p className="kicker">WHAT WE SERVE</p>
            <h2>Khargone's best — <em>on your table.</em></h2>
          </div>
          <div className="food-menu-grid">
            {menuHighlights.map(cat => {
              const CatIcon = cat.icon;
              return (
                <div key={cat.category} className={`food-menu-card food-menu-card--${cat.color}`}>
                  <div className="food-menu-card-head">
                    <span className={`food-menu-icon food-menu-icon--${cat.color}`}><CatIcon size={20}/></span>
                    <h3>{cat.category}</h3>
                  </div>
                  <p>{cat.description}</p>
                  <ul className="food-item-list">
                    {cat.items.map(item => (
                      <li key={item}><ChevronRight size={12}/> {item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Nakshatra */}
      <section className="food-why-section section-shell">
        <div className="food-why-grid">
          <div>
            <p className="kicker">WHY NAKSHATRA</p>
            <h2>Khargone's most complete<br/><em>dining experience.</em></h2>
            <div className="food-why-points">
              {[
                "Fresh ingredients, prepared daily — no shortcuts",
                "Vegetarian-friendly with the widest paneer menu in Khargone",
                "Tandoor in-house for authentic tikka, kebabs, and breads",
                "Open to walk-in diners — no reservation required",
                "Free parking for all dining guests",
                "Air-conditioned seating — comfortable even in summer",
                "Family dining with separate seating arrangements available",
                "Located on Sanawad Road, Near D-Mart — easy to find",
              ].map(point => (
                <div key={point} className="food-why-point">
                  <span className="food-check">✓</span> {point}
                </div>
              ))}
            </div>
          </div>
          <div className="food-why-img-wrap">
            <img src="/images/restaurant.jpg" alt="Nakshatra restaurant interior Khargone" className="food-why-img" />
            <div className="food-location-badge">
              <MapPin size={16}/>
              <div>
                <b>Sanawad Road, Near D-Mart</b>
                <span>Khargone, MP 451001</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="guide-faq-section section-shell">
        <div className="rich-section-head">
          <p className="kicker">FOOD FAQ · KHARGONE</p>
          <h2>Your questions about<br/><em>dining at Nakshatra.</em></h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <details key={i} className="faq-item" name="food-faqs">
              <summary className="faq-question">
                <span>{item.q}</span>
                <span className="faq-chevron"><ChevronRight size={18} className="faq-chevron-icon"/></span>
              </summary>
              <div className="faq-answer"><p>{item.a}</p></div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="food-cta-section">
        <div className="section-shell">
          <div className="guide-cta-card">
            <div>
              <p className="kicker">VISIT THE RESTAURANT</p>
              <h2>Come taste Khargone's<br/><em>best food today.</em></h2>
              <p>Open daily for lunch &amp; dinner. Walk-in diners welcome. Free parking. Near D-Mart, Sanawad Road, Khargone.</p>
            </div>
            <div className="guide-cta-actions">
              <a href="https://wa.me/919479793778?text=Hello%2C%20I%20would%20like%20to%20visit%20Nakshatra%20restaurant%20in%20Khargone." target="_blank" rel="noreferrer" className="gold-button">
                WhatsApp to Reserve
              </a>
              <a href="tel:+919425088369" className="guide-outline-btn">
                <Phone size={15}/> Call +91 94250 88369
              </a>
            </div>
          </div>

          <div className="faq-link-grid">
            <p className="kicker" style={{gridColumn: "1 / -1", marginBottom: "8px"}}>ALSO EXPLORE</p>
            {[
              { href: "/faq", label: "All FAQs" },
              { href: "/rooms", label: "Hotel Rooms" },
              { href: "/restaurant", label: "Restaurant Page" },
              { href: "/wedding", label: "Wedding Venue" },
              { href: "/explore-khargone", label: "Explore Khargone" },
              { href: "/directions", label: "Directions & Map" },
            ].map(link => (
              <a key={link.href} href={link.href} className="faq-seo-link">{link.label} →</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
