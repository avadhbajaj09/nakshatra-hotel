type QueryResults = { results: Record<string, unknown>[] };
type HotelStatement = {
  bind(...values: unknown[]): HotelStatement;
  run(): Promise<unknown>;
  all(): Promise<QueryResults>;
};
export type HotelDatabase = {
  prepare(statement: string): HotelStatement;
  batch(statements: HotelStatement[]): Promise<unknown>;
};

const createStatements = [
  `CREATE TABLE IF NOT EXISTS room_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    base_price INTEGER NOT NULL,
    total_rooms INTEGER NOT NULL DEFAULT 15,
    max_guests INTEGER NOT NULL DEFAULT 2,
    active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS meal_options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price_per_guest INTEGER NOT NULL DEFAULT 0,
    description TEXT NOT NULL DEFAULT '',
    active INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_slug TEXT NOT NULL,
    date TEXT NOT NULL,
    available_rooms INTEGER NOT NULL,
    price_override INTEGER,
    note TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_slug, date)
  )`,
  `CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'new',
    source TEXT NOT NULL DEFAULT 'Website',
    room_slug TEXT NOT NULL,
    room_name TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    check_in TEXT NOT NULL,
    check_out TEXT NOT NULL,
    guests INTEGER NOT NULL,
    meal_plan TEXT NOT NULL DEFAULT 'Room only',
    total INTEGER NOT NULL DEFAULT 0,
    arrival TEXT NOT NULL DEFAULT '',
    requests TEXT NOT NULL DEFAULT '',
    payment_method TEXT NOT NULL DEFAULT 'Pay at hotel',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL DEFAULT 'general',
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    preferred_date TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new',
    source TEXT NOT NULL DEFAULT 'Website',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  "CREATE INDEX IF NOT EXISTS availability_date_idx ON availability(date)",
  "CREATE INDEX IF NOT EXISTS bookings_check_in_idx ON bookings(check_in)",
  "CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status)",
  "CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries(status)",
];

const defaultRooms = [
  ["executive", "Executive Room", "Effortless comfort for business and leisure travellers.", 2999, 15, 2, 0],
  ["deluxe", "Deluxe Room", "More room to unwind with attentive in-room service.", 3799, 15, 3, 1],
  ["family", "Family Room", "A comfortable setting for families and small groups.", 7499, 15, 4, 2],
  ["suite", "Suite Room", "A spacious retreat with a separate sitting area.", 6499, 15, 3, 3],
] as const;

const defaultMeals = [
  ["breakfast", "Breakfast", 166, "Breakfast per guest, per day"],
  ["lunch", "Lunch", 350, "Lunch per guest, per day"],
  ["dinner", "Dinner", 350, "Dinner per guest, per day"],
] as const;

export async function getHotelDatabase(): Promise<HotelDatabase> {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) throw new Error("Hotel database is not available.");
  return env.DB as HotelDatabase;
}

export async function ensureHotelDatabase(db?: HotelDatabase) {
  const database = db || await getHotelDatabase();
  await database.batch(createStatements.map((statement) => database.prepare(statement)));
  await database.batch(defaultRooms.map((room) => database.prepare(
    `INSERT OR IGNORE INTO room_categories
      (slug, name, description, base_price, total_rooms, max_guests, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(...room)));
  await database.batch(defaultMeals.map((meal) => database.prepare(
    `INSERT OR IGNORE INTO meal_options (slug, name, price_per_guest, description)
     VALUES (?, ?, ?, ?)`
  ).bind(...meal)));
  return database;
}

export function jsonError(error: unknown, status = 500) {
  return Response.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status });
}
