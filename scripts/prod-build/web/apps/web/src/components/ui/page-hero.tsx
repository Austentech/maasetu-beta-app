import { cn } from "@/lib/utils";

interface PageHeroProps {
  /** Short kicker above the title, e.g. "About MaaSetu". */
  eyebrow: string;
  title: React.ReactNode;
  /** Supporting lead paragraph — one or two sentences, no filler. */
  lead?: string;
  align?: "left" | "center";
  /** Extra content rendered below the lead (status pills, CTAs, meta). */
  children?: React.ReactNode;
  className?: string;
  /** Set when the page opens directly on the deep burgundy band. */
  tone?: "light" | "dark";
}

/**
 * Editorial opener for inner pages.
 *
 * Quieter than the homepage hero — an eyebrow, a display-serif title and a
 * lead — so each page begins with its own voice while sharing the site's
 * typographic system. Pages vary alignment and following sections to keep
 * their rhythm distinct.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  align = "left",
  children,
  className,
  tone = "light",
}: PageHeroProps) {
  const isDark = tone === "dark";
  const isCenter = align === "center";
  return (
    <section
      className={cn(
        "border-b border-line/70",
        isDark ? "bg-brand-700" : "bg-canvas",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 pt-16 pb-14 sm:px-6 sm:pt-20 lg:pt-24 lg:pb-16",
          className,
        )}
      >
        <div className={cn("max-w-3xl", isCenter && "mx-auto text-center")}>
          <p
            className={cn(
              "flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
              isCenter && "justify-center",
              isDark ? "text-peach-300" : "text-brand-500",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-px w-8",
                isDark ? "bg-white/25" : "bg-brand-200",
              )}
            />
            {eyebrow}
            {isCenter ? (
              <span aria-hidden="true" className="h-px w-8 bg-brand-200" />
            ) : null}
          </p>
          <h1
            className={cn(
              "font-display mt-5 text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]",
              isDark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h1>
          {lead ? (
            <p
              className={cn(
                "mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl",
                isCenter && "mx-auto",
                isDark ? "text-peach-200/90" : "text-ink-soft",
              )}
            >
              {lead}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
