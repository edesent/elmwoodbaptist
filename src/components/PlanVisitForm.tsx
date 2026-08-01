"use client";

import { useState } from "react";

// WBC Chat backend — the same site key the chat widget in layout.tsx uses.
// A submission here lands instantly in the church's private Slack channel,
// which reaches the pastors' phones like a text message.
const CHAT_API = "https://slackwebsitechat.vercel.app";
const CHAT_KEY = "wbc_93cf6d847031ded84bdb9bbe47d51fa1a7c89c160114ce41";

const SERVICE_OPTIONS = [
  "Sunday Service — 10:00 AM",
  "Family Bible Time (Sunday School) — 11:30 AM",
  "Sunday Afternoon Service — 1:30 PM",
  "Thursday Mid-Week Service — 7:00 PM",
  "I'm not sure yet",
];

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all";
const labelClass =
  "block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2";

type Status = "idle" | "sending" | "done" | "error";

export default function PlanVisitForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — hidden from people, tempting to bots. Pretend success.
    if (String(data.get("company") ?? "").trim()) {
      setStatus("done");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const preferredTime = String(data.get("preferredTime") ?? "");
    const notes = String(data.get("notes") ?? "").trim();

    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (phone.replace(/[^0-9]/g, "").length < 7) {
      setError("Please enter a phone number we can reach you at.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${CHAT_API}/api/chat/coffee-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: CHAT_KEY,
          name,
          phone,
          email,
          preferredTime,
          subject: "📍 Plan a Visit Request",
          message: notes,
          request: notes,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending your request. Please call us at (303) 659-3818 and we'll be glad to help."
      );
    }
  }

  if (status === "done") {
    return (
      <div className="text-center py-8">
        <span className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </span>
        <h3 className="font-serif text-2xl font-bold text-text-dark mb-2">
          We can&rsquo;t wait to meet you!
        </h3>
        <p className="text-text-body max-w-md mx-auto leading-relaxed">
          Thanks for letting us know you&rsquo;re coming. Someone from our church
          family will reach out to say hello and help you plan your visit. More
          than a church &mdash; we&rsquo;re a family. See you soon!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="visit-name" className={labelClass}>
            Your Name
          </label>
          <input
            id="visit-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="First and last name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="visit-phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="visit-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(303) 555-0123"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="visit-email" className={labelClass}>
          Email <span className="font-medium normal-case tracking-normal text-text-muted">(optional)</span>
        </label>
        <input
          id="visit-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="visit-service" className={labelClass}>
          Which service would you like to visit?
        </label>
        <select
          id="visit-service"
          name="preferredTime"
          defaultValue={SERVICE_OPTIONS[0]}
          className={inputClass}
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="visit-notes" className={labelClass}>
          Anything we should know?{" "}
          <span className="font-medium normal-case tracking-normal text-text-muted">
            (optional)
          </span>
        </label>
        <textarea
          id="visit-notes"
          name="notes"
          rows={3}
          placeholder="How many are coming, ages of your children, questions you have…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-9 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Sending…" : "Plan My Visit"}
      </button>

      <p className="text-xs text-text-light text-center leading-relaxed">
        We&rsquo;ll reach out with a friendly hello &mdash; no spam, ever.
      </p>
    </form>
  );
}
