"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Desktop primary navigation with route-aware active states.
 *
 * Client-side only because the active route is runtime information; the
 * rest of the header stays a server component.
 */
export function MainNavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center lg:flex">
      {mainNav.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-2 text-[15px] transition-colors",
              isActive
                ? "bg-brand-50 font-medium text-brand-700"
                : "text-ink-soft hover:bg-brand-50 hover:text-brand-700",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
