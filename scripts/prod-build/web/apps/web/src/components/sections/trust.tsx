import { HandHeart, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Trust, privacy and responsible healthcare.
 * Truthful commitments only — no unverified certifications or compliance
 * claims.
 */
const commitments = [
  {
    icon: ShieldCheck,
    title: "Sensitive by nature",
    body: "Pregnancy records, medical history and diagnostic reports are among the most personal information that exist. We treat them that way from the first line of code — not as a compliance afterthought.",
  },
  {
    icon: Lock,
    title: "Protected by design",
    body: "MaaSetu's architecture is being built around least-privilege access, role-based permissions and security at the database level, so information reaches only the people a mother intends it for.",
  },
  {
    icon: HandHeart,
    title: "Honest about status",
    body: "This website collects no patient data today. Our full Privacy Policy will be published before any personal or health information is ever collected — and it will be written to be understood, not just agreed to.",
  },
] as const;

export function Trust() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="bg-canvas">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          index="04"
          eyebrow="Trust & privacy"
          title={<span id="trust-heading">Care carries secrets. We carry them carefully.</span>}
          lead="A maternal health platform only deserves trust if it is honest about what it protects — and about what it does not yet claim to be."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {commitments.map((item, index) => (
            <Reveal key={item.title} delay={0.08 * index}>
              <article className="h-full rounded-2xl border border-line bg-white p-7 shadow-xs sm:p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <item.icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-sm text-ink-soft/85">
            Read where our{" "}
            <Link
              href="/privacy"
              className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
            >
              Privacy position
            </Link>{" "}
            stands today — including what we do not yet collect.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
