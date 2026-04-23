import { NextRequest, NextResponse } from "next/server";
import { collectVisitorInfo, formatVisitorForEmail } from "@/lib/visitor";
import { reverseGeocode } from "@/lib/geo";
import { sendToSheet, type SheetRow } from "@/lib/sheets";

export const runtime = "nodejs";

type PreciseInput = {
  lat?: unknown;
  lng?: unknown;
  accuracyMeters?: unknown;
  consent?: unknown;
};

type TrackBody = {
  event?: "visit" | "engagement" | "exit";
  sessionId?: string;
  pageUrl?: string;
  referrer?: string;
  timezone?: string;
  screen?: string;
  sessionDurationMs?: number;
  scrollDepthPct?: number;
  preciseLocation?: PreciseInput;
};

export async function POST(req: NextRequest) {
  let body: TrackBody = {};
  try {
    body = await req.json();
  } catch {
    /* tolerate empty / malformed beacon */
  }

  const visitor = await collectVisitorInfo(req, {
    pageUrl: body.pageUrl,
    clientReferrer: body.referrer,
  });

  if (visitor.device.isBot) {
    return NextResponse.json({ ok: true, bot: true });
  }

  const location = [visitor.geo.city, visitor.geo.region, visitor.geo.country]
    .filter(Boolean)
    .join(", ") || "unknown";

  let precise: {
    lat: number;
    lng: number;
    accuracyM?: number;
    city?: string;
    region?: string;
    country?: string;
  } | null = null;

  const pl = body.preciseLocation;
  if (pl && pl.consent === true && typeof pl.lat === "number" && typeof pl.lng === "number") {
    const lat = pl.lat;
    const lng = pl.lng;
    if (Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      const rev = await reverseGeocode(lat, lng);
      precise = {
        lat,
        lng,
        accuracyM: typeof pl.accuracyMeters === "number" ? pl.accuracyMeters : undefined,
        city: rev.city,
        region: rev.region,
        country: rev.country,
      };
    }
  }

  const preciseLine = precise
    ? ` · 📍 GPS=${precise.lat.toFixed(5)},${precise.lng.toFixed(5)}${precise.city ? ` (${[precise.city, precise.region, precise.country].filter(Boolean).join(", ")})` : ""}`
    : "";

  const event = body.event ?? "visit";

  console.log(
    `[visit:${event}] ${visitor.ip} · ${location} · ${visitor.device.browser}/${visitor.device.os} · ref=${visitor.referrer} · page=${body.pageUrl ?? "-"}${preciseLine}`
  );

  if (process.env.TRACK_VERBOSE === "1") {
    console.log(formatVisitorForEmail(visitor));
    if (body.sessionDurationMs) console.log(`  session: ${Math.round(body.sessionDurationMs / 1000)}s`);
    if (body.scrollDepthPct) console.log(`  scroll:  ${body.scrollDepthPct}%`);
  }

  const row: SheetRow = {
    type: event === "exit" ? "exit" : "visit",
    timestamp: new Date().toISOString(),
    sessionId: body.sessionId,
    event,
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
    preciseAccuracyM: precise?.accuracyM,
    preciseCity: precise?.city,
    preciseRegion: precise?.region,
    preciseCountry: precise?.country,
    preciseMapUrl: precise ? `https://www.google.com/maps?q=${precise.lat},${precise.lng}` : undefined,
    sessionDurationMs: body.sessionDurationMs,
    scrollDepthPct: body.scrollDepthPct,
    screen: body.screen,
  };

  await sendToSheet(row);

  return NextResponse.json({ ok: true });
}
