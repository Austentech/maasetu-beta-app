import type { Metadata } from "next";
import Link from "next/link";

import { LegalIntro, LegalSection } from "@/components/layout/legal";
import { ogImage, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms that apply to the MaaSetu website today: what it is, what it is not, and how the fuller terms for the future platform will arrive before any service does.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms — for the website as it stands",
    description:
      "Honest terms for an honest website: no medical services, no advice, and no pretending a product exists before it does.",
    url: "/terms",
    images: [ogImage],
  },
};

/**
 * Terms — written for the current stage.
 *
 * These terms describe the public website as it actually is: an
 * introduction to a platform in development. They deliberately do not
 * invent binding policies for services that do not exist yet, and they
 * claim no legal review that has not occurred.
 */
export default function TermsPage() {
  return (
    <>
      <LegalIntro
        eyebrow="Terms"
        title="Terms, matched to reality"
        updated="11 October 2026"
        summary="These terms govern the public website you are reading. When the MaaSetu platform itself opens, it will arrive with its own complete terms — presented to you before any account exists — because a service deserves terms written for what it actually does."
      />

      <div className="bg-white">
        <LegalSection id="the-website" number="01" title="What this website is">
          <p>
            This website introduces MaaSetu, a maternal healthcare platform
            currently in development in India. It exists to explain honestly
            what is being built — and, just as deliberately, what does not
            exist yet.
          </p>
          <ul className="list-disc space-y-2.5 pl-5">
            <li>
              The website is informational. It offers no medical services,
              no consultations, no bookings and no diagnostic services.
            </li>
            <li>
              Nothing on it constitutes medical advice, and no
              doctor–patient relationship is created by reading it or
              contacting us.
            </li>
            <li>
              It is not an emergency service. If you need urgent medical
              help, contact your doctor or local emergency services
              directly.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="honesty" number="02" title="A note on how we describe things">
          <p>
            You will notice this website says &ldquo;in development&rdquo;
            often. That is deliberate. Planned capabilities are described as
            intentions, not as features — and availability will be
            announced plainly, phase by phase, when it is genuinely ready.
          </p>
          <p>
            Descriptions of future services are our current design
            direction. They may evolve as the platform is built with input
            from doctors, laboratories and mothers, and they are not a
            promise of specific functionality by a specific date.
          </p>
        </LegalSection>

        <LegalSection id="use" number="03" title="Using this website">
          <p>
            You are welcome to read, share and link to this website. Please
            do not misrepresent what it says — particularly around what
            MaaSetu currently is — and please do not attempt to disrupt its
            operation or probe its infrastructure.
          </p>
          <p>
            The MaaSetu name, logo and the written and illustrated content
            of this website belong to the project. If you wish to use
            something beyond quoting it with attribution, write to us
            first.
          </p>
        </LegalSection>

        <LegalSection id="future" number="04" title="When the platform opens">
          <p>
            The applications and services of the MaaSetu platform — patient
            access, doctors&apos; tools, laboratory coordination — will be
            governed by complete terms presented before you create any
            account or use any service.
          </p>
          <p>
            Those future terms will matter far more than this page, because
            they will cover the things that truly need governing: health
            information, professional responsibilities and the commitments
            each side makes. They will be written with the same preference
            for plain language you see here.
          </p>
        </LegalSection>

        <LegalSection id="contact" number="05" title="Contact">
          <p>
            Questions about these terms — or disagreement with their
            wording — are welcome at{" "}
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
              href="/privacy"
              className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
            >
              Privacy position
            </Link>
            .
          </p>
        </LegalSection>
      </div>
    </>
  );
}
