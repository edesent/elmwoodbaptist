import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { loadBreezeConfig, isBreezeReady, BreezeConfigError } from "../../src/lib/connectCard/breezeConfig";

const ORIGINAL_ENV = { ...process.env };

describe("loadBreezeConfig", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.BREEZE_ENABLED;
    delete process.env.BREEZE_SUBDOMAIN;
    delete process.env.BREEZE_API_KEY;
    delete process.env.BREEZE_PROFILE_FIELD_MAP;
  });
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  test("defaults to disabled when unset", () => {
    const config = loadBreezeConfig();
    assert.equal(config.enabled, false);
    assert.equal(isBreezeReady(config), false);
  });

  test("is not ready without an API key even if enabled", () => {
    process.env.BREEZE_ENABLED = "true";
    process.env.BREEZE_SUBDOMAIN = "elmwoodbaptist";
    const config = loadBreezeConfig();
    assert.equal(isBreezeReady(config), false);
  });

  test("is ready once enabled with subdomain + API key", () => {
    process.env.BREEZE_ENABLED = "true";
    process.env.BREEZE_SUBDOMAIN = "elmwoodbaptist";
    process.env.BREEZE_API_KEY = "fake-key-for-tests";
    const config = loadBreezeConfig();
    assert.equal(isBreezeReady(config), true);
  });

  test("throws BreezeConfigError for invalid JSON in the field map", () => {
    process.env.BREEZE_PROFILE_FIELD_MAP = "{not valid json";
    assert.throws(() => loadBreezeConfig(), BreezeConfigError);
  });

  test("throws BreezeConfigError for an unrecognized field-map key", () => {
    process.env.BREEZE_PROFILE_FIELD_MAP = JSON.stringify({
      favoriteColor: { fieldId: "123", fieldType: "text" },
    });
    assert.throws(() => loadBreezeConfig(), BreezeConfigError);
  });

  test("throws BreezeConfigError for an invalid option value type", () => {
    process.env.BREEZE_PROFILE_FIELD_MAP = JSON.stringify({
      maritalStatus: { fieldId: "123", fieldType: "radio", options: { single: 456 } },
    });
    assert.throws(() => loadBreezeConfig(), BreezeConfigError);
  });

  test("parses a valid, fully-specified field map", () => {
    process.env.BREEZE_PROFILE_FIELD_MAP = JSON.stringify({
      email: { fieldId: "1508481877", fieldType: "email" },
      maritalStatus: {
        fieldId: "1375466967",
        fieldType: "radio",
        options: { single: "100", married: "101", widowed: "102" },
      },
    });
    const config = loadBreezeConfig();
    assert.equal(config.fieldMap.email?.fieldId, "1508481877");
    assert.equal(config.fieldMap.maritalStatus?.options?.single, "100");
  });
});
