import Link from "next/link";
import { Stethoscope, UserRound } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import {
  DoctorLoginDialog,
  PatientLoginDialog,
} from "@/components/dialogs/notice-dialogs";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/config/site";

/**
 * Sticky site header.
 *
 * Desktop (lg+): logo · primary navigation · patient & doctor login actions.
 * Smaller screens: logo plus compact icon entry points — full navigation
 * lives in the app-style bottom bar (see mobile-bottom-nav.tsx).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/#top"
          aria-label="MaaSetu — back to top"
          className="rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60"
        >
          <Logo markHeight={34} priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[15px] text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2.5 sm:flex">
            <PatientLoginDialog
              trigger={<Button variant="outline" size="sm">Patient login</Button>}
            />
            <DoctorLoginDialog
              trigger={<Button size="sm">Doctor login</Button>}
            />
          </div>
          {/* Compact entry points for the smallest screens. */}
          <div className="flex items-center gap-2 sm:hidden">
            <PatientLoginDialog
              trigger={
                <Button variant="outline" size="iconSm" aria-label="Patient login">
                  <UserRound />
                </Button>
              }
            />
            <DoctorLoginDialog
              trigger={
                <Button size="iconSm" aria-label="Doctor login">
                  <Stethoscope />
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
