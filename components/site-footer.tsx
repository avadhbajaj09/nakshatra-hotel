import Link from "next/link";
import { address } from "@/lib/content";
import { Camera, MessageCircleMore, Video, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return <footer className="footer">
    <div className="footer-glow"/>
    <div className="footer-main">
      <div className="footer-brand">
        <img className="footer-official-logo" src="/images/nakshatra-logo-gold-transparent-v2.png" alt="Nakshatra Hotel & Resort"/>
        <p className="kicker">NAKSHATRA HOTEL &amp; RESORT · KHARGONE</p>
        <h2>Grand Opening<br/><em>Coming Soon.</em></h2>
        <p className="footer-coming-soon-copy">Accepting advance reservations &amp; wedding inquiries for opening season.</p>
      </div>
      <div className="footer-links">
        <div><p className="footer-title">Explore</p><Link href="/our-story">Our story</Link><Link href="/rooms">Rooms & suites</Link><Link href="/ground-floor-pool">Guest pool</Link><Link href="/amenities">Amenities</Link><Link href="/restaurant">Restaurant</Link><Link href="/gallery">Gallery</Link><Link href="/parking">Grand parking & arrival</Link></div>
        <div><p className="footer-title">Celebrate</p><Link href="/wedding">Weddings</Link><Link href="/wedding-hall">The Nakshatra Grand Hall</Link><Link href="/wedding-garden">Wedding garden</Link><Link href="/event-planning">Event planning</Link><Link href="/business-meetings">Business meetings</Link><Link href="/birthday-party">Birthdays</Link></div>
        <div><p className="footer-title">Visit</p><a href="https://maps.google.com/?q=Nakshatra+Hotel+Resort+Khargone" target="_blank" rel="noreferrer"><MapPin size={15}/>{address}</a><a href="tel:+919425088369"><Phone size={15}/>+91 94250 88369</a></div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Nakshatra Hotel &amp; Resort</p>
      <div><Link href="/privacy-policy">Privacy</Link><Link href="/terms-conditions">Terms</Link><Link href="/cancellation-refund-policy">Cancellation</Link></div>
      <div className="socials"><a href="https://www.instagram.com/nakshatrahotel/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera/></a><a href="#" aria-label="Facebook link pending confirmation"><MessageCircleMore/></a><a href="#" aria-label="YouTube link pending confirmation"><Video/></a></div>
    </div>
  </footer>;
}
