"use client";

import { useState } from "react";
import type {
  AgeGroup,
  AttendanceStatus,
  Grade,
  HeardAbout,
  Interest,
  MaritalStatus,
  PreferredContact,
} from "@/lib/connectCard/validation";

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-cream border border-cream-dark text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all disabled:opacity-60";
const labelClass = "block text-sm font-semibold text-text-dark mb-1.5";
const hintClass = "text-xs text-text-light mt-1";
const errorTextClass = "text-xs text-red-700 mt-1";
const legendClass = "text-xs font-bold tracking-[0.15em] uppercase text-text-light mb-3";
const radioRowClass = "flex items-center gap-2 text-sm text-text-body";
const radioInputClass = "w-4 h-4 accent-brown-light flex-shrink-0";
const sectionClass = "p-6 md:p-8 bg-warm-white rounded-2xl border border-cream-dark shadow-sm";
const sectionTitleClass = "font-serif text-2xl font-bold text-text-dark mb-1";
const sectionSubClass = "text-sm text-text-light mb-6";

interface ChildRow {
  key: string;
  firstName: string;
  lastName: string;
  grade: Grade | "";
  gradeOther: string;
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function newChild(): ChildRow {
  return { key: crypto.randomUUID(), firstName: "", lastName: "", grade: "", gradeOther: "" };
}

const GRADE_OPTIONS: { value: Grade; label: string }[] = [
  { value: "nursery", label: "Nursery" },
  { value: "preschool", label: "Preschool" },
  { value: "kindergarten", label: "Kindergarten" },
  { value: "other", label: "Other" },
];

const AGE_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: "under_18", label: "Under 18" },
  { value: "18_24", label: "18–24" },
  { value: "25_34", label: "25–34" },
  { value: "35_44", label: "35–44" },
  { value: "45_54", label: "45–54" },
  { value: "55_64", label: "55–64" },
  { value: "65_plus", label: "65+" },
  { value: "prefer_not_to_answer", label: "Prefer not to answer" },
];

const HEARD_OPTIONS: { value: HeardAbout; label: string }[] = [
  { value: "friend_family", label: "Friend or family member" },
  { value: "church_member", label: "Church member" },
  { value: "website", label: "Website" },
  { value: "search_engine", label: "Google or another search engine" },
  { value: "social_media", label: "Social media" },
  { value: "church_event", label: "Church event" },
  { value: "bus_ministry", label: "Bus ministry" },
  { value: "other", label: "Other" },
];

const INTEREST_OPTIONS: { value: Interest; label: string }[] = [
  { value: "more_info", label: "I would like more information about the church" },
  { value: "childrens_ministry", label: "I would like information about children's ministries" },
  { value: "teen_ministry", label: "I would like information about the teen ministry" },
  { value: "adult_bible_classes", label: "I would like information about adult Bible classes" },
  { value: "bus_ministry", label: "I would like information about the bus ministry" },
  { value: "speak_with_pastor", label: "I would like to speak with a pastor" },
  { value: "schedule_visit", label: "I would like to schedule an in-person visit" },
  { value: "prayer_request", label: "I have a prayer request" },
];

const MAX_CHILDREN = 10;

type Status = "idle" | "submitting" | "success" | "error";

export default function ConnectCardForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState<PreferredContact | "">("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | "">("");

  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus | "">("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | "">("");
  const [visitDate, setVisitDate] = useState(todayISO());
  const [howHeard, setHowHeard] = useState<HeardAbout | "">("");
  const [howHeardOther, setHowHeardOther] = useState("");

  const [hasChildren, setHasChildren] = useState<null | boolean>(null);
  const [children, setChildren] = useState<ChildRow[]>([]);

  const [interests, setInterests] = useState<Interest[]>([]);
  const [prayerRequest, setPrayerRequest] = useState("");
  const [comments, setComments] = useState("");
  const [contactConsent, setContactConsent] = useState(false);

  const toggleInterest = (value: Interest) => {
    setInterests((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const addChild = () => {
    setChildren((prev) => (prev.length >= MAX_CHILDREN ? prev : [...prev, newChild()]));
  };

  const removeChild = (key: string) => {
    setChildren((prev) => prev.filter((c) => c.key !== key));
  };

  const updateChild = (key: string, patch: Partial<ChildRow>) => {
    setChildren((prev) => prev.map((c) => (c.key === key ? { ...c, ...patch } : c)));
  };

  const handleHasChildren = (value: boolean) => {
    setHasChildren(value);
    if (value && children.length === 0) setChildren([newChild()]);
    if (!value) setChildren([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);
    setFieldErrors({});

    const formEl = e.currentTarget;
    const botcheck = (new FormData(formEl).get("botcheck") as string) || "";

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      preferredContact,
      street,
      street2,
      city,
      state,
      zip,
      maritalStatus,
      attendanceStatus,
      ageGroup,
      visitDate,
      howHeard,
      howHeardOther,
      hasChildren: Boolean(hasChildren),
      children: hasChildren
        ? children.map((c) => ({
            firstName: c.firstName,
            lastName: c.lastName,
            grade: c.grade,
            gradeOther: c.gradeOther,
          }))
        : [],
      interests,
      prayerRequest,
      comments,
      contactConsent,
      botcheck,
      __idempotencyKey: idempotencyKey,
    };

    try {
      const res = await fetch("/api/connect-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        return;
      }

      setStatus("error");
      setErrorMessage(json.error || "Something went wrong. Please try again.");
      if (json.fieldErrors) setFieldErrors(json.fieldErrors);
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-center py-16 px-6 max-w-2xl mx-auto"
      >
        <svg className="w-16 h-16 mx-auto mb-6 text-gold-dark" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-4">
          Thank you for connecting with us!
        </h2>
        <p className="text-text-body text-lg leading-relaxed mb-10">
          We are grateful that you visited Elmwood Baptist Church. Someone from our church will follow
          up with you soon if you requested contact. We hope to see you again!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-block bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Return to Homepage
          </a>
          <a
            href="/#services"
            className="inline-block text-brown-light font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light/50 hover:bg-brown-light/10 hover:border-brown-light transition-all"
          >
            View Service Times
          </a>
          <a
            href="/#groups"
            className="inline-block text-brown-light font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full border-2 border-brown-light/50 hover:bg-brown-light/10 hover:border-brown-light transition-all"
          >
            Our Ministries
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto space-y-6">
      {/* Honeypot — hidden from people, tempting to bots. The server silently
          drops the submission if this gets filled/checked. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div aria-live="polite" className="sr-only">
        {status === "submitting" ? "Submitting your Connect Card…" : ""}
        {status === "error" ? `There was a problem: ${errorMessage}` : ""}
      </div>

      {/* ── About You ─────────────────────────────────────────────── */}
      <fieldset className={sectionClass}>
        <legend className="sr-only">About You</legend>
        <h2 className={sectionTitleClass}>About You</h2>
        <p className={sectionSubClass}>Just the basics — share as much as you're comfortable with.</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="cc-first" className={labelClass}>
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              id="cc-first"
              className={inputClass}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              maxLength={80}
              autoComplete="given-name"
              aria-invalid={Boolean(fieldErrors.firstName)}
              aria-describedby={fieldErrors.firstName ? "cc-first-error" : undefined}
            />
            {fieldErrors.firstName && (
              <p id="cc-first-error" className={errorTextClass}>{fieldErrors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="cc-last" className={labelClass}>
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              id="cc-last"
              className={inputClass}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              maxLength={80}
              autoComplete="family-name"
              aria-invalid={Boolean(fieldErrors.lastName)}
              aria-describedby={fieldErrors.lastName ? "cc-last-error" : undefined}
            />
            {fieldErrors.lastName && (
              <p id="cc-last-error" className={errorTextClass}>{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="cc-email" className={labelClass}>
              Email
            </label>
            <input
              id="cc-email"
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={120}
              autoComplete="email"
              inputMode="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "cc-email-error" : undefined}
            />
            {fieldErrors.email && <p id="cc-email-error" className={errorTextClass}>{fieldErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="cc-phone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="cc-phone"
              type="tel"
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={40}
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "cc-phone-error" : undefined}
            />
            {fieldErrors.phone && <p id="cc-phone-error" className={errorTextClass}>{fieldErrors.phone}</p>}
          </div>
        </div>

        <fieldset className="mb-5">
          <legend className={legendClass}>Preferred Contact Method</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {([
              ["text", "Text"],
              ["call", "Phone call"],
              ["email", "Email"],
              ["no_preference", "No preference"],
            ] as [PreferredContact, string][]).map(([value, label]) => (
              <label key={value} className={radioRowClass}>
                <input
                  type="radio"
                  name="preferredContact"
                  className={radioInputClass}
                  checked={preferredContact === value}
                  onChange={() => setPreferredContact(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mb-5">
          <label htmlFor="cc-street" className={labelClass}>
            Street Address
          </label>
          <input
            id="cc-street"
            className={`${inputClass} mb-3`}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            maxLength={120}
            autoComplete="address-line1"
          />
          <label htmlFor="cc-street2" className="sr-only">
            Address line 2
          </label>
          <input
            id="cc-street2"
            className={inputClass}
            placeholder="Apt, suite, unit (optional)"
            value={street2}
            onChange={(e) => setStreet2(e.target.value)}
            maxLength={120}
            autoComplete="address-line2"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          <div>
            <label htmlFor="cc-city" className={labelClass}>City</label>
            <input id="cc-city" className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} maxLength={80} autoComplete="address-level2" />
          </div>
          <div>
            <label htmlFor="cc-state" className={labelClass}>State</label>
            <input id="cc-state" className={inputClass} value={state} onChange={(e) => setState(e.target.value)} maxLength={40} autoComplete="address-level1" />
          </div>
          <div>
            <label htmlFor="cc-zip" className={labelClass}>ZIP Code</label>
            <input id="cc-zip" className={inputClass} value={zip} onChange={(e) => setZip(e.target.value)} maxLength={20} autoComplete="postal-code" inputMode="numeric" />
          </div>
        </div>

        <fieldset>
          <legend className={legendClass}>Marital Status</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {([
              ["single", "Single"],
              ["married", "Married"],
              ["widowed", "Widowed"],
            ] as [MaritalStatus, string][]).map(([value, label]) => (
              <label key={value} className={radioRowClass}>
                <input
                  type="radio"
                  name="maritalStatus"
                  className={radioInputClass}
                  checked={maritalStatus === value}
                  onChange={() => setMaritalStatus(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>

      {/* ── Your Connection to Elmwood ───────────────────────────────── */}
      <fieldset className={sectionClass}>
        <legend className="sr-only">Your Connection to Elmwood</legend>
        <h2 className={sectionTitleClass}>Your Connection to Elmwood</h2>
        <p className={sectionSubClass}>Help us know where you are in your journey with us.</p>

        <fieldset className="mb-5">
          <legend className={legendClass}>
            Attendance <span className="text-red-600">*</span>
          </legend>
          <div className="space-y-2">
            {([
              ["first_time", "This is my first time"],
              ["visited_before", "I've visited before"],
              ["regular", "I've been coming for a while"],
            ] as [AttendanceStatus, string][]).map(([value, label]) => (
              <label key={value} className={radioRowClass}>
                <input
                  type="radio"
                  name="attendanceStatus"
                  className={radioInputClass}
                  checked={attendanceStatus === value}
                  onChange={() => setAttendanceStatus(value)}
                  required
                />
                {label}
              </label>
            ))}
          </div>
          {fieldErrors.attendanceStatus && <p className={errorTextClass}>{fieldErrors.attendanceStatus}</p>}
        </fieldset>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="cc-age" className={labelClass}>Age Group</label>
            <select id="cc-age" className={inputClass} value={ageGroup} onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}>
              <option value="">Prefer not to say</option>
              {AGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cc-visit-date" className={labelClass}>Date of Visit</label>
            <input id="cc-visit-date" type="date" className={inputClass} value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="cc-heard" className={labelClass}>How did you hear about Elmwood?</label>
          <select id="cc-heard" className={inputClass} value={howHeard} onChange={(e) => setHowHeard(e.target.value as HeardAbout)}>
            <option value="">Select one (optional)</option>
            {HEARD_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {howHeard === "other" && (
            <input
              className={`${inputClass} mt-3`}
              placeholder="Please tell us more"
              value={howHeardOther}
              onChange={(e) => setHowHeardOther(e.target.value)}
              maxLength={120}
              aria-label="How did you hear about Elmwood — other"
            />
          )}
        </div>
      </fieldset>

      {/* ── Children ──────────────────────────────────────────────────── */}
      <fieldset className={sectionClass}>
        <legend className="sr-only">Children</legend>
        <h2 className={sectionTitleClass}>Children</h2>
        <p className={sectionSubClass}>
          Are there children in your household you would like us to know about?
        </p>

        <div className="flex gap-3 mb-2" role="group" aria-label="Do you have children to tell us about">
          <button
            type="button"
            onClick={() => handleHasChildren(true)}
            aria-pressed={hasChildren === true}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
              hasChildren === true
                ? "bg-brown-light text-white border-brown-light"
                : "bg-transparent text-brown-light border-brown-light/40 hover:border-brown-light"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleHasChildren(false)}
            aria-pressed={hasChildren === false}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
              hasChildren === false
                ? "bg-brown-light text-white border-brown-light"
                : "bg-transparent text-brown-light border-brown-light/40 hover:border-brown-light"
            }`}
          >
            No
          </button>
        </div>

        {hasChildren && (
          <div className="mt-6 space-y-5">
            {children.map((child, i) => (
              <div key={child.key} className="p-5 bg-cream rounded-xl border border-cream-dark relative">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-text-light">
                    Child {i + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeChild(child.key)}
                    className="text-xs font-semibold text-red-700 hover:underline"
                    aria-label={`Remove child ${i + 1}`}
                  >
                    Remove
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label htmlFor={`cc-child-first-${child.key}`} className={labelClass}>
                      First Name
                    </label>
                    <input
                      id={`cc-child-first-${child.key}`}
                      className={inputClass}
                      value={child.firstName}
                      onChange={(e) => updateChild(child.key, { firstName: e.target.value })}
                      maxLength={80}
                      aria-invalid={Boolean(fieldErrors[`children.${i}.firstName`])}
                    />
                    {fieldErrors[`children.${i}.firstName`] && (
                      <p className={errorTextClass}>{fieldErrors[`children.${i}.firstName`]}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`cc-child-last-${child.key}`} className={labelClass}>
                      Last Name
                    </label>
                    <input
                      id={`cc-child-last-${child.key}`}
                      className={inputClass}
                      value={child.lastName}
                      onChange={(e) => updateChild(child.key, { lastName: e.target.value })}
                      maxLength={80}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`cc-child-grade-${child.key}`} className={labelClass}>
                    Grade
                  </label>
                  <select
                    id={`cc-child-grade-${child.key}`}
                    className={inputClass}
                    value={child.grade}
                    onChange={(e) => updateChild(child.key, { grade: e.target.value as Grade })}
                    aria-invalid={Boolean(fieldErrors[`children.${i}.grade`])}
                  >
                    <option value="">Select a grade</option>
                    {GRADE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {fieldErrors[`children.${i}.grade`] && (
                    <p className={errorTextClass}>{fieldErrors[`children.${i}.grade`]}</p>
                  )}
                  {child.grade === "other" && (
                    <input
                      className={`${inputClass} mt-2`}
                      placeholder="Please specify"
                      value={child.gradeOther}
                      onChange={(e) => updateChild(child.key, { gradeOther: e.target.value })}
                      maxLength={60}
                      aria-label={`Child ${i + 1} grade — other`}
                    />
                  )}
                </div>
              </div>
            ))}

            {children.length < MAX_CHILDREN && (
              <button
                type="button"
                onClick={addChild}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brown-light hover:text-brown transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" /></svg>
                Add Another Child
              </button>
            )}
          </div>
        )}
      </fieldset>

      {/* ── How Can We Help ─────────────────────────────────────────────── */}
      <fieldset className={sectionClass}>
        <legend className="sr-only">How Can We Help</legend>
        <h2 className={sectionTitleClass}>How Can We Help?</h2>
        <p className={sectionSubClass}>Check anything you'd like — all optional.</p>

        <div className="space-y-2.5 mb-2">
          {INTEREST_OPTIONS.map((o) => (
            <label key={o.value} className="flex items-start gap-3 text-sm text-text-body">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 accent-brown-light flex-shrink-0"
                checked={interests.includes(o.value)}
                onChange={() => toggleInterest(o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>

        {interests.includes("prayer_request") && (
          <div className="mt-4 mb-5">
            <label htmlFor="cc-prayer" className={labelClass}>
              Prayer Request
            </label>
            <textarea
              id="cc-prayer"
              className={`${inputClass} resize-none`}
              rows={4}
              value={prayerRequest}
              onChange={(e) => setPrayerRequest(e.target.value)}
              maxLength={2000}
              placeholder="Share whatever is on your heart..."
            />
          </div>
        )}

        <div>
          <label htmlFor="cc-comments" className={labelClass}>
            Comments or Questions
          </label>
          <textarea
            id="cc-comments"
            className={`${inputClass} resize-none`}
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            maxLength={2000}
          />
          <p className={hintClass}>Optional — anything else you'd like us to know.</p>
        </div>
      </fieldset>

      {/* ── Consent + Submit ─────────────────────────────────────────────── */}
      <div className={sectionClass}>
        <p className="text-sm text-text-light leading-relaxed mb-4">
          Your information will only be used by Elmwood Baptist Church to communicate with you and
          help you connect with our church family. We will not sell or share your information.
        </p>

        <label className="flex items-start gap-3 text-sm text-text-body mb-6">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 accent-brown-light flex-shrink-0"
            checked={contactConsent}
            onChange={(e) => setContactConsent(e.target.checked)}
          />
          <span>It is okay for Elmwood Baptist Church to contact me using the information provided above.</span>
        </label>

        {status === "error" && (
          <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-brown-light text-white font-semibold text-sm tracking-wide uppercase px-9 py-4 rounded-full border-2 border-brown-light hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === "submitting" ? "Submitting…" : "Submit Connect Card"}
        </button>
      </div>
    </form>
  );
}
