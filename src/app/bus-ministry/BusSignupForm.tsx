"use client";

import { useEffect, useRef, useState } from "react";
import {
  MAX_CHILDREN,
  MAX_CHILD_AGE,
  MIN_AGE_RIDING_ALONE,
  validateBusSignup,
  type FieldErrors,
} from "@/lib/busSignup/validation";
import { BusIcon, StarIcon } from "./icons";

// Submissions go to our own /api/bus-signup route, which rate-limits,
// validates (with the same rules this form runs) and screens them before
// emailing the church office. Nothing is stored in the browser or on the site.

const display = "font-[family-name:var(--font-fredoka)]";

const inputClass =
  "w-full rounded-2xl border-2 border-cream-dark bg-warm-white px-4 py-3.5 text-lg text-text-dark placeholder:text-text-muted transition-colors focus:border-brown-light focus:outline-none focus:ring-4 focus:ring-bus/60 aria-[invalid=true]:border-red-600 aria-[invalid=true]:bg-red-50";
const labelClass = `${display} mb-1.5 block text-base font-semibold text-brown-deep`;
const errorClass = "mt-1.5 text-base font-semibold text-red-700";
const legendClass = `${display} text-2xl font-bold text-brown-deep`;

const PHONE_FALLBACK =
  "Something went wrong sending your sign-up. Please call us at (303) 659-3818 and we'll be glad to help.";

const TEXT_FIELDS = new Set(["guardianName", "phone", "street", "unit", "city", "state", "zip"]);

type Status = "idle" | "sending" | "done";
type Riding = "" | "yes" | "no";
type ChildRow = { id: number; name: string; age: string };

const AGE_OPTIONS = Array.from({ length: MAX_CHILD_AGE + 1 }, (_, age) => ({
  value: String(age),
  label: age === 0 ? "Under 1" : String(age),
}));

function TextField({
  id,
  name,
  label,
  error,
  optional,
  className = "",
  ...input
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional ? (
          <span className="ml-1.5 font-sans text-sm font-normal text-text-light">(optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        className={inputClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...input}
      />
      {error ? (
        <p id={`${id}-error`} className={errorClass}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function BusSignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [riding, setRiding] = useState<Riding>("");
  const [children, setChildren] = useState<ChildRow[]>([]);
  const [potty, setPotty] = useState(false);
  const [slip, setSlip] = useState(false);
  const [kidsOnlySent, setKidsOnlySent] = useState(false);
  const [focusTick, setFocusTick] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const nextChildId = useRef(1);

  // A server-signed stamp of when this form appeared, and a stable id for this
  // attempt — together they let the server tell a person from a script, and
  // shrug off a double-click without sending the office two copies.
  const formToken = useRef<Promise<string | null> | null>(null);
  const idempotencyKey = useRef(
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );

  function fetchFormToken(): Promise<string | null> {
    return fetch("/api/bus-signup", { cache: "no-store" })
      .then((res) => res.json())
      .then((body: { token?: string | null }) => body.token ?? null)
      .catch(() => null);
  }

  useEffect(() => {
    formToken.current = fetchFormToken();
  }, []);

  // After a failed submit, move keyboard/screen-reader focus to the first
  // field with a problem (the DOM order is the visual order).
  useEffect(() => {
    if (focusTick === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [focusTick]);

  // The form is tall; once it turns into the confirmation, bring that into view.
  useEffect(() => {
    if (status === "done") {
      document.getElementById("pickup-registration")?.scrollIntoView({ block: "start" });
    }
  }, [status]);

  // Fixing a field clears its message right away, instead of leaving red text
  // on screen until the next submit.
  function clearErrors(...keys: string[]) {
    if (!keys.some((k) => k in fieldErrors)) return;
    const next = { ...fieldErrors };
    for (const k of keys) delete next[k];
    setFieldErrors(next);
    if (Object.keys(next).length === 0) setError("");
  }

  function newChild(): ChildRow {
    return { id: nextChildId.current++, name: "", age: "" };
  }

  function addChild() {
    // Make the row (and its id) outside the updater: React may run updaters
    // twice, and an id handed out inside one would be skipped.
    const row = newChild();
    setChildren((rows) => (rows.length >= MAX_CHILDREN ? rows : [...rows, row]));
    clearErrors("children");
  }

  function removeChild(id: number) {
    setChildren((rows) => rows.filter((r) => r.id !== id));
  }

  function updateChild(id: number, patch: Partial<ChildRow>) {
    setChildren((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    clearErrors(
      ...(patch.name !== undefined ? [`child.${id}.name`] : []),
      ...(patch.age !== undefined ? [`child.${id}.age`] : [])
    );
  }

  function chooseRiding(value: Riding) {
    setRiding(value);
    // The age rule depends on this answer, so old age messages are out of date.
    clearErrors(
      "guardianRiding",
      "children",
      ...children.map((c) => `child.${c.id}.age`)
    );
    // Children riding alone means there has to be at least one child.
    if (value === "no") {
      const row = newChild();
      setChildren((rows) => (rows.length === 0 ? [row] : rows));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — hidden from people, tempting to bots. Pretend success.
    if (String(data.get("company") ?? "").trim()) {
      setStatus("done");
      return;
    }

    const text = (key: string) => String(data.get(key) ?? "");
    const payload = {
      guardianName: text("guardianName"),
      phone: text("phone"),
      street: text("street"),
      unit: text("unit"),
      city: text("city"),
      state: text("state"),
      zip: text("zip"),
      guardianRiding: riding === "yes" ? true : riding === "no" ? false : undefined,
      children: children.map((c) => ({ name: c.name, age: c.age === "" ? "" : Number(c.age) })),
      pottyTrained: potty,
      permissionSlip: slip,
    };

    // Same rules the server applies, so people see problems instantly.
    const { errors } = validateBusSignup(payload);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(remapChildErrors(errors, children));
      setError("Almost there! Please check the highlighted spots.");
      setFocusTick((n) => n + 1);
      return;
    }

    setFieldErrors({});
    setError("");
    setStatus("sending");
    try {
      // If the first fetch failed (a flaky connection), try once more now.
      let token = await (formToken.current ?? Promise.resolve(null));
      if (!token) token = await fetchFormToken();

      const res = await fetch("/api/bus-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          formToken: token,
          __idempotencyKey: idempotencyKey.current,
        }),
      });

      const body = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string; fieldErrors?: FieldErrors }
        | null;

      if (!res.ok) {
        setStatus("idle");
        setFieldErrors(remapChildErrors(body?.fieldErrors ?? {}, children));
        setError(body?.error ?? PHONE_FALLBACK);
        if (body?.fieldErrors) setFocusTick((n) => n + 1);
        return;
      }

      setKidsOnlySent(riding === "no");
      setStatus("done");
    } catch {
      setStatus("idle");
      setError(PHONE_FALLBACK);
    }
  }

  if (status === "done") {
    return (
      <div className="py-6 text-center" role="status">
        <BusIcon className="mx-auto w-40" />
        <h3 className={`${display} mt-6 text-3xl font-bold text-brown-deep`}>
          You&rsquo;re on the list!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed">
          Thank you! Someone from our bus team will reach out to confirm your
          pickup. We can&rsquo;t wait to see you on the bus!
        </p>
        {kidsOnlySent ? (
          <p className="mx-auto mt-4 max-w-md rounded-2xl bg-bus-soft p-4 text-lg leading-relaxed text-brown-deep">
            <strong>Don&rsquo;t forget:</strong> children riding without a
            parent or guardian need a signed permission slip. We&rsquo;ll
            follow up with you about it.
          </p>
        ) : null}
      </div>
    );
  }

  const ridingAlone = riding === "no";
  const childIndexById = new Map(children.map((c, i) => [c.id, i]));

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={(e) => {
        if (e.target instanceof HTMLInputElement && TEXT_FIELDS.has(e.target.name)) {
          clearErrors(e.target.name);
        }
      }}
      className="space-y-9"
      noValidate
    >
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

      {/* ── 1. The grown-up ── */}
      <fieldset className="space-y-4">
        <legend className={legendClass}>About you</legend>
        <TextField
          id="bus-guardianName"
          name="guardianName"
          label="Parent or guardian name"
          autoComplete="name"
          maxLength={80}
          placeholder="First and last name"
          error={fieldErrors.guardianName}
        />
        <TextField
          id="bus-phone"
          name="phone"
          label="Phone number"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={30}
          placeholder="(303) 555-0123"
          error={fieldErrors.phone}
        />
      </fieldset>

      {/* ── 2. Pickup address ── */}
      <fieldset className="space-y-4">
        <legend className={legendClass}>Where should we pick you up?</legend>
        <TextField
          id="bus-street"
          name="street"
          label="Street address"
          autoComplete="address-line1"
          maxLength={100}
          placeholder="123 Main Street"
          error={fieldErrors.street}
        />
        <TextField
          id="bus-unit"
          name="unit"
          label="Apartment or unit"
          optional
          autoComplete="address-line2"
          maxLength={30}
          error={fieldErrors.unit}
        />
        <div className="grid grid-cols-6 gap-4">
          <TextField
            id="bus-city"
            name="city"
            label="City"
            autoComplete="address-level2"
            maxLength={60}
            error={fieldErrors.city}
            className="col-span-6 sm:col-span-3"
          />
          <TextField
            id="bus-state"
            name="state"
            label="State"
            autoComplete="address-level1"
            defaultValue="CO"
            maxLength={2}
            error={fieldErrors.state}
            className="col-span-2 sm:col-span-1"
          />
          <TextField
            id="bus-zip"
            name="zip"
            label="ZIP code"
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={10}
            error={fieldErrors.zip}
            className="col-span-4 sm:col-span-2"
          />
        </div>
      </fieldset>

      {/* ── 3. Who is riding ── */}
      <fieldset>
        <legend className={legendClass}>Will you be riding along?</legend>
        <p className="mt-1 text-base text-text-light">
          Your whole family is welcome on the bus!
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(
            [
              { value: "yes", title: "Yes, I'm riding too", sub: "With my kids, or just me" },
              { value: "no", title: "No, just my kids", sub: "Children riding on their own" },
            ] as const
          ).map((opt, i) => (
            <label
              key={opt.value}
              className="relative flex cursor-pointer flex-col rounded-2xl border-2 border-cream-dark bg-warm-white p-4 transition-colors hover:border-brown-light has-[:checked]:border-brown-deep has-[:checked]:bg-bus-soft has-[:checked]:shadow-[0_4px_0_var(--color-bus)] has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brown-light"
            >
              <input
                id={i === 0 ? "bus-riding-yes" : "bus-riding-no"}
                type="radio"
                name="guardianRiding"
                value={opt.value}
                checked={riding === opt.value}
                onChange={() => chooseRiding(opt.value)}
                aria-invalid={i === 0 && fieldErrors.guardianRiding ? true : undefined}
                aria-describedby={fieldErrors.guardianRiding ? "bus-riding-error" : undefined}
                className="sr-only"
              />
              <span className={`${display} text-xl font-bold text-brown-deep`}>{opt.title}</span>
              <span className="text-base text-text-light">{opt.sub}</span>
            </label>
          ))}
        </div>
        {fieldErrors.guardianRiding ? (
          <p id="bus-riding-error" className={errorClass}>
            {fieldErrors.guardianRiding}
          </p>
        ) : null}

        {ridingAlone ? (
          <div className="mt-4 rounded-2xl border-2 border-bus bg-bus-soft p-5 text-brown-deep">
            <p className={`${display} text-lg font-bold`}>
              Good to know when kids ride on their own
            </p>
            <ul className="mt-2 space-y-1.5 text-base leading-relaxed">
              <li className="flex gap-2">
                <StarIcon className="mt-1 h-4 w-4 shrink-0 text-bus-dark" />
                Children must be {MIN_AGE_RIDING_ALONE} or older.
              </li>
              <li className="flex gap-2">
                <StarIcon className="mt-1 h-4 w-4 shrink-0 text-bus-dark" />
                Children must be potty trained.
              </li>
              <li className="flex gap-2">
                <StarIcon className="mt-1 h-4 w-4 shrink-0 text-bus-dark" />
                We&rsquo;ll need a signed permission slip.
              </li>
            </ul>
            <p className="mt-2 text-base">
              Younger children are always welcome when a parent or guardian
              rides along.
            </p>
          </div>
        ) : null}
      </fieldset>

      {/* ── 4. Children ── */}
      <fieldset>
        <legend className={legendClass}>Who&rsquo;s riding with us?</legend>
        <p className="mt-1 text-base text-text-light">
          {ridingAlone
            ? "Add each child who will be riding."
            : "Add each child who will be riding. No kids? You can skip this part."}
        </p>

        <ul className="mt-4 space-y-4">
          {children.map((child, i) => {
            const nameError = fieldErrors[`child.${child.id}.name`];
            const ageError = fieldErrors[`child.${child.id}.age`];
            const ageNum = child.age === "" ? null : Number(child.age);
            const tooYoungHint =
              ridingAlone && ageNum !== null && ageNum < MIN_AGE_RIDING_ALONE && !ageError;
            return (
              <li
                key={child.id}
                className="rounded-2xl border-2 border-sky-soft bg-sky-soft/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className={`${display} text-lg font-bold text-brown-deep`}>
                    Child {i + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeChild(child.id)}
                    aria-label={`Remove child ${i + 1}`}
                    className="rounded-full px-3 py-1.5 text-base font-semibold text-red-700 underline decoration-2 underline-offset-4 hover:bg-red-50 focus-visible:outline-4 focus-visible:outline-red-300"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-2 grid gap-4 sm:grid-cols-[1fr_9rem]">
                  <TextField
                    id={`bus-child-${child.id}-name`}
                    name={`childName${child.id}`}
                    label="Name"
                    value={child.name}
                    onChange={(e) => updateChild(child.id, { name: e.target.value })}
                    maxLength={40}
                    autoComplete="off"
                    error={nameError}
                  />
                  <div>
                    <label htmlFor={`bus-child-${child.id}-age`} className={labelClass}>
                      Age
                    </label>
                    <select
                      id={`bus-child-${child.id}-age`}
                      name={`childAge${child.id}`}
                      value={child.age}
                      onChange={(e) => updateChild(child.id, { age: e.target.value })}
                      className={inputClass}
                      aria-invalid={ageError ? true : undefined}
                      aria-describedby={
                        ageError || tooYoungHint ? `bus-child-${child.id}-age-note` : undefined
                      }
                    >
                      <option value="">Choose…</option>
                      {AGE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {ageError ? (
                  <p id={`bus-child-${child.id}-age-note`} className={errorClass}>
                    {ageError}
                  </p>
                ) : tooYoungHint ? (
                  <p
                    id={`bus-child-${child.id}-age-note`}
                    className="mt-1.5 text-base font-semibold text-brown-deep"
                  >
                    Heads up: children under {MIN_AGE_RIDING_ALONE} can ride when a parent
                    or guardian rides along.
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>

        {fieldErrors.children ? (
          <p id="bus-children-error" className={errorClass}>
            {fieldErrors.children}
          </p>
        ) : null}

        {children.length < MAX_CHILDREN ? (
          <button
            id="bus-add-child"
            type="button"
            onClick={addChild}
            aria-invalid={fieldErrors.children ? true : undefined}
            aria-describedby={fieldErrors.children ? "bus-children-error" : undefined}
            className={`${display} mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-dashed border-brown-light px-4 py-4 text-lg font-bold text-brown-light transition-colors hover:bg-sky-soft focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brown-light`}
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              +
            </span>
            {children.length === 0 ? "Add a child" : "Add another child"}
          </button>
        ) : (
          <p className="mt-4 text-base text-text-light">
            That&rsquo;s the most we can sign up at once. Call us to add more.
          </p>
        )}
      </fieldset>

      {/* ── 5. Confirmations for kids riding on their own ── */}
      {ridingAlone ? (
        <fieldset className="space-y-3">
          <legend className={legendClass}>Just a couple of checks</legend>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-cream-dark bg-warm-white p-4 has-[:checked]:border-brown-deep has-[:checked]:bg-bus-soft has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brown-light">
            <input
              id="bus-potty"
              type="checkbox"
              checked={potty}
              onChange={(e) => {
                setPotty(e.target.checked);
                clearErrors("pottyTrained");
              }}
              aria-invalid={fieldErrors.pottyTrained ? true : undefined}
              aria-describedby={fieldErrors.pottyTrained ? "bus-potty-error" : undefined}
              className="mt-1 h-6 w-6 shrink-0 accent-brown-deep"
            />
            <span className="text-lg leading-snug text-text-dark">
              My children are potty trained.
            </span>
          </label>
          {fieldErrors.pottyTrained ? (
            <p id="bus-potty-error" className={errorClass}>
              {fieldErrors.pottyTrained}
            </p>
          ) : null}

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-cream-dark bg-warm-white p-4 has-[:checked]:border-brown-deep has-[:checked]:bg-bus-soft has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brown-light">
            <input
              id="bus-slip"
              type="checkbox"
              checked={slip}
              onChange={(e) => {
                setSlip(e.target.checked);
                clearErrors("permissionSlip");
              }}
              aria-invalid={fieldErrors.permissionSlip ? true : undefined}
              aria-describedby={fieldErrors.permissionSlip ? "bus-slip-error" : undefined}
              className="mt-1 h-6 w-6 shrink-0 accent-brown-deep"
            />
            <span className="text-lg leading-snug text-text-dark">
              I understand that a signed permission slip is needed before my
              children can ride without me.
            </span>
          </label>
          {fieldErrors.permissionSlip ? (
            <p id="bus-slip-error" className={errorClass}>
              {fieldErrors.permissionSlip}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="rounded-2xl border-2 border-red-300 bg-red-50 px-4 py-3 text-lg font-semibold text-red-800"
        >
          {error}
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`${display} flex w-full items-center justify-center gap-3 rounded-full bg-bus px-8 py-4 text-xl font-bold text-brown-deep shadow-[0_6px_0_var(--color-bus-dark)] transition-all hover:-translate-y-0.5 active:translate-y-1 active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brown-deep disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0`}
        >
          {status === "sending" ? "Sending…" : "Save our seats!"}
        </button>
        <p className="mt-3 text-center text-sm leading-relaxed text-text-light">
          We&rsquo;ll use this to set up your pickup and to contact you about
          your ride.
        </p>
      </div>
    </form>
  );
}

/**
 * The validator numbers children by position (`child.0.name`); the form keys
 * its inputs by a stable id so adding/removing rows never mixes them up.
 */
function remapChildErrors(errors: FieldErrors, rows: ChildRow[]): FieldErrors {
  const out: FieldErrors = {};
  for (const [key, message] of Object.entries(errors)) {
    const match = /^child\.(\d+)\.(name|age)$/.exec(key);
    if (match) {
      const row = rows[Number(match[1])];
      if (row) out[`child.${row.id}.${match[2]}`] = message;
    } else {
      out[key] = message;
    }
  }
  return out;
}
