import AnimateOnScroll from "./AnimateOnScroll";

const groups = [
  { label: "Children", photo: "/groups/children.jpg" },
  { label: "Youth", photo: "/groups/youth.jpg" },
  { label: "Men", photo: "/groups/men.jpg" },
  { label: "Women", photo: "/groups/women.jpg" },
  { label: "Adults", photo: "/groups/adults.jpg" },
  { label: "Seniors", photo: "/groups/seniors.jpg" },
];

export default function Connect() {
  return (
    <section
      id="groups"
      className="relative z-10 -mt-28 md:-mt-44 bg-warm-white rounded-t-[2.5rem] md:rounded-t-[3.5rem] shadow-[0_-24px_50px_rgba(11,39,64,0.25)] pt-20 md:pt-24 pb-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
              From Children to Seniors
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-text-dark leading-snug">
              Connect With <em className="text-brown-light italic">People Like You.</em>
            </h2>
            <p className="text-text-body mt-4 max-w-2xl mx-auto leading-relaxed">
              We&rsquo;re always better together — God created us for community! At Elmwood, there&rsquo;s
              a ministry group for you no matter what stage of life you find yourself in.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {groups.map((g, i) => (
            <AnimateOnScroll key={g.label} delay={i * 80}>
              <div className="group relative block aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.photo}
                  alt={g.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/85 via-brown-deep/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow">
                    {g.label}
                  </h3>
                  <span className="block w-10 h-[3px] bg-gold rounded mt-2 group-hover:w-16 transition-all" />
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
