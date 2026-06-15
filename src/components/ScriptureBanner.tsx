import AnimateOnScroll from "./AnimateOnScroll";

export default function ScriptureBanner() {
  return (
    <section className="relative py-24 bg-brown-deep overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,85,0.18),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Inline badge variant for the dark section */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/40 bg-white/5 text-[11px] font-semibold tracking-[0.18em] uppercase text-gold-light">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold text-brown-deep text-[10px] font-bold">
              05
            </span>
            <span className="whitespace-nowrap">Scripture Banner</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gold/50" />
            <span className="hidden sm:inline-block normal-case tracking-normal text-[12px] font-normal text-white/70">
              A single verse that breaks up the page with reverence
            </span>
          </div>
        </div>

        <AnimateOnScroll>
          <div className="max-w-4xl mx-auto text-center">
            <svg className="w-10 h-10 text-gold/60 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.583 17.321C8.553 16.227 8 15 8 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm-8 0C.553 16.227 0 15 0 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <p className="font-serif text-2xl md:text-4xl font-medium italic text-white leading-relaxed mb-6">
              I was glad when they said unto me, Let us go into the house of the LORD.
            </p>
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-gold-light">
              — Psalm 122:1 (KJV)
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
