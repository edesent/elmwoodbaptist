import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, escapeSlack, sanitizeHeaderValue, normalizePhone, normalizeEmail, isValidEmail } from "../../src/lib/connectCard/validation";

describe("escapeHtml", () => {
  test("escapes HTML special characters so visitor input can't break markup", () => {
    const input = `<img src=x onerror=alert(1)> & "quoted" 'text'`;
    const out = escapeHtml(input);
    assert.ok(!out.includes("<img"));
    assert.ok(out.includes("&lt;img"));
    assert.ok(out.includes("&amp;"));
    assert.ok(out.includes("&quot;"));
    assert.ok(out.includes("&#39;"));
  });
});

describe("escapeSlack", () => {
  test("escapes Slack mrkdwn control characters", () => {
    const input = "Please pray <here> & for *everyone* & <!channel>";
    const out = escapeSlack(input);
    assert.ok(!out.includes("<!channel>"));
    assert.ok(out.includes("&lt;!channel&gt;"));
  });
});

describe("sanitizeHeaderValue", () => {
  test("strips CRLF sequences to prevent email header injection", () => {
    const malicious = "Jane\r\nBcc: attacker@evil.com";
    const out = sanitizeHeaderValue(malicious);
    assert.ok(!out.includes("\r"));
    assert.ok(!out.includes("\n"));
    assert.ok(out.includes("Bcc: attacker@evil.com")); // content stays, just de-lined
  });
});

describe("normalizePhone", () => {
  test("accepts common US formats", () => {
    assert.equal(normalizePhone("(303) 555-0123"), "3035550123");
    assert.equal(normalizePhone("303-555-0123"), "3035550123");
    assert.equal(normalizePhone("3035550123"), "3035550123");
  });

  test("accepts international format with a leading plus", () => {
    assert.equal(normalizePhone("+44 20 7946 0958"), "+442079460958");
  });

  test("rejects implausible values without erroring", () => {
    assert.equal(normalizePhone("123"), null);
    assert.equal(normalizePhone("not a phone number"), null);
  });

  test("returns null for an empty value", () => {
    assert.equal(normalizePhone(""), null);
  });
});

describe("isValidEmail / normalizeEmail", () => {
  test("accepts well-formed emails", () => {
    assert.ok(isValidEmail("person@example.com"));
  });

  test("rejects malformed emails", () => {
    assert.ok(!isValidEmail("not-an-email"));
    assert.ok(!isValidEmail("missing@domain"));
    assert.ok(!isValidEmail("@nouser.com"));
  });

  test("lowercases and trims for storage/comparison", () => {
    assert.equal(normalizeEmail("  Visitor@Example.COM  "), "visitor@example.com");
  });
});
