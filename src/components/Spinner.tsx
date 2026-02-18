"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Casting the line into the archives...",
  "Tuning the banjo strings...",
  "Wading through the setlists...",
  "Consulting the Phish.net oracle...",
  "Picking the flatpick...",
  "Following the water downstream...",
  "Listening for the dobro...",
  "Reading the old show dates by firelight...",
];

export default function Spinner() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 py-8">
      {/* Animated ripple spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-gold/40 animate-ping [animation-delay:0.3s]" />
        <div className="absolute inset-4 rounded-full border-2 border-gold animate-pulse-slow" />
      </div>

      {/* Rotating messages */}
      <p
        key={msgIndex}
        className="text-cream-muted text-sm italic animate-fade-in"
      >
        {LOADING_MESSAGES[msgIndex]}
      </p>
    </div>
  );
}
