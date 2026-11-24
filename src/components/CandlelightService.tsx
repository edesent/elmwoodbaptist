import AnimateOnScroll from "./AnimateOnScroll";

const facts = [
  { label: "When", value: "Friday, December 25 · 6:00 PM" },
  { label: "Where", value: "Elmwood Baptist Church" },
  { label: "Who", value: "Everyone is welcome!" },
];

export default function CandlelightService() {
  return (
    <section id="candlelight-service" className="py-28 bg-brown-deep overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll className="lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/events/christmas-candlelight-service.jpg"
                alt="Christmas Day Candlelight Service, Friday, December 25 at 6:00 PM, Elmwood Baptist Church"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150} className="lg:order-1">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-light mb-3">
                Special Event
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                Christmas Day Candlelight Service
              </h2>
              <p className="text-white/70 mb-7">
                Come and celebrate the birth of our Saviour! Join your church
                family on Christmas evening as we worship the newborn King
                together by candlelight.
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
                  &ldquo;For unto you is born this day in the city of David a
                  Saviour, which is Christ the Lord.&rdquo;
                </p>
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-gold-light/80 mt-2">
                  Luke 2:11
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
