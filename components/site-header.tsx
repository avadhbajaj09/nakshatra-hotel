"use client";

import Link from "next/link";
import { Menu, X, Phone, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="top-coming-soon-bar">
        <span className="pulse-dot" />
        <span>✦ WEBSITE UNDER MAINTENANCE · FOR INQUIRIES CALL +91 94250 88369 / +91 98934 88369 ✦</span>
      </div>
      <header className={`site-header ${compact ? "is-compact" : ""}`}>
        <div className="nav-shell glass-panel">
          <Link className="brand" href="/" aria-label="Nakshatra Hotel & Resort home">
            <img className="official-brand-logo" src="/images/nakshatra-logo-gold-transparent-v2.png" alt="Nakshatra Hotel & Resort"/>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <div className="nav-actions">
            <a className="icon-link" href="tel:+919425088369" aria-label="Call hotel"><Phone size={17}/></a>
            <a className="gold-button nav-book" href="tel:+919425088369"><Wrench size={16}/> <span>Under Maintenance</span></a>
            <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
          </div>
        </div>
        {open && <div className="mobile-nav glass-panel">
          {nav.map((item) => <Link onClick={() => setOpen(false)} key={item.href} href={item.href}>{item.label}<span>↗</span></Link>)}
          <a href="tel:+919425088369">Call +91 94250 88369</a>
        </div>}
      </header>
    </>
  );
}
