import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const metadata: Metadata = { title: "Retailo Features", description: "Explore Retailo tools for products, orders, customers, websites, payments, and delivery." };

export default function FeaturesPage() {
  return <MarketingPage page="features" />;
}
