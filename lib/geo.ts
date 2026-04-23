export type PreciseLocation = {
  lat: number;
  lng: number;
  accuracyMeters?: number;
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
};

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<{ city?: string; region?: string; country?: string; postal?: string }> {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return {};
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { signal: AbortSignal.timeout(2500) }
    );
    if (!res.ok) return {};
    const data = await res.json();
    return {
      city: data.city || data.locality || undefined,
      region: data.principalSubdivision || undefined,
      country: data.countryName || undefined,
      postal: data.postcode || undefined,
    };
  } catch {
    return {};
  }
}
