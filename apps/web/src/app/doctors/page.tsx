import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { DoctorLoginDialog } from "@/components/dialogs/notice-dialogs";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ogImage, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "For doctors",
  description:
    "What MaaSetu intends to offer doctors, clinics and their teams — structured patient context, follow-ups that hold, and coordination with diagnostic labs. In development, shaped with the profession.",
  alternates: { canonical: "/doctors" },
  openGraph: {
    title: "For doctors & healthcare professionals",
    description:
      "The professional experience we are building — and the questions we are asking doctors while we build it.",
    url: "/doctors",
    images: [ogImage],
  },
};

const intentions = [
  "Structured patient context before every consultation",
  "Follow-ups that hold — organised instead of scattered across phone calls",
  "Coordination with diagnostic labs and your own staff in one place",
] as const;

const openQuestions = [
  {
    question: "How do follow-ups actually happen in your practice today?",
    context:
      "Between WhatsApp messages, reception calls and good intentions — we want to design around the reality, not around an idealised clinic.",
  },
  {
    question: "What information do you wish arrived before a consultation?",
    context:
      "If a doctor could see exactly three things before a mother walks in, what should they be? That question shapes our whole record design.",
  },
  {
    question: "Where does coordination with laboratories break down?",
    context:
      "Missing reports, repeated tests, formats that don't travel — telling us where the seams split helps us know what to hold together first.",
  },
] as const;

/**
 * For doctors — the intended professional experience with an honest
 * account of status, plus the questions actively being asked of the
 * profession while the platform is shaped.
 */
export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For doctors & providers"
        title="For doctors, a clearer picture"
        lead="MaaSetu is being shaped with healthcare professionals — designed to reduce the coordination load that sits between good intentions and good outcomes."
      />

      {/* Intentions + honest status on the deep burgundy band */}
      <section aria-labelledby="intentions-heading" className="bg-brand-700">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-peach-300 uppercase">
                <span aria-hidden="true" className="font-display text-sm text-white/50 italic">
                  01
                </span>
                <span aria-hidden="true" className="h-px w-8 bg-white/25" />
                <span id="intentions-heading">What we intend your tools to do</span>
              </p>
              <h2 className="font-display mt-5 max-w-xl text-3xl leading-[1.12] font-medium tracking-tight text-balance text-white sm:text-4xl">
                Less administration between you and the mother in front of you
              </h2>
            </Reveal>

            <ul className="mt-8 space-y-4">
              {intentions.map((item, index) => (
                <Reveal key={item} delay={0.06 * index}>
                  <li className="flex items-start gap-3.5 text-[15px] leading-relaxed text-peach-200/90 sm:text-base">
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-peach-300"
                    />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <DoctorLoginDialog
                  trigger={<Button size="lg" variant="onDark">Doctor login</Button>}
                />
                <Button asChild size="lg" variant="onDarkOutline">
                  <a
                    href={`mailto:${siteConfig.email}?subject=Joining%20MaaSetu%20as%20a%20healthcare%20professional`}
                  >
                    Partner with us
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-peach-200/70">
                The doctors&apos; portal is in preparation and will live at{" "}
                <span className="font-medium text-peach-200">
                  {siteConfig.subdomains.doctors}
                </span>{" "}
                — no accounts exist yet, and nothing on this page implies
                otherwise.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-white/12 bg-white/6 px-8 py-10 backdrop-blur-[2px] sm:px-10">
              <p className="text-xs font-semibold tracking-[0.22em] text-peach-300 uppercase">
                Being built with the profession
              </p>
              <p className="font-display mt-4 text-xl leading-relaxed font-light text-white/95 sm:text-[1.35rem]">
                The best maternal healthcare platforms will not be designed
                around software. They will be designed around the clinical
                reality of Indian practices — and that is why we are speaking
                with doctors, clinics and laboratories while we build.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-peach-200/80">
                If you care for mothers and want MaaSetu to fit the way you
                actually work, we would value your perspective.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The questions we are asking */}
      <section aria-labelledby="questions-heading" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-500 uppercase">
              <span aria-hidden="true" className="font-display text-sm text-brand-300 italic">
                02
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
              <span id="questions-heading">Questions we are asking doctors</span>
            </p>
            <h2 className="font-display mt-5 max-w-2xl text-3xl leading-[1.12] font-medium tracking-tight text-balance text-ink sm:text-4xl">
              Your answers end up inside the platform
            </h2>
          </Reveal>

          <div className="mt-10 space-y-6">
            {openQuestions.map((item, index) => (
              <Reveal key={item.question} delay={0.05 * index}>
                <article className="grid gap-2 border-l-2 border-brand-200 pl-6 sm:grid-cols-[1.1fr_0.9fr] sm:gap-8">
                  <h3 className="font-display text-lg leading-snug font-medium text-ink sm:text-xl">
                    {item.question}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft">
                    {item.context}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-12 rounded-2xl border border-peach-300/60 bg-gradient-to-b from-peach-100 to-white px-6 py-8 shadow-xs sm:px-10">
              <p className="font-display text-xl leading-snug text-brand-700 italic sm:text-2xl">
                A fifteen-minute reply to one of these questions shapes more
                of MaaSetu than a hundred feature requests.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3.5">
                <Button asChild size="lg">
                  <a
                    href={`mailto:${siteConfig.email}?subject=A%20doctor%27s%20perspective%20on%20MaaSetu`}
                  >
                    Share your perspective
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">See the intended services</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
