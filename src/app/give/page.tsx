import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";

export const metadata: Metadata = {
  title: "Give Online",
  description:
    "Give your tithes and offerings to Elmwood Baptist Church of Brighton, Colorado — online, by mail, or in person.",
  alternates: { canonical: "/give" },
  openGraph: {
    title: "Give Online | Elmwood Baptist Church",
    description: "Support the work of the Lord through your tithes and offerings.",
    url: "/give",
    type: "website",
  },
};

export default function GivePage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="Giving"
          title="Support the Lord's Work"
          subtitle="&ldquo;Every man according as he purposeth in his heart, so let him give.&rdquo; — 2 Cor 9:7"
          bgImage="/give-hero.jpg"
        />
        <section className="py-24 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 mb-12 text-center">
            <p className="text-lg text-text-body leading-relaxed">
              Your tithes and offerings make the ministry of Elmwood Baptist Church possible —
              supporting the preaching of the Gospel, our missionaries around the world, our bus
              ministry, and Elmwood Baptist Academy. Thank you for giving cheerfully and faithfully
              to the work of the Lord.
            </p>
          </div>
          {/* Tithely online giving form */}
          <div className="max-w-lg mx-auto px-6 mb-14">
            <h2 className="font-serif text-2xl font-bold text-text-dark mb-5 text-center">
              Give Online
            </h2>
            <div className="rounded-2xl border border-cream-dark shadow-sm overflow-hidden bg-white">
              <iframe
                title="Give to Elmwood Baptist Church"
                src="https://tithe.ly/give_new/www/#/tithely/give-one-time/4263938"
                className="w-full h-[760px] border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-cream rounded-2xl border border-cream-dark">
              <h2 className="font-serif text-2xl font-bold text-text-dark mb-3">Give in Person</h2>
              <p className="text-text-body leading-relaxed mb-6">
                You are always welcome to give during any of our services. We&rsquo;d love to have
                you worship with us this Sunday at 10:00 AM and join the family at Elmwood.
              </p>
              <a
                href="tel:+13036593818"
                className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Call (303) 659-3818
              </a>
            </div>
            <div id="mail" className="p-8 bg-cream rounded-2xl border border-cream-dark">
              <h2 className="font-serif text-2xl font-bold text-text-dark mb-3">Give by Mail</h2>
              <p className="text-text-body leading-relaxed mb-4">
                Prefer the old-fashioned way? Mail your check to:
              </p>
              <address className="not-italic font-serif text-text-dark leading-relaxed mb-4">
                Elmwood Baptist Church<br />
                13100 E 144th Ave<br />
                Brighton, CO 80601
              </address>
              <p className="text-sm text-text-light">
                Make checks payable to <strong>Elmwood Baptist Church</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
