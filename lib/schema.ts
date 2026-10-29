/**
 * Typed schema builder functions for structured data (JSON-LD).
 * All functions use siteConfig as their primary data source.
 */

import { siteConfig } from "@/lib/site-config";

// ── Shared address object ─────────────────────────────────────────────────────
const schemaAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.streetAddress,
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
} as const;

// ── Hotel / LodgingBusiness ───────────────────────────────────────────────────
export function buildHotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "Resort"],
    "@id": `${siteConfig.url}/#hotel`,
    name: siteConfig.name,
    alternateName: ["Nakshatra Resort Khargone", "Nakshatra Hotel Khargone"],
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: [
      "https://res.cloudinary.com/qtah71h2/image/upload/v1786616862/nakshatra-new-photoshoot-2026-08-13/dmb2yozmtgjcs3dtvbmn.jpg",
      "https://res.cloudinary.com/qtah71h2/image/upload/v1786616882/nakshatra-new-photoshoot-2026-08-13/dci6d210aolnev2wt5et.jpg",
      "https://res.cloudinary.com/qtah71h2/image/upload/v1786616912/nakshatra-new-photoshoot-2026-08-13/nrrrg7nh7yrn4f4xyuc1.jpg",
      "https://res.cloudinary.com/qtah71h2/image/upload/v1786617035/nakshatra-new-photoshoot-2026-08-13/kkr7cqeagtsrwzxlopr1.jpg",
    ],
    description: siteConfig.description,
    telephone: siteConfig.phone,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.policies.currenciesAccepted,
    paymentAccepted: siteConfig.policies.paymentAccepted,
    checkinTime: siteConfig.checkinTime,
    checkoutTime: siteConfig.checkoutTime,
    numberOfRooms: 60,
    petsAllowed: siteConfig.policies.petsAllowed,
    address: schemaAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    hasMap: siteConfig.socials.googleMapsUrl,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: `+91-${siteConfig.whatsapp.slice(3, 8)}-${siteConfig.whatsapp.slice(8)}`,
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Swimming Pool",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Private Pool Suites",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "5,500 sq ft Grand Banquet Hall",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Lush Wedding Garden & Lawns",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Multi-Cuisine Restaurant",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Khargone's Biggest Free Self-Parking",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "High-Speed WiFi (50+ Mbps)",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "24-Hour Front Desk Assistance",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Air Conditioning",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Kids Play Area & Outdoor Sports",
        value: true,
      },
    ],
  };
}

// ── Restaurant ────────────────────────────────────────────────────────────────
export function buildRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteConfig.url}/#restaurant`,
    name: siteConfig.restaurant.name,
    servesCuisine: [
      ...siteConfig.restaurant.cuisines,
      "Pure Vegetarian Options",
    ],
    priceRange: siteConfig.priceRange,
    telephone: siteConfig.phone,
    url: `${siteConfig.url}/restaurant`,
    address: schemaAddress,
    hasMap: siteConfig.socials.googleMapsUrl,
  };
}

// ── EventVenue / Banquet Hall ─────────────────────────────────────────────────
export function buildBanquetSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${siteConfig.url}/#venue`,
    name: `${siteConfig.banquet.name} & Wedding Lawns`,
    description: `${siteConfig.banquet.sqft} sq ft indoor air-conditioned banquet hall and open-air lush wedding garden lawns for destination weddings, receptions, conferences, and birthday parties in Khargone.`,
    maximumAttendeeCapacity: siteConfig.banquet.capacity,
    telephone: siteConfig.phone,
    url: `${siteConfig.url}/banquet-hall`,
    address: schemaAddress,
  };
}

// ── FAQPage ───────────────────────────────────────────────────────────────────
export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── Article (for blog posts) ──────────────────────────────────────────────────
export function buildArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: article.authorName ?? siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    image: article.image ?? siteConfig.ogImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

// ── HotelRoom ─────────────────────────────────────────────────────────────────
export function buildRoomSchema(room: {
  name: string;
  description: string;
  slug: string;
  rate: number;
  maxGuests: number;
  bed: string;
  size: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    url: `${siteConfig.url}/rooms/${room.slug}`,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: room.maxGuests,
    },
    bed: room.bed,
    floorSize: room.size,
    offers: {
      "@type": "Offer",
      price: room.rate,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    containedInPlace: {
      "@type": "Hotel",
      "@id": `${siteConfig.url}/#hotel`,
      name: siteConfig.name,
    },
  };
}
