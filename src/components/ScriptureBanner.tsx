import AnimateOnScroll from "./AnimateOnScroll";

export default function ScriptureBanner() {
  return (
    <section className="relative py-24 bg-brown-deep overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,85,0.18),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
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
