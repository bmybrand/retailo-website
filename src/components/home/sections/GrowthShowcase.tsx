"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import { productLinks } from "@/lib/product-links";
import styles from "./GrowthShowcase.module.css";

type MediaTile = {
  type: "image";
  src: string;
  height: number;
};
type Tile = MediaTile | { type: "label"; text: string } | { type: "carousel" };

const carouselSlides = [
  "/carousel.webp.png",
  "/carousel.webp-1.png",
  "/carousel.webp-2.png",
] as const;

const columns: Tile[][] = [
  [
    { type: "image", src: "/undr-people.webp.png", height: 525 },
    { type: "label", text: "Online Store" },
    { type: "image", src: "/undr-flower.webp.png", height: 525 },
    { type: "image", src: "/health.webp.png", height: 280 },
  ],
  [
    { type: "image", src: "/soniq.webp.png", height: 275 },
    { type: "label", text: "Brand Websites" },
    { type: "image", src: "/earphones.webm.png", height: 421 },
    { type: "label", text: "Product Collections" },
    { type: "carousel" },
    { type: "image", src: "/home.webp.png", height: 525 },
  ],
  [
    { type: "image", src: "/undr-horse.webp.png", height: 525 },
    { type: "label", text: "Services & Appointments" },
    { type: "image", src: "/app.webp.png", height: 275 },
    { type: "image", src: "/car.webm.png", height: 421 },
    { type: "label", text: "Store Design" },
    { type: "image", src: "/card.webp.png", height: 420 },
  ],
  [
    { type: "image", src: "/build-to-run.webp.png", height: 525 },
    { type: "label", text: "Parable Skate Co." },
    { type: "image", src: "/next-gen-smart.webp.png", height: 280 },
    { type: "image", src: "/insurance.webm.png", height: 421 },
  ],
];

const drift = [-220, 170, -155, 195];

export function GrowthShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mosaic = mosaicRef.current;
    if (!section || !mosaic) return;
    const elements = section.querySelectorAll<HTMLElement>("[data-growth-column]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!section || !mosaic) return;
      if (reducedMotion.matches) {
        elements.forEach((element) => element.style.removeProperty("--drift"));
        section.style.removeProperty("--cta-opacity");
        section.style.removeProperty("--cta-blur");
        section.style.removeProperty("--cta-rise");
        return;
      }
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (bounds.height + window.innerHeight)));
      const scale = window.innerWidth < 700 ? 0.45 : 1;
      elements.forEach((element, index) => {
        element.style.setProperty("--drift", String(Math.round((progress - 0.5) * drift[index] * scale)) + "px");
      });

      const revealDistance = window.innerHeight * 1.7;
      const mosaicBottom = mosaic.getBoundingClientRect().bottom;
      const reveal = Math.max(0, Math.min(1, 1 - mosaicBottom / revealDistance));
      const easedReveal = reveal * reveal * (3 - 2 * reveal);
      const lastCardBottom = Math.max(
        mosaicBottom,
        ...Array.from(elements, (element) => element.getBoundingClientRect().bottom),
      );
      const sharpness = Math.max(0, Math.min(1, 1 - lastCardBottom / (window.innerHeight * 0.5)));
      const easedSharpness = sharpness * sharpness * (3 - 2 * sharpness);
      section.style.setProperty("--cta-opacity", String(easedReveal));
      section.style.setProperty("--cta-blur", String(Math.round((1 - easedSharpness) * 22)) + "px");
      section.style.setProperty("--cta-rise", String(Math.round((1 - easedReveal) * 24)) + "px");
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} id="pricing" aria-labelledby="growth-heading" className={styles.section}>
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 id="growth-heading">
            <span>Built To Support Your Business</span>
            <span>As It Grows And Evolves</span>
          </h2>
          <p>
            From fashion and beauty to food, wellness, and tech, Retailo helps businesses stay connected.
            Manage products, orders, inventory, payments, and delivery all in one place, so you can focus on growing your business.
          </p>
          <a href={productLinks.register} className={styles.primaryButton}>
            Run Your Business With Retailo
            <ArrowIcon className={styles.buttonArrow} />
          </a>
        </div>
      </div>

      <div ref={mosaicRef} className={styles.mosaic} aria-hidden="true">
        <div className={styles.grid}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className={styles.column} data-growth-column>
              {column.map((tile, tileIndex) => tile.type === "label" ? (
                <div key={columnIndex + "-" + tileIndex} className={[styles.glass, styles.label].join(" ")}>
                  {tile.text}
                </div>
              ) : tile.type === "carousel" ? (
                <div key={columnIndex + "-" + tileIndex} className={styles.glass}>
                  <div className={styles.carouselMedia}>
                    {carouselSlides.map((src) => (
                      <Image
                        key={src}
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 900px) 45vw, 22vw"
                        className={styles.carouselSlide}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div key={columnIndex + "-" + tileIndex} className={styles.glass}>
                  <Image
                    src={tile.src}
                    alt=""
                    width={281}
                    height={tile.height}
                    sizes="(max-width: 900px) 45vw, 22vw"
                    className={styles.mediaImage}
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
