import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import { Footer } from "@/components/home/sections/Footer";
import { productLinks } from "@/lib/product-links";
import styles from "./CompanyPage.module.css";

export function AboutPage() {
  return (
    <div className={styles.root}>
      <Header />
      <main>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>About Retailo</p>
          <h1>Built To Make Modern Retail Feel More Connected</h1>
          <p>Retailo gives growing businesses one clear place to manage products, orders, customers, payments, websites, and delivery.</p>
        </section>
        <section className={styles.story}>
          <div className={styles.storyVisual}><Image src="/retailo-dashboard.png" alt="Retailo connected retail dashboard" width={1680} height={970} /></div>
          <div className={styles.storyCopy}>
            <p className={styles.eyebrow}>Why we built Retailo</p>
            <h2>Retail teams deserve tools that work together</h2>
            <p>Daily retail work becomes harder when products, customers, orders, payments, and delivery live in separate systems. Retailo brings those workflows together so teams can spend less time reconciling information and more time serving customers.</p>
            <ul><li>One shared operational view</li><li>Simple tools for everyday work</li><li>A platform that can grow with the business</li></ul>
          </div>
        </section>
        <section id="careers" className={styles.banner}>
          <div><p className={styles.eyebrow}>Build with us</p><h2>Help shape a better operating system for retail.</h2></div>
          <a href={productLinks.register} className={styles.action}>Experience Retailo <ArrowIcon /></a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function ContactPage() {
  return (
    <div className={styles.root}>
      <Header />
      <main>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Contact Retailo</p>
          <h1>Choose The Right Next Step For Your Business</h1>
          <p>Whether you are exploring Retailo, setting up your store, or returning to your account, start with the option that fits.</p>
        </section>
        <section className={styles.contactGrid}>
          <a href={productLinks.register} className={styles.contactCard}>
            <span>01</span><h2>Start with Retailo</h2><p>Create an account and begin setting up your products, store, and operations.</p><strong>Create free account <ArrowIcon /></strong>
          </a>
          <a href={productLinks.signIn} className={styles.contactCard}>
            <span>02</span><h2>Access your account</h2><p>Sign in to manage your catalog, orders, customers, delivery, and settings.</p><strong>Sign in <ArrowIcon /></strong>
          </a>
          <Link href="/resources" className={styles.contactCard}>
            <span>03</span><h2>Explore resources</h2><p>Review guides, customer stories, and practical ideas for running your business.</p><strong>View resources <ArrowIcon /></strong>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
