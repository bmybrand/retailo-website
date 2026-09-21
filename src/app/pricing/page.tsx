import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const metadata: Metadata = { title: "Retailo Pricing", description: "Flexible Retailo plans designed to grow with your business." };

export default function PricingPage() {
  return <MarketingPage page="pricing" />;
}
