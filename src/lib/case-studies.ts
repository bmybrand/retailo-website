export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  brand: string;
  logo: string;
  person: string;
  role: string;
  quote: string;
  image: string;
  imageAlt: string;
  tagline: string;
  summary: string;
  highlights: [string, string, string];
  stats: [CaseStudyStat, CaseStudyStat, CaseStudyStat];
  challenge: string;
  solution: string;
  result: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "jiggy-jerky",
    brand: "Jiggy Jerky",
    logo: "/jiggy-jerky-wordmark.svg",
    person: "Mark Vicary",
    role: "Founder, Jiggy Jerky",
    quote: "Retailo gives us one place to manage our products, orders, customers, and day-to-day store operations. It brings everything together in one simple, connected platform, making it easier to stay organized, keep orders moving, and run our growing brand with confidence.",
    image: "/success-story-jiggy-jerky.png",
    imageAlt: "Jiggy Jerky business owners at their market stall",
    tagline: "Great Flavors. Better Business Performance.",
    summary: "Jiggy Jerky brought products, orders, inventory, and daily operations into one connected workspace built to keep pace with a growing food brand.",
    highlights: ["Products", "Orders", "Operations"],
    stats: [
      { value: "10K+", label: "Orders Managed" },
      { value: "98%", label: "Inventory Accuracy" },
      { value: "24/7", label: "Store Operations" },
    ],
    challenge: "As the product range and order volume grew, the team needed a clearer way to keep inventory, incoming orders, and everyday store work aligned.",
    solution: "Retailo gave the team one dashboard for catalog updates, order progress, customer records, and the operational details behind every sale.",
    result: "The team can now see what needs attention, keep stock accurate, and move every order forward without switching between disconnected tools.",
  },
  {
    slug: "racknificent",
    brand: "Racknificent",
    logo: "/racknificent-logo.svg",
    person: "Marcus Vance",
    role: "Head of Logistics, Racknificent",
    quote: "Orders and inventory stay in sync every day.",
    image: "/testimonial-daniel.png",
    imageAlt: "Racknificent retail team member",
    tagline: "Orders and inventory, working together.",
    summary: "Racknificent connected order activity with inventory so its team could work from the same reliable view throughout the day.",
    highlights: ["Orders", "Inventory", "One View"],
    stats: [
      { value: "1", label: "Connected Workspace" },
      { value: "Live", label: "Inventory View" },
      { value: "24/7", label: "Order Visibility" },
    ],
    challenge: "Separate order and inventory records made it harder for the team to know what was available and what needed to ship next.",
    solution: "Retailo connected product availability, order status, and customer details inside one simple operating view.",
    result: "The team spends less time reconciling information and more time keeping orders accurate and moving on schedule.",
  },
  {
    slug: "elevate",
    brand: "Elevate",
    logo: "/elevate-logo.svg",
    person: "Emma Richardson",
    role: "Co-Founder, Elevate",
    quote: "Finally, we have complete visibility.",
    image: "/testimonial-emma.png",
    imageAlt: "Emma Richardson of Elevate",
    tagline: "A clearer view of every store.",
    summary: "Elevate created one clear view across stores, products, customers, and performance as the business expanded.",
    highlights: ["Visibility", "Stores", "Growth"],
    stats: [
      { value: "100%", label: "Shared Visibility" },
      { value: "1", label: "Central Dashboard" },
      { value: "Every", label: "Store Connected" },
    ],
    challenge: "Growth made it difficult to maintain a consistent view of products and activity across every location.",
    solution: "Retailo centralized store information and surfaced the work that needed attention in one dashboard.",
    result: "Elevate can make faster decisions with a consistent view of inventory, customers, orders, and store performance.",
  },
  {
    slug: "keisha-sharay",
    brand: "Keisha Sharay",
    logo: "/keisha-sharay-logo.svg",
    person: "Keisha Sharay",
    role: "Creative Director, Keisha Sharay",
    quote: "We finally run the storefront from one place.",
    image: "/testimonial-sarah.png",
    imageAlt: "Fashion business owner",
    tagline: "One place for the storefront.",
    summary: "Keisha Sharay brought the online storefront, product collection, and customer orders into one manageable workflow.",
    highlights: ["Storefront", "Products", "Orders"],
    stats: [
      { value: "1", label: "Unified Storefront" },
      { value: "Live", label: "Product Updates" },
      { value: "Fast", label: "Order Workflow" },
    ],
    challenge: "Keeping a growing collection current while managing customer orders took time away from the brand and its customers.",
    solution: "Retailo connected product management with the storefront and the order workflow behind every purchase.",
    result: "New products are easier to publish, orders are easier to follow, and the storefront stays aligned with daily operations.",
  },
  {
    slug: "sheys-laser-esthetics",
    brand: "She's Laser & Esthetics",
    logo: "/shes-laser-esthetics-logo.svg",
    person: "Sarah Mitchell",
    role: "Founder, She's Laser & Esthetics",
    quote: "Everything we need to run our store, in one place.",
    image: "/testimonial-sarah.png",
    imageAlt: "Sarah Mitchell of She's Laser & Esthetics",
    tagline: "Everything together in one place.",
    summary: "She's Laser & Esthetics simplified daily work by keeping products, customers, orders, and staff in one connected system.",
    highlights: ["Store", "Customers", "Orders"],
    stats: [
      { value: "1", label: "Store Workspace" },
      { value: "360°", label: "Customer View" },
      { value: "Daily", label: "Operations" },
    ],
    challenge: "Customer and store information lived across too many places, making everyday tasks slower than they needed to be.",
    solution: "Retailo gave the team a shared place to manage customer history, products, orders, and store responsibilities.",
    result: "The business now has a simpler routine and a clearer view of what every customer and order needs next.",
  },
  {
    slug: "parable-skate-co",
    brand: "Parable Skate Co.",
    logo: "/parable-logo.svg",
    person: "James Wilson",
    role: "Director, Parable Skate Co.",
    quote: "Built for the way our business actually works.",
    image: "/testimonial-james.png",
    imageAlt: "James Wilson of Parable Skate Co.",
    tagline: "Built around the way you work.",
    summary: "Parable Skate Co. shaped a connected retail workflow around its catalog, customers, and the way its team fulfills orders.",
    highlights: ["Products", "Orders", "Operations"],
    stats: [
      { value: "1", label: "Product Catalog" },
      { value: "Live", label: "Order Status" },
      { value: "One", label: "Team Workflow" },
    ],
    challenge: "The team needed retail software that supported its real workflow instead of adding more steps to it.",
    solution: "Retailo brought product, order, and customer work together in a flexible dashboard the whole team could follow.",
    result: "Parable can keep the catalog accurate, move orders forward, and give the team a consistent way to work.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
