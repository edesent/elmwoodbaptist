// Loads and validates the account-specific Breeze configuration from
// environment variables. Nothing in this file hard-codes Elmwood's actual
// field IDs, option IDs, or tag IDs — those must come from BREEZE_*_TAG_ID
// and BREEZE_PROFILE_FIELD_MAP once a Breeze administrator retrieves them
// (see CONNECT-CARD.md). Until then, Breeze sync stays fully disabled.

export interface BreezeFieldMapEntry {
  fieldId: string;
  fieldType: "email" | "phone" | "address" | "radio" | "checkbox" | "date" | "text" | "textarea" | "grade";
  options?: Record<string, string>;
}

export interface BreezeFieldMap {
  email?: BreezeFieldMapEntry;
  phone?: BreezeFieldMapEntry;
  address?: BreezeFieldMapEntry;
  maritalStatus?: BreezeFieldMapEntry;
  attendanceStatus?: BreezeFieldMapEntry;
  preferredContact?: BreezeFieldMapEntry;
  firstVisitDate?: BreezeFieldMapEntry;
  howHeard?: BreezeFieldMapEntry;
  permissionToContact?: BreezeFieldMapEntry;
  grade?: BreezeFieldMapEntry;
}

export interface BreezeTagConfig {
  connectCardTagId?: string;
  firstTimeVisitorTagId?: string;
  returningVisitorTagId?: string;
  regularAttenderTagId?: string;
  memberTagId?: string;
}

export interface BreezeConfig {
  enabled: boolean;
  subdomain: string | null;
  hasApiKey: boolean;
  fieldMap: BreezeFieldMap;
  tags: BreezeTagConfig;
  sendAutoreply: boolean;
}

export class BreezeConfigError extends Error {}

const KNOWN_MAP_KEYS = new Set([
  "email",
  "phone",
  "address",
  "maritalStatus",
  "attendanceStatus",
  "preferredContact",
  "firstVisitDate",
  "howHeard",
  "permissionToContact",
  "grade",
]);

const KNOWN_FIELD_TYPES = new Set([
  "email",
  "phone",
  "address",
  "radio",
  "checkbox",
  "date",
  "text",
  "textarea",
  "grade",
]);

function parseFieldMap(raw: string | undefined): BreezeFieldMap {
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new BreezeConfigError("BREEZE_PROFILE_FIELD_MAP is not valid JSON.");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new BreezeConfigError("BREEZE_PROFILE_FIELD_MAP must be a JSON object.");
  }

  const result: BreezeFieldMap = {};
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (!KNOWN_MAP_KEYS.has(key)) {
      throw new BreezeConfigError(`BREEZE_PROFILE_FIELD_MAP has an unrecognized key: "${key}".`);
    }
    if (typeof value !== "object" || value === null) {
      throw new BreezeConfigError(`BREEZE_PROFILE_FIELD_MAP."${key}" must be an object.`);
    }
    const entry = value as Record<string, unknown>;
    if (typeof entry.fieldId !== "string" || !entry.fieldId) {
      throw new BreezeConfigError(`BREEZE_PROFILE_FIELD_MAP."${key}.fieldId" is required.`);
    }
    if (typeof entry.fieldType !== "string" || !KNOWN_FIELD_TYPES.has(entry.fieldType)) {
      throw new BreezeConfigError(`BREEZE_PROFILE_FIELD_MAP."${key}.fieldType" is missing or invalid.`);
    }
    let options: Record<string, string> | undefined;
    if (entry.options !== undefined) {
      if (typeof entry.options !== "object" || entry.options === null || Array.isArray(entry.options)) {
        throw new BreezeConfigError(`BREEZE_PROFILE_FIELD_MAP."${key}.options" must be an object.`);
      }
      options = {};
      for (const [optKey, optVal] of Object.entries(entry.options as Record<string, unknown>)) {
        if (typeof optVal !== "string" || !optVal) {
          throw new BreezeConfigError(`BREEZE_PROFILE_FIELD_MAP."${key}.options.${optKey}" must be a non-empty string.`);
        }
        options[optKey] = optVal;
      }
    }
    (result as Record<string, BreezeFieldMapEntry>)[key] = {
      fieldId: entry.fieldId,
      fieldType: entry.fieldType as BreezeFieldMapEntry["fieldType"],
      options,
    };
  }
  return result;
}

/** Loads Breeze config from the environment. Throws BreezeConfigError for a
 *  malformed BREEZE_PROFILE_FIELD_MAP so misconfiguration fails loudly and
 *  early rather than silently writing to the wrong field. Never throws for
 *  simply being unconfigured/disabled — that's the normal default state. */
export function loadBreezeConfig(): BreezeConfig {
  const enabled = process.env.BREEZE_ENABLED === "true";
  const subdomain = process.env.BREEZE_SUBDOMAIN || null;
  const hasApiKey = Boolean(process.env.BREEZE_API_KEY);
  const fieldMap = parseFieldMap(process.env.BREEZE_PROFILE_FIELD_MAP);
  const sendAutoreply = process.env.CONNECT_CARD_SEND_AUTOREPLY === "true";

  return {
    enabled,
    subdomain,
    hasApiKey,
    fieldMap,
    sendAutoreply,
    tags: {
      connectCardTagId: process.env.BREEZE_CONNECT_CARD_TAG_ID || undefined,
      firstTimeVisitorTagId: process.env.BREEZE_FIRST_TIME_VISITOR_TAG_ID || undefined,
      returningVisitorTagId: process.env.BREEZE_RETURNING_VISITOR_TAG_ID || undefined,
      regularAttenderTagId: process.env.BREEZE_REGULAR_ATTENDER_TAG_ID || undefined,
      memberTagId: process.env.BREEZE_MEMBER_TAG_ID || undefined,
    },
  };
}

/** True only when Breeze sync can actually run: explicitly enabled, has an
 *  API key + subdomain, and the field map (if provided) parsed cleanly. */
export function isBreezeReady(config: BreezeConfig): boolean {
  return config.enabled && config.hasApiKey && Boolean(config.subdomain);
}
