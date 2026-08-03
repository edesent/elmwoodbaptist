import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import SermonGrid from "@/components/SermonGrid";
import { getLiveStatus, getRecentVideos, youtube } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Sermons & Messages",
  description:
    "Watch and listen to sermons preached at Elmwood Baptist Church in Brighton, Colorado. Preaching from the King James Bible.",
  alternates: { canonical: "/messages" },
  openGraph: {
    title: "Sermons & Messages | Elmwood Baptist Church",
    description: "Verse-by-verse preaching from the King James Bible.",
    url: "/messages",
    type: "website",
  },
};

// Re-render on each request so the page flips to the live stream the moment
// the church goes live (live status is cached ~30s inside the plugin).
export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const [videos, live] = await Promise.all([
    getRecentVideos(12),
    getLiveStatus(),
  ]);

  const showLive = live.isLive && live.videoId;

  return (
    <>
      <Navbar />
      <main>
        {showLive ? (
          <header className="relative pt-36 pb-16 bg-brown-deep overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(43,179,214,0.18),transparent_60%)]" />
            <div className="relative max-w-5xl mx-auto px-6">
              <p className="flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.22em] uppercase text-gold-light mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                Live Now
              </p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white text-center leading-tight mb-8">
                We&rsquo;re Streaming <em className="text-gold-light italic">Right Now</em>
              </h1>
              <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${live.videoId}?autoplay=1`}
                  title="Elmwood Baptist Church livestream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="text-center text-white/70 mt-6">
                Join the service in progress — recent messages are below.
              </p>
            </div>
          </header>
        ) : (
          <SubpageHero
            eyebrow="Sermons"
            title="Watch & Listen"
            subtitle="Verse-by-verse preaching from the King James Bible"
          />
        )}

        <section className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            {videos.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
                    Recent <em className="text-brown-light italic">Messages</em>
                  </h2>
                  <p className="text-text-body mt-3 max-w-2xl mx-auto">
                    Be encouraged by the preaching of God&rsquo;s Word wherever you are.
                    New services are posted to our YouTube channel each week.
                  </p>
                </div>
                <SermonGrid videos={videos} />
                <div className="text-center mt-12">
                  <a
                    href={youtube.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
                  >
                    Visit Our YouTube Channel
                  </a>
                </div>
              </>
            ) : (
              <div className="max-w-2xl mx-auto text-center p-10 bg-warm-white rounded-2xl border border-cream-dark">
                <h2 className="font-serif text-2xl font-bold text-text-dark mb-3">
                  Watch on YouTube
                </h2>
                <p className="text-text-body leading-relaxed mb-6">
                  Recent messages will appear here. In the meantime, you can watch every
                  service directly on our YouTube channel.
                </p>
                <a
                  href={youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  Open YouTube Channel
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
