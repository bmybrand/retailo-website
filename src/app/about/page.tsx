import type { Metadata } from "next";
import { AboutPage } from "@/components/marketing/CompanyPage";

export const metadata: Metadata = { title: "About Retailo", description: "Learn why Retailo brings modern retail operations into one connected platform." };

export default function Page() { return <AboutPage />; }
