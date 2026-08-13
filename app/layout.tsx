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
  metadataBase: new URL("https://nakshatrahotel.in"),
  title: { default: "Nakshatra Hotel & Resort", template: "%s | Nakshatra Hotel & Resort" },
  description: "60 rooms across four categories, a guest pool, weddings, dining, grand parking and events in Khargone, Madhya Pradesh.",
  openGraph: { title: "Nakshatra Hotel & Resort", description: "Explore real room galleries, choose a dining package and request your stay directly.", type: "website", images: ["/og-glass-v4.png"] },
  twitter: { card: "summary_large_image", images: ["/og-glass-v4.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const hotelSchema = {
  "@context": "https://schema.org", "@type": "Hotel", name: "Nakshatra Hotel & Resort",
  description: "Resort-style hotel with 60 rooms across four categories, a ground-floor guest pool, multi-cuisine restaurant, wedding hall, wedding garden, business facilities, event planning and grand parking.",
  telephone: "+91-94250-88369", address: { "@type": "PostalAddress", streetAddress: "Sanawad Rd, Jaitapur", addressLocality: "Khargone", addressRegion: "Madhya Pradesh", postalCode: "451001", addressCountry: "IN" },
  amenityFeature: ["Ground-floor swimming pool for staying guests", "Restaurant", "Wedding hall", "Wedding garden", "Conference facilities", "Free WiFi", "Khargone’s biggest parking area", "Free parking"].map(name => ({ "@type": "LocationFeatureSpecification", name, value: true })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${playfair.variable}`}>
    <PageTransition/><SiteHeader/>{children}<GlobalDiscovery/><SiteFooter/>
    <HotelChatbot/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}/>
  </body></html>;
}
