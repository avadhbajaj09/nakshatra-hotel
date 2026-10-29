import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "YandexBot"],
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot-Extended",
          "Bytespider",
          "anthropic-ai",
          // Additional AI crawlers
          "OAI-SearchBot",
          "Claude-SearchBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://www.nakshatrahotel.in/sitemap.xml",
  };
}
