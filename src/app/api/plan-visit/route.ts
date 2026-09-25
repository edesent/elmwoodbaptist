import {
  hasUnexpectedFields,
  looksLikeBot,
  validatePlanVisit,
  type PlanVisitInput,
} from "@/lib/planVisit/validation";
import { issueFormToken, verifyFormToken } from "@/lib/planVisit/formToken";
import { isRateLimited, getClientKey } from "@/lib/connectCard/rateLimit";
import { getRememberedResult, rememberResult } from "@/lib/connectCard/idempotency";

// Node.js runtime, like the Connect Card: the in-memory rate-limit and
// idempotency stores both assume it.
export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000; // this form is small; anything bigger is noise

// WBC Chat backend — a submission lands in the church's private Slack channel,
// which reaches the pastors' phones like a text message. The key lives here on
// the server so the browser can no longer post to the chat backend directly.
const CHAT_API = process.env.WBC_CHAT_API_URL || "https://slackwebsitechat.vercel.app";
const CHAT_KEY =
  process.env.WBC_CHAT_API_KEY || "wbc_93cf6d847031ded84bdb9bbe47d51fa1a7c89c160114ce41";

// A cheerful success that costs the church nothing — what bots get.
const PRETEND_SUCCESS = { success: true };

// Signs the form's load-time token. Without it the timing check can't run, so
// say so loudly in the logs rather than quietly letting everything through.
const FORM_SECRET = process.env.PLAN_VISIT_SECRET;

// The form asks for a token when it loads; submitting sooner than a person
// could fill it in, or without one at all, is treated as a bot.
export async function GET() {
  if (!FORM_SECRET) {
    console.warn("[plan-visit] PLAN_VISIT_SECRET is not set — timing check disabled");
    return Response.json({ token: null }, { headers: { "Cache-Control": "no-store" } });
  }
  return Response.json(
    { token: issueFormToken(FORM_SECRET) },
    { headers: { "Cache-Control": "no-store" } }
  );
}

async function notifyChurch(data: PlanVisitInput): Promise<boolean> {
  const res = await fetch(`${CHAT_API}/api/chat/coffee-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: CHAT_KEY,
      name: data.name,
      phone: data.phone,
      email: data.email,
      preferredTime: data.preferredTime,
      subject: "📍 Plan a Visit Request",
      message: data.notes,
      request: data.notes,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  return res.ok;
}

export async function POST(request: Request) {
  // ── Request-size guard ───────────────────────────────────────────────
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "That submission is larger than expected." }, { status: 413 });
  }

  // ── Rate limiting ────────────────────────────────────────────────────
  // Namespaced so a visit request and a connect card don't share a budget.
  if (isRateLimited(`plan-visit:${getClientKey(request)}`)) {
    return Response.json(
      {
        error:
          "You're submitting a bit quickly — please wait a few minutes and try again, or call us at (303) 659-3818.",
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
  // Pretend success so the bot doesn't learn anything, without doing any work.
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
    // No token, a forged one, or a fill faster than a person could manage.
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

  // ── Validate ─────────────────────────────────────────────────────────
  const { data, errors } = validatePlanVisit(raw);
  if (!data) {
    return Response.json(
      { error: "Please check the highlighted fields.", fieldErrors: errors },
      { status: 400 }
    );
  }

  try {
    const delivered = await notifyChurch(data);
    if (!delivered) throw new Error("chat backend rejected the request");
    const response = { success: true };
    if (idempotencyKey) rememberResult(idempotencyKey, response);
    return Response.json(response);
  } catch (err) {
    // Sanitized, non-personal log only — no visitor data.
    console.error(
      "[plan-visit] Could not deliver visit request:",
      err instanceof Error ? err.message : "unknown error"
    );
    return Response.json(
      {
        error:
          "Something went wrong sending your request. Please call us at (303) 659-3818 and we'll be glad to help.",
      },
      { status: 502 }
    );
  }
}
