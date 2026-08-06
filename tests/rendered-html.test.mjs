import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the finished Serptrix homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Serptrix — Digital Growth, Engineered<\/title>/i);
  assert.match(html, /We engineer/);
  assert.match(html, /Book a strategy call/i);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /href="\/services\/ai-technology"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders service, case-study, and blog routes", async () => {
  const [service, caseStudy, article] = await Promise.all([
    render("/services/seo-optimization"),
    render("/case-studies/confidential-saas-acquisition-system"),
    render("/blog/growth-stack-operating-system"),
  ]);
  for (const response of [service, caseStudy, article]) assert.equal(response.status, 200);
  assert.match(await service.text(), /Be found when qualified demand is forming/);
  assert.match(await caseStudy.text(), /UNVERIFIED PROJECT-DATA PLACEHOLDER/);
  assert.match(await article.text(), /BlogPosting/);
});

test("keeps production safeguards and animation systems in source", async () => {
  const [content, layout, styles, packageJson, home, motionShell] = await Promise.all([
    readFile(new URL("../content/site-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/home-experience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion-shell.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(content, /validateCaseStudy/);
  assert.match(content, /\[XX\]/);
  assert.match(layout, /ConsentManager/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(home, /@react-three\/fiber/);
  assert.match(home, /ScrollTrigger/);
  assert.match(home, /pointermove/);
  assert.match(motionShell, /new Lenis/);
  assert.match(motionShell, /gsap\.ticker\.add/);
});
