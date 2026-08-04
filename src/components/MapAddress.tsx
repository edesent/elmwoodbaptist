import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";
import ContactModal from "./ContactModal";

export default function MapAddress() {
  return (
    <section id="contact" className="py-28 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionBadge
          number={18}
          name="Where to Find Us"
          purpose="Address, embedded map, phone, and directions"
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-stretch">
          <AnimateOnScroll>
            <div className="h-full p-8 md:p-10 bg-warm-white rounded-2xl border border-cream-dark shadow-sm flex flex-col">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-gold-dark mb-3">
                Visit Us
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug mb-6">
                Come Worship <em className="text-brown-light italic">With Us</em>
              </h2>

              <div className="space-y-5 mb-8 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center text-brown-light flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-0.5">Address</p>
                    <p className="text-text-dark font-medium">13100 E 144th Ave<br />Brighton, CO 80601</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center text-brown-light flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-0.5">Phone</p>
                    <a href="tel:+13036593818" className="text-text-dark font-medium hover:text-brown-light transition-colors">
                      (303) 659-3818
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center text-brown-light flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-0.5">Email</p>
                    <a href="mailto:office@elmwoodbaptist.org" className="text-text-dark font-medium hover:text-brown-light transition-colors">
                      office@elmwoodbaptist.org
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=13100+E+144th+Ave+Brighton+CO+80601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  Get Directions
                </a>
                <ContactModal />
                <a
                  href="https://elmwoodbaptistchurchacademy.breezechms.com/form/ba4d32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-brown-light font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light/50 hover:bg-brown-light/10 hover:border-brown-light transition-all"
                >
                  Fill Out a Connect Card
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-sm border border-cream-dark relative bg-cream-dark">
              <iframe
                title="Map to Elmwood Baptist Church"
                src="https://www.google.com/maps?q=13100+E+144th+Ave,+Brighton,+CO+80601&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
