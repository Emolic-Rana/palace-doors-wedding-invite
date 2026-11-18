import { useEffect, useState } from "react";
import { X } from "lucide-react";
import bride from "@/assets/bride-portrait.jpg";
import groom from "@/assets/groom-portrait.jpg";
import terrace from "@/assets/couple-terrace.jpg";
import hands from "@/assets/couple-hands.jpg";
import { COUPLE } from "@/lib/wedding";
import { SectionHeading } from "./Ornaments";
import { RevealOnScroll } from "./RevealOnScroll";
import { cn } from "@/lib/utils";

type Photo = { src: string; alt: string; caption: string; w: number; h: number };

const PHOTOS: [Photo, Photo, Photo, Photo] = [
  { src: bride, alt: `${COUPLE.bride} in a maroon and gold lehenga`, caption: `The Bride · ${COUPLE.bride}`, w: 768, h: 1024 },
  { src: groom, alt: `${COUPLE.groom} in an ivory sherwani and maroon safa`, caption: `The Groom · ${COUPLE.groom}`, w: 768, h: 1024 },
  { src: terrace, alt: "The couple on a palace terrace at sunset", caption: "Two Souls, One Story", w: 1024, h: 768 },
  { src: hands, alt: "Hands with mehendi joined over a varmala", caption: "In every lifetime, I'd find you", w: 768, h: 1024 },
];

function ArchFrame({ photo, onOpen, className }: { photo: Photo; onOpen: () => void; className?: string }) {
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full rounded-t-full border border-gold-deep bg-card p-1.5 shadow-card"
        aria-label={`View ${photo.caption}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border border-gold/60">
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-vignette opacity-40" />
        </div>
      </button>
      <figcaption className="mt-3 text-center font-serif text-sm italic text-maroon/80">{photo.caption}</figcaption>
    </figure>
  );
}

export function CoupleGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? undefined : PHOTOS[open];

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="bg-ivory px-6 py-20">
      <SectionHeading eyebrow="Our moments" title="The Bride & Groom" />

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8">
        <RevealOnScroll>
          <ArchFrame photo={PHOTOS[0]} onOpen={() => setOpen(0)} />
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="mt-14">
          <ArchFrame photo={PHOTOS[1]} onOpen={() => setOpen(1)} />
        </RevealOnScroll>

        <RevealOnScroll className="col-span-2">
          <figure>
            <button
              type="button"
              onClick={() => setOpen(2)}
              className="group frame-double block w-full overflow-hidden"
              aria-label={`View ${PHOTOS[2].caption}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={PHOTOS[2].src}
                  alt={PHOTOS[2].alt}
                  width={PHOTOS[2].w}
                  height={PHOTOS[2].h}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-vignette opacity-40" />
              </div>
            </button>
            <figcaption className="mt-4 text-center font-display text-sm tracking-[0.2em] text-gold-deep">
              {PHOTOS[2].caption.toUpperCase()}
            </figcaption>
          </figure>
        </RevealOnScroll>

        <RevealOnScroll className="-mt-2">
          <ArchFrame photo={PHOTOS[3]} onOpen={() => setOpen(3)} />
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="flex items-center">
          <blockquote className="border-l border-gold-deep/60 pl-4 font-serif text-lg italic leading-snug text-maroon">
            “Seven steps, seven vows, a love written in the stars.”
            <span className="micro-label mt-3 block not-italic text-[0.55rem] text-gold-deep">
              {COUPLE.bride} & {COUPLE.groom}
            </span>
          </blockquote>
        </RevealOnScroll>
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={open === null}
        onClick={() => setOpen(null)}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/90 p-6 backdrop-blur-sm transition-opacity duration-500",
          open === null ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <button
          type="button"
          aria-label="Close photo"
          className="glass absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-gold"
          onClick={() => setOpen(null)}
        >
          <X className="h-5 w-5" />
        </button>
        {active && (
          <>
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[78dvh] w-auto max-w-full border border-gold/60 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-4 font-serif text-lg italic text-gold-soft">{active.caption}</p>
          </>
        )}
      </div>
    </section>
  );
}
