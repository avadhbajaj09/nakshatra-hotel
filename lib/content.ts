export type Room = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  features: string[];
  rate: number;
};

export const rooms: Room[] = [
  { slug: "classic", name: "Classic Room", eyebrow: "Effortless comfort", description: "Efficient, stylish and thoughtfully composed for business or leisure travellers.", image: "/images/room-classic.jpg", features: ["Complimentary breakfast", "Fast WiFi", "Daily housekeeping"], rate: 2999 },
  { slug: "deluxe", name: "Deluxe Room", eyebrow: "Room to unwind", description: "A spacious living area, richly designed interiors and attentive in-room service.", image: "/images/room-deluxe.jpg", features: ["Spacious living area", "Personalised service", "Breakfast included"], rate: 3799 },
  { slug: "superior", name: "Superior Room", eyebrow: "A view to remember", description: "Modern furnishings, a lavish dressing area and a private balcony with scenic views.", image: "/images/room-superior.jpg", features: ["Private balcony", "Lavish dressing area", "Scenic views"], rate: 4499 },
  { slug: "luxury", name: "Luxury Room", eyebrow: "Elevated indulgence", description: "Top-tier facilities and lavish comfort, designed for a quietly exceptional stay.", image: "/images/room-luxury.jpg", features: ["Top-tier facilities", "Premium comfort", "Breakfast included"], rate: 5299 },
  { slug: "suite", name: "Suite Room", eyebrow: "Space, beautifully considered", description: "A large, thoughtfully designed retreat with customised amenities for longer stays.", image: "/images/room-suite.jpg", features: ["Expansive layout", "Customised amenities", "Separate living space"], rate: 6499 },
  { slug: "family", name: "Family Room", eyebrow: "Together, comfortably", description: "An expansive multi-bed setting made for families and groups travelling together.", image: "/images/room-family.jpg", features: ["Multi-bed layout", "Group friendly", "Garden view"], rate: 7499 },
];

export const amenities = [
  ["Waves", "Infinity-edge outdoor pool"], ["Baby", "Indoor & children’s pool"],
  ["UtensilsCrossed", "Multi-cuisine restaurant"], ["PartyPopper", "5,500 sq ft banquet hall"],
  ["Flower2", "Wedding venue & lush lawns"], ["Presentation", "Conference facilities"],
  ["Wifi", "Free WiFi · 50+ Mbps"], ["Car", "Free self-parking"],
  ["Gamepad2", "Outdoor sports & kids’ play"], ["Clock3", "24-hour front desk"],
  ["Sparkles", "Daily housekeeping"], ["Coffee", "Complimentary breakfast"],
] as const;

export const nav = [
  { label: "Stay", href: "/rooms" },
  { label: "Celebrate", href: "/wedding" },
  { label: "Dine", href: "/restaurant" },
  { label: "Experience", href: "/experience" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const address = "Sanawad Rd, Jaitapur, Khargone, Madhya Pradesh 451001";
