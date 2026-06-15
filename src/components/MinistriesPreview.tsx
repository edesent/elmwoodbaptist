import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";

const ministries = [
  { name: "Adult Ministries", body: "Sunday School classes for every stage of life, plus monthly men's prayer breakfasts and ladies' fellowships." },
  { name: "Truth 4 Teens", body: "A dedicated ministry for grades 6–12 with singing, Bible preaching, and fellowship. Meets Sunday mornings and Thursday evenings at 7:00 PM." },
  { name: "Children's Ministries", body: "Nursery for infants through age 4, Children's Church, and Master Club on Thursday nights at 7:00 PM for ages 4 through 6th grade." },
  { name: "Bus Ministry", body: "Safe, reliable transportation for children and families who would not otherwise be able to attend. Call Pastor Brandon Bowser at (720) 745-9870." },
  { name: "Men's Ministry", body: "Men's prayer breakfasts, the annual Man Camp, and retreats built to sharpen men in their walk with Christ." },
  { name: "Elmwood Baptist Academy", body: "Christ is honored, His Word is taught, and biblical truth shapes both the heart and the mind — combining Christian education with academic excellence." },
];

export default function MinistriesPreview() {
  return (
    <section id="ministries" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionBadge
          number={13}
          name="Ministries Preview"
          purpose="A grid of the ways people serve and grow at your church"
        />

        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              Our <em className="text-brown-light italic">Ministries</em>
            </h2>
            <p className="text-text-body mt-3 max-w-2xl mx-auto">
              There&rsquo;s a place for every member of the family.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((m, i) => (
            <AnimateOnScroll key={m.name} delay={i * 80}>
              <div className="h-full p-7 bg-cream rounded-2xl border border-cream-dark hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 rounded-full bg-brown-deep flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-text-dark mb-2">
                  {m.name}
                </h3>
                <p className="text-sm text-text-body leading-relaxed">{m.body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
