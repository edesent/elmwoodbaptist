import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";

const photos = [
  { caption: "Sunday Worship", tone: "from-brown-light to-brown-deep" },
  { caption: "Master Club", tone: "from-gold to-brown-light" },
  { caption: "Fellowship Dinner", tone: "from-burgundy to-brown-deep" },
  { caption: "Bus Ministry", tone: "from-brown to-brown-deep" },
  { caption: "Man Camp", tone: "from-gold-dark to-brown" },
  { caption: "Truth 4 Teens", tone: "from-burgundy-dark to-brown-deep" },
];

export default function PhotoGallery() {
  return (
    <section id="gallery" className="py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionBadge
          number={17}
          name="Photo Gallery"
          purpose="A glimpse into recent moments — services, events, the church family"
        />

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((p, i) => (
            <AnimateOnScroll key={p.caption} delay={i * 60}>
              <figure
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all bg-gradient-to-br ${p.tone}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-light/90">
                    {p.caption}
                  </p>
                </figcaption>
              </figure>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
