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
  },
  {
    name: "Josh Lehman",
    title: "Pastor",
    role: "Founder of Man Camp",
    photo: "/mancamp/preachers/pastor-j-lehman.jpeg",
    shortBio:
      "Pastor Joshua Lehman started Man Camp while serving at Elmwood Baptist Church, and he returns for the tenth year to preach on Founder's Night. Today he is the senior pastor of Mount Vernon Baptist Temple in Howard, Ohio. He and his wife, Missy, have six children.",
    bio: [
      "Pastor Joshua Lehman was born and raised in the Denver area. Because of the faithful testimony of his mother, Brenda, he has been part of a local New Testament church his whole life. He trusted Christ as his Savior as a boy through the influence of his school principal, Tom Geer.",
      "After resisting God's call for a few years, Josh surrendered and publicly answered the call to pastor. He completed a bachelor's degree in business management at Metropolitan State College of Denver, went on to seminary at Crown College of the Bible, and studied the Word of God more deeply through Faith Bible Institute at Elmwood Baptist Church in Brighton.",
      "In July 2007, Josh joined the staff of Elmwood Baptist Church as an assistant pastor under Dr. Gary Randall. Over the years he ran the Christian school, led the children's ministries, handled the church's finances, and served faithfully wherever he was needed. It was during his years at Elmwood that he started Man Camp, a weekend for men that is now celebrating its tenth year.",
      "After about ten years as an assistant pastor, God began stirring his heart toward the senior pastorate. Following much prayer and fasting, he candidated at Mount Vernon Baptist Temple in Howard, Ohio. On October 11, 2020, in the middle of the COVID-19 pandemic, the church called him as its senior pastor.",
      "Josh and his wife, Missy, were married in 2002, just 14 months after they met. They have six children: Skyler, Makynza, Ayden, Ella, Benjamin, and Patience. Pastor Lehman is also the author of Building on the Rock: How to Build a Life that Stands Firm in Jesus Christ.",
    ],
  },
];

const COMING_SOON = "A full introduction is coming soon.";

// The anchor for each preacher on the Preachers page, e.g. "paul-schwanke".
export function preacherAnchor(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

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
              <PreacherPhoto
                preacher={p}
                className={`w-full aspect-[4/3] ${p.homeFit === "whole" ? "!object-contain !object-center bg-white" : ""}`}
              />
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
