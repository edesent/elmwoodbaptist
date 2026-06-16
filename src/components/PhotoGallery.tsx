import AnimateOnScroll from "./AnimateOnScroll";

const photos = Array.from({ length: 10 }, (_, i) => `/gallery/gallery-${i + 1}.jpg`);

export default function PhotoGallery() {
  return (
    <section id="gallery" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              Life at <em className="text-brown-light italic">Elmwood Baptist</em>
            </h2>
            <p className="text-text-body mt-3 max-w-2xl mx-auto">
              More than a church — we&rsquo;re a family. Here are a few moments from worship, ministries, and time together.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Masonry-style gallery */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:_balance]">
          {photos.map((src, i) => (
            <AnimateOnScroll key={src} delay={(i % 3) * 80}>
              <figure className="mb-3 md:mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Elmwood Baptist Church"
                  loading="lazy"
                  className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-500"
                />
              </figure>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
