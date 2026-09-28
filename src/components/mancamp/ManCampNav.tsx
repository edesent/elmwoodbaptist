"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/man-camp", label: "Home" },
  { href: "/man-camp/schedule", label: "Schedule" },
  { href: "/man-camp/register", label: "Register" },
  { href: "/man-camp/photos", label: "Photos" },
  { href: "/man-camp/faq", label: "FAQ" },
];

export default function ManCampNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/man-camp" ? pathname === "/man-camp" || pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-pine border-b-4 border-ember">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/man-camp" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 76 30" className="w-14 h-auto" aria-hidden="true">
            <polygon points="38,0 76,15 38,30 0,15" fill="var(--color-ember)" />
            <text x="38" y="21.5" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="17" fill="#fff">10</text>
          </svg>
          <span className="flex flex-col leading-none">
            <span className="font-display text-3xl font-bold tracking-[0.1em] text-parchment uppercase">
              Man Camp
            </span>
            <span className="font-display text-xs tracking-[0.3em] uppercase text-canvas/70 mt-1">
              Elmwood Baptist Church
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Man Camp">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-display text-lg font-medium tracking-[0.12em] uppercase transition-colors border-b-2 pb-1 ${
                isActive(l.href)
                  ? "text-ember-light border-ember"
                  : "text-parchment border-transparent hover:text-ember-light"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden text-parchment p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="square" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-pine border-t border-parchment/10 px-6 pb-6" aria-label="Man Camp mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 font-display text-xl uppercase tracking-[0.12em] border-b border-parchment/10 ${
                isActive(l.href) ? "text-ember-light" : "text-parchment"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
