import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureDetailPage } from "@/components/features/FeatureDetailPage";
import { features, getFeature } from "@/lib/features";

type FeaturePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.id }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);

  if (!feature) return { title: "Feature not found | Retailo" };

  return {
    title: `${feature.label} | Retailo`,
    description: feature.body,
  };
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = getFeature(slug);

  if (!feature) notFound();

  return <FeatureDetailPage feature={feature} />;
}
