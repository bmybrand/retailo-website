# Retailo — AI handoff

Read this first, then `AGENTS.md` (Next.js 16 docs live under `node_modules/next/dist/docs/`). Continue the landing page; do not restart the app.

**Workspace:** `c:\Users\User\Desktop\retailo`
**Dev:** `npm run dev` → `http://localhost:3000` (Next.js 16.3.5, App Router, React 19, Tailwind v4 `@theme inline`, TypeScript)

## Product

Retailo landing: ecommerce OS for modern merchants. Rebuild from screenshots as reusable section components. Image slots use `ImagePlaceholder`, except assets already in `public/`.

## Design tokens (locked)

| Token | Value | Use |
|---|---|---|
| Background | `#F8F8F6` / `#f8f8f6` | page, header |
| Brand green | `#0B5C48` / `#0b5c48` | logo, CTAs, Sign In, checks, caret |
| Lime | `#C9FF5C` / `#c9ff5c` | underline mark under “All in One Place.” and nav hover |
| Brand dark | `#0e3d2c` | lime button text |
| Fonts | **Manrope** primary (`font-sans`), **Inter** secondary (`font-inter`) | headings vs UI/body |

Defined in `src/app/globals.css` and `src/app/layout.tsx`.

## File map

```
src/app/layout.tsx, page.tsx, globals.css
src/components/Header.tsx          — client, fixed 72px
src/components/Logo.tsx            — /retailo-logo.svg (was Group 3.svg)
src/components/Footer.tsx
src/components/SmoothScroll.tsx    — smooth mouse-wheel page scrolling; reduced-motion aware
src/components/ui/Button.tsx, Section.tsx, ImagePlaceholder.tsx
src/components/home/hero/          — polished
  Hero.tsx, HeroStage.tsx, HeroActions.tsx, HeroProof.tsx,
  HeroStats.tsx, CountUp.tsx, ArrowIcon.tsx, index.ts
src/components/home/sections/      — DashboardPreview uses supplied images; other sections are first pass
  Testimonials, FeatureStories, BrandLogos,
  FeatureGrid, GrowthShowcase, DashboardPreview
public/retailo-logo.svg, jiggy-jerky.svg (was Group 15.svg)
public/dashboard-rings.png, retailo-dashboard.png
```

`page.tsx` order: Header → Hero → DashboardPreview → Testimonials (includes BrandLogos) → FeatureStories → FeatureGrid → GrowthShowcase → Footer.

## Header (done)

- Fixed, `h-[72px]`, spacer sibling `h-[72px]` so content starts below nav.
- Large screens: inner bar `lg:w-[80%]`, `justify-between` (logo | tabs | Sign In + Get Started).
- Nav: Inter 16px, lime underline hover (`NavMark`) like the hero highlight.
- Sign In: outline **green** (`border-brand text-brand`), same family as Explore Platform. Do not use gray outline.
- Desktop CTAs wrapped `hidden lg:flex` so `inline-flex` on Button cannot override `hidden`.
- Mobile: hamburger morphs to X (`MenuToggle`). Overlay card menu (does **not** push layout). Rows use `ArrowIcon` (button-style arrows), not chevrons. Sign In / Get Started only in the overlay on small screens (no duplicate in the bar).
- Hide-on-scroll: **only after hero** (`#home` bottom ≤ 72px). Hide on scroll down, show on scroll up. Stay visible while the mobile menu is open.

## Hero (done — last work)

Height: `min-h-[calc(100svh-72px)]` because the 72px spacer is already above it. Do **not** go back to `min-h-screen` or the first screen is nav + 100vh.

Width: `lg:w-[80%]` to match header.

### Motion (`HeroStage.tsx` — client)

1. Eyebrow (“Ecommerce Management Platform”) fades/slides first (thinner weight, slightly larger, normal tracking).
2. Headline types with mistakes: `Stpre` → backspace 3 → `ore`; `Palce.` → **backspace 6** (not 5, or you get `Pplace`) → `Place.`
3. Caret on **line 1** until `\n`, then line 2. Typing speed (middle, after too-slow then too-fast): pause 270 / 110 / 310 / 100; type `60 + rand*38`; backspace `36 + rand*18`.
4. Content **below** the heading does **not** wait for typing. `HeroMotionContext` / `belowOn` starts ~780ms; `HeroReveal` staggers translate+fade.
5. Lime mark under “All in One Place.” only after typing `done` (+220ms).
6. `prefers-reduced-motion`: show final copy immediately, no typing.

### Subtitle

Same column as heading, `lg:w-[80%]`. Explicit space after `store` plus `<br className="hidden lg:inline" />` then `operations` — without the space it concatenates on large screens.

### Proof (`HeroProof.tsx`)

Points: No credit card required / Easy setup / Built for modern merchants.

- Rows fade in via `HeroReveal`.
- Ticks **one by one** (not overlapping): start `820 + index * 820`, check stroke-draw.
- On tick: `proof-pop` 0.72s — scale ~1.14 and text **brand green**, then back to zinc-600.
- Keyframes in `globals.css` (`proof-pop`). User asked slightly faster after it felt too slow; keep sequential.

### Stats

Count from 0: `10K+`, `98%`, `24/7`. Jiggy Jerky logo above. `CountUp` delay aligned with `HeroReveal`.

### Buttons

Get Started (primary brand) + Explore Platform (outline brand) with `ArrowIcon`.

## Known gotchas

- Tailwind v4: `inline-flex` on Button beats a sibling `hidden`. Wrap the group.
- Next 16 APIs may differ from training data — read local Next docs before new patterns.
- `AGENTS.md` / `CLAUDE.md` are auto-injected by `next dev`; don’t fight them.
- `body` has `suppressHydrationWarning` because a browser extension adds `cz-shortcut-listen` before hydration; the app does not render that attribute.
- Do not commit unless asked.

## Not done (likely next)

The DashboardPreview section after Hero uses a sticky `100svh` visual and a scroll track sized in code for two phases on landscape desktop: first the centered dashboard grows until its width matches the viewport, then continued scrolling pans the screenshot upward to reveal the bottom previously hidden by the frame. The reveal phase spans at least 1.8 viewport heights so the pan happens smoothly over several scroll steps. The screenshot keeps its natural ratio, is always shown full-width, and is clipped only at the bottom when necessary; never crop its sides or stretch it. The frame starts at 75vw with a maximum height of 75svh. Mobile/portrait screens show the image at its natural ratio with a maximum viewport height and no extended scroll animation. Reduced-motion users get a static one-screen section. The rings stay behind the dashboard, stronger at the top and fading downward. Sections after Testimonials are still placeholder-quality. User will want them matched to screenshots the same way as header/hero: reusable components, placeholders for missing images, Manrope/Inter, brand colors, responsive, probably `min-h-screen` (or `calc(100svh-72px)` if under the fixed nav).

Testimonials is the next section after DashboardPreview and is `100svh` tall. Its trust heading, six supplied SVG brand marks, and horizontal card carousel are centered vertically as one group. The six `logoabc*` files were renamed to descriptive brand logo filenames in `public/`; the same logos appear on matching testimonial cards. The matching `Article*.png` portrait exports are served as `testimonial-*.png`. The four unused `Article*.svg` wrappers, which embedded roughly 42 MB of image data, were removed from the repo. The cards preserve the source image ratio of 420:680 and use viewport-based sizing to match the supplied 1027 × 679 screenshot (about 226 × 365px cards, 16px gaps, first card at x159). Text, gradients, logo overlays, and arrow navigation remain HTML/CSS. Short mobile screens can scroll inside the section to reach all content.

FeatureStories has six tabs. Products uses `retailo-products-dashboard.png`, Orders uses `retailo-orders-dashboard.png`, Customers uses `retailo-customers-dashboard.png`, Website uses `retailo-website-dashboard.png`, Payments uses `retailo-payments-dashboard.png`, and Delivery uses `retailo-delivery-dashboard.png`. These descriptive filenames replaced the six supplied PNG filenames. Clicking a tab updates its heading, copy, and screenshot; the image keeps its native aspect ratio. Feature/testimonial copy already exists in those files; refine layout/visuals, don’t invent a new product story unless asked.

FeatureStories tab icons now use 12 supplied SVGs, renamed `feature-{products|orders|customers|website|payments|delivery}-icon.svg` and matching `-icon-active.svg` files in `public/`. The original filename order did not correspond to tab order; they were mapped by the icon artwork. Inactive icons are shown as gray with inline opacity 0.45, darkening to 0.7 on hover or focus. Selected icons use the supplied green assets. The supplied Orders inactive SVG lacked the `opacity="0.2"` setting found in the other inactive icons; it was added so all six have the same gray level. That adjusted file is served as `feature-orders-icon-inactive.svg` to avoid a cached darker copy. A browser test confirmed all six selected icon paths and the hover opacity change.

FeatureStories panel height is fixed by `src/components/home/sections/FeatureStoryPanel.module.css`, sized closely to the largest tab content. The tab icon outline is transparent and asymmetrically rounded. Its Learn More link opens one of six routes at `/features/{products|orders|customers|website|payments|delivery}`. Those detail pages share `src/components/features/FeatureDetailPage.tsx` and the data in `src/lib/features.ts`; their route is `src/app/features/[slug]/page.tsx`. They use the home palette, type, header, and dashboard images. The detail page has a compact footer because the site's original footer is still a first pass. Its styles are in `public/feature-detail.css`, loaded by a stylesheet link in the page. The dev CSS pipeline failed to emit new Tailwind classes and emitted stale content for a new CSS module; the static CSS URL serves the correct rules. Keep the home tab copy and detail data aligned if either changes. The shared header and logo links now point back to home anchors from detail pages.

The FeatureStories Learn More link plays a dashboard-image transition into its matching detail page. `src/components/home/sections/useFeatureZoomNavigation.ts` waits for the selected dashboard image to decode if needed, clones it into a fixed overlay, expands it to the viewport, and pans across it top-left → top-right → lower center. Only after the camera pan does it call `router.push(href)` while the image covers the screen. It sets root scroll behavior to `auto` for that route navigation, then waits for the detail page to reach its top position before measuring the destination image frame (`data-feature-detail-image` in `src/components/features/FeatureDetailPage.tsx`). A 2.5 second timeout makes an instant top correction under the opaque overlay if the browser has not completed positioning. The overlay image then shrinks over 1 second into the frame while the new page is revealed. If the destination image is entirely outside the viewport after the page is at top, the overlay fades away. The overlay survives the home section's unmount during navigation and blocks wheel/touch scrolling until the transition ends. It uses the Web Animations API and inline styles so the animation does not depend on the dev CSS scanner. The root `<html>` in `src/app/layout.tsx` has `data-scroll-behavior="smooth"`, the documented Next.js 16 opt-in for ordinary route navigation. Reduced-motion users and browsers without animation support navigate immediately. The original link still supports modifier-click to open in another tab.

The active FeatureStories tab is stored by `src/components/home/FeatureSelectionProvider.tsx` in the persistent root layout, so Back returns to the same tab and image instead of resetting to Products. `public/feature-detail.css` keeps the detail dashboard beside the copy down to 821px CSS viewport width; the previous 960px stack breakpoint put the destination image below the fold on many zoomed laptop screens and caused the fade fallback. Browser checks at 900x700 confirmed that Products zooms into the right-side detail image on both first and second visits; at 1440x900, multiple feature tabs zoomed and the tab was retained after Back.

Browser Back used to restore the home section's position with a CSS smooth scroll, leaving the dashboard moving while a second Learn More transition began. `src/components/SmoothScroll.tsx` now temporarily sets the root scroll behavior to `auto` on `popstate` and restores it after 2 seconds. Browser testing confirmed Back returns immediately to the saved position and a second Learn More click, even 100 ms later, follows the same image path. Ordinary wheel smoothing remains active.

## How to work with this user

- Iterate visually in small steps (spacing, type, speed).
- Verify in the browser, not just a screenshot.
- Keep animations; respect reduced motion.
- Speak plainly; match existing component style.
