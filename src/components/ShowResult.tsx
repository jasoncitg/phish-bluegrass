"use client";

import type { ShowResult as ShowResultData } from "@/app/api/find-show/route";

interface ShowResultProps {
  result: ShowResultData;
  onFindAnother: () => void;
}

function formatDate(dateStr: string): string {
  // dateStr is "YYYY-MM-DD"
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatLocation(show: ShowResultData["show"]): string {
  const parts = [show.city];
  if (show.state && show.country === "USA") parts.push(show.state);
  else if (show.country && show.country !== "USA") parts.push(show.country);
  return parts.join(", ");
}

export default function ShowResult({ result, onFindAnother }: ShowResultProps) {
  const { song, show, era, totalPlaysInEra } = result;

  return (
    <div className="animate-slide-up w-full max-w-2xl mx-auto">
      {/* Header label */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
        <span className="text-gold/70 text-xs tracking-[0.25em] uppercase font-body">
          A Bluegrass Moment
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
      </div>

      {/* Main result card */}
      <div className="relative rounded-xl border border-gold/40 bg-ink-light overflow-hidden shadow-[0_0_60px_rgba(201,150,62,0.15)]">
        {/* Top gold shimmer bar */}
        <div className="h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Song name */}
          <div className="text-center space-y-1">
            <p className="text-cream-muted text-xs tracking-widest uppercase">
              {song.type === "cover" ? `Cover · ${song.artist ?? "Traditional"}` : "Phish Original"}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-gold leading-tight">
              {song.name}
            </h2>
            {song.note && (
              <p className="text-cream-muted/70 text-sm italic">{song.note}</p>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-ink-muted" />
            <span className="text-gold/40 text-lg">♦</span>
            <div className="h-px flex-1 bg-ink-muted" />
          </div>

          {/* Show details */}
          <div className="space-y-3 text-center">
            <div>
              <p className="font-display text-cream text-xl sm:text-2xl leading-snug">
                {show.venue}
              </p>
              <p className="text-cream-muted text-sm mt-0.5">{formatLocation(show)}</p>
            </div>

            <p className="text-gold-light/90 text-base">{formatDate(show.date)}</p>

            {show.tourname && (
              <p className="text-cream-muted/60 text-xs tracking-wide uppercase">
                {show.tourname}
              </p>
            )}
          </div>

          {/* Stats pill */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink border border-ink-muted text-cream-muted text-xs">
              <span className="text-gold font-bold">{totalPlaysInEra}</span>
              <span>
                performance{totalPlaysInEra !== 1 ? "s" : ""} of this song in {era.label} ({era.yearRange})
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={show.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg
                bg-gold text-ink font-body font-semibold text-sm
                hover:bg-gold-light transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Full Setlist on Phish.net
            </a>

            <button
              onClick={onFindAnother}
              className="
                flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg
                border border-ink-muted text-cream-muted text-sm font-body
                hover:border-gold/50 hover:text-cream transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Find Another Show
            </button>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <p className="text-center text-cream-muted/40 text-xs mt-4">
        Setlist data courtesy of{" "}
        <a
          href="https://phish.net"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-cream-muted/70 transition-colors"
        >
          Phish.net
        </a>
      </p>
    </div>
  );
}
