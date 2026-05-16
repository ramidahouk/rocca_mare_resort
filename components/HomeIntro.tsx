"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const textTargets = [
      eyebrowRef.current,
      headlineRef.current,
      bodyRef.current,
      ctaRef.current,
    ];

    if (reduced) {
      gsap.set(textTargets, { clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(textTargets, {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        y: 20,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })
        .to(textTargets, {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
        });

      if (imageRef.current && imageWrapRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="The stay at Rocca Mare"
      className="home-intro-outer"
    >
      <div className="home-intro-grid">
        <div ref={imageWrapRef} className="home-intro-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src="/images/intro-bleed.webp"
            alt="A quiet stone terrace overlooking the sea at Rocca Mare"
            className="home-intro-image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="home-intro-text">
          <span
            ref={eyebrowRef}
            className="type-label home-intro-eyebrow"
            style={{ color: "#70AC90", display: "inline-block" }}
          >
            The Stay
          </span>

          <h2
            ref={headlineRef}
            className="home-intro-headline"
            style={{
              color: "#050A30",
              fontFamily: "var(--font-recoleta), serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Made for staying.
          </h2>

          <p
            ref={bodyRef}
            className="type-body home-intro-body"
            style={{ color: "#050A30" }}
          >
            A pool cut into stone. Rooms open to the sea. Meals drift across
            the terrace.
          </p>

          <Link
            ref={ctaRef}
            href="/rooms"
            className="btn-ghost home-intro-cta"
          >
            Discover the rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
