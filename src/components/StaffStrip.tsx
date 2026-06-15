import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";

const staff = [
  { name: "Dr. Gary Randall", role: "Senior Pastor" },
  { name: "Pastor Brandon Bowser", role: "Associate Pastor" },
  { name: "Pastor Ben", role: "Assistant Pastor" },
  { name: "Pastor Rick Lopez", role: "Academy Administrator" },
];

export default function StaffStrip() {
  return (
    <section id="staff" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionBadge
          number={4}
          name="Staff & Leadership"
          purpose="A simple horizontal strip of the people serving the church"
        />

        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              Meet Our <em className="text-brown-light italic">Leadership</em>
            </h2>
            <p className="text-text-body mt-3 max-w-2xl mx-auto">
              The pastors and leaders who shepherd, teach, and serve the Elmwood church family.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {staff.map((person, i) => (
            <AnimateOnScroll key={person.role} delay={i * 100}>
              <div className="text-center group">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-cream-dark to-brown-light/20 shadow-md group-hover:shadow-lg transition-shadow ring-2 ring-gold/0 group-hover:ring-gold/40">
                  <div className="absolute inset-0 flex items-center justify-center text-brown-light/60">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif text-base font-semibold text-text-dark leading-tight">
                  {person.name}
                </h3>
                <p className="text-xs tracking-[0.12em] uppercase text-gold-dark mt-1 font-semibold">
                  {person.role}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
