import type { Metadata } from "next";
import { MaintenancePage } from "@/components/maintenance-page";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Website Under Maintenance | Nakshatra Hotel & Resort Khargone",
    description: "Nakshatra Hotel & Resort's official website is currently under maintenance. Contact us directly at +91-94250-88369 for room bookings and wedding inquiries.",
  };
}

export default async function AnyPage({ params }: Props) {
  return <MaintenancePage />;
}
