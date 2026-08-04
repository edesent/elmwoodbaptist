import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import PlanVisitForm from "@/components/PlanVisitForm";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Plan your visit to Elmwood Baptist Church in Brighton, Colorado. Pick a service time and let us know you're coming — we'll be ready to welcome you.",
  alternates: { canonical: "/visit-us" },
  openGraph: {
    title: "Plan Your Visit | Elmwood Baptist Church",
    description:
      "Come as you are and join us this week in Brighton, Colorado. Let us know you're coming and we'll be ready to welcome you.",
    url: "/visit-us",
    type: "website",
  },
};

const services = [
  { day: "Sunday", title: "Sunday Service", time: "10:00 AM" },
  { day: "Sunday", title: "Family Bible Time", time: "11:30 AM" },
  { day: "Sunday", title: "Afternoon Service", time: "1:30 PM" },
  { day: "Thursday", title: "Mid-Week Service", time: "7:00 PM" },
];

const expectations = [
  {
    title: "A Warm Welcome",
    body: "You'll be greeted like family — no being singled out or put on the spot.",
  },
  {
    title: "Bible Preaching",
    body: "Congregational singing, prayer, and clear preaching from the Bible.",
  },
  {
    title: "Come As You Are",
    body: "Dress up or come casual. Nursery is available for infants through age 3.",
  },
  {
    title: "Easy to Find",
    body: "We're on E 144th Ave in Brighton with plenty of parking right out front.",
  },
];

export default function VisitUsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="Plan Your Visit"
          title="We Can't Wait to Meet You"
          subtitle="Come as you are and join us this week. Let us know you're coming and we'll be watching for you at the door."
        />

        {/* Form + map */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-stretch">
              <AnimateOnScroll>
                <div className="h-full p-8 md:p-10 bg-warm-white rounded-2xl border border-cream-dark shadow-sm">
                  <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
                    Plan a Visit
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug mb-3">
                    Tell Us You&rsquo;re <em className="text-brown-light italic">Coming</em>
                  </h2>
                  <p className="text-text-body leading-relaxed mb-7">
                    Pick a service and someone from our church family will reach
                    out to welcome you, answer any questions, and make sure you
                    know exactly where to go when you arrive.
                  </p>
                  <PlanVisitForm />
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="h-full flex flex-col gap-6">
                  <div className="flex-grow min-h-[320px] rounded-2xl overflow-hidden shadow-sm border border-cream-dark relative bg-cream-dark">
                    <iframe
                      title="Map to Elmwood Baptist Church"
                      src="https://www.google.com/maps?q=13100+E+144th+Ave,+Brighton,+CO+80601&output=embed"
                      className="absolute inset-0 w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>

                  <div className="p-8 bg-warm-white rounded-2xl border border-cream-dark shadow-sm">
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-1">
                      Where to Find Us
                    </p>
                    <p className="font-serif text-xl font-semibold text-text-dark leading-snug">
                      13100 E 144th Ave
                      <br />
                      Brighton, CO 80601
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <a
                        href="https://maps.google.com/?q=13100+E+144th+Ave+Brighton+CO+80601"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-7 py-3 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
                      >
                        Get Directions
                      </a>
                      <a
                        href="tel:+13036593818"
                        className="inline-block text-brown-light font-semibold text-sm tracking-wide uppercase px-7 py-3 rounded-full border-2 border-brown-light/50 hover:bg-brown-light/10 hover:border-brown-light transition-all"
                      >
                        (303) 659-3818
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Service times */}
        <section className="py-20 md:py-24 bg-warm-white">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
                  When We Gather
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
                  Join Us This <em className="text-brown-light italic">Week</em>
                </h2>
              </div>
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <AnimateOnScroll key={s.title} delay={i * 100}>
                  <div className="h-full p-7 bg-cream rounded-2xl border border-cream-dark text-center">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-2">
                      {s.day}
                    </p>
                    <h3 className="font-serif text-xl font-semibold text-text-dark mb-1">
                      {s.title}
                    </h3>
                    <p className="font-serif text-3xl font-bold text-brown-light">
                      {s.time}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="py-20 md:py-24 bg-cream">
          <div className="max-w-6xl mx-auto px-6">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
                  What to Expect
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
                  Your First <em className="text-brown-light italic">Sunday</em>
                </h2>
              </div>
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 rounded-2xl border border-cream-dark bg-warm-white px-8 py-10">
              {expectations.map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 80}>
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark font-serif font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-text-dark leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-body leading-relaxed mt-1">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20 md:py-24 bg-brown-deep relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,85,0.18),transparent_65%)]" />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-gold-light mb-3">
              Questions Before You Come?
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-snug">
              We&rsquo;re Here to Help
            </h2>
            <p className="text-white/75 mt-4 leading-relaxed">
              Call the church office any time, or fill out a connect card and
              we&rsquo;ll get back to you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a
                href="tel:+13036593818"
                className="inline-block bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-gold-light hover:-translate-y-0.5 transition-all"
              >
                Call (303) 659-3818
              </a>
              <Link
                href="/connect"
                className="inline-block text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-white/40 hover:bg-white/10 hover:border-white transition-all"
              >
                Fill Out a Connect Card
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
