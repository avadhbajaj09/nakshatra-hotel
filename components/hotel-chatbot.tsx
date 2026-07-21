"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Image as ImageIcon, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { rooms } from "@/lib/content";

type Card = { title: string; copy: string; image: string; href: string };
type Action = { label: string; href: string };
type ChatMessage = { id: number; role: "assistant" | "guest"; text: string; cards?: Card[]; actions?: Action[] };

const welcome: ChatMessage = {
  id: 1,
  role: "assistant",
  text: "Namaste! I’m your Nakshatra concierge. Ask me about rooms, prices, weddings, birthday parties, business meetings, pools, dining, parking or booking—and I can show you the right images too.",
};

const prompts = ["Private pool gallery", "Grand Hall photos", "Show room photos", "Plan my wedding", "Birthday party", "Business meeting", "Book a stay"];

const allOccasions: Card[] = [
  { title: "Rooms & stays", copy: "Six room styles with real galleries and meal packages.", image: "/images/rooms/nakshatra1.jpeg", href: "/rooms" },
  { title: "The Nakshatra Grand Hall", copy: "Grand Hall, garden, rooms, dining and parking together.", image: "/images/grand-hall-gallery/nakshatra69.jpeg", href: "/wedding-hall" },
  { title: "Birthday parties", copy: "Flexible indoor, lawn, restaurant and poolside possibilities.", image: "/images/party.jpg", href: "/birthday-party" },
  { title: "Business meetings", copy: "Meeting space, WiFi, dining, rooms and parking.", image: "/images/business-meeting.jpg", href: "/business-meetings" },
];

function answerFor(raw: string): Omit<ChatMessage, "id" | "role"> {
  const query = raw.toLowerCase();
  const wantsImages = /image|images|photo|photos|gallery|picture|pictures|फोटो/.test(query);

  if (wantsImages && /private|rooftop/.test(query) && /pool|swim/.test(query)) return {
    text: "Here is a private rooftop pool showcase with real Nakshatra photographs. The exclusive third-floor pool can be reserved with or without a room for ₹2,000 per hour; open the full gallery to explore all 11 images.",
    cards: ["nakshatra25.jpeg", "nakshatra29.jpeg", "nakshatra27.jpeg", "nakshatra21.jpeg"].map((name, index) => ({
      title: ["Private rooftop pool", "A pool reserved for you", "Third-floor escape", "Rooftop moments"][index],
      copy: index === 0 ? "Exclusive private use · ₹2,000 per hour." : "A real view from the private pool collection.",
      image: `/images/private-pool-gallery/${name}`,
      href: "/private-rooftop-pool",
    })),
    actions: [{ label: "View all 11 pool photos", href: "/private-rooftop-pool" }, { label: "Book private pool", href: "/private-rooftop-pool#enquire" }],
  };

  if (wantsImages && /wedding|banquet|hall|grand/.test(query)) return {
    text: "Welcome to The Nakshatra Grand Hall—an approximately 5,500 sq ft indoor setting for weddings, banquets and business gatherings. These are real photographs; open the hall page to browse all 11 images full screen.",
    cards: ["nakshatra69.jpeg", "nakshatra42.jpeg", "nakshatra74.jpeg", "nakshatra73.jpeg"].map((name, index) => ({
      title: ["Wedding celebration", "Elegant banquet dining", "Conference layout", "Grand Hall details"][index],
      copy: "A real view of The Nakshatra Grand Hall.",
      image: `/images/grand-hall-gallery/${name}`,
      href: "/wedding-hall",
    })),
    actions: [{ label: "View all 11 Grand Hall photos", href: "/wedding-hall" }, { label: "Plan a wedding", href: "/wedding" }],
  };

  if (wantsImages && /room|stay|suite|कमरा/.test(query)) return {
    text: "Here are real room photographs from Nakshatra. Open any room to view its complete slider gallery, amenities, guest count, meal packages and booking total.",
    cards: rooms.slice(0, 4).map(room => ({ title: room.name, copy: `From ₹${room.rate.toLocaleString("en-IN")} · up to ${room.maxGuests} guests`, image: room.image, href: `/rooms/${room.slug}` })),
    actions: [{ label: "View all rooms", href: "/rooms" }],
  };

  if (wantsImages) return {
    text: "Here is a quick visual tour of Nakshatra. You can also open the full gallery for rooms, pools, dining, weddings and the resort grounds.",
    cards: [
      { title: "Hotel & resort", copy: "The main arrival façade in Khargone.", image: "/images/main-front-facade.webp", href: "/our-story" },
      { title: "Private rooftop pool", copy: "Exclusive third-floor booking at ₹2,000 per hour.", image: "/images/private-pool-gallery/nakshatra25.jpeg", href: "/private-rooftop-pool" },
      { title: "The Nakshatra Grand Hall", copy: "Indoor celebrations and elegant event layouts.", image: "/images/grand-hall-gallery/nakshatra69.jpeg", href: "/wedding-hall" },
      { title: "Rooms", copy: "Real room galleries for every category.", image: "/images/rooms/nakshatra56.jpeg", href: "/rooms" },
    ],
    actions: [{ label: "Open full gallery", href: "/gallery" }],
  };

  if (/wedding|marriage|shaadi|shadi|वेडिंग|शादी/.test(query)) return {
    text: "Nakshatra can bring your celebration together in one address: an approximately 5,500 sq ft banquet hall, wedding garden and lawns, 53 guest rooms, in-house dining, event planning and expansive free parking. Share your date and approximate guest count on the wedding enquiry page.",
    cards: [
      { title: "The Nakshatra Grand Hall", copy: "Grand indoor celebrations in an approximately 5,500 sq ft setting.", image: "/images/grand-hall-gallery/nakshatra69.jpeg", href: "/wedding-hall" },
      { title: "Wedding garden", copy: "Open-air ceremonies, receptions and evening dining.", image: "/images/wedding-garden.jpg", href: "/wedding-garden" },
      { title: "Complete planning", copy: "Bring venue, rooms, dining and arrival needs into one plan.", image: "/images/celebration-table.jpg", href: "/event-planning" },
    ],
    actions: [{ label: "Start wedding enquiry", href: "/wedding" }, { label: "Call hotel", href: "tel:+919425088369" }],
  };

  if (/birthday|anniversary|personal party|celebration|जन्मदिन/.test(query)) return {
    text: "Birthday celebrations can be planned around an indoor venue, lawn, restaurant or private rooftop pool, with food, rooms and parking discussed together. Final space, timing and inclusions are confirmed for your date and guest count.",
    cards: [
      { title: "Birthday celebrations", copy: "Family birthdays, children’s celebrations and milestone evenings.", image: "/images/party.jpg", href: "/birthday-party" },
      { title: "Private pool party", copy: "Third-floor rooftop pool at ₹2,000 per hour.", image: "/images/private-rooftop-pool-night.jpg", href: "/pool-party" },
    ],
    actions: [{ label: "Plan a birthday", href: "/birthday-party" }, { label: "Explore event planning", href: "/event-planning" }],
  };

  if (/business|meeting|conference|corporate|training|मीटिंग/.test(query)) return {
    text: "For business groups, Nakshatra combines meeting and conference facilities with 50+ Mbps WiFi, in-house dining, 53 rooms and free on-site parking. Tell the team your date, schedule, approximate attendance, room requirement and meal needs.",
    cards: [
      { title: "Meetings & conferences", copy: "Focused sessions, presentations, training and team gatherings.", image: "/images/business-meeting.jpg", href: "/business-meetings" },
      { title: "Group accommodation", copy: "Six room styles with breakfast and dining packages.", image: "/images/rooms/nakshatra36.jpeg", href: "/rooms" },
    ],
    actions: [{ label: "Start meeting enquiry", href: "/business-meetings" }, { label: "View conference details", href: "/conference-and-meetings" }],
  };

  if (/pool|swim|swimming|rooftop|पूल/.test(query)) return {
    text: "Nakshatra has two separate pools. The ground-floor pool is included for registered room guests. The private third-floor rooftop pool is reserved exclusively at ₹2,000 per hour and can be booked with or without a room.",
    cards: [
      { title: "Ground-floor guest pool", copy: "Open to registered staying guests during their visit.", image: "/images/ground-floor-pool-gallery/nakshatra10.jpeg", href: "/ground-floor-pool" },
      { title: "Private rooftop pool", copy: "Exclusive personal use · ₹2,000 per hour.", image: "/images/private-pool-gallery/nakshatra25.jpeg", href: "/private-rooftop-pool" },
    ],
    actions: [{ label: "Book private pool", href: "/private-rooftop-pool" }],
  };

  if (/room|stay|suite|hotel|accommodation|कमरा/.test(query) && !/book|booking|reserve|availability|बुक/.test(query)) return {
    text: `Nakshatra offers 53 rooms across six styles. Preview rates begin at ₹${Math.min(...rooms.map(room => room.rate)).toLocaleString("en-IN")} per night. Every room includes practical comforts, and you can add breakfast, one daily meal or complete dining per registered guest.`,
    cards: rooms.slice(0, 3).map(room => ({ title: room.name, copy: `${room.bed} · up to ${room.maxGuests} guests · from ₹${room.rate.toLocaleString("en-IN")}`, image: room.image, href: `/rooms/${room.slug}` })),
    actions: [{ label: "Compare every room", href: "/rooms" }, { label: "Check room offers", href: "/offers" }],
  };

  if (/book|booking|reserve|availability|date|बुक/.test(query)) return {
    text: "I can take you to the correct booking path. For a stay, choose a room, dates, guests and meal package, then complete the pay-at-hotel checkout. For weddings, parties, meetings or the private pool, open the matching planner below and send the hotel your date and guest details.",
    cards: allOccasions,
    actions: [{ label: "Book a room", href: "/rooms" }, { label: "Plan any event", href: "/event-planning" }],
  };

  if (/food|restaurant|breakfast|lunch|dinner|meal|menu|खाना/.test(query)) return {
    text: "Nakshatra has an in-house multi-cuisine restaurant. Room bookings can include breakfast, breakfast plus lunch or dinner, or a complete dining stay. Wedding, party and meeting meals are planned separately for each event.",
    cards: [{ title: "Restaurant & dining", copy: "Everyday meals, guest packages and occasion dining.", image: "/images/restaurant.jpg", href: "/restaurant" }],
    actions: [{ label: "Explore dining", href: "/restaurant" }, { label: "View room meal plans", href: "/rooms" }],
  };

  if (/parking|car|arrival|bus stand|location|address|where|पता/.test(query)) return {
    text: "Nakshatra Hotel & Resort is on Sanawad Road, Jaitapur, Khargone, Madhya Pradesh 451001—approximately 3 km from Khargone Bus Stand. Expansive free self-parking supports hotel guests and large events.",
    cards: [{ title: "Parking & arrival", copy: "Free on-site parking for stays, weddings, parties and meetings.", image: "/images/parking.jpg", href: "/parking" }],
    actions: [{ label: "Open directions", href: "https://maps.google.com/?q=Nakshatra+Hotel+Resort+Khargone" }, { label: "Call +91 94250 88369", href: "tel:+919425088369" }],
  };

  if (/price|rate|cost|discount|offer|₹|कितना/.test(query)) return {
    text: "Current preview room rates range from ₹2,999 for a Classic Room to ₹7,499 for a Family Room before selected meal add-ons. Direct-booking package discounts are shown during room selection. The private rooftop pool is ₹2,000 per hour. Event prices depend on date, venue, guests, food and inclusions.",
    actions: [{ label: "See room prices", href: "/rooms" }, { label: "View offers", href: "/offers" }, { label: "Request event pricing", href: "/event-planning" }],
  };

  return {
    text: "I can help with room photos and prices, stay booking, weddings, birthday or pool parties, business meetings, dining, amenities, parking and directions. Choose one below, or ask a more specific question such as “show Luxury Room images” or “plan a wedding for 300 guests.”",
    cards: allOccasions,
  };
}

export function HotelChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("nakshatra-concierge-history");
    if (saved) try { setMessages(JSON.parse(saved)); } catch { window.localStorage.removeItem("nakshatra-concierge-history"); }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("nakshatra-concierge-history", JSON.stringify(messages.slice(-20)));
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 180);
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages(current => [...current, { id: Date.now(), role: "guest", text: clean }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages(current => [...current, { id: Date.now() + 1, role: "assistant", ...answerFor(clean) }]);
      setTyping(false);
    }, 520);
  };

  const submit = (event: FormEvent) => { event.preventDefault(); send(input); };
  const reset = () => { setMessages([{ ...welcome, id: Date.now() }]); setInput(""); };

  return <>
    <button className={`chatbot-launcher ${open ? "is-open" : ""}`} onClick={() => setOpen(value => !value)} aria-label={open ? "Close Nakshatra concierge" : "Ask Nakshatra concierge anything"} aria-expanded={open}>
      <span className="chatbot-launcher-icon">{open ? <X/> : <MessageCircle/>}</span><span><small>NAKSHATRA CONCIERGE</small><b>{open ? "Close assistant" : "Ask me anything"}</b></span>
    </button>
    <aside className={`hotel-chatbot glass-panel ${open ? "is-open" : ""}`} aria-hidden={!open} aria-label="Nakshatra hotel assistant">
      <header><div className="chatbot-brand"><img src="/images/nakshatra-logo-gold-transparent-v2.png" alt="Nakshatra Hotel & Resort"/><span><b>Nakshatra Concierge</b><small><i/>Online · instant hotel guide</small></span></div><div><button onClick={reset} aria-label="Start a new conversation"><RotateCcw/></button><button onClick={() => setOpen(false)} aria-label="Close assistant"><X/></button></div></header>
      <div className="chatbot-feed" ref={feedRef} aria-live="polite">{messages.map(message => <div className={`chat-message ${message.role}`} key={message.id}>
        {message.role === "assistant" && <span className="assistant-glyph"><Sparkles/></span>}
        <div className="chat-message-body"><p>{message.text}</p>{message.cards && <div className="chat-card-rail">{message.cards.map(card => <Link href={card.href} key={`${message.id}-${card.href}`} onClick={() => setOpen(false)}><img src={card.image} alt={card.title}/><div><b>{card.title}</b><small>{card.copy}</small><span>Explore <ArrowRight/></span></div></Link>)}</div>}{message.actions && <div className="chat-actions">{message.actions.map(action => <a href={action.href} key={action.href} onClick={() => setOpen(false)}>{action.label}<ArrowRight/></a>)}</div>}</div>
      </div>)}{typing && <div className="chat-message assistant"><span className="assistant-glyph"><Sparkles/></span><div className="typing-dots"><i/><i/><i/></div></div>}</div>
      <div className="chatbot-prompts">{prompts.map(prompt => <button key={prompt} onClick={() => send(prompt)}>{/photo|gallery/i.test(prompt) ? <ImageIcon/> : prompt.includes("Book") ? <CalendarDays/> : null}{prompt}</button>)}</div>
      <form className="chatbot-input" onSubmit={submit}><input ref={inputRef} value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about rooms, events, prices…" aria-label="Ask the Nakshatra concierge"/><button type="submit" disabled={!input.trim() || typing} aria-label="Send message"><Send/></button></form>
      <p className="chatbot-footnote">For final availability and event quotations, the hotel team confirms every request directly.</p>
    </aside>
  </>;
}
