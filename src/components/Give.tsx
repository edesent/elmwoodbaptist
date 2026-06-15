import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";

export default function Give() {
  return (
    <section id="give" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <SectionBadge
          number={16}
          name="Give / Online Giving CTA"
          purpose="A clear way for members to give tithes and offerings online"
        />

        <AnimateOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brown via-brown-light to-brown-deep p-10 md:p-14 shadow-xl">
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gold/15 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-gold-light mb-3">
                  Giving
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
                  Support the Work of <em className="text-gold-light italic">the Lord.</em>
                </h2>
                <p className="text-white/80 leading-relaxed max-w-xl mb-3">
                  Your tithes and offerings support the ongoing ministry of Elmwood Baptist Church —
                  our missions, our bus ministry, and our academy. Give securely online — or drop your
                  offering in the plate Sunday morning.
                </p>
                <p className="font-serif italic text-white/60 text-sm">
                  &ldquo;Every man according as he purposeth in his heart, so let him give... for God loveth a cheerful giver.&rdquo;
                  <span className="block mt-1">— 2 Corinthians 9:7</span>
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <a
                  href="/give"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-9 py-4 rounded-full hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all whitespace-nowrap"
                >
                  Give Online
                </a>
                <a
                  href="/give#mail"
                  className="inline-flex items-center justify-center gap-2 text-white font-semibold text-xs tracking-wide uppercase px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 hover:border-white/60 transition-all whitespace-nowrap"
                >
                  Give by Mail
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
