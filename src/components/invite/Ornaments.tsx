import type { SVGProps } from "react";
import type { EventIcon } from "@/lib/wedding";

type P = SVGProps<SVGSVGElement>;
const line = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Fine-line Lord Ganesha emblem. */
export function GaneshaEmblem(props: P) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden {...props}>
      <g {...line} strokeWidth={1.1}>
        <circle cx="60" cy="60" r="56" strokeWidth={0.6} opacity={0.6} />
        <circle cx="60" cy="60" r="52" strokeWidth={0.4} strokeDasharray="1 3" opacity={0.7} />
        {/* crown */}
        <circle cx="60" cy="14" r="2" />
        <path d="M60 17 L66 24 L72 22 L70 34 M60 17 L54 24 L48 22 L50 34" />
        <path d="M48 34 Q60 29 72 34" />
        <path d="M51 28 Q60 25 69 28" opacity={0.7} />
        {/* tilak */}
        <path d="M60 36 v6" strokeWidth={1.4} />
        <path d="M56 37 q4 3 8 0" opacity={0.8} />
        {/* face */}
        <path d="M48 35 C45 47 48 56 53 61" />
        <path d="M72 35 C75 47 72 56 67 61" />
        {/* eyes */}
        <path d="M51 46 q3 -2.4 6 0" />
        <path d="M63 46 q3 -2.4 6 0" />
        {/* ears */}
        <path d="M48 38 C32 32 21 44 26 59 C30 70 41 68 50 58" />
        <path d="M44 44 C35 42 31 50 34 57" opacity={0.6} />
        <path d="M72 38 C88 32 99 44 94 59 C90 70 79 68 70 58" />
        <path d="M76 44 C85 42 89 50 86 57" opacity={0.6} />
        {/* trunk */}
        <path d="M57 50 C56 62 54 70 49 76 C44 82 46 91 55 89 C60 88 60 82 55 82" />
        <path d="M63 50 C63 62 61 72 56 78" opacity={0.85} />
        {/* tusk */}
        <path d="M53 61 L48 66" />
        {/* modak hand hint & belly */}
        <path d="M40 80 C36 94 46 106 60 106 C74 106 84 94 80 80" opacity={0.85} />
        <path d="M66 94 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" opacity={0.85} />
        <path d="M60 98 a1.4 1.4 0 1 0 0.01 0" />
      </g>
    </svg>
  );
}

/** Small lotus glyph. */
export function Lotus(props: P) {
  return (
    <svg viewBox="0 0 48 28" aria-hidden {...props}>
      <g {...line} strokeWidth={1}>
        <path d="M24 4 C19 10 19 18 24 24 C29 18 29 10 24 4 Z" />
        <path d="M24 24 C17 22 12 16 12 9 C17 11 21 15 24 24" />
        <path d="M24 24 C31 22 36 16 36 9 C31 11 27 15 24 24" />
        <path d="M24 24 C15 25 7 21 3 15 C10 14 18 18 24 24" />
        <path d="M24 24 C33 25 41 21 45 15 C38 14 30 18 24 24" />
        <path d="M10 26 H38" />
      </g>
    </svg>
  );
}

/** Hairline gold divider with a central lotus. */
export function LotusDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold-deep ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-deep" />
      <span className="h-1 w-1 rotate-45 bg-gold" />
      <Lotus className="h-5 w-9" />
      <span className="h-1 w-1 rotate-45 bg-gold" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-deep" />
    </div>
  );
}

/** Geometric mandala watermark. */
export function Mandala(props: P) {
  const petals = Array.from({ length: 16 });
  const rays = Array.from({ length: 32 });
  return (
    <svg viewBox="0 0 400 400" aria-hidden {...props}>
      <g {...line} strokeWidth={0.6}>
        {[190, 170, 150, 110, 70, 40].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} />
        ))}
        {petals.map((_, i) => (
          <path
            key={`p${i}`}
            transform={`rotate(${(360 / 16) * i} 200 200)`}
            d="M200 50 C215 80 215 100 200 130 C185 100 185 80 200 50 Z"
          />
        ))}
        {petals.map((_, i) => (
          <path
            key={`q${i}`}
            transform={`rotate(${(360 / 16) * i + 11.25} 200 200)`}
            d="M200 90 C210 110 210 125 200 140 C190 125 190 110 200 90 Z"
          />
        ))}
        {rays.map((_, i) => (
          <line
            key={`r${i}`}
            transform={`rotate(${(360 / 32) * i} 200 200)`}
            x1="200"
            y1="10"
            x2="200"
            y2="30"
          />
        ))}
        <rect x="130" y="130" width="140" height="140" />
        <rect x="130" y="130" width="140" height="140" transform="rotate(45 200 200)" />
      </g>
    </svg>
  );
}

/** Ornate jaali corner flourish (top-left orientation). */
export function CornerJaali(props: P) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden {...props}>
      <g {...line} strokeWidth={0.9}>
        <path d="M4 116 V4 H116" />
        <path d="M12 116 V12 H116" opacity={0.6} />
        <path d="M12 60 C30 60 40 50 40 32 C40 20 32 12 20 12" />
        <path d="M60 12 C60 30 50 40 32 40" />
        <path d="M24 24 C34 24 40 30 40 40 C30 40 24 34 24 24 Z" />
        <circle cx="48" cy="48" r="3" />
        <path d="M20 80 C26 76 26 68 20 64 C14 68 14 76 20 80 Z" />
        <path d="M80 20 C76 26 68 26 64 20 C68 14 76 14 80 20 Z" />
        <path d="M20 96 v10 M96 20 h10" opacity={0.7} />
        <circle cx="20" cy="88" r="1.5" />
        <circle cx="88" cy="20" r="1.5" />
      </g>
    </svg>
  );
}

/** Palace arch line art for the venue card. */
export function PalaceArch(props: P) {
  return (
    <svg viewBox="0 0 240 150" aria-hidden {...props}>
      <g {...line} strokeWidth={1}>
        {/* domes */}
        <path d="M120 12 v-6 M114 30 C114 18 126 18 126 30" />
        <path d="M100 40 C100 22 140 22 140 40" />
        <path d="M44 56 C44 44 60 44 60 56 M52 44 v-5" />
        <path d="M180 56 C180 44 196 44 196 56 M188 44 v-5" />
        {/* main body */}
        <path d="M20 146 V60 H220 V146" />
        <path d="M90 40 H150 V60" />
        <path d="M90 40 V60" />
        <path d="M14 146 H226" />
        <path d="M20 72 H220" opacity={0.6} />
        {/* central arch */}
        <path d="M96 146 V108 C96 90 108 82 120 76 C132 82 144 90 144 108 V146" />
        <path d="M104 146 V110 C104 96 112 90 120 86 C128 90 136 96 136 110 V146" opacity={0.6} />
        {/* side jharokhas */}
        {[36, 62, 160, 186].map((x) => (
          <path key={x} d={`M${x} 130 V104 C${x} 96 ${x + 9} 90 ${x + 9} 90 C${x + 9} 90 ${x + 18} 96 ${x + 18} 104 V130 Z`} />
        ))}
        {[36, 62, 160, 186].map((x) => (
          <path key={`b${x}`} d={`M${x - 3} 130 H${x + 21}`} />
        ))}
        {/* crenellations */}
        {Array.from({ length: 13 }).map((_, i) => (
          <path key={`c${i}`} d={`M${24 + i * 16} 60 v-5 h8 v5`} opacity={0.7} />
        ))}
      </g>
    </svg>
  );
}

/** Minimal gold line icons for each ceremony. */
export function EventGlyph({ name, ...props }: P & { name: EventIcon }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <g {...line} strokeWidth={1.2}>
        {name === "mehendi" && (
          <>
            <path d="M16 40 V22 a3 3 0 0 1 6 0 V14 a3 3 0 0 1 6 0 v2 a3 3 0 0 1 6 0 v4 a3 3 0 0 1 6 0 V30 c0 6 -5 10 -11 10 Z" />
            <circle cx="28" cy="31" r="3" />
            <path d="M28 25 v-2 M28 37 v2 M22 31 h-2 M34 31 h2" opacity={0.8} />
            <path d="M10 26 c-2 -4 0 -8 4 -8" opacity={0.7} />
          </>
        )}
        {name === "haldi" && (
          <>
            <path d="M8 24 H40 C40 33 33 40 24 40 C15 40 8 33 8 24 Z" />
            <path d="M12 24 C14 18 34 18 36 24" />
            <path d="M18 14 c0 -3 3 -3 3 -6 M26 14 c0 -3 3 -3 3 -6" opacity={0.8} />
            <path d="M18 44 H30" />
            <circle cx="24" cy="31" r="2.5" />
          </>
        )}
        {name === "sangeet" && (
          <>
            <ellipse cx="24" cy="28" rx="14" ry="8" />
            <path d="M10 28 V34 C10 38.5 16 42 24 42 C32 42 38 38.5 38 34 V28" />
            <path d="M16 22 L13 34 M24 20 V36 M32 22 L35 34" opacity={0.7} />
            <path d="M30 6 V14 a3 3 0 1 1 -2 -2.8 M30 6 l6 2" />
          </>
        )}
        {name === "pheras" && (
          <>
            <path d="M24 8 C30 16 32 22 28 28 C27 24 25 23 24 22 C23 26 20 27 19 30 C15 24 18 16 24 8 Z" />
            <path d="M24 32 C27 32 28 30 28 28" opacity={0.7} />
            <path d="M10 34 H38 L34 42 H14 Z" />
            <path d="M14 34 L18 30 H30 L34 34" opacity={0.7} />
          </>
        )}
        {name === "reception" && (
          <>
            <path d="M24 4 V10" />
            <path d="M14 10 H34 L30 18 H18 Z" />
            <path d="M10 18 H38 C38 26 32 30 24 30 C16 30 10 26 10 18 Z" />
            <path d="M14 30 v4 M24 30 v6 M34 30 v4" />
            <circle cx="14" cy="36" r="1.6" />
            <circle cx="24" cy="38" r="1.6" />
            <circle cx="34" cy="36" r="1.6" />
            <path d="M24 42 v2" opacity={0.7} />
          </>
        )}
      </g>
    </svg>
  );
}

/** Small section heading: micro-label + serif title + divider. */
export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="micro-label text-gold-deep">{eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl tracking-[0.08em] text-maroon">{title}</h2>
      <LotusDivider className="mt-4" />
    </div>
  );
}
