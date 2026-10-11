import Link from "next/link";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Slim closing band on the homepage — routes the conversation to the
 * contact page rather than duplicating it.
 */
export function ContactCta() {
  return (
    <section aria-labelledby="home-contact-heading" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:pb-28">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-peach-300/60 bg-gradient-to-b from-peach-100 to-white px-6 py-10 shadow-xs sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
            <div>
              <h2
                id="home-contact-heading"
                className="font-display text-2xl leading-snug font-medium text-ink sm:text-[1.7rem]"
              >
                Talk to the people behind MaaSetu
              </h2>
              <p className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:text-base">
                Questions, perspectives, partnerships — or simply wanting to
                know when we open. Every message reaches a human being.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/contact">
                <Mail aria-hidden="true" />
                Contact us
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
