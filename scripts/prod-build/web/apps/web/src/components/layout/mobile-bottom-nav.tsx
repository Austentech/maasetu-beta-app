"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartHandshake,
  House,
  Info,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { mobileNav } from "@/config/site";
import { cn } from "@/lib/utils";

const navIcons = {
  "/": House,
  "/about": Info,
  "/services": HeartHandshake,
  "/patients": UserRound,
  "/doctors": Stethoscope,
} as const;

/**
 * App-style bottom navigation for phone and tablet widths (below lg).
 *
 * Highlights the page the visitor is actually on (route-based, replacing
 * the earlier scroll-observer approach that only made sense for the
 * single-page layout) and respects iOS safe areas. Public pages only —
 * no dashboard links, because no dashboards exist yet.
 */
export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {mobileNav.map((item) => {
          const Icon = navIcons[item.href as keyof typeof navIcons];
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 pt-1.5 pb-2 text-[10.5px] leading-tight font-medium transition-colors",
                  isActive
                    ? "text-brand-500"
                    : "text-ink-soft/90 hover:text-ink-soft",
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
