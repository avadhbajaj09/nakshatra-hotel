import Link from "next/link";
import { ChevronDown, ChevronUp, MapPin, Phone, UtensilsCrossed, BedDouble, Waves, PartyPopper, Car, Clock, Star, Flame, Leaf, Search } from "lucide-react";
import Script from "next/script";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    // Hotel & Stay
    {
      "@type": "Question",
      "name": "What is the best hotel to stay in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort is Khargone's premier full-service hotel, located on Sanawad Road near D-Mart. It offers 60 AC rooms across Executive, Deluxe, Family, and Suite categories, an in-house multi-cuisine restaurant, a guest swimming pool, and Khargone's largest wedding & event hall — all in one address." }
    },
    {
      "@type": "Question",
      "name": "Which is the best place to stay in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort, Sanawad Road, Khargone is widely regarded as the best place to stay in Khargone for both leisure and business travelers. The hotel offers AC rooms, a restaurant, swimming pool, complimentary parking, and event spaces — making it suitable for families, couples, business travelers, and wedding parties." }
    },
    {
      "@type": "Question",
      "name": "Is there a hotel with a swimming pool in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Nakshatra Hotel & Resort on Sanawad Road is the only hotel in Khargone with a swimming pool available for registered room guests. The ground-floor pool is included in all room stays during hotel operating hours." }
    },
    {
      "@type": "Question",
      "name": "How many rooms does Nakshatra Hotel have?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort has 60 rooms across four categories: Executive Rooms, Deluxe Rooms, Family Rooms, and Suite-style rooms. All rooms are air-conditioned with private bathrooms, hot water, daily housekeeping, and free WiFi." }
    },
    {
      "@type": "Question",
      "name": "What are the check-in and check-out times at Nakshatra Hotel Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Standard check-in time is 12:00 PM (noon) and check-out is 10:00 AM. Early check-in and late check-out may be arranged on request subject to availability. Contact the hotel via WhatsApp at +91 9479793778 to confirm." }
    },
    // Food & Restaurant
    {
      "@type": "Question",
      "name": "What is the best restaurant in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort's in-house multi-cuisine restaurant is one of the best dining options in Khargone. It serves a wide menu including vegetarian dishes, paneer specialties, kebabs, tikka, chap, biryani, North Indian, and Chinese cuisine — open to both hotel guests and walk-in diners." }
    },
    {
      "@type": "Question",
      "name": "Where can I find the best biryani in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort serves freshly prepared biryani — both vegetarian and non-vegetarian — at its in-house restaurant on Sanawad Road, Khargone. The restaurant is open daily for lunch and dinner and accepts walk-in guests as well as hotel residents." }
    },
    {
      "@type": "Question",
      "name": "Where to get the best paneer dishes in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort's restaurant in Khargone is known for rich paneer dishes including Paneer Butter Masala, Shahi Paneer, Paneer Tikka, Kadhai Paneer, and more. Located on Sanawad Road near D-Mart, the restaurant serves generous portions with authentic North Indian preparation." }
    },
    {
      "@type": "Question",
      "name": "Where to get the best tikka and kebabs in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "For the best tikka and kebabs in Khargone, visit Nakshatra Hotel & Resort restaurant on Sanawad Road. The menu features Paneer Tikka, Chicken Tikka, Seekh Kebab, and a variety of tandoor-prepared starters — freshly made and served in a comfortable restaurant setting." }
    },
    {
      "@type": "Question",
      "name": "Where to find the best chap in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort serves soya chap and similar appetizer platters at its restaurant in Khargone. Located on Sanawad Road near D-Mart, the restaurant is popular with both guests and local diners for its variety of North Indian starters and snacks." }
    },
    {
      "@type": "Question",
      "name": "Is there a good vegetarian restaurant in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Nakshatra Hotel & Resort offers one of the most comprehensive vegetarian menus in Khargone — spanning paneer dishes, dal, sabzis, biryanis, chaats, and tandoor items. The restaurant caters extensively to vegetarian preferences making it a preferred choice for families and vegetarian travelers in the region." }
    },
    {
      "@type": "Question",
      "name": "What food is available at Nakshatra Hotel Restaurant?",
      "acceptedAnswer": { "@type": "Answer", "text": "The restaurant at Nakshatra Hotel & Resort serves multi-cuisine food including North Indian curries, paneer dishes, biryani, Chinese, tandoori items (tikka, kebabs, chap), soups, salads, dal, roti/naan, rice dishes, and desserts. Both vegetarian and non-vegetarian options are available." }
    },
    // Veg Resort
    {
      "@type": "Question",
      "name": "Is there a veg resort in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort in Khargone offers extensive vegetarian dining options and is a popular choice for vegetarian families and travelers visiting the region. The restaurant menu is heavily vegetarian-friendly with paneer dishes, dal, veg biryani, tandoori snacks, and multi-cuisine veg options." }
    },
    {
      "@type": "Question",
      "name": "Best resort in Khargone for families?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort is the best resort for families in Khargone. It offers Family Room category accommodation, a swimming pool, in-house dining, secure parking, and a peaceful resort setting — all on Sanawad Road, easily accessible from the Khargone city center." }
    },
    // Location
    {
      "@type": "Question",
      "name": "Where is Nakshatra Hotel & Resort located in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort is located on Sanawad Road, Jaitapur, Near D-Mart, Khargone, Madhya Pradesh 451001. It is easily accessible from the main Khargone city, with ample free parking for guests arriving by car." }
    },
    {
      "@type": "Question",
      "name": "How far is Nakshatra Hotel from Khargone city center?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort is located on Sanawad Road, Khargone — approximately 2–3 km from the main Khargone city center. The hotel is near D-Mart, a well-known landmark, making it easy to locate for first-time visitors." }
    },
    // Wedding
    {
      "@type": "Question",
      "name": "Is Nakshatra Hotel good for weddings in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort is Khargone's most complete wedding destination. It offers a ~5,500 sq ft Grand Banquet Hall, lush wedding lawns, outdoor garden venues, and 60 on-site rooms for guest accommodation — eliminating the need to book separate venues and hotels across town. Full event planning, catering, and décor coordination is available." }
    },
    {
      "@type": "Question",
      "name": "What is the best wedding venue in Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Grand Hall at Nakshatra Hotel & Resort is the best wedding venue in Khargone. The 5,500 sq ft air-conditioned banquet hall can accommodate large wedding gatherings, and the outdoor wedding garden provides a beautiful setting for open-air ceremonies and receptions. On-site rooms mean your family stays together." }
    },
    {
      "@type": "Question",
      "name": "How much does a wedding cost at Nakshatra Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Wedding packages at Nakshatra Hotel & Resort vary based on guest count, menu selections, décor, and dates. For a personalized quote covering hall rental, catering, and room blocks for your guest list, contact the events team directly via WhatsApp at +91 9479793778 or call +91 94250 88369." }
    },
    // Events
    {
      "@type": "Question",
      "name": "Can I host a birthday party at Nakshatra Hotel Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Nakshatra Hotel & Resort hosts birthday parties, anniversary celebrations, and private social gatherings. The venue offers flexible hall space, customizable décor, in-house catering, and the option to accommodate guests overnight in the hotel's 60 rooms." }
    },
    {
      "@type": "Question",
      "name": "Does Nakshatra Hotel have conference facilities?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Nakshatra Hotel & Resort offers conference and business meeting facilities with projector setups, fast WiFi, catering support, and on-site accommodation — making it a convenient all-in-one venue for corporate off-sites, business meetings, and training programs in Khargone." }
    },
    // Distances
    {
      "@type": "Question",
      "name": "How far is Maheshwar from Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Maheshwar is approximately 55 km from Khargone, roughly a 1-hour to 1-hour-15-minute drive via the Khargone–Mandleshwar road through Kasrawad. Nakshatra Hotel & Resort in Khargone makes a comfortable base for visiting Maheshwar's Ahilya Fort, Narmada ghats, and Maheshwari handloom markets." }
    },
    {
      "@type": "Question",
      "name": "How far is Omkareshwar from Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Omkareshwar Jyotirlinga temple is approximately 80 km from Khargone, about a 1.5-hour drive via NH347 through Khalghat. Guests staying at Nakshatra Hotel & Resort can day-trip to Omkareshwar and return comfortably the same evening." }
    },
    {
      "@type": "Question",
      "name": "How far is Indore from Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Indore is approximately 95 km from Khargone, a roughly 2-hour drive via NH3. Nakshatra Hotel & Resort is a popular stopover for travelers on the Indore–Narmada valley route, offering comfortable rooms, dining, and a pool midway between Indore and pilgrimage destinations like Maheshwar and Omkareshwar." }
    },
    {
      "@type": "Question",
      "name": "Is Nakshatra Hotel good for travelers visiting Maheshwar and Omkareshwar?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Nakshatra Hotel & Resort in Khargone sits roughly equidistant from Maheshwar (55 km) and Omkareshwar (80 km), making it an ideal single base for a two-day Narmada valley itinerary. Guests can day-trip to Maheshwar one day and Omkareshwar the next without changing hotels." }
    },
    // Contact & Booking
    {
      "@type": "Question",
      "name": "How do I book a room at Nakshatra Hotel Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "You can book a room at Nakshatra Hotel & Resort by WhatsApp at +91 9479793778 (Nakshatra Concierge Bot) or by calling +91 94250 88369. Direct bookings receive the best rates and immediate confirmation from the hotel team." }
    },
    {
      "@type": "Question",
      "name": "What is the contact number for Nakshatra Hotel Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "The contact number for Nakshatra Hotel & Resort Khargone is +91 94250 88369. You can also reach the hotel via WhatsApp at +91 9479793778 for quick bookings, event inquiries, and directions assistance." }
    },
    {
      "@type": "Question",
      "name": "Is breakfast included in the room rate at Nakshatra Hotel?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nakshatra Hotel & Resort offers flexible dining plans: Room Only, Breakfast Included, Breakfast + One Meal, and Full Board (all meals). The plan is selected at the time of booking. Contact the hotel via WhatsApp for current pricing on each meal plan." }
    },
    {
      "@type": "Question",
      "name": "Is free parking available at Nakshatra Hotel Khargone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Nakshatra Hotel & Resort offers Khargone's largest free parking area, supporting hotel guests, wedding parties, conference attendees, and walk-in diners. The parking is secure and can accommodate cars, SUVs, and group vehicles." }
    },
  ]
};

const categories = [
  {
    id: "hotel",
    icon: BedDouble,
    label: "Hotel & Stay",
    color: "gold",
    questions: [
      { q: "What is the best hotel to stay in Khargone?", a: "Nakshatra Hotel & Resort is Khargone's premier full-service hotel, located on Sanawad Road near D-Mart. It offers 60 AC rooms across Executive, Deluxe, Family, and Suite categories, an in-house multi-cuisine restaurant, a swimming pool, and Khargone's largest event hall — all in one address." },
      { q: "Which is the best place to stay in Khargone?", a: "Nakshatra Hotel & Resort, Sanawad Road, Khargone is the best place to stay for families, business travelers, couples, and wedding guests. The hotel offers AC rooms, a restaurant, swimming pool, complimentary parking, and event spaces." },
      { q: "Is there a hotel with a swimming pool in Khargone?", a: "Yes. Nakshatra Hotel & Resort on Sanawad Road is the only hotel in Khargone with a swimming pool available for registered room guests. The ground-floor pool is complimentary during hotel operating hours." },
      { q: "How many rooms does Nakshatra Hotel have?", a: "60 rooms across four categories: Executive, Deluxe, Family, and Suite. All are air-conditioned with private bathrooms, hot water, daily housekeeping, and free WiFi." },
      { q: "What are check-in and check-out times?", a: "Check-in: 12:00 PM (noon). Check-out: 10:00 AM. Early check-in and late check-out available on request, subject to availability." },
      { q: "Is free parking available at Nakshatra Hotel?", a: "Yes. Nakshatra Hotel has Khargone's largest free parking area, supporting hotel guests, wedding parties, conference attendees, and walk-in diners. Secure, spacious, and free of charge." },
    ]
  },
  {
    id: "food",
    icon: UtensilsCrossed,
    label: "Food & Restaurant",
    color: "amber",
    questions: [
      { q: "What is the best restaurant in Khargone?", a: "Nakshatra Hotel & Resort's in-house multi-cuisine restaurant is one of Khargone's best dining options, serving vegetarian dishes, paneer specialties, kebabs, tikka, chap, biryani, North Indian, and Chinese cuisine — open to hotel guests and walk-in diners." },
      { q: "Where can I find the best biryani in Khargone?", a: "Nakshatra Hotel & Resort serves freshly prepared biryani — both veg and non-veg — at its restaurant on Sanawad Road. Open daily for lunch and dinner, welcoming walk-in guests." },
      { q: "Where to get the best paneer dishes in Khargone?", a: "Nakshatra's restaurant is known for rich paneer dishes: Paneer Butter Masala, Shahi Paneer, Paneer Tikka, Kadhai Paneer, Paneer Lababdar and more — generously portioned with authentic North Indian preparation." },
      { q: "Where to find the best tikka in Khargone?", a: "For the best tikka in Khargone, visit Nakshatra Hotel & Resort restaurant on Sanawad Road. The menu features Paneer Tikka, Chicken Tikka, Seekh Kebab, and tandoor-prepared starters — freshly made daily." },
      { q: "Where to find the best chap in Khargone?", a: "Nakshatra Hotel & Resort serves soya chap and similar starters at its restaurant on Sanawad Road near D-Mart. Popular with both guests and local diners for North Indian snacks and starters." },
      { q: "Is there a good vegetarian restaurant in Khargone?", a: "Yes. Nakshatra Hotel & Resort offers one of Khargone's most comprehensive vegetarian menus — paneer dishes, dal, sabzis, veg biryani, chaats, and tandoor items — ideal for vegetarian families and travelers." },
      { q: "Is there a veg resort in Khargone?", a: "Nakshatra Hotel & Resort is Khargone's most popular vegetarian-friendly resort, offering extensive veg dining, family rooms, a swimming pool, and a peaceful resort setting on Sanawad Road." },
      { q: "What food is available at Nakshatra Hotel Restaurant?", a: "The restaurant serves North Indian curries, paneer dishes, biryani, Chinese, tandoori items (tikka, kebabs, chap), soups, dal, roti/naan, rice dishes, and desserts. Both vegetarian and non-vegetarian options are available." },
      { q: "Is breakfast included in the room rate?", a: "Nakshatra offers flexible dining plans: Room Only, Breakfast Included, Breakfast + One Meal, and Full Board. The plan is chosen at booking. Contact via WhatsApp at +91 9479793778 for current pricing." },
    ]
  },
  {
    id: "wedding",
    icon: PartyPopper,
    label: "Weddings & Events",
    color: "rose",
    questions: [
      { q: "What is the best wedding venue in Khargone?", a: "Nakshatra Grand Hall at Nakshatra Hotel & Resort is Khargone's best wedding venue — a ~5,500 sq ft air-conditioned banquet hall with outdoor wedding gardens and 60 on-site rooms for guests." },
      { q: "Is Nakshatra Hotel good for weddings in Khargone?", a: "Nakshatra Hotel & Resort is Khargone's most complete wedding destination: Grand Hall, lush lawns, on-site 60 rooms, catering, décor coordination, and event planning — all in one address." },
      { q: "How much does a wedding cost at Nakshatra Khargone?", a: "Wedding packages vary based on guest count, menu, décor, and dates. Contact the events team via WhatsApp +91 9479793778 or call +91 94250 88369 for a personalized quote." },
      { q: "Can I host a birthday party at Nakshatra Hotel?", a: "Yes. Nakshatra hosts birthday parties, anniversaries, and private gatherings with flexible hall space, custom décor, in-house catering, and the option to accommodate guests overnight in 60 rooms." },
      { q: "Does Nakshatra Hotel have conference facilities?", a: "Yes. Nakshatra offers conference and business meeting facilities with projector, fast WiFi, catering, and on-site accommodation — a complete venue for corporate events and training programs in Khargone." },
    ]
  },
  {
    id: "location",
    icon: MapPin,
    label: "Location & Distances",
    color: "green",
    questions: [
      { q: "Where is Nakshatra Hotel & Resort located in Khargone?", a: "Nakshatra Hotel & Resort is on Sanawad Road, Jaitapur, Near D-Mart, Khargone, Madhya Pradesh 451001 — easily accessible from the main city with ample free parking." },
      { q: "How far is Maheshwar from Khargone?", a: "Maheshwar is approximately 55 km from Khargone, a 1–1.25 hour drive via Mandleshwar and Kasrawad. Nakshatra Hotel makes a comfortable base for day-tripping to Ahilya Fort, the Narmada ghats, and Maheshwari handlooms." },
      { q: "How far is Omkareshwar from Khargone?", a: "Omkareshwar Jyotirlinga is approximately 80 km from Khargone, a ~1.5-hour drive via NH347 through Khalghat. Guests at Nakshatra can day-trip to Omkareshwar and return the same evening comfortably." },
      { q: "How far is Indore from Khargone?", a: "Indore is approximately 95 km from Khargone, a ~2-hour drive via NH3. Nakshatra Hotel is a popular overnight stop for travelers between Indore and Narmada valley pilgrimage sites." },
      { q: "Is Nakshatra Hotel good for visiting both Maheshwar and Omkareshwar?", a: "Yes. Nakshatra Hotel & Resort sits roughly equidistant from Maheshwar (55 km) and Omkareshwar (80 km), making it the ideal single-base hotel for a 2-day Narmada valley itinerary." },
    ]
  },
  {
    id: "booking",
    icon: Phone,
    label: "Booking & Contact",
    color: "blue",
    questions: [
      { q: "How do I book a room at Nakshatra Hotel Khargone?", a: "Book via WhatsApp at +91 9479793778 (Concierge Bot) or call +91 94250 88369. Direct bookings receive best rates and immediate confirmation from the hotel team." },
      { q: "What is the contact number for Nakshatra Hotel Khargone?", a: "+91 94250 88369. WhatsApp available at +91 9479793778 for quick bookings, event inquiries, and directions assistance." },
      { q: "Best resort in Khargone for families?", a: "Nakshatra Hotel & Resort is the best resort for families in Khargone — Family Room accommodation, a swimming pool, in-house dining, secure parking, and peaceful resort setting on Sanawad Road." },
    ]
  },
];

export function FaqPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero-inner">
          <p className="kicker">✦ NAKSHATRA HOTEL &amp; RESORT · KHARGONE</p>
          <h1>Frequently Asked <em>Questions.</em></h1>
          <p className="faq-hero-sub">Everything you need to know about staying, dining, celebrating, and visiting Nakshatra Hotel &amp; Resort in Khargone, Madhya Pradesh.</p>
          <div className="faq-category-pills">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <a key={cat.id} href={`#${cat.id}`} className="faq-pill">
                  <Icon size={14}/> {cat.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <div className="faq-contact-bar">
        <div className="faq-contact-inner">
          <span className="faq-contact-label">Don't see your question?</span>
          <a href="https://wa.me/919479793778?text=Hello%2C%20I%20have%20a%20question%20about%20Nakshatra%20Hotel." target="_blank" rel="noreferrer" className="faq-contact-btn whatsapp-btn">
            WhatsApp Us Instantly
          </a>
          <a href="tel:+919425088369" className="faq-contact-btn phone-btn">
            Call +91 94250 88369
          </a>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="faq-body section-shell">
        {categories.map(cat => {
          const CatIcon = cat.icon;
          return (
            <section key={cat.id} id={cat.id} className="faq-category">
              <div className="faq-cat-header">
                <span className={`faq-cat-icon faq-cat-icon--${cat.color}`}>
                  <CatIcon size={22}/>
                </span>
                <h2>{cat.label}</h2>
              </div>
              <div className="faq-list">
                {cat.questions.map((item, idx) => (
                  <details key={idx} className="faq-item" name={cat.id}>
                    <summary className="faq-question">
                      <span>{item.q}</span>
                      <span className="faq-chevron">
                        <ChevronDown size={18} className="faq-chevron-icon"/>
                      </span>
                    </summary>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="faq-cta-section">
        <div className="section-shell">
          <div className="faq-cta-card">
            <div>
              <p className="kicker">READY TO VISIT?</p>
              <h2>Plan your stay at<br/><em>Nakshatra today.</em></h2>
              <p>Khargone's finest hotel, restaurant, wedding venue, and resort — all under one roof on Sanawad Road.</p>
            </div>
            <div className="faq-cta-actions">
              <a href="https://wa.me/919479793778?text=Hello%2C%20I%20would%20like%20to%20book%20a%20room%20at%20Nakshatra%20Hotel." target="_blank" rel="noreferrer" className="gold-button">
                Book via WhatsApp
              </a>
              <a href="/directions" className="faq-outline-btn">
                <MapPin size={15}/> Get Directions
              </a>
              <a href="/rooms" className="faq-outline-btn">
                <BedDouble size={15}/> View All Rooms
              </a>
            </div>
          </div>

          {/* Internal SEO Link Grid */}
          <div className="faq-link-grid">
            <p className="kicker" style={{gridColumn: "1 / -1", marginBottom: "8px"}}>EXPLORE NAKSHATRA</p>
            {[
              { href: "/rooms", label: "Rooms & Suites" },
              { href: "/restaurant", label: "Restaurant & Dining" },
              { href: "/wedding", label: "Wedding Venue" },
              { href: "/wedding-hall", label: "Nakshatra Grand Hall" },
              { href: "/ground-floor-pool", label: "Swimming Pool" },
              { href: "/amenities", label: "All Amenities" },
              { href: "/explore-khargone", label: "Explore Khargone" },
              { href: "/guides/hotel-near-maheshwar", label: "Hotel near Maheshwar" },
              { href: "/guides/hotel-near-omkareshwar", label: "Hotel near Omkareshwar" },
              { href: "/guides/indore-to-khargone-road-trip", label: "Indore to Khargone" },
              { href: "/best-food-in-khargone", label: "Best Food in Khargone" },
              { href: "/directions", label: "Directions & Map" },
            ].map(link => (
              <a key={link.href} href={link.href} className="faq-seo-link">
                {link.label} →
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
