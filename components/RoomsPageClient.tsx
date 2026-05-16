"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";

const ROOM_TYPES = [
  {
    label: "Rooms",
    title: "The Room",
    descriptor: "Upper-floor calm. Sea light through linen.",
    image: "/images/Room.png",
    tint: "rgba(201, 164, 136, 0.2)",
  },
  {
    label: "Sea Rooms",
    title: "The Sea Room",
    descriptor: "A balcony held open to water and palms.",
    image: "/images/Balcony.png",
    tint: "rgba(112, 172, 144, 0.18)",
  },
  {
    label: "Suites",
    title: "The Suite",
    descriptor: "Terrace space. Slower mornings near the pool.",
    image: "/images/Suite.jpeg",
    tint: "rgba(5, 10, 48, 0.08)",
  },
];

export default function RoomsPageClient() {
  const pageRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main
      ref={pageRef}
      className={`rooms-page ${activeIndex === null ? "" : "rooms-page-has-active"}`}
    >
      <div className="rooms-page-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/menu-bg.png"
          alt=""
          className="rooms-page-base-image"
          decoding="async"
        />
      </div>

      <section className="rooms-page-grid" aria-label="Rocca Mare rooms">
        {ROOM_TYPES.map((room, index) => (
          <article
            key={room.label}
            className={`rooms-page-panel ${
              activeIndex === index ? "rooms-page-panel-active" : ""
            }`}
            onPointerEnter={() => setActiveIndex(index)}
            onPointerLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            tabIndex={0}
            style={{ "--room-image": `url(${room.image})` } as CSSProperties}
          >
            <span className="type-label rooms-page-count">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="rooms-page-copy">
              <span className="type-label rooms-page-label">{room.label}</span>
              <h1 className="rooms-page-title">{room.title}</h1>
              <p className="rooms-page-descriptor">{room.descriptor}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
