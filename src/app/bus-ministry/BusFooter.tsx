import { BusIcon, MailIcon, PhoneIcon } from "./icons";
import { BUS_SECTIONS, EMAIL, MAIN_SITE_URL, PHONE_DISPLAY, PHONE_HREF } from "./site";

const display = "font-[family-name:var(--font-fredoka)]";

const churchLinks = [
  { href: `${MAIN_SITE_URL}/`, label: "Elmwood Baptist Church" },
  { href: `${MAIN_SITE_URL}/visit-us`, label: "Plan a Visit" },
  { href: `${MAIN_SITE_URL}/#services`, label: "Service Times" },
  { href: `${MAIN_SITE_URL}/messages`, label: "Sermons" },
  { href: `${MAIN_SITE_URL}/give`, label: "Give" },
  { href: `${MAIN_SITE_URL}/statement-of-faith`, label: "Statement of Faith" },
];

const serviceTimes = [
  { label: "Sunday Service", time: "10:00 AM" },
  { label: "Family Bible Time", time: "11:30 AM" },
  { label: "Sunday Afternoon", time: "1:30 PM" },
  { label: "Thursday Mid-Week", time: "7:00 PM" },
];

const linkClass = "text-base text-white/70 transition-colors hover:text-bus";
const headingClass = `${display} mb-4 text-xl font-bold text-white`;

// The bus ministry's own footer.
export default function BusFooter() {
  return (
    <footer className="bg-brown-deep pt-16 text-white/70">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-white.svg" alt="Elmwood Baptist Church" className="mx-auto mb-4 h-11 w-auto sm:mx-0" />
            <p className={`${display} flex items-center justify-center gap-2 text-2xl font-bold text-bus sm:justify-start`}>
              <BusIcon className="h-7 w-auto" />
              Bus Ministry
            </p>
            <p className="mt-3 text-base leading-relaxed">
              A ride to church. A bus full of friends. A place for your family.
            </p>
            <a
              href="#ride"
              className={`${display} mt-5 inline-block rounded-full bg-bus px-6 py-3 text-base font-bold text-brown-deep shadow-[0_4px_0_var(--color-bus-dark)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none`}
            >
              Save my seat
            </a>
          </div>

          {/* On this page */}
          <nav aria-label="Bus ministry sections" className="text-center sm:text-left">
            <h2 className={headingClass}>On the Bus</h2>
            <ul className="space-y-2.5">
              {BUS_SECTIONS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#ride" className={linkClass}>
                  Pickup Sign-up
                </a>
              </li>
            </ul>
          </nav>

          {/* The church */}
          <nav aria-label="Elmwood Baptist Church" className="text-center sm:text-left">
            <h2 className={headingClass}>Our Church</h2>
            <ul className="space-y-2.5">
              {churchLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + times */}
          <div className="text-center sm:text-left">
            <h2 className={headingClass}>Questions?</h2>
            <ul className="space-y-3 text-base">
              <li>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 transition-colors hover:text-bus">
                  <PhoneIcon className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 transition-colors hover:text-bus">
                  <MailIcon className="h-4 w-4" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=13100+E+144th+Ave+Brighton+CO+80601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bus"
                >
                  13100 E 144th Ave
                  <br />
                  Brighton, CO 80601
                </a>
              </li>
            </ul>
            <ul className="mt-5 space-y-1.5 text-sm text-white/60">
              {serviceTimes.map((s) => (
                <li key={s.label}>
                  <strong className="font-semibold text-white/85">{s.label}</strong> &mdash; {s.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-white/40">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            Elmwood Baptist Church &middot; Bus Ministry &middot; Brighton, Colorado
          </p>
        </div>
      </div>
    </footer>
  );
}
