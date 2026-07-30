// Shared types + pure validation/sanitization for the Connect Card.
// Kept dependency-free and side-effect-free so it can be unit tested with
// node's built-in test runner (no new dependency needed).

export const ATTENDANCE_STATUSES = ["first_time", "visited_before", "regular"] as const;
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];

export const PREFERRED_CONTACTS = ["text", "call", "email", "no_preference"] as const;
export type PreferredContact = (typeof PREFERRED_CONTACTS)[number];

export const MARITAL_STATUSES = ["single", "married", "widowed"] as const;
export type MaritalStatus = (typeof MARITAL_STATUSES)[number];

export const AGE_GROUPS = [
  "under_18",
  "18_24",
  "25_34",
  "35_44",
  "45_54",
  "55_64",
  "65_plus",
  "prefer_not_to_answer",
] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export const HEARD_ABOUT = [
  "friend_family",
  "church_member",
  "website",
  "search_engine",
  "social_media",
  "church_event",
  "bus_ministry",
  "other",
] as const;
export type HeardAbout = (typeof HEARD_ABOUT)[number];

export const GRADES = ["nursery", "preschool", "kindergarten", "other"] as const;
export type Grade = (typeof GRADES)[number];

export const INTERESTS = [
  "more_info",
  "childrens_ministry",
  "teen_ministry",
  "adult_bible_classes",
  "bus_ministry",
  "speak_with_pastor",
  "schedule_visit",
  "prayer_request",
] as const;
export type Interest = (typeof INTERESTS)[number];

export interface ChildInput {
  firstName: string;
  lastName: string;
  grade: Grade | "";
  gradeOther: string;
}

export interface ConnectCardInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact | "";
  street: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  maritalStatus: MaritalStatus | "";
  attendanceStatus: AttendanceStatus | "";
  ageGroup: AgeGroup | "";
  visitDate: string;
  howHeard: HeardAbout | "";
  howHeardOther: string;
  hasChildren: boolean;
  children: ChildInput[];
  interests: Interest[];
  prayerRequest: string;
  comments: string;
  contactConsent: boolean;
  botcheck: string;
}

export interface ValidatedConnectCard {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  preferredContact: PreferredContact | null;
  street: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  maritalStatus: MaritalStatus | null;
  attendanceStatus: AttendanceStatus;
  ageGroup: AgeGroup | null;
  visitDate: string | null;
  howHeard: HeardAbout | null;
  howHeardOther: string | null;
  children: { firstName: string; lastName: string | null; grade: Grade; gradeOther: string | null }[];
  interests: Interest[];
  prayerRequest: string | null;
  comments: string | null;
  contactConsent: boolean;
}

export type FieldErrors = Record<string, string>;

// ── Limits ──────────────────────────────────────────────────────────────────
export const MAX_NAME_LEN = 80;
export const MAX_SHORT_LEN = 120;
export const MAX_LONG_LEN = 2000;
export const MAX_CHILDREN = 10;

export function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Basic, permissive email check — good enough to catch typos without rejecting valid addresses. */
export function isValidEmail(value: string): boolean {
  if (value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Normalizes a phone number to digits only (keeping a leading "+" for intl numbers), for
 *  storage/comparison. Returns null if it doesn't look like a plausible phone number. */
export function normalizePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return (hasPlus ? "+" : "") + digits;
}

export function normalizeEmail(value: string): string | null {
  const trimmed = value.trim().toLowerCase();
  return trimmed || null;
}

function clip(value: string, max: number): string {
  return value.slice(0, max);
}

/** Escapes HTML for safe interpolation into email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips characters that could be used for email header injection (CRLF) from
 *  any value that might end up in a header (reply-to, subject). */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Escapes characters with special meaning in Slack's mrkdwn so visitor input
 *  can't break message formatting or inject fake fields. */
export function escapeSlack(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const isEnum = <T extends readonly string[]>(list: T, value: string): value is T[number] =>
  (list as readonly string[]).includes(value);

/**
 * Validates and normalizes a raw submission. Returns either the cleaned data
 * or a map of field -> error message. Never throws on bad input — only on
 * clearly malformed request shapes (handled by the caller via try/catch on JSON.parse).
 */
export function validateConnectCard(raw: Record<string, unknown>): {
  data: ValidatedConnectCard | null;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  const firstName = clip(trim(raw.firstName), MAX_NAME_LEN);
  const lastName = clip(trim(raw.lastName), MAX_NAME_LEN);
  if (!firstName) errors.firstName = "Please enter your first name.";
  if (!lastName) errors.lastName = "Please enter your last name.";

  const emailRaw = clip(trim(raw.email), MAX_SHORT_LEN);
  let email: string | null = null;
  if (emailRaw) {
    if (!isValidEmail(emailRaw)) {
      errors.email = "That email address doesn't look quite right.";
    } else {
      email = normalizeEmail(emailRaw);
    }
  }

  const phoneRaw = clip(trim(raw.phone), 40);
  let phone: string | null = null;
  if (phoneRaw) {
    phone = normalizePhone(phoneRaw);
    if (!phone) errors.phone = "Please enter a valid phone number.";
  }

  const preferredContactRaw = trim(raw.preferredContact);
  const preferredContact: PreferredContact | null = isEnum(PREFERRED_CONTACTS, preferredContactRaw)
    ? preferredContactRaw
    : null;

  const street = clip(trim(raw.street), MAX_SHORT_LEN) || null;
  const street2 = clip(trim(raw.street2), MAX_SHORT_LEN) || null;
  const city = clip(trim(raw.city), MAX_NAME_LEN) || null;
  const state = clip(trim(raw.state), 40) || null;
  const zip = clip(trim(raw.zip), 20) || null;

  const maritalStatusRaw = trim(raw.maritalStatus);
  const maritalStatus: MaritalStatus | null = isEnum(MARITAL_STATUSES, maritalStatusRaw)
    ? maritalStatusRaw
    : null;

  const attendanceStatusRaw = trim(raw.attendanceStatus);
  const attendanceStatus: AttendanceStatus | null = isEnum(ATTENDANCE_STATUSES, attendanceStatusRaw)
    ? attendanceStatusRaw
    : null;
  if (!attendanceStatus) errors.attendanceStatus = "Please let us know if this is your first visit.";

  const ageGroupRaw = trim(raw.ageGroup);
  const ageGroup: AgeGroup | null = isEnum(AGE_GROUPS, ageGroupRaw) ? ageGroupRaw : null;

  const visitDateRaw = clip(trim(raw.visitDate), 10);
  const visitDate = /^\d{4}-\d{2}-\d{2}$/.test(visitDateRaw) ? visitDateRaw : null;

  const howHeardRaw = trim(raw.howHeard);
  const howHeard: HeardAbout | null = isEnum(HEARD_ABOUT, howHeardRaw) ? howHeardRaw : null;
  const howHeardOther =
    howHeard === "other" ? clip(trim(raw.howHeardOther), MAX_SHORT_LEN) || null : null;

  // Children — only present when hasChildren is truthy on the client, but we
  // validate defensively regardless of that flag.
  const childrenRaw = Array.isArray(raw.children) ? raw.children : [];
  if (childrenRaw.length > MAX_CHILDREN) {
    errors.children = `Please list ${MAX_CHILDREN} children or fewer, or contact the church office directly.`;
  }
  const children: ValidatedConnectCard["children"] = [];
  childrenRaw.slice(0, MAX_CHILDREN).forEach((c, i) => {
    if (typeof c !== "object" || c === null) return;
    const rec = c as Record<string, unknown>;
    const childFirst = clip(trim(rec.firstName), MAX_NAME_LEN);
    const childLast = clip(trim(rec.lastName), MAX_NAME_LEN) || null;
    const gradeRaw = trim(rec.grade);
    const grade: Grade | null = isEnum(GRADES, gradeRaw) ? gradeRaw : null;
    const gradeOther = grade === "other" ? clip(trim(rec.gradeOther), 60) || null : null;
    if (!childFirst) {
      errors[`children.${i}.firstName`] = "Please enter the child's first name, or remove this entry.";
      return;
    }
    if (!grade) {
      errors[`children.${i}.grade`] = "Please select a grade for this child.";
      return;
    }
    children.push({ firstName: childFirst, lastName: childLast, grade, gradeOther });
  });

  const interestsRaw = Array.isArray(raw.interests) ? raw.interests : [];
  const interests = interestsRaw.filter(
    (v): v is Interest => typeof v === "string" && isEnum(INTERESTS, v)
  );

  const prayerRequest = interests.includes("prayer_request")
    ? clip(trim(raw.prayerRequest), MAX_LONG_LEN) || null
    : null;

  const comments = clip(trim(raw.comments), MAX_LONG_LEN) || null;

  const contactConsent = raw.contactConsent === true || raw.contactConsent === "true";

  if (Object.keys(errors).length > 0 || !attendanceStatus) {
    return { data: null, errors };
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      phone,
      preferredContact,
      street,
      street2,
      city,
      state,
      zip,
      maritalStatus,
      attendanceStatus,
      ageGroup,
      visitDate,
      howHeard,
      howHeardOther,
      children,
      interests,
      prayerRequest,
      comments,
      contactConsent,
    },
    errors: {},
  };
}

/** Rejects request bodies containing keys we don't recognize, to stop mass-assignment
 *  style abuse before it ever reaches validation. */
export const ALLOWED_FIELDS = new Set([
  "firstName",
  "lastName",
  "email",
  "phone",
  "preferredContact",
  "street",
  "street2",
  "city",
  "state",
  "zip",
  "maritalStatus",
  "attendanceStatus",
  "ageGroup",
  "visitDate",
  "howHeard",
  "howHeardOther",
  "hasChildren",
  "children",
  "interests",
  "prayerRequest",
  "comments",
  "contactConsent",
  "botcheck",
]);

export function hasUnexpectedFields(raw: Record<string, unknown>): string[] {
  return Object.keys(raw).filter((k) => !ALLOWED_FIELDS.has(k));
}
