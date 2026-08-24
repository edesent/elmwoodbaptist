import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PdfPopupLink from "@/components/PdfPopupLink";

export const metadata: Metadata = {
  title: "Man Camp 2026",
  description:
    "Man Camp 2026 — the 9th annual men's retreat of Elmwood Baptist Church. September 24–26 at Silver State Baptist Camp, Sedalia, CO, with Evangelist Paul Schwanke. Theme: Faithful to the Last Amen.",
  alternates: { canonical: "/man-camp" },
  openGraph: {
    title: "Man Camp 2026 | Elmwood Baptist Church",
    description: "Three days where men trade comfort for conviction. September 24–26, 2026.",
    url: "/man-camp",
    type: "website",
    images: ["/mancamp/man-camp-webiste.jpg"],
  },
};

const REGISTER_URL = "https://tithe.ly/event-registration/#/10622758";

const pricing = [
  {
    name: "Bunkhouse",
    price: "$125",
    note: "before April 15 · $150 before Sept 10",
    featured: true,
  },
  { name: "Semi-Private Double", price: "$175", note: "Evalena house" },
  { name: "Private Room", price: "$200", note: "Allenhouse" },
];

const details = [
  { label: "Dates", value: "September 24–26, 2026" },
  { label: "Schedule", value: "Arrive Thursday 4:00 PM · Depart Saturday 2:00 PM" },
  { label: "Location", value: "Silver State Baptist Camp · Sedalia, Colorado" },
  { label: "Speaker", value: "Evangelist Paul Schwanke" },
];

function RegisterButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all ${className}`}
    >
      Register for Man Camp
    </a>
  );
}

export default function ManCampPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero with the banner */}
        <header className="relative pt-32 pb-16 bg-brown-deep overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(43,179,214,0.16),transparent_60%)]" />
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold-light mb-6">
              Men&rsquo;s Ministry · 9th Annual
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl mb-8 bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mancamp/man-camp-webiste.jpg" alt="Man Camp 9 — 2026" className="w-full h-auto rounded-lg" />
            </div>
            <p className="font-serif text-2xl md:text-3xl italic text-white">
              &ldquo;Faithful to the Last Amen&rdquo;
            </p>
            <p className="text-gold-light text-sm tracking-[0.15em] uppercase mt-3">
              1 Corinthians 15:58
            </p>
          </div>
        </header>

        {/* Intro + scripture */}
        <section className="py-20 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug mb-6">
              Three days where men trade comfort for <em className="text-brown-light italic">conviction.</em>
            </h1>
            <p className="text-lg text-text-body leading-relaxed mb-6">
              Man Camp is three days out in God&rsquo;s creation, away from the noise and the
              day-to-day grind — bold preaching, real fellowship, and iron sharpening iron. It&rsquo;s
              a weekend built to strengthen you as a man of God: standing firm, leading your home
              well, and staying faithful to the last amen.
            </p>
            <blockquote className="font-serif italic text-xl text-text-body border-l-4 border-gold pl-6 text-left max-w-2xl mx-auto">
              &ldquo;Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in
              the work of the Lord, forasmuch as ye know that your labour is not in vain in the
              Lord.&rdquo;
              <span className="block not-italic text-sm text-gold-dark mt-2">— 1 Corinthians 15:58</span>
            </blockquote>
          </div>
        </section>

        {/* Details + speaker */}
        <section className="py-20 bg-cream">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-6">The Details</h2>
              <dl className="space-y-4">
                {details.map((d) => (
                  <div key={d.label} className="flex flex-col sm:flex-row sm:gap-4 border-b border-cream-dark pb-4">
                    <dt className="sm:w-28 flex-shrink-0 text-xs font-bold tracking-[0.16em] uppercase text-gold-dark pt-1">
                      {d.label}
                    </dt>
                    <dd className="text-text-dark font-medium">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="text-center">
              <div className="w-56 h-56 mx-auto rounded-full overflow-hidden shadow-xl bg-brown-deep mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mancamp/speaker.png"
                  alt="Evangelist Paul Schwanke"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-text-dark">Evangelist Paul Schwanke</h3>
              <p className="text-gold-dark text-xs font-bold tracking-[0.15em] uppercase mt-1 mb-3">
                Guest Speaker
              </p>
              <p className="text-text-body leading-relaxed max-w-md mx-auto">
                A battle-tested soldier of the Gospel, Evangelist Schwanke will bring challenging,
                Christ-centered truths from God&rsquo;s Word throughout the weekend.
              </p>
            </div>
          </div>
        </section>

        {/* What to bring */}
        <section className="py-20 bg-cream">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Things to Know Before You Go
            </h2>
            <p className="text-text-body leading-relaxed mb-8">
              A packing list and a few important details about your stay at Silver State Baptist
              Camp — take a look before you head up the mountain.
            </p>
            <PdfPopupLink
              href="/mancamp/things-to-know-before-you-go.pdf"
              className="inline-block bg-brown-deep text-white font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-brown-deep hover:bg-brown-light hover:border-brown-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              View PDF
            </PdfPopupLink>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-warm-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark">Registration</h2>
              <p className="text-text-body mt-3 max-w-2xl mx-auto">
                Register before <strong>April 15</strong> to save 20% on bunkhouse rates. Payments
                may be split before July. This year both bunkhouse floors are open — with expanded
                space and additional bathrooms and showers.
              </p>
              <p className="inline-block mt-5 text-base sm:text-lg font-bold text-brown-deep bg-gold/20 border border-gold rounded-full px-6 py-2.5">
                Rooms are filling up fast — soon only bunkhouse spots will remain. Reserve yours today!
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {pricing.map((p) => (
                <div
                  key={p.name}
                  className={`p-8 rounded-2xl border text-center ${
                    p.featured
                      ? "bg-brown-deep border-brown-deep text-white shadow-xl"
                      : "bg-cream border-cream-dark"
                  }`}
                >
                  <h3 className={`font-serif text-xl font-semibold mb-2 ${p.featured ? "text-white" : "text-text-dark"}`}>
                    {p.name}
                  </h3>
                  <p className={`font-serif text-4xl font-bold mb-2 ${p.featured ? "text-gold-light" : "text-brown-light"}`}>
                    {p.price}
                  </p>
                  <p className={`text-sm ${p.featured ? "text-white/70" : "text-text-light"}`}>{p.note}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <RegisterButton />
              <p className="text-sm text-text-light mt-4">
                Questions? Call the church at{" "}
                <a href="tel:+13036593818" className="text-brown-light font-semibold">(303) 659-3818</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
