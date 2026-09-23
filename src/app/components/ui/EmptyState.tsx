/**
 * EmptyState — centred empty-state block ("this family has no members yet").
 * Warm, dashed slot in the spirit of the prototype's empty picker
 * (form.html `.pick.empty`); title + optional body + optional action children.
 */
import type { ReactNode } from "react";

export interface EmptyStateProps {
  /** The headline (rendered as a plain `<p>` at --t-h3 weight — pick your own heading level around it). */
  title: ReactNode;
  /** Optional supporting line under the title. */
  body?: ReactNode;
  /** Optional action area (a Button, a link…). */
  children?: ReactNode;
  /** Extra class on the block. */
  className?: string;
}

/** Centred empty-state block. */
export function EmptyState({ title, body, children, className = "" }: EmptyStateProps) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center gap-3 rounded-[12px]",
        "border border-dashed border-[var(--line-strong)] bg-[#FAF5EC] px-8 py-8 text-center",
        className,
      ].join(" ")}
    >
      <p className="text-[17px] font-650 tracking-[-0.015em] text-[var(--ink)]">{title}</p>
      {body !== undefined && (
        <p className="max-w-[420px] text-[13.5px] text-[var(--muted)]">{body}</p>
      )}
      {children !== undefined && <div className="mt-[4px] flex gap-[10px]">{children}</div>}
    </div>
  );
}
