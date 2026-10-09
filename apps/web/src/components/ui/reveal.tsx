"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Additional delay in seconds (used to stagger cards). */
  delay?: number;
  /** Initial vertical offset in pixels. */
  y?: number;
}

/**
 * Gentle section reveal: fade + rise on first scroll into view.
 *
 * Respects `prefers-reduced-motion` — when the visitor prefers reduced
 * motion, content renders immediately with no transform.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
