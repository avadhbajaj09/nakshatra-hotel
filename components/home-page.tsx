"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, Star, Waves, UtensilsCrossed, PartyPopper, Wifi, Car, Flower2, Baby, Presentation, Gamepad2, Clock3, Sparkles, Coffee, Quote } from "lucide-react";
import { useRef } from "react";
import { amenities, rooms } from "@/lib/content";
import { BookingWidget } from "./booking-widget";
import { RoomCard } from "./room-card";

const icons = { Waves, UtensilsCrossed, PartyPopper, Wifi, Car, Flower2, Baby, Presentation, Gamepad2, Clock3, Sparkles, Coffee };

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  return <main>
    <section className="hero" ref={heroRef}>
      <motion.div className="hero-image" style={{ y: imageY }}><img src="/images/hero-resort.jpg" alt="Generic luxury resort placeholder"/><span className="image-label hero-label">GENERIC HERO · REPLACE WITH NAKSHATRA EXTERIOR / POOL AT DUSK</span></motion.div>
      <div className="hero-vignette"/><div className="hero-rays"/>
      <div className="orbital-art" aria-hidden="true"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="floating-star">✦</span></div>
      <motion.div className="hero-content" style={{ y: textY }}>
        <p className="hero-eyebrow"><span/>WEDDING · STAY · RESTAURANT<span/></p>
        <h1>Ethereal stay<br/>in the lap of <em>luxury.</em></h1>
        <p className="hero-copy">A resort-style retreat in Khargone, shaped for unhurried stays, luminous celebrations and memorable dining.</p>
        <div className="hero-actions"><a href="#book" className="gold-button">Reserve your escape <ArrowRight/></a><Link href="/experience" className="text-link">Discover Nakshatra <span>↗</span></Link></div>
      </motion.div>
      <div className="hero-location"><MapPin/>Sanawad Road · Jaitapur · Khargone</div>
      <a className="scroll-cue" href="#book" aria-label="Scroll to booking"><span>SCROLL</span><ChevronDown/></a>
    </section>
    <div className="booking-wrap"><BookingWidget/></div>

    <section className="intro-section section-shell">
      <motion.div className="intro-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }}>
        <p className="kicker">A SANCTUARY IN KHARGONE</p>
        <h2>Where every arrival<br/>feels <em>written in the stars.</em></h2>
      </motion.div>
      <div className="intro-aside"><p>Just ~3 km from Khargone Bus Stand, Nakshatra brings together 53 rooms, generous leisure spaces and thoughtful hospitality in one serene address.</p><Link className="arrow-link" href="/about">Our story <ArrowRight/></Link></div>
      <div className="stats-row"><div><b>53</b><span>ROOMS &amp; SUITES</span></div><div><b>5,500</b><span>SQ FT BANQUET HALL</span></div><div><b>3</b><span>KM FROM BUS STAND</span></div><div><b>24/7</b><span>FRONT DESK</span></div></div>
    </section>

    <section className="experience-showcase">
      <div className="experience-image"><img src="/images/pool.jpg" alt="Generic infinity pool placeholder" loading="lazy"/><span className="image-label">GENERIC IMAGE · NEED WIDE POOL AT GOLDEN HOUR</span></div>
      <div className="experience-card glass-panel"><p className="kicker">THE NAKSHATRA EXPERIENCE</p><h2>Days that move<br/>at your <em>rhythm.</em></h2><p>Begin with breakfast, slip into an afternoon by the water, gather over a generous meal and let the evening unfold across lush lawns.</p><Link className="gold-button" href="/experience">Explore the experience <ArrowRight/></Link></div>
      <div className="pool-stamp"><Waves/><span>INFINITY<br/>EDGE POOL</span></div>
    </section>

    <section className="rooms-section section-shell">
      <div className="section-head"><div><p className="kicker">SIX WAYS TO STAY</p><h2>Your room,<br/><em>your retreat.</em></h2></div><p>From efficient comfort to expansive family stays, discover a room thoughtfully matched to the way you travel.</p></div>
      <div className="room-grid">{rooms.map((room, i) => <RoomCard key={room.slug} room={room} priority={i === 0}/>)}</div>
      <Link className="outline-button" href="/rooms">View all rooms <ArrowRight/></Link>
    </section>

    <section className="amenities-section">
      <div className="section-shell"><p className="kicker">EVERYTHING, CONSIDERED</p><div className="amenities-title"><h2>More than a stay.<br/><em>A world within.</em></h2><p>Spaces for stillness, play, celebration and connection—gathered in one verdant retreat.</p></div>
      <div className="amenities-grid">{amenities.map(([icon, label], i) => { const Icon = icons[icon as keyof typeof icons]; return <motion.div key={label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * .035, .3) }} viewport={{ once: true }} className="amenity"><span className="gold-icon"><Icon/></span><span>{label}</span></motion.div>; })}</div>
      <Link className="arrow-link light" href="/amenities">Discover every amenity <ArrowRight/></Link></div>
    </section>

    <section className="dual-experience section-shell">
      <Link href="/wedding" className="editorial-card"><img src="/images/wedding.jpg" alt="Generic luxury wedding placeholder" loading="lazy"/><span className="image-label">GENERIC IMAGE · NEED NAKSHATRA WEDDING / BANQUET</span><div><p className="kicker">CELEBRATE</p><h3>Make it<br/><em>unforgettable.</em></h3><span>Weddings &amp; occasions <ArrowRight/></span></div></Link>
      <Link href="/restaurant" className="editorial-card"><img src="/images/restaurant.jpg" alt="Generic restaurant placeholder" loading="lazy"/><span className="image-label">GENERIC IMAGE · NEED RESTAURANT AMBIENCE / SIGNATURE DISH</span><div><p className="kicker">DINE</p><h3>Flavours worth<br/><em>lingering over.</em></h3><span>Discover our restaurant <ArrowRight/></span></div></Link>
    </section>

    <section className="review-section section-shell">
      <div className="review-mark"><Quote/></div><div className="stars"><Star/><Star/><Star/><Star/><Star/></div>
      <blockquote>“A peaceful setting, generous spaces and warm hospitality—the kind of place that turns a simple stay into a lasting memory.”</blockquote>
      <p>Preview testimonial · Replace with an approved guest review</p>
      <Link className="arrow-link" href="/reviews">Read guest stories <ArrowRight/></Link>
    </section>
  </main>;
}
