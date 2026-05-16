"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function HomeCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-label="Reserve your stay at Rocca Mare"
      className="home-cta-outer"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <div className="home-cta-inner">
        <div className="home-cta-heading">
          <span className="type-label home-cta-eyebrow">Reserve</span>
          <h2 className="home-cta-headline">The quiet is waiting.</h2>
        </div>

        <div className="home-cta-action">
          <p className="type-body home-cta-body">
            Choose the room, the terrace, and the days you want to keep still.
          </p>
          <Link href="/contact" className="home-cta-link">
            Plan your stay
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
