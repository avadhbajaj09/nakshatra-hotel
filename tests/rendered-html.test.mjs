import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the finished Nakshatra homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Nakshatra Hotel &amp; Resort/i);
  assert.match(html, /Ethereal stay/i);
  assert.match(html, /Check availability/i);
  assert.match(html, /main-front-facade\.webp/i);
  assert.match(html, /nakshatra-logo-gold-transparent-v2\.png/i);
  assert.match(html, /Ask me anything/i);
  assert.match(html, /Nakshatra concierge/i);
  assert.doesNotMatch(html, /wa\.me|WhatsApp/i);
  assert.match(html, /53/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("ships brand metadata and no starter preview", async () => {
  const [layout, page, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /Nakshatra Hotel & Resort/);
  assert.match(layout, /og-glass-v4\.png/);
  assert.match(layout, /HotelChatbot/);
  assert.doesNotMatch(layout, /wa\.me|WhatsApp/);
  assert.match(page, /Stay, Weddings & Dining in Khargone/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(layout + page, /codex-preview|_sites-preview/);
});

test("renders expanded story and event destinations", async () => {
  for (const route of ["/our-story", "/wedding-hall", "/wedding-garden", "/parking", "/event-planning", "/business-meetings", "/private-rooftop-pool"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /DISCOVER THE DETAILS/i, route);
    assert.match(html, /HOW TO PLAN/i, route);
  }
});

test("publishes the confirmed two-pool offer", async () => {
  const response = await render("/private-rooftop-pool");
  const html = await response.text();
  assert.match(html, /₹2,000/);
  assert.match(html, /third.floor/i);
  assert.match(html, /with(?:out)? a room|without a stay/i);
});

test("renders the expanded rooms and amenities stories", async () => {
  const rooms = await render("/rooms");
  assert.equal(rooms.status, 200);
  const roomsHtml = await rooms.text();
  assert.match(roomsHtml, /YOUR STAY, YOUR WAY/i);
  assert.match(roomsHtml, /COMFORT, INCLUDED/i);
  assert.match(roomsHtml, /GUEST-BASED DINING/i);
  assert.match(roomsHtml, /₹2,000 per hour/i);

  const amenities = await render("/amenities");
  assert.equal(amenities.status, 200);
  const amenitiesHtml = await amenities.text();
  assert.match(amenitiesHtml, /Ground-floor pool/i);
  assert.match(amenitiesHtml, /Rooftop pool/i);
  assert.match(amenitiesHtml, /MORE THAN A ROOM/i);
});

test("renders the room product, checkout and pay-at-hotel thank-you flow", async () => {
  const product = await render("/rooms/classic");
  assert.equal(product.status, 200);
  const productHtml = await product.text();
  assert.match(productHtml, /Choose your stay package/i);
  assert.match(productHtml, /Breakfast \+ meal/i);
  assert.match(productHtml, /private rooftop pool/i);

  const checkout = await render("/booking/checkout?room=classic&in=2026-07-22&out=2026-07-24&guests=2&plan=breakfast&poolHours=1");
  assert.equal(checkout.status, 200);
  const checkoutHtml = await checkout.text();
  assert.match(checkoutHtml, /Payment method/i);
  assert.match(checkoutHtml, /Pay at hotel/i);
  assert.match(checkoutHtml, /Cash/i);

  const thankYou = await render("/booking/thank-you?reference=NKS-123456&room=classic&in=2026-07-22&out=2026-07-24&guests=2&plan=breakfast&total=9999");
  assert.equal(thankYou.status, 200);
  const thankYouHtml = await thankYou.text();
  assert.match(thankYouHtml, /Thank you/i);
  assert.match(thankYouHtml, /NKS-123456/);
});
