import { Check } from "lucide-react";

import { DoctorLoginDialog } from "@/components/dialogs/notice-dialogs";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

/**
 * For doctors — the intended professional experience.
 * The deep burgundy band gives this section its own register: calm,
 * credible, professional.
 */
const intentions = [
  "Structured patient context before every consultation",
  "Follow-ups that hold — organised instead of scattered across phone calls",
  "Coordination with diagnostic labs and your own staff in one place",
] as const;

export function ForDoctors() {
  return (
    <section
      id="for-doctors"
      aria-labelledby="doctors-heading"
      className="bg-brand-700"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-28">
        <div>
          <SectionHeading
            tone="dark"
            index="05"
            eyebrow="For doctors & providers"
            title={<span id="doctors-heading">For doctors, a clearer picture</span>}
            lead="MaaSetu is being shaped with healthcare professionals — designed to reduce the coordination load that sits between good intentions and good outcomes."
          />

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
                <a href={`mailto:${siteConfig.email}?subject=Joining%20MaaSetu%20as%20a%20healthcare%20professional`}>
                  Partner with us
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-peach-200/70">
              Doctors&apos; tools will live at{" "}
              <span className="font-medium text-peach-200">
                {siteConfig.subdomains.doctors}
              </span>
              .
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
  );
}
