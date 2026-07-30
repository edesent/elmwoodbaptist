// Minimal, typed, dependency-free Breeze ChMS API client.
//
// Reference: https://app.breezechms.com/api (reviewed 2026-07-30). Breeze's
// API is unusual in that every endpoint — including writes like Add Person,
// Update Person, Assign Tag, and Create Family — is a GET request with the
// payload in the query string. There is no documented request-body format;
// we follow the docs' own examples exactly rather than guessing at a more
// "RESTful" shape.
//
// AUTH: Breeze's official examples all go through the community PHP/Python/
// Node wrappers, which don't show the raw HTTP auth mechanism in the docs
// page itself. The well-established convention (used by the published
// wrappers) is an `Api-Key` request header. This has NOT been confirmed
// against Elmwood's own account — see CONNECT-CARD.md "Before enabling live
// Breeze writes" for the verification step required before BREEZE_ENABLED=true
// is turned on.

export type BreezeErrorCode =
  | "not_configured"
  | "auth_failed"
  | "timeout"
  | "invalid_response"
  | "http_error"
  | "network_error";

export type BreezeResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: BreezeErrorCode; retryable: boolean; message: string };

function getBaseUrl(): string | null {
  const subdomain = process.env.BREEZE_SUBDOMAIN;
  if (!subdomain) return null;
  return `https://${subdomain}.breezechms.com/api`;
}

/** Builds a query string, JSON-encoding any array/object values the way
 *  Breeze's *_json parameters expect. */
function toQuery(params: Record<string, string | number | boolean | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    search.set(key, String(value));
  }
  return search.toString();
}

async function request<T>(path: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<BreezeResult<T>> {
  const apiKey = process.env.BREEZE_API_KEY;
  const baseUrl = getBaseUrl();
  if (!apiKey || !baseUrl) {
    return { ok: false, code: "not_configured", retryable: false, message: "Breeze is not configured." };
  }

  const url = `${baseUrl}${path}?${toQuery(params)}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: {
        "Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return {
      ok: false,
      code: timedOut ? "timeout" : "network_error",
      retryable: true,
      // Never include the URL (contains the API key would NOT be present here since
      // it's a header, not a query param — but avoid echoing raw error internals too).
      message: timedOut ? "Breeze request timed out." : "Could not reach Breeze.",
    };
  }

  if (res.status === 401 || res.status === 403) {
    return { ok: false, code: "auth_failed", retryable: false, message: "Breeze rejected the API key." };
  }
  if (!res.ok) {
    return {
      ok: false,
      code: "http_error",
      retryable: res.status >= 500,
      message: `Breeze responded with HTTP ${res.status}.`,
    };
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    return { ok: false, code: "invalid_response", retryable: false, message: "Breeze returned an unparseable response." };
  }

  return { ok: true, data: json as T };
}

// ── People ───────────────────────────────────────────────────────────────

export interface BreezePersonSummary {
  id: string;
  first_name: string;
  last_name: string;
}

export interface BreezePerson extends BreezePersonSummary {
  details?: Record<string, unknown>;
  family?: unknown[];
}

export function listPeople(filterJson?: Record<string, string>) {
  return request<BreezePersonSummary[]>("/people", {
    details: 1,
    filter_json: filterJson ? JSON.stringify(filterJson) : undefined,
  });
}

export interface BreezeFieldUpdate {
  field_id: string;
  field_type: string;
  response: string | boolean;
  details?: Record<string, unknown>;
}

export function addPerson(first: string, last: string, fields?: BreezeFieldUpdate[]) {
  return request<BreezePerson[]>("/people/add", {
    first,
    last,
    fields_json: fields && fields.length ? JSON.stringify(fields) : undefined,
  });
}

export function updatePerson(personId: string, fields: BreezeFieldUpdate[]) {
  return request<BreezePerson[]>("/people/update", {
    person_id: personId,
    fields_json: JSON.stringify(fields),
  });
}

export function showPerson(personId: string) {
  return request<BreezePerson>(`/people/${encodeURIComponent(personId)}`, { details: 1 });
}

// ── Profile fields ───────────────────────────────────────────────────────

export interface BreezeProfileFieldOption {
  option_id: string;
  name: string;
}

export interface BreezeProfileField {
  field_id: string;
  field_type: string;
  name: string;
  options: BreezeProfileFieldOption[];
}

export interface BreezeProfileSection {
  name: string;
  fields: BreezeProfileField[];
}

export function listProfileFields() {
  return request<BreezeProfileSection[]>("/profile");
}

// ── Tags ─────────────────────────────────────────────────────────────────

export function assignTag(personId: string, tagId: string) {
  return request<true>("/tags/assign", { person_id: personId, tag_id: tagId });
}

// ── Families ─────────────────────────────────────────────────────────────
// Note: Breeze documents that families/create will remove any listed person
// from an existing family. We therefore only ever call families/create when
// we've confirmed nobody involved already has a family, and use families/add
// (which preserves the existing family record) otherwise. See breeze.ts.

export function createFamily(peopleIds: string[]) {
  return request<{ success: boolean }>("/families/create", {
    people_ids_json: JSON.stringify(peopleIds),
  });
}

export function addToFamily(peopleIds: string[], targetPersonId: string) {
  return request<{ success: boolean }>("/families/add", {
    people_ids_json: JSON.stringify(peopleIds),
    target_person_id: targetPersonId,
  });
}
