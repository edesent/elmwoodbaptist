import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { rememberResult, getRememberedResult } from "../../src/lib/connectCard/idempotency";

describe("idempotency store (duplicate submission prevention)", () => {
  test("returns undefined for a key that was never remembered", () => {
    assert.equal(getRememberedResult("never-seen-key"), undefined);
  });

  test("returns the remembered result for a repeated key (simulates a client retry / double-click)", () => {
    const key = "sub-" + Math.random();
    const result = { success: true, submissionId: "abc-123" };
    rememberResult(key, result);
    assert.deepEqual(getRememberedResult(key), result);
    // A second lookup (as if the browser retried again) still returns the
    // same cached result rather than reprocessing.
    assert.deepEqual(getRememberedResult(key), result);
  });

  test("different idempotency keys do not collide", () => {
    rememberResult("key-a", { success: true, submissionId: "a" });
    rememberResult("key-b", { success: true, submissionId: "b" });
    assert.deepEqual(getRememberedResult("key-a"), { success: true, submissionId: "a" });
    assert.deepEqual(getRememberedResult("key-b"), { success: true, submissionId: "b" });
  });
});
