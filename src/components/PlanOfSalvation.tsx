import AnimateOnScroll from "./AnimateOnScroll";

const steps = [
  {
    label: "1",
    title: "Recognize Your Condition",
    verse: "Romans 3:23",
    body: "&ldquo;For all have sinned, and come short of the glory of God.&rdquo; We are all sinners, separated from a holy God.",
  },
  {
    label: "2",
    title: "Good Works Are Not Enough",
    verse: "Ephesians 2:8–9",
    body: "&ldquo;For by grace are ye saved through faith… not of works, lest any man should boast.&rdquo; We cannot earn our way to Heaven.",
  },
  {
    label: "3",
    title: "Christ Paid the Price",
    verse: "John 3:16",
    body: "&ldquo;For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.&rdquo;",
  },
  {
    label: "4",
    title: "Believe and Receive",
    verse: "Romans 10:13",
    body: "&ldquo;For whosoever shall call upon the name of the Lord shall be saved.&rdquo; Trust Christ alone, turn from sin, and ask Him to save you.",
  },
];

export default function PlanOfSalvation() {
  return (
    <section id="gospel" className="relative py-28 bg-brown-deep overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,85,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Dark-tone badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/40 bg-white/5 text-[11px] font-semibold tracking-[0.18em] uppercase text-gold-light">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold text-brown-deep text-[10px] font-bold">
              14
            </span>
            <span className="whitespace-nowrap">Plan of Salvation</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gold/50" />
            <span className="hidden sm:inline-block normal-case tracking-normal text-[12px] font-normal text-white/70">
              The Gospel — the most important section on the whole site
            </span>
          </div>
        </div>

        <AnimateOnScroll>
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-snug mb-5">
              How to Know You&rsquo;re <em className="text-gold-light italic">Saved.</em>
            </h2>
            <p className="text-white/75 leading-relaxed text-lg">
              The Bible tells us salvation is a gift from God, received by faith in His Son
              Jesus Christ. The Roman Road through Scripture lays it out simply.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {steps.map((s, i) => (
            <AnimateOnScroll key={s.title} delay={i * 150}>
              <div className="h-full p-8 rounded-2xl bg-white/[.04] border border-white/10 backdrop-blur-sm hover:bg-white/[.07] transition-colors">
                <div className="flex items-center gap-4 mb-5">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gold text-brown-deep font-serif text-2xl font-bold">
                    {s.label}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-light">
                      {s.verse}
                    </p>
                  </div>
                </div>
                <p
                  className="text-white/75 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="text-center">
            <a
              href="/plan-of-salvation"
              className="inline-block bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Read the Full Gospel Story
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
