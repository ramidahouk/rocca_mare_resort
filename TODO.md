# Rocca Mare Resort — Build TODO

## Scaffold
- [x] Next.js + TypeScript + Tailwind
- [x] GSAP + Framer Motion + Lenis installed
- [x] Font files in `app/fonts/` (Recoleta 400/500, DM Sans variable)
- [x] Hero assets in `public/` (hero.webm, hero.mp4, hero-mobile.jpg)
- [x] `globals.css` — all design tokens, utility classes, button styles
- [x] `layout.tsx` — fonts wired, GSAPInit mounted
- [x] Page stubs — home, rooms, experience, gallery, contact

---

## Pre-build reading (session baseline)
- [x] AGENTS.md — rules, build order, hard constraints
- [x] DESIGN.md — all tokens, motion map, component rules, do/don't
- [x] Brief.md — concept, copy tone, hero map, signature effects, build order
- [x] Screenshots.md — resortkaskady effects spec, tidescape, tenutacentoporte notes
- [x] 7 design synthesis notes (Motion Patterns, Animation Primitives, Motion Language, Premium Psychology, Layout Rhythm, Creative Stack, References Index)
- [x] L4 build levels workflow
- [x] Zoom-parallax repo read + conversion plan understood
- [x] tidescape fetched — nav pattern, section rhythm, tone
- [x] tenutacentoporte fetched — nav pattern, image-led rooms, whitespace discipline

---

## Nav
- [x] Build Nav component — fixed, transparent over hero
- [x] Scroll: fills to `rgba(250,247,242,0.92)` + `backdrop-filter: blur(12px)` (GSAP ScrollTrigger)
- [x] Logo: "Rocca Mare" — Recoleta 400, navy
- [x] Links: DM Sans 400, navy, wave underline on hover
- [x] CTA: "Reserve" — pill, navy bg, warm-white text
- [x] Mobile: hamburger menu

---

## Homepage

### Hero
- [x] Zoom-parallax repo read — sticky container pattern, GSAP scrub adaptation understood
- [x] tidescape fetched — tone, section rhythm, CTA style confirmed
- [x] Hero spec locked from Brief.md (8-point element order), DESIGN.md (motion map, tokens), zoom-parallax repo (implementation pattern)
- [x] GSAP `pin: true` (not CSS sticky) — correct approach per GSAP docs
- [x] Full-bleed video — `minWidth/minHeight` centering, no `object-fit`
- [x] Dark overlay `rgba(5,10,48,0.45)`
- [x] Headline — Recoleta 400, `clamp(4rem, 10vw, 9rem)`, tracking `-0.03em`, warm-white
- [x] Sub-label — DM Sans 300, one line, warm-white
- [x] CTA — "Discover" pill, navy bg, warm-white text
- [x] Scroll indicator — fades on scroll via scrub
- [x] Zoom parallax — GSAP ScrollTrigger `pin: true`, `scale(1.05)` → `scale(1.2)`, `gsap.context()` + cleanup, `prefers-reduced-motion` gate
- [x] **BUG — hero black bars on ultrawide displays:** Video file had black side columns baked into the 1920x1080 frames. CSS cover sizing was working, but it was covering with a source that already contained bars. Re-encoded `public/videos/hero.webm` and `public/videos/hero.mp4` from a cropped 16:9 source region, then kept native `object-fit: cover` plus still-image poster/background fallback.
  - **Resolution:** Console diagnostics showed the rendered video box covered the hero at an ultrawide viewport (`1306x286` video box over a `1244x272` section), so the problem was not uncovered CSS area. Frame inspection confirmed near-black pixels inside the source at both edges. Cropped source region `1728x972:96:54`, scaled back to `1920x1080`, `setsar=1`.
  - **Tried 2:** `width: 100vw` on sticky container — caused horizontal overflow bug, had to revert.
  - **Tried 3:** `overflow-x: hidden` on `html`/`body` — breaks `position: sticky` in browsers, reverted.
  - **Tried 4:** `position: sticky` with `200vh` outer wrapper — GSAP docs explicitly say don't use CSS sticky with ScrollTrigger. Switched to `pin: true`.
  - **Tried 5:** `minWidth: 100%; minHeight: 100%; width: auto; height: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` — covers most cases but still fails on very wide viewports narrower than the video's 16:9 ratio.
  - **Tried 6:** Starting GSAP scale at `1.15` instead of `1` to always be oversized — hides the problem but wrong per spec (`scale(1)` → `scale(1.15)` is the defined effect). Also does not fix the pre-GSAP flash on refresh.
  - **What's needed:** A solution that guarantees the video covers the full container at any viewport aspect ratio from the very first paint, before any JS runs. Likely involves CSS only — possibly `vw`/`vh` units with `calc()` to force the video to always be oversized in both dimensions. Assign to Codex.

### Remaining sections
- [ ] Intro text — staggered line reveal (GSAP, 0.1s stagger per line)
- [ ] Rooms teaser
- [ ] Experience teaser
- [ ] Gallery teaser
- [ ] CTA section (Framer Motion whileInView)
- [ ] Clip-path reveal on all section entrances (GSAP ScrollTrigger)

---

## Rooms page
- [ ] Fetch resortkaskady.com before building
- [ ] Read cursor-tracking repo before building
- [ ] Three 100vh columns — Rooms / Suites / Pool Villas
- [ ] Image follows cursor per column (GSAP quickTo, lerp)
- [ ] Background shifts to faded dominant color on hover

---

## Experience page
- [ ] Fetch resortkaskady.com before building
- [ ] Three full-height columns — Pool / Beach / Dining
- [ ] Hovered column expands (flex-grow), others compress
- [ ] Full-bleed image per column

---

## Gallery page
- [ ] Horizontal scroll driven by vertical scroll (GSAP ScrollTrigger + pin)
- [ ] Full-bleed images only, no radius, no shadow

---

## Contact / Reserve page
- [ ] Simple form + location
- [ ] No effects

---

## Page transitions
- [ ] Read page transitions repo before building
- [ ] Curve or stair wipe — Framer Motion

---

## QA
- [ ] Mobile QA at 375px on all scroll effects (real device)
- [ ] Console errors clean (Browser MCP)
- [ ] Video loads desktop / falls back mobile
- [ ] Deploy to Vercel early
- [ ] Lighthouse 90+ on Vercel production
