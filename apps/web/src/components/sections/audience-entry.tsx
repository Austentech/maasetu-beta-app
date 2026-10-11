import Link from "next/link";
import { ArrowRight, Stethoscope, UserRound } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";

/**
 * Audience entry points — the two halves of care MaaSetu is being built
 * for, each leading to its own page (doctors' panel keeps the deep
 * burgundy register established elsewhere on the site).
 */
export function AudienceEntry() {
  return (
    <section id="audience" aria-labelledby="audience-heading" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-500 uppercase">
            <span aria-hidden="true" className="font-display text-sm text-brand-300 italic">
              03
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
            Where you fit in
          </p>
          <h2
            id="audience-heading"
            className="font-display mt-5 max-w-2xl text-3xl leading-[1.12] font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem]"
          >
            Two sides of the same journey
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal delay={0.05}>
            <Link
              href="/patients"
              className="group flex h-full flex-col rounded-3xl border border-line bg-canvas p-8 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-10"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <UserRound aria-hidden="true" className="size-6" strokeWidth={1.8} />
              </span>
              <h3 className="font-display mt-6 text-2xl font-medium text-ink sm:text-[1.7rem]">
                For every mother, a calmer journey
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base">
                What we are designing for expectant mothers — one organised
                record, clear next steps and guidance that matches the week
                she is in.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 font-medium text-brand-500 transition-colors group-hover:text-brand-600">
                For patients
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </p>
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <Link
              href="/doctors"
              className="group flex h-full flex-col rounded-3xl bg-brand-700 p-8 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-10"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white/10 text-peach-300">
                <Stethoscope aria-hidden="true" className="size-6" strokeWidth={1.8} />
              </span>
              <h3 className="font-display mt-6 text-2xl font-medium text-white sm:text-[1.7rem]">
                For doctors, a clearer picture
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-peach-200/90 sm:text-base">
                Structured patient context, follow-ups that hold and
                coordination with labs — shaped with the profession, for the
                reality of Indian practice.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 font-medium text-peach-300">
                For doctors
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </p>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
