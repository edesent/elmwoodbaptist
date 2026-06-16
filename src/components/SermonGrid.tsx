"use client";

import { useEffect, useMemo, useState } from "react";
import type { SermonVideo } from "@/lib/youtube";

export default function SermonGrid({ videos }: { videos: SermonVideo[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = useMemo(
    () => videos.find((v) => v.id === activeId) || null,
    [activeId, videos],
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveId(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActiveId(v.id)}
            className="group text-left overflow-hidden rounded-2xl border border-cream-dark bg-warm-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <div className="relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.thumbnail}
                alt={v.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-brown-deep/55 via-transparent to-transparent" />
              <span className="absolute right-3 bottom-3 w-12 h-12 rounded-full bg-gold flex items-center justify-center text-brown-deep shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-gold-dark">
                {v.published}
              </p>
              <h3 className="mt-2 font-serif text-lg font-semibold text-text-dark leading-snug line-clamp-2">
                {v.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brown-deep/90 backdrop-blur-sm p-4">
          <button
            type="button"
            onClick={() => setActiveId(null)}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Close
          </button>
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
