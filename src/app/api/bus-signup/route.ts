import { randomUUID } from "node:crypto";
import {
  hasUnexpectedFields,
  looksLikeBot,
  validateBusSignup,
} from "@/lib/busSignup/validation";
import { buildBusSignupEmail } from "@/lib/busSignup/notify";
import { issueFormToken, verifyFormToken } from "@/lib/planVisit/formToken";
import { isRateLimited, getClientKey } from "@/lib/connectCard/rateLimit";
import { getRememberedResult, rememberResult } from "@/lib/connectCard/idempotency";
import { sendBusSignupSlack } from "@/lib/busSignup/slack";
import { CHURCH_INBOX, SENDER, sendEmail } from "@/lib/email";

// Node.js runtime, like the Connect Card: the in-memory rate-limit and
// idempotency stores both assume it.
export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000; // room for ~10 children; anything bigger is noise

// Where sign-ups are emailed, and from which address. These fall back to the
// Connect Card's settings (already known to work in production, with a sender
// address verified in Resend), then to the church-wide defaults.
// BUS_SIGNUP_EMAIL_TO may hold several addresses separated by commas.
const SIGNUP_TO = (
  process.env.BUS_SIGNUP_EMAIL_TO || process.env.CONNECT_CARD_EMAIL_TO || CHURCH_INBOX
)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);
const SIGNUP_FROM =
  process.env.BUS_SIGNUP_EMAIL_FROM || process.env.CONNECT_CARD_EMAIL_FROM || SENDER;

// A cheerful success that costs the church nothing — what bots get.
const PRETEND_SUCCESS = { success: true };

// Reuses the Plan a Visit signing secret for the load-time stamp. Without it
// the timing check can't run, so say so loudly rather than quietly skipping.
const FORM_SECRET = process.env.PLAN_VISIT_SECRET;

const CALL_US = "please call us at (303) 659-3818 and we'll be glad to help";

// The form asks for a token when it loads; submitting sooner than a person
// could fill it in, or without one at all, is treated as a bot.
export async function GET() {
  if (!FORM_SECRET) {
    console.warn("[bus-signup] PLAN_VISIT_SECRET is not set — timing check disabled");
    return Response.json({ token: null }, { headers: { "Cache-Control": "no-store" } });
  }
  return Response.json(
    { token: issueFormToken(FORM_SECRET) },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  // ── Request-size guard ───────────────────────────────────────────────
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "That submission is larger than expected." }, { status: 413 });
  }

  // ── Rate limiting ────────────────────────────────────────────────────
  // Namespaced so a bus sign-up doesn't share a budget with other forms.
  if (isRateLimited(`bus-signup:${getClientKey(request)}`)) {
    return Response.json(
      {
        error: `You're submitting a bit quickly — please wait a few minutes and try again, or ${CALL_US}.`,
      },
      { status: 429 }
    );
  }

  let raw: Record<string, unknown>;
  try {
    const rawText = await request.text();
    if (rawText.length > MAX_BODY_BYTES) {
      return Response.json({ error: "That submission is larger than expected." }, { status: 413 });
    }
    raw = JSON.parse(rawText);
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      throw new Error("not an object");
    }
  } catch {
    return Response.json(
      { error: "We couldn't read that submission. Please try again." },
      { status: 400 }
    );
  }

  // ── Honeypots + speed trap ───────────────────────────────────────────
  if (looksLikeBot(raw)) {
    return Response.json(PRETEND_SUCCESS);
  }

  if (FORM_SECRET) {
    const verdict = verifyFormToken(raw.formToken, FORM_SECRET);
    if (verdict === "expired") {
      return Response.json(
        { error: "This form has been open a while — please refresh the page and try again." },
        { status: 400 }
      );
    }
    if (verdict !== "ok") return Response.json(PRETEND_SUCCESS);
  }

  // ── Idempotency (double-click / client retry protection) ─────────────
  const idempotencyKey = typeof raw.__idempotencyKey === "string" ? raw.__idempotencyKey : null;
  if (idempotencyKey) {
    const remembered = getRememberedResult(idempotencyKey);
    if (remembered) return Response.json(remembered);
  }

  // ── Reject unexpected fields (mass-assignment guard) ─────────────────
  if (hasUnexpectedFields(raw).length > 0) {
    return Response.json({ error: "That submission included unexpected data." }, { status: 400 });
  }

  // ── Validate (same rules the form runs in the browser) ───────────────
  const { data, errors } = validateBusSignup(raw);
  if (!data) {
    return Response.json(
      { error: "Please check the highlighted fields.", fieldErrors: errors },
      { status: 400 }
    );
  }

  const submissionId = randomUUID();
  const { subject, text, html } = buildBusSignupEmail(data, submissionId);

  // Tell the church two ways — email (the full record) and Slack (the quick
  // heads-up). Both are tried; the sign-up counts as received if at least one
  // reached the church, so a hiccup in one never costs a family their seat.
  // Email goes first so Slack can say so if the email didn't make it.
  const emailResult = await sendEmail({
    to: SIGNUP_TO,
    from: SIGNUP_FROM,
    subject,
    text,
    html,
  });
  const slackResult = await sendBusSignupSlack(data, submissionId, {
    emailFailed: !emailResult.ok,
  });

  // Sanitized, non-personal logs only — no family data.
  if (!emailResult.ok) {
    console.error("[bus-signup] Email failed:", emailResult.error, `(${submissionId})`);
  }
  if (!slackResult.ok) {
    console.error("[bus-signup] Slack failed:", slackResult.error, `(${submissionId})`);
  }

  if (!emailResult.ok && !slackResult.ok) {
    return Response.json(
      { error: `Something went wrong sending your sign-up. Please try again, or ${CALL_US}.` },
      { status: 502 }
    );
  }

  const response = { success: true };
  if (idempotencyKey) rememberResult(idempotencyKey, response);
  return Response.json(response);
}
