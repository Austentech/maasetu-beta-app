import { Approach } from "@/components/sections/approach";
import { AudienceEntry } from "@/components/sections/audience-entry";
import { ContactCta } from "@/components/sections/contact-cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Trust } from "@/components/sections/trust";

/**
 * The MaaSetu homepage — the editorial overview.
 *
 * Full pages live at their own routes (about, services, patients, doctors,
 * contact, privacy, terms); this page carries the narrative: what MaaSetu
 * is, how it intends to work, who it is for, and the honest status.
 *
 * Fully static, server-rendered content — no client data fetching, no
 * caching of private data (none exists in Phase 1). See
 * docs/ARCHITECTURE.md for the documented caching behaviour.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <HowItWorks />
      <AudienceEntry />
      <Trust />
      <Faq />
      <ContactCta />
    </>
  );
}
