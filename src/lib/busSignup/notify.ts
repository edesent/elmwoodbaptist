// Builds the staff email for a bus pickup sign-up. Pure (no network) so it can
// be unit tested; the API route sends it through Resend.

import { escapeHtml } from "../email";
import type { BusSignupInput } from "./validation";

function ageLabel(age: number): string {
  return age === 0 ? "under 1" : String(age);
}

function addressLines(d: BusSignupInput): string[] {
  const line1 = d.unit ? `${d.street}, ${d.unit}` : d.street;
  return [line1, `${d.city}, ${d.state} ${d.zip}`];
}

function ridersSummary(d: BusSignupInput): string {
  const kids = d.children.length;
  const kidsText = `${kids} ${kids === 1 ? "child" : "children"}`;
  if (d.guardianRiding) {
    return kids
      ? `Parent/guardian + ${kidsText}`
      : "Parent/guardian only (no children)";
  }
  return `${kidsText} only — NO parent/guardian riding`;
}

export function buildBusSignupEmail(d: BusSignupInput, submissionId: string) {
  const kidsOnly = !d.guardianRiding;
  const subject = `${kidsOnly ? "[PERMISSION SLIP NEEDED] " : ""}Bus pickup sign-up: ${d.guardianName} (${ridersSummary(d)})`;

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Denver",
    dateStyle: "full",
    timeStyle: "short",
  });

  const childLines = d.children.length
    ? d.children.map((c) => `  - ${c.name}, age ${ageLabel(c.age)}`)
    : ["  None"];

  const text = [
    `Submitted: ${submittedAt}`,
    "",
    `Riding: ${ridersSummary(d)}`,
    ...(kidsOnly
      ? [
          "",
          "ACTION NEEDED: children are riding without a parent/guardian.",
          "  - A signed permission slip is required before the first ride.",
          "  - Guardian confirmed the children are potty trained: " + (d.pottyTrained ? "Yes" : "No"),
          "  - Guardian acknowledged the permission slip requirement: " + (d.permissionSlip ? "Yes" : "No"),
        ]
      : []),
    "",
    "── Parent / Guardian ──",
    `Name: ${d.guardianName}`,
    `Phone: ${d.phone}`,
    "",
    "── Pickup Address ──",
    ...addressLines(d),
    "",
    "── Children ──",
    ...childLines,
    "",
    `Submission ID: ${submissionId}`,
  ].join("\n");

  const esc = escapeHtml;
  const html = `
    <p><strong>Submitted:</strong> ${esc(submittedAt)}</p>
    <p><strong>Riding:</strong> ${esc(ridersSummary(d))}</p>
    ${
      kidsOnly
        ? `<p style="background:#fff3cd;border:2px solid #ffc61a;padding:12px;border-radius:8px">
      <strong>Action needed:</strong> children are riding without a parent/guardian.<br>
      &bull; A signed permission slip is required before the first ride.<br>
      &bull; Guardian confirmed the children are potty trained: ${d.pottyTrained ? "Yes" : "No"}<br>
      &bull; Guardian acknowledged the permission slip requirement: ${d.permissionSlip ? "Yes" : "No"}
    </p>`
        : ""
    }
    <h3>Parent / Guardian</h3>
    <p><strong>Name:</strong> ${esc(d.guardianName)}<br>
    <strong>Phone:</strong> <a href="tel:${esc(d.phone.replace(/[^0-9+]/g, ""))}">${esc(d.phone)}</a></p>
    <h3>Pickup Address</h3>
    <p>${addressLines(d).map(esc).join("<br>")}</p>
    <h3>Children</h3>
    ${
      d.children.length
        ? `<ul>${d.children.map((c) => `<li>${esc(c.name)}, age ${esc(ageLabel(c.age))}</li>`).join("")}</ul>`
        : "<p>None</p>"
    }
    <p style="color:#666;font-size:12px">Submission ID: ${esc(submissionId)}</p>
  `;

  return { subject, text, html };
}
