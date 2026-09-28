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
      <ManCampPageHero
        eyebrow="Man Camp"
        title="Photos"
        subtitle="The men, the mountains, and the fellowship."
      />

      <section className="py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {photos.map((p) => (
              <a
                key={p.src}
                href={p.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden shadow-lg bg-cream hover:shadow-2xl transition-shadow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} className="w-full h-80 object-cover" loading="lazy" />
              </a>
            ))}
          </div>
          <p className="text-center text-lg text-text-body mt-12">
            More photos from Man Camp 9 are coming soon.
          </p>
        </div>
      </section>
    </>
  );
}
