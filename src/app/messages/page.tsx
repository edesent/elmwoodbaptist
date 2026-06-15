import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";

export const metadata: Metadata = {
  title: "Sermons & Messages",
  description:
    "Watch and listen to sermons preached at Elmwood Baptist Church in Brighton, Colorado. Verse-by-verse preaching from the King James Bible.",
  alternates: { canonical: "/messages" },
  openGraph: {
    title: "Sermons & Messages | Elmwood Baptist Church",
    description: "Verse-by-verse preaching from the King James Bible.",
    url: "/messages",
    type: "website",
  },
};

export default function MessagesPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="Sermons"
          title="Watch & Listen"
          subtitle="Verse-by-verse preaching from the King James Bible"
        />
        <section className="py-24 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-lg text-text-body leading-relaxed mb-4">
              Our services are shared online so you can be encouraged by the preaching of
              God&rsquo;s Word wherever you are. Subscribe and follow along with us throughout
              the week.
            </p>
            <p className="text-lg text-text-body leading-relaxed mb-10">
              Watch recent messages on our YouTube channel, or catch services and updates on
              Facebook.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="https://youtube.com/@elmwoodbaptist"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
                </svg>
                Watch on YouTube
              </a>
              <a
                href="https://facebook.com/elmwoodbaptistbrighton"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-brown-light hover:text-brown transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7v-3.5h3.1V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z" />
                </svg>
                Follow on Facebook
              </a>
            </div>
            <div className="p-8 bg-cream rounded-2xl border border-cream-dark">
              <h2 className="font-serif text-2xl font-bold text-text-dark mb-3">
                Join Us in Person
              </h2>
              <p className="text-text-body leading-relaxed">
                Nothing replaces gathering together with God&rsquo;s people. We would love to
                have you worship with us this Sunday at <strong>10:00 AM</strong>. You&rsquo;ll
                find a warm welcome — because we&rsquo;re more than a church, we&rsquo;re a family.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
