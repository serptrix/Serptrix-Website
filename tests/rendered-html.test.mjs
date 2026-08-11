import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("package is configured for Next.js on Vercel", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  const parsed = JSON.parse(packageJson);
  assert.equal(parsed.scripts.build, "next build");
  assert.equal(parsed.scripts.dev, "next dev");
  assert.equal(parsed.scripts.start, "next start");
  assert.ok(parsed.dependencies.next);
  assert.equal(parsed.devDependencies?.vinext, undefined);
  assert.equal(parsed.devDependencies?.wrangler, undefined);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /@react-three\/drei/);
});

test("keeps production safeguards and animation systems in source", async () => {
  const [
    content,
    layout,
    styles,
    packageJson,
    home,
    motionShell,
    smoothScroll,
    heroScene,
    workflowScene,
    particleField,
    tokens,
    siteShell,
    magnetic,
    gsapRuntime,
    reducedMotionHook,
    projectForm,
    workRoute,
    insightsRoute,
    serviceSections,
  ] = await Promise.all([
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
  assert.match(layout, /Manrope/);
  assert.match(layout, /DM_Sans/);
  assert.match(layout, /display:\s*"swap"/);
  assert.match(layout, /favicon\.svg/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /--text-display:\s*clamp\(2\.5rem,\s*5vw,\s*4\.5rem\)/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /button,\.btn,\.srx-button,\.nav-cta,a\[role="button"\]\{border-radius:50px\}/);
  assert.match(styles, /\.s12-final\{min-height:400px\}/);
  assert.match(styles, /\.srx-shell\{width:100%;padding:0 6%\}/);
  assert.match(styles, /\.s1-copy h1\{max-width:600px\}/);
  assert.match(styles, /\.site-header>\.nav-wrap\{width:100%;max-width:none;margin:0;padding-left:6%;padding-right:6%\}/);
  assert.match(styles, /\.site-header\.scrolled\{width:min\(88%,1320px\)/);
  assert.match(styles, /backdrop-filter:blur\(24px\) saturate\(155%\)/);
  assert.match(styles, /\.nav-cta \.nav-cta-face\{color:#fff/);
  assert.match(styles, /\.site-header\.is-transparent \.nav-cta \.nav-cta-face[^}]+color:#05082d/);
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
