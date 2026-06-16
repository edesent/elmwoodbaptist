import { Resend } from "resend";

// ── Where messages go ─────────────────────────────────────────────────────────
// CHURCH_INBOX receives every form submission. SENDER must be an address at a
// domain you've verified in Resend (https://resend.com/domains). Until
// elmwoodbaptist.org is verified there, swap SENDER to "Elmwood Baptist
// <onboarding@resend.dev>" — but note the shared sender only delivers to the
// email you signed up to Resend with.
export const CHURCH_INBOX = "office@elmwoodbaptist.org";
export const SENDER = "Elmwood Baptist Website <website@elmwoodbaptist.org>";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type SendResult = { ok: true } | { ok: false; status: number; error: string };

/** Send a form submission to the church inbox via Resend. */
export async function sendChurchEmail(opts: {
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return { ok: false, status: 500, error: "The form isn't configured yet." };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: SENDER,
    to: CHURCH_INBOX,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      ok: false,
      status: 502,
      error: "Sorry, the message couldn't be sent. Please try again.",
    };
  }

  return { ok: true };
}
