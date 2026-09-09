"use client";

import type { ChangeEvent, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  multiline?: boolean;
  error?: string;
  hint?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  inputMode?: "text" | "email" | "tel";
  className?: string;
}

/**
 * Minimal editorial form field: label above, single hairline underneath that
 * darkens on focus. Errors are linked with aria-describedby.
 */
export function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  multiline = false,
  error,
  hint,
  autoComplete,
  inputMode,
  className,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  const sharedProps = {
    id,
    name: id,
    value,
    required,
    autoComplete,
    inputMode,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
    className: cn(
      "peer w-full bg-transparent py-3 font-sans text-[1.05rem] text-ink outline-none placeholder:text-transparent",
      multiline && "min-h-[7rem] resize-y",
    ),
  };

  return (
    <div className={cn("group/field relative", className)}>
      <label htmlFor={id} className="eyebrow flex items-baseline gap-2 text-ink/55">
        {label}
        {required ? (
          <span aria-hidden className="text-umber">
            *
          </span>
        ) : (
          <span className="normal-case tracking-normal text-ink/35">Optional</span>
        )}
      </label>

      {multiline ? (
        <textarea {...sharedProps} rows={3} placeholder={label} />
      ) : (
        <input {...sharedProps} type={type} placeholder={label} />
      )}

      <span aria-hidden className="relative block h-px w-full bg-ink/20">
        <span
          className={cn(
            "absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-expo group-focus-within/field:scale-x-100",
            error && "scale-x-100 bg-error",
          )}
        />
      </span>

      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-[0.85rem] text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-2 text-[0.85rem] text-ink/45">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
