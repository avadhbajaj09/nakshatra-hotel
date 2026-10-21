import { NextResponse } from "next/server";
import { HOTEL_SYSTEM_PROMPT } from "@/lib/hotel-prompt";

// Rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const limit = 20;

  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) {
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Keep last 10 messages, trim to 500 chars
    const recentMessages = body.messages.slice(-10).map((m: { role?: string; content?: string }) => ({
      role: m.role === "user" ? "user" : "model",
      content: String(m.content || "").slice(0, 500),
    }));

    const apiKey = process.env.LLM_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "Welcome to Nakshatra Hotel & Resort! Our team is available to assist you with room bookings, dining, and events.",
        showMenu: true,
      });
    }

    // Prepare Gemini payload
    const contents = [
      {
        role: "user",
        parts: [{ text: HOTEL_SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will provide short, helpful 1-2 sentence answers strictly from Nakshatra Hotel info." }],
      },
      ...recentMessages.map((m: { role: string; content: string }) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
    ];

    const model = process.env.LLM_MODEL || "gemini-2.0-flash";
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 150,
          },
        }),
      }
    );

    if (!res.ok) {
      console.error("[api/chat] Gemini API error:", res.status, await res.text());
      return NextResponse.json({
        reply: "Our team would be happy to help with that! Would you like to check rooms, banquet halls, or speak with our manager?",
        showMenu: true,
      });
    }

    const data = await res.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Welcome to Nakshatra Hotel & Resort! How can our team assist you today?";

    return NextResponse.json({
      reply: replyText,
      showMenu: true,
    });
  } catch (err) {
    console.error("[api/chat] Error:", err);
    return NextResponse.json({
      reply: "Welcome to Nakshatra Hotel & Resort! Please let us know how we can assist you with your booking.",
      showMenu: true,
    });
  }
}
