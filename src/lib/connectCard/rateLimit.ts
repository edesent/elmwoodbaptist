// Simple in-memory, best-effort rate limiter.
//
// LIMITATION: this project runs on Vercel, where serverless functions do not
// share memory across instances and can be recycled at any time. This limiter
// only protects against rapid-fire abuse hitting the *same* warm instance —
// it is not a substitute for a durable store (e.g. Upstash Redis / Vercel KV)
// if spam becomes a real problem. It's documented as a known limitation in
// CONNECT-CARD.md rather than silently presented as robust protection.

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;

/** Returns true if this key (e.g. an IP address) is currently rate-limited. */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);

  // Opportunistic cleanup so the map doesn't grow unbounded on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return timestamps.length > MAX_HITS;
}

export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
