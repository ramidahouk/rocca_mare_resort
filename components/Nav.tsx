"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
  { href: "/rooms", label: "Rooms" },
  { href: "/experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: () => window.innerHeight * 0.15,
        end: "max",
        onEnter: () => setIsFilled(true),
        onLeaveBack: () => setIsFilled(false),
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-600 ${
          isFilled
            ? "bg-[rgba(250,247,242,0.92)] backdrop-blur-md shadow-[0_1px_0_rgba(5,10,48,0.06)]"
            : "bg-transparent"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="flex h-18 items-center justify-between md:h-22" style={{ paddingInline: "clamp(1.5rem, 4vw, 4rem)" }}>
          <Link
            href="/"
            className={`type-heading transition-colors duration-600 ${
              isFilled ? "text-navy" : "text-warm-white"
            }`}
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
              transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
            }}
          >
            Rocca Mare
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`type-label nav-link transition-colors duration-600 ${
                      isFilled ? "text-navy" : "text-warm-white"
                    }`}
                    style={{
                      transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="btn-primary">
              Reserve
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex h-8 w-8 flex-col items-center justify-center gap-1.5 transition-colors duration-600 md:hidden ${
              isFilled || isMenuOpen ? "text-navy" : "text-warm-white"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
            }}
          >
            <span
              className="block h-px w-6 bg-current transition-transform duration-300"
              style={{
                transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
                transform: isMenuOpen ? "translateY(3.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-6 bg-current transition-transform duration-300"
              style={{
                transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
                transform: isMenuOpen ? "translateY(-3.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-600 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "#FAF7F2",
          transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="flex flex-col justify-center h-full pt-18" style={{ paddingInline: "clamp(1.5rem, 4vw, 4rem)" }}>
          <ul className="flex flex-col gap-8">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                style={{
                  transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isMenuOpen ? 1 : 0,
                  transition: `transform 600ms cubic-bezier(0.76, 0, 0.24, 1) ${
                    isMenuOpen ? 100 + i * 80 : 0
                  }ms, opacity 600ms cubic-bezier(0.76, 0, 0.24, 1) ${
                    isMenuOpen ? 100 + i * 80 : 0
                  }ms`,
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="type-display block text-navy"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="btn-primary mt-12 self-start"
            style={{
              transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMenuOpen ? 1 : 0,
              transition: `transform 600ms cubic-bezier(0.76, 0, 0.24, 1) ${
                isMenuOpen ? 100 + NAV_LINKS.length * 80 : 0
              }ms, opacity 600ms cubic-bezier(0.76, 0, 0.24, 1) ${
                isMenuOpen ? 100 + NAV_LINKS.length * 80 : 0
              }ms`,
            }}
          >
            Reserve
          </Link>
        </div>
      </div>
    </>
  );
}
