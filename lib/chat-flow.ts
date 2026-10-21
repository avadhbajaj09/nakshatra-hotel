export type FlowKind = "buttons" | "text" | "phone" | "date" | "end";

export interface FlowOption {
  label: string;
  value: string;
  next: string;
}

export interface FlowNode {
  id: string;
  message: string | ((answers: Record<string, string | number | boolean>) => string);
  kind: FlowKind;
  field?: string;
  options?: FlowOption[];
  next?: string;
  leadType?: "room" | "restaurant" | "banquet" | "celebration" | "question" | "other";
}

export const CHAT_FLOW: Record<string, FlowNode> = {
  // Step 0 - Root Welcome Node
  welcome: {
    id: "welcome",
    message: "Welcome to Nakshatra Hotel & Resort 🙏 How can we help you today?",
    kind: "buttons",
    options: [
      { label: "🛏 Room Booking", value: "room", next: "room_date" },
      { label: "🍽 Restaurant Table", value: "restaurant", next: "restaurant_when" },
      { label: "🎉 Banquet / Function", value: "banquet", next: "banquet_type" },
      { label: "✨ Other Celebration", value: "celebration", next: "celebration_type" },
      { label: "❓ Ask a Question", value: "question", next: "question_prompt" },
    ],
  },

  // Path 1: Room Booking
  room_date: {
    id: "room_date",
    message: "Check-in date?",
    kind: "buttons",
    field: "check_in",
    leadType: "room",
    options: [
      { label: "Today", value: "Today", next: "room_guests" },
      { label: "Tomorrow", value: "Tomorrow", next: "room_guests" },
      { label: "This Weekend", value: "This Weekend", next: "room_guests" },
      { label: "Pick a Date", value: "pick_date", next: "room_date_picker" },
    ],
  },
  room_date_picker: {
    id: "room_date_picker",
    message: "Select your check-in date:",
    kind: "date",
    field: "check_in",
    leadType: "room",
    next: "room_guests",
  },
  room_guests: {
    id: "room_guests",
    message: "How many guests?",
    kind: "buttons",
    field: "guests",
    leadType: "room",
    options: [
      { label: "1–2", value: "1–2", next: "room_type" },
      { label: "3–4", value: "3–4", next: "room_type" },
      { label: "5+", value: "5+", next: "room_type" },
    ],
  },
  room_type: {
    id: "room_type",
    message: "Room type?",
    kind: "buttons",
    field: "room_type",
    leadType: "room",
    options: [
      { label: "Standard", value: "Standard", next: "room_name" },
      { label: "Deluxe", value: "Deluxe", next: "room_name" },
      { label: "Suite", value: "Suite", next: "room_name" },
      { label: "Not Sure", value: "Not Sure", next: "room_name" },
    ],
  },
  room_name: {
    id: "room_name",
    message: "May we have your name?",
    kind: "text",
    field: "name",
    leadType: "room",
    next: "room_phone",
  },
  room_phone: {
    id: "room_phone",
    message: "Your WhatsApp number?",
    kind: "phone",
    field: "phone",
    leadType: "room",
    next: "room_end",
  },
  room_end: {
    id: "room_end",
    message: (ans) => `Thank you, ${ans.name || "Guest"}! 🙏 Our team will contact you soon on WhatsApp.`,
    kind: "end",
    leadType: "room",
  },

  // Path 2: Restaurant Table
  restaurant_when: {
    id: "restaurant_when",
    message: "When would you like to visit?",
    kind: "buttons",
    field: "when",
    leadType: "restaurant",
    options: [
      { label: "Today Lunch", value: "Today Lunch", next: "restaurant_people" },
      { label: "Today Dinner", value: "Today Dinner", next: "restaurant_people" },
      { label: "Tomorrow", value: "Tomorrow", next: "restaurant_people" },
      { label: "Pick a Date", value: "pick_date", next: "restaurant_date_picker" },
    ],
  },
  restaurant_date_picker: {
    id: "restaurant_date_picker",
    message: "Select your visit date:",
    kind: "date",
    field: "when",
    leadType: "restaurant",
    next: "restaurant_people",
  },
  restaurant_people: {
    id: "restaurant_people",
    message: "How many people?",
    kind: "buttons",
    field: "guests",
    leadType: "restaurant",
    options: [
      { label: "1–2", value: "1–2", next: "restaurant_name" },
      { label: "3–5", value: "3–5", next: "restaurant_name" },
      { label: "6–10", value: "6–10", next: "restaurant_name" },
      { label: "10+", value: "10+", next: "restaurant_name" },
    ],
  },
  restaurant_name: {
    id: "restaurant_name",
    message: "May we have your name?",
    kind: "text",
    field: "name",
    leadType: "restaurant",
    next: "restaurant_phone",
  },
  restaurant_phone: {
    id: "restaurant_phone",
    message: "Your WhatsApp number?",
    kind: "phone",
    field: "phone",
    leadType: "restaurant",
    next: "restaurant_end",
  },
  restaurant_end: {
    id: "restaurant_end",
    message: (ans) => `Thank you, ${ans.name || "Guest"}! 🙏 Our team will contact you soon on WhatsApp.`,
    kind: "end",
    leadType: "restaurant",
  },

  // Path 3: Banquet / Function
  banquet_type: {
    id: "banquet_type",
    message: "What type of function?",
    kind: "buttons",
    field: "function_type",
    leadType: "banquet",
    options: [
      { label: "Wedding", value: "Wedding", next: "banquet_guests" },
      { label: "Engagement", value: "Engagement", next: "banquet_guests" },
      { label: "Birthday", value: "Birthday", next: "banquet_guests" },
      { label: "Corporate", value: "Corporate", next: "banquet_guests" },
      { label: "Other", value: "Other", next: "banquet_guests" },
    ],
  },
  banquet_guests: {
    id: "banquet_guests",
    message: "Approximate guests?",
    kind: "buttons",
    field: "guests",
    leadType: "banquet",
    options: [
      { label: "Up to 50", value: "Up to 50", next: "banquet_date" },
      { label: "50–150", value: "50–150", next: "banquet_date" },
      { label: "150–300", value: "150–300", next: "banquet_date" },
      { label: "300+", value: "300+", next: "banquet_date" },
    ],
  },
  banquet_date: {
    id: "banquet_date",
    message: "Date of function?",
    kind: "buttons",
    field: "date",
    leadType: "banquet",
    options: [
      { label: "Within 1 Month", value: "Within 1 Month", next: "banquet_name" },
      { label: "1–3 Months", value: "1–3 Months", next: "banquet_name" },
      { label: "3+ Months", value: "3+ Months", next: "banquet_name" },
      { label: "Pick a Date", value: "pick_date", next: "banquet_date_picker" },
    ],
  },
  banquet_date_picker: {
    id: "banquet_date_picker",
    message: "Select the function date:",
    kind: "date",
    field: "date",
    leadType: "banquet",
    next: "banquet_name",
  },
  banquet_name: {
    id: "banquet_name",
    message: "May we have your name?",
    kind: "text",
    field: "name",
    leadType: "banquet",
    next: "banquet_phone",
  },
  banquet_phone: {
    id: "banquet_phone",
    message: "Your WhatsApp number?",
    kind: "phone",
    field: "phone",
    leadType: "banquet",
    next: "banquet_end",
  },
  banquet_end: {
    id: "banquet_end",
    message: (ans) => `Thank you, ${ans.name || "Guest"}! 🙏 Our team will contact you soon on WhatsApp.`,
    kind: "end",
    leadType: "banquet",
  },

  // Path 4: Other Celebration
  celebration_type: {
    id: "celebration_type",
    message: "What are you celebrating?",
    kind: "buttons",
    field: "celebration_type",
    leadType: "celebration",
    options: [
      { label: "Birthday Party", value: "Birthday Party", next: "celebration_guests" },
      { label: "Anniversary", value: "Anniversary", next: "celebration_guests" },
      { label: "Kitty / Get-together", value: "Kitty / Get-together", next: "celebration_guests" },
      { label: "Other", value: "Other", next: "celebration_guests" },
    ],
  },
  celebration_guests: {
    id: "celebration_guests",
    message: "Approximate guests?",
    kind: "buttons",
    field: "guests",
    leadType: "celebration",
    options: [
      { label: "Up to 20", value: "Up to 20", next: "celebration_date" },
      { label: "20–50", value: "20–50", next: "celebration_date" },
      { label: "50+", value: "50+", next: "celebration_date" },
    ],
  },
  celebration_date: {
    id: "celebration_date",
    message: "When is the celebration?",
    kind: "buttons",
    field: "date",
    leadType: "celebration",
    options: [
      { label: "This Week", value: "This Week", next: "celebration_name" },
      { label: "This Month", value: "This Month", next: "celebration_name" },
      { label: "Pick a Date", value: "pick_date", next: "celebration_date_picker" },
    ],
  },
  celebration_date_picker: {
    id: "celebration_date_picker",
    message: "Select the date:",
    kind: "date",
    field: "date",
    leadType: "celebration",
    next: "celebration_name",
  },
  celebration_name: {
    id: "celebration_name",
    message: "May we have your name?",
    kind: "text",
    field: "name",
    leadType: "celebration",
    next: "celebration_phone",
  },
  celebration_phone: {
    id: "celebration_phone",
    message: "Your WhatsApp number?",
    kind: "phone",
    field: "phone",
    leadType: "celebration",
    next: "celebration_end",
  },
  celebration_end: {
    id: "celebration_end",
    message: (ans) => `Thank you, ${ans.name || "Guest"}! 🙏 Our team will contact you soon on WhatsApp.`,
    kind: "end",
    leadType: "celebration",
  },

  // Path 5: Ask a Question
  question_prompt: {
    id: "question_prompt",
    message: "Please type your question about rooms, dining, or banquet facilities:",
    kind: "text",
    field: "question",
    leadType: "question",
  },
  question_name: {
    id: "question_name",
    message: "May we have your name to connect you with our team?",
    kind: "text",
    field: "name",
    leadType: "question",
    next: "question_phone",
  },
  question_phone: {
    id: "question_phone",
    message: "Your WhatsApp number?",
    kind: "phone",
    field: "phone",
    leadType: "question",
    next: "question_end",
  },
  question_end: {
    id: "question_end",
    message: (ans) => `Thank you, ${ans.name || "Guest"}! 🙏 Our team will contact you soon on WhatsApp.`,
    kind: "end",
    leadType: "question",
  },
};
