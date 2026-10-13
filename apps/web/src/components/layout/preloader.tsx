"use client";

import { useEffect, useState } from "react";

/**
 * The MaaSetu initial load transition — the branded moment between "the
 * browser has the document" and "the app is interactive".
 *
 * How it works (and why it cannot get stuck):
 *
 * 1. The overlay is server-rendered as part of the root layout, so it is
 *    present in the very first HTML of every full document load (first
 *    visit, refresh, direct deep-link). It never appears on client-side
 *    navigation: the root layout stays mounted across route changes, and
 *    by then this component has already left the tree.
 *
 * 2. It is dismissed by its own effect the moment React finishes hydrating
 *    the document — the exact point at which the application becomes
 *    interactive. Nothing else is waited on: no timers, no network
 *    requests, no font events. A short CSS fade (see .preloader in
 *    globals.css) smooths the hand-off, then the element unmounts.
 *
 * 3. A pure-CSS failsafe (`.preloader` keyframes in globals.css) caps the
 *    overlay's total lifetime at ~2.6s. Even if the JavaScript bundle
 *    never loads — failed script, disabled JS, crashed hydration — the
 *    overlay fades itself out and stays hidden, leaving the
 *    server-rendered content usable. The cap is a safety ceiling, not a
 *    deliberate delay; the normal exit happens much earlier, at hydration.
 *
 * Accessibility: the overlay is purely decorative (`aria-hidden`), contains
 * no focusable elements (so it cannot trap keyboard focus), sits below the
 * skip-to-content link in stacking order, and all of its animations — the
 * slow dotted ring, the single heartbeat draw-in — are disabled under
 * `prefers-reduced-motion`.
 */
const FADE_REMOVE_DELAY_MS = 420;

export function Preloader() {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Runs once, after hydration: the app is interactive — the loading
    // condition is satisfied. One rAF keeps the exit on a rendered frame.
    const frame = requestAnimationFrame(() => setExiting(true));
    const remove = window.setTimeout(() => setGone(true), FADE_REMOVE_DELAY_MS);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(remove);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      data-exiting={exiting || undefined}
      className="preloader fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-background px-6"
    >
      {/* The brand emblem: a gentle dotted ring around a single heartbeat */}
      <svg
        viewBox="0 0 132 132"
        className="size-20 sm:size-24"
        fill="none"
        role="presentation"
      >
        <circle
          className="preloader-ring"
          cx="66"
          cy="66"
          r="56"
          stroke="var(--color-peach-300)"
          strokeWidth="2.5"
          strokeDasharray="0.5 8"
          strokeLinecap="round"
        />
        <path
          className="preloader-ecg"
          pathLength={100}
          d="M30 66 L52 66 L58 52 L68 80 L74 66 L102 66"
          stroke="var(--color-brand-400)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col items-center gap-2.5">
        <p className="font-display text-[1.65rem] leading-none font-medium tracking-tight text-brand-700">
          MaaSetu
        </p>
        <p className="text-[0.62rem] font-medium tracking-[0.32em] text-ink-soft/80 uppercase">
          Because Every Mother Matters
        </p>
      </div>
    </div>
  );
}
