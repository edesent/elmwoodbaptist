"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PrayerModal() {
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
    setTimeout(() => setStatus("idle"), 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/prayer", {
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
        className="inline-flex items-center gap-2 text-gold-light font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-gold/50 hover:bg-gold/10 hover:border-gold hover:-translate-y-0.5 transition-all"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21s-7-4.35-9.5-8.5C.9 9.8 2.2 6 5.5 6c1.9 0 3.3 1.1 4.1 2.3C10.2 7.1 11.6 6 13.5 6c3.3 0 4.6 3.8 3 6.5C19 16.65 12 21 12 21z" />
        </svg>
        Request Prayer
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Prayer request"
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
                  <svg className="w-14 h-14 mx-auto mb-4 text-gold-dark" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <h3 className="font-serif text-2xl font-bold text-text-dark mb-2">
                    Thank you — we&rsquo;ll be praying.
                  </h3>
                  <p className="text-text-body mb-6">
                    Your request has been received. May the Lord bless and encourage you.
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
                      How Can We <em className="text-brown-light italic">Pray For You?</em>
                    </h2>
                    <p className="text-text-body mt-2 text-sm leading-relaxed">
                      Pastor Randall and our prayer team would be honored to lift you up before the
                      Lord this week. More than a church, we&rsquo;re a family.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot — hidden from people, tempting to bots. The server
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

                    <div>
                      <label className="block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2">
                        Prayer Request
                      </label>
                      <textarea
                        name="request"
                        required
                        rows={4}
                        placeholder="Share whatever is on your heart..."
                        className="w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all resize-none"
                      />
                    </div>

                    <label className="flex items-start gap-3 text-sm text-text-body">
                      <input
                        type="checkbox"
                        name="private"
                        className="mt-1 w-4 h-4 accent-brown-light"
                      />
                      <span>Keep my request private — only the pastor will see it.</span>
                    </label>

                    {status === "error" && (
                      <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                        Oops — there was an error sending your request. Please try
                        again, or email us at office@elmwoodbaptist.org.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {status === "sending" ? "Sending…" : "Send Prayer Request"}
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
