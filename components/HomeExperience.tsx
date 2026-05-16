"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EXPERIENCES = [
  {
    label: "Pool",
    descriptor: "Still water. Warm stone.",
    image: "/images/Pool.jpeg",
  },
  {
    label: "Beach",
    descriptor: "Salt air. Slow afternoons.",
    image: "/images/Beach.jpeg",
  },
  {
    label: "Dining",
    descriptor: "Tables held by dusk.",
    image: "/images/Dining.jpeg",
  },
];

export default function HomeExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const panelRefs = useRef<HTMLAnchorElement[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headerTargets = [eyebrowRef.current, headlineRef.current].filter(Boolean);
    const panelTargets = panelRefs.current;

    if (reduced) {
      gsap.set([...headerTargets, ...panelTargets], {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(headerTargets, {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        y: 20,
      });
      gsap.set(panelTargets, {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        y: 28,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(headerTargets, {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
      }).to(
        panelTargets,
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.75"
      );
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Experience at Rocca Mare"
      className="home-experience-outer"
    >
      <div className="home-experience-heading">
        <span ref={eyebrowRef} className="type-label home-experience-eyebrow">
          Experience
        </span>
        <h2 ref={headlineRef} className="home-experience-headline">
          Days shaped by water.
        </h2>
      </div>

      <div className="home-experience-panels">
        {EXPERIENCES.map((item, index) => (
          <Link
            key={item.label}
            ref={(el) => {
              if (el) panelRefs.current[index] = el;
            }}
            href="/experience"
            className="home-experience-panel"
            aria-label={`${item.label}: ${item.descriptor}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt=""
              className="home-experience-image"
              loading="lazy"
              decoding="async"
            />
            <span className="home-experience-panel-shade" aria-hidden="true" />
            <span className="home-experience-content">
              <span className="home-experience-count">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="home-experience-label">{item.label}</span>
              <span className="home-experience-descriptor">
                {item.descriptor}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
