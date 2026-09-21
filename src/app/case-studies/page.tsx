import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import { Footer } from "@/components/home/sections/Footer";
import { caseStudies } from "@/lib/case-studies";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Customer Success Stories | Retailo",
  description: "See how growing brands use Retailo to manage products, orders, customers, stores, and daily operations.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Built to help you grow</p>
            <h1>Real Businesses.<br />Connected by Retailo.</h1>
            <p className={styles.intro}>See how growing brands bring products, customers, orders, inventory, and everyday operations together in one connected platform.</p>
          </div>
        </section>

        <section className={styles.stories} aria-label="Retailo customer success stories">
          {caseStudies.map((study, index) => (
            <article className={styles.story} key={study.slug}>
              <div className={styles.media}>
                <Image
                  src={study.image}
                  alt={study.imageAlt}
                  fill
                  sizes="(max-width: 800px) 92vw, 42vw"
                  priority={index < 2}
                />
              </div>
              <div className={styles.copy}>
                <Image src={study.logo} alt={study.brand} width={180} height={60} className={styles.logo} />
                <p className={styles.label}>Customer story</p>
                <h2>{study.tagline}</h2>
                <p className={styles.summary}>{study.summary}</p>
                <blockquote>“{study.quote}”</blockquote>
                <div className={styles.person}>
                  <strong>{study.person}</strong>
                  <span>{study.role}</span>
                </div>
                <div className={styles.stats}>
                  {study.stats.map((stat) => (
                    <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
                  ))}
                </div>
                <Link href={`/case-studies/${study.slug}`} className={styles.button}>
                  Read Full Case Study <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
