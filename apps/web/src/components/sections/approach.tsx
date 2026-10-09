import {
  BookOpenText,
  CalendarHeart,
  ScanSearch,
  Stethoscope,
} from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Our approach — the four service areas MaaSetu is being built around.
 * Presented honestly as intended capabilities, not live services.
 */
const pillars = [
  {
    icon: CalendarHeart,
    title: "Pregnancy care coordination",
    body: "One organised journey for visits, follow-ups and guidance — so nothing about her care depends on memory, or on a folder of papers that lives in a drawer.",
  },
  {
    icon: Stethoscope,
    title: "Doctor consultations & follow-up",
    body: "Finding the right professionals for the pregnancy, then staying connected through structured follow-ups instead of one-off visits that end at the clinic door.",
  },
  {
    icon: ScanSearch,
    title: "Diagnostic coordination",
    body: "Lab tests and reports organised around the pregnancy timeline, reaching the people who need them at the time they need them.",
  },
  {
    icon: BookOpenText,
    title: "Organised health information",
    body: "Clear, relevant pregnancy guidance curated to the stage of the journey — not another flood of contradictory search results.",
  },
] as const;

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-heading" className="bg-canvas">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            eyebrow="Our approach"
            title={
              <span id="approach-heading">Care that is connected, not scattered</span>
            }
            lead="Four service areas, one purpose: a pregnancy journey that holds together."
          />
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-peach-300/70 bg-peach-100 px-4 py-1.5 text-[13px] font-medium text-brand-700">
            What we are building — these service areas will open in phases,
            and this page will say so plainly until they do.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={0.08 * index}>
              <article className="group h-full rounded-2xl border border-line bg-white p-7 shadow-xs transition-shadow hover:shadow-sm sm:p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <pillar.icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-xl leading-snug font-medium text-ink sm:text-[1.35rem]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
