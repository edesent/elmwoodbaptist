import AnimateOnScroll from "./AnimateOnScroll";

const facts = [
  { label: "When", value: "Saturday, December 12 · 5:00 PM" },
  { label: "Where", value: "Meet at the church" },
  { label: "Who", value: "Everyone is welcome!" },
];

export default function FestivalOfLights() {
  return (
    <section id="festival-of-lights" className="py-28 bg-brown-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/events/brighton-festival-of-lights-parade.png"
                alt="Brighton Festival of Lights Christmas Parade, Saturday, December 12 at 5:00 PM"
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
                Festival of Lights
              </h2>
              <p className="text-white/70 mb-7">
                Join your church family for the Brighton Festival of Lights
                Christmas Parade! We will meet at the church and enjoy the
                lights of the season together.
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
                  &ldquo;I am the light of the world&rdquo;
                </p>
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-gold-light/80 mt-2">
                  John 8:12
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
