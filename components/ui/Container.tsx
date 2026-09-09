import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}

/** Page-width wrapper with the fluid gutter from the design system. */
export function Container({ as: Component = "div", className, children, id }: ContainerProps) {
  return (
    <Component id={id} className={cn("mx-auto w-full max-w-content px-gutter", className)}>
      {children}
    </Component>
  );
}
