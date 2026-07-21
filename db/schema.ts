import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const roomCategories = sqliteTable("room_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  basePrice: integer("base_price").notNull(),
  totalRooms: integer("total_rooms").notNull().default(15),
  maxGuests: integer("max_guests").notNull().default(2),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("room_categories_slug_idx").on(table.slug)]);

export const mealOptions = sqliteTable("meal_options", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  pricePerGuest: integer("price_per_guest").notNull().default(0),
  description: text("description").notNull().default(""),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("meal_options_slug_idx").on(table.slug)]);

export const availability = sqliteTable("availability", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomSlug: text("room_slug").notNull(),
  date: text("date").notNull(),
  availableRooms: integer("available_rooms").notNull(),
  priceOverride: integer("price_override"),
  note: text("note").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex("availability_room_date_idx").on(table.roomSlug, table.date),
  index("availability_date_idx").on(table.date),
]);

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reference: text("reference").notNull(),
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("Website"),
  roomSlug: text("room_slug").notNull(),
  roomName: text("room_name").notNull(),
  guestName: text("guest_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),
  guests: integer("guests").notNull(),
  mealPlan: text("meal_plan").notNull().default("Room only"),
  total: integer("total").notNull().default(0),
  arrival: text("arrival").notNull().default(""),
  requests: text("requests").notNull().default(""),
  paymentMethod: text("payment_method").notNull().default("Pay at hotel"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex("bookings_reference_idx").on(table.reference),
  index("bookings_check_in_idx").on(table.checkIn),
  index("bookings_status_idx").on(table.status),
]);

export const enquiries = sqliteTable("enquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull().default("general"),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  preferredDate: text("preferred_date").notNull().default(""),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("Website"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("enquiries_status_idx").on(table.status)]);
