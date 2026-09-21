"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowIcon } from "@/components/home/hero/ArrowIcon";
import { Logo } from "@/components/Logo";
import { productLinks } from "@/lib/product-links";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/features", label: "Features" },
  { href: "/integrations", label: "Integrations" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    function pastHero() {
      const hero = document.getElementById("home");
      if (!hero) return false;
      return hero.getBoundingClientRect().bottom <= 72;
    }

    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastY + 6;
      const goingUp = y < lastY - 6;

      if (open || !pastHero()) {
        setHidden(false);
      } else if (goingDown) {
        setHidden(true);
      } else if (goingUp) {
        setHidden(false);
      }

      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-background transition-transform duration-300 ease-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full items-center justify-between px-4 sm:px-8 lg:w-[80%] lg:px-0">
          <Logo />
          <nav className="hidden items-center gap-8 font-inter text-base text-zinc-800 lg:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="group">
                <NavMark>{link.label}</NavMark>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={productLinks.signIn}
                className="inline-flex items-center justify-center rounded-full border border-brand bg-transparent px-5 py-2 text-sm font-medium text-brand transition hover:bg-brand/5"
              >
                Sign In
              </a>
              <a href={productLinks.register} className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition hover:bg-[#084538]">Get Started</a>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <MenuToggle open={open} />
            </button>
          </div>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            aria-label="Close menu"
            className={`fixed inset-0 top-[72px] z-40 bg-zinc-900/20 backdrop-blur-[2px] transition-opacity duration-300 ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={closeMenu}
          />
          <div
            id="mobile-nav"
            className={`absolute inset-x-0 top-full z-50 px-4 pt-2 sm:px-8 ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div
              className={`origin-top rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-[0_20px_50px_rgba(20,36,28,0.14)] transition-all duration-300 ease-out ${
                open
                  ? "translate-y-0 scale-100 opacity-100"
                  : "-translate-y-3 scale-[0.98] opacity-0"
              }`}
            >
              <nav className="flex flex-col font-inter text-[15px] text-zinc-800">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl px-4 py-3 transition"
                    onClick={closeMenu}
                  >
                    <NavMark>{link.label}</NavMark>
                    <ArrowIcon className="h-4 w-4 text-zinc-400 transition group-hover:text-zinc-700" />
                  </a>
                ))}
              </nav>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-zinc-100 px-1 pt-3 pb-1">
                <a
                  href={productLinks.signIn}
                  className="inline-flex items-center justify-center rounded-full border border-brand bg-transparent px-4 py-2.5 text-sm font-medium text-brand transition hover:bg-brand/5"
                  onClick={closeMenu}
                >
                  Sign In
                </a>
                <a href={productLinks.register} className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#084538]" onClick={closeMenu}>Get Started</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
}

function NavMark({ children }: { children: ReactNode }) {
  return (
    <span className="relative isolate inline-block px-[0.04em]">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[0.08em] z-0 h-[0.42em] origin-left scale-x-0 bg-brand-lime transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

function MenuToggle({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-[18px]">
      <span
        className={`absolute left-0 h-[1.6px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute top-1/2 left-0 h-[1.6px] w-full -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-[1.6px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
        }`}
      />
    </span>
  );
}
