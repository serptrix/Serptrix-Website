# Serptrix Digital Design System

## Experience principles

1. **Clarity creates confidence.** Every section has one job, one dominant message, and an intentional next action.
2. **Complexity must be controlled.** System visuals explain connection, motion communicates state, and decoration stays subordinate to meaning.
3. **Business evidence is explicit.** Unverified results remain `[XX]` placeholders with an evidence label; published statistics require a source, baseline, time period, and approval.
4. **The experience adapts, not merely shrinks.** Complex systems become vertical on mobile, WebGL is simplified, sticky compositions release, and tap targets remain generous.

## Core tokens

| Role | Token | Value |
|---|---|---|
| Primary | `--navy` | `#09105F` |
| Depth | `--midnight` | `#050936` |
| Action | `--gold` | `#FBBC03` |
| Surface | `--white` | `#FFFFFF` |
| Alternate surface | `--cloud` | `#F5F6FA` |
| Border | `--mist` | `#E5E8F1` |
| Secondary text | `--slate` | `#66708A` |
| Body text | `--ink` | `#101742` |
| Warm accent surface | `--pale-gold` | `#FFF7D8` |

Public-site display, body, and interface typography use Manrope with weights from 400–700. Display sizes use fluid `clamp()` values, section titles remain subordinate to the page thesis, body copy stays 16–19 px, and short wayfinding labels use deliberate tracking without becoming the primary reading style.

Spacing uses an 8 px base rhythm with major section spacing fluid between 80 and 170 px. Shared page containers are full width and use the canonical `--page-gutter: clamp(1rem, 3.35vw, 4rem)`, yielding approximately 16–20 px mobile, 24–32 px tablet, and 40–64 px desktop insets. Readable text measures remain constrained inside those containers. Radius roles are canonical: `--radius-sm: 8px` for badges and compact surfaces, `--radius-md: 12px` for form controls, `--radius-lg: 20px` for cards and media, `--radius-xl: 28px` for large panels and dialogs, and `--radius-pill: 9999px` for conventional action buttons and appropriate chips. Icon-only controls remain circular; structural sections, tables, navigation rows, diagrams, and brand artwork retain the shape their role requires. Borders use low-contrast navy or white at 9–18% opacity.

Canonical brand artwork is supplied in `public/Serptrix-header.svg`, `public/serptrix_footer.svg`, and `public/favicon.svg`. These source assets own the header, footer, and browser-icon treatments respectively and must retain their intrinsic aspect ratios.

## Motion identity

Motion follows three verbs: **reveal, connect, progress**. The homepage hero uses a lightweight CSS 3D connected-capability sculpture with a branded core, three complete service modules, finished connector joints, and a grounded base plane. Its restrained depth motion pauses offscreen or when the document is hidden and becomes static under `prefers-reduced-motion`. Interaction transitions are 180–350 ms. WebGL elsewhere caps pixel density, avoids unnecessary runtime work, reacts softly to pointer position, and has a CSS fallback.

## Component inventory and states

- **Announcement bar:** default, linked message, compact mobile treatment.
- **Header:** initial, scrolled/blurred, active route, services mega menu open, keyboard focus, full-height mobile open.
- **Buttons/text links:** default, hover elevation, visible focus, active press, disabled visual treatment. Loading labels should preserve width; errors should use text plus icon rather than color alone.
- **Service ecosystem tabs:** default, hover, selected, arrow-key navigation, tab/panel semantics.
- **Cards and previews:** default, hover depth/reveal, focus-within, stacked mobile. Case data supports confidential titles and evidence placeholders.
- **Metrics:** placeholder, verified, loading skeleton, and unavailable/empty. Verified publication requires evidence metadata.
- **Accordions:** closed, open, hover, focus; native `details/summary` preserves no-script readability.
- **Process steps:** base readable state with optional active/progress enhancement; mobile becomes a standard vertical narrative.
- **Article cards:** feature/supporting hierarchy, semantic Article markup, author/date/category/reading time.
- **Forms:** labeled default, hover, focus, required, disabled, error with message association, loading, and success confirmation. Current email handoff is intentionally lightweight until a persistence or CRM destination is selected.
- **Newsletter:** email default/focus/error/success; current email handoff should be replaced with an approved mailing provider before campaign use.
- **Navigation utilities:** breadcrumb, pagination, related content, and empty/loading states inherit the same label, border, focus, and spacing tokens.
- **404:** clear recovery message and primary return action.
- **Cookie notice:** the current consent manager stores only the visitor’s essential/analytics preference. No analytics provider is loaded; the scheduling embed is disclosed separately as a functional third-party service.

## Responsive behavior

- **Large desktop (1440+):** full asymmetrical compositions, maximum type scale, cursor-reactive WebGL.
- **Desktop/laptop (1024–1439):** compressed grids and type, reduced scene depth, complete mega menu.
- **Tablet (768–1023):** major two-column systems stack; service map and copy become sequential; mobile navigation activates.
- **Mobile (375–767):** vertical story, compact orbit visual, simplified interface simulations, single-column metrics and cases, released sticky content. Top-level content sections share the `--mobile-section-y` vertical inset so the page rhythm stays consistent between routes.
- **Small mobile (<375):** fluid headline floor, text-safe announcement treatment, full-width actions, no off-canvas decorative elements.

## Homepage narrative

The homepage is a concise decision journey: outcome-led hero with an illustrative decision brief; early working-principle credibility; three problem-led service paths with direct links to all nine services; transparent delivery standards in place of unverified proof; a five-stage working process; buying questions; compact insights; and a final conversion section that separates strategy-call and project-inquiry intent. Unverified case studies, testimonial placeholders, generic review policy, and disconnected newsletter or social prompts do not appear in the public journey.
# Service architecture (2026-10-22)

The public service system has four equal pillars: Design, Development, AI, and Digital Marketing. `content/service-catalog.ts` is the canonical source for hierarchy, routes, navigation, breadcrumbs, search, sitemap entries, metadata, and inquiry preselection. Do not add a service link directly to a menu without adding it to the catalog first.

Pillar pages orient visitors, category pages compare adjacent services, and individual service pages explain fit, deliverables, use cases, boundaries, related services, and conversion choices. Design describes the experience; Development implements the system. AI pages must state evaluation and human-oversight boundaries. Marketing pages must state measurement and market dependencies without guarantees.

The homepage service navigator uses four visible selectors on desktop and semantic stacked disclosures on small screens. It does not auto-rotate, and every service remains available as a native link. The established navy, yellow, cream, and white palette, Manrope typography, capsule actions, radius tokens, full-width gutter contract, visible focus states, and reduced-motion behavior remain binding.
