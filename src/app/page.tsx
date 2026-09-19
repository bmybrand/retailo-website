import { Footer } from "@/components/home/sections/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/home/hero";
import { DashboardPreview } from "@/components/home/sections/DashboardPreview";
import { FeatureGrid } from "@/components/home/sections/FeatureGrid";
import { FeatureStories } from "@/components/home/sections/FeatureStories";
import { GrowthShowcase } from "@/components/home/sections/GrowthShowcase";
import { SuccessStories } from "@/components/home/sections/SuccessStories";
import { Testimonials } from "@/components/home/sections/Testimonials";

export default function Home() {
  return (
    <div className="min-h-full bg-background">
      <Header />
      <main>
        <Hero />
        <DashboardPreview />
        <Testimonials />
        <FeatureStories />
        <FeatureGrid />
        <SuccessStories />
        <GrowthShowcase />
      </main>
      <Footer />
    </div>
  );
}
