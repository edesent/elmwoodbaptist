import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { sendSlackNotification } from "../../src/lib/connectCard/slack";
import type { ValidatedConnectCard } from "../../src/lib/connectCard/validation";

function sampleData(overrides: Partial<ValidatedConnectCard> = {}): ValidatedConnectCard {
  return {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phone: "3035550123",
    preferredContact: "email",
    street: null,
    street2: null,
    city: null,
    state: null,
    zip: null,
    maritalStatus: null,
    attendanceStatus: "first_time",
    ageGroup: null,
    visitDate: null,
    howHeard: null,
    howHeardOther: null,
    children: [],
    interests: [],
    prayerRequest: null,
    comments: null,
    contactConsent: true,
    ...overrides,
  };
}

const ORIGINAL_ENV = { ...process.env };
const originalFetch = global.fetch;

describe("sendSlackNotification", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });
  afterEach(() => {
    global.fetch = originalFetch;
    process.env = { ...ORIGINAL_ENV };
  });

  test("reports not-configured when no webhook URL is set", async () => {
    delete process.env.SLACK_CONNECT_CARD_WEBHOOK_URL;
    const result = await sendSlackNotification(sampleData(), "sub-1", null);
    assert.equal(result.ok, false);
  });

  test("sends a well-formed request and reports success", async () => {
    process.env.SLACK_CONNECT_CARD_WEBHOOK_URL = "https://hooks.slack.test/services/fake";
    let capturedBody: string | undefined;
    global.fetch = (async (_url: string, init?: RequestInit) => {
      capturedBody = init?.body as string;
      return new Response("ok", { status: 200 });
    }) as typeof fetch;

    const result = await sendSlackNotification(sampleData(), "sub-2", null);
    assert.equal(result.ok, true);
    assert.ok(capturedBody);
    const parsed = JSON.parse(capturedBody!);
    assert.ok(JSON.stringify(parsed).includes("Jane"));
  });

  test("reports failure when the webhook responds with a non-2xx status (Slack delivery failure)", async () => {
    process.env.SLACK_CONNECT_CARD_WEBHOOK_URL = "https://hooks.slack.test/services/fake";
    global.fetch = (async () => new Response("bad request", { status: 400 })) as typeof fetch;

    const result = await sendSlackNotification(sampleData(), "sub-3", null);
    assert.equal(result.ok, false);
  });

  test("reports failure without throwing when fetch itself rejects (network error)", async () => {
    process.env.SLACK_CONNECT_CARD_WEBHOOK_URL = "https://hooks.slack.test/services/fake";
    global.fetch = (async () => {
      throw new Error("network down");
    }) as typeof fetch;

    const result = await sendSlackNotification(sampleData(), "sub-4", null);
    assert.equal(result.ok, false);
  });

  test("escapes HTML/Slack-formatting characters from visitor-provided text", async () => {
    process.env.SLACK_CONNECT_CARD_WEBHOOK_URL = "https://hooks.slack.test/services/fake";
    let capturedBody: string | undefined;
    global.fetch = (async (_url: string, init?: RequestInit) => {
      capturedBody = init?.body as string;
      return new Response("ok", { status: 200 });
    }) as typeof fetch;

    const malicious = sampleData({
      interests: ["prayer_request"],
      prayerRequest: "<!channel> please pray & <b>help</b>",
    });
    await sendSlackNotification(malicious, "sub-5", null);
    assert.ok(capturedBody);
    assert.ok(!capturedBody!.includes("<!channel>"));
    assert.ok(capturedBody!.includes("&lt;!channel&gt;"));
  });
});
