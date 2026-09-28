import type { Metadata } from "next";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos from Man Camp, the men's retreat of Elmwood Baptist Church.",
  alternates: { canonical: "/man-camp/photos" },
};

// To add a photo: upload it to public/mancamp and add a line here.
const photos = [
  { src: "/mancamp/men.jpg", alt: "The men of Man Camp" },
  { src: "/mancamp/devils-head-nice.jpg", alt: "Angel's Head Lookout at sunset" },
  { src: "/mancamp/banner.jpg", alt: "Man Camp banner" },
  { src: "/mancamp/man-camp-webiste.jpg", alt: "Man Camp 9 theme art, Faithful to the Last Amen" },
];

export default function PhotosPage() {
  return (
    <>
      <ManCampPageHero eyebrow="Man Camp" title="Photos" subtitle="The men, the mountains, and the fellowship." />

      <section className="py-16 bg-parchment mc-topo">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-8">
            {photos.map((p) => (
              <a
                key={p.src}
                href={p.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-canvas p-3 pb-4 rounded-sm shadow-lg border-2 border-bark/15 hover:border-ember hover:shadow-2xl transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} className="w-full h-80 object-cover rounded-sm" loading="lazy" />
                <p className="font-display text-sm tracking-[0.2em] uppercase text-moss mt-3 text-center">{p.alt}</p>
              </a>
            ))}
          </div>
          <p className="text-center text-lg mt-12">More photos from Man Camp 9 are coming soon.</p>
        </div>
      </section>
    </>
  );
}
