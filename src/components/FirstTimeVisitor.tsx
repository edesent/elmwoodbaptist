import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";

const expectations = [
  {
    title: "A Warm Welcome",
    body: "From the moment you arrive, you'll be greeted like family. We won't single you out or put you on the spot — just come and enjoy the service.",
  },
  {
    title: "Bible Preaching",
    body: "Congregational singing, prayer, and clear preaching straight from the King James Bible. Expect to be encouraged and challenged from God's Word.",
  },
  {
    title: "Come As You Are",
    body: "Some dress up, some come casual — what matters is that you're here. Nursery is available for infants through age 4, and there's a place for every child.",
  },
];

export default function FirstTimeVisitor() {
  return (
    <section id="visit" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionBadge
          number={7}
          name="First-Time Visitor"
          purpose="Lowers the anxiety bar for someone who's never visited"
        />

        <AnimateOnScroll>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
              Visiting Us?
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              Here&rsquo;s What to <em className="text-brown-light italic">Expect</em>
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {expectations.map((item, i) => (
            <AnimateOnScroll key={item.title} delay={i * 150}>
              <div className="h-full p-8 bg-cream rounded-2xl border border-cream-dark hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark font-serif font-bold text-lg mb-5">
                  {i + 1}
                </div>
                <h3 className="font-serif text-xl font-semibold text-text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-text-body leading-relaxed">{item.body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={400}>
          <div className="text-center mt-12">
            <a
              href="#contact"
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
