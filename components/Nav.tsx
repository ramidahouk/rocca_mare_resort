"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_LINKS = [
  { href: "/rooms", label: "Rooms" },
  { href: "/experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const OVERLAY_LINKS_LEFT = [
  { href: "/rooms", label: "Rooms" },
  { href: "/experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
];

const OVERLAY_LINKS_RIGHT = [
  { href: "/contact", label: "Reserve" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isGallery = pathname === "/gallery";
  const [pastHero, setPastHero] = useState(false);
  const [autoHideArmed, setAutoHideArmed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkNav, setIsDarkNav] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lastScrollY = window.scrollY;
    let downwardAccumulator = 0;
    const HIDE_THRESHOLD = 200;
    const REVEAL_DELTA = 5;
    const heroHandoffMultiplier = isHome ? 1.55 : 0.85;
    const resetFrame = window.requestAnimationFrame(() => {
      setPastHero(window.scrollY > window.innerHeight * heroHandoffMultiplier);
      setAutoHideArmed(false);
      setIsHidden(false);
    });

    const heroTrigger = ScrollTrigger.create({
      start: () => window.innerHeight * heroHandoffMultiplier,
      end: "max",
      onEnter: () => setPastHero(true),
      onLeaveBack: () => {
        setPastHero(false);
        setIsHidden(false);
      },
    });

    const introSection = document.querySelector(".home-intro-outer");
    let autoHideTrigger: ScrollTrigger | undefined;

    if (isHome && introSection) {
      autoHideTrigger = ScrollTrigger.create({
        trigger: introSection,
        start: "bottom top",
        end: "max",
        onEnter: () => setAutoHideArmed(true),
        onLeaveBack: () => {
          setAutoHideArmed(false);
          setIsHidden(false);
        },
        onUpdate: (self) => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY;
          lastScrollY = currentY;

          if (!self.isActive) return;

          if (delta > 0) {
            downwardAccumulator += delta;
            if (downwardAccumulator > HIDE_THRESHOLD) {
              setIsHidden(true);
            }
          } else if (delta < -REVEAL_DELTA) {
            downwardAccumulator = 0;
            setIsHidden(false);
          }
        },
      });
    }

    return () => {
      window.cancelAnimationFrame(resetFrame);
      heroTrigger.kill();
      autoHideTrigger?.kill();
    };
  }, [isHome, pathname]);

  useEffect(() => {
    if (isHome) {
      const frame = window.requestAnimationFrame(() => setIsDarkNav(false));
      return () => window.cancelAnimationFrame(frame);
    }

    gsap.registerPlugin(ScrollTrigger);

    const toneTargets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-tone="dark"]')
    );

    if (toneTargets.length === 0) {
      const frame = window.requestAnimationFrame(() => setIsDarkNav(false));
      return () => window.cancelAnimationFrame(frame);
    }

    const activeTargets = new Set<HTMLElement>();
    const syncTone = () => setIsDarkNav(activeTargets.size > 0);

    const triggers = toneTargets.map((target) =>
      ScrollTrigger.create({
        trigger: target,
        start: "top 96px",
        end: "bottom 96px",
        onEnter: () => {
          activeTargets.add(target);
          syncTone();
        },
        onEnterBack: () => {
          activeTargets.add(target);
          syncTone();
        },
        onLeave: () => {
          activeTargets.delete(target);
          syncTone();
        },
        onLeaveBack: () => {
          activeTargets.delete(target);
          syncTone();
        },
      })
    );

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      activeTargets.clear();
    };
  }, [isHome, pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  const heroBarVisible = (isGallery || !pastHero) && !isMenuOpen;
  const pillVisible =
    !isGallery &&
    !isMenuOpen &&
    !(isHome && autoHideArmed && isHidden) &&
    (pastHero || !isHome);

  const allLinks = [...OVERLAY_LINKS_LEFT, ...OVERLAY_LINKS_RIGHT];

  return (
    <>
      {/* Hero horizontal bar */}
      <nav
        className={`nav-hero-bar ${isDarkNav ? "nav-hero-bar-dark" : ""} ${!isHome && !pastHero ? "nav-hero-bar-has-pill" : ""}`}
        aria-label="Primary"
        style={{
          opacity: heroBarVisible ? 1 : 0,
          transform: heroBarVisible ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: heroBarVisible ? "auto" : "none",
        }}
      >
        <Link href="/" className="nav-hero-brand">
          Rocca Mare
        </Link>
        <ul className="nav-hero-links">
          {HERO_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-hero-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="nav-hero-reserve">
          Reserve
        </Link>
      </nav>

      {/* Floating Menu pill */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        className={`nav-pill ${!isHome && !pastHero ? "nav-pill-inner-mobile" : ""}`}
        style={{
          opacity: pillVisible ? 1 : 0,
          pointerEvents: pillVisible ? "auto" : "none",
        }}
      >
        Menu
      </button>

      {/* Full-screen overlay */}
      <div
        className="nav-overlay"
        aria-hidden={!isMenuOpen}
        style={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      >
        {/* Overlay: own background image + navy tint */}
        <div className="nav-overlay-bg" aria-hidden="true" />

        {/* Logo top-left */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="nav-overlay-brand"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
            transition: `opacity 500ms cubic-bezier(0.76, 0, 0.24, 1) 80ms,
                         transform 500ms cubic-bezier(0.76, 0, 0.24, 1) 80ms`,
          }}
        >
          Rocca Mare
        </Link>

        {/* Close button top-right */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          className="nav-overlay-close"
        >
          Close
        </button>

        {/* Two-column link grid — centered vertically */}
        <nav className="nav-overlay-inner" aria-label="Primary">
          <div className="nav-overlay-columns">
            {/* Left column */}
            <ul className="nav-overlay-col">
              {OVERLAY_LINKS_LEFT.map((link, i) => (
                <li
                  key={link.label}
                  style={{
                    transform: isMenuOpen ? "translateY(0)" : "translateY(24px)",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: `transform 700ms cubic-bezier(0.76, 0, 0.24, 1) ${
                      isMenuOpen ? 120 + i * 90 : 0
                    }ms, opacity 700ms cubic-bezier(0.76, 0, 0.24, 1) ${
                      isMenuOpen ? 120 + i * 90 : 0
                    }ms`,
                  }}
                >
                  <span className="nav-overlay-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-overlay-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right column */}
            <ul className="nav-overlay-col">
              {OVERLAY_LINKS_RIGHT.map((link, i) => (
                <li
                  key={link.label}
                  style={{
                    transform: isMenuOpen ? "translateY(0)" : "translateY(24px)",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: `transform 700ms cubic-bezier(0.76, 0, 0.24, 1) ${
                      isMenuOpen ? 120 + (OVERLAY_LINKS_LEFT.length + i) * 90 : 0
                    }ms, opacity 700ms cubic-bezier(0.76, 0, 0.24, 1) ${
                      isMenuOpen ? 120 + (OVERLAY_LINKS_LEFT.length + i) * 90 : 0
                    }ms`,
                  }}
                >
                  <span className="nav-overlay-index">
                    {String(OVERLAY_LINKS_LEFT.length + i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-overlay-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info bottom-left */}
          <div
            className="nav-overlay-contact"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 600ms cubic-bezier(0.76, 0, 0.24, 1) ${
                isMenuOpen ? 120 + allLinks.length * 90 : 0
              }ms, transform 600ms cubic-bezier(0.76, 0, 0.24, 1) ${
                isMenuOpen ? 120 + allLinks.length * 90 : 0
              }ms`,
            }}
          >
            <a href="tel:+33000000000" className="nav-overlay-contact-link">
              +33 0 00 00 00 00
            </a>
            <a href="mailto:hello@roccamare.com" className="nav-overlay-contact-link">
              hello@roccamare.com
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
