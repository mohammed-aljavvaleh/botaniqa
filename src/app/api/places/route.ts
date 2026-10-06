import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

export interface PlacesData {
  rating: number | null;
  userRatingsTotal: number | null;
  name: string | null;
}

/**
 * Normalise whatever the user pastes into the admin panel into a canonical
 * Place ID that the Places API (New) accepts:
 *
 *  • Already a ChIJ... ID → return as-is
 *  • Hex CID pair like "0x15347beaec888aeb:0x47db6777a30b7a43"
 *    → convert the second part to decimal and use ?cid= with the old API
 *  • Google Maps URL → extract the hex CID from the `data=` query param
 *    (/!1s0x…:0x…/) and fall through to the CID case above
 *
 * Returns { type: 'placeId', value } or { type: 'cid', value } (decimal).
 */
function parseInput(raw: string): { type: 'placeId'; value: string } | { type: 'cid'; value: string } {
  const trimmed = raw.trim();

  // Already looks like a standard Place ID
  if (/^ChIJ/i.test(trimmed) || /^[A-Za-z0-9_-]{27,}$/.test(trimmed)) {
    return { type: 'placeId', value: trimmed };
  }

  // Extract hex CID from a full Google Maps URL
  if (trimmed.startsWith('http')) {
    const cidMatch = trimmed.match(/!1s(0x[0-9a-fA-F]+):(0x[0-9a-fA-F]+)/);
    if (cidMatch) {
      const decimalCid = BigInt(cidMatch[2]).toString();
      return { type: 'cid', value: decimalCid };
    }
    // Also handle /place/ URLs with ?cid= param
    const url = new URL(trimmed);
    const cid = url.searchParams.get('cid');
    if (cid) return { type: 'cid', value: cid };
  }

  // Raw hex CID pair: "0xABCD:0x1234"
  const hexPairMatch = trimmed.match(/^(0x[0-9a-fA-F]+):(0x[0-9a-fA-F]+)$/i);
  if (hexPairMatch) {
    const decimalCid = BigInt(hexPairMatch[2]).toString();
    return { type: 'cid', value: decimalCid };
  }

  // Plain decimal CID
  if (/^\d+$/.test(trimmed)) {
    return { type: 'cid', value: trimmed };
  }

  // Fallback – treat as a Place ID and let the API reject it if wrong
  return { type: 'placeId', value: trimmed };
}

/**
 * Fetch via the Places API (New) using a canonical Place ID.
 * Places API (New) requires field mask passed via X-Goog-FieldMask header.
 */
async function fetchByPlaceId(placeId: string, apiKey: string): Promise<PlacesData> {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'rating,userRatingCount,displayName',
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Places API (New) error ${res.status}: ${body}`);
  }
  const json = await res.json();
  return {
    rating: json.rating ?? null,
    userRatingsTotal: json.userRatingCount ?? null,
    name: json.displayName?.text ?? null,
  };
}

/**
 * Fetch via the old Places API using a decimal CID.
 * Returns rating + userRatingsTotal directly.
 */
async function fetchByCid(cid: string, apiKey: string): Promise<PlacesData> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?cid=${cid}&fields=name,rating,user_ratings_total&key=${apiKey}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Places API (Legacy) CID lookup error ${res.status}: ${body}`);
  }
  const json = await res.json();
  if (json.status !== 'OK') {
    throw new Error(`Places API status: ${json.status} — ${json.error_message ?? ''}`);
  }
  return {
    rating: json.result?.rating ?? null,
    userRatingsTotal: json.result?.user_ratings_total ?? null,
    name: json.result?.name ?? null,
  };
}

/**
 * Cached wrapper — results live for 1 hour to avoid burning quota.
 */
const fetchPlaceData = unstable_cache(
  async (rawInput: string): Promise<PlacesData> => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY!;
    const parsed = parseInput(rawInput);
    if (parsed.type === 'cid') {
      return fetchByCid(parsed.value, apiKey);
    }
    return fetchByPlaceId(parsed.value, apiKey);
  },
  ['google-places-data'],
  { revalidate: 3600, tags: ['places'] }
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');

  if (!placeId) {
    return NextResponse.json(
      { success: false, error: 'placeId query parameter is required' },
      { status: 400 }
    );
  }

  if (!process.env.GOOGLE_PLACES_API_KEY) {
    return NextResponse.json({
      success: true,
      data: {
        rating: 4.1,
        userRatingsTotal: null,
        name: 'Botanica Cafe-Botanik',
      },
      fallback: true,
    });
  }

  try {
    const data = await fetchPlaceData(placeId);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.warn('Google Places API call note:', error?.message || error);
    // Graceful fallback so frontend UI remains completely functional without 500 error crashes
    return NextResponse.json({
      success: true,
      data: {
        rating: 4.1,
        userRatingsTotal: null,
        name: 'Botanica Cafe-Botanik',
      },
      fallback: true,
    });
  }
}
