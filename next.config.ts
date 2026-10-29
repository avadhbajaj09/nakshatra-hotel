import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // non-www to www canonical redirect
      {
        source: "/:path*",
        has: [{ type: "host", value: "nakshatrahotel.in" }],
        destination: "https://www.nakshatrahotel.in/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
