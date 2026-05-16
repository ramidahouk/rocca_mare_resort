"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=60%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(media, { scale: 1.05 }, { scale: 1.2, ease: "none" });

      if (indicatorRef.current) {
        gsap.to(indicatorRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=20%",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Rocca Mare hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        ref={mediaRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          transform: "scale(1.05)",
          backgroundImage: "url('/images/hero-mobile.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-mobile.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(5, 10, 48, 0.25)",
          zIndex: 1,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "160px",
          background:
            "linear-gradient(to bottom, rgba(5, 10, 48, 0.32) 0%, rgba(5, 10, 48, 0.1) 60%, rgba(5, 10, 48, 0) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />


      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <h1
          className="type-hero-display"
          style={{ color: "#FAF7F2", maxWidth: "10ch" }}
        >
          Rocca Mare
        </h1>

        <p
          className="type-body hero-subtitle"
          style={{
            color: "#FAF7F2",
            opacity: 0.85,
            maxWidth: "32ch",
          }}
        >
          Stone, sea, and stillness.
        </p>

        <Link href="/rooms" className="btn-primary hero-cta">
          Discover
        </Link>
      </div>

      <div
        ref={indicatorRef}
        className="hero-scroll-indicator"
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          color: "#FAF7F2",
        }}
      >
        <span className="type-label" style={{ opacity: 0.7, fontSize: "0.6875rem" }}>
          Scroll
        </span>
        <span
          style={{
            display: "block",
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, rgba(250,247,242,0.7), rgba(250,247,242,0))",
          }}
        />
      </div>
    </section>
  );
}
