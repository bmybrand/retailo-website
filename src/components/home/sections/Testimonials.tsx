"use client";

import { useRef } from "react";
import Image from "next/image";
import { BrandLogos, BrandMark, type Brand } from "@/components/home/sections/BrandLogos";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  brand: Brand;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Emma Richardson",
    role: "Co-Founder, Elevate",
    quote: "Finally, we have complete visibility.",
    brand: "elevate",
    image: "/testimonial-emma.png",
  },
  {
    name: "Keisha Sharay",
    role: "Creative Director, Keisha Sharay",
    quote: "We finally run the storefront from one place.",
    brand: "keisha",
    image: "/testimonial-sarah.png",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, She's Laser & Esthetics",
    quote: "Everything we need to run our store, in one place.",
    brand: "shes_laser",
    image: "/testimonial-sarah.png",
  },
  {
    name: "James Wilson",
    role: "Director, Parable Skate Co.",
    quote: "Built for the way our business actually works.",
    brand: "parable",
    image: "/testimonial-james.png",
  },
  {
    name: "Marcus Vance",
    role: "Head of Logistics, Racknificent",
    quote: "Orders and inventory stay in sync every day.",
    brand: "racknificent",
    image: "/testimonial-daniel.png",
  },
  {
    name: "Daniel Carter",
    role: "Operations Manager, Jiggy Jerky",
    quote: "Our daily operations are so much easier.",
    brand: "jiggy",
    image: "/testimonial-daniel.png",
  },
];

function CarouselArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
      width="36"
      height="14"
      viewBox="0 0 38 14"
      fill="none"
    >
      <path d="M1 7h35m-6-5 6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll<HTMLElement>("[data-testimonial-card]"));
    if (!cards.length) return;

    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
    const currentScroll = carousel.scrollLeft;
    const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const view = carousel.getBoundingClientRect();
    const lastBox = cards[cards.length - 1].getBoundingClientRect();
    const lastFullyVisible = lastBox.right <= view.right + 1;

    if (direction === 1) {
      if (lastFullyVisible && currentScroll > 40) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      carousel.scrollTo({
        left: Math.min(maxScroll, currentScroll + step),
        behavior: "smooth",
      });
      return;
    }

    if (currentScroll <= 40 || currentScroll - step < -8) {
      carousel.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    carousel.scrollTo({ left: currentScroll - step, behavior: "smooth" });
  }

  return (
    <section id="testimonials" className="flex min-h-[100svh] flex-col justify-center overflow-x-hidden bg-white py-12 sm:py-16">
      {/* Contained top area */}
      <div className="mx-auto w-[92%] lg:w-[80%]">
        <div className="text-center">
          <p className="font-inter text-[clamp(13px,1.4vw,20px)] sm:text-[20px] font-semibold tracking-wider text-brand uppercase">
            Businesses That Trust Us
          </p>
          <h2 className="mx-auto mt-2 sm:mt-3 max-w-5xl sm:max-w-6xl font-sans text-[clamp(22px,3.5vw,52px)] sm:text-[52px] font-bold leading-tight tracking-tight text-zinc-900">
            Trusted By Growing Brands &amp; Businesses
          </h2>
        </div>

        <BrandLogos />

        <h3 className="mt-12 sm:mt-16 text-left font-sans text-[clamp(20px,3vw,52px)] sm:text-[52px] font-semibold leading-tight tracking-tight text-zinc-900">
          Trusted by Businesses Like Yours
        </h3>
      </div>

      <div className="w-full overflow-hidden">
        <div
          ref={carouselRef}
          role="region"
          aria-label="Customer testimonials"
          tabIndex={0}
          className="mt-6 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-[4%] [scrollbar-width:none] sm:mt-8 sm:gap-7 lg:scroll-pl-[10%] [&::-webkit-scrollbar]:hidden"
        >
          <div
            data-carousel-spacer
            aria-hidden="true"
            className="w-[4%] shrink-0 snap-none lg:w-[10%]"
          />
          {testimonials.map((item, idx) => (
            <article
              key={`${item.name}-${idx}`}
              data-testimonial-card
              className="relative aspect-[420/680] w-[315px] shrink-0 snap-start overflow-hidden rounded-2xl bg-zinc-900 shadow-md sm:w-[360px] lg:w-[400px]"
            >
              <Image
                src={item.image}
                alt={`${item.name} portrait`}
                width={420}
                height={680}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

              <div className="absolute top-4 left-1/2 w-[50%] max-w-[140px] -translate-x-1/2 drop-shadow-sm sm:top-5 sm:max-w-[160px]">
                <BrandMark brand={item.brand} light />
              </div>

              <div className="absolute right-4 bottom-5 left-4 text-white sm:right-5 sm:bottom-6 sm:left-5">
                <p className="font-inter text-[18px] leading-snug font-normal text-zinc-100 sm:text-[22px] lg:text-[28px]">
                  {item.quote}
                </p>
                <div className="mt-3.5 flex items-end justify-between gap-2 border-t border-white/15 pt-3 sm:mt-4 sm:pt-3.5">
                  <div className="min-w-0">
                    <p className="font-inter text-[15px] font-semibold leading-tight text-white sm:text-[16px] lg:text-[18px]">{item.name}</p>
                    <p className="mt-0.5 truncate font-inter text-[12px] leading-tight text-brand-lime sm:text-[13px] lg:text-[15px]">
                      {item.role}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-lime text-black shadow-[0_2px_8px_rgba(0,0,0,0.25)] sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 overflow-visible sm:h-[22px] sm:w-[22px] lg:h-6 lg:w-6" fill="currentColor">
                      <path
                        d="M7.6 5.8v12.4L18.8 12 7.6 5.8Z"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
          <div
            aria-hidden="true"
            className="w-[315px] shrink-0 snap-none sm:w-[360px] lg:w-[400px]"
          />
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-[92%] items-center justify-center gap-5 text-brand sm:mt-10 lg:w-[80%]">
        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() => move(-1)}
          className="p-2 text-brand transition-transform hover:scale-110 active:scale-95"
        >
          <CarouselArrow direction="left" />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => move(1)}
          className="p-2 text-brand transition-transform hover:scale-110 active:scale-95"
        >
          <CarouselArrow direction="right" />
        </button>
      </div>
    </section>
  );
}
