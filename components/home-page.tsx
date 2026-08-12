"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, MapPin, Star, Waves, UtensilsCrossed, PartyPopper, Wifi, Car, Flower2, Baby, Presentation, Gamepad2, Clock3, Sparkles, Coffee, Quote, Building2, Trees, BriefcaseBusiness, CarFront, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { amenities } from "@/lib/content";
import { BookingWidget } from "./booking-widget";
import { LiveRoomGrid } from "./live-room-grid";

const icons = { Waves, UtensilsCrossed, PartyPopper, Wifi, Car, Flower2, Baby, Presentation, Gamepad2, Clock3, Sparkles, Coffee };
const heroSlides = [
  { image: "/images/wedding-garden.jpg", alt: "Nakshatra wedding garden and resort lawns", label: "Wedding garden", eyebrow: "CELEBRATIONS · OPEN SKIES", className: "hero-slide-pool" },
  { image: "/images/restaurant-gallery/nakshatra18.jpeg", alt: "Elegant dining inside the Nakshatra restaurant", label: "Fine dining", eyebrow: "RESTAURANT · CELEBRATION DINING", className: "hero-slide-restaurant" },
  { image: "/images/main-front-facade.webp", alt: "Main façade and arrival entrance of Nakshatra Hotel & Resort", label: "The resort", eyebrow: "WEDDING · STAY · RESTAURANT", className: "hero-slide-resort" },
] as const;

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  useEffect(() => {
    const timer = window.setInterval(() => setActiveHeroSlide(current => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);
  const changeHeroSlide = (direction: number) => setActiveHeroSlide(current => (current + direction + heroSlides.length) % heroSlides.length);
  return <main>
    <section className="hero" ref={heroRef}>
      <motion.div className="hero-image hero-slider" style={{ y: imageY }}>{heroSlides.map((slide, index) => <motion.figure className={`hero-slide ${slide.className}`} key={slide.image} aria-hidden={index !== activeHeroSlide} animate={{ opacity: index === activeHeroSlide ? 1 : 0, scale: index === activeHeroSlide ? 1.075 : 1.015 }} transition={{ opacity: { duration: 1.35, ease: "easeInOut" }, scale: { duration: 7.2, ease: "linear" } }}><img src={slide.image} alt={index === activeHeroSlide ? slide.alt : ""}/></motion.figure>)}</motion.div>
      <div className="hero-vignette"/><div className="hero-rays"/>
      <div className="orbital-art" aria-hidden="true"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="floating-star">✦</span></div>
      <motion.div className="hero-content" style={{ y: textY }}>
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="coming-soon-pill">
          <span className="pulse-dot" />
          <span>✦ WEBSITE UNDER MAINTENANCE ✦</span>
        </motion.div>
        <motion.p className="hero-eyebrow" key={heroSlides[activeHeroSlide].eyebrow} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><span/>NAKSHATRA HOTEL &amp; RESORT · KHARGONE<span/></motion.p>
        <h1>Website Under<br/><em>Maintenance.</em></h1>
        <p className="hero-copy">Our website is currently undergoing maintenance and updates to serve you better. For stays, wedding bookings, event inquiries and restaurant reservations, please contact us directly via phone or WhatsApp.</p>
        <div className="hero-actions"><a href="tel:+919425088369" className="gold-button">Call for Inquiries <PhoneCall/></a><a href="https://wa.me/919425088369" target="_blank" rel="noreferrer" className="text-link">WhatsApp Us <span>↗</span></a></div>
        <div className="hero-slider-nav" aria-label="Choose hero image"><button onClick={() => changeHeroSlide(-1)} aria-label="Previous hero image"><ChevronLeft/></button><div>{heroSlides.map((slide, index) => <button className={index === activeHeroSlide ? "active" : ""} key={slide.label} onClick={() => setActiveHeroSlide(index)} aria-label={`Show ${slide.label} image`}><span/>{slide.label}</button>)}</div><button onClick={() => changeHeroSlide(1)} aria-label="Next hero image"><ChevronRight/></button></div>
      </motion.div>
      <div className="hero-location"><MapPin/>Sanawad Road · Jaitapur · Khargone</div>
      <a className="scroll-cue" href="#maintenance-board" aria-label="Scroll to details"><span>SCROLL</span><ChevronDown/></a>
    </section>
    <div className="booking-wrap"><BookingWidget/></div>

    <section className="coming-soon-section section-shell" id="maintenance-board">
      <motion.div 
        className="coming-soon-board"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="coming-soon-header">
          <span className="coming-soon-badge-tag">
            <Sparkles /> WEBSITE UNDER MAINTENANCE · KHARGONE
          </span>
          <span className="coming-soon-location-tag">
            SANAWAD ROAD · JAITAPUR
          </span>
        </div>
        
        <h2>We are enhancing our digital<br />resort &amp; guest <em>experience.</em></h2>
        <p className="lead">
          Nakshatra Hotel &amp; Resort's official website is currently under maintenance. Our 60 luxury rooms, 5,500 sq ft grand banquet hall, open-air wedding garden, guest swimming pool, multi-cuisine restaurant, and grand parking are all available for inquiries and reservations via phone or WhatsApp.
        </p>

        <div className="coming-soon-features">
          <div className="coming-soon-feature-item">
            <Building2 /> <span>60 Luxury Rooms &amp; Suites</span>
          </div>
          <div className="coming-soon-feature-item">
            <PartyPopper /> <span>5,500 Sq Ft Banquet Hall</span>
          </div>
          <div className="coming-soon-feature-item">
            <Trees /> <span>Lush Wedding Garden</span>
          </div>
          <div className="coming-soon-feature-item">
            <Waves /> <span>Guest Swimming Pool</span>
          </div>
          <div className="coming-soon-feature-item">
            <UtensilsCrossed /> <span>Multi-Cuisine Restaurant</span>
          </div>
          <div className="coming-soon-feature-item">
            <CarFront /> <span>Khargone’s Biggest Parking</span>
          </div>
        </div>

        <div className="coming-soon-actions">
          <a href="tel:+919425088369" className="gold-button">
            Call +91-94250-88369 <PhoneCall />
          </a>
          <div className="coming-soon-contacts">
            <a href="tel:+919893488369"><PhoneCall /> +91-98934-88369</a>
            <a href="https://wa.me/919425088369" target="_blank" rel="noreferrer">WhatsApp Inquiry ↗</a>
          </div>
        </div>
      </motion.div>
    </section>


    <section className="intro-section section-shell">
      <motion.div className="intro-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }}>
        <p className="kicker">A SANCTUARY IN KHARGONE</p>
        <h2>Where every arrival<br/>feels <em>written in the stars.</em></h2>
      </motion.div>
      <div className="intro-aside"><p>Just ~3 km from Khargone Bus Stand, Nakshatra brings together 60 rooms, generous leisure spaces and thoughtful hospitality in one serene address.</p><Link className="arrow-link" href="/our-story">Our story <ArrowRight/></Link></div>
      <div className="stats-row"><div><b>60</b><span>ROOMS &amp; SUITES</span></div><div><b>4</b><span>ROOM CATEGORIES</span></div><div><b>5,500</b><span>SQ FT BANQUET HALL</span></div><div><b>24/7</b><span>FRONT DESK</span></div></div>
    </section>

    <section className="home-story section-shell">
      <div className="home-story-image"><img src="/images/story-resort.jpg" alt="Nakshatra Hotel & Resort exterior and lawns" loading="lazy"/><div className="story-number glass-panel"><b>60</b><span>ROOMS<br/>ONE COMPLETE ADDRESS</span></div></div>
      <div className="home-story-copy"><p className="kicker">OUR STORY</p><h2>Many reasons<br/>to <em>arrive.</em></h2><p>Nakshatra is designed to be useful in many different ways: a restful stop in Khargone, a comfortable business stay, a family meal, a wedding destination or a full day of celebration.</p><p>Rooms, dining, a guest pool, lawns, meeting spaces, event venues and grand parking come together so hosts and guests can spend less time moving between places—and more time in the moment.</p><Link className="gold-button" href="/our-story">Discover our story <ArrowRight/></Link></div>
    </section>

    <section className="experience-showcase">
      <div className="experience-image"><img src="/images/ground-floor-pool-gallery/nakshatra10.jpeg" alt="Ground-floor guest pool at Nakshatra" loading="lazy"/></div>
      <div className="experience-card glass-panel"><p className="kicker">INCLUDED WITH YOUR STAY</p><h2>A refreshing pause,<br/><em>inside the resort.</em></h2><p>Registered room guests can enjoy the ground-floor pool during confirmed hotel operating hours.</p><Link className="gold-button" href="/ground-floor-pool">Explore the guest pool <ArrowRight/></Link></div>
      <div className="pool-stamp"><Waves/><span>GUEST POOL<br/>WITH YOUR STAY</span></div>
    </section>

    <section className="rooms-section section-shell">
      <div className="section-head"><div><p className="kicker">FOUR WAYS TO STAY</p><h2>Your room,<br/><em>your retreat.</em></h2></div><p>Choose an Executive, Deluxe, Family or Suite room thoughtfully matched to the way you travel.</p></div>
      <LiveRoomGrid priorityFirst/>
      <Link className="outline-button" href="/rooms">View all rooms <ArrowRight/></Link>
    </section>

    <section className="celebrations-home">
      <div className="section-shell"><div className="celebrations-head"><div><p className="kicker">VENUES FOR EVERY OCCASION</p><h2>Celebrate your way.<br/><em>We have the setting.</em></h2></div><p>Choose a grand indoor hall, an open wedding garden, a focused meeting setting or bring everything together with a complete event-planning conversation.</p></div>
      <div className="venue-home-grid">
        <Link href="/wedding-hall"><img src="/images/grand-hall-gallery/nakshatra69.jpeg" alt="The Nakshatra Grand Hall prepared for a wedding" loading="lazy"/><div><span><Building2/> GRAND INDOOR VENUE</span><h3>The Grand Hall</h3><p>Approximately 5,500 sq ft for luminous indoor celebrations.</p><b>Explore the hall <ArrowRight/></b></div></Link>
        <Link href="/wedding-garden"><img src="/images/wedding-garden.jpg" alt="Nakshatra lawns and wedding garden" loading="lazy"/><div><span><Trees/> OPEN-AIR CELEBRATIONS</span><h3>Wedding Garden</h3><p>Lush outdoor space for ceremonies and receptions.</p><b>Explore the garden <ArrowRight/></b></div></Link>
        <Link href="/business-meetings"><img src="/images/business-meeting.jpg" alt="Nakshatra hall arranged for a corporate event" loading="lazy"/><div><span><BriefcaseBusiness/> BUSINESS &amp; CONFERENCE</span><h3>Business Meetings</h3><p>Meet, dine and stay within one Khargone address.</p><b>Plan a meeting <ArrowRight/></b></div></Link>
        <Link href="/event-planning"><img src="/images/party.jpg" alt="Nakshatra hall arranged for a private party" loading="lazy"/><div><span><PartyPopper/> FULL-SERVICE OCCASIONS</span><h3>Full Event Planning</h3><p>Weddings, birthdays, parties and group gatherings.</p><b>Plan your event <ArrowRight/></b></div></Link>
      </div></div>
    </section>

    <section className="amenities-section">
      <div className="section-shell"><p className="kicker">EVERYTHING, CONSIDERED</p><div className="amenities-title"><h2>More than a stay.<br/><em>A world within.</em></h2><p>Spaces for stillness, play, celebration and connection—gathered in one verdant retreat.</p></div>
      <div className="amenities-grid">{amenities.map(([icon, label], i) => { const Icon = icons[icon as keyof typeof icons]; return <motion.div key={label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * .035, .3) }} viewport={{ once: true }} className="amenity"><span className="gold-icon"><Icon/></span><span>{label}</span></motion.div>; })}</div>
      <Link className="arrow-link light" href="/amenities">Discover every amenity <ArrowRight/></Link></div>
    </section>

    <section className="dual-experience section-shell">
      <Link href="/wedding" className="editorial-card"><img src="/images/wedding.jpg" alt="Nakshatra wedding hall dressed for a celebration" loading="lazy"/><div><p className="kicker">CELEBRATE</p><h3>Make it<br/><em>unforgettable.</em></h3><span>Weddings &amp; occasions <ArrowRight/></span></div></Link>
      <Link href="/restaurant" className="editorial-card"><img src="/images/restaurant.jpg" alt="Nakshatra multi-cuisine restaurant" loading="lazy"/><div><p className="kicker">DINE</p><h3>Flavours worth<br/><em>lingering over.</em></h3><span>Discover our restaurant <ArrowRight/></span></div></Link>
    </section>

    <section className="parking-home">
      <div className="parking-home-image"><img src="/images/parking.jpg" alt="Nakshatra Hotel & Resort arrival exterior" loading="lazy"/></div>
      <div className="parking-home-copy"><span className="parking-icon"><CarFront/></span><p className="kicker">ARRIVE WITH EASE</p><h2>Grand parking<br/>for <em>big occasions.</em></h2><p>Khargone’s biggest parking area is one of Nakshatra’s most valuable practical advantages—especially for weddings, business meetings, parties and group stays.</p><p>For a larger gathering, share your approximate vehicle expectations and arrival windows so parking can be considered as part of the event plan.</p><Link className="arrow-link light" href="/parking">Explore parking & arrivals <ArrowRight/></Link></div>
    </section>

    <section className="review-section section-shell">
      <div className="review-mark"><Quote/></div><div className="stars"><Star/><Star/><Star/><Star/><Star/></div>
      <blockquote>“A peaceful setting, generous spaces and warm hospitality—the kind of place that turns a simple stay into a lasting memory.”</blockquote>
      <p>Preview testimonial · Replace with an approved guest review</p>
      <Link className="arrow-link" href="/reviews">Read guest stories <ArrowRight/></Link>
    </section>
  </main>;
}
