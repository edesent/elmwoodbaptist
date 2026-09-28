import Link from "next/link";

export default function ManCampFooter() {
  return (
    <footer className="bg-brown-deep text-white/80 border-t border-gold/30">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-bold tracking-[0.12em] uppercase text-white">Man Camp</p>
          <p className="text-sm tracking-[0.2em] uppercase text-gold-light mt-1">
            A ministry of Elmwood Baptist Church
          </p>
          <p className="mt-4 text-base leading-relaxed">
            &ldquo;Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.&rdquo;
            <span className="block text-sm text-gold-light mt-1">Proverbs 27:17</span>
          </p>
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-gold-light mb-3">Man Camp</p>
          <ul className="space-y-2 text-base">
            <li><Link href="/man-camp" className="hover:text-gold-light">Home</Link></li>
            <li><Link href="/man-camp/schedule" className="hover:text-gold-light">Schedule</Link></li>
            <li><Link href="/man-camp/register" className="hover:text-gold-light">Register</Link></li>
            <li><Link href="/man-camp/photos" className="hover:text-gold-light">Photos</Link></li>
            <li><Link href="/man-camp/faq" className="hover:text-gold-light">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-gold-light mb-3">Questions?</p>
          <p className="text-base leading-relaxed">
            Elmwood Baptist Church
            <br />
            13100 E 144th Ave
            <br />
            Brighton, CO 80601
            <br />
            <a href="tel:+13036593818" className="text-gold-light font-semibold">(303) 659-3818</a>
          </p>
          <a
            href="https://www.elmwoodbaptist.org"
            className="inline-block mt-4 text-sm font-semibold uppercase tracking-wide text-white border border-white/40 rounded-full px-5 py-2 hover:border-gold-light hover:text-gold-light"
          >
            Visit the church website
          </a>
        </div>
      </div>
      <p className="text-center text-sm text-white/50 pb-8">
        &copy; {new Date().getFullYear()} Elmwood Baptist Church. All rights reserved.
      </p>
    </footer>
  );
}
