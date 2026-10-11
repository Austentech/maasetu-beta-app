import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * 404 — kept warm and honest: this bridge doesn't lead anywhere (yet).
 */
export default function NotFound() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:py-32">
        <p
          aria-hidden="true"
          className="font-display text-6xl leading-none font-light text-brand-200 sm:text-7xl"
        >
          404
        </p>
        <h1 className="font-display mt-6 max-w-xl text-3xl leading-[1.12] font-medium tracking-tight text-balance text-ink sm:text-4xl">
          This bridge doesn&apos;t lead anywhere yet
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
          The page you were looking for isn&apos;t here — it may have moved,
          or it may be part of what we are still building.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Button asChild size="lg">
            <Link href="/">
              Back to the homepage
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
