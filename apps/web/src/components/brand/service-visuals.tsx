/**
 * Service-spot illustrations — four small hand-drawn diagrams, one per
 * intended service area on /services.
 *
 * They share the brand's visual DNA with the care-journey diagram
 * (dotted setu lines, the heartbeat, the arch, the brand palette) so the
 * page reads as one art-directed system rather than four stock graphics.
 * Each is decorative: the adjacent section copy carries the meaning, so
 * the SVGs are hidden from assistive technology.
 *
 * Pure static SVG (server-rendered, no client JavaScript, no animation).
 */

const BRAND_400 = "#FD1843";
const BRAND_700 = "#741A2F";
const BRAND_300 = "#FFA3B7";
const BRAND_200 = "#FFC9D5";
const PEACH_200 = "#FFE3D5";
const SKIN = "#F3B69A";
const HAIR = "#5E1425";

/** 01 — Pregnancy care coordination: one timeline, milestones, one heartbeat. */
export function TimelineVisual() {
  return (
    <svg
      viewBox="0 0 200 130"
      aria-hidden="true"
      className="h-auto w-full"
      fill="none"
    >
      {/* The journey rail */}
      <line
        x1={16}
        y1={72}
        x2={178}
        y2={72}
        stroke={BRAND_300}
        strokeWidth={3}
        strokeDasharray="0.1 9"
        strokeLinecap="round"
      />
      {/* Milestones on the rail */}
      {[42, 80, 118, 156].map((x) => (
        <g key={x}>
          <circle cx={x} cy={72} r={9} fill={PEACH_200} stroke={BRAND_400} strokeWidth={2.5} />
          <circle cx={x} cy={72} r={3} fill={BRAND_400} />
        </g>
      ))}
      {/* Her heartbeat, carried along the journey */}
      <path
        d="M62 44 L80 44 L87 30 L99 58 L106 44 L124 44"
        stroke={BRAND_400}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gentle notes hanging beneath the milestones */}
      <rect x={32} y={92} width={20} height={5} rx={2.5} fill={BRAND_200} />
      <rect x={70} y={98} width={20} height={5} rx={2.5} fill={BRAND_200} />
      <rect x={108} y={92} width={20} height={5} rx={2.5} fill={BRAND_200} />
      <rect x={146} y={98} width={20} height={5} rx={2.5} fill={BRAND_200} />
      {/* The heart the journey leads to */}
      <path
        d="M178 66.4 C176.2 63.4 171.8 63.2 171.2 67.3 C170.8 70.2 174.4 73.2 178 76 C181.6 73.2 185.2 70.2 184.8 67.3 C184.2 63.2 179.8 63.4 178 66.4 Z"
        fill={BRAND_700}
      />
    </svg>
  );
}

/** 02 — Doctor consultations: two people in one conversation, held by a heartbeat. */
export function ConsultationVisual() {
  return (
    <svg
      viewBox="0 0 200 130"
      aria-hidden="true"
      className="h-auto w-full"
      fill="none"
    >
      {/* Ground */}
      <ellipse cx={100} cy={122} rx={72} ry={5} fill="#FFE3E9" />

      {/* The mother (left) */}
      <circle cx={47} cy={41} r={13} fill={HAIR} />
      <circle cx={52} cy={44} r={13} fill={SKIN} />
      <circle cx={40} cy={30} r={5.5} fill={BRAND_700} />
      {/* Bust with a gently rounded bump */}
      <path
        d="M31 120 C31 94 41 77 53 75 C65 77 73 85 77 95 C83 91 91 93 93 101 C94 109 87 115 79 120 Z"
        fill={BRAND_700}
      />
      <path
        d="M84 101 C82.7 99.2 80.6 99.1 80.2 101.4 C80 103 81.8 104.5 84 106.2 C86.2 104.5 88 103 87.8 101.4 C87.4 99.1 85.3 99.2 84 101 Z"
        fill={BRAND_400}
      />

      {/* The doctor (right) */}
      <circle cx={153} cy={41} r={13} fill={HAIR} />
      <circle cx={148} cy={44} r={13} fill={SKIN} />
      <circle cx={160} cy={30} r={5.5} fill="#47101C" />
      <path
        d="M169 120 C169 94 159 77 147 75 C135 77 127 85 123 95 C117 91 109 93 107 101 C106 109 113 115 121 120 Z"
        fill="#FFFFFF"
        stroke={BRAND_200}
        strokeWidth={2.5}
      />
      {/* Stethoscope */}
      <path
        d="M139 77 C139 86 135 90 131 91"
        stroke={BRAND_400}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <circle cx={131} cy={94} r={3.5} fill={BRAND_400} />

      {/* The conversation held between them */}
      <path
        d="M78 72 C90 46 110 46 122 72"
        stroke={BRAND_300}
        strokeWidth={2.5}
        strokeDasharray="0.1 8"
        strokeLinecap="round"
      />
      <path
        d="M89 48 L97 48 L100 39 L104 57 L107 48 L115 48"
        stroke={BRAND_400}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 03 — Diagnostic coordination: a sample becomes a verified report. */
export function DiagnosticsVisual() {
  return (
    <svg
      viewBox="0 0 200 130"
      aria-hidden="true"
      className="h-auto w-full"
      fill="none"
    >
      {/* Test tube */}
      <rect x={27} y={22} width={26} height={9} rx={4} fill={BRAND_700} />
      <rect
        x={30}
        y={29}
        width={20}
        height={66}
        rx={10}
        fill="#FFF9FA"
        stroke={BRAND_700}
        strokeWidth={2.5}
      />
      <path d="M33 64 H47 A7 7 0 0 1 54 71 V86 A7 7 0 0 1 47 93 H33 Z" fill={BRAND_200} />
      {/* Droplet */}
      <path
        d="M66 62 C62 68 60 72 60 75 A6 6 0 0 0 72 75 C72 72 70 68 66 62 Z"
        fill={BRAND_300}
      />

      {/* The flow: sample to report */}
      <path
        d="M76 62 C90 42 104 42 118 58"
        stroke={BRAND_300}
        strokeWidth={2.5}
        strokeDasharray="0.1 8"
        strokeLinecap="round"
      />

      {/* The report */}
      <rect
        x={118}
        y={28}
        width={64}
        height={80}
        rx={10}
        fill="#FFFFFF"
        stroke={BRAND_200}
        strokeWidth={2.5}
      />
      <rect x={128} y={42} width={44} height={5} rx={2.5} fill={BRAND_200} />
      <rect x={128} y={54} width={32} height={5} rx={2.5} fill={BRAND_200} />
      <rect x={128} y={66} width={44} height={5} rx={2.5} fill={BRAND_200} />
      <rect x={128} y={78} width={24} height={5} rx={2.5} fill={BRAND_200} />
      {/* Verified */}
      <circle cx={166} cy={96} r={11} fill={BRAND_400} />
      <path
        d="M160.5 96 L164.5 100 L171 91.5"
        stroke="#FFFFFF"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 04 — Organised health information: stage-wise guidance, curated, one book. */
export function GuidanceVisual() {
  return (
    <svg
      viewBox="0 0 200 130"
      aria-hidden="true"
      className="h-auto w-full"
      fill="none"
    >
      {/* Stage markers above the book */}
      {[
        { x: 58, fill: PEACH_200 },
        { x: 87, fill: BRAND_200 },
        { x: 116, fill: PEACH_200 },
      ].map(({ x, fill }) => (
        <g key={x}>
          <rect x={x} y={8} width={26} height={13} rx={6.5} fill={fill} stroke={BRAND_300} strokeWidth={1.5} />
          <circle cx={x + 13} cy={14.5} r={2.5} fill={BRAND_700} />
        </g>
      ))}
      <path d="M71 23 L71 35" stroke={BRAND_300} strokeWidth={2} strokeDasharray="0.1 7" strokeLinecap="round" />
      <path d="M100 23 L100 31" stroke={BRAND_300} strokeWidth={2} strokeDasharray="0.1 7" strokeLinecap="round" />
      <path d="M129 23 L129 35" stroke={BRAND_300} strokeWidth={2} strokeDasharray="0.1 7" strokeLinecap="round" />

      {/* The open book */}
      <path
        d="M100 44 C84 34 62 32 40 38 L40 100 C62 94 84 96 100 106 Z"
        fill="#FFFFFF"
        stroke={BRAND_200}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path
        d="M100 44 C116 34 138 32 160 38 L160 100 C138 94 116 96 100 106 Z"
        fill="#FFFFFF"
        stroke={BRAND_200}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {/* Page lines */}
      <rect x={50} y={52} width={34} height={4} rx={2} fill={BRAND_200} />
      <rect x={50} y={63} width={24} height={4} rx={2} fill={BRAND_200} />
      <rect x={50} y={74} width={34} height={4} rx={2} fill={BRAND_200} />
      <rect x={116} y={52} width={34} height={4} rx={2} fill={BRAND_200} />
      <rect x={116} y={63} width={24} height={4} rx={2} fill={BRAND_200} />
      <rect x={116} y={74} width={34} height={4} rx={2} fill={BRAND_200} />

      {/* A clear note rising from the pages */}
      <path
        d="M172 14 C173 18 175 20 179 21 C175 22 173 24 172 28 C171 24 169 22 165 21 C169 20 171 18 172 14 Z"
        fill={BRAND_400}
      />
    </svg>
  );
}
