import { NextRequest, NextResponse } from "next/server";
import { ERAS } from "@/lib/eras";
import { BLUEGRASS_SONGS, type BluegrassSong } from "@/lib/bluegrass-songs";

const PHISH_NET_BASE = "https://api.phish.net/v5";

export interface ShowResult {
  song: {
    name: string;
    slug: string;
    type: "cover" | "original";
    artist?: string;
    note?: string;
  };
  show: {
    date: string;
    venue: string;
    city: string;
    state: string;
    country: string;
    permalink: string;
    tourname: string | null;
    year: string;
  };
  era: {
    id: string;
    label: string;
    yearRange: string;
  };
  totalPlaysInEra: number;
}

interface PhishNetEntry {
  showdate: string;
  showyear: string;
  permalink: string;
  venue: string;
  city: string;
  state: string;
  country: string;
  tourname: string | null;
}

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function fetchSongPlays(song: BluegrassSong, apiKey: string): Promise<PhishNetEntry[]> {
  const url = `${PHISH_NET_BASE}/setlists/slug/${song.slug}.json?apikey=${apiKey}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 }, // cache 24h — be kind to Phish.net
  });

  if (!res.ok) return [];

  const json = await res.json();
  if (!Array.isArray(json.data)) return [];

  return json.data as PhishNetEntry[];
}

export async function GET(request: NextRequest) {
  const eraId = request.nextUrl.searchParams.get("era");

  if (!eraId) {
    return NextResponse.json({ error: "era parameter is required" }, { status: 400 });
  }

  const era = ERAS.find((e) => e.id === eraId);
  if (!era) {
    return NextResponse.json({ error: "Unknown era" }, { status: 400 });
  }

  const apiKey = process.env.PHISH_NET_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Phish.net API key not configured. Add PHISH_NET_API_KEY to your Vercel environment variables.",
        setup: true,
      },
      { status: 503 }
    );
  }

  const eraYears = new Set(era.years);
  const songs = shuffle(BLUEGRASS_SONGS);

  for (const song of songs) {
    try {
      const plays = await fetchSongPlays(song, apiKey);

      // Filter to the chosen era's years
      const eraPlays = plays.filter(
        (p) => eraYears.has(parseInt(p.showyear, 10))
      );

      if (eraPlays.length === 0) continue;

      // Pick a random performance
      const pick = eraPlays[Math.floor(Math.random() * eraPlays.length)];

      const result: ShowResult = {
        song: {
          name: song.name,
          slug: song.slug,
          type: song.type,
          artist: song.artist,
          note: song.note,
        },
        show: {
          date: pick.showdate,
          venue: pick.venue,
          city: pick.city,
          state: pick.state,
          country: pick.country,
          permalink: pick.permalink,
          tourname: pick.tourname,
          year: pick.showyear,
        },
        era: {
          id: era.id,
          label: era.label,
          yearRange: era.yearRange,
        },
        totalPlaysInEra: eraPlays.length,
      };

      return NextResponse.json(result);
    } catch {
      // try the next song
      continue;
    }
  }

  return NextResponse.json(
    {
      error: `No bluegrass songs found for ${era.label} (${era.yearRange}). This era may have limited acoustic sets — try another!`,
    },
    { status: 404 }
  );
}
