/**
 * TriviqTech — Google Sheets webhook
 * ------------------------------------
 * Paste this whole file into Apps Script (Extensions → Apps Script) of the
 * Google Sheet where you want visits + leads to land, then deploy it as a
 * Web App (see setup steps at the bottom of this file).
 *
 * The deploy URL goes into your TriviqTech site's .env.local as SHEETS_WEBHOOK_URL.
 *
 * This script creates two tabs on first run:
 *   • "Visits" — every page view (visit + exit events)
 *   • "Leads"  — every contact-form submission
 *
 * Headers are written automatically on the first POST.
 */

// Optional: set the same value in .env.local as SHEETS_SHARED_SECRET to require it.
// If left empty, the webhook accepts all POSTs (you rely on obscurity of the URL).
var SHARED_SECRET = "";

// Column order for each tab. Add/remove fields here if you want to reshape the sheet.
var COLUMNS = {
  Visits: [
    "timestamp", "type", "event", "sessionId",
    "ip", "city", "region", "country", "timezone", "isp",
    "browser", "os", "deviceType", "isBot", "language",
    "referrer", "pageUrl",
    "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent",
    "preciseLat", "preciseLng", "preciseAccuracyM",
    "preciseCity", "preciseRegion", "preciseCountry", "preciseMapUrl",
    "sessionDurationMs", "scrollDepthPct", "screen", "userAgent",
  ],
  Leads: [
    "timestamp", "name", "email", "service", "message",
    "ip", "city", "region", "country", "timezone", "isp",
    "browser", "os", "deviceType", "language",
    "referrer", "pageUrl",
    "utmSource", "utmMedium", "utmCampaign", "utmTerm", "utmContent",
    "preciseLat", "preciseLng", "preciseAccuracyM",
    "preciseCity", "preciseRegion", "preciseCountry", "preciseMapUrl",
    "sessionDurationMs", "screen", "userAgent",
  ],
};

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && payload.secret !== SHARED_SECRET) {
      return jsonOut({ ok: false, error: "forbidden" });
    }

    var row = payload.row || {};
    var tab = row.type === "lead" ? "Leads" : "Visits";

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tab);
    if (!sheet) sheet = ss.insertSheet(tab);

    var columns = COLUMNS[tab];
    ensureHeaders(sheet, columns);

    var values = columns.map(function (key) {
      var v = row[key];
      if (v === undefined || v === null) return "";
      if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
      return v;
    });

    sheet.appendRow(values);
    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonOut({ ok: true, service: "triviqtech-sheets-webhook" });
}

function ensureHeaders(sheet, columns) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(columns);
  sheet.getRange(1, 1, 1, columns.length)
    .setFontWeight("bold")
    .setBackground("#0B1220")
    .setFontColor("#2DD4DB");
  sheet.setFrozenRows(1);
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ────────────────────────────────────────────────────────────────────────
   ONE-TIME SETUP (5 minutes)
   ────────────────────────────────────────────────────────────────────────

   1. Create a fresh Google Sheet (sheets.google.com → Blank).
      Name it something like "TriviqTech Visitors".

   2. In that sheet: Extensions → Apps Script.
      Delete the default code, paste THIS ENTIRE FILE, click 💾 Save.

   3. (Optional but recommended) Set SHARED_SECRET above to a random string
      like "a7f3k2-triviq-8x9q". Keep it handy — you'll put the same value
      in .env.local.

   4. Click "Deploy" (top-right) → "New deployment".
        • Type: Web app (click the gear icon → select Web app)
        • Description: "TriviqTech webhook v1"
        • Execute as: Me
        • Who has access: Anyone
      Click Deploy. Grant permission when prompted (safe — it's your own script).

   5. Copy the "Web app URL" — it looks like:
        https://script.google.com/macros/s/AKfy.../exec

   6. Paste that URL into your site's .env.local:
        SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
        SHEETS_SHARED_SECRET=a7f3k2-triviq-8x9q   # same value as above, or leave blank

   7. Restart "npm run dev" so the new env vars load.
      Visit the site — you should see a new row appear in the "Visits" tab.
      Submit the contact form — a row will appear in the "Leads" tab.

   NOTES:
   • Every time you change THIS script, click Deploy → "Manage deployments"
     → pencil icon → Version: "New version" → Deploy. The URL stays the same.
   • Apps Script quota on free Gmail accounts: ~20,000 URL fetches/day — plenty
     for a marketing site. Google Workspace accounts get 100,000/day.
   • If you ever want to stop writing to the sheet, just unset SHEETS_WEBHOOK_URL
     in .env.local and restart — the site stops posting silently.
   ──────────────────────────────────────────────────────────────────────── */
