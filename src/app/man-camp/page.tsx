import type { Metadata } from "next";
import Link from "next/link";
import { MountainRidge, PineMark } from "@/components/mancamp/Outdoor";
import CampMap from "@/components/mancamp/CampMap";
import Countdown from "@/components/mancamp/Countdown";
import { LOGO_LIGHT, CAMP_DATES, CAMP_PLACE } from "@/components/mancamp/brand";

export const metadata: Metadata = {
  title: { absolute: "Man Camp 10 | Elmwood Baptist Church" },
  description:
    "Man Camp 10, celebrating ten years of forging faithful men for God's glory. September 23\u201325, 2027 at Silver State Baptist Youth Camp in Sedalia, Colorado. A ministry of Elmwood Baptist Church.",
  alternates: { canonical: "/man-camp" },
  openGraph: {
    title: "Man Camp 10 | Elmwood Baptist Church",
    description: "Celebrating ten years of forging faithful men for God's glory. September 23\u201325, 2027.",
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

// The red diamond from the Man Camp logo, with a number inside.
function Diamond({ label, className = "" }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 380 150" className={className} role="img" aria-label={`Man Camp ${label}`}>
      <polygon points="190,0 380,75 190,150 0,75" fill="var(--color-ember)" />
      <text
        x="190"
        y="104"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="84"
        fill="#ffffff"
      >
        {label}
      </text>
    </svg>
  );
}

export default function ManCampHome() {
  return (
    <>
      {/* Hero */}
      <header className="relative bg-pine overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: `url("${HERO_PHOTO}")` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-pine/55 via-pine/65 to-pine" />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
          <p className="font-display text-base md:text-xl tracking-[0.4em] uppercase text-ember-light mb-6">
            &#9670; Celebrating 10 Years &#9670;
          </p>

          {LOGO_LIGHT ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={LOGO_LIGHT}
              alt="Man Camp 10: Forging Faithful Men for God's Glory, 1 Peter 1:7"
              className="w-full max-w-2xl mx-auto h-auto drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]"
            />
          ) : (
            <>
              <h1 className="font-display text-7xl md:text-9xl font-bold text-parchment uppercase tracking-[0.04em] leading-none">
                Man Camp
              </h1>
              <Diamond label="10" className="w-56 md:w-72 mx-auto mt-4" />
              <p className="font-display text-lg md:text-2xl tracking-[0.2em] uppercase text-parchment mt-4">
                Forging Faithful Men for God&rsquo;s Glory
              </p>
            </>
          )}

          <div className="mt-10">
            <p className="font-display text-3xl md:text-5xl font-bold uppercase tracking-[0.06em] text-parchment">
              {CAMP_DATES}
            </p>
            <p className="font-display text-base md:text-xl uppercase tracking-[0.15em] text-canvas mt-2">{CAMP_PLACE}</p>
          </div>

          <div className="mt-10">
            <Countdown />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/man-camp/register" className={`${btn} bg-ember border-ember text-parchment hover:bg-ember-light hover:border-ember-light`}>
              Registration Info
            </Link>
            <Link href="/man-camp/schedule" className={`${btn} border-parchment/70 text-parchment hover:border-ember-light hover:text-ember-light`}>
              The Weekend
            </Link>
          </div>
        </div>
        <MountainRidge className="relative text-parchment" />
      </header>

      {/* Ten years */}
      <section className="py-20 bg-parchment mc-topo">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 text-center">
            <p className="font-display text-[9rem] md:text-[12rem] font-bold leading-none text-ember drop-shadow-sm">10</p>
            <p className="font-display text-3xl font-bold uppercase tracking-[0.3em] text-bark -mt-2">Years</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="h-0.5 w-12 bg-bark/40" />
              <PineMark className="w-7 h-7 text-moss" />
              <span className="h-0.5 w-12 bg-bark/40" />
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="font-display text-base tracking-[0.3em] uppercase text-moss mb-3">A Decade on the Mountain</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-bark leading-tight mb-5">
              Ten Years of Forging Faithful Men
            </h2>
            <p className="text-xl leading-relaxed mb-6">
              For ten years, men of Elmwood Baptist Church have headed up the mountain to sit under
              the preaching of God&rsquo;s Word, sharpen one another, and come home stronger. Man Camp 10
              is our celebration of all God has done, and we want every man there.
            </p>
            <blockquote className="bg-canvas border-l-8 border-ember rounded-sm p-6 shadow-sm">
              <p className="italic text-xl text-bark leading-relaxed">
                &ldquo;That the trial of your faith, being much more precious than of gold that
                perisheth, though it be tried with fire, might be found unto praise and honour and
                glory at the appearing of Jesus Christ&rdquo;
              </p>
              <span className="block font-display text-base tracking-[0.25em] uppercase text-ember mt-3">1 Peter 1:7</span>
            </blockquote>
            <p className="text-lg mt-6">
              Thank you to every man who came to Man Camp 9 this September, and to Evangelist Paul
              Schwanke for preaching the Word.
            </p>
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
                <PineMark className="w-10 h-10 text-ember-light mx-auto mb-4" />
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
