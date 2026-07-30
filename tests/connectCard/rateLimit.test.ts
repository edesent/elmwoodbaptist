import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { isRateLimited, getClientKey } from "../../src/lib/connectCard/rateLimit";

describe("isRateLimited", () => {
  test("allows the first several submissions from a client", () => {
    const key = "client-" + Math.random();
    for (let i = 0; i < 5; i++) {
      assert.equal(isRateLimited(key), false, `attempt ${i + 1} should not be limited`);
    }
  });

  test("blocks a client after exceeding the burst limit within the window", () => {
    const key = "client-" + Math.random();
    let limited = false;
    for (let i = 0; i < 10; i++) {
      limited = isRateLimited(key) || limited;
    }
    assert.equal(limited, true);
  });

  test("tracks different clients independently", () => {
    const keyA = "client-a-" + Math.random();
    const keyB = "client-b-" + Math.random();
    for (let i = 0; i < 6; i++) isRateLimited(keyA);
    assert.equal(isRateLimited(keyB), false);
  });
});

describe("getClientKey", () => {
  test("uses the first entry of x-forwarded-for", () => {
    const request = new Request("https://example.com/api/connect-card", {
      headers: { "x-forwarded-for": "203.0.113.5, 70.41.3.18" },
    });
    assert.equal(getClientKey(request), "203.0.113.5");
  });

  test("falls back to x-real-ip, then 'unknown'", () => {
    const withRealIp = new Request("https://example.com/api/connect-card", {
      headers: { "x-real-ip": "198.51.100.7" },
    });
    assert.equal(getClientKey(withRealIp), "198.51.100.7");

    const withNeither = new Request("https://example.com/api/connect-card");
    assert.equal(getClientKey(withNeither), "unknown");
  });
});
