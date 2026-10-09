import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import {
  PrivacyDialog,
  TermsDialog,
} from "@/components/dialogs/notice-dialogs";
import { Button } from "@/components/ui/button";
import { mainNav, siteConfig } from "@/config/site";

/**
 * Site footer. Bottom padding keeps content clear of the mobile bottom
 * navigation; on lg+ it returns to normal spacing.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-14 pb-24 sm:px-6 lg:pb-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo markHeight={40} />
            <p className="font-display mt-5 text-lg leading-snug text-brand-700 italic">
              {siteConfig.tagline}.
            </p>
            <div className="mt-6 space-y-2.5 text-[15px]">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2.5 rounded-md text-ink-soft transition-colors hover:text-brand-600"
              >
                <Mail aria-hidden="true" className="size-4 text-brand-400" />
                {siteConfig.email}
              </a>
              <br />
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-md text-ink-soft transition-colors hover:text-brand-600"
              >
                <Instagram aria-hidden="true" className="size-4 text-brand-400" />
                {siteConfig.instagram.handle}
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md text-ink-soft transition-colors hover:text-brand-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <PrivacyDialog
                  trigger={
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto px-0 text-[15px] text-ink-soft hover:text-brand-600"
                    >
                      Privacy Policy
                    </Button>
                  }
                />
              </li>
              <li>
                <TermsDialog
                  trigger={
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto px-0 text-[15px] text-ink-soft hover:text-brand-600"
                    >
                      Terms of Service
                    </Button>
                  }
                />
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              MaaSetu is currently in development. Nothing on this website is
              medical advice.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MaaSetu. All rights reserved.</p>
          <p className="font-display text-brand-700 italic">
            {siteConfig.tagline}.
          </p>
        </div>
      </div>
    </footer>
  );
}
