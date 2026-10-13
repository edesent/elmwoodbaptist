// Renders the Connect Card visitor auto-reply inside a mock inbox page so you
// can see roughly how it looks when opened. Built from the real
// buildVisitorAutoreply(), so it can't drift from what actually gets sent.
//
// Usage:  npm run preview-email
// Output: email-preview.html (repo root, gitignored) — open it in a browser.
//
// Images are loaded from ./public/email/ locally. In a real send they come from
// SITE_URL, so the site must be deployed with those files before emails go out.

import { writeFileSync } from "node:fs";
import { buildVisitorAutoreply } from "../src/lib/connectCard/notify";
import { escapeHtml, type ValidatedConnectCard } from "../src/lib/connectCard/validation";
import { SENDER } from "../src/lib/email";

const PLACEHOLDER = "https://preview.invalid";
process.env.SITE_URL = PLACEHOLDER;

const base: ValidatedConnectCard = {
  firstName: "Jane", lastName: "Smith", email: "jane@example.com", phone: "3035551234",
  preferredContact: null, street: null, street2: null, city: null, state: null, zip: null,
  maritalStatus: null, attendanceStatus: "first_time", ageGroup: null, visitDate: null,
  howHeard: null, howHeardOther: null, children: [], interests: [], prayerRequest: null,
  comments: null, contactConsent: false,
};

const scenarios: Record<string, ValidatedConnectCard> = {
  "First-time, everything filled in": {
    ...base,
    preferredContact: "text",
    children: [{ firstName: "Emma", lastName: "Smith", grade: "2" as never, gradeOther: null }],
    interests: ["childrens_ministry", "adult_bible_classes", "speak_with_pastor", "prayer_request"],
    prayerRequest: "Please pray for my mom.",
    contactConsent: true,
  },
  "First-time, minimal (no consent)": base,
  "Visited before": { ...base, attendanceStatus: "visited_before", contactConsent: true, interests: ["more_info"] },
  "Regular attender": { ...base, firstName: "Bob", attendanceStatus: "regular", contactConsent: true },
  "Member": { ...base, firstName: "Ruth", attendanceStatus: "member", prayerRequest: "Surgery next week.", contactConsent: true },
};

const names = Object.keys(scenarios);
const built = names.map((n) => {
  const r = buildVisitorAutoreply(scenarios[n]);
  return { name: n, subject: r.subject, text: r.text, html: r.html.split(PLACEHOLDER).join("./public") };
});

const senderName = SENDER.replace(/\s*<.*$/, "");
const senderAddr = SENDER.match(/<(.*)>/)?.[1] ?? SENDER;
const sentAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Email preview</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#f6f8fc;font:14px/1.4 -apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#202124}
  .bar{display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:12px 24px;background:#fff;border-bottom:1px solid #e0e0e0;position:sticky;top:0;z-index:2}
  .bar h1{font-size:16px;margin:0;font-weight:500;flex:1;min-width:180px}
  .bar select,.bar button{font:inherit;padding:6px 12px;border:1px solid #dadce0;background:#fff;border-radius:16px;cursor:pointer;color:inherit}
  .bar button.on{background:#e8f0fe;border-color:#c6dafc}
  .wrap{max-width:900px;margin:24px auto;padding:0 16px}
  .label{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#5f6368;margin:24px 0 8px}
  .row{display:flex;align-items:center;gap:12px;padding:8px 16px;background:#fff;border:1px solid #e0e0e0;border-radius:8px;font-weight:700}
  .row .from{width:160px;flex:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .row .subj{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .row .time{color:#5f6368;font-weight:400;font-size:12px}
  .msg{background:#fff;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden}
  .msg h2{font-size:22px;font-weight:400;margin:0;padding:20px 24px 8px}
  .meta{display:flex;gap:12px;align-items:center;padding:8px 24px 12px}
  .avatar{width:40px;height:40px;border-radius:50%;background:#1a73e8;color:#fff;display:grid;place-items:center;font-size:18px}
  .meta .name{font-weight:600}.meta .addr,.meta .to,.meta .time{color:#5f6368;font-size:12px}.meta .grow{flex:1}
  .frame-wrap{border-top:1px solid #f1f3f4;display:flex;justify-content:center;background:#fff}
  iframe{display:block;width:100%;height:1500px;border:0;transition:width .2s}
  pre{background:#fff;border:1px solid #e0e0e0;border-radius:8px;padding:16px 24px;white-space:pre-wrap;font:13px/1.5 ui-monospace,Menlo,monospace}
  body.dark{background:#1f1f1f;color:#e8eaed}
  body.dark .bar,body.dark .row,body.dark .msg,body.dark pre,body.dark .frame-wrap{background:#2d2e30;border-color:#3c4043}
  body.dark .bar select,body.dark .bar button{background:#2d2e30;border-color:#5f6368}
  body.dark .bar button.on{background:#394457}
</style></head>
<body>
<div class="bar">
  <h1>Visitor auto-reply preview</h1>
  <select id="scenario">${names.map((n, i) => `<option value="${i}">${escapeHtml(n)}</option>`).join("")}</select>
  <button id="dark">Dark mode</button>
  <button id="narrow">Phone width</button>
</div>
<div class="wrap">
  <div class="label">Inbox list</div>
  <div class="row"><div class="from">${escapeHtml(senderName)}</div><div class="subj" id="subj"></div><div class="time">${escapeHtml(sentAt)}</div></div>

  <div class="label">Opened message</div>
  <div class="msg">
    <h2 id="subject"></h2>
    <div class="meta">
      <div class="avatar">${escapeHtml(senderName.charAt(0))}</div>
      <div class="grow"><div class="name">${escapeHtml(senderName)} <span class="addr">&lt;${escapeHtml(senderAddr)}&gt;</span></div><div class="to">to me</div></div>
      <div class="time">${escapeHtml(sentAt)}</div>
    </div>
    <div class="frame-wrap"><iframe id="frame"></iframe></div>
  </div>

  <div class="label">Plain-text version (shown by text-only clients)</div>
  <pre id="text"></pre>
</div>
<script>
  const emails = ${JSON.stringify(built).replace(/</g, "\\u003c")};
  const $ = (id) => document.getElementById(id);
  let dark = false, narrow = false;
  function render() {
    const e = emails[$("scenario").value];
    $("subject").textContent = e.subject;
    $("subj").textContent = e.subject;
    $("text").textContent = e.text;
    // Dark mode: force the email's prefers-color-scheme:dark rules to apply.
    $("frame").srcdoc = dark ? e.html.replace("@media (prefers-color-scheme: dark)", "@media all") : e.html;
    $("frame").style.width = narrow ? "375px" : "100%";
    document.body.classList.toggle("dark", dark);
    $("dark").classList.toggle("on", dark);
    $("narrow").classList.toggle("on", narrow);
  }
  $("scenario").onchange = render;
  $("dark").onclick = () => { dark = !dark; render(); };
  $("narrow").onclick = () => { narrow = !narrow; render(); };
  $("frame").addEventListener("load", () => {
    const d = $("frame").contentDocument;
    if (d) $("frame").style.height = d.documentElement.scrollHeight + "px";
  });
  render();
</script>
</body></html>
`;

writeFileSync(new URL("../email-preview.html", import.meta.url), page);
console.log("Wrote email-preview.html");
