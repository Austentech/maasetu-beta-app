import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * The LQIP (low-quality image placeholder) for the hero illustration —
 * a 12px JPEG base64 produced by scripts/process_hero_asset.py. The hero
 * area paints instantly with this brand-warm blur (no layout shift) and
 * sharpens when the full image arrives.
 */
const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAMAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABAX/xAAiEAABBAIBBAMAAAAAAAAAAAABAgMEEQASIQUTQVEGFTH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAGREAAwADAAAAAAAAAAAAAAAAAAERAhIh/9oADAMBAAIRAxEAPwC5PcXHjSpqpTnbdj6NpCrShX5x7N+cJ0Xqy/rGkupfeKSUhW6UnWzQNm7rzgPlch2O1CjNKIa7WxHsg0LxTTLUFpDLbaXBW2znJs84ecGapYU//9k=";

/**
 * A designed ECG pulse mark — the brand's heartbeat motif as a quiet
 * typographic ornament inside the headline (replacing the earlier red
 * word treatment). Decorative: hidden from assistive technology.
 *
 * The single draw-in runs once via a small CSS animation (no JS, no
 * looping) and is disabled entirely under `prefers-reduced-motion`.
 */
function HeartbeatMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 32"
      fill="none"
      className="mx-[0.16em] inline-block h-[0.58em] w-[1.78em] shrink-0 overflow-visible align-baseline"
    >
      <path
        pathLength={100}
        className="ecg-trace"
        d="M2 23 L19 23 L26 11 L38 30 L45 23 L64 23 L72 15 L80 23 L94 23"
        stroke="var(--color-brand-400)"
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hero — the welcome experience.
 *
 * The visual is a warm prenatal consultation — an expectant mother with
 * her doctor — generated for MaaSetu with the project's image-generation
 * tooling (see docs/IMPLEMENTATION_LOG.md for provenance). It is the
 * above-the-fold LCP image, so it loads with `priority` and a blur
 * placeholder instead of any entrance animation that would delay paint.
 *
 * The copy block is plain server-rendered HTML — no entrance animations
 * gate the LCP text (they previously left the headline invisible until
 * client-side hydration, which read as a stuck loader on slow first
 * visits; see docs/IMPLEMENTATION_LOG.md).
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 lg:pt-24 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-1.5 text-[13px] font-medium text-brand-700 shadow-xs">
            <HeartPulse
              aria-hidden="true"
              className="size-3.5 text-brand-400"
            />
            Bharat se, Bharat ki Maaon ke liye
          </p>

          <h1
            id="hero-heading"
            className="font-display mt-6 text-[2.55rem] leading-[1.06] font-medium tracking-tight text-balance text-ink sm:text-6xl lg:text-[4.35rem]"
          >
            From the first <HeartbeatMark /> heartbeat to the first{" "}
            <em className="text-brand-700">hello</em>.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            MaaSetu — a mother&apos;s bridge — is being built so that no
            mother has to navigate her pregnancy alone: trusted doctors,
            organised diagnostics, aur calm, reliable guidance — sab ek hi
            coordinated journey mein.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Button asChild size="lg">
              <Link href="/patients">
                For patients
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/doctors">For doctors</Link>
            </Button>
          </div>

          <p className="font-display mt-7 text-lg text-brand-700 italic sm:text-xl">
            {siteConfig.tagline}.
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            MaaSetu is in development — this page introduces what we are
            building, honestly.
          </p>
        </div>

        {/*
          Deliberately NOT wrapped in an entrance animation: this is the
          above-the-fold LCP image. The blur-placeholder → sharp transition
          is the loading experience; nothing waits on JavaScript to appear.
        */}
        <figure className="relative mx-auto w-full max-w-[30rem] overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-32px_rgba(74,16,28,0.35)] ring-1 ring-peach-300/60 lg:max-w-[33rem]">
          <Image
            src="/images/hero-consultation.png"
            alt="An expectant mother in a deep burgundy dress sits cradling her baby bump while her doctor, in a cream coat with a stethoscope, kneels beside her with a reassuring hand — a warm prenatal consultation."
            width={1024}
            height={1024}
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR_DATA_URL}
            sizes="(min-width: 1024px) 528px, (min-width: 640px) 480px, 100vw"
            className="h-auto w-full"
          />
        </figure>
      </div>
    </section>
  );
}
