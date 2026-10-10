import AnimateOnScroll from "./AnimateOnScroll";

const facts = [
  { label: "When", value: "Friday, October 16 · 7:00 to 9:30 PM" },
  { label: "Chapters", value: "John 8 and Romans 8" },
  { label: "Expect", value: "Bible preaching, games and fellowship, food and fun" },
];

export default function YouthRally() {
  return (
    <section id="youth-rally" className="py-28 bg-brown-deep overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-3 max-w-md mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/events/patriotic-youth-rally-at-sunset.png"
                alt="Youth Rally, Friday, October 16, 2026 at Elmwood Baptist Church. Stand strong, live free, follow Christ."
                className="w-full h-auto rounded-lg"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-light mb-3">
                Special Event
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                Youth Rally
              </h2>
              <p className="text-white/70 mb-7">
                Stand strong. Live free. Follow Christ. Bring your teens and their
                friends for a night of powerful preaching, games, fellowship, and
                plenty of food. Come ready, leave changed!
              </p>

              <dl className="space-y-3 border-t border-white/10 pt-6">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="sm:w-28 flex-shrink-0 text-xs font-bold tracking-[0.16em] uppercase text-gold-light/80 pt-1">
                      {f.label}
                    </dt>
                    <dd className="text-white font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-serif text-xl italic text-white leading-relaxed">
                  &ldquo;Stand fast therefore in the liberty wherewith Christ hath made
                  us free, and be not entangled again with the yoke of bondage.&rdquo;
                </p>
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-gold-light/80 mt-2">
                  Galatians 5:1
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
