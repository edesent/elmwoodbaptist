import { Resend } from "resend";

// ── Where messages go ─────────────────────────────────────────────────────────
// `TO` is the church inbox that receives every contact-form message.
// `FROM` must be an address at a domain you've verified in Resend
// (https://resend.com/domains). Until elmwoodbaptist.org is verified there,
// use Resend's shared sender "onboarding@resend.dev" — note that the shared
// sender can only deliver to the email you signed up to Resend with.
const TO = "office@elmwoodbaptist.org";
const FROM = "Elmwood Baptist Website <website@elmwoodbaptist.org>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this; real visitors never see it. Pretend success.
  if (body.botcheck) {
    return Response.json({ success: true });
  }

  const firstName = String(body.first_name ?? "").trim();
  const lastName = String(body.last_name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!firstName || !email || !message) {
    return Response.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return Response.json(
      { error: "The contact form isn't configured yet." },
      { status: 500 }
    );
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `New website message from ${fullName}`,
    text:
      `Name: ${fullName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "—"}\n\n` +
      `${message}\n`,
    html:
      `<p><strong>Name:</strong> ${escapeHtml(fullName)}</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
      `<p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>` +
      `<p><strong>Message:</strong></p>` +
      `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { error: "Sorry, the message couldn't be sent. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ success: true });
}
