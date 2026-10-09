import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { ForDoctors } from "@/components/sections/for-doctors";
import { ForPatients } from "@/components/sections/for-patients";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Trust } from "@/components/sections/trust";

/**
 * The MaaSetu public homepage.
 *
 * Fully static, server-rendered content — no client data fetching, no
 * caching of private data (none exists in Phase 1). See
 * docs/ARCHITECTURE.md for the documented caching behaviour.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Approach />
      <HowItWorks />
      <ForPatients />
      <ForDoctors />
      <Trust />
      <Faq />
      <Contact />
    </>
  );
}
