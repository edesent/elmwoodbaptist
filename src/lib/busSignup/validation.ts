// Shared types + pure validation for the bus ministry pickup sign-up.
// Dependency-light and side-effect-free so the client form and the API route
// run exactly the same rules, and so it can be unit tested with node's
// built-in test runner (same approach as the Plan a Visit form).

import {
  containsLink,
  isCallablePhone,
  sanitizeLine,
} from "../planVisit/validation";

// ── The bus rules ───────────────────────────────────────────────────────────
// The whole family can ride together. Children riding WITHOUT a parent or
// guardian must be at least 4, be potty trained, and have a signed
// permission slip.
export const MIN_AGE_RIDING_ALONE = 4;
export const MAX_CHILD_AGE = 17;
export const MAX_CHILDREN = 10;

export const LIMITS = {
  guardianName: 80,
  phone: 30,
  street: 100,
  unit: 30,
  city: 60,
  childName: 40,
} as const;

/** Every top-level key the API route will accept. Anything else is a bot. */
export const ALLOWED_FIELDS = [
  "guardianName",
  "phone",
  "street",
  "unit",
  "city",
  "state",
  "zip",
  "guardianRiding",
  "children",
  "pottyTrained",
  "permissionSlip",
  "company", // honeypot
  "botcheck", // honeypot
  "formToken", // server-signed load time — checked in the route
  "__idempotencyKey",
] as const;

const ALLOWED_CHILD_FIELDS = ["name", "age"] as const;

export interface BusSignupChild {
  name: string;
  /** Whole years. 0 means under one year old. */
  age: number;
}

export interface BusSignupInput {
  guardianName: string;
  phone: string;
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  /** True when a parent/guardian from the family is riding along. */
  guardianRiding: boolean;
  children: BusSignupChild[];
  /** Only meaningful (and required) when children ride without a guardian. */
  pottyTrained: boolean;
  /** Only meaningful (and required) when children ride without a guardian. */
  permissionSlip: boolean;
}

/**
 * Flat map of field → message. Child problems use `child.<index>.name` and
 * `child.<index>.age`; list-level problems use `children`.
 */
export type FieldErrors = Record<string, string>;

export interface ValidationResult {
  data: BusSignupInput | null;
  errors: FieldErrors;
}

export function hasUnexpectedFields(raw: Record<string, unknown>): string[] {
  const allowed = new Set<string>(ALLOWED_FIELDS);
  const extra = Object.keys(raw).filter((k) => !allowed.has(k));

  if (Array.isArray(raw.children)) {
    const allowedChild = new Set<string>(ALLOWED_CHILD_FIELDS);
    for (const child of raw.children) {
      if (typeof child !== "object" || child === null || Array.isArray(child)) {
        extra.push("children[]");
        continue;
      }
      for (const key of Object.keys(child)) {
        if (!allowedChild.has(key)) extra.push(`children[].${key}`);
      }
    }
  }
  return extra;
}

/** True when a honeypot was filled in — swallow it with a cheerful success. */
export function looksLikeBot(raw: Record<string, unknown>): boolean {
  if (String(raw.company ?? "").trim()) return true;
  if (raw.botcheck) return true;
  return false;
}

function letterCount(value: string): number {
  return value.replace(/[^\p{L}]/gu, "").length;
}

function looksLikeAName(value: string): boolean {
  const letters = letterCount(value);
  return letters >= 2 && letters >= value.length / 2;
}

function hasFirstAndLastName(value: string): boolean {
  return value.split(" ").filter((part) => /\p{L}/u.test(part)).length >= 2;
}

/** Accepts 7 or "7", rejects "7.5", "", "abc", and anything out of range. */
function parseAge(value: unknown): number | null {
  let n: number;
  if (typeof value === "number") n = value;
  else if (typeof value === "string" && /^\d{1,2}$/.test(value.trim())) n = Number(value);
  else return null;
  if (!Number.isInteger(n) || n < 0 || n > MAX_CHILD_AGE) return null;
  return n;
}

export function validateBusSignup(raw: Record<string, unknown>): ValidationResult {
  const errors: FieldErrors = {};

  const guardianName = sanitizeLine(String(raw.guardianName ?? ""));
  const phone = sanitizeLine(String(raw.phone ?? ""));
  const street = sanitizeLine(String(raw.street ?? ""));
  const unit = sanitizeLine(String(raw.unit ?? ""));
  const city = sanitizeLine(String(raw.city ?? ""));
  const state = sanitizeLine(String(raw.state ?? "")).toUpperCase();
  const zip = sanitizeLine(String(raw.zip ?? ""));

  // ── Guardian ───────────────────────────────────────────────────────────
  if (!guardianName) {
    errors.guardianName = "Please enter your name.";
  } else if (
    guardianName.length > LIMITS.guardianName ||
    !looksLikeAName(guardianName) ||
    containsLink(guardianName)
  ) {
    errors.guardianName = "Please enter your name.";
  } else if (!hasFirstAndLastName(guardianName)) {
    errors.guardianName = "Please enter your first and last name.";
  }

  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length < 7 || digits.length > 15 || phone.length > LIMITS.phone) {
    errors.phone = "Please enter a phone number we can reach you at.";
  } else if (!isCallablePhone(phone)) {
    errors.phone = "Please double-check that phone number, including the area code.";
  }

  // ── Pickup address ─────────────────────────────────────────────────────
  if (!street) {
    errors.street = "Please enter the address where we should pick you up.";
  } else if (street.length > LIMITS.street || letterCount(street) < 2 || containsLink(street)) {
    errors.street = "Please check the street address.";
  }

  if (unit && (unit.length > LIMITS.unit || containsLink(unit))) {
    errors.unit = "Please shorten that apartment or unit number.";
  }

  if (!city) {
    errors.city = "Please enter the city.";
  } else if (city.length > LIMITS.city || letterCount(city) < 2 || containsLink(city)) {
    errors.city = "Please check the city.";
  }

  if (!/^[A-Z]{2}$/.test(state)) {
    errors.state = "Use the 2-letter state, like CO.";
  }

  if (!/^\d{5}(-\d{4})?$/.test(zip)) {
    errors.zip = "Please enter a 5-digit ZIP code.";
  }

  // ── Who is riding ──────────────────────────────────────────────────────
  if (typeof raw.guardianRiding !== "boolean") {
    errors.guardianRiding = "Please tell us whether you'll be riding along.";
  }
  const guardianRiding = raw.guardianRiding === true;

  // ── Children ───────────────────────────────────────────────────────────
  const children: BusSignupChild[] = [];
  const rawChildren = raw.children === undefined ? [] : raw.children;

  if (!Array.isArray(rawChildren)) {
    errors.children = "We couldn't read the list of children. Please try again.";
  } else if (rawChildren.length > MAX_CHILDREN) {
    errors.children = `Please sign up ${MAX_CHILDREN} or fewer children at a time, or call us and we'll help.`;
  } else {
    rawChildren.forEach((item, i) => {
      const c = (typeof item === "object" && item !== null ? item : {}) as Record<string, unknown>;
      const name = sanitizeLine(String(c.name ?? ""));
      const age = parseAge(c.age);

      if (!name) {
        errors[`child.${i}.name`] = "Please enter this child's name.";
      } else if (name.length > LIMITS.childName || !looksLikeAName(name) || containsLink(name)) {
        errors[`child.${i}.name`] = "Please check this child's name.";
      }

      if (age === null) {
        errors[`child.${i}.age`] = "Please choose an age.";
      } else if (raw.guardianRiding === false && age < MIN_AGE_RIDING_ALONE) {
        errors[`child.${i}.age`] =
          `Children riding without a parent or guardian must be ${MIN_AGE_RIDING_ALONE} or older. ` +
          "Younger children are welcome to ride with a parent or guardian.";
      }

      children.push({ name, age: age ?? 0 });
    });
  }

  // ── Rules for children riding on their own ─────────────────────────────
  const pottyTrained = raw.pottyTrained === true;
  const permissionSlip = raw.permissionSlip === true;

  if (raw.guardianRiding === false) {
    if (Array.isArray(rawChildren) && rawChildren.length === 0) {
      errors.children = "Please add the children who will be riding.";
    }
    if (!pottyTrained) {
      errors.pottyTrained = "Please confirm that your children are potty trained.";
    }
    if (!permissionSlip) {
      errors.permissionSlip =
        "Please confirm that you understand a signed permission slip is needed.";
    }
  }

  if (Object.keys(errors).length > 0) return { data: null, errors };

  return {
    data: {
      guardianName,
      phone,
      street,
      unit,
      city,
      state,
      zip,
      guardianRiding,
      children,
      // These only count when children ride without a guardian.
      pottyTrained: guardianRiding ? false : pottyTrained,
      permissionSlip: guardianRiding ? false : permissionSlip,
    },
    errors: {},
  };
}
