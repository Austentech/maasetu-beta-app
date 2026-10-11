import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Instagram, Mail, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ogImage, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the people building MaaSetu — by email or Instagram — for questions, partnerships, or a doctor's perspective on what we are building.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact MaaSetu",
    description:
      "Every message reaches a human being who cares about this work.",
    url: "/contact",
    images: [ogImage],
  },
};

const notes = [
  {
    icon: ShieldAlert,
    title: "Please leave medical details out",
    body: "This website is not a medical service and no one on the other end can give clinical advice. If you are pregnant and worried about something, please contact your doctor or an emergency service — not our inbox.",
  },
  {
    icon: Mail,
    title: "Why there is no contact form",
    body: "A form would simply email us on your behalf. We would rather you write directly — you keep a copy, you control what you share, and nothing sits in a system that doesn't need to exist yet.",
  },
] as const;

const routes = [
  {
    audience: "Doctors, clinics & laboratories",
    action: "Shape what we build",
    body: "Tell us how care coordination actually breaks down in your practice — your reality is our design brief.",
    href: `mailto:${siteConfig.email}?subject=A%20doctor%27s%20perspective%20on%20MaaSetu`,
    external: false,
  },
  {
    audience: "Press & partnerships",
    action: "Write to us directly",
    body: "For interviews, collaborations or anything else a genuine subject line makes it easier to route well.",
    href: `mailto:${siteConfig.email}?subject=Press%20or%20partnership%20enquiry`,
    external: false,
  },
  {
    audience: "Everyone else",
    action: "Follow the journey",
    body: "We share honest progress on Instagram as the platform takes shape — no launch-date countdowns, no hype.",
    href: siteConfig.instagram.url,
    external: true,
  },
] as const;

/**
 * Contact — real channels only: email and Instagram.
 *
 * There is no form because there is no backend endpoint for one yet (the
 * NestJS API currently exposes only its health check) — a mailto is the
 * truthful option, and this page says so plainly.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the people behind MaaSetu"
        lead="Questions, perspectives, partnerships — or simply wanting to know when we open. Every message reaches a human being who cares about this work."
      />

      {/* The two real channels */}
      <section aria-labelledby="channels-heading" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 lg:pt-20">
          <h2 id="channels-heading" className="sr-only">
            Ways to reach us
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-canvas p-7 shadow-xs transition-shadow hover:shadow-md sm:p-9"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Mail aria-hidden="true" className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-2xl font-medium text-ink">
                  Email us
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  The most direct way — for questions, perspectives,
                  partnerships or anything else. We read every message.
                </p>
                <p className="mt-5 inline-flex items-center gap-2 font-medium text-brand-500 transition-colors group-hover:text-brand-600">
                  {siteConfig.email}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </p>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-line bg-canvas p-7 shadow-xs transition-shadow hover:shadow-md sm:p-9"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Instagram aria-hidden="true" className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-2xl font-medium text-ink">
                  Follow along
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  Where we share honest progress as the platform takes shape
                  — the good weeks and the hard ones.
                </p>
                <p className="mt-5 inline-flex items-center gap-2 font-medium text-brand-500 transition-colors group-hover:text-brand-600">
                  {siteConfig.instagram.handle}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Things worth knowing before you write */}
      <section aria-labelledby="notes-heading" className="bg-canvas">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-500 uppercase">
              <span aria-hidden="true" className="font-display text-sm text-brand-300 italic">
                01
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
              <span id="notes-heading">Worth knowing before you write</span>
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {notes.map((note, index) => (
              <Reveal key={note.title} delay={0.06 * index}>
                <article className="h-full rounded-2xl border border-line bg-white p-7 shadow-xs sm:p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                    <note.icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display mt-4 text-xl font-medium text-ink">
                    {note.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {note.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Route your message well */}
      <section aria-labelledby="routes-heading" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:pb-24">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-500 uppercase">
              <span aria-hidden="true" className="font-display text-sm text-brand-300 italic">
                02
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
              <span id="routes-heading">Route your message well</span>
            </p>
          </Reveal>
          <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-canvas">
            {routes.map((route, index) => (
              <Reveal key={route.audience} delay={0.04 * index}>
                <div className="grid gap-3 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:p-7">
                  <p className="text-sm font-semibold tracking-wide text-brand-700">
                    {route.audience}
                  </p>
                  <p className="text-[15px] leading-relaxed text-ink-soft">
                    {route.body}
                  </p>
                  {route.external ? (
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={route.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {route.action}
                      </a>
                    </Button>
                  ) : (
                    <Button asChild size="sm" variant="outline">
                      <a href={route.href}>{route.action}</a>
                    </Button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 text-sm leading-relaxed text-ink-soft/90">
              Looking for our{" "}
              <Link
                href="/privacy"
                className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
              >
                privacy position
              </Link>{" "}
              or what{" "}
              <Link
                href="/services"
                className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
              >
                we are building
              </Link>
              ? Both pages say exactly where things stand.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
