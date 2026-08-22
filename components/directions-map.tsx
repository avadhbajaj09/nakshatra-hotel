"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, MessageCircle, Clock, Car } from "lucide-react";

// Hotel coordinates
const HOTEL_LAT = 22.0121;
const HOTEL_LNG = 75.6206;
const HOTEL_ADDRESS = "Sanawad Rd, Jaitapur, Khargone, Madhya Pradesh 451001";
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

export function DirectionsMap() {
  const locationRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLElement>(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [formData, setFormData] = useState({ locality: "", state: "", postal: "", country: "" });

  useEffect(() => {
    // Load the Extended Component Library script
    if (document.querySelector('script[data-gmpx]')) { setMapsLoaded(true); return; }
    const script = document.createElement("script");
    script.type = "module";
    script.setAttribute("data-gmpx", "true");
    script.textContent = `import {APILoader} from 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.15/index.min.js';`;
    document.head.appendChild(script);

    const timer = setTimeout(() => setMapsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mapsLoaded || !locationRef.current) return;

    const SHORT_NAME_TYPES = new Set(["street_number", "administrative_area_level_1", "postal_code"]);

    async function initAutocomplete() {
      try {
        // @ts-ignore
        const { Autocomplete } = await (window as any).google?.maps?.importLibrary?.("places") ?? {};
        if (!Autocomplete) return;

        const autocomplete = new Autocomplete(locationRef.current!, {
          fields: ["address_components", "geometry", "name"],
          types: ["address"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) return;

          // Update map
          const mapEl = mapRef.current as any;
          const markerEl = markerRef.current as any;
          if (mapEl && place.geometry.location) {
            mapEl.center = place.geometry.location;
            if (markerEl) markerEl.position = place.geometry.location;
          }

          // Fill form fields
          const getComp = (type: string) => {
            const comp = place.address_components?.find((c: any) => c.types[0] === type);
            return comp ? (SHORT_NAME_TYPES.has(type) ? comp.short_name : comp.long_name) : "";
          };
          const streetNum = getComp("street_number");
          const route = getComp("route");
          setSelectedAddress(`${streetNum} ${route}`.trim() || place.name || "");
          setFormData({
            locality: getComp("locality"),
            state: getComp("administrative_area_level_1"),
            postal: getComp("postal_code"),
            country: getComp("country"),
          });
        });
      } catch (e) {
        // Google Maps not available yet
      }
    }
    initAutocomplete();
  }, [mapsLoaded]);

  const getDirections = () => {
    const dest = encodeURIComponent(HOTEL_ADDRESS);
    const url = selectedAddress
      ? `https://www.google.com/maps/dir/${encodeURIComponent(selectedAddress)}/${dest}`
      : `https://www.google.com/maps/search/?api=1&query=${dest}`;
    window.open(url, "_blank", "noreferrer");
  };

  const wazeLink = `https://waze.com/ul?ll=${HOTEL_LAT},${HOTEL_LNG}&navigate=yes`;
  const appleMapsLink = `https://maps.apple.com/?daddr=${HOTEL_LAT},${HOTEL_LNG}&dirflg=d`;

  return (
    <div className="dir-root">
      {/* API Loader — injected as web component */}
      {MAPS_API_KEY && React.createElement("gmpx-api-loader", {
        key: MAPS_API_KEY,
        "solution-channel": "GMP_QB_addressselection_v4_cABC",
      })}

      {/* ── HERO ── */}
      <div className="dir-hero">
        <div className="dir-hero-inner">
          <p className="kicker">✦ NAKSHATRA HOTEL &amp; RESORT · KHARGONE</p>
          <h1 className="dir-title">Find your way<br/><em>to Nakshatra.</em></h1>
          <p className="dir-subtitle">
            We are on Sanawad Road, Jaitapur, Khargone, Madhya Pradesh — about 3 km from Khargone Bus Stand.
          </p>
          <div className="dir-quick-links">
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL_ADDRESS)}`} target="_blank" rel="noreferrer" className="dir-app-btn google">
              <MapPin size={16}/> Google Maps
            </a>
            <a href={wazeLink} target="_blank" rel="noreferrer" className="dir-app-btn waze">
              <Navigation size={16}/> Waze
            </a>
            <a href={appleMapsLink} target="_blank" rel="noreferrer" className="dir-app-btn apple">
              <Navigation size={16}/> Apple Maps
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
            <p>We&apos;ll open Google Maps with step-by-step directions directly to Nakshatra.</p>
          </div>

          <div className="dir-form-map-wrap">
            {/* Form Panel */}
            <div className="dir-form-panel">
              <div className="dir-form-group">
                <label className="dir-label">Your starting address</label>
                <input
                  ref={locationRef as any}
                  type="text"
                  placeholder="Start typing your address…"
                  className="dir-input dir-input-main"
                  defaultValue={selectedAddress}
                />
              </div>
              <div className="dir-form-group">
                <label className="dir-label">Apt, Suite, etc. (optional)</label>
                <input type="text" placeholder="Flat no., building, landmark…" className="dir-input"/>
              </div>
              <div className="dir-form-row">
                <div className="dir-form-group dir-half">
                  <label className="dir-label">City</label>
                  <input type="text" placeholder="City" className="dir-input" value={formData.locality} onChange={e => setFormData(p => ({...p, locality: e.target.value}))}/>
                </div>
                <div className="dir-form-group dir-half">
                  <label className="dir-label">State / Province</label>
                  <input type="text" placeholder="State" className="dir-input" value={formData.state} onChange={e => setFormData(p => ({...p, state: e.target.value}))}/>
                </div>
              </div>
              <div className="dir-form-row">
                <div className="dir-form-group dir-half">
                  <label className="dir-label">Zip / Postal code</label>
                  <input type="text" placeholder="Postal code" className="dir-input" value={formData.postal} onChange={e => setFormData(p => ({...p, postal: e.target.value}))}/>
                </div>
                <div className="dir-form-group dir-half">
                  <label className="dir-label">Country</label>
                  <input type="text" placeholder="Country" className="dir-input" value={formData.country} onChange={e => setFormData(p => ({...p, country: e.target.value}))}/>
                </div>
              </div>
              <button className="dir-cta-btn" onClick={getDirections}>
                <Navigation size={18}/> Get Directions
              </button>
              <p className="dir-cta-note">Opens Google Maps in a new tab with full turn-by-turn navigation.</p>
            </div>

            {/* Map Panel */}
            <div className="dir-map-panel">
              {MAPS_API_KEY ? (
                React.createElement("gmp-map", {
                  ref: mapRef,
                  center: `${HOTEL_LAT},${HOTEL_LNG}`,
                  zoom: "14",
                  "map-id": "DEMO_MAP_ID",
                  style: { width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden" },
                },
                  React.createElement("gmp-advanced-marker", {
                    ref: markerRef,
                    position: `${HOTEL_LAT},${HOTEL_LNG}`,
                  })
                )
              ) : (
                <iframe
                  src={`https://maps.google.com/maps?q=${HOTEL_LAT},${HOTEL_LNG}&z=14&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "16px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nakshatra Hotel & Resort location"
                />
              )}
            </div>
          </div>
        </section>

        {/* ── INFO CARDS ── */}
        <section className="dir-info-section">
          <div className="dir-info-grid">
            <div className="dir-info-card">
              <span className="dir-info-icon"><MapPin size={24}/></span>
              <p className="kicker">ADDRESS</p>
              <h3>Nakshatra Hotel &amp; Resort</h3>
              <p>Sanawad Rd, Jaitapur<br/>Khargone, Madhya Pradesh 451001</p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL_ADDRESS)}`} target="_blank" rel="noreferrer">
                View on Google Maps →
              </a>
            </div>
            <div className="dir-info-card">
              <span className="dir-info-icon"><Car size={24}/></span>
              <p className="kicker">BY ROAD</p>
              <h3>Easy to reach</h3>
              <p>~3 km from Khargone Bus Stand<br/>~95 km from Indore via NH3<br/>Grand free parking on arrival</p>
              <a href={`https://wa.me/919425088369?text=Hello%20Nakshatra%2C%20I%20need%20directions%20to%20the%20hotel.`} target="_blank" rel="noreferrer">
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
              <p className="kicker">CONTACT US</p>
              <h3>We&apos;ll help you arrive</h3>
              <p>Call or WhatsApp our front desk for live directions, pickup arrangements or any questions.</p>
              <a href="https://wa.me/919425088369?text=Hello%20Nakshatra%2C%20I%20need%20help%20finding%20the%20hotel." target="_blank" rel="noreferrer">
                WhatsApp Us →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
