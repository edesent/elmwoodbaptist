interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional background photo. A navy overlay keeps the white text legible. */
  bgImage?: string;
}

export default function SubpageHero({ eyebrow, title, subtitle, bgImage }: Props) {
  return (
    <header className="relative pt-36 pb-20 bg-brown-deep overflow-hidden">
      {bgImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/80 via-brown-deep/70 to-brown-deep/90" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,85,0.18),transparent_60%)]" />
      )}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold-light mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="font-serif italic text-lg md:text-xl text-white/75 mt-5 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="w-20 h-[3px] bg-gold mx-auto mt-8 rounded" />
      </div>
    </header>
  );
}
