import AnimateOnScroll from "./AnimateOnScroll";

const groups = [
  {
    when: "Sunday Mornings",
    title: "Bible Classes",
    body:
      "Bible classes for every age, from toddlers through adults — each thoughtfully prepared to help families grow together in their faith.",
  },
  {
    when: "Thursdays • 7:00 PM",
    title: "Master Club",
    leader: "Led by Mr. Ken Gebhart",
    body:
      "A well-structured children's ministry that helps kids learn to love and serve the Lord, using the King James Bible for memory and application.",
    clubs: [
      "Beginners Club — K4 & K5",
      "Primaries Club — 1st–3rd Grade",
      "Ambassadors Club — 4th–6th Grade",
    ],
  },
  {
    when: "Sundays 10:45 AM & Thursdays 7:00 PM",
    title: "Youth Group",
    body:
      "Grades 6–12 gather for Family Bible Time on Sunday mornings and Teen Time on Thursday evenings — singing, preaching, and fellowship built for teens.",
  },
  {
    when: "Throughout the Week",
    title: "Adult Ministries",
    body:
      "Bible classes, ladies' fellowships, men's retreats, prayer meetings, church fellowships, get-togethers, activities, and much more — plenty of ways to connect and grow.",
  },
];

export default function StudyGroups() {
  return (
    <section id="study-groups" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
              Study Groups
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              Grow Together in <em className="text-brown-light italic">God&rsquo;s Word</em>
            </h2>
            <p className="text-text-body mt-3 max-w-2xl mx-auto">
              There&rsquo;s a place to study the Scriptures for every age and every season of life.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <AnimateOnScroll key={g.title} delay={i * 100}>
              <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-cream-dark bg-cream shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                {/* Schedule header strip */}
                <div className="flex items-center gap-2.5 bg-brown-deep px-7 py-4">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.59 3.7 3.7-1.41 1.42L11 13V7h2z" />
                  </svg>
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-gold-light">
                    {g.when}
                  </p>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-grow p-7">
                  <h3 className="font-serif text-2xl font-semibold text-text-dark leading-tight">
                    {g.title}
                  </h3>
                  {g.leader && (
                    <p className="text-sm font-semibold text-brown-light mt-1.5">{g.leader}</p>
                  )}
                  <p className="text-text-body leading-relaxed mt-4">{g.body}</p>

                  {g.clubs && (
                    <ul className="mt-5 space-y-2.5">
                      {g.clubs.map((c) => (
                        <li
                          key={c}
                          className="flex items-center gap-3 text-sm font-medium text-text-dark"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
