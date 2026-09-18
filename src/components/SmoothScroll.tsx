"use client";

import { useEffect } from "react";

function canScrollWithin(element: Element | null, delta: number) {
  for (let node = element; node && node !== document.body; node = node.parentElement) {
    const overflow = window.getComputedStyle(node).overflowY;
    if (overflow !== "auto" && overflow !== "scroll") continue;

    const remaining = node.scrollHeight - node.clientHeight;
    if (remaining <= 0) continue;
    if (delta < 0 && node.scrollTop > 0) return true;
    if (delta > 0 && node.scrollTop < remaining) return true;
  }

  return false;
}

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let target = window.scrollY;
    let frame = 0;
    let lastFrameTime = 0;
    let historyScrollTimer = 0;
    let previousScrollBehavior: string | null = null;

    function restoreHistoryScrollBehavior() {
      if (previousScrollBehavior === null) return;
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      previousScrollBehavior = null;
      historyScrollTimer = 0;
    }

    function onPopState() {
      stop();
      if (previousScrollBehavior === null) {
        previousScrollBehavior = document.documentElement.style.scrollBehavior;
      }
      document.documentElement.style.scrollBehavior = "auto";
      window.clearTimeout(historyScrollTimer);
      historyScrollTimer = window.setTimeout(restoreHistoryScrollBehavior, 2000);
    }

    function stop() {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lastFrameTime = 0;
      target = window.scrollY;
    }

    function animate(time: number) {
      const distance = target - window.scrollY;
      if (Math.abs(distance) < 0.5) {
        window.scrollTo({ top: target, behavior: "instant" });
        frame = 0;
        lastFrameTime = 0;
        return;
      }

      const elapsed = lastFrameTime ? Math.min(time - lastFrameTime, 32) : 16;
      lastFrameTime = time;
      const easing = 1 - Math.exp(-elapsed / 150);
      window.scrollTo({ top: window.scrollY + distance * easing, behavior: "instant" });
      frame = window.requestAnimationFrame(animate);
    }

    function onWheel(event: WheelEvent) {
      if (
        reducedMotion.matches ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        document.body.style.overflow === "hidden"
      ) {
        stop();
        return;
      }

      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const delta = event.deltaY * unit;
      const element = event.target instanceof Element ? event.target : null;
      if (canScrollWithin(element, delta)) {
        stop();
        return;
      }

      event.preventDefault();
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      target = Math.min(maxScroll, Math.max(0, (frame ? target : window.scrollY) + delta));
      if (!frame) frame = window.requestAnimationFrame(animate);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("hashchange", stop);
    window.addEventListener("popstate", onPopState);

    return () => {
      stop();
      window.clearTimeout(historyScrollTimer);
      restoreHistoryScrollBehavior();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("hashchange", stop);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}
