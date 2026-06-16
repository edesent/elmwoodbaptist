import AnimateOnScroll from "./AnimateOnScroll";
import { getRecentVideos } from "@/lib/youtube";

export default async function LatestSermon() {
  const [latest] = await getRecentVideos(1);

  return (
    <section id="sermon" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <AnimateOnScroll>
            <a
              href="/messages"
              className="relative block aspect-video rounded-2xl overflow-hidden shadow-xl bg-brown-deep group"
            >
              {latest ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={latest.thumbnail}
                    alt={latest.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/70 via-brown-deep/10 to-transparent" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-brown to-brown-deep" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(43,179,214,0.18),transparent_70%)]" />
                </>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-brown-deep ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {latest && (
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-gold-light bg-brown-deep/60 rounded-full px-3 py-1">
                    Latest Sermon
                  </span>
                </div>
              )}
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

              {latest ? (
                <div className="mb-6">
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-gold-dark mb-1">
                    {latest.published}
                  </p>
                  <p className="font-serif text-xl font-semibold text-text-dark leading-snug">
                    {latest.title}
                  </p>
                </div>
              ) : null}

              <p className="text-text-body leading-relaxed mb-8">
                Catch the most recent message and our full library of sermons on the sermons page —
                updated automatically each week. We&rsquo;d also love to have you join us in person.
              </p>
              <a
                href="/messages"
                className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Watch Sermons
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
