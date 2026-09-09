"use client";

import { pad } from "@/lib/utils";
import { RevealText } from "@/components/motion/RevealText";

interface StepHeadingProps {
  step: number;
  question: string[];
  hint?: string;
}

export function StepHeading({ step, question, hint }: StepHeadingProps) {
  return (
    <div>
      <p className="eyebrow text-umber">Step {pad(step)}</p>
      <RevealText
        as="h2"
        lines={question}
        trigger="mount"
        delay={0.1}
        stagger={0.08}
        duration={0.8}
        className="mt-4 font-display text-[clamp(2.25rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-[-0.015em] text-ink"
      />
      {hint ? <p className="mt-5 max-w-md text-ink/60">{hint}</p> : null}
    </div>
  );
}
