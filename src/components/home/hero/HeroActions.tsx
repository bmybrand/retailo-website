import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import { HeroReveal } from "@/components/home/hero/HeroStage";

export function HeroActions() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row lg:mt-10">
      <HeroReveal delay={160} className="w-full sm:w-auto">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 font-sans text-sm font-medium text-white transition hover:bg-[#084538] sm:px-6 sm:py-3 sm:text-base lg:px-7 lg:py-3.5 lg:text-lg"
        >
          Get Started
          <ArrowIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
        </button>
      </HeroReveal>
      <HeroReveal delay={320} className="w-full sm:w-auto">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand bg-transparent px-5 py-2.5 font-sans text-sm font-medium text-brand transition hover:bg-brand/5 sm:px-6 sm:py-3 sm:text-base lg:px-7 lg:py-3.5 lg:text-lg"
        >
          Explore Platform
          <ArrowIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
        </button>
      </HeroReveal>
    </div>
  );
}
