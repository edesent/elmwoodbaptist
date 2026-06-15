import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";

export const metadata: Metadata = {
  title: "The Plan of Salvation",
  description:
    "How to be saved — the Gospel of Jesus Christ explained from the King James Bible at Elmwood Baptist Church, Brighton, Colorado.",
  alternates: { canonical: "/plan-of-salvation" },
  openGraph: {
    title: "The Plan of Salvation | Elmwood Baptist Church",
    description: "How to be saved — the Gospel from the King James Bible.",
    url: "/plan-of-salvation",
    type: "article",
  },
};

export default function PlanOfSalvationPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="The Most Important Page"
          title="How to Be Saved"
          subtitle="The Gospel of the Lord Jesus Christ"
        />
        <section className="py-24 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 space-y-10 text-text-body text-lg leading-relaxed">
            <p>
              The Bible tells us that salvation is a free gift from God, received by faith
              in His Son, the Lord Jesus Christ. You can be saved today — right where you sit.
            </p>

            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-3">
                1. Recognize your condition.
              </h2>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5 mb-3">
                &ldquo;For all have sinned, and come short of the glory of God.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Romans 3:23</span>
              </blockquote>
              <p>
                The Bible is clear that every one of us is a sinner. Our sin separates us from a
                holy God, and we are unable to bridge that gap on our own.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-3">
                2. Good works are not the answer.
              </h2>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5 mb-3">
                &ldquo;For by grace are ye saved through faith; and that not of yourselves: it is
                the gift of God: Not of works, lest any man should boast.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Ephesians 2:8–9</span>
              </blockquote>
              <p>
                No amount of good living, religion, or church membership can earn salvation.
                Salvation is a gift of God&rsquo;s grace — it cannot be bought or worked for.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-3">
                3. Jesus Christ provides the way.
              </h2>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5 mb-3">
                &ldquo;For God so loved the world, that he gave his only begotten Son, that
                whosoever believeth in him should not perish, but have everlasting life.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— John 3:16</span>
              </blockquote>
              <p>
                Out of His great love, God sent His Son. Jesus Christ died on the cross to pay
                for our sin and rose again the third day, proving He is the Son of God and that
                His payment was accepted.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-3">
                4. Believe and receive Christ.
              </h2>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5 mb-3">
                &ldquo;For whosoever shall call upon the name of the Lord shall be saved.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Romans 10:13</span>
              </blockquote>
              <p>
                Trust in Christ alone — not in yourself or your works. Turn from your sin and
                call upon the Lord Jesus, asking Him to save you. He has promised that whosoever
                calls upon Him will be saved.
              </p>
            </div>

            <div className="p-8 bg-cream rounded-2xl border border-cream-dark mt-12">
              <h3 className="font-serif text-xl font-bold text-text-dark mb-3">
                Would you like to talk with someone?
              </h3>
              <p className="mb-4">
                If you have trusted Christ today, or if you have questions and would like a free
                Bible, we would love to hear from you and help you take your next steps. Call us
                at <a href="tel:+13036593818" className="text-brown-light font-semibold">(303) 659-3818</a> or
                email <a href="mailto:office@elmwoodbaptist.org" className="text-brown-light font-semibold">office@elmwoodbaptist.org</a>.
              </p>
              <a
                href="tel:+13036593818"
                className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Call the Church
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
