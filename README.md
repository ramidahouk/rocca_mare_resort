# Rocca Mare Resort

Fictional luxury beachside Mediterranean resort website. Built as a Nextbyrd Level 4 portfolio reference project with a video-led hero, strict design tokens, and GSAP-driven motion.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- GSAP and ScrollTrigger
- Framer Motion, reserved for page transitions
- Local fonts: Recoleta and DM Sans

## Commands

```bash
npm run dev
npm run lint
npm run build
```

Use either `localhost` or `127.0.0.1` in development. Both are allowed in `next.config.ts` for Next.js dev resources.

## Project Structure

```txt
app/
  page.tsx
  layout.tsx
  globals.css
  rooms/
  experience/
  gallery/
  contact/
components/
  Hero.tsx
  Nav.tsx
  GSAPInit.tsx
public/
  videos/
    hero.webm
    hero.mp4
  images/
    hero-mobile.jpg
```

## Design Rules

The design system lives in:

```txt
E:\Business\Nextbyrd\docs\Reference Projects\Rocca Mare Resort\DESIGN.md
```

Read it before changing components. It defines the palette, typography, spacing, motion rules, component behavior, and do and do not rules.

Key constraints:

- Use only the approved color palette.
- Use Recoleta only for display and headings.
- Use DM Sans for body, nav, buttons, labels, and forms.
- Use GSAP for scroll effects and cursor interactions.
- Use Framer Motion only for page transitions.
- Do not mix GSAP and Framer Motion on the same element.
- Always clean up GSAP work with `gsap.context()` and `ctx.revert()`.

## Current Status

Implemented:

- Project scaffold
- Local fonts
- Global design tokens
- Fixed nav with mobile menu
- Homepage hero with desktop video, mobile still fallback, dark overlay, CTA, scroll indicator, and GSAP zoom parallax
- Re-encoded hero video assets with baked-in side bars cropped out

Still to build:

- Homepage intro and teaser sections
- Rooms page
- Experience page
- Gallery page
- Contact / Reserve page
- Page transitions
- Full mobile and production QA

See `TODO.md` for the current task list.

## Hero Video Notes

The public hero files are:

```txt
public/videos/hero.webm
public/videos/hero.mp4
public/images/hero-mobile.jpg
```

The video element uses native cover sizing:

```css
width: 100%;
height: 100%;
object-fit: cover;
```

The poster and wrapper background both use `hero-mobile.jpg` to avoid a black flash before the first video frame paints.

## QA

Before considering a section complete:

- Run `npm run lint`
- Run `npm run build`
- Check desktop and mobile viewports
- Check browser console for errors
- Verify scroll animations and hover states
- Verify the hero video loads on desktop and the still image fallback works on mobile

