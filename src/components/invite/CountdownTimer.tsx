import { useEffect, useState } from "react";
import { WEDDING_DATE, getTimeLeft, type TimeLeft } from "@/lib/wedding";
import { SectionHeading } from "./Ornaments";
import { RevealOnScroll } from "./RevealOnScroll";

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function CountdownTimer() {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setLeft(getTimeLeft(WEDDING_DATE));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="bg-parchment-glow px-5 py-20">
      <SectionHeading eyebrow="Until the sacred pheras" title="Counting the Moments" />
      <div className="mt-10 grid grid-cols-4 gap-2.5">
        {UNITS.map((u, i) => (
          <RevealOnScroll key={u.key} delay={i * 120}>
            <div className="rounded-t-full border border-gold-deep/80 bg-card p-1 shadow-gold">
              <div className="flex aspect-[3/4] flex-col items-center justify-end rounded-t-full border border-gold/50 pb-4 pt-6">
                <span className="font-display text-3xl tabular-nums text-maroon">
                  {left ? String(left[u.key]).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 h-px w-6 bg-gold" />
                <span className="micro-label mt-2 text-[0.5rem] tracking-[0.25em] text-gold-deep">
                  {u.label}
                </span>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
