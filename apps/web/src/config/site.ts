/**
 * MaaSetu brand and site configuration.
 *
 * Single source of truth for identity, contact channels, navigation and the
 * future subdomain map (see docs/ARCHITECTURE.md for the domain strategy).
 */
export const siteConfig = {
  name: "MaaSetu",
  tagline: "Because Every Mother Matters",
  url: "https://www.maasetu.in",
  description:
    "MaaSetu is a maternal healthcare platform in development, built to connect expectant mothers with trusted doctors, organised diagnostics and reliable pregnancy guidance — one coordinated journey.",
  email: "maasetu.app@gmail.com",
  instagram: {
    handle: "@joinmaasetu",
    url: "https://www.instagram.com/joinmaasetu",
  },
  /** Future application subdomains — intentionally not linked as live services yet. */
  subdomains: {
    patients: "maa.maasetu.in",
    doctors: "doctors.maasetu.in",
    labs: "labs.maasetu.in",
    subAdmin: "sub-admin.maasetu.in",
    superAdmin: "sup-admin.maasetu.in",
  },
} as const;

export const mainNav = [
  { label: "About", href: "/#about" },
  { label: "Our approach", href: "/#approach" },
  { label: "For patients", href: "/#for-patients" },
  { label: "For doctors", href: "/#for-doctors" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Section ids observed by the mobile bottom navigation. */
export const mobileNav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "approach", label: "Approach" },
  { id: "for-patients", label: "Patients" },
  { id: "for-doctors", label: "Doctors" },
] as const;
