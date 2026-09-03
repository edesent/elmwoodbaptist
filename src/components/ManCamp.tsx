import AnimateOnScroll from "./AnimateOnScroll";

const REGISTER_URL = "https://tithe.ly/event-registration/#/10622758";

const facts = [
  { label: "Dates", value: "September 24–26, 2026" },
  { label: "Location", value: "Silver State Baptist Camp · Sedalia, CO" },
  { label: "Speaker", value: "Evangelist Paul Schwanke" },
];

export default function ManCamp() {
  return (
    <section id="man-camp" className="py-28 bg-brown-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mancamp/man-camp-webiste-2026.png"
                alt="Man Camp 9 — 2026"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-light mb-3">
                Men&rsquo;s Ministry · 9th Annual
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                Man Camp 2026
              </h2>
              <p className="font-serif text-xl italic text-gold-light mb-2">
                &ldquo;Faithful to the Last Amen&rdquo;
              </p>
              <p className="text-white/70 mb-7">
                Three days where men trade comfort for conviction — preaching, fellowship, and
                spiritual strengthening.
              </p>

              <dl className="space-y-3 mb-8 border-t border-white/10 pt-6">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="sm:w-28 flex-shrink-0 text-xs font-bold tracking-[0.16em] uppercase text-gold-light/80 pt-1">
                      {f.label}
                    </dt>
                    <dd className="text-white font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all text-center"
                >
                  Register Now
                </a>
                <a
                  href="/man-camp"
                  className="inline-block text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-white/40 hover:bg-white/10 hover:border-white transition-all text-center"
                >
                  Full Details
                </a>
              </div>

              <p className="text-gold-light text-base sm:text-lg font-bold mt-4">
                Rooms are going fast — soon only bunkhouse spots will be left.{" "}
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  Book your room now
                </a>
                .
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
