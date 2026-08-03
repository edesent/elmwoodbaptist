import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubpageHero from "@/components/SubpageHero";

export const metadata: Metadata = {
  title: "Pastor Randall's Testimony",
  description:
    "The personal testimony of Dr. Gary Randall, Senior Pastor of Elmwood Baptist Church in Brighton, Colorado.",
  alternates: { canonical: "/staff/gary-randall/testimony" },
  openGraph: {
    title: "Pastor Randall's Testimony | Elmwood Baptist Church",
    description: "The personal testimony of Dr. Gary Randall, Senior Pastor of Elmwood Baptist Church.",
    url: "/staff/gary-randall/testimony",
    type: "article",
  },
};

export default function GaryRandallTestimonyPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHero
          eyebrow="Senior Pastor"
          title="Pastor Randall's Testimony"
          subtitle="Dr. Gary Randall"
        />

        <section className="py-24 bg-warm-white">
          <div className="max-w-3xl mx-auto px-6 text-lg text-text-body leading-relaxed space-y-6">
            {/* TODO: Replace this placeholder with Pastor Randall's personal testimony. */}
            <p className="italic text-text-light">
              Pastor Randall&rsquo;s testimony is coming soon. Please check back to read the story
              of God&rsquo;s work in his life.
            </p>

            <div className="pt-6">
              <Link
                href="/staff/gary-randall"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-light hover:text-brown transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                Back to Pastor Randall&rsquo;s Bio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
