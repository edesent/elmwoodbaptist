import type { Metadata } from "next";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";
import PdfPopupLink from "@/components/PdfPopupLink";
import { MountainRidge } from "@/components/mancamp/Outdoor";

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

const btn =
  "inline-block font-display text-lg font-semibold uppercase tracking-[0.15em] px-9 py-4 rounded-sm border-2 border-ember bg-ember text-parchment hover:bg-pine hover:border-pine transition-colors";

export default function SchedulePage() {
  return (
    <>
      <ManCampPageHero
        eyebrow="Man Camp 10 &middot; September 23&ndash;25, 2027"
        title="The Weekend"
        subtitle="Thursday afternoon through Saturday afternoon at Silver State Baptist Youth Camp in Sedalia, Colorado."
      />

      <section className="py-16 bg-parchment mc-topo">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
            This is the general shape of the weekend, based on Man Camp 9. The full schedule for
            Man Camp 10 will be posted here once it is set.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {days.map((d, i) => (
              <div key={d.day} className="bg-canvas rounded-sm border-2 border-bark/15 shadow-md overflow-hidden">
                <div className="bg-pine px-8 py-5 flex items-baseline justify-between">
                  <h2 className="font-display text-3xl font-bold uppercase tracking-[0.08em] text-parchment">{d.day}</h2>
                  <span className="font-display text-sm tracking-[0.25em] uppercase text-ember-light">Day {i + 1}</span>
                </div>
                <ul className="space-y-3 p-8">
                  {d.items.map((item) => (
                    <li key={item} className="flex gap-3 text-lg">
                      <span className="text-ember font-bold">&#9650;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MountainRidge className="text-pine bg-parchment" />
      <section className="py-16 bg-pine text-canvas">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-sm overflow-hidden shadow-2xl border-4 border-canvas/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mancamp/devils-head-nice.jpg" alt="Angel's Head Lookout at sunset" className="w-full h-auto" />
          </div>
          <div>
            <p className="font-display text-base tracking-[0.3em] uppercase text-ember-light mb-3">Hit the Trail</p>
            <h2 className="font-display text-5xl font-bold uppercase text-parchment mb-5">The Hike</h2>
            <p className="text-lg leading-relaxed mb-6">
              At Man Camp 9, men had the option to hike to Angel&rsquo;s Head Lookout, a historic fire
              tower in the Rampart Range with sweeping views of the Front Range, in place of the annual
              competition.
            </p>
            <dl className="grid grid-cols-2 gap-4 mb-8">
              <div className="border-2 border-parchment/20 rounded-sm py-4 text-center">
                <dt className="font-display text-sm tracking-[0.2em] uppercase text-ember-light">Distance</dt>
                <dd className="font-display text-2xl text-parchment mt-1">2.9 mi round trip</dd>
              </div>
              <div className="border-2 border-parchment/20 rounded-sm py-4 text-center">
                <dt className="font-display text-sm tracking-[0.2em] uppercase text-ember-light">Climb</dt>
                <dd className="font-display text-2xl text-parchment mt-1">About 869 ft</dd>
              </div>
            </dl>
            <PdfPopupLink href="/mancamp/man-camp-devils-head-hike.pdf" className={btn}>
              View Hike Details (PDF)
            </PdfPopupLink>
          </div>
        </div>
      </section>
      <MountainRidge className="text-parchment bg-pine" />

      <section className="py-16 bg-parchment mc-topo">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-display text-base tracking-[0.3em] uppercase text-moss mb-3">Pack Your Gear</p>
          <h2 className="font-display text-5xl font-bold uppercase text-bark mb-4">Things to Know Before You Go</h2>
          <p className="text-lg leading-relaxed mb-8">
            A packing list and a few important details about your stay at Silver State Baptist Camp.
          </p>
          <PdfPopupLink href="/mancamp/things-to-know-before-you-go.pdf" className={btn}>
            View Packing List (PDF)
          </PdfPopupLink>
        </div>
      </section>
    </>
  );
}
