"use client";

import { useEffect } from "react";

const SESSION_KEY = "triviq_session_id";
const LOCATION_KEY = "triviq_precise_location";
const LOCATION_ASKED_KEY = "triviq_location_asked";

type StoredLocation = {
  lat: number;
  lng: number;
  accuracyMeters?: number;
  consent: true;
};

function getOrCreateSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `s_${Date.now().toString(36)}`;
  }
}

function clientContext() {
  return {
    pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
    referrer: typeof document !== "undefined" ? document.referrer || "direct" : undefined,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : undefined,
  };
}

function readStoredLocation(): StoredLocation | null {
  try {
    const raw = sessionStorage.getItem(LOCATION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredLocation;
    if (typeof parsed.lat !== "number" || typeof parsed.lng !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function askForLocation(): Promise<StoredLocation | null> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: StoredLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyMeters: pos.coords.accuracy,
          consent: true,
        };
        try {
          sessionStorage.setItem(LOCATION_KEY, JSON.stringify(loc));
        } catch {
          /* sessionStorage may be blocked */
        }
        resolve(loc);
      },
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 60_000 }
    );
  });
}

export default function VisitBeacon() {
  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    const startedAt = Date.now();
    let maxScrollPct = 0;
    let precise: StoredLocation | null = readStoredLocation();
    let initialSent = false;

    const sendInitial = async (extra: { precise?: StoredLocation | null } = {}) => {
      if (initialSent) return;
      initialSent = true;
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            event: "visit",
            sessionId,
            ...clientContext(),
            preciseLocation: extra.precise ?? undefined,
          }),
        });
      } catch {
        /* silent — non-critical */
      }
    };

    const maybeAskLocation = async () => {
      if (precise) {
        sendInitial({ precise });
        return;
      }
      let asked = false;
      try {
        asked = sessionStorage.getItem(LOCATION_ASKED_KEY) === "1";
      } catch {
        /* ignore */
      }
      if (asked) {
        sendInitial();
        return;
      }
      try {
        sessionStorage.setItem(LOCATION_ASKED_KEY, "1");
      } catch {
        /* ignore */
      }

      const granted = await askForLocation();
      if (granted) {
        precise = granted;
        sendInitial({ precise: granted });
      } else {
        sendInitial();
      }
    };

    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop + window.innerHeight;
      const pct = Math.min(100, Math.round((scrolled / h.scrollHeight) * 100));
      if (pct > maxScrollPct) maxScrollPct = pct;
    };

    const sendExit = () => {
      const payload = JSON.stringify({
        event: "exit",
        sessionId,
        ...clientContext(),
        sessionDurationMs: Date.now() - startedAt,
        scrollDepthPct: maxScrollPct,
        preciseLocation: precise ?? undefined,
      });
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            "/api/track",
            new Blob([payload], { type: "application/json" })
          );
        } else {
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        /* silent */
      }
    };

    maybeAskLocation();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", sendExit);
    window.addEventListener("beforeunload", sendExit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", sendExit);
      window.removeEventListener("beforeunload", sendExit);
    };
  }, []);

  return null;
}
