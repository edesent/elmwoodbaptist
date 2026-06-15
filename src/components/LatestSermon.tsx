import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";

export default function LatestSermon() {
  return (
    <section id="sermon" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionBadge
          number={11}
          name="Watch & Listen"
          purpose="Recent services and sermons on the church's YouTube channel"
        />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <AnimateOnScroll>
            <a
              href="https://youtube.com/@elmwoodbaptist"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-video rounded-2xl overflow-hidden shadow-xl bg-brown-deep group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brown to-brown-deep" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,85,0.15),transparent_70%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-brown-deep ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-light">
                  Watch on YouTube
                </p>
              </div>
            </a>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
                Sermons
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug mb-4">
                Watch &amp; Listen to <em className="text-brown-light italic">God&rsquo;s Word</em>
              </h2>
              <p className="text-text-body leading-relaxed mb-8">
                Catch up on our recent services and sermons anytime on our YouTube channel,
                where we post the preaching of God&rsquo;s Word week by week. We&rsquo;d also
                love to have you join us in person — there&rsquo;s a seat saved for you.
              </p>
              <a
                href="https://youtube.com/@elmwoodbaptist"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Visit Our YouTube Channel
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
