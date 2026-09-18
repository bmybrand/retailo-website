"use client";

import { HeroReveal, useHeroMotion } from "@/components/home/hero/HeroStage";
import { useEffect, useState } from "react";

const points = [
  "No credit card required",
  "Easy setup",
  "Built for modern merchants",
];

function CheckIcon({ ticked }: { ticked: boolean }) {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-brand sm:h-4 sm:w-4 lg:h-5 lg:w-5"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.2 8.2 6.3 11.3 12.8 4.7"
        className="transition-[stroke-dashoffset,opacity] duration-200 ease-out"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="16"
        strokeDashoffset={ticked ? 0 : 16}
        style={{ opacity: ticked ? 1 : 0 }}
      />
    </svg>
  );
}

function ProofPoint({ label, index }: { label: string; index: number }) {
  const show = useHeroMotion();
  const [ticked, setTicked] = useState(false);

  useEffect(() => {
    if (!show) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mark = window.setTimeout(() => setTicked(true), reducedMotion ? 0 : 820 + index * 820);
    return () => window.clearTimeout(mark);
  }, [show, index]);

  return (
    <HeroReveal delay={480 + index * 160}>
      <span
        className={`inline-flex origin-center items-center gap-1.5 ${
          ticked ? "[animation:proof-pop_0.72s_ease-out]" : ""
        }`}
      >
        <CheckIcon ticked={ticked} />
        {label}
      </span>
    </HeroReveal>
  );
}

export function HeroProof() {
  return (
    <ul className="mt-5 flex flex-col items-center gap-2 font-inter text-xs text-zinc-600 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:text-[13px] md:text-sm lg:mt-8 lg:gap-x-6 lg:text-lg">
      {points.map((point, index) => (
        <li key={point}>
          <ProofPoint label={point} index={index} />
        </li>
      ))}
    </ul>
  );
}
