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
            <div className="rounded-2xl shadow-2xl bg-cream p-10 md:p-14 text-center">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-4">
                Sunday Before Thanksgiving
              </p>
              <p className="font-serif text-7xl md:text-8xl font-bold text-brown-deep leading-none">
                22
              </p>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-brown-light mt-2">
                November
              </p>
              <p className="text-text-body font-medium mt-4">12:30 PM</p>
              <div className="mt-8 pt-6 border-t border-cream-dark">
                <p className="font-serif text-xl italic text-text-dark leading-relaxed">
                  &ldquo;Let the redeemed of the LORD say so&rdquo;
                </p>
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-gold-dark mt-2">
                  Psalm 107:2
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
