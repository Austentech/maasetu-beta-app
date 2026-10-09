"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global motion configuration.
 * `reducedMotion="user"` disables transform animations automatically when the
 * visitor prefers reduced motion (components still check it explicitly).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
