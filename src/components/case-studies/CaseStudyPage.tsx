import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import { Footer } from "@/components/home/sections/Footer";
import type { CaseStudy } from "@/lib/case-studies";
import { productLinks } from "@/lib/product-links";
import styles from "./CaseStudyPage.module.css";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Link href="/#success-stories" className={styles.backLink}>Customer stories</Link>
              <Image src={study.logo} alt={study.brand} width={190} height={64} className={styles.logo} priority />
              <p className={styles.eyebrow}>Retailo customer story</p>
              <h1>{study.tagline}</h1>
              <p className={styles.summary}>{study.summary}</p>
              <div className={styles.person}>
                <strong>{study.person}</strong>
                <span>{study.role}</span>
              </div>
            </div>
            <div className={styles.heroMedia}>
              <Image src={study.image} alt={study.imageAlt} fill sizes="(max-width: 760px) 92vw, 44vw" priority />
              <blockquote>“{study.quote}”</blockquote>
            </div>
          </div>
        </section>

        <section className={styles.metrics} aria-label={`${study.brand} results`}>
          <div className={styles.metricsInner}>
            {study.stats.map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </div>
        </section>

        <section className={styles.story}>
          <div className={styles.storyHeading}>
            <p className={styles.eyebrow}>How Retailo helped</p>
            <h2>A clearer way to run the business</h2>
          </div>
          <div className={styles.steps}>
            <article><span>01</span><h3>The challenge</h3><p>{study.challenge}</p></article>
            <article><span>02</span><h3>The solution</h3><p>{study.solution}</p></article>
            <article><span>03</span><h3>The result</h3><p>{study.result}</p></article>
          </div>
        </section>

        <section className={styles.platform}>
          <div className={styles.platformCopy}>
            <p className={styles.eyebrow}>One connected platform</p>
            <h2>{study.highlights.join(", ")}—working together.</h2>
            <p>Give your team one place to see what needs attention and keep daily work moving.</p>
            <a href={productLinks.register} className={styles.primaryButton}>Create Free Account <ArrowIcon /></a>
          </div>
          <div className={styles.dashboard}>
            <Image src="/retailo-dashboard.png" alt="Retailo dashboard" fill sizes="(max-width: 760px) 92vw, 48vw" />
          </div>
        </section>

        <section className={styles.nextStory}>
          <p className={styles.eyebrow}>More customer stories</p>
          <h2>See how growing businesses work with Retailo.</h2>
          <Link href="/#success-stories" className={styles.secondaryButton}>Explore Success Stories <ArrowIcon /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
