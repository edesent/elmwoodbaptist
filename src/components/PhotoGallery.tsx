"use client";

import { useCallback, useEffect, useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const photos = Array.from({ length: 10 }, (_, i) => `/gallery/gallery-${i + 1}.jpg`);

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [],
  );

  // Keyboard controls + lock background scroll while the lightbox is open
  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, showPrev, showNext]);

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
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="block w-full cursor-zoom-in"
                  aria-label="View larger image"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt="Elmwood Baptist Church"
                    loading="lazy"
                    className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </button>
              </figure>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[activeIndex]}
            alt="Elmwood Baptist Church"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <p className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {activeIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  );
}
