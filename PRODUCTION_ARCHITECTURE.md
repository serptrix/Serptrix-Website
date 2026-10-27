# Serptrix Production Architecture

## Phase 1 — Strategic foundation

The operating idea remains **growth, engineered as one system**. Visitors move from recognizing a disconnected growth constraint, to choosing a route by problem or outcome, to evaluating discipline-specific expertise and evidence, to a proportionate strategy conversation. Conversion is built around qualified context rather than a generic lead form.

The sitemap now supports Home, Services, About, Case Studies, Blog, Contact, three service divisions, nine individual services, case-study detail, article, category, organizational author, search, thank-you, privacy, terms, cookies, and 404 states. Legacy `/work` and `/insights` routes remain available for continuity.

## Phase 2 — Brand system

The deployed system uses the signal-path identity, navy/gold/white palette, Manrope typography, a shared role-based radius scale, circular icon controls, strong focus treatment, and restrained motion built around feedback and comprehension. The homepage hero uses an optimized raster sculpture with CSS masking, lighting, and composed depth transforms; it keeps copy available immediately, pauses motion offscreen or in a hidden tab, and provides a static reduced-motion presentation.

## Phase 3 — UX architecture

- The Services hub supports exploration by business problem or desired outcome.
- Division pages build category confidence through problems, capabilities, platforms, engagement models, evidence, insights, FAQs, and conversion.
- Service pages answer commercial and informational intent with specific problems, outcomes, methodology, deliverables, platform context, related services, FAQs, and next action.
- Case studies separate client context, challenge, discovery, strategy, implementation, comparison, results, testimony, stack, and next-project navigation.
- Blog content supports listing, search, topic categories, organizational authors, semantic articles, table of contents, takeaways, internal links, author context, related reading, and service conversion.
- The contact journey uses five short validated stages with a visible progress indicator and mobile-safe field groups.

## Phase 4 — UI and interaction

Page families use distinct layouts rather than cloning the homepage. Division themes use data, modular, and workflow motifs. Service detail pages use evidence panels and numbered signal systems. Case studies use large narrative chapters. Editorial content uses a long-form reading layout. Motion degrades to short fades under reduced-motion preferences.

## Phase 5 — Content and evidence governance

`content/site-data.ts` is the typed source adapter for services, divisions, case studies, articles, categories, and authors. It can be replaced by a headless CMS query layer without changing route templates. `validateCaseStudy()` enforces the current placeholder convention. A production CMS must reject publication when required fields are empty or when a result lacks source, baseline, time range, attribution method, and approval.

Named employees, client identities, testimonials, dates, technologies, project duration, awards, partnerships, and performance results remain visibly gated until verified. Article authors currently use organizational bylines; `Person` schema should be introduced only for verified expert profiles.

## Phase 6 — Development and integrations

The application uses Next.js App Router patterns, typed React templates, server-rendered content, CSS-native motion, dynamic route data, structured metadata, XML sitemap, robots controls, and route-based output.

The consent layer stores only the visitor’s choice. Analytics events are prepared through the `serptrix:conversion` event and only enter `dataLayer` after analytics consent. GA4, GTM, Meta Pixel, LinkedIn Insight Tag, Search Console verification, CRM delivery, scheduling, newsletter delivery, and a real headless CMS require approved account identifiers and secrets before activation.

The inquiry flow sanitizes and allowlists submitted values, validates required fields, applies a bounded per-instance abuse guard, and delivers through the configured server-side webhook. It reports success only after that endpoint accepts the inquiry. When delivery is not configured or times out, the visitor is directed to the verified contact email. A temporary browser summary is optional and never determines delivery success. Public lead generation should also use platform-level distributed rate limiting, retention rules, and regional privacy review.

## Phase 7 — quality gates

Automated release checks type-check and lint the application, exercise contact validation and delivery behavior, validate the complete service-page registry, and enforce case-study publication gates. A production build compiles and statically generates every supported route. Browser-level visual, assistive-technology, real-device, performance-lab, and cross-browser testing should be repeated whenever final photography, a CMS, analytics, or form delivery is connected.
