import { useEffect, useRef, useState } from "react";
import { COUPLE } from "@/lib/wedding";
import { Lotus } from "./Ornaments";
import { cn } from "@/lib/utils";

// Served from public/media so they work on any host (Lovable, Netlify, etc.).
const DOORS_VIDEO_URL = "/media/palace-doors.mp4";
const DOORS_POSTER_URL = "/media/palace-doors-poster.jpg";

type Stage = "idle" | "playing" | "fading" | "done";

/** Full-screen palace doors intro. Tap the seal to open the doors and reveal the invitation. */
export function OpeningOverlay({
  onEnter,
  onRevealed,
}: {
  onEnter: () => void;
  onRevealed: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState<Stage>("idle");

  // Hold the closed doors on the very first frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const hold = () => {
      v.pause();
      if (v.currentTime > 0.05) v.currentTime = 0;
    };
    v.addEventListener("loadeddata", hold);
    return () => v.removeEventListener("loadeddata", hold);
  }, []);

  const fadeOut = () => {
    setStage((s) => (s === "playing" ? "fading" : s));
  };

  useEffect(() => {
    if (stage === "fading") {
      const t = setTimeout(() => {
        setStage("done");
        onRevealed();
      }, 1000);
      return () => clearTimeout(t);
    }
    if (stage === "playing") {
      // Safety net in case the video never reports its end.
      const t = setTimeout(fadeOut, 10000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [stage, onRevealed]);

  const handleEnter = async () => {
    if (stage !== "idle") return;
    setStage("playing");
    onEnter();
    const v = videoRef.current;
    if (!v) return fadeOut();
    try {
      v.currentTime = 0;
      await v.play();
    } catch {
      try {
        v.muted = true;
        await v.play();
      } catch {
        fadeOut();
      }
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration && v.currentTime >= v.duration - 0.7) fadeOut();
  };

  if (stage === "done") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 h-[100dvh] w-full overflow-hidden bg-ink transition-opacity duration-1000",
        stage === "fading" && "pointer-events-none opacity-0",
      )}
    >
      <video
        ref={videoRef}
        src={DOORS_VIDEO_URL}
        poster={DOORS_POSTER_URL}
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={fadeOut}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={cn(
          "absolute inset-0 bg-vignette transition-opacity duration-1000",
          stage !== "idle" && "opacity-30",
        )}
      />

      <div
        className={cn(
          "relative z-10 flex h-full flex-col items-center justify-between px-6 py-14 text-center transition-all duration-700",
          stage !== "idle" && "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="glass rounded-full px-5 py-2">
          <p className="micro-label text-ivory">You are cordially invited</p>
        </div>

        <button
          type="button"
          onClick={handleEnter}
          aria-label="Tap to enter the invitation"
          className="group relative flex h-36 w-36 animate-seal-pulse items-center justify-center rounded-full bg-gold-foil focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
        >
          <span className="absolute inset-2 rounded-full border border-maroon/40" />
          <span className="absolute inset-3.5 rounded-full border border-dashed border-maroon/30" />
          <span className="relative flex flex-col items-center gap-1.5 text-maroon">
            <Lotus className="h-6 w-10" />
            <span className="font-display text-sm font-semibold tracking-[0.2em]">TAP TO</span>
            <span className="font-display text-sm font-semibold tracking-[0.2em]">ENTER</span>
          </span>
        </button>

        <div className="glass rounded-2xl px-6 py-3">
          <p className="font-script text-3xl text-ivory">
            {COUPLE.bride} <span className="font-display text-lg text-gold">&</span> {COUPLE.groom}
          </p>
        </div>
      </div>
    </div>
  );
}
