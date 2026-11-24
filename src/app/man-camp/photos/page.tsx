import type { Metadata } from "next";
import ManCampPageHero from "@/components/mancamp/ManCampPageHero";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos from Man Camp, the men's retreat of Elmwood Baptist Church.",
  alternates: { canonical: "/man-camp/photos" },
};

// To add a photo: upload it to public/mancamp/gallery and add its file name here.
// Photos show on the page in this order.
const photoFiles = [
  "img-0073.jpg",
  "img-0077.jpg",
  "img-0078.jpg",
  "img-0080.jpg",
  "img-0081.jpg",
  "img-0087.jpg",
  "img-0088.jpg",
  "img-0091.jpg",
  "img-0092.jpg",
  "img-0093.jpg",
  "img-0098.jpg",
  "img-0103.jpg",
  "img-2033.jpg",
  "img-0106.jpg",
  "img-0111.jpg",
  "img-0112.jpg",
  "img-0116.jpg",
  "img-0121.jpg",
  "img-0125.jpg",
  "img-0130.jpg",
  "pxl-20260926-032323256.jpg",
  "img-2013.jpg",
  "img-2010.jpg",
  "pxl-20260926-010722288-mp.jpg",
  "pxl-20260925-200647287-mp.jpg",
  "pxl-20260925-200640837.jpg",
  "img-0056.jpg",
  "img-0048.jpg",
  "img-0045.jpg",
];

const photos = photoFiles.map((file, i) => ({
  src: `/mancamp/gallery/${file}`,
  alt: `Man Camp 9, photo ${i + 1}`,
}));

export default function PhotosPage() {
  return (
    <>
      <ManCampPageHero eyebrow="Man Camp" title="Photos" subtitle="The men, the mountains, and the fellowship." />

      <section className="py-16 bg-parchment mc-topo">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-display text-base tracking-[0.3em] uppercase text-moss mb-2">September 2026</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-bark">Man Camp 9</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((p) => (
              <a
                key={p.src}
                href={p.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-canvas p-3 rounded-sm shadow-lg border-2 border-bark/15 hover:border-ember hover:shadow-2xl transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} className="w-full h-72 object-cover rounded-sm" loading="lazy" />
              </a>
            ))}
          </div>
          <p className="text-center text-lg mt-12">Tap any photo to see it full size.</p>
        </div>
      </section>
    </>
  );
}
