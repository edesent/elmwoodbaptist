// Slack notification for a bus pickup sign-up, sent through an incoming
// webhook. By default it uses the Connect Card webhook, so sign-ups land in
// that same Slack channel (a webhook is tied to one channel when it is
// created — the channel is set in Slack, not in code).

import { escapeSlack } from "../connectCard/validation";
import type { BusSignupInput } from "./validation";

export type SlackResult = { ok: true } | { ok: false; error: string };

function ageLabel(age: number): string {
  return age === 0 ? "under 1" : String(age);
}

export function buildBusSignupSlackBlocks(
  d: BusSignupInput,
  submissionId: string,
  opts: { emailFailed?: boolean } = {}
): unknown[] {
  const kidsOnly = !d.guardianRiding;
  const kids = d.children.length;

  const riding = d.guardianRiding
    ? kids
      ? `Parent/guardian + ${kids} ${kids === 1 ? "child" : "children"}`
      : "Parent/guardian only (no children)"
    : `${kids} ${kids === 1 ? "child" : "children"} only — no parent/guardian riding`;

  const address = [d.unit ? `${d.street}, ${d.unit}` : d.street, `${d.city}, ${d.state} ${d.zip}`]
    .map(escapeSlack)
    .join("\n");

  const children = kids
    ? d.children.map((c) => `• ${escapeSlack(c.name)}, age ${ageLabel(c.age)}`).join("\n")
    : "None";

  const blocks: unknown[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          "*:bus: New Bus Pickup Sign-up*",
          `*Riding:* ${riding}`,
          `*Parent/Guardian:* ${escapeSlack(d.guardianName)}`,
          `*Phone:* ${escapeSlack(d.phone)}`,
          `*Submitted:* ${new Date().toLocaleString("en-US", { timeZone: "America/Denver" })}`,
        ].join("\n"),
      },
    },
    { type: "section", text: { type: "mrkdwn", text: `*Pickup address:*\n${address}` } },
    { type: "section", text: { type: "mrkdwn", text: `*Children:*\n${children}` } },
  ];

  if (kidsOnly) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          ":warning: *Children riding without a parent/guardian — permission slip needed*",
          `• Potty trained confirmed: ${d.pottyTrained ? "yes" : "no"}`,
          `• Permission slip requirement acknowledged: ${d.permissionSlip ? "yes" : "no"}`,
        ].join("\n"),
      },
    });
  }

  if (opts.emailFailed) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":x: *The email copy of this sign-up failed to send.* This Slack message is the only record — check the site's logs for the cause.",
      },
    });
  }

  blocks.push({
    type: "context",
    elements: [{ type: "mrkdwn", text: `Submission ID: \`${submissionId}\`` }],
  });
  return blocks;
}

/** Never throws — failures come back as a result so the caller can log them
 *  without failing the whole sign-up. */
export async function sendBusSignupSlack(
  d: BusSignupInput,
  submissionId: string,
  opts: { emailFailed?: boolean } = {}
): Promise<SlackResult> {
  const webhookUrl =
    process.env.BUS_SIGNUP_SLACK_WEBHOOK_URL || process.env.SLACK_CONNECT_CARD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, error: "No Slack webhook is configured." };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Shown in notifications / on phones where blocks aren't rendered.
        text: `New bus pickup sign-up: ${d.guardianName}`,
        blocks: buildBusSignupSlackBlocks(d, submissionId, opts),
      }),
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
