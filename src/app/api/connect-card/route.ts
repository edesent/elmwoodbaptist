import {
  validateConnectCard,
  hasUnexpectedFields,
  sanitizeHeaderValue,
  type ValidatedConnectCard,
} from "@/lib/connectCard/validation";
import { isRateLimited, getClientKey } from "@/lib/connectCard/rateLimit";
import { getRememberedResult, rememberResult } from "@/lib/connectCard/idempotency";
import { syncToBreeze, type BreezeSyncResult } from "@/lib/connectCard/breeze";
import { buildStaffEmail, buildVisitorAutoreply } from "@/lib/connectCard/notify";
import { sendEmail, SENDER } from "@/lib/email";
import { sendSlackNotification } from "@/lib/connectCard/slack";

// Keep this endpoint on the Node.js runtime (not Edge) — the Breeze/Slack/Resend
// calls and the in-memory rate-limit/idempotency stores all assume it.
export const runtime = "nodejs";

const MAX_BODY_BYTES = 50_000; // generous for a form this size, still bounded

interface SubmissionResult {
  submissionId: string;
  breeze: { status: string } | null;
  churchEmail: { status: "sent" | "failed" };
  slack: { status: "sent" | "failed" | "not_configured" };
  visitorAutoreply: { status: "sent" | "failed" | "skipped" };
}

function newSubmissionId(): string {
  // crypto.randomUUID is available in the Node.js runtime on Vercel.
  return crypto.randomUUID();
}

async function processSubmission(data: ValidatedConnectCard): Promise<SubmissionResult> {
  const submissionId = newSubmissionId();

  // 1. Breeze sync (independent of email/Slack — its failure must never block them).
  let breeze: BreezeSyncResult | null = null;
  try {
    breeze = await syncToBreeze(data, submissionId);
  } catch (err) {
    console.error(`[connect-card ${submissionId}] Breeze sync threw unexpectedly:`, err instanceof Error ? err.message : err);
    breeze = null;
  }

  // 2. Staff notification email.
  const churchTo = process.env.CONNECT_CARD_EMAIL_TO;
  let churchEmailStatus: "sent" | "failed" = "failed";
  if (churchTo) {
    const { subject, text, html } = buildStaffEmail(data, submissionId, breeze);
    const result = await sendEmail({
      to: churchTo,
      from: process.env.CONNECT_CARD_EMAIL_FROM || SENDER,
      replyTo: data.email ?? undefined,
      subject,
      text,
      html,
    });
    churchEmailStatus = result.ok ? "sent" : "failed";
    if (!result.ok) {
      console.error(`[connect-card ${submissionId}] Staff email failed:`, result.error);
    }
  } else {
    console.error(`[connect-card ${submissionId}] CONNECT_CARD_EMAIL_TO is not set — staff email skipped.`);
  }

  // 3. Slack notification.
  let slackStatus: "sent" | "failed" | "not_configured" = "not_configured";
  if (process.env.SLACK_CONNECT_CARD_WEBHOOK_URL) {
    const result = await sendSlackNotification(data, submissionId, breeze);
    slackStatus = result.ok ? "sent" : "failed";
    if (!result.ok) {
      console.error(`[connect-card ${submissionId}] Slack notification failed:`, result.error);
    }
  }

  // 4. Optional visitor thank-you email.
  let autoreplyStatus: "sent" | "failed" | "skipped" = "skipped";
  if (data.email && process.env.CONNECT_CARD_SEND_AUTOREPLY === "true") {
    const { subject, text, html } = buildVisitorAutoreply(data);
    const result = await sendEmail({
      to: data.email,
      from: process.env.CONNECT_CARD_EMAIL_FROM || SENDER,
      subject,
      text,
      html,
    });
    autoreplyStatus = result.ok ? "sent" : "failed";
    if (!result.ok) {
      console.error(`[connect-card ${submissionId}] Visitor autoreply failed:`, result.error);
    }
  }

  return {
    submissionId,
    breeze: breeze ? { status: breeze.enabled ? breeze.adult.status : "disabled" } : null,
    churchEmail: { status: churchEmailStatus },
    slack: { status: slackStatus === "not_configured" ? "not_configured" : slackStatus },
    visitorAutoreply: { status: autoreplyStatus },
  };
}

export async function POST(request: Request) {
  // ── Request-size guard ───────────────────────────────────────────────
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "That submission is larger than expected." }, { status: 413 });
  }

  // ── Rate limiting ────────────────────────────────────────────────────
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return Response.json(
      { error: "You're submitting a bit quickly — please wait a few minutes and try again." },
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
    return Response.json({ error: "We couldn't read that submission. Please try again." }, { status: 400 });
  }

  // ── Honeypot ─────────────────────────────────────────────────────────
  // Bots fill hidden fields; real visitors never do. Pretend success so the
  // bot doesn't learn anything, without doing any real work.
  if (raw.botcheck) {
    return Response.json({ success: true, submissionId: "n/a" });
  }

  // ── Idempotency (double-click / client retry protection) ───────────
  const idempotencyKey = typeof raw.__idempotencyKey === "string" ? raw.__idempotencyKey : null;
  if (idempotencyKey) {
    const remembered = getRememberedResult(idempotencyKey);
    if (remembered) {
      return Response.json(remembered);
    }
  }

  // ── Reject unexpected fields (mass-assignment guard) ────────────────
  const unexpected = hasUnexpectedFields(raw).filter((k) => k !== "__idempotencyKey");
  if (unexpected.length > 0) {
    return Response.json({ error: "That submission included unexpected data." }, { status: 400 });
  }

  // ── Validate ─────────────────────────────────────────────────────────
  const { data, errors } = validateConnectCard(raw);
  if (!data) {
    return Response.json({ error: "Please check the highlighted fields.", fieldErrors: errors }, { status: 400 });
  }

  try {
    const result = await processSubmission(data);
    const response = {
      success: true,
      submissionId: result.submissionId,
      // Only a plain confirmation goes back to the browser — no Breeze IDs,
      // no internal statuses beyond a simple sent/failed per channel, and the
      // visitor's own submitted data is never echoed back.
    };
    if (idempotencyKey) rememberResult(idempotencyKey, response);
    return Response.json(response);
  } catch (err) {
    // Sanitized, non-personal log only.
    console.error("[connect-card] Unexpected error while processing submission:", err instanceof Error ? err.message : "unknown error", sanitizeHeaderValue(String(err)));
    return Response.json(
      { error: "Something went wrong on our end. Please try again in a moment, or call the church office." },
      { status: 500 }
    );
  }
}
