import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * About MaaSetu — mission, the problem being addressed, and the meaning
 * of the name. Deliberately free of unproven outcome or impact claims.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              index="01"
              eyebrow="About MaaSetu"
              title={
                <span id="about-heading">A bridge between mothers and care</span>
              }
            />
            <Reveal delay={0.1}>
              <figure className="mt-8 rounded-2xl border border-line bg-canvas px-6 py-6 sm:px-8">
                <blockquote className="font-display text-xl leading-snug text-brand-700 italic sm:text-2xl">
                  Maa — mother. Setu — bridge.
                </blockquote>
                <figcaption className="mt-3 text-sm text-ink-soft/85">
                  The name holds our whole purpose: to stand between a mother
                  and everything that should already have reached her.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-ink-soft sm:text-[17px]">
            <Reveal delay={0.05}>
              <p>
                Pregnancy in India is often a story of love surrounded by
                friction. A mother may see one doctor at a clinic, another at a
                hospital, hand paper notes from one to the next, wait days for
                reports, and piece together advice from well-meaning relatives
                and search engines. Every family improvises its own system —
                and the weakest link is always the mother&apos;s peace of mind.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                MaaSetu exists for that gap. We are building a platform where
                pregnancy care is coordinated: where the doctor, the
                laboratory and the guidance a mother needs are connected
                around her journey — so she spends less energy managing
                healthcare and more on the life growing inside her.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                We are building carefully rather than quickly, with doctors
                and healthcare professionals involved in shaping what patients
                will actually experience. Today MaaSetu is a work in progress —
                this website exists to introduce the idea plainly, not to
                promise what we have not yet delivered.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
