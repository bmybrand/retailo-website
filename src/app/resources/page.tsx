import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const metadata: Metadata = { title: "Retailo Resources", description: "Guides, customer stories, and ideas for better retail operations." };

export default function ResourcesPage() {
  return <MarketingPage page="resources" />;
}
