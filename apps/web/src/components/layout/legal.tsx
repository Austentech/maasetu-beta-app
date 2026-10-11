import { Breadcrumb } from "@/components/ui/breadcrumb";

interface LegalIntroProps {
  eyebrow: string;
  title: string;
  /** e.g. "11 October 2026" — the date this page was last reviewed. */
  updated: string;
  /** One honest sentence about what this page is and is not. */
  summary: string;
}

/**
 * Opening band shared by the legal-information pages (privacy, terms).
 *
 * These pages are written for the current product stage: a public website
 * with no accounts and no collected data. They describe an honest position
 * — they do not pretend to be lawyer-reviewed policies, and they claim no
 * certifications or compliance statuses.
 */
export function LegalIntro({ eyebrow, title, updated, summary }: LegalIntroProps) {
  return (
    <section className="border-b border-line/70 bg-canvas">
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14 lg:pt-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: eyebrow }]} />
        <h1 className="font-display mt-6 max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-balance text-ink sm:text-5xl">
          {title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
          <p>
            <span className="font-medium text-ink">Last updated:</span>{" "}
            {updated}
          </p>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {summary}
        </p>
      </div>
    </section>
  );
}

interface LegalSectionProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}

/** One numbered section within a legal page. */
export function LegalSection({ id, number, title, children }: LegalSectionProps) {
  return (
    <section aria-labelledby={id} className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[10rem_1fr] lg:gap-12">
        <h2
          id={id}
          className="flex items-baseline gap-3 text-sm font-semibold tracking-[0.18em] text-brand-500 uppercase lg:sticky lg:top-24 lg:self-start lg:justify-start"
        >
          <span aria-hidden="true" className="font-display text-brand-300 italic">
            {number}
          </span>
          {title}
        </h2>
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          {children}
        </div>
      </div>
    </section>
  );
}
