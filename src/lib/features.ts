export type FeatureId =
  | "products"
  | "orders"
  | "customers"
  | "website"
  | "payments"
  | "delivery";

export type Feature = {
  id: FeatureId;
  label: string;
  title: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  image: { src: string; width: number; height: number };
  icon: { inactive: string; active: string };
  sectionTitle: string;
  sectionDescription: string;
  details: { title: string; description: string }[];
};

export const features: Feature[] = [
  {
    id: "products",
    label: "Products",
    title: "Manage Your Catalog With Confidence",
    titleLead: "Manage Your Catalog",
    titleAccent: "With Confidence",
    body: "Add, organize, update, and manage everything you sell from one centralized product workspace, giving you complete control over your entire catalog, including product information, pricing, inventory, variations, images, and other essential details.",
    image: { src: "/retailo-products-dashboard.png", width: 1680, height: 970 },
    icon: { inactive: "/feature-products-icon.svg", active: "/feature-products-icon-active.svg" },
    sectionTitle: "A clearer view of everything you sell",
    sectionDescription: "Keep the details your team works with every day together in one product workspace.",
    details: [
      { title: "One organized catalog", description: "Find product information, images, and variations in the same place." },
      { title: "Pricing in context", description: "Review prices alongside the products they belong to as your catalog changes." },
      { title: "Inventory you can follow", description: "Keep stock details visible while you add and update items." },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    title: "Keep Every Order Moving",
    titleLead: "Keep Every Order",
    titleAccent: "Moving",
    body: "Track, fulfill, and update orders from one workspace so your team always knows what to pick, pack, and send next without jumping between tools.",
    image: { src: "/retailo-orders-dashboard.png", width: 1672, height: 941 },
    icon: { inactive: "/feature-orders-icon-inactive.svg", active: "/feature-orders-icon-active.svg" },
    sectionTitle: "From new order to completed handoff",
    sectionDescription: "Give your team a shared view of orders and the work still ahead.",
    details: [
      { title: "See what needs action", description: "Bring open orders and their current status into one clear view." },
      { title: "Keep fulfillment on track", description: "Follow an order as it moves through picking, packing, and sending." },
      { title: "Update with confidence", description: "Work from the same order record so everyone sees the latest progress." },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    title: "Know Your Customers In One Place",
    titleLead: "Know Your Customers",
    titleAccent: "In One Place",
    body: "See purchase history, contact details, and store activity together so you can serve regulars faster and follow up before they have to ask.",
    image: { src: "/retailo-customers-dashboard.png", width: 1672, height: 941 },
    icon: { inactive: "/feature-customers-icon.svg", active: "/feature-customers-icon-active.svg" },
    sectionTitle: "Better context for every conversation",
    sectionDescription: "Keep customer information close to the store activity that gives it meaning.",
    details: [
      { title: "A useful customer view", description: "Find contact details and store activity together when you need them." },
      { title: "Purchase history at hand", description: "See what someone has bought before without searching across tools." },
      { title: "More personal follow-up", description: "Use the context you already have to make the next interaction easier." },
    ],
  },
  {
    id: "website",
    label: "Website",
    title: "Your Storefront, Connected",
    titleLead: "Your Storefront,",
    titleAccent: "Connected",
    body: "Manage the online store alongside in-store operations so products, orders, and content stay in sync across every channel.",
    image: { src: "/retailo-website-dashboard.png", width: 1672, height: 896 },
    icon: { inactive: "/feature-website-icon.svg", active: "/feature-website-icon-active.svg" },
    sectionTitle: "Your online store in the same workflow",
    sectionDescription: "Make storefront updates with a view of the rest of your business.",
    details: [
      { title: "Keep the storefront current", description: "Work on website content from the same platform as your daily operations." },
      { title: "Products stay connected", description: "Manage the items customers see online alongside your product catalog." },
      { title: "Orders in one place", description: "Follow online activity without losing the wider order picture." },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    title: "Payments That Keep Pace",
    titleLead: "Payments That",
    titleAccent: "Keep Pace",
    body: "Take payments, track what's settled, and keep the books clean without a separate system for every till and checkout.",
    image: { src: "/retailo-payments-dashboard.png", width: 1672, height: 1015 },
    icon: { inactive: "/feature-payments-icon.svg", active: "/feature-payments-icon-active.svg" },
    sectionTitle: "Know where every payment stands",
    sectionDescription: "A clearer view of transactions helps the day run with fewer loose ends.",
    details: [
      { title: "See payment activity", description: "Review transactions and payment status in a single workspace." },
      { title: "Follow what has settled", description: "Keep paid and pending amounts easier to distinguish." },
      { title: "Keep records connected", description: "Look at payments alongside the orders and store work behind them." },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    title: "From Counter To Door",
    titleLead: "From Counter",
    titleAccent: "To Door",
    body: "Coordinate delivery and fulfillment with the same order record your team already uses, from dispatch through drop-off.",
    image: { src: "/retailo-delivery-dashboard.png", width: 1672, height: 896 },
    icon: { inactive: "/feature-delivery-icon.svg", active: "/feature-delivery-icon-active.svg" },
    sectionTitle: "Delivery that fits your store",
    sectionDescription: "Keep delivery setup and fulfillment close to the orders they serve.",
    details: [
      { title: "Set up your options", description: "Keep delivery methods and the areas you serve easy to review." },
      { title: "See the full journey", description: "Follow the order from the store through dispatch and drop-off." },
      { title: "Work from one record", description: "Give the team one place to check the order and its delivery progress." },
    ],
  },
];

export function getFeature(id: string) {
  return features.find((feature) => feature.id === id);
}
