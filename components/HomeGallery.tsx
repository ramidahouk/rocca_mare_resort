"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GALLERY_COLUMNS = [
  [
    "/images/gallery/1.jpeg",
    "/images/gallery/5.jpeg",
    "/images/gallery/9.jpeg",
  ],
  [
    "/images/gallery/2.jpeg",
    "/images/gallery/6.jpeg",
    "/images/gallery/10.jpeg",
  ],
  [
    "/images/gallery/3.jpeg",
    "/images/gallery/7.jpeg",
    "/images/gallery/11.jpeg",
  ],
  [
    "/images/gallery/4.jpeg",
    "/images/gallery/8.jpeg",
    "/images/gallery/12.jpeg",
  ],
];

export default function HomeGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const columnRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const multipliers = [1.1, 1.75, 0.8, 1.45];

      columnRefs.current.forEach((column, index) => {
        gsap.fromTo(
          column,
          { y: 0 },
          {
            y: () => window.innerHeight * multipliers[index],
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Rocca Mare gallery preview"
      className="home-gallery-outer"
    >
      <div className="home-gallery-sticky">
        <div className="home-gallery-copy">
          <span className="type-label home-gallery-eyebrow">Gallery</span>
          <h2 className="home-gallery-headline">Light, stone, water.</h2>
          <Link href="/gallery" className="btn-ghost home-gallery-cta">
            View gallery
          </Link>
        </div>

        <div className="home-gallery-columns" aria-hidden="true">
          {GALLERY_COLUMNS.map((images, columnIndex) => (
            <div
              key={columnIndex}
              ref={(el) => {
                if (el) columnRefs.current[columnIndex] = el;
              }}
              className={`home-gallery-column home-gallery-column-${columnIndex + 1}`}
            >
              {images.map((src) => (
                <div key={src} className="home-gallery-image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="home-gallery-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
