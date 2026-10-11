import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Mark height in pixels — the wordmark is scaled optically to match. */
  markHeight?: number;
  /** Mark as the priority image (header/footer, above the fold). */
  priority?: boolean;
}

/**
 * The MaaSetu logo lockup: pictorial mark + wordmark.
 *
 * Assets are generated from the owner-supplied originals by
 * scripts/process_brand_assets.py — the artwork is never redrawn.
 */
export function Logo({ className, markHeight = 36, priority = false }: LogoProps) {
  // Web-sized sources: mark.png is 512x390, wordmark.png 512x123 (aspect
  // 4.16) — resized from the owner-supplied originals by
  // scripts/process_about_asset.py so the image optimizer no longer
  // processes a 2000px file for a ~34px header mark.
  const markWidth = Math.round((markHeight * 512) / 390);
  const wordmarkHeight = Math.round(markHeight * 0.66);
  const wordmarkWidth = Math.round((wordmarkHeight * 512) / 123);

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/mark.png"
        alt=""
        width={markWidth}
        height={markHeight}
        priority={priority}
        className="h-auto w-auto"
      />
      <Image
        src="/brand/wordmark.png"
        alt="MaaSetu"
        width={wordmarkWidth}
        height={wordmarkHeight}
        priority={priority}
        className="h-auto w-auto"
      />
    </span>
  );
}
