import type { Metadata } from "next";
import Link from "next/link";

import { ogImage } from "@/config/site";
import { ArrowRight, CircleCheck } from "lucide-react";

import { HeroVisual } from "@/components/brand/hero-visual";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why MaaSetu exists: the gap between mothers and coordinated pregnancy care in India, the values guiding how we build, and an honest account of where the project stands today.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About MaaSetu",
    description:
      "The story, the values and the honest status of the maternal healthcare platform being built for India.",
    url: "/about",
    images: [ogImage],
  },
};

const values = [
  {
    number: "01",
    title: "Dignity first",
    body: "A pregnancy is not a case file. Every design decision starts from how a mother — tired, hopeful, sometimes afraid — will actually feel using it. If a screen makes her feel processed rather than cared for, it is wrong, no matter how efficient it is.",
  },
  {
    number: "02",
    title: "Honesty over hype",
    body: "We will not announce features as live before they exist, publish numbers we have not measured, or borrow trust we have not earned. This website says plainly what MaaSetu is today, because a healthcare platform that exaggerates is dangerous, not just untrustworthy.",
  },
  {
    number: "03",
    title: "Coordination is care",
    body: "Most pregnancy harm in well-served cities comes from things falling between people — a report that never reached the doctor, a follow-up that depended on memory. MaaSetu exists to hold those seams together, so the medicine can do its work.",
  },
  {
    number: "04",
    title: "Privacy is the floor",
    body: "Reproductive and pregnancy data is among the most sensitive information a person carries. We treat protection as a design constraint from the first line of code — least-privilege access, roles that only see what they must — not as a policy bolted on before launch.",
  },
] as const;

const statusPoints = [
  "This public website is live — an honest introduction, not a product demo.",
  "The platform itself is in active development; no accounts exist yet and none can be created.",
  "Doctors, clinics and laboratories are being consulted while the care model is designed.",
  "No patient data is collected anywhere on this website.",
] as const;

/**
 * About MaaSetu — the mission story, values and honest current status.
 *
 * The pregnant-mother illustration below was the original homepage visual;
 * it now opens this page's story (see docs/IMPLEMENTATION_LOG.md).
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MaaSetu"
        title="A bridge between mothers and care"
        lead="MaaSetu is being built for one of the most under-supported journeys in Indian life: pregnancy. Here is why we started, what we believe, and where we honestly stand today."
      />

      {/* The story — editorial prose beside the original mother illustration */}
      <section aria-labelledby="story-heading" className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
          <div className="space-y-6 text-base leading-relaxed text-ink-soft sm:text-[17px]">
            <h2 id="story-heading" className="sr-only">
              The story of MaaSetu
            </h2>
            <Reveal>
              <p>
                Pregnancy in India is often a story of love surrounded by
                friction. A mother may see one doctor at a clinic, another at
                a hospital, hand paper notes from one to the next, wait days
                for reports, and piece together advice from well-meaning
                relatives and search engines. Every family improvises its own
                system — and the weakest link is always the mother&apos;s
                peace of mind.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                The friction is rarely about the medicine itself. India has
                skilled obstetricians, capable laboratories and hospitals
                that function under enormous load. What is missing is the
                connective tissue between them: a way for the doctor, the
                lab, the guidance and the family to sit around one organised
                picture of the pregnancy instead of dozens of fragments.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p>
                MaaSetu exists for that gap. We are building a platform where
                pregnancy care is coordinated — where the doctor, the
                laboratory and the guidance a mother needs are connected
                around her journey, so she spends less energy managing
                healthcare and more on the life growing inside her.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                We are building carefully rather than quickly, with doctors
                and healthcare professionals involved in shaping what
                patients will actually experience. Today MaaSetu is a work
                in progress — and this page exists to say that plainly.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <HeroVisual className="mx-auto w-full max-w-[26rem] lg:max-w-[30rem]" />
          </Reveal>
        </div>
      </section>

      {/* The name — full-width burgundy band */}
      <section aria-labelledby="name-heading" className="bg-brand-700">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 id="name-heading" className="sr-only">
            What the name MaaSetu means
          </h2>
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-3xl leading-tight font-light text-white sm:text-4xl lg:text-[2.9rem]">
              Maa — mother. Setu — bridge.
            </blockquote>
            <figcaption className="mt-5 text-[15px] leading-relaxed text-peach-200/85 sm:text-base">
              The name holds our whole purpose: to stand between a mother and
              everything that should already have reached her.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Values — numbered editorial rows */}
      <section aria-labelledby="values-heading" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-500 uppercase">
              <span aria-hidden="true" className="font-display text-sm text-brand-300 italic">
                02
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
              What we believe
            </p>
            <h2
              id="values-heading"
              className="font-display mt-5 max-w-2xl text-3xl leading-[1.12] font-medium tracking-tight text-balance text-ink sm:text-4xl"
            >
              Four commitments we build by
            </h2>
          </Reveal>

          <div className="mt-10 border-t border-line">
            {values.map((value, index) => (
              <Reveal key={value.number} delay={0.05 * index}>
                <article className="grid gap-4 border-b border-line py-8 sm:grid-cols-[auto_1fr] sm:gap-8 lg:grid-cols-[6rem_18rem_1fr] lg:gap-10">
                  <p
                    aria-hidden="true"
                    className="font-display text-lg text-brand-300 italic"
                  >
                    {value.number}
                  </p>
                  <h3 className="font-display text-xl leading-snug font-medium text-ink sm:text-[1.3rem]">
                    {value.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft lg:mt-0.5">
                    {value.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where we stand — an honest status panel */}
      <section aria-labelledby="status-heading" className="bg-canvas">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <h2
                id="status-heading"
                className="font-display text-3xl leading-[1.12] font-medium tracking-tight text-balance text-ink sm:text-4xl"
              >
                Where we stand today
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                A young healthcare platform earns trust by saying exactly
                what it is. Ours is a website, an engineering foundation, and
                a care model still being shaped with the profession that will
                use it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4 rounded-2xl border border-line bg-white p-7 shadow-xs sm:p-8">
                {statusPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3.5 text-[15px] leading-relaxed text-ink-soft"
                  >
                    <CircleCheck
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-brand-400"
                      strokeWidth={1.8}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section aria-label="Next steps" className="border-t border-line bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:py-16">
          <p className="font-display max-w-xl text-xl leading-snug text-brand-700 italic sm:text-2xl">
            See how we intend care to work — or ask us anything directly.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Button asChild size="lg" variant="outline">
              <Link href="/services">
                Our intended services
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
