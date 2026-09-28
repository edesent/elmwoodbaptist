import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Man Camp | Elmwood Baptist Church" },
  description:
    "Man Camp is the annual men's retreat of Elmwood Baptist Church in Brighton, Colorado: bold preaching, real fellowship, and iron sharpening iron in God's creation.",
  alternates: { canonical: "/man-camp" },
  openGraph: {
    title: "Man Camp | Elmwood Baptist Church",
    description: "Three days where men trade comfort for conviction.",
    url: "/man-camp",
    type: "website",
    images: ["/mancamp/man-camp-webiste.jpg"],
  },
};

const quickLinks = [
  { href: "/man-camp/schedule", title: "Schedule", text: "What a weekend at Man Camp looks like." },
  { href: "/man-camp/register", title: "Register", text: "Rooms, pricing, and how to save your spot." },
  { href: "/man-camp/photos", title: "Photos", text: "A look at the men, the mountains, and the fellowship." },
  { href: "/man-camp/faq", title: "FAQ", text: "Answers to the questions men ask most." },
];

export default function ManCampHome() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 md:py-32 bg-brown-deep overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/mancamp/men.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/50 to-brown-deep" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-bold tracking-[0.25em] uppercase text-gold-light mb-5">
            The Men&rsquo;s Retreat of Elmwood Baptist Church
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white uppercase tracking-[0.08em]">
            Man Camp
          </h1>
          <p className="font-serif text-2xl md:text-3xl italic text-white/90 mt-6">
            Three days where men trade comfort for <span className="text-gold-light">conviction.</span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/man-camp/register"
              className="bg-gold text-brown-deep font-semibold text-base tracking-wide uppercase px-9 py-4 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light transition-all"
            >
              Registration Info
            </Link>
            <Link
              href="/man-camp/photos"
              className="text-white font-semibold text-base tracking-wide uppercase px-9 py-4 rounded-full border-2 border-white/60 hover:border-gold-light hover:text-gold-light transition-all"
            >
              See the Photos
            </Link>
          </div>
        </div>
      </header>

      {/* Save the date + recap */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-brown-deep text-white rounded-2xl p-10 shadow-xl">
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-gold-light mb-3">Save the Date</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Man Camp 10</h2>
            <p className="text-lg text-white/85 leading-relaxed">
              Our tenth year is on the way. Dates, speaker, and registration details will be posted
              here as soon as they are set. Check back soon, or call the church to be added to the list.
            </p>
            <a href="tel:+13036593818" className="inline-block mt-6 text-gold-light font-semibold text-lg">
              (303) 659-3818
            </a>
          </div>

          <div className="bg-warm-white rounded-2xl p-10 border border-cream-dark">
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">Thank You, Men</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-4">Man Camp 9</h2>
            <p className="text-lg text-text-body leading-relaxed mb-5">
              Thank you to every man who came to Silver State Baptist Camp this September, and to
              Evangelist Paul Schwanke for preaching the Word under the theme &ldquo;Faithful to the
              Last Amen.&rdquo;
            </p>
            <blockquote className="font-serif italic text-lg text-text-body border-l-4 border-gold pl-5">
              &ldquo;Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in
              the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord.&rdquo;
              <span className="block not-italic text-sm text-gold-dark mt-2">1 Corinthians 15:58</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* What is Man Camp */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-6">What Is Man Camp?</h2>
          <p className="text-xl text-text-body leading-relaxed">
            Man Camp is three days out in God&rsquo;s creation, away from the noise and the daily
            grind. There is bold preaching, real fellowship, and iron sharpening iron. It is a weekend
            built to strengthen you as a man of God: standing firm, leading your home well, and
            staying faithful to the last amen.
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group block bg-warm-white rounded-2xl p-8 border border-cream-dark hover:border-gold hover:shadow-lg transition-all"
            >
              <h3 className="font-serif text-2xl font-bold text-text-dark group-hover:text-brown-light">{q.title}</h3>
              <p className="text-lg text-text-body mt-2 leading-relaxed">{q.text}</p>
              <span className="inline-block mt-4 text-sm font-bold uppercase tracking-wide text-gold-dark">
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
