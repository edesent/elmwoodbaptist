import AnimateOnScroll from "./AnimateOnScroll";

const staff = [
  {
    photo: "/staff/bowser.jpg",
    names: "Pastor Brandon & Meghan Bowser",
    role: "Associate Pastor · Bus & Junior Church",
    bio: "The Bowsers joined the staff in December 2019, overseeing the bus and junior church ministries and teaching at Elmwood Baptist Academy. They have served in ministry for over 17 years.",
  },
  {
    photo: "/staff/ben.jpg",
    names: "Pastor Ben & Amber",
    role: "Assistant Pastor · Outreach & Evangelism",
    bio: "Ben and Amber came to faith through Elmwood's ministry and joined the staff in February 2022, leading outreach evangelism, the Life & Home Builders class, and the Brookdale service.",
  },
  {
    photo: "/staff/lopez.jpg",
    names: "Pastor Rick & Shannon Lopez",
    role: "Academy Administrator · Youth Ministry",
    bio: "The Lopezes have served at Elmwood for 13 years. Rick administrates Elmwood Baptist Academy and leads the Jesus First youth ministry; Shannon serves as Financial Director.",
  },
];

export default function Leaders() {
  return (
    <section id="leaders" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
              Our Pastors &amp; Staff
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              Meet Our <em className="text-brown-light italic">Leaders</em>
            </h2>
            <p className="text-text-body mt-3 max-w-2xl mx-auto">
              A team of pastors and families who love the Lord and are devoted to caring for our church family.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Featured — Senior Pastor */}
        <AnimateOnScroll>
          <div className="grid md:grid-cols-[0.85fr_1fr] gap-10 lg:gap-14 items-center mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/staff/randall.jpg"
                alt="Dr. Gary and Betty Randall"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-2">
                Senior Pastor
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-tight mb-2">
                Dr. Gary &amp; Betty Randall
              </h3>
              <div className="w-16 h-[3px] bg-gold rounded mb-5" />
              <p className="text-lg text-text-body leading-relaxed mb-4">
                Pastor Randall came to Elmwood in September 2000. Under his leadership the church has
                grown into a thriving family built on three principles: <em className="text-brown-light not-italic font-semibold">preaching the Word,
                praying in faith, and witnessing to the lost.</em>
              </p>
              <p className="text-lg text-text-body leading-relaxed mb-7">
                He and Betty have been married 52 years, with 43 years in ministry together.
              </p>
              <a
                href="/pastor"
                className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Read More About Our Leaders
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Staff grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((person, i) => (
            <AnimateOnScroll key={person.names} delay={i * 100}>
              <div className="h-full flex flex-col bg-warm-white rounded-2xl overflow-hidden border border-cream-dark shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.photo}
                    alt={person.names}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="font-serif text-xl font-semibold text-text-dark leading-tight">
                    {person.names}
                  </h3>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-gold-dark mt-2">
                    {person.role}
                  </p>
                  <p className="text-sm text-text-body leading-relaxed mt-4">{person.bio}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
