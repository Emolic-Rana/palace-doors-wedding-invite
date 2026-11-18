import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEDDING_DISPLAY, googleCalendarUrl } from "@/lib/wedding";
import { Lotus, SectionHeading } from "./Ornaments";
import { cn } from "@/lib/utils";

const REVEAL_AT = 0.5;
const SPARKS = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  const dist = 90 + ((i * 37) % 70);
  return {
    dx: `${Math.cos(angle) * dist}px`,
    dy: `${Math.sin(angle) * dist}px`,
    size: 6 + ((i * 13) % 8),
    delay: (i % 7) * 60,
  };
});

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = "source-over";

    const deep = cssVar("--gold-deep");
    const gold = cssVar("--gold");
    const soft = cssVar("--gold-soft");
    const maroon = cssVar("--maroon");

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, deep);
    g.addColorStop(0.3, gold);
    g.addColorStop(0.5, soft);
    g.addColorStop(0.7, gold);
    g.addColorStop(1, deep);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    // Foil grain
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = i % 2 ? "rgba(255,255,255,0.18)" : "rgba(80,40,0,0.10)";
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.2, 1.2);
    }
    // Inner frame
    ctx.strokeStyle = maroon;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);
    ctx.strokeRect(15, 15, width - 30, height - 30);
    ctx.globalAlpha = 1;

    ctx.fillStyle = maroon;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "600 13px Cinzel, serif";
    ctx.fillText("S A V E   T H E   D A T E", width / 2, height / 2 - 14);
    ctx.font = "500 9px Montserrat, sans-serif";
    ctx.globalAlpha = 0.75;
    ctx.fillText("R U B   T O   R E V E A L", width / 2, height / 2 + 14);
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    paint();
    document.fonts?.ready.then(paint);
    const onResize = () => {
      if (!started) paint();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paint, started]);

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++;
      if ((data[i] ?? 255) < 40) clear++;
    }
    if (clear / total >= REVEAL_AT) setRevealed(true);
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 38;
    ctx.beginPath();
    const from = last.current ?? { x, y };
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x + 0.01, y + 0.01);
    ctx.stroke();
    last.current = { x, y };
    if (!started) setStarted(true);
    if (++moves.current % 6 === 0) checkProgress();
  };

  const onTouch = (t: { clientX: number; clientY: number } | undefined) => {
    if (t) scratch(t.clientX, t.clientY);
  };

  const end = () => {
    last.current = null;
    checkProgress();
  };

  const [dragging, setDragging] = useState(false);

  return (
    <section id="save-the-date" className="bg-ivory px-6 py-20">
      <SectionHeading eyebrow="An auspicious beginning" title="Save the Date" />

      <div className="relative mx-auto mt-10 max-w-sm rounded-2xl bg-maroon-velvet p-3 shadow-card">
        <div className="rounded-xl border border-gold/60 p-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card">
            {/* Hidden date */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-parchment-glow text-center">
              <p className="micro-label text-gold-deep">{WEDDING_DISPLAY.weekday}</p>
              <p className="mt-1 font-display text-7xl leading-none text-maroon">{WEDDING_DISPLAY.day}</p>
              <p className="mt-1 font-display text-lg tracking-[0.3em] text-maroon">
                {WEDDING_DISPLAY.month.toUpperCase()} {WEDDING_DISPLAY.year}
              </p>
              <Lotus className="mt-2 h-5 w-9 text-gold-deep" />
              <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-maroon/80">
                Muhurat · {WEDDING_DISPLAY.muhurat}
              </p>
            </div>

            <canvas
              ref={canvasRef}
              aria-label="Gold scratch card. Rub to reveal the wedding date."
              className={cn(
                "absolute inset-0 h-full w-full cursor-pointer touch-none transition-opacity duration-700",
                revealed && "pointer-events-none opacity-0",
              )}
              onTouchStart={(e) => onTouch(e.touches[0])}
              onTouchMove={(e) => onTouch(e.touches[0])}
              onTouchEnd={end}
              onMouseDown={(e) => {
                setDragging(true);
                scratch(e.clientX, e.clientY);
              }}
              onMouseMove={(e) => dragging && scratch(e.clientX, e.clientY)}
              onMouseUp={() => {
                setDragging(false);
                end();
              }}
              onMouseLeave={() => {
                if (dragging) end();
                setDragging(false);
              }}
            />

            {revealed && (
              <div className="pointer-events-none absolute inset-0">
                {SPARKS.map((s, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 animate-sparkle bg-gold-foil"
                    style={
                      {
                        width: s.size,
                        height: s.size,
                        clipPath:
                          "polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)",
                        animationDelay: `${s.delay}ms`,
                        "--dx": s.dx,
                        "--dy": s.dy,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <p
        className={cn(
          "mt-5 text-center font-serif text-base italic text-maroon/75 transition-opacity duration-500",
          revealed && "opacity-0",
        )}
      >
        Rub with your finger to reveal the auspicious date
      </p>

      <div
        className={cn(
          "-mt-4 flex justify-center transition-all duration-700",
          revealed ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <Button asChild variant="gold" size="tap">
          <a href={googleCalendarUrl()} target="_blank" rel="noreferrer" tabIndex={revealed ? 0 : -1}>
            <CalendarPlus /> Add to Calendar
          </a>
        </Button>
      </div>
    </section>
  );
}
