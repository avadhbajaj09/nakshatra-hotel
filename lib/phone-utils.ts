export function normalizePhone(raw: string): { e164: string; digits: string } | null {
  if (!raw || typeof raw !== "string") return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) {
    return { e164: `+91${digits}`, digits: `91${digits}` };
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return { e164: `+${digits}`, digits };
  }
  if (digits.length >= 10 && digits.length <= 15) {
    return { e164: `+${digits}`, digits };
  }
  return null;
}

export function buildDetailsLine(type: string, answers: Record<string, unknown> = {}): string {
  const parts: string[] = [];

  if (type === "room") {
    if (answers.room_type) parts.push(String(answers.room_type));
    if (answers.guests) parts.push(`${answers.guests} guests`);
    if (answers.check_in) parts.push(`Check-in: ${answers.check_in}`);
  } else if (type === "restaurant") {
    if (answers.when) parts.push(`When: ${answers.when}`);
    if (answers.guests) parts.push(`${answers.guests} people`);
  } else if (type === "banquet") {
    if (answers.function_type) parts.push(String(answers.function_type));
    if (answers.guests) parts.push(`${answers.guests} guests`);
    if (answers.date) parts.push(`Date: ${answers.date}`);
  } else if (type === "celebration") {
    if (answers.celebration_type) parts.push(String(answers.celebration_type));
    if (answers.guests) parts.push(`${answers.guests} guests`);
    if (answers.date) parts.push(`Date: ${answers.date}`);
  } else if (type === "question") {
    if (answers.question) parts.push(String(answers.question).slice(0, 100));
  }

  // Include any other remaining answers
  for (const [key, val] of Object.entries(answers)) {
    if (!["name", "phone", "room_type", "guests", "check_in", "when", "function_type", "date", "celebration_type", "question"].includes(key) && val) {
      parts.push(`${key}: ${val}`);
    }
  }

  const result = parts.join(", ").trim();
  return result.slice(0, 200) || "Direct website enquiry";
}

export function getEnquiryTypeLabel(type: string): string {
  switch (type) {
    case "room":
      return "Room Booking";
    case "restaurant":
      return "Restaurant Table";
    case "banquet":
      return "Banquet / Function";
    case "celebration":
      return "Other Celebration";
    case "question":
      return "General Question";
    default:
      return "Enquiry";
  }
}
