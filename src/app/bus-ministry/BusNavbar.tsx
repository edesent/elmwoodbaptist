"use client";

import { useEffect, useState } from "react";
import { BusIcon } from "./icons";
import { BUS_SECTIONS, MAIN_SITE_URL } from "./site";

const display = "font-[family-name:var(--font-fredoka)]";

// The bus ministry's own header. It sits clear over the hero at the top of the
// page, then turns solid navy once you scroll.
export default function BusNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-bus px-5 py-3 font-bold text-brown-deep focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-brown-deep/[.97] py-3 shadow-lg backdrop-blur-sm"
            : "bg-gradient-to-b from-brown-deep/80 via-brown-deep/40 to-transparent py-4"
        }`}
      >
        <nav
          aria-label="Bus ministry"
          className="mx-auto flex max-w-7xl items-center justify-between px-6"
        >
          {/* Brand */}
          <a href="#top" className="flex items-center gap-3 text-white" aria-label="Elmwood Bus Ministry — top of page">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-white.svg" alt="Elmwood Baptist Church" className="h-8 w-auto sm:h-9" />
            <span className="h-7 w-px bg-white/30" aria-hidden="true" />
            <span className={`${display} flex items-center gap-2 whitespace-nowrap text-base font-bold leading-none sm:text-lg`}>
              <BusIcon className="hidden h-6 w-auto sm:block" />
              Bus Ministry
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {BUS_SECTIONS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${display} rounded-full px-4 py-2 text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="ml-1">
              <a
                href={MAIN_SITE_URL}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                Elmwood Baptist Church
                <svg className="h-3 w-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </li>
            <li className="ml-2">
              <a
                href="#ride"
                className={`${display} inline-block rounded-full bg-bus px-6 py-2.5 text-base font-bold text-brown-deep shadow-[0_4px_0_var(--color-bus-dark)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none`}
              >
                Save my seat
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="bus-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex flex-col gap-1.5 rounded-lg p-2 lg:hidden"
          >
            <span className={`h-0.5 w-6 rounded bg-white transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 rounded bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 rounded bg-white transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          id="bus-mobile-menu"
          hidden={!menuOpen}
          className="border-t border-white/10 bg-brown-deep px-6 pb-6 pt-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {BUS_SECTIONS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`${display} block rounded-xl px-4 py-3 text-xl font-semibold text-white hover:bg-white/10`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={MAIN_SITE_URL}
                className="block rounded-xl px-4 py-3 text-base text-white/70 hover:bg-white/10 hover:text-white"
              >
                Elmwood Baptist Church &rarr;
              </a>
            </li>
            <li className="mt-3">
              <a
                href="#ride"
                onClick={() => setMenuOpen(false)}
                className={`${display} block rounded-full bg-bus px-6 py-3.5 text-center text-lg font-bold text-brown-deep shadow-[0_5px_0_var(--color-bus-dark)]`}
              >
                Save my seat
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
