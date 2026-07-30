import { escapeHtml, sanitizeHeaderValue, type ValidatedConnectCard } from "./validation";
import type { BreezeSyncResult } from "./breeze";

const ATTENDANCE_LABELS: Record<string, string> = {
  first_time: "This is my first time",
  visited_before: "I've visited before",
  regular: "I've been coming for a while",
};

const CONTACT_LABELS: Record<string, string> = {
  text: "Text",
  call: "Phone call",
  email: "Email",
  no_preference: "No preference",
};

const HEARD_LABELS: Record<string, string> = {
  friend_family: "Friend or family member",
  church_member: "Church member",
  website: "Website",
  search_engine: "Google or another search engine",
  social_media: "Social media",
  church_event: "Church event",
  bus_ministry: "Bus ministry",
  other: "Other",
};

const AGE_LABELS: Record<string, string> = {
  under_18: "Under 18",
  "18_24": "18–24",
  "25_34": "25–34",
  "35_44": "35–44",
  "45_54": "45–54",
  "55_64": "55–64",
  "65_plus": "65+",
  prefer_not_to_answer: "Prefer not to answer",
};

const INTEREST_LABELS: Record<string, string> = {
  more_info: "More information about the church",
  childrens_ministry: "Children's ministries",
  teen_ministry: "Teen ministry",
  adult_bible_classes: "Adult Bible classes",
  bus_ministry: "Bus ministry",
  speak_with_pastor: "Speak with a pastor",
  schedule_visit: "Schedule an in-person visit",
  prayer_request: "Prayer request",
};

function breezeSummaryLines(breeze: BreezeSyncResult | null): string[] {
  if (!breeze || !breeze.enabled) {
    return ["Not configured (Breeze sync is disabled)."];
  }
  const lines: string[] = [];
  const adultLabel: Record<string, string> = {
    created: "Created",
    updated: "Updated",
    possible_duplicate_created: "Possible duplicate — new profile created",
    manual_review_required: "Manual review required",
    failed: "Failed",
  };
  lines.push(`Primary person: ${adultLabel[breeze.adult.status] ?? breeze.adult.status}${breeze.adult.personId ? ` (Breeze ID ${breeze.adult.personId})` : ""}`);
  if (breeze.adult.note) lines.push(`  Note: ${breeze.adult.note}`);
  if (breeze.children.length) {
    lines.push("Children:");
    for (const c of breeze.children) {
      lines.push(`  - ${c.name}: ${c.status}${c.personId ? ` (Breeze ID ${c.personId})` : ""}`);
    }
  }
  lines.push(`Family linking: ${breeze.family.status}${breeze.family.note ? ` — ${breeze.family.note}` : ""}`);
  lines.push(`Tags: ${breeze.tags.status}${breeze.tags.assigned.length ? ` (${breeze.tags.assigned.length} assigned)` : ""}`);
  if (breeze.conflicts.length) {
    lines.push("Action needed:");
    for (const c of breeze.conflicts) lines.push(`  ⚠ ${c}`);
  }
  return lines;
}

export function buildStaffEmail(
  data: ValidatedConnectCard,
  submissionId: string,
  breeze: BreezeSyncResult | null
) {
  const fullName = sanitizeHeaderValue(`${data.firstName} ${data.lastName}`);
  const subject = `New Connect Card: ${fullName} — ${ATTENDANCE_LABELS[data.attendanceStatus]}`;

  const childrenText = data.children.length
    ? data.children.map((c) => `  - ${c.firstName}${c.lastName ? " " + c.lastName : ""} — ${c.grade === "other" ? c.gradeOther ?? "Other" : c.grade}`).join("\n")
    : "  None provided";

  const interestsText = data.interests.length
    ? data.interests.map((i) => `  - ${INTEREST_LABELS[i] ?? i}`).join("\n")
    : "  None selected";

  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/Denver", dateStyle: "full", timeStyle: "short" });

  const text = [
    `Submitted: ${submittedAt}`,
    "",
    "── Contact Information ──",
    `Name: ${fullName}`,
    `Email: ${data.email ?? "Not provided"}`,
    `Phone: ${data.phone ?? "Not provided"}`,
    `Preferred contact: ${data.preferredContact ? CONTACT_LABELS[data.preferredContact] : "Not specified"}`,
    data.street ? `Address: ${data.street}${data.street2 ? ", " + data.street2 : ""}, ${data.city ?? ""} ${data.state ?? ""} ${data.zip ?? ""}` : "Address: Not provided",
    `Marital status: ${data.maritalStatus ?? "Not specified"}`,
    "",
    "── Attendance Information ──",
    `Status: ${ATTENDANCE_LABELS[data.attendanceStatus]}`,
    `Age group: ${data.ageGroup ? AGE_LABELS[data.ageGroup] : "Not specified"}`,
    `Visit date: ${data.visitDate ?? "Not specified"}`,
    `How they heard about us: ${data.howHeard ? (data.howHeard === "other" ? data.howHeardOther ?? "Other" : HEARD_LABELS[data.howHeard]) : "Not specified"}`,
    "",
    "── Family & Children ──",
    childrenText,
    "",
    "── Areas of Interest ──",
    interestsText,
    "",
    "── Prayer Request ──",
    data.prayerRequest ?? "None",
    "",
    "── Comments ──",
    data.comments ?? "None",
    "",
    "── Permission to Contact ──",
    data.contactConsent ? "Yes" : "No",
    "",
    "── Breeze ChMS Synchronization ──",
    ...breezeSummaryLines(breeze),
    "",
    "── Technical Information ──",
    `Submission ID: ${submissionId}`,
  ].join("\n");

  const esc = escapeHtml;
  const childrenHtml = data.children.length
    ? `<ul>${data.children.map((c) => `<li>${esc(c.firstName)}${c.lastName ? " " + esc(c.lastName) : ""} — ${esc(c.grade === "other" ? c.gradeOther ?? "Other" : c.grade)}</li>`).join("")}</ul>`
    : "<p>None provided</p>";
  const interestsHtml = data.interests.length
    ? `<ul>${data.interests.map((i) => `<li>${esc(INTEREST_LABELS[i] ?? i)}</li>`).join("")}</ul>`
    : "<p>None selected</p>";
  const breezeHtml = `<ul>${breezeSummaryLines(breeze).map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`;

  const html = `
    <p><strong>Submitted:</strong> ${esc(submittedAt)}</p>
    <h3>Contact Information</h3>
    <p><strong>Name:</strong> ${esc(fullName)}<br>
    <strong>Email:</strong> ${esc(data.email ?? "Not provided")}<br>
    <strong>Phone:</strong> ${esc(data.phone ?? "Not provided")}<br>
    <strong>Preferred contact:</strong> ${esc(data.preferredContact ? CONTACT_LABELS[data.preferredContact] : "Not specified")}<br>
    <strong>Address:</strong> ${data.street ? esc(`${data.street}${data.street2 ? ", " + data.street2 : ""}, ${data.city ?? ""} ${data.state ?? ""} ${data.zip ?? ""}`) : "Not provided"}<br>
    <strong>Marital status:</strong> ${esc(data.maritalStatus ?? "Not specified")}</p>
    <h3>Attendance Information</h3>
    <p><strong>Status:</strong> ${esc(ATTENDANCE_LABELS[data.attendanceStatus])}<br>
    <strong>Age group:</strong> ${esc(data.ageGroup ? AGE_LABELS[data.ageGroup] : "Not specified")}<br>
    <strong>Visit date:</strong> ${esc(data.visitDate ?? "Not specified")}<br>
    <strong>How they heard about us:</strong> ${esc(data.howHeard ? (data.howHeard === "other" ? data.howHeardOther ?? "Other" : HEARD_LABELS[data.howHeard]) : "Not specified")}</p>
    <h3>Family &amp; Children</h3>
    ${childrenHtml}
    <h3>Areas of Interest</h3>
    ${interestsHtml}
    <h3>Prayer Request</h3>
    <p>${data.prayerRequest ? esc(data.prayerRequest).replace(/\n/g, "<br>") : "None"}</p>
    <h3>Comments</h3>
    <p>${data.comments ? esc(data.comments).replace(/\n/g, "<br>") : "None"}</p>
    <h3>Permission to Contact</h3>
    <p>${data.contactConsent ? "Yes" : "No"}</p>
    <h3>Breeze ChMS Synchronization</h3>
    ${breezeHtml}
    <h3>Technical Information</h3>
    <p>Submission ID: ${esc(submissionId)}</p>
  `;

  return { subject, text, html };
}

export function buildVisitorAutoreply(data: ValidatedConnectCard) {
  const firstName = escapeHtml(data.firstName);
  const subject = "Thanks for connecting with Elmwood Baptist Church!";
  const siteUrl = process.env.SITE_URL || "https://elmwoodbaptist.elijahdesent.com";

  const text = `Hi ${data.firstName},

Thank you for visiting Elmwood Baptist Church and for taking a moment to fill out a Connect Card — we're so glad you're part of our church family, even if just for a visit!

If you have any questions, just reply to this email, or reach us at (303) 659-3818. One of our pastors would be glad to meet with you in person any time.

We'd love to have you back! You can find our service times, ministries, and recent messages at https://elmwoodbaptist.elijahdesent.com.

More than a church — we're a family.

Elmwood Baptist Church
13100 E 144th Ave, Brighton, CO 80601
office@elmwoodbaptist.org · (303) 659-3818
`;

  const html = `
    <p>Hi ${firstName},</p>
    <p>Thank you for visiting Elmwood Baptist Church and for taking a moment to fill out a Connect Card
    — we're so glad you're part of our church family, even if just for a visit!</p>
    <p>If you have any questions, just reply to this email, or reach us at
    <a href="tel:+13036593818">(303) 659-3818</a>. One of our pastors would be glad to meet with you in person any time.</p>
    <p>We'd love to have you back! You can find our service times, ministries, and recent messages at
    <a href="https://elmwoodbaptist.elijahdesent.com">our website</a>.</p>
    <p><em>More than a church — we're a family.</em></p>
    <p>Elmwood Baptist Church<br>
    13100 E 144th Ave, Brighton, CO 80601<br>
    <a href="mailto:office@elmwoodbaptist.org">office@elmwoodbaptist.org</a> · (303) 659-3818</p>
  `;

  return { subject, text, html };
}
