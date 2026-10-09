import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

import { HeroVisual } from "@/components/brand/hero-visual";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

/**
 * Hero — the welcome experience.
 * Emotionally meaningful, medically credible, honest about status.
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
                <Link href="#for-patients">
                  For patients
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#for-doctors">For doctors</Link>
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

        <HeroVisual className="mx-auto w-full max-w-[30rem] lg:max-w-[34rem]" />
      </div>
    </section>
  );
}
