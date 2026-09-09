import { cn } from "@/lib/utils";

/**
 * Film-grain overlay. A tiled SVG noise texture that drifts frame to frame for
 * a subtle editorial shimmer. Purely decorative and non-interactive; the drift
 * animation is disabled under prefers-reduced-motion via globals.css.
 */
const NOISE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
  );

interface GrainProps {
  className?: string;
  /** 0–1; how visible the grain is. */
  opacity?: number;
}

export function Grain({ className, opacity = 0.14 }: GrainProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-10 animate-grain mix-blend-overlay", className)}
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundRepeat: "repeat",
        opacity,
      }}
    />
  );
}
