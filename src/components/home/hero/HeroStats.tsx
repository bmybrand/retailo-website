import Image from "next/image";
import { CountUp } from "@/components/home/hero/CountUp";
import { HeroReveal } from "@/components/home/hero/HeroStage";

const stats = [
  { to: 10, suffix: "K+", label: "Orders Managed" },
  { to: 98, suffix: "%", label: "Inventory Accuracy" },
  { to: 24, suffix: "/7", label: "Store Operations" },
];

export function HeroStats() {
  return (
    <div className="mx-auto mt-10 w-full sm:mt-14 lg:mt-16">
      <HeroReveal delay={980}>
        <Image
          src="/jiggy-jerky.svg"
          alt="Jiggy Jerky"
          width={249}
          height={38}
          className="mx-auto block h-7 w-auto sm:h-8 lg:h-9 xl:h-10"
        />
      </HeroReveal>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-zinc-200">
        {stats.map((stat, index) => {
          const delay = 1140 + index * 180;
          return (
            <HeroReveal key={stat.label} delay={delay}>
              <div className="px-2 text-center sm:px-4">
                <p className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums sm:text-4xl lg:text-5xl xl:text-6xl">
                  <CountUp to={stat.to} suffix={stat.suffix} delay={delay} />
                </p>
                <p className="mt-1 font-inter text-xs text-zinc-500 sm:text-sm lg:text-base">
                  {stat.label}
                </p>
              </div>
            </HeroReveal>
          );
        })}
      </div>
    </div>
  );
}
