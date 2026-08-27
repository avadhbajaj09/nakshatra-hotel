"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, MessageCircle, Clock, Car, Compass, Layers, Image as ImageIcon, ExternalLink } from "lucide-react";

// Hotel coordinates & address
const HOTEL_LAT = 22.0121;
const HOTEL_LNG = 75.6206;
const HOTEL_ADDRESS = "Sanawad Rd, Jaitapur, Near D-Mart, Khargone, Madhya Pradesh 451001";
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

export function DirectionsMap() {
  const locationRef = useRef<HTMLInputElement>(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [viewMode, setViewMode] = useState<"map" | "satellite" | "photo">("map");
  const [formData, setFormData] = useState({ locality: "", state: "", postal: "", country: "" });

  useEffect(() => {
    // Dynamically load Google Maps Places Autocomplete if API key is provided
    if (!MAPS_API_KEY || typeof window === "undefined") return;

    if (!(window as any).google?.maps?.places) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }

    function initAutocomplete() {
      if (!locationRef.current || !(window as any).google?.maps?.places?.Autocomplete) return;

      const autocomplete = new (window as any).google.maps.places.Autocomplete(locationRef.current, {
        types: ["geocode", "establishment"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const streetNum = place.address_components?.find((c: any) => c.types.includes("street_number"))?.long_name || "";
        const route = place.address_components?.find((c: any) => c.types.includes("route"))?.long_name || "";
        const city = place.address_components?.find((c: any) => c.types.includes("locality"))?.long_name || "";
        const state = place.address_components?.find((c: any) => c.types.includes("administrative_area_level_1"))?.long_name || "";
        const postal = place.address_components?.find((c: any) => c.types.includes("postal_code"))?.long_name || "";
        const country = place.address_components?.find((c: any) => c.types.includes("country"))?.long_name || "";

        const fullAddr = `${streetNum} ${route}`.trim() || place.name || "";
        setSelectedAddress(fullAddr);
        setFormData({ locality: city, state, postal, country });
      });
    }
  }, []);

  const getDirections = () => {
    const dest = encodeURIComponent(HOTEL_ADDRESS);
    const origin = selectedAddress ? encodeURIComponent(selectedAddress) : "";
    const url = origin
      ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`
      : `https://www.google.com/maps/search/?api=1&query=${dest}`;
    window.open(url, "_blank", "noreferrer");
  };

  const wazeLink = `https://waze.com/ul?ll=${HOTEL_LAT},${HOTEL_LNG}&navigate=yes`;
  const appleMapsLink = `https://maps.apple.com/?daddr=${HOTEL_LAT},${HOTEL_LNG}&dirflg=d`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Hotel Nakshatra and Resort, Sanawad Road, Khargone, Madhya Pradesh 451001")}`;

  const embedMapUrl = viewMode === "satellite"
    ? `https://maps.google.com/maps?q=Hotel+Nakshatra+and+Resort+Khargone&t=k&z=16&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=Hotel+Nakshatra+and+Resort+Khargone,+Sanawad+Road,+Madhya+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="dir-root">
      {/* ── HERO ── */}
      <div className="dir-hero">
        <div className="dir-hero-inner">
          <p className="kicker">✦ HOTEL NAKSHATRA &amp; RESORT · KHARGONE</p>
          <h1 className="dir-title">Find your way<br/><em>to Nakshatra.</em></h1>
          <p className="dir-subtitle">
            Conveniently located Near D-Mart on Sanawad Road, Jaitapur, Khargone, Madhya Pradesh 451001.
          </p>
          <div className="dir-quick-links">
            <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="dir-app-btn google">
              <MapPin size={16}/> Open in Google Maps <ExternalLink size={12}/>
            </a>
            <a href={wazeLink} target="_blank" rel="noreferrer" className="dir-app-btn waze">
              <Navigation size={16}/> Open in Waze
            </a>
            <a href={appleMapsLink} target="_blank" rel="noreferrer" className="dir-app-btn apple">
              <Compass size={16}/> Apple Maps
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="dir-body">

        {/* ── ADDRESS FORM + MAP ── */}
        <section className="dir-map-section">
          <div className="dir-map-header">
            <p className="kicker">GET TURN-BY-TURN DIRECTIONS</p>
            <h2>Enter your starting<br/><em>address.</em></h2>
            <p>Type your city or location to get direct turn-by-turn navigation straight to Nakshatra Hotel &amp; Resort.</p>
          </div>

          <div className="dir-form-map-wrap">
            {/* Form Panel */}
            <div className="dir-form-panel">
              <div className="dir-form-group">
                <label className="dir-label">Your starting address / City</label>
                <input
                  ref={locationRef}
                  type="text"
                  placeholder="e.g. Indore, Maheshwar, Mumbai, Bhopal…"
                  className="dir-input dir-input-main"
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                />
              </div>
              <div className="dir-form-group">
                <label className="dir-label">Apt, Suite, Area (optional)</label>
                <input type="text" placeholder="Flat no., building, landmark…" className="dir-input"/>
              </div>
              <div className="dir-form-row">
                <div className="dir-form-group dir-half">
                  <label className="dir-label">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="dir-input"
                    value={formData.locality}
                    onChange={e => setFormData(p => ({...p, locality: e.target.value}))}
                  />
                </div>
                <div className="dir-form-group dir-half">
                  <label className="dir-label">State / Province</label>
                  <input
                    type="text"
                    placeholder="State"
                    className="dir-input"
                    value={formData.state}
                    onChange={e => setFormData(p => ({...p, state: e.target.value}))}
                  />
                </div>
              </div>
              <div className="dir-form-row">
                <div className="dir-form-group dir-half">
                  <label className="dir-label">Zip / Postal code</label>
                  <input
                    type="text"
                    placeholder="Postal code"
                    className="dir-input"
                    value={formData.postal}
                    onChange={e => setFormData(p => ({...p, postal: e.target.value}))}
                  />
                </div>
                <div className="dir-form-group dir-half">
                  <label className="dir-label">Country</label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="dir-input"
                    value={formData.country}
                    onChange={e => setFormData(p => ({...p, country: e.target.value}))}
                  />
                </div>
              </div>
              <button className="dir-cta-btn" onClick={getDirections}>
                <Navigation size={18}/> Get Turn-by-Turn Directions
              </button>
              <p className="dir-cta-note">Opens Google Maps with full live GPS routing directly to our entrance.</p>
            </div>

            {/* Map & View Panel */}
            <div className="dir-map-panel">
              {/* Map Controls Header */}
              <div className="dir-map-controls">
                <button
                  className={`dir-mode-btn ${viewMode === "map" ? "active" : ""}`}
                  onClick={() => setViewMode("map")}
                >
                  <MapPin size={14}/> Map View
                </button>
                <button
                  className={`dir-mode-btn ${viewMode === "satellite" ? "active" : ""}`}
                  onClick={() => setViewMode("satellite")}
                >
                  <Layers size={14}/> Satellite
                </button>
                <button
                  className={`dir-mode-btn ${viewMode === "photo" ? "active" : ""}`}
                  onClick={() => setViewMode("photo")}
                >
                  <ImageIcon size={14}/> Property View
                </button>
              </div>

              {/* View Content */}
              <div className="dir-map-frame-wrap">
                {viewMode === "photo" ? (
                  <div className="dir-photo-view">
                    <img
                      src="/images/main-front-facade.webp"
                      alt="Hotel Nakshatra & Resort Khargone Entrance"
                      className="dir-facade-img"
                    />
                    <div className="dir-photo-badge">
                      <p className="kicker">HOTEL NAKSHATRA &amp; RESORT</p>
                      <h3>Sanawad Road · Near D-Mart</h3>
                      <p>Khargone’s biggest luxury resort &amp; wedding destination</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={embedMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, width: "100%", height: "100%", minHeight: "440px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel Nakshatra & Resort Google Map"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── INFO CARDS ── */}
        <section className="dir-info-section">
          <div className="dir-info-grid">
            <div className="dir-info-card">
              <span className="dir-info-icon"><MapPin size={24}/></span>
              <p className="kicker">ADDRESS</p>
              <h3>Hotel Nakshatra &amp; Resort</h3>
              <p>Sanawad Rd, Jaitapur, Near D-Mart<br/>Khargone, Madhya Pradesh 451001</p>
              <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                View on Google Maps →
              </a>
            </div>
            <div className="dir-info-card">
              <span className="dir-info-icon"><Car size={24}/></span>
              <p className="kicker">BY ROAD</p>
              <h3>Easy to reach</h3>
              <p>Near D-Mart, Sanawad Road<br/>~50 km from Maheshwar Fort<br/>~75 km from Omkareshwar<br/>~95 km from Indore Airport (NH3)</p>
              <a href="https://wa.me/919479793778?text=Hello%20Nakshatra%2C%20I%20need%20help%20with%20directions%20to%20the%20hotel." target="_blank" rel="noreferrer">
                Ask on WhatsApp →
              </a>
            </div>
            <div className="dir-info-card">
              <span className="dir-info-icon"><Clock size={24}/></span>
              <p className="kicker">TIMINGS</p>
              <h3>Always welcoming</h3>
              <p>Front Desk: 24 hours<br/>Check-in: 12:00 PM<br/>Check-out: 10:00 AM</p>
              <a href="tel:+919425088369">Call +91 94250 88369 →</a>
            </div>
            <div className="dir-info-card">
              <span className="dir-info-icon"><MessageCircle size={24}/></span>
              <p className="kicker">ASSISTANCE</p>
              <h3>Need arrival help?</h3>
              <p>WhatsApp our concierge for live location sharing, pickup coordination, or parking directions.</p>
              <a href="https://wa.me/919479793778?text=Hello%20Nakshatra%20Hotel%2C%20I%20am%20on%20my%20way%20and%20need%20assistance." target="_blank" rel="noreferrer">
                WhatsApp Concierge →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
