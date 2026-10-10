import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import { weeklyEvents, ministryEvents, type ChurchEvent } from "@/lib/events";

export const metadata: Metadata = {
  title: "Church Calendar",
  description:
    "Service times, weekly gatherings, outreach ministries, and upcoming events at Elmwood Baptist Church in Brighton, Colorado.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Church Calendar | Elmwood Baptist Church",
    description: "Weekly gatherings, ministries, and events at Elmwood Baptist Church.",
    url: "/events",
    type: "website",
  },
};

// To show a live Google Calendar instead of (or above) the lists, paste the
// calendar's embed src here, e.g.
//   "https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=America%2FDenver"
// Leave it "" to show the schedule lists below.
const GCAL_EMBED_SRC =
  "https://calendar.google.com/calendar/embed?src=elmwoodbaptist.org_iue19g4ehl6nrbg4563b1j6q7k%40group.calendar.google.com&ctz=America%2FDenver&mode=MONTH&showTitle=0&showPrint=0&showCalendars=0&showTz=0";

function EventList({ items }: { items: ChurchEvent[] }) {
  return (
    <div className="divide-y divide-cream-dark border-y border-cream-dark">
      {items.map((e) => (
        <div key={e.title} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-5">
          <p className="sm:w-60 flex-shrink-0 text-xs font-bold tracking-[0.16em] uppercase text-gold-dark">
            {e.when}
          </p>
          <div className="sm:flex-grow">
            <h3 className="font-serif text-xl font-semibold text-text-dark leading-tight">
              {e.title}
            </h3>
            {e.detail && <p className="text-sm text-text-body mt-0.5">{e.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="Calendar"
          title="Church Calendar"
          subtitle="The rhythm of life together at Elmwood Baptist Church"
        />

        <section className="py-24 bg-warm-white">
          <div className="max-w-5xl mx-auto px-6">
            {GCAL_EMBED_SRC ? (
              <div className="rounded-2xl border border-cream-dark shadow-sm overflow-hidden bg-white mb-16">
                <iframe
                  title="Elmwood Baptist Church Calendar"
                  src={GCAL_EMBED_SRC}
                  className="w-full h-[700px] border-0"
                  loading="lazy"
                />
              </div>
            ) : null}

            <h2 className="font-serif text-3xl font-bold text-text-dark mb-8">
              Weekly Gatherings
            </h2>
            <EventList items={weeklyEvents} />

            <h2 className="font-serif text-3xl font-bold text-text-dark mt-16 mb-8">
              Outreach &amp; Ministries
            </h2>
            <EventList items={ministryEvents} />

            {/* Featured — Youth Rally */}
            <div className="mt-16 rounded-2xl border border-cream-dark overflow-hidden bg-cream">
              <div className="grid md:grid-cols-2 items-center">
                <div className="bg-white p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/events/patriotic-youth-rally-at-sunset.png"
                    alt="Youth Rally, Friday, October 16, 2026 at Elmwood Baptist Church. Stand strong, live free, follow Christ."
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
                    Special Event
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-text-dark leading-tight mb-3">
                    Youth Rally
                  </h3>
                  <p className="text-xs font-bold tracking-[0.16em] uppercase text-brown-light mb-2">
                    Friday, October 16 · 7:00 to 9:30 PM
                  </p>
                  <p className="text-text-body leading-relaxed mb-3">
                    Stand strong. Live free. Follow Christ. Bring your teens and their
                    friends for a night of powerful preaching from John 8 and Romans 8,
                    games, fellowship, and plenty of food. Come ready, leave changed!
                  </p>
                  <p className="font-serif italic text-text-dark leading-relaxed">
                    &ldquo;Stand fast therefore in the liberty wherewith Christ hath made
                    us free, and be not entangled again with the yoke of bondage.&rdquo;
                    <span className="block not-italic font-sans text-xs font-bold tracking-[0.16em] uppercase text-gold-dark mt-1">
                      Galatians 5:1
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Featured — Master Clubs Fall Festival */}
            <div className="mt-8 rounded-2xl border border-cream-dark overflow-hidden bg-cream">
              <div className="grid md:grid-cols-2 items-center">
                <div className="bg-white p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/events/church-fall-festival-at-twilight.png"
                    alt="Master Clubs Fall Festival, Thursday, October 29 at 7:00 PM, Elmwood Baptist Church. Puppet show, pizza, games, and candy prizes."
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
                    Special Event
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-text-dark leading-tight mb-3">
                    Master Clubs Fall Festival
                  </h3>
                  <p className="text-xs font-bold tracking-[0.16em] uppercase text-brown-light mb-2">
                    Thursday, October 29 · 7:00 PM
                  </p>
                  <p className="text-text-body leading-relaxed">
                    Bring the whole family for a fun night of fall fellowship! We&rsquo;ll
                    have a puppet show, pizza, games, and candy prizes for the kids.
                    Costumes are welcome, but please make sure they are church
                    appropriate. Everyone is invited!
                  </p>
                </div>
              </div>
            </div>

            {/* Featured — Praise and Pie Testimony Time */}
            <div className="mt-8 rounded-2xl border border-cream-dark overflow-hidden bg-cream">
              <div className="grid md:grid-cols-2 items-center">
                <div className="bg-white p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/events/praise-and-pie.png"
                    alt="Praise and Pie Testimony Time, Sunday, November 22 at 12:30 PM, Elmwood Baptist Church"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
                    Special Event
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-text-dark leading-tight mb-3">
                    Praise and Pie Testimony Time
                  </h3>
                  <p className="text-xs font-bold tracking-[0.16em] uppercase text-brown-light mb-2">
                    Sunday, November 22 · 12:30 PM
                  </p>
                  <p className="text-text-body leading-relaxed">
                    The church is providing the pie, and you bring the praise! Come
                    ready to share how God has been good to you throughout this year,
                    and be encouraged as your church family does the same. Everyone
                    is welcome!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-cream rounded-2xl border border-cream-dark text-center">
              <h3 className="font-serif text-2xl font-bold text-text-dark mb-3">
                Special Events &amp; Announcements
              </h3>
              <p className="text-text-body leading-relaxed mb-6 max-w-2xl mx-auto">
                Retreats, fellowships, baby showers, holiday services, and other special events are
                announced from the pulpit and on our Facebook page. Follow along so you never miss
                what&rsquo;s happening in the church family — and call the office anytime for the
                most current calendar.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://facebook.com/elmwoodbaptistbrighton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  Follow on Facebook
                </a>
                <a
                  href="tel:+13036593818"
                  className="inline-block text-brown-light font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light/40 hover:border-brown-light transition-all"
                >
                  Call (303) 659-3818
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
