export type Room = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  maxGuests: number;
  bed: string;
  size: string;
  rate: number;
};

export const rooms: Room[] = [
  { slug: "executive", name: "Executive Room", eyebrow: "Effortless comfort", description: "Efficient, stylish and thoughtfully composed for business or leisure travellers.", image: "/images/rooms/rooms5.webp", gallery: ["/images/rooms/rooms5.webp", "/images/rooms/rooms6.jpg", "/images/rooms/rooms7.jpg", "/images/rooms/rooms8.jpg", "/images/rooms/nakshatra54.jpeg"], features: ["Fast WiFi", "Daily housekeeping", "Meal plans available"], maxGuests: 2, bed: "1 double bed", size: "Comfort layout", rate: 2999 },
  { slug: "deluxe", name: "Deluxe Room", eyebrow: "Room to unwind", description: "A spacious living area, richly designed interiors and attentive in-room service.", image: "/images/rooms/nakshatra56.jpeg", gallery: ["/images/rooms/nakshatra56.jpeg", "/images/rooms/nakshatra57.jpeg", "/images/rooms/nakshatra58.jpeg", "/images/rooms/nakshatra75.jpeg", "/images/rooms/rooms2.jpg"], features: ["Spacious living area", "In-room dining", "Meal plans available"], maxGuests: 3, bed: "1 double bed", size: "Spacious layout", rate: 3799 },
  { slug: "family", name: "Family Room", eyebrow: "Together, comfortably", description: "An expansive setting made for families and small groups travelling together.", image: "/images/rooms/nakshatra65.jpeg", gallery: ["/images/rooms/nakshatra65.jpeg", "/images/rooms/nakshatra63.jpeg", "/images/rooms/nakshatra55.jpeg", "/images/rooms/nakshatra36.jpeg", "/images/rooms/nakshatra1.jpeg"], features: ["Family-friendly space", "Generous seating", "Meal plans available"], maxGuests: 4, bed: "Family sleeping layout", size: "Expansive layout", rate: 7499 },
  { slug: "suite", name: "Suite Room", eyebrow: "Space, beautifully considered", description: "A large, thoughtfully designed retreat with a separate sitting area for longer stays.", image: "/images/rooms/nakshatra63.jpeg", gallery: ["/images/rooms/nakshatra63.jpeg", "/images/rooms/nakshatra65.jpeg", "/images/rooms/nakshatra55.jpeg", "/images/rooms/rooms1.jpg", "/images/rooms/nakshatra57.jpeg"], features: ["Expansive layout", "Separate living space", "Meal plans available"], maxGuests: 3, bed: "1 double bed", size: "Suite layout", rate: 6499 },
];

export const roomAmenities = ["Air conditioning", "Private bathroom", "Fast WiFi", "Television", "In-room dining", "Daily housekeeping", "Wardrobe & luggage space", "Power backup", "Hot water", "24-hour front desk"] as const;

export const mealPlans = [
  { slug: "room-only", name: "Flexible Room Only", shortName: "Room only", description: "The room with flexible cancellation until check-in.", addonPerGuest: 0, discount: 10, includes: ["Room stay", "Flexible cancellation"] },
  { slug: "breakfast", name: "Breakfast Escape", shortName: "Breakfast", description: "Begin every morning with breakfast for each registered guest.", addonPerGuest: 166, discount: 12, includes: ["Daily breakfast", "Flexible cancellation"] },
  { slug: "half-board", name: "Breakfast + One Meal", shortName: "Breakfast + meal", description: "Breakfast plus your choice of lunch or dinner for every registered guest.", addonPerGuest: 520, discount: 18, includes: ["Daily breakfast", "Lunch or dinner", "Flexible cancellation"] },
  { slug: "full-board", name: "Complete Dining Stay", shortName: "All meals", description: "Breakfast, lunch and dinner for each registered guest throughout the stay.", addonPerGuest: 850, discount: 22, includes: ["Daily breakfast", "Lunch and dinner", "Flexible cancellation"] },
] as const;

export const amenities = [
  ["Waves", "Ground-floor pool · included for staying guests"], ["Car", "Khargone’s biggest parking area"],
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
  { label: "Our Story", href: "/our-story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Directions", href: "/directions" },
];

export const address = "Sanawad Rd, Jaitapur, Khargone, Madhya Pradesh 451001";

export const executiveRoomReference = {
  name: "Executive Room",
  sourceLabel: "OTA rate reference captured for 22–24 July 2026 · 1 room · 2 adults",
  maxGuests: 3,
  size: "324 sq ft (30 sq m)",
  bed: "1 double bed",
  bathrooms: 1,
  amenities: ["Air conditioning", "In-room dining", "Heater", "Bathroom", "Housekeeping", "Smoking room"],
  ratePlans: [
    { name: "Room only", includes: "Free cancellation until check-in", rate: 2047, taxes: 288 },
    { name: "Breakfast included", includes: "Complimentary breakfast · Free cancellation until check-in", rate: 2218, taxes: 312 },
    { name: "Breakfast + one meal", includes: "Breakfast + lunch or dinner · Free cancellation until check-in", rate: 3113, taxes: 439 },
  ],
  rules: [
    "Check-in: 12:00 PM", "Check-out: 10:00 AM", "Primary guest must be at least 18",
    "Aadhaar accepted as ID proof", "Unmarried couples are not allowed", "Local IDs are not allowed",
    "Groups with only male guests are allowed", "Pets are not allowed", "Outside food is not allowed",
  ],
} as const;

export type DetailPage = {
  introTitle: string;
  intro: string[];
  image2: string;
  image3: string;
  highlights: { value: string; label: string }[];
  features: { title: string; text: string }[];
  journey: { title: string; text: string }[];
  related: { label: string; href: string; image: string }[];
  formType?: string;
};

export const detailPages: Record<string, DetailPage> = {
  "our-story": {
    introTitle: "A complete address for stays, celebrations and connection.",
    intro: [
      "Nakshatra Hotel & Resort brings many reasons to arrive under one roof: a comfortable stay, an important business visit, a family meal, a wedding celebration or a few quiet days by the water.",
      "Located on Sanawad Road in Jaitapur, approximately 3 km from Khargone Bus Stand, the resort combines 60 rooms with dining, a guest pool, lawns, event venues, meeting facilities and grand on-site parking.",
      "Our approach is simple: understand the occasion, make every space feel welcoming and help guests move through their visit with ease.",
    ], image2: "/images/story-resort.jpg", image3: "/images/lobby.jpg",
    highlights: [{ value: "60", label: "Rooms across four categories" }, { value: "~3 km", label: "From Khargone Bus Stand" }, { value: "24/7", label: "Front desk assistance" }],
    features: [
      { title: "A place to stay", text: "Four room categories support business travellers, couples, families and larger groups with daily housekeeping, fast WiFi and flexible meal plans." },
      { title: "A place to gather", text: "The banquet hall, wedding garden, lawns, restaurant, poolside and meeting facilities offer different settings for meaningful occasions." },
      { title: "A place to return to", text: "Practical comforts—parking, dining, pools, WiFi and an attentive front desk—make Nakshatra useful for both milestone events and everyday visits." },
    ],
    journey: [{ title: "Arrive with ease", text: "A convenient Khargone location and free on-site parking simplify the beginning of every visit." }, { title: "Choose your pace", text: "Move between rooms, dining, lawns, play areas and pools without leaving the resort setting." }, { title: "Leave with a memory", text: "The best hospitality is felt in thoughtful details, comfortable spaces and people who help the moment flow." }],
    related: [{ label: "Rooms & suites", href: "/rooms", image: "/images/room-luxury.jpg" }, { label: "Weddings", href: "/wedding", image: "/images/wedding.jpg" }, { label: "Dining", href: "/restaurant", image: "/images/restaurant.jpg" }],
  },
  wedding: {
    introTitle: "One destination. Every chapter of your celebration.",
    intro: [
      "Plan your wedding across distinct indoor and outdoor settings, with guest rooms, multi-cuisine dining and grand parking gathered within the same resort address.",
      "The approximately 5,500 sq ft banquet hall supports formal functions, while the wedding garden and lush lawns create an open-air setting for ceremonies, receptions and evening celebrations.",
      "Share your dates, guest expectations and preferred functions with the hotel team to shape a venue plan around your celebration.",
    ], image2: "/images/wedding-garden.jpg", image3: "/images/celebration-table.jpg",
    highlights: [{ value: "~5,500", label: "Sq ft banquet hall" }, { value: "Indoor + outdoor", label: "Celebration settings" }, { value: "60", label: "Rooms for the stay" }],
    features: [{ title: "The Nakshatra Grand Hall", text: "An indoor banquet setting for receptions, ceremonies, dining and weather-protected functions." }, { title: "Wedding Garden", text: "A green outdoor canvas for mandaps, pheras, evening receptions and open-air celebrations." }, { title: "Stay, dine, celebrate", text: "Rooms, restaurant service, lawns and parking make multi-function wedding planning more convenient for hosts and guests." }],
    journey: [{ title: "Share the vision", text: "Tell us your functions, preferred dates, guest expectations and the atmosphere you want to create." }, { title: "Choose the settings", text: "Plan the right combination of banquet hall, wedding garden, lawns, rooms and dining." }, { title: "Shape the celebration", text: "Confirm event timings, guest movement, food service and practical arrangements with the hotel team." }],
    related: [{ label: "The Nakshatra Grand Hall", href: "/wedding-hall", image: "/images/grand-hall-gallery/nakshatra69.jpeg" }, { label: "Wedding Garden", href: "/wedding-garden", image: "/images/wedding-garden.jpg" }, { label: "Full Event Planning", href: "/event-planning", image: "/images/party.jpg" }], formType: "wedding",
  },
  "wedding-hall": {
    introTitle: "A luminous indoor stage for grand celebrations.",
    intro: ["Nakshatra’s approximately 5,500 sq ft banquet hall gives hosts a substantial indoor canvas for weddings, receptions, engagement functions, anniversaries and formal gatherings.", "The hall can be planned around dining, a stage, guest seating and ceremonial moments. Final layouts and guest counts should be confirmed directly with the hotel for each event.", "With rooms, restaurant service, lawns and parking on site, guests can move from arrival to celebration and overnight stay within one destination."],
    image2: "/images/grand-hall-gallery/nakshatra42.jpeg", image3: "/images/grand-hall-gallery/nakshatra74.jpeg",
    highlights: [{ value: "~5,500", label: "Sq ft indoor venue" }, { value: "All-weather", label: "Celebration setting" }, { value: "On site", label: "Rooms, dining and parking" }],
    features: [{ title: "Flexible floor plan", text: "Discuss seating, stage, dining and ceremony zones around the needs of your function." }, { title: "Day-to-night atmosphere", text: "Shape the hall for daytime rituals, formal dinners or an evening reception." }, { title: "Guest convenience", text: "Accommodation, dining and parking within the resort reduce unnecessary travel between functions." }],
    journey: [{ title: "Define the function", text: "Wedding, reception, engagement or celebration—begin with the purpose and timing." }, { title: "Plan the layout", text: "Confirm the preferred room arrangement, guest movement and service requirements." }, { title: "Coordinate the details", text: "Align food, event timings and supporting requirements with the hotel team." }],
    related: [{ label: "Wedding Garden", href: "/wedding-garden", image: "/images/wedding-garden.jpg" }, { label: "Guest Rooms", href: "/rooms", image: "/images/room-suite.jpg" }, { label: "Parking", href: "/parking", image: "/images/parking.jpg" }], formType: "wedding hall",
  },
  "wedding-garden": {
    introTitle: "Celebrate beneath open skies and evening lights.",
    intro: ["The wedding garden and lush lawns offer an outdoor setting for ceremonies, receptions, festive dinners and relaxed gatherings.", "Use the open landscape for a mandap, guest seating, dining and photographs, with the resort’s indoor hall available as a complementary setting when planned in advance.", "Because every outdoor celebration is different, layout, weather planning, service areas and event timing should be discussed directly with the hotel team."],
    image2: "/images/wedding-garden.jpg", image3: "/images/party.jpg",
    highlights: [{ value: "Open-air", label: "Wedding setting" }, { value: "Lush lawns", label: "Flexible celebration canvas" }, { value: "Day + evening", label: "Function possibilities" }],
    features: [{ title: "Ceremonies in the garden", text: "Create an open-air setting for pheras, blessings, vows and family traditions." }, { title: "Evening receptions", text: "Use the lawn for dining, celebration and a warm after-dark atmosphere." }, { title: "Indoor-outdoor flow", text: "Combine the wedding garden with the banquet hall, rooms and dining for a multi-part event." }],
    journey: [{ title: "Select your moment", text: "Morning ceremony, sunset function or evening celebration—timing shapes the experience." }, { title: "Map the garden", text: "Plan ceremony, seating, dining and guest-flow zones with the hotel team." }, { title: "Prepare thoughtfully", text: "Confirm weather considerations, event timing and operational requirements before the day." }],
    related: [{ label: "The Nakshatra Grand Hall", href: "/wedding-hall", image: "/images/grand-hall-gallery/nakshatra69.jpeg" }, { label: "Event Planning", href: "/event-planning", image: "/images/celebration-table.jpg" }, { label: "Restaurant", href: "/restaurant", image: "/images/restaurant.jpg" }], formType: "wedding garden",
  },
  parking: {
    introTitle: "A generous arrival experience for stays and large gatherings.",
    intro: ["Nakshatra offers grand, free on-site self-parking—Khargone’s biggest parking area and an important practical advantage for weddings, conferences, parties and group stays.", "For larger events, share expected vehicle volumes and arrival windows with the hotel team so parking and guest movement can be considered as part of the overall event plan.", "The property’s Sanawad Road location, approximately 3 km from Khargone Bus Stand, also supports a more straightforward arrival for local and visiting guests."],
    image2: "/images/parking.jpg", image3: "/images/hero-resort.jpg",
    highlights: [{ value: "Free", label: "On-site self-parking" }, { value: "Grand", label: "Khargone’s biggest parking" }, { value: "~3 km", label: "From Khargone Bus Stand" }],
    features: [{ title: "For hotel guests", text: "Park on site while staying, dining or using the resort facilities." }, { title: "For celebrations", text: "A large parking area helps simplify arrivals for weddings and social functions." }, { title: "For business groups", text: "Meeting organisers can discuss expected vehicles and group-arrival requirements in advance." }],
    journey: [{ title: "Share expected arrivals", text: "Tell the hotel the approximate number and type of vehicles expected for your function." }, { title: "Plan peak timings", text: "Arrival and departure windows help the team consider a smoother guest flow." }, { title: "Welcome with ease", text: "Clear communication before a large event makes the first and last moments more comfortable." }],
    related: [{ label: "Weddings", href: "/wedding", image: "/images/wedding.jpg" }, { label: "Business Meetings", href: "/business-meetings", image: "/images/business-meeting.jpg" }, { label: "Contact", href: "/contact", image: "/images/lobby.jpg" }], formType: "parking and group arrival",
  },
  "event-planning": {
    introTitle: "From first idea to final guest, plan it all in one place.",
    intro: ["Nakshatra can host weddings, birthday celebrations, personal parties, poolside gatherings, conferences and other social or business occasions across a choice of indoor and outdoor settings.", "Begin with one conversation about your date, event type, guest expectations, venue preference, stay requirements and dining needs.", "Exact inclusions, external-vendor arrangements, décor, entertainment and event production should be confirmed with the hotel for each enquiry."],
    image2: "/images/party.jpg", image3: "/images/celebration-table.jpg",
    highlights: [{ value: "One venue", label: "Multiple event settings" }, { value: "Stay + dine", label: "Convenient guest planning" }, { value: "Personal", label: "Event-by-event enquiry" }],
    features: [{ title: "Social occasions", text: "Plan weddings, engagements, anniversaries, birthdays, personal parties and festive gatherings." }, { title: "Business events", text: "Bring together meetings, conferences, dining, parking and accommodation." }, { title: "Resort moments", text: "Explore poolside, lawn, banquet and restaurant settings according to the occasion." }],
    journey: [{ title: "Tell us the occasion", text: "Share your preferred date, event type and approximate guest expectation." }, { title: "Build the event plan", text: "Discuss the right venue, schedule, dining, rooms and practical requirements." }, { title: "Confirm every inclusion", text: "Review the final scope, policies and responsibilities before the event." }],
    related: [{ label: "Birthday Parties", href: "/birthday-party", image: "/images/party.jpg" }, { label: "Pool Parties", href: "/pool-party", image: "/images/pool.jpg" }, { label: "Personal Parties", href: "/personal-party", image: "/images/celebration-table.jpg" }], formType: "full event planning",
  },
  "business-meetings": {
    introTitle: "A focused setting for ideas, teams and decisions.",
    intro: ["Nakshatra’s conference and meeting facilities support business discussions, team sessions, presentations and corporate gatherings in Khargone.", "Fast WiFi, parking, in-house dining and 60 rooms make it possible to bring local and travelling participants together at one address.", "Share your preferred date, meeting format, approximate attendance, food requirements and room needs so the hotel can recommend an appropriate arrangement."],
    image2: "/images/business-meeting.jpg", image3: "/images/lobby.jpg",
    highlights: [{ value: "50+ Mbps", label: "Listed WiFi speed" }, { value: "60", label: "Rooms on site" }, { value: "Free", label: "Self-parking" }],
    features: [{ title: "Meetings & presentations", text: "Discuss room format, agenda flow and presentation requirements with the hotel team." }, { title: "Corporate dining", text: "Plan tea, meals or group dining around the working schedule." }, { title: "Outstation teams", text: "Combine meeting facilities with rooms, breakfast and parking for travelling participants." }],
    journey: [{ title: "Define the format", text: "Share whether you need a meeting, training, presentation, conference or team gathering." }, { title: "Add the essentials", text: "Confirm schedule, approximate attendees, rooms, dining and equipment requirements." }, { title: "Bring everyone together", text: "A single resort address helps simplify arrival, work sessions, meals and overnight stays." }],
    related: [{ label: "Conference Facilities", href: "/conference-and-meetings", image: "/images/business-meeting.jpg" }, { label: "Group Rooms", href: "/rooms", image: "/images/room-deluxe.jpg" }, { label: "Parking", href: "/parking", image: "/images/parking.jpg" }], formType: "business meeting",
  },
  restaurant: {
    introTitle: "A welcoming table for hotel guests and local gatherings.",
    intro: ["Nakshatra’s in-house multi-cuisine restaurant brings familiar favourites and varied flavours together in a comfortable resort setting.", "Begin the day with complimentary breakfast, meet over a meal, or include dining as part of a wedding, party, conference or group stay.", "The full digital menu will be added when the hotel supplies the current item list, descriptions and approved prices."],
    image2: "/images/restaurant-gallery/nakshatra18.jpeg", image3: "/images/restaurant-gallery/nakshatra13.jpeg",
    highlights: [{ value: "Multi-cuisine", label: "In-house restaurant" }, { value: "Included", label: "Complimentary breakfast" }, { value: "Groups", label: "Event and meeting dining" }],
    features: [{ title: "Breakfast at Nakshatra", text: "Start the day at the resort with the breakfast inclusion attached to the relevant room plan." }, { title: "Everyday dining", text: "A convenient in-house option for staying guests, local visitors and family meals." }, { title: "Occasion dining", text: "Discuss meal service for weddings, conferences, celebrations and group stays." }],
    journey: [{ title: "Choose the occasion", text: "A quiet meal, group lunch, event dinner or breakfast during your stay." }, { title: "Share dietary needs", text: "Discuss menu preferences and dietary requirements directly with the restaurant team." }, { title: "Gather at the table", text: "Good food gives every stay, meeting and celebration a natural place to come together." }],
    related: [{ label: "View Menu", href: "/menu", image: "/images/restaurant.jpg" }, { label: "Stay at Nakshatra", href: "/rooms", image: "/images/room-superior.jpg" }, { label: "Plan an Event", href: "/event-planning", image: "/images/celebration-table.jpg" }],
  },
  experience: {
    introTitle: "Build the day around your own rhythm.",
    intro: ["Nakshatra combines the ease of a hotel with the breathing room of a resort-style property.", "Move from breakfast to the pools, outdoor sports, kids’ play, lawns, dining and a comfortable room without needing to plan every hour.", "For families, business travellers and celebration guests, the best part of the experience is having many useful spaces within one address."],
    image2: "/images/ground-floor-pool-gallery/nakshatra10.jpeg", image3: "/images/ground-floor-pool.jpg",
    highlights: [{ value: "60", label: "Rooms across four categories" }, { value: "Included", label: "Guest pool with your stay" }, { value: "50+ Mbps", label: "Free WiFi" }],
    features: [{ title: "Ground-floor guest pool", text: "The ground-floor swimming pool is open to staying guests with a room booking." }, { title: "Four ways to stay", text: "Choose Executive, Deluxe, Family or Suite accommodation for your visit." }, { title: "Everything close", text: "Restaurant, grand parking, breakfast, housekeeping and a 24-hour front desk support the stay." }],
    journey: [{ title: "A gentle morning", text: "Begin with breakfast and an unhurried start within the resort." }, { title: "An open afternoon", text: "Choose between the water, the lawns, outdoor play or time in your room." }, { title: "An easy evening", text: "Gather for dinner or let an event, celebration or quiet conversation shape the night." }],
    related: [{ label: "Guest Pool", href: "/ground-floor-pool", image: "/images/ground-floor-pool.jpg" }, { label: "Rooms & Suites", href: "/rooms", image: "/images/room-suite.jpg" }, { label: "Dining", href: "/restaurant", image: "/images/restaurant.jpg" }],
  },
  "personal-party": {
    introTitle: "A private celebration, made comfortably your own.",
    intro: ["Bring together family, friends or colleagues for an anniversary, reunion, festive dinner or personal milestone.", "Choose between indoor, lawn, restaurant and resort settings according to the atmosphere and scale of your gathering.", "Dining, room stays and parking can be discussed alongside the venue so guests enjoy a more convenient experience."],
    image2: "/images/celebration-table.jpg", image3: "/images/party.jpg",
    highlights: [{ value: "Indoor + outdoor", label: "Venue choices" }, { value: "In-house", label: "Dining available" }, { value: "On site", label: "Rooms and parking" }],
    features: [{ title: "Milestone occasions", text: "Plan anniversaries, reunions, family functions and intimate celebrations." }, { title: "Flexible settings", text: "Explore the banquet hall, lawns, restaurant or another suitable resort area." }, { title: "Comfort for guests", text: "Add rooms, food and parking requirements to the same planning conversation." }],
    journey: [{ title: "Set the mood", text: "Tell us whether the gathering should feel formal, festive, intimate or relaxed." }, { title: "Choose the setting", text: "Match the venue and timing to your approximate guest expectation." }, { title: "Confirm the plan", text: "Review dining, event timings and any additional requirements with the team." }],
    related: [{ label: "Birthday Parties", href: "/birthday-party", image: "/images/party.jpg" }, { label: "Pool Parties", href: "/pool-party", image: "/images/pool.jpg" }, { label: "Event Planning", href: "/event-planning", image: "/images/celebration-table.jpg" }], formType: "personal party",
  },
  "birthday-party": {
    introTitle: "Give every birthday a setting worth remembering.",
    intro: ["From a family lunch to an evening celebration, Nakshatra offers flexible settings for birthdays across age groups.", "Discuss indoor, lawn, restaurant or poolside possibilities along with dining, rooms and parking.", "Final venue use, timings, safety requirements and event inclusions are confirmed individually for each celebration."],
    image2: "/images/party.jpg", image3: "/images/celebration-table.jpg",
    highlights: [{ value: "All ages", label: "Birthday possibilities" }, { value: "Flexible", label: "Venue options" }, { value: "One address", label: "Food, rooms and parking" }],
    features: [{ title: "Family birthdays", text: "Bring multiple generations together in a comfortable resort setting." }, { title: "Milestone celebrations", text: "Plan a larger occasion with a venue, dining and guest-stay conversation." }, { title: "Kids’ celebrations", text: "Discuss age-appropriate venue use alongside the property’s children’s facilities." }],
    journey: [{ title: "Share the birthday plan", text: "Tell us the date, age group, preferred timing and approximate guest expectation." }, { title: "Choose the experience", text: "Explore a suitable indoor, outdoor, restaurant or poolside setting." }, { title: "Add the details", text: "Confirm food, timing, rooms and any external requirements before the day." }],
    related: [{ label: "Personal Parties", href: "/personal-party", image: "/images/celebration-table.jpg" }, { label: "Pool Parties", href: "/pool-party", image: "/images/pool.jpg" }, { label: "Restaurant", href: "/restaurant", image: "/images/restaurant.jpg" }], formType: "birthday party",
  },
  "pool-party": {
    introTitle: "A bright, relaxed celebration beside the water.",
    intro: ["Use Nakshatra’s resort setting to plan a refreshing poolside gathering for friends, family or a personal occasion.", "Poolside event use depends on the date, hotel operations, guest count and confirmed safety arrangements.", "Food, event timing, supervision and all event inclusions should be agreed with the hotel in advance."],
    image2: "/images/ground-floor-pool-gallery/nakshatra14.jpeg", image3: "/images/ground-floor-pool-gallery/nakshatra43.jpeg",
    highlights: [{ value: "Poolside", label: "Resort celebration setting" }, { value: "Planned", label: "Date-by-date confirmation" }, { value: "Flexible", label: "Food and room options" }],
    features: [{ title: "Poolside atmosphere", text: "Discuss a relaxed waterside gathering suited to the occasion and hotel operations." }, { title: "Stay and celebrate", text: "Combine a confirmed celebration plan with guest rooms and dining." }, { title: "Responsible planning", text: "Confirm pool access, timings, guest count, supervision and event rules before inviting guests." }],
    journey: [{ title: "Choose the date", text: "Share the preferred day, timing and approximate number of guests." }, { title: "Confirm pool suitability", text: "The hotel will confirm the appropriate setting and event-use conditions." }, { title: "Plan the gathering", text: "Align food, music, rooms, parking and safety expectations in advance." }],
    related: [{ label: "Ground-floor Guest Pool", href: "/ground-floor-pool", image: "/images/ground-floor-pool.jpg" }, { label: "Birthday Parties", href: "/birthday-party", image: "/images/party.jpg" }, { label: "Event Planning", href: "/event-planning", image: "/images/celebration-table.jpg" }], formType: "pool party",
  },
};

detailPages["ground-floor-pool"] = {
  introTitle: "An easy poolside escape, included with your room stay.",
  intro: ["Nakshatra’s ground-floor swimming pool is the guest pool available to registered room-booking visitors during their stay.", "Set within the resort grounds, it offers a relaxed place for a refreshing swim, poolside downtime and unhurried family moments without leaving the property.", "Pool hours, supervision requirements and operating rules are confirmed by the hotel."],
  image2: "/images/ground-floor-pool-gallery/nakshatra10.jpeg", image3: "/images/ground-floor-pool-gallery/nakshatra24.jpeg",
  highlights: [{ value: "Included", label: "For registered room guests" }, { value: "Ground floor", label: "Convenient resort access" }, { value: "10", label: "Real pool photographs" }],
  features: [{ title: "Part of your stay", text: "Registered room guests can use the ground-floor pool according to the hotel’s confirmed operating hours and rules." }, { title: "Relax within the resort", text: "Move easily between your room, breakfast, dining and time beside the water." }, { title: "Easy family time", text: "Enjoy a refreshing resort moment without leaving the hotel grounds." }],
  journey: [{ title: "Choose your room", text: "Select from four room styles and the meal package that suits your visit." }, { title: "Confirm pool access", text: "Ask the hotel team about current pool hours and guest-use requirements at check-in." }, { title: "Enjoy an easy resort day", text: "Settle into your room, enjoy breakfast and make time for a refreshing swim." }],
  related: [{ label: "Rooms & Suites", href: "/rooms", image: "/images/rooms/nakshatra1.jpeg" }, { label: "Amenities", href: "/amenities", image: "/images/ground-floor-pool.jpg" }, { label: "Restaurant", href: "/restaurant", image: "/images/restaurant-gallery/nakshatra18.jpeg" }],
};

detailPages["conference-and-meetings"] = detailPages["business-meetings"];
detailPages.about = detailPages["our-story"];
