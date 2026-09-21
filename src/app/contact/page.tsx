import type { Metadata } from "next";
import { ContactPage } from "@/components/marketing/CompanyPage";

export const metadata: Metadata = { title: "Contact Retailo", description: "Start with Retailo, access your account, or explore product resources." };

export default function Page() { return <ContactPage />; }
