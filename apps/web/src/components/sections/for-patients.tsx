import Image from "next/image";
import { Sparkle } from "lucide-react";

import { PatientLoginDialog } from "@/components/dialogs/notice-dialogs";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

/**
 * For patients — the intended experience, with an honest login entry point.
 */
const intentions = [
  "Her appointments, reports and guidance held in one calm place",
  "A pregnancy record shared with the people she chooses to trust",
  "Clear next steps after every visit, instead of anxious waiting",
] as const;

export function ForPatients() {
  return (
    <section
      id="for-patients"
      aria-labelledby="patients-heading"
      className="bg-canvas"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
        <div>
          <SectionHeading
            index="04"
            eyebrow="For patients"
            title={<span id="patients-heading">For every mother, a calmer journey</span>}
            lead="The patient experience is being designed around one idea: she should never have to carry the logistics of her own care alone."
          />

          <ul className="mt-8 space-y-4">
            {intentions.map((item, index) => (
              <Reveal key={item} delay={0.06 * index}>
                <li className="flex items-start gap-3.5 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                  <Sparkle
                    aria-hidden="true"
                    className="mt-1 size-3.5 shrink-0 text-brand-400"
                  />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <PatientLoginDialog
                trigger={<Button size="lg">Patient login</Button>}
              />
              <p className="text-sm text-ink-soft">
                Patient access will open at{" "}
                <span className="font-medium text-ink">
                  {siteConfig.subdomains.patients}
                </span>
                .
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <figure className="relative rounded-3xl border border-peach-300/60 bg-gradient-to-b from-peach-100 to-white px-8 py-12 text-center shadow-xs sm:px-12">
            <span className="inline-flex size-24 items-center justify-center rounded-full bg-white shadow-xs">
              <Image
                src="/brand/mark.png"
                alt=""
                width={72}
                height={55}
                className="h-auto w-auto"
              />
            </span>
            <blockquote className="font-display mt-8 text-2xl leading-snug font-medium text-brand-700 italic sm:text-[1.6rem]">
              &ldquo;The quiet promise we are building towards: care that
              arrives on time, information that makes sense, and a journey
              that feels held.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-ink-soft/85">
              The intended patient experience — described as a direction, not
              yet as a delivered product.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
