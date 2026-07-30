import type { ValidatedConnectCard } from "./validation";
import { escapeSlack } from "./validation";
import type { BreezeSyncResult } from "./breeze";

type SlackResult = { ok: true } | { ok: false; error: string };

const ATTENDANCE_LABELS: Record<string, string> = {
  first_time: "First-time visitor",
  visited_before: "Returning visitor",
  regular: "Regular attendee",
};

const CONTACT_LABELS: Record<string, string> = {
  text: "Text",
  call: "Phone call",
  email: "Email",
  no_preference: "No preference",
};

function breezeLine(result: BreezeSyncResult | null): string {
  if (!result || !result.enabled) return "Not configured";
  switch (result.adult.status) {
    case "created":
      return result.family.status === "created" || result.family.status === "added"
        ? "New profile created and family linked"
        : "New profile created";
    case "updated":
      return "Existing profile updated";
    case "possible_duplicate_created":
      return "Possible duplicate — staff review needed";
    case "manual_review_required":
      return "Manual review required";
    case "failed":
      return `Synchronization failed — see submission ID`;
    default:
      return "Unknown result";
  }
}

/** Sends a staff-facing Slack notification via an incoming webhook.
 *  Never throws — failures are returned as a result so the caller can log
 *  them without failing the whole submission. */
export async function sendSlackNotification(
  data: ValidatedConnectCard,
  submissionId: string,
  breeze: BreezeSyncResult | null
): Promise<SlackResult> {
  const webhookUrl = process.env.SLACK_CONNECT_CARD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, error: "SLACK_CONNECT_CARD_WEBHOOK_URL is not set." };
  }

  const name = escapeSlack(`${data.firstName} ${data.lastName}`);
  const childrenLine = data.children.length
    ? data.children
        .map((c) => escapeSlack(`${c.firstName}${c.lastName ? " " + c.lastName : ""} (${c.grade})`))
        .join(", ")
    : "None provided";

  const interestLine = data.interests.length
    ? data.interests.map((i) => escapeSlack(i.replace(/_/g, " "))).join(", ")
    : "None selected";

  const fields = [
    `*Name:* ${name}`,
    `*Status:* ${ATTENDANCE_LABELS[data.attendanceStatus] ?? escapeSlack(data.attendanceStatus)}`,
    `*Preferred Contact:* ${data.preferredContact ? CONTACT_LABELS[data.preferredContact] : "Not specified"}`,
    `*Phone:* ${data.phone ? escapeSlack(data.phone) : "Not provided"}`,
    `*Email:* ${data.email ? escapeSlack(data.email) : "Not provided"}`,
    `*Children:* ${childrenLine}`,
    `*Interested In:* ${interestLine}`,
    `*Prayer Request:* ${data.prayerRequest ? "Included (see email)" : "None"}`,
    `*Permission to Contact:* ${data.contactConsent ? "Yes" : "No"}`,
    `*Breeze:* ${breezeLine(breeze)}`,
    `*Submitted:* ${new Date().toLocaleString("en-US", { timeZone: "America/Denver" })}`,
  ].join("\n");

  const blocks: unknown[] = [
    {
      type: "section",
      text: { type: "mrkdwn", text: `*New Connect Card Submitted*\n${fields}` },
    },
  ];

  if (data.prayerRequest) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*Prayer Request:*\n${escapeSlack(data.prayerRequest)}` },
    });
  }
  if (data.comments) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*Comments:*\n${escapeSlack(data.comments)}` },
    });
  }
  blocks.push({
    type: "context",
    elements: [{ type: "mrkdwn", text: `Submission ID: \`${submissionId}\`` }],
  });

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return { ok: false, error: `Slack webhook responded with status ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown Slack error" };
  }
}
