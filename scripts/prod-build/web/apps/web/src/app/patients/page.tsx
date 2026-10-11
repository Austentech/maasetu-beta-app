import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpenText,
  CalendarCheck,
  FolderHeart,
  UserRoundSearch,
} from "lucide-react";

import { PatientLoginDialog } from "@/components/dialogs/notice-dialogs";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ogImage, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "For patients",
  description:
    "The patient experience MaaSetu is designing: one organised journey around the mother — finding the right doctor, one record of the pregnancy, clear next steps and guidance she can trust. Not live yet; described honestly.",
  alternates: { canonical: "/patients" },
  openGraph: {
    title: "For patients",
    description:
      "What we are building for expectant mothers — and an honest account of what exists today.",
    url: "/patients",
    images: [ogImage],
  },
};

const designBlocks = [
  {
    icon: UserRoundSearch,
    title: "Finding the right doctor",
    body: "Choosing a doctor is one of the first anxious decisions of a pregnancy. We intend finding and connecting with the right gynaecologist to be a clear, considered process — not word-of-mouth luck at a family gathering.",
  },
  {
    icon: FolderHeart,
    title: "One record of her pregnancy",
    body: "Her visits, reports and guidance held in one calm place — a record that belongs to her, that she chooses whom to share it with, and that doesn't live in a plastic folder or a phone gallery of photographs.",
  },
  {
    icon: CalendarCheck,
    title: "Next steps, not anxious waiting",
    body: "After every visit, what happens next should be written down, scheduled and remindable — not remembered differently by three family members, and not discovered only when something has already gone quiet.",
  },
  {
    icon: BookOpenText,
    title: "Guidance she can trust",
    body: "Information matched to the stage she is in, written in plain language and curated rather than scraped — so a worry at midnight doesn't have to end in a search-engine spiral.",
  },
] as const;

/**
 * For patients — the intended experience with an honest account of the
 * current status and an honest login entry point (no fake sign-in).
 */
export default function PatientsPage() {
  return (
    <>
      <PageHero
        align="center"
        eyebrow="For patients"
        title="For every mother, a calmer journey"
        lead="The patient experience is being designed around one idea: she should never have to carry the logistics of her own care alone."
      />

      {/* What we are designing for her */}
      <section aria-labelledby="designing-heading" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <p className="flex items-center justify-center gap-3 text-center text-xs font-semibold tracking-[0.22em] text-brand-500 uppercase">
              <span aria-hidden="true" className="font-display text-sm text-brand-300 italic">
                01
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
              <span id="designing-heading">What we are designing for her</span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
            </p>
          </Reveal>

          <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {designBlocks.map((block, index) => (
              <Reveal key={block.title} delay={0.05 * index}>
                <article className="flex gap-5">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                    <block.icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-snug font-medium text-ink sm:text-xl">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                      {block.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The promise we are building towards + honest status */}
      <section aria-labelledby="status-heading" className="bg-canvas">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16 lg:py-20">
          <Reveal>
            <figure className="relative rounded-3xl border border-peach-300/60 bg-gradient-to-b from-peach-100 to-white px-8 py-12 text-center shadow-xs sm:px-10">
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
                The intended patient experience — described as a direction,
                not yet as a delivered product.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id="status-heading"
              className="font-display text-3xl leading-[1.12] font-medium tracking-tight text-balance text-ink sm:text-4xl"
            >
              Where patient access stands today
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              Nothing on this page is a live service. There are no accounts,
              no bookings and no data being collected — and we would rather
              tell you that plainly than show you a beautiful app that leads
              nowhere.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              When the platform opens, patients will sign in securely at{" "}
              <span className="font-medium text-ink">
                {siteConfig.subdomains.patients}
              </span>{" "}
              — with access opening in phases, so the experience is genuinely
              ready when it reaches you. In the meantime, follow{" "}
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
              >
                {siteConfig.instagram.handle}
              </a>{" "}
              or write to us — we read every message.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <PatientLoginDialog
                trigger={<Button size="lg">Patient login</Button>}
              />
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
            <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
              This website never asks for medical information.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
