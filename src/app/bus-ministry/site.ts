// Shared constants for the bus ministry mini-site (busbuddies.elmwoodbaptist.org).
// Links back to the main church site are absolute, because on the bus
// subdomain a path like "/visit-us" would resolve on the bus host.

export const BUS_SITE_URL = "https://busbuddies.elmwoodbaptist.org";
export const MAIN_SITE_URL = "https://www.elmwoodbaptist.org";

export const PHONE_DISPLAY = "(303) 659-3818";
export const PHONE_HREF = "tel:+13036593818";
export const EMAIL = "office@elmwoodbaptist.org";

/** Section links shown in the bus header and footer. */
export const BUS_SECTIONS = [
  { href: "#on-the-bus", label: "The Fun" },
  { href: "#safety", label: "For Parents" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "Questions" },
] as const;
