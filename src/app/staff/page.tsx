import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";
import { staff } from "@/lib/staff";

export const metadata: Metadata = {
  title: "Pastors & Staff",
  description:
    "Meet the pastors and staff of Elmwood Baptist Church in Brighton, Colorado — led by Senior Pastor Dr. Gary Randall.",
  alternates: { canonical: "/staff" },
  openGraph: {
    title: "Pastors & Staff | Elmwood Baptist Church",
    description: "Meet the pastors and staff who serve the Elmwood family.",
    url: "/staff",
    type: "website",
  },
};

export default function StaffPage() {
  const lead = staff.find((m) => m.lead) ?? staff[0];
  const rest = staff.filter((m) => m !== lead);

  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="Our Pastors & Staff"
          title="Meet Our Leaders"
          subtitle="A team of pastors and families devoted to the Lord and to caring for our church family"
        />

        <section className="py-24 bg-warm-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Lead pastor */}
            <Link
              href={`/staff/${lead.slug}`}
              className="group grid md:grid-cols-[0.85fr_1fr] gap-10 lg:gap-14 items-center mb-20"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lead.photo}
                  alt={lead.names}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-2">
                  {lead.role}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-tight mb-2">
                  {lead.names}
                </h2>
                <div className="w-16 h-[3px] bg-gold rounded mb-5" />
                <p className="text-lg text-text-body leading-relaxed mb-6">{lead.bio[0]}</p>
                <span className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full group-hover:bg-brown group-hover:-translate-y-0.5 transition-all">
                  Read Their Story
                </span>
              </div>
            </Link>

            {/* Other staff */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((m) => (
                <Link
                  key={m.slug}
                  href={`/staff/${m.slug}`}
                  className="group flex flex-col bg-cream rounded-2xl overflow-hidden border border-cream-dark shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className="relative aspect-square overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.photo}
                      alt={m.names}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="font-serif text-xl font-semibold text-text-dark leading-tight">
                      {m.names}
                    </h3>
                    <p className="text-xs font-bold tracking-[0.12em] uppercase text-gold-dark mt-2">
                      {m.role}
                    </p>
                    <p className="text-sm text-text-body leading-relaxed mt-4 flex-grow">
                      {m.bio[0]}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brown-light group-hover:gap-2.5 transition-all">
                      Read more
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
