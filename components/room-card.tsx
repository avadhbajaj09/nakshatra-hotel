import Link from "next/link";
import { ArrowUpRight, BedDouble, Coffee, Wifi } from "lucide-react";
import type { Room } from "@/lib/content";

export function RoomCard({ room, priority = false }: { room: Room; priority?: boolean }) {
  return <article className="room-card">
    <img src={room.image} alt={`Generic placeholder for ${room.name}`} loading={priority ? "eager" : "lazy"}/>
    <span className="image-label">GENERIC IMAGE · REPLACE WITH PROPERTY PHOTO</span>
    <div className="room-overlay glass-panel">
      <p className="kicker">{room.eyebrow}</p><h3>{room.name}</h3><p>{room.description}</p>
      <div className="room-meta"><span><BedDouble/>Room</span><span><Wifi/>WiFi</span><span><Coffee/>Breakfast</span></div>
      <div className="room-bottom"><span><small>Preview rate from</small><b>₹{room.rate.toLocaleString("en-IN")}</b></span><Link href={`/rooms/${room.slug}`} aria-label={`Explore ${room.name}`}>Explore <ArrowUpRight/></Link></div>
    </div>
  </article>;
}
