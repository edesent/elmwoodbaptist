import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";

export const metadata: Metadata = {
  title: "The Bible Way to Heaven",
  description:
    "How to be saved — the Gospel of Jesus Christ explained from the King James Bible at Elmwood Baptist Church, Brighton, Colorado.",
  alternates: { canonical: "/plan-of-salvation" },
  openGraph: {
    title: "The Bible Way to Heaven | Elmwood Baptist Church",
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
          eyebrow="Salvation"
          title="The Bible Way to Heaven"
          subtitle="There are big questions that we all face."
        />
        <section className="py-24 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 space-y-10 text-text-body text-lg leading-relaxed">
            <div>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-xl mb-6">
                <iframe
                  src="https://www.youtube.com/embed/mIeRU12STNw"
                  title="The Bible Way to Heaven"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="mb-3">
                What happens when I die? Where will I spend eternity? The single most important
                question that you will ever answer is this — &ldquo;If I were to die today, would
                I spend eternity in Heaven with God?&rdquo; Your relationship to Jesus Christ is
                central to the answer to that question.
              </p>
              <p>
                The Bible tells us in I John 5:13, &ldquo;These things have I written unto you
                that believe on the name of the Son of God; that ye may know that ye have eternal
                life...&rdquo; The simple truth is God wants you to know where you&rsquo;re going!
                So, here it is in a nutshell:
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-3">
                1. Recognize your condition.
              </h2>
              <p className="mb-3">
                Ever since Adam and Eve, every one of us has inherited a sinful nature. The Bible
                is clear that our sin separates us from a holy God.
              </p>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5 mb-3">
                &ldquo;For all have sinned, and come short of the glory of God.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Romans 3:23</span>
              </blockquote>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5">
                &ldquo;For the wages of sin is death; but the gift of God is eternal life through
                Jesus Christ our Lord.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Romans 6:23</span>
              </blockquote>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-3">
                2. Religion and good works are not the answer.
              </h2>
              <p className="mb-3">
                No religious system, good living, or church membership can bridge the gap that sin
                has created. Salvation cannot be earned or worked for.
              </p>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5 mb-3">
                &ldquo;There is a way which seemeth right unto a man, but the end thereof are the
                ways of death.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Proverbs 14:12</span>
              </blockquote>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5">
                &ldquo;For by grace are ye saved through faith; and that not of yourselves: it is
                the gift of God: Not of works, lest any man should boast.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Ephesians 2:8–9</span>
              </blockquote>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-3">
                3. The good news — Jesus Christ provides the way!
              </h2>
              <p className="mb-3">
                Out of His great love, God sent His Son. Jesus Christ died on the cross to pay for
                our sin and rose again the third day, accomplishing what we never could.
              </p>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5 mb-3">
                &ldquo;For God so loved the world, that he gave his only begotten Son, that
                whosoever believeth in him should not perish, but have everlasting life.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— John 3:16</span>
              </blockquote>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5">
                &ldquo;But God commendeth his love toward us, in that, while we were yet sinners,
                Christ died for us.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Romans 5:8</span>
              </blockquote>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-text-dark mb-3">
                4. Believe and receive Christ.
              </h2>
              <p className="mb-3">
                Trust in Christ alone — not in yourself or your works. Turn from your sin and call
                upon the Lord Jesus, asking Him to save you. He has promised that whosoever calls
                upon Him will be saved.
              </p>
              <blockquote className="font-serif italic text-text-body border-l-4 border-gold pl-5">
                &ldquo;For whosoever shall call upon the name of the Lord shall be saved.&rdquo;
                <span className="block text-sm not-italic text-gold-dark mt-1">— Romans 10:13</span>
              </blockquote>
            </div>

            <div className="p-8 bg-cream rounded-2xl border border-cream-dark">
              <h3 className="font-serif text-2xl font-bold text-text-dark mb-3">
                A Prayer of Salvation
              </h3>
              <p className="mb-4">
                Salvation is not in the words of a prayer, but in trusting Christ from your heart.
                If you understand your need and want to trust Him as your Saviour, you might pray
                something like this:
              </p>
              <p className="font-serif italic text-text-dark leading-relaxed">
                &ldquo;Dear God, I know that I am separated from you because of sin. I confess that
                in my sin, I cannot save myself. Right now, I turn to you alone to be my Saviour. I
                ask you to save me from the penalty of my sin, and I trust you to provide eternal
                life to me. Amen.&rdquo;
              </p>
            </div>

            <div className="p-8 bg-brown-deep rounded-2xl text-center">
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Have you trusted Christ today?
              </h3>
              <p className="text-white/80 mb-6">
                If you prayed to receive Christ, or if you have questions and would like a free
                Bible, we would love to hear from you and help you take your next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+13036593818"
                  className="inline-block bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  Call (303) 659-3818
                </a>
                <a
                  href="mailto:office@elmwoodbaptist.org"
                  className="inline-block text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
