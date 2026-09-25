import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  issueFormToken,
  verifyFormToken,
  MIN_FILL_MS,
  MAX_TOKEN_AGE_MS,
} from "../../src/lib/planVisit/formToken";

const SECRET = "test-secret";
const T0 = 1_790_000_000_000;

describe("form token", () => {
  test("a person who sat with the form passes", () => {
    const token = issueFormToken(SECRET, T0);
    assert.equal(verifyFormToken(token, SECRET, T0 + MIN_FILL_MS + 1), "ok");
  });

  test("submitting faster than a person could is flagged", () => {
    const token = issueFormToken(SECRET, T0);
    assert.equal(verifyFormToken(token, SECRET, T0 + 500), "too-fast");
  });

  test("an old token expires", () => {
    const token = issueFormToken(SECRET, T0);
    assert.equal(verifyFormToken(token, SECRET, T0 + MAX_TOKEN_AGE_MS + 1), "expired");
  });

  test("a missing, malformed or forged token is invalid", () => {
    assert.equal(verifyFormToken(undefined, SECRET, T0), "invalid");
    assert.equal(verifyFormToken("", SECRET, T0), "invalid");
    assert.equal(verifyFormToken("garbage", SECRET, T0), "invalid");
    // Backdating the timestamp breaks the signature.
    const [, sig] = issueFormToken(SECRET, T0).split(".");
    assert.equal(verifyFormToken(`${T0 - 60_000}.${sig}`, SECRET, T0), "invalid");
    // Signed with a different secret.
    assert.equal(verifyFormToken(issueFormToken("other", T0 - 60_000), SECRET, T0), "invalid");
  });
});
