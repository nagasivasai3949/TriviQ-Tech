import type { NextRequest } from "next/server";

export type VisitorInfo = {
  ip: string;
  geo: {
    country?: string;
    region?: string;
    city?: string;
    timezone?: string;
    org?: string;
  };
  device: {
    browser: string;
    os: string;
    deviceType: "mobile" | "tablet" | "desktop" | "bot" | "unknown";
    isBot: boolean;
  };
  language: string;
  referrer: string;
  userAgent: string;
  utm: Record<string, string>;
  receivedAt: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  return "unknown";
}

export function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase();

  const botPatterns = ["bot", "crawler", "spider", "slurp", "curl", "wget", "python-requests", "httpclient"];
  const isBot = botPatterns.some((p) => lower.includes(p));

  let browser = "Unknown";
  if (lower.includes("edg/")) browser = "Edge";
  else if (lower.includes("chrome/") && !lower.includes("chromium")) browser = "Chrome";
  else if (lower.includes("firefox/")) browser = "Firefox";
  else if (lower.includes("safari/") && !lower.includes("chrome")) browser = "Safari";
  else if (lower.includes("opera") || lower.includes("opr/")) browser = "Opera";

  let os = "Unknown";
  if (lower.includes("windows")) os = "Windows";
  else if (lower.includes("mac os") || lower.includes("macintosh")) os = "macOS";
  else if (lower.includes("android")) os = "Android";
  else if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("ios")) os = "iOS";
  else if (lower.includes("linux")) os = "Linux";

  let deviceType: VisitorInfo["device"]["deviceType"] = "desktop";
  if (isBot) deviceType = "bot";
  else if (lower.includes("mobile") || lower.includes("iphone") || lower.includes("android") && !lower.includes("tablet")) deviceType = "mobile";
  else if (lower.includes("tablet") || lower.includes("ipad")) deviceType = "tablet";

  return { browser, os, deviceType, isBot };
}

export function parseUtm(url: string): Record<string, string> {
  try {
    const parsed = new URL(url);
    const out: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const v = parsed.searchParams.get(key);
      if (v) out[key] = v;
    }
    return out;
  } catch {
    return {};
  }
}

async function lookupGeo(ip: string): Promise<VisitorInfo["geo"]> {
  if (!ip || ip === "unknown" || ip === "127.0.0.1" || ip.startsWith("::1") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return {};
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,timezone,isp`, {
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return {};
    const data = await res.json();
    return {
      country: data.country,
      region: data.regionName,
      city: data.city,
      timezone: data.timezone,
      org: data.isp,
    };
  } catch {
    return {};
  }
}

export async function collectVisitorInfo(
  req: NextRequest,
  opts: { pageUrl?: string; clientReferrer?: string } = {}
): Promise<VisitorInfo> {
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") ?? "";
  const device = parseUserAgent(userAgent);
  const language = (req.headers.get("accept-language") ?? "").split(",")[0] || "unknown";
  const referrer = opts.clientReferrer || req.headers.get("referer") || "direct";
  const pageUrl = opts.pageUrl || req.url;
  const utm = parseUtm(pageUrl);
  const geo = device.isBot ? {} : await lookupGeo(ip);

  return {
    ip,
    geo,
    device,
    language,
    referrer,
    userAgent,
    utm,
    receivedAt: new Date().toISOString(),
  };
}

export function formatVisitorForEmail(v: VisitorInfo): string {
  const geoLine = [v.geo.city, v.geo.region, v.geo.country].filter(Boolean).join(", ") || "Unknown location";
  const utmLines = Object.entries(v.utm)
    .map(([k, val]) => `    ${k}: ${val}`)
    .join("\n");

  return [
    "── VISITOR CONTEXT ──",
    `IP:         ${v.ip}`,
    `Location:   ${geoLine}`,
    `Timezone:   ${v.geo.timezone ?? "unknown"}`,
    `ISP / Org:  ${v.geo.org ?? "unknown"}`,
    `Device:     ${v.device.browser} on ${v.device.os} (${v.device.deviceType})`,
    `Language:   ${v.language}`,
    `Referrer:   ${v.referrer}`,
    utmLines ? `UTM:\n${utmLines}` : "",
    `Time:       ${v.receivedAt}`,
    `User-Agent: ${v.userAgent}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatVisitorAsHtml(v: VisitorInfo): string {
  const geoLine = [v.geo.city, v.geo.region, v.geo.country].filter(Boolean).join(", ") || "Unknown";
  const utmRows = Object.entries(v.utm)
    .map(
      ([k, val]) =>
        `<tr><td style="padding:4px 10px;color:#64748b;font-size:12px">${escapeHtml(k)}</td><td style="padding:4px 10px;font-size:12px">${escapeHtml(val)}</td></tr>`
    )
    .join("");

  const rows: [string, string][] = [
    ["IP", v.ip],
    ["Location", geoLine],
    ["Timezone", v.geo.timezone ?? "—"],
    ["ISP / Org", v.geo.org ?? "—"],
    ["Device", `${v.device.browser} on ${v.device.os} (${v.device.deviceType})`],
    ["Language", v.language],
    ["Referrer", v.referrer],
    ["Received", v.receivedAt],
  ];

  return `
  <table style="border-collapse:collapse;width:100%;font-family:system-ui,sans-serif">
    ${rows
      .map(
        ([k, val]) =>
          `<tr><td style="padding:6px 10px;color:#64748b;font-size:13px;width:120px">${k}</td><td style="padding:6px 10px;font-size:13px;color:#0f172a">${escapeHtml(val)}</td></tr>`
      )
      .join("")}
    ${utmRows ? `<tr><td colspan="2" style="padding:10px 10px 4px;color:#0f172a;font-size:13px;font-weight:600">UTM parameters</td></tr>${utmRows}` : ""}
    <tr><td colspan="2" style="padding:10px;color:#64748b;font-size:11px;font-family:monospace;word-break:break-all">${escapeHtml(v.userAgent)}</td></tr>
  </table>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
