import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { staff, getStaff } from "@/lib/staff";

export function generateStaticParams() {
  return staff.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getStaff(slug);
  if (!member) return { title: "Pastors & Staff" };
  return {
    title: member.names,
    description: `${member.names} — ${member.role} at Elmwood Baptist Church, Brighton, Colorado.`,
    alternates: { canonical: `/staff/${member.slug}` },
    openGraph: {
      title: `${member.names} | Elmwood Baptist Church`,
      description: member.bio[0],
      url: `/staff/${member.slug}`,
      type: "profile",
      images: [member.photo],
    },
  };
}

export default async function StaffMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getStaff(slug);
  if (!member) notFound();

  return (
    <>
      <Navbar />
      <main>
        <header className="relative pt-36 pb-12 bg-brown-deep overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(43,179,214,0.16),transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-6">
            <Link
              href="/staff"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-light hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              All Pastors &amp; Staff
            </Link>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold-light mb-3">
              {member.role}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              {member.names}
            </h1>
          </div>
        </header>

        <section className="py-20 bg-warm-white">
          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-[0.7fr_1fr] gap-10 lg:gap-14 items-start">
            <div className="md:sticky md:top-28">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.photo} alt={member.names} className="w-full h-full object-cover" />
              </div>
              <div className="mt-6 p-6 bg-cream rounded-2xl border border-cream-dark">
                <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-gold-dark mb-3">
                  Serving As
                </h2>
                <ul className="space-y-2">
                  {member.titles.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-text-dark">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5 text-lg text-text-body leading-relaxed">
              {member.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {member.testimonyUrl && (
                <div className="pt-2">
                  <Link
                    href={member.testimonyUrl}
                    className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
                  >
                    Read His Testimony
                  </Link>
                </div>
              )}

              <div className="pt-4">
                <Link
                  href="/staff"
                  className="inline-block text-brown-light font-semibold text-sm tracking-wide uppercase border-b-2 border-brown-light/40 hover:border-brown-light pb-1 transition-colors"
                >
                  ← Meet the rest of our team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
