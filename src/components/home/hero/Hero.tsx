import { HeroActions } from "@/components/home/hero/HeroActions";
import { HeroProof } from "@/components/home/hero/HeroProof";
import { HeroReveal, HeroStage } from "@/components/home/hero/HeroStage";
import { HeroStats } from "@/components/home/hero/HeroStats";

export function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100svh-72px)] scroll-mt-20 flex-col items-center justify-center px-4 py-10 sm:px-8 sm:py-12 lg:px-0"
    >
      <div className="mx-auto w-full text-center lg:w-[80%]">
        <HeroStage>
          <HeroReveal delay={0}>
            <p className="mx-auto mt-4 w-[92%] font-inter text-xs leading-5 text-zinc-500 sm:mt-5 sm:w-[88%] sm:text-sm sm:leading-6 md:text-base md:leading-7 lg:w-[80%] lg:text-lg lg:leading-8 xl:text-xl">
              Manage your products, orders, customers, payments, delivery, inventory,
              and store{" "}
              <br className="hidden lg:inline" />
              operations from one powerful ecommerce platform.
            </p>
          </HeroReveal>
          <HeroActions />
          <HeroProof />
          <HeroStats />
        </HeroStage>
      </div>
    </section>
  );
}
