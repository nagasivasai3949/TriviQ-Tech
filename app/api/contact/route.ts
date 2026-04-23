import { NextRequest, NextResponse } from "next/server";
import { collectVisitorInfo, formatVisitorForEmail, formatVisitorAsHtml } from "@/lib/visitor";
import { reverseGeocode, type PreciseLocation } from "@/lib/geo";
import { sendMail } from "@/lib/mailer";
import { sendToSheet, type SheetRow } from "@/lib/sheets";

export const runtime = "nodejs";

type PreciseLocationInput = {
  lat?: unknown;
  lng?: unknown;
  accuracyMeters?: unknown;
  consent?: unknown;
};

type Body = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
  pageUrl?: string;
  referrer?: string;
  timezone?: string;
  screen?: string;
  sessionDurationMs?: number;
  preciseLocation?: PreciseLocationInput;
};

const MAX_LEN = {
  name: 120,
  email: 200,
  service: 120,
  message: 4000,
};

function clean(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = clean(body.name, MAX_LEN.name);
  const email = clean(body.email, MAX_LEN.email);
  const service = clean(body.service, MAX_LEN.service);
  const message = clean(body.message, MAX_LEN.message);

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const visitor = await collectVisitorInfo(req, {
    pageUrl: body.pageUrl,
    clientReferrer: body.referrer,
  });

  let precise: PreciseLocation | null = null;
  const pl = body.preciseLocation;
  if (pl && pl.consent === true) {
    const lat = typeof pl.lat === "number" ? pl.lat : NaN;
    const lng = typeof pl.lng === "number" ? pl.lng : NaN;
    if (Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      const rev = await reverseGeocode(lat, lng);
      precise = {
        lat,
        lng,
        accuracyMeters: typeof pl.accuracyMeters === "number" ? pl.accuracyMeters : undefined,
        ...rev,
      };
    }
  }

  const subject = `New lead: ${name}${service ? ` — ${service}` : ""}`;

  const preciseText = precise
    ? [
        "",
        "── PRECISE LOCATION (user consented) ──",
        `Coords:     ${precise.lat.toFixed(6)}, ${precise.lng.toFixed(6)}`,
        `Accuracy:   ±${Math.round(precise.accuracyMeters ?? 0)} m`,
        `Geocoded:   ${[precise.city, precise.region, precise.country].filter(Boolean).join(", ") || "—"}`,
        precise.postal ? `Postal:     ${precise.postal}` : "",
        `Map:        https://www.google.com/maps?q=${precise.lat},${precise.lng}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  const text = [
    "New enquiry from the TriviqTech website.",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Service: ${service || "—"}`,
    "",
    "Message:",
    message,
    "",
    formatVisitorForEmail(visitor),
    preciseText,
    body.sessionDurationMs != null ? `\nSession on site: ${Math.round(body.sessionDurationMs / 1000)}s` : "",
    body.screen ? `Screen:          ${body.screen}` : "",
    body.timezone ? `Client TZ:       ${body.timezone}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
  <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
    <div style="background:linear-gradient(135deg,#2DD4DB 0%,#1E3A8A 100%);padding:20px 24px;border-radius:12px 12px 0 0">
      <h2 style="margin:0;color:#fff;font-size:18px">New lead from TriviqTech.com</h2>
      <p style="margin:4px 0 0;color:#e0f7f8;font-size:13px">${escapeHtml(service || "General enquiry")}</p>
    </div>
    <div style="border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px;padding:20px 24px;background:#fff">
      <table style="border-collapse:collapse;width:100%;margin-bottom:12px">
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:80px">Name</td><td style="padding:6px 0;font-size:14px;font-weight:600">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Email</td><td style="padding:6px 0;font-size:14px"><a href="mailto:${escapeHtml(email)}" style="color:#0ea5b7">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Service</td><td style="padding:6px 0;font-size:14px">${escapeHtml(service || "—")}</td></tr>
      </table>
      <div style="padding:14px 16px;background:#f1f5f9;border-radius:8px;margin-bottom:18px">
        <div style="color:#64748b;font-size:12px;margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Message</div>
        <div style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
      </div>
      <div style="border-top:1px solid #e2e8f0;padding-top:14px">
        <div style="color:#64748b;font-size:12px;margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Visitor context</div>
        ${formatVisitorAsHtml(visitor)}
      </div>
      ${precise ? `
      <div style="margin-top:18px;padding:14px 16px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:8px">
        <div style="color:#0e7490;font-size:12px;margin-bottom:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em">📍 Precise location (user consented)</div>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px;width:100px">Coordinates</td><td style="padding:4px 0;font-size:13px;font-family:monospace;color:#0f172a">${precise.lat.toFixed(6)}, ${precise.lng.toFixed(6)}</td></tr>
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px">Accuracy</td><td style="padding:4px 0;font-size:13px;color:#0f172a">±${Math.round(precise.accuracyMeters ?? 0)} m</td></tr>
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px">Geocoded</td><td style="padding:4px 0;font-size:13px;color:#0f172a">${escapeHtml([precise.city, precise.region, precise.country].filter(Boolean).join(", ") || "—")}</td></tr>
          ${precise.postal ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px">Postal</td><td style="padding:4px 0;font-size:13px;color:#0f172a">${escapeHtml(precise.postal)}</td></tr>` : ""}
        </table>
        <a href="https://www.google.com/maps?q=${precise.lat},${precise.lng}" style="display:inline-block;margin-top:10px;padding:8px 14px;background:#0ea5b7;color:#fff;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none">View on Google Maps →</a>
      </div>` : ""}
    </div>
  </div>`;

  const sheetRow: SheetRow = {
    type: "lead",
    timestamp: new Date().toISOString(),
    name,
    email,
    service,
    message,
    ip: visitor.ip,
    city: visitor.geo.city,
    region: visitor.geo.region,
    country: visitor.geo.country,
    timezone: visitor.geo.timezone,
    isp: visitor.geo.org,
    browser: visitor.device.browser,
    os: visitor.device.os,
    deviceType: visitor.device.deviceType,
    isBot: visitor.device.isBot,
    language: visitor.language,
    referrer: visitor.referrer,
    pageUrl: body.pageUrl,
    userAgent: visitor.userAgent,
    utmSource: visitor.utm.utm_source,
    utmMedium: visitor.utm.utm_medium,
    utmCampaign: visitor.utm.utm_campaign,
    utmTerm: visitor.utm.utm_term,
    utmContent: visitor.utm.utm_content,
    preciseLat: precise?.lat,
    preciseLng: precise?.lng,
    preciseAccuracyM: precise?.accuracyMeters,
    preciseCity: precise?.city,
    preciseRegion: precise?.region,
    preciseCountry: precise?.country,
    preciseMapUrl: precise ? `https://www.google.com/maps?q=${precise.lat},${precise.lng}` : undefined,
    sessionDurationMs: body.sessionDurationMs,
    screen: body.screen,
  };

  const [mail, sheet] = await Promise.all([
    sendMail({ subject, text, html, replyTo: email }),
    sendToSheet(sheetRow),
  ]);

  console.log("[contact] submission:", {
    name,
    email,
    service,
    ip: visitor.ip,
    location: [visitor.geo.city, visitor.geo.country].filter(Boolean).join(", "),
    precise: precise
      ? { lat: precise.lat, lng: precise.lng, city: precise.city, country: precise.country }
      : null,
    mailOk: mail.ok,
    sheetOk: sheet.ok,
  });

  return NextResponse.json({
    ok: true,
    delivered: mail.ok,
    notice: mail.ok ? undefined : "Received — we'll get back to you shortly.",
  });
}
