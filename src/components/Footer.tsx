const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#leaders", label: "About Us" },
  { href: "#services", label: "Service Times" },
  { href: "#groups", label: "Ministries" },
  { href: "/visit-us", label: "Plan a Visit" },
  { href: "/messages", label: "Sermons" },
  { href: "/give", label: "Give Online" },
  { href: "https://elmwoodbaptistchurchacademy.breezechms.com/form/ba4d32", label: "Connect Card" },
  { href: "/statement-of-faith", label: "Statement of Faith" },
  { href: "/plan-of-salvation", label: "Plan of Salvation" },
];

const serviceTimes = [
  { label: "Sunday Service", time: "10:00 AM" },
  { label: "Family Bible Time", time: "11:30 AM" },
  { label: "Sunday Afternoon", time: "1:30 PM" },
  { label: "Thursday Mid-Week", time: "7:00 PM" },
];

export default function Footer() {
  return (
    <footer className="bg-brown-deep text-white/70 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/[.08]">
          {/* Brand */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-white.svg"
              alt="Elmwood Baptist Church"
              className="h-12 w-auto mb-5"
            />
            <p className="text-sm leading-relaxed">
              13100 E 144th Ave<br />
              Brighton, CO 80601<br />
              <a href="tel:+13036593818" className="text-gold-light hover:text-gold transition-colors">
                (303) 659-3818
              </a>
            </p>

            <div className="mt-6">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/40 mb-2">
                Home of
              </p>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a
                    href="https://www.ebabrighton.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-gold-light transition-colors"
                  >
                    Elmwood Christian Academy
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ncbbc.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-gold-light transition-colors"
                  >
                    Northern Colorado Baptist Bible College
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-base font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-gold-light sm:hover:pl-1 transition-all">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-base font-semibold text-white mb-5">Service Times</h4>
            <ul className="space-y-2.5">
              {serviceTimes.map((s) => (
                <li key={s.label} className="text-sm text-white/60">
                  <strong className="text-white/85 font-semibold">{s.label}</strong> — {s.time}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-xl font-semibold text-white leading-snug mb-3">
              Find Us on<br />Social Media.
            </h4>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Stay up to date on upcoming events, news, and other announcements about what&rsquo;s happening at EBC!
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a
                href="https://facebook.com/elmwoodbaptistbrighton"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[.08] text-white/70 hover:bg-gold hover:text-brown-deep hover:-translate-y-0.5 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@elmwoodbaptist"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[.08] text-white/70 hover:bg-gold hover:text-brown-deep hover:-translate-y-0.5 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center py-6 text-sm text-white/30">
          <p>&copy; {new Date().getFullYear()} Elmwood Baptist Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
