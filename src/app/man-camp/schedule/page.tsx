import type { Metadata } from "next";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";
import PdfPopupLink from "@/components/PdfPopupLink";

export const metadata: Metadata = {
  title: "Schedule",
  description: "What a weekend at Man Camp looks like, from arrival to departure.",
  alternates: { canonical: "/man-camp/schedule" },
};

const days = [
  {
    day: "Thursday",
    items: ["Arrive at camp by 4:00 PM", "Settle into your room", "Evening preaching and fellowship"],
  },
  {
    day: "Friday",
    items: ["Preaching from God\u2019s Word", "The annual competition or the optional hike", "Fellowship with the men"],
  },
  {
    day: "Saturday",
    items: ["Final preaching session", "Depart camp by 2:00 PM"],
  },
];

export default function SchedulePage() {
  return (
    <>
      <ManCampPageHero
        eyebrow="Man Camp"
        title="The Weekend"
        subtitle="Thursday afternoon through Saturday afternoon at Silver State Baptist Camp in Sedalia, Colorado."
      />

      <section className="py-20 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-lg text-text-body mb-12 max-w-2xl mx-auto">
            This is the general shape of the weekend, based on Man Camp 9. The full schedule for
            Man Camp 10 will be posted here once it is set.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {days.map((d) => (
              <div key={d.day} className="bg-cream rounded-2xl p-8 border border-cream-dark">
                <h2 className="font-serif text-3xl font-bold text-text-dark mb-5">{d.day}</h2>
                <ul className="space-y-3">
                  {d.items.map((item) => (
                    <li key={item} className="flex gap-3 text-lg text-text-body">
                      <span className="text-gold-dark font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mancamp/devils-head-nice.jpg" alt="Angel's Head Lookout at sunset" className="w-full h-auto" />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-4">The Hike</h2>
            <p className="text-lg text-text-body leading-relaxed mb-6">
              At Man Camp 9, men had the option to hike to Angel&rsquo;s Head Lookout, a historic fire
              tower in the Rampart Range with sweeping views of the Front Range, in place of the annual
              competition. The hike is about 2.9 miles round trip with roughly 869 feet of elevation gain.
            </p>
            <PdfPopupLink
              href="/mancamp/man-camp-devils-head-hike.pdf"
              className="inline-block bg-brown-deep text-white font-semibold text-base tracking-wide uppercase px-9 py-4 rounded-full border-2 border-brown-deep hover:bg-brown-light hover:border-brown-light transition-all"
            >
              View Hike Details (PDF)
            </PdfPopupLink>
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-4">Things to Know Before You Go</h2>
          <p className="text-lg text-text-body leading-relaxed mb-8">
            A packing list and a few important details about your stay at Silver State Baptist Camp.
          </p>
          <PdfPopupLink
            href="/mancamp/things-to-know-before-you-go.pdf"
            className="inline-block bg-brown-deep text-white font-semibold text-base tracking-wide uppercase px-9 py-4 rounded-full border-2 border-brown-deep hover:bg-brown-light hover:border-brown-light transition-all"
          >
            View Packing List (PDF)
          </PdfPopupLink>
        </div>
      </section>
    </>
  );
}
