/**
 * Indian Festival and Celebration Calendar helper for Nakshatra Hotel & Resort.
 * Maps notable festivals by date (YYYY-MM-DD) for 2026-2027.
 */

export interface FestivalInfo {
  name: string;
  greeting: string;
}

export const FESTIVALS_CALENDAR: Record<string, FestivalInfo> = {
  // 2026
  "2026-01-01": { name: "New Year's Day", greeting: "Happy New Year! Wishing you and your loved ones peace and prosperity." },
  "2026-01-14": { name: "Makar Sankranti", greeting: "Happy Makar Sankranti! May this festive season bring immense happiness and success." },
  "2026-01-26": { name: "Republic Day", greeting: "Happy Republic Day! Proudly celebrating the spirit of India." },
  "2026-02-15": { name: "Maha Shivratri", greeting: "Har Har Mahadev! Wishing you auspicious blessings on Maha Shivratri." },
  "2026-03-03": { name: "Holi", greeting: "Happy Holi! May your life be filled with vibrant colours of joy, love, and health." },
  "2026-03-19": { name: "Gudi Padwa / Chaitra Navratri", greeting: "Happy Navratri! May Goddess Durga bless you and your family with strength and happiness." },
  "2026-03-27": { name: "Ram Navami", greeting: "Happy Ram Navami! May Lord Rama shower divine blessings upon you." },
  "2026-04-14": { name: "Baisakhi / Ambedkar Jayanti", greeting: "Heartiest festive greetings to you and your family." },
  "2026-08-15": { name: "Independence Day", greeting: "Happy Independence Day! Celebrating India's freedom and glory." },
  "2026-08-28": { name: "Raksha Bandhan", greeting: "Happy Raksha Bandhan! Celebrating the eternal bond of love and protection." },
  "2026-09-04": { name: "Janmashtami", greeting: "Happy Krishna Janmashtami! May Lord Krishna bring joy and bliss to your life." },
  "2026-09-14": { name: "Ganesh Chaturthi", greeting: "Ganpati Bappa Morya! Wishing you prosperity, wisdom, and auspicious beginnings." },
  "2026-10-11": { name: "Navratri", greeting: "Shubh Navratri! May Maa Durga bless your home with peace and abundance." },
  "2026-10-20": { name: "Dussehra", greeting: "Happy Dussehra! Celebrating the victory of good over evil." },
  "2026-11-06": { name: "Dhanteras", greeting: "Shubh Dhanteras! Wishing you wealth, health, and happiness." },
  "2026-11-08": { name: "Diwali", greeting: "Happy Diwali! May the festival of lights illuminate your life with joy and success." },
  "2026-11-10": { name: "Bhai Dooj", greeting: "Happy Bhai Dooj! Wishing warmth and happiness to you and your family." },
  "2026-12-25": { name: "Christmas", greeting: "Merry Christmas! Wishing you peace, warmth, and joyful holidays." },
  // 2027
  "2027-01-01": { name: "New Year's Day", greeting: "Happy New Year 2027! Best wishes from Nakshatra Hotel & Resort." },
};

/**
 * Returns festival info if today matches a designated festival.
 */
export function getFestivalToday(dateString?: string): FestivalInfo | null {
  const d = dateString || new Date().toISOString().slice(0, 10);
  return FESTIVALS_CALENDAR[d] || null;
}
