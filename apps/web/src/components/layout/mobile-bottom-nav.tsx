"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  top: House,
  about: Info,
  approach: HeartHandshake,
  "for-patients": UserRound,
  "for-doctors": Stethoscope,
} as const;

/**
 * App-style bottom navigation for phone and tablet widths (below lg).
 *
 * Highlights the section currently in view via IntersectionObserver and
 * respects iOS safe areas. Only public anchors — no dashboard links,
 * because no dashboards exist yet.
 */
export function MobileBottomNav() {
  const [activeId, setActiveId] = useState<string>("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // A narrow band around the viewport centre decides the active section.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    const targets = mobileNav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {mobileNav.map((item) => {
          const Icon = navIcons[item.id];
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                aria-current={isActive ? "true" : undefined}
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
