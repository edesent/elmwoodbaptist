"use client";

import { useRef, useState } from "react";
import {
  MIN_FILL_MS,
  SERVICE_OPTIONS,
  type FieldErrors,
} from "@/lib/planVisit/validation";

// Submissions go to our own /api/plan-visit route, which rate-limits, validates
// and screens them before handing them to the WBC Chat backend — so they land
// in the church's private Slack channel, reaching the pastors' phones like a
// text message. Nothing here talks to the chat backend directly, and the chat
// key is no longer shipped to the browser with this form.

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all";
const labelClass =
  "block text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-2";

type Status = "idle" | "sending" | "done" | "error";

export default function PlanVisitForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // When this form first appeared on screen, and a stable id for this attempt —
  // together they let the server tell a person from a script, and shrug off a
  // double-click without sending the pastors two copies.
  const openedAt = useRef(Date.now());
  const idempotencyKey = useRef(
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );

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

    setFieldErrors({});
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
      const elapsedMs = Date.now() - openedAt.current;
      // A person who somehow beat the speed trap just waits out the remainder,
      // rather than being told their request looked like spam.
      if (elapsedMs < MIN_FILL_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_FILL_MS - elapsedMs));
      }

      const res = await fetch("/api/plan-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          preferredTime,
          notes,
          elapsedMs: Date.now() - openedAt.current,
          __idempotencyKey: idempotencyKey.current,
        }),
      });

      const payload = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string; fieldErrors?: FieldErrors }
        | null;

      if (!res.ok) {
        setStatus("idle");
        setFieldErrors(payload?.fieldErrors ?? {});
        setError(
          payload?.error ??
            "Something went wrong sending your request. Please call us at (303) 659-3818 and we'll be glad to help."
        );
        return;
      }

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
      {/* Honeypots */}
      <input
        type="text"
        name="company"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input
        type="text"
        name="botcheck"
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
            maxLength={80}
            placeholder="First and last name"
            className={inputClass}
          />
          {fieldErrors.name ? (
            <p className="mt-1.5 text-sm text-red-700">{fieldErrors.name}</p>
          ) : null}
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
            maxLength={30}
            placeholder="(303) 555-0123"
            className={inputClass}
          />
          {fieldErrors.phone ? (
            <p className="mt-1.5 text-sm text-red-700">{fieldErrors.phone}</p>
          ) : null}
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
          maxLength={120}
          placeholder="you@example.com"
          className={inputClass}
        />
        {fieldErrors.email ? (
          <p className="mt-1.5 text-sm text-red-700">{fieldErrors.email}</p>
        ) : null}
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
          maxLength={1000}
          placeholder="How many are coming, ages of your children, questions you have…"
          className={`${inputClass} resize-none`}
        />
        {fieldErrors.notes ? (
          <p className="mt-1.5 text-sm text-red-700">{fieldErrors.notes}</p>
        ) : null}
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
