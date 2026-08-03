import AnimateOnScroll from "./AnimateOnScroll";

const services = [
  {
    day: "Sunday",
    title: "Sunday Service",
    time: "10:00 AM",
    detail: "Singing, prayer, and Bible preaching",
  },
  {
    day: "Sunday",
    title: "Family Bible Time",
    time: "11:30 AM",
    detail: "Sunday School classes for every age",
  },
  {
    day: "Sunday",
    title: "Afternoon Service",
    time: "1:30 PM",
    detail: "A second time of worship; the Lord's Supper on the last Sunday of each month",
  },
  {
    day: "Thursday",
    title: "Mid-Week Service",
    time: "7:00 PM",
    detail: "Adult Bible study, Teen Time, and Master Club for the kids",
  },
];

const expectations = [
  {
    title: "A Warm Welcome",
    body: "You'll be greeted like family — no being singled out or put on the spot.",
  },
  {
    title: "Bible Preaching",
    body: "Congregational singing, prayer, and clear preaching from the King James Bible.",
  },
  {
    title: "Come As You Are",
    body: "Dress up or come casual. Nursery is available for infants through age 4.",
  },
];

export default function ServiceTimes() {
  return (
    <section id="services" className="pt-10 pb-16 md:pt-14 md:pb-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
              Plan Your Visit
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              Join Us This <em className="text-brown-light italic">Week</em>
            </h2>
            <p className="text-text-body mt-3 max-w-2xl mx-auto">
              At Elmwood Baptist you&rsquo;ll find a family that loves the Lord and loves people. Here&rsquo;s
              when we gather — and what to expect when you visit. Come as you are.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Service times */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <AnimateOnScroll key={s.title} delay={i * 100}>
              <div className="h-full p-7 bg-warm-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-cream-dark">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-2">
                  {s.day}
                </p>
                <h3 className="font-serif text-xl font-semibold text-text-dark mb-1">
                  {s.title}
                </h3>
                <p className="font-serif text-3xl font-bold text-brown-light mb-3">
                  {s.time}
                </p>
                <p className="text-sm text-text-light leading-relaxed">{s.detail}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* What to expect — compact supporting row */}
        <AnimateOnScroll delay={200}>
          <div className="mt-10 grid sm:grid-cols-3 gap-x-8 gap-y-6 rounded-2xl border border-cream-dark bg-warm-white px-8 py-9">
            {expectations.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark font-serif font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-text-dark leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed mt-1">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="text-center mt-12">
            <a
              href="/visit-us"
              className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Let Us Know You&rsquo;re Coming
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
