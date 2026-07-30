// Best-effort duplicate-submission guard.
//
// LIMITATION: same caveat as rateLimit.ts — this is process-memory only, which
// is fine for catching an impatient double-click or a client retry within the
// same warm serverless instance, but is NOT a durable, cross-instance guarantee
// on Vercel. If/when a real database or KV store is added to this project,
// swap this out for a persisted "seen submission ids" table. Documented in
// CONNECT-CARD.md.

const seen = new Map<string, { result: unknown; expiresAt: number }>();
const TTL_MS = 15 * 60 * 1000; // 15 minutes

export function rememberResult(idempotencyKey: string, result: unknown) {
  seen.set(idempotencyKey, { result, expiresAt: Date.now() + TTL_MS });
  if (seen.size > 5000) {
    const now = Date.now();
    for (const [k, v] of seen) {
      if (v.expiresAt < now) seen.delete(k);
    }
  }
}

export function getRememberedResult(idempotencyKey: string): unknown | undefined {
  const entry = seen.get(idempotencyKey);
  if (!entry) return undefined;
  if (entry.expiresAt < Date.now()) {
    seen.delete(idempotencyKey);
    return undefined;
  }
  return entry.result;
}
