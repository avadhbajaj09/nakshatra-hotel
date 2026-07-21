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
  assert.match(layout, /og-rooftop-v2\.png/);
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
