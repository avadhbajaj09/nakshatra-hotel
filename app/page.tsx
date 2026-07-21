import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: "Nakshatra Hotel & Resort | Stay, Weddings & Dining in Khargone",
  description: "A 53-room resort-style hotel in Khargone with pools, restaurant, 5,500 sq ft banquet hall, lawns and conference facilities.",
};

export default function Home() { return <HomePage/>; }
