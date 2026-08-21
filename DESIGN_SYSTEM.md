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

Display typography uses Manrope; body and interface typography use DM Sans. Display sizes use fluid `clamp()` values from roughly 48–106 px, section titles 44–82 px, card titles 20–38 px, body 16–19 px, and labels 9–12 px with deliberate tracking.

Spacing uses an 8 px base rhythm with major section spacing fluid between 80 and 170 px. Corners remain predominantly square; circles are reserved for the signal/orbit identity. Borders use low-contrast navy or white at 9–18% opacity.

## Motion identity

Motion follows three verbs: **reveal, connect, progress**. Headline masks reveal the message; orbit and workflow motion communicate connection; arrows, tabs, and paths show progression. Interaction transitions are 180–350 ms. Ambient loops run slowly and stop under `prefers-reduced-motion`. WebGL caps pixel density, avoids external libraries, reacts softly to pointer position, and has a CSS fallback.

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

The homepage contains thirteen content sections: immersive hero; trust and positioning; service ecosystem; digital marketing spotlight; development spotlight; AI and technology spotlight; business impact; featured case studies; six-stage process; Why Serptrix; insights; verified-review policy; final conversion experience.
