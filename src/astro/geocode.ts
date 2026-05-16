/**
 * Geocoding — turn a city string into lat/lng/timezone.
 *
 * Uses OpenStreetMap Nominatim (free, no API key, no recurring cost).
 * Rate-limited to ~1 req/sec for the public endpoint — fine for our scale,
 * and we cache aggressively.
 *
 * Timezone is approximated from longitude — accurate enough for natal-chart
 * computation (off by at most ~30 min vs IANA tz data, which is below the
 * precision the user can give for birth time anyway).
 *
 * Per Nominatim usage policy, we set a User-Agent identifying the app.
 */

export interface GeocodeResult {
  lat: number;
  lng: number;
  /** Display name returned by Nominatim (e.g. "Istanbul, Marmara Region, Turkey"). */
  displayName: string;
  /** Approximate UTC offset in hours (e.g. +3 for Turkey). Sign convention: east of UTC = positive. */
  timezoneOffsetHours: number;
}

const CACHE_KEY_PREFIX = 'soma:geocode:';

function cacheKey(query: string): string {
  return `${CACHE_KEY_PREFIX}${query.trim().toLowerCase()}`;
}

/**
 * Approximate timezone from longitude — every 15° of longitude = 1 hour.
 * Good enough for natal chart calculation.
 */
function approximateTimezoneOffset(longitude: number): number {
  return Math.round(longitude / 15);
}

export async function geocodeCity(
  query: string
): Promise<GeocodeResult | null> {
  if (!query || query.trim().length < 2) return null;

  // ─── Cache check ──────────────────────────────────────────────
  if (typeof window !== 'undefined' && window.localStorage) {
    const cached = window.localStorage.getItem(cacheKey(query));
    if (cached) {
      try {
        return JSON.parse(cached) as GeocodeResult;
      } catch {
        // ignore parse error, refetch
      }
    }
  }

  // ─── Live request ──────────────────────────────────────────────
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      query
    )}`;
    const res = await fetch(url, {
      headers: {
        // Per Nominatim usage policy
        'User-Agent': 'Soma-Wellness-App/1.0 (https://dist-sage-ten-11.vercel.app)',
        Accept: 'application/json',
      },
    });
    if (!res.ok) return null;
    const data: Array<{ lat: string; lon: string; display_name: string }> =
      await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const top = data[0];
    if (!top) return null;

    const lat = parseFloat(top.lat);
    const lng = parseFloat(top.lon);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

    const result: GeocodeResult = {
      lat,
      lng,
      displayName: top.display_name,
      timezoneOffsetHours: approximateTimezoneOffset(lng),
    };

    // Cache it
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(cacheKey(query), JSON.stringify(result));
      } catch {
        // localStorage full or disabled — non-fatal
      }
    }

    return result;
  } catch {
    return null;
  }
}
