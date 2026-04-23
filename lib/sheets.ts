const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL;
const SHEETS_SHARED_SECRET = process.env.SHEETS_SHARED_SECRET;

export type SheetEventType = "visit" | "exit" | "lead";

export type SheetRow = {
  type: SheetEventType;
  timestamp: string;
  sessionId?: string;
  event?: string;

  // Lead fields
  name?: string;
  email?: string;
  service?: string;
  message?: string;

  // Visitor context
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  isp?: string;
  browser?: string;
  os?: string;
  deviceType?: string;
  isBot?: boolean;
  language?: string;
  referrer?: string;
  pageUrl?: string;
  userAgent?: string;

  // UTM
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;

  // Precise location (user-consented GPS)
  preciseLat?: number;
  preciseLng?: number;
  preciseAccuracyM?: number;
  preciseCity?: string;
  preciseRegion?: string;
  preciseCountry?: string;
  preciseMapUrl?: string;

  // Session metrics
  sessionDurationMs?: number;
  scrollDepthPct?: number;
  screen?: string;
};

export function isSheetsConfigured(): boolean {
  return Boolean(SHEETS_WEBHOOK_URL);
}

export async function sendToSheet(row: SheetRow): Promise<{ ok: boolean; error?: string }> {
  if (!SHEETS_WEBHOOK_URL) {
    return { ok: false, error: "not_configured" };
  }
  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: SHEETS_SHARED_SECRET ?? "",
        row,
      }),
      signal: AbortSignal.timeout(4500),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn(`[sheets] webhook non-ok: ${res.status} ${text.slice(0, 120)}`);
      return { ok: false, error: `http_${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[sheets] webhook failed:", msg);
    return { ok: false, error: msg };
  }
}
