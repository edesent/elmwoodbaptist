import AnimateOnScroll from "./AnimateOnScroll";

const facts = [
  { label: "When", value: "Sunday, November 22 · 12:30 PM" },
  { label: "Pies", value: "Provided by the church" },
  { label: "You Bring", value: "Your testimony of God's goodness this year" },
];

export default function PraiseAndPie() {
  return (
    <section id="praise-and-pie" className="py-28 bg-brown-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/events/praise-and-pie.png"
                alt="Praise and Pie Testimony Time, Sunday, November 22 at 12:30 PM, Elmwood Baptist Church"
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
                Praise and Pie Testimony Time
              </h2>
              <p className="text-white/70 mb-7">
                Join us for an afternoon of thanksgiving! The church is providing
                the pie, and you bring the praise. Come ready to share how God has
                been good to you throughout this year, and be encouraged as your
                church family does the same. Everyone is welcome!
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
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
