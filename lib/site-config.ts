/**
 * Single source of truth for all hotel data.
 * Every other file should import from here — no hard-coded NAP elsewhere.
 */

import type { Room } from "@/lib/content";

export const siteConfig = {
  name: "Hotel Nakshatra & Resort",
  legalName: "Hotel Nakshatra & Resort",
  url: "https://www.nakshatrahotel.in",
  description:
    "Hotel Nakshatra & Resort in Khargone, Madhya Pradesh (Near D-Mart, Sanawad Road). 60 luxury rooms & suites, private pool, guest swimming pool, 5,500 sq ft grand banquet hall, wedding garden lawns, multi-cuisine restaurant, free grand parking. Gateway stay for Maheshwar Fort & Omkareshwar Jyotirlinga.",
  logo: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616778/nakshatra-new-photoshoot-2026-08-13/hotel-nakshatra-logo-01.jpg",
  ogImage:
    "https://res.cloudinary.com/qtah71h2/image/upload/v1786616862/nakshatra-new-photoshoot-2026-08-13/dmb2yozmtgjcs3dtvbmn.jpg",

  address: {
    streetAddress: "Sanawad Rd, Jaitapur, Near D-Mart",
    locality: "Khargone",
    region: "Madhya Pradesh",
    postalCode: "451001",
    country: "IN",
  },

  geo: {
    lat: 22.0121,
    lng: 75.6206,
  },

  phone: "+91-94250-88369",
  whatsapp: "+919479793778",
  whatsappUrl:
    "https://wa.me/919479793778?text=Hello%2C+I%27d+like+to+enquire+about+Nakshatra+Hotel+%26+Resort",
  email: "TODO: confirm with client",

  checkinTime: "12:00",
  checkoutTime: "10:00",

  priceRange: "₹₹",

  roomTypes: [
    { name: "Executive Room", rate: 2999, slug: "executive", maxGuests: 2 },
    { name: "Deluxe Room", rate: 3799, slug: "deluxe", maxGuests: 3 },
    { name: "Family Room", rate: 7499, slug: "family", maxGuests: 4 },
    { name: "Suite Room", rate: 6499, slug: "suite", maxGuests: 3 },
  ] satisfies Pick<Room, "name" | "rate" | "slug" | "maxGuests">[],

  amenities: [
    "Ground-floor guest swimming pool",
    "3rd floor private pool suites",
    "5,500 sq ft air-conditioned banquet hall",
    "Wedding garden & open-air lawns",
    "Multi-cuisine in-house restaurant",
    "Khargone's biggest free on-site parking",
    "High-speed WiFi (50+ Mbps)",
    "24-hour front desk",
    "Air conditioning",
    "Daily housekeeping",
    "Power backup",
    "Conference & meeting facilities",
    "Kids play area & outdoor sports",
    "Hot water",
    "Television",
    "In-room dining",
  ],

  restaurant: {
    name: "Nakshatra Multi-Cuisine Restaurant",
    cuisines: ["North Indian", "Chinese", "Continental", "Mughlai"],
    vegNonVeg: "both" as const,
    seating: "TODO: confirm with client",
  },

  banquet: {
    name: "Nakshatra Grand Hall",
    sqft: 5500,
    capacity: 1200,
    isAC: true,
    eventTypes: [
      "wedding",
      "reception",
      "birthday",
      "conference",
      "corporate event",
      "party",
      "engagement",
      "anniversary",
    ],
  },

  nearbyLandmarks: [
    { name: "D-Mart, Khargone", distance: "0.2 km", time: "walking distance" },
    { name: "Navgraha Mandir, Khargone", distance: "4 km", time: "10 minutes" },
    {
      name: "Maheshwar Fort & Ahilya Ghat",
      distance: "~50 km",
      time: "~1 hour 10 minutes",
    },
    {
      name: "Omkareshwar Jyotirlinga Temple",
      distance: "~75 km",
      time: "~1 hour 45 minutes",
    },
    {
      name: "Khandwa Junction (nearest major railway station)",
      distance: "~85 km",
      time: "~2 hours",
    },
    {
      name: "Indore Airport (IDR) & City",
      distance: "~95 km",
      time: "~2 hours 15 minutes via NH3",
    },
    {
      name: "Khargone Bus Stand",
      distance: "approximately 3–4 km", // TODO: confirm exact distance with client
      time: "TODO: confirm",
    },
  ],

  sameAs: [
    "https://www.instagram.com/nakshatrahotel/",
  ] as string[],

  socials: {
    googleMapsUrl:
      "https://maps.google.com/?q=Nakshatra+Hotel+Resort+Khargone",
    instagram: "https://www.instagram.com/nakshatrahotel/",
    facebook: "TODO: confirm with client",
  },

  policies: {
    petsAllowed: false,
    localIdsAccepted: false,
    unmarriedCouplesAllowed: false,
    outsideFoodAllowed: false,
    minimumGuestAge: 18,
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
  },
} as const;

export type SiteConfig = typeof siteConfig;
