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

/** Shared Open Graph image (1200x630, generated via scripts/og-image.html). */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "MaaSetu — a mother's bridge. Because Every Mother Matters.",
} as const;

/** Primary navigation — real routes, shared by the header and the footer. */
export const mainNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "For patients", href: "/patients" },
  { label: "For doctors", href: "/doctors" },
  { label: "Contact", href: "/contact" },
] as const;

/** Bottom navigation for phone and tablet widths — public pages only. */
export const mobileNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Patients", href: "/patients" },
  { label: "Doctors", href: "/doctors" },
] as const;

/** Public routes for the sitemap. */
export const publicRoutes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/patients", priority: 0.9 },
  { path: "/doctors", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
] as const;
