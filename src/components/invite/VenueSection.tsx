import { Car, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COUPLE, VENUE } from "@/lib/wedding";
import { GaneshaEmblem, LotusDivider, PalaceArch, SectionHeading } from "./Ornaments";
import { RevealOnScroll } from "./RevealOnScroll";

export function VenueSection() {
  return (
    <>
      <section className="bg-ivory px-6 py-20">
        <SectionHeading eyebrow="The palace" title="Venue" />
        <RevealOnScroll>
          <div className="relative mt-10 overflow-hidden rounded-t-[10rem] border border-gold-deep/60 bg-card px-6 pb-8 pt-12 text-center shadow-card">
            <span className="pointer-events-none absolute inset-2 rounded-t-[9.5rem] border border-gold/30" />
            <PalaceArch className="relative mx-auto h-32 w-full max-w-[260px] text-gold-deep" />
            <h3 className="relative mt-6 font-display text-2xl tracking-[0.12em] text-maroon">
              {VENUE.name.toUpperCase()}
            </h3>
            <p className="text-gold-shimmer relative font-script text-4xl">{VENUE.city}</p>
            <p className="relative mx-auto mt-4 max-w-xs font-sans text-xs leading-relaxed tracking-wide text-maroon/80">
              {VENUE.address}
            </p>
            <div className="relative mx-auto mt-5 flex max-w-xs items-start gap-3 rounded-xl border border-gold/40 bg-ivory p-3 text-left">
              <Car className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              <p className="font-serif text-sm leading-snug text-maroon/85">{VENUE.note}</p>
            </div>
            <Button asChild variant="royal" size="tap" className="relative mt-7">
              <a href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
                <Navigation /> Get Directions
              </a>
            </Button>
          </div>
        </RevealOnScroll>
      </section>

      <footer className="bg-maroon-velvet px-6 pb-16 pt-14 text-center">
        <GaneshaEmblem className="mx-auto h-14 w-14 text-gold" />
        <p className="micro-label mt-6 text-gold-soft">With love & blessings</p>
        <p className="text-gold-shimmer mt-3 font-script text-5xl">
          {COUPLE.bride} & {COUPLE.groom}
        </p>
        <LotusDivider className="mt-6" />
        <p className="micro-label mt-6 text-[0.55rem] text-gold/80">
          #{COUPLE.bride}Weds{COUPLE.groom}
        </p>
      </footer>
    </>
  );
}
