"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import styles from "./FeatureStoryPanel.module.css";
import { useFeatureZoomNavigation } from "./useFeatureZoomNavigation";
import { useFeatureSelection } from "@/components/home/FeatureSelectionProvider";

type TabId = "products" | "orders" | "customers" | "website" | "payments" | "delivery";

const tabs: {
  id: TabId;
  label: string;
  title: string;
  body: string;
  image: { src: string; width: number; height: number };
}[] = [
  {
    id: "products",
    label: "Products",
    title: "Manage Your Catalog With Confidence",
    body: "Add, organize, update, and manage everything you sell from one centralized product workspace, giving you complete control over your entire catalog, including product information, pricing, inventory, variations, images, and other essential details.",
    image: { src: "/retailo-products-dashboard.png", width: 1680, height: 970 },
  },
  {
    id: "orders",
    label: "Orders",
    title: "Keep Every Order Moving",
    body: "Track, fulfill, and update orders from one workspace so your team always knows what to pick, pack, and send next—without jumping between tools.",
    image: { src: "/retailo-orders-dashboard.png", width: 1672, height: 941 },
  },
  {
    id: "customers",
    label: "Customers",
    title: "Know Your Customers In One Place",
    body: "See purchase history, contact details, and store activity together so you can serve regulars faster and follow up before they have to ask.",
    image: { src: "/retailo-customers-dashboard.png", width: 1672, height: 941 },
  },
  {
    id: "website",
    label: "Website",
    title: "Your Storefront, Connected",
    body: "Manage the online store alongside in-store operations so products, orders, and content stay in sync across every channel.",
    image: { src: "/retailo-website-dashboard.png", width: 1672, height: 896 },
  },
  {
    id: "payments",
    label: "Payments",
    title: "Payments That Keep Pace",
    body: "Take payments, track what’s settled, and keep the books clean without a separate system for every till and checkout.",
    image: { src: "/retailo-payments-dashboard.png", width: 1672, height: 1015 },
  },
  {
    id: "delivery",
    label: "Delivery",
    title: "From Counter To Door",
    body: "Coordinate delivery and fulfillment with the same order record your team already uses, from dispatch through drop-off.",
    image: { src: "/retailo-delivery-dashboard.png", width: 1672, height: 896 },
  },
];

const tabIcons: Record<TabId, { inactive: string; active: string }> = {
  products: { inactive: "/feature-products-icon.svg", active: "/feature-products-icon-active.svg" },
  orders: { inactive: "/feature-orders-icon-inactive.svg", active: "/feature-orders-icon-active.svg" },
  customers: { inactive: "/feature-customers-icon.svg", active: "/feature-customers-icon-active.svg" },
  website: { inactive: "/feature-website-icon.svg", active: "/feature-website-icon-active.svg" },
  payments: { inactive: "/feature-payments-icon.svg", active: "/feature-payments-icon-active.svg" },
  delivery: { inactive: "/feature-delivery-icon.svg", active: "/feature-delivery-icon-active.svg" },
};

function TabIcon({ id, active, hovered }: { id: TabId; active: boolean; hovered: boolean }) {
  return (
    <Image
      src={active ? tabIcons[id].active : tabIcons[id].inactive}
      alt=""
      aria-hidden="true"
      width={28}
      height={28}
      style={{
        width: 28,
        height: 28,
        objectFit: "contain",
        filter: active ? "none" : "brightness(0)",
        opacity: active ? 1 : hovered ? 0.7 : 0.45,
        transition: "opacity 180ms ease",
      }}
    />
  );
}

function FeatureCopy({
  title,
  body,
  href,
  onLearnMore,
}: {
  title: string;
  body: string;
  href: string;
  onLearnMore: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div className="max-w-md">
      <h3 className="font-sans text-[28px] font-bold leading-tight tracking-tight text-zinc-900 sm:text-[34px] lg:text-[40px]">
        {title}
      </h3>
      <p className="mt-4 font-inter text-sm leading-7 text-zinc-500 sm:text-[15px] sm:leading-7">
        {body}
      </p>
      <Link
        href={href}
        onClick={onLearnMore}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#084538]"
      >
        Learn More
        <ArrowIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function FeatureStories() {
  const { active, setActive } = useFeatureSelection();
  const [hovered, setHovered] = useState<TabId | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const dashboardImageRef = useRef<HTMLImageElement>(null);
  const zoomNavigate = useFeatureZoomNavigation();
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  function handleLearnMore(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void zoomNavigate(`/features/${current.id}`, dashboardRef.current, dashboardImageRef.current);
  }

  return (
    <section id="platform" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-[92%] lg:w-[80%]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="font-inter text-[20px] font-semibold tracking-[0.14em] text-brand uppercase">
              Your Store, All In One
            </p>
            <h2 className="mt-3 max-w-xl font-sans text-[32px] font-bold leading-[1.12] tracking-tight text-zinc-900 sm:text-[42px] lg:text-[52px]">
              From Products To
              <br />
              Delivery, All In One
            </h2>
          </div>
          <p className="max-w-xl font-inter text-sm leading-7 text-zinc-500 sm:text-base lg:justify-self-end lg:text-right lg:text-[17px] lg:leading-8">
            Manage your entire commerce operation from one powerful, connected
            platform—bringing products, orders, customers, payments, delivery, &
            your online storefront together in one seamless experience.
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-3 gap-y-8 sm:grid-cols-6 sm:gap-2">
            {tabs.map((tab) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  onMouseEnter={() => setHovered(tab.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(tab.id)}
                  onBlur={() => setHovered(null)}
                  aria-pressed={selected}
                  className="group flex flex-col items-center gap-2"
                >
                  <span
                    className="flex shrink-0 items-center justify-center"
                    style={{
                      width: "min(72px, 28vw)",
                      height: "min(56px, 22vw)",
                      border: `2px solid ${selected ? "#cfe3de" : "#d6d7d6"}`,
                      borderRadius: "9px 20px 9px 9px",
                      backgroundColor: "transparent",
                    }}
                  >
                    <TabIcon id={tab.id} active={selected} hovered={hovered === tab.id} />
                  </span>
                  <span
                    className={`font-inter text-[13px] sm:text-sm ${
                      selected ? "font-medium text-brand" : "text-zinc-400"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`h-[2px] w-[72%] rounded-full transition ${
                      selected ? "bg-brand" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${styles.panel} mt-8 flex items-center overflow-hidden rounded-[28px] bg-[#f4f4f1] sm:mt-10 lg:rounded-[36px]`}>
          <div className="grid w-full items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-10 lg:px-12 lg:py-16">
            <FeatureCopy title={current.title} body={current.body} href={`/features/${current.id}`} onLearnMore={handleLearnMore} />
            <div ref={dashboardRef} className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(20,36,28,0.1)] ring-1 ring-black/5">
              <Image
                ref={dashboardImageRef}
                key={current.id}
                src={current.image.src}
                alt={`Retailo ${current.label.toLowerCase()} dashboard`}
                width={current.image.width}
                height={current.image.height}
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="h-auto w-full object-cover object-left-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
