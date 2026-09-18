import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FeatureSelectionProvider } from "@/components/home/FeatureSelectionProvider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retailo — Everything Your Store Needs",
  description:
    "Manage your products, orders, customers, delivery, inventory, and store operations from one powerful ecommerce platform.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col font-sans">
        <SmoothScroll />
        <FeatureSelectionProvider>{children}</FeatureSelectionProvider>
      </body>
    </html>
  );
}
