import { Instagram, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

/**
 * Contact — real channels only: email and Instagram.
 * No invented address, phone number or office.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-canvas">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="rounded-3xl border border-peach-300/60 bg-gradient-to-b from-peach-100 to-white px-6 py-12 shadow-xs sm:px-12 lg:px-16 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                index="08"
                eyebrow="Contact"
                title={
                  <span id="contact-heading">Talk to the people behind MaaSetu</span>
                }
                lead="Questions, perspectives, partnerships — or simply wanting to know when we open. Every message reaches a human being who cares about this work."
              />
              <Reveal delay={0.1}>
                <div className="mt-9 flex flex-wrap items-center gap-3.5">
                  <Button asChild size="lg">
                    <a href={`mailto:${siteConfig.email}`}>
                      <Mail aria-hidden="true" />
                      {siteConfig.email}
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={siteConfig.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram aria-hidden="true" />
                      {siteConfig.instagram.handle}
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <p className="font-display border-l-2 border-brand-200 pl-6 text-xl leading-relaxed text-brand-700 italic sm:text-[1.35rem]">
                &ldquo;Especially if you are a doctor, clinic or laboratory —
                the earlier you join the conversation, the more of your
                reality ends up inside the platform.&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
