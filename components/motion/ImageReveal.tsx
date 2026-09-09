"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, viewportOnce } from "@/lib/animations";

interface ImageRevealProps {
  src: string;
  alt: string;
  /** Responsive sizes hint for next/image. */
  sizes: string;
  priority?: boolean;
  /** Wrapper classes: control aspect ratio / sizing here (e.g. "aspect-[4/5]"). */
  className?: string;
  imageClassName?: string;
  delay?: number;
  /** Reveal direction of the clip-path wipe. */
  direction?: "up" | "left";
  /** Additional scale on group hover, handled via CSS for cheapness. */
  hoverZoom?: boolean;
}

/**
 * Clip-path image reveal. The mask wipes open while the image settles from a
 * slight zoom, triggered once when the element enters the viewport.
 *
 * The viewport observer sits on an unclipped outer wrapper: a fully clipped
 * element reports zero intersection area and would never trigger.
 */
export function ImageReveal({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imageClassName,
  delay = 0,
  direction = "up",
  hoverZoom = false,
}: ImageRevealProps) {
  const hiddenClip = direction === "up" ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)";

  return (
    <motion.div
      className={cn("relative bg-ink/5", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{
          hidden: { clipPath: hiddenClip },
          visible: {
            clipPath: "inset(0 0 0 0)",
            transition: { duration: 1.1, ease: EASE, delay },
          },
        }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { scale: 1.15 },
            visible: { scale: 1, transition: { duration: 1.5, ease: EASE, delay } },
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover",
              hoverZoom &&
                "transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]",
              imageClassName,
            )}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
