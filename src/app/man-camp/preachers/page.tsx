import type { Metadata } from "next";
import Link from "next/link";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";
import { PreachersFull } from "@/components/mancamp/Preachers";

export const metadata: Metadata = {
  title: "Preachers",
  description: "Meet the preachers of Man Camp 10.",
  alternates: { canonical: "/man-camp/preachers" },
};

const btn =
  "inline-block font-display text-lg font-semibold uppercase tracking-[0.15em] px-9 py-4 rounded-sm border-2 border-ember bg-ember text-parchment hover:bg-pine hover:border-pine transition-colors";

export default function PreachersPage() {
  return (
    <>
      <ManCampPageHero
        eyebrow="Man Camp 10 &middot; September 23&ndash;25, 2027"
        title="The Preachers"
        subtitle="The men God has called to preach His Word at Man Camp 10."
      />

      <section className="py-16 bg-parchment mc-topo">
        <div className="max-w-5xl mx-auto px-6">
          <PreachersFull />
          <div className="text-center mt-16">
            <Link href="/man-camp/schedule" className={btn}>
              See When They Preach
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
