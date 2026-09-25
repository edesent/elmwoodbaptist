// A signed "this form was handed out at <time>" stamp. The server issues one
// when the Plan a Visit form loads and checks it on submit, so how long the
// form was on screen is measured by the server — a bot can't just claim a
// believable number the way it could with a client-reported elapsedMs.
//
// Server-only (node:crypto). The secret lives in PLAN_VISIT_SECRET.

import { createHmac, timingSafeEqual } from "node:crypto";

/** A real person takes longer than this to fill the form out. */
export const MIN_FILL_MS = 3000;

/** Long enough for a tab left open over lunch; short enough that tokens can't be stockpiled. */
export const MAX_TOKEN_AGE_MS = 24 * 60 * 60 * 1000;

export type TokenVerdict = "ok" | "invalid" | "too-fast" | "expired";

function sign(issuedAt: string, secret: string): string {
  return createHmac("sha256", secret).update(`plan-visit:${issuedAt}`).digest("base64url");
}

export function issueFormToken(secret: string, now = Date.now()): string {
  const issuedAt = String(now);
  return `${issuedAt}.${sign(issuedAt, secret)}`;
}

export function verifyFormToken(token: unknown, secret: string, now = Date.now()): TokenVerdict {
  if (typeof token !== "string" || token.length > 100) return "invalid";
  const [issuedAt, sig, ...rest] = token.split(".");
  if (!issuedAt || !sig || rest.length > 0 || !/^\d{13}$/.test(issuedAt)) return "invalid";

  const expected = Buffer.from(sign(issuedAt, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";

  const age = now - Number(issuedAt);
  if (age < MIN_FILL_MS) return "too-fast";
  if (age > MAX_TOKEN_AGE_MS) return "expired";
  return "ok";
}
