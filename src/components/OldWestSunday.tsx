import AnimateOnScroll from "./AnimateOnScroll";

// TODO: Replace placeholder date once confirmed.
const facts = [
  { label: "Date", value: "Coming soon" },
  { label: "Location", value: "Elmwood Baptist Church" },
];

export default function OldWestSunday() {
  return (
    <section id="old-west-sunday" className="py-28 bg-brown-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-3 max-w-md mx-auto lg:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/email/old-west-sunday-flyer.png"
                alt="Old West Sunday at Elmwood Baptist Church"
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
                Old West Sunday
              </h2>
              <p className="text-white/70 mb-7">
                Saddle up and join the Elmwood family for a special themed Sunday — come dressed
                in your best western wear!
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

              <a
                href="/old-west-sunday"
                className="inline-block bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Full Details
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
