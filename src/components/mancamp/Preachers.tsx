import Link from "next/link";

// The Man Camp preachers. Update names, titles, photos, and bios here and both the
// home page section and the Preachers page update together.
//   photo:    web address of the preacher's photo (leave out to show his initials)
//   shortBio: two to four sentences shown on the home page
//   bio:      the full bio on the Preachers page, one entry per paragraph
//   homeFit:  "whole" shows the entire photo on the home page instead of cropping it
//             (good for photos with a plain white background)
export type Preacher = {
  name: string;
  title: string;
  role: string;
  photo?: string;
  homeFit?: "crop" | "whole";
  shortBio?: string;
  bio?: string[];
};

export const PREACHERS: Preacher[] = [
  {
    name: "Paul Schwanke",
    title: "Evangelist",
    role: "Main Preacher",
    photo: "/mancamp/preachers/evangleist-paul-schwanke.jpg",
    homeFit: "whole",
  },
  {
    name: "Josh Lehman",
    title: "Pastor",
    role: "Founder of Man Camp",
    photo: "/mancamp/preachers/pastor-j-lehman.jpeg",
  },
];

const COMING_SOON = "A full introduction is coming soon.";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function PreacherPhoto({ preacher, className = "" }: { preacher: Preacher; className?: string }) {
  if (preacher.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={preacher.photo}
        alt={`${preacher.title} ${preacher.name}`}
        className={`object-cover object-top ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex items-center justify-center bg-pine text-parchment font-display font-bold tracking-[0.08em] ${className}`}
      aria-hidden="true"
    >
      <span className="text-6xl">{initials(preacher.name)}</span>
    </div>
  );
}

// Home page section: both preachers side by side with a short bio.
export function PreachersSection() {
  return (
    <section id="preachers" className="py-20 bg-parchment mc-topo border-t-2 border-bark/10 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-display text-base tracking-[0.3em] uppercase text-moss mb-3">Preaching the Word</p>
          <h2 className="font-display text-5xl font-bold uppercase text-bark">The Preachers</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {PREACHERS.map((p) => (
            <div
              key={p.name}
              className="bg-canvas rounded-sm border-2 border-bark/15 shadow-md overflow-hidden flex flex-col"
            >
              <PreacherPhoto preacher={p} className="w-full aspect-[4/3]" />
              <div className="p-8 flex flex-col flex-1">
                <p className="font-display text-sm tracking-[0.25em] uppercase text-ember mb-1">{p.role}</p>
                <h3 className="font-display text-3xl font-bold uppercase tracking-[0.04em] text-bark">
                  {p.title} {p.name}
                </h3>
                <p className="text-lg leading-relaxed mt-4 flex-1">{p.shortBio ?? COMING_SOON}</p>
                <Link
                  href="/man-camp/preachers"
                  className="inline-block mt-6 font-display text-base uppercase tracking-[0.2em] text-ember hover:text-pine"
                >
                  Meet the Preachers &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Preachers page: each preacher with his photo and full bio.
export function PreachersFull() {
  return (
    <div className="space-y-16">
      {PREACHERS.map((p, i) => (
        <article key={p.name} className="grid md:grid-cols-5 gap-10 items-start">
          <div className={`md:col-span-2 ${i % 2 === 1 ? "md:order-2" : ""}`}>
            <PreacherPhoto
              preacher={p}
              className="w-full aspect-[4/5] rounded-sm shadow-xl border-4 border-canvas"
            />
          </div>
          <div className={`md:col-span-3 ${i % 2 === 1 ? "md:order-1" : ""}`}>
            <p className="font-display text-base tracking-[0.3em] uppercase text-ember mb-2">{p.role}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-bark mb-6">
              {p.title} {p.name}
            </h2>
            {(p.bio && p.bio.length > 0 ? p.bio : [p.shortBio ?? COMING_SOON]).map((para) => (
              <p key={para} className="text-xl leading-relaxed mb-5">
                {para}
              </p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
