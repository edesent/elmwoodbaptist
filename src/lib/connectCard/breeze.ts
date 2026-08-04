import type { ValidatedConnectCard, AttendanceStatus } from "./validation";
import { loadBreezeConfig, isBreezeReady, BreezeConfigError, type BreezeFieldMap } from "./breezeConfig";
import * as client from "./breezeClient";
import type { BreezeFieldUpdate, BreezePerson } from "./breezeClient";

export type PersonSyncStatus =
  | "created"
  | "updated"
  | "possible_duplicate_created"
  | "manual_review_required"
  | "failed"
  | "disabled";

export interface BreezePersonResult {
  status: PersonSyncStatus;
  personId?: string;
  name: string;
  note?: string;
  /** The raw response Breeze returned for this person's create/update call —
   *  kept for troubleshooting so staff can see exactly what Breeze sent back,
   *  not just our summarized status. */
  raw?: unknown;
}

export interface BreezeFamilyResult {
  status: "created" | "added" | "skipped" | "flagged_for_review" | "failed" | "disabled";
  note?: string;
}

export interface BreezeTagResult {
  status: "assigned" | "partial" | "skipped" | "failed" | "disabled";
  assigned: string[];
  failed: string[];
}

export interface BreezeSyncResult {
  enabled: boolean;
  submissionId: string;
  adult: BreezePersonResult;
  children: BreezePersonResult[];
  family: BreezeFamilyResult;
  tags: BreezeTagResult;
  conflicts: string[];
  configError?: string;
}

function disabledResult(submissionId: string, configError?: string): BreezeSyncResult {
  return {
    enabled: false,
    submissionId,
    adult: { status: "disabled", name: "" },
    children: [],
    family: { status: "disabled" },
    tags: { status: "disabled", assigned: [], failed: [] },
    conflicts: [],
    configError,
  };
}

// ── Field-update builders ────────────────────────────────────────────────

function buildAdultFieldUpdates(data: ValidatedConnectCard, map: BreezeFieldMap): BreezeFieldUpdate[] {
  const updates: BreezeFieldUpdate[] = [];

  if (map.email && data.email) {
    updates.push({
      field_id: map.email.fieldId,
      field_type: "email",
      response: true,
      details: { address: data.email },
    });
  }
  if (map.phone && data.phone) {
    updates.push({
      field_id: map.phone.fieldId,
      field_type: "phone",
      response: true,
      details: { phone_mobile: data.phone },
    });
  }
  if (map.address && (data.street || data.city || data.state || data.zip)) {
    updates.push({
      field_id: map.address.fieldId,
      field_type: "address",
      response: true,
      details: {
        street_address: [data.street, data.street2].filter(Boolean).join(" "),
        city: data.city ?? "",
        state: data.state ?? "",
        zip: data.zip ?? "",
      },
    });
  }
  if (map.maritalStatus && data.maritalStatus && map.maritalStatus.options?.[data.maritalStatus]) {
    updates.push({
      field_id: map.maritalStatus.fieldId,
      field_type: map.maritalStatus.fieldType,
      response: map.maritalStatus.options[data.maritalStatus],
    });
  }
  if (map.preferredContact && data.preferredContact && map.preferredContact.options?.[data.preferredContact]) {
    updates.push({
      field_id: map.preferredContact.fieldId,
      field_type: map.preferredContact.fieldType,
      response: map.preferredContact.options[data.preferredContact],
    });
  }
  if (map.firstVisitDate && data.visitDate) {
    updates.push({
      field_id: map.firstVisitDate.fieldId,
      field_type: "date",
      response: data.visitDate,
    });
  }
  if (map.howHeard && data.howHeard && map.howHeard.options?.[data.howHeard]) {
    updates.push({
      field_id: map.howHeard.fieldId,
      field_type: map.howHeard.fieldType,
      response: map.howHeard.options[data.howHeard],
    });
  }
  if (map.permissionToContact) {
    updates.push({
      field_id: map.permissionToContact.fieldId,
      field_type: "checkbox",
      response: data.contactConsent ? "true" : "false",
    });
  }

  return updates;
}

// ── Matching ─────────────────────────────────────────────────────────────

interface MatchOutcome {
  type: "strong_email" | "strong_phone" | "possible_name" | "none";
  person?: BreezePerson;
}

function namesConsistent(a: BreezePerson, firstName: string, lastName: string): boolean {
  const norm = (v: string) => v.trim().toLowerCase();
  return norm(a.first_name) === norm(firstName) && norm(a.last_name) === norm(lastName);
}

async function findAdultMatch(data: ValidatedConnectCard, map: BreezeFieldMap): Promise<MatchOutcome> {
  if (map.email && data.email) {
    const res = await client.listPeople({ [map.email.fieldId]: data.email });
    if (res.ok && res.data.length >= 1) {
      // Confirm with an exact detail fetch — filter_json semantics aren't
      // guaranteed to be an exact match, so we re-check before trusting it.
      const candidate = res.data[0];
      const detail = await client.showPerson(candidate.id);
      if (detail.ok) {
        const emailField = (detail.data.details as Record<string, unknown> | undefined)?.[map.email.fieldId];
        const emailStr =
          typeof emailField === "string"
            ? emailField
            : (emailField as { address?: string } | undefined)?.address;
        if (typeof emailStr === "string" && emailStr.trim().toLowerCase() === data.email) {
          return { type: "strong_email", person: detail.data };
        }
      }
    }
  }

  if (map.phone && data.phone) {
    const res = await client.listPeople({ [map.phone.fieldId]: data.phone });
    if (res.ok && res.data.length >= 1) {
      const candidate = res.data[0];
      if (namesConsistent(candidate, data.firstName, data.lastName)) {
        return { type: "strong_phone", person: candidate };
      }
    }
  }

  // Weak signal only: same first + last name. Never treated as a strong match.
  const nameRes = await client.listPeople();
  if (nameRes.ok) {
    const nameMatch = nameRes.data.find((p) => namesConsistent(p, data.firstName, data.lastName));
    if (nameMatch) return { type: "possible_name", person: nameMatch as BreezePerson };
  }

  return { type: "none" };
}

// ── Adult sync ───────────────────────────────────────────────────────────

async function syncAdult(
  data: ValidatedConnectCard,
  map: BreezeFieldMap,
  conflicts: string[]
): Promise<BreezePersonResult> {
  const name = `${data.firstName} ${data.lastName}`;
  const match = await findAdultMatch(data, map);

  if (match.type === "strong_email" || match.type === "strong_phone") {
    const person = match.person!;
    // "Do not replace a non-empty value with blank" is naturally satisfied —
    // buildAdultFieldUpdates only includes fields the visitor actually filled in.
    const updates = buildAdultFieldUpdates(data, map);
    if (updates.length === 0) {
      return { status: "updated", personId: person.id, name, note: "Matched existing profile; no new fields to update." };
    }
    const res = await client.updatePerson(person.id, updates);
    if (!res.ok) {
      return { status: "failed", personId: person.id, name, note: res.message };
    }
    return { status: "updated", personId: person.id, name, raw: res.data };
  }

  if (match.type === "possible_name") {
    // Name-only match is never sufficient to update. Create a separate
    // profile and flag it so staff can decide whether to merge manually.
    const res = await client.addPerson(data.firstName, data.lastName, buildAdultFieldUpdates(data, map));
    if (!res.ok || !res.data?.[0]) {
      return { status: "failed", name, note: res.ok ? "Breeze did not return a new person." : res.message };
    }
    conflicts.push(
      `Possible duplicate: a Breeze profile named "${name}" already exists (id ${match.person!.id}). A new profile was created instead of updating it — please review.`
    );
    return {
      status: "possible_duplicate_created",
      personId: res.data[0].id,
      name,
      note: `Existing profile with the same name: ${match.person!.id}`,
      raw: res.data,
    };
  }

  const res = await client.addPerson(data.firstName, data.lastName, buildAdultFieldUpdates(data, map));
  if (!res.ok || !res.data?.[0]) {
    return { status: "failed", name, note: res.ok ? "Breeze did not return a new person." : res.message };
  }
  return { status: "created", personId: res.data[0].id, name };
}

// ── Children sync ────────────────────────────────────────────────────────

async function syncChild(
  child: ValidatedConnectCard["children"][number],
  map: BreezeFieldMap,
  familyCandidates: BreezePerson[]
): Promise<BreezePersonResult> {
  const name = `${child.firstName}${child.lastName ? " " + child.lastName : ""}`;

  // Strong signal: same name + same grade AND already in the parent's existing
  // Breeze family. Anything weaker results in a new profile rather than risking
  // an incorrect update to someone else's child.
  const match = familyCandidates.find(
    (p) => p.first_name.trim().toLowerCase() === child.firstName.trim().toLowerCase() &&
      (!child.lastName || p.last_name.trim().toLowerCase() === child.lastName.trim().toLowerCase())
  );

  const fields: BreezeFieldUpdate[] = [];
  if (map.grade && child.grade !== "other") {
    fields.push({ field_id: map.grade.fieldId, field_type: "grade", response: child.grade });
  }

  if (match) {
    const res = await client.updatePerson(match.id, fields);
    if (!res.ok) return { status: "failed", personId: match.id, name, note: res.message };
    return { status: "updated", personId: match.id, name };
  }

  const res = await client.addPerson(child.firstName, child.lastName ?? "", fields);
  if (!res.ok || !res.data?.[0]) {
    return { status: "failed", name, note: res.ok ? "Breeze did not return a new person." : res.message };
  }
  return { status: "created", personId: res.data[0].id, name };
}

// ── Tags ─────────────────────────────────────────────────────────────────

function tagIdsFor(status: AttendanceStatus, config: ReturnType<typeof loadBreezeConfig>): string[] {
  const ids: string[] = [];
  if (config.tags.connectCardTagId) ids.push(config.tags.connectCardTagId);
  const byStatus: Record<AttendanceStatus, string | undefined> = {
    first_time: config.tags.firstTimeVisitorTagId,
    visited_before: config.tags.returningVisitorTagId,
    regular: config.tags.regularAttenderTagId,
  };
  const statusTag = byStatus[status];
  if (statusTag) ids.push(statusTag);
  return ids;
}

// ── Entry point ──────────────────────────────────────────────────────────

/** Runs the full Breeze synchronization for one Connect Card submission.
 *  Never throws — every failure mode is captured in the returned result so
 *  the caller can still send the church email/Slack notification and show
 *  the visitor a normal success page. */
export async function syncToBreeze(
  data: ValidatedConnectCard,
  submissionId: string
): Promise<BreezeSyncResult> {
  let config;
  try {
    config = loadBreezeConfig();
  } catch (err) {
    const message = err instanceof BreezeConfigError ? err.message : "Invalid Breeze configuration.";
    console.error("Breeze config error:", message);
    return disabledResult(submissionId, message);
  }

  if (!isBreezeReady(config)) {
    return disabledResult(submissionId);
  }

  const conflicts: string[] = [];

  const adult = await syncAdult(data, config.fieldMap, conflicts);

  // Children — matched against the adult's existing family members, if any.
  let familyCandidates: BreezePerson[] = [];
  if (adult.personId && (adult.status === "updated")) {
    const detail = await client.showPerson(adult.personId);
    if (detail.ok && Array.isArray(detail.data.family)) {
      familyCandidates = detail.data.family as BreezePerson[];
    }
  }

  const children: BreezePersonResult[] = [];
  for (const child of data.children) {
    children.push(await syncChild(child, config.fieldMap, familyCandidates));
  }

  // Family linking — conservative: only link people we just confirmed have no
  // conflicting existing family. We never call families/destroy or
  // families/remove as part of this flow.
  let family: BreezeFamilyResult = { status: "skipped" };
  const adultStatus = adult.status;
  if (
    adult.personId &&
    (adultStatus === "created" ||
      adultStatus === "updated" ||
      adultStatus === "possible_duplicate_created")
  ) {
    const newChildIds = children.filter((c) => c.personId && c.status === "created").map((c) => c.personId!);
    const matchedChildIds = children.filter((c) => c.personId && c.status === "updated").map((c) => c.personId!);

    if (matchedChildIds.length > 0) {
      // These children were matched inside the adult's own family already —
      // nothing to link.
      family = newChildIds.length > 0
        ? { status: "skipped", note: "Existing family detected; only newly created children still need review." }
        : { status: "skipped", note: "Children already in the adult's family." };
    }

    if (newChildIds.length > 0) {
      const adultHadExistingFamily = familyCandidates.length > 0;
      if (adultHadExistingFamily) {
        const res = await client.addToFamily(newChildIds, adult.personId);
        family = res.ok
          ? { status: "added" }
          : { status: "failed", note: res.message };
      } else if (adultStatus === "possible_duplicate_created") {
        family = { status: "flagged_for_review", note: "Adult may be a duplicate — family linking skipped pending review." };
      } else {
        const res = await client.createFamily([adult.personId, ...newChildIds]);
        family = res.ok ? { status: "created" } : { status: "failed", note: res.message };
      }
    }
  }

  // Tags
  let tags: BreezeTagResult = { status: "skipped", assigned: [], failed: [] };
  if (adult.personId && adult.status !== "failed") {
    const ids = tagIdsFor(data.attendanceStatus, config);
    const assigned: string[] = [];
    const failed: string[] = [];
    for (const tagId of ids) {
      const res = await client.assignTag(adult.personId, tagId);
      if (res.ok) assigned.push(tagId);
      else failed.push(tagId);
    }
    tags = {
      status: failed.length === 0 ? (assigned.length > 0 ? "assigned" : "skipped") : assigned.length > 0 ? "partial" : "failed",
      assigned,
      failed,
    };
  }

  return {
    enabled: true,
    submissionId,
    adult,
    children,
    family,
    tags,
    conflicts,
  };
}
