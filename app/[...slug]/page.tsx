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

type Props = { params: Promise<{ slug: string[] }> };

const amenityIcons = { Waves, UtensilsCrossed, PartyPopper, Flower2, Presentation, Wifi, Car, Gamepad2, Clock3, Sparkles, Coffee };
const featureIcons = [Gem, Sparkles, ShieldCheck];
const journeyIcons = [MessageCircle, CalendarCheck, Check];
const mealPlanIcons = [BedDouble, Coffee, UtensilsCrossed, ChefHat];

const pageContent: Record<string, { eyebrow: string; title: string; italic: string; copy: string; image: string; type?: string }> = {
  about: { eyebrow: "OUR STORY", title: "Hospitality,", italic: "written in the stars.", copy: "A 60-room resort-style address in Khargone, created for restful stays, joyful gatherings and attentive everyday hospitality.", image: "/images/lobby.jpg" },
  "our-story": { eyebrow: "THE NAKSHATRA STORY", title: "Many reasons", italic: "to arrive.", copy: "A complete Khargone address for restful stays, meaningful gatherings, shared meals and memorable celebrations.", image: "/images/story-resort.jpg" },
  amenities: { eyebrow: "EVERYTHING, CONSIDERED", title: "All you need,", italic: "beautifully gathered.", copy: "From poolside afternoons to fast WiFi and thoughtful daily service, discover the comforts that shape your stay.", image: "/images/pool.jpg" },
  experience: { eyebrow: "LIVE A LITTLE SLOWER", title: "Days shaped", italic: "around you.", copy: "Breakfast without hurry. Time by the water. A game outdoors. Dinner with the people who matter.", image: "/images/pool.jpg" },
  "ground-floor-pool": { eyebrow: "INCLUDED FOR ROOM GUESTS", title: "The guest pool,", italic: "made for easy days.", copy: "Relax beside Nakshatra’s ground-floor swimming pool, available to registered room guests during their stay.", image: "/images/ground-floor-pool-gallery/nakshatra10.jpeg" },
  restaurant: { eyebrow: "THE RESTAURANT", title: "Flavours worth", italic: "lingering over.", copy: "Our in-house multi-cuisine restaurant brings guests together over generous plates, familiar flavours and easy conversation.", image: "/images/restaurant-gallery/nakshatra18.jpeg" },
  menu: { eyebrow: "DINE AT NAKSHATRA", title: "A menu for", italic: "every gathering.", copy: "A structured digital menu will be added after the hotel shares its current dishes, descriptions and prices.", image: "/images/restaurant.jpg" },
  wedding: { eyebrow: "WEDDINGS AT NAKSHATRA", title: "Your day,", italic: "made luminous.", copy: "A ~5,500 sq ft banquet hall, lush lawns and thoughtful hospitality create a beautiful canvas for your celebration.", image: "/images/wedding.jpg", type: "wedding" },
  "wedding-hall": { eyebrow: "WEDDING & BANQUET HALL", title: "The Nakshatra", italic: "Grand Hall.", copy: "An approximately 5,500 sq ft indoor venue for luminous weddings, elegant banquets and memorable gatherings.", image: "/images/grand-hall-gallery/nakshatra69.jpeg", type: "wedding hall" },
  "wedding-garden": { eyebrow: "THE WEDDING GARDEN", title: "Celebrate", italic: "under open skies.", copy: "Lush lawns offer a flexible outdoor canvas for ceremonies, receptions, dining and evening celebrations.", image: "/images/wedding-garden.jpg", type: "wedding garden" },
  parking: { eyebrow: "ARRIVE WITH EASE", title: "Grand parking,", italic: "thoughtful arrivals.", copy: "Khargone’s biggest parking area supports hotel stays, weddings, business events and large gatherings.", image: "/images/parking.jpg", type: "parking" },
  "event-planning": { eyebrow: "FULL EVENT PLANNING", title: "Every detail,", italic: "one conversation.", copy: "Bring together venue, dining, rooms, parking and event requirements for celebrations of many kinds.", image: "/images/party.jpg", type: "full event planning" },
  "business-meetings": { eyebrow: "BUSINESS AT NAKSHATRA", title: "Meet, focus", italic: "and move forward.", copy: "Conference facilities, fast WiFi, dining, rooms and parking in one convenient Khargone address.", image: "/images/business-meeting.jpg", type: "business meeting" },
  "conference-and-meetings": { eyebrow: "MEET & CONNECT", title: "Business, with", italic: "room to breathe.", copy: "Conference and meeting facilities supported by dining, accommodation, parking and an attentive team.", image: "/images/business-meeting.jpg", type: "conference" },
  "personal-party": { eyebrow: "PRIVATE OCCASIONS", title: "Gather your", italic: "favourite people.", copy: "Plan an intimate occasion with flexible spaces, in-house dining and warm hospitality.", image: "/images/wedding.jpg", type: "personal party" },
  "birthday-party": { eyebrow: "BIRTHDAY CELEBRATIONS", title: "Another year,", italic: "beautifully celebrated.", copy: "Bring together dining, décor-ready spaces and room for everyone you love.", image: "/images/wedding.jpg", type: "birthday party" },
  "pool-party": { eyebrow: "BY THE WATER", title: "Make a splash,", italic: "make a memory.", copy: "Discuss a carefully planned poolside celebration with rooms, dining and event support.", image: "/images/ground-floor-pool-gallery/nakshatra14.jpeg", type: "pool party" },
  offers: { eyebrow: "ROOM RATES", title: "Clear choices,", italic: "beautiful stays.", copy: "Compare the supplied Executive Room reference plans, inclusions, taxes and nightly totals before checking the current direct rate with the hotel.", image: "/images/hero-resort.jpg" },
  gallery: { eyebrow: "A GLIMPSE OF NAKSHATRA", title: "See yourself", italic: "here.", copy: "Explore real moments and spaces from Nakshatra—rooms, pools, dining, celebrations and the resort setting.", image: "/images/hero-resort.jpg" },
  reviews: { eyebrow: "GUEST STORIES", title: "Kind words,", italic: "warm memories.", copy: "Only hotel-approved reviews from Google, Tripadvisor and direct guests will be displayed here.", image: "/images/lobby.jpg" },
  "famous-spots": { eyebrow: "AROUND KHARGONE", title: "Discover the", italic: "region.", copy: "A future local guide will feature confirmed attractions, travel times and helpful routes from Nakshatra.", image: "/images/hero-resort.jpg" },
  contact: { eyebrow: "COME, STAY A WHILE", title: "We are", italic: "here for you.", copy: address, image: "/images/lobby.jpg", type: "general enquiry" },
};

const legal: Record<string, { title: string; intro: string; sections: [string,string][] }> = {
  faq: { title: "Frequently asked questions", intro: "Helpful basics for planning your stay.", sections: [["Where is the hotel?", `${address}, approximately 3 km from Khargone Bus Stand.`],["What are check-in and check-out times?", "The supplied OTA listing shows check-in at 12:00 PM and check-out at 10:00 AM."],["Is breakfast included?", "Choose room-only, breakfast, breakfast plus one meal, or the complete dining plan while booking."],["Does the hotel have a pool?", "Yes. The ground-floor guest pool is available to registered room guests according to hotel operating hours and rules."],["How many rooms are available?", "Nakshatra has 60 rooms across Executive, Deluxe, Family and Suite categories."],["Can I plan a wedding or event?", "Yes. Nakshatra offers a ~5,500 sq ft banquet hall, lawns, wedding/event spaces and conference facilities."],["How do I book right now?", "Submit a booking request on the website, then the hotel team will confirm availability by phone or WhatsApp."]] },
  "terms-conditions": { title: "Terms & conditions", intro: "A clear final policy should be reviewed by the hotel before payment launch.", sections: [["Reservations", "A reservation is only confirmed after the hotel issues a booking reference and confirms any required payment."],["Guest information", "Guests may be required to provide valid identification at check-in in line with applicable rules."],["Property use", "Guests are expected to use hotel facilities responsibly and follow safety directions from staff."]] },
  "privacy-policy": { title: "Privacy policy", intro: "How guest information will be handled when online booking goes live.", sections: [["Information collected", "Booking contact information, stay details and preferences may be collected to fulfil a reservation."],["Payments", "Card and UPI details will be handled by the payment provider; the hotel website should not store full payment credentials."],["Contact", "Privacy questions can be raised by calling the hotel directly."]] },
  "cancellation-refund-policy": { title: "Cancellation & refund policy", intro: "Final cutoff windows and refund rules must be confirmed by the hotel before accepting payments.", sections: [["Preview status", "This page is a content placeholder and does not create a binding cancellation policy."],["Refunds", "Any eligible refund terms, processing times and deposit conditions will be shown clearly before payment."],["Assistance", "For an existing offline reservation, contact the hotel by phone or WhatsApp."]] },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const key = slug[0]; if (key === "rooms" && slug[1]) { const room = rooms.find(item => item.slug === slug[1]); if (room) return { title: `${room.name} · Photos, Amenities & Meal Plans`, description: `${room.description} Explore real photos, guest-based dining packages and direct booking offers.` }; } if (key === "booking") return { title: slug[1] === "thank-you" ? "Booking Request Received" : "Complete Your Booking", description: "Complete a Nakshatra Hotel & Resort reservation request with pay-at-hotel convenience." }; const content = pageContent[key]; return { title: content ? `${content.title} ${content.italic}` : key.replaceAll("-"," "), description: content?.copy }; }

function PageHero({ content }: { content: (typeof pageContent)[string] }) { return <section className="page-hero"><img src={content.image} alt={`${content.title} ${content.italic} at Nakshatra Hotel & Resort`}/><div className="page-hero-shade"/><div className="page-hero-copy"><p className="kicker">{content.eyebrow}</p><h1>{content.title}<br/><em>{content.italic}</em></h1><p>{content.copy}</p></div></section>; }

function RichDetail({ data, title, gallery }: { data: DetailPage; title: string; gallery?: GallerySet }) {
  return <>
    <section className="rich-intro section-shell"><div><p className="kicker">DISCOVER THE DETAILS</p><h2>{data.introTitle}</h2></div><div>{data.intro.map(text=><p key={text}>{text}</p>)}</div></section>
    <section className="rich-highlights"><div className="section-shell">{data.highlights.map(item=><div key={item.label}><b>{item.value}</b><span>{item.label}</span></div>)}</div></section>
    <section className="rich-features section-shell"><div className="rich-section-head"><p className="kicker">WHAT MAKES IT SPECIAL</p><h2>Thoughtfully brought <em>together.</em></h2></div><div className="rich-feature-grid">{data.features.map((feature,i) => { const FeatureIcon = featureIcons[i % featureIcons.length]; return <article key={feature.title}><span className="luxury-icon"><FeatureIcon/></span><h3>{feature.title}</h3><p>{feature.text}</p></article>; })}</div></section>
    <section className="rich-gallery"><div className="rich-gallery-main"><img src={data.image2} alt={`${title} at Nakshatra Hotel & Resort`}/></div><div className="rich-gallery-side"><img src={data.image3} alt={`${title} detail at Nakshatra Hotel & Resort`}/><div className="glass-panel"><span>✦</span><p>Every layout, inclusion and operational detail is confirmed directly with the hotel for your dates and occasion.</p></div></div></section>
    {gallery && <PropertyGallery {...gallery}/>}
    <section className="planning-section section-shell"><div className="rich-section-head"><p className="kicker">HOW TO PLAN</p><h2>From first conversation<br/>to <em>the day itself.</em></h2></div><div className="planning-grid">{data.journey.map((step,i) => { const JourneyIcon = journeyIcons[i % journeyIcons.length]; return <article key={step.title}><span className="planning-icon"><JourneyIcon/></span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>; })}</div></section>
    <section className="related-section"><div className="section-shell"><div className="rich-section-head light"><p className="kicker">CONTINUE EXPLORING</p><h2>Everything works<br/><em>beautifully together.</em></h2></div><div className="related-grid">{data.related.map(item=><Link href={item.href} key={item.href}><img src={item.image} alt={`${item.label} at Nakshatra Hotel & Resort`}/><div><h3>{item.label}</h3><span>Explore <ArrowRight/></span></div></Link>)}</div></div></section>
    {data.formType ? <section className="rich-enquiry section-shell" id="enquire"><div><p className="kicker">START THE CONVERSATION</p><h2>Tell us what<br/><em>you are planning.</em></h2><p>Share your preferred date, approximate guest expectation and the kind of experience you want to create. The hotel team can then discuss suitable spaces and confirmed inclusions.</p></div><EnquiryForm type={data.formType}/></section> : <section className="mid-book"><BookingWidget/></section>}
  </>;
}

import { MaintenancePage } from "@/components/maintenance-page";

type Props = { params: Promise<{ slug: string[] }> };

export default async function AnyPage({ params }: Props) {
  return <MaintenancePage />;
}
