"use client";

import { useEffect, useState } from "react";

export type PublicRoomConfig = { slug: string; name: string; description: string; base_price: number; total_rooms: number; max_guests: number; active: number };
export type PublicMealConfig = { slug: string; name: string; price_per_guest: number; description: string; active: number };
export type PublicAvailability = { room_slug: string; available_rooms: number; price_override: number | null };
type PublicHotelConfig = { rooms: PublicRoomConfig[]; meals: PublicMealConfig[]; availability: PublicAvailability[] };

export function useHotelConfig(checkIn?: string, checkOut?: string) {
  const [config, setConfig] = useState<PublicHotelConfig | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    const search = new URLSearchParams({ mode: "public" });
    if (checkIn) search.set("in", checkIn);
    if (checkOut) search.set("out", checkOut);
    fetch(`/api/hotel?${search}`, { signal: controller.signal, cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Hotel configuration unavailable")))
      .then((result: PublicHotelConfig) => setConfig(result))
      .catch((error: unknown) => { if (!(error instanceof DOMException && error.name === "AbortError")) setConfig(null); });
    return () => controller.abort();
  }, [checkIn, checkOut]);
  return config;
}

export function configuredMealAddons(meals: PublicMealConfig[] | undefined) {
  const price = (slug: string) => meals?.find((meal) => meal.slug === slug && meal.active)?.price_per_guest;
  const breakfast = price("breakfast");
  const lunch = price("lunch");
  const dinner = price("dinner");
  return { breakfast, halfBoard: breakfast !== undefined && (lunch !== undefined || dinner !== undefined) ? breakfast + Math.min(lunch ?? Infinity, dinner ?? Infinity) : undefined, fullBoard: breakfast !== undefined && lunch !== undefined && dinner !== undefined ? breakfast + lunch + dinner : undefined };
}
