"use client";

import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import SectionBadge from "./SectionBadge";

export default function PrayerRequest() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="prayer" className="py-28 bg-warm-white">
      <div className="max-w-3xl mx-auto px-6">
        <SectionBadge
          number={19}
          name="Prayer Request Form"
          purpose="A simple form so visitors can ask the church to pray with them"
        />

        <AnimateOnScroll>
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark leading-snug">
              How Can We <em className="text-brown-light italic">Pray For You?</em>
            </h2>
            <p className="text-text-body mt-3">
              Share your request with us — Pastor Randall and our prayer team will lift you up before the Lord this week. More than a church, we&rsquo;re a family, and we&rsquo;d be honored to pray with you.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          {submitted ? (
            <div className="p-10 bg-cream rounded-2xl border border-cream-dark text-center">
              <svg className="w-14 h-14 mx-auto mb-4 text-gold-dark" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <h3 className="font-serif text-2xl font-bold text-text-dark mb-2">
                Thank you — we&rsquo;ll be praying.
              </h3>
              <p className="text-text-body">
                Your request has been received. May the Lord bless and encourage you.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="p-8 md:p-10 bg-cream rounded-2xl border border-cream-dark space-y-5"
            >
              <div>
                <label className="block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-lg bg-warm-white border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-warm-white border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2">
                  Prayer Request
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Share whatever is on your heart..."
                  className="w-full px-4 py-3 rounded-lg bg-warm-white border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all resize-none"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-text-body">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-brown-light"
                />
                <span>Keep my request private — only the pastor will see it.</span>
              </label>

              <button
                type="submit"
                className="w-full sm:w-auto bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Send Prayer Request
              </button>
            </form>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
