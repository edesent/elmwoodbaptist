import Link from "next/link";
import { MountainRidge, PineMark } from "@/components/mancamp/Outdoor";
import { LOGO_LIGHT } from "@/components/mancamp/brand";

export default function ManCampFooter() {
  return (
    <footer className="bg-pine text-canvas/85">
      <MountainRidge className="text-pine bg-parchment" />
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          {LOGO_LIGHT ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={LOGO_LIGHT} alt="Man Camp 10" className="w-full max-w-xs h-auto" />
          ) : (
            <div className="flex items-center gap-3">
              <PineMark className="w-9 h-9 text-ember" />
              <p className="font-display text-3xl font-bold tracking-[0.1em] uppercase text-parchment">Man Camp</p>
            </div>
          )}
          <p className="font-display text-sm tracking-[0.25em] uppercase text-ember-light mt-2">
            A ministry of Elmwood Baptist Church
          </p>
          <p className="mt-5 text-lg leading-relaxed">
            &ldquo;Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.&rdquo;
            <span className="block font-display text-sm tracking-[0.2em] uppercase text-ember-light mt-2">
              Proverbs 27:17
            </span>
          </p>
        </div>

        <div>
          <p className="font-display text-base font-semibold tracking-[0.25em] uppercase text-ember-light mb-4">
            The Trail
          </p>
          <ul className="space-y-2 text-lg">
            <li><Link href="/man-camp" className="hover:text-ember-light">Home</Link></li>
            <li><Link href="/man-camp/schedule" className="hover:text-ember-light">Schedule</Link></li>
            <li><Link href="/man-camp/register" className="hover:text-ember-light">Register</Link></li>
            <li><Link href="/man-camp/photos" className="hover:text-ember-light">Photos</Link></li>
            <li><Link href="/man-camp/faq" className="hover:text-ember-light">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-base font-semibold tracking-[0.25em] uppercase text-ember-light mb-4">
            Base Camp
          </p>
          <p className="text-lg leading-relaxed">
            Elmwood Baptist Church
            <br />
            13100 E 144th Ave
            <br />
            Brighton, CO 80601
            <br />
            <a href="tel:+13036593818" className="text-ember-light font-semibold">(303) 659-3818</a>
          </p>
          <a
            href="https://www.elmwoodbaptist.org"
            className="inline-block mt-5 font-display text-sm uppercase tracking-[0.15em] text-parchment border-2 border-parchment/40 rounded-sm px-5 py-2 hover:border-ember hover:text-ember-light"
          >
            Visit the church website
          </a>
        </div>
      </div>
      <p className="text-center text-sm text-canvas/50 pb-8">
        &copy; {new Date().getFullYear()} Elmwood Baptist Church. All rights reserved.
      </p>
    </footer>
  );
}
