"use client";

import { rooms } from "@/lib/content";
import { configuredRoom, useHotelConfig } from "@/lib/use-hotel-config";
import { RoomCard } from "./room-card";

export function LiveRoomGrid({ priorityFirst = false }: { priorityFirst?: boolean }) {
  const config = useHotelConfig();
  const visibleRooms = rooms
    .filter((room) => config?.rooms.find((item) => item.slug === room.slug)?.active !== false)
    .map((room) => configuredRoom(room, config?.rooms));

  return <div className="room-grid">{visibleRooms.map((room, index) => <RoomCard key={room.slug} room={room} priority={priorityFirst && index === 0}/>)}</div>;
}
