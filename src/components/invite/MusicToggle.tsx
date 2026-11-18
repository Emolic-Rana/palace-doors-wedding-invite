import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function MusicToggle({
  muted,
  onToggle,
  visible,
}: {
  muted: boolean;
  onToggle: () => void;
  visible: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Play music" : "Mute music"}
      className={cn(
        "glass fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full text-gold-deep shadow-gold transition-all duration-700",
        visible ? "opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
      )}
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      {!muted && <span className="absolute inset-0 animate-ping rounded-full border border-gold/50" />}
    </button>
  );
}
