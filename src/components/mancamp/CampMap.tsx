import { PineMark } from "@/components/mancamp/Outdoor";

// Silver State Baptist Youth Camp, Sedalia, CO (USGS map coordinates)
const LAT = 39.3736;
const LNG = -105.0861;
const MAP_EMBED = `https://www.google.com/maps?q=${LAT},${LNG}&z=12&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

export default function CampMap() {
  return (
    <section className="py-16 bg-parchment mc-topo">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="font-display text-base tracking-[0.3em] uppercase text-moss mb-3">Getting There</p>
          <h2 className="font-display text-5xl font-bold uppercase text-bark">Map to Camp</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 bg-canvas p-3 rounded-sm border-2 border-bark/15 shadow-lg">
            <iframe
              title="Map to Silver State Baptist Youth Camp"
              src={MAP_EMBED}
              className="w-full h-80 md:h-[26rem] rounded-sm border-0 iframe-shimmer"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="bg-pine text-canvas rounded-sm p-8 border-t-8 border-ember shadow-xl flex flex-col">
            <PineMark className="w-10 h-10 text-ember mb-4" />
            <h3 className="font-display text-3xl font-bold uppercase text-parchment leading-tight">
              Silver State Baptist Youth Camp
            </h3>
            <p className="font-display text-lg uppercase tracking-[0.12em] text-ember-light mt-2">Sedalia, Colorado</p>
            <p className="text-lg leading-relaxed mt-5">
              The camp sits up in the mountains southwest of Sedalia. Cell service can be spotty on
              mountain roads, so load your directions before you leave town.
            </p>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-6"
            >
              <span className="block text-center font-display text-lg font-semibold uppercase tracking-[0.15em] px-6 py-4 rounded-sm border-2 border-ember bg-ember text-parchment hover:bg-ember-light hover:border-ember-light hover:text-pine transition-colors">
                Get Directions
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
