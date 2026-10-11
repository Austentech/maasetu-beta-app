import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
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
 * Hero — the welcome experience.
 *
 * The visual is a warm prenatal consultation — an expectant mother with
 * her doctor — generated for MaaSetu with the project's image-generation
 * tooling (see docs/IMPLEMENTATION_LOG.md for provenance). It is the
 * above-the-fold LCP image, so it loads with `priority` and a blur
 * placeholder instead of any entrance animation that would delay paint.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 lg:pt-24 lg:pb-24">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-1.5 text-[13px] font-medium text-brand-700 shadow-xs">
              <HeartPulse
                aria-hidden="true"
                className="size-3.5 text-brand-400"
              />
              A maternal healthcare platform for India
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              id="hero-heading"
              className="font-display mt-6 text-[2.55rem] leading-[1.06] font-medium tracking-tight text-balance text-ink sm:text-6xl lg:text-[4.35rem]"
            >
              From the first{" "}
              <span className="text-brand-400">heartbeat</span> to the first{" "}
              <em className="text-brand-700">hello</em>.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              MaaSetu — a mother&apos;s bridge — is a maternal healthcare
              platform being built to connect expectant mothers with trusted
              doctors, organised diagnostics and calm, reliable pregnancy
              guidance. One coordinated journey, with no mother navigating
              alone.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
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
          </Reveal>

          <Reveal delay={0.3}>
            <p className="font-display mt-7 text-lg text-brand-700 italic sm:text-xl">
              {siteConfig.tagline}.
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              MaaSetu is in development — this page introduces what we are
              building, honestly.
            </p>
          </Reveal>
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
