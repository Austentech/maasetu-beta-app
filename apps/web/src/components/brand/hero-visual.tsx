"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Original MaaSetu hero illustration — "a mother held by care".
 *
 * An expectant mother shown in calm side profile: the baby bump is the
 * natural front of her silhouette, cradled by both hands — one resting
 * on top, one supporting underneath — with the little heartbeat pulsing
 * between them. She wears a flowing maternity dress with a soft dupatta
 * drifting behind her, and stands grounded above a dotted bridge — a
 * setu — whose centre carries a heartbeat. Built from hand-drawn
 * primitives in the brand palette.
 *
 * Motion: one-time entrance, a barely-there float for the figure, a soft
 * heartbeat pulse with a sonar ring on the bump, and a draw-in for the
 * bridge and its heartbeat. All transform/opacity only; every animation
 * is skipped when the visitor prefers reduced motion.
 */

const SKIN = "#F3B69A";
const SKIN_DEEP = "#E8A58C";
const BRAND_100 = "#FFE3E9";
const BRAND_200 = "#FFC9D5";
const BRAND_300 = "#FFA3B7";
const BRAND_400 = "#FD1843";
const BRAND_700 = "#741A2F";
const BRAND_800 = "#5E1425";
const BRAND_900 = "#4A0F1D";
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
        aria-label="Illustration of an expectant mother in side profile, in a flowing maternity dress, cradling her baby bump with both hands as a little heartbeat pulses between them, standing beneath a warm arch above a bridge that carries a heartbeat."
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
        <ellipse cx={270} cy={536} rx={130} ry={11} fill={BRAND_100} opacity={0.9} />

        {/* Mother figure */}
        <motion.g
          animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Dupatta draped over the shoulder, hugging the back */}
          <path
            d="M268 238 C286 246 298 262 305 284 C313 310 317 344 314 376 C312 398 306 416 296 430 C300 408 300 384 296 360 C290 330 280 304 266 284 C258 272 252 262 250 252 Z"
            fill={PEACH_300}
            opacity={0.7}
          />

          {/* Hair pulled back, low bun with a small flower cluster */}
          <circle cx={254} cy={174} r={26} fill={BRAND_800} />
          <circle cx={276} cy={218} r={12} fill={BRAND_800} />
          <circle cx={271} cy={210} r={3} fill={BRAND_200} />
          <circle cx={276} cy={205} r={3.2} fill={PEACH_300} />
          <circle cx={281} cy={211} r={3} fill={BRAND_200} />

          {/* Neck with a soft jaw shadow */}
          <path d="M241 209 L257 207 L261 238 L248 242 Z" fill={SKIN} />
          <path
            d="M244 213 C249 217 255 217 257 213"
            stroke={SKIN_DEEP}
            strokeWidth={5}
            strokeLinecap="round"
            fill="none"
            opacity={0.5}
          />

          {/* Maternity dress — the bump is the front of the silhouette */}
          <path
            d="M244 232 C236 240 230 250 228 262 C224 274 226 286 229 296 C231 302 233 306 236 309 C214 316 190 331 190 352 C190 375 203 391 222 398 C214 436 206 472 204 512 C232 522 300 524 322 514 C330 452 318 384 297 332 C288 302 280 274 278 256 C271 240 258 232 244 232 Z"
            fill={BRAND_700}
          />

          {/* Neckline collar */}
          <path
            d="M247 236 C253 242 260 242 264 236"
            stroke={PEACH_300}
            strokeWidth={5}
            strokeLinecap="round"
            fill="none"
          />

          {/* Empire seam under the bust */}
          <path
            d="M231 302 C246 310 268 310 287 298"
            stroke={BRAND_800}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            opacity={0.5}
          />

          {/* Skirt pleats falling from the bump */}
          <path
            d="M236 404 C230 440 226 472 224 502"
            stroke={BRAND_800}
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            opacity={0.4}
          />
          <path
            d="M258 404 C254 440 252 472 252 506"
            stroke={BRAND_800}
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            opacity={0.4}
          />
          <path
            d="M286 400 C286 436 288 470 292 504"
            stroke={BRAND_800}
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            opacity={0.4}
          />

          {/* Soft sheen along the curve of the bump */}
          <path
            d="M228 320 C210 327 199 338 199 352 C199 365 203 375 209 382"
            stroke="#FFFFFF"
            strokeWidth={8}
            strokeLinecap="round"
            fill="none"
            opacity={0.16}
          />

          {/* Far arm, supporting the underside of the bump */}
          <path
            d="M282 290 C264 308 246 324 234 342 C227 352 221 362 218 372"
            stroke={SKIN_DEEP}
            strokeWidth={18}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={218} cy={374} r={8.5} fill={SKIN_DEEP} />

          {/* Feet grounded beneath the hem */}
          <path
            d="M213 515 C204 515 195 521 195 526 C195 531 200 534 207 534 L228 534 C233 534 234 529 232 525 C230 517 223 515 213 515 Z"
            fill={BRAND_800}
          />
          <path
            d="M244 517 C237 517 232 523 232 528 C232 532 236 534 241 534 L258 534 C262 534 262 529 260 526 C258 519 252 517 244 517 Z"
            fill={BRAND_900}
          />

          {/* Head in profile — forehead, nose, lips, chin */}
          <path
            d="M246 152 C234 152 227 160 226 171 C225 174 226 176 225 178 C223 182 221 184 221 186 L224 189 C220 191 220 193 223 195 C220 197 221 199 225 199 C228 200 230 200 230 203 C230 208 236 212 243 213 C254 214 264 210 269 202 C274 196 277 188 277 179 C277 163 264 152 246 152 Z"
            fill={SKIN}
          />

          {/* Ear and earring */}
          <ellipse cx={252} cy={187} rx={4} ry={6.5} fill={SKIN} />
          <path
            d="M251 184 Q253 187 251 190"
            stroke={SKIN_DEEP}
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={252} cy={196} r={2.5} fill={PEACH_300} />

          {/* Hairline sweeping over the crown */}
          <path
            d="M225 174 C224 160 234 150 246 150 C259 149 271 156 274 168 C275 171 273 174 270 172 C261 165 249 163 240 166 C233 168 229 172 228 177 C227 179 225 178 225 174 Z"
            fill={BRAND_800}
          />

          {/* Face — brow, closed eye with lash, smile, blush */}
          <path
            d="M228 168 Q234 164 241 167"
            stroke={BRAND_800}
            strokeWidth={2.2}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M229 176 Q234 181 240 177"
            stroke={BRAND_800}
            strokeWidth={2.4}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M229 176 L226 174"
            stroke={BRAND_800}
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M225 195 Q231 199 238 196"
            stroke={BRAND_800}
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={242} cy={187} r={5} fill={BRAND_300} opacity={0.55} />

          {/* Near arm, resting on top of the bump */}
          <path
            d="M257 247 C247 251 239 259 235 272 C227 287 216 305 208 318"
            stroke={SKIN}
            strokeWidth={19}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={208} cy={320} r={9} fill={SKIN} />

          {/* The little heartbeat, cradled between her hands */}
          <motion.circle
            cx={218}
            cy={350}
            r={18}
            fill="none"
            stroke={BRAND_100}
            strokeWidth={2}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={prefersReducedMotion ? undefined : { scale: [0.85, 1.5], opacity: [0.55, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.path
            d="M218 363 C210.5 356 205 351.5 205 345 C205 339.5 209.5 336 214 336 C215.8 336 218 337.6 218 339.5 C218 337.6 220.2 336 222 336 C226.5 336 231 339.5 231 345 C231 351.5 225.5 356 218 363 Z"
            fill={BRAND_100}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.1, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* The setu — a dotted bridge carrying a heartbeat.
            Drawn via mask so the dots survive the draw-in animation. */}
        <mask id="maasetu-bridge-draw">
          <motion.path
            d="M60 575 Q280 505 500 575"
            stroke="#FFFFFF"
            strokeWidth={12}
            strokeLinecap="round"
            fill="none"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
          />
        </mask>
        <path
          d="M60 575 Q280 505 500 575"
          stroke={BRAND_300}
          strokeWidth={3.5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="0.5 11"
          mask="url(#maasetu-bridge-draw)"
        />
        <motion.path
          d="M248 545 L266 545 L275 530 L287 558 L294 545 L312 545"
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
        <Sprig x={92} y={555} rotate={8} />
        <Sprig x={474} y={562} rotate={-6} />
      </svg>
    </motion.div>
  );
}
