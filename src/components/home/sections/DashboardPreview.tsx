"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function DashboardPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const dashboard = dashboardRef.current;
    const image = imageRef.current;
    if (!section || !dashboard || !image) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopLandscape = window.matchMedia(
      "(min-width: 768px) and (orientation: landscape) and (hover: hover)",
    );
    let frame = 0;

    function update() {
      frame = 0;
      if (!section || !dashboard || !image) return;

      if (reducedMotion.matches || !desktopLandscape.matches) {
        section.style.height = "100svh";
        dashboard.style.transform = "";
        dashboard.style.borderRadius = "";
        image.style.transform = "";
        return;
      }

      const viewportHeight = window.innerHeight;
      const fullWidthScale = window.innerWidth / dashboard.offsetWidth;
      const hiddenBottom = Math.max(0, image.offsetHeight - dashboard.clientHeight);
      const zoomDistance = viewportHeight;
      const revealDistance = hiddenBottom
        ? Math.max(viewportHeight * 1.8, hiddenBottom * fullWidthScale * 3.5)
        : 0;
      const holdDistance = hiddenBottom ? viewportHeight * 0.2 : 0;
      const trackHeight = `${viewportHeight + zoomDistance + revealDistance + holdDistance}px`;
      if (section.style.height !== trackHeight) section.style.height = trackHeight;

      const scrolled = Math.max(0, -section.getBoundingClientRect().top);
      const zoomProgress = Math.min(1, scrolled / zoomDistance);
      const easedZoom = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
      const revealProgress = revealDistance
        ? Math.min(1, Math.max(0, (scrolled - zoomDistance) / revealDistance))
        : 0;

      dashboard.style.transform = `scale(${1 + (fullWidthScale - 1) * easedZoom})`;
      dashboard.style.borderRadius = `${18 * (1 - easedZoom)}px`;
      image.style.transform = `translate3d(0, ${-hiddenBottom * revealProgress}px, 0)`;
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    image.addEventListener("load", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    desktopLandscape.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      image.removeEventListener("load", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      desktopLandscape.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platform"
      aria-label="Retailo platform preview"
      className="relative min-h-[100svh] scroll-mt-[72px] bg-background"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-3 py-6 sm:px-6">
        <Image
          src="/dashboard-rings.png"
          alt=""
          width={1919}
          height={637}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-50 sm:w-full"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />
        <div
          ref={dashboardRef}
          className="relative overflow-hidden rounded-[14px] border-[4px] border-white bg-white shadow-[0_16px_45px_rgba(20,36,28,0.14)] will-change-transform sm:rounded-[18px] w-[min(94vw,1100px)] max-h-[calc(100svh-48px)] md:[@media(orientation:landscape)_and_(hover:hover)]:w-[75vw] md:[@media(orientation:landscape)_and_(hover:hover)]:max-h-[75svh]"
        >
          <Image
            ref={imageRef}
            src="/retailo-dashboard.png"
            alt="Retailo merchant dashboard showing store performance, orders, inventory, and fulfillment"
            width={1679}
            height={1117}
            sizes="100vw"
            className="block w-full h-auto will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
