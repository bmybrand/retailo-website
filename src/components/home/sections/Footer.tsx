import Image from "next/image";
import Link from "next/link";
import { productLinks } from "@/lib/product-links";
import styles from "./Footer.module.css";

type FooterLink = { label: string; href?: string };
type FooterGroup = { title: string; links: FooterLink[] };

const columns: FooterGroup[][] = [
  [
    {
      title: "Platform",
      links: [
        { label: "Products", href: "/features/products" },
        { label: "Orders", href: "/features/orders" },
        { label: "Customers", href: "/features/customers" },
        { label: "Inventory", href: "/features/products" },
        { label: "Delivery", href: "/features/delivery" },
        { label: "Payments", href: "/features/payments" },
      ],
    },
    {
      title: "Manage Business",
      links: [
        { label: "Stores & Locations", href: productLinks.stores },
        { label: "Discounts", href: productLinks.discounts },
        { label: "Taxes & Promotions", href: productLinks.taxes },
        { label: "Security", href: productLinks.security },
        { label: "Notifications", href: productLinks.notifications },
      ],
    },
  ],
  [
    {
      title: "Tools",
      links: [
        { label: "Product Management", href: "/features/products" },
        { label: "Order Management", href: "/features/orders" },
        { label: "Customer Management", href: "/features/customers" },
        { label: "Inventory Management", href: "/features/products" },
        { label: "Delivery Management", href: "/features/delivery" },
        { label: "Payment Management", href: "/features/payments" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/resources" },
        { label: "Documentation", href: "/resources" },
        { label: "Blog", href: "/resources" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
  [
    {
      title: "Connect",
      links: [
        { label: "Website", href: "/features/website" },
        { label: "WordPress", href: "/integrations" },
        { label: "WooCommerce", href: "/integrations" },
        { label: "Integrations", href: "/integrations" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Retailo", href: "/about" },
        { label: "Our Partners", href: "/integrations" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/about#careers" },
      ],
    },
  ],
  [
    {
      title: "Explore",
      links: [
        { label: "Product Management", href: "/features/products" },
        { label: "Order Management", href: "/features/orders" },
        { label: "Inventory", href: "/features/products" },
        { label: "Customer Management", href: "/features/customers" },
        { label: "Payments", href: "/features/payments" },
        { label: "Delivery", href: "/features/delivery" },
      ],
    },
    {
      title: "Useful Guides",
      links: [
        { label: "Getting Started", href: "/resources" },
        { label: "Managing Products", href: "/resources" },
        { label: "Managing Orders", href: "/resources" },
        { label: "Connecting Your Store", href: "/resources" },
        { label: "Grow Your Business", href: "/resources" },
      ],
    },
  ],
];

function LinkGroup({ group }: { group: FooterGroup }) {
  return (
    <div className={styles.linkGroup}>
      <h3>{group.title}</h3>
      <ul>
        {group.links.map(({ label, href }) => (
          <li key={label}>
            {href?.startsWith("http") ? <a href={href}>{label}</a> : href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="about" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandColumn}>
            <Link href="/#home" className={styles.logoLink} aria-label="Retailo home">
              <Image src="/retailo-logo.svg" alt="retailo" width={137} height={39} />
            </Link>
            <div className={styles.accountActions} aria-label="Account options">
              <a href={productLinks.register} className={styles.createAccount}>Create Free Account</a>
              <a href={productLinks.signIn} className={styles.login}>Login</a>
            </div>
            <div className={styles.socials} aria-hidden="true">
              <span className={styles.facebook}><Image src="/Vector.svg" alt="" width={8} height={16} /></span>
              <span><Image src="/Vector-3.svg" alt="" width={16} height={16} /></span>
              <span><Image src="/Group.svg" alt="" width={16} height={17} /></span>
              <span><Image src="/Vector-1.svg" alt="" width={17} height={15} /></span>
              <span><Image src="/Vector-2.svg" alt="" width={18} height={13} /></span>
            </div>
          </div>

          <nav className={styles.navigation} aria-label="Footer navigation">
            {columns.map((column, index) => (
              <div key={index} className={styles.linkColumn}>
                {index === columns.length - 1 && (
                  <div className={styles.myBrand}>
                    <Image src="/Group 1597884094.svg" alt="By mybrand" width={216} height={40} />
                  </div>
                )}
                {column.map((group) => <LinkGroup key={group.title} group={group} />)}
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <Image
            src="/Group 3.png"
            alt=""
            aria-hidden="true"
            width={1323}
            height={378}
            sizes="(max-width: 900px) 90vw, 80vw"
            className={styles.wordmark}
          />
          <p>Copyright © 2026 Retailo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
