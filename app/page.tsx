import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "Nakshatra Hotel & Resort | Stay, Weddings & Dining in Khargone",
  description: "A 60-room resort-style hotel in Khargone with four room categories, a guest pool, restaurant, 5,500 sq ft wedding hall, wedding garden, business facilities and grand parking.",
};

export default function Home() { return <HomePage/>; }
