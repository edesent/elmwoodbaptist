import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  validateBusSignup,
  hasUnexpectedFields,
  looksLikeBot,
  MAX_CHILDREN,
  MIN_AGE_RIDING_ALONE,
} from "../../src/lib/busSignup/validation";
import { buildBusSignupEmail } from "../../src/lib/busSignup/notify";
import { buildBusSignupSlackBlocks, sendBusSignupSlack } from "../../src/lib/busSignup/slack";

function base(overrides: Record<string, unknown> = {}) {
  return {
    guardianName: "Jane Doe",
    phone: "(303) 659-3818",
    street: "123 Main St",
    unit: "",
    city: "Brighton",
    state: "CO",
    zip: "80601",
    guardianRiding: true,
    children: [{ name: "Sam", age: 7 }],
    ...overrides,
  };
}

describe("validateBusSignup — whole family", () => {
  test("accepts a parent riding with children", () => {
    const { data, errors } = validateBusSignup(
      base({ children: [{ name: "Sam", age: 7 }, { name: "Lily", age: 2 }, { name: "Baby", age: 0 }] })
    );
    assert.deepEqual(errors, {});
    assert.equal(data!.children.length, 3);
    assert.equal(data!.guardianRiding, true);
  });

  test("accepts a parent riding with zero children", () => {
    const { data, errors } = validateBusSignup(base({ children: [] }));
    assert.deepEqual(errors, {});
    assert.deepEqual(data!.children, []);
  });

  test("a guardian-riding family may include children under 4", () => {
    const { errors } = validateBusSignup(base({ children: [{ name: "Tiny", age: 1 }] }));
    assert.deepEqual(errors, {});
  });

  test("ignores the potty/permission boxes when a guardian rides", () => {
    const { data } = validateBusSignup(base({ pottyTrained: true, permissionSlip: true }));
    assert.equal(data!.pottyTrained, false);
    assert.equal(data!.permissionSlip, false);
  });
});

describe("validateBusSignup — children riding without a guardian", () => {
  const kidsOnly = (extra: Record<string, unknown> = {}) =>
    base({
      guardianRiding: false,
      pottyTrained: true,
      permissionSlip: true,
      children: [{ name: "Sam", age: MIN_AGE_RIDING_ALONE }],
      ...extra,
    });

  test("accepts children 4 and older with both confirmations", () => {
    const { data, errors } = validateBusSignup(
      kidsOnly({ children: [{ name: "Sam", age: 4 }, { name: "Ava", age: 12 }] })
    );
    assert.deepEqual(errors, {});
    assert.equal(data!.pottyTrained, true);
    assert.equal(data!.permissionSlip, true);
  });

  test("rejects a 3-year-old (must be at least 4)", () => {
    const { data, errors } = validateBusSignup(kidsOnly({ children: [{ name: "Tim", age: 3 }] }));
    assert.equal(data, null);
    assert.ok(errors["child.0.age"]);
  });

  test("flags only the child who is too young", () => {
    const { errors } = validateBusSignup(
      kidsOnly({ children: [{ name: "Ava", age: 9 }, { name: "Tim", age: 3 }] })
    );
    assert.equal(errors["child.0.age"], undefined);
    assert.ok(errors["child.1.age"]);
  });

  test("requires at least one child", () => {
    const { errors } = validateBusSignup(kidsOnly({ children: [] }));
    assert.ok(errors.children);
  });

  test("the minimum age is 4", () => {
    assert.equal(MIN_AGE_RIDING_ALONE, 4);
  });

  test("requires the potty-trained confirmation", () => {
    const { errors } = validateBusSignup(kidsOnly({ pottyTrained: false }));
    assert.ok(errors.pottyTrained);
  });

  test("requires the permission slip acknowledgement", () => {
    const { errors } = validateBusSignup(kidsOnly({ permissionSlip: false }));
    assert.ok(errors.permissionSlip);
  });
});

describe("validateBusSignup — fields", () => {
  test("requires the ride-along question to be answered", () => {
    const { errors } = validateBusSignup(base({ guardianRiding: undefined }));
    assert.ok(errors.guardianRiding);
  });

  test("requires first and last name", () => {
    assert.ok(validateBusSignup(base({ guardianName: "Jane" })).errors.guardianName);
    assert.ok(validateBusSignup(base({ guardianName: "" })).errors.guardianName);
  });

  test("rejects an uncallable phone number", () => {
    assert.ok(validateBusSignup(base({ phone: "792-555-0100" })).errors.phone);
    assert.ok(validateBusSignup(base({ phone: "123" })).errors.phone);
  });

  test("requires the pickup address pieces", () => {
    for (const field of ["street", "city", "zip"]) {
      assert.ok(validateBusSignup(base({ [field]: "" })).errors[field], field);
    }
  });

  test("validates ZIP and state formats", () => {
    assert.ok(validateBusSignup(base({ zip: "8060" })).errors.zip);
    assert.equal(validateBusSignup(base({ zip: "80601-1234" })).errors.zip, undefined);
    assert.ok(validateBusSignup(base({ state: "Colorado" })).errors.state);
    assert.equal(validateBusSignup(base({ state: "co" })).data!.state, "CO");
  });

  test("requires each child's name and a valid age", () => {
    const { errors } = validateBusSignup(base({ children: [{ name: "", age: "" }] }));
    assert.ok(errors["child.0.name"]);
    assert.ok(errors["child.0.age"]);
  });

  test("rejects out-of-range or non-whole ages", () => {
    for (const age of [-1, 18, 7.5, "abc", null]) {
      const { errors } = validateBusSignup(base({ children: [{ name: "Sam", age }] }));
      assert.ok(errors["child.0.age"], String(age));
    }
  });

  test("accepts age 0 (under one) and numeric-string ages", () => {
    const { data, errors } = validateBusSignup(
      base({ children: [{ name: "Baby", age: 0 }, { name: "Sam", age: "8" }] })
    );
    assert.deepEqual(errors, {});
    assert.deepEqual(data!.children.map((c) => c.age), [0, 8]);
  });

  test("caps the number of children", () => {
    const children = Array.from({ length: MAX_CHILDREN + 1 }, (_, i) => ({ name: `Kid ${i}`, age: 8 }));
    assert.ok(validateBusSignup(base({ children })).errors.children);
  });

  test("rejects links in text fields", () => {
    assert.ok(validateBusSignup(base({ street: "visit www.spam.com now" })).errors.street);
    assert.ok(validateBusSignup(base({ children: [{ name: "buy.shop", age: 8 }] })).errors["child.0.name"]);
  });
});

describe("spam guards", () => {
  test("flags unexpected top-level and child fields", () => {
    assert.deepEqual(hasUnexpectedFields(base()), []);
    assert.deepEqual(hasUnexpectedFields({ ...base(), admin: true }), ["admin"]);
    assert.deepEqual(
      hasUnexpectedFields(base({ children: [{ name: "Sam", age: 8, role: "x" }] })),
      ["children[].role"]
    );
  });

  test("detects honeypots", () => {
    assert.equal(looksLikeBot(base()), false);
    assert.equal(looksLikeBot(base({ company: "Acme" })), true);
    assert.equal(looksLikeBot(base({ botcheck: "1" })), true);
  });
});

describe("buildBusSignupEmail", () => {
  test("flags children-only sign-ups so the permission slip isn't missed", () => {
    const { data } = validateBusSignup(
      base({ guardianRiding: false, pottyTrained: true, permissionSlip: true, children: [{ name: "Sam", age: 8 }] })
    );
    const { subject, text, html } = buildBusSignupEmail(data!, "abc");
    assert.match(subject, /PERMISSION SLIP NEEDED/);
    assert.match(text, /NO parent\/guardian riding/);
    assert.match(html, /permission slip is required/);
  });

  test("does not flag a family riding together", () => {
    const { data } = validateBusSignup(base());
    const { subject } = buildBusSignupEmail(data!, "abc");
    assert.doesNotMatch(subject, /PERMISSION SLIP/);
  });

  test("escapes HTML in names", () => {
    const { data } = validateBusSignup(base({ children: [{ name: "Sam <b>x</b>", age: 8 }] }));
    const { html } = buildBusSignupEmail(data!, "abc");
    assert.doesNotMatch(html, /<b>x<\/b>/);
  });
});

describe("Slack notification", () => {
  const valid = (overrides: Record<string, unknown> = {}) => validateBusSignup(base(overrides)).data!;
  const asText = (blocks: unknown[]) => JSON.stringify(blocks);
  const realFetch = globalThis.fetch;

  test("includes the guardian, phone, address, and children", () => {
    const text = asText(buildBusSignupSlackBlocks(valid({ unit: "Apt 2" }), "id-1"));
    assert.match(text, /Jane Doe/);
    assert.match(text, /659-3818/);
    assert.match(text, /123 Main St, Apt 2/);
    assert.match(text, /Brighton, CO 80601/);
    assert.match(text, /Sam, age 7/);
    assert.match(text, /id-1/);
  });

  test("warns when children ride without a parent", () => {
    const kidsOnly = valid({ guardianRiding: false, pottyTrained: true, permissionSlip: true });
    assert.match(asText(buildBusSignupSlackBlocks(kidsOnly, "x")), /permission slip needed/);
    assert.doesNotMatch(asText(buildBusSignupSlackBlocks(valid(), "x")), /permission slip needed/);
  });

  test("escapes Slack formatting characters in family input", () => {
    const text = asText(buildBusSignupSlackBlocks(valid({ children: [{ name: "Sam <!channel>", age: 8 }] }), "x"));
    assert.doesNotMatch(text, /<!channel>/);
    assert.match(text, /&lt;!channel&gt;/);
  });

  test("posts to the Connect Card webhook by default", async () => {
    const calls: string[] = [];
    process.env.SLACK_CONNECT_CARD_WEBHOOK_URL = "https://hooks.example/connect-card";
    delete process.env.BUS_SIGNUP_SLACK_WEBHOOK_URL;
    globalThis.fetch = (async (url: string) => {
      calls.push(String(url));
      return new Response("ok", { status: 200 });
    }) as typeof fetch;
    try {
      assert.deepEqual(await sendBusSignupSlack(valid(), "x"), { ok: true });
      assert.deepEqual(calls, ["https://hooks.example/connect-card"]);
    } finally {
      globalThis.fetch = realFetch;
    }
  });

  test("a dedicated bus webhook wins when set", async () => {
    const calls: string[] = [];
    process.env.SLACK_CONNECT_CARD_WEBHOOK_URL = "https://hooks.example/connect-card";
    process.env.BUS_SIGNUP_SLACK_WEBHOOK_URL = "https://hooks.example/bus";
    globalThis.fetch = (async (url: string) => {
      calls.push(String(url));
      return new Response("ok", { status: 200 });
    }) as typeof fetch;
    try {
      await sendBusSignupSlack(valid(), "x");
      assert.deepEqual(calls, ["https://hooks.example/bus"]);
    } finally {
      globalThis.fetch = realFetch;
      delete process.env.BUS_SIGNUP_SLACK_WEBHOOK_URL;
    }
  });

  test("reports failure instead of throwing", async () => {
    process.env.SLACK_CONNECT_CARD_WEBHOOK_URL = "https://hooks.example/connect-card";
    globalThis.fetch = (async () => new Response("nope", { status: 500 })) as typeof fetch;
    try {
      const r = await sendBusSignupSlack(valid(), "x");
      assert.equal(r.ok, false);
      globalThis.fetch = (async () => {
        throw new Error("network down");
      }) as typeof fetch;
      const r2 = await sendBusSignupSlack(valid(), "x");
      assert.deepEqual(r2, { ok: false, error: "network down" });
    } finally {
      globalThis.fetch = realFetch;
    }
  });

  test("says so when no webhook is configured", async () => {
    delete process.env.SLACK_CONNECT_CARD_WEBHOOK_URL;
    delete process.env.BUS_SIGNUP_SLACK_WEBHOOK_URL;
    const r = await sendBusSignupSlack(valid(), "x");
    assert.equal(r.ok, false);
  });
});
