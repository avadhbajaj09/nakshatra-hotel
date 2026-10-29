# SEO / AEO / GEO Implementation Report
**Hotel Nakshatra & Resort — nakshatrahotel.in**
*Generated: October 2025*

---

## What Was Implemented

### Phase 2 — Config + Metadata + Technical

| File | Change |
|------|--------|
| `lib/site-config.ts` | **NEW** — Single source of truth for all hotel data (NAP, geo, rooms, amenities, banquet, restaurant, policies, nearby landmarks, socials) |
| `app/[...slug]/page.tsx` | **UPGRADED** — Full `generateMetadata()` with 20+ unique page titles/descriptions/canonicals; blog post metadata; room product page metadata |
| `next.config.ts` | **UPGRADED** — non-www→www redirect, security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy), Cloudinary image remote pattern |
| `app/layout.tsx` | **FIXED** — `lang="en"` → `lang="en-IN"`, removed unverified `starRating: "4.8"` from JSON-LD |
| `.env.example` | **UPDATED** — Added GA, Maps Key, GSC verification, Cloudinary cloud name variables |

### Phase 3 — Schema Builders

| File | Change |
|------|--------|
| `lib/schema.ts` | **NEW** — Typed schema builder functions: `buildHotelSchema()`, `buildRestaurantSchema()`, `buildBanquetSchema()`, `buildFaqSchema()`, `buildBreadcrumbSchema()`, `buildArticleSchema()`, `buildRoomSchema()` |
| `components/json-ld.tsx` | **NEW** — Server component for injecting `<script type="application/ld+json">` |

### Phase 4 — New Pages + AEO Content

| File | Route | Primary Keyword |
|------|-------|-----------------|
| `components/banquet-hall-page.tsx` | `/banquet-hall` | banquet hall in Khargone |
| `components/party-venue-page.tsx` | `/party-venue` | birthday party venue in Khargone |
| `components/about-page.tsx` | `/about` | Nakshatra Hotel & Resort Khargone |
| `components/contact-page.tsx` | `/contact` | contact hotel Khargone |

All new pages include:
- Structured H1
- Quick Answer block (AEO — 40–80 words direct answer)
- FAQPage JSON-LD
- BreadcrumbList JSON-LD
- WhatsApp CTA
- `<details>/<summary>` FAQ accordion

### Phase 5 — GEO Files

| File | Change |
|------|--------|
| `public/llms.txt` | **REGENERATED** — from siteConfig data; added /about, /banquet-hall, /party-venue, /blog pages; "How to Reach" section; policy notes; pricing reference |
| `app/layout.tsx` | `lang="en-IN"` fixed (Phase 2) |
| `app/robots.ts` | **UPDATED** — Added `OAI-SearchBot` and `Claude-SearchBot` to AI crawlers allow list |

### Phase 6 — Blog Engine + 5 Posts

| File | Change |
|------|--------|
| `lib/blog-posts.ts` | **NEW** — Typed `BlogPost` type + 5 complete blog posts (800–1200 words each) |
| `components/blog-list-page.tsx` | **NEW** — `/blog` listing page |
| `components/blog-post-page.tsx` | **NEW** — Blog post template with Article + BreadcrumbList + FAQPage JSON-LD |
| `app/sitemap.ts` | **UPDATED** — Added `/banquet-hall` (0.9), `/party-venue` (0.85), `/about` (0.8), `/blog` (0.85), all 5 blog post URLs |

---

## Page-to-Keyword Map

| URL | Primary Keyword | Title |
|-----|-----------------|-------|
| `/` | hotel in Khargone | Hotel Nakshatra & Resort \| Best Luxury Resort & Hotel in Khargone MP |
| `/rooms` | AC rooms in Khargone | AC Rooms in Khargone \| Nakshatra Hotel & Resort |
| `/restaurant` | restaurant in Khargone | Restaurant in Khargone \| Nakshatra Hotel & Resort |
| `/banquet-hall` | banquet hall in Khargone | Banquet Hall in Khargone \| Nakshatra Grand Hall |
| `/party-venue` | birthday party venue Khargone | Birthday Party Venue Khargone \| Nakshatra Resort |
| `/wedding` | wedding hall in Khargone | Wedding Hall in Khargone \| Nakshatra Resort |
| `/contact` | contact hotel Khargone | Contact \| Hotel Near Khargone \| Nakshatra Resort |
| `/directions` | directions to hotel Khargone | Directions to Nakshatra Hotel Khargone \| Near D-Mart |
| `/gallery` | Nakshatra Hotel photos | Nakshatra Hotel Khargone Photos \| Rooms & Banquet |
| `/faq` | hotel FAQs Khargone | FAQs \| Hotel in Khargone \| Nakshatra Hotel & Resort |
| `/about` | about Nakshatra Hotel | About Nakshatra Hotel & Resort Khargone |
| `/best-food-in-khargone` | best food in Khargone | Best Food in Khargone \| Nakshatra Restaurant |
| `/explore-khargone` | explore Khargone | Explore Khargone \| Places to Visit & Stay Guide |
| `/blog` | Khargone travel guide | Blog \| Khargone Travel & Hotel Guide |
| `/blog/banquet-hall-in-khargone-wedding` | banquet hall in Khargone | How to Choose a Banquet Hall in Khargone for Your Wedding |
| `/blog/places-to-visit-near-khargone` | places to visit near Khargone | Best Places to Visit Near Khargone |
| `/blog/where-to-eat-in-khargone` | restaurant in Khargone | Where to Eat in Khargone with Family |
| `/blog/indore-to-khargone-distance-route` | Indore to Khargone distance | Indore to Khargone: Distance, Route & Where to Stay |
| `/blog/birthday-party-khargone` | birthday party venue Khargone | Planning a Birthday or Anniversary Party in Khargone |
| `/guides/hotel-near-maheshwar` | hotel near Maheshwar | Hotel Near Maheshwar \| Nakshatra Resort Khargone |
| `/guides/hotel-near-omkareshwar` | hotel near Omkareshwar | Hotel Near Omkareshwar \| Nakshatra Khargone |
| `/guides/indore-to-khargone-road-trip` | Indore to Khargone road trip | Indore to Khargone Road Trip \| Distance & Stay |
| `/guides/wedding-cost-in-khargone` | wedding cost Khargone | Wedding Cost in Khargone 2025 \| Banquet Guide |

---

## Schema Types Per Page

| Page | Schema Types |
|------|-------------|
| All pages (via `app/layout.tsx`) | Hotel/Resort, Restaurant, EventVenue, FAQPage (global) |
| `/banquet-hall` | FAQPage, BreadcrumbList |
| `/party-venue` | FAQPage, BreadcrumbList |
| `/about` | BreadcrumbList |
| `/contact` | BreadcrumbList |
| `/blog` | BreadcrumbList |
| `/blog/[slug]` | Article, BreadcrumbList, FAQPage |

---

## TODO List — Missing Business Data

> **These items need client confirmation before they can be finalized.**

| Item | Current Value | Action Needed |
|------|--------------|---------------|
| Hotel email address | `"TODO: confirm with client"` | Get official email from client |
| Restaurant seating capacity | `"TODO: confirm with client"` | Confirm seating count |
| Instagram URL | `https://www.instagram.com/nakshatrahotel` | ✅ Confirmed & Wired |
| Facebook URL | `https://www.facebook.com/NakshatraHotelResort` | ✅ Confirmed & Wired |
| Google Maps / GMB URL | `https://maps.app.goo.gl/nK6cpALdyBtz5MfP9` | ✅ Confirmed & Wired |
| Khargone Bus Stand distance | `"approximately 3–4 km"` | Confirm exact distance |
| Mandu distance from Khargone | `"~115 km"` | Verify exact distance |
| NH3 toll amounts | Not included | Confirm current toll rates |
| Parking vehicle count | `"200+ vehicles"` | Confirm exact capacity |

---

## NAP String (Copy-Paste for Off-Site Citations)

Use this exact NAP string on all off-site directories (Google Business, JustDial, Sulekha, Tripadvisor, etc.):

```
Hotel Nakshatra & Resort
Sanawad Road, Jaitapur, Near D-Mart
Khargone, Madhya Pradesh 451001
India
Phone: +91 94250 88369
WhatsApp: +91 94797 93778
Website: https://www.nakshatrahotel.in
```

---

## Manual Off-Site Checklist

### Priority 1 — Must Do
- [ ] **Google Business Profile** — Claim/update with above NAP, add photos from Cloudinary gallery, add all categories (Hotel, Restaurant, Wedding Venue, Banquet Hall)
- [ ] **Google Search Console** — Verify ownership, submit sitemap.xml (`https://www.nakshatrahotel.in/sitemap.xml`)
- [ ] **Bing Webmaster Tools** — Submit sitemap
- [ ] **Tripadvisor** — Claim/update listing with correct NAP

### Priority 2 — High Value for Indian Local SEO
- [ ] **JustDial** — List with NAP, photos, categories
- [ ] **Sulekha** — List as hotel + banquet + restaurant
- [ ] **IndiaMART** — List for banquet/event enquiries
- [ ] **MakeMyTrip** / **Goibibo** — List for room bookings
- [ ] **OYO** / **Booking.com** / **Agoda** — Update/create listings

### Priority 3 — Social
- [ ] **Instagram** — Create/claim @nakshatrahotel or similar handle; add to siteConfig once confirmed
- [ ] **Facebook Business Page** — Create/claim; add to siteConfig once confirmed
- [ ] **YouTube** — Optional, property tour video for embeds

### Priority 4 — Schema Enhancements (Post Launch)
- [ ] Add `sameAs` array to JSON-LD once social URLs are confirmed
- [ ] Add `Review` schema once real verified reviews are available
- [ ] Consider adding `OpeningHoursSpecification` for restaurant

---

## How to Verify in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.nakshatrahotel.in`
3. Verify via HTML tag (GSC verification tag is already in `app/layout.tsx` metadata)
4. Submit sitemap: Sitemaps → Add sitemap → `https://www.nakshatrahotel.in/sitemap.xml`
5. Use URL Inspection Tool to check individual pages for indexing status
6. Monitor Coverage report for any crawl errors

---

## Build Status

- ✅ `npm run build` — Passes (vinext/Vite build)
- ✅ `npm run build:vercel` — Passes (Next.js 16 build, zero TypeScript errors)
- ✅ No `any` types introduced (TypeScript strict mode compatible)
- ✅ All existing functionality preserved (bookings, chatbot, admin panel, WhatsApp bot)
