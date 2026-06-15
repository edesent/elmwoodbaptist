import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";

const beliefs = [
  { title: "The Bible", body: "We believe the King James Bible is the inspired, preserved Word of God — our final authority for faith and practice." },
  { title: "God", body: "We believe in one God eternally existing in three Persons: the Father, the Son, and the Holy Spirit." },
  { title: "Salvation", body: "We believe salvation is by grace alone, through faith alone, in the Lord Jesus Christ alone — not of works." },
  { title: "The Church", body: "We believe in the local, autonomous New Testament Baptist church, gathered to worship God, edify believers, and reach the lost." },
];

export default function WhatWeBelieve() {
  return (
    <section id="beliefs" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionBadge
          number={9}
          name="What We Believe (Preview)"
          purpose="A 4-point teaser that links to the full statement of faith"
        />

        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              What We <em className="text-brown-light italic">Believe</em>
            </h2>
            <p className="text-text-body mt-3 max-w-2xl mx-auto">
              We hold to the historic doctrines of the Independent Baptist faith. Here are four of them.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {beliefs.map((b, i) => (
            <AnimateOnScroll key={b.title} delay={i * 100}>
              <div className="h-full p-7 bg-cream rounded-2xl border border-cream-dark hover:shadow-md hover:-translate-y-1 transition-all">
                <svg className="w-9 h-9 text-gold-dark mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                </svg>
                <h3 className="font-serif text-lg font-semibold text-text-dark mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-text-body leading-relaxed">{b.body}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="text-center">
            <a
              href="/statement-of-faith"
              className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Read Our Full Statement of Faith
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
