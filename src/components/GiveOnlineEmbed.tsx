"use client";

import { useState } from "react";

/**
 * Give Online — collapsed by default.
 * Shows a compact card with a button; clicking it reveals the Tithe.ly form
 * in place, so the page doesn't lead with a huge embedded iframe.
 */
export default function GiveOnlineEmbed() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="rounded-2xl border border-cream-dark shadow-sm bg-white p-10 text-center">
        <p className="text-text-body leading-relaxed mb-6">
          Give a one-time gift or set up recurring giving securely through our online giving
          form, powered by Tithe.ly.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
        >
          Give Here
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cream-dark shadow-sm overflow-hidden bg-white">
      <div className="flex items-center justify-between px-5 py-3 border-b border-cream-dark bg-cream">
        <p className="text-sm font-semibold text-text-dark">Secure Online Giving</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm font-semibold text-brown-light hover:text-brown transition-colors"
        >
          Close
        </button>
      </div>
      <iframe
        title="Give to Elmwood Baptist Church"
        src="https://tithe.ly/give_new/www/#/tithely/give-one-time/4263938"
        className="w-full h-[760px] border-0"
        loading="lazy"
      />
    </div>
  );
}
