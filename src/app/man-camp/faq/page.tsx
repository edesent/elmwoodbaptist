import type { Metadata } from "next";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Man Camp.",
  alternates: { canonical: "/man-camp/faq" },
};

const faqs = [
  {
    q: "What is Man Camp?",
    a: "Man Camp is the annual men\u2019s retreat of Elmwood Baptist Church. It is three days of bold preaching, real fellowship, and time in God\u2019s creation, built to strengthen men in their walk with God.",
  },
  {
    q: "Where is it held?",
    a: "Man Camp 9 was held at Silver State Baptist Camp in Sedalia, Colorado. The location for Man Camp 10 will be posted with the dates.",
  },
  {
    q: "When is Man Camp 10?",
    a: "Dates have not been announced yet. They will be posted on this site as soon as they are set.",
  },
  {
    q: "How much does it cost?",
    a: "Last year, bunkhouse beds were $125 with early registration or $150 regular, a semi-private double was $175, and a private room was $200. Pricing for next year will be posted when registration opens.",
  },
  {
    q: "Can I split my payment?",
    a: "Yes. Payments have been allowed to be split into more than one payment. Details will be listed when registration opens.",
  },
  {
    q: "Do I have to do the hike?",
    a: "No. The hike is completely optional. Men who would rather not hike can take part in the annual competition instead.",
  },
  {
    q: "What should I bring?",
    a: "Bring your Bible and see the packing list on the Schedule page for everything else you will need.",
  },
  {
    q: "Who do I call with questions?",
    a: "Call the church office at (303) 659-3818 and we will be glad to help.",
  },
];

export default function FaqPage() {
  return (
    <>
      <ManCampPageHero eyebrow="Man Camp" title="Questions & Answers" />

      <section className="py-16 bg-parchment mc-topo">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group bg-canvas rounded-sm border-2 border-bark/15 border-l-8 border-l-pine open:border-l-ember p-6 shadow-sm"
            >
              <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
                <span className="font-display text-2xl font-semibold uppercase tracking-[0.05em] text-bark">{f.q}</span>
                <span className="font-display text-ember text-4xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-lg leading-relaxed mt-4">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
