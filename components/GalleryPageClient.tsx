"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GALLERY_IMAGES = [
  "/images/gallery/1.jpeg",
  "/images/gallery/2.jpeg",
  "/images/gallery/3.jpeg",
  "/images/gallery/4.jpeg",
  "/images/gallery/5.jpeg",
  "/images/gallery/6.jpeg",
  "/images/gallery/7.jpeg",
  "/images/gallery/8.jpeg",
  "/images/gallery/9.jpeg",
  "/images/gallery/10.jpeg",
  "/images/gallery/11.jpeg",
  "/images/gallery/12.jpeg",
];

export default function GalleryPageClient() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 900px)").matches;
    if (reduced || compact) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getDistance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <main className="gallery-page">
      <section
        ref={sectionRef}
        className="gallery-horizontal"
        aria-label="Rocca Mare gallery"
      >
        <div ref={trackRef} className="gallery-track">
          {GALLERY_IMAGES.map((src, index) => (
            <article key={src} className="gallery-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="gallery-panel-image"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="type-label gallery-panel-label">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>

        <div className="gallery-progress" aria-hidden="true">
          <span ref={progressRef} className="gallery-progress-fill" />
        </div>
      </section>
    </main>
  );
}
