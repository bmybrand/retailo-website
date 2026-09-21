import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import { Footer } from "@/components/home/sections/Footer";
import { productLinks } from "@/lib/product-links";
import styles from "./MarketingPage.module.css";

export type MarketingPageKey = "platform" | "features" | "integrations" | "pricing" | "resources";

type Card = {
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  image?: string;
};

type PageContent = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  heroImage: string;
  stats: Array<{ value: string; label: string }>;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  cards: Card[];
  spotlightEyebrow: string;
  spotlightTitle: string;
  spotlightBody: string;
  spotlightImage: string;
  bullets: string[];
  closingTitle: string;
};

const content: Record<MarketingPageKey, PageContent> = {
  platform: {
    eyebrow: "The Retailo platform",
    title: "One Operating System For",
    accent: "Every Part Of Retail",
    intro: "Connect products, orders, customers, payments, websites, and delivery in one clear workspace built for everyday operations.",
    heroImage: "/retailo-dashboard.png",
    stats: [
      { value: "1", label: "Connected workspace" },
      { value: "6", label: "Core retail tools" },
      { value: "24/7", label: "Operational visibility" },
    ],
    sectionEyebrow: "Everything works together",
    sectionTitle: "Run the whole business from one place",
    sectionIntro: "Give every team a shared source of truth while keeping daily work simple and fast.",
    cards: [
      { eyebrow: "Catalog", title: "Products that stay organized", body: "Manage products, variants, pricing, inventory, and collections without scattered spreadsheets.", href: "/features/products", image: "/retailo-products-dashboard.png" },
      { eyebrow: "Operations", title: "Orders that keep moving", body: "Track each order from payment through fulfillment and delivery with a complete activity record.", href: "/features/orders", image: "/retailo-orders-dashboard.png" },
      { eyebrow: "Relationships", title: "Customers in full context", body: "See contact details, purchase history, and store activity together so your team can respond faster.", href: "/features/customers", image: "/retailo-customers-dashboard.png" },
    ],
    spotlightEyebrow: "Built around your workflow",
    spotlightTitle: "A dashboard your whole team can understand",
    spotlightBody: "Retailo keeps the information that matters visible, current, and ready for action across locations and channels.",
    spotlightImage: "/retailo-dashboard.png",
    bullets: ["Live operational overview", "Shared records across teams", "Less switching between tools"],
    closingTitle: "Bring every part of your retail business together.",
  },
  features: {
    eyebrow: "Retailo features",
    title: "The Tools Your Store Needs To",
    accent: "Sell And Scale",
    intro: "Choose the workflow you need today and know every part connects as your store grows.",
    heroImage: "/retailo-products-dashboard.png",
    stats: [
      { value: "6", label: "Connected workflows" },
      { value: "1", label: "Consistent experience" },
      { value: "0", label: "Duplicate records" },
    ],
    sectionEyebrow: "Explore the toolkit",
    sectionTitle: "Purpose-built for modern retail work",
    sectionIntro: "Each feature is focused enough to feel simple and connected enough to keep the business moving.",
    cards: [
      { eyebrow: "Products", title: "Manage your catalog", body: "Organize products, variants, collections, prices, images, and stock from one product workspace.", href: "/features/products", image: "/retailo-products-dashboard.png" },
      { eyebrow: "Orders", title: "Keep every order moving", body: "See what needs action, update fulfillment, and follow each order through completion.", href: "/features/orders", image: "/retailo-orders-dashboard.png" },
      { eyebrow: "Customers", title: "Know the people you serve", body: "Keep profiles, purchase history, and activity accessible across your team.", href: "/features/customers", image: "/retailo-customers-dashboard.png" },
      { eyebrow: "Website", title: "Sell through your own storefront", body: "Manage the online store alongside products, customers, and day-to-day operations.", href: "/features/website", image: "/retailo-website-dashboard.png" },
      { eyebrow: "Payments", title: "Keep payments organized", body: "Track payment status, settlements, and the information your team needs to reconcile sales.", href: "/features/payments", image: "/retailo-payments-dashboard.png" },
      { eyebrow: "Delivery", title: "Move orders to the door", body: "Coordinate delivery options, locations, and fulfillment from the same order record.", href: "/features/delivery", image: "/retailo-delivery-dashboard.png" },
    ],
    spotlightEyebrow: "Designed as one system",
    spotlightTitle: "Every update reaches the right workflow",
    spotlightBody: "When a product, order, customer, or payment changes, the rest of the business has the context it needs.",
    spotlightImage: "/retailo-orders-dashboard.png",
    bullets: ["Connected operational data", "Clear ownership and status", "Consistent tools across teams"],
    closingTitle: "Choose your starting point. Retailo connects the rest.",
  },
  integrations: {
    eyebrow: "Connected commerce",
    title: "Bring Your Store And Tools",
    accent: "Into One Flow",
    intro: "Connect the channels and services your business already uses while Retailo keeps the operational record together.",
    heroImage: "/retailo-website-dashboard.png",
    stats: [
      { value: "1", label: "Central source of truth" },
      { value: "Live", label: "Operational updates" },
      { value: "Any", label: "Selling channel" },
    ],
    sectionEyebrow: "Connect the workflow",
    sectionTitle: "Your channels working as one business",
    sectionIntro: "Keep products, orders, payments, and delivery aligned from the storefront to the back office.",
    cards: [
      { eyebrow: "Storefronts", title: "Website and commerce", body: "Keep your online experience connected to the same product and order records your team uses.", image: "/retailo-website-dashboard.png" },
      { eyebrow: "Payments", title: "Payment operations", body: "Bring payment status into the order workflow so teams can act with confidence.", image: "/retailo-payments-dashboard.png" },
      { eyebrow: "Fulfillment", title: "Delivery and locations", body: "Coordinate shipping, pickup, delivery areas, and store locations without losing order context.", image: "/retailo-delivery-dashboard.png" },
    ],
    spotlightEyebrow: "A cleaner operating model",
    spotlightTitle: "Connect once, work from one shared view",
    spotlightBody: "Retailo reduces manual handoffs by keeping the information from every connected channel accessible in the right place.",
    spotlightImage: "/retailo-website-dashboard.png",
    bullets: ["Shared product information", "Unified order visibility", "Clear payment and delivery status"],
    closingTitle: "Connect your channels without fragmenting your business.",
  },
  pricing: {
    eyebrow: "Simple, scalable plans",
    title: "Pricing That Grows With",
    accent: "Your Business",
    intro: "Start with the essentials and expand as your products, orders, team, and locations grow.",
    heroImage: "/retailo-payments-dashboard.png",
    stats: [
      { value: "14 days", label: "To explore Retailo" },
      { value: "No", label: "Setup surprises" },
      { value: "Easy", label: "Plan changes" },
    ],
    sectionEyebrow: "Choose your plan",
    sectionTitle: "A clear plan for every stage",
    sectionIntro: "Each plan includes the connected Retailo experience, with capacity and support that fit your operation.",
    cards: [
      { eyebrow: "Starter", title: "For a store finding its rhythm", body: "Core catalog, orders, customers, payments, and delivery tools for one growing operation." },
      { eyebrow: "Growth", title: "For teams ready to scale", body: "More users, deeper reporting, advanced workflows, and support for a busier multichannel business." },
      { eyebrow: "Scale", title: "For complex retail operations", body: "Multiple stores and locations, tailored onboarding, priority support, and room for advanced requirements." },
    ],
    spotlightEyebrow: "Included in every plan",
    spotlightTitle: "The connected foundation stays the same",
    spotlightBody: "Every Retailo plan is designed around a unified operating model, so upgrading adds capacity without forcing a new workflow.",
    spotlightImage: "/retailo-payments-dashboard.png",
    bullets: ["Products, orders, and customers", "Payments and delivery workflows", "Secure cloud access"],
    closingTitle: "Find the Retailo plan that fits your next stage.",
  },
  resources: {
    eyebrow: "Retailo resources",
    title: "Practical Ideas For",
    accent: "Better Retail Operations",
    intro: "Explore guides, customer stories, and playbooks for building a more connected retail business.",
    heroImage: "/success-story-jiggy-jerky.png",
    stats: [
      { value: "Guides", label: "For everyday workflows" },
      { value: "Stories", label: "From growing brands" },
      { value: "Ideas", label: "Built for action" },
    ],
    sectionEyebrow: "Learn and grow",
    sectionTitle: "Resources made for operators",
    sectionIntro: "Clear guidance for the decisions retail teams make every day.",
    cards: [
      { eyebrow: "Getting started", title: "Build a clean product catalog", body: "A practical framework for product details, variants, pricing, and inventory that stays manageable as you grow.", image: "/solution-fashion.png" },
      { eyebrow: "Operations", title: "Create an order workflow that moves", body: "Define statuses, ownership, and handoffs so every order has a clear next action.", image: "/solution-food-beverage.png" },
      { eyebrow: "Customer story", title: "How growing brands stay connected", body: "See how one shared workspace helps teams keep products, customers, and daily operations aligned.", image: "/success-story-jiggy-jerky.png" },
    ],
    spotlightEyebrow: "Featured customer story",
    spotlightTitle: "Jiggy Jerky brings daily work into one place",
    spotlightBody: "A connected view of products, orders, customers, and operations gives the team more confidence as the business grows.",
    spotlightImage: "/success-story-jiggy-jerky.png",
    bullets: ["Clearer daily priorities", "Faster access to information", "A shared operational view"],
    closingTitle: "Turn useful ideas into a smoother retail operation.",
  },
};

export function MarketingPage({ page }: { page: MarketingPageKey }) {
  const data = content[page];

  return (
    <div className={styles.root}>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{data.eyebrow}</p>
            <h1><span>{data.title}</span><span>{data.accent}</span></h1>
            <p className={styles.intro}>{data.intro}</p>
            <div className={styles.actions}>
              <a href={productLinks.register} className={styles.primaryAction}>Get Started <ArrowIcon /></a>
              <Link href="/features" className={styles.secondaryAction}>Explore Features</Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <Image src={data.heroImage} alt="Retailo workspace" width={1680} height={970} priority className={styles.heroImage} />
          </div>
        </section>

        <section className={styles.stats} aria-label="Highlights">
          {data.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </section>

        <section className={styles.capabilities}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>{data.sectionEyebrow}</p><h2>{data.sectionTitle}</h2></div>
            <p>{data.sectionIntro}</p>
          </div>
          <div className={styles.cardGrid}>
            {data.cards.map((card) => {
              const cardContent = (
                <>
                  {card.image && <div className={styles.cardImage}><Image src={card.image} alt="" width={1680} height={970} /></div>}
                  <div className={styles.cardCopy}>
                    <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    {card.href && <span className={styles.cardLink}>Learn more <ArrowIcon /></span>}
                  </div>
                </>
              );
              return card.href ? <Link key={card.title} href={card.href} className={styles.card}>{cardContent}</Link> : <article key={card.title} className={styles.card}>{cardContent}</article>;
            })}
          </div>
        </section>

        <section className={styles.spotlight}>
          <div className={styles.spotlightCopy}>
            <p className={styles.spotlightEyebrow}>{data.spotlightEyebrow}</p>
            <h2>{data.spotlightTitle}</h2>
            <p>{data.spotlightBody}</p>
            <ul>{data.bullets.map((bullet) => <li key={bullet}><span>✓</span>{bullet}</li>)}</ul>
          </div>
          <div className={styles.spotlightVisual}><Image src={data.spotlightImage} alt="Retailo dashboard view" width={1680} height={970} /></div>
        </section>

        <section className={styles.closing}>
          <p className={styles.eyebrow}>Ready for a better way to work?</p>
          <h2>{data.closingTitle}</h2>
          <a href={productLinks.register} className={styles.primaryAction}>Start With Retailo <ArrowIcon /></a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
