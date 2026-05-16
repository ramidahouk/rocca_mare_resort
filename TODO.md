# Rocca Mare Resort — Build TODO

## Scaffold
- [x] Next.js + TypeScript + Tailwind
- [x] GSAP + Framer Motion + Lenis installed
- [x] Font files in `app/fonts/` (Recoleta 400/500, DM Sans variable)
- [x] Hero assets in `public/` (hero.webm, hero.mp4, hero-mobile.jpg)
- [x] `globals.css` — all design tokens, utility classes, button styles
- [x] `layout.tsx` — fonts wired, GSAPInit mounted
- [x] Page stubs — home, rooms, experience, gallery, contact
- [ ] Static export config in `next.config.ts` (`output: "export"`) before deployment

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
- [x] Build Nav v1 component — fixed, transparent over hero (replaced by v2)
- [x] Scroll: fills to `rgba(250,247,242,0.92)` + `backdrop-filter: blur(12px)` (GSAP ScrollTrigger) (replaced by v2)
- [x] Logo: "Rocca Mare" — Recoleta 400, navy (replaced by v2)
- [x] Links: DM Sans 400, navy, wave underline on hover (replaced by v2)
- [x] CTA: "Reserve" — pill, navy bg, warm-white text (replaced by v2)
- [x] Mobile: hamburger menu (replaced by v2)

### Nav v2 — single floating Menu pill, experience-first
- [x] Pill visible from page load (no hero scroll trigger — pill always present)
- [x] Pill: navy bg, warm-white text, `Menu` label DM Sans 500 uppercase, btn-primary styling
- [x] Auto-hide arms after intro section bottom passes viewport top; hides on 200px downward scroll, reveals on any scroll-up >5px
- [x] Full-screen menu overlay: warm-white bg, stacked links Recoleta display, staggered reveal
- [x] Reserve sits as equal-weight link in overlay (no separate Reserve pill — experience-first)
- [x] Contact info bottom corner of overlay (phone, email)
- [x] Close button replaces pill position when overlay open
- [x] Body scroll lock while overlay open
- [x] Same behavior mobile + desktop, no split

### Nav v3 — hero bar over hero, pill past hero (DECIDED)
- [x] Horizontal nav bar over hero — wordmark left, page links center-right, Reserve outline pill right
- [x] Warm-white text, no background fill at first paint (sits over video)
- [x] Hand-off at 0.85 × viewport height: bar fades up out, Menu pill fades down in
- [x] Past hero: pill governs, auto-hide arms after intro section, hide-on-down / reveal-on-up
- [x] Mobile: hide hero links below 720px (wordmark + Reserve only), pill takes over after hero

### Nav — resolved issues
- [x] Menu overlay tint appeared navy despite `rgba(15,12,8,0.72)` — resolved by hard refresh (dev server CSS cache). No code change needed.

---

## Footer
- [x] Shared footer added to root layout
- [x] Footer uses dark section palette: navy background, warm-white text, beige accents
- [x] Includes brand line, section links, reserve contact, location note, and bottom booking link

---

## Homepage

### Hero
- [x] Zoom-parallax repo read — sticky container pattern, GSAP scrub adaptation understood
- [x] tidescape fetched — tone, section rhythm, CTA style confirmed
- [x] Hero spec locked from Brief.md (8-point element order), DESIGN.md (motion map, tokens), zoom-parallax repo (implementation pattern)
- [x] GSAP `pin: true` (not CSS sticky) — correct approach per GSAP docs
- [x] Full-bleed video - native `object-fit: cover` after re-encoding the source without baked-in black side bars
- [x] Dark overlay `rgba(5,10,48,0.25)` for clearer video visibility
- [x] Headline - Recoleta 400, height-aware responsive clamp, tracking `-0.03em`, warm-white
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
  - **Final approach:** Re-encode the video source so `object-fit: cover` has clean 16:9 frames to cover with from first paint.

### Remaining sections
- [x] Intro text — split layout (image bleed left, text right), clip-path stagger + image parallax
- [x] Intro bleed image — replaced Picsum with local optimized `public/images/intro-bleed.webp` (~432 KB)
- [x] Rooms teaser — The Room and The Sea Room replaced with local generated assets (`Room.png`, `Balcony.png`)
- [x] Rooms teaser — replace The Suite placeholder image with local generated asset (`Suite.jpeg`)
- [x] Experience teaser — Pool / Beach / Dining replaced with local generated 9:16 assets
- [x] Rooms teaser — 3-card grid, image + label + descriptor, hover lift + scale, clip-path stagger reveal
- [x] Rooms teaser — per-card hover tints whole section background (beige / wave / navy), 0.8s premium easing
- [x] Rooms teaser — hovered/focused card stays full color while sibling cards softly dim and desaturate
- [x] Experience teaser - full-bleed Pool / Beach / Dining image columns with hover expansion/compression
- [x] Experience teaser - removed image zoom so column expansion is the sole signature hover effect
- [x] Experience to Gallery transition - added responsive warm-white breathing gap before gallery
- [x] Gallery teaser - Option 1 implemented as 4-column cascading parallax:
  - **Option 1 — 4-column cascading parallax** (`smooth-parallax-scroll` repo) — 4 columns offset at different vertical positions (`-45%`, `-95%`, `-45%`, `-75%`), each scrolling at a different Y speed. `175vh` section, `overflow: hidden`. GSAP ScrollTrigger scrub. Most dimensional, most gallery-native.
  - Local generated gallery assets wired from `public/images/gallery/` (`1.jpeg` through `12.jpeg`, each used once).
  - **Option 2 — 3-image variable-speed parallax** (`parallax-scroll` repo) — 3 images at slow/medium/fast speeds (`0→-50`, `0→-150`, `0→-250`). Simpler, more editorial spread. Less dramatic than option 1.
  - **Option 3 — Perspective section transition** (`perspective-section-transition` repo) — gallery teaser section scales down + rotates as next section slides in underneath. A transition effect, not a layout. Can layer on top of option 1 or 2.
  - **Option 4 — Canvas video scrub** (`scroll-animation` repo) — images advance frame by frame on canvas as you scroll. Cinematic but needs 60 prerendered frames — not viable without real assets.
  - **Recommendation note:** Option 3 perspective exit was not added. Current accepted direction is one primary gallery motion only.
- [x] CTA section - warm-white editorial split, viewport-aware height, Framer Motion `whileInView` opacity + translateY entrance
- [x] Clip-path reveal coverage audit — all sections confirmed (intro, rooms, experience, gallery, CTA)
- [x] Fresh homepage visual QA — done
- [x] Homepage refinement pass - Intro given stronger editorial scale, tighter copy, larger image presence
- [x] Homepage rhythm pass - tightened Intro to Accommodation spacing and delayed homepage Menu pill until the pinned hero is visually past

---

## Rooms page
- [x] resortkaskady.com — fetched in pre-build phase (see Pre-build reading section)
- [x] Read cursor-tracking repo before building — `How to Make an Animated Cursor using React and GSAP\blend-mode-cursor`
- [x] Reuse local generated accommodation assets: `Room.png`, `Balcony.png`, `Suite.jpeg`
- [x] Three 100vh columns — Rooms / Sea Rooms / Suites
- [x] Cursor-follow variant implemented from reference, then replaced after review with calmer pinned image stage
- [x] Pinned image stage crossfades per active room column
- [x] Shared resort-background variant implemented: `menu-bg.png` base, active room image fades in on hover/focus
- [x] Revised Rooms hover: room image now reveals inside the active column only; shared `menu-bg.png` stays darker behind columns
- [x] Inner pages use horizontal nav for the first viewport, then hand off to floating Menu pill after scroll
- [x] Background shifts to faded dominant color on hover
- [x] Rooms page accepted signature: shared dark resort background + per-column image reveal
- [x] Mobile/smaller display fallback adjusted so panel images read cleaner over the shared background
- [ ] Browser QA Rooms page hover/focus behavior and mobile fallback

---

## Experience page
- [x] resortkaskady.com — fetched in pre-build phase (see Pre-build reading section)
- [x] Reuse local generated horizontal activity assets: `Horizontal Pool.jpeg`, `Horizontal Beach.jpeg`, `Horizontal dining.jpeg`
- [x] Chosen page signature: cinematic editorial selector, not homepage column repeat
- [x] One full-screen background image crossfades by selected experience
- [x] Selector options: Pool / Beach / Dining with active copy
- [x] Responsive mobile selector fallback
- [x] Replaced quiet detail rows with pinned scroll story section from `gsap-scrolltrigger` pinned stack reference
- [x] Pinned story uses vertical Pool / Beach / Dining assets with stacked clip-path image reveals, synced copy, and progress rails
- [x] Experience hero background scoped to first viewport only, not the whole page
- [x] Inner pages now hand off from horizontal nav to floating Menu pill after the first viewport
- [x] Mobile Experience story changed to normal image/copy cards instead of the desktop pinned story
- [x] Browser/CDP screenshot QA for Experience page desktop scroll states and mobile fallback

---

## Gallery page
- [x] Reuse local generated gallery assets from `public/images/gallery/`
- [x] Asset audit: all gallery images are vertical `896x1200` (`3:4`), so fullscreen desktop cover would over-crop
- [x] Chosen layout: editorial horizontal gallery using vertical image compositions, not forced fullscreen cover
- [x] Horizontal scroll driven by vertical scroll (GSAP ScrollTrigger + pin) on desktop
- [x] Mobile fallback: vertical editorial stack
- [x] Removed guessed/descriptive per-image labels; keep neutral counter/branding only
- [x] Gallery page uses `data-nav-tone="dark"` so nav stays readable over warm-white editorial background
- [x] Gallery keeps horizontal navbar throughout; it does not hand off to Menu pill
- [x] Gallery frames sized by viewport height while preserving the vertical `3:4` ratio
- [x] Rebuilt to full-bleed full-height panels — each image fills 100vh, width follows natural aspect ratio, no background peeking, count label overlaid bottom-left

---

## Contact / Reserve page
- [x] Split layout — form left, location/info right
- [x] Full-bleed map at bottom (`map.jpg`, object-position 35% to frame coastline)
- [x] Nav dark tone wired via `data-nav-tone="dark"`
- [x] Mobile: pill replaces Reserve in hero bar on inner pages

---

## Page transitions
- [ ] Read page transitions repo before building
- [ ] Curve or stair wipe — Framer Motion

---

## QA
- [x] Lint passes after latest homepage refinement
- [x] Production build passes after latest homepage refinement
- [ ] Mobile QA at 375px on all scroll effects (real device)
- [ ] Console errors clean (Browser MCP)
- [ ] Video loads desktop / falls back mobile
- [ ] Deploy to Vercel early
- [ ] Lighthouse 90+ on Vercel production

---

## Build decisions log

All resolved decisions (nav model, hero overlay, menu overlay, container model, rooms teaser, gallery library) are documented in `Brief.md → Resolved Build Decisions` and `DESIGN.md`. Read those before implementing anything — do not reopen closed decisions.
