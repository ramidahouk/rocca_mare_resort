"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROOMS = [
  {
    label: "The Room",
    descriptor: "Wakes you with sea light.",
    image: "https://picsum.photos/800/1000?random=31",
    tint: "rgba(201, 164, 136, 0.18)", // beige — warm stone
    href: "/rooms",
  },
  {
    label: "The Suite",
    descriptor: "Room to breathe, room to linger.",
    image: "https://picsum.photos/800/1000?random=32",
    tint: "rgba(112, 172, 144, 0.16)", // wave green — water
    href: "/rooms",
  },
  {
    label: "The Pool Villa",
    descriptor: "Private water. Private quiet.",
    image: "https://picsum.photos/800/1000?random=33",
    tint: "rgba(5, 10, 48, 0.06)", // soft navy — depth
    href: "/rooms",
  },
];

export default function HomeRooms() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const handleCardEnter = (tint: string) => {
    if (sectionRef.current) {
      sectionRef.current.style.backgroundColor = tint;
    }
  };
  const handleCardLeave = () => {
    if (sectionRef.current) {
      sectionRef.current.style.backgroundColor = "";
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const headerTargets = [eyebrowRef.current, headlineRef.current];
    const cardTargets = cardsRef.current;

    if (reduced) {
      gsap.set([...headerTargets, ...cardTargets, ctaRef.current], {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([...headerTargets, ctaRef.current], {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        y: 20,
      });
      gsap.set(cardTargets, {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
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
      })
        .to(
          cardTargets,
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.9"
        )
        .to(
          ctaRef.current,
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.6"
        );
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Accommodation at Rocca Mare"
      className="home-rooms-outer"
    >
      <div className="home-rooms-header">
        <span
          ref={eyebrowRef}
          className="type-label home-rooms-eyebrow"
          style={{ color: "#70AC90", display: "inline-block" }}
        >
          Accommodation
        </span>
        <h2
          ref={headlineRef}
          className="home-rooms-headline"
          style={{
            color: "#050A30",
            fontFamily: "var(--font-recoleta), serif",
            fontWeight: 400,
            fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Three ways to stay.
        </h2>
      </div>

      <div className="home-rooms-grid">
        {ROOMS.map((room, i) => (
          <div
            key={room.label}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            onMouseEnter={() => handleCardEnter(room.tint)}
            onMouseLeave={handleCardLeave}
            onFocus={() => handleCardEnter(room.tint)}
            onBlur={handleCardLeave}
          >
            <Link href={room.href} className="home-rooms-card">
              <div className="home-rooms-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={room.image}
                  alt={room.label}
                  className="home-rooms-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="home-rooms-card-label">{room.label}</h3>
              <p className="home-rooms-card-descriptor">{room.descriptor}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="home-rooms-footer">
        <Link
          ref={ctaRef}
          href="/rooms"
          className="btn-ghost"
        >
          See all rooms
        </Link>
      </div>
    </section>
  );
}
