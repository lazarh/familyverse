"use client";

/**
 * Form field primitives — the prototype's `.field` / `.input` (form.html):
 * label above (semibold, sm) + right-aligned `req`/`opt` micro-tag + control +
 * hint below. `Input`/`TextArea` carry the bare control styling so screens can
 * use them standalone too.
 */
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export interface FieldProps {
  /** Field label, rendered above the control at 13.5px/650. */
  label: ReactNode;
  /** The control (Input, Segmented, Switch row, picker…). */
  children: ReactNode;
  /** Hint line under the control (12px, muted). */
  hint?: ReactNode;
  /** Micro-tag: `'req'` → clay "Required" (700), `'opt'` → muted "Optional" (600). */
  tag?: "req" | "opt";
  /** Overrides the micro-tag words (e.g. "Optional · new in this direction"). Needs `tag` for styling. */
  tagText?: string;
  /** Associates the label with a control id — renders `<label htmlFor>`. Without it the label is a `<div>` (Segmented/picker rows). */
  htmlFor?: string;
  /** Extra class on the field wrapper (prototype spacing: 18px bottom margin). */
  className?: string;
}

const LABEL_CLASS =
  "mb-[6px] flex items-center justify-between gap-3 text-[13.5px] font-650 text-[var(--ink-soft)]";

function tagClass(tag: "req" | "opt"): string {
  // prototype: .req 10.5/700/clay · .opt 10.5/600/muted, both uppercase + 0.06em
  return tag === "req"
    ? "text-[10.5px] font-bold tracking-[0.06em] text-[var(--clay)] uppercase"
    : "text-[10.5px] font-semibold tracking-[0.06em] text-[var(--muted)] uppercase";
}

/** Label + control + hint stack. Pass `htmlFor` whenever the control has an id. */
export function Field({
  label,
  children,
  hint,
  tag,
  tagText,
  htmlFor,
  className = "",
}: FieldProps) {
  const labelContent = (
    <>
      {label}
      {tag !== undefined && (
        <span className={tagClass(tag)}>{tagText ?? (tag === "req" ? "Required" : "Optional")}</span>
      )}
    </>
  );

  return (
    <div className={`mb-[18px] ${className}`}>
      {htmlFor !== undefined ? (
        <label htmlFor={htmlFor} className={LABEL_CLASS}>
          {labelContent}
        </label>
      ) : (
        <div className={LABEL_CLASS}>{labelContent}</div>
      )}
      {children}
      {hint !== undefined && (
        <p className="mt-[5px] text-[12px] text-[var(--muted)]">{hint}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Input — 40px, r8, --line-strong border, clay focus ring, warm
 * placeholder, warm disabled fill (form.html .input, verbatim).
 * ------------------------------------------------------------------ */

/** Shared class string — reuse it for controls Input doesn't cover (select, file…). */
export const inputClass = [
  "box-border w-full h-10 rounded-[8px] border border-[var(--line-strong)] bg-[var(--card)]",
  "px-3 text-[15px] text-[var(--ink)]",
  "placeholder:text-[var(--placeholder)]",
  "focus:outline-2 focus:outline-[var(--clay)] focus:outline-offset-1 focus:border-transparent",
  "disabled:bg-[#F4EFE6] disabled:text-[var(--placeholder)] disabled:cursor-not-allowed",
].join(" ");

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/** Bare text input with the prototype's `.input` styling. */
export function Input({ className = "", ...rest }: InputProps) {
  return <input {...rest} className={`${inputClass} ${className}`} />;
}

/* ------------------------------------------------------------------ *
 * TextArea — same skin as Input, sized for prose (form.html bio box
 * without the editor chrome: auto height, min 132px, vertical resize).
 * ------------------------------------------------------------------ */

/** Shared class string for textareas (e.g. the borderless bio editor body). */
export const textareaClass = [
  "box-border w-full min-h-[132px] rounded-[8px] border border-[var(--line-strong)] bg-[var(--card)]",
  "px-3 py-[11px] text-[15px] leading-[1.6] text-[var(--ink)] resize-y",
  "placeholder:text-[var(--placeholder)]",
  "focus:outline-2 focus:outline-[var(--clay)] focus:outline-offset-1 focus:border-transparent",
  "disabled:bg-[#F4EFE6] disabled:text-[var(--placeholder)] disabled:cursor-not-allowed",
].join(" ");

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Bare textarea with the prototype's input skin, prose-friendly sizing. */
export function TextArea({ className = "", ...rest }: TextAreaProps) {
  return <textarea {...rest} className={`${textareaClass} ${className}`} />;
}
