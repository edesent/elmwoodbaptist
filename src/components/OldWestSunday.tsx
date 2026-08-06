"use client";

import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const facts = [
  { label: "Date", value: "Sunday, August 30" },
  { label: "Time", value: "10:00 AM" },
];

export default function OldWestSunday() {
  const [posterOpen, setPosterOpen] = useState(false);

  return (
    <section id="old-west-sunday" className="py-28 bg-brown-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/email/old-west-sunday-slide.jpg"
                alt="Old West Sunday at Elmwood Baptist Church"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-light mb-3">
                Special Event
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                Old West Sunday
              </h2>
              <p className="text-white/70 mb-7">
                Saddle up and join the Elmwood family for a special themed Sunday — come dressed
                in your best western wear!
              </p>

              <dl className="space-y-3 mb-8 border-t border-white/10 pt-6">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="sm:w-28 flex-shrink-0 text-xs font-bold tracking-[0.16em] uppercase text-gold-light/80 pt-1">
                      {f.label}
                    </dt>
                    <dd className="text-white font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => setPosterOpen(true)}
                className="inline-block bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Full Details
              </button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Poster lightbox */}
      {posterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Old West Sunday poster"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6 sm:p-8"
          onClick={() => setPosterOpen(false)}
        >
          <button
            type="button"
            onClick={() => setPosterOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/events/old-west-sunday-poster.jpg"
            alt="Old West Sunday poster — full details"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
