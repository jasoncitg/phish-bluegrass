"use client";

import { useState } from "react";
import { ERAS } from "@/lib/eras";
import EraCard from "@/components/EraCard";
import ShowResult from "@/components/ShowResult";
import Spinner from "@/components/Spinner";
import type { ShowResult as ShowResultData } from "@/app/api/find-show/route";

type AppState = "idle" | "loading" | "result" | "error";

export default function Home() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>("idle");
  const [result, setResult] = useState<ShowResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isSetupError, setIsSetupError] = useState(false);

  async function findShow() {
    if (!selectedEra || appState === "loading") return;

    setAppState("loading");
    setResult(null);
    setErrorMsg("");
    setIsSetupError(false);

    try {
      const res = await fetch(`/api/find-show?era=${encodeURIComponent(selectedEra)}`);
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setIsSetupError(data.setup === true);
        setAppState("error");
        return;
      }

      setResult(data as ShowResultData);
      setAppState("result");
    } catch {
      setErrorMsg("Network error — check your connection and try again.");
      setAppState("error");
    }
  }

  function reset() {
    setAppState("idle");
    setResult(null);
    setErrorMsg("");
  }

  function findAnother() {
    findShow();
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:py-16 flex flex-col items-center">
      {/* ── HEADER ── */}
      <header className="w-full max-w-2xl text-center mb-10 sm:mb-14 space-y-3">
        {/* Decorative rope/water lines */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold/50 text-xs tracking-[0.3em] uppercase font-body">
            Phish · Bluegrass · Live
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Fish hook SVG ornament */}
        <div className="flex justify-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-12 h-12 text-gold/60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Simplified banjo + wave icon */}
            <circle cx="32" cy="38" r="14" />
            <line x1="32" y1="4" x2="32" y2="24" />
            <line x1="26" y1="8" x2="38" y2="8" />
            <path d="M20 54 Q32 62 44 54" />
            <circle cx="32" cy="38" r="4" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl font-bold text-cream leading-none">
          Phish{" "}
          <span className="text-gold italic">Out of Water</span>
        </h1>

        <p className="text-cream-muted text-base sm:text-lg max-w-md mx-auto leading-relaxed mt-2">
          Find a live Phish show where they played a bluegrass song.
          Pick an era, cast your line.
        </p>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="w-full max-w-2xl space-y-8">
        {/* Era selection — always visible unless loading */}
        {appState !== "result" && (
          <section aria-label="Select an era">
            <h2 className="text-cream-muted text-xs tracking-[0.2em] uppercase mb-4 text-center font-body">
              Choose Your Era
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ERAS.map((era) => (
                <EraCard
                  key={era.id}
                  era={era}
                  selected={selectedEra === era.id}
                  onSelect={(id) => {
                    setSelectedEra(id);
                    // Clear any previous result/error on new selection
                    if (appState === "error" || appState === "result") {
                      setAppState("idle");
                    }
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Spinner */}
        {appState === "loading" && <Spinner />}

        {/* Result */}
        {appState === "result" && result && (
          <div className="space-y-6">
            <ShowResult result={result} onFindAnother={findAnother} />

            {/* Back to era selection */}
            <div className="text-center">
              <button
                onClick={reset}
                className="text-cream-muted/50 text-xs hover:text-cream-muted transition-colors underline underline-offset-2"
              >
                ← Change era
              </button>
            </div>
          </div>
        )}

        {/* Error state */}
        {appState === "error" && (
          <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-5 text-center space-y-3 animate-fade-in">
            <p className="text-red-300 text-sm leading-relaxed">{errorMsg}</p>

            {isSetupError && (
              <div className="text-left bg-ink rounded p-4 text-xs text-cream-muted space-y-2 border border-ink-muted">
                <p className="font-semibold text-cream">Setup instructions:</p>
                <ol className="list-decimal list-inside space-y-1 leading-relaxed">
                  <li>
                    Request a free API key at{" "}
                    <a
                      href="https://phish.net/api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold underline"
                    >
                      phish.net/api
                    </a>
                  </li>
                  <li>
                    In your Vercel project → Settings → Environment Variables
                  </li>
                  <li>
                    Add <code className="bg-ink-muted px-1 rounded">PHISH_NET_API_KEY</code> with your key
                  </li>
                  <li>Redeploy the project</li>
                </ol>
              </div>
            )}

            <button
              onClick={reset}
              className="text-cream-muted text-xs underline hover:text-cream transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Find Show button — shown in idle/error state when an era is selected */}
        {(appState === "idle" || appState === "error") && (
          <div className="flex justify-center pt-2">
            <button
              onClick={findShow}
              disabled={!selectedEra}
              className={`
                relative group px-10 py-4 rounded-full font-body font-semibold text-base
                transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink
                ${
                  selectedEra
                    ? "bg-gold text-ink hover:bg-gold-light shadow-[0_0_30px_rgba(201,150,62,0.3)] hover:shadow-[0_0_40px_rgba(201,150,62,0.5)] cursor-pointer"
                    : "bg-ink-light text-cream-muted/40 border border-ink-muted cursor-not-allowed"
                }
              `}
            >
              {/* Shimmer effect on hover */}
              {selectedEra && (
                <span
                  className="
                    absolute inset-0 rounded-full
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    translate-x-[-200%] group-hover:translate-x-[200%]
                    transition-transform duration-700 ease-in-out
                  "
                />
              )}
              <span className="relative">
                {selectedEra ? "Cast the Line" : "Select an Era First"}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="mt-auto pt-16 pb-6 text-center space-y-1">
        <p className="text-cream-muted/30 text-xs">
          Phish Out of Water &mdash; a fan-made tool
        </p>
        <p className="text-cream-muted/20 text-xs">
          Setlist data from{" "}
          <a
            href="https://phish.net"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cream-muted/40 transition-colors"
          >
            Phish.net
          </a>
          , the non-commercial fan archive
        </p>
      </footer>
    </main>
  );
}
