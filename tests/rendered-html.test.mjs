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
  for (const route of ["/our-story", "/wedding-hall", "/wedding-garden", "/parking", "/event-planning", "/business-meetings", "/private-rooftop-pool", "/ground-floor-pool"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /DISCOVER THE DETAILS/i, route);
    assert.match(html, /HOW TO PLAN/i, route);
  }
});

test("uses every supplied pool, restaurant and Grand Hall gallery image", async () => {
  const gallerySource = await readFile(new URL("../lib/galleries.ts", import.meta.url), "utf8");
  assert.equal([...gallerySource.matchAll(/\/images\/private-pool-gallery\//g)].length, 11);
  assert.equal([...gallerySource.matchAll(/\/images\/ground-floor-pool-gallery\//g)].length, 10);
  assert.equal([...gallerySource.matchAll(/\/images\/restaurant-gallery\//g)].length, 12);
  assert.equal([...gallerySource.matchAll(/\/images\/grand-hall-gallery\//g)].length, 11);

  for (const [route, firstImage, countLabel] of [
    ["/private-rooftop-pool", "private-pool-gallery/nakshatra25.jpeg", "11 REAL PROPERTY PHOTOGRAPHS"],
    ["/ground-floor-pool", "ground-floor-pool-gallery/nakshatra10.jpeg", "10 REAL PROPERTY PHOTOGRAPHS"],
    ["/restaurant", "restaurant-gallery/nakshatra18.jpeg", "12 REAL RESTAURANT PHOTOGRAPHS"],
    ["/wedding-hall", "grand-hall-gallery/nakshatra42.jpeg", "11 REAL GRAND HALL PHOTOGRAPHS"],
  ]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(firstImage.replaceAll("/", "\\/")), route);
    assert.match(html, new RegExp(countLabel), route);
  }
});

test("publishes the confirmed two-pool offer", async () => {
  const response = await render("/private-rooftop-pool");
  const html = await response.text();
  assert.match(html, /₹2,000/);
  assert.match(html, /third.floor/i);
  assert.match(html, /with(?:out)? a room|without a stay/i);
});

test("uses the real rooftop night image for the private pool", async () => {
  const home = await render("/");
  const html = await home.text();
  assert.match(html, /private-pool-gallery\/nakshatra28\.jpeg/);
  assert.doesNotMatch(html, /private-rooftop-pool-night\.jpg/);
});

test("renders the expanded rooms and amenities stories", async () => {
  const rooms = await render("/rooms");
  assert.equal(rooms.status, 200);
  const roomsHtml = await rooms.text();
  assert.match(roomsHtml, /YOUR STAY, YOUR WAY/i);
  assert.match(roomsHtml, /COMFORT, INCLUDED/i);
  assert.match(roomsHtml, /GUEST-BASED DINING/i);
  assert.match(roomsHtml, /₹2,000 per hour/i);
  assert.match(roomsHtml, /rooms\/nakshatra54\.jpeg/);
  assert.match(roomsHtml, /rooms\/nakshatra55\.jpeg/);
  assert.doesNotMatch(roomsHtml.match(/<section class="rooms-photo-band">[\s\S]*?<\/section>/)?.[0] || "", /nakshatra63|nakshatra65/);

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

test("uses luxury icons and responsive swipe galleries", async () => {
  const home = await render("/");
  const homeHtml = await home.text();
  assert.match(homeHtml, /GRAND INDOOR VENUE/);
  assert.doesNotMatch(homeHtml, /01 · INCLUDED|02 · ₹2,000/);

  const amenities = await render("/amenities");
  const amenitiesHtml = await amenities.text();
  assert.match(amenitiesHtml, /luxury-icon/);
  assert.doesNotMatch(amenitiesHtml, />01<|>02<|>03</);

  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /scroll-snap-type:x mandatory/);
  assert.match(styles, /property-gallery-grid\{display:flex/);
  assert.match(styles, /rooms-photo-band\{display:flex/);
});

test("renders the cinematic property hero and simplified responsive header", async () => {
  const home = await render("/");
  const html = await home.text();
  assert.match(html, /private-pool-gallery\/nakshatra25\.jpeg/);
  assert.match(html, /restaurant-gallery\/nakshatra18\.jpeg/);
  assert.match(html, /main-front-facade\.webp/);
  assert.match(html, /Choose hero image/);

  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /hero-slider-nav/);
  assert.match(styles, /nav-book\{display:none!important/);
  assert.match(styles, /@media\(max-width:700px\)\{\.hero-slider-nav\{display:none!important\}\}/);
});
