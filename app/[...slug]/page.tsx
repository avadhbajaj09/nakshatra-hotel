import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BedDouble, CalendarCheck, Camera, Car, Check, ChefHat, Clock3, Coffee, Flower2, Gamepad2, Gem, MapPin, MessageCircle, PartyPopper, Phone, Presentation, ShieldCheck, Sparkles, Star, UtensilsCrossed, Waves, Wifi } from "lucide-react";
import { amenities, rooms, roomAmenities, mealPlans, address, executiveRoomReference, detailPages, type DetailPage } from "@/lib/content";
import { LiveRoomGrid } from "@/components/live-room-grid";
import { BookingWidget } from "@/components/booking-widget";
import { EnquiryForm } from "@/components/enquiry-form";
import { BookingConfirm } from "@/components/booking-confirm";
import { BookingThankYou } from "@/components/booking-thank-you";
import { RoomProductPage } from "@/components/room-product-page";
import { PropertyGallery } from "@/components/property-gallery";
import { propertyGalleries, type GallerySet } from "@/lib/galleries";
import { CloudinaryGallery } from "@/components/cloudinary-gallery";
import { DirectionsMap } from "@/components/directions-map";
import { ExploreKhargonePage } from "@/components/explore-khargone-page";
import { FaqPage } from "@/components/faq-page";
import { GuidesPage, type GuideKey } from "@/components/guides-page";
import { FoodSeoPage } from "@/components/food-seo-page";
import { BanquetHallPage } from "@/components/banquet-hall-page";
import { PartyVenuePage } from "@/components/party-venue-page";
import { AboutPage } from "@/components/about-page";
import { ContactPage } from "@/components/contact-page";
import { BlogListPage } from "@/components/blog-list-page";
import { BlogPostPage } from "@/components/blog-post-page";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string[] }> };

// ── Per-page metadata map ──────────────────────────────────────────────────────
// title max 60 chars, description 150-160 chars
const PAGE_META: Record<string, { title: string; description: string }> = {
  rooms: {
    title: "AC Rooms in Khargone | Nakshatra Hotel & Resort",
    description:
      "Book AC rooms in Khargone at Nakshatra Hotel & Resort. Executive, Deluxe, Family & Suite rooms from ₹2,999/night. Free parking, pool & dining included.",
  },
  restaurant: {
    title: "Restaurant in Khargone | Nakshatra Hotel & Resort",
    description:
      "Best restaurant in Khargone for family dining. Multi-cuisine menu — North Indian, Chinese, Continental & veg options at Nakshatra Hotel, near D-Mart.",
  },
  "banquet-hall": {
    title: "Banquet Hall in Khargone | Nakshatra Grand Hall",
    description:
      "Book Khargone's premier banquet hall — 5,500 sq ft AC hall + wedding lawns. Capacity 1,200 guests. Weddings, receptions & corporate events.",
  },
  "party-venue": {
    title: "Birthday Party Venue Khargone | Nakshatra Resort",
    description:
      "Plan a birthday or anniversary party in Khargone. Private pool, party hall & lawns at Nakshatra Hotel & Resort, near D-Mart, Sanawad Road.",
  },
  wedding: {
    title: "Wedding Hall in Khargone | Nakshatra Resort",
    description:
      "Destination wedding in Khargone at Nakshatra Hotel & Resort — 5,500 sq ft banquet hall, open lawns, 60 rooms & multi-cuisine catering. Enquire now.",
  },
  contact: {
    title: "Contact | Hotel Near Khargone | Nakshatra Resort",
    description:
      "Contact Nakshatra Hotel & Resort, Khargone — near D-Mart, Sanawad Road. Call +91 94250 88369 or WhatsApp for bookings, rates & directions.",
  },
  directions: {
    title: "Directions to Nakshatra Hotel Khargone | Near D-Mart",
    description:
      "Get directions to Nakshatra Hotel & Resort, Khargone. Located near D-Mart, Sanawad Road — easy access from Indore (95 km), Maheshwar & Omkareshwar.",
  },
  gallery: {
    title: "Nakshatra Hotel Khargone Photos | Rooms & Banquet",
    description:
      "View real photos of Nakshatra Hotel & Resort Khargone — rooms, swimming pool, wedding banquet hall, dining & resort grounds.",
  },
  faq: {
    title: "FAQs | Hotel in Khargone | Nakshatra Hotel & Resort",
    description:
      "Frequently asked questions about Nakshatra Hotel & Resort, Khargone — rooms, restaurant, banquet hall, check-in, pool & booking policies.",
  },
  about: {
    title: "About Nakshatra Hotel & Resort Khargone",
    description:
      "Nakshatra Hotel & Resort is a full-service hotel, restaurant & banquet venue in Khargone, MP — 60 rooms, pool, dining & wedding facilities.",
  },
  "best-food-in-khargone": {
    title: "Best Food in Khargone | Nakshatra Restaurant",
    description:
      "Discover the best food in Khargone at Nakshatra Hotel's restaurant — biryani, paneer dishes, tikka, chap & veg thali. Family dining near D-Mart.",
  },
  "explore-khargone": {
    title: "Explore Khargone | Places to Visit & Stay Guide",
    description:
      "Complete guide to Khargone — places to visit, distances to Maheshwar & Omkareshwar, and where to stay. Plan your trip with Nakshatra Hotel.",
  },
  "guides/hotel-near-maheshwar": {
    title: "Hotel Near Maheshwar | Nakshatra Resort Khargone",
    description:
      "Looking for a hotel near Maheshwar? Nakshatra Hotel & Resort in Khargone is 55 km away — AC rooms, pool & dining. Ideal base for Maheshwar day trips.",
  },
  "guides/hotel-near-omkareshwar": {
    title: "Hotel Near Omkareshwar | Nakshatra Khargone",
    description:
      "Best hotel near Omkareshwar — Nakshatra Hotel & Resort, Khargone (~80 km). AC rooms, restaurant & pool. A comfortable base near Omkareshwar temple.",
  },
  "guides/indore-to-khargone-road-trip": {
    title: "Indore to Khargone Road Trip | Distance & Stay",
    description:
      "Indore to Khargone is 95 km via NH3 (~2 hours). Road trip guide with route, detours to Maheshwar & Omkareshwar, and where to stay in Khargone.",
  },
  "guides/wedding-cost-in-khargone": {
    title: "Wedding Cost in Khargone 2025 | Banquet Guide",
    description:
      "How much does a wedding in Khargone cost? Banquet hall rental, catering per-plate rates & what's included at Nakshatra Grand Hall.",
  },
  "birthday-party": {
    title: "Birthday Party in Khargone | Nakshatra Hotel",
    description:
      "Celebrate your birthday in Khargone at Nakshatra Hotel & Resort — pool parties, private hall & outdoor lawns. WhatsApp to plan your celebration.",
  },
  "pool-party": {
    title: "Pool Party in Khargone | Nakshatra Hotel & Resort",
    description:
      "Host a pool party in Khargone at Nakshatra Hotel & Resort. Ground-floor pool, catering & party setup available. Book via WhatsApp.",
  },
  blog: {
    title: "Blog | Khargone Travel & Hotel Guide | Nakshatra",
    description:
      "Travel guides, wedding tips and local insights for Khargone, Madhya Pradesh — brought to you by Nakshatra Hotel & Resort.",
  },
};

const PRIVATE_ROUTES = new Set(["admin", "booking-confirm", "booking-thank-you"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Admin / private routes → noindex
  if (!slug || PRIVATE_ROUTES.has(slug[0])) {
    return { robots: { index: false, follow: false } };
  }

  const key = slug.join("/");
  const singleKey = slug[0];

  // Room product pages
  if (singleKey === "rooms" && slug[1]) {
    const room = rooms.find((r) => r.slug === slug[1]);
    if (room) {
      const canonical = `${siteConfig.url}/rooms/${room.slug}`;
      return {
        title: `${room.name} in Khargone | Nakshatra Hotel`,
        description: `${room.description} Explore photos, amenities & meal plans. Book direct via WhatsApp.`,
        alternates: { canonical },
        openGraph: {
          title: `${room.name} | Nakshatra Hotel & Resort Khargone`,
          description: room.description,
          url: canonical,
          type: "website",
        },
        robots: { index: true, follow: true },
      };
    }
  }

  // Booking flow pages
  if (singleKey === "booking") {
    const isThankYou = slug[1] === "thank-you" || slug[1] === "success";
    return {
      title: isThankYou ? "Booking Request Received" : "Complete Your Booking",
      description:
        "Complete a Nakshatra Hotel & Resort reservation request with pay-at-hotel convenience.",
      robots: { index: false, follow: false },
    };
  }

  // Blog post pages
  if (singleKey === "blog" && slug[1]) {
    const { getBlogPost } = await import("@/lib/blog-posts");
    const post = getBlogPost(slug[1]);
    if (post) {
      const canonical = `${siteConfig.url}/blog/${post.slug}`;
      return {
        title: post.title,
        description: post.description,
        alternates: { canonical },
        openGraph: {
          title: post.title,
          description: post.description,
          url: canonical,
          type: "article",
        },
        robots: { index: true, follow: true },
      };
    }
  }

  // Named pages from PAGE_META map
  const meta = PAGE_META[key] ?? PAGE_META[singleKey];
  if (meta) {
    const canonical = key === "" ? siteConfig.url : `${siteConfig.url}/${key}`;
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical },
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: canonical,
        type: "website",
      },
      robots: { index: true, follow: true },
    };
  }

  // Fallback — use layout default metadata
  return {};
}

// ── Existing page content map (unchanged) ─────────────────────────────────────
const amenityIcons = { Waves, UtensilsCrossed, PartyPopper, Flower2, Presentation, Wifi, Car, Gamepad2, Clock3, Sparkles, Coffee };
const featureIcons = [Gem, Sparkles, ShieldCheck];
const journeyIcons = [MessageCircle, CalendarCheck, Check];
const mealPlanIcons = [BedDouble, Coffee, UtensilsCrossed, ChefHat];

const pageContent: Record<string, { eyebrow: string; title: string; italic: string; copy: string; image: string; type?: string }> = {
  about: { eyebrow: "OUR STORY", title: "Hospitality,", italic: "written in the stars.", copy: "A 60-room resort-style address in Khargone, created for restful stays, joyful gatherings and attentive everyday hospitality.", image: "/images/lobby.jpg" },
  "our-story": { eyebrow: "THE NAKSHATRA STORY", title: "Many reasons", italic: "to arrive.", copy: "A complete Khargone address for restful stays, meaningful gatherings, shared meals and memorable celebrations.", image: "/images/story-resort.jpg" },
  amenities: { eyebrow: "EVERYTHING, CONSIDERED", title: "All you need,", italic: "beautifully gathered.", copy: "From poolside afternoons to fast WiFi and thoughtful daily service, discover the comforts that shape your stay.", image: "/images/pool.jpg" },
  experience: { eyebrow: "LIVE A LITTLE SLOWER", title: "Days shaped", italic: "around you.", copy: "Breakfast without hurry. Time by the water. A game outdoors. Dinner with the people who matter.", image: "/images/pool.jpg" },
  "ground-floor-pool": { eyebrow: "INCLUDED FOR ROOM GUESTS", title: "The guest pool,", italic: "made for easy days.", copy: "Relax beside Nakshatra's ground-floor swimming pool, available to registered room guests during their stay.", image: "/images/ground-floor-pool-gallery/nakshatra10.jpeg" },
  restaurant: { eyebrow: "THE RESTAURANT", title: "Flavours worth", italic: "lingering over.", copy: "Our in-house multi-cuisine restaurant brings guests together over generous plates, familiar flavours and easy conversation.", image: "/images/restaurant-gallery/nakshatra18.jpeg" },
  menu: { eyebrow: "DINE AT NAKSHATRA", title: "A menu for", italic: "every gathering.", copy: "A structured digital menu will be added after the hotel shares its current dishes, descriptions and prices.", image: "/images/restaurant.jpg" },
  wedding: { eyebrow: "WEDDINGS AT NAKSHATRA", title: "Your day,", italic: "made luminous.", copy: "A ~5,500 sq ft banquet hall, lush lawns and thoughtful hospitality create a beautiful canvas for your celebration.", image: "/images/wedding.jpg", type: "wedding" },
  "wedding-hall": { eyebrow: "WEDDING & BANQUET HALL", title: "The Nakshatra", italic: "Grand Hall.", copy: "An approximately 5,500 sq ft indoor venue for luminous weddings, elegant banquets and memorable gatherings.", image: "/images/grand-hall-gallery/nakshatra69.jpeg", type: "wedding hall" },
  "wedding-garden": { eyebrow: "THE WEDDING GARDEN", title: "Celebrate", italic: "under open skies.", copy: "Lush lawns offer a flexible outdoor canvas for ceremonies, receptions, dining and evening celebrations.", image: "/images/wedding-garden.jpg", type: "wedding garden" },
  parking: { eyebrow: "ARRIVE WITH EASE", title: "Grand parking,", italic: "thoughtful arrivals.", copy: "Khargone's biggest parking area supports hotel stays, weddings, business events and large gatherings.", image: "/images/parking.jpg", type: "parking" },
  "event-planning": { eyebrow: "FULL EVENT PLANNING", title: "Every detail,", italic: "one conversation.", copy: "Bring together venue, dining, rooms, parking and event requirements for celebrations of many kinds.", image: "/images/party.jpg", type: "full event planning" },
  "business-meetings": { eyebrow: "BUSINESS AT NAKSHATRA", title: "Meet, focus", italic: "and move forward.", copy: "Conference facilities, fast WiFi, dining, rooms and parking in one convenient Khargone address.", image: "/images/business-meeting.jpg", type: "business meeting" },
  "conference-and-meetings": { eyebrow: "MEET & CONNECT", title: "Business, with", italic: "room to breathe.", copy: "Conference and meeting facilities supported by dining, accommodation, parking and an attentive team.", image: "/images/business-meeting.jpg", type: "conference" },
  "personal-party": { eyebrow: "PRIVATE OCCASIONS", title: "Gather your", italic: "favourite people.", copy: "Plan an intimate occasion with flexible spaces, in-house dining and warm hospitality.", image: "/images/wedding.jpg", type: "personal party" },
  "birthday-party": { eyebrow: "BIRTHDAY CELEBRATIONS", title: "Another year,", italic: "beautifully celebrated.", copy: "Bring together dining, décor-ready spaces and room for everyone you love.", image: "/images/wedding.jpg", type: "birthday party" },
  "pool-party": { eyebrow: "BY THE WATER", title: "Make a splash,", italic: "make a memory.", copy: "Discuss a carefully planned poolside celebration with rooms, dining and event support.", image: "/images/ground-floor-pool-gallery/nakshatra14.jpeg", type: "pool party" },
  offers: { eyebrow: "ROOM RATES", title: "Clear choices,", italic: "beautiful stays.", copy: "Compare the supplied Executive Room reference plans, inclusions, taxes and nightly totals before checking the current direct rate with the hotel.", image: "/images/hero-resort.jpg" },
  gallery: { eyebrow: "A GLIMPSE OF NAKSHATRA", title: "See yourself", italic: "here.", copy: "Explore real moments and spaces from Nakshatra—rooms, pools, dining, celebrations and the resort setting.", image: "/images/hero-resort.jpg" },
  reviews: { eyebrow: "GUEST STORIES", title: "Kind words,", italic: "warm memories.", copy: "Only hotel-approved reviews from Google, Tripadvisor and direct guests will be displayed here.", image: "/images/lobby.jpg" },
  "famous-spots": { eyebrow: "AROUND KHARGONE", title: "Discover the", italic: "Nimar region.", copy: "Explore Maheshwar Fort, Omkareshwar Jyotirlinga, Navgraha Mandir and key tourist attractions from Nakshatra Hotel & Resort Khargone.", image: "/images/hero-resort.jpg" },
  "explore-khargone": { eyebrow: "KHARGONE TRAVEL & STAY GUIDE", title: "Explore Khargone &", italic: "Stay at Nakshatra.", copy: "Your premier luxury resort near D-Mart on Sanawad Road — gateway to Maheshwar, Omkareshwar, temples, wedding venues, and regional tourism in MP.", image: "/images/story-resort.jpg" },
  contact: { eyebrow: "COME, STAY A WHILE", title: "We are", italic: "here for you.", copy: address, image: "/images/lobby.jpg", type: "general enquiry" },
};

const legal: Record<string, { title: string; intro: string; sections: [string, string][] }> = {
  faq: { title: "Frequently asked questions", intro: "Helpful basics for planning your stay.", sections: [["Where is the hotel?", `${address}, conveniently located near D-Mart on Sanawad Road, Khargone, Madhya Pradesh.`], ["What are check-in and check-out times?", "The standard check-in time is 12:00 PM and check-out time is 10:00 AM."], ["Is breakfast included?", "Choose room-only, breakfast, breakfast plus one meal, or the complete dining plan while booking."], ["Does the hotel have a pool?", "Yes. The ground-floor guest pool and exclusive private pool suites are available according to hotel operating hours."], ["How many rooms are available?", "Nakshatra has 60 rooms across Executive, Deluxe, Family and Suite categories."], ["Can I plan a wedding or event?", "Yes. Nakshatra offers a ~5,500 sq ft banquet hall, lush wedding lawns, event spaces and conference facilities."], ["How do I book right now?", "Submit a direct WhatsApp booking inquiry on the website (+91 9479793778) for direct confirmation and best rates."]] },
  "terms-conditions": { title: "Terms & conditions", intro: "A clear final policy should be reviewed by the hotel before payment launch.", sections: [["Reservations", "A reservation is only confirmed after the hotel issues a booking reference and confirms any required payment."], ["Guest information", "Guests may be required to provide valid identification at check-in in line with applicable rules."], ["Property use", "Guests are expected to use hotel facilities responsibly and follow safety directions from staff."]] },
  "privacy-policy": { title: "Privacy policy", intro: "How guest information will be handled when online booking goes live.", sections: [["Information collected", "Booking contact information, stay details and preferences may be collected to fulfil a reservation."], ["Payments", "Card and UPI details will be handled by the payment provider; the hotel website should not store full payment credentials."], ["Contact", "Privacy questions can be raised by calling the hotel directly."]] },
  "cancellation-refund-policy": { title: "Cancellation & refund policy", intro: "Final cutoff windows and refund rules must be confirmed by the hotel before accepting payments.", sections: [["Preview status", "This page is a content placeholder and does not create a binding cancellation policy."], ["Refunds", "Any eligible refund terms, processing times and deposit conditions will be shown clearly before payment."], ["Assistance", "For an existing offline reservation, contact the hotel by phone or WhatsApp."]] },
};

function PageHero({ content }: { content: (typeof pageContent)[string] }) {
  return (
    <section className="page-hero">
      <img src={content.image} alt={`${content.title} ${content.italic} at Nakshatra Hotel & Resort`} />
      <div className="page-hero-shade" />
      <div className="page-hero-copy">
        <p className="kicker">{content.eyebrow}</p>
        <h1>{content.title}<br /><em>{content.italic}</em></h1>
        <p>{content.copy}</p>
      </div>
    </section>
  );
}

function RichDetail({ data, title, gallery }: { data: DetailPage; title: string; gallery?: GallerySet }) {
  return <>
    <section className="rich-intro section-shell"><div><p className="kicker">DISCOVER THE DETAILS</p><h2>{data.introTitle}</h2></div><div>{data.intro.map(text => <p key={text}>{text}</p>)}</div></section>
    <section className="rich-highlights"><div className="section-shell">{data.highlights.map(item => <div key={item.label}><b>{item.value}</b><span>{item.label}</span></div>)}</div></section>
    <section className="rich-features section-shell"><div className="rich-section-head"><p className="kicker">WHAT MAKES IT SPECIAL</p><h2>Thoughtfully brought <em>together.</em></h2></div><div className="rich-feature-grid">{data.features.map((feature, i) => { const FeatureIcon = featureIcons[i % featureIcons.length]; return <article key={feature.title}><span className="luxury-icon"><FeatureIcon /></span><h3>{feature.title}</h3><p>{feature.text}</p></article>; })}</div></section>
    <section className="rich-gallery"><div className="rich-gallery-main"><img src={data.image2} alt={`${title} at Nakshatra Hotel & Resort`} /></div><div className="rich-gallery-side"><img src={data.image3} alt={`${title} detail at Nakshatra Hotel & Resort`} /><div className="glass-panel"><span>✦</span><p>Every layout, inclusion and operational detail is confirmed directly with the hotel for your dates and occasion.</p></div></div></section>
    {gallery && <PropertyGallery {...gallery} />}
    <section className="planning-section section-shell"><div className="rich-section-head"><p className="kicker">HOW TO PLAN</p><h2>From first conversation<br />to <em>the day itself.</em></h2></div><div className="planning-grid">{data.journey.map((step, i) => { const JourneyIcon = journeyIcons[i % journeyIcons.length]; return <article key={step.title}><span className="planning-icon"><JourneyIcon /></span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>; })}</div></section>
    <section className="related-section"><div className="section-shell"><div className="rich-section-head light"><p className="kicker">CONTINUE EXPLORING</p><h2>Everything works<br /><em>beautifully together.</em></h2></div><div className="related-grid">{data.related.map(item => <Link href={item.href} key={item.href}><img src={item.image} alt={`${item.label} at Nakshatra Hotel & Resort`} /><div><h3>{item.label}</h3><span>Explore <ArrowRight /></span></div></Link>)}</div></div></section>
    {data.formType ? <section className="rich-enquiry section-shell" id="enquire"><div><p className="kicker">START THE CONVERSATION</p><h2>Tell us what<br /><em>you are planning.</em></h2><p>Share your preferred date, approximate guest expectation and the kind of experience you want to create. The hotel team can then discuss suitable spaces and confirmed inclusions.</p></div><EnquiryForm type={data.formType} /></section> : <section className="mid-book"><BookingWidget /></section>}
  </>;
}

export default async function AnyPage({ params }: Props) {
  const { slug } = await params;
  const key = slug[0];

  // ── Booking flow ────────────────────────────────────────────────────────────
  if (key === "booking" && (slug[1] === "checkout" || slug[1] === "confirm")) return <BookingConfirm />;
  if (key === "booking" && (slug[1] === "thank-you" || slug[1] === "success")) return <BookingThankYou />;

  // ── Room pages ──────────────────────────────────────────────────────────────
  if (key === "rooms" && slug[1]) {
    const room = rooms.find(r => r.slug === slug[1]);
    if (!room) return notFound();
    return <RoomProductPage room={room} />;
  }

  // ── Blog pages ──────────────────────────────────────────────────────────────
  if (key === "blog" && slug[1]) return <BlogPostPage slug={slug[1]} />;
  if (key === "blog") return <BlogListPage />;

  // ── New SEO/AEO pages ───────────────────────────────────────────────────────
  if (key === "banquet-hall") return <BanquetHallPage />;
  if (key === "party-venue") return <PartyVenuePage />;
  if (key === "about") return <AboutPage />;
  if (key === "contact") return <ContactPage />;

  // ── Rooms overview ──────────────────────────────────────────────────────────
  if (key === "rooms") return <main className="subpage rooms-page"><PageHero content={{ eyebrow: "FOUR WAYS TO STAY", title: "Find your", italic: "perfect retreat.", copy: "From efficient comfort to an expansive family setting, every room is a considered place to pause.", image: "/images/rooms/nakshatra1.jpeg" }} />
    <section className="rooms-intro section-shell"><div><p className="kicker">YOUR STAY, YOUR WAY</p><h2>Rest deeply. Dine well.<br /><em>Stay a little longer.</em></h2></div><div><p>Every Nakshatra room pairs calm interiors with the practical comforts that make travel easy: air conditioning, private bathrooms, daily housekeeping, hot water, WiFi and responsive front-desk support.</p><p>Choose a flexible room-only stay or add breakfast, one daily meal, or complete dining for every registered guest.</p></div><div className="rooms-intro-stats"><span><b>60</b> rooms</span><span><b>4</b> room categories</span><span><b>4</b> meal plans</span><span><b>1</b> guest pool</span></div></section>
    <section className="all-rooms section-shell"><LiveRoomGrid /></section>
    <section className="rooms-comfort section-shell"><div className="rooms-comfort-image"><img src="/images/rooms/nakshatra36.jpeg" alt="A furnished Nakshatra guest room" /></div><div className="rooms-comfort-copy glass-panel"><p className="kicker">COMFORT, INCLUDED</p><h2>Everything you need,<br /><em>quietly in place.</em></h2><p>Thoughtful essentials support business trips, family stays and celebratory weekends alike. Exact room layouts vary by category; open any room to see its complete gallery and booking choices.</p><div>{roomAmenities.map(item => <span key={item}><Check />{item}</span>)}</div></div></section>
    <section className="meal-plan-section section-shell"><div className="rich-section-head"><p className="kicker">GUEST-BASED DINING</p><h2>Turn the room into<br /><em>a complete stay.</em></h2><p>Meal add-ons are available per registered guest, per night. Inquire via WhatsApp for current dining package availability.</p></div><div className="meal-plan-overview">{mealPlans.map((plan, i) => { const PlanIcon = mealPlanIcons[i % mealPlanIcons.length]; return <article key={plan.slug} className="glass-panel"><span className="luxury-icon"><PlanIcon /></span><p className="kicker">SPECIAL PACKAGE</p><h3>{plan.name}</h3><p>{plan.description}</p><div>{plan.includes.map(item => <small key={item}><Check />{item}</small>)}</div><b>{plan.addonPerGuest ? "Inquire on WhatsApp" : "Room only"}</b></article>; })}</div></section>
    <section className="rooms-photo-band"><figure><img src="/images/rooms/nakshatra56.jpeg" alt="Deluxe room at Nakshatra" /><figcaption>Space to settle in</figcaption></figure><figure><img src="/images/rooms/nakshatra54.jpeg" alt="Warm beige guest room at Nakshatra" /><figcaption>Designed for longer stays</figcaption></figure><figure><img src="/images/rooms/nakshatra55.jpeg" alt="Family-style room with two sleeping areas at Nakshatra" /><figcaption>Together, comfortably</figcaption></figure></section>
    <div className="mid-book"><BookingWidget /></div></main>;

  // ── Legal pages ─────────────────────────────────────────────────────────────
  if (legal[key]) {
    const item = legal[key];
    return <main className="subpage dark-top"><section className="legal-page section-shell"><p className="kicker">NAKSHATRA HOTEL &amp; RESORT</p><h1>{item.title}</h1><p className="lead">{item.intro}</p><div>{item.sections.map(([h, p]) => <article key={h}><h2>{h}</h2><p>{p}</p></article>)}</div></section></main>;
  }

  // ── Standalone SEO/gallery pages ────────────────────────────────────────────
  if (key === "gallery") return <main><CloudinaryGallery /></main>;
  if (key === "directions") return <main><DirectionsMap /></main>;
  if (key === "explore-khargone" || key === "famous-spots" || key === "guide") return <main><ExploreKhargonePage /></main>;
  if (key === "faq") return <main><FaqPage /></main>;
  if (key === "best-food-in-khargone") return <main><FoodSeoPage /></main>;

  // ── Guide subpages ──────────────────────────────────────────────────────────
  if (key === "guides" && slug[1]) {
    const guideMap: Record<string, GuideKey> = {
      "hotel-near-maheshwar": "maheshwar",
      "hotel-near-omkareshwar": "omkareshwar",
      "indore-to-khargone-road-trip": "indore",
      "wedding-cost-in-khargone": "wedding-cost",
    };
    const guideKey = guideMap[slug[1]];
    if (guideKey) return <main><GuidesPage guide={guideKey} /></main>;
  }

  // ── Detail pages & generic page content ────────────────────────────────────
  const content = pageContent[key];
  if (!content) return notFound();

  if (key === "amenities") return <main className="subpage amenities-page"><PageHero content={content} /><section className="full-amenities section-shell"><p className="kicker">AT YOUR SERVICE</p><h2>Stay with <em>everything in reach.</em></h2><p className="amenities-lead">A resort stay should feel effortless. From the moment you arrive, rooms, dining, recreation, events and everyday guest services come together within one Khargone address.</p><div>{amenities.map(([icon, name], i) => { const AmenityIcon = amenityIcons[icon as keyof typeof amenityIcons] || Sparkles; return <article key={name} className="glass-panel"><span className="luxury-icon"><AmenityIcon /></span><h3>{name}</h3><p>{i < 2 ? "Two distinct pool experiences, each with its own access arrangement." : i < 6 ? "Designed to support dining, celebrations and productive gatherings." : "A practical comfort that keeps every stay running smoothly."}</p></article>; })}</div></section>
    <section className="pool-amenity-story"><article><img src="/images/ground-floor-pool-gallery/nakshatra10.jpeg" alt="Ground-floor swimming pool at Nakshatra" /><div className="glass-panel"><p className="kicker">FOR STAYING GUESTS</p><h2>Ground-floor pool</h2><p>Included access for registered room guests, offering an easy place to cool down, unwind and spend time together during the stay.</p><Link href="/ground-floor-pool">View all 10 photographs <ArrowRight /></Link></div></article><article><img src="/images/parking.jpg" alt="Grand parking area at Nakshatra" /><div className="glass-panel"><p className="kicker">ARRIVE WITH EASE</p><h2>Grand parking</h2><p>Khargone's biggest parking area supports stays, weddings, conferences and large celebrations.</p><Link href="/parking">Explore parking &amp; arrivals <ArrowRight /></Link></div></article></section>
    <section className="service-stories section-shell"><div className="rich-section-head"><p className="kicker">MORE THAN A ROOM</p><h2>Every kind of visit,<br /><em>considered.</em></h2></div><div><article><img src="/images/restaurant.jpg" alt="Restaurant at Nakshatra" /><div><h3>Dine with ease</h3><p>Breakfast, lunch, dinner and guest-based meal packages keep dining close and flexible.</p><Link href="/restaurant">Explore dining <ArrowRight /></Link></div></article><article><img src="/images/wedding.jpg" alt="Banquet hall at Nakshatra" /><div><h3>Gather beautifully</h3><p>A 5,500 sq ft banquet hall, wedding garden, lawns and full event enquiries support celebrations of many sizes.</p><Link href="/wedding">Explore celebrations <ArrowRight /></Link></div></article><article><img src="/images/parking.jpg" alt="Parking at Nakshatra" /><div><h3>Arrive effortlessly</h3><p>Grand free self-parking supports staying guests, wedding parties, conferences and large group arrivals.</p><Link href="/parking">Plan your arrival <ArrowRight /></Link></div></article></div></section><div className="mid-book"><BookingWidget /></div></main>;

  if (key === "reviews") return <main className="subpage"><PageHero content={content} /><section className="reviews-grid section-shell">{["A calm, comfortable stay with the spaces we needed to slow down.", "A welcoming setting for a family celebration and time together.", "Convenient for Khargone, with thoughtful hospitality throughout our stay."].map((q, i) => <blockquote key={q}><div><Star /><Star /><Star /><Star /><Star /></div><p>"{q}"</p><cite>Preview review {i + 1} · Replace with approved testimonial</cite></blockquote>)}</section></main>;

  if (key === "offers") return <main className="subpage"><PageHero content={content} /><section className="rates-section section-shell"><div className="rates-heading"><div><p className="kicker">SPECIAL OFFERS</p><h2>Executive Room<br /><em>stay packages.</em></h2></div><div className="room-facts"><span><b>{executiveRoomReference.maxGuests}</b> max guests</span><span><b>{executiveRoomReference.size}</b></span><span><b>{executiveRoomReference.bed}</b></span><span><b>{executiveRoomReference.bathrooms}</b> bathroom</span></div></div><p className="rate-source-note">Contact us on WhatsApp for live availability and approved direct-booking rates for your travel dates.</p><div className="rate-plan-grid">{executiveRoomReference.ratePlans.map(plan => <article key={plan.name}><p className="kicker">EXECUTIVE ROOM</p><h3>{plan.name}</h3><p>{plan.includes}</p><div className="plan-price"><span><small>RATES &amp; OFFERS</small><b>Inquire Rates</b></span></div><a className="gold-button" href={`https://wa.me/919479793778?text=Hello%2C%20I%27d%20like%20to%20inquire%20about%20the%20${encodeURIComponent(plan.name)}%20rate%20for%20the%20Executive%20Room.`} target="_blank" rel="noreferrer">Inquire on WhatsApp <ArrowRight /></a></article>)}</div><div className="rate-details"><div><p className="kicker">ROOM AMENITIES</p><div>{executiveRoomReference.amenities.map(item => <span key={item}><Check />{item}</span>)}</div></div><div><p className="kicker">PROPERTY RULES</p><div>{executiveRoomReference.rules.map(item => <span key={item}><Check />{item}</span>)}</div></div></div></section></main>;

  if (detailPages[key]) return <main className="subpage"><PageHero content={content} /><RichDetail data={detailPages[key]} title={`${content.title} ${content.italic}`} gallery={propertyGalleries[key]} /></main>;

  const showForm = !!content.type;
  return <main className="subpage"><PageHero content={content} /><section className="story-block section-shell"><div><p className="kicker">{key === "contact" ? "GET IN TOUCH" : "THE NAKSHATRA WAY"}</p><h2>{key === "contact" ? "Let's plan your visit." : "Made for moments that matter."}</h2><p>{content.copy}</p>{key === "contact" && <div className="contact-list"><a href="tel:+919425088369"><Phone />+91 94250 88369</a><a href="https://maps.google.com/?q=Nakshatra+Hotel+Resort+Khargone"><MapPin />{address}</a></div>}</div>{showForm ? <EnquiryForm type={content.type} /> : <div className="story-image"><img src={key === "restaurant" ? "/images/restaurant.jpg" : key === "about" ? "/images/lobby.jpg" : "/images/pool.jpg"} alt={`Nakshatra Hotel & Resort ${key}`} /></div>}</section>{!showForm && <section className="mid-book"><BookingWidget /></section>}</main>;
}
