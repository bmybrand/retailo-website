import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const metadata: Metadata = { title: "Retailo Platform", description: "Connect every part of your retail operation in one platform." };

export default function PlatformPage() {
  return <MarketingPage page="platform" />;
}
