import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * How MaaSetu works — three honest steps that reflect the actual status:
 * discover now, connect when access opens, coordinate once live.
 */
const steps = [
  {
    number: "01",
    title: "Discover",
    body: "Get to know MaaSetu — what we are building, and how it fits your pregnancy or your practice. Right now, that is all this website offers, and that is deliberate.",
  },
  {
    number: "02",
    title: "Connect",
    body: "When access opens in phases, create your account and link up with the doctors, staff and diagnostic labs in your care journey.",
  },
  {
    number: "03",
    title: "Coordinate",
    body: "Plan visits, follow-ups and reports around one calm, connected record of the pregnancy — for the mother, her doctors and her labs.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          index="03"
          eyebrow="How MaaSetu works"
          title={<span id="how-heading">Three steps, taken in the right order</span>}
          lead="We are not open for bookings or consultations yet. When we are, this is how the journey will flow."
        />

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={0.09 * index}>
              <article className="relative">
                <p
                  aria-hidden="true"
                  className="font-display text-5xl leading-none font-light text-brand-200 sm:text-6xl"
                >
                  {step.number}
                </p>
                <h3 className="font-display mt-4 text-xl font-medium text-ink sm:text-[1.3rem]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-6 block h-px w-10 bg-brand-200"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
