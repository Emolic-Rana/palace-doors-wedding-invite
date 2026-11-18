import { ChevronDown } from "lucide-react";
import { COUPLE, WEDDING_DISPLAY } from "@/lib/wedding";
import { CornerJaali, GaneshaEmblem, LotusDivider, Mandala } from "./Ornaments";
import { cn } from "@/lib/utils";

export function HeroSection({ active }: { active: boolean }) {
  const step = (i: number) => ({
    className: cn(
      "transition-all duration-1000 ease-out",
      active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
    ),
    style: { transitionDelay: `${200 + i * 180}ms` },
  });

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-parchment-glow px-8 py-20 text-center">
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-gold-deep opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-4 border border-gold/40" />
      <CornerJaali className="pointer-events-none absolute left-2 top-2 h-24 w-24 text-gold-deep" />
      <CornerJaali className="pointer-events-none absolute right-2 top-2 h-24 w-24 -scale-x-100 text-gold-deep" />
      <CornerJaali className="pointer-events-none absolute bottom-2 left-2 h-24 w-24 -scale-y-100 text-gold-deep" />
      <CornerJaali className="pointer-events-none absolute bottom-2 right-2 h-24 w-24 -scale-100 text-gold-deep" />

      <div className="relative z-10 flex flex-col items-center">
        <div {...step(0)}>
          <GaneshaEmblem className="h-24 w-24 animate-float-slow text-gold-deep" />
          <p className="mt-2 font-serif text-sm italic text-gold-deep">॥ Shree Ganeshaya Namah ॥</p>
        </div>

        <p {...step(1)} className={cn(step(1).className, "micro-label mt-8 text-maroon")}>
          Wedding Celebration
        </p>

        <div {...step(2)} className={cn(step(2).className, "mt-6")}>
          <h1 className="flex flex-col items-center leading-none">
            <span className="text-gold-shimmer px-4 py-2 font-script text-7xl">{COUPLE.bride}</span>
            <span className="my-1 font-display text-2xl text-gold-deep">&</span>
            <span className="text-gold-shimmer px-4 py-2 font-script text-7xl">{COUPLE.groom}</span>
          </h1>
        </div>

        <div {...step(3)} className={cn(step(3).className, "mt-8")}>
          <div className="inline-flex items-center gap-3 rounded-full border border-gold-deep/70 px-5 py-2.5 font-sans text-[0.68rem] font-medium uppercase tracking-[0.3em] text-maroon">
            <span>{WEDDING_DISPLAY.short}</span>
            <span className="h-3 w-px bg-gold-deep" />
            <span>{WEDDING_DISPLAY.muhurat}</span>
          </div>
        </div>

        <p
          {...step(4)}
          className={cn(step(4).className, "mt-8 max-w-xs font-serif text-lg leading-relaxed text-maroon/85")}
        >
          With the blessings of our elders, our families joyfully request the honour of your presence
          as we begin our forever.
        </p>

        <div {...step(5)}>
          <LotusDivider className="mt-8" />
        </div>
      </div>

      <a
        href="#save-the-date"
        className={cn(
          "absolute bottom-10 z-10 flex flex-col items-center gap-1 text-gold-deep transition-opacity delay-[1600ms] duration-1000",
          active ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="micro-label text-[0.55rem]">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 animate-scroll-bounce" />
      </a>
    </section>
  );
}
