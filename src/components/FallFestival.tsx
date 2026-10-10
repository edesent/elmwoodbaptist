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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/events/church-fall-festival-at-twilight.png"
                alt="Master Clubs Fall Festival, Thursday, October 29 at 7:00 PM, Elmwood Baptist Church. Puppet show, pizza, games, and candy prizes."
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
                Master Clubs Fall Festival
              </h2>
              <p className="text-white/70 mb-7">
                Calling all Master Clubbers! Join us for a fun night of fall
                fellowship with a puppet show, pizza, games, and candy prizes.
                Costumes are welcome, but please make sure they are church
                appropriate. This event is just for our Master Clubbers.
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
