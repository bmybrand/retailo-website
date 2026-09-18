import { Section } from "@/components/ui/Section";

const cards = [
  {
    title: "Point of Sale",
    description: "Fast checkout that works the way your counter actually runs.",
  },
  {
    title: "Smart Inventory",
    description: "Live stock counts, low-stock alerts, and cleaner reordering.",
  },
  {
    title: "Staff Management",
    description: "Shifts, permissions, and performance without extra tools.",
  },
  {
    title: "Customer Loyalty",
    description: "Keep regulars coming back with history and rewards in one view.",
  },
  {
    title: "Sales Analytics",
    description: "Daily numbers that tell you what to stock and what to drop.",
  },
  {
    title: "Multi-Store",
    description: "One login to run every location as the business grows.",
  },
];

export function FeatureGrid() {
  return (
    <Section id="solutions">
      <div className="max-w-xl">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          And That&apos;s Just The Start
        </h2>
        <p className="mt-3 text-base text-zinc-500">
          Everything a modern store needs, without stitching five apps together.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-100"
          >
            <div className="mb-5 h-28 rounded-2xl bg-zinc-100" />
            <h3 className="text-lg font-semibold text-zinc-900">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-500">{card.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
