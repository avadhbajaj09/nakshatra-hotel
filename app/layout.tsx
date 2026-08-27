import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GlobalDiscovery } from "@/components/global-discovery";
import { PageTransition } from "@/components/page-transition";
import { HotelChatbot } from "@/components/hotel-chatbot";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-serif", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nakshatrahotel.in"),
  title: {
    default: "Hotel Nakshatra & Resort | Best Luxury Resort & Hotel in Khargone MP",
    template: "%s | Hotel Nakshatra & Resort Khargone",
  },
  description:
    "Hotel Nakshatra & Resort in Khargone, Madhya Pradesh (Near D-Mart, Sanawad Road). 60 luxury rooms & suites, private pool, guest swimming pool, 5,500 sq ft grand banquet hall, wedding garden lawns, multi-cuisine restaurant, free grand parking. Gateway stay for Maheshwar Fort & Omkareshwar Jyotirlinga.",
  keywords: [
    "Hotel in Khargone",
    "Resort in Khargone",
    "Best hotel in Khargone",
    "Best resort in Khargone MP",
    "Hotel Nakshatra Khargone",
    "Nakshatra Hotel and Resort",
    "Luxury hotel Near D-Mart Khargone",
    "Hotel with swimming pool in Khargone",
    "Private pool resort Khargone",
    "Wedding hall in Khargone",
    "Banquet hall in Khargone",
    "Marriage garden in Khargone",
    "Best restaurant in Khargone",
    "Hotel near Maheshwar",
    "Resort near Omkareshwar",
    "Sanawad Road Khargone hotel",
    "Executive and Deluxe rooms Khargone",
    "Corporate conference hall Khargone",
    "Destination wedding venue Khargone",
  ],
  authors: [{ name: "Hotel Nakshatra & Resort" }],
  creator: "Hotel Nakshatra & Resort",
  publisher: "Hotel Nakshatra & Resort",
  formatDetection: { telephone: true, address: true, email: true },
  verification: {
    google: "OZex8qtAN_xn5zdDxY9JHmsLlc_gXU7aK2-pDoYE9Ck",
  },
  alternates: {
    canonical: "https://www.nakshatrahotel.in",
  },
  openGraph: {
    title: "Hotel Nakshatra & Resort | Best Luxury Resort in Khargone MP",
    description:
      "60 luxury rooms, private rooftop pools, 5,500 sq ft wedding banquet hall, dining & grand parking near D-Mart, Sanawad Road, Khargone. Book direct on WhatsApp.",
    url: "https://www.nakshatrahotel.in",
    siteName: "Hotel Nakshatra & Resort Khargone",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616862/nakshatra-new-photoshoot-2026-08-13/dmb2yozmtgjcs3dtvbmn.jpg",
        width: 1200,
        height: 800,
        alt: "Hotel Nakshatra & Resort Exterior - Luxury Resort in Khargone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Nakshatra & Resort | Luxury Hotel & Banquet in Khargone",
    description:
      "Experience luxury rooms, swimming pools, multi-cuisine dining, and 5,500 sq ft wedding hall in Khargone near D-Mart.",
    images: ["https://res.cloudinary.com/qtah71h2/image/upload/v1786616862/nakshatra-new-photoshoot-2026-08-13/dmb2yozmtgjcs3dtvbmn.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Khargone",
    "geo.position": "22.0121;75.6206",
    ICBM: "22.0121, 75.6206",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Hotel", "Resort"],
      "@id": "https://www.nakshatrahotel.in/#hotel",
      name: "Hotel Nakshatra & Resort",
      alternateName: ["Nakshatra Resort Khargone", "Nakshatra Hotel Khargone"],
      url: "https://www.nakshatrahotel.in",
      logo: "https://res.cloudinary.com/qtah71h2/image/upload/v1786616778/nakshatra-new-photoshoot-2026-08-13/hotel-nakshatra-logo-01.jpg",
      image: [
        "https://res.cloudinary.com/qtah71h2/image/upload/v1786616862/nakshatra-new-photoshoot-2026-08-13/dmb2yozmtgjcs3dtvbmn.jpg",
        "https://res.cloudinary.com/qtah71h2/image/upload/v1786616882/nakshatra-new-photoshoot-2026-08-13/dci6d210aolnev2wt5et.jpg",
        "https://res.cloudinary.com/qtah71h2/image/upload/v1786616912/nakshatra-new-photoshoot-2026-08-13/nrrrg7nh7yrn4f4xyuc1.jpg",
        "https://res.cloudinary.com/qtah71h2/image/upload/v1786617035/nakshatra-new-photoshoot-2026-08-13/kkr7cqeagtsrwzxlopr1.jpg",
      ],
      description:
        "Premier luxury resort in Khargone, Madhya Pradesh located on Sanawad Road near D-Mart. Features 60 luxury rooms & suites, private pools, ground-floor guest swimming pool, ~5,500 sq ft grand banquet hall, lush wedding lawns, multi-cuisine restaurant, and Khargone's biggest on-site parking.",
      telephone: "+91-94250-88369",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
      checkinTime: "12:00",
      checkoutTime: "10:00",
      numberOfRooms: 60,
      petsAllowed: false,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sanawad Rd, Jaitapur, Near D-Mart",
        addressLocality: "Khargone",
        addressRegion: "Madhya Pradesh",
        postalCode: "451001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.0121,
        longitude: 75.6206,
      },
      hasMap: "https://maps.google.com/?q=Nakshatra+Hotel+Resort+Khargone",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-94250-88369",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-94797-93778",
          contactType: "reservations",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Pool Suites", value: true },
        { "@type": "LocationFeatureSpecification", name: "5,500 sq ft Grand Banquet Hall", value: true },
        { "@type": "LocationFeatureSpecification", name: "Lush Wedding Garden & Lawns", value: true },
        { "@type": "LocationFeatureSpecification", name: "Multi-Cuisine Restaurant", value: true },
        { "@type": "LocationFeatureSpecification", name: "Khargone's Biggest Free Self-Parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "High-Speed WiFi (50+ Mbps)", value: true },
        { "@type": "LocationFeatureSpecification", name: "24-Hour Front Desk Assistance", value: true },
        { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
        { "@type": "LocationFeatureSpecification", name: "Kids Play Area & Outdoor Sports", value: true },
      ],
      starRating: {
        "@type": "Rating",
        ratingValue: "4.8",
        bestRating: "5",
      },
    },
    {
      "@type": "Restaurant",
      "@id": "https://www.nakshatrahotel.in/#restaurant",
      name: "Nakshatra Multi-Cuisine Restaurant",
      servesCuisine: ["North Indian", "Chinese", "Continental", "Pure Vegetarian Options", "Mughlai"],
      priceRange: "₹₹",
      telephone: "+91-94250-88369",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sanawad Rd, Jaitapur, Near D-Mart",
        addressLocality: "Khargone",
        addressRegion: "Madhya Pradesh",
        postalCode: "451001",
        addressCountry: "IN",
      },
    },
    {
      "@type": "EventVenue",
      "@id": "https://www.nakshatrahotel.in/#venue",
      name: "Nakshatra Grand Banquet Hall & Wedding Lawns",
      description: "5,500 sq ft indoor air-conditioned banquet hall and open-air lush wedding garden lawns for destination weddings, receptions, conferences, and birthday parties in Khargone.",
      maximumAttendeeCapacity: 1200,
      telephone: "+91-94250-88369",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sanawad Rd, Jaitapur, Near D-Mart",
        addressLocality: "Khargone",
        addressRegion: "Madhya Pradesh",
        postalCode: "451001",
        addressCountry: "IN",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.nakshatrahotel.in/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which is the best luxury hotel and resort in Khargone MP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hotel Nakshatra & Resort is Khargone's premier luxury resort, located on Sanawad Road near D-Mart. It offers 60 luxury rooms & suites, private pool rooms, a ground-floor guest swimming pool, a 5,500 sq ft grand banquet hall, wedding garden lawns, multi-cuisine restaurant, and the biggest on-site parking in Khargone.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Hotel Nakshatra & Resort located in Khargone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hotel Nakshatra & Resort is located on Sanawad Road, Jaitapur, conveniently Near D-Mart in Khargone, Madhya Pradesh 451001. It is easily accessible from Indore (95 km), Maheshwar (50 km), and Omkareshwar (75 km).",
          },
        },
        {
          "@type": "Question",
          name: "Does Hotel Nakshatra & Resort Khargone have a swimming pool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Hotel Nakshatra & Resort features both a spacious ground-floor swimming pool for staying guests and exclusive 3rd-floor private pool suites for romantic and luxury couple retreats.",
          },
        },
        {
          "@type": "Question",
          name: "Can I host weddings and large celebrations at Hotel Nakshatra Khargone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Hotel Nakshatra & Resort is Khargone's top destination for weddings and celebrations, featuring a ~5,500 sq ft AC banquet hall, extensive open-air wedding lawns, 60 guest rooms for wedding party stays, multi-cuisine catering, and grand free parking for 200+ vehicles.",
          },
        },
        {
          "@type": "Question",
          name: "How can I book a room or venue at Hotel Nakshatra & Resort Khargone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book directly via WhatsApp at +91 94797 93778 or call management at +91 94250 88369 for direct booking confirmation and best available rates.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Khargone" />
        <meta name="geo.position" content="22.0121;75.6206" />
        <meta name="ICBM" content="22.0121, 75.6206" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <PageTransition />
        <SiteHeader />
        {children}
        <GlobalDiscovery />
        <SiteFooter />
        <HotelChatbot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
