import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { OpeningOverlay } from "@/components/invite/OpeningOverlay";
import { MusicToggle } from "@/components/invite/MusicToggle";
import { HeroSection } from "@/components/invite/HeroSection";
import { ScratchCard } from "@/components/invite/ScratchCard";
import { CountdownTimer } from "@/components/invite/CountdownTimer";
import { CoupleGallery } from "@/components/invite/CoupleGallery";
import { EventSchedule } from "@/components/invite/EventSchedule";
import { VenueSection } from "@/components/invite/VenueSection";

// Served from public/media so they work on any host (Lovable, Netlify, etc.).
const MUSIC_URL = "/media/royal-sitar.mp3";

const TITLE = "Ananya & Arjun · Wedding Invitation · 12 Feb 2027";
const DESCRIPTION =
  "You are invited to the royal wedding of Ananya & Arjun at City Palace, Udaipur on 12 February 2027.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [entered, setEntered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [muted, setMuted] = useState(false);

  // Lock scrolling until the doors have opened.
  useEffect(() => {
    document.body.style.overflow = revealed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed]);

  const handleEnter = useCallback(() => {
    setEntered(true);
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.play()
      .then(() => {
        // Gentle fade-in so the music rises as the doors open.
        let v = 0;
        const id = setInterval(() => {
          v = Math.min(0.55, v + 0.03);
          a.volume = v;
          if (v >= 0.55) clearInterval(id);
        }, 120);
      })
      .catch(() => setMuted(true));
  }, []);

  const handleRevealed = useCallback(() => {
    setRevealed(true);
    window.scrollTo(0, 0);
  }, []);

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    if (muted) {
      a.muted = false;
      if (a.volume === 0) a.volume = 0.55;
      a.play().catch(() => {});
    } else {
      a.muted = true;
    }
    setMuted(!muted);
  };

  return (
    <div className="min-h-[100dvh] bg-parchment">
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />
      <OpeningOverlay onEnter={handleEnter} onRevealed={handleRevealed} />
      <MusicToggle muted={muted} onToggle={toggleMute} visible={entered} />

      <main className="mx-auto max-w-md overflow-hidden bg-ivory shadow-card">
        <HeroSection active={revealed} />
        <ScratchCard />
        <CountdownTimer />
        <CoupleGallery />
        <EventSchedule />
        <VenueSection />
      </main>
    </div>
  );
}
