"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import styles from "./SuccessStories.module.css";

type Story = {
  brand: string;
  logo: string;
  person: string;
  role: string;
  quote: string;
  image: string;
  imageAlt: string;
  imageFit?: "contain";
  tagline: string;
  highlights: [string, string, string];
  stats?: { value: string; label: string }[];
};

const stories: Story[] = [
  {
    brand: "Jiggy Jerky",
    logo: "/jiggy-jerky-wordmark.svg",
    person: "Mark Vicary",
    role: "Founder, Jiggy Jerky",
    quote: "Retailo gives us one place to manage our products, orders, customers, and day-to-day store operations. It brings everything together in one simple, connected platform, making it easier to stay organized, keep orders moving, and run our growing brand with confidence.",
    image: "/success-story-jiggy-jerky.png",
    imageAlt: "Two business owners at a jerky market stall",
    tagline: "Great Flavors. Better Business Performance.",
    highlights: ["Products", "Orders", "Operations"],
    stats: [
      { value: "10K+", label: "Orders Managed" },
      { value: "98%", label: "Inventory Accuracy" },
      { value: "24/7", label: "Store Operations" },
    ],
  },
  {
    brand: "Racknificent",
    logo: "/racknificent-logo.svg",
    person: "Marcus Vance",
    role: "Head of Logistics, Racknificent",
    quote: "Orders and inventory stay in sync every day.",
    image: "/testimonial-daniel.png",
    imageAlt: "Retail business team member",
    tagline: "Orders and inventory, working together.",
    highlights: ["Orders", "Inventory", "One View"],
  },
  {
    brand: "Elevate",
    logo: "/elevate-logo.svg",
    person: "Emma Richardson",
    role: "Co-Founder, Elevate",
    quote: "Finally, we have complete visibility.",
    image: "/testimonial-emma.png",
    imageAlt: "Emma Richardson",
    tagline: "A clearer view of every store.",
    highlights: ["Visibility", "Stores", "Growth"],
  },
  {
    brand: "Keisha Sharay",
    logo: "/keisha-sharay-logo.svg",
    person: "Keisha Sharay",
    role: "Creative Director, Keisha Sharay",
    quote: "We finally run the storefront from one place.",
    image: "/testimonial-sarah.png",
    imageAlt: "Fashion business owner",
    tagline: "One place for the storefront.",
    highlights: ["Storefront", "Products", "Orders"],
  },
  {
    brand: "She's Laser & Esthetics",
    logo: "/shes-laser-esthetics-logo.svg",
    person: "Sarah Mitchell",
    role: "Founder, She's Laser & Esthetics",
    quote: "Everything we need to run our store, in one place.",
    image: "/testimonial-sarah.png",
    imageAlt: "Sarah Mitchell",
    tagline: "Everything together in one place.",
    highlights: ["Store", "Customers", "Orders"],
  },
  {
    brand: "Parable Skate Co.",
    logo: "/parable-logo.svg",
    person: "James Wilson",
    role: "Director, Parable Skate Co.",
    quote: "Built for the way our business actually works.",
    image: "/testimonial-james.png",
    imageAlt: "James Wilson",
    tagline: "Built around the way you work.",
    highlights: ["Products", "Orders", "Operations"],
  },
];

const dashboardPreviews = [
  "/retailo-orders-dashboard.png",
  "/retailo-delivery-dashboard.png",
  "/retailo-customers-dashboard.png",
  "/retailo-website-dashboard.png",
  "/retailo-products-dashboard.png",
  "/retailo-payments-dashboard.png",
] as const;

// Each brand has a story card and a platform preview card. Additional brand
// supplied cards can be added to its group without changing the carousel logic.
const cardsByBrand: Story[][] = stories.map((story, index) => [
  story,
  {
    ...story,
    quote: index === 0
      ? "It brings everything together in one simple, connected platform, making it easier to stay organized, keep orders moving, and run our growing brand with confidence."
      : story.quote,
    image: dashboardPreviews[index],
    imageAlt: "Retailo dashboard preview",
    imageFit: "contain",
    stats: undefined,
  },
]);

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg className={direction === "left" ? styles.arrowLeft : ""} viewBox="0 0 48 16" fill="none" aria-hidden="true">
      <path d="M1 8h44m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StoryCard({ story, onOpen, preview = false }: { story: Story; onOpen?: () => void; preview?: boolean }) {
  return (
    <article className={styles.card} data-story-card aria-hidden={preview ? true : undefined}>
      <div className={styles.cardCopy}>
        <Image src={story.logo} alt="" width={148} height={50} className={styles.cardLogo} />
        <p className={styles.cardQuote}>{story.quote}</p>
        <div className={styles.cardBottom}>
          <div>
            <strong>{story.person}</strong>
            <span>{story.role}</span>
          </div>
          {preview ? (
            <span className={styles.caseButton}>View Case Study <Arrow /></span>
          ) : (
            <button type="button" className={styles.caseButton} onClick={onOpen}>
              View Case Study <Arrow />
            </button>
          )}
        </div>
      </div>
      <div className={styles.mediaPanel}>
        <div className={styles.mediaTop}>
          <div className={styles.mediaTagline}>
            <Image
              src={story.brand === "Jiggy Jerky" ? "/jiggy-jerky.svg" : story.logo}
              alt=""
              width={112}
              height={45}
              className={styles.mediaLogo}
            />
            <p>{story.tagline}</p>
          </div>
          <div className={styles.mediaImage}>
            <Image
              src={story.image}
              alt={preview ? "" : story.imageAlt}
              fill
              sizes="(max-width: 700px) 45vw, 240px"
              className={story.imageFit === "contain" ? styles.dashboardImage : undefined}
            />
          </div>
        </div>
        <div className={`${styles.mediaStats} ${story.stats ? "" : styles.mediaHighlights}`}>
          {story.stats
            ? story.stats.map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))
            : story.highlights.map((highlight) => (
              <div key={highlight}><strong>{highlight}</strong><span>With Retailo</span></div>
            ))}
        </div>
      </div>
    </article>
  );
}

export function SuccessStories() {
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const brandAnimationRef = useRef<Animation | null>(null);
  const brandChangeIdRef = useRef(0);
  const brandTransitioningRef = useRef(false);
  const animatingRef = useRef(false);
  const pendingDirectionRef = useRef<-1 | 1 | null>(null);
  const currentBrand = stories[activeBrandIndex];
  const brandCards = cardsByBrand[activeBrandIndex];
  const current = brandCards[activeCardIndex];

  useEffect(() => () => {
    animationRef.current?.cancel();
    brandAnimationRef.current?.cancel();
  }, []);

  function selectBrand(index: number) {
    const nextIndex = (index + stories.length) % stories.length;
    if (nextIndex === activeBrandIndex && activeCardIndex === 0 && !brandTransitioningRef.current && !animatingRef.current) return;
    const track = trackRef.current;
    if (!track || typeof track.animate !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      brandChangeIdRef.current += 1;
      brandAnimationRef.current?.cancel();
      brandAnimationRef.current = null;
      brandTransitioningRef.current = false;
      if (track) track.style.opacity = "";
      animationRef.current?.cancel();
      if (track) track.style.transform = "";
      animationRef.current = null;
      animatingRef.current = false;
      pendingDirectionRef.current = null;
      setActiveBrandIndex(nextIndex);
      setActiveCardIndex(0);
      return;
    }

    const changeId = ++brandChangeIdRef.current;
    const startingOpacity = getComputedStyle(track).opacity;
    brandAnimationRef.current?.cancel();
    track.style.opacity = startingOpacity;
    if (animationRef.current) track.style.transform = getComputedStyle(track).transform;
    animationRef.current?.cancel();
    animationRef.current = null;
    animatingRef.current = false;
    pendingDirectionRef.current = null;
    brandTransitioningRef.current = true;

    const fadeOut = track.animate(
      [{ opacity: startingOpacity }, { opacity: 0 }],
      { duration: 220, easing: "ease-in-out", fill: "forwards" },
    );
    brandAnimationRef.current = fadeOut;
    void fadeOut.finished.then(() => {
      if (changeId !== brandChangeIdRef.current) return;
      track.style.opacity = "0";
      track.style.transform = "";
      fadeOut.cancel();
      flushSync(() => {
        setActiveBrandIndex(nextIndex);
        setActiveCardIndex(0);
      });
      const fadeIn = track.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 340, easing: "ease-in-out", fill: "forwards" },
      );
      brandAnimationRef.current = fadeIn;
      void fadeIn.finished.then(() => {
        if (changeId !== brandChangeIdRef.current) return;
        track.style.opacity = "";
        fadeIn.cancel();
        brandAnimationRef.current = null;
        brandTransitioningRef.current = false;
        const queued = pendingDirectionRef.current;
        pendingDirectionRef.current = null;
        if (queued) window.requestAnimationFrame(() => moveCard(queued));
      }).catch(() => {});
    }).catch(() => {});
  }

  function moveCard(direction: -1 | 1) {
    if (animatingRef.current || brandTransitioningRef.current) {
      pendingDirectionRef.current = direction;
      return;
    }
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>("[data-story-card]");
    if (!track || !cards || cards.length < 4) return;
    const step = cards[3].offsetLeft - cards[2].offsetLeft;
    if (!step || typeof track.animate !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveCardIndex((index) => (index + direction + brandCards.length) % brandCards.length);
      return;
    }

    animatingRef.current = true;
    const target = direction === 1
      ? `translateX(calc(-50% - ${step}px))`
      : `translateX(calc(-50% + ${step}px))`;
    const animation = track.animate(
      [{ transform: "translateX(-50%)" }, { transform: target }],
      { duration: 500, easing: "cubic-bezier(0.45, 0, 0.55, 1)", fill: "forwards" },
    );
    animationRef.current = animation;
    void animation.finished.then(() => {
      flushSync(() => {
        setActiveCardIndex((index) => (index + direction + brandCards.length) % brandCards.length);
      });
      animation.cancel();
      animationRef.current = null;
      animatingRef.current = false;
      const queued = pendingDirectionRef.current;
      pendingDirectionRef.current = null;
      if (queued) window.requestAnimationFrame(() => moveCard(queued));
    }).catch(() => {
      animatingRef.current = false;
    });
  }

  function openCaseStudy() {
    dialogRef.current?.showModal();
  }

  return (
    <section id="success-stories" aria-labelledby="success-stories-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Built to help you grow</p>
            <h2 id="success-stories-heading">Trusted by Businesses<br />Growing with Retailo</h2>
          </div>
          <div className={styles.introRight}>
            <p>From independent shops to growing brands, businesses use our platform to manage their entire store, simplify operations, and deliver a better customer experience.</p>
            <button type="button" className={styles.allButton} aria-expanded={showAll} onClick={() => setShowAll((value) => !value)}>
              {showAll ? "Hide Success Stories" : "View All Success Stories"} <ArrowIcon />
            </button>
          </div>
        </div>
        <div className={styles.brandNav} role="group" aria-label="Choose a business story">
          {stories.map((story, index) => (
            <button
              key={story.brand}
              type="button"
              className={`${styles.brandButton} ${index === activeBrandIndex ? styles.selected : ""}`}
              aria-label={`Show ${story.brand} cards`}
              aria-pressed={index === activeBrandIndex}
              onClick={() => selectBrand(index)}
            >
              <Image src={story.logo} alt="" width={150} height={55} className={styles.brandLogo} />
            </button>
          ))}
        </div>
      </div>

      <div ref={carouselRef} id="success-story-cards" className={styles.carousel}>
        <div ref={trackRef} className={styles.carouselTrack}>
          {([-2, -1, 0, 1, 2] as const).map((offset) => (
            <StoryCard
              key={offset}
              story={brandCards[(activeCardIndex + offset + brandCards.length * 2) % brandCards.length]}
              preview={offset !== 0}
              onOpen={offset === 0 ? openCaseStudy : undefined}
            />
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" aria-label={`Previous ${currentBrand.brand} card`} onClick={() => moveCard(-1)}><Arrow direction="left" /></button>
        <span className={styles.srOnly} aria-live="polite">{currentBrand.brand}, card {activeCardIndex + 1} of {brandCards.length}</span>
        <button type="button" aria-label={`Next ${currentBrand.brand} card`} onClick={() => moveCard(1)}><Arrow /></button>
      </div>

      {showAll && (
        <div className={styles.allStories}>
          {cardsByBrand.flatMap((cards, brandIndex) => cards.map((card, cardIndex) => (
            <button
              type="button"
              key={`${card.brand}-${cardIndex}`}
              onClick={() => {
                setActiveBrandIndex(brandIndex);
                setActiveCardIndex(cardIndex);
                carouselRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <Image src={card.logo} alt="" width={120} height={42} />
              <span>{card.quote}</span>
              <strong>View card {cardIndex + 1} <Arrow /></strong>
            </button>
          )))}
        </div>
      )}

      <dialog ref={dialogRef} className={styles.dialog} aria-label={`${current.brand} case study`}>
        <button type="button" className={styles.dialogClose} aria-label="Close case study" onClick={() => dialogRef.current?.close()}>×</button>
        <Image src={current.logo} alt={current.brand} width={170} height={60} className={styles.dialogLogo} />
        <h3>{current.tagline}</h3>
        <p>{current.quote}</p>
        <strong>{current.person}</strong>
        <span>{current.role}</span>
        {current.stats && (
          <div className={styles.dialogStats}>
            {current.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        )}
      </dialog>
    </section>
  );
}
