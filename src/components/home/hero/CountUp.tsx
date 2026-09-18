"use client";

import { useEffect, useState } from "react";
import { useHeroMotion } from "@/components/home/hero/HeroStage";

type CountUpProps = {
  to: number;
  suffix?: string;
  delay?: number;
  duration?: number;
};

export function CountUp({ to, suffix = "", delay = 0, duration = 1100 }: CountUpProps) {
  const show = useHeroMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!show) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const wait = window.setTimeout(() => setValue(to), delay);
      return () => window.clearTimeout(wait);
    }

    let frame = 0;
    let startAt = 0;

    const wait = window.setTimeout(() => {
      startAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startAt) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setValue(Math.round(to * eased));
        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      };
      frame = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(wait);
      window.cancelAnimationFrame(frame);
    };
  }, [show, to, delay, duration]);

  return (
    <>
      {show ? value : 0}
      {suffix}
    </>
  );
}
