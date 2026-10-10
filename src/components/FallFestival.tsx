import AnimateOnScroll from "./AnimateOnScroll";

const facts = [
  { label: "When", value: "Thursday, October 29 · 7:00 PM" },
  { label: "Fun", value: "Puppet show, pizza, games, and candy prizes" },
  { label: "Costumes", value: "Welcome, but must be church appropriate" },
];

export default function FallFestival() {
  return (
    <section id="fall-festival" className="py-28 bg-brown-deep overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-3 max-w-md mx-auto">
              <div className="rounded-lg bg-cream border border-cream-dark px-8 py-16 text-center">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-dark mb-4">
                  Master Clubs
                </p>
                <p className="font-serif text-5xl md:text-6xl font-bold text-text-dark leading-none">
                  Fall
                </p>
                <p className="font-serif text-5xl md:text-6xl font-bold text-text-dark leading-none mb-8">
                  Festival
                </p>
                <div className="inline-block border-y-2 border-gold-dark/40 py-4 px-6">
                  <p className="text-sm font-bold tracking-[0.2em] uppercase text-brown-light">
                    Thursday
                  </p>
                  <p className="font-serif text-4xl font-bold text-text-dark leading-tight">
                    October 29
                  </p>
                  <p className="text-sm font-bold tracking-[0.2em] uppercase text-brown-light">
                    7:00 PM
                  </p>
                </div>
                <p className="mt-8 text-text-body font-medium">
                  Puppet Show · Pizza · Games · Candy Prizes
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-light mb-3">
                Special Event
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                Master Clubs Fall Festival
              </h2>
              <p className="text-white/70 mb-7">
                Bring the whole family for a fun night of fall fellowship! We&rsquo;ll
                have a puppet show, pizza, games, and candy prizes for the kids.
                Costumes are welcome, but please make sure they are church
                appropriate. Everyone is invited!
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
                  &ldquo;This is the day which the LORD hath made; we will rejoice and
                  be glad in it.&rdquo;
                </p>
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-gold-light/80 mt-2">
                  Psalm 118:24
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
