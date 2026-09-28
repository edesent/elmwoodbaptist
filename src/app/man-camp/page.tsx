import type { Metadata } from "next";
import Link from "next/link";
import { MountainRidge, PineMark } from "@/components/mancamp/Outdoor";
import CampMap from "@/components/mancamp/CampMap";

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

const HERO_PHOTO =
  "https://o3hectmev11nr3rl.public.blob.vercel-storage.com/church-uploads/qB8IjNb83f0eVAWg8MbZ9V70mF-w25Yf/Man-Camp-%20Devils%20Head%20Lookout%20Trail-NpQs14uL4mzKp26s2ZTcJNCpko7600.jpg";

const pillars = [
  { title: "Bold Preaching", text: "Straight from the King James Bible, aimed right at the heart of a man." },
  { title: "Real Fellowship", text: "Men from every season of life, shoulder to shoulder around the fire." },
  { title: "God\u2019s Creation", text: "Mountain air, pine trees, and no noise but what matters." },
];

const quickLinks = [
  { href: "/man-camp/schedule", title: "Schedule", text: "What a weekend at Man Camp looks like." },
  { href: "/man-camp/register", title: "Register", text: "Rooms, pricing, and how to save your spot." },
  { href: "/man-camp/photos", title: "Photos", text: "The men, the mountains, and the fellowship." },
  { href: "/man-camp/faq", title: "FAQ", text: "Answers to the questions men ask most." },
];

const btn =
  "inline-block font-display text-lg font-semibold uppercase tracking-[0.15em] px-9 py-4 rounded-sm border-2 transition-colors";

export default function ManCampHome() {
  return (
    <>
      {/* Hero: title over the photo */}
      <header className="relative bg-pine overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url("${HERO_PHOTO}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine/30 via-pine/50 to-pine/95" />
        <div className="relative max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-12 text-center">
          <PineMark className="w-14 h-14 text-ember mx-auto mb-5" />
          <p className="font-display text-base md:text-lg tracking-[0.35em] uppercase text-ember-light mb-4">
            The Men&rsquo;s Retreat of Elmwood Baptist Church
          </p>
          <h1 className="font-display text-7xl md:text-9xl font-bold text-parchment uppercase tracking-[0.04em] leading-none">
            Man Camp
          </h1>
          <p className="text-2xl md:text-3xl text-canvas mt-6">
            Three days where men trade comfort for <span className="text-ember-light font-semibold">conviction.</span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/man-camp/register" className={`${btn} bg-ember border-ember text-parchment hover:bg-ember-light hover:border-ember-light hover:text-pine`}>
              Registration Info
            </Link>
            <Link href="/man-camp/photos" className={`${btn} border-parchment/70 text-parchment hover:border-ember-light hover:text-ember-light`}>
              See the Photos
            </Link>
          </div>
        </div>
        <MountainRidge className="relative text-parchment" />
      </header>

      {/* Save the date + recap */}
      <section className="py-20 bg-parchment mc-topo">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-pine text-canvas rounded-sm p-10 shadow-xl border-t-8 border-ember">
            <p className="font-display text-base tracking-[0.3em] uppercase text-ember-light mb-3">Save the Date</p>
            <h2 className="font-display text-5xl font-bold uppercase text-parchment mb-4">Man Camp 10</h2>
            <p className="font-display text-3xl uppercase tracking-[0.06em] text-ember-light">September 23&ndash;25, 2027</p>
            <p className="font-display text-lg uppercase tracking-[0.12em] text-parchment mt-2 mb-5">
              Silver State Baptist Youth Camp &middot; Sedalia, Colorado
            </p>
            <p className="text-lg leading-relaxed">
              Our tenth year is on the calendar. Speaker and registration details will be posted here
              as soon as they are set. Call the church to be the first to know.
            </p>
            <a href="tel:+13036593818" className="inline-block mt-6 font-display text-2xl tracking-[0.08em] text-ember-light">
              (303) 659-3818
            </a>
          </div>

          <div className="bg-canvas rounded-sm p-10 border-2 border-bark/20 shadow-md">
            <p className="font-display text-base tracking-[0.3em] uppercase text-moss mb-3">Thank You, Men</p>
            <h2 className="font-display text-5xl font-bold uppercase text-bark mb-4">Man Camp 9</h2>
            <p className="text-lg leading-relaxed mb-5">
              Thank you to every man who came to Silver State Baptist Camp this September, and to
              Evangelist Paul Schwanke for preaching the Word under the theme &ldquo;Faithful to the
              Last Amen.&rdquo;
            </p>
            <blockquote className="italic text-lg text-bark border-l-4 border-ember pl-5">
              &ldquo;Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in
              the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord.&rdquo;
              <span className="block not-italic font-display text-sm tracking-[0.2em] uppercase text-moss mt-2">
                1 Corinthians 15:58
              </span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* What is Man Camp */}
      <MountainRidge className="text-pine bg-parchment" />
      <section className="bg-pine text-canvas pb-20 pt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-display text-5xl font-bold uppercase tracking-[0.05em] text-parchment mb-6">
              What Is Man Camp?
            </h2>
            <p className="text-xl leading-relaxed">
              Three days out in God&rsquo;s creation, away from the noise and the daily grind. It is a
              weekend built to strengthen you as a man of God: standing firm, leading your home well,
              and staying faithful to the last amen.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="border-2 border-parchment/15 rounded-sm p-8 text-center bg-pine-light/60">
                <PineMark className="w-10 h-10 text-ember mx-auto mb-4" />
                <h3 className="font-display text-2xl font-semibold uppercase tracking-[0.1em] text-parchment mb-3">
                  {p.title}
                </h3>
                <p className="text-lg leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MountainRidge className="text-parchment bg-pine" />

      <CampMap />

      {/* Quick links */}
      <section className="pb-20 pt-4 bg-parchment mc-topo">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group block bg-canvas rounded-sm p-8 border-2 border-bark/15 hover:border-ember hover:shadow-lg transition-all"
            >
              <h3 className="font-display text-3xl font-bold uppercase text-bark group-hover:text-ember">{q.title}</h3>
              <p className="text-lg mt-2 leading-relaxed">{q.text}</p>
              <span className="inline-block mt-4 font-display text-base uppercase tracking-[0.2em] text-ember">
                Head out &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
