"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const cards = [
  { eyebrow: "STAY", title: "Rooms & dining plans", copy: "Six room styles, real galleries and guest-based breakfast, half-board and full-board choices.", href: "/rooms", image: "/images/rooms/nakshatra1.jpeg" },
  { eyebrow: "ESCAPE", title: "Private rooftop pool", copy: "Reserve the third-floor pool exclusively for ₹2,000 per hour, with or without a room.", href: "/private-rooftop-pool", image: "/images/private-rooftop-pool.jpg" },
  { eyebrow: "CELEBRATE", title: "Weddings & events", copy: "Banquet hall, garden, dining, rooms, expansive parking and one connected planning conversation.", href: "/wedding", image: "/images/wedding.jpg" },
];

export function GlobalDiscovery() {
  const pathname = usePathname();
  if (pathname.startsWith("/booking")) return null;
  return <section className="global-discovery"><div className="section-shell"><div className="discovery-heading"><div><p className="kicker">EVERYTHING WITHIN ONE ADDRESS</p><h2>Stay. Gather.<br/><em>Celebrate.</em></h2></div><p>Nakshatra brings the essentials of a city hotel and the breathing room of a resort together—so each visit can become more than one thing.</p></div><div className="discovery-grid">{cards.map(card=><Link href={card.href} key={card.href}><img src={card.image} alt={`${card.title} at Nakshatra Hotel & Resort`}/><div className="glass-panel"><p className="kicker">{card.eyebrow}</p><h3>{card.title}</h3><p>{card.copy}</p><span>Explore <ArrowUpRight/></span></div></Link>)}</div></div></section>;
}
