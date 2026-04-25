import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export const MAIL_RECIPIENTS = [
  "contact@triviqtech.com",
];

export function isMailerConfigured(): boolean {
  return Boolean(GMAIL_USER && GMAIL_APP_PASSWORD);
}

let cached: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
  return cached;
}

export async function sendMail(opts: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!isMailerConfigured()) {
    console.warn(
      "[mailer] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping send. Payload:",
      { subject: opts.subject, replyTo: opts.replyTo }
    );
    return { ok: false, error: "mailer_not_configured" };
  }

  try {
    const info = await getTransport().sendMail({
      from: `"TriviqTech Site" <${GMAIL_USER}>`,
      to: MAIL_RECIPIENTS.join(", "),
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    console.log("[mailer] sent:", info.messageId);
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[mailer] send failed:", message);
    return { ok: false, error: message };
  }
}
