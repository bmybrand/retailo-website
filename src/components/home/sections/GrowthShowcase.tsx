import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function GrowthShowcase() {
  return (
    <section id="pricing" className="scroll-mt-20 px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-brand-dark px-6 py-14 text-white sm:px-10 lg:px-16">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ImagePlaceholder
              key={index}
              label={`Device ${index + 1}`}
              className="h-40 rounded-2xl bg-white/10 text-white/50 sm:h-48"
            />
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built To Support Your Business
            <br />
            As It Grows And Evolves
          </h2>
          <Button variant="lime" className="mt-8 px-7 py-3">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
