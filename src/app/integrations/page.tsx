import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const metadata: Metadata = { title: "Retailo Integrations", description: "Connect your commerce channels and operational workflows with Retailo." };

export default function IntegrationsPage() {
  return <MarketingPage page="integrations" />;
}
