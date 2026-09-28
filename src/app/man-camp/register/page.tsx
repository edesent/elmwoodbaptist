import type { Metadata } from "next";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";
import { PineMark } from "@/components/mancamp/Outdoor";

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
        image="/mancamp/men.jpg"
      />

      <section className="py-16 bg-parchment mc-topo">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-display text-base tracking-[0.3em] uppercase text-moss mb-3">Pick Your Bunk</p>
            <h2 className="font-display text-5xl font-bold uppercase text-bark">Room Options</h2>
            <p className="text-lg mt-4 max-w-2xl mx-auto">
              These were the rates for Man Camp 9 and are shown for reference. Pricing for next year
              will be posted when registration opens.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {rooms.map((r) => (
              <div
                key={r.name}
                className={`p-8 rounded-sm text-center border-2 shadow-md ${
                  r.featured ? "bg-pine border-ember text-canvas" : "bg-canvas border-bark/15"
                }`}
              >
                <PineMark className={`w-8 h-8 mx-auto mb-3 ${r.featured ? "text-ember" : "text-moss"}`} />
                <h3 className={`font-display text-2xl font-semibold uppercase tracking-[0.08em] mb-2 ${r.featured ? "text-parchment" : "text-bark"}`}>
                  {r.name}
                </h3>
                <p className={`font-display text-5xl font-bold mb-2 ${r.featured ? "text-ember-light" : "text-ember"}`}>
                  {r.price}
                </p>
                <p className="text-base">{r.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-canvas rounded-sm p-8 border-2 border-bark/15 border-l-8 border-l-ember max-w-3xl mx-auto">
            <h3 className="font-display text-3xl font-bold uppercase text-bark mb-4">Good to Know</h3>
            <ul className="space-y-3 text-lg">
              <li>Registering early has saved men 20% on bunkhouse rates.</li>
              <li>Payments may be split into more than one payment.</li>
              <li>Private and semi-private rooms fill up first, so register early if you want one.</li>
            </ul>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg mb-4">Want to hear as soon as registration opens?</p>
            <a
              href="tel:+13036593818"
              className="inline-block font-display text-lg font-semibold uppercase tracking-[0.15em] px-9 py-4 rounded-sm border-2 border-ember bg-ember text-parchment hover:bg-pine hover:border-pine transition-colors"
            >
              Call (303) 659-3818
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
