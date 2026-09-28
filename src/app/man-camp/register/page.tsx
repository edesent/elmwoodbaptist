import type { Metadata } from "next";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";

export const metadata: Metadata = {
  title: "Register",
  description: "Room options, pricing, and how to register for Man Camp.",
  alternates: { canonical: "/man-camp/register" },
};

const rooms = [
  { name: "Bunkhouse", price: "$125", note: "Early rate · $150 regular rate", featured: true },
  { name: "Semi-Private Double", price: "$175", note: "Evalena House" },
  { name: "Private Room", price: "$200", note: "Allenhouse" },
];

export default function RegisterPage() {
  return (
    <>
      <ManCampPageHero
        eyebrow="Man Camp 10"
        title="Registration"
        subtitle="Registration for Man Camp 10 is not open yet. Here is what to expect when it does."
      />

      <section className="py-20 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark">Room Options</h2>
            <p className="text-lg text-text-body mt-4 max-w-2xl mx-auto">
              These were the rates for Man Camp 9 and are shown for reference. Pricing for next year
              will be posted when registration opens.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {rooms.map((r) => (
              <div
                key={r.name}
                className={`p-8 rounded-2xl border text-center ${
                  r.featured ? "bg-brown-deep border-brown-deep text-white shadow-xl" : "bg-cream border-cream-dark"
                }`}
              >
                <h3 className={`font-serif text-2xl font-semibold mb-2 ${r.featured ? "text-white" : "text-text-dark"}`}>
                  {r.name}
                </h3>
                <p className={`font-serif text-4xl font-bold mb-2 ${r.featured ? "text-gold-light" : "text-brown-light"}`}>
                  {r.price}
                </p>
                <p className={`text-base ${r.featured ? "text-white/75" : "text-text-light"}`}>{r.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-cream rounded-2xl p-8 border border-cream-dark max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-text-dark mb-4">Good to Know</h3>
            <ul className="space-y-3 text-lg text-text-body">
              <li>Registering early has saved men 20% on bunkhouse rates.</li>
              <li>Payments may be split into more than one payment.</li>
              <li>Private and semi-private rooms fill up first, so register early if you want one.</li>
            </ul>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-text-body mb-4">Want to hear as soon as registration opens?</p>
            <a
              href="tel:+13036593818"
              className="inline-block bg-gold text-brown-deep font-semibold text-base tracking-wide uppercase px-9 py-4 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light transition-all"
            >
              Call (303) 659-3818
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
