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
    <header className="fixed top-0 inset-x-0 z-50 bg-brown-deep/95 backdrop-blur border-b border-gold/30">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/man-camp" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.12em] text-white uppercase">
            Man Camp
          </span>
          <span className="text-[0.7rem] tracking-[0.25em] uppercase text-gold-light mt-1">
            Elmwood Baptist Church
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Man Camp">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-base font-semibold tracking-wide uppercase transition-colors ${
                isActive(l.href) ? "text-gold-light" : "text-white hover:text-gold-light"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden text-white p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-brown-deep border-t border-gold/30 px-6 pb-6" aria-label="Man Camp mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-lg font-semibold uppercase tracking-wide border-b border-white/10 ${
                isActive(l.href) ? "text-gold-light" : "text-white"
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
