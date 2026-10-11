import { BookOpenText, ScanSearch, Stethoscope } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";

const BRAND_400 = "#FD1843";
const BRAND_700 = "#741A2F";
const BRAND_800 = "#5E1425";
const SKIN = "#F3B69A";

/**
 * "Around her, one journey" — a hand-drawn diagram of the support we
 * intend to coordinate around a mother's pregnancy: her doctors, her
 * diagnostics and her guidance, held together by one organised journey
 * (the dotted setu and its heartbeat).
 *
 * Built from the same visual DNA as the brand's other illustrations —
 * dotted bridge, heartbeat, the expectant mother in profile. Every element
 * scales with plain HTML/CSS so labels stay readable on small screens.
 */
export function CareJourney() {
  return (
    <figure className="mx-auto w-full max-w-4xl">
      <figcaption className="sr-only">
        Diagram: an expectant mother stands above a dotted bridge carrying a
        heartbeat; below the bridge, three areas of intended support —
        doctors and follow-ups, organised diagnostics, and stage-wise
        guidance — all connected around her one journey.
      </figcaption>

      <Reveal>
        <div className="flex flex-col items-center">
          {/* The mother — mini version of the brand's hero figure */}
          <svg
            viewBox="0 0 200 190"
            role="img"
            aria-hidden="true"
            className="h-auto w-[9.5rem] sm:w-[10.5rem]"
          >
            {/* Warm arch */}
            <path
              d="M30 190 V96 A70 70 0 0 1 170 96 V190 Z"
              fill="#FFE3D5"
              opacity={0.6}
            />
            {/* Figure */}
            <ellipse cx={100} cy={176} rx={44} ry={6} fill="#FFE3E9" />
            <g>
              <circle cx={96} cy={52} r={13} fill={SKIN} />
              <path
                d="M96 39 C88 39 83 45 83 52 C83 54 84 55 83 57 C81 60 80 61 80 62 L83 64 C80 66 81 68 84 68 C87 69 88 69 88 71 C88 76 93 79 98 79 C104 79 108 76 108 71 C108 70 109 69 110 68 C111 67 111 66 110 65 C109 64 109 63 109 61 C109 49 104 39 96 39 Z"
                fill={SKIN}
              />
              <circle cx={86} cy={44} r={10} fill={BRAND_800} />
              <circle cx={104} cy={38} r={5} fill={BRAND_800} />
              {/* Dress with bump */}
              <path
                d="M88 78 C82 83 80 88 82 92 C70 97 60 106 60 116 C60 128 70 136 80 139 C77 152 75 164 74 172 C88 177 116 177 128 173 C130 152 126 128 120 108 C117 96 114 86 112 80 C106 76 96 74 88 78 Z"
                fill={BRAND_700}
              />
              {/* Heart on the bump */}
              <path
                d="M78 116 C73 111 70 108 70 104 C70 100 73 97 76 97 C77.5 97 79.5 98.3 79.5 100 C79.5 98.3 81.5 97 83 97 C86 97 89 100 89 104 C89 108 86 111 81 116 C80.3 116.6 79.2 116.7 78.6 116.1 Z"
                fill={BRAND_400}
                transform="translate(-1 3)"
              />
              {/* Hands hint */}
              <circle cx={76} cy={112} r={4} fill={SKIN} />
            </g>
          </svg>

          {/* The setu — dotted bridge carrying a heartbeat */}
          <div className="mt-2 flex w-full items-center" aria-hidden="true">
            <span className="h-0 flex-1 border-t-2 border-dotted border-brand-300/80" />
            <svg viewBox="0 0 120 34" className="mx-1 h-8 w-[7.5rem] shrink-0">
              <path
                d="M4 26 L28 26 L38 12 L50 34 L58 26 L82 26 L92 18 L100 26 L116 26"
                fill="none"
                stroke={BRAND_400}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="h-0 flex-1 border-t-2 border-dotted border-brand-300/80" />
          </div>

          {/* Her label */}
          <p className="font-display mt-3 text-center text-lg leading-snug text-brand-700 italic sm:text-xl">
            Her pregnancy, held as one organised journey
          </p>
        </div>
      </Reveal>

      {/* The three kinds of intended support beneath the bridge */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
        {[
          {
            icon: Stethoscope,
            title: "Doctors & follow-ups",
            body: "The right professionals, connected through structured follow-ups.",
          },
          {
            icon: ScanSearch,
            title: "Organised diagnostics",
            body: "Tests and reports mapped to the pregnancy timeline.",
          },
          {
            icon: BookOpenText,
            title: "Stage-wise guidance",
            body: "Clear, relevant information for the week she is in.",
          },
        ].map((item, index) => (
          <Reveal key={item.title} delay={0.08 * index}>
            <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-white px-5 py-6 text-center shadow-xs">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <item.icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-display mt-3.5 text-[1.05rem] font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </figure>
  );
}
