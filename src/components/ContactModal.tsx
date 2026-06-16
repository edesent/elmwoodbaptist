"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all";
const labelClass =
  "block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    // Reset back to the form a moment after the panel closes.
    setTimeout(() => setStatus("idle"), 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-block self-start bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
      >
        Send Us a Message
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Contact us"
          >
            {/* Lightbox backdrop */}
            <div
              className="absolute inset-0 bg-brown-deep/70 backdrop-blur-sm animate-fade-up"
              onClick={close}
            />

            {/* Panel */}
            <div className="relative w-full max-w-lg bg-warm-white rounded-2xl shadow-2xl p-7 md:p-9 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-text-light hover:bg-cream-dark hover:text-text-dark transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.3 5.71 12 12.01l-6.29-6.3-1.42 1.42 6.3 6.29-6.3 6.29 1.42 1.42 6.29-6.3 6.3 6.3 1.42-1.42-6.3-6.29 6.3-6.29z" />
                </svg>
              </button>

              {status === "success" ? (
                <div className="text-center py-6">
                  <svg
                    className="w-14 h-14 mx-auto mb-4 text-gold-dark"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <h3 className="font-serif text-2xl font-bold text-text-dark mb-2">
                    Thank you for reaching out.
                  </h3>
                  <p className="text-text-body mb-6">
                    We&rsquo;ve received your message and will get back to you as soon
                    as we can. More than a church, we&rsquo;re a family.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 pr-8">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-dark leading-snug">
                      We&rsquo;d Love to <em className="text-brown-light italic">Hear From You.</em>
                    </h2>
                    <p className="text-text-body mt-2 text-sm leading-relaxed">
                      Have a question, a prayer need, or just want to plan a visit?
                      Send us a note and someone from our church family will be in touch.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot — hidden from people, tempting to bots. Web3Forms
                        silently drops the submission if this gets filled/checked. */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-first" className={labelClass}>
                          First Name
                        </label>
                        <input
                          id="contact-first"
                          name="first_name"
                          type="text"
                          required
                          placeholder="Jane"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-last" className={labelClass}>
                          Last Name
                        </label>
                        <input
                          id="contact-last"
                          name="last_name"
                          type="text"
                          placeholder="Doe"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="(303) 555-0123"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className={labelClass}>
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        placeholder="How can we help you?"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                        Oops — there was an error sending your message. Please try
                        again, or email us at office@elmwoodbaptist.org.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
