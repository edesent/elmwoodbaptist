import { MountainRidge } from "@/components/mancamp/Outdoor";

export default function ManCampPageHero({
  eyebrow,
  title,
  subtitle,
  image = "/mancamp/devils-head-nice.jpg",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <header className="relative bg-pine overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-pine/40 via-pine/60 to-pine/90" />
      <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-10 text-center">
        {eyebrow && (
          <p className="font-display text-base font-medium tracking-[0.35em] uppercase text-ember-light mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-[0.06em] text-parchment">
          {title}
        </h1>
        {subtitle && <p className="text-xl text-canvas mt-5 leading-relaxed">{subtitle}</p>}
      </div>
      <MountainRidge className="relative text-parchment" />
    </header>
  );
}
