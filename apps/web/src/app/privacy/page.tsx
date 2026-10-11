import type { Metadata } from "next";
import Link from "next/link";

import { LegalIntro, LegalSection } from "@/components/layout/legal";
import { ogImage, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Where MaaSetu stands on privacy today: this website collects no personal data, uses no analytics or tracking, and our full Privacy Policy will be published before any personal or health information is ever collected.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy — an honest position",
    description:
      "What this website collects (nothing), what we commit to never doing, and how we intend to protect health data when the platform opens.",
    url: "/privacy",
    images: [ogImage],
  },
};

/**
 * Privacy — written for the current stage.
 *
 * Facts stated here reflect the actual implementation: a static public
 * website with no accounts, no forms, no analytics and no cookies. No
 * certifications or compliance statuses are claimed, because none have
 * been obtained.
 */
export default function PrivacyPage() {
  return (
    <>
      <LegalIntro
        eyebrow="Privacy"
        title="Privacy, stated plainly"
        updated="11 October 2026"
        summary="This page describes our actual position today — not a policy written to sound impressive. The full Privacy Policy will be published before MaaSetu collects any personal or health information, and it will be written to be understood, not just agreed to."
      />

      <div className="bg-white">
        <LegalSection id="today" number="01" title="Where we stand today">
          <p>
            MaaSetu is currently a public website introducing a platform
            that is still being built. That shapes everything about privacy
            at this stage, and we would rather state the specifics than
            generalities:
          </p>
          <ul className="list-disc space-y-2.5 pl-5">
            <li>
              This website has no accounts, no forms and no sign-ups — there
              is nothing to register for yet.
            </li>
            <li>
              It sets no cookies and runs no analytics, advertising or
              tracking of any kind.
            </li>
            <li>
              It does not collect, store or process personal or health
              information.
            </li>
            <li>
              Emails you send us are held in our mailbox, read by a person,
              and never used for marketing lists.
            </li>
          </ul>
          <p>
            If any of this changes — if we ever add so much as a measurement
            tool — this page will say so before the change goes live.
          </p>
        </LegalSection>

        <LegalSection id="infrastructure" number="02" title="What infrastructure may keep">
          <p>
            Like essentially every website, the servers that deliver these
            pages handle requests, and hosting infrastructure commonly keeps
            short-lived technical logs (such as an IP address and a
            timestamp) to protect against abuse and to operate the service.
          </p>
          <p>
            We do not use such logs to profile or identify visitors, and we
            do not link them to anything else — there is nothing else to
            link them to, because the website collects nothing.
          </p>
        </LegalSection>

        <LegalSection id="never" number="03" title="What we commit to never doing">
          <p>
            Some things we are happy to rule out permanently, at any stage
            of this company:
          </p>
          <ul className="list-disc space-y-2.5 pl-5">
            <li>Selling or renting anyone&apos;s data — to anyone, ever.</li>
            <li>
              Using a mother&apos;s pregnancy or health information for
              advertising, in any form.
            </li>
            <li>
              Sharing health information with anyone a mother has not
              chosen to share it with.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="future" number="04" title="When the platform opens">
          <p>
            The platform we are building will handle pregnancy records and
            health information — among the most sensitive data that exist.
            Our design approach, already reflected in the architecture being
            built, is:
          </p>
          <ul className="list-disc space-y-2.5 pl-5">
            <li>
              Least-privilege access: every role — patient, doctor, staff,
              lab — sees only what its work requires, enforced at the
              database level rather than only in the interface.
            </li>
            <li>
              Consent-based sharing: a mother decides who is part of her
              care circle, and can change that decision.
            </li>
            <li>
              The full Privacy Policy published — and linked from every
              sign-up screen — before the first piece of personal
              information is ever collected.
            </li>
          </ul>
          <p>
            We make no claims of certifications or compliance statuses we
            have not obtained. When there is something real to report, it
            will appear here plainly.
          </p>
        </LegalSection>

        <LegalSection id="contact" number="05" title="Questions about privacy">
          <p>
            If anything on this page is unclear or you disagree with it, we
            would genuinely like to hear that — privacy wording that only a
            lawyer can parse is a design failure. Write to{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
            >
              {siteConfig.email}
            </a>
            .
          </p>
          <p>
            Related reading: our{" "}
            <Link
              href="/terms"
              className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
            >
              Terms
            </Link>{" "}
            for this website, and how we describe{" "}
            <Link
              href="/about"
              className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
            >
              what MaaSetu is today
            </Link>
            .
          </p>
        </LegalSection>
      </div>
    </>
  );
}
