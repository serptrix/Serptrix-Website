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
  assert.match(html, /We build the systems/);
  assert.match(html, /Three capabilities\./);
  assert.match(html, /One connected growth system\./);
  assert.match(html, /Turn visibility into/);
  assert.match(html, /Digital products engineered to/);
  assert.match(html, /Practical AI and automation built around/);
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
  const [content, layout, styles, packageJson, home, motionShell, smoothScroll, heroScene, workflowScene, particleField, tokens, siteShell, magnetic, gsapRuntime, reducedMotionHook, projectForm, workRoute, insightsRoute, serviceSections] = await Promise.all([
    readFile(new URL("../content/site-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/home-experience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion-shell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion/smooth-scroll-provider.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion/hero-scene.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion/workflow-scene.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion/particle-field.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion/tokens.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-shell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion/magnetic-button.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion/gsap-runtime.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/motion/use-reduced-motion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/project-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/work/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/insights/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/service-sections.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(content, /validateCaseStudy/);
  assert.match(content, /\[XX\]/);
  assert.match(layout, /ConsentManager/);
  assert.match(layout, /Sora/);
  assert.match(layout, /Inter/);
  assert.match(layout, /display:\s*"swap"/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /--text-display:\s*clamp\(2\.5rem,\s*5vw,\s*4\.5rem\)/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /button,\.btn,\.srx-button,\.nav-cta,a\[role="button"\]\{border-radius:50px\}/);
  assert.match(styles, /\.s12-final\{min-height:400px\}/);
  assert.match(styles, /\.srx-shell\{width:100%;padding:0 6%\}/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(home, /dynamic\(\(\) => import\("\.\/motion\/hero-scene"\)/);
  assert.equal((home.match(/<section/g) ?? []).length + (serviceSections.match(/<section/g) ?? []).length, 13);
  assert.doesNotMatch(serviceSections, /ScrollTrigger|pin:\s*true/);
  assert.match(home, /Your next stage of growth/);
  assert.match(home, /Trusted words should be.*earned/);
  assert.match(home, /does not publish invented/);
  assert.match(home, /OUTCOME FRAMEWORK/);
  assert.doesNotMatch(home, /PlaceholderCounter/);
  assert.match(home, /WorkflowScene/);
  assert.match(home, /ScrollTrigger/);
  assert.match(home, /pointermove/);
  assert.match(motionShell, /SmoothScrollProvider/);
  assert.match(motionShell, /PageTransition/);
  assert.match(smoothScroll, /new Lenis/);
  assert.match(smoothScroll, /gsap\.ticker\.add/);
  assert.match(heroScene, /@react-three\/fiber/);
  assert.match(heroScene, /@react-three\/drei/);
  assert.match(heroScene, /frameloop=\{visible\s*\?\s*"always"\s*:\s*"never"\}/);
  assert.match(workflowScene, /frameloop=\{visible\s*\?\s*"always"\s*:\s*"never"\}/);
  assert.match(particleField, /IntersectionObserver/);
  assert.match(packageJson, /@react-three\/drei/);
  assert.match(gsapRuntime, /gsap\.registerPlugin\(ScrollTrigger\)/);
  assert.match(gsapRuntime, /context\.revert/);
  assert.match(reducedMotionHook, /reducedMotion/);
  assert.match(tokens, /premium/);
  assert.match(siteShell, /event\.key === "Escape"/);
  assert.match(siteShell, /document\.activeElement === last/);
  assert.match(siteShell, /mega-panel-bg/);
  assert.match(siteShell, /pointerdown/);
  assert.doesNotMatch(siteShell, /footer-lead/);
  assert.match(magnetic, /srx-label-face is-next/);
  assert.match(projectForm, /name="email"/);
  assert.match(projectForm, /required/);
  assert.match(workRoute, /redirect\("\/case-studies"\)/);
  assert.match(insightsRoute, /redirect\("\/blog"\)/);
});
