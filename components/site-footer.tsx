"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { address } from "@/lib/content";
import { Camera, MessageCircleMore, Video, MapPin, Phone, Paintbrush, Heart } from "lucide-react";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return <footer className="footer">
    <div className="footer-glow"/>
    <div className="footer-main">
      <div className="footer-brand">
        <img className="footer-official-logo" src="/images/nakshatra-logo-gold-transparent-v2.png" alt="Nakshatra Hotel & Resort"/>
        <p className="kicker">NAKSHATRA HOTEL &amp; RESORT · KHARGONE</p>
        <h2>Come away<br/><em>restored.</em></h2>
      </div>
      <div className="footer-links">
        <div><p className="footer-title">Explore</p><Link href="/our-story">Our story</Link><Link href="/rooms">Rooms &amp; suites</Link><Link href="/ground-floor-pool">Guest pool</Link><Link href="/amenities">Amenities</Link><Link href="/restaurant">Restaurant</Link><Link href="/gallery">Gallery</Link><Link href="/explore-khargone">Explore Khargone</Link><Link href="/parking">Grand parking</Link></div>
        <div><p className="footer-title">Celebrate</p><Link href="/wedding">Weddings</Link><Link href="/wedding-hall">The Nakshatra Grand Hall</Link><Link href="/wedding-garden">Wedding garden</Link><Link href="/event-planning">Event planning</Link><Link href="/business-meetings">Business meetings</Link><Link href="/birthday-party">Birthdays</Link></div>
        <div><p className="footer-title">Visit</p><Link href="/directions">Directions &amp; Map</Link><a href="https://maps.google.com/?q=Nakshatra+Hotel+Resort+Khargone" target="_blank" rel="noreferrer"><MapPin size={15}/>{address}</a><a href="tel:+919425088369"><Phone size={15}/>+91 94250 88369</a></div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Nakshatra Hotel &amp; Resort</p>
      <div><Link href="/privacy-policy">Privacy</Link><Link href="/terms-conditions">Terms</Link><Link href="/cancellation-refund-policy">Cancellation</Link></div>
      <div className="footer-credit">
        <a
          href="https://avadhbajaj.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Designed & Developed by Avadh Bajaj — Luxury Web & Brand Architecture"
          className="designer-credit-link"
        >
          <Paintbrush size={12} className="credit-brush-icon" />
          <span>Designed with</span>
          <Heart size={12} className="credit-heart-icon" />
          <span>by <strong className="designer-name">Avadh Bajaj</strong></span>
        </a>
      </div>
      <div className="socials"><a href="https://www.instagram.com/nakshatrahotel/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera/></a><a href="#" aria-label="Facebook link pending confirmation"><MessageCircleMore/></a><a href="#" aria-label="YouTube link pending confirmation"><Video/></a></div>
    </div>
  </footer>;
}
