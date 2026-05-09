"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function GSAPInit() {
  useEffect(() => {
    gsap.ticker.lagSmoothing(1000, 16);
  }, []);

  return null;
}
