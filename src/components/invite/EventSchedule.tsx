import { CalendarDays, Clock, MapPin } from "lucide-react";
import { EVENTS } from "@/lib/wedding";
import { EventGlyph, SectionHeading } from "./Ornaments";
import { RevealOnScroll } from "./RevealOnScroll";
import { cn } from "@/lib/utils";

export function EventSchedule() {
  return (
    <section className="bg-parchment-glow px-5 py-20">
      <SectionHeading eyebrow="The celebrations" title="Wedding Festivities" />

      <div className="mt-10 flex flex-col gap-5">
        {EVENTS.map((ev, i) => (
          <RevealOnScroll key={ev.title} className={cn(i % 2 ? "ml-5" : "mr-5")}>
            <article className="relative overflow-hidden rounded-2xl border border-gold-deep/50 bg-card p-5 shadow-card">
              <span className="pointer-events-none absolute inset-1.5 rounded-xl border border-gold/30" />
              <span className="micro-label absolute right-5 top-5 text-[0.55rem] text-gold-deep/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-deep/70 bg-ivory text-gold-deep">
                  <EventGlyph name={ev.icon} className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl tracking-[0.06em] text-maroon">{ev.title}</h3>
                  <p className="font-serif text-sm italic text-maroon/70">{ev.subtitle}</p>
                  <ul className="mt-3 space-y-1.5 font-sans text-[0.72rem] tracking-wide text-maroon/85">
                    <li className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-gold-deep" /> {ev.date}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-gold-deep" /> {ev.time}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-gold-deep" /> {ev.venue}
                    </li>
                  </ul>
                  <span className="mt-3 inline-flex rounded-full border border-gold-deep/60 bg-ivory px-3 py-1 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-maroon">
                    Dress code · {ev.dressCode}
                  </span>
                </div>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
