import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MessageCircle } from "lucide-react";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-serif", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nakshatrahotel.in"),
  title: { default: "Nakshatra Hotel & Resort", template: "%s | Nakshatra Hotel & Resort" },
  description: "Luxury stays, two swimming pools, private rooftop pool bookings, weddings, dining and events in Khargone, Madhya Pradesh.",
  openGraph: { title: "Nakshatra Hotel & Resort", description: "Stay, celebrate and reserve a private rooftop pool in Khargone.", type: "website", images: ["/og-rooftop-v2.png"] },
  twitter: { card: "summary_large_image", images: ["/og-rooftop-v2.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const hotelSchema = {
  "@context": "https://schema.org", "@type": "Hotel", name: "Nakshatra Hotel & Resort",
  description: "Resort-style hotel with 53 rooms, a ground-floor guest pool, a bookable private third-floor rooftop pool, multi-cuisine restaurant, wedding hall, wedding garden, business facilities, event planning and expansive parking.",
  telephone: "+91-94250-88369", address: { "@type": "PostalAddress", streetAddress: "Sanawad Rd, Jaitapur", addressLocality: "Khargone", addressRegion: "Madhya Pradesh", postalCode: "451001", addressCountry: "IN" },
  amenityFeature: ["Ground-floor swimming pool for staying guests", "Private third-floor rooftop swimming pool available at ₹2,000 per hour", "Restaurant", "Wedding hall", "Wedding garden", "Conference facilities", "Free WiFi", "Free parking"].map(name => ({ "@type": "LocationFeatureSpecification", name, value: true })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${playfair.variable}`}>
    <SiteHeader/>{children}<SiteFooter/>
    <a className="whatsapp" href="https://wa.me/919770370076?text=Hello%20Nakshatra%20Hotel%20%26%20Resort%2C%20I%27d%20like%20to%20plan%20a%20stay." target="_blank" rel="noreferrer" aria-label="Chat with Nakshatra Hotel on WhatsApp"><MessageCircle/><span>WhatsApp</span></a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}/>
  </body></html>;
}
