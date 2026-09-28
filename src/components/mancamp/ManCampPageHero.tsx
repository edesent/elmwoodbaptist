export default function ManCampPageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="relative py-20 bg-brown-deep overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url(/mancamp/devils-head-nice.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/60 to-brown-deep" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {eyebrow && (
          <p className="text-sm font-bold tracking-[0.25em] uppercase text-gold-light mb-4">{eyebrow}</p>
        )}
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xl text-white/80 mt-5 leading-relaxed">{subtitle}</p>}
      </div>
    </header>
  );
}
