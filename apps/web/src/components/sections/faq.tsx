import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

/**
 * FAQ — five questions with answers that reflect the real implementation
 * and launch status.
 */
const faqs = [
  {
    question: "What is MaaSetu?",
    answer:
      "MaaSetu is a maternal healthcare platform for India, currently in development. The name means \u201Ca mother\u2019s bridge\u201D. It is being built to connect expectant mothers with trusted doctors, organised diagnostics and reliable pregnancy guidance, so care holds together across the whole journey. Today, what exists is this website and the engineering behind it — the platform itself is not open yet, and we would rather say that plainly.",
  },
  {
    question: "Who is MaaSetu for?",
    answer:
      "Three groups, in this order of loyalty: expectant mothers and the families around them; doctors, clinics and their staff who care for them; and diagnostic laboratories whose reports shape decisions during pregnancy. Later phases will add administration panels for the teams operating the platform.",
  },
  {
    question: "How can patients use MaaSetu?",
    answer:
      "Today, honestly: by reading, understanding and remembering it exists. No accounts are open and no medical information is collected anywhere on this website. When the platform launches, patients will register and sign in at maa.maasetu.in, and access will open in phases so that the experience is genuinely ready when it arrives.",
  },
  {
    question: "How can doctors connect with MaaSetu?",
    answer:
      "By writing to us. The doctors\u2019 portal — with tools for patient context, follow-ups and coordination with labs — will live at doctors.maasetu.in once it opens. Until then, the most useful thing a doctor, clinic or laboratory can do is share how they actually work, so we build for the reality of Indian practice rather than for an imagined one.",
  },
  {
    question: "When will the platform become available?",
    answer:
      "When it is genuinely ready — and not before. We have deliberately not announced a launch date. MaaSetu will roll out in carefully controlled phases, beginning with the foundations you can see being laid here. The most reliable way to hear first is to follow @joinmaasetu on Instagram or write to us by email.",
  },
] as const;

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-28">
        <div>
          <SectionHeading
            index="07"
            eyebrow="Questions"
            title={<span id="faq-heading">Frequently asked, honestly answered</span>}
            lead="Everything you might reasonably want to know about what MaaSetu is today — and what it is not."
          />
          <Reveal delay={0.1}>
            <p className="mt-8 text-[15px] leading-relaxed text-ink-soft">
              Something else on your mind? Write to{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-brand-500 underline underline-offset-4 hover:text-brand-600"
              >
                {siteConfig.email}
              </a>{" "}
              — we read every message.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-line"
              >
                <AccordionTrigger className="font-display gap-6 rounded-lg py-5 text-left text-lg font-medium text-ink hover:no-underline focus-visible:no-underline sm:text-xl [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-brand-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[15px] leading-relaxed text-ink-soft">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
