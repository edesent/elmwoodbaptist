import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Old West Sunday",
  description:
    "Old West Sunday at Elmwood Baptist Church in Brighton, Colorado — a special themed Sunday for the whole church family.",
  alternates: { canonical: "/old-west-sunday" },
  openGraph: {
    title: "Old West Sunday | Elmwood Baptist Church",
    description: "A special themed Sunday for the whole church family at Elmwood Baptist Church.",
    url: "/old-west-sunday",
    type: "website",
    images: ["/email/old-west-sunday-flyer.png"],
  },
};

// TODO: Replace placeholder date/time/location and description below once confirmed.
const details = [
  { label: "Date", value: "Coming soon" },
  { label: "Time", value: "10:00 AM Sunday Service" },
  { label: "Location", value: "Elmwood Baptist Church · Brighton, CO" },
];

export default function OldWestSundayPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero with the flyer */}
        <header className="relative pt-32 pb-16 bg-brown-deep overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,160,23,0.16),transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold-light mb-6">
              Special Event
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl mb-8 bg-white p-3 max-w-md mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/email/old-west-sunday-flyer.png"
                alt="Old West Sunday at Elmwood Baptist Church"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </header>

        {/* Intro */}
        <section className="py-20 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug mb-6">
              Saddle up for <em className="text-brown-light italic">Old West Sunday</em>
            </h1>
            <p className="text-lg text-text-body leading-relaxed">
              {/* TODO: Replace with real description once provided. */}
              Come dressed in your best western wear and join the Elmwood family for a special
              themed Sunday — details on the full schedule and activities are coming soon.
            </p>
          </div>
        </section>

        {/* Details */}
        <section className="py-20 bg-cream">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-serif text-3xl font-bold text-text-dark mb-6 text-center">
              The Details
            </h2>
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
        </section>

        {/* CTA */}
        <section className="py-16 bg-warm-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-text-body leading-relaxed mb-6">
              Bring a friend and come as you are — western hats and boots optional, but
              encouraged!
            </p>
            <a
              href="/visit-us"
              className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Plan Your Visit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
