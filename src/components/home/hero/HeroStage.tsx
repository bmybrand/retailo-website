"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const LINE_ONE = "Everything Your Store";
const LINE_TWO_PREFIX = "Needs. ";
const LINE_TWO_MARK = "All in One Place.";

type Op =
  | { type: "type"; chars: string }
  | { type: "backspace"; count: number }
  | { type: "pause"; ms: number };

const SCRIPT: Op[] = [
  { type: "type", chars: "Everything Your Stpre" },
  { type: "pause", ms: 270 },
  { type: "backspace", count: 3 },
  { type: "pause", ms: 110 },
  { type: "type", chars: "ore" },
  { type: "type", chars: `\n${LINE_TWO_PREFIX}All in One Palce.` },
  { type: "pause", ms: 310 },
  { type: "backspace", count: 6 },
  { type: "pause", ms: 100 },
  { type: "type", chars: "Place." },
];

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.06em] bg-brand align-middle animate-pulse"
    />
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

const HeroMotionContext = createContext(false);

export function useHeroMotion() {
  return useContext(HeroMotionContext);
}

export function HeroReveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const show = useContext(HeroMotionContext);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: show ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function HeroStage({ children }: { children: ReactNode }) {
  const [eyebrowOn, setEyebrowOn] = useState(false);
  const [belowOn, setBelowOn] = useState(false);
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  const [markOn, setMarkOn] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const reveal = window.setTimeout(() => {
        setEyebrowOn(true);
        setBelowOn(true);
        setDisplay(`${LINE_ONE}\n${LINE_TWO_PREFIX}${LINE_TWO_MARK}`);
        setDone(true);
        setMarkOn(true);
      }, 0);
      return () => window.clearTimeout(reveal);
    }

    const showEyebrow = window.setTimeout(() => setEyebrowOn(true), 80);
    const startRest = window.setTimeout(() => {
      setBelowOn(true);
      void runScript();
    }, 780);

    let cancelled = false;

    async function runScript() {
      let text = "";
      for (const op of SCRIPT) {
        if (cancelled) return;
        if (op.type === "pause") {
          await sleep(op.ms);
          continue;
        }
        if (op.type === "type") {
          for (const char of op.chars) {
            if (cancelled) return;
            text += char;
            setDisplay(text);
            await sleep(60 + Math.random() * 38);
          }
          continue;
        }
        for (let i = 0; i < op.count; i += 1) {
          if (cancelled) return;
          text = text.slice(0, -1);
          setDisplay(text);
          await sleep(36 + Math.random() * 18);
        }
      }
      if (!cancelled) setDone(true);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(showEyebrow);
      window.clearTimeout(startRest);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const paint = window.setTimeout(() => setMarkOn(true), 220);
    return () => window.clearTimeout(paint);
  }, [done]);

  const [lineOne = "", lineTwo = ""] = display.split("\n");
  const hasPrefix = lineTwo.startsWith(LINE_TWO_PREFIX);
  const prefix = hasPrefix ? LINE_TWO_PREFIX : lineTwo;
  const mark = hasPrefix ? lineTwo.slice(LINE_TWO_PREFIX.length) : "";

  return (
    <HeroMotionContext.Provider value={belowOn}>
      <p
        className={`font-inter text-base font-medium tracking-normal text-brand uppercase transition-all duration-700 ease-out sm:text-lg lg:text-xl ${
          eyebrowOn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        Ecommerce Management Platform
      </p>
      <h1
        aria-label={`${LINE_ONE} ${LINE_TWO_PREFIX}${LINE_TWO_MARK}`}
        className="mx-auto mt-1 min-h-[2.3em] font-sans text-[32px] font-bold leading-[1.12] tracking-[-0.03em] text-zinc-900 sm:mt-1.5 sm:text-[44px] md:text-[52px] lg:mt-2 lg:text-[64px] xl:text-[72px] 2xl:text-[80px]"
      >
        <span className="block">
          {lineOne}
          {!display.includes("\n") && !done ? <Caret /> : null}
        </span>
        <span className="block">
          {hasPrefix ? prefix : lineTwo}
          {mark ? (
            <span className="relative isolate inline-block px-[0.04em]">
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-[0.1em] z-0 h-[0.42em] origin-left bg-brand-lime transition-transform duration-700 ease-out ${
                  markOn ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <span className="relative z-10">{mark}</span>
            </span>
          ) : null}
          {display.includes("\n") && !done ? <Caret /> : null}
        </span>
      </h1>
      {children}
    </HeroMotionContext.Provider>
  );
}
