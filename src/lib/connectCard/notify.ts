import { escapeHtml, sanitizeHeaderValue, type ValidatedConnectCard } from "./validation";
import type { BreezeSyncResult } from "./breeze";

const ATTENDANCE_LABELS: Record<string, string> = {
  first_time: "This is my first time",
  visited_before: "I've visited before",
  regular: "I've been coming for a while",
  member: "I'm a church member",
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
  "18_39": "18–39",
  "40_59": "40–59",
  "60_plus": "60+",
  prefer_not_to_answer: "Prefer not to say",
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
  if (breeze.adult.raw !== undefined) {
    lines.push(`  Raw Breeze response: ${JSON.stringify(breeze.adult.raw)}`);
  }
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

// ── Visitor thank-you email ─────────────────────────────────────────────────
// Email clients ignore external CSS and most modern layout, so this uses the
// classic nested-table + inline-style approach. Images are PNG/JPG (not SVG,
// which Gmail/Outlook won't render) and are served from /public/email on the
// live site, so SITE_URL must point at a deployed copy of the site.

const DEFAULT_SITE_URL = "https://www.elmwoodbaptist.org";

const CHURCH_PHONE = "(303) 659-3818";
const CHURCH_PHONE_HREF = "tel:+13036593818";
const CHURCH_EMAIL = "office@elmwoodbaptist.org";
const CHURCH_ADDRESS_LINES = ["13100 E 144th Ave", "Brighton, CO 80601"];
const DIRECTIONS_URL = "https://maps.google.com/?q=13100+E+144th+Ave+Brighton+CO+80601";
const FACEBOOK_URL = "https://facebook.com/elmwoodbaptistbrighton";
const YOUTUBE_URL = "https://youtube.com/@elmwoodbaptist";

const SERVICE_TIMES = [
  { day: "Sunday", title: "Sunday Service", time: "10:00 AM" },
  { day: "Sunday", title: "Family Bible Time", time: "11:30 AM" },
  { day: "Sunday", title: "Afternoon Service", time: "1:30 PM" },
  { day: "Thursday", title: "Mid-Week Service", time: "7:00 PM" },
];

// Brand palette (mirrors src/app/globals.css).
const COLOR = {
  navy: "#0b2740",
  navyMid: "#123a5c",
  blue: "#1c5180",
  teal: "#2bb3d6",
  tealLight: "#6fd0e6",
  tealDark: "#0d6b89",
  page: "#eef3f6",
  line: "#dde7ec",
  tint: "#f9fcfd",
  heading: "#122c43",
  body: "#3c4a57",
  muted: "#66747f",
};
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS = "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const CONTACT_METHOD_PHRASE: Record<string, string> = {
  text: " by text message",
  call: " by phone",
  email: " by email",
};

type Intro = { eyebrow: string; headline: (name: string) => string; paragraphs: string[] };

const INTRO_BY_STATUS: Record<string, Intro> = {
  first_time: {
    eyebrow: "Welcome",
    headline: (n) => `Thank you for visiting, ${n}!`,
    paragraphs: [
      "We're so glad you joined us. Whether you came on your own, with your family, or because someone invited you, it was a joy to have you in the house of the Lord.",
      "Thank you for taking a moment to fill out a Connect Card. It helps us get to know you, and we'd love to see you again.",
    ],
  },
  visited_before: {
    eyebrow: "Welcome Back",
    headline: (n) => `It's good to see you again, ${n}!`,
    paragraphs: [
      "Thank you for coming back and for filling out a Connect Card. We're grateful you chose to spend time with us again.",
      "You're always welcome here, and we hope Elmwood is starting to feel a little like home.",
    ],
  },
  regular: {
    eyebrow: "Thank You",
    headline: (n) => `Thank you, ${n}.`,
    paragraphs: [
      "We're thankful you've been worshiping with us, and we appreciate you taking the time to share your information.",
      "It helps us stay in touch, pray for you, and make sure you're getting connected to everything going on in our church family.",
    ],
  },
  member: {
    eyebrow: "Thank You",
    headline: (n) => `Thank you, ${n}.`,
    paragraphs: [
      "Thank you for keeping your information up to date with your church family. We're blessed to have you as part of Elmwood.",
      "If there's anything we can do to pray for you or serve you, just let us know.",
    ],
  },
};

export function buildVisitorAutoreply(data: ValidatedConnectCard) {
  const siteUrl = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
  const name = data.firstName;
  const esc = escapeHtml;
  const intro = INTRO_BY_STATUS[data.attendanceStatus] ?? INTRO_BY_STATUS.first_time;

  const subject = sanitizeHeaderValue(`Thanks for connecting with Elmwood Baptist Church, ${name}!`);
  const preheader = "We're so glad you're part of our church family. Here's when we gather and how to reach us.";

  // ── "What happens next" items (only what's actually true for this visitor) ──
  const next: string[] = [];
  if (data.contactConsent) {
    next.push(
      `A member of our church family will be in touch${data.preferredContact ? CONTACT_METHOD_PHRASE[data.preferredContact] ?? "" : ""} to say hello and answer any questions.`
    );
  }
  const interests = data.interests
    .filter((i) => !(i === "prayer_request" && data.prayerRequest))
    .map((i) => INTEREST_LABELS[i] ?? i);
  if (interests.length) {
    next.push(`You mentioned you'd like to hear about: ${interests.join(", ")}.`);
  }
  if (data.prayerRequest) {
    next.push("We received your prayer request, and we're praying for you.");
  }
  if (data.children.length) {
    next.push(
      "Your children are welcome! We have a nursery for infants through age 3, and Family Bible Time at 11:30 AM offers Sunday School classes for every age."
    );
  }

  // ── Plain-text version ──────────────────────────────────────────────────
  const text = [
    `Hi ${name},`,
    "",
    intro.headline(name),
    "",
    ...intro.paragraphs.flatMap((p) => [p, ""]),
    ...(next.length ? ["WHAT HAPPENS NEXT", ...next.map((n) => `  - ${n}`), ""] : []),
    "JOIN US THIS WEEK",
    ...SERVICE_TIMES.map((s) => `  ${s.day} - ${s.title}: ${s.time}`),
    "",
    "Come as you are. You'll be greeted like family, and there's plenty of parking right out front.",
    `Get directions: ${DIRECTIONS_URL}`,
    "",
    `Questions? Just reply to this email or call us at ${CHURCH_PHONE}. One of our pastors would be glad to meet with you any time.`,
    "",
    '"I was glad when they said unto me, Let us go into the house of the LORD." - Psalm 122:1',
    "",
    "With joy,",
    "Your church family at Elmwood Baptist Church",
    "More than a church - we're a family.",
    "",
    CHURCH_ADDRESS_LINES.join(", "),
    `${CHURCH_EMAIL} · ${CHURCH_PHONE}`,
    siteUrl,
    "",
    "You're receiving this one-time message because you filled out a Connect Card at Elmwood Baptist Church.",
  ].join("\n");

  // ── HTML version ────────────────────────────────────────────────────────
  const button = (href: string, label: string, kind: "primary" | "secondary") => {
    const primary = kind === "primary";
    const bg = primary ? COLOR.blue : "#ffffff";
    const fg = primary ? "#ffffff" : COLOR.blue;
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;margin:4px 4px;">
      <tr><td align="center" bgcolor="${bg}" style="border-radius:999px;border:2px solid ${COLOR.blue};">
        <a href="${esc(href)}" target="_blank" style="display:inline-block;padding:13px 26px;font-family:${SANS};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;color:${fg};">${esc(label)}</a>
      </td></tr></table>`;
  };

  const eyebrow = (label: string, color: string = COLOR.tealDark) =>
    `<p style="margin:0 0 8px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${color};">${esc(label)}</p>`;

  const paragraphsHtml = intro.paragraphs
    .map(
      (p) =>
        `<p class="t-body" style="margin:0 0 16px;font-family:${SANS};font-size:16px;line-height:1.65;color:${COLOR.body};">${esc(p)}</p>`
    )
    .join("");

  const nextHtml = next.length
    ? `<tr><td class="px" style="padding:8px 40px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card" style="background:${COLOR.page};border-radius:14px;">
          <tr><td style="padding:24px 26px 12px;">
            ${eyebrow("What Happens Next")}
          </td></tr>
          ${next
            .map(
              (n, idx) => `<tr><td style="padding:0 26px ${idx === next.length - 1 ? 24 : 12}px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td width="26" valign="top" style="font-family:${SANS};font-size:16px;font-weight:700;line-height:1.55;color:${COLOR.tealDark};">&#10003;</td>
                <td class="t-body" valign="top" style="font-family:${SANS};font-size:15px;line-height:1.55;color:${COLOR.body};">${esc(n)}</td>
              </tr></table></td></tr>`
            )
            .join("")}
        </table></td></tr>`
    : "";

  const servicesHtml = SERVICE_TIMES.map(
    (s, idx) => `<tr>
      <td class="row-line" style="padding:14px 0;${idx ? `border-top:1px solid ${COLOR.line};` : ""}">
        <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${COLOR.tealDark};">${esc(s.day)}</p>
        <p class="t-head" style="margin:2px 0 0;font-family:${SERIF};font-size:18px;font-weight:700;color:${COLOR.heading};">${esc(s.title)}</p>
      </td>
      <td class="row-line" align="right" valign="middle" style="padding:14px 0;${idx ? `border-top:1px solid ${COLOR.line};` : ""}white-space:nowrap;">
        <p class="t-accent" style="margin:0;font-family:${SERIF};font-size:22px;font-weight:700;color:${COLOR.blue};">${esc(s.time)}</p>
      </td></tr>`
  ).join("");

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(subject)}</title>
<style>
  body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
  a { color:${COLOR.blue}; }
  @media only screen and (max-width:620px) {
    .container { width:100% !important; }
    .px { padding-left:24px !important; padding-right:24px !important; }
    .h1 { font-size:26px !important; }
    .logo { width:180px !important; height:auto !important; }
  }
  @media (prefers-color-scheme: dark) {
    .page { background:#07131f !important; }
    .shell, .main { background:#0f2a43 !important; }
    .card { background:#143554 !important; }
    .t-head, .t-body { color:#e6eef4 !important; }
    .t-accent { color:${COLOR.tealLight} !important; }
    .row-line { border-color:#24476a !important; }
  }
</style>
</head>
<body class="page" style="margin:0;padding:0;background:${COLOR.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${esc(preheader)}${"&nbsp;&zwnj;".repeat(40)}</div>
<table role="presentation" class="page" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.page}" style="background:${COLOR.page};">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" class="container shell" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">

  <!-- Header -->
  <tr><td align="center" bgcolor="${COLOR.navy}" style="background:${COLOR.navy};padding:30px 24px 26px;">
    <a href="${esc(siteUrl)}" target="_blank" style="text-decoration:none;">
      <img class="logo" src="${esc(siteUrl)}/email/logo-white.png" width="230" height="51" alt="Elmwood Baptist Church" style="display:block;margin:0 auto;width:230px;height:auto;color:#ffffff;font-family:${SERIF};font-size:22px;">
    </a>
  </td></tr>
  <tr><td height="4" style="height:4px;line-height:4px;font-size:0;background:${COLOR.teal};">&nbsp;</td></tr>

  <!-- Welcome -->
  <tr><td class="px main" style="padding:40px 40px 16px;background:#ffffff;">
    ${eyebrow(intro.eyebrow)}
    <h1 class="h1 t-head" style="margin:0 0 20px;font-family:${SERIF};font-size:32px;line-height:1.2;font-weight:700;color:${COLOR.heading};">${esc(intro.headline(name))}</h1>
    ${paragraphsHtml}
  </td></tr>

  ${nextHtml}

  <!-- Service times -->
  <tr><td class="px main" style="padding:32px 40px 8px;background:#ffffff;">
    ${eyebrow("Join Us This Week")}
    <h2 class="t-head" style="margin:0 0 6px;font-family:${SERIF};font-size:24px;line-height:1.25;font-weight:700;color:${COLOR.heading};">Come as you are</h2>
    <p class="t-body" style="margin:0 0 12px;font-family:${SANS};font-size:15px;line-height:1.6;color:${COLOR.body};">You'll be greeted like family, never put on the spot. Dress up or come casual, and there's plenty of parking right out front.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid ${COLOR.teal};">${servicesHtml}</table>
  </td></tr>

  <!-- Buttons -->
  <tr><td class="main" align="center" style="padding:20px 32px 12px;background:#ffffff;">
    ${button(DIRECTIONS_URL, "Get Directions", "primary")}${button(`${siteUrl}/messages`, "Watch Recent Messages", "secondary")}
  </td></tr>

  <!-- Questions -->
  <tr><td class="px main" style="padding:20px 40px 36px;background:#ffffff;">
    <p class="t-body" style="margin:0;font-family:${SANS};font-size:15px;line-height:1.65;color:${COLOR.body};">Have a question, or want to talk with someone? Just reply to this email or call us at <a href="${CHURCH_PHONE_HREF}" style="color:${COLOR.blue};font-weight:700;">${CHURCH_PHONE}</a>. One of our pastors would be glad to meet with you any time.</p>
  </td></tr>

  <!-- Scripture -->
  <tr><td class="px" align="center" bgcolor="${COLOR.navy}" style="background:${COLOR.navy};padding:36px 40px;">
    <p style="margin:0 0 12px;font-family:${SERIF};font-size:20px;line-height:1.5;font-style:italic;color:#ffffff;">&ldquo;I was glad when they said unto me, Let us go into the house of the LORD.&rdquo;</p>
    <p style="margin:0;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${COLOR.tealLight};">Psalm 122:1</p>
  </td></tr>

  <!-- Sign-off + footer -->
  <tr><td class="px" align="center" bgcolor="${COLOR.navyMid}" style="background:${COLOR.navyMid};padding:32px 40px 30px;">
    <p style="margin:0 0 4px;font-family:${SERIF};font-size:18px;font-weight:700;color:#ffffff;">With joy, your church family</p>
    <p style="margin:0 0 20px;font-family:${SERIF};font-size:15px;font-style:italic;color:${COLOR.tealLight};">More than a church &mdash; we&rsquo;re a family.</p>
    <p style="margin:0 0 16px;font-family:${SANS};font-size:13px;line-height:1.7;color:#c4d3df;">
      Elmwood Baptist Church<br>${CHURCH_ADDRESS_LINES.map(esc).join("<br>")}<br>
      <a href="${CHURCH_PHONE_HREF}" style="color:${COLOR.tealLight};text-decoration:none;">${CHURCH_PHONE}</a> &middot;
      <a href="mailto:${CHURCH_EMAIL}" style="color:${COLOR.tealLight};text-decoration:none;">${CHURCH_EMAIL}</a>
    </p>
    <p style="margin:0 0 20px;font-family:${SANS};font-size:13px;font-weight:700;color:#c4d3df;">
      <a href="${esc(siteUrl)}" style="color:#ffffff;text-decoration:none;">Website</a> &nbsp;|&nbsp;
      <a href="${FACEBOOK_URL}" style="color:#ffffff;text-decoration:none;">Facebook</a> &nbsp;|&nbsp;
      <a href="${YOUTUBE_URL}" style="color:#ffffff;text-decoration:none;">YouTube</a>
    </p>
    <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.6;color:#8ea3b4;">You&rsquo;re receiving this one-time message because you filled out a Connect Card at Elmwood Baptist Church.</p>
  </td></tr>

</table>

</td></tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}
