"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Wrench, MessageCircle, Building2, PartyPopper, Trees, Waves, UtensilsCrossed, CarFront, Sparkles } from "lucide-react";

export function MaintenancePage() {
  return (
    <main className="maintenance-screen">
      <div className="maintenance-bg">
        <img src="/images/main-front-facade.webp" alt="Nakshatra Hotel & Resort" className="maintenance-bg-img" />
        <div className="maintenance-overlay" />
        <div className="orbital-art" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="floating-star">✦</span>
        </div>
      </div>

      <div className="maintenance-content section-shell">
        <motion.div 
          className="maintenance-card glass-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="maintenance-logo-wrap">
            <img 
              src="/images/nakshatra-logo-gold-transparent-v2.png" 
              alt="Nakshatra Hotel & Resort" 
              className="maintenance-logo"
            />
          </div>

          <div className="coming-soon-pill">
            <span className="pulse-dot" />
            <span>✦ WEBSITE UNDER MAINTENANCE ✦</span>
          </div>

          <p className="kicker">NAKSHATRA HOTEL &amp; RESORT · KHARGONE</p>

          <h1>We Are Upgrading Our<br />Digital <em>Experience.</em></h1>

          <p className="maintenance-lead">
            Our official website is currently undergoing maintenance and upgrades to serve you better. 
            Our 60 luxury rooms, 5,500 sq ft grand banquet hall, open-air wedding garden, guest swimming pool, 
            multi-cuisine restaurant, and grand parking are fully operational. For room bookings, wedding reservations, 
            and dining inquiries, please call or WhatsApp us directly.
          </p>

          <div className="coming-soon-features maintenance-grid">
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

          <div className="maintenance-contact-box">
            <div className="contact-item">
              <Phone className="gold-icon-sm" />
              <div>
                <small>DIRECT PHONE INQUIRIES</small>
                <div className="phone-links">
                  <a href="tel:+919425088369">+91 94250 88369</a>
                  <span className="divider">·</span>
                  <a href="tel:+919893488369">+91 98934 88369</a>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <MapPin className="gold-icon-sm" />
              <div>
                <small>RESORT LOCATION</small>
                <p className="location-text">Sanawad Road, Jaitapur, Khargone, Madhya Pradesh 451001</p>
              </div>
            </div>
          </div>

          <div className="maintenance-actions">
            <a href="tel:+919425088369" className="gold-button">
              <Phone size={18} /> Call Us Now
            </a>
            <a href="https://wa.me/919479793778" target="_blank" rel="noreferrer" className="whatsapp-button">
              <MessageCircle size={18} /> WhatsApp Inquiry
            </a>
          </div>

          <div className="maintenance-footer-note">
            <p>© {new Date().getFullYear()} Nakshatra Hotel &amp; Resort · All Rights Reserved</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
