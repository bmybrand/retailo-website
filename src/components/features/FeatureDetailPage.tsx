/* eslint-disable @next/next/no-css-tags -- The static stylesheet avoids stale development CSS output for this page. */
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import { features, type Feature } from "@/lib/features";
const styles = {
  root: "fd-root",
  hero: "fd-hero",
  container: "fd-container",
  breadcrumb: "fd-breadcrumb",
  breadcrumbCurrent: "fd-breadcrumbCurrent",
  heroGrid: "fd-heroGrid",
  heroCopy: "fd-heroCopy",
  eyebrowRow: "fd-eyebrowRow",
  iconBox: "fd-iconBox",
  eyebrow: "fd-eyebrow",
  title: "fd-title",
  titleLead: "fd-titleLead",
  titleAccent: "fd-titleAccent",
  description: "fd-description",
  actions: "fd-actions",
  primaryLink: "fd-primaryLink",
  secondaryLink: "fd-secondaryLink",
  visualStage: "fd-visualStage",
  imageFrame: "fd-imageFrame",
  dashboard: "fd-dashboard",
  benefits: "fd-benefits",
  sectionEyebrow: "fd-sectionEyebrow",
  sectionHeader: "fd-sectionHeader",
  sectionTitle: "fd-sectionTitle",
  sectionDescription: "fd-sectionDescription",
  benefitGrid: "fd-benefitGrid",
  benefitCard: "fd-benefitCard",
  benefitNumber: "fd-benefitNumber",
  benefitRule: "fd-benefitRule",
  benefitTitle: "fd-benefitTitle",
  benefitBody: "fd-benefitBody",
  related: "fd-related",
  relatedHeader: "fd-relatedHeader",
  relatedTitle: "fd-relatedTitle",
  relatedBack: "fd-relatedBack",
  relatedGrid: "fd-relatedGrid",
  relatedCard: "fd-relatedCard",
  relatedIcon: "fd-relatedIcon",
  relatedName: "fd-relatedName",
  relatedBody: "fd-relatedBody",
  relatedCta: "fd-relatedCta",
  closing: "fd-closing",
  closingEyebrow: "fd-closingEyebrow",
  closingRow: "fd-closingRow",
  closingTitle: "fd-closingTitle",
  closingLink: "fd-closingLink",
  footer: "fd-footer",
  footerText: "fd-footerText",
} as const;

export function FeatureDetailPage({ feature }: { feature: Feature }) {
  const currentIndex = features.findIndex((item) => item.id === feature.id);
  const related = [1, 2, 3].map((offset) => features[(currentIndex + offset) % features.length]);

  return (
    <div className={styles.root}>
      <link rel="stylesheet" href="/feature-detail.css?v=2" />
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <Link href="/#platform">Platform</Link>
              <span aria-hidden="true">/</span>
              <span className={styles.breadcrumbCurrent}>{feature.label}</span>
            </nav>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <div className={styles.eyebrowRow}>
                  <div className={styles.iconBox}>
                    <Image src={feature.icon.active} alt="" aria-hidden="true" width={28} height={28} />
                  </div>
                  <p className={styles.eyebrow}>Retailo {feature.label}</p>
                </div>
                <h1 className={styles.title}>
                  <span className={styles.titleLead}>{feature.titleLead}</span>
                  <span className={styles.titleAccent}>{feature.titleAccent}</span>
                </h1>
                <p className={styles.description}>{feature.body}</p>
                <div className={styles.actions}>
                  <Link href="/#platform" className={styles.primaryLink}>
                    Explore Platform <ArrowIcon />
                  </Link>
                  <Link href="/#solutions" className={styles.secondaryLink}>
                    See all features
                  </Link>
                </div>
              </div>

              <div className={styles.visualStage}>
                <div className={styles.imageFrame} data-feature-detail-image={feature.id}>
                  <Image
                    src={feature.image.src}
                    alt={`Retailo ${feature.label.toLowerCase()} dashboard`}
                    width={feature.image.width}
                    height={feature.image.height}
                    sizes="(min-width: 961px) 49vw, 88vw"
                    className={styles.dashboard}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={styles.container}>
            <p className={styles.sectionEyebrow}>Made for the details</p>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{feature.sectionTitle}</h2>
              <p className={styles.sectionDescription}>{feature.sectionDescription}</p>
            </div>
            <div className={styles.benefitGrid}>
              {feature.details.map((detail, index) => (
                <article key={detail.title} className={styles.benefitCard}>
                  <span className={styles.benefitNumber}>0{index + 1}</span>
                  <div className={styles.benefitRule} aria-hidden="true" />
                  <h3 className={styles.benefitTitle}>{detail.title}</h3>
                  <p className={styles.benefitBody}>{detail.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.related}>
          <div className={styles.container}>
            <div className={styles.relatedHeader}>
              <div>
                <p className={styles.sectionEyebrow}>One connected platform</p>
                <h2 className={styles.relatedTitle}>Explore what works together</h2>
              </div>
              <Link href="/#platform" className={styles.relatedBack}>
                Back to the platform <ArrowIcon />
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <Link key={item.id} href={`/features/${item.id}`} className={styles.relatedCard}>
                  <span className={styles.relatedIcon}>
                    <Image src={item.icon.active} alt="" aria-hidden="true" width={26} height={26} />
                  </span>
                  <h3 className={styles.relatedName}>{item.label}</h3>
                  <p className={styles.relatedBody}>{item.body}</p>
                  <span className={styles.relatedCta}>
                    Learn more <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.container}>
          <div className={styles.closing}>
            <p className={styles.closingEyebrow}>Everything in one place</p>
            <div className={styles.closingRow}>
              <h2 className={styles.closingTitle}>See how Retailo brings your store together.</h2>
              <Link href="/#platform" className={styles.closingLink}>
                Explore the platform <ArrowIcon />
              </Link>
            </div>
          </div>
          <footer className={styles.footer}>
            <Logo />
            <p className={styles.footerText}>The operating system for modern retail stores.</p>
          </footer>
        </section>
      </main>
    </div>
  );
}
