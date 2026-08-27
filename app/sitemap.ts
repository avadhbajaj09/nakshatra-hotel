import type { MetadataRoute } from "next";
import { rooms } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.nakshatrahotel.in";

  const highPriorityPages = [
    { path: "", changeFreq: "daily" as const, priority: 1.0 },
    { path: "rooms", changeFreq: "weekly" as const, priority: 0.95 },
    { path: "gallery", changeFreq: "weekly" as const, priority: 0.95 },
    { path: "wedding", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "directions", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "explore-khargone", changeFreq: "weekly" as const, priority: 0.9 },
    { path: "famous-spots", changeFreq: "weekly" as const, priority: 0.85 },
    { path: "restaurant", changeFreq: "weekly" as const, priority: 0.85 },
    { path: "wedding-hall", changeFreq: "weekly" as const, priority: 0.85 },
    { path: "wedding-garden", changeFreq: "weekly" as const, priority: 0.85 },
    { path: "ground-floor-pool", changeFreq: "weekly" as const, priority: 0.8 },
    { path: "amenities", changeFreq: "monthly" as const, priority: 0.8 },
    { path: "our-story", changeFreq: "monthly" as const, priority: 0.8 },
    { path: "event-planning", changeFreq: "monthly" as const, priority: 0.75 },
    { path: "parking", changeFreq: "monthly" as const, priority: 0.75 },
    { path: "business-meetings", changeFreq: "monthly" as const, priority: 0.75 },
    { path: "conference-and-meetings", changeFreq: "monthly" as const, priority: 0.7 },
    { path: "birthday-party", changeFreq: "monthly" as const, priority: 0.7 },
    { path: "personal-party", changeFreq: "monthly" as const, priority: 0.7 },
    { path: "pool-party", changeFreq: "monthly" as const, priority: 0.7 },
    { path: "offers", changeFreq: "monthly" as const, priority: 0.7 },
    { path: "contact", changeFreq: "monthly" as const, priority: 0.8 },
    { path: "reviews", changeFreq: "monthly" as const, priority: 0.65 },
    { path: "faq", changeFreq: "monthly" as const, priority: 0.65 },
    { path: "terms-conditions", changeFreq: "yearly" as const, priority: 0.3 },
    { path: "privacy-policy", changeFreq: "yearly" as const, priority: 0.3 },
    { path: "cancellation-refund-policy", changeFreq: "yearly" as const, priority: 0.3 },
  ];

  const pageEntries: MetadataRoute.Sitemap = highPriorityPages.map((page) => ({
    url: page.path ? `${base}/${page.path}` : base,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  const roomEntries: MetadataRoute.Sitemap = rooms.map((r) => ({
    url: `${base}/rooms/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...pageEntries, ...roomEntries];
}
