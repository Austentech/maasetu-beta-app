"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Original MaaSetu hero illustration — "a mother held by care".
 *
 * A calm expectant mother inside a warm arch (the space care creates),
 * standing above a dotted bridge — a setu — whose centre carries a
 * heartbeat. Built from hand-drawn primitives in the brand palette.
 *
 * Motion: one-time entrance, a barely-there float for the figure, a soft
 * heartbeat pulse, and a draw-in for the bridge arc. All transform/opacity
 * only; every animation is skipped when the visitor prefers reduced motion.
 */

const SKIN = "#F3B69A";
const BRAND_100 = "#FFE3E9";
const BRAND_200 = "#FFC9D5";
const BRAND_300 = "#FFA3B7";
const BRAND_400 = "#FD1843";
const BRAND_700 = "#741A2F";
const BRAND_800 = "#5E1425";
const PEACH_200 = "#FFE3D5";
const PEACH_300 = "#FFC6A8";

function Sparkle({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${scale})`}
      d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8 Z"
      fill={BRAND_400}
      opacity={0.45}
    />
  );
}

function Sprig({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path
        d="M0 0 C2 -18 2 -34 0 -48"
        stroke={BRAND_300}
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx={-9} cy={-16} rx={9} ry={4.5} fill={PEACH_300} transform="rotate(-32 -9 -16)" />
      <ellipse cx={9} cy={-28} rx={9} ry={4.5} fill={BRAND_200} transform="rotate(28 9 -28)" />
      <ellipse cx={-7} cy={-38} rx={8} ry={4} fill={PEACH_300} transform="rotate(-30 -7 -38)" />
    </g>
  );
}

export function HeroVisual({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
    >
      <svg
        viewBox="0 0 560 600"
        role="img"
        aria-label="Illustration of a mother in a flowing dress resting her hand on her belly, standing beneath a warm arch above a bridge that carries a heartbeat."
        className="h-auto w-full"
      >
        {/* Backdrop */}
        <circle cx={444} cy={138} r={62} fill={BRAND_100} />
        <circle cx={116} cy={104} r={20} fill={PEACH_300} opacity={0.7} />
        <path
          d="M100 560 V262 A180 180 0 0 1 460 262 V560 Z"
          fill={PEACH_200}
          opacity={0.55}
        />

        {/* Sparkles */}
        <Sparkle x={148} y={182} />
        <Sparkle x={432} y={312} scale={0.8} />
        <Sparkle x={92} y={340} scale={0.65} />
        <Sparkle x={470} y={450} scale={0.7} />

        {/* Ground shadow */}
        <ellipse cx={280} cy={552} rx={148} ry={13} fill={BRAND_100} opacity={0.9} />

        {/* Mother figure */}
        <motion.g
          animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Feet */}
          <ellipse cx={246} cy={541} rx={17} ry={8} fill={BRAND_800} />
          <ellipse cx={316} cy={541} rx={17} ry={8} fill={BRAND_800} />

          {/* Dress (A-line) */}
          <path
            d="M250 258 Q280 250 310 258 Q318 260 320 270 L376 522 Q379 534 367 534 L193 534 Q181 534 184 522 L240 270 Q242 260 250 258 Z"
            fill={BRAND_700}
          />
          {/* Belly */}
          <ellipse cx={233} cy={402} rx={52} ry={64} fill={BRAND_700} />

          {/* Neck */}
          <path d="M262 226 L282 226 L285 262 L259 262 Z" fill={SKIN} />

          {/* Hair (back) and bun */}
          <circle cx={293} cy={186} r={44} fill={BRAND_800} />
          <circle cx={324} cy={150} r={16} fill={BRAND_800} />

          {/* Face */}
          <circle cx={272} cy={200} r={36} fill={SKIN} />

          {/* Arm cradling the belly */}
          <path
            d="M300 288 C282 306 254 318 238 342 C226 360 219 378 217 396"
            stroke={SKIN}
            strokeWidth={22}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={216} cy={402} r={12} fill={SKIN} />

          {/* Heart at the belly */}
          <motion.path
            d="M222 396 C214 388 207 383 207 376 C207 370 212 366 217 366 C219 366 222 368 222 370 C222 368 225 366 227 366 C232 366 237 370 237 376 C237 383 230 388 222 396 Z"
            fill={BRAND_400}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Shawl */}
          <path
            d="M244 258 Q280 274 316 258 L316 278 Q280 292 244 278 Z"
            fill={PEACH_300}
          />
        </motion.g>

        {/* The setu — a dotted bridge carrying a heartbeat */}
        <motion.path
          d="M55 520 Q280 455 505 520"
          stroke={BRAND_300}
          strokeWidth={3.5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="0.5 11"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
        />
        <motion.path
          d="M248 492 L266 492 L275 477 L287 505 L294 492 L312 492"
          stroke={BRAND_400}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
        />

        {/* Sprigs */}
        <Sprig x={92} y={502} rotate={8} />
        <Sprig x={474} y={514} rotate={-6} />
      </svg>
    </motion.div>
  );
}
