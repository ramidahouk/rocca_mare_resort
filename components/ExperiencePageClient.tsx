"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EXPERIENCES = [
  {
    label: "Pool",
    title: "Still water.",
    body: "A slow edge between palms, stone, and the sea.",
    image: "/images/Horizontal%20Pool.jpeg",
    detailImage: "/images/Pool.jpeg",
    detailTitle: "Pool days",
    detailBody: "Still water, long shade, and loungers held close to the coast.",
  },
  {
    label: "Beach",
    title: "Open coast.",
    body: "Sand, rocks, and a shoreline made for unhurried days.",
    image: "/images/Horizontal%20Beach.jpeg",
    detailImage: "/images/Beach.jpeg",
    detailTitle: "Beach hours",
    detailBody: "A short walk from the pool to sand, rocks, and open water.",
  },
  {
    label: "Dining",
    title: "Tables by dusk.",
    body: "Evening light, open air, and the sound of water nearby.",
    image: "/images/Horizontal%20dining.jpeg",
    detailImage: "/images/Dining.jpeg",
    detailTitle: "Evening tables",
    detailBody: "Open-air meals with the terrace, palms, and sea in view.",
  },
];

export default function ExperiencePageClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExperience = EXPERIENCES[activeIndex];
  const storyRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const progressRefs = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = storyRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 900px)").matches;
    if (reduced || compact) return;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean);
      const images = imageRefs.current.filter(Boolean);
      const progress = progressRefs.current.filter(Boolean);

      gsap.set(panels, { autoAlpha: 0, y: 28 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(images, {
        clipPath: "inset(0% 0% 0% 0%)",
      });
      gsap.set(images, {
        zIndex: (index) => images.length - index,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.7}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      images.slice(0, -1).forEach((image, index) => {
        tl.to(
          progress[index],
          {
            scaleX: 1,
            ease: "none",
            duration: 1,
          },
          `story-${index}`
        )
          .to(
            image,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              ease: "none",
              duration: 1,
            },
            `story-${index}`
          )
          .to(
            panels[index],
            {
              autoAlpha: 0,
              y: -22,
              ease: "power2.out",
              duration: 0.3,
            },
            `story-${index}+=0.2`
          )
          .to(
            panels[index + 1],
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.35,
            },
            `story-${index}+=0.5`
          );
      });

      tl.to(progress[progress.length - 1], {
        scaleX: 1,
        ease: "none",
        duration: 0.65,
      });
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <main className="experience-page">
      <section className="experience-hero" aria-label="Experience at Rocca Mare">
        <div className="experience-page-stage" aria-hidden="true">
          {EXPERIENCES.map((item, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.label}
              src={item.image}
              alt=""
              className="experience-page-image"
              style={{ opacity: activeIndex === index ? 1 : 0 }}
              decoding="async"
            />
          ))}
        </div>

        <div className="experience-page-inner">
          <div className="experience-page-copy">
            <span className="type-label experience-page-eyebrow">Experience</span>
            <h1 className="experience-page-title">{activeExperience.title}</h1>
            <p className="experience-page-body">{activeExperience.body}</p>
          </div>

          <div className="experience-page-selector" role="tablist" aria-label="Experience selector">
            {EXPERIENCES.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={`experience-page-option ${
                  activeIndex === index ? "experience-page-option-active" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span className="experience-page-option-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="experience-page-option-main">
                  <span className="experience-page-option-label">{item.label}</span>
                  <span className="experience-page-option-body">{item.body}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={storyRef}
        data-nav-tone="dark"
        className="experience-scroll-story"
        aria-label="Experience details"
      >
        <div className="experience-story-shell">
          <div className="experience-story-copy">
            <span className="type-label experience-story-eyebrow">The rhythm</span>

            <div className="experience-story-panels">
              {EXPERIENCES.map((item, index) => (
                <div
                  key={item.label}
                  ref={(el) => {
                    if (el) panelRefs.current[index] = el;
                  }}
                  className="experience-story-panel"
                >
                  <span className="experience-story-index">
                    {String(index + 1).padStart(2, "0")} / {item.label}
                  </span>
                  <h2 className="experience-story-title">{item.detailTitle}</h2>
                  <p className="experience-story-body">{item.detailBody}</p>
                </div>
              ))}
            </div>

            <div className="experience-story-progress" aria-hidden="true">
              {EXPERIENCES.map((item, index) => (
                <span key={item.label} className="experience-story-progress-item">
                  <span className="experience-story-progress-label">{item.label}</span>
                  <span className="experience-story-progress-track">
                    <span
                      ref={(el) => {
                        if (el) progressRefs.current[index] = el;
                      }}
                      className="experience-story-progress-fill"
                    />
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="experience-story-media" aria-hidden="true">
            {EXPERIENCES.map((item, index) => (
              <div
                key={item.label}
                ref={(el) => {
                  if (el) imageRefs.current[index] = el;
                }}
                className="experience-story-image-layer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.detailImage}
                  alt=""
                  className="experience-story-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="experience-mobile-story">
          {EXPERIENCES.map((item, index) => (
            <article key={item.label} className="experience-mobile-story-card">
              <div className="experience-mobile-story-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.detailImage}
                  alt=""
                  className="experience-mobile-story-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="experience-mobile-story-copy">
                <span className="experience-story-index">
                  {String(index + 1).padStart(2, "0")} / {item.label}
                </span>
                <h2 className="experience-story-title">{item.detailTitle}</h2>
                <p className="experience-story-body">{item.detailBody}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
