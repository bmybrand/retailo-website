import Image from "next/image";
import Link from "next/link";
import styles from "./FeatureGrid.module.css";

const solutions = [
  {
    category: "For fashion & apparel",
    title: "Run Your Fashion Business With Ease and Confidence",
    description: "Manage products, orders, collections, and deliveries from one dashboard, keeping your store organized and running smoothly.",
    points: ["Organize products, variants & collections", "Manage orders from one place", "Keep customers and sales organized", "Simplify payments and delivery"],
    label: "Explore Fashion Solutions",
    href: "/features/products",
    image: "/solution-fashion.png",
    alt: "Boutique owner managing clothing and orders at her counter",
    badge: "fashion",
  },
  {
    category: "For food & beverage",
    title: "Keep Your Orders Moving From Store To Door",
    description: "Manage products, incoming orders, payments, locations, and deliveries without switching between different tools.",
    points: ["Manage menus and products", "Track orders in real time", "Manage delivery options", "Keep payments organized"],
    label: "Explore Food & Beverage",
    href: "/features/orders",
    image: "/solution-food-beverage.png",
    alt: "Cafe owner checking orders on a tablet behind the counter",
    badge: "food",
  },
  {
    category: "For retail & multi-store businesses",
    title: "Manage Every Store From One Powerful Platform",
    description: "Bring your products, locations, customers, orders, and operations together in one centralized dashboard.",
    points: ["Manage multiple stores & locations", "Centralize products and customers", "Track orders across locations", "Manage payments and delivery"],
    label: "Explore Retail Solutions",
    href: "/features/customers",
    image: "/solution-multistore.png",
    alt: "Retail manager reviewing store activity on a tablet",
    badge: "retail",
  },
] as const;

function BadgeIcon({ type }: { type: "fashion" | "food" | "retail" }) {
  if (type === "fashion") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M5.5 11h21l1.5 17h-24l1.5-17Z" fill="currentColor" />
        <path d="M11 12V9a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="11" cy="12" r="1" fill="white" /><circle cx="21" cy="12" r="1" fill="white" />
      </svg>
    );
  }
  if (type === "food") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M3 9h16v13H3V9Zm16 5h5l4 4v4h-9v-8Z" fill="currentColor" />
        <circle cx="9" cy="23" r="3" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="23" cy="23" r="3" fill="white" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 25V17h5v8H5Zm8 0V11h5v14h-5Zm8 0V5h5v20h-5Z" fill="currentColor" />
    </svg>
  );
}

function ImageBadges({ type }: { type: "fashion" | "food" | "retail" }) {
  const metric = type === "fashion"
    ? { label: "Products", value: "250+" }
    : type === "food"
      ? { label: "Orders", value: "120+" }
      : { label: "Customers", value: "1,200+" };
  const status = type === "fashion"
    ? { label: "Online Store", value: "Live" }
    : type === "food"
      ? { label: "Delivery", value: "Active" }
      : { label: "Revenue", value: "$12,430" };

  return (
    <>
      <div className={`${styles.badge} ${styles.topBadge}`} aria-hidden="true">
        <div className={styles.metricText}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </div>
        {type === "fashion" ? (
          <span className={styles.metricBars}><i /><i /><i /><i /></span>
        ) : type === "food" ? (
          <span className={styles.metricGrowth}>↗ 12%</span>
        ) : (
          <span className={styles.metricAvatars}><i /><i /><i /><i /></span>
        )}
      </div>
      <div className={`${styles.badge} ${styles.bottomBadge}`} aria-hidden="true">
        <span className={styles.badgeIcon}><BadgeIcon type={type} /></span>
        <span className={styles.statusText}>
          <span>{status.label}</span>
          {type === "retail" ? (
            <strong className={styles.revenueValue}>{status.value}</strong>
          ) : (
            <strong className={styles.statusPill}><i />{status.value}</strong>
          )}
        </span>
      </div>
    </>
  );
}

export function FeatureGrid() {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Built for businesses that sell</p>
            <h2 id="solutions-heading">Powering Businesses<br />That Sell and Scale</h2>
          </div>
          <p className={styles.introCopy}>
            From growing online shops to established retail brands, our platform gives businesses everything they need to manage products, orders, customers, payments, websites, inventory, and delivery—all from one powerful, connected platform designed to simplify daily operations and support long-term growth.
          </p>
        </div>

        <div className={styles.solutions}>
          {solutions.map((solution, index) => (
            <article key={solution.category} className={`${styles.row} ${index === 1 ? styles.reverse : ""}`}>
              <div className={styles.visual}>
                <div className={styles.photoFrame}>
                  <Image
                    src={solution.image}
                    alt={solution.alt}
                    fill
                    sizes="(max-width: 650px) 94vw, (max-width: 1100px) 44vw, 520px"
                    className={styles.photo}
                  />
                </div>
                <ImageBadges type={solution.badge} />
              </div>
              <div className={styles.content}>
                <p className={styles.eyebrow}>{solution.category}</p>
                <h3>{solution.title}</h3>
                <p className={styles.description}>{solution.description}</p>
                <ul className={styles.points}>
                  {solution.points.map((point) => (
                    <li key={point}>
                      <span className={styles.check} aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="m4.5 10 3.5 3.5 7.5-7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link className={styles.link} href={solution.href}>
                  {solution.label}
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 12h17m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
