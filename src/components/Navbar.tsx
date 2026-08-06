"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#leaders", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#groups", label: "Ministries" },
  { href: "/messages", label: "Sermons" },
  { href: "/give", label: "Give" },
  { href: "https://www.ebabrighton.org", label: "Elmwood Academy" },
  { href: "https://www.ncbbc.org", label: "NCBBC" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isSubPage = pathname !== "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (!href.startsWith("#")) return;
    if (isSubPage) {
      e.preventDefault();
      window.location.href = `/${href}`;
      return;
    }
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isSubPage
          ? "bg-brown-deep/[.97] py-3 shadow-lg backdrop-blur-sm"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center text-white"
          aria-label="Elmwood Baptist Church — Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-white.svg"
            alt="Elmwood Baptist Church"
            className="h-9 sm:h-10 w-auto"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-white/85 text-sm font-medium px-3 py-2 rounded-md hover:text-white hover:bg-white/10 transition-all"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="/visit-us"
              onClick={() => setMenuOpen(false)}
              className="bg-gold text-brown-deep text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gold-light hover:-translate-y-0.5 transition-all"
            >
              Plan a Visit
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle navigation"
        >
          <span
            className={`w-6 h-0.5 bg-white rounded transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white rounded transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white rounded transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed lg:hidden top-0 right-0 w-72 h-screen bg-brown-deep pt-20 px-8 shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block text-white/85 text-base font-medium px-4 py-3 rounded-md hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-4">
              <a
                href="/visit-us"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-gold text-brown-deep font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-all"
              >
                Plan a Visit
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
