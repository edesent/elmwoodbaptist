export default function PreachingHero() {
  return (
    <header id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — deep navy with a soft teal glow */}
      <div className="absolute inset-0 z-0 bg-brown-deep">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,179,214,0.22),transparent_60%)]" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/60 via-brown-deep/40 to-brown-deep/85 z-[1]" />

      {/* Content */}
      <div className="relative z-[2] text-center text-white max-w-3xl px-5 py-10">
        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-gold-light mb-3 animate-fade-up animation-delay-200">
          Welcome to
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-5 animate-fade-up animation-delay-400">
          Elmwood<br />Baptist Church
        </h1>
        <div className="w-20 h-[3px] bg-gold mx-auto mb-6 rounded animate-fade-up animation-delay-600" />
        <p className="font-serif text-2xl md:text-3xl italic text-white leading-relaxed max-w-xl mx-auto mb-3 animate-fade-up animation-delay-800">
          More Than A Church&hellip; We&rsquo;re A Family!
        </p>
        <p className="text-sm tracking-[0.18em] uppercase text-gold-light/90 mb-9 animate-fade-up animation-delay-900">
          God created us for community
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-up animation-delay-1000">
          <a
            href="#services"
            className="inline-block bg-gold text-brown-deep font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Plan Your Visit
          </a>
          <a
            href="/messages"
            className="inline-block text-white font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-white/50 hover:bg-white/10 hover:border-white hover:-translate-y-0.5 transition-all"
          >
            Watch Sermons
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] animate-fade-up animation-delay-1300">
        <a href="#welcome" className="flex flex-col items-center gap-2 text-white/50 text-xs tracking-[0.15em] uppercase">
          <span>Scroll</span>
          <div className="w-5 h-5 border-r-2 border-b-2 border-white/40 rotate-45 animate-scroll-bounce" />
        </a>
      </div>
    </header>
  );
}
