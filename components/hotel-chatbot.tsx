"use client";

import { useEffect, useRef, useState, useId } from "react";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  X,
  RotateCcw,
  Send,
  Sparkles,
  Calendar,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { CHAT_FLOW, FlowNode, FlowOption } from "@/lib/chat-flow";

type MessageItem = {
  id: string;
  sender: "bot" | "user";
  text: string;
  nodeId?: string;
  options?: FlowOption[];
  isDatePicker?: boolean;
  isAiResponse?: boolean;
  quickActions?: { label: string; action: () => void }[];
  timestamp: number;
};

const STORAGE_KEY = "nakshatra_chat_state_v2";

export function HotelChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string>("welcome");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [sessionId, setSessionId] = useState<string>("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const honeypotId = useId();

  // Initialize or restore session
  useEffect(() => {
    let sid = "";
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sessionId) {
          setSessionId(parsed.sessionId);
          sid = parsed.sessionId;
          setCurrentNodeId(parsed.currentNodeId || "welcome");
          setAnswers(parsed.answers || {});
          setMessages(parsed.messages || []);
          setLeadSubmitted(Boolean(parsed.leadSubmitted));
        }
      }
    } catch (e) {
      console.warn("Failed to restore chat session:", e);
    }

    if (!sid) {
      const newSid = "sess_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
      setSessionId(newSid);
      const rootNode = CHAT_FLOW["welcome"];
      const welcomeMsg: MessageItem = {
        id: "msg_welcome",
        sender: "bot",
        text: typeof rootNode.message === "function" ? rootNode.message({}) : rootNode.message,
        nodeId: "welcome",
        options: rootNode.options,
        timestamp: Date.now(),
      };
      setMessages([welcomeMsg]);
      setCurrentNodeId("welcome");
    }
  }, []);

  // Save session state to sessionStorage
  useEffect(() => {
    if (!sessionId) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          sessionId,
          currentNodeId,
          answers,
          messages: messages.slice(-30),
          leadSubmitted,
        })
      );
    } catch (e) {
      console.warn("Failed to save chat state:", e);
    }
  }, [sessionId, currentNodeId, answers, messages, leadSubmitted]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, currentNodeId]);

  const currentNode: FlowNode = CHAT_FLOW[currentNodeId] || CHAT_FLOW["welcome"];

  const sendPartialLead = async (updatedAnswers: Record<string, string>, node: FlowNode) => {
    if (leadSubmitted) return;
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          type: node.leadType || "other",
          answers: updatedAnswers,
          name: updatedAnswers.name,
          phone: updatedAnswers.phone,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          honeypot,
          partial: true,
          marketingOptIn,
        }),
      });
    } catch {
      // Non-critical, ignore
    }
  };

  const handleOptionClick = (option: FlowOption) => {
    const nextNode = CHAT_FLOW[option.next];
    if (!nextNode) return;

    const newAnswers = { ...answers };
    if (currentNode.field) {
      newAnswers[currentNode.field] = option.value;
      setAnswers(newAnswers);
    }

    const userMsg: MessageItem = {
      id: "usr_" + Date.now(),
      sender: "user",
      text: option.label,
      timestamp: Date.now(),
    };

    const nextMsgText =
      typeof nextNode.message === "function" ? nextNode.message(newAnswers) : nextNode.message;

    const botMsg: MessageItem = {
      id: "bot_" + (Date.now() + 1),
      sender: "bot",
      text: nextMsgText,
      nodeId: nextNode.id,
      options: nextNode.options,
      isDatePicker: nextNode.kind === "date",
      timestamp: Date.now() + 1,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setCurrentNodeId(nextNode.id);

    // Save partial progress
    if (currentNode.field) {
      sendPartialLead(newAnswers, nextNode);
    }
  };

  const handleDateConfirm = () => {
    if (!selectedDate) return;
    const nextNodeId = currentNode.next || "welcome";
    const nextNode = CHAT_FLOW[nextNodeId];
    if (!nextNode) return;

    const newAnswers = { ...answers };
    if (currentNode.field) {
      newAnswers[currentNode.field] = selectedDate;
      setAnswers(newAnswers);
    }

    const userMsg: MessageItem = {
      id: "usr_" + Date.now(),
      sender: "user",
      text: selectedDate,
      timestamp: Date.now(),
    };

    const nextMsgText =
      typeof nextNode.message === "function" ? nextNode.message(newAnswers) : nextNode.message;

    const botMsg: MessageItem = {
      id: "bot_" + (Date.now() + 1),
      sender: "bot",
      text: nextMsgText,
      nodeId: nextNode.id,
      options: nextNode.options,
      timestamp: Date.now() + 1,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setCurrentNodeId(nextNode.id);
    setSelectedDate("");

    sendPartialLead(newAnswers, nextNode);
  };

  const submitFinalLead = async (finalAnswers: Record<string, string>, node: FlowNode) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          type: node.leadType || "other",
          answers: finalAnswers,
          name: finalAnswers.name || "Guest",
          phone: finalAnswers.phone,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          honeypot,
          partial: false,
          marketingOptIn,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setLeadSubmitted(true);
    } catch (err: unknown) {
      console.error("Lead submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setInputValue("");

    // If currentNode is asking for free text (Question path)
    if (currentNode.id === "question_prompt" || (!currentNode.field && currentNode.kind === "text")) {
      const userMsg: MessageItem = {
        id: "usr_" + Date.now(),
        sender: "user",
        text,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const chatRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: text }],
            sessionId,
          }),
        });

        const chatData = await chatRes.json();
        const aiReply =
          chatData.message ||
          "We offer luxury stays, wedding banquet halls, swimming pools, and fine dining. How can we help you?";

        const botReply: MessageItem = {
          id: "bot_" + Date.now(),
          sender: "bot",
          text: aiReply,
          isAiResponse: true,
          quickActions: [
            {
              label: "🛏 Room Booking",
              action: () => jumpToNode("room_date"),
            },
            {
              label: "🍽 Restaurant",
              action: () => jumpToNode("restaurant_when"),
            },
            {
              label: "🎉 Banquet",
              action: () => jumpToNode("banquet_type"),
            },
            {
              label: "💬 Talk to Team",
              action: () => jumpToNode("question_name"),
            },
          ],
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, botReply]);
      } catch {
        const errorBotMsg: MessageItem = {
          id: "bot_" + Date.now(),
          sender: "bot",
          text: "Our team would be delighted to assist you directly with any details.",
          quickActions: [
            {
              label: "💬 Talk to Team",
              action: () => jumpToNode("question_name"),
            },
            {
              label: "🛏 Room Booking",
              action: () => jumpToNode("room_date"),
            },
          ],
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorBotMsg]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Normal text or phone node
    const newAnswers = { ...answers };
    if (currentNode.field) {
      newAnswers[currentNode.field] = text;
      setAnswers(newAnswers);
    }

    const userMsg: MessageItem = {
      id: "usr_" + Date.now(),
      sender: "user",
      text,
      timestamp: Date.now(),
    };

    const nextNodeId = currentNode.next || "welcome";
    const nextNode = CHAT_FLOW[nextNodeId];

    if (!nextNode) {
      setMessages((prev) => [...prev, userMsg]);
      return;
    }

    const nextMsgText =
      typeof nextNode.message === "function" ? nextNode.message(newAnswers) : nextNode.message;

    const botMsg: MessageItem = {
      id: "bot_" + (Date.now() + 1),
      sender: "bot",
      text: nextMsgText,
      nodeId: nextNode.id,
      options: nextNode.options,
      timestamp: Date.now() + 1,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setCurrentNodeId(nextNode.id);

    // If nextNode is the End node, submit full lead
    if (nextNode.kind === "end" || currentNode.kind === "phone") {
      await submitFinalLead(newAnswers, nextNode);
    } else {
      sendPartialLead(newAnswers, nextNode);
    }
  };

  const jumpToNode = (targetNodeId: string) => {
    const targetNode = CHAT_FLOW[targetNodeId];
    if (!targetNode) return;

    const botMsg: MessageItem = {
      id: "bot_" + Date.now(),
      sender: "bot",
      text:
        typeof targetNode.message === "function"
          ? targetNode.message(answers)
          : targetNode.message,
      nodeId: targetNode.id,
      options: targetNode.options,
      isDatePicker: targetNode.kind === "date",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setCurrentNodeId(targetNode.id);
  };

  const handleReset = () => {
    const newSid = "sess_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    setSessionId(newSid);
    setAnswers({});
    setLeadSubmitted(false);
    setSelectedDate("");
    setInputValue("");

    const rootNode = CHAT_FLOW["welcome"];
    const welcomeMsg: MessageItem = {
      id: "msg_welcome_" + Date.now(),
      sender: "bot",
      text: typeof rootNode.message === "function" ? rootNode.message({}) : rootNode.message,
      nodeId: "welcome",
      options: rootNode.options,
      timestamp: Date.now(),
    };

    setMessages([welcomeMsg]);
    setCurrentNodeId("welcome");
  };

  // Min and max dates for date picker
  const todayStr = new Date().toISOString().split("T")[0];
  const nextYearStr = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        className={`chatbot-launcher ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close Nakshatra Concierge" : "Chat with Nakshatra Concierge"}
        aria-expanded={isOpen}
      >
        <span className="chatbot-launcher-icon">
          {isOpen ? <X className="w-5 h-5 text-forest-950" /> : <MessageCircle className="w-5 h-5 text-forest-950" />}
        </span>
        <span className="flex flex-col text-left">
          <small className="text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">
            Nakshatra Concierge
          </small>
          <b className="text-sm font-serif text-white">
            {isOpen ? "Close chat" : "Enquire & Book"}
          </b>
        </span>
      </button>

      {/* Chat Window Panel */}
      <aside
        className={`hotel-chatbot glass-panel ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
        aria-label="Nakshatra Hotel Concierge Chat"
        style={{
          display: isOpen ? "grid" : "none",
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-3.5 bg-[#092218] border-b border-[#c9a961]/30 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a961] to-[#9c7c3c] flex items-center justify-center text-[#092218] font-bold text-lg shadow">
              ✦
            </div>
            <div>
              <b className="block font-serif text-sm tracking-wide text-[#e1c781]">
                Nakshatra Concierge
              </b>
              <small className="flex items-center gap-1.5 text-[11px] text-[#f5f1e8]/70">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live · Instant WhatsApp Confirmation
              </small>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition"
              title="Reset conversation"
              aria-label="Start over"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Messages Feed */}
        <div className="chatbot-feed p-4 overflow-y-auto space-y-3.5 bg-[#fcfbfa]/95 text-slate-800 text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#0b2b1f] text-white rounded-br-xs"
                    : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="flex items-center gap-1 text-[11px] text-[#9c7c3c] font-semibold mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Nakshatra Concierge</span>
                  </div>
                )}
                <p className="whitespace-pre-line leading-relaxed text-[13px]">{msg.text}</p>
              </div>

              {/* Quick AI Options / Buttons */}
              {msg.quickActions && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                  {msg.quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={action.action}
                      className="text-xs bg-white hover:bg-[#0b2b1f] hover:text-white text-[#0b2b1f] border border-[#0b2b1f]/20 rounded-full px-3 py-1.5 font-medium transition shadow-xs flex items-center gap-1"
                    >
                      {action.label}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
              <Loader2 className="w-4 h-4 animate-spin text-[#9c7c3c]" />
              <span>Checking details…</span>
            </div>
          )}

          {/* Date Picker Interface for current node */}
          {currentNode.kind === "date" && !leadSubmitted && (
            <div className="bg-white p-3 rounded-xl border border-[#c9a961]/40 shadow-sm mt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#9c7c3c]" />
                Select date:
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  min={todayStr}
                  max={nextYearStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#9c7c3c]"
                />
                <button
                  type="button"
                  onClick={handleDateConfirm}
                  disabled={!selectedDate}
                  className="bg-[#0b2b1f] hover:bg-[#124231] disabled:opacity-50 text-white text-xs px-3.5 py-1.5 rounded-lg font-medium transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Buttons Rail for Current Active Node */}
        {currentNode.kind === "buttons" && currentNode.options && !leadSubmitted && (
          <div className="p-3 bg-[#f3eee5] border-t border-slate-200 flex flex-wrap gap-2">
            {currentNode.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleOptionClick(opt)}
                className="bg-white hover:bg-[#0b2b1f] hover:text-white text-[#0b2b1f] text-xs font-medium px-3.5 py-2 rounded-xl border border-slate-200 hover:border-[#0b2b1f] transition shadow-xs"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Form for Text / Phone Nodes / General questions */}
        {(currentNode.kind === "text" || currentNode.kind === "phone") && !leadSubmitted && (
          <form
            onSubmit={handleTextSubmit}
            className="p-3 bg-white border-t border-slate-200 space-y-2"
          >
            {/* Honeypot hidden input for bot detection */}
            <input
              type="text"
              id={honeypotId}
              name="hotel_website_verify"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none", position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />

            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type={currentNode.kind === "phone" ? "tel" : "text"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  currentNode.kind === "phone"
                    ? "Enter 10-digit WhatsApp number…"
                    : "Type your name or question…"
                }
                className="flex-1 border border-slate-300 rounded-full px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#9c7c3c]"
                required
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-[#0b2b1f] hover:bg-[#124231] disabled:opacity-40 text-[#e1c781] flex items-center justify-center transition shadow-xs"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {currentNode.kind === "phone" && (
              <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer pt-0.5">
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  className="rounded text-[#0b2b1f] focus:ring-[#9c7c3c]"
                />
                <span>Receive booking confirmation &amp; exclusive offers on WhatsApp</span>
              </label>
            )}
          </form>
        )}

        {/* End Node State or Quick Action bar */}
        {currentNode.kind === "end" && (
          <div className="p-4 bg-emerald-50 border-t border-emerald-200 text-center space-y-2">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs text-emerald-900 font-medium">
              Enquiry received! Our manager will message you shortly.
            </p>
            <a
              href={`https://wa.me/918878933778?text=Hello%20Nakshatra%20Hotel%2C%20I%20just%20submitted%20an%20enquiry%20on%20your%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-800 underline font-medium hover:text-emerald-950"
            >
              Need immediate help? Message us directly on WhatsApp &rarr;
            </a>
          </div>
        )}

        {/* Footer fallback */}
        <footer className="p-2.5 bg-[#f8f6f0] border-t border-slate-200 text-center flex items-center justify-between text-[11px] text-slate-500 px-4">
          <span>Hotel &amp; Resort Khargone</span>
          <a
            href="https://wa.me/918878933778?text=Hello%20Nakshatra%20Hotel%2C%20I%20have%20a%20query."
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Direct WhatsApp
          </a>
        </footer>
      </aside>
    </>
  );
}
