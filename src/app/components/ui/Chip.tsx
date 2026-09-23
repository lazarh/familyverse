/**
 * Chip — the profile's pill (member.html `.chip`): `living` (sage on pale
 * green) or `plain` (warm neutral), optional leading dot.
 */
import type { ReactNode } from "react";

export interface ChipProps {
  /** Chip contents (e.g. "Living", "Generation 3"). */
  children: ReactNode;
  /** `'living'` → sage on pale green; `'plain'` → warm neutral. @default 'plain' */
  variant?: "living" | "plain";
  /** Renders the 6px leading dot (prototype: the Living chip has one). */
  dot?: boolean;
  /** Extra class on the chip. */
  className?: string;
  /** Optional tooltip. */
  title?: string;
}

const VARIANT_CLASSES: Record<"living" | "plain", string> = {
  living: "bg-[#E9F0EA] text-[var(--sage)] shadow-[inset_0_0_0_1px_#CFDFD3]",
  plain: "bg-[#F4EDE3] text-[var(--ink-soft)] shadow-[inset_0_0_0_1px_var(--line)]",
};

/** Status pill: 26px tall, r-full, 12px/650. */
export function Chip({ children, variant = "plain", dot, className = "", title }: ChipProps) {
  return (
    <span
      title={title}
      className={[
        // prototype .chip: 26px, 0 11px padding, r-full, 12px/650, +0.01em
        "inline-flex h-[26px] items-center gap-[6px] rounded-full px-[11px]",
        "text-[12px] font-650 tracking-[0.01em] whitespace-nowrap",
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {dot && <span aria-hidden="true" className="h-[6px] w-[6px] rounded-full bg-current" />}
      {children}
    </span>
  );
}
