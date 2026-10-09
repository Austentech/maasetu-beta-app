import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Editorial section number, e.g. "01". */
  index: string;
  /** Short kicker above the title. */
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  /** Set when rendered on the deep burgundy band. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Consistent editorial heading block used by every homepage section:
 * numbered eyebrow → display-serif title → muted lead paragraph.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
          align === "center" && "justify-center",
          isDark ? "text-peach-300" : "text-brand-500",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "font-display text-sm italic",
            isDark ? "text-white/50" : "text-brand-300",
          )}
        >
          {index}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8",
            isDark ? "bg-white/25" : "bg-brand-200",
          )}
        />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display mt-5 text-3xl leading-[1.12] font-medium tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          isDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            isDark ? "text-peach-200/90" : "text-ink-soft",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
