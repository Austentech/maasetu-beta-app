import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { ogImage } from "@/config/site";
import {
  ArrowRight,
  BookOpenText,
  CalendarHeart,
  ScanSearch,
  Stethoscope,
} from "lucide-react";

import { CareJourney } from "@/components/brand/care-journey";
import {
  DiagnosticsVisual,
  GuidanceVisual,
  TimelineVisual,
} from "@/components/brand/service-visuals";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The four service areas MaaSetu is being built around — pregnancy care coordination, doctor consultations, diagnostic coordination and organised health information — described honestly as intended capabilities, not live services.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Intended service areas",
    description:
      "How MaaSetu intends pregnancy care to hold together — four service areas in development, described plainly.",
    url: "/services",
    images: [ogImage],
  },
};

/**
 * LQIP (low-quality image placeholder) for the Services hero illustration —
 * a 12px JPEG base64 produced by scripts/process_services_assets.py. The
 * hero area paints instantly with this brand-warm blur (no layout shift)
 * and sharpens when the full image arrives.
 */
const MOTHER_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAMAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgX/xAAkEAACAQIFBAMAAAAAAAAAAAABAwIEEQAFEiExBhNBYRQjUf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGREAAgMBAAAAAAAAAAAAAAAAAQIAAxEh/9oADAMBAAIRAxEAPwBD1M4BC7MauSp64yWTe49edz52xYon/KpoOtp1AG35txgp11UNQylCmSh3Fz1WPNuMJ8rgF5ZSxBJ+qJufYwI3eyt1AqVhP//Z";

/**
 * LQIP for the consultation illustration (12px JPEG,
 * scripts/process_services_assets.py).
 */
const CONSULT_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAMAAwDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFBv/EACQQAAICAAUDBQAAAAAAAAAAAAECAwQABRESYTFBURMhIjKR/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABoRAAICAwAAAAAAAAAAAAAAAAECAAMREiL/2gAMAwEAAhEDEQA/ANRClqG1ckszO8bncij6ovHI74j1syzOkJI39O2rOXR5ZfkFPY+w5/cE9yZ84gg3EI1JZDoTrqcI5nM0VkKvTaD1I8+MHflsCNqgOux/9k=";

interface ServiceArea {
  icon: LucideIcon;
  /** Hand-drawn spot diagram (decorative). Omitted on the featured area,
   * which carries a full illustration instead. */
  visual?: () => React.JSX.Element;
  number: string;
  title: string;
  intention: string;
  mayInclude: readonly string[];
  /** The featured area renders with its full-width consultation image. */
  feature?: "consultation";
}

const serviceAreas: readonly ServiceArea[] = [
  {
    icon: CalendarHeart,
    visual: TimelineVisual,
    number: "01",
    title: "Pregnancy care coordination",
    intention:
      "One organised journey for visits, follow-ups and guidance — so nothing about her care depends on memory, or on a folder of papers that lives in a drawer. This is the heart of MaaSetu: the connective layer that keeps every other part in step with her pregnancy.",
    mayInclude: [
      "A pregnancy timeline with visits and follow-ups held in one place",
      "Reminders that reach her at the time they matter",
      "Clear next steps after every consultation, written to be understood",
    ],
  },
  {
    icon: Stethoscope,
    number: "02",
    feature: "consultation",
    title: "Doctor consultations & follow-up",
    intention:
      "Finding the right professionals for the pregnancy, then staying connected through structured follow-ups instead of one-off visits that end at the clinic door. The doctor she chooses should enter every conversation already knowing where the journey stands.",
    mayInclude: [
      "Discovering doctors suited to her pregnancy and her circumstances",
      "Structured follow-ups between visits, instead of phone-tag",
      "Relevant context reaching the doctor before she arrives — only with her consent",
    ],
  },
  {
    icon: ScanSearch,
    visual: DiagnosticsVisual,
    number: "03",
    title: "Diagnostic coordination",
    intention:
      "Lab tests and reports organised around the pregnancy timeline, reaching the people who need them at the time they need them. A missing report should never be the reason a decision waits — or gets made twice.",
    mayInclude: [
      "Tests mapped to the stages of pregnancy, not to guesswork",
      "Reports reaching her doctor without a courier, a photograph or a phone call",
      "No repeated tests because a previous report went missing",
    ],
  },
  {
    icon: BookOpenText,
    visual: GuidanceVisual,
    number: "04",
    title: "Organised health information",
    intention:
      "Clear, relevant pregnancy guidance curated to the stage of the journey — not another flood of contradictory search results. She should be able to trust that what she reads matches where she is, without becoming her own medical researcher.",
    mayInclude: [
      "Stage-wise guidance that matches the week she is in",
      "Plain-language answers, reviewed rather than scraped",
      "Room for her doctor's instructions to sit alongside general guidance",
    ],
  },
];

/**
 * Services — the intended care-coordination areas, with honest
 * availability wording throughout: everything here is in development.
 *
 * The opener carries the page's above-the-fold illustration — a serene
 * expectant mother with gentle care-coordination motifs — so the page
 * leads with the person everything on it is for. It is the route's LCP
 * image: priority-loaded with a blur placeholder, never gated behind an
 * entrance animation.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Intended services"
        title="Care that is connected, not scattered"
        lead="Four service areas, one purpose: a pregnancy journey that holds together. None of these are live services yet — they are the areas we are actively building, described here exactly as we intend them to work."
        visual={
          <figure className="overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-32px_rgba(74,16,28,0.35)] ring-1 ring-peach-300/60">
            <Image
              src="/images/services-expectant-mother.png"
              alt="A serene expectant Indian mother in a deep burgundy maternity dress with a peach dupatta, hands gently cradling her baby bump, with soft calendar and heart motifs floating around her — the calm, guided pregnancy journey MaaSetu is being built around."
              width={1024}
              height={1024}
              priority
              placeholder="blur"
              blurDataURL={MOTHER_BLUR_DATA_URL}
              sizes="(min-width: 1024px) 528px, (min-width: 640px) 480px, 100vw"
              className="h-auto w-full"
            />
          </figure>
        }
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-peach-300/70 bg-peach-100 px-4 py-1.5 text-[13px] font-medium text-brand-700">
          All areas in development — availability will be announced plainly,
          phase by phase.
        </p>
      </PageHero>

      {/* The journey diagram */}
      <section aria-labelledby="journey-heading" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-4 sm:px-6 lg:pt-20">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-500 uppercase">
              <span aria-hidden="true" className="font-display text-sm text-brand-300 italic">
                01
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
              <span id="journey-heading">The shape of the journey</span>
            </p>
          </Reveal>
          <div className="mt-10 pb-4">
            <CareJourney />
          </div>
        </div>
      </section>

      {/* The four service areas — alternating editorial rows */}
      <section aria-labelledby="areas-heading" className="bg-canvas">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-500 uppercase">
              <span aria-hidden="true" className="font-display text-sm text-brand-300 italic">
                02
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
              <span id="areas-heading">The four service areas</span>
            </p>
          </Reveal>

          <div className="mt-8 space-y-6">
            {serviceAreas.map((area, index) => (
              <Reveal key={area.number} delay={0.04 * index}>
                {area.feature === "consultation" ? (
                  /* The featured area — its meaning carried by a full
                     consultation illustration instead of a spot diagram. */
                  <article className="rounded-2xl border border-line bg-white p-7 shadow-xs sm:p-9">
                    <div className="flex flex-wrap items-start gap-x-4 gap-y-5">
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                        <area.icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-[9rem] flex-1">
                        <p
                          aria-hidden="true"
                          className="font-display text-sm text-brand-300 italic"
                        >
                          {area.number}
                        </p>
                        <h3 className="font-display mt-1 text-xl leading-snug font-medium text-ink sm:text-[1.3rem]">
                          {area.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-7 grid items-center gap-8 border-t border-line/60 pt-7 lg:grid-cols-[1fr_19rem] lg:gap-10">
                      <div>
                        <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
                          {area.intention}
                        </p>
                        <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-brand-500 uppercase">
                          What this may include
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {area.mayInclude.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-300"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-5 inline-flex items-center rounded-full bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700">
                          Status: in development
                        </p>
                      </div>
                      <figure>
                        <div className="overflow-hidden rounded-2xl shadow-[0_20px_48px_-28px_rgba(74,16,28,0.35)] ring-1 ring-peach-300/60">
                          <Image
                            src="/images/services-doctor-consultation.png"
                            alt="A pregnant Indian woman sits across a clinic desk from her gynecologist, who leans forward listening attentively as they talk through her pregnancy care and follow-up plan — a warm, unhurried in-person consultation."
                            width={1024}
                            height={1024}
                            placeholder="blur"
                            blurDataURL={CONSULT_BLUR_DATA_URL}
                            sizes="(min-width: 1024px) 304px, 96vw"
                            className="h-auto w-full"
                          />
                        </div>
                        <figcaption className="mt-3.5 text-[13.5px] leading-relaxed text-ink-soft">
                          The relationship the platform is meant to support —
                          a doctor who listens, and a follow-up plan that
                          holds.
                        </figcaption>
                      </figure>
                    </div>
                  </article>
                ) : (
                  <article className="grid gap-6 rounded-2xl border border-line bg-white p-7 shadow-xs sm:p-9 lg:grid-cols-[13rem_1fr] lg:gap-10">
                    <div className="flex flex-wrap items-start gap-x-4 gap-y-5 lg:flex-col lg:gap-5">
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                        <area.icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-[9rem] flex-1 lg:min-w-0 lg:flex-none">
                        <p
                          aria-hidden="true"
                          className="font-display text-sm text-brand-300 italic"
                        >
                          {area.number}
                        </p>
                        <h3 className="font-display mt-1 text-xl leading-snug font-medium text-ink sm:text-[1.3rem]">
                          {area.title}
                        </h3>
                      </div>
                      {/* Service-spot illustration — the area's idea as a quiet
                          hand-drawn diagram, matching the care-journey DNA. */}
                      {area.visual ? (
                        <div className="basis-full lg:basis-auto">
                          <area.visual />
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
                        {area.intention}
                      </p>
                      <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-brand-500 uppercase">
                        What this may include
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {area.mayInclude.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-300"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 inline-flex items-center rounded-full bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700">
                        Status: in development
                      </p>
                    </div>
                  </article>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section aria-label="Next steps" className="border-t border-line bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="font-display max-w-xl text-xl leading-snug text-brand-700 italic sm:text-2xl">
              What this means for you depends on which side of care you
              stand on.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Button asChild size="lg">
                <Link href="/patients">
                  I&apos;m expecting
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/doctors">I&apos;m a doctor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
