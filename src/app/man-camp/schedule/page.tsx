import type { Metadata } from "next";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";
import PdfPopupLink from "@/components/PdfPopupLink";
import { MountainRidge } from "@/components/mancamp/Outdoor";

export const metadata: Metadata = {
  title: "Schedule",
  description: "What a weekend at Man Camp looks like, from arrival to departure.",
  alternates: { canonical: "/man-camp/schedule" },
};

// Each schedule item can have a time (optional) and a description.
// Items are sorted into Morning, Afternoon, and Evening automatically by their time:
//   Morning = before 12:00 PM, Afternoon = 12:00 PM to 4:59 PM, Evening = 5:00 PM and later.
type ScheduleItem = { time?: string; text: string };

// Set sections to false for a day that should show as one open list (no Morning/Afternoon/Evening).
const days: { day: string; sections?: boolean; items: ScheduleItem[] }[] = [
  {
    day: "Thursday",
    sections: false,
    items: [
      { time: "4:00 PM", text: "Arrive at camp, check in, get settled, and explore the grounds" },
      { time: "5:30 PM", text: "Opening BBQ fellowship begins" },
      { time: "6:00 PM", text: "BBQ dinner served" },
      { time: "7:00 PM", text: "Opening session with Evangelist Paul Schwanke" },
      { time: "8:30 PM", text: "After evening fellowship: fire pits, snacks, and coffee" },
    ],
  },
  {
    day: "Friday",
    items: [
      { time: "7:00 AM", text: "Wake up" },
      { time: "7:30 AM", text: "Personal time with God" },
      { time: "8:00 AM", text: "National Anthem" },
      { time: "8:15 AM", text: "Breakfast" },
      { time: "9:00 AM", text: "Morning session with Evangelist Paul Schwanke" },
      { time: "10:30 AM", text: "Break and transition" },
      { time: "11:00 AM", text: "Prayer partner session" },
      { time: "12:30 PM", text: "Lunch" },
      { time: "1:30 PM", text: "5-Man Competition" },
      { time: "4:30 PM", text: "Return, rest, clean up, and free time" },
      { time: "5:30 PM", text: "Dinner" },
      { time: "7:00 PM", text: "Founder’s Night with Pastor Joshua Lehman" },
      { time: "8:30 PM", text: "Fire pits, snacks, coffee, and fellowship" },
    ],
  },
  {
    day: "Saturday",
    items: [
      { time: "5:00 AM", text: "Angel’s Head Lookout hike departs" },
      { time: "7:00 AM", text: "Wake up for everyone else" },
      { time: "7:30 AM", text: "Personal time with God" },
      { time: "8:00 AM", text: "National Anthem" },
      { time: "8:15 AM", text: "Breakfast" },
      { time: "9:00 AM", text: "Free time or Dan Musgrave presentation" },
      { time: "10:00 AM", text: "Closing session with Evangelist Paul Schwanke" },
      { time: "11:30 AM", text: "Giveaways and announcements" },
      { time: "12:30 PM", text: "Sack lunch and head home" },
    ],
  },
];

type PartOfDay = "Morning" | "Afternoon" | "Evening";
const PARTS: PartOfDay[] = ["Morning", "Afternoon", "Evening"];

function partOfDay(time?: string): PartOfDay {
  const m = time?.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return "Morning";
  let hour = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === "PM") hour += 12;
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function groupByPartOfDay(items: ScheduleItem[]) {
  return PARTS.map((part) => ({ part, items: items.filter((item) => partOfDay(item.time) === part) })).filter(
    (group) => group.items.length > 0,
  );
}

function ScheduleRow({ item }: { item: ScheduleItem }) {
  return (
    <li className="flex gap-3 text-lg">
      <span className="text-ember font-bold">&#9650;</span>
      <span>
        {item.time && (
          <span className="block font-display text-base font-semibold tracking-[0.12em] uppercase text-ember">
            {item.time}
          </span>
        )}
        {item.text}
      </span>
    </li>
  );
}

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
            Here is the full schedule for the Man Camp 10 weekend. Tap Morning, Afternoon, or Evening
            to open or close that part of the day.
          </p>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {days.map((d, i) => (
              <div key={d.day} className="bg-canvas rounded-sm border-2 border-bark/15 shadow-md overflow-hidden">
                <div className="bg-pine px-8 py-5 flex items-baseline justify-between">
                  <h2 className="font-display text-3xl font-bold uppercase tracking-[0.08em] text-parchment">{d.day}</h2>
                  <span className="font-display text-sm tracking-[0.25em] uppercase text-ember-light">Day {i + 1}</span>
                </div>
                {d.sections === false ? (
                  <ul className="space-y-4 p-8">
                    {d.items.map((item) => (
                      <ScheduleRow key={item.text} item={item} />
                    ))}
                  </ul>
                ) : (
                  <div className="p-5 space-y-4">
                    {groupByPartOfDay(d.items).map((group) => (
                      <details
                        key={group.part}
                        name={`schedule-${d.day}`}
                        className="group rounded-sm border-2 border-bark/15 bg-parchment/50"
                      >
                        <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 select-none hover:bg-parchment [&::-webkit-details-marker]:hidden">
                          <span className="font-display text-xl font-bold uppercase tracking-[0.12em] text-bark">
                            {group.part}
                          </span>
                          <span
                            className="text-ember text-base transition-transform duration-200 group-open:rotate-180"
                            aria-hidden="true"
                          >
                            &#9660;
                          </span>
                        </summary>
                        <ul className="space-y-4 px-5 pb-5 pt-1">
                          {group.items.map((item) => (
                            <ScheduleRow key={item.text} item={item} />
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                )}
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
              On Saturday morning, men have the option to hike to Angel&rsquo;s Head Lookout, a historic
              fire tower in the Rampart Range with sweeping views of the Front Range. The hike departs
              at 5:00 AM.
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
