import AnimateOnScroll from "./AnimateOnScroll";
import { weeklyEvents } from "@/lib/events";

export default function ChurchEvents() {
  return (
    <section id="events" className="py-28 bg-warm-white">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
              Church Events
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              What&rsquo;s Happening at <em className="text-brown-light italic">Elmwood</em>
            </h2>
            <p className="text-text-body mt-3 max-w-2xl mx-auto">
              There&rsquo;s always something going on in our church family. Here&rsquo;s what happens
              each week — see the full calendar for everything else.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="divide-y divide-cream-dark border-y border-cream-dark">
          {weeklyEvents.map((e, i) => (
            <AnimateOnScroll key={e.title} delay={i * 60}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-5">
                <p className="sm:w-56 flex-shrink-0 text-xs font-bold tracking-[0.16em] uppercase text-gold-dark">
                  {e.when}
                </p>
                <div className="sm:flex-grow">
                  <h3 className="font-serif text-xl font-semibold text-text-dark leading-tight">
                    {e.title}
                  </h3>
                  {e.detail && (
                    <p className="text-sm text-text-body mt-0.5">{e.detail}</p>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={150}>
          <div className="text-center mt-12">
            <a
              href="/events"
              className="inline-flex items-center gap-2 bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
              </svg>
              All Events
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
