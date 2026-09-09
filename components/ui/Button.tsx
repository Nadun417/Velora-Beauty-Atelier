"use client";

import Link from "next/link";
import { useCallback, useRef, type ReactNode, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsFinePointer } from "@/lib/hooks";

export type ButtonVariant = "primary" | "secondary" | "text" | "dark";
export type ButtonSize = "sm" | "md" | "lg";
type ArrowStyle = "right" | "up-right" | "none";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: ArrowStyle;
  /** Subtle magnetic pull on pointer devices. Ignored on touch / reduced motion. */
  magnetic?: boolean;
  /** Label shown by the custom cursor while hovering. */
  cursorLabel?: string;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type NativeProps = CommonProps &
  Omit<HTMLMotionProps<"button">, "className" | "children" | "style" | "ref"> & {
    href?: undefined;
  };

export type ButtonProps = LinkProps | NativeProps;

const MotionLink = motion.create(Link);

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-xs font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ease-out-expo select-none disabled:pointer-events-none disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "border border-ink bg-ink text-ivory hover:bg-transparent hover:text-ink",
  secondary: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  dark: "border border-ivory bg-ivory text-ink hover:bg-transparent hover:text-ivory",
  text: "gap-2 border-0 px-0 py-1 normal-case tracking-normal text-[0.95rem]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-5 py-3",
  md: "min-h-12 px-7 py-4",
  lg: "min-h-14 px-9 py-5",
};

const MAGNETIC_STRENGTH = 0.18;

/** Subtle magnetic offset: the element drifts a few pixels toward the pointer. */
function useMagnetic(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const element = ref.current;
      if (!enabled || !element) return;
      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      x.set(offsetX * MAGNETIC_STRENGTH);
      y.set(offsetY * MAGNETIC_STRENGTH);
    },
    [enabled, ref, x, y],
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { style: { x: springX, y: springY }, onPointerMove, onPointerLeave };
}

function ArrowIcon({ style, textVariant }: { style: ArrowStyle; textVariant: boolean }) {
  if (style === "none") return null;
  const Icon = style === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      aria-hidden
      className={cn(
        "size-4 shrink-0 transition-transform duration-500 ease-out-expo",
        style === "up-right"
          ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          : "group-hover:translate-x-1",
        textVariant && "size-[1.05em]",
      )}
    />
  );
}

function omitCommonProps(props: NativeProps) {
  const rest: Record<string, unknown> = { ...props };
  for (const key of ["variant", "size", "arrow", "magnetic", "cursorLabel", "className", "children", "href"]) {
    delete rest[key];
  }
  return rest as Omit<NativeProps, keyof CommonProps | "href">;
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    arrow = "right",
    magnetic = true,
    cursorLabel,
    className,
    children,
  } = props;

  const elementRef = useRef<HTMLElement | null>(null);
  const isFinePointer = useIsFinePointer();
  const reducedMotion = useReducedMotion();
  const magneticEnabled = magnetic && isFinePointer && !reducedMotion;
  const magnet = useMagnetic(elementRef, magneticEnabled);
  const isText = variant === "text";

  const classes = cn(base, variants[variant], !isText && sizes[size], className);

  const content = (
    <>
      <span className={cn(isText && "link-underline")}>{children}</span>
      <ArrowIcon style={arrow} textVariant={isText} />
    </>
  );

  const shared = {
    className: classes,
    "data-cursor": cursorLabel,
    style: magnet.style,
    onPointerMove: magnet.onPointerMove,
    onPointerLeave: magnet.onPointerLeave,
  };

  if (props.href !== undefined) {
    const { href, external, onClick } = props;
    if (external) {
      return (
        <motion.a
          ref={elementRef as RefObject<HTMLAnchorElement | null>}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          onClick={onClick}
          {...shared}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <MotionLink
        ref={elementRef as RefObject<HTMLAnchorElement | null>}
        href={href}
        onClick={onClick}
        {...shared}
      >
        {content}
      </MotionLink>
    );
  }

  const native = omitCommonProps(props);

  return (
    <motion.button
      ref={elementRef as RefObject<HTMLButtonElement | null>}
      type="button"
      {...native}
      {...shared}
    >
      {content}
    </motion.button>
  );
}
